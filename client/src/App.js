import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';


import Nav from './components/Nav';
import Home from './components/screens/Home';

import AddDealer from './components/screens/AddDealer';
import ViewDealer from './components/screens/ViewDealer';
import UpdateDealer from './components/screens/UpdateDealer';

import AddMedicine from './components/screens/AddMedicine';
import ViewMedicine from './components/screens/ViewMedicine';
import UpdateMedicine from './components/screens/UpdateMedicine';

import AddEmployee from './components/screens/AddEmployee';
import ViewEmployee from './components/screens/ViewEmployee';
import UpdateEmployee from './components/screens/UpdateEmployee';

import AddCustomer from './components/screens/AddCustomer';
import ViewCustomer from './components/screens/ViewCustomer';
import UpdateCustomer from './components/screens/UpdateCustomer';

import AddPurchase from './components/screens/AddPurchase';
import ViewPurchase from './components/screens/ViewPurchase';
import UpdatePurchase from './components/screens/UpdatePurchase';

import Login from './components/screens/Login';
import Signup from './components/screens/Signup';


import {reducer,initialState} from './reducers/userReducer';
export const UserContext = createContext();




const Routing = ()=>{
    const history=useHistory();
    const {state,dispatch}=useContext(UserContext)

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:"USER",payload:user})
        }
        else
            history.push('/signin');
    },[])


      return(
        <Switch>
            <Route exact path="/" component={Home}/>

            <Route exact path="/addDealer" component={AddDealer}/>
            <Route exact path="/viewDealer" component={ViewDealer}/>
            <Route exact path="/updateDealer/:id" component={UpdateDealer}/>

            <Route exact path="/addMedicine" component={AddMedicine}/>
            <Route exact path="/viewMedicine" component={ViewMedicine}/>
            <Route exact path="/updateMedicine/:id" component={UpdateMedicine}/>

            <Route exact path="/addEmployee" component={AddEmployee}/>
            <Route exact path="/viewEmployee" component={ViewEmployee}/>
            <Route exact path="/updateEmployee/:id" component={UpdateEmployee}/>

            <Route exact path="/addCustomer" component={AddCustomer}/>
            <Route exact path="/viewCustomer" component={ViewCustomer}/>
            <Route exact path="/updateCustomer/:id" component={UpdateCustomer}/>

            <Route exact path="/addPurchase" component={AddPurchase}/>
            <Route exact path="/viewPurchase" component={ViewPurchase}/>
            <Route exact path="/updatePurchase/:id" component={UpdatePurchase}/>

            <Route exact path="/signin" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
        </Switch>
  )
}



function App() {
    const [state,dispatch] = useReducer(reducer,initialState)
    return (
    <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
          <Nav/>
          <Routing/>
        </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;