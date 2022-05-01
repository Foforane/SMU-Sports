const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
  StudentNo:{
      type: String,
      required: true
  }  ,
  Surname:{
      type:String,
  required:true
  },
  Name:{
      type:String,
      required:true
  },
  Student:{
      type:Boolean,
      required:true
  },


})
const Students = mongoose.model('Students',StudentSchema);
module.exports = Students;