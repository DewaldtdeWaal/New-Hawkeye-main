var num = 0;


 //////////////////////////////////////////////////localhost Connection String
if(num==0){
  var mbusIP= '192.168.2'
  var standardConnectionString = "mongodb://localhost:27017"
var MongooseConnectionString = "mongodb://localhost:27017/HawkEye"

var ChattymbusIP="127.1.2";
}
 ///////////////////////////////////////////////////Cloud
else if(num ==1)
{
  var standardConnectionString = "mongodb://admin:M%40CAutomation1@localhost:27017/?authMechanism=DEFAULT"
var MongooseConnectionString = "mongodb://admin:M%40CAutomation1@localhost/HawkEye?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
var mbusIP= "127.1.1"



var ChattymbusIP="127.1.2";
}
//////////////////////////////////////////////////////////////////////
else if(num ==2){
  var standardConnectionString = "mongodb://admin:M%40CAutomation1@139.162.139.167/?authMechanism=DEFAULT"
var MongooseConnectionString = "mongodb://admin:M%40CAutomation1@139.162.139.167:27017/HawkEye?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
var mbusIP= "127.1.1";



var ChattymbusIP="127.1.2";
}

module.exports={mbusIP,standardConnectionString,MongooseConnectionString, dbo}
//Serves as a basic template for all future sites.

//RESERVOIRS




//Schoemanshoek
var nmb_schoe_r_ut
var nmb_schoe_r_voltage_monitor;
var nmb_schoe_r_actuator_valve_feedback_signal_error;
var nmb_schoe_r_actuator_valve_command_signal_error;
var nmb_schoe_r_reservoir_level_signal_error;
var nmb_schoe_r_actuator_mode;
var nmb_schoe_r_actuator_valve_fault;
var nmb_schoe_r_actuator_valve_status;
var nmb_schoe_r_actuator_valve_torque_fail_close;
var nmb_schoe_r_actuator_valve_torque_fail_open;
var nbm_schoe_r_plc_mode;
var nmb_schoe_r_general_fault;
var nmb_schoe_r_actuator_general_fault;
var nmb_schoe_r_actuator_valve_timeout;
var nmb_schoe_r_res_level;
var nmb_schoe_r_pressure;
var nmb_schoe_r_actuator_set_point;
var nmb_schoe_r_actuator_position;




//Coega Kop

//MW200
//actuator position

var nmb_cgk_r_actuator_status;
var nmb_cgk_r_ut;

//Faults

var nmb_cgk_r_actuator_fault_status;
var nmb_cgk_r_chargerstatus;
var nmb_cgk_r_res_warning_level;
var nmb_cgk_r_res_level_sensor;
var nmb_cgk_r_valve_chamber_pressure_sensor;
var nmb_cgk_r_grassridge_inlet_flow_meter;
var nmb_cgk_r_coega_idz_outlet_flow_meter;

//Mode
var nmb_cgk_r_mode
var nmb_cgk_r_fault_statuses

var nmb_cgk_r_fault_status
var nmb_cgk_r_control_valve_1
var nmb_cgk_r_coontrol_valve_2

var nmb_cgk_r_motherwell_outlet_flow_meter_analog_signal

var nmb_cgk_r_reservoir_level
var nmb_cgk_r_valve_chamber_pressure

var nmb_cgk_r_grassridge_inlet_flow_rate
var nmb_cgk_r_grassridge_inlet_total_flow
var nmb_cgk_r_coega_idz_outlet_flow_rate
var nmb_cgk_r_coega_idz_outlet_total_flow
var nmb_cgk_r_motherwell_outlet_flow_rate
var nmb_cgk_r_motherwell_outlet_total_flow




var gb_R_LVL;
var gb_R_FR;
var gb_R_FRF;
var gb_R_FRR;
var gb_R_DOOR;
var gb_R_SURGE_ARRESTOR;
var gb_R_CHARGER_STATUS;
var gb_R_UT

var rd_r_lvl;
var rd_r_ut;

var sm_r_lvl
var sm_fm_fr
var sm_fm_tf
var sm_ut
var sum_UT

var vs_R_LVL
var vs_R_DOOR;
var vs_R_SURGE_ARRESTOR;
var vs_R_CHARGER_STATUS;
var vs_R_UT;


var bh_R_LVL;
var bh_R_START_FLOAT;
var bh_R_STOP_FLOAT;
var bh_R_UT;
var bh_R_DOOR;
var bh_R_SURGE_ARRESTOR;
var bh_R_CHARGER_STATUS;
var bh_R_array


var hb_R_LVL;
var hb_R_UT;

var mali_ut;
var mali_lvl;


var lh_R_OVER_LVL;
var lh_UT;

var tc_R_LVL;
var tc_R_HIGH_FLOAT;
var tc_R_LOW_FLOAT;
var tc_R_UT;

var che_r_lvl;//West Chamber LEvel
var che_r_lvl_East;
var che_r_fr1100;
var che_r_fr600;
var che_r_ut;
var che_r_tf1100
var che_r_tf600


var che_ps_ut;
var che_ps_common_delivery_pressure;
var che_ps_common_suction_pressure;
var che_ps_700_flow_rate;
var che_ps_flood_alarm;

var che_ps_pumpset_1_no_flow_fault;
var che_ps_pumpset_1_motor_de_temperature_fault;
var che_ps_pumpset_1_motor_nde_temp_fault;
var che_ps_pumpset_1_pump_de_temp_fault;
var che_ps_pumpset_1_pump_nde_temp_fault;
var che_ps_pumpset_1_Pump_nde_temp_fault;
var che_ps_pumpset_1_ESTOP;
var che_ps_pumpset_1_circuit_breaker_trip
var che_ps_pumpset_1_drive_fault
var che_ps_pumpset_1_motor_winding_temp_high_fault
var che_ps_pumpset_1_control_voltage_loss
var che_ps_pumpset_1_motor_de_vib_fault
var che_ps_pumpset_1_motor_nde_vib_fault
var che_ps_pumpset_1_pump_de_vib_fault
var che_ps_pumpset_1_pump_nde_vib_fault
var che_ps_pumpset_1_pumpstatus;
var che_ps_pumpset_1_mode;
var che_ps_pumpset_1_vsd_actual_speed;
var che_ps_pumpset_1_vsd_actual_current;
var che_ps_pumpset_1_vsd_actual_power;
var che_ps_pumpset_1_del_pressure;
var che_ps_pumpset_1_suct_pressure;

var che_ps_pumpset_2_no_flow_fault;
var che_ps_pumpset_2_motor_de_temperature_fault;
var che_ps_pumpset_2_motor_nde_temp_fault;
var che_ps_pumpset_2_pump_de_temp_fault;
var che_ps_pumpset_2_pump_nde_temp_fault;
var che_ps_pumpset_2_Pump_nde_temp_fault;
var che_ps_pumpset_2_ESTOP;
var che_ps_pumpset_2_circuit_breaker_trip
var che_ps_pumpset_2_drive_fault
var che_ps_pumpset_2_motor_winding_temp_high_fault
var che_ps_pumpset_2_control_voltage_loss
var che_ps_pumpset_2_motor_de_vib_fault
var che_ps_pumpset_2_motor_nde_vib_fault
var che_ps_pumpset_2_pump_de_vib_fault
var che_ps_pumpset_2_pump_nde_vib_fault
var che_ps_pumpset_2_pumpstatus;
var che_ps_pumpset_2_mode;
var che_ps_pumpset_2_vsd_actual_speed;
var che_ps_pumpset_2_vsd_actual_current;
var che_ps_pumpset_2_vsd_actual_power;
var che_ps_pumpset_2_del_pressure;
var che_ps_pumpset_2_suct_pressure;

var che_ps_pumpset_3_no_flow_fault;
var che_ps_pumpset_3_motor_de_temperature_fault;
var che_ps_pumpset_3_motor_nde_temp_fault;
var che_ps_pumpset_3_pump_de_temp_fault;
var che_ps_pumpset_3_pump_nde_temp_fault;
var che_ps_pumpset_3_Pump_nde_temp_fault;
var che_ps_pumpset_3_ESTOP;
var che_ps_pumpset_3_circuit_breaker_trip
var che_ps_pumpset_3_drive_fault
var che_ps_pumpset_3_motor_winding_temp_high_fault
var che_ps_pumpset_3_control_voltage_loss
var che_ps_pumpset_3_motor_de_vib_fault
var che_ps_pumpset_3_motor_nde_vib_fault
var che_ps_pumpset_3_pump_de_vib_fault
var che_ps_pumpset_3_pump_nde_vib_fault
var che_ps_pumpset_3_pumpstatus;
var che_ps_pumpset_3_mode;
var che_ps_pumpset_3_vsd_actual_speed;
var che_ps_pumpset_3_vsd_actual_current;
var che_ps_pumpset_3_vsd_actual_power;
var che_ps_pumpset_3_del_pressure;
var che_ps_pumpset_3_suct_pressure;

var che_ps_pumpset_4_no_flow_fault;
var che_ps_pumpset_4_motor_de_temperature_fault;
var che_ps_pumpset_4_motor_nde_temp_fault;
var che_ps_pumpset_4_pump_de_temp_fault;
var che_ps_pumpset_4_pump_nde_temp_fault;
var che_ps_pumpset_4_Pump_nde_temp_fault;
var che_ps_pumpset_4_ESTOP;
var che_ps_pumpset_4_circuit_breaker_trip
var che_ps_pumpset_4_drive_fault
var che_ps_pumpset_4_motor_winding_temp_high_fault
var che_ps_pumpset_4_control_voltage_loss
var che_ps_pumpset_4_motor_de_vib_fault
var che_ps_pumpset_4_motor_nde_vib_fault
var che_ps_pumpset_4_pump_de_vib_fault
var che_ps_pumpset_4_pump_nde_vib_fault
var che_ps_pumpset_4_pumpstatus;
var che_ps_pumpset_4_mode;
var che_ps_pumpset_4_vsd_actual_speed;
var che_ps_pumpset_4_vsd_actual_current;
var che_ps_pumpset_4_vsd_actual_power;
var che_ps_pumpset_4_del_pressure;
var che_ps_pumpset_4_suct_pressure;

var gr_R_EAST_LVL;
var gr_R_WEST_LVL;
var gr_R_INTLET;
var gr_R_OUTLET;
var gr_R_UT;

var vrh_del_rl;
var vrh_sc_rl;
var vrh_ut;

var cht_nc_rl;
var cht_sc_rl;
var cht_oh_rl;
// var cht_r_nc_pf;
// var cht_r_sc_pf;
// var cht_r_oh_pf;
var cht_fr;
var cht_tf
var cht_ut;

var sum_UT;
//PUMPSTATIONS

//Verwoerd
//digitels
var vw_g_sa_fault
var vw_g_charger_fault
var vw_g_sps_fault
var vw_g_dps_fault
var vw_g_fm_fault
var vw_g_pm_fault
var vw_p1_vsd_comms_fault
var vw_p1_vsd_fault
var vw_p1_estop_fault
var vw_p1_no_flow_fault
var vw_p1_low_suc_press_fault
var vw_p1_high_del_press_fault
var vw_p1_no_flow_fault
var vw_g_vm_fault
var vw_p1_startup_fault
var vw_p1_stat
var vw_p1_mode

//analog
var vw_ut
var vw_p1_sp
var vw_p1_dp
var vw_p1_current
var vw_p1_speed
var vw_p1_power
var vw_p1_rh
var vw_p1_fr
var vw_p1_tf
var vw_p1_


//VAN STADENS
var  vs_PS_UT
var  vs_G_WATER_D
var  vs_G_PUMPS_F
var  vs_G_COMMS
var  vs_P1_RH
var  vs_P1_MODE
var  vs_P1_STATUS
var  vs_P1_LSP
var  vs_P1_LDP
var  vs_P1_HDP
var  vs_P1_STARTER_FAULT
var  vs_P1_STARTUP_FAULT
var  vs_P1_DEL_PRESS
var  vs_P1_SUC_PRESS
var  vs_P2_RH
var  vs_P2_MODE
var  vs_P2_STATUS
var  vs_P2_LSP
var  vs_P2_LDP
var  vs_P2_HDP
var  vs_P2_STARTER_FAULT
var  vs_P2_STARTUP_FAULT
var  vs_P2_DEL_PRESS
var  vs_P2_SUC_PRESS

//BLUE HORIZON
var  bhb_PS_UT
var  bhb_G_TELE_CONTROL
var  bhb_G_LOW_LVL_FLOAT
var  bhb_P1_RH
var  bhb_P1_MODE
var  bhb_P1_STATUS
var  bhb_P1_SOFT_S_FAULT
var  bhb_P1_STARTUP_FAULT
var  bhb_P1_NO_FLOW
var  bhb_P2_RH
var  bhb_P2_MODE
var  bhb_P2_STATUS
var  bhb_P2_STARTER_FAULT
var  bhb_P2_STARTUP_FAULT
var  bhb_P2_NO_FLOW
var  bhb_array

//Lovemore Heights
var  lh_P1_MODE
var  lh_P1_STATUS
var  lh_P1_SOFT_S_FAULT
var  lh_P1_NO_FLOW_FAULT
var  lh_P1_ESTOP_FAULT
var  lh_P1_RH
var  lh_P2_MODE
var  lh_P2_STATUS
var  lh_P2_SOFT_S_FAULT
var  lh_P2_NO_FLOW_FAULT
var  lh_P2_ESTOP_FAULT
var  lh_P2_RH
//Theesecombe
var  tc_PS_UT
var  tc_G_SP

var  tc_P1_POWER
var  tc_P1_MODE
var  tc_P1_STATUS
var  tc_P1_RH
var  tc_P1_PRESS_DIFF
var  tc_P1_PUMP_TRIP_FAULT
var  tc_P1_ESTOP_FAULT
var  tc_P1_NO_FLOW_FAULT
var  tc_P1_EARTH_FAULT

var  tc_P2_POWER
var  tc_P2_MODE
var  tc_P2_STATUS
var  tc_P2_RH
var  tc_P2_PRESS_DIFF
var  tc_P2_PUMP_TRIP_FAULT
var  tc_P2_ESTOP_FAULT
var  tc_P2_NO_FLOW_FAULT
var  tc_P2_EARTH_FAULT

var  tc_P3_POWER
var  tc_P3_MODE
var  tc_P3_STATUS
var  tc_P3_RH
var  tc_P3_PRESS_DIFF
var  tc_P3_PUMP_TRIP_FAULT
var  tc_P3_ESTOP_FAULT
var  tc_P3_NO_FLOW_FAULT
var  tc_P3_EARTH_FAULT

// Buffelsfontein
var bf_PS_UT
var bf_G_FR;
var bf_G_SP;
var bf_G_MCC_ESTOP;

var  bf_P1_STATUS
var  bf_P1_MODE
var  bf_P1_RH
var  bf_P1_PUMP_TRIP_FAULT
var  bf_P1_ESTOP_FAULT
var  bf_P1_NO_FLOW_FAULT

var  bf_P2_STATUS
var  bf_P2_MODE
var  bf_P2_RH
var  bf_P2_PUMP_TRIP_FAULT
var  bf_P2_ESTOP_FAULT
var  bf_P2_NO_FLOW_FAULT

var  bf_P3_STATUS
var  bf_P3_MODE
var  bf_P3_RH
var  bf_P3_PUMP_TRIP_FAULT
var  bf_P3_ESTOP_FAULT
var  bf_P3_NO_FLOW_FAULT

var  bf_P4_STATUS
var  bf_P4_MODE
var  bf_P4_RH
var  bf_P4_PUMP_TRIP_FAULT
var  bf_P4_ESTOP_FAULT
var  bf_P4_NO_FLOW_FAULT
var bf_array




//Graaff-Reinet address
var wolwas_r_ut
var wolwas_r_level
var wolwas_r_battery_level
var wolwas_r_poll_ut
var gr_wolwas_r

var bergen_r_ut
var bergen_r_level
var bergen_r_battery_level
var bergen_r_poll_ut
var gr_bergendal_r

var uma_r_ut
var uma_r_level
var uma_r_battery_level
var uma_r_poll_ut
var gr_umasizakhe_r

var kroon_r_ut
var kroon_r_level
var kroon_r_battery_level
var kroon_r_poll_ut
var gr_kroonvale_r


var damp_r_ut
var damp_r_level
var damp_r_battery_level
var damp_r_poll_ut
var gr_damcamp_r


var hol_r_ut
var hol_r_level
var hol_r_battery_level
var hol_r_poll_ut
var gr_holding_r


var tin_r_ut
var tin_r_level
var tin_r_battery_level
var tin_r_poll_ut
var gr_tinroof_r





var st_georges_wtw_ut
var st_georges_wtw_emer_hill_FR
var st_georges_wtw_emer_hill_TF
var st_georges_wtw_gw_FR
var st_georges_wtw_gw_TF







// Heatherbank
var hb_PS_UT

var  hb_P1_STATUS
var  hb_P1_MODE
var  hb_P1_RH
var  hb_P1_CURRENT
var  hb_P1_PUMP_CB_TRIP_FAULT
var  hb_P1_STARTUP_FAULT
var  hb_P1_ESTOP_FAULT
var  hb_P1_NO_FLOW_FAULT

var  hb_P2_STATUS
var  hb_P2_MODE
var  hb_P2_RH
var  hb_P2_CURRENT
var  hb_P2_PUMP_CB_TRIP_FAULT
var  hb_P2_STARTUP_FAULT
var  hb_P2_ESTOP_FAULT
var  hb_P2_NO_FLOW_FAULT

var  hb_P3_STATUS
var  hb_P3_MODE
var  hb_P3_RH
var  hb_P3_CURRENT
var  hb_P3_PUMP_CB_TRIP_FAULT
var  hb_P3_STARTUP_FAULT
var  hb_P3_ESTOP_FAULT
var  hb_P3_NO_FLOW_FAULT


// Van Riebeek Hoogte

var vrh_g_ps_mode
var vrh_g_main_panel_surge
var vrh_g_main_panel_voltage


var vrh_p1_kw
var vrh_p2_kw
var vrh_p3_kw

var vrh_p1_rpm
var vrh_p2_rpm
var vrh_p3_rpm

var vrh_p1_rt
var vrh_p2_rt
var vrh_p3_rt

var vrh_p1_a
var vrh_p2_a
var vrh_p3_a

var vrh_p1_status
var vrh_p1_mode
var vrh_p1_estop_fault
var vrh_p1_cb_pump_trip_fault
var vrh_p1_power_on
var vrh_p1_vsd_staus

var vrh_p2_status
var vrh_p2_mode
var vrh_p2_estop_fault
var vrh_p2_cb_pump_trip_fault
var vrh_p2_power_on
var vrh_p2_vsd_staus

var vrh_p3_status
var vrh_p3_mode
var vrh_p3_estop_fault
var vrh_p3_cb_pump_trip_fault
var vrh_p3_power_on
var vrh_p3_vsd_staus


// Chatty
var cht_g_panel_surge_arrestor
var cht_g_panel_voltage_okay
var cht_g_ps_mode

var cht_p1_rt
var cht_p1_a
var cht_p1_kw
var cht_p1_rpm
var cht_p1_status
var cht_p1_mode
var cht_p1_no_flow_fault
var cht_p1_estop_fault
var cht_p1_circuit_breaker_fault
var cht_p1_vsd_status

var cht_p2_rt
var cht_p2_a
var cht_p2_kw
var cht_p2_rpm
var cht_p2_status
var cht_p2_mode
var cht_p2_no_flow_fault
var cht_p2_estop_fault
var cht_p2_circuit_breaker_fault
var cht_p2_vsd_status


///////////////////////////////////////////////////////Rand Water Crown Gardens
///////////////////////////////marshels
var cg_G_UT
var cg_G_M_CB_STAT
var cg_G_SP_FAIL
var cg_G_EARTH_FAULT
var cg_G_PS_FLOOD_ALM
var cg_G_SUMP_BYPASS
var cg_G_T_BYPASS
var cg_G_T1_SELECTED
var cg_G_T2_SELECTED

var cg_P1_STAT//PUMP 1
var cg_P1_MODE
//faults
var cg_P1_TRIP_STAT
var cg_P1_EX_FAULT_STAT
var cg_P1_E_STOP_STAT
var cg_P1_CB_ON_STAT
var cg_P1_LOCKOUT
var cg_P1_S_U_P
var cg_P1_D_O_P
var cg_P1_S_P_S
var cg_P1_D_P_S
var cg_P1_B_T
var cg_P1_V_C_T
var cg_P1_M_W_T


var cg_P2_STAT//PUMP 2
var cg_P2_MODE
//faults
var cg_P2_TRIP_STAT
var cg_P2_EX_FAULT_STAT
var cg_P2_E_STOP_STAT
var cg_P2_CB_ON_STAT
var cg_P2_LOCKOUT
var cg_P2_S_U_P
var cg_P2_D_O_P
var cg_P2_S_P_S
var cg_P2_D_P_S
var cg_P2_B_T
var cg_P2_V_C_T
var cg_P2_M_W_T


var cg_P1_STAT//PUMP 3
var cg_P1_MODE
//faults
var cg_P3_TRIP_STAT
var cg_P3_EX_FAULT_STAT
var cg_P3_E_STOP_STAT
var cg_P3_CB_ON_STAT
var cg_P3_LOCKOUT
var cg_P3_S_U_P
var cg_P3_D_O_P
var cg_P3_S_P_S
var cg_P3_D_P_S
var cg_P3_B_T
var cg_P3_V_C_T
var cg_P3_M_W_T

/////////////////////////////////////ANALOG
var cg_G_SUC_PRESS
var cg_G_DEL_PRESS
var cg_G_SUMP_LVL

var cg_T1_LVL
var cg_T1_INLET_F
var cg_T1_OUTLET_F

var cg_T2_LVL
var cg_T2_INLET_F
var cg_T2_OUTLET_F

var cg_P1_SUC_PRESS
var cg_P1_DEL_PRESS
var cg_P1_VIB
var cg_P1_POWER
var cg_P1_RH

var cg_P2_SUC_PRESS
var cg_P2_DEL_PRESS
var cg_P2_VIB
var cg_P2_POWER
var cg_P2_RH

var cg_P3_SUC_PRESS
var cg_P3_DEL_PRESS
var cg_P3_VIB
var cg_P3_POWER
var cg_P3_RH


// NMU Effluent

var nmu_eff_ps_ut

var nmu_eff_ps_flood_alarm

var nmu_eff_ps_fr
var nmu_eff_ps_tnf
var nmu_eff_ps_del_press
var nmu_eff_ps_dam_lvl

var nmu_eff_p1_fault
var nmu_eff_p1_status
var nmu_eff_p1_mode
var nmu_eff_p1_rh
var nmu_eff_p1_speed

var nmu_eff_p2_fault
var nmu_eff_p2_status
var nmu_eff_p2_mode
var nmu_eff_p2_rh
var nmu_eff_p2_speed

var nmu_eff_p3_fault
var nmu_eff_p3_status
var nmu_eff_p3_mode
var nmu_eff_p3_rh
var nmu_eff_p3_speed

var nmu_eff_p4_fault
var nmu_eff_p4_status
var nmu_eff_p4_mode
var nmu_eff_p4_rh
var nmu_eff_p4_speed

// Stanford Road

var stan_common_suction_pressure
var stan_common_delivery_pressure
var stan_pump_station_flow

var stan_ps_ut
// Pump 1
var stan_p1_stat
var stan_p1_localremote
var stan_p1_pumprunning
var stan_p1_alarmshigh
var stan_p1_alarmstrip
var stan_p1_pumpavailable
var stan_p1_vsd_actfreq
var stan_p1_motor_power
// Pump 2
var stan_p2_stat
var stan_p2_localremote
var stan_p2_pumprunning
var stan_p2_alarmshigh
var stan_p2_alarmstrip
var stan_p2_pumpavailable
var stan_p2_vsd_actfreq
var stan_p2_motor_power
// Pump 3
var stan_p3_stat
var stan_p3_localremote
var stan_p3_pumprunning
var stan_p3_alarmshigh
var stan_p3_alarmstrip
var stan_p3_pumpavailable
var stan_p3_vsd_actfreq
var stan_p3_motor_power
// Pump 4
var stan_p4_stat
var stan_p4_localremote
var stan_p4_pumprunning
var stan_p4_alarmshigh
var stan_p4_alarmstrip
var stan_p4_pumpavailable
var stan_p4_vsd_actfreq
var stan_p4_motor_power
//Pump Scada
var stan_p1_scada_start
var stan_p2_scada_start
var stan_p3_scada_start
var stan_p_scada_start

var stan_enable_temp_control
var stan_cw_prev
var stan_s_prev

var stan_speed_ref

var stan_mbw_success = 0





//Motherwell

//General Variables
var mw_g_ut
var mw_g_common_suction_pressure
var mw_g_common_delivery_pressure
var mw_g_flowrate
var mw_g_speed_setpoint
var mw_g_pumps_required
var mw_g_res_level


//Pump1
var mw_p1_runtime
var mw_p1_actual_speed
var mw_p1_number_of_starts
var mw_p1_running
var mw_p1_status
var mw_p1_mode
var mw_p1_emergency_stop
var mw_p1_alarm_trip
var mw_p1_no_flow

//Pump2
var mw_p2_runtime
var mw_p2_actual_speed
var mw_p2_number_of_starts
var mw_p2_running
var mw_p2_status
var mw_p2_mode
var mw_p2_emergency_stop
var mw_p2_alarm_trip
var mw_p2_no_flow

//Pump3
var mw_p3_runtime
var mw_p3_actual_speed
var mw_p3_number_of_starts
var mw_p3_running
var mw_p3_status
var mw_p3_mode
var mw_p3_emergency_stop
var mw_p3_alarm_trip
var mw_p3_no_flow


//GroundWater

//Humansdorp 1
var hup1_ut
var hup1_voltage
var hup1_battery
var hup1_charge
var hup1_fault
var hup1_24_timer
var hup1_borehole_level_pr_fault
var hup1_stop_level
var hup1_no_flow_fault
var hup1_mode //8 9
var hup1_pump_mode//10 11
var hup1_trip_fault
var hup1_estop_active
var hup1_pump_general_fault
var hup1_pump_suf
var hup1_borehole_lvl
var hup1_flow_rate
var hup1_total_flow
var hup1_run_hours
var hup1_pump_timer
var hup1_pump_array

//Humansdorp 2
var hup2_ut
var hup2_voltage
var hup2_battery
var hup2_charge
var hup2_fault
var hup2_24_timer
var hup2_borehole_level_pr_fault
var hup2_stop_level
var hup2_no_flow_fault
var hup2_mode //8 9
var hup2_pump_mode//10 11
var hup2_trip_fault
var hup2_estop_active
var hup2_pump_general_fault
var hup2_pump_suf
var hup2_borehole_lvl
var hup2_flow_rate
var hup2_total_flow
var hup2_run_hours
var hup2_pump_timer
var hup2_pump_array
//Humansdorp 3
var hup3_ut
var hup3_voltage
var hup3_battery
var hup3_charge
var hup3_fault
var hup3_24_timer
var hup3_borehole_level_pr_fault
var hup3_stop_level
var hup3_no_flow_fault
var hup3_mode //8 9
var hup3_pump_mode//10 11
var hup3_trip_fault
var hup3_estop_active
var hup3_pump_general_fault
var hup3_pump_suf
var hup3_borehole_lvl
var hup3_flow_rate
var hup3_total_flow
var hup3_run_hours
var hup3_pump_timer
var hup3_pump_array
//Humansdorp 4
var hup4_ut
var hup4_voltage
var hup4_battery
var hup4_charge
var hup4_fault
var hup4_24_timer
var hup4_borehole_level_pr_fault
var hup4_stop_level
var hup4_no_flow_fault
var hup4_mode //8 9
var hup4_pump_mode//10 11
var hup4_trip_fault
var hup4_estop_active
var hup4_pump_general_fault
var hup4_pump_suf
var hup4_borehole_lvl
var hup4_flow_rate
var hup4_total_flow
var hup4_run_hours
var hup4_pump_timer
var hup4_pump_array

//Humansdorp 6
var hup6_ut
var hup6_voltage
var hup6_battery
var hup6_charge
var hup6_fault
var hup6_24_timer
var hup6_borehole_level_pr_fault
var hup6_stop_level
var hup6_no_flow_fault
var hup6_mode //8 9
var hup6_pump_mode//10 11
var hup6_trip_fault
var hup6_estop_active
var hup6_pump_general_fault
var hup6_pump_suf
var hup6_borehole_lvl
var hup6_flow_rate
var hup6_total_flow
var hup6_run_hours
var hup6_pump_timer
var hup6_pump_array



var oli_lvl
var oli_ut



//Communication
var npp_g_ut


//General
var npp_g_run_hours
var npp_g_total_flow
var npp_g_total_yield_to_date
var npp_g_annual_yield_set_point
var npp_g_recovery_time
var npp_g_targetflowsetpoint

//k (k is for kW meaning power)
var npp_k_voltage
var npp_k_power
var npp_k_current
var npp_k_total_power



///////Pump
var npp_p_borehole_level
var npp_p_flow_rate //next to flow meter
var npp_p_mode
var npp_p_status
var npp_p_pressure

var npp_p_vsdfrequency
//Pressure and vsd is not there just say not available

//mode

var npp_f_pumprunning
var npp_f_fault_active

//Faults
var npp_f_estopactive
var npp_f_vsdfault
var npp_f_panel_door_open
var npp_f_low_flow
var npp_f_charge_ok
var npp_f_low_level
var npp_f_annual_abstraction_limit_reached
var npp_f_flow_coms_fail
var npp_f_level_warning
var npp_f_pump_rest
var npp_f_recovery_level_not_reached
var npp_f_fault_active
var npp_f_voltage_ok





/////////////////////////////FPT

//Bethelsdorp
var beth_flowrate
var beth_totalflow
var beth_pressure
var beth_ut
var beth_array

var beth_battery_status // Trend Every 24 hours

//FM Tower
var fmt_FM_UT
var fmt_FM_GAS_L
var fmt_FM_BATTERY_V
var fmt_FM_FR
var fmt_FM_TF

var fmt_FM_PRESS

var fmt_FM_LOW_B
var fmt_FM_ALM_ARMD
var fmt_FM_CHAMBER_TAMP
var fmt_FM_SOLAR_PANEL_TAMP
var fmt_FM_DOOR_OPENED
var fmt_FM_PEPPER_S_ARMD
var fmt_FM_PEPPER_S_ALM
// Coega IDZT
var fpt_cidzt_ut

var fpt_fidzt_surge_arrester_fault
var fpt_cidzt_charger_fault
var fpt_cidzt_panel_door
var fpt_cidzt_battery

var fpt_cidzt_idz_fm_s
var fpt_cidzt_mw_fm_s

var fpt_cidzt_idz_fr
var fpt_cidzt_idz_tf

var fpt_cidzt_mw_fr
var fpt_cidzt_mw_tf

// Gamtoos Bridge
var fpt_gt_brg_ut
var fpt_gt_brg_stl_p_press
var fpt_gt_brg_soco_p_press
var fpt_gt_brg_stl_p_fr
var fpt_gt_brg_stl_p_tf
var fpt_gt_brg_soco_p_fr
var fpt_gt_brg_soco_p_tf

var fpt_gt_brg_panel_door
var fpt_gt_brg_battery
var fpt_gt_brg_steal_p_press_analog_s
var fpt_gt_brg_soco_p_press_analog_s
var fpt_gt_brg_fm_stl_p_comms_s
var fpt_gt_brg_fm_soco_p_comms_s


// UITENHAGE FLOW CHAMBER
var fpt_uit_fc_ut
var fpt_uit_fc_press
var fpt_uit_fc_fr
var fpt_uit_fc_tf

var fpt_uit_fc_surge_arrester_fault
var fpt_uit_fc_charger_fault
var fpt_uit_fc_panel_door
var fpt_uit_fc_battery
var fpt_uit_fc_remote_io_comms
var fpt_uit_fc_flow_switch1
var fpt_uit_fc_flow_switch2
var fpt_uit_fc_pressure_analog_signal
var fpt_uit_fc_flow_meter_comms



// WTW
var wtw_ngt_ut
var wtw_ngt_low_lift_fr
var wtw_ngt_high_lift_fr


var wtw_elands_ut
var wtw_elands_FR
var wtw_elands_P
// var wtw_elands_

//#region Feed Lots
var wes1_fl_ut
//#region Wessels
//500
var wes1_mbw_success = 0

var wes1_fl_p1_feed_A
var wes1_fl_p1_feed_B
var wes1_fl_p1_feed_C
var wes1_fl_p2_feed_A
var wes1_fl_p2_feed_B
var wes1_fl_p2_feed_C
var wes1_fl_p3_feed_A
var wes1_fl_p3_feed_B
var wes1_fl_p3_feed_C
var wes1_fl_p4_feed_A
var wes1_fl_p4_feed_B
var wes1_fl_p4_feed_C
var wes1_fl_p5_feed_A
var wes1_fl_p5_feed_B
var wes1_fl_p5_feed_C
var wes1_fl_p6_feed_A
var wes1_fl_p6_feed_B
var wes1_fl_p6_feed_C
var wes1_fl_p7_feed_A
var wes1_fl_p7_feed_B
var wes1_fl_p7_feed_C
var wes1_fl_p8_feed_A
var wes1_fl_p8_feed_B
var wes1_fl_p8_feed_C
var wes1_fl_p9_feed_A
var wes1_fl_p9_feed_B
var wes1_fl_p9_feed_C
var wes1_fl_p10_feed_A
var wes1_fl_p10_feed_B
var wes1_fl_p10_feed_C
var wes1_fl_p11_feed_A
var wes1_fl_p11_feed_B
var wes1_fl_p11_feed_C
var wes1_fl_p12_feed_A
var wes1_fl_p12_feed_B
var wes1_fl_p12_feed_C
var wes1_f1_feed_A_total
var wes1_f1_feed_B_total
var wes1_f1_feed_C_total

//190
var wes2_fl_p1_lambs
var wes2_fl_p2_lambs
var wes2_fl_p3_lambs
var wes2_fl_p4_lambs
var wes2_fl_p5_lambs
var wes2_fl_p6_lambs
var wes2_fl_p7_lambs
var wes2_fl_p8_lambs
var wes2_fl_p9_lambs
var wes2_fl_p10_lambs
var wes2_fl_p11_lambs
var wes2_fl_p12_lambs
var wes_fl_saft
var wes_fl_sbft
var wes_fl_scft
//158
var wes2_fl_pen1_feed_type
var wes2_fl_pen2_feed_type
var wes2_fl_pen3_feed_type
var wes2_fl_pen4_feed_type
var wes2_fl_pen5_feed_type
var wes2_fl_pen6_feed_type
var wes2_fl_pen7_feed_type
var wes2_fl_pen8_feed_type
var wes2_fl_pen9_feed_type
var wes2_fl_pen10_feed_type
var wes2_fl_pen11_feed_type
var wes2_fl_pen12_feed_type
//171
var wes2_fl_sa_silo_levels
var wes2_fl_sb_silo_levels
var wes2_fl_sc_silo_levels



//input
var wes2_fl_p1_lambs_input
var wes2_fl_p2_lambs_input
var wes2_fl_p3_lambs_input
var wes2_fl_p4_lambs_input
var wes2_fl_p5_lambs_input
var wes2_fl_p6_lambs_input
var wes2_fl_p7_lambs_input
var wes2_fl_p8_lambs_input
var wes2_fl_p9_lambs_input
var wes2_fl_p10_lambs_input
var wes2_fl_p11_lambs_input
var wes2_fl_p12_lambs_input

var wes2_fl_pen1_feed_type_input
var wes2_fl_pen2_feed_type_input
var wes2_fl_pen3_feed_type_input
var wes2_fl_pen4_feed_type_input
var wes2_fl_pen5_feed_type_input
var wes2_fl_pen6_feed_type_input
var wes2_fl_pen7_feed_type_input
var wes2_fl_pen8_feed_type_input
var wes2_fl_pen9_feed_type_input
var wes2_fl_pen10_feed_type_input
var wes2_fl_pen11_feed_type_input
var wes2_fl_pen12_feed_type_input
//#endregion

//#endregion


//#Region storms
var ps_storm_UT
var ps_storms_gp1_mode
var ps_storms_gp1_status
var ps_storms_gp1_fault_general
var ps_storms_gp1_vsd_fault
var ps_storms_gp1_startup_fault
var ps_storms_gp1_no_flow_fault
var ps_storms_gp2_mode
var ps_storms_gp2_status
var ps_storms_gp2_fault_general
var ps_storms_gp2_vsd_fault
var ps_storms_gp2_startup_fault
var ps_storms_gp2_no_flow_fault
var ps_storms_qp1_mode
var ps_storms_qp1_status
var ps_storms_qp1_fault_general
var ps_storms_qp1_vsd_fault
var ps_storms_qp1_startup_fault
var ps_storms_qp1_no_flow_fault
var ps_storms_qp2_mode
var ps_storms_qp2_status
var ps_storms_qp2_fault_general
var ps_storms_qp2_vsd_fault
var ps_storms_qp2_startup_fault
var ps_storms_qp2_no_flow_fault
var ps_storms_quarry_fill
var ps_storms_clear_water_tank_fill
var ps_storms_emergency_stop
var ps_storms_charger_fault
var ps_storms_flood_warning
var ps_storms_wtw_comms
var ps_storms_voltage_ok
var ps_storms_gpump1_run_hours
var ps_storms_gpump2_run_hours
var ps_storms_qpump1_run_hours
var ps_storms_qpump2_run_hours
var ps_storms_gorge_level
var ps_storms_quarry_level
var ps_storms_array

var gp1_status_previous_status
var gp2_status_previous_status
var qp1_status_previous_status
var qp2_status_previous_status

var wtw_storms_UT
var wtw_storms_filter_pump1_mode
var wtw_storms_filter_pump1_status
var wtw_storms_filter_pump2_mode
var wtw_storms_filter_pump2_status
var wtw_storms_high_lift_pump1_mode
var wtw_storms_high_lift_pump1_status
var wtw_storms_high_lift_pump2_mode
var wtw_storms_high_lift_pump2_status
var wtw_storms_clear_water_tank_high_high
var wtw_storms_clear_water_tank_high
var wtw_storms_clear_water_tank_low
var wtw_storms_holding_reservoir_high
var wtw_storms_holding_reservoir_low
var wtw_storms_overhead_tank_high
var wtw_storms_overhead_tank_low
var wtw_storms_surge_arrester
var wtw_storms_door_mag
var wtw_storms_battery_low
var wtw_storms_voltage_ok
var wtw_storms_filter_pump1_run_hours
var wtw_storms_filter_pump2_run_hours
var wtw_storms_high_lift_pump1_run_hours
var wtw_storms_high_lift_pump2_run_hours
var wtw_storms_holding_reservoir_level
var wtw_storms_overhead_tank_level
var wtw_storms_pulse_count1_Total_Flow
var wtw_storms_pulse_count2_Total_Flow
var wtw_storms_array



//Kareedouw K1
var gw_kark_k1_UT
var gw_kark_k1_level
var gw_kark_k1_run_hours
var gw_kark_k1_flow_rate
var gw_kark_k1_total_flow
var gw_kark_k1_current

var gw_kark_k1_mode
var gw_kark_k1_status
var gw_kark_k1_run_time_remaining
var gw_kark_k1_rest_time_remaining

var gw_kark_k1_estop
var gw_kark_k1_vsd_fault
var gw_kark_k1_voltage_ok
var gw_kark_k1_panel_door_open
var gw_kark_k1_low_flow_fault
var gw_kark_k1_charger_ok
var gw_kark_k1_borehol_low_level_fault
var gw_kark_k1_surge_arrester_ok
var gw_kark_k1_flow_comms
var gw_kark_k1_warning_level
var gw_kark_k1_room_alarm

var gw_kark_k2_UT
var gw_kark_k2_level
var gw_kark_k2_run_hours
var gw_kark_k2_flow_rate
var gw_kark_k2_total_flow
var gw_kark_k2_current
var gw_kark_k2_mode
var gw_kark_k2_status
var gw_kark_k2_run_time_remaining
var gw_kark_k2_rest_time_remaining
var gw_kark_k2_estop
var gw_kark_k2_vsd_fault
var gw_kark_k2_voltage_ok
var gw_kark_k2_panel_door_open
var gw_kark_k2_low_flow_fault
var gw_kark_k2_charger_ok
var gw_kark_k2_borehol_low_level_fault
var gw_kark_k2_surge_arrester_ok
var gw_kark_k2_flow_comms
var gw_kark_k2_warning_level
var gw_kark_k2_room_alarm
//Emeraldhill

var emer_lvl
var emer_ut
var emer_flow_rate
var emer_total_flow
var emer_battery_low
var emer_charger_ok





var batteryUnitUpdate


//DriftSands
var drift_r_alarm_armed
var drift_r_room_alarm
var drift_r_ut
var drift_r_solar_alarm
var drift_r_door_alarm
var drift_r_pepper_spray_armed
var drift_r_pepper_spray_alarm
var drift_r_pepper_spray_gas_left
var drift_r_pepper_spray_battery_voltage
var drift_r_reservoir_level
var drift_r_flow_rate_1
var drift_r_flow_rate_2
var drift_r_total_flow_1
var drift_r_total_flow_2

//Schoemanshoek
var kwano_r_alarm_armed
var kwano_r_room_alarm
var kwano_r_ut
var kwano_r_solar_alarm
var kwano_r_door_alarm
var kwano_r_pepper_spray_armed
var kwano_r_pepper_spray_alarm
var kwano_r_pepper_spray_gas_left
var kwano_r_pepper_spray_battery_voltage
var kwano_r_reservoir_level
var kwano_r_flow_rate_1
var kwano_r_flow_rate_2
var kwano_r_total_flow_1
var kwano_r_total_flow_2

//Test-Site-Control

var test_mbw_success
var test_ps_control
var test_ps_speed


///automotive
var isuzu_ut
var isuzu_oven1_vsd_speed
var isuzu_oven1_heat_ecvh_temp;
var isuzu_oven1_temp1
var isuzu_oven1_temp2

var isuzu_oven2_vsd_speed
var isuzu_oven2_heat_ecvh_temp;
var isuzu_oven2_temp1
var isuzu_oven2_temp2



//FPT jeffreysbay

var jeff_bay_off_take_battery_level
var jeff_bay_off_take_last_update
var jeff_bay_off_take_total_flow
var jeff_bay_off_take_last_seen
var jeff_bay_off_ut

var jb_PB_SFO_ut
var jb_PB_SFO_battery_level
var jb_ST_Francis_OffTake_Total_Flow
var jb_Para_Bea_TF
var jb_PB_SFO_last_seen

var ons_para_ut
var ons_para_battery_level
var ons_para_TF
var ons_para_last_seen

var kou_main_line_ut
var kou_main_line_battery_level
var kou_main_line_pressure
var kou_main_line_last_seen

var humansdorp_off_take_battery_level
var humansdorp_off_take_ut
var humansdorp_off_take_pressure
var humansdorp_off_TF
var humansdorp_off_take_last_seen




//Humerail Borehol

var hum_gw_last_update
var hum_gw_voltage_ok
var hum_gw_mode
var hum_gw_pump_status
var hum_gw_VSD_Fault
var hum_gw_borehole_low_level_fault
var hum_gw_raw_water_tank_low_level_fault
var hum_gw_raw_water_tank_high_level_fault
var hum_gw_final_water_tank_low_level_fault
var hum_gw_final_water_tank_high_level_fault

var hum_gw_run_hours

var hum_gw_flow_meter_1_flow_rate
var hum_gw_flow_meter_1_total_flow
var hum_gw_flow_meter_2_flow_rate
var hum_gw_flow_meter_2_total_flow
var hum_gw_flow_meter_3_flow_rate
var hum_gw_flow_meter_3_total_flow

var hum_gw_borehole_lvl
var hum_gw_raw_water_tank_lvl
var hum_gw_final_water_tank_lvl
var hum_gw_pressure;



var kark_R_comms_UT
var kark_R_lvl
var kark_R_battery_unit_UT
var kark_R_battery_lvl



var gbw_ut
var gbw_line_bar_in
var gbw_line_bar_out
var gbw_mode
var gbw_local_remote

var gbw_status

var gbw_fault_door_opened
var gbw_fault_high_pressure_fault
var gbw_fault_MAC_limit_read
var gbw_surge_arrest_fault
var gbw_valve_fault
var gbw_volt_fault
var gbw_gen_fault
var gbw_tank_level
var gbw_actual_pressure
var gbw_flow_rate
var gbw_tf_for_to_sum
var gbw_tf_res_to_con


var bush_UT;
var bush_church_socco_fr;
var bush_church_steel_fr;
var bush_church_socco_bar;
var bush_church_steel_bar;
var bush_pump_fr;
var bush_gw_comb_flow_rate;
var bush_tank_lvl;

var bush_gw_TF
var bush_ps_TF
var bush_church_steel_TF
var bush_church_soco_TF


var st_georges_ps_ut
var st_georges_ps_fr
var st_georges_ps_tf
var st_georges_ps_delivery_bar



var hum_gw_voltage_ok_trigger
var hum_gw_VSD_Fault_trigger
var hum_gw_borehole_low_level_fault_trigger
var hum_gw_raw_water_tank_low_level_fault_trigger
var hum_gw_final_water_tank_low_level_fault_trigger


var hum_gw_raw_water_tank_lvl_low_trigger
var hum_gw_raw_water_tank_lvl_high_trigger



var hum_gw_raw_water_tank_lvl_low_trigger
var hum_gw_raw_water_tank_lvl_high_trigger
var hum_gw_final_water_tank_lvl_low_trigger
var hum_gw_final_water_tank_lvl_high_trigger



var gw_klm_kruis12_UT
var gw_klm_kruis12_run_hours
var gw_klm_kruis12_number_of_starts
var gw_klm_kruis12_flow_rate
var gw_klm_kruis12_TF
var gw_klm_kruis12_lvl
var gw_klm_kruis12_bar
var gw_klm_kruis12_control_mode
var gw_klm_kruis12_vsd
var gw_klm_kruis12_target_flow
var gw_klm_kruis12_target_freq
var gw_klm_kruis12_voltage
var gw_klm_kruis12_current
var gw_klm_kruis12_power
var gw_klm_kruis12_total_power
var gw_klm_kruis12_status
var gw_klm_kruis12_bar_fault
var gw_klm_kruis12_lvl_fault
var gw_klm_kruis12_flow_fault
var gw_klm_kruis12_voltage_not_okay
var gw_klm_kruis12_emergency_stop
var gw_klm_kruis12_vsd_fault
var gw_klm_kruis12_res_communication_fault
var gw_klm_kruis12_res_ful
var gw_klm_kruis12_mode


var gw_klm_kruis13_UT
var gw_klm_kruis13_run_hours
var gw_klm_kruis13_number_of_starts
var gw_klm_kruis13_flow_rate
var gw_klm_kruis13_TF
var gw_klm_kruis13_lvl
var gw_klm_kruis13_bar
var gw_klm_kruis13_control_mode
var gw_klm_kruis13_vsd
var gw_klm_kruis13_target_flow
var gw_klm_kruis13_target_freq
var gw_klm_kruis13_voltage
var gw_klm_kruis13_current
var gw_klm_kruis13_power
var gw_klm_kruis13_total_power
var gw_klm_kruis13_status
var gw_klm_kruis13_bar_fault
var gw_klm_kruis13_lvl_fault
var gw_klm_kruis13_flow_fault
var gw_klm_kruis13_voltage_not_okay
var gw_klm_kruis13_emergency_stop
var gw_klm_kruis13_vsd_fault
var gw_klm_kruis13_res_communication_fault
var gw_klm_kruis13_res_ful
var gw_klm_kruis13_mode


var gw_klm_kruis14_UT
var gw_klm_kruis14_run_hours
var gw_klm_kruis14_number_of_starts
var gw_klm_kruis14_flow_rate
var gw_klm_kruis14_TF
var gw_klm_kruis14_lvl
var gw_klm_kruis14_bar
var gw_klm_kruis14_control_mode
var gw_klm_kruis14_vsd
var gw_klm_kruis14_target_flow
var gw_klm_kruis14_target_freq
var gw_klm_kruis14_voltage
var gw_klm_kruis14_current
var gw_klm_kruis14_power
var gw_klm_kruis14_total_power
var gw_klm_kruis14_status
var gw_klm_kruis14_bar_fault
var gw_klm_kruis14_lvl_fault
var gw_klm_kruis14_flow_fault
var gw_klm_kruis14_voltage_not_okay
var gw_klm_kruis14_emergency_stop
var gw_klm_kruis14_vsd_fault
var gw_klm_kruis14_res_communication_fault
var gw_klm_kruis14_res_ful
var gw_klm_kruis14_mode


var klm_kruisR_high_float
var klm_kruisR_low_float
var klm_kruisR_surge_arrester
var klm_kruisR_charger_status
var klm_kruisR_door_status
var klm_kruisR_ut
var klm_kruisR_lvl


var temp_lvl



var dbo


// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect(standardConnectionString, function(err, db) {
//   if (err) throw err;
//    dbo = db.db("HawkEye");

// })


var oneLargeValue = {}
