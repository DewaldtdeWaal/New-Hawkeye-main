module.exports = {GetVal_nmbm_cidzt_fpt,GetVal_nmbm_uit_fc_fpt,GetVal_nmbm_gt_brg_fpt};
const gvar = require('../../variables')

function GetVal_nmbm_cidzt_fpt(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_cidzt_fpt"};


    dbo.collection("FPT_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;

      gvar.fpt_cidzt_ut=data[0].fpt_cidzt_ut
      gvar.fpt_cidzt_surge_arrester_fault=data[0].fpt_cidzt_surge_arrester_fault
      gvar.fpt_cidzt_panel_door=data[0].fpt_cidzt_panel_door
      gvar.fpt_cidzt_battery=data[0].fpt_cidzt_battery
      gvar.fpt_cidzt_charger_fault=data[0].fpt_cidzt_chargerKo_fault
      gvar.fpt_cidzt_idz_fm_s=data[0].fpt_cidzt_idz_fm_s
      gvar.fpt_cidzt_mw_fm_s=data[0].fpt_cidzt_mw_fm_s
      gvar.fpt_cidzt_idz_fr=data[0].fpt_cidzt_idz_fr
      gvar.fpt_cidzt_mw_fr=data[0].fpt_cidzt_mw_fr
      gvar.fpt_cidzt_idz_tf=data[0].fpt_cidzt_idz_tf
      gvar.fpt_cidzt_mw_tf=data[0].fpt_cidzt_mw_tf
	})
  })
}

function GetVal_nmbm_uit_fc_fpt(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_uit_fc_fpt"};


    dbo.collection("FPT_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;

      gvar.fpt_uit_fc_surge_arrester_fault=data[0].fpt_uit_fc_surge_arrester_fault
      gvar.fpt_uit_fc_charger_fault=data[0].fpt_uit_fc_charger_fault
      gvar.fpt_uit_fc_panel_door=data[0].fpt_uit_fc_panel_door
      gvar.fpt_uit_fc_battery=data[0].fpt_uit_fc_battery
      gvar.fpt_uit_fc_remote_io_comms=data[0].fpt_uit_fc_remote_io_comms
      gvar.fpt_uit_fc_flow_switch1=data[0].fpt_uit_fc_flow_switch1
      gvar.fpt_uit_fc_flow_switch2=data[0].fpt_uit_fc_flow_switch2
      gvar.fpt_uit_fc_pressure_analog_signal=data[0].fpt_uit_fc_pressure_analog_signal
      gvar.fpt_uit_fc_flow_meter_comms=data[0].fpt_uit_fc_flow_meter_comms
      gvar.fpt_uit_fc_ut=data[0].fpt_uit_fc_ut
      gvar.fpt_uit_fc_press=data[0].fpt_uit_fc_press
      gvar.fpt_uit_fc_fr=data[0].fpt_uit_fc_fr
      gvar.fpt_uit_fc_tf=data[0].fpt_uit_fc_tf

	})
  })
}


function GetVal_nmbm_gt_brg_fpt(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_gt_brg_fpt"};


    dbo.collection("FPT_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;

      gvar.fpt_gt_brg_ut=data[0].fpt_gt_brg_ut
      gvar.fpt_gt_brg_panel_door=data[0].fpt_gt_brg_panel_door
      gvar.fpt_gt_brg_battery=data[0].fpt_gt_brg_battery
      gvar.fpt_gt_brg_steal_p_press_analog_s=data[0].fpt_gt_brg_steal_p_press_analog_s
      gvar.fpt_gt_brg_soco_p_press_analog_s=data[0].fpt_gt_brg_soco_p_press_analog_s
      gvar.fpt_gt_brg_fm_stl_p_comms_s=data[0].fpt_gt_brg_fm_stl_p_comms_s
      gvar.fpt_gt_brg_fm_soco_p_comms_s=data[0].fpt_gt_brg_fm_soco_p_comms_s
      gvar.fpt_gt_brg_stl_p_press=data[0].fpt_gt_brg_stl_p_press
      gvar.fpt_gt_brg_stl_p_fr=data[0].fpt_gt_brg_stl_p_fr
      gvar.fpt_gt_brg_soco_p_fr=data[0].fpt_gt_brg_soco_p_fr
      gvar.fpt_gt_brg_stl_p_tf=data[0].fpt_gt_brg_stl_p_tf
      gvar.fpt_gt_brg_soco_p_tf=data[0].fpt_gt_brg_soco_p_tf

	})
  })
}
