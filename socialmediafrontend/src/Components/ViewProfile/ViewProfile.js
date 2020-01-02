import './ViewProfile.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NewsFeedController from '../../Controllers/NewsFeedController';

function ViewProfile(props){

var UserId = window.location.pathname.split("/")[2].split("&")[0];
var UserEmaiil = window.location.pathname.split("/")[2].split("&")[1]
var x = null;

if(UserId === props.user.id){
   return  <Redirect to="/profile"/>
}else{
    NewsFeedController.getUser(UserEmaiil).then(user=>{
        console.log("UserPage",user)
        document.getElementById("Name").innerHTML = user.FirstName + " " + user.LastName;
        document.getElementById("age").innerHTML = user.age
        document.getElementById("email").innerHTML = user.email
  })
}

return(
    <div style={{boxShadow:"7px 2px 15px gray",padding:"20px",margin:"10px",height:"88vh"}} className="ViewProfile">
    <label>Profile Details</label>
        <h4 id="Name"></h4>
     <p> <b> Age : </b> <span id="age"></span></p>
     <p> <b> Email Id : </b> <span id="email"></span></p>
     <div>

     </div>

    </div>
)
  
}

export default ViewProfile;