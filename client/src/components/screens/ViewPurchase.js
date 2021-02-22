import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link} from 'react-router-dom';


const ViewPurchase=()=>{

	const [parray,setParray]=useState([]);

    useEffect(()=>{
    	fetch("/addPurchase")
    	.then(res=>res.json())
	    .then(result=>{
	    	setParray(result);
	    })
	    return ()=>{};
	},[]);


	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg1.jpg')"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			        	<div className="hh">
				          <Link to="addPurchase" style={{passing:"5px"}}>Add Purchase</Link>
				          <Link to="viewPurchase" className="btn1" style={{passing:"5px"}}>View Purchase</Link>
				        </div>
			    </div>
		    </div>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Purchase Details</div>
			            <div className="rr">
			            <table className="table">
			            	<thead>
			            		<tr>
			            			<th>Product ID</th>
			            			<th>Product Name</th>
			            			<th>Customer Name</th>
			            			<th>Phone Number</th>
			            			<th>Price (Rupees)</th>
			            			<th>Quantity</th>
			            		</tr>
			            	</thead>
					        <tbody>
					        {
					        	parray.map((el)=>{
					        		return <tr>
				            			<td><Link to={"/updatePurchase/"+el._id} style={{color:"cyan"}}>{el._id}</Link></td>
				            			<td>{el.pname}</td>
				            			<td>{el.cname}</td>
				            			<td>9{el.number}</td>
				            			<td>{el.price}</td>
				            			<td>{el.quantity}</td>
				            		</tr>
					        	})
					        }
					        </tbody>
				        </table>
				        </div>
				        <p style={{textAlign:"center",paddingTop:"20px",color:"gray"}}>Click on a Purchase ID to Update or Delete the record</p>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default ViewPurchase; 