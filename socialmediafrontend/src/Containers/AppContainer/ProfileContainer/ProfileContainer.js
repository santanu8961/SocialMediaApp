import React, { Component } from 'react';
import SessionController from '../../../Controllers/SessionController';
import './ProfileContainer.css'
import Axios from 'axios';
import NotificationController from '../../../Controllers/NotificationController';
import Utility from '../../../Controllers/Utility';
import {LoginController} from '../../../Controllers/LoginController';
import ProfileController  from "../../../Controllers/ProfileController";

function ProfileContainer(props){
  var User = {}
  LoginController.fetchuserData(SessionController.getCookie("email")).then(
    (e)=>{
        User = e;
        console.log(User,e)
        document.getElementById("FirstName").value = User.FirstName
        document.getElementById("LastName").value = User.LastName
        document.getElementById("age").value  = User.age
        document.getElementById("email").value = User.email
    }
)
 
     

       
    

    



    console.log("Jai Shree Ram", User)

    var emailId = SessionController.getCookie("email");
    var token = SessionController.getToken();
var EditState = false;
    var editEnable = (elem)=>{
console.log("elem",elem,document.getElementById("Save"),document.getElementById("Edit"));

   

        var elems = document.forms[0].elements;
        for(var i = 0 ; i < elems.length ; i++){
            
                elems[i].disabled = EditState;
            
          
        }
      
         if(EditState) {
            elem.style.display = "none";
           document.getElementById("Edit").style.display = "inline-block"; 
         } else
            {
                elem.style.display = "none";
               document.getElementById("Save").style.display = "inline-block"; 
         }
         EditState = !EditState;
        
    }
    

     var changeHandler = (elem)=>{
            var  ElemFirstName = document.getElementById("FirstName");
            var  ElemLastName = document.getElementById("LastName");
            var  Elemage = document.getElementById("age");
            var  Elememail = document.getElementById("email");

            
               

                switch (elem) {
                    case ElemFirstName:
                        User.FirstName = elem.value
                        break;
                    case ElemLastName:
                        User.LastName = elem.value
                        break;    
                    case Elemage:
                        User.age = elem.value
                        break; 
                    case Elememail:
                        User.email = elem.value;
                        break;
                    default:
                        break;    
                }

                console.log(User)

                // props.AppState.setState({
                   
                // })
     }


    var ProfilePictureUpload = (file)=>{
        console.log(file);
        Axios.post("http://localhost:3000/saveprofilepicture",{file:file.toString(),token:SessionController.getToken()}).then(e=>{
            console.log("response +++>>>>>> Files :"+e.data)
        });

    }


    var SaveProfileData = ()=>{
        var Data = User;
        if(Data.FirstName === "" || Data.LastName === "" || Data.age === "" || Data.email === ""){
            NotificationController.createNotification("error","Please provide all the details")
        }else{
            
            // props.AppState.setState({});
            ProfileController.saveProfileData(Data).then(resp =>{
                console.log(resp)
                if(resp.nModified !== 0){
                    NotificationController.createNotification("success","User Data Updated");
                    props.AppState.setState({});

                }else{
                    NotificationController.createNotification("warning","Nothing Changed So No data Saved!");
                }
            })
        }

        


    };


   
  
    // console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",props.AppState.state)
    console.log("------------------.",props.user)
    return(
        
       <div className="ProfileContainer">
       
           <div style={{"width":"26%",left:"0",position:"absolute",padding:"10px",margin:"10px",boxShadow:"grey 4px 5px 12px"}} className="ImageDiv">
           
        <input type="file" id="imgUploader" multiple />
        <input type="button" name="submit" onClick={(e)=>{e.preventDefault(); ProfilePictureUpload(document.getElementById("imgUploader").files[0])}} id="btnSubmit" value="Upload" /> 

           </div>
           <div style={{width:"70%",right:"0",position:"absolute",margin:"10px",padding:"30px",boxShadow:"grey 4px 5px 12px"}}className="personalData">
           <p><button id="Edit" className="btn btn-default " onClick={(e)=>{  e.preventDefault();editEnable(e.target)}}>{"Edit"}</button>
           <button style={{display:"none"}} id="Save" className="btn btn-default " onClick={(e)=>{  e.preventDefault();SaveProfileData()}}>{"Save"}</button>
           </p>
           <form>
           <div  class="form-group">
    <label for="usr">First Name:</label>
     <input type="text"  class="form-control" onChange={(e)=>{changeHandler(e.target)}}  value={User.FirstName} id="FirstName" disabled/>
    </div>
    <div  class="form-group">
    <label for="usr">Last Name:</label>
     <input type="text"  class="form-control" onChange={(e)=>{changeHandler(e.target)}} value={User.LastName} id="LastName" disabled/>
    </div>
    <div  class="form-group">
    <label for="usr">Age:</label>
     <input type="text"  class="form-control" onChange={(e)=>{changeHandler(e.target)}} value={User.age} id="age" disabled/>
    </div>
    <div  class="form-group">
    <label for="usr">Email:</label>
     <input type="text"  class="form-control" onChange={(e)=>{changeHandler(e.target)}} value={User.email} id="email" disabled/>
    </div>
    </form>
           </div>
         
       </div>
    )
}


export default ProfileContainer;