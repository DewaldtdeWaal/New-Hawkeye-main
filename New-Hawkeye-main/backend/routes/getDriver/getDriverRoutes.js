const express = require("express");
const router = express.Router();
const gvar = require('../../variables');







//GetRouteData("/getKruis12GW/values","Kruisfontein Borehole 12")

GetRouteData("/getKruis12GW/values","Kruisfontein Borehole 12" )






function GetRouteData(path, ID){
  router.get(path, function (req,res) {

    //So instead of Mongo.connect I want to use db= new Mongo().getDB
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");

      var query = {driverName: ID};
      var routingArray=[]
      dbo.collection("driverWrite").find(query).toArray(function(err,data){

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


function makeThisWork(path, ID){



}


module.exports = router;
