import React,{useContext,useRef,useEffect,useState} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../../App';


const Home=()=>{

	const {state,dispatch} = useContext(UserContext)
    const history = useHistory()

    // useEffect(()=>{
    // 	if(!state)
    // 		history.push("/signin");
    // },[])


	return (
		<div className="hbg" style={{backgroundImage:"url('./images/bg1.jpg')"}}>
		</div>
	);
}

export default Home; 