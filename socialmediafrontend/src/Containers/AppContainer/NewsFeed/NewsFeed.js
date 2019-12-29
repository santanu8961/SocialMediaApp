import React, { Component , useEffect } from 'react';
import './NewsFeed.css';
import News from './News/News';

function NewsFeed(props){


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
                
        </div>
    );
}


export default NewsFeed;