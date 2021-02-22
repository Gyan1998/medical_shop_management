import React,{useState} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';


const AddPurchase=()=>{

	const history=useHistory();
	const [pname,setPname]=useState("");
	const [cname,setCname]=useState("");
	const [num,setNum]=useState("");
	const [price,setPrice]=useState("");
	const [quantity,setQuantity]=useState("");

    const postPurchase=()=>{
	      fetch("/addPurchase",{
	      method:"post",
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

	  // const reset=()=>{
	  // 	setPname("");
	  // 	setCname("");
	  // 	setNum("");
	  // 	setPrice("");
	  // 	setQuantity("");
	  // }

	  const cancel=()=>{
		history.push("/");
	  }



	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg6.jpg')"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			        	<div className="hh">
				          <Link to="addPurchase" className="btn1" style={{passing:"5px"}}>Add Purchase</Link>
				          <Link to="viewPurchase" style={{passing:"5px"}}>View Purchase</Link>
				        </div>
			    </div>
		    </div>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Add Purchase Details</div>
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
				          <Link to="#" className="btn" style={{backgroundColor:"red"}} onClick={()=>cancel()}>Cancel</Link>
				          {/*<Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>*/}
				          <Link to="#" className="btn" onClick={()=>postPurchase()}>Add</Link>
				        </div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default AddPurchase; 