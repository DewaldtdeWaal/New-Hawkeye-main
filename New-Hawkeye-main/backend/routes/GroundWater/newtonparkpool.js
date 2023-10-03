const express = require("express");
const router = express.Router();
const gvar = require('../../variables')
const NewtonParkPool = require('../../models/GroundWater/newtonparkpool');

router.get('/newtonpark/values', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

     var query = {id: "npp" };
   //  var jobcard_arr=[];
     var count;
    var newtonparkpool = [];
     dbo.collection("GRDW_CurrentVals").find(query).toArray(function(err, data){

      if (err) throw err;
      var i=0;
      while (i < data.length)
          {
            newtonparkpool[i] =data[i]
               i++;
           }
      res.status(200).json({
       newtonparkpool


           });

})
  });


});



module.exports = router;
