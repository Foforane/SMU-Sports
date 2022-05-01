const mongoose = require('mongoose');
const bloggersSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
DateOfUpload:{
    type:String,
    required:true
},
Blog:{
type:String,
required:true
},
Likes:{
    type:Number,
    required:true
},
Topic:{
    type:String,
    required:true
},
Key:{
type:String,
required:true,
unique:true
},
Subject:{
    type:String,
    required:true
},
StudentLiked:[String]
}
)
const Bloggers = mongoose.model('Bloggers',bloggersSchema);
module.exports = Bloggers;