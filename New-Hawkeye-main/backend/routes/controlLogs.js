const express = require("express");
const { cp } = require("fs/promises");
const router = express.Router();
const ControlLog = require('../models/controlLog');




router.post('/pumpstations/stanford-road/ps/control-log', function(req,res){

var date = req.body.date
var time = date.split(" ");         ////////
min = time[1].split(":")
if(min[1]<=9){
min[1] = "0"+ min[1]                // add 0 in front of minutes if =< 9
temp = min[0]+":"+min[1]
time[1] = temp
date = time[0] + " " + time[1]
}                                   ////////


  var controlLog =  new ControlLog({
    name:req.body.name,
    date:date,
    site:req.body.site,
    pump:req.body.pump,
    description:req.body.description,
  })
  controlLog.save().then(result =>{
   res.status(201).json({
      message: "Log saved successfully",
      result: result, 
    });
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    });
  });
  })







  router.post('/pumpstations/view-control-log', function(req,res){

    ControlLog.find({site: req.body.site}).then(site=>{
      var name_arr=[]
      var date_arr=[]
      var site_arr=[]
      var pump_arr=[]
      var description_arr=[]

i=0
while (i<site.length){

  name_arr[i] = (site[i].name)
  date_arr[i] = (site[i].date)
  site_arr[i] = (site[i].site)
  pump_arr[i] = (site[i].pump)
  description_arr[i] = (site[i].description)
  i++
}

      res.status(200).json({
        message:"Succesful",
        name:name_arr,
        date:date_arr,
        site: site_arr,
        pump:pump_arr,
        description:description_arr,
      });

    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });
    })


  module.exports= router;
