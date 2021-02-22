import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';


const UpdatePurchase=(props)=>{

	const history=useHistory();
	const [pname,setPname]=useState("");
	const [cname,setCname]=useState("");
	const [num,setNum]=useState("");
	const [price,setPrice]=useState("");
	const [quantity,setQuantity]=useState("");


	const [pur,setPur]=useState({});

	  useEffect(()=>{
		  	fetch("/getPurchase/"+props.match.params.id)
	    	.then(res=>res.json())
		    .then(result=>{
		    	setPur(result);
		    })
	  },[])

	  useEffect(()=>{
		  	setPname(pur.pname);
		  	setCname(pur.cname);
		  	setNum(pur.number);
		  	setPrice(pur.price);
		  	setQuantity(pur.quantity);
	  },[pur])


	  const updatePurchase=()=>{
	  	fetch("/updatePurchase/"+props.match.params.id,{
	      method:"put",
	      headers:{
	        "Content-Type":"application/json"
	      },
	      body:JSON.stringify({
	        pname,
	        cname,
	        num,
	        price,
	        quantity
	      })
	    }).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push("/viewPurchase");
	      }
	    })
	  }

	  const deletePurchase=()=>{
	  	fetch("/allPurchases/"+props.match.params.id,{
	  		method:"delete"
	  	}).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push("/viewPurchase");
	      }
	    })
	  }



	  const reset=()=>{
	  	setPname("");
	  	setCname("");
	  	setNum("");
	  	setPrice("");
	  	setQuantity("");
	  }



	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg1.jpg')",backgroundColor:"blue"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Purchase Details</div>
			            <table>
					        <tbody>
					          <tr>
					            <td>Product Name:</td>
					            <td><input type="text" placeholder="Product Name" value={pname} onChange={(e)=>setPname(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Customer Name:</td>
					            <td><input type="text" placeholder="Customer Name" value={cname} onChange={(e)=>setCname(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Phone Number:</td>
					            <td><input type="number" placeholder="Phone Number" value={num} onChange={(e)=>setNum(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Price (Rupees):</td>
					            <td><input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Quantity:</td>
					            <td><input type="number" placeholder="Quanity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/></td>
					          </tr>
					        </tbody>
				        </table>
				        <div class="card-action">
				          <Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>
				          <Link to="#" className="btn" onClick={()=>updatePurchase()}>Update</Link>
				          <Link to="#" className="btn" onClick={()=>deletePurchase()}>Delete</Link>
				        </div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default UpdatePurchase; 