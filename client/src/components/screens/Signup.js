import React,{useState} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';


const Signup=()=>{

	const history=useHistory();
	const [name,setName]=useState("");
	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");

    const PostData=()=>{
    	if(!name||!email||!password)
    		M.toast({html: "please fill all the fields",classes:"#c62828 red darken-3"})
    	else if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
	    {
	      fetch("/signup",{
	      method:"post",
	      headers:{
	        "Content-Type":"application/json"
	      },
	      body:JSON.stringify({
	        name,
	        email,
	        password
	      })
	    }).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push('/signin');
	      }
	    })
	    }
	    else
	    {
	      M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
	    }
	  }

	  const reset=()=>{
	  	setName("");
	  	setEmail("");
	  	setPassword("");
	  }


	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg6.jpg')"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Add Signup Details</div>
			            <table>
					        <tbody>
					          <tr>
					            <td>Name:</td>
					            <td><input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Email:</td>
					            <td><input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Password:</td>
					            <td><input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/></td>
					          </tr>
					        </tbody>
				        </table>
				        <div class="card-action">
				          <Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>
				          <Link to="#" className="btn" onClick={()=>PostData()}>Signup</Link>
				        </div>
				        <div style={{display:"flex",justifyContent:"center"}}><p style={{paddingRight:"10px",color:"black"}}>Already have an account?</p><Link to="/signin">Login</Link></div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default Signup; 