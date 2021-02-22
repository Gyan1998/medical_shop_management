const mongoose=require('mongoose');

const medicineSchema=new mongoose.Schema({
  code:{
    type:String,
    required:true
  },
  mname:{
    type:String,
    required:true
  },
  dname:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  stock:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  }
});

mongoose.model("Medicine",medicineSchema);