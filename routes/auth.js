const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/keys');


router.post('/signup',(req,res)=>{
	const {name,email,password}=req.body;
	if(!name||!email||!password)
		return res.status(422).json({error:"please add all the fields"});
	else if(!/^[A-Za-z ]+$/.test(name))
		return res.status(422).json({error:"name should contain alphabet characters only"});
	else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
		return res.status(422).json({error:"invalid email"});
	else if(password.length<6)
		return res.status(422).json({error:"password should contain atleast 6 characters"});
	User.findOne({email:email})
	.then(savedUser=>{
		if(savedUser){
			return res.status(422).json({error:"user already exist"});
		}
		bcrypt.hash(password,12)
		.then(hashedpassword=>{
			const user=new User({
				name,email,password:hashedpassword
			})
			user.save()
			.then(user=>{
				res.json({message:"successfully saved"});
			}).catch(err=>{
				console.log(err);
			})
		})
	}).catch(err=>{
		console.log(err);
	})
})



router.post('/signin',(req,res)=>{
	const {email,password}=req.body;
	if(!email||!password)
		return res.status(422).json({error:"please add all the fields"});
	if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
		return res.status(422).json({error:"invalid email"});
	if(password.length<6)
		return res.status(422).json({error:"password should contain atleast 6 characters"});
	User.findOne({email:email})
	.then(savedUser=>{
		if(!savedUser){
			return res.status(422).json({error:"Invalid email or password"});
		}
		bcrypt.compare(password,savedUser.password)
		.then(doMatch=>{
			if(doMatch){
				const token=jwt.sign({_id:savedUser._id},JWT_SECRET);
				const {_id,name,email}=savedUser;
				res.send({message:"Successfully signed in",token,user:{_id,name,email}});
			}
			else{
				return res.status(422).json({error:"Invalid email or password"});
			}
		}).catch(err=>{
			console.log(err);
		})
	}).catch(err=>{
		console.log(err);
	})
})

module.exports=router;