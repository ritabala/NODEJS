'use strict';
var express =require('express');
var router = express.Router();

var reg_control = require('../controller/register_controller');

 //Routes
 router.get('/', reg_control.homepage);

 router.get('/register',reg_control.register);

 router.get('/login',reg_control.login);

 router.post('/adddetail',reg_control.adddetail);

 router.post('/login_page' ,reg_control.verify_login);

 router.post('/delete/:id', reg_control.delete_user);

 router.get('/edit/:id',reg_control.show_edit_form);

 router.post('/editdelete/:id',// .delete(reg_control.delete_user)
 reg_control.save_edit_data);

 router.get('/show',reg_control.show_all_users);

 router.get('/upload_image/:id',reg_control.upload_image)
 router.post('/upload_image/:id',reg_control.save_image);

 module.exports = router;

// module.exports=function(app){
//     var reg_control = require('../controller/register_controller');

//     //Routes
//     app.route('/')
//     .get(reg_control.homepage);

//     app.route('/register')
//     .get(reg_control.register);

//     app.route('/login')
//     .get(reg_control.login);

//     app.route('/adddetail')
//     .post(reg_control.adddetail);

//     app.route('/login_page')
//     .post(reg_control.verify_login);

//     app.route('/delete/:id')
//     .post(reg_control.delete_user);

//     app.route('/edit/:id')
//     .get(reg_control.show_edit_form);

//     app.route('/editdelete/:id')
//     // .delete(reg_control.delete_user)
//     .post(reg_control.save_edit_data);

//     app.route('/show')
//     .get(reg_control.show_all_users);

//     app.route('/upload_image/:id')
//     .get(reg_control.upload_image)
//     .post(reg_control.save_image);

//     // app.route('/get_image_from_server')
//     // .post(reg_control.image_to_db);
// };