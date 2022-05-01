const express = require("express");
const app = express();
const path = require('path');

app.set("view engine","ejs");
app.set('views',path.join(__dirname,'/views'));
var bodyParser = require("body-parser");
var iniData = {_id:"",Surname:"",StudentNo:"",Name:"",Student:false};
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

const mongoose = require("mongoose");
const Bloggers = require('./Models/Blogging');
const Students = require('./Models/Students');

mongoose.connect("mongodb://localhost/Sports",{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(()=>console.log("connected to db"))
.catch(error => console.log(error.message));

let ErrorCaught = "";
let token = "lip_laQUJrC4IBOtqVIW9gYL"

app.get("/",(req,res)=>{
    res.locals.title = "Home page"; 
res.render("index",{iniData:iniData});
});
app.get('/Guest',(req,res)=>{
  iniData = {_id:"",Surname:"",StudentNo:"",Name:"",Student:false};
  res.redirect('/')
})

app.get('/CheckBlogger',(req,res)=>{
  res.locals.title = "Bloggers";
  res.render("CheckBlogger");
})
app.get('/Student',(req,res)=>{
    res.locals.title = "Student";  
res.render("Student");
});
    app.get("/bloggers",(req,res)=>{
        res.locals.title = "Bloggers"; 
        res.render("bloggers");
    });
app.get("/blogs",(req,res)=>{
    Bloggers.find({},function(err,data){
        res.locals.title = "Blogs"; 
        res.render("blogs",{data:data});
        
        });
}); 
app.get("/Coaches",(req,res)=>{
  res.locals.title = "Coaches";
  res.render("Coaches")
});

app.get("/blogs/:id",async(req,res)=>{
   const data = await Bloggers.findById(req.params.id);
   res.locals.title = "Blog"; 
    res.render("showblog",{data:data,iniData:iniData});
})
    app.post("/blogg",function(req,res){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var hh = today.getHours();
      var mm = today.getMinutes();
     
       
          
      today = yyyy + '/' + mm + '/' + dd + " at "+ hh +":"+mm;
       Bloggers.create({
         name:req.body.name,
         DateOfUpload:today,
         Blog: req.body.Blog,
         Likes:0,
         Topic:req.body.Topic,
         Key:req.body.Key,
         Subject:req.body.Sub
         
        },function(err,iblog){
          if(iblog === undefined){
            console.log("Hi")
          }
             console.log(iblog);
         }); 

         res.redirect("/blogs");
        });
        app.post('/Edit',(req,res)=>{
          
          if(req.body.edit === "update"){     
           Bloggers.findOneAndUpdate({Kkey: req.body.Key},
            {name:req.body.name,Topic:req.body.Topic,Subject:req.body.Sub,Blog: req.body.Blog},
            (err,data)=>{
             console.log(data);
             res.redirect('/');
              return
            })
           }else{
             Bloggers.findOneAndDelete({Key:req.body.Key},(err,data)=>{
               res.redirect('/PreBlogger')
             })
           }
        })
      app.post('/check',(req,res)=>{
        let Password = req.body.Password;
        if (Password === "PinnacleChaser"){
          res.redirect('/PreBlogger');
        }else{
          res.locals.title = "Error";
          ErrorCaught = "Wrong Password Try again!." ;
          res.render("Catch",{ErrorCaught:ErrorCaught})
        }
      })
app.post('/Login', (req,res)=>{
   
   let Studentnum = req.body.StudentNumber;
  
  //  PasswordCompare = "Sefako"+password % 100;

  Students.findOne({StudentNo:Studentnum},(err,resultsfound)=>{
    console.log(err);
  
   
    console.log(resultsfound); 
    if(!resultsfound){
      res.locals.title = "Error";
    ErrorCaught = "we think you might have entered a Student Number that does not exist! Please try a Valid one." ;
    res.render("Catch",{ErrorCaught:ErrorCaught})
     return
    }
      console.log(resultsfound.Surname);
      iniData = resultsfound;
      res.redirect('/');   
      
  })
});
app.post('/Key',(req,res)=>{
    Bloggers.findOne({Key:req.body.Key},(err,data)=>{
      if(!data){
        res.locals.title = "Error";
      ErrorCaught = "That key does not exist." ;
      res.render("Catch",{ErrorCaught:ErrorCaught})
       return
      }
        res.locals.title='Edit Blog';
      res.render('Editblog',{data:data})
    })
});
app.get('/PreBlogger',(req,res)=>{
 res.locals.title= "Bloggers";
res.render("PreBlogger");
});
app.post('/Like/:id/:StudNum',(req,res)=>{
   const Like = req.body.Like;
   const Id = req.params.id;
   const Sn = req.params.StudNum;
   
   Bloggers.findById(Id, (err, docs)=> {
    
    console.log(docs) ;

    if(Like === "Yes"){
       
        let NewLike = docs.Likes + 1; 
        Object.assign(docs,{Likes:NewLike});
        docs.StudentLiked.push(Sn);   
        docs.save();
          
     console.log(docs);
       
        console.log(Sn);
        console.log(NewLike);
          let link = "/blogs/"+Id;
        res.redirect(link);

    }else{
        docs.StudentLiked.push(Sn);   
        docs.save();
         
       
}
});

});


        app.listen(3000,()=>{
    console.log("listening");
});
