module.exports = {GetVal_rw_cg_ps, GetVal_nmbm_mw_ps,GetVal_nmbm_bh_ps,GetVal_nmbm_vs_ps,GetVal_nmbm_stan_ps,GetVal_nmbm_bf_ps,GetVal_nmbm_hb2_ps,GetVal_nmbm_eff_ps};
const gvar = require('../../variables')

function GetVal_rw_cg_ps(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"rw_cg_ps"};


    dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;
    gvar.cg_G_UT=data[0].cg_G_UT
    gvar.cg_P1_RH=data[0].cg_P1_RH
    gvar.cg_P2_RH=data[0].cg_P2_RH
    gvar.cg_P3_RH=data[0].cg_P3_RH
    gvar.cg_G_SUC_PRESS=data[0].cg_G_SUC_PRESS
    gvar.cg_G_DEL_PRESS=data[0].cg_G_DEL_PRESS
    gvar.cg_G_SUMP_LVL=data[0].cg_G_SUMP_LVL
    gvar.cg_T1_LVL=data[0].cg_T1_LVL
    gvar.cg_T1_INLET_F=data[0].cg_T1_INLET_F
    gvar.cg_T1_OUTLET_F=data[0].cg_T1_OUTLET_F
    gvar.cg_T2_LVL=data[0].cg_T2_LVL
    gvar.cg_T2_INLET_F=data[0].cg_T2_INLET_F
    gvar.cg_T2_OUTLET_F=data[0].cg_T2_OUTLET_F
    gvar.cg_P1_SUC_PRESS=data[0].cg_P1_SUC_PRESS
    gvar.cg_P1_DEL_PRESS=data[0].cg_P1_DEL_PRESS
    gvar.cg_P1_VIB=data[0].cg_P1_VIB
    gvar.cg_P1_POWER=data[0].cg_P1_POWER
    gvar.cg_P2_SUC_PRESS=data[0].cg_P2_SUC_PRESS
    gvar.cg_P2_DEL_PRESS=data[0].cg_P2_DEL_PRESS
    gvar.cg_P2_VIB=data[0].cg_P2_VIB
    gvar.cg_P2_POWER=data[0].cg_P2_POWER
    gvar.cg_P3_SUC_PRESS=data[0].cg_P3_SUC_PRESS
    gvar.cg_P3_DEL_PRESS=data[0].cg_P3_DEL_PRESS
    gvar.cg_P3_VIB=data[0].cg_P3_VIB
    gvar.cg_P3_POWER=data[0].cg_P3_POWER
    gvar.cg_G_M_CB_STAT=data[0].cg_G_M_CB_STAT
    gvar.cg_G_SP_FAIL=data[0].cg_G_SP_FAIL
    gvar.cg_G_EARTH_FAULT=data[0].cg_G_EARTH_FAULT
    gvar.cg_G_PS_FLOOD_ALM=data[0].cg_G_PS_FLOOD_ALM
    gvar.cg_G_SUMP_BYPASS=data[0].cg_G_SUMP_BYPASS
    gvar.cg_G_T_BYPASS=data[0].cg_G_T_BYPASS
    gvar.cg_G_T1_SELECTED=data[0].cg_G_T1_SELECTED
    gvar.cg_G_T2_SELECTED=data[0].cg_G_T2_SELECTED
    gvar.cg_P1_STAT=data[0].cg_P1_STAT
    gvar.cg_P1_MODE=data[0].cg_P1_MODE
    gvar.cg_P1_TRIP_STAT=data[0].cg_P1_TRIP_STAT
    gvar.cg_P1_EX_FAULT_STAT=data[0].cg_P1_EX_FAULT_STAT
    gvar.cg_P1_E_STOP_STAT=data[0].cg_P1_E_STOP_STAT
    gvar.cg_P1_CB_ON_STAT=data[0].cg_P1_CB_ON_STAT
    gvar.cg_P1_LOCKOUT=data[0].cg_P1_LOCKOUT
    gvar.cg_P1_S_U_P=data[0].cg_P1_S_U_P
    gvar.cg_P1_D_O_P=data[0].cg_P1_D_O_P
    gvar.cg_P1_S_P_S=data[0].cg_P1_S_P_S
    gvar.cg_P1_D_P_S=data[0].cg_P1_D_P_S
    gvar.cg_P1_B_T=data[0].cg_P1_B_T
    gvar.cg_P1_V_C_T=data[0].cg_P1_V_C_T
    gvar.cg_P1_M_W_T=data[0].cg_P1_M_W_T
    gvar.cg_P2_STAT=data[0].cg_P2_STAT
    gvar.cg_P2_MODE=data[0].cg_P2_MODE
    gvar.cg_P2_TRIP_STAT=data[0].cg_P2_TRIP_STAT
    gvar.cg_P2_EX_FAULT_STAT=data[0].cg_P2_EX_FAULT_STAT
    gvar.cg_P2_E_STOP_STAT=data[0].cg_P2_E_STOP_STAT
    gvar.cg_P2_CB_ON_STAT=data[0].cg_P2_CB_ON_STAT
    gvar.cg_P2_LOCKOUT=data[0].cg_P2_LOCKOUT
    gvar.cg_P2_S_U_P=data[0].cg_P2_S_U_P
    gvar.cg_P2_D_O_P=data[0].cg_P2_D_O_P
    gvar.cg_P2_S_P_S=data[0].cg_P2_S_P_S
    gvar.cg_P2_D_P_S=data[0].cg_P2_D_P_S
    gvar.cg_P2_B_T=data[0].cg_P2_B_T
    gvar.cg_P2_V_C_T=data[0].cg_P2_V_C_T
    gvar.cg_P2_M_W_T=data[0].cg_P2_M_W_T
    gvar.cg_P3_STAT=data[0].cg_P3_STAT
    gvar.cg_P3_MODE=data[0].cg_P3_MODE
    gvar.cg_P3_TRIP_STAT=data[0].cg_P3_TRIP_STAT
    gvar.cg_P3_EX_FAULT_STAT=data[0].cg_P3_EX_FAULT_STAT
    gvar.cg_P3_E_STOP_STAT=data[0].cg_P3_E_STOP_STAT
    gvar.cg_P3_CB_ON_STAT=data[0].cg_P3_CB_ON_STAT
    gvar.cg_P3_LOCKOUT=data[0].cg_P3_LOCKOUT
    gvar.cg_P3_S_U_P=data[0].cg_P3_S_U_P
    gvar.cg_P3_D_O_P=data[0].cg_P3_D_O_P
    gvar.cg_P3_S_P_S=data[0].cg_P3_S_P_S
    gvar.cg_P3_D_P_S=data[0].cg_P3_D_P_S
    gvar.cg_P3_B_T=data[0].cg_P3_B_T
    gvar.cg_P3_V_C_T=data[0].cg_P3_V_C_T
    gvar.cg_P3_M_W_T=data[0].cg_P3_M_W_T


    })
  })
}
function GetVal_nmbm_mw_ps(){
  var MongoClient = require('mongodb').MongoClient;
  var url= gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_mw_ps"};


    dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;
gvar.mw_g_common_suction_pressure=data[0].mw_g_common_suction_pressure
gvar.mw_g_common_delivery_pressure=data[0].mw_g_common_delivery_pressure
gvar.mw_g_flowrate=data[0].mw_g_flowrate
gvar.mw_g_pumps_required=data[0].mw_g_pumps_required
gvar.mw_g_speed_setpoint=data[0].mw_g_speed_setpoint
gvar.mw_p1_runtime=data[0].mw_p1_runtime
gvar.mw_p1_actual_speed=data[0].mw_p1_actual_speed
gvar.mw_p1_number_of_starts=data[0].mw_p1_number_of_starts
gvar.mw_p1_mode=data[0].mw_p1_mode
gvar.mw_p1_status=data[0].mw_p1_status
gvar.mw_p1_emergency_stop=data[0].mw_p1_emergency_stop
gvar.mw_p1_alarm_trip=data[0].mw_p1_alarm_trip
gvar.mw_p1_no_flow=data[0].mw_p1_no_flow
gvar.mw_p2_runtime=data[0].mw_p2_runtime
gvar.mw_p2_actual_speed=data[0].mw_p2_actual_speed
gvar.mw_p2_number_of_starts=data[0].mw_p2_number_of_starts
gvar.mw_p2_mode=data[0].mw_p2_mode
gvar.mw_p2_status=data[0].mw_p2_status
gvar.mw_p2_emergency_stop=data[0].mw_p2_emergency_stop
gvar.mw_p2_alarm_trip=data[0].mw_p2_alarm_trip
gvar.mw_p2_no_flow=data[0].mw_p2_no_flow
gvar.mw_p3_runtime=data[0].mw_p3_runtime
gvar.mw_p3_actual_speed=data[0].mw_p3_actual_speed
gvar.mw_p3_number_of_starts=data[0].mw_p3_number_of_starts
gvar.mw_p3_mode=data[0].mw_p3_mode
gvar.mw_p3_status=data[0].mw_p3_status
gvar.mw_p3_emergency_stop=data[0].mw_p3_emergency_stop
gvar.mw_p3_alarm_trip=data[0].mw_p3_alarm_trip
gvar.mw_p3_no_flow=data[0].mw_p3_no_flow

	})
  })
}
function GetVal_nmbm_bh_ps(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_bh_ps"};


    dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;
      gvar.bhb_P1_RH=data[0].bhb_P1_RH
      gvar.bhb_P2_RH=data[0].bhb_P2_RH
      gvar.bhb_P1_MODE=data[0].bhb_P1_MODE
      gvar.bhb_P1_STATUS=data[0].bhb_P1_STATUS
      gvar.bhb_P1_STARTUP_FAULT=data[0].bhb_P1_STARTUP_FAULT
      gvar.bhb_P1_SOFT_S_FAULT=data[0].bhb_P1_SOFT_S_FAULT
      gvar.bhb_P1_NO_FLOW=data[0].bhb_P1_NO_FLOW
      gvar.bhb_P2_MODE=data[0].bhb_P2_MODE
      gvar.bhb_P2_STATUS=data[0].bhb_P2_STATUS
      gvar.bhb_P2_STARTUP_FAULT=data[0].bhb_P2_STARTUP_FAULT
      gvar.bhb_P2_SOFT_S_FAULT=data[0].bhb_P2_SOFT_S_FAULT
      gvar.bhb_P2_NO_FLOW=data[0].bhb_P2_NO_FLOW
      gvar.bhb_G_TELE_CONTROL=data[0].bhb_G_TELE_CONTROL
      gvar.bhb_G_LOW_LVL_FLOAT=data[0].bhb_G_LOW_LVL_FLOAT
      gvar.bh_R_START_FLOAT=data[0].bh_R_START_FLOAT
      gvar.bh_R_STOP_FLOAT=data[0].bh_R_STOP_FLOAT
      gvar.bhb_PS_UT=data[0].bhb_PS_UT
	})
  })
}

function GetVal_nmbm_vs_ps(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_vs_ps"};


    dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;

      gvar.vs_P1_RH=data[0].vs_P1_RH
      gvar.vs_P1_DEL_PRESS=data[0].vs_P1_DEL_PRESS
      gvar.vs_P1_SUC_PRESS=data[0].vs_P1_SUC_PRESS
      gvar.vs_P1_MODE=data[0].vs_P1_MODE
      gvar.vs_P1_STATUS=data[0].vs_P1_STATUS
      gvar.vs_P1_LSP=data[0].vs_P1_LSP
      gvar.vs_P1_LDP=data[0].vs_P1_LDP
      gvar.vs_P1_HDP=data[0].vs_P1_HDP
      gvar.vs_P1_STARTUP_FAULT=data[0].vs_P1_STARTUP_FAULT
      gvar.vs_P1_STARTER_FAULT=data[0].vs_P1_STARTER_FAULT
      gvar.vs_G_WATER_D=data[0].vs_G_WATER_D
      gvar.vs_G_PUMPS_F=data[0].vs_G_PUMPS_F
      gvar.vs_G_COMMS=data[0].vs_G_COMMS
      gvar.vs_P2_RH=data[0].vs_P2_RH
      gvar.vs_P2_DEL_PRESS=data[0].vs_P2_DEL_PRESS
      gvar.vs_P2_SUC_PRESS=data[0].vs_P2_SUC_PRESS
      gvar.vs_P2_MODE=data[0].vs_P2_MODE
      gvar.vs_P2_STATUS=data[0].vs_P2_STATUS
      gvar.vs_P2_LSP=data[0].vs_P2_LSP
      gvar.vs_P2_LDP=data[0].vs_P2_LDP
      gvar.vs_P2_HDP=data[0].vs_P2_HDP
      gvar.vs_P2_STARTUP_FAULT=data[0].vs_P2_STARTUP_FAULT
      gvar.vs_P2_STARTER_FAULT=data[0].vs_P2_STARTER_FAULT
      gvar.vs_PS_UT=data[0].vs_PS_UT
	})
  })
}

function GetVal_nmbm_stan_ps(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_stan_ps"};


    dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;

gvar.stan_ps_ut=data[0].stan_ps_ut
gvar.stan_p1_localremote=data[0].stan_p1_localremote
gvar.stan_p1_pumprunning=data[0].stan_p1_pumprunning
gvar.stan_p1_alarmshigh=data[0].stan_p1_alarmshigh
gvar.stan_p1_alarmstrip=data[0].stan_p1_alarmstrip
gvar.stan_p1_pumpavailable=data[0].stan_p1_pumpavailable
gvar.stan_p1_stat=data[0].stan_p1_stat
gvar.stan_p1_vsd_actfreq=data[0].stan_p1_vsd_actfreq
gvar.stan_p1_motor_power=data[0].stan_p1_motor_power
gvar.stan_p2_localremote=data[0].stan_p2_localremote
gvar.stan_p2_pumprunning=data[0].stan_p2_pumprunning
gvar.stan_p2_alarmshigh=data[0].stan_p2_alarmshigh
gvar.stan_p2_alarmstrip=data[0].stan_p2_alarmstrip
gvar.stan_p2_pumpavailable=data[0].stan_p2_pumpavailable
gvar.stan_p2_stat=data[0].stan_p2_stat
gvar.stan_p2_vsd_actfreq=data[0].stan_p2_vsd_actfreq
gvar.stan_p2_motor_power=data[0].stan_p2_motor_power
gvar.stan_common_suction_pressure=data[0].stan_common_suction_pressure
gvar.stan_common_delivery_pressure=data[0].stan_common_delivery_pressure
gvar.stan_pump_station_flow=data[0].stan_pump_station_flow
gvar.stan_p3_localremote=data[0].stan_p3_localremote
gvar.stan_p3_pumprunning=data[0].stan_p3_pumprunning
gvar.stan_p3_alarmshigh=data[0].stan_p3_alarmshigh
gvar.stan_p3_alarmstrip=data[0].stan_p3_alarmstrip
gvar.stan_p3_pumpavailable=data[0].stan_p3_pumpavailable
gvar.stan_p3_stat=data[0].stan_p3_stat
gvar.stan_p3_vsd_actfreq=data[0].stan_p3_vsd_actfreq
gvar.stan_p3_motor_power=data[0].stan_p3_motor_power
gvar.stan_p4_localremote=data[0].stan_p4_localremote
gvar.stan_p4_pumprunning=data[0].stan_p4_pumprunning
gvar.stan_p4_alarmshigh=data[0].stan_p4_alarmshigh
gvar.stan_p4_alarmstrip=data[0].stan_p4_alarmstrip
gvar.stan_p4_pumpavailable=data[0].stan_p4_pumpavailable
gvar.stan_p4_stat=data[0].stan_p4_stat
gvar.stan_p4_vsd_actfreq=data[0].stan_p4_vsd_actfreq
gvar.stan_p4_motor_power=data[0].stan_p4_motor_power
	})
  })
}

function GetVal_nmbm_bf_ps(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_bf_ps"};


    dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;
      gvar.bf_PS_UT=data[0].bf_PS_UT
      gvar.bf_G_SP=data[0].bf_G_SP
      gvar.bf_G_FR=data[0].bf_G_FR
      gvar.bf_P1_RH=data[0].bf_P1_RH
      gvar.bf_P2_RH=data[0].bf_P2_RH
      gvar.bf_P3_RH=data[0].bf_P3_RH
      gvar.bf_P4_RH=data[0].bf_P4_RH
      gvar.bf_G_MCC_ESTOP=data[0].bf_G_MCC_ESTOP
      gvar.bf_P1_STATUS=data[0].bf_P1_STATUS
      gvar.bf_P1_MODE=data[0].bf_P1_MODE
      gvar.bf_P1_PUMP_TRIP_FAULT=data[0].bf_P1_PUMP_TRIP_FAULT
      gvar.bf_P1_ESTOP_FAULT=data[0].bf_P1_ESTOP_FAULT
      gvar.bf_P1_NO_FLOW_FAULT=data[0].bf_P1_NO_FLOW_FAULT
      gvar.bf_P2_STATUS=data[0].bf_P2_STATUS
      gvar.bf_P2_MODE=data[0].bf_P2_MODE
      gvar.bf_P2_PUMP_TRIP_FAULT=data[0].bf_P2_PUMP_TRIP_FAULT
      gvar.bf_P2_ESTOP_FAULT=data[0].bf_P2_ESTOP_FAULT
      gvar.bf_P2_NO_FLOW_FAULT=data[0].bf_P2_NO_FLOW_FAULT
      gvar.bf_P3_STATUS=data[0].bf_P3_STATUS
      gvar.bf_P3_MODE=data[0].bf_P3_MODE
      gvar.bf_P3_PUMP_TRIP_FAULT=data[0].bf_P3_PUMP_TRIP_FAULT
      gvar.bf_P3_ESTOP_FAULT=data[0].bf_P3_ESTOP_FAULT
      gvar.bf_P3_NO_FLOW_FAULT=data[0].bf_P3_NO_FLOW_FAULT
      gvar.bf_P4_STATUS=data[0].bf_P4_STATUS
      gvar.bf_P4_MODE=data[0].bf_P4_MODE
      gvar.bf_P4_PUMP_TRIP_FAULT=data[0].bf_P4_PUMP_TRIP_FAULT
      gvar.bf_P4_ESTOP_FAULT=data[0].bf_P4_ESTOP_FAULT
      gvar.bf_P4_NO_FLOW_FAULT=data[0].bf_P4_NO_FLOW_FAULT
	})
  })
}


function GetVal_nmbm_hb2_ps(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_hb2_ps"};


    dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;
    gvar.hb_P1_RH=data[0].hb_P1_RH
    gvar.hb_P2_RH=data[0].hb_P2_RH
    gvar.hb_P3_RH=data[0].hb_P3_RH
    gvar.hb_P1_CURRENT=data[0].hb_P1_CURRENT
    gvar.hb_P2_CURRENT=data[0].hb_P2_CURRENT
    gvar.hb_P3_CURRENT =data[0].hb_P3_CURRENT

	})
  })
}
function GetVal_nmbm_eff_ps(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_eff_ps"};


    dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;
      gvar.nmu_eff_ps_ut=data[0].nmu_eff_ps_ut
      gvar.nmu_eff_ps_flood_alarm=data[0].nmu_eff_ps_flood_alarm
      gvar.nmu_eff_ps_fr=data[0].nmu_eff_ps_fr
      gvar.nmu_eff_ps_tnf=data[0].nmu_eff_ps_tnf
      gvar.nmu_eff_ps_del_press=data[0].nmu_eff_ps_del_press
      gvar.nmu_eff_ps_dam_lvl=data[0].nmu_eff_ps_dam_lvl
      gvar.nmu_eff_p1_fault=data[0].nmu_eff_p1_fault
      gvar.nmu_eff_p1_status=data[0].nmu_eff_p1_status
      gvar.nmu_eff_p1_mode=data[0].nmu_eff_p1_mode
      gvar.nmu_eff_p1_rh=data[0].nmu_eff_p1_rh
      gvar.nmu_eff_p1_speed=data[0].nmu_eff_p1_speed
      gvar.nmu_eff_p2_fault=data[0].nmu_eff_p2_fault
      gvar.nmu_eff_p2_status=data[0].nmu_eff_p2_status
      gvar.nmu_eff_p2_mode=data[0].nmu_eff_p2_mode
      gvar.nmu_eff_p2_rh=data[0].nmu_eff_p2_rh
      gvar.nmu_eff_p2_speed=data[0].nmu_eff_p2_speed
      gvar.nmu_eff_p3_fault=data[0].nmu_eff_p3_fault
      gvar.nmu_eff_p3_status=data[0].nmu_eff_p3_status
      gvar.nmu_eff_p3_mode=data[0].nmu_eff_p3_mode
      gvar.nmu_eff_p3_rh=data[0].nmu_eff_p3_rh
      gvar.nmu_eff_p3_speed=data[0].nmu_eff_p3_speed
      gvar.nmu_eff_p4_fault=data[0].nmu_eff_p4_fault
      gvar.nmu_eff_p4_status=data[0].nmu_eff_p4_status
      gvar.nmu_eff_p4_mode=data[0].nmu_eff_p4_mode
      gvar.nmu_eff_p4_rh=data[0].nmu_eff_p4_rh
      gvar.nmu_eff_p4_speed=data[0].nmu_eff_p4_speed
	})
  })
}


function GetVal_nmbm_eff_ps(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"nmbm_eff_ps"};


    dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;


    })

  })

}
