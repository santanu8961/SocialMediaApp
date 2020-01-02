import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import {Link} from 'react-router-dom';
import { Route,Switch } from "react-router-dom";
import RegisterComponent from './Components/LoginComponent/RegisterComponent';

import { NotificationContainer } from 'react-notifications';
import "../node_modules/react-notifications/dist/react-notifications.css";
import AppContainer from './Containers/AppContainer/AppContainer';
import NavigationBar from "./Components/NevigationBar/NavigationBar";
import DisplayComponent  from './Components/DisplayComponent/DisplayComponent';

import {LoginController} from './Controllers/LoginController';
import SessionController from './Controllers/SessionController';
import Axios from 'axios';
import { useHistory,Redirect } from "react-router-dom";
import ProfileContainer from './Containers/AppContainer/ProfileContainer/ProfileContainer';
import NewsFeedController from "./Controllers/NewsFeedController";
import ViewProfile from './Components/ViewProfile/ViewProfile';



class App extends Component {
  state = { 
    isAuthenticated:false,
    user:{
      firstName:"",
      lastName:''
    },
    ProfileData:{},
    searchList:[]

   }

  //  componentWillMount(){
  //  var pass =  LoginController.isLoggenIn()
  //     this.setState({isAuthenticated:pass});
  //     console.log(this.state);
   

     
  //  }

   LoginFunction = (details)=>{
    LoginController.loginController(details).then(e=>{
      console.log("LoginFunction"+e);
      if(e){
        LoginController.fetchuserData(SessionController.getCookie("email")).then(res =>{
          this.setState({
            isAuthenticated:e,
            user:{
              firstName:res.FirstName,
              lastName:res.LastName
            }
          })
        })
      
      }else{
        this.setState({
          isAuthenticated:e
        })
      }
      
    })
    
  }

  
   

   LogoutFunction = ()=>{
    document.getElementById("home").click();
    LoginController.logout().then(e=>{
      console.log("logout",e)
      this.setState({
        isAuthenticated:e
      });
      
     });

     
     
   }


   UNSAFE_componentWillMount(){
     LoginController.isLoggenIn().then(e=>{
       if(e){
        LoginController.fetchuserData(SessionController.getCookie("email")).then(res =>{
          console.log("aaa",res);
          this.setState({
            isAuthenticated:e,
            user:{
              firstName:res.FirstName,
              lastName:res.LastName
            }
          })
          
        })
      }else{
         
       
      this.setState({
        isAuthenticated:e
      })
    }
     
     });

     NewsFeedController.getUser(SessionController.getCookie("email")).then(e=>{
     

     this.setState({
       ProfileData:e,
       
     })
    

    
   });



    }


   

     
    
   



  render() { 
    {console.log("Rerender dom",this.state)}
    return ( 
      <div className="App">
      {console.log(this.state.user)}
       <NavigationBar logout = {this.LogoutFunction}  isAuthenticated = {this.state.isAuthenticated} userData = {this.state.user} />
      
       <div>
       <NotificationContainer />
       </div>
         <Switch>
         <Route  path="/" exact exact component={()=> this.state.isAuthenticated ? <AppContainer  /> : <DisplayComponent />}/>
        <Route  path="/login" component={()=> this.state.isAuthenticated ? null : <LoginComponent Login = {this.LoginFunction} />} />
        <Route  path="/register" exact component={()=> this.state.isAuthenticated ? null : <RegisterComponent Login = {this.LoginFunction} />}/>
        <Route path="/profile" exact component = {()=> this.state.isAuthenticated ? <ProfileContainer AppState={this} user = {this.state.ProfileData} /> : null}  />
        <Route path="/viewprofile/:userid" exact component = {()=> this.state.isAuthenticated ? <ViewProfile AppState={this} user = {this.state.ProfileData} /> : null}  />
        </Switch>
    
   </div>
     );
  }
}
 


export default App;
