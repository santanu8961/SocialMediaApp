import React, { Component } from 'react'
import NavigationBar from '../../Components/NevigationBar/NavigationBar';
import NewsFeed from './NewsFeed/NewsFeed';
import StatusBar from '../../Components/StatusBar';
import NewsFeedController from '../../Controllers/NewsFeedController';
import SessionController from '../../Controllers/SessionController';


class AppContainer  extends Component {
    state = { 
            posts:[],
            user: {
                FirstName: String,
                LastName:String,
                id:String,
                email: String,
                password: String,
                friends:[String],
                age:String,
                date:Date
            }

     };


    

     UNSAFE_componentWillMount(){
        var user = {} 
        var feeds = [];
        NewsFeedController.getUser(SessionController.getCookie("email")).then(e=>{
            console.log("e",e)
            var friends =  e.friends;
            user = e;

           friends.push(e.email);
           console.log("friends",friends)
            NewsFeedController.fetchFeed(e.friends).then(f=>{
                feeds = f;
                console.log(e,f);
                this.setState({
                    posts:feeds,
                    user:user
                })
                  console.log("this.state",this.state);
            })

          
         });
        

        
     }
     componentWillUpdate(){
        console.log("Initail B =====================>");
     }
    
    render() { 
        return ( 
            <div class="AppContainer">
            <StatusBar AppContainer={this} />
               <NewsFeed posts={this.state.posts}  user={this.state.user} />
            </div>
            
         );
    }
}
 
export default AppContainer;