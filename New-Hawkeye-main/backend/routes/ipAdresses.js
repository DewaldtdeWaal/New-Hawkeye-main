const express = require("express");
const router = express.Router();
const gvar = require("../variables")




router.get('/server-url.service/values', function (req, res) {


  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_che_ps_res"};

    var serverurl
    var guardURL
    var wsURL
    var num
    var field = [];
    dbo.collection("hawkeye_ip_adresses").find().toArray(function(err,data){
      if(err) throw err;
      var i=0;
      while (i < data.length)
          {
            field[i] =data[i]
            serverurl=data[i].serverurl
            guardURL = data[i].guardURL
            wsURL = data[i].wsURL
            num = data[i].num
               i++;
           }
           console.log(data)
      res.status(200).json({
        field,
        serverurl,
        guardURL,
        wsURL,





           });



    })

  })

});
module.exports = router;
