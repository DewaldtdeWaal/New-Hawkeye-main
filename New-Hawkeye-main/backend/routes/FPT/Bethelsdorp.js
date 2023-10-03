const express = require("express");
const router = express.Router();
const gvar = require('../../variables')

const Bethelsdorp = require('../../models/FPT/bethelsdorp');
router.get('/bethelsdorp/values', function (req, res) {


  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_beth_fpt"};

    var bethelsdorp = [];
    dbo.collection("FPT_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;
      var i=0;
      while (i < data.length)
          {
            bethelsdorp[i] =data[i]
               i++;
           }
      res.status(200).json({
        bethelsdorp


           });



    })

  })

});
module.exports = router;
