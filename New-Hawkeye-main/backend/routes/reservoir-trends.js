const express = require("express");
//const databaseF = require('../database-functions')12
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const gvar = require('../variables')


var MongoClient = require('mongodb').MongoClient;
var url = gvar.standardConnectionString;
var dbo
MongoClient.connect(url, function(err, db) {
  if (err) throw err;

    dbo = db.db("HawkEye");

})

router.get("/pumpstation/chelsea-ps", (req,res)=>{      //
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;


     var query = ({ date: { $gt:new Date(dateBefore) , $lte:new Date(dateNow) } });

     var CHE_PS_700_TF_arr = []
     var CHE_PS_760_MM_TF_arr = []
     var CHE_PS_900_MM_TF_arr = []
     var CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr = []
     var DateArr=[];

     dbo.collection("CHEL_TF_TREND").find(query,{ projection: { _id:0, che_ps_700_total_flow:1,che_ps_moth_760_mm_total_flow:1, che_ps_moth_900_mm_total_flow:1,che_ps_walk_drive_off_500_mm_total_flow:1, date:1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){




      var num1 = data[i+1].che_ps_700_total_flow
      var num2 =data[i].che_ps_700_total_flow
      CHE_PS_700_TF_arr[i]= (num1-num2).toFixed(2);

      var num1 = data[i+1].che_ps_moth_760_mm_total_flow
      var num2 =data[i].che_ps_moth_760_mm_total_flow
      CHE_PS_760_MM_TF_arr[i]= (num1-num2).toFixed(2);

      var num1 = data[i+1].che_ps_moth_900_mm_total_flow
      var num2 =data[i].che_ps_moth_900_mm_total_flow
      CHE_PS_900_MM_TF_arr[i]= (num1-num2).toFixed(2);


      var num1 = data[i+1].che_ps_walk_drive_off_500_mm_total_flow
      var num2 =data[i].che_ps_walk_drive_off_500_mm_total_flow
      CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr[i]= (num1-num2).toFixed(2);



      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;
     }



 res.status(200).json({
  CHE_PS_700_TF_arr,
  CHE_PS_760_MM_TF_arr,
  CHE_PS_900_MM_TF_arr,
  CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr,
  DateArr,
  });
 } );
 })



  router.post("/pumpstation/chelsea-ps", (req,res)=>{      //


//2021-08-09T22:00:00.000+00:00   1632607200000
var start = req.body.startDate
start = start + "T00:00:00.000+02:00"
var end = req.body.endDate
end = (end + "T00:00:00.000+02:00")

endTemp = new Date(end)
endTemp =endTemp.getTime()
endTemp =  (endTemp + 1 * 24 * 60 * 60 * 1000)

end = endTemp;

var query = ({ date: { $gte:new Date(start) , $lte:new Date(end) } });

var CHE_PS_700_TF_arr = []
var CHE_PS_760_MM_TF_arr = []
var CHE_PS_900_MM_TF_arr = []
var CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr = []
var DateArr=[];
     dbo.collection("CHEL_TF_TREND").find(query,{ projection: { _id:0, che_ps_700_total_flow:1,che_ps_moth_760_mm_total_flow:1, che_ps_moth_900_mm_total_flow:1,che_ps_walk_drive_off_500_mm_total_flow:1, date:1} }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){
      var num1 = data[i+1].humansdorp_off_TF
      var num2 =data[i].humansdorp_off_TF
      TotalFlowArr[i]= (num1-num2).toFixed(2)


      var num1 = data[i+1].che_ps_700_total_flow
      var num2 =data[i].che_ps_700_total_flow
      CHE_PS_700_TF_arr[i]= (num1-num2).toFixed(2);

      var num1 = data[i+1].che_ps_moth_760_mm_total_flow
      var num2 =data[i].che_ps_moth_760_mm_total_flow
      CHE_PS_760_MM_TF_arr[i]= (num1-num2).toFixed(2);

      var num1 = data[i+1].che_ps_moth_900_mm_total_flow
      var num2 =data[i].che_ps_moth_900_mm_total_flow;
      CHE_PS_900_MM_TF_arr[i]= (num1-num2).toFixed(2);

      var num1 = data[i+1].che_ps_walk_drive_off_500_mm_total_flow
      var num2 =data[i].che_ps_walk_drive_off_500_mm_total_flow
      CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr[i]= (num1-num2).toFixed(2);


      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;
     }
   //console.log(TotalFlowArr)
   res.status(200).json({
    CHE_PS_700_TF_arr,
CHE_PS_760_MM_TF_arr,
CHE_PS_900_MM_TF_arr,
CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr,
    DateArr,
    });
   })
})




 router.get("/reservoir/chelsea", (req,res)=>{      //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });
     var CHE_R_TF1100_arr = []
     var CHE_R_TF600_arr = []
     var DateArr=[];

     dbo.collection("CHEL_RES_TF").find(query,{ projection: { _id: 0, che_r_tf1100: 1, che_r_tf600:1,date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].che_r_tf1100
    var num2 =data[i].che_r_tf1100
    CHE_R_TF1100_arr[i]= (num1-num2).toFixed(2)

    var num1 = data[i+1].che_r_tf600
    var num2 =data[i].che_r_tf600
    CHE_R_TF600_arr[i]= (num1-num2).toFixed(2)





    d_arr = (data[i+1].date)
    d_arr = d_arr.toLocaleString()
          var d = d_arr.substr(0,10)
          //var t = d_arr.substr(12,8)
              d = d.split("/")
              d = d[0] +"-"+d[1] +"-"+d[2]

    DateArr[i] = d
   i++;


   }


 res.status(200).json({
  CHE_R_TF1100_arr,
  CHE_R_TF600_arr,
  DateArr,
  });
 } );
 })




 router.post("/reservoir/chelsea", (req,res)=>{      //


//2021-08-09T22:00:00.000+00:00   1632607200000
var start = req.body.startDate
start = start + "T00:00:00.000+02:00"
var end = req.body.endDate
end = (end + "T00:00:00.000+02:00")

endTemp = new Date(end)
endTemp =endTemp.getTime()
endTemp =  (endTemp + 1 * 24 * 60 * 60 * 1000)

end = endTemp;

var query = ({ date: { $gte:new Date(start) , $lte:new Date(end) } });


var CHE_R_TF1100_arr = []
var CHE_R_TF600_arr = []
 var DateArr=[];


     dbo.collection("CHEL_RES_TF").find(query,{ projection: { _id: 0, che_r_tf1100: 1, che_r_tf600:1,date: 1} }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].che_r_tf1100
      var num2 =data[i].che_r_tf1100
      CHE_R_TF1100_arr[i]= (num1-num2).toFixed(2)

      var num1 = data[i+1].che_r_tf600
      var num2 =data[i].che_r_tf600
      CHE_R_TF600_arr[i]= (num1-num2).toFixed(2)


      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;

     }

 res.status(200).json({
  CHE_R_TF1100_arr,
  CHE_R_TF600_arr,
  DateArr,
  });
 } );
 })







router.get("/reservoirs/coegakop", (req,res)=>{      //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });
    var TotalFlow_GrassRidge_Arr=[];
    var TotalFlow_Motherwell_Arr=[];
    var TotalFlow_CoegaIDZ_Arr=[];
     var DateArr=[];

     dbo.collection("NMBM_CGK_R_TotalFlow").find(query,{ projection: { _id: 0, motherwelltotalflow: 1, grassridgetotalflow:1,coegatotalflow: 1,date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].motherwelltotalflow
    var num2 =data[i].motherwelltotalflow
    TotalFlow_Motherwell_Arr[i]= (num1-num2).toFixed(2)

    var num1 = data[i+1].grassridgetotalflow
    var num2 =data[i].grassridgetotalflow
    TotalFlow_GrassRidge_Arr[i]= (num1-num2).toFixed(2)


    var num1 = data[i+1].coegatotalflow
    var num2 =data[i].coegatotalflow
    TotalFlow_CoegaIDZ_Arr[i]= (num1-num2).toFixed(2)


    d_arr = (data[i+1].date)
    d_arr = d_arr.toLocaleString()
          var d = d_arr.substr(0,10)
          //var t = d_arr.substr(12,8)
              d = d.split("/")
              d = d[0] +"-"+d[1] +"-"+d[2]

    DateArr[i] = d
   i++;


   }


 res.status(200).json({
  TotalFlow_GrassRidge_Arr,
  TotalFlow_Motherwell_Arr,
  TotalFlow_CoegaIDZ_Arr,
  DateArr,
  });
 } );
 })




 router.post("/reservoirs/coegakop", (req,res)=>{      //


//2021-08-09T22:00:00.000+00:00   1632607200000
var start = req.body.startDate
start = start + "T00:00:00.000+02:00"
var end = req.body.endDate
end = (end + "T00:00:00.000+02:00")

endTemp = new Date(end)
endTemp =endTemp.getTime()
endTemp =  (endTemp + 1 * 24 * 60 * 60 * 1000)

end = endTemp;

var query = ({ date: { $gte:new Date(start) , $lte:new Date(end) } });


var TotalFlow_GrassRidge_Arr=[];
var TotalFlow_Motherwell_Arr=[];
var TotalFlow_CoegaIDZ_Arr=[];
 var DateArr=[];


     dbo.collection("NMBM_CGK_R_TotalFlow").find(query,{ projection: { _id: 0, motherwelltotalflow: 1, grassridgetotalflow:1,coegatotalflow: 1,date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].motherwelltotalflow
      var num2 =data[i].motherwelltotalflow
      TotalFlow_Motherwell_Arr[i]= (num1-num2).toFixed(2)

      var num1 = data[i+1].grassridgetotalflow
      var num2 =data[i].grassridgetotalflow
      TotalFlow_GrassRidge_Arr[i]= (num1-num2).toFixed(2)


      var num1 = data[i+1].coegatotalflow
      var num2 =data[i].coegatotalflow
      TotalFlow_CoegaIDZ_Arr[i]= (num1-num2).toFixed(2)


      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;

     }

 res.status(200).json({
  TotalFlow_GrassRidge_Arr,
  TotalFlow_Motherwell_Arr,
  TotalFlow_CoegaIDZ_Arr,
  DateArr,
  });
 } );
 })



 module.exports= router;
