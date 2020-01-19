var express = require('express');
var router = express.Router();
var user = require("../models/user");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var {LocalStorage} = require('node-localstorage');

var Feed = require("../models/Feed");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })




var localStorage = new LocalStorage("./"); 

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.post('/isloggedin',(req,res)=>{
    console.log("back :==>" +localStorage.getItem('token'));
    console.log("front = >"+req.body.token);
  if(localStorage.getItem("token") !== undefined){
   if(localStorage.getItem("token") === req.body.token){
    res.send({isAuthenticated:true}); 
   }else{
     console.log(req.body)
    res.send({isAuthenticated:false})
   }
  
  }else{
    // console.log();
  
    res.send({isAuthenticated:false})
  }
});


var isAuthenticatedRoute = (req,res,next) =>{

  // console.log("isAuthenticated",req.body);
  console.log("req.headers" ,req.headers)
  if(localStorage.getItem("token") === req.body.token){
    console.log("Authenticated User");
     next();
   }else{
    res.send({error:"Unauthorized User!"});
   }
};


router.post("/getuserdata",isAuthenticatedRoute,(req,res)=>{
  console.log(req.body.email)
  user.find({email:req.body.email},(err,doc)=>{
      console.log("----------------------->",doc);
      res.send(doc[0]);
  })
})


router.post("/saveprofilepicture",upload.single("avatar"),(req,res)=>{
  console.log("inside it");
  console.log(req.file)
  // console.log("Hello World",req.file);
    // console.log(req.body.file.toString());
    
});
router.post("/updateuserdata",isAuthenticatedRoute,(req,res)=>{
  console.log(req.body);
  var ProfileData = req.body.ProfileData;
  delete ProfileData.password;
  console.log(ProfileData);
  user.updateOne({id:ProfileData.id},{$set:{FirstName:ProfileData.FirstName,LastName:ProfileData.LastName,age:ProfileData.age,email:ProfileData.email,friends:ProfileData.friends}}).exec().then(doc=>{
    res.send(doc);
  })
})




router.post("/signupController",(req,res)=>{
  
  var data = req.body.data;
  console.log(data)
  if(data.FirstName !== '' && data.LastName !== '' && data.email !== '' && data.password !== '' && data.age !== ""){
    user.find({"email":data.email},(err,doc)=>{
      if(doc.length === 0){
        data.password = bcrypt.hashSync(data.password, salt);

            user.create([
              {
                FirstName: data.FirstName,
                LastName:data.LastName,
                email: data.email,
                password: data.password,
                age:data.age
            }],(err,doc)=>{
              console.log(doc[0]);
              if(err){
                res.send({error:"Something Went Wrong"})
              }else if(doc.length !== 0){
                res.send({success:"User Registered Successfully"});
              }
            })
      }else{
        console.log(doc);
        res.send({error:"This emailId is already registered! , try again with a different email Id."})
      }
    })

  }else{
    console.log("data didnt reieved")
  }
  
});


router.post("/fetchfeed",isAuthenticatedRoute,(req,res)=>{
  var body = req.body;
console.log("/fetchfeed",req.body);
  var friends = req.body.friendList;
  console.log("friends"+  friends)                                                                                                                      

  var  feeds = [];

Feed.find({"user.email":{$in:friends}}).sort({"Feed.createdAt":-1}).exec((err,doc)=>{
  console.log(doc);
  res.send(doc);  console.log(doc);
  // res.send(doc);

});

router.post("/searchpeople",isAuthenticatedRoute,(req,res)=>{
 console.log(req.body);
 

 var SearchQuery = {FirstName:new RegExp(req.body.FirstName)}
 if(req.body.hasOwnProperty("LastName")){
   SearchQuery.LastName = new RegExp(req.body.LastName);
 }

 console.log(SearchQuery);
 user.find(SearchQuery).exec().then(
   doc =>{
     res.send(doc);
   }
 )
});


//   console.log("feeds" + feeds);



// res.send({feeds});

  // console.log("Hi =================================++++>");

    
 

 
})



router.post("/createfeed",isAuthenticatedRoute,(req,res)=>{
  var body = req.body;

  console.log(req.body)

  var feed = {
    user:{
      name:body.user.name,
      email:body.user.email
  },
  Feed:{
      data:body.Feed.data,
      createdAt:Date.now()
       }
  }
  console.log("Hi =================================++++>");
  Feed.create([feed],(err,doc)=>{
    console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii =================================++++>");
    console.log(err)
     err ? res.send({"err":err}): null;

     res.send({"info":"Post Upoladed Successfully"});
  })
    
 

 
})

router.post("/loginController",(req,res)=>{
  function randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
} 
  var data = req.body.data;
  console.log(req.body.data);
  console.log(req.session)
  user.find({"email":data.email},(err,doc)=>{
    if(doc.length == 0){
      res.send({err:"User Not Found!"})
    }else{
      var isAuthenticated = bcrypt.compareSync(data.password,doc[0].password);

        // userDetails.isAuthenticated = isAuthenticated;
        // userDetails.email = doc[0].email;
        // console.log("login it is",userDetails)
        console.log(req.session);
        console.log(doc)
        if(isAuthenticated){
          
          var token = randomStr(26,[1,2,3,4,5,"A","a","h","o","q","r","x","z"]);
          
          localStorage.setItem("token",token);
          console.log("inside===>"+ token)
          res.send({"isAuthenticated":"true",token: token,email:doc[0].email});
        }else{
          res.send({"isAuthenticated":"false"}) ;
        }
        
       
      
    }
  })
  
});

router.get('/logout',(req,res)=>{
  console.log("logout log out log out")
  localStorage.removeItem("token");
  res.send({result:false})
 
});






module.exports = router;
