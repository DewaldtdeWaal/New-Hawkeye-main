const mongoose = require('mongoose');
const gvar = require('../variables')
var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;

module.exports = {Gorge_Pump_1};


  var TrendSchema=mongoose.Schema({
    Gorge_Pump_1:{type: String},
    Gorge_Pump_2:{type: String},
    Quarry_Pump_1:{type: String},
    Quarry_Pump_2:{type: String},
    date:{type: Date},
    id:{type: String}
  })







function Gorge_Pump_1(){


  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();


  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("HawkEye");

//Checking if gvar is null
if(gvar.gp1_status_previous_status == null || gvar.gp1_status_previous_status== undefined || gvar.gp2_status_previous_status == null || gvar.gp2_status_previous_status == undefined || gvar.qp1_status_previous_status == null || gvar.qp1_status_previous_status== undefined || gvar.qp2_status_previous_status == null || gvar.qp2_status_previous_status ==undefined ){
  //Checking if Collection exist
  dbo.collection("STORMS_PUMP_STATUS").findOne({id:{$all: ['Storms']}}, function(err, result) {
    //If the collection exist
    if (result != null){

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
         var dbo = db.db("HawkEye");

        var query = {id:"Storms"};

        dbo.collection("STORMS_PUMP_STATUS").find(query).sort({_id:-1}).toArray(function(err,data){

          gvar.gp1_status_previous_status= data[0].Gorge_Pump_1;
          gvar.gp2_status_previous_status= data[0].Gorge_Pump_2;
          gvar.qp1_status_previous_status= data[0].Quarry_Pump_1;
          gvar.qp2_status_previous_status= data[0].Quarry_Pump_2;

          if(gvar.gp1_status_previous_status == null || gvar.gp1_status_previous_status== undefined || gvar.gp2_status_previous_status == null || gvar.gp2_status_previous_status == undefined || gvar.qp1_status_previous_status == null || gvar.qp1_status_previous_status== undefined || gvar.qp2_status_previous_status == null || gvar.qp2_status_previous_status ==undefined ){
          if(gvar.gp1_status_previous_status !=  gvar.ps_storms_gp1_status || gvar.gp2_status_previous_status !=  gvar.ps_storms_gp2_status  || gvar.qp1_status_previous_status !=  gvar.ps_storms_qp1_status || gvar.qp2_status_previous_status !=  gvar.ps_storms_qp2_status){


              var STORMS_PUMP_STATUS = mongoose.model('STORMS_PUMP_STATUS',TrendSchema,'STORMS_PUMP_STATUS')
              var storms_PUMP_STATUS = new STORMS_PUMP_STATUS({
                date:gvar.ps_storm_UT,
                Gorge_Pump_1:gvar.ps_storms_gp1_status,
                Gorge_Pump_2:gvar.ps_storms_gp2_status,
                Quarry_Pump_1:gvar.ps_storms_qp1_status,
                Quarry_Pump_2:gvar.ps_storms_qp1_status,
                id:"Storms"

              })
              storms_PUMP_STATUS.save()


            gvar.gp1_status_previous_status = gvar.ps_storms_gp1_status
            gvar.gp2_status_previous_status = gvar.ps_storms_gp2_status
            gvar.qp1_status_previous_status = gvar.ps_storms_qp1_status
            gvar.qp2_status_previous_status = gvar.ps_storms_qp2_status

            }
          }

        })
      })
    }
    else{
      //if Collection doesn't exist create collection

      if(gvar.gp1_status_previous_status == null || gvar.gp1_status_previous_status== undefined || gvar.gp2_status_previous_status == null || gvar.gp2_status_previous_status == undefined || gvar.qp1_status_previous_status == null || gvar.qp1_status_previous_status== undefined || gvar.qp2_status_previous_status == null || gvar.qp2_status_previous_status ==undefined ){
          var STORMS_PUMP_STATUS = mongoose.model('STORMS_PUMP_STATUS',TrendSchema,'STORMS_PUMP_STATUS')
              var storms_PUMP_STATUS = new STORMS_PUMP_STATUS({
                date:gvar.ps_storm_UT,
                Gorge_Pump_1:gvar.ps_storms_gp1_status,
                Gorge_Pump_2:gvar.ps_storms_gp2_status,
                Quarry_Pump_1:gvar.ps_storms_qp1_status,
                Quarry_Pump_2:gvar.ps_storms_qp1_status,
                id:"Storms"

          })
          storms_PUMP_STATUS.save()
        }

        gvar.gp1_status_previous_status = gvar.ps_storms_gp1_status
        gvar.gp2_status_previous_status = gvar.ps_storms_gp2_status
        gvar.qp1_status_previous_status = gvar.ps_storms_qp1_status
        gvar.qp2_status_previous_status = gvar.ps_storms_qp2_status


    }
  })
}
else{  // If previous status has a value

  if(gvar.gp1_status_previous_status == null || gvar.gp1_status_previous_status== undefined || gvar.gp2_status_previous_status == null || gvar.gp2_status_previous_status == undefined || gvar.qp1_status_previous_status == null || gvar.qp1_status_previous_status== undefined || gvar.qp2_status_previous_status == null || gvar.qp2_status_previous_status ==undefined ){
  //If the 2 gvars aren't equal
  if(gvar.gp1_status_previous_status !=  gvar.ps_storms_gp1_status || gvar.gp2_status_previous_status !=  gvar.ps_storms_gp2_status  || gvar.qp1_status_previous_status !=  gvar.ps_storms_qp1_status || gvar.qp2_status_previous_status !=  gvar.ps_storms_qp2_status){


    var STORMS_PUMP_STATUS = mongoose.model('STORMS_PUMP_STATUS',TrendSchema,'STORMS_PUMP_STATUS')
    var storms_PUMP_STATUS = new STORMS_PUMP_STATUS({
      date:gvar.ps_storm_UT,
                Gorge_Pump_1:gvar.ps_storms_gp1_status,
                Gorge_Pump_2:gvar.ps_storms_gp2_status,
                Quarry_Pump_1:gvar.ps_storms_qp1_status,
                Quarry_Pump_2:gvar.ps_storms_qp1_status,
                id:"Storms"

    })
    storms_PUMP_STATUS.save()




    gvar.gp1_status_previous_status = gvar.ps_storms_gp1_status
    gvar.gp2_status_previous_status = gvar.ps_storms_gp2_status
    gvar.qp1_status_previous_status = gvar.ps_storms_qp1_status
    gvar.qp2_status_previous_status = gvar.ps_storms_qp2_status




  }



  }

}


setTimeout(Gorge_Pump_1, 60000);
  })

  }








