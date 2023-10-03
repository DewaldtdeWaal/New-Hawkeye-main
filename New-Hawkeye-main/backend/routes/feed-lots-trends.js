const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const gvar = require('../variables')



router.post("/feedlots/wessels", (req,res)=>{

  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;

  var TF24_wes1_fl_feed_A_arr=[];
  var TF24_wes1_fl_feed_B_arr=[];
  var TF24_wes1_fl_feed_C_arr=[];

  var TF31_wes1_fl_feed_A_arr=[]
  var TF31_wes1_fl_feed_B_arr=[];
  var TF31_wes1_fl_feed_C_arr=[];

  var Silo_A_arr=[]
  var Silo_B_arr=[]
  var Silo_C_arr=[]


  var L31_wes2_fl_lambs_arr=[]



  var DateArr31=[];
  var DateSilo=[];





  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");





// if(req.body.startDate==null &&req.body.endDate==null){
var dateBefore24 =  new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
     var now24 =  new Date();
     dateNow24 =now24;
     var query24 = ({ date: { $gte:new Date(dateBefore24) , $lte:new Date(dateNow24) } });


     var dateBefore31 =  new Date(Date.now() - 31 * 24 * 60 * 60 * 1000)
     var dateNow31 =  new Date();
     var query31 = ({ date: { $gte:new Date(dateBefore31) , $lte:new Date(dateNow31) } });






count=0
sitesChosen = req.body.sites
if (sitesChosen==null){}else{



  GetWessels24(TF24_wes1_fl_feed_A_arr,sitesChosen[0], query24)
  GetWessels24(TF24_wes1_fl_feed_B_arr,sitesChosen[1], query24)

  GetWessels24(TF24_wes1_fl_feed_C_arr,sitesChosen[2], query24)
  GetWessels31(TF31_wes1_fl_feed_A_arr,sitesChosen[0], query31)
  GetWessels31(TF31_wes1_fl_feed_B_arr,sitesChosen[1], query31)
  GetWessels31(TF31_wes1_fl_feed_C_arr,sitesChosen[2], query31)
  GetWessels31(L31_wes2_fl_lambs_arr,sitesChosen[3], query31)


  GetWesselsSiloData(Silo_A_arr,sitesChosen[4], query31)
  GetWesselsSiloData(Silo_B_arr,sitesChosen[5], query31)
  GetWesselsSiloData(Silo_C_arr,sitesChosen[6], query31)

}




function GetWessels24(collectionArr, field, query) {
     dbo.collection("WES_FEED_TREND").find(query,{ projection: { _id: 0, [field] : 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;

     i = 0;
     while (i < data.length){
       collectionArr[i] =[data[i].date,data[i][field]]
    i++;


   }
  }
      )}


function GetWessels31(collectionArr, field, query) {
        dbo.collection("WES_FEED_TREND").find(query,{ projection: { _id: 0, [field] : 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
        if (err) throw err;

        i = 0;
        j=0;
        while (i < data.length-1){
          var time = (data[i].date.toString().slice(16,-41))
           if( time == "23:50"){

            collectionArr[j] =  parseInt([data[i][field]])


            DateArr31[j] = data[i].date.toLocaleString().substr(0,10)
            j++
        }
       i++;


      }
     }
         )}

function GetWesselsSiloData(collectionArr, field, query){
  dbo.collection("WES_FEED_FILLINGTOTAL").find(query,{ projection: { _id: 0, [field] : 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
    if (err) throw err;

    i = 0;

    while (i < data.length){



        collectionArr[i] =  parseInt([data[i][field]])

        DateSilo[i] = data[i].date.toLocaleString().substr(0,10)


   i++;


  }
 }
     )}




      setTimeout(function() {
 res.status(200).json({
TF24_wes1_fl_feed_A_arr,
TF24_wes1_fl_feed_B_arr,
TF24_wes1_fl_feed_C_arr,
TF31_wes1_fl_feed_A_arr,
TF31_wes1_fl_feed_B_arr,
TF31_wes1_fl_feed_C_arr,
L31_wes2_fl_lambs_arr,
Silo_A_arr,
Silo_B_arr,
Silo_C_arr,
//DateArr24,
DateArr31,
DateSilo



  });

},1000);



  })


})














module.exports= router;

