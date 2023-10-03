module.exports = {GetVal_nmbm_ngt_wtw};
const gvar = require('../../variables')


function GetVal_nmbm_ngt_wtw(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_ngt_wtw"};


    dbo.collection("WTW_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;

     gvar.wtw_ngt_ut=data[0].wtw_ngt_ut
     gvar.wtw_ngt_low_lift_fr=data[0].wtw_ngt_low_lift_fr
     gvar.wtw_ngt_high_lift_fr=data[0].wtw_ngt_high_lift_fr

	})
  })
}
