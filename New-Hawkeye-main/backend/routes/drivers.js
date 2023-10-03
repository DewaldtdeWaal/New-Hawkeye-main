const express = require("express");
const router = express.Router();
const gvar = require('../variables');
const MongoClient = require('mongodb').MongoClient;
const Driver = require("../models/driverCreation"); // Importing the Driver model
const url = gvar.standardConnectionString;
const dbName = "HawkEye";
let db;

router.get("/drivers/values", (req,res)=>{      //
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.MongooseConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

   var query = {}

     var count =0

     var ipAddress_Arr=[];
     var driverName_Arr=[];
     var description_Arr=[];
     var siteType_Arr=[];

     dbo.collection("drivers").find(query,{ projection: {
      _id: 0,
      ipAddress:1,
      driverName:1,
      description:1,
      siteType: 1,

    } }).toArray(function(err, data){
   if (err) throw err;

   i = 0;

    while (i < data.length){
      ipAddress_Arr[i] =data[i].ipAddress
      driverName_Arr[i] =data[i].driverName
      description_Arr[i] =data[i].description
      siteType_Arr[i] =data[i].siteType

   i++;
     }
count++;
res.status(200).json({
   ipAddress_Arr,
   driverName_Arr,
   description_Arr,
   siteType_Arr,
  });
 } );
})
})








module.exports = router;






 router.post("/drivers/post-drivers",(req, res, next) => {

  console.log(req.body.driverName)

  Driver.findOne({driverName: req.body.driverName})
  .then(driver =>{
    fetchedDriver=driver;

    console.log(fetchedDriver)

    res.status(200).json({


ipAddress:fetchedDriver.ipAddress,
driverName:fetchedDriver.driverName,
description:fetchedDriver.description,
siteType:fetchedDriver.siteType,
dataArray:fetchedDriver.dataArray,
updatedStatus:true

     });


  });



  })



  router.post("/drivers/getDataArray",(req, res, next) => {


    Driver.findOne({driverName: req.body.driverName}).then(driver => {
      fetchedDriver = driver;
      console.log(fetchedDriver)
      res.status(200).json({

        dataArray:fetchedDriver.dataArray

      });
    });
  });



  router.post("/drivers/getDataValues",(req, res, next) => {


    Driver.findOne({userEmail: req.body.userEmail}).then(driver => {
      fetchedDriver = driver;

      res.status(200).json({



        dataArray:fetchedDriver.dataArray

      });

     // console.log(fetchedDriver.dataArray)
    });

  });
