import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './NavigationBar.css';
import Utility from '../../Controllers/Utility';

function NavigationBar(props)  {




  var renderComponent = null;

  var LoggedoutMenu = (
    <div>
    <nav style={{opacity:"50%"}} className="navbar navbar-inverse">
<div className="container-fluid">
<div className="navbar-header">
<Link to="/"> <a id="home" style = {{fontFamily:"roboto"}} className="navbar-brand" href="#">ADDA HUB</a> </Link>
</div>
<ul className="nav navbar-nav">
<li className="active"><a href="#">Home</a></li>
<li><a href="#">Page 1</a></li>
<li><a href="#">Page 2</a></li>
</ul>
<ul className="nav navbar-nav navbar-right">
<li><Link to="/register"><a ><span className="glyphicon glyphicon-user"></span>Sign Up</a></Link> </li>
<li><Link to="/login"><a><span  className="glyphicon glyphicon-log-in"></span> Login</a></Link></li>

</ul>
</div>
</nav>
</div>
  );

  var LoggedInMenu  = (<div style={{zIndex:"0"}}> 
    <nav style={{opacity:"50%",height:"52px"}} className="navbar navbar-inverse">
    <div className="container-fluid">
    <div className="navbar-header">
<Link to="/"> <a id="home" style = {{fontFamily:"roboto"}} className="navbar-brand" href="#">ADDA HUB</a> </Link>
{console.log("santanu ==>" , props.userData)}
<span style={{color:"white"}}>WellCome <span id="username">{props.userData.firstName}</span> ! </span>

</div>
  <div>
  <ul  className="nav navbar-nav navbar-right">
  <li style={{margin:"8px 5px 8px 15px"}}><input id="search_field" style={{width:"400px"}} onChange={(e)=>{Utility.SearchPeople(e.target.value)}} class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search People"
    aria-label="Search People"/>
    <div style={{display:"none"}} id="SearchDiv"  >
           <ul  id="SearchDiv_ul">
             
           </ul>
    </div>
 </li><li style={{margin:"8px 10px 8px 2px"}}>

 </li>
  <li><Link to="/profile"> Profile</Link></li>
<li><a onClick={()=>{console.log("ho");props.logout()}}><span  className="glyphicon glyphicon-log-in">Logout</span> </a></li>
</ul>
  </div>
    </div>
    </nav>
  </div>);

  if(props.isAuthenticated){
    renderComponent = LoggedInMenu;
  }else{
    renderComponent = LoggedoutMenu;
  }

   
     
        return (
          renderComponent
         );
    
}
 
export default NavigationBar;