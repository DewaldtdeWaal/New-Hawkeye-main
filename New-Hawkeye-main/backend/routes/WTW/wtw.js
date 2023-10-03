const express = require("express");
const router = express.Router();
const gvar = require('../../variables')





function GetRouteData(path, ID){
  router.get(path, function (req,res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");
      var query = {id: ID};
      var routingArray=[]
      dbo.collection("WTW_CurrentVals").find(query).toArray(function(err,data){

        if(err) throw err;
        var i=0;
        while (i < data.length)
            {
              routingArray[i] =data[i]
                 i++;
             }
        res.status(200).json({routingArray});
      })
    })
  })
}
GetRouteData("/stormsriver-wtw/values",'storms_wtw')
GetRouteData("/Nooitgedacht-wtw/values",'nmbm_ngt_wtw')
GetRouteData("/hawkeye/wtw/elands", "nmbm_elands_wtw")
GetRouteData("/hawkeye/wtw/st-georges", "nmbm_st_georges_wtw")
GetRouteData("/hawkeye/wtw/humansdorpwtw", "klm_hup_wtw")

module.exports = router;
