import React, { Component , useEffect } from 'react';
import './NewsFeed.css';
import News from './News/News';

function NewsFeed(props){
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
      window.onscroll = function() {scrollFunction()};
      function scrollFunction() {
      var  mybutton = document.getElementById("myBtn");
      console.log("scr")
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          mybutton.style.display = "block";
        } else {
          mybutton.style.display = "none";
        }
      }

var {posts,user} = props;

    console.log("(posts,user",posts,user)
var NewsArray = [];
    posts.forEach(element => {
        {console.log(element)}
       NewsArray.push(<News post={element} user={user} />) ;
    });


    return(
        <div  className="NewsFeed">


        {NewsArray.length == 0 ? <h3>Start Making Friends And Posting to keep scrolling ...!!!</h3> :NewsArray}
        <button onClick={()=>{topFunction()}} id="myBtn" title="Go to top">Top</button>
                
        </div>
    );
}


export default NewsFeed;