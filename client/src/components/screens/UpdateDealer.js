import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';


const UpdateDealer=(props)=>{

	const history=useHistory();
	const [name,setName]=useState("");
	const [address,setAddress]=useState("");
	const [num,setNum]=useState("");
	const [email,setEmail]=useState("");

	const [deal,setDeal]=useState({});

	  useEffect(()=>{
		  	fetch("/getDealer/"+props.match.params.id)
	    	.then(res=>res.json())
		    .then(result=>{
		    	setDeal(result);
		    })
	  },[])

	  useEffect(()=>{
		  	setName(deal.name);
		  	setAddress(deal.address);
		  	setNum(deal.number);
		  	setEmail(deal.email);
	  },[deal])


	  const updateDealer=()=>{
	  	//console.log(props.match.params.id);
	  	fetch("/updateDealer/"+props.match.params.id,{
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
	        history.push("/viewDealer");
	      }
	    })
	  }

	  const deleteDealer=()=>{
	  	fetch("/allDealers/"+props.match.params.id,{
	  		method:"delete"
	  	}).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push("/viewDealer");
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
			          <div class="card-title">Dealer Details</div>
			            <table>
					        <tbody>
					          <tr>
					            <td>Dealer Name:</td>
					            <td><input type="text" placeholder="Dealer Name" value={name} onChange={(e)=>setName(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Address:</td>
					            <td><input type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Phone Number:</td>
					            <td><input type="number" placeholder="Phone Number" value={num} onChange={(e)=>setNum(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Email:</td>
					            <td><input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/></td>
					          </tr>
					        </tbody>
				        </table>
				        <div class="card-action">
				          <Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>
				          <Link to="#" className="btn" onClick={()=>updateDealer()}>Update</Link>
				          <Link to="#" className="btn" onClick={()=>deleteDealer()}>Delete</Link>
				        </div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default UpdateDealer; 