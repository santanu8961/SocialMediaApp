import React, { Component } from 'react';
import './LoginComponent.css';
import {LoginController} from '../../Controllers/LoginController'

function LoginComponent(props){
      var LoginDetails = {
        email:"",
        password:""
      };

      function updateEmail(val){
        LoginDetails.email = val;
      }


      function updatepassword(val){
        LoginDetails.password = val;
      }


  return ( 
    <div className="wrapper">
    <form className="form-signin">       
      <h2 className="form-signin-heading">Please login</h2>
      <input type="text" className="form-control"  onChange={(e)=>{updateEmail(e.target.value)}} name="username" placeholder="Email Address" required="" autoFocus="" />
      <input type="password" className="form-control"  onChange={(e)=>{updatepassword(e.target.value)}} name="password" placeholder="Password" required=""/>      
      <label className="checkbox">
        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember me
      </label> 
      <button className="btn btn-lg btn-primary btn-block" onClick={()=>{props.Login(LoginDetails)}}  type="button">Login</button>   
    </form>
  </div>
  
          );

}


    
     
       
    

 
export default LoginComponent;