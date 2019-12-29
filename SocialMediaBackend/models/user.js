var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var connection=mongoose.createConnection("mongodb://localhost/SocialMedia",{ useNewUrlParser: true, useUnifiedTopology: true  });


module.exports = connection.model('user', {
    FirstName: String,
    LastName:String,
    id:{type:String,default:Math.floor(100000 + Math.random() * 900000)},
    email: String,
    password: String,
    friends:[String],
    age:String,
    date:{type:Date,default:Date.now()}
},'user');


