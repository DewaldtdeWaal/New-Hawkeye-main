const express = require("express");
const gvar = require('../variables')
const router = express.Router();
const demoSiteControl = require('../models/demoSiteControl')

const  mb_control = require('../MODBUS_CONTROL/demo_control')



router.post('/demo/demoOnOFF', function(req,res, next){
  var light_control = req.body.onOffSwitch

  console.log(light_control)


  demoSiteControl.findOneAndUpdate({id: 1},{light_control:light_control} ).then(result =>{
  console.log(light_control)
  Demo_ControlWord(light_control)
          res.status(200).json({
            message: " light_control Saved successfully",
          });
        })


        .catch(err=>{
          res.status(500).json({
            error:err
          });
        });
      });

      module.exports= router;


      GetRouteData("/demoControl/GetRoute",1)
      GetRouteDatas("/DemoSiteValues","demo-site" )


      function GetRouteData(path, ID){
        router.get(path, function (req,res) {
          var MongoClient = require('mongodb').MongoClient;
          var url = gvar.standardConnectionString;
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
             var dbo = db.db("HawkEye");

            var query = {id: ID};
            var controlArray=[]
            dbo.collection("demo-site-controls").find(query).toArray(function(err,data){

              if(err) throw err;
              var i=0;
              while (i < data.length)
                  {
                    controlArray[i] =data[i]
                       i++;
                   }
              res.status(200).json({
                controlArray


                   });



            })

          })
        })
      }

      function GetRouteDatas(path, ID){
        router.get(path, function (req,res) {
          var MongoClient = require('mongodb').MongoClient;
          var url = gvar.standardConnectionString;
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
             var dbo = db.db("HawkEye");

            var query = {id: ID};
            var controlArray=[]
            dbo.collection("demo-site").find(query).toArray(function(err,data){

              if(err) throw err;
              var i=0;
              while (i < data.length)
                  {
                    controlArray[i] =data[i]
                       i++;
                   }
              res.status(200).json({
                controlArray


                   });



            })

          })
        })
      }


      function Demo_ControlWord(value){
        var ip = gvar.mbusIP +'.4'
        var tag = "demo_success"
        var mws = 103        //memory word start

        gvar.demo_mbw_succ = 1

        var mars = 0;

        gvar.lightSending =  value

        if(gvar.lightSending == 1){
          mars = mars + 1;
        }

        if(mars != gvar.prevMars && gvar.demo_mbw_succ){

          gvar.demo_mbw_succ = 0;
          gvar.prevMars = mars;

          mb_control.writeVal(mars,ip, tag,mws )
        }


            }




