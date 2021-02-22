import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link} from 'react-router-dom';


const ViewMedicine=()=>{

	const [marray,setMarray]=useState([]);

    useEffect(()=>{
    	fetch("/allMedicine")
    	.then(res=>res.json())
	    .then(result=>{
	    	setMarray(result);
	    })
	    return ()=>{};
	},[]);


	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg1.jpg')"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			        	<div className="hh">
				          <Link to="addMedicine" style={{passing:"5px"}}>Add Medicine</Link>
				          <Link to="viewMedicine" className="btn1" style={{passing:"5px"}}>View Medicine</Link>
				        </div>
			    </div>
		    </div>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Medicine Details</div>
			          	<div className="rr">
			            <table className="table">
			            	<thead>
			            		<tr>
			            			<th>Medicine ID</th>
			            			<th>Medicine Code</th>
			            			<th>Medicine Name</th>
			            			<th>Dealer Name</th>
			            			<th>Price (Rupees)</th>
			            			<th>Stock</th>
			            			<th>Description</th>
			            		</tr>
			            	</thead>
					        <tbody>
					        {
					        	marray.map((el)=>{
					        		return <tr>
				            			<td><Link to={"/updateMedicine/"+el._id} style={{color:"cyan"}}>{el._id}</Link></td>
				            			<td>{el.code}</td>
				            			<td>{el.mname}</td>
				            			<td>{el.dname}</td>
				            			<td>{el.price}</td>
				            			<td>9{el.stock}</td>
				            			<td>{el.description}</td>
				            		</tr>
					        	})
					        }
					        </tbody>
				        </table>
				        </div>
				        <p style={{textAlign:"center",paddingTop:"20px",color:"gray"}}>Click on a Medicine ID to Update or Delete the record</p>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default ViewMedicine; 