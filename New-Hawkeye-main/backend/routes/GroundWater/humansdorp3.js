const express = require("express");
const router = express.Router();
const gvar = require('../../variables')
const humansdorp3 = require('../../models/GroundWater/humansdorp3');

router.get('/humansdorp3/values', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

     var query = {id: "klm_hup3_gw" };
   //  var jobcard_arr=[];
     var count;
    var humansdorp3 = [];
     dbo.collection("GRDW_CurrentVals").find(query).toArray(function(err, data){

      if (err) throw err;
      var i=0;
      while (i < data.length)
          {
            humansdorp3[i] =data[i]
               i++;
           }
      res.status(200).json({
       humansdorp3


           });

})
  });


});



module.exports = router;
