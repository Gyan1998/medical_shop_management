const mongoose=require('mongoose');

const dealerSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  address:{
    type:String,
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

mongoose.model("Dealer",dealerSchema);