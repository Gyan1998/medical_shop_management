const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');
const Dealer=mongoose.model("Dealer");
const Medicine=mongoose.model("Medicine");
const Employee=mongoose.model("Employee");
const Customer=mongoose.model("Customer");
const Purchase=mongoose.model("Purchase");
const requireLogin=require('../middleware/requireLogin');



router.get('/addDealer',requireLogin,async(req,res)=>{
	const dealers=await Dealer.find({});
	//console.log(dealers);
	res.send(dealers);
})


router.post('/addDealer',async(req,res)=>{
	const {name,address,num,email}=req.body;
	if(!name||!address||!num||!email){
		return res.status(422).json({error:"please fill all the fields"});
	}
	const dealer=new Dealer({
		name,address,number:num,email
	})
	const newDealer=await dealer.save();
	if(newDealer){
			return res.status(201).send({message:"dealer saved",data:newDealer});
	}
	return res.status(500).send({error:"dealer not saved"});
})


router.get('/addMedicine',async(req,res)=>{
	const medicines=await Medicine.find({});
	//console.log(medicines);
	res.send(medicines);
})


router.post('/addMedicine',async(req,res)=>{
	const {code,mname,dname,price,stock,description}=req.body;
	if(!code||!mname||!dname||!price||!stock||!description){
		return res.status(422).json({error:"please fill all the fields"});
	}
	const medicine=new Medicine({
		code,mname,dname,price,stock,description
	})
	const newMedicine=await medicine.save();
	if(newMedicine){
			return res.status(201).send({message:"medicine saved",data:newMedicine});
	}
	return res.status(500).send({error:"medicine not saved"});
})


router.get('/addEmployee',async(req,res)=>{
	const employers=await Employee.find({});
	//console.log(employers);
	res.send(employers);
})


router.post('/addEmployee',async(req,res)=>{
	const {name,address,salary,num,email}=req.body;
	if(!name||!address||!salary||!num||!email){
		return res.status(422).json({error:"please fill all the fields"});
	}
	const employee=new Employee({
		name,address,salary,number:num,email
	})
	const newEmployee=await employee.save();
	if(newEmployee){
			return res.status(201).send({message:"employee saved",data:newEmployee});
	}
	return res.status(500).send({error:"employee not saved"});
})


router.get('/addCustomer',async(req,res)=>{
	const customers=await Customer.find({});
	//console.log(customers);
	res.send(customers);
})


router.post('/addCustomer',async(req,res)=>{
	const {name,address,num,email}=req.body;
	if(!name||!address||!num||!email){
		return res.status(422).json({error:"please fill all the fields"});
	}
	const customer=new Customer({
		name,address,number:num,email
	})
	const newCustomer=await customer.save();
	if(newCustomer){
			return res.status(201).send({message:"customer saved",data:newCustomer});
	}
	return res.status(500).send({error:"customer not saved"});
})


router.get('/addPurchase',async(req,res)=>{
	const purchases=await Purchase.find({});
	//console.log(purchases);
	res.send(purchases);
})


router.post('/addPurchase',async(req,res)=>{
	const {pname,cname,num,price,quantity}=req.body;
	if(!pname||!cname||!num||!price||!quantity){
		return res.status(422).json({error:"please fill all the fields"});
	}
	const purchase=new Purchase({
		pname,cname,number:num,price,quantity
	})
	const newPurchase=await purchase.save();
	if(newPurchase){
			return res.status(201).send({message:"purchase saved",data:newPurchase});
	}
	return res.status(500).send({error:"purchase not saved"});
})




router.get('/getDealer/:id',async(req,res)=>{
	const dealer=await Dealer.findOne({_id:req.params.id});
	if(dealer){
		res.send(dealer);
	}
	else{
		res.status(404).send({message:"dealer not found"});
	}
})


router.put('/updateDealer/:id',async(req,res)=>{
	const dealer=await Dealer.findById(req.params.id);
	if(dealer){
		dealer.name=req.body.name;
		dealer.address=req.body.address;
		dealer.number=req.body.num;
		dealer.email=req.body.email;
		const updatedDealer=await dealer.save();
		if(updatedDealer){
			return res.status(200).send({message:"dealer updated",data:updatedDealer});
		}
	}
	return res.status(500).send({error:"error in updating dealer"});
})



router.delete('/allDealers/:id',async(req,res)=>{
	const del=await Dealer.findById(req.params.id);
	if(del){
		await del.remove()
		res.send({message:"dealer deleted"});
	}
	else{
		res.send({error:"error in deletion"});
	}
})



router.get('/getMedicine/:id',async(req,res)=>{
	const medicine=await Medicine.findOne({_id:req.params.id});
	if(medicine){
		res.send(medicine);
	}
	else{
		res.status(404).send({message:"medicine not found"});
	}
})


router.put('/updateMedicine/:id',async(req,res)=>{
	const medicine=await Medicine.findById(req.params.id);
	if(medicine){
		medicine.code=req.body.code;
		medicine.mname=req.body.mname;
		medicine.dname=req.body.dname;
		medicine.price=req.body.price;
		medicine.stock=req.body.stock;
		medicine.description=req.body.description;
		const updatedMedicine=await medicine.save();
		if(updatedMedicine){
			return res.status(200).send({message:"medicine updated",data:updatedMedicine});
		}
	}
	return res.status(500).send({error:"error in updating medicine"});
})



router.delete('/allMedicines/:id',async(req,res)=>{
	const del=await Medicine.findById(req.params.id);
	if(del){
		await del.remove()
		res.send({message:"medicine deleted"});
	}
	else{
		res.send({error:"error in deletion"});
	}
})



router.get('/getEmployee/:id',async(req,res)=>{
	const employee=await Employee.findOne({_id:req.params.id});
	if(employee){
		res.send(employee);
	}
	else{
		res.status(404).send({message:"employee not found"});
	}
})


router.put('/updateEmployee/:id',async(req,res)=>{
	const employee=await Employee.findById(req.params.id);
	if(employee){
		employee.name=req.body.name;
		employee.address=req.body.address;
		employee.salary=req.body.salary;
		employee.num=req.body.num;
		employee.email=req.body.email;
		const updatedEmployee=await employee.save();
		if(updatedEmployee){
			return res.status(200).send({message:"employee updated",data:updatedEmployee});
		}
	}
	return res.status(500).send({error:"error in updating employee"});
})



router.delete('/allEmployers/:id',async(req,res)=>{
	const del=await Employee.findById(req.params.id);
	if(del){
		await del.remove()
		res.send({message:"employee deleted"});
	}
	else{
		res.send({error:"error in deletion"});
	}
})




router.get('/getCustomer/:id',async(req,res)=>{
	const customer=await Customer.findOne({_id:req.params.id});
	if(customer){
		res.send(customer);
	}
	else{
		res.status(404).send({message:"customer not found"});
	}
})


router.put('/updateCustomer/:id',async(req,res)=>{
	const customer=await Customer.findById(req.params.id);
	if(customer){
		customer.name=req.body.name;
		customer.address=req.body.address;
		customer.number=req.body.num;
		customer.email=req.body.email;
		const updatedCustomer=await customer.save();
		if(updatedCustomer){
			return res.status(200).send({message:"customer updated",data:updatedCustomer});
		}
	}
	return res.status(500).send({error:"error in updating customer"});
})



router.delete('/allCustomers/:id',async(req,res)=>{
	const del=await Customer.findById(req.params.id);
	if(del){
		await del.remove()
		res.send({message:"customer deleted"});
	}
	else{
		res.send({error:"error in deletion"});
	}
})



router.get('/getPurchase/:id',async(req,res)=>{
	const purchase=await Purchase.findOne({_id:req.params.id});
	if(purchase){
		res.send(purchase);
	}
	else{
		res.status(404).send({message:"purchase not found"});
	}
})


router.put('/updatePurchase/:id',async(req,res)=>{
	const purchase=await Purchase.findById(req.params.id);
	if(purchase){
		purchase.pname=req.body.pname;
		purchase.cname=req.body.cname;
		purchase.num=req.body.num;
		purchase.price=req.body.price;
		purchase.quantity=req.body.quantity;
		const updatedPurchase=await purchase.save();
		if(updatedPurchase){
			return res.status(200).send({message:"purchase updated",data:updatedPurchase});
		}
	}
	return res.status(500).send({error:"error in updating purchase"});
})



router.delete('/allPurchases/:id',async(req,res)=>{
	const del=await Purchase.findById(req.params.id);
	if(del){
		await del.remove()
		res.send({message:"purchase deleted"});
	}
	else{
		res.send({error:"error in deletion"});
	}
})



module.exports=router;