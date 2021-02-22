import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link} from 'react-router-dom';


const ViewCustomer=()=>{

	const [carray,setCarray]=useState([]);

    useEffect(()=>{
    	fetch("/addCustomer")
    	.then(res=>res.json())
	    .then(result=>{
	    	setCarray(result);
	    })
	    return ()=>{};
	},[]);

	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg1.jpg')"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			        	<div className="hh">
				          <Link to="addCustomer" style={{passing:"5px"}}>Add Customer</Link>
				          <Link to="viewCustomer" className="btn1" style={{passing:"5px"}}>View Customer</Link>
				        </div>
			    </div>
		    </div>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Customer Details</div>
			          	<div className="rr">
			            <table className="table">
			            	<thead>
			            		<tr>
			            			<th>Customer ID</th>
			            			<th>Customer Name</th>
			            			<th>Address</th>
			            			<th>Phone Number</th>
			            			<th>Email</th>
			            		</tr>
			            	</thead>
					        <tbody>
					        {
					        	carray.map((el)=>{
					        		return <tr>
				            			<td><Link to={"/updateCustomer/"+el._id} style={{color:"cyan"}}>{el._id}</Link></td>
				            			<td>{el.name}</td>
				            			<td>{el.address}</td>
				            			<td>9{el.number}</td>
				            			<td>{el.email}</td>
				            		</tr>
					        	})
					        }
					        </tbody>
				        </table>
				        </div>
				        <p style={{textAlign:"center",paddingTop:"20px",color:"gray"}}>Click on a Customer ID to Update or Delete the record</p>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default ViewCustomer; 