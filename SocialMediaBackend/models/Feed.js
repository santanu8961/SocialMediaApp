var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var connection=mongoose.createConnection("mongodb://localhost/SocialMedia",{ useNewUrlParser: true, useUnifiedTopology: true  });

var FeedSchema = {
    user:{
        name:String,
        id:String,
        email:String
    },
    Feed:{
        data:String,
        createdAt:{type:Date,default:Date.now()},
        isliked:[String],
        comments:[
            {
                name:String,
                id:String,
                comment:String,
                createdAt:Date
            }
        ]
    }
   
    
}

module.exports = connection.model('FeedSchema',FeedSchema ,'FeedSchema');




