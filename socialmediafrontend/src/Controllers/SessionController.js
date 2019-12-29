import React, { Component } from 'react'




var  SessionController =  {};

    SessionController.getCookie = (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }    



      SessionController.getToken = ()=> {
    var Browsertoken = SessionController.getCookie("token");
   return Browsertoken;
   
}


 
export default SessionController ;