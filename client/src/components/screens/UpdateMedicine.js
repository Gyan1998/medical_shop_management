import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';


const UpdateMedicine=(props)=>{

	const history=useHistory();
	const [code,setCode]=useState("");
	const [mname,setMname]=useState("");
	const [dname,setDname]=useState("");
	const [price,setPrice]=useState("");
	const [stock,setStock]=useState("");
	const [description,setDescription]=useState("");

    const [med,setMed]=useState({});

	  useEffect(()=>{
		  	fetch("/getMedicine/"+props.match.params.id)
	    	.then(res=>res.json())
		    .then(result=>{
		    	setMed(result);
		    })
	  },[])

	  useEffect(()=>{
		setCode(med.code);
	  	setMname(med.mname);
	  	setDname(med.dname);
	  	setPrice(med.price);
	  	setStock(med.stock);
	  	setDescription(med.description);
	  },[med])


	  const updateMedicine=()=>{
	  	fetch("/updateMedicine/"+props.match.params.id,{
	      method:"put",
	      headers:{
	        "Content-Type":"application/json"
	      },
	      body:JSON.stringify({
	      	code,
	        mname,
	        dname,
	        price,
	        stock,
	        description
	      })
	    }).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push("/viewMedicine");
	      }
	    })
	  }

	  const deleteMedicine=()=>{
	  	fetch("/allMedicines/"+props.match.params.id,{
	  		method:"delete"
	  	}).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push("/viewMedicine");
	      }
	    })
	  }

	  
	const reset=()=>{
	  	setCode("");
	  	setMname("");
	  	setDname("");
	  	setPrice("");
	  	setStock("");
	  	setDescription("");
	}


	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg1.jpg')",backgroundColor:"blue"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Medicine Details</div>
			            <table>
					        <tbody>
					          <tr>
					            <td>Medicine Code:</td>
					            <td><input type="text" placeholder="Medicine Code" value={code} onChange={(e)=>setCode(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Medicine Name:</td>
					            <td><input type="text" placeholder="Medicine Name" value={mname} onChange={(e)=>setMname(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Dealer Name:</td>
					            <td><input type="text" placeholder="Dealer Name" value={dname} onChange={(e)=>setDname(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Price (Rupees):</td>
					            <td><input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Stock:</td>
					            <td><input type="number" placeholder="Stock" value={stock} onChange={(e)=>setStock(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Description:</td>
					            <td><input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/></td>
					          </tr>
					        </tbody>
				        </table>
				        <div class="card-action">
				          <Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>
				          <Link to="#" className="btn" onClick={()=>updateMedicine()}>Update</Link>
				          <Link to="#" className="btn" onClick={()=>deleteMedicine()}>Delete</Link>
				        </div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default UpdateMedicine; 