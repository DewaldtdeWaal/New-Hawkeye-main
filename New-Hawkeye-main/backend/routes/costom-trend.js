const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const gvar = require('../variables')



router.post("/trends/automotive/isuzu", (req,res)=>{

  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;

  var ISUZU_OVEN1_TEMP1_arr=[];
  var ISUZU_OVEN1_TEMP2_arr=[];
  var ISUZU_OVEN2_TEMP1_arr=[];
  var ISUZU_OVEN2_TEMP2_arr=[];
  var ISUZU_OVEN1_HEAT_ECVH_TEMP_arr = []
  var ISUZU_OVEN2_HEAT_ECVH_TEMP_arr = []
  var ISUZU_OVEN1_VSD_SPEED_arr = []
  var ISUZU_OVEN2_VSD_SPEED_arr = []

  var DEMO_DATA = []



  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");





// if(req.body.startDate==null &&req.body.endDate==null){
var dateBefore24 =  new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
     var now24 =  new Date();
     dateNow24 =now24;
     var query24 = ({ date: { $gte:new Date(dateBefore24) , $lte:new Date(dateNow24) } });


    //  var dateBefore31 =  new Date(Date.now() - 31 * 24 * 60 * 60 * 1000)
    //  var dateNow31 =  new Date();
    //  var query31 = ({ date: { $gte:new Date(dateBefore31) , $lte:new Date(dateNow31) } });






count=0
sitesChosen = req.body.sites
if (sitesChosen==null){}else{



  GetIsuzu24(ISUZU_OVEN1_TEMP1_arr,sitesChosen[0], query24)
  GetIsuzu24(ISUZU_OVEN1_TEMP2_arr,sitesChosen[1], query24)
  GetIsuzu24(ISUZU_OVEN2_TEMP1_arr,sitesChosen[2], query24)
  GetIsuzu24(ISUZU_OVEN2_TEMP2_arr,sitesChosen[3], query24)
  GetIsuzu24(ISUZU_OVEN1_HEAT_ECVH_TEMP_arr,sitesChosen[4], query24)
  GetIsuzu24(ISUZU_OVEN2_HEAT_ECVH_TEMP_arr,sitesChosen[5], query24)
  GetIsuzu24(ISUZU_OVEN1_VSD_SPEED_arr,sitesChosen[6], query24)
  GetIsuzu24(ISUZU_OVEN2_VSD_SPEED_arr,sitesChosen[7], query24)
  GetDemo(DEMO_DATA, "level", query24)




}




function GetIsuzu24(collectionArr, field, query) {
     dbo.collection("ISUZU_TREND").find(query,{ projection: { _id: 0, [field] : 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;

     i = 0;
     while (i < data.length){
       collectionArr[i] =[data[i].date,data[i][field]]
    i++;


   }
  }
      )}


      function GetDemo(collectionArr, field, query) {
        dbo.collection("DEMO_TREND").find(query,{ projection: { _id: 0, [field] : 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
        if (err) throw err;

        i = 0;
        while (i < data.length){
          collectionArr[i] =[data[i].date,data[i][field]]
       i++;


      }
     }
         )}








      setTimeout(function() {
 res.status(200).json({
  ISUZU_OVEN1_TEMP1_arr,
ISUZU_OVEN1_TEMP2_arr,
ISUZU_OVEN2_TEMP1_arr,
ISUZU_OVEN2_TEMP2_arr,
ISUZU_OVEN1_HEAT_ECVH_TEMP_arr,
ISUZU_OVEN2_HEAT_ECVH_TEMP_arr,
ISUZU_OVEN1_VSD_SPEED_arr,
ISUZU_OVEN2_VSD_SPEED_arr,
 DEMO_DATA



  });

},1000);



  })


})













module.exports= router;

