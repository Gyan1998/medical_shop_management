const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/keys');
const mongoose=require('mongoose');
const User=mongoose.model("User");

module.exports=(req,res,next)=>{
	const {authorization}=req.headers;
	if(!authorization){
		return res.json({error:"user must be logged in"});
	}
	const token=authorization.replace("Bearer ","");
	jwt.verify(token,JWT_SECRET,(err,payload)=>{
		if(err){
			return res.json({error:"user must be logged in"})
		}
		const {_id}=payload      //payload is the body of post request
		User.findById(_id)
		.then(userdata=>{
			req.user=userdata;
			next();
		})
	})
}