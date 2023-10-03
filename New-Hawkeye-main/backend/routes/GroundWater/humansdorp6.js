const express = require("express");
const router = express.Router();
const gvar = require('../../variables')
const humansdorp4 = require('../../models/GroundWater/humansdorp4');

router.get('/humansdorp6/values', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

     var query = {id: "klm_hup6_gw" };
   //  var jobcard_arr=[];
     var count;
    var humansdorp4 = [];
     dbo.collection("GRDW_CurrentVals").find(query).toArray(function(err, data){

      if (err) throw err;
      var i=0;
      while (i < data.length)
          {
            humansdorp4[i] =data[i]
               i++;
           }
      res.status(200).json({
       humansdorp4


           });

})
  });


});



module.exports = router;
