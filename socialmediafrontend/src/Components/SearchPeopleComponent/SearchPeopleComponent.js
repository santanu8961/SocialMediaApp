import React, { Component } from 'react';
import Utility from '../../Controllers/Utility';

class SearchPeopleComponent extends Component{

    state = {
        SearchPeopleList:[]
    };


     SearchonChangeHandler = (val)=>{
         if(val !==""){
            document.getElementById("SearchDiv").style.display = "block";
         }else{
            document.getElementById("SearchDiv").style.display = "none";

         }  
        Utility.SearchPeople(val).then(res=>{
            this.setState({
                SearchPeopleList:res
            });
            
        })
    };
    SearchonBlurHandler = ()=>{
        setTimeout( ()=>{document.getElementById("SearchDiv").style.display = "none"} ,100)
      
    }

    SearchonFocusHandler = (val)=>{
         if(val !==""){
            document.getElementById("SearchDiv").style.display = "block";
         }else{
            document.getElementById("SearchDiv").style.display = "none";

         }  
    }
    
    // console.log("inside SearchPeopleComponent")
    render(){
        return(
            <li style={{margin:"8px 5px 8px 15px"}}><input id="search_field" style={{width:"400px"}} onFocus={(e)=>{this.SearchonFocusHandler(e.target.value)}}onBlur={ this.SearchonBlurHandler } onChange={(e)=>{this.SearchonChangeHandler(e.target.value)}} class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search People"
            aria-label="Search People"/>
            <div style={{display:"none"}}  id="SearchDiv"  >
                   <ul  id="SearchDiv_ul">
                       {this.state.SearchPeopleList}
                   </ul>
            </div>
         </li>
        )
    }
   
}

export default SearchPeopleComponent;