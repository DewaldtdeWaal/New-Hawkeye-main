const express = require("express");
const router = express.Router();
const gvar = require('../../variables')


router.get('/chelsea/values', function (req, res) {


  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_che_ps_res"};

    var chelsea = [];
    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;
      var i=0;
      while (i < data.length)
          {
            chelsea[i] =data[i]
               i++;
           }
      res.status(200).json({
        chelsea


           });



    })

  })

});
module.exports = router;
