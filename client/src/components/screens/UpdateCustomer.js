import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';


const UpdateCustomer=(props)=>{

	const history=useHistory();
	const [name,setName]=useState("");
	const [address,setAddress]=useState("");
	const [num,setNum]=useState("");
	const [email,setEmail]=useState("");


	const [cus,setCus]=useState({});

	  useEffect(()=>{
		  	fetch("/getCustomer/"+props.match.params.id)
	    	.then(res=>res.json())
		    .then(result=>{
		    	setCus(result);
		    })
	  },[])

	  useEffect(()=>{
		  	setName(cus.name);
		  	setAddress(cus.address);
		  	setNum(cus.number);
		  	setEmail(cus.email);
	  },[cus])


	  const updateCustomer=()=>{
	  	fetch("/updateCustomer/"+props.match.params.id,{
	      method:"put",
	      headers:{
	        "Content-Type":"application/json"
	      },
	      body:JSON.stringify({
	        name,
	        address,
	        num,
	        email
	      })
	    }).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push("/viewCustomer");
	      }
	    })
	  }

	  const deleteCustomer=()=>{
	  	fetch("/allCustomers/"+props.match.params.id,{
	  		method:"delete"
	  	}).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push("/viewCustomer");
	      }
	    })
	}

	  const reset=()=>{
	  	setName("");
	  	setAddress("");
	  	setNum("");
	  	setEmail("");
	  }

	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg1.jpg')",backgroundColor:"blue"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Customer Details</div>
			            <table>
					        <tbody>
					          <tr>
					            <td>Customer Name:</td>
					            <td><input type="text" placeholder="Customer Name" value={name} onChange={(e)=>setName(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Address:</td>
					            <td><input type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Phone Number:</td>
					            <td><input type="number" placeholder="Phone Name" value={num} onChange={(e)=>setNum(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Email:</td>
					            <td><input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/></td>
					          </tr>
					        </tbody>
				        </table>
				        <div class="card-action">
				          <Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>
				          <Link to="#" className="btn" onClick={()=>updateCustomer()}>Update</Link>
				          <Link to="#" className="btn" onClick={()=>deleteCustomer()}>Delete</Link>
				        </div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default UpdateCustomer; 