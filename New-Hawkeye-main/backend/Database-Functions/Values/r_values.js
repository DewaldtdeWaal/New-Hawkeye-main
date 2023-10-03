
module.exports = {GetVal_NMB_CGK_R,GetVal_nmbm_rd_r,GetVal_nmbm_sm_r, GetVal_nmbm_vs_r, GetVal_nmbm_bh_r,GetVal_nmbm_lh_ps_r,GetVal_nmbm_tc_ps_r, GetVal_nmbm_hb1_ps_r, GetVal_vrh_ps_r, GetValnmbm_cht_ps_r};
const gvar = require('../../variables')


function GetVal_NMB_CGK_R(){


  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"cgk"};


    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;




      gvar.nmb_cgk_r_actuator_status = data[0].actuator_status;
      gvar.nmb_cgk_r_ut = data[0].last_update;


      gvar.nmb_cgk_r_actuator_fault_status;
      gvar.nmb_cgk_r_chargerstatus = data[0].chargerstatus;
      gvar.nmb_cgk_r_res_warning_level =data[0].reservoir_warning_level
      gvar.nmb_cgk_r_res_level_sensor = data[0].reservoir_level_sensor
      gvar.nmb_cgk_r_valve_chamber_pressure_sensor = data[0].valve_chamber_pressure_sensor
      gvar.nmb_cgk_r_grassridge_inlet_flow_meter =  data[0].grassridge_inlet_flow_meter
      gvar.nmb_cgk_r_coega_idz_outlet_flow_meter = data[0].coega_outlet_flow_meter

      gvar.nmb_cgk_r_mode=data[0].mode
      gvar.nmb_cgk_r_fault_statuses=data[0].imagestatus

      gvar.nmb_cgk_r_fault_status = data[0].fault_status
      gvar.nmb_cgk_r_control_valve_1 = data[0].control_valve1
      gvar.nmb_cgk_r_coontrol_valve_2 = data[0].control_valve2

      gvar.nmb_cgk_r_motherwell_outlet_flow_meter_analog_signal = data[0].motherwell_outlet_flow_meter_analog_signal

      gvar.nmb_cgk_r_reservoir_level = data[0].reservoir_level
      gvar.nmb_cgk_r_valve_chamber_pressure =data[0].valve_chamber_pressure

      gvar.nmb_cgk_r_grassridge_inlet_flow_rate = data[0].grassridge_inlet_flow_rate
      gvar.nmb_cgk_r_grassridge_inlet_total_flow = data[0].grassridge_inlet_total_flow
      gvar.nmb_cgk_r_coega_idz_outlet_flow_rate = data[0].coega_idz_outlet_flow_rate
      gvar.nmb_cgk_r_coega_idz_outlet_total_flow = data[0].coega_idz_outlet_total_flow
      gvar.nmb_cgk_r_motherwell_outlet_flow_rate = data[0].motherwell_outlet_flow_rate
      gvar.nmb_cgk_r_motherwell_outlet_total_flow = data[0].motherwell_outlet_total_flow






    })



  })


}

function GetVal_nmbm_rd_r(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_rd_r"};

    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){
    gvar.rd_r_ut=data[0].rd_r_ut
    gvar.rd_r_lvl=data[0].rd_r_lvl
    gvar.id=data[0].id

    })
  })

}


function GetVal_nmbm_sm_r(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_sm_r"};

    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){
      gvar.sm_r_lvl=data[0].sm_r_lvl
      gvar.sm_fm_tf=data[0].sm_fm_tf
    })
  })
}

function GetVal_nmbm_vs_r(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_vs_r"};



    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){
      gvar.vs_R_LVL= data[0].vs_R_LVL
      gvar.vs_R_SURGE_ARRESTOR= data[0].vs_R_SURGE_ARRESTOR
      gvar.vs_R_CHARGER_STATUS= data[0].vs_R_CHARGER_STATUS
      gvar.vs_R_DOOR= data[0].vs_R_DOOR
      gvar.vs_R_UT= data[0].vs_R_UT

    })
  })
}

 function GetVal_nmbm_bh_r(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_bh_r"};

    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){
gvar.bh_R_UT=data[0].bh_R_UT
gvar.bh_R_SURGE_ARRESTOR=data[0].bh_R_SURGE_ARRESTOR
gvar.bh_R_CHARGER_STATUS=data[0].bh_R_CHARGER_STATUS
      gvar.bh_R_DOOR=data[0].bh_R_DOOR
      gvar.bh_R_LVL=data[0].bh_R_LVL
    })
  })
 }

function GetVal_nmbm_lh_ps_r(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"lh_ps_r"};

    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){
      gvar.lh_R_OVER_LVL=data[0].lh_R_OVER_LVL
      gvar.lh_UT=data[0].lh_UT
      gvar.lh_P1_MODE=data[0].lh_P1_MODE
      gvar.lh_P1_STATUS=data[0].lh_P1_STATUS
      gvar.lh_P1_SOFT_S_FAULT=data[0].lh_P1_SOFT_S_FAULT
      gvar.lh_P1_NO_FLOW_FAULT=data[0].lh_P1_NO_FLOW_FAULT
      gvar.lh_P1_ESTOP_FAULT=data[0].lh_P1_ESTOP_FAULT
      gvar.lh_P1_RH=data[0].lh_P1_RH
      gvar.lh_P2_MODE=data[0].lh_P2_MODE
      gvar.lh_P2_STATUS=data[0].lh_P2_STATUS
      gvar.lh_P2_SOFT_S_FAULT=data[0].lh_P2_SOFT_S_FAULT
      gvar.lh_P2_NO_FLOW_FAULT=data[0].lh_P2_NO_FLOW_FAULT
      gvar.lh_P2_ESTOP_FAULT=data[0].lh_P2_ESTOP_FAULT
      gvar.lh_P2_RH=data[0].lh_P2_RH
    })

  })
}

function GetVal_nmbm_tc_ps_r(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_tc_ps_r"};

    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){
gvar.tc_R_LVL=data[0].  tc_R_LVL
gvar.tc_R_UT=data[0]. tc_R_UT
gvar.tc_R_HIGH_FLOAT =data[0].tc_R_HIGH_FLOAT
gvar.tc_R_LOW_FLOAT=data[0].  tc_R_LOW_FLOAT
gvar.tc_P3_POWER =data[0].tc_P3_POWER
gvar.tc_P3_MODE =data[0]. tc_P3_MODE
gvar.tc_P3_PUMP_TRIP_FAULT=data[0]. tc_P3_PUMP_TRIP_FAULT
gvar.tc_P3_ESTOP_FAULT =data[0].tc_P3_ESTOP_FAULT
gvar.tc_P3_EARTH_FAULT=data[0]. tc_P3_EARTH_FAULT
gvar.tc_P3_RH=data[0].  tc_P3_RH
gvar.tc_P3_PRESS_DIFF=data[0].  tc_P3_PRESS_DIFF
gvar.tc_PS_UT=data[0].  tc_PS_UT
gvar.tc_G_SP=data[0]. tc_G_SP
gvar.tc_P1_POWER=data[0]. tc_P1_POWER
gvar.tc_P1_MODE =data[0]. tc_P1_MODE
gvar.tc_P1_RH=data[0].  tc_P1_RH
gvar.tc_P1_PRESS_DIFF=data[0].  tc_P1_PRESS_DIFF
gvar.tc_P1_PUMP_TRIP_FAULT =data[0].tc_P1_PUMP_TRIP_FAULT
gvar.tc_P1_ESTOP_FAULT =data[0].tc_P1_ESTOP_FAULT
gvar.tc_P1_EARTH_FAULT =data[0].tc_P1_EARTH_FAULT
gvar.tc_P2_POWER =data[0].tc_P2_POWER
gvar.tc_P2_MODE=data[0].  tc_P2_MODE
gvar.tc_P2_RH  =data[0].tc_P2_RH
gvar.tc_P2_PRESS_DIFF =data[0]. tc_P2_PRESS_DIFF
gvar.tc_P2_PUMP_TRIP_FAULT=data[0]. tc_P2_PUMP_TRIP_FAULT
gvar.tc_P2_ESTOP_FAULT =data[0].tc_P2_ESTOP_FAULT
gvar.tc_P2_EARTH_FAULT =data[0].tc_P2_EARTH_FAULT
gvar.tc_P1_STATUS =data[0].tc_P1_STATUS
gvar.tc_P2_STATUS =data[0].tc_P2_STATUS
gvar.tc_P3_STATUS =data[0].tc_P3_STATUS
gvar.tc_P1_NO_FLOW_FAULT =data[0].tc_P1_NO_FLOW_FAULT
gvar.tc_P2_NO_FLOW_FAULT =data[0].tc_P2_NO_FLOW_FAULT
gvar.tc_P3_NO_FLOW_FAULT =data[0].tc_P3_NO_FLOW_FAULT
})
  })
}

function GetVal_nmbm_hb1_ps_r(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_hb1_ps_r"};

    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){
      gvar.hb_R_LVL=data[0].hb_R_LVL
      gvar.hb_R_UT=data[0].hb_R_UT
      gvar.hb_P1_STATUS=data[0].hb_P1_STATUS
      gvar.hb_P1_MODE=data[0].hb_P1_MODE
      gvar.hb_P2_STATUS=data[0].hb_P2_STATUS
      gvar.hb_P2_MODE=data[0].hb_P2_MODE
      gvar.hb_P3_STATUS=data[0].hb_P3_STATUS
      gvar.hb_P3_MODE=data[0].hb_P3_MODE
      gvar.hb_P1_PUMP_CB_TRIP_FAULT=data[0].hb_P1_PUMP_CB_TRIP_FAULT
      gvar.hb_P2_PUMP_CB_TRIP_FAULT=data[0].hb_P2_PUMP_CB_TRIP_FAULT
      gvar.hb_P3_PUMP_CB_TRIP_FAULT=data[0].hb_P3_PUMP_CB_TRIP_FAULT
      gvar.hb_P1_STARTUP_FAULT=data[0].hb_P1_STARTUP_FAULT
      gvar.hb_P2_STARTUP_FAULT=data[0].hb_P2_STARTUP_FAULT
      gvar.hb_P3_STARTUP_FAULT=data[0].hb_P3_STARTUP_FAULT
      gvar.hb_P1_ESTOP_FAULT=data[0].hb_P1_ESTOP_FAULT
      gvar.hb_P2_ESTOP_FAULT=data[0].hb_P2_ESTOP_FAULT
      gvar.hb_P3_ESTOP_FAULT=data[0].hb_P3_ESTOP_FAULT
      gvar.hb_P1_NO_FLOW_FAULT=data[0].hb_P1_NO_FLOW_FAULT
      gvar.hb_P2_NO_FLOW_FAULT=data[0].hb_P2_NO_FLOW_FAULT
      gvar.hb_P3_NO_FLOW_FAULT=data[0].hb_P3_NO_FLOW_FAULT


    })
  })

}


function GetVal_vrh_ps_r(){
var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_vrh_ps_r"};

    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){
      gvar.vrh_del_rl=data[0].vrh_del_rl
      gvar.vrh_sc_rl=data[0].vrh_sc_rl
      gvar.vrh_ut=data[0].vrh_ut
      gvar.vrh_g_ps_mode=data[0].vrh_g_ps_mode
      gvar.vrh_g_main_panel_surge=data[0].vrh_g_main_panel_surge
      gvar.vrh_g_main_panel_voltage=data[0].vrh_g_main_panel_voltage
      gvar.vrh_p1_status=data[0].vrh_p1_status
      gvar.vrh_p1_mode=data[0].vrh_p1_mode
      gvar.vrh_p1_estop_fault=data[0].vrh_p1_estop_fault
      gvar.vrh_p1_cb_pump_trip_fault=data[0].vrh_p1_cb_pump_trip_fault
      gvar.vrh_p1_power_on=data[0].vrh_p1_power_on
      gvar.vrh_p1_vsd_staus=data[0].vrh_p1_vsd_staus
      gvar.vrh_p2_status=data[0].vrh_p2_status
      gvar.vrh_p2_mode=data[0].vrh_p2_mode
      gvar.vrh_p2_estop_fault=data[0].vrh_p2_estop_fault
      gvar.vrh_p2_cb_pump_trip_fault=data[0].vrh_p2_cb_pump_trip_fault
      gvar.vrh_p2_power_on=data[0].vrh_p2_power_on
      gvar.vrh_p2_vsd_staus=data[0].vrh_p2_vsd_staus
      gvar.vrh_p3_status=data[0].vrh_p3_status
      gvar.vrh_p3_mode=data[0].vrh_p3_mode
      gvar.vrh_p3_estop_fault=data[0].vrh_p3_estop_fault
      gvar.vrh_p3_cb_pump_trip_fault=data[0].vrh_p3_cb_pump_trip_fault
      gvar.vrh_p3_power_on=data[0].vrh_p3_power_on
      gvar.vrh_p3_vsd_staus=data[0].vrh_p3_vsd_staus
      gvar.vrh_p1_kw=data[0].vrh_p1_kw
      gvar.vrh_p2_kw=data[0].vrh_p2_kw
      gvar.vrh_p3_kw=data[0].vrh_p3_kw
      gvar.vrh_p1_rpm=data[0].vrh_p1_rpm
      gvar.vrh_p2_rpm=data[0].vrh_p2_rpm
      gvar.vrh_p3_rpm=data[0].vrh_p3_rpm
      gvar.vrh_p1_rt=data[0].vrh_p1_rt
      gvar.vrh_p2_rt=data[0].vrh_p2_rt
      gvar.vrh_p3_rt=data[0].vrh_p3_rt
      gvar.vrh_p1_a=data[0].vrh_p1_a
      gvar.vrh_p2_a=data[0].vrh_p2_a
      gvar.vrh_p3_a=data[0].vrh_p3_a
    })
  })
}







function GetValnmbm_cht_ps_r(){
var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_vrh_ps_r"};

    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){
      gvar.cht_nc_rl=data[0].cht_nc_rl
      gvar.cht_sc_rl=data[0].cht_sc_rl
      gvar.cht_oh_rl=data[0].cht_oh_rl
      gvar.cht_ut=data[0].cht_ut
      gvar.cht_fr=data[0].cht_fr
      gvar.cht_tf=data[0].cht_tf
      gvar.cht_R_NC_PF=data[0].cht_R_NC_PF
      gvar.cht_R_SC_PF=data[0].cht_R_SC_PF
      gvar.cht_R_OH_PF=data[0].cht_R_OH_PF
      gvar.cht_p1_rt=data[0].cht_p1_rt
      gvar.cht_p1_a=data[0].cht_p1_a
      gvar.cht_p1_kw=data[0].cht_p1_kw
      gvar.cht_p1_rpm=data[0].cht_p1_rpm
      gvar.cht_p2_rt=data[0].cht_p2_rt
      gvar.cht_p2_a=data[0].cht_p2_a
      gvar.cht_p2_kw=data[0].cht_p2_kw
      gvar.cht_p2_rpm=data[0].cht_p2_rpm
      gvar.cht_g_ps_mode=data[0].cht_g_ps_mode
      gvar.cht_g_panel_surge_arrestor=data[0].cht_g_panel_surge_arrestor
      gvar.cht_g_panel_voltage_okay=data[0].cht_g_panel_voltage_okay
      gvar.cht_p1_status=data[0].cht_p1_status
      gvar.cht_p1_mode=data[0].cht_p1_mode
      gvar.cht_p1_no_flow_fault=data[0].cht_p1_no_flow_fault
      gvar.cht_p1_estop_fault=data[0].cht_p1_estop_fault
      gvar.cht_p1_circuit_breaker_fault=data[0].cht_p1_circuit_breaker_fault
      gvar.cht_p1_vsd_status=data[0].cht_p1_vsd_status
      gvar.cht_p2_status=data[0].cht_p2_status
      gvar.cht_p2_mode=data[0].cht_p2_mode
      gvar.cht_p2_no_flow_fault=data[0].cht_p2_no_flow_fault
      gvar.cht_p2_estop_fault=data[0].cht_p2_estop_fault
      gvar.cht_p2_circuit_breaker_fault=data[0].cht_p2_circuit_breaker_fault
      gvar.cht_p2_vsd_status=data[0].cht_p2_vsd_status
    })
  })
  }
