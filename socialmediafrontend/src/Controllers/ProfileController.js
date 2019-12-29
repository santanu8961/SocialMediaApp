import Axios from "axios";
import SessionController from "./SessionController";

var controller = {};

controller.saveProfileData = async (ProfileData)=>{
    var x = {};
     console.log("ProfileData",ProfileData);
     await  Axios.post("http://localhost:3000/updateuserdata",{ProfileData:ProfileData,token:SessionController.getToken()}).then(response =>{
         console.log(response.data);
            
         x = response.data;
     });
     return x;
};


export default controller;
