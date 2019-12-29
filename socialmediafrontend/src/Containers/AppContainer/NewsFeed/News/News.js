import React, { Component } from 'react'

import "./News.css";
import Utility from '../../../../Controllers/Utility';
function News(props){
    return(
        <div style={{boxShadow:"2px 5px 20px black",margin:"20px 0px",padding:"10px",borderRadius:"5px"}} className="News">
         
         
         <div className="userDiv">
        <h5 align="left" style={{padding:"2px 5px", color:"#1a0dab"}}> {props.user.FirstName + " " +props.user.LastName} </h5>
        <p align="left" style={{padding:"0px 5px"  ,fontSize:"12px" ,color:"gray"}}>{Utility.DiffTime(props.post.Feed.createdAt)}</p>
         </div>


         <div style={{border:"1px solid gray" , margin:"10px 5px",padding:"10px"}} className="contentDiv">
         <p align="left" style={{padding:"2px 5px"}}>  {props.post.Feed.data} </p>  
         </div>

            <div style={{border:"1px solid gray" , margin:"5px 2px",padding:"10px"}} className="likecommentDiv">
                <div  style={{width:"50%",display:"inline-block"}}  className="Like"><i onClick={(e)=>{e.target.classList.toggle("blue")}} style={{fontSize:"30px"}}  className={props.post.Feed.isliked.includes(props.user.email) ? "fa fa-thumbs-up blue" : "fa fa-thumbs-up"}></i></div>
                <div style={{width:"50%",display:"inline-block"}}  className="Comment">Comments</div>
               
            </div>
        </div>
    );
}

export default News;