var express =require('express');
var app=express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
var urlEncode =  bodyParser.urlencoded({extended:false});
app.use(urlEncode);

app.use(express.static('public'));

app.set('view engine','ejs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/node_register');
login = require('./api/models/register_model'); //created model loading here

// var loc = require('./api/models/register_model')

var routes = require('./api/routes/user_router');//import route
// routes(app);
app.use('/',routes);

app.listen(5000, () => {
    console.log('Server listing on 5000');
})
