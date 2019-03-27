'use strict';

var mongoose=require('mongoose');
login= mongoose.model('register_details');

var location=mongoose.model('location_details');

// loc =mongoose.model('location');

var multer = require('multer');

var Storage = multer.diskStorage({  //create a storage which says where and how the files/images should be saved.
    destination: function(req,file, callback){
        callback(null, "public/images/");
    },
    filename: function(req,file,callback){
        callback(null,file.originalname);
    }
})

var upload = multer({   //multer object 
    storage: Storage
}).array("img",3);  //Field name and max count of images
    

exports.homepage = function(req,res){
    res.render('home');
};

exports.register = function(req,res){

    location.find({},
    (err,loc)=>{
        if (err){
            console.log(err);
            res.send('Error');
        }
        else 
        if(loc!=0){
            console.log('in register location')
            var prevLoc = '';
            var opt='';
            var arr = [];
            loc.map((l)=>{
                    opt={
                        country: l.country,
                        states : l.states
                    }
                arr.push(opt);
            })
            res.render('index',{arr:arr});
            
        } 
    })
};

exports.login = function(req,res){
    res.render('login');
};


exports.adddetail = function(req,res){
    // console.log(req.body)
    upload(req,res,function(err){
        if (err) {
            return res.send('Error in uploading image!');
        }

    login.find({'email':req.body.email},
        (err,user)=>{
            console.log('in find');
            if (user.length!= 0 && user[0].email)
            {
            res.send('<script>alert("Registration failed : User already exists");window.history.back();</script>');
            }
            else{
                console.log(req.body)
                var postData = new login(req.body);
                console.log(postData);// why img is getting stored first? in req.body order is correct

                postData.save()
                .then( result => {
                    console.log('posted data successfully')
                    res.redirect('/login');
                })
                .catch(err => {
                    res.status(400).send("Unable to save data");
                });
            }
        })
                
    })
};

exports.verify_login = function(req,res){
    console.log('in login')
    login.find({'email':req.body.email,'pwd':req.body.pwd},
    (err,user)=>{
        if (err){
            console.log(err);
            res.send('Error');
        }
        else if (user.length!=0){
            res.redirect('/show');
        }        
        else{
            res.send('<script>alert("Invalid login Credentials");window.history.back();</script>');
            console.log('invalid user');
        }
    })
};

exports.delete_user = function(req,res){
    login.remove({_id: req.params.id}, 
        function(err, docs){
            console.log('in remove')

         if(err) res.json(err);
         else   
         {
            console.log('deleted successfully') 
            res.redirect('/show');
         }
     });
};

exports.show_edit_form = function(req,res){
    login.findById({_id:req.params.id},
        (err,user)=>{
            if(err){
                res.json(err)
            }
            else {
                res.render('edit',{user:user})
            }
        })
};

exports.save_edit_data = function(req,res){
    console.log('in edit data')
    login.update({_id: req.params.id},{$set:{name:req.body.name,
                                            email:req.body.email,
                                            phone:req.body.phone,
                                            pwd:req.body.pwd}})
    .then( result => {                                            
        res.redirect('/show');
    })
    .catch(err => {                                            
        res.status(400).send("Unable to save data");
    })                                                                                 
};

exports.show_all_users = function(req,res){
    login.find({}, (err, posts) => {
        res.render('show', { posts: posts})
     });
};


exports.upload_image = function(req,res){
    login.findById({_id:req.params.id},(err,user)=>{
        res.render('image',{user:user});
    })
};

// function addImage(image,callback){
//     login.create(image,callback)
// }
exports.save_image = function(req,res,next){
    upload(req, res,function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }

        console.log(req.body) //empty as enctype/multipart is used in image
        console.log('after req body')
        // console.log(req.files)
        // res.send(req.files); //*req.files has the information regarding the file you are uploading...
                             //from the total information, i am just using the path and the imageName to store in the mongo collection(table)
      
        // var imagepath =[{}];   //imagepath contains two objects, path and the imageName 
        var image = []
        for(var i=0;i<req.files.length;i++){
            // var path = req.files[i].path;
            var originalname = req.files[i].originalname;
            // imagepath[i]={'path':path,'oiginalname':originalname};
            image[i]=originalname;

        }

        
        // console.log(image);
        login.findOneAndUpdate({_id: req.params.id},{$set:{img:image}})
        // login.findOneAndUpdate({_id: req.params.id},{$set:{img:req.body}})

            .then( result => {   
                console.log("File uploaded sucessfully!.");                                         
                res.redirect('/show');
            })
            .catch(err => {                                            
                res.status(400).send("Unable to upload image");
            })     

            // addImage(imagepath,function(err){
            //     console.log('error in uploading image')
            // })

    });
}

// exports.image_to_db = function(req,res){
//     upload.array('img',3),function(req,res){
//         console.log(req.body)
//         console.log(req.file)
//         // login(req.file.path).save(function(err,data){
//         //     if (err) res.json(err)
//         //     res.json(data);
//         // })
//         gfs = grid(db);
//         var ss = req.files;
//         for (var j=0; j<ss.length;j++){
//             var originalName = ss[j].originalname;
//             var filename = ss[j].filename;
//             var writestream = gfs.createWriteStream({
//                 filename: originalName});
//             fs.createReadStream("./uploads/" + filename).pipe(writestream);
//         }

// } 
// };