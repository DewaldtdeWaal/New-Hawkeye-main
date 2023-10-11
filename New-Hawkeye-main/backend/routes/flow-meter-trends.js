const express = require("express");
//const databaseF = require('../database-functions')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const gvar = require("../variables")


var MongoClient = require('mongodb').MongoClient;
var url = gvar.standardConnectionString;
var dbo
MongoClient.connect(url, function(err, db) {
  if (err) throw err;

    dbo = db.db("HawkEye");

})



router.get("/fptsites/fmtower", (req,res)=>{      //


     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;


     var query = ({ date: { $gt:new Date(dateBefore) , $lte:new Date(dateNow) } });

     var count =0
     var TotalFlowArr=[];
     var DateArr=[];

     dbo.collection("FM_FMT_TF").find(query,{ projection: { _id: 0, totalflow: 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].totalflow
      var num2 =data[i].totalflow
      TotalFlowArr[i]= (num1-num2).toFixed(2)

      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;
     }

 count++;

 res.status(200).json({
  TotalFlowArr,
  DateArr,
  });
 } );


}


 )

 router.post("/fptsites/fmtower", (req,res)=>{      //


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

var TotalFlowArr=[];
var DateArr=[];

     dbo.collection("FM_FMT_TF").find(query,{ projection: { _id: 0, totalflow: 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){
      var num1 = data[i+1].totalflow
      var num2 =data[i].totalflow
      TotalFlowArr[i]= (num1-num2).toFixed(2)

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
    TotalFlowArr,
    DateArr,
    });
   })
})


 router.get("/fptsites/humansdorp-offtake", (req,res)=>{      //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;


     var query = ({ date: { $gt:new Date(dateBefore) , $lte:new Date(dateNow) } });

     var count =0
     var TotalFlowArr=[];
     var DateArr=[];

     dbo.collection("HUMANSDORP_OFF_TAKE_TF").find(query,{ projection: { _id: 0, humansdorp_off_TF: 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].humansdorp_off_TF
      var num2 =data[i].humansdorp_off_TF
      TotalFlowArr[i]= (num1-num2).toFixed(2)



      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;
     }

 count++;

 res.status(200).json({
  TotalFlowArr,
  DateArr,
  });
 } );
 })

  router.post("/fptsites/humansdorp-offtake", (req,res)=>{      //


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

var TotalFlowArr=[];
var DateArr=[];

     dbo.collection("HUMANSDORP_OFF_TAKE_TF").find(query,{ projection: { _id: 0, humansdorp_off_TF: 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){
      var num1 = data[i+1].humansdorp_off_TF
      var num2 =data[i].humansdorp_off_TF
      TotalFlowArr[i]= (num1-num2).toFixed(2)

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
    TotalFlowArr,
    DateArr,
    });
   })
})


 router.get("/fptsites/jeffreys-bay-off-take", (req,res)=>{      //
  // var MongoClient = require('mongodb').MongoClient;
  // var url = gvar.standardConnectionString;
  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //    var dbo = db.db("HawkEye");
     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;


     var query = ({ date: { $gt:new Date(dateBefore) , $lte:new Date(dateNow) } });

     var count =0
     var TotalFlowArr=[];
     var DateArr=[];

     dbo.collection("JEFF_BAY_TAKE_OFF").find(query,{ projection: { _id: 0, jeff_bay_off_take_total_flow: 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].jeff_bay_off_take_total_flow
      var num2 =data[i].jeff_bay_off_take_total_flow
      TotalFlowArr[i]= (num1-num2).toFixed(2)

      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;
     }

 count++;

 res.status(200).json({
  TotalFlowArr,
  DateArr,
  });
 } );
 })



  router.post("/fptsites/jeffreys-bay-off-take", (req,res)=>{      //


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

var TotalFlowArr=[];
var DateArr=[];

     dbo.collection("JEFF_BAY_TAKE_OFF").find(query,{ projection: { _id: 0, jeff_bay_off_take_total_flow: 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){
      var num1 = data[i+1].jeff_bay_off_take_total_flow
      var num2 =data[i].jeff_bay_off_take_total_flow
      TotalFlowArr[i]= (num1-num2).toFixed(2)

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
    TotalFlowArr,
    DateArr,
    });
   })
})


 router.get("/fptsites/ons-paradys", (req,res)=>{      //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;


     var query = ({ date: { $gt:new Date(dateBefore) , $lte:new Date(dateNow) } });

     var count =0
     var TotalFlowArr=[];
     var DateArr=[];

     dbo.collection("ONS_PARA_TOTAL_FLOW").find(query,{ projection: { _id: 0, ons_para_TF: 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].ons_para_TF
      var num2 =data[i].ons_para_TF
      TotalFlowArr[i]= (num1-num2).toFixed(2)

      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;
     }

 count++;

 res.status(200).json({
  TotalFlowArr,
  DateArr,
  });
 } );
 })


  router.post("/fptsites/ons-paradys", (req,res)=>{      //


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

var TotalFlowArr=[];
var DateArr=[];

     dbo.collection("ONS_PARA_TOTAL_FLOW").find(query,{ projection: { _id: 0, ons_para_TF: 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){
      var num1 = data[i+1].ons_para_TF
      var num2 =data[i].ons_para_TF
      TotalFlowArr[i]= (num1-num2).toFixed(2)

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
    TotalFlowArr,
    DateArr,
    });
   })
})


 router.get("/fptsites/paradise-beach-st-francis-offtake", (req,res)=>{      //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;


     var query = ({ date: { $gt:new Date(dateBefore) , $lte:new Date(dateNow) } });

     var count =0
     var jb_ST_Francis_OffTake_Total_Flow_Arr=[];
     var jb_Para_Bea_TF_Arr = []
     var DateArr=[];

     dbo.collection("JB_PB_SFO_TOTAL_FLOW").find(query,{ projection: { _id: 0, jb_ST_Francis_OffTake_Total_Flow: 1,jb_Para_Bea_TF:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].jb_ST_Francis_OffTake_Total_Flow
      var num2 =data[i].jb_ST_Francis_OffTake_Total_Flow
      jb_ST_Francis_OffTake_Total_Flow_Arr[i]= (num1-num2).toFixed(2)

      var num3 = data[i+1].jb_Para_Bea_TF
      var num4 =data[i].jb_Para_Bea_TF
      jb_Para_Bea_TF_Arr[i]= (num3-num4).toFixed(2)

      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;
     }

 count++;

 res.status(200).json({
  jb_ST_Francis_OffTake_Total_Flow_Arr,
jb_Para_Bea_TF_Arr,
  DateArr,
  });
 } );
 })



  router.post("/fptsites/paradise-beach-st-francis-offtake", (req,res)=>{      //


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

var jb_ST_Francis_OffTake_Total_Flow_Arr=[];
     var jb_Para_Bea_TF_Arr = []
var DateArr=[];

     dbo.collection("JB_PB_SFO_TOTAL_FLOW").find(query,{ projection: { _id: 0, jb_ST_Francis_OffTake_Total_Flow: 1,jb_Para_Bea_TF:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){
      var num1 = data[i+1].jb_ST_Francis_OffTake_Total_Flow
      var num2 =data[i].jb_ST_Francis_OffTake_Total_Flow
      jb_ST_Francis_OffTake_Total_Flow_Arr[i]= (num1-num2).toFixed(2)

      var num3 = data[i+1].jb_Para_Bea_TF
      var num4 =data[i].jb_Para_Bea_TF
      jb_Para_Bea_TF_Arr[i]= (num3-num4).toFixed(2)

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
    jb_ST_Francis_OffTake_Total_Flow_Arr,
    jb_Para_Bea_TF_Arr,
    DateArr,
    });
   })
})


 router.post("/fptsites/fmtower", (req,res)=>{      //


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

var TotalFlowArr=[];
var DateArr=[];

     dbo.collection("FPT_IDZT_TFs").find(query,{ projection: { _id: 0, totalflow: 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){
      var num1 = data[i+1].totalflow
      var num2 =data[i].totalflow
      TotalFlowArr[i]= (num1-num2).toFixed(2)

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
    TotalFlowArr,
    DateArr,
    });
   })
})


 router.get("/fptsites/coegaidzt", (req,res)=>{      //


     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });
     var TotalFlowMWArr=[];
     var TotalFlowIDZArr=[];
     var DateArr=[];

     dbo.collection("FPT_IDZT_TFs").find(query,{ projection: { _id: 0, motherwell_TF: 1, idz_TF:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){


    var num1 = data[i+1].motherwell_TF
    var num2 =data[i].motherwell_TF
    TotalFlowMWArr[i]= (num1-num2).toFixed(2)

    var num1 = data[i+1].idz_TF
    var num2 =data[i].idz_TF
    TotalFlowIDZArr[i]= (num1-num2).toFixed(2)

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
  TotalFlowMWArr,
  TotalFlowIDZArr,
  DateArr,
  });
 } );
 })


 router.post("/fptsites/coegaidzt", (req,res)=>{      //


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

var TotalFlowMWArr=[];
var TotalFlowIDZArr=[];
var DateArr=[];

     dbo.collection("FPT_IDZT_TFs").find(query,{ projection: { _id: 0, motherwell_TF: 1,idz_TF:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){


    var num1 = data[i+1].motherwell_TF
    var num2 =data[i].motherwell_TF
    TotalFlowMWArr[i]= (num1-num2).toFixed(2)

    var num1 = data[i+1].idz_TF
    var num2 =data[i].idz_TF
    TotalFlowIDZArr[i]= (num1-num2).toFixed(2)

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
    TotalFlowMWArr,
    TotalFlowIDZArr,
    DateArr,
    });
   })
})


 router.get("/fptsites/gamtoos-bridge", (req,res)=>{      //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });
     var TotalFlow_STL_Arr=[];
     var TotalFlow_SOCO_Arr=[];
     var DateArr=[];

     dbo.collection("FPT_GT_BRG_TFs").find(query,{ projection: { _id: 0, steel_pipe_TF: 1, socoman_pipe_TF:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].steel_pipe_TF
    var num2 =data[i].steel_pipe_TF
    TotalFlow_STL_Arr[i]= (num1-num2).toFixed(2)

    var num1 = data[i+1].socoman_pipe_TF
    var num2 =data[i].socoman_pipe_TF
    TotalFlow_SOCO_Arr[i]= (num1-num2).toFixed(2)


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
  TotalFlow_STL_Arr,
  TotalFlow_SOCO_Arr,
  DateArr,
  });
 } );
 })



 router.get("/fptsites/bethelsdorp", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var TotalFlow_BETH_Arr=[];
     var DateArr=[];


     dbo.collection("FPT_BETH_TF").find(query,{ projection: { _id: 0, totalFlow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].totalFlow
    var num2 =data[i].totalFlow
    TotalFlow_BETH_Arr[i]= (num1-num2).toFixed(2)




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
  TotalFlow_BETH_Arr,
  DateArr,
  });
 } );
 })


 router.post("/fptsites/bethelsdorp", (req,res)=>{      //


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



     var TotalFlow_BETH_Arr=[];
     var DateArr=[];

     dbo.collection("FPT_BETH_TF").find(query,{ projection: { _id: 0, totalFlow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){



      var num1 = data[i+1].totalFlow
      var num2 =data[i].totalFlow
      TotalFlow_BETH_Arr[i]= (num1-num2).toFixed(2)


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
  TotalFlow_BETH_Arr,
  DateArr,
  });
 } );
 })



router.get("/fptsites/uitenhage-flow-chamber", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var TotalFlow_UIT_Arr=[];
     var DateArr=[];


     dbo.collection("FPT_UIT_FC_TF").find(query,{ projection: { _id: 0, totalFlow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].totalFlow
    var num2 =data[i].totalFlow
    TotalFlow_UIT_Arr[i]= (num1-num2).toFixed(2)




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
  TotalFlow_UIT_Arr,
  DateArr,
  });
 } );
 })



 router.post("/fptsites/uitenhage-flow-chamber", (req,res)=>{      //


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



     var TotalFlow_UIT_Arr=[];
     var DateArr=[];

     dbo.collection("FPT_UIT_FC_TF").find(query,{ projection: { _id: 0, totalFlow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){



      var num1 = data[i+1].totalFlow
      var num2 =data[i].totalFlow
      TotalFlow_UIT_Arr[i]= (num1-num2).toFixed(2)


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
  TotalFlow_UIT_Arr,
  DateArr,
  });
 } );
 })

router.get("/reservoirs/GB", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var TotalFlow_GB_FRR_Arr=[];
     var TotalFlow_GB_FRF_Arr=[];
     var DateArr=[];


     dbo.collection("BR_GB_RES_LVL_TF").find(query,{ projection: { _id: 0, gb_R_FRR:1, gb_R_FRF:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].gb_R_FRR
    var num2 =data[i].gb_R_FRR
    TotalFlow_GB_FRR_Arr[i]= (num1-num2).toFixed(2)


    var num3 = data[i+1].gb_R_FRF
    var num4 =data[i].gb_R_FRF
    TotalFlow_GB_FRF_Arr[i]= (num3-num4).toFixed(2)



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
  TotalFlow_GB_FRR_Arr,
  TotalFlow_GB_FRF_Arr,
  DateArr,
  });
 } );
 })


 router.post("/reservoirs/GB", (req,res)=>{      //


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


     var TotalFlow_GB_FRR_Arr=[];
     var TotalFlow_GB_FRF_Arr=[];
     var DateArr=[];


     dbo.collection("BR_GB_RES_LVL_TF").find(query,{ projection: { _id: 0, gb_R_FRR:1,gb_R_FRF:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){


      var num1 = data[i+1].gb_R_FRR
      var num2 =data[i].gb_R_FRR
      TotalFlow_GB_FRR_Arr[i]= (num1-num2).toFixed(2)


      var num3 = data[i+1].gb_R_FRF
      var num4 =data[i].gb_R_FRF
      TotalFlow_GB_FRF_Arr[i]= (num3-num4).toFixed(2)




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
  TotalFlow_GB_FRR_Arr,
  TotalFlow_GB_FRF_Arr,
  DateArr,
  });
 } );
 })



router.get("/reservoirs/chattytf", (req,res)=>{    //


     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var chattyTF=[];

     var DateArr=[];


     dbo.collection("CHATTY_TREND_TF").find(query,{ projection: { _id: 0, cht_tf:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].cht_tf
    var num2 =data[i].cht_tf
    chattyTF[i]= (num1-num2).toFixed(2)






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
  chattyTF,
  DateArr,
  });
 } );
 })



 router.post("/reservoirs/chattytf", (req,res)=>{      //


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


var chattyTF=[];

var DateArr=[];


     dbo.collection("CHATTY_TREND_TF").find(query,{ projection: { _id: 0, cht_tf:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){


      var num1 = data[i+1].cht_tf
      var num2 =data[i].cht_tf
      chattyTF[i]= (num1-num2).toFixed(2)




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
  chattyTF,
  DateArr,
  });
 } );
 })

router.get("/groundwater/KLM_HUP_TF_TREND", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_HD1_array=[];

     var DateArr=[];


     dbo.collection("KLM_HUP_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD1:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].total_flow_HD1
    var num2 =data[i].total_flow_HD1
    total_flow_HD1_array[i]= (num1-num2).toFixed(2)






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
  total_flow_HD1_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/KLM_HUP_TF_TREND", (req,res)=>{      //


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


var total_flow_HD1_array=[];

var DateArr=[];


    dbo.collection("KLM_HUP_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD1:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].total_flow_HD1
      var num2 =data[i].total_flow_HD1
      total_flow_HD1_array[i]= (num1-num2).toFixed(2)




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
  total_flow_HD1_array,
  DateArr,
  });
 } );
 })


router.get("/groundwater/KLM_HUP2_TF_TREND", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_HD2_array=[];

     var DateArr=[];


     dbo.collection("KLM_HUP2_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD2C:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].total_flow_HD2C
    var num2 =data[i].total_flow_HD2C
    total_flow_HD2_array[i]= (num1-num2).toFixed(2)






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
  total_flow_HD2_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/KLM_HUP2_TF_TREND", (req,res)=>{      //


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


var total_flow_HD2_array=[];

var DateArr=[];


    dbo.collection("KLM_HUP2_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD2C:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].total_flow_HD2C
    var num2 =data[i].total_flow_HD2C
    total_flow_HD2_array[i]= (num1-num2).toFixed(2)




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
  total_flow_HD2_array,
  DateArr,
  });
 } );
 })



router.get("/groundwater/KLM_HUP3_TF_TREND", (req,res)=>{    //


     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_HD3_array=[];

     var DateArr=[];


     dbo.collection("KLM_HUP3_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD3:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].total_flow_HD3
    var num2 =data[i].total_flow_HD3
    total_flow_HD3_array[i]= (num1-num2).toFixed(2)






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
  total_flow_HD3_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/KLM_HUP3_TF_TREND", (req,res)=>{      //


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


var total_flow_HD3_array=[];

var DateArr=[];


    dbo.collection("KLM_HUP3_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD3:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].total_flow_HD3
      var num2 =data[i].total_flow_HD3
      total_flow_HD3_array[i]= (num1-num2).toFixed(2)




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
  total_flow_HD3_array,
  DateArr,
  });
 } );
 })



router.get("/groundwater/KLM_HUP4_TF_TREND", (req,res)=>{    //


     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_HD4_array=[];

     var DateArr=[];


     dbo.collection("KLM_HUP4_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD4:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].total_flow_HD4
    var num2 =data[i].total_flow_HD4
    total_flow_HD4_array[i]= (num1-num2).toFixed(2)






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
  total_flow_HD4_array,
  DateArr,
  });
 } );
 })


 router.post("/groundwater/KLM_HUP4_TF_TREND", (req,res)=>{      //


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


var total_flow_HD4_array=[];

var DateArr=[];


    dbo.collection("KLM_HUP4_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD4:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].total_flow_HD4
      var num2 =data[i].total_flow_HD4
      total_flow_HD4_array[i]= (num1-num2).toFixed(2)




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
  total_flow_HD4_array,
  DateArr,
  });
 } );
 })



router.get("/groundwater/KLM_HUP6_TF_TREND", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_HD6_array=[];

     var DateArr=[];


     dbo.collection("KLM_HUP6_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD6:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].total_flow_HD6
    var num2 =data[i].total_flow_HD6
    total_flow_HD6_array[i]= (num1-num2).toFixed(2)


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
  total_flow_HD6_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/KLM_HUP6_TF_TREND", (req,res)=>{      //


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


var total_flow_HD6_array=[];

var DateArr=[];


    dbo.collection("KLM_HUP6_TF_TREND").find(query,{ projection: { _id: 0, total_flow_HD6:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].total_flow_HD6
      var num2 =data[i].total_flow_HD6
      total_flow_HD6_array[i]= (num1-num2).toFixed(2)




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
  total_flow_HD6_array,
  DateArr,
  });
 } );
 })



router.get("/groundwater/KARK_K1_TOTAL_FLOW", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });

     var total_flow_KARK_K1_array=[];

     var DateArr=[];


     dbo.collection("KARK_K1_TOTAL_FLOW").find(query,{ projection: { _id: 0, gw_kark_k1_total_flow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].gw_kark_k1_total_flow
    var num2 =data[i].gw_kark_k1_total_flow
    total_flow_KARK_K1_array[i]= (num1-num2).toFixed(2)


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
  total_flow_KARK_K1_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/KARK_K1_TOTAL_FLOW", (req,res)=>{      //

var start = req.body.startDate
start = start + "T00:00:00.000+02:00"
var end = req.body.endDate
end = (end + "T00:00:00.000+02:00")

endTemp = new Date(end)
endTemp =endTemp.getTime()
endTemp =  (endTemp + 1 * 24 * 60 * 60 * 1000)

end = endTemp;

var query = ({ date: { $gte:new Date(start) , $lte:new Date(end) } });


var total_flow_KARK_K1_array=[];

var DateArr=[];


    dbo.collection("KARK_K1_TOTAL_FLOW").find(query,{ projection: { _id: 0, gw_kark_k1_total_flow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].gw_kark_k1_total_flow
      var num2 =data[i].gw_kark_k1_total_flow
      total_flow_KARK_K1_array[i]= (num1-num2).toFixed(2)




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
  total_flow_KARK_K1_array,
  DateArr,
  });
 } );
 })


router.get("/groundwater/KARK_K2_TOTAL_FLOW", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_KARK_K2_array=[];

     var DateArr=[];


     dbo.collection("KARK_K2_TOTAL_FLOW").find(query,{ projection: { _id: 0, gw_kark_k2_total_flow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].gw_kark_k2_total_flow
    var num2 =data[i].gw_kark_k2_total_flow
    total_flow_KARK_K2_array[i]= (num1-num2).toFixed(2)


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
  total_flow_KARK_K2_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/KARK_K2_TOTAL_FLOW", (req,res)=>{      //


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


var total_flow_KARK_K2_array=[];

var DateArr=[];


    dbo.collection("KARK_K1_TOTAL_FLOW").find(query,{ projection: { _id: 0, gw_kark_k2_total_flow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].gw_kark_k2_total_flow
      var num2 =data[i].gw_kark_k2_total_flow
      total_flow_KARK_K2_array[i]= (num1-num2).toFixed(2)




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
  total_flow_KARK_K2_array,
  DateArr,
  });
 } );
 })



router.get("/groundwater/NPP_TREND", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var totalflow_array=[];

     var DateArr=[];


     dbo.collection("NPP_TF_Trend").find(query,{ projection: { _id: 0, totalflow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].totalflow
    var num2 =data[i].totalflow
    totalflow_array[i]= (num1-num2).toFixed(2)






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
  totalflow_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/NPP_TREND", (req,res)=>{      //


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


var totalflow_array=[];

var DateArr=[];


    dbo.collection("NPP_TF_Trend").find(query,{ projection: { _id: 0, totalflow:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].totalflow
      var num2 =data[i].totalflow
      totalflow_array[i]= (num1-num2).toFixed(2)




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
  totalflow_array,
  DateArr,
  });
 } );
 })



function getRoute(path, field,database){

  router.post(path, (req,res)=>{      //
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");

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


  var totalflow_array=[];

  var DateArr=[];


      dbo.collection(database).find(query,{ projection: { _id: 0, [field]:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
       if (err) throw err;
       i = 0;

       while (i < data.length-1){

        var num1 = data[i+1].totalflow
        var num2 =data[i].totalflow
        totalflow_array[i]= (num1-num2).toFixed(2)




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
    totalflow_array,
    DateArr,
    });
   } );
   })

  }
  )

}

router.get("/groundwater/KLM_KRUIS12_TF", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_1_array=[];


     var DateArr=[];


     dbo.collection("KLM_KRUIS12_TF").find(query,{ projection: { _id: 0, gw_klm_kruis12_TF:1 ,date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].gw_klm_kruis12_TF
    var num2 =data[i].gw_klm_kruis12_TF
    total_flow_1_array[i]= (num1-num2).toFixed(2)

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
  total_flow_1_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/KLM_KRUIS12_TF", (req,res)=>{      //


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


var total_flow_1_array=[];

var DateArr=[];


    dbo.collection("KLM_KRUIS12_TF").find(query,{ projection: { _id: 0, gw_klm_kruis12_TF:1, date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].gw_klm_kruis12_TF
      var num2 =data[i].gw_klm_kruis12_TF
      total_flow_1_array[i]= (num1-num2).toFixed(2)







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
  total_flow_1_array,
  DateArr,
  });
 } );
 })



router.get("/groundwater/KLM_KRUIS13_TF", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_1_array=[];

     var DateArr=[];


     dbo.collection("KLM_KRUIS13_TF").find(query,{ projection: { _id: 0, gw_klm_kruis13_TF:1,date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].gw_klm_kruis13_TF
    var num2 =data[i].gw_klm_kruis13_TF
    total_flow_1_array[i]= (num1-num2).toFixed(2)





    d_arr = (data[i+1].date)
    d_arr = d_arr.toLocaleString()
          var d = d_arr.substr(0,10)
          //var t = d_arr.substr(13,8)
              d = d.split("/")
              d = d[0] +"-"+d[1] +"-"+d[2]

    DateArr[i] = d
   i++;
   }

 res.status(200).json({
  total_flow_1_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/KLM_KRUIS13_TF", (req,res)=>{      //


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


var total_flow_1_array=[];

var DateArr=[];


    dbo.collection("KLM_KRUIS13_TF").find(query,{ projection: { _id: 0, gw_klm_kruis13_TF:1 , date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].gw_klm_kruis13_TF
      var num2 =data[i].gw_klm_kruis13_TF
      total_flow_1_array[i]= (num1-num2).toFixed(2)







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
  total_flow_1_array,
  DateArr,
  });
 } );
 })




router.get("/groundwater/KLM_KRUIS14_TF", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_1_array=[];

     var DateArr=[];


     dbo.collection("KLM_KRUIS14_TF").find(query,{ projection: { _id: 0, gw_klm_kruis14_TF:1,date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].gw_klm_kruis14_TF
    var num2 =data[i].gw_klm_kruis14_TF
    total_flow_1_array[i]= (num1-num2).toFixed(2)





    d_arr = (data[i+1].date)
    d_arr = d_arr.toLocaleString()
          var d = d_arr.substr(0,10)
          //var t = d_arr.substr(14,8)
              d = d.split("/")
              d = d[0] +"-"+d[1] +"-"+d[2]

    DateArr[i] = d
   i++;
   }

 res.status(200).json({
  total_flow_1_array,
  DateArr,
  });
 } );
 })



 router.post("/groundwater/KLM_KRUIS14_TF", (req,res)=>{      //


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


var total_flow_1_array=[];

var DateArr=[];


    dbo.collection("KLM_KRUIS14_TF").find(query,{ projection: { _id: 0, gw_klm_kruis14_TF:1 , date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].gw_klm_kruis14_TF
      var num2 =data[i].gw_klm_kruis14_TF
      total_flow_1_array[i]= (num1-num2).toFixed(2)







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
  total_flow_1_array,
  DateArr,
  });
 } );
 })



router.get("/wtw/klm_hup_inlet_tf", (req,res)=>{    //

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_1_array=[];

     var DateArr=[];


     dbo.collection("Humansdrop_wtw_tf").find(query,{ projection: { _id: 0, klm_hup_wtw_TF:1,date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].klm_hup_wtw_TF
    var num2 =data[i].klm_hup_wtw_TF
    total_flow_1_array[i]= (num1-num2).toFixed(2)





    d_arr = (data[i+1].date)
    d_arr = d_arr.toLocaleString()
          var d = d_arr.substr(0,10)
          //var t = d_arr.substr(14,8)
              d = d.split("/")
              d = d[0] +"-"+d[1] +"-"+d[2]

    DateArr[i] = d
   i++;
   }

 res.status(200).json({
  total_flow_1_array,
  DateArr,
  });
 } );
 })



 router.post("/wtw/klm_hup_inlet_tf", (req,res)=>{      //


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


var total_flow_1_array=[];

var DateArr=[];


    dbo.collection("Humansdrop_wtw_tf").find(query,{ projection: { _id: 0, klm_hup_wtw_TF:1 , date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].klm_hup_wtw_TF
      var num2 =data[i].klm_hup_wtw_TF
      total_flow_1_array[i]= (num1-num2).toFixed(2)

      console.log(total_flow_1_array)







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
  total_flow_1_array,
  DateArr,
  });
 } );
 })


router.get("/res/emeraldhill",(req,res) =>{

     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_1_array=[];

     var DateArr=[];

     dbo.collection("NMB_EMER_H_TOTAL_RES_LVL").find(query,{ projection: { _id: 0, emer_total_flow:1,date: 1 } }).sort({date:1}).toArray(function(err, data){
      if (err) throw err;
      i = 0;

      while (i < data.length-1){

     var num1 = data[i+1].emer_total_flow
     var num2 =data[i].emer_total_flow
     total_flow_1_array[i]= (num1-num2).toFixed(2)








     d_arr = (data[i+1].date)
     d_arr = d_arr.toLocaleString()
           var d = d_arr.substr(0,10)
           //var t = d_arr.substr(14,8)
               d = d.split("/")
               d = d[0] +"-"+d[1] +"-"+d[2]

     DateArr[i] = d
    i++;
    }


    console.log(total_flow_1_array)
  res.status(200).json({
   total_flow_1_array,
   DateArr,
   });
  } );

  });



router.post("/res/emeraldhill",(req,res) =>{


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


var total_flow_1_array=[];

var DateArr=[];


    dbo.collection("NMB_EMER_H_TOTAL_RES_LVL").find(query,{ projection: { _id: 0, emer_total_flow:1 , date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].emer_total_flow
      var num2 =data[i].emer_total_flow
      total_flow_1_array[i]= (num1-num2).toFixed(2)

      console.log(total_flow_1_array)







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
  total_flow_1_array,
  DateArr,
  });
 } );
 })








 module.exports= router;





 function get_Post1(){

 }

 function get_Post2(){

 }

