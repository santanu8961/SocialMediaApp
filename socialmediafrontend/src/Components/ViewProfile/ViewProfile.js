import './ViewProfile.css';
import React,  { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NewsFeedController from '../../Controllers/NewsFeedController';
import controller from '../../Controllers/ProfileController';

function ViewProfile(props){
console.log(props.user)
var UserId = window.location.pathname.split("/")[2].split("&")[0];
var UserEmaiil = window.location.pathname.split("/")[2].split("&")[1]

const [FirstName , setFirstName] = useState("");
const [age , setage] = useState("");
const [LastName , setLastName] = useState("");
const [email , setemail] = useState("");
const [friends , setfriends] = useState([]);

if(UserId === props.user.id){
   return  <Redirect to="/profile"/>
}else{
    NewsFeedController.getUser(UserEmaiil).then(user=>{
        console.log(user)
       setFirstName(user.FirstName);
       setLastName(user.LastName);
       setage(user.age);
       setemail(user.email);
         setfriends(user.friends);
  })
}

// var addotdeletefriend = (addordelete)=>{
//   var x=  controller.modifyFriend(addordelete,props.user.id);
//   console.log(x);
// }

return(
    <div style={{boxShadow:"7px 2px 15px gray",padding:"20px",margin:"10px",height:"88vh"}} className="ViewProfile">
    <label>Profile Details</label>
        <h4 id="Name">{FirstName}  {LastName}</h4>
     <p> <b> Age : </b> <span id="age">{age}</span></p>
     <p> <b> Email Id : </b> <span id="email">{email}</span></p>
     <div>
        {friends.includes(props.user.id) ? <button >Unfriend</button>:<button >Add Friend </button>}
     </div>

    </div>
)
  
}

export default ViewProfile;