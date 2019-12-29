import Axios from "axios";

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
   var searchQuery = value.trim().split(" ");
   console.log(searchQuery);  
   if(searchQuery.length === 1 ){
    var doc = {FirstName:searchQuery[0]}    

   }else if(searchQuery.length === 2){
      var doc = {FirstName:searchQuery[0],LastName:searchQuery[1]}
   }
    Axios.post("",doc).then(response =>{
        console.log(response)
    })
   }  
  








export default Utility;