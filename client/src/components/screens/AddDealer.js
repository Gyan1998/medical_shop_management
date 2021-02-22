import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';


const AddDealer=(props)=>{

	const history=useHistory();
	const [name,setName]=useState("");
	const [address,setAddress]=useState("");
	const [num,setNum]=useState("");
	const [email,setEmail]=useState("");

	const cancel=()=>{
		history.push("/");
	}

    const postDealer=()=>{
	      fetch("/addDealer",{
	      method:"post",
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

	  // const reset=()=>{
	  // 	setName("");
	  // 	setAddress("");
	  // 	setNum("");
	  // 	setEmail("");
	  // }


	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg6.jpg')"}}>
			<div className="row">
			    <div className="col s12 m8 offset-m2 l8 offset-l2">
			        	<div className="hh">
				          <Link to="addDealer" className="btn1" style={{passing:"5px"}}>Add Dealer</Link>
				          <Link to="viewDealer" style={{passing:"5px"}}>View Dealer</Link>
				        </div>
			    </div>
		    </div>
			<div className="row">
			    <div className="col s12 m8 offset-m2 l8 offset-l2">
			      <div className="card blue-grey darken-1">
			        <div className="card-content white-text">
			          <div className="card-title">Add Dealer Details</div>
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
				        <div className="card-action">
				          <Link to="#" className="btn" style={{backgroundColor:"red"}} onClick={()=>cancel()}>Cancel</Link>
				          {/*<Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>*/}
				          <Link to="#" className="btn" onClick={()=>postDealer()}>Add</Link>
				        </div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default AddDealer; 
