const express = require("express");
const router = express.Router();
const gvar = require('../../variables')

router.get('/res-currentvals/values', function (req, res) {


  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"res_overview"};

    var routingArray = [];
    dbo.collection("Res_CurrentVals").find(query).toArray(function(err,data){

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

});

module.exports = router;
