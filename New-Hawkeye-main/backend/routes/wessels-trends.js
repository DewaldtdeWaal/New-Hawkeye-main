const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const gvar = require("../variables")





router.post("/westrends/values", (req,res,next)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;

   var WES_FL_P1_FEED_A_array=[]
   var WES_FL_P1_FEED_B_array=[]
   var WES_FL_P1_FEED_C_array=[]
   var WES_FL_P2_FEED_A_array=[]
   var WES_FL_P2_FEED_B_array=[]
   var WES_FL_P2_FEED_C_array=[]
   var WES_FL_P3_FEED_A_array=[]
   var WES_FL_P3_FEED_B_array=[]
   var WES_FL_P3_FEED_C_array=[]
   var WES_FL_P4_FEED_A_array=[]
   var WES_FL_P4_FEED_B_array=[]
   var WES_FL_P4_FEED_C_array=[]
   var WES_FL_P5_FEED_A_array=[]
   var WES_FL_P5_FEED_B_array=[]
   var WES_FL_P5_FEED_C_array=[]
   var WES_FL_P6_FEED_A_array=[]
   var WES_FL_P6_FEED_B_array=[]
   var WES_FL_P6_FEED_C_array=[]
   var WES_FL_P7_FEED_A_array=[]
   var WES_FL_P7_FEED_B_array=[]
   var WES_FL_P7_FEED_C_array=[]
   var WES_FL_P8_FEED_A_array=[]
   var WES_FL_P8_FEED_B_array=[]
   var WES_FL_P8_FEED_C_array=[]
   var WES_FL_P9_FEED_A_array=[]
   var WES_FL_P9_FEED_B_array=[]
   var WES_FL_P9_FEED_C_array=[]
   var WES_FL_P10_FEED_A_array=[]
   var WES_FL_P10_FEED_B_array=[]
   var WES_FL_P10_FEED_C_array=[]
   var WES_FL_P11_FEED_A_array=[]
   var WES_FL_P11_FEED_B_array=[]
   var WES_FL_P11_FEED_C_array=[]
   var WES_FL_P12_FEED_A_array=[]
   var WES_FL_P12_FEED_B_array=[]
   var WES_FL_P12_FEED_C_array=[]
   var WES_FL_FEED_A_TOTAL_array=[]
   var WES_FL_FEED_B_TOTAL_array=[]
   var WES_FL_FEED_C_TOTAL_array=[]
   var WES_FL_SA_SILO_LEVELS_array=[]
   var WES_FL_SB_SILO_LEVELS_array=[]
   var WES_FL_SC_SILO_LEVELS_array=[]
   var WES_FL_P1_LAMBS_array=[]
   var WES_FL_P2_LAMBS_array=[]
   var WES_FL_P3_LAMBS_array=[]
   var WES_FL_P4_LAMBS_array=[]
   var WES_FL_P5_LAMBS_array=[]
   var WES_FL_P6_LAMBS_array=[]
   var WES_FL_P7_LAMBS_array=[]
   var WES_FL_P8_LAMBS_array=[]
   var WES_FL_P9_LAMBS_array=[]
   var WES_FL_P10_LAMBS_array=[]
   var WES_FL_P11_LAMBS_array=[]
   var WES_FL_P12_LAMBS_array=[]

   i = 0;
   MongoClient.connect(url, function(err, db) {
     if (err) throw err;
      var dbo = db.db("HawkEye");

if(req.body.startDate==null &&req.body.endDate==null){
var dateBefore =  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      var now =  new Date();
      dateNow =now;
      var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });
}
else{
var start = req.body.startDate
start = start + "T00:00:00.000+02:00"
var end = req.body.endDate
end = end + "T23:59:59.000+02:00"
   var query = ({ date: { $gte:new Date(start) , $lte:new Date(end) } });
}

count=0
sitesChosen = req.body.sites


if (sitesChosen==null){}else{
  for ( i = 0; i < sitesChosen.length; i++) {
  switch(sitesChosen[i]){
case "Feedlot 1 A":
  GetWessels24(WES_FL_P1_FEED_A_array,"wes1_fl_p1_feed_A",query)
  count++;
  break;

case "Feedlot 1 B":
  GetWessels24(WES_FL_P1_FEED_B_array,"wes1_fl_p1_feed_B",query)
  count++;
  break;

case "Feedlot 1 C":
  GetWessels24(WES_FL_P1_FEED_C_array,"wes1_fl_p1_feed_C",query)
  count++;
  break;

case "Feedlot 2 A":
  GetWessels24(WES_FL_P2_FEED_A_array,"wes1_fl_p2_feed_A",query)
  count++;
  break;

case "Feedlot 2 B":
  GetWessels24(WES_FL_P2_FEED_B_array,"wes1_fl_p2_feed_B",query)
  count++;
  break;

case "Feedlot 2 C":
  GetWessels24(WES_FL_P2_FEED_C_array,"wes1_fl_p2_feed_C",query)
  count++;
  break;

case "Feedlot 3 A":
  GetWessels24(WES_FL_P3_FEED_A_array,"wes1_fl_p3_feed_A",query)
  count++;
  break;

case "Feedlot 3 B":
  GetWessels24(WES_FL_P3_FEED_B_array,"wes1_fl_p3_feed_B",query)
  count++;
  break;

case "Feedlot 3 C":
  GetWessels24(WES_FL_P3_FEED_C_array,"wes1_fl_p3_feed_C",query)
  count++;
  break;

case "Feedlot 4 A":
  GetWessels24(WES_FL_P4_FEED_A_array,"wes1_fl_p4_feed_A",query)
  count++;
  break;

case "Feedlot 4 B":
  GetWessels24(WES_FL_P4_FEED_B_array,"wes1_fl_p4_feed_B",query)
  count++;
  break;

case "Feedlot 4 C":
  GetWessels24(WES_FL_P4_FEED_C_array,"wes1_fl_p4_feed_C",query)
  count++;
  break;

case "Feedlot 5 A":
  GetWessels24(WES_FL_P5_FEED_A_array,"wes1_fl_p5_feed_A",query)
  count++;
  break;

case "Feedlot 5 B":
  GetWessels24(WES_FL_P5_FEED_B_array,"wes1_fl_p5_feed_B",query)
  count++;
  break;

case "Feedlot 5 C":
  GetWessels24(WES_FL_P5_FEED_C_array,"wes1_fl_p5_feed_C",query)
  count++;
  break;

case "Feedlot 6 A":
  GetWessels24(WES_FL_P6_FEED_A_array,"wes1_fl_p6_feed_A",query)
  count++;
  break;

case "Feedlot 6 B":
  GetWessels24(WES_FL_P6_FEED_B_array,"wes1_fl_p6_feed_B",query)
  count++;
  break;

case "Feedlot 6 C":
  GetWessels24(WES_FL_P6_FEED_C_array,"wes1_fl_p6_feed_C",query)
  count++;
  break;

  case "Feedlot 7 A":
    GetWessels24(WES_FL_P7_FEED_A_array,"wes1_fl_p7_feed_A",query)
    count++;
    break;

  case "Feedlot 7 B":
    GetWessels24(WES_FL_P7_FEED_B_array,"wes1_fl_p7_feed_B",query)
    count++;
    break;

  case "Feedlot 7 C":
    GetWessels24(WES_FL_P7_FEED_C_array,"wes1_fl_p7_feed_C",query)
    count++;
    break;

  case "Feedlot 8 A":
    GetWessels24(WES_FL_P8_FEED_A_array,"wes1_fl_p8_feed_A",query)
    count++;
    break;

  case "Feedlot 8 B":
    GetWessels24(WES_FL_P8_FEED_B_array,"wes1_fl_p8_feed_B",query)
    count++;
    break;

  case "Feedlot 8 C":
    GetWessels24(WES_FL_P8_FEED_C_array,"wes1_fl_p8_feed_C",query)
    count++;
    break;

  case "Feedlot 9 A":
    GetWessels24(WES_FL_P9_FEED_A_array,"wes1_fl_p9_feed_A",query)
    count++;
    break;

  case "Feedlot 9 B":
    GetWessels24(WES_FL_P9_FEED_B_array,"wes1_fl_p9_feed_B",query)
    count++;
    break;

  case "Feedlot 9 C":
    GetWessels24(WES_FL_P9_FEED_C_array,"wes1_fl_p9_feed_C",query)
    count++;
    break;

  case "Feedlot 10 A":
    GetWessels24(WES_FL_P10_FEED_A_array,"wes1_fl_p10_feed_A",query)
    count++;
    break;

  case "Feedlot 10 B":
    GetWessels24(WES_FL_P10_FEED_B_array,"wes1_fl_p10_feed_B",query)
    count++;
    break;

  case "Feedlot 10 C":
    GetWessels24(WES_FL_P10_FEED_C_array,"wes1_fl_p10_feed_C",query)
    count++;
    break;

  case "Feedlot 11 A":
    GetWessels24(WES_FL_P11_FEED_A_array,"wes1_fl_p11_feed_A",query)
    count++;
    break;

  case "Feedlot 11 B":
    GetWessels24(WES_FL_P11_FEED_B_array,"wes1_fl_p11_feed_B",query)
    count++;
    break;

  case "Feedlot 11 C":
    GetWessels24(WES_FL_P11_FEED_C_array,"wes1_fl_p11_feed_C",query)
    count++;
    break;

  case "Feedlot 12 A":
    GetWessels24(WES_FL_P12_FEED_A_array,"wes1_fl_p12_feed_A",query)
    count++;
    break;

  case "Feedlot 12 B":
    GetWessels24(WES_FL_P12_FEED_B_array,"wes1_fl_p12_feed_B",query)
    count++;
    break;

  case "Feedlot 12 C":
    GetWessels24(WES_FL_P12_FEED_C_array,"wes1_fl_p12_feed_C",query)
    count++;
    break;

  case "Feedlot A Total":
    GetWessels24(WES_FL_FEED_A_TOTAL_array,"wes1_f1_feed_A_total",query)
    count++;
    break;

  case "Feedlot B Total":
    GetWessels24(WES_FL_FEED_B_TOTAL_array,"wes1_f1_feed_B_total",query)
    count++;
    break;

  case "Feedlot C Total":
    GetWessels24(WES_FL_FEED_C_TOTAL_array,"wes1_f1_feed_C_total",query)
    count++;
    break;

  case "Silo A Levels":
    GetWessels24(WES_FL_SA_SILO_LEVELS_array,"wes2_fl_sa_silo_levels",query)
    count++;
    break;

  case "Silo B Levels":
    GetWessels24(WES_FL_SB_SILO_LEVELS_array,"wes2_fl_sb_silo_levels",query)
    count++;
    break;

  case "Silo C Levels":
    GetWessels24(WES_FL_SC_SILO_LEVELS_array,"wes2_fl_sc_silo_levels",query)
    count++;
    break;

  case "Feedlot 1 Lambs":
    GetWessels24(WES_FL_P1_LAMBS_array,"wes2_fl_p1_lambs",query)
    count++;
    break;

  case "Feedlot 2 Lambs":
    GetWessels24(WES_FL_P2_LAMBS_array,"wes2_fl_p2_lambs",query)
    count++;
    break;

  case "Feedlot 3 Lambs":
    GetWessels24(WES_FL_P3_LAMBS_array,"wes2_fl_p3_lambs",query)
    count++;
    break;

  case "Feedlot 4 Lambs":
    GetWessels24(WES_FL_P4_LAMBS_array,"wes2_fl_p4_lambs",query)
    count++;
    break;

  case "Feedlot 5 Lambs":
    GetWessels24(WES_FL_P5_LAMBS_array,"wes2_fl_p5_lambs",query)
    count++;
    break;

  case "Feedlot 6 Lambs":
    GetWessels24(WES_FL_P6_LAMBS_array,"wes2_fl_p6_lambs",query)
    count++;
    break;

  case "Feedlot 7 Lambs":
    GetWessels24(WES_FL_P7_LAMBS_array,"wes2_fl_p7_lambs",query)
    count++;
    break;

  case "Feedlot 8 Lambs":
    GetWessels24(WES_FL_P8_LAMBS_array,"wes2_fl_p8_lambs",query)
    count++;
    break;

  case "Feedlot 9 Lambs":
    GetWessels24(WES_FL_P9_LAMBS_array,"wes2_fl_p9_lambs",query)
    count++;
    break;

  case "Feedlot 10 Lambs":
    GetWessels24(WES_FL_P10_LAMBS_array,"wes2_fl_p10_lambs",query)
    count++;
    break;

  case "Feedlot 11 Lambs":
    GetWessels24(WES_FL_P11_LAMBS_array,"wes2_fl_p11_lambs",query)
    count++;
    break;

  case "Feedlot 12 Lambs":
    GetWessels24(WES_FL_P12_LAMBS_array,"wes2_fl_p12_lambs",query)
    count++;
    break;


  }
}

var flag = false
if (count > 10){
  var seconds = 2000
}
else var seconds = 800


setTimeout(function() {


  res.status(200).json({
    WES_FL_P1_FEED_A_array,
    WES_FL_P1_FEED_B_array,
    WES_FL_P1_FEED_C_array,
    WES_FL_P2_FEED_A_array,
    WES_FL_P2_FEED_B_array,
    WES_FL_P2_FEED_C_array,
    WES_FL_P3_FEED_A_array,
    WES_FL_P3_FEED_B_array,
    WES_FL_P3_FEED_C_array,
    WES_FL_P4_FEED_A_array,
    WES_FL_P4_FEED_B_array,
    WES_FL_P4_FEED_C_array,
    WES_FL_P5_FEED_A_array,
    WES_FL_P5_FEED_B_array,
    WES_FL_P5_FEED_C_array,
    WES_FL_P6_FEED_A_array,
    WES_FL_P6_FEED_B_array,
    WES_FL_P6_FEED_C_array,
    WES_FL_P7_FEED_A_array,
    WES_FL_P7_FEED_B_array,
    WES_FL_P7_FEED_C_array,
    WES_FL_P8_FEED_A_array,
    WES_FL_P8_FEED_B_array,
    WES_FL_P8_FEED_C_array,
    WES_FL_P9_FEED_A_array,
    WES_FL_P9_FEED_B_array,
    WES_FL_P9_FEED_C_array,
    WES_FL_P10_FEED_A_array,
    WES_FL_P10_FEED_B_array,
    WES_FL_P10_FEED_C_array,
    WES_FL_P11_FEED_A_array,
    WES_FL_P11_FEED_B_array,
    WES_FL_P11_FEED_C_array,
    WES_FL_P12_FEED_A_array,
    WES_FL_P12_FEED_B_array,
    WES_FL_P12_FEED_C_array,
    WES_FL_FEED_A_TOTAL_array,
    WES_FL_FEED_B_TOTAL_array,
    WES_FL_FEED_C_TOTAL_array,
    WES_FL_SA_SILO_LEVELS_array,
    WES_FL_SB_SILO_LEVELS_array,
    WES_FL_SC_SILO_LEVELS_array,
    WES_FL_P1_LAMBS_array,
    WES_FL_P2_LAMBS_array,
    WES_FL_P3_LAMBS_array,
    WES_FL_P4_LAMBS_array,
    WES_FL_P5_LAMBS_array,
    WES_FL_P6_LAMBS_array,
    WES_FL_P7_LAMBS_array,
    WES_FL_P8_LAMBS_array,
    WES_FL_P9_LAMBS_array,
    WES_FL_P10_LAMBS_array,
    WES_FL_P11_LAMBS_array,
    WES_FL_P12_LAMBS_array,




  });

},seconds)
}



   });

  })

module.exports= router





function GetWessels24(collectionArr, field, query) {
  var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;
    var arr
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
           var dbo = db.db("HawkEye");
  dbo.collection("WES_FEED_TREND").find(query,{ projection: { _id: 0, [field] : 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
  if (err) throw err;

  i = 0;
  while (i < data.length){
    collectionArr[i] =[data[i].date,data[i][field]]
 i++;


}
})
})
}
