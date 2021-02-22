import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link} from 'react-router-dom';


const ViewDealer=()=>{

	const [darray,setDarray]=useState([]);

    useEffect(()=>{
    	fetch("/allDealer",{
    		headers:{
    			"authorization":"Bearer " + localStorage.getItem("jwt")
    		}
    	})
    	.then(res=>res.json())
	    .then(result=>{
	    	setDarray(result);
	    })
	    return ()=>{};
	},[]);


	const update=(rec)=>{
		console.log(rec);
	}

	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg6.jpg')"}}>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">			        	<div className="hh">
				          <Link to="addDealer" style={{passing:"5px"}}>Add Dealer</Link>
				          <Link to="viewDealer" className="btn1" style={{passing:"5px"}}>View Dealer</Link>
				        </div>
			    </div>
		    </div>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Dealer Details</div>
			          	<div className="rr">
			            <table className="table">
			            	<thead>
			            		<tr>
			            			<th>Dealer ID</th>
			            			<th>Dealer Name</th>
			            			<th>Address</th>
			            			<th>Phone Number</th>
			            			<th>Email</th>
			            		</tr>
			            	</thead>
					        <tbody>
					        {
					        	darray.map((el)=>{
					        		return <tr>
				            			<td><Link to={"/updateDealer/"+el._id} style={{color:"blue"}}>{el._id}</Link></td>
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
				        <p style={{textAlign:"center",paddingTop:"20px",color:"gray"}}>Click on a Dealer ID to Update or Delete the record</p>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default ViewDealer; 