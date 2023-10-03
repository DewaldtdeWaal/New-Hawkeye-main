const express = require("express");
const router = express.Router();
const gvar = require('../../variables')




function GetRouteData(path, routeID){
  router.get(path, function (req,res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");

      var query = {id: routeID};
      var routingArray=[]
      dbo.collection("GRDW_CurrentVals").find(query).toArray(function(err,data){

        if(err) throw err;
        var i=0;
        while (i < data.length)
            {
              routingArray[i] =data[i]
                 i++;
             }
        res.status(200).json({
          routingArray


             });



      })

    })
  })
}
GetRouteData("/groundwater/kareedouwk1","nmbm_kark_gw")

GetRouteData("/hawkeye/groundwater/humerail/values","nmbm_hum_gw")

GetRouteData("/hawkeye/groundwater/kruisfontein/values","Kuis")



module.exports = router;
