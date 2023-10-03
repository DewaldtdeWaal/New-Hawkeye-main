const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken") ;

const router = express.Router();
const User = require('../models/user');

const UserSettings = require('../models/userSettings');
const LoggedInUser = require('../models/loggedInUser')
const checkAuth = require('../middleware/check-auth');
const gvar = require("../variables")

//const user = require("../models/user");




  router.post("/login", (req,res,next)=>{      //logging in user
    let fetchedUser;
  let theme

     User.findOne({userEmail: req.body.userEmail})
      .then(user =>{
          if (!user){
            return res.status(401).json({
              message: "Username Invalid!"
            });
               }
        fetchedUser=user;

        return bcrypt.compare(req.body.password, user.password)
       .then(result => {
         if (!result){
          return res.status(401).json({
            message: "Password Invalid!"
          });
         }
        const token = jwt.sign(
          {userEmail: fetchedUser.userEmail,userId: fetchedUser._id,userSites:fetchedUser.userSites,firstName:fetchedUser.firstName,secomdName:fetchedUser.secondName }
        ,'secret_this_should_be_longer'//middleware auth
        ,{expiresIn:"12h"});

if (fetchedUser.userEmail!="admin@macautomation.co.za"){

  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  date = year + '-' + month + '-' + day +" "+ hour +":" + min;
  var loggedInUser = new LoggedInUser({
    userEmail: fetchedUser.userEmail,
    date:date
  })
  loggedInUser.save()
}

UserSettings.findOne({userEmail: req.body.userEmail})
.then(settings=>{
  if(!settings){
  theme = "light-theme"
  }
  else{
 theme = settings.theme
  }
  setTimeout(() => {
    res.status(200).json({
      theme: theme,
      token: token,
      expiresIn: 36000,
      userSites: fetchedUser.userSites,
      firstName: fetchedUser.firstName,
      secondName: fetchedUser.secondName,
     userEmail: fetchedUser.userEmail
    });
  }, 1500);

    })
  })
       })
       .catch(err =>{
         return res.status(401).json({
           message: "Auth Failed"
         })
       })
  });



//  router.post('/logout', function(req,res){
//     // console.log(req.body.userEmail)
//     // var userEmail = req.body.userEmail;
//     //  LoggedInUser.findOneAndRemove({userEmail:userEmail}).then({})
//         res.status(200).json({
//           message: "User Deleted",
//         })
//        })







  router.post('/edit-password', function(req,res){
   let fetchedUser
   var passwordDB;
   var currentPassword;


    User.findOne({userEmail: req.body.userEmail})
    .then(userInfo=>{
     fetchedUser = userInfo;
     passwordDB= fetchedUser.password
     currentPassword= req.body.currentPassword
     return bcrypt.compare(currentPassword,passwordDB)
    })
  .then(result=>{
        if (!result){
            return res.status(401).json({
              message: "Your current password is incorrect"
            });
            }
            bcrypt.hash(req.body.newPassword, 10)
            .then(hash=>{
            User.findOneAndUpdate({userEmail: req.body.userEmail},{password:hash}).then(result =>{
            res.status(200).json({
                message: "Your Password has been updated",


              });
            })
            .catch(err=>{
              res.status(500).json({
                error:err
              });
            });
            });

          })

  })


  router.post('/save-theme', function(req,res){

const userSettings =  new UserSettings({
  userEmail:req.body.userEmail,
  theme:req.body.theme
})
UserSettings.findOneAndUpdate({userEmail: req.body.userEmail}, {theme:req.body.theme}).then(result=>{
  if(!result)
  {
    userSettings.save()
    }
})
})


router.get("/getUsers", function (req,res) {
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");
     console.log("Here")
    var query = {};
    var routingArray=[]
    dbo.collection("users").find(query).toArray(function(err,data){
      if(err) throw err;
      var i=0;
      while (i < data.length)
          {
            routingArray[i] =data[i]
               i++;
           }
      res.status(200).json({
        routingArray
           });
    })
  })
})
  module.exports= router;
