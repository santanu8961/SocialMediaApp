import Axios from "axios";
import NotificationController from '../Controllers/NotificationController';
import {NotificationManager}  from "react-notifications";
import SessionController from '../Controllers/SessionController';


var controls = {};


controls.signupController = async (data)=>{

    if(data.FirstName === "" || data.LastName === "" || data.password == "" || data.confirmpassword === "" || data.email === "", data.age === ""){
        NotificationController.createNotification("info","Please enter all the details")   ;
    }else {
        if(data.password !== data.confirmpassword){
        
            // NotificationManager.info("sdss");
             NotificationController.createNotification("info","password and confirm password doesn't match!")   ;
             return false;
        }else if(parseInt(data.age)<18){
            NotificationController.createNotification("info","Age must be 18 or greater than 18")   ;
            return false;

        }
        else{
            Axios.post("http://localhost:3000/signupController",{data:data}).then(res =>{
                // console.log(data.data.error);
               if(res.data.hasOwnProperty("success")){
                NotificationController.createNotification("success",res.data.success); 
                return true;
               }else if(res.data.hasOwnProperty("error")){
                   
                NotificationController.createNotification("error",res.data.error)   ;
                return false;
               }
            })
        }   
    }   
}

controls.loginController = async (data) =>{
    var flag = null;
    if(data.email === "" || data.password ==""){
        NotificationController.createNotification("info","Please enter Email and Password")   ;
        flag =  false;
    }else{
      flag = await Axios.post("http://localhost:3000/loginController",{data:data}).then(res =>{
            console.log(res.data);
            if(res.data.hasOwnProperty("isAuthenticated")){
                if(res.data.isAuthenticated=== "true"){
                    document.cookie= "token=" + res.data.token;
                    document.cookie = "email="+ res.data.email;
                    document.getElementById("home").click();
                       return true;
                }else{
                    NotificationController.createNotification("error","User Found But Wrong Password!")   ;
                    return false;
                }
    
            } 

            if(res.data.hasOwnProperty("err")){
                NotificationController.createNotification("error",res.data.err)   ;
                return  false;
    
            } 
                })
    }
    
    return flag;
}

controls.fetchuserData = async (data)=>{
    var userData = {
        firstName:"",
        lastName:"",

    }

    await Axios.post("http://localhost:3000/getuserdata",{token:SessionController.getToken(),email:data}).then(response =>{
        console.log(response.data);
        userData = response.data;
    })

    return userData;
}

controls.isLoggenIn = async ()=>{
  var result = await  Axios.post("http://localhost:3000/isloggedin",{token:SessionController.getToken()}).then((res) =>{
        console.log("sdsdds",res.data.isAuthenticated)
        return res.data.isAuthenticated;
    })

    return result;
}

controls.logout = async ()=>{

  var result = await  Axios.get("http://localhost:3000/logout").then(res => {return false});

  return result;
    
}




export var  LoginController = controls ;