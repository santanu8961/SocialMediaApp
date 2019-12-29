import Axios from "axios";
import SessionController from "./SessionController";

var NewsFeedController = {};


NewsFeedController.fetchFeed = async (friendList)=>{
    console.log({friendList});
    var data = [];
   await  Axios.post("http://localhost:3000/fetchfeed",{friendList:friendList,email:SessionController.getCookie("email"),token:SessionController.getToken()}).then((res)=>{
            console.log("feeeed ===>",res.data)

            data =  res.data;
    })
    return data;
}

NewsFeedController.getUser = async (email)=>{
    var data = {};
    await    Axios.post("http://localhost:3000/getuserdata",{email:email,token:SessionController.getToken()}).then(res=>{
        console.log("res.data ===>",res.data);
        data = res.data;
    })
    return  data;
}



export default NewsFeedController;