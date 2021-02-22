import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link} from 'react-router-dom';


const ViewEmployee=()=>{

	const [earray,setEarray]=useState([]);

    useEffect(()=>{
    	fetch("/addEmployee")
    	.then(res=>res.json())
	    .then(result=>{
	    	setEarray(result);
	    })
	    return ()=>{};
	},[]);


	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg1.jpg')"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			        	<div className="hh">
				          <Link to="addEmployee" style={{passing:"5px"}}>Add Employee</Link>
				          <Link to="viewEmployee" className="btn1" style={{passing:"5px"}}>View Employee</Link>
				        </div>
			    </div>
		    </div>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Employee Details</div>
			          	<div className="rr">
			            <table className="table">
			            	<thead>
			            		<tr>
			            			<th>Employee ID</th>
			            			<th>Employee Name</th>
			            			<th>Address</th>
			            			<th>Salary/annum</th>
			            			<th>Phone Number</th>
			            			<th>Email</th>
			            		</tr>
			            	</thead>
					        <tbody>
					        {
					        	earray.map((el)=>{
					        		return <tr>
				            			<td><Link to={"/updateEmployee/"+el._id} style={{color:"cyan"}}>{el._id}</Link></td>
				            			<td>{el.name}</td>
				            			<td>{el.address}</td>
				            			<td>{el.salary}</td>
				            			<td>9{el.number}</td>
				            			<td>{el.email}</td>
				            		</tr>
					        	})
					        }
					        </tbody>
				        </table>
				        </div>
				        <p style={{textAlign:"center",paddingTop:"20px",color:"gray"}}>Click on a Employee ID to Update or Delete the record</p>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default ViewEmployee; 