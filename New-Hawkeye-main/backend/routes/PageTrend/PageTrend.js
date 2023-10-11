const express = require("express");
const router = express.Router();
const gvar = require('../../variables');

var MongoClient = require('mongodb').MongoClient;
var url = gvar.standardConnectionString;
var dbo
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    dbo = db.db("HawkEye");

})
var query
router.post("/post/fourTrend", (req,res)=>{
  var TotalFlowArr=[];
  var DateArr=[];
  var tag;




  var collectionName = req.body.CollectionName
  var start = req.body.StartDate
   var end = req.body.EndDate

   let tagNames = req.body.CollectionVariable








   if (start ==null || end == null || start == undefined || end == undefined){

    var dateBefore =  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    var now =  new Date();
   var dateNow =now;
     query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });
    }
    else{
    start = start + "T00:00:00.000+02:00"
    end = end + "T23:59:59.000+02:00"
      query = ({ date: { $gte:new Date(start) , $lte:new Date(end) } });
    }




      //Do you find any bugs in this express.js for loop
      for(var i = 0; i< tagNames.length; i++){




        TotalFlowArr[i] = getDataFromDB(collectionName, tagNames[i],query,DateArr )




  }


  console.log(TotalFlowArr)

  res.status(200).json({
    TotalFlowArr,
    DateArr,
    });



})


function getDataFromDB(collectionName,tag,query, DateArr ){
  var TotalFlowArr=[];

  dbo.collection(collectionName).find(query,{ projection: { _id: 0,[tag] : 1, date: 1 } }).sort({date:1}).toArray(function(err, data){
    if(err) throw err;
    var j = 0;

   while (j < data.length-1){
    var num1 = data[j+1][tag]
    var num2 =data[j][tag]
    TotalFlowArr[j]= (num1-num2).toFixed(2)

    d_arr = (data[j+1].date)
    d_arr = d_arr.toLocaleString()
          var d = d_arr.substr(0,10)
          //var t = d_arr.substr(12,8)
              d = d.split("/")
              d = d[0] +"-"+d[1] +"-"+d[2]

    DateArr[j] = d
   j++;

   }


   return TotalFlowArr
  })
}






module.exports = router;
