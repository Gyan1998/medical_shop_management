import React,{useState,useContext} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../../App';



const Login=()=>{

	const {state,dispatch} = useContext(UserContext)
	const history=useHistory();
  	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");

	const PostData=()=>{
		fetch("/signin",{
	      method:"post",
	      headers:{
	        "Content-Type":"application/json"
	      },
	      body:JSON.stringify({
	        email,
	        password
	      })
	    }).then(res=>res.json())
	    .then(data=>{
	      console.log(data);
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	      	localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
	        M.toast({html: "signedin successfully",classes:"#43a047 green darken-1"})
	        history.push('/');
	      }
	    })
	  }

	  // const reset=()=>{
	  // 	setEmail("");
	  // 	setPassword("");
	  // }

	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg6.jpg')"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Add Login Details</div>
			            <table>
					        <tbody>
					          <tr>
					            <td>Email:</td>
					            <td><input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Password:</td>
					            <td><input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/></td>
					          </tr>
					        </tbody>
				        </table>
				        <div class="card-action">
				          {/*<Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>*/}
				          <Link to="#" className="btn" onClick={()=>PostData()}>Login</Link>
				        </div>
				        <div style={{display:"flex",justifyContent:"center",color:"black"}}><p style={{paddingRight:"10px"}}>Don't have any account?</p><Link to="/signup">Signup</Link></div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default Login; 