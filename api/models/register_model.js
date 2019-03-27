'use strict';
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema= new Schema({
    name:String,
    email:{
        type:String,
        required:'Kindly enter the mail id of the user'
    },
    phone: Number,
    pwd: String,
    img:[String]       
})

var locationSchema = new Schema({
    country: String,
    states: String
})


// module.exports=function(app){
//     mongoose.model('register_details',postSchema)
// };
// module.exports= mongoose.model('register_details',postSchema);
// module.exports=mongoose.model('location',locationSchema);

var login = mongoose.model('register_details',postSchema);
module.exports=login;

var location = mongoose.model('location_details',locationSchema);
module.exports = location;