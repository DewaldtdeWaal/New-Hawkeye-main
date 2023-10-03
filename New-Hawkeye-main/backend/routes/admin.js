const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require('../models/user');
const gvar = require('../variables')
const checkAuth = require('../middleware/check-auth');




router.post("/add-user",

(req, res, next) => {   //creating new user


    User.findOne({userEmail: req.body.userEmail})
    .then(user =>{
        if (user){

          return res.status(401).json({
            message: "User Email Already Used!"
          });
         }
      })




  bcrypt.hash(req.body.password, 10)
  .then(hash=>{
    const user = new User({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      contactNumber: req.body.contactNumber,
      supervisorEmail: req.body.supervisorEmail,
      userEmail: req.body.userEmail,
      password: hash,
      userSites: req.body.userSites

      });

      var fullName = req.body.firstName + " " + req.body.secondName

      var message = createMessage(fullName,req.body.password , req.body.userEmail)

      sendEmail(req.body.userEmail, "Hawkeye Account creation for Testing purposes", message);



        user.save().then(result =>{
          res.status(201).json({
            message: "User added successfully",
            result: result,
          });
        })
        .catch(err=>{
          res.status(500).json({
            error:err
          });
        });
  });
  });


  router.post("/delete-user-account", (req, res) => {

    var userEmail = req.body.userEmail

    const query = {userEmail:userEmail}

    User.deleteOne(query).then(data =>{
      console.log(data)
               res.status(201).json({
                   message: "Preset Deleted successfully",
                 });
               })
               .catch(err=>{
                 res.status(500).json({
                   error:err
                 });
               });


    console.log(req.body.userEmail)


  })

  router.get("/admin/manage-accounts", (req,res)=>{      //
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.MongooseConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");


     var query = {}

       var count =0

       var firstname_Arr=[];
       var secondName_Arr=[];
       var contactNumber_Arr=[];
       var supervisorEmail_Arr=[];
       var userEmail_Arr=[];



       dbo.collection("users").find(query,{ projection: {
        _id: 0,
        firstName:1,
        secondName:1,
        contactNumber:1,
        supervisorEmail: 1,
        userEmail:1,
        password:1,
        userSites: 1
      } }).toArray(function(err, data){
     if (err) throw err;

     i = 0;

      while (i < data.length){
        firstname_Arr[i] =data[i].firstName
        secondName_Arr[i] =data[i].secondName
        contactNumber_Arr[i] =data[i].contactNumber
        userEmail_Arr[i] =data[i].userEmail
        supervisorEmail_Arr[i] =data[i].supervisorEmail

     i++;
       }
  count++;
  res.status(200).json({
     firstname_Arr,
     secondName_Arr,
     contactNumber_Arr,
     supervisorEmail_Arr,
     userEmail_Arr,
    });
   } );
  })
  }

   )

   router.get("/admin/manage-sub-accounts", (req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.MongooseConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");


     var query = {userSites:"USER_NMBM"};

       var count =0;

       var firstname_Arr=[];
       var secondName_Arr=[];
       var contactNumber_Arr=[];
       var supervisorEmail_Arr=[];
       var userEmail_Arr=[];



       dbo.collection("users").find(query,{ projection: {
        _id: 0,
        firstName:1,
        secondName:1,
        contactNumber:1,
        supervisorEmail: 1,
        userEmail:1,
        password:1,
        userSites: 1,
      } }).toArray(function(err, data){
     if (err) throw err;

     i = 0;

      while (i < data.length){
        firstname_Arr[i] =data[i].firstName
        secondName_Arr[i] =data[i].secondName
        contactNumber_Arr[i] =data[i].contactNumber
        userEmail_Arr[i] =data[i].userEmail
        supervisorEmail_Arr[i] =data[i].supervisorEmail

     i++;
       }
  count++;
  res.status(200).json({
     firstname_Arr,
     secondName_Arr,
     contactNumber_Arr,
     supervisorEmail_Arr,
     userEmail_Arr,
    });
   } );
  })
  }

   )



   router.post("/admin/manage-accounts"
   ,
   //checkAuth,
   (req, res, next) => {



    User.findOne({userEmail: req.body.userEmail})
    .then(user =>{
      fetchedUser=user;

      res.status(200).json({
       userSites: fetchedUser.userSites,
          firstName: fetchedUser.firstName,
          secondName: fetchedUser.secondName,
         userEmail: fetchedUser.userEmail,
         contactNumber: fetchedUser.contactNumber,
         supervisorEmail: fetchedUser.supervisorEmail,
       });


    });



    })



  router.post("/admin/manage-accounts/edit-account",(req, res, next) => {


    var editedUser={
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      contactNumber: req.body.contactNumber,
      userSites: req.body.userSites,
    }


          User.findOneAndUpdate({userEmail: req.body.currentEmail},editedUser).then(result =>{
            res.status(200).json({
                message: "User has been updated successfully",
              });
          })
      });

      router.post("/resetpassword",(req, res, next) => {

            bcrypt.hash(req.body.resetPassword, 10)
          .then(hash=>{
              User.findOneAndUpdate({userEmail: req.body.userEmail},{password:hash}).then(result =>{

              res.status(200).json({
                  message: "Your Password has been Reset",
                });

              })
              });
        });
  module.exports= router;

  function sendEmail(emailList,subject,Message){
    const path = require('path');

    let attachmentPath = path.join(__dirname, "/assets/HowToInstallandUseHawkeye.pdf");

          const nodemailer = require("nodemailer");
            var emailBody = Message;

            async function main() {
              let transporter = nodemailer.createTransport({
                host: "mail.macautomation.co.za",
                port: 465,
                secure: true,
                auth: {
                  user: 'dewaldt@macautomation.co.za',
                  pass: "Beanstalk2022",
                },
                tls:{
                  rejectUnauthorized:false
                }
              });

              let info = await transporter.sendMail({
                from: '"Dewaldt de Waal" <dewaldt@macautomation.co.za>',
                to: emailList,
             cc:"dewaldt@macautomation.co.za,vaughan@allelec.co.za,daniel@macautomation.co.za,warwick@macautomation.co.za",
                subject: subject,
                text: emailBody,
                attachments:[{
                  filename: "How To Install and Use Hawkeye.pdf",
                  path: attachmentPath
                }]
              });

              console.log("Message sent: %s", info.messageId);

              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }

            main().catch(console.error);
          }

          function createMessage(variableName,passwordVariable,emailVariable){



            var message ="Dear " +variableName  + "\n \nYour Hawkeye account has been created. \n\nEmail: " + emailVariable + "\n\nPassword: " + passwordVariable + "\n\nAttached is a guide on how to use Hawkeye.  Should there be an issue, you are welcome to contact me or any other account CC in the email.\n\nKind Regards";



            return message;

          }
