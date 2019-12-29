import Axios from "axios";
import React, { Component } from 'react';
import SessionController from "./SessionController";

var Utility = {};

// Time_ago F()




Utility.DiffTime = (Before)=>{
    var Now_Seconds = Date.now();
    var Before_Seconds = Date.parse(Before);

    var diff_inSeconds = (Now_Seconds-Before_Seconds)/1000;

   


    
    if(diff_inSeconds >= 60 && diff_inSeconds < 3600){
        return (
            Math.floor(diff_inSeconds/60) + "minutes ago"
        );
    }else if(diff_inSeconds >= 3600 && diff_inSeconds < 3600*24 ){
            return (
                Math.floor(diff_inSeconds/3600) + "hours ago"
            )
    }else if(diff_inSeconds >=3600*24){
        return(
            Math.floor(diff_inSeconds/(3600*24)) + "days ago"
        )
    }else if(diff_inSeconds >= 0 && diff_inSeconds < 60){
            return Math.round(diff_inSeconds)+1 +" Seconds ago"
    }
    else return "Unknown Upload time ";
        
};



Utility.copy = (mainObj) =>{
    let objCopy = {}; // objCopy will store a copy of the mainObj
    let key;
  
    for (key in mainObj) {
      objCopy[key] = mainObj[key]; // copies each property to the objCopy object
    }
    return objCopy;
  }


  Utility.SearchPeople = (value) =>{

      document.getElementById("SearchDiv_ul").innerHTML = value.length === 0 ? null :"<li id='SearchDiv_li'>Loading</li>";
   var searchQuery = value.trim().split(" ");
   console.log(searchQuery);  
   if(searchQuery.length === 1 ){
    var doc = {FirstName:searchQuery[0],token:SessionController.getToken()}    

   }else if(searchQuery.length === 2){
      var doc = {FirstName:searchQuery[0],LastName:searchQuery[1],token:SessionController.getToken()}
   }
   if(searchQuery[0] === ""){
       document.getElementById("SearchDiv").style.display = "none";
    document.getElementById("SearchDiv_ul").innerHTML = null;
   }else{
    document.getElementById("SearchDiv").style.display = "block";
   
    Axios.post("http://localhost:3000/searchpeople",doc).then(response =>{
        console.log(response.data);
        if(response.data.length === 0){
            document.getElementById("SearchDiv_ul").innerHTML = "<li class='SearchDiv_li'>No Results Found</li>"; 
        }else{
            var SearchResult = ``;
            response.data.forEach(element => {
                SearchResult += `<li id='SearchDiv_li' class='SearchDiv_li'>${element.FirstName} ${element.LastName}</li>`
            });
            document.getElementById("SearchDiv_ul").innerHTML = SearchResult;
        }
    })
}
   }  
  








export default Utility;