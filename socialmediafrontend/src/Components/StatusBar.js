import React, { Component } from 'react';
import SessionController from '../Controllers/SessionController';
import Axios from 'axios';
import NotificationController from '../Controllers/NotificationController';
import NewsFeedController from '../Controllers/NewsFeedController';





 function StatusBar(props){


var sendStatus = (AppState)=>{

  

  var feed = {
    user:{
      name:AppState.state.user.FirstName + " " +AppState.state.user.LastName ,
      email: SessionController.getCookie("email")
  },
  Feed:{
      data:document.getElementById("createPost") ? document.getElementById("createPost").value : null,
       },
       token:SessionController.getToken()
  }
    if(feed.Feed.data === ""){
      NotificationController.createNotification("warning","Nothing To Share!!");
    }else{
 Axios.post("http://localhost:3000/createfeed",feed).then((res)=>{
    if(res.data.hasOwnProperty("info") ){
      NotificationController.createNotification("info",res.data.info);
        document.getElementById("createPost").value = "";
       

      NewsFeedController.fetchFeed(AppState.state.user.friends).then(posts =>{
        AppState.setState({
          posts:posts
        })
      })
      return true;
    }
 })
}
}



     return(
      
       <div class=" statusBar container">
        <div class="row">
        
                      <div class="col-md-12">
    
          <div style={{marginTop:"15px"}} class="panel panel-default">
                  <div class="panel-body">
                    <textarea style={{width:"100%",height:"90px"}}   id="createPost"  type="text" class="form-control" placeholder="What are you up to?"></textarea>
                  </div>
                    <div style={{padding:"10px 15px 25px 15px"}} class="panel-footer">
                      <div class="btn-group">
                        {/* <button type="button" class="btn btn-link btn-icon"><i class="fa fa-map-marker"></i></button>
                        <button type="button" class="btn btn-link btn-icon"><i class="fa fa-users"></i></button>
                        <button type="button" class="btn btn-link btn-icon"><i class="fa fa-camera"></i></button>
                        <button type="button" class="btn btn-link btn-icon"><i class="fa fa-video-camera"></i></button> */}
                      </div>
                      
                      <div class="pull-right">
                        <button type="button" onClick={()=>{sendStatus(props.AppContainer)}} class="btn btn-success">Post</button>
                      </div>  
                    </div>
                </div>
              </div>
    
        </div>
    </div>
    
    
     )
 }


 export default StatusBar;