const mongoose=require('mongoose');

const employeeSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  salary:{
    type:Number,
    required:true
  },
  number:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  }
});

mongoose.model("Employee",employeeSchema);