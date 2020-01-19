import React, { Component } from 'react'
import './DisplayComponent.css';

class DisplayComponent extends Component {
    state = {}
    
    render() {
        
        return (
         

             <div class="box">
             <img style={{height:"91.5vh",width:"100%"}} id="fr1" src={process.env.PUBLIC_URL+'/image/fr1.jpg'} />
        <div class="text">
            <h1>Welcome To <span style={{color:"blue",fontSize:"70px"}}><i>Utopia</i></span></h1>
        </div>
    </div>
        );
    }
}

export default DisplayComponent;