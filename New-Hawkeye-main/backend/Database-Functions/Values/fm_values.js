module.exports = {GetVal_nmbm_fm_fm,GetVal_nmbm_sm_fm};
const gvar = require('../../variables')

function GetVal_nmbm_fm_fm(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_fm_fm"};


    dbo.collection("FM_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;

      gvar.fmt_FM_LOW_B=data[0].fmt_FM_LOW_B
      gvar.fmt_FM_ALM_ARMD=data[0].fmt_FM_ALM_ARMD
      gvar.fmt_FM_CHAMBER_TAMP=data[0].fmt_FM_CHAMBER_TAMP
      gvar.fmt_FM_SOLAR_PANEL_TAMP=data[0].fmt_FM_SOLAR_PANEL_TAMP
      gvar.fmt_FM_DOOR_OPENED=data[0].fmt_FM_DOOR_OPENED
      gvar.fmt_FM_PEPPER_S_ARMD=data[0].fmt_FM_PEPPER_S_ARMD
      gvar.fmt_FM_PEPPER_S_ALM=data[0].fmt_FM_PEPPER_S_ALM
      gvar.fmt_FM_PRESS=data[0].fmt_FM_PRESS

	})
  })
}
function GetVal_nmbm_sm_fm(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_sm_fm"};


    dbo.collection("FM_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;

      gvar.sm_fm_fr=data[0].sm_fm_fr
      gvar.sm_ut=data[0].sm_ut

	})
  })
}
