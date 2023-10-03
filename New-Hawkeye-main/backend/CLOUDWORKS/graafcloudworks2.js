//Serves as a basic template for all future sites.

module.exports = {graaf_cloudworks2 };
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
const fun = require('./cloudworksfunctions')


//Get IP address from Daniel
var ip = '127.1.1.1'
var regStart = 0;
//Amount of Memorywords you have
var regNum = 6;
var connected = 0;
var init = 0
var error = 0
var poll = 1;

var timeout = 5000;

//Input function Name

function graaf_cloudworks2(){
  error =0;
  const socket = new net.Socket()
  const GR_Damcamp_R_CLIENT = new Modbus.client.TCP(socket, 1, timeout)


  const options = {
  'host' : ip,
  'port' : 502
  };
  if(connected == 0 ){

  socket.connect(options);

  }









    socket.on("connect", function() {
      connected = 1;


      if (init == 0){
      readval1()
      init = 1;
    }




 function readval1(){

      if(poll == 0){
        GR_Damcamp_R_CLIENT.readInputRegisters(regStart, regNum).then(function(resp){
         var val = (resp.response._body.values);


          var test = [];
          var array = [];
          var finalString='';


          for (var i=0; i<8; i++) {
            test[i] = val[i + 12]
            array[i] = fun.cloudWorksLastPole(test[i])
           finalString= finalString + array[i]

            }

            gvar.damp_r_ut  = Date().slice(4,Date().length-41);
            var rawData = new ArrayBuffer(4);
            var i = new Uint16Array(rawData);
            var f = new Uint32Array(rawData);


            i[0] = val[4]; //low
            i[1] = val[5]; //high
            var dampLevel = parseFloat(f[0]).toFixed(1);


           if(dampLevel >= 0 || dampLevel<= 100){
            gvar.damp_r_level = dampLevel
          }
          gvar.damp_r_battery_level = (val[1])
          gvar.damp_r_poll_ut =  fun.convertDateTime(finalString)



            if(gvar.damp_r_level != undefined || gvar.damp_r_level!=null){

              var MongoClient = require('mongodb').MongoClient;
              var url= gvar.standardConnectionString;

              var firstValue ={
                damp_r_ut:gvar.damp_r_ut,
                damp_r_level:gvar.damp_r_level,
                damp_r_battery_level:gvar.damp_r_battery_level,
                damp_r_poll_ut:gvar.damp_r_poll_ut,
                id:"graaf"

              };

              var reservoirTrend={
                damp_r_ut:gvar.damp_r_ut,
                damp_r_level:gvar.damp_r_level,
                id:"res_overview"

              }


              MongoClient.connect(url, function(err, db){
                if (err) throw err;
                var dbo = db.db("HawkEye");



                dbo.collection("Res_CurrentVals").findOne({id:{$all: ['res_overview']}}, function(err, result) {

                  if (result!=null){}
                  else{
                    dbo.collection("Res_CurrentVals").insertOne(reservoirTrend, function() {

                    });
                  }



              })
              var myquery = { id: "res_overview"};
              var newvalues = {$set: reservoirTrend



              };
              dbo.collection("Res_CurrentVals").updateOne(myquery, newvalues, function(err, res){
                if (err) throw err;
                db.close();



               })








              })


              MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("HawkEye");
              // dbo.createCollection("GRDW_NPP", function() {

                dbo.collection("R_CurrentVals").findOne({id:{$all: ['graaf']}}, function(err, result) {

                  if (result!=null){}
                  else{
                    dbo.collection("R_CurrentVals").insertOne(firstValue, function() {

                    });
                  }



              })


              var myquery = { id: "graaf"};
              var newvalues = {$set: firstValue



              };
              dbo.collection("R_CurrentVals").updateOne(myquery, newvalues, function(err, res){
                if (err) throw err;
                db.close();


              })
              })
            }

        })



      }









           if(error == 1){

            init=0
            error= 0;
            connected = 0;
              setTimeout( graaf_cloudworks2, 10000)


           }else
           {
            poll++;
            if(poll == 4){
              poll = 0;
            }
            setTimeout(readval1, 10000);
          }
          }
      })

      socket.on("error", function(){


          init=0
          error= 0;
          connected = 0;

            setTimeout(graaf_cloudworks2, 10000)








    });


  }




//Make sure this matches the method Name






