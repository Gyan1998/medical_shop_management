const mongoose=require('mongoose');

const purchaseSchema=new mongoose.Schema({
  pname:{
    type:String,
    required:true
  },
  cname:{
    type:String,
    required:true
  },
  number:{
    type:Number,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  }
});

mongoose.model("Purchase",purchaseSchema);