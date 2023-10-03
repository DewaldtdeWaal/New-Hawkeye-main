const express = require('express'),
      app = express(),
      server = require('http').createServer(app);
const { emit } = require('process');
const net = require('net');
const Modbus = require('jsmodbus');
var gvar = require('./variables')
const io = require('socket.io')(server);
var sendSignal = 60000


var num;
module.exports ={
  readVal_NMB_CGK_R,
  read_cloudworks,
  readVal_GB_R,
  readVal_BH_R,
  readval_kuis_r,
  readVal_VS_R,
  readVal_HB_PS_R,
  readVal_LH_PS_R,
  readVal_TC_PS_R,
  readVal_GBW_FPT,
  readVal_BUSH_R,
  readVal_CHE_R,
  readVal_Emer_R,
  readVal_MALI_R,
  readVal_DRIFT_R,
  readVal_KWANO_R,
  readVal_RD_R,
  readVal_SCHOE_R,
  readVal_Oli_R,
  readVal_SM_R,
  readVal_VRH_R_PS,
  readVal_GR_R,
  readVal_CHT_R,
  readVal_VS_PS,
  readVal_BH_PS,
  readVal_BF_PS_R,
  readVal_HB_PS_R_2,
  readVal_VW_PS,
  readVal_NMU_EFF_PS,
  readVal_STAN_PS,
  readVal_NM_NPP_GW,
  readVal_FMT1_FM,
  readVal_FMT2_FM,
  readVal_SM_FM,
  readVal_CIDZT_FPT,
  readVal_GT_BRG_FPT,
  readVal_CG_PS,
  readVal_UIT_FC_FPT,
  readVal_NGT_WTW,
  readVal_ELANDS_WTW,
  readVal_MW_PS_G,
  readVal_MW_PS,
  readVal_storm_ps,
  readVal_storm_wtw,
  readVal_BETH_FPT,
  Stan_PS_ControlWord,
  Wes_PS_ControlWord,
  readVal_HUP_GW,
  readVal_HUP2_GW,
  readVal_HUP3_GW,
  readVal_HUP4_GW,
  readVal_HUP6_GW,
  readVal_KARK_K1_GW,
  readVal_KARK_K2_GW,
  readVal_HUM_GW,
  readVal_wes1_fl,
  readVal_wes2_fl,
  // graaf_cloudworks,
  // graaf_cloudworks2,
  readVal_ISUZU_AUTO
};







app.use(express.static(__dirname + '/dist'));


let sockets = new Set();

io.on('connection', socket => {
  sockets.add(socket);
   console.log(`Socket ${socket.id} added`);


  socket.on('disconnect', () => {
    console.log(`Deleting socket: ${socket.id}`);
    sockets.delete(socket);
    console.log(`Remaining sockets: ${sockets.size}`);
  });

});






/////////////////////////////////////////////    GREENBUSHES RESERVOIR
function readVal_GB_R(){
  for (const s of sockets) {
    s.emit('gb_fr',{gb_fr: gvar.gb_R_FR}),
    s.emit('gb_rl',{gb_rl: gvar.gb_R_LVL}),
    s.emit('gb_frf',{gb_frf: gvar.gb_R_FRF}),
    s.emit('gb_frr',{gb_frr: gvar.gb_R_FRR}),
    s.emit('gb_sa',{gb_sa: gvar.gb_R_SURGE_ARRESTOR}),
    s.emit('gb_chs',{gb_chs: gvar.gb_R_CHARGER_STATUS}),
    s.emit('gb_d',{gb_d: gvar.gb_R_DOOR}),
    s.emit('gb_ut',{gb_ut: gvar.gb_R_UT})}

    setTimeout(readVal_GB_R, sendSignal);
}
/////////////////////////////////////////////   BlUE HORIZON RESERVOIR
function readVal_BH_R(){
  for (const s of sockets) {
    s.emit('bh_rl',{bh_rl:gvar.bh_R_LVL})
    s.emit('bh_ut',{bh_ut:gvar.bh_R_UT})
   } setTimeout(readVal_BH_R, sendSignal);
}

/////////////////////////////////////////////   VAN STADENS RESERVOIR
function readVal_VS_R(){
  for (const s of sockets) {
    s.emit('vs_rl',{vs_rl:gvar.vs_R_LVL})
    s.emit('vs_fr',{vs_fr: gvar.vs_R_FR}),
    s.emit('vs_sa',{vs_sa: gvar.vs_R_SURGE_ARRESTOR}),
    s.emit('vs_chs',{vs_chs: gvar.vs_R_CHARGER_STATUS}),
    s.emit('vs_d',{vs_d: gvar.vs_R_DOOR}),
    s.emit('vs_ut',{vs_ut: gvar.vs_R_UT})
   } setTimeout(readVal_VS_R, sendSignal);
}
//         /////////////////////////////////////////////   HB1 PUMP STATION
function readVal_HB_PS_R(){
     for (const s of sockets) {
      s.emit('hb_rl',{hb_rl:gvar.hb_R_LVL})
      s.emit('hb_ut',{hb_ut:gvar.hb_R_UT})

      //s.emit('hb_ps_ut',{hb_ps_ut:gvar.hb_PS_UT})
      s.emit('hb_p1_status',{hb_p1_status:gvar.hb_P1_STATUS})
      s.emit('hb_p1_mode',{hb_p1_mode:gvar.hb_P1_MODE})
      s.emit('hb_p1_pump_cb_trip_fault',{hb_p1_pump_cb_trip_fault:gvar.hb_P1_PUMP_CB_TRIP_FAULT})
      s.emit('hb_p1_startup_fault',{hb_p1_startup_fault:gvar.hb_P1_STARTUP_FAULT})
      s.emit('hb_p1_estop_fault',{hb_p1_estop_fault:gvar.hb_P1_ESTOP_FAULT})
      s.emit('hb_p1_no_flow_fault',{hb_p1_no_flow_fault:gvar.hb_P1_NO_FLOW_FAULT})

      s.emit('hb_p2_status',{hb_p2_status:gvar.hb_P2_STATUS})
      s.emit('hb_p2_mode',{hb_p2_mode:gvar.hb_P2_MODE})
      s.emit('hb_p2_pump_cb_trip_fault',{hb_p2_pump_cb_trip_fault:gvar.hb_P2_PUMP_CB_TRIP_FAULT})
      s.emit('hb_p2_startup_fault',{hb_p2_startup_fault:gvar.hb_P2_STARTUP_FAULT})
      s.emit('hb_p2_estop_fault',{hb_p2_estop_fault:gvar.hb_P2_ESTOP_FAULT})
      s.emit('hb_p2_no_flow_fault',{hb_p2_no_flow_fault:gvar.hb_P2_NO_FLOW_FAULT})

      s.emit('hb_p3_status',{hb_p3_status:gvar.hb_P3_STATUS})
      s.emit('hb_p3_mode',{hb_p3_mode:gvar.hb_P3_MODE})
      s.emit('hb_p3_pump_cb_trip_fault',{hb_p3_pump_cb_trip_fault:gvar.hb_P3_PUMP_CB_TRIP_FAULT})
      s.emit('hb_p3_startup_fault',{hb_p3_startup_fault:gvar.hb_P3_STARTUP_FAULT})
      s.emit('hb_p3_estop_fault',{hb_p3_estop_fault:gvar.hb_P3_ESTOP_FAULT})
      s.emit('hb_p3_no_flow_fault',{hb_p3_no_flow_fault:gvar.hb_P3_NO_FLOW_FAULT})

     }setTimeout(readVal_HB_PS_R, sendSignal);
    }
//     /////////////////////////////////////////////   BH PUMP STATION
function readVal_LH_PS_R(){
  for(const s of sockets){
    emits([
"lh_R_OVER_LVL",
"lh_UT",
"lh_P1_RH",
"lh_P1_MODE",
"lh_P1_STATUS",
"lh_P1_SOFT_S_FAULT",
"lh_P1_NO_FLOW_FAULT",
"lh_P1_ESTOP_FAULT",
"lh_P2_RH",
"lh_P2_MODE",
"lh_P2_STATUS",
"lh_P2_SOFT_S_FAULT",
"lh_P2_NO_FLOW_FAULT",
"lh_P2_ESTOP_FAULT",

   ])
  }setTimeout(readVal_LH_PS_R,sendSignal);
}

      function readVal_TC_PS_R(){
        for (const s of sockets) {
          s.emit('tc_rl',{tc_rl:gvar.tc_R_LVL})
          s.emit('tc_ut',{tc_ut:gvar.tc_R_UT})
          s.emit('tc_high_f',{tc_high_f:gvar.tc_R_HIGH_FLOAT})
          s.emit('tc_low_f',{tc_low_f:gvar.tc_R_LOW_FLOAT})

          s.emit('tc_ps_ut',{tc_ps_ut:gvar.tc_PS_UT})
          s.emit('tc_g_sp',{tc_g_sp:gvar.tc_G_SP})

          s.emit('tc_p1_power',{tc_p1_power:gvar.tc_P1_POWER})
          s.emit('tc_p1_mode',{tc_p1_mode:gvar.tc_P1_MODE})
          s.emit('tc_p1_status',{tc_p1_status:gvar.tc_P1_STATUS})
          s.emit('tc_p1_rh',{tc_p1_rh:gvar.tc_P1_RH})
          s.emit('tc_p1_press_diff',{tc_p1_press_diff:gvar.tc_P1_PRESS_DIFF})
          s.emit('tc_p1_pump_trip_fault',{tc_p1_pump_trip_fault:gvar.tc_P1_PUMP_TRIP_FAULT})
          s.emit('tc_p1_estop_fault',{tc_p1_estop_fault:gvar.tc_P1_ESTOP_FAULT})
          s.emit('tc_p1_no_flow_fault',{tc_p1_no_flow_fault:gvar.tc_P1_NO_FLOW_FAULT})
          s.emit('tc_p1_earth_fault',{tc_p1_earth_fault:gvar.tc_P1_EARTH_FAULT})

          s.emit('tc_p2_power',{tc_p2_power:gvar.tc_P2_POWER})
          s.emit('tc_p2_mode',{tc_p2_mode:gvar.tc_P2_MODE})
          s.emit('tc_p2_status',{tc_p2_status:gvar.tc_P2_STATUS})
          s.emit('tc_p2_rh',{tc_p2_rh:gvar.tc_P2_RH})
          s.emit('tc_p2_press_diff',{tc_p2_press_diff:gvar.tc_P2_PRESS_DIFF})
          s.emit('tc_p2_pump_trip_fault',{tc_p2_pump_trip_fault:gvar.tc_P2_PUMP_TRIP_FAULT})
          s.emit('tc_p2_estop_fault',{tc_p2_estop_fault:gvar.tc_P2_ESTOP_FAULT})
          s.emit('tc_p2_no_flow_fault',{tc_p2_no_flow_fault:gvar.tc_P2_NO_FLOW_FAULT})
          s.emit('tc_p2_earth_fault',{tc_p2_earth_fault:gvar.tc_P2_EARTH_FAULT})

          s.emit('tc_p3_power',{tc_p3_power:gvar.tc_P3_POWER})
          s.emit('tc_p3_mode',{tc_p3_mode:gvar.tc_P3_MODE})
          s.emit('tc_p3_status',{tc_p3_status:gvar.tc_P3_STATUS})
          s.emit('tc_p3_rh',{tc_p3_rh:gvar.tc_P3_RH})
          s.emit('tc_p3_press_diff',{tc_p3_press_diff:gvar.tc_P3_PRESS_DIFF})
          s.emit('tc_p3_pump_trip_fault',{tc_p3_pump_trip_fault:gvar.tc_P3_PUMP_TRIP_FAULT})
          s.emit('tc_p3_estop_fault',{tc_p3_estop_fault:gvar.tc_P3_ESTOP_FAULT})
          s.emit('tc_p3_no_flow_fault',{tc_p3_no_flow_fault:gvar.tc_P3_NO_FLOW_FAULT})
          s.emit('tc_p3_earth_fault',{tc_p3_earth_fault:gvar.tc_P3_EARTH_FAULT})

       }setTimeout(readVal_TC_PS_R,sendSignal);
        }


        function readVal_GBW_FPT(){
        for(const s of sockets){
          emits([
          "gbw_ut",
          "gbw_line_bar_in",
          "gbw_line_bar_out",
          "gbw_mode",
          "gbw_local_remote",
          "gbw_status",
          "gbw_fault_door_opened",
          "gbw_fault_high_pressure_fault",
          "gbw_fault_MAC_limit_read",
          "gbw_surge_arrest_fault",
          "gbw_valve_fault",
          "gbw_volt_fault",
          "gbw_gen_fault",
          "gbw_tank_level",
          "gbw_actual_pressure",
          "gbw_flow_rate",
          "gbw_tf_for_to_sum",
          "gbw_tf_res_to_con",

          ])
        }setTimeout(readVal_GBW_FPT, sendSignal);

        }


        function readVal_BUSH_R(){
          for(const s of sockets){
            emits([
               "bush_UT",
               "bush_church_socco_fr",
               "bush_church_steel_fr",
               "bush_church_socco_bar",
               "bush_church_steel_bar",
               "bush_pump_fr",
               "bush_gw_comb_flow_rate",
               "bush_tank_lvl",

            ])
          }setTimeout(readVal_BUSH_R, sendSignal);

          }






    function readVal_NMB_CGK_R(){
      for(const s of sockets){
        emits([
          "nmb_cgk_r_ut",
          "nmb_cgk_r_reservoir_level",
          "nmb_cgk_r_actuator_status",
          "nmb_cgk_r_mode",
          "nmb_cgk_r_control_valve_1",
          "nmb_cgk_r_control_valve_2",
          "nmb_cgk_r_res_warning_level",
          "nmb_cgk_r_res_level_sensor",
          "nmb_cgk_r_valve_chamber_pressure_sensor",
          "nmb_cgk_r_chargerstatus",

          "nmb_cgk_r_fault_status",

          "nmb_cgk_r_valve_chamber_pressure",
          "nmb_cgk_r_grassridge_inlet_flow_meter",
          "nmb_cgk_r_grassridge_inlet_flow_rate",
          "nmb_cgk_r_grassridge_inlet_total_flow",
          "nmb_cgk_r_coega_idz_outlet_flow_meter",
          "nmb_cgk_r_coega_idz_outlet_flow_rate",
          "nmb_cgk_r_coega_idz_outlet_total_flow",
          "nmb_cgk_r_mother_outlet_flow_meter_analog_signal",
          "nmb_cgk_r_motherwell_outlet_flow_rate",
          "nmb_cgk_r_motherwell_outlet_total_flow",
          "nmb_cgk_r_fault_statuses"
        ])
      }setTimeout(readVal_NMB_CGK_R,sendSignal);
    }





    function read_cloudworks(){
      for(const s of sockets){
        emits([
       "wolwas_r_ut",
       "wolwas_r_level",
       "wolwas_r_battery_level",
       "wolwas_r_poll_ut",
       "bergen_r_ut",
       "bergen_r_level",
       "bergen_r_battery_level",
       "bergen_r_poll_ut",
       "uma_r_ut",
       "uma_r_level",
       "uma_r_battery_level",
       "uma_r_poll_ut",
       "kroon_r_ut",
       "kroon_r_level",
       "kroon_r_battery_level",
       "kroon_r_poll_ut",
       "oli_lvl",
      "oli_ut",
      "tin_r_ut",
    "tin_r_level",
    "tin_r_battery_level",
    "tin_r_poll_ut",
    "hol_r_ut",
    "hol_r_level",
    "bergen_r_battery_level",
    "hol_r_battery_level",
    "hol_r_poll_ut",
    "jb_PB_SFO_ut",
    "jb_PB_SFO_battery_level",
    "jb_ST_Francis_OffTake_Total_Flow",
    "jb_Para_Bea_TF",
    "jb_PB_SFO_last_seen",
    "ons_para_ut",
    "ons_para_battery_level",
    "ons_para_TF",
    "ons_para_last_seen",
    "kou_main_line_ut",
    "kou_main_line_battery_level",
    "kou_main_line_pressure",
    "kou_main_line_last_seen",
    "humansdorp_off_take_battery_level",
    "humansdorp_off_take_ut",
    "humansdorp_off_take_pressure",
    "humansdorp_off_TF",
    "humansdorp_off_take_last_seen",

    "coe_kop_cloud_r_ut",
    "coe_kop_cloud_r_level",
    "coe_kop_r_battery_level",
    "coe_kop_r_battery_poll_ut",
        ])
      }setTimeout(read_cloudworks,sendSignal);
    }












    function readVal_CHE_R(){
      for (const s of sockets) {
        emits([
          "che_ps_pumpset_g_control_voltage_loss",
          "che_ps_flood_alarm",
          "che_ps_700_flow_rate",
          "che_ps_moth_760_mm",
          "che_ps_moth_900_mm",
          "che_ps_walk_drive_off_500_mm",
          "che_ps_pumpset_1_no_flow_fault",
          "che_ps_pumpset_1_ESTOP",
          "che_ps_pumpset_1_circuit_breaker_trip",
          "che_ps_pumpset_1_drive_fault",
          "che_ps_pumpset_1_pres_fault",
          "che_ps_pumpset_1_temp_fault",
          "che_ps_pumpset_1_vib_fault",
          "che_ps_pumpset_1_pumpstatus",
          "che_ps_pumpset_1_run_hours",
          "che_ps_pumpset_1_del_pressure",
          "che_ps_pumpset_1_suct_pressure",
          "che_ps_pumpset_1_vsd_actual_speed",
          "che_ps_pumpset_1_current",
          "che_ps_pumpset_1_power",
          "che_ps_pumpset_2_pumpstatus",
          "che_ps_pumpset_2_no_flow_fault",
          "che_ps_pumpset_2_ESTOP",
          "che_ps_pumpset_2_circuit_breaker_trip",
          "che_ps_pumpset_2_drive_fault",
          "che_ps_pumpset_2_pres_fault",
          "che_ps_pumpset_2_temp_fault",
          "che_ps_pumpset_2_vib_fault",
          "che_ps_pumpset_2_mode",
          "che_ps_pumpset_2_run_hours",
          "che_ps_pumpset_2_del_pressure",
          "che_ps_pumpset_2_suct_pressure",
          "che_ps_pumpset_2_vsd_actual_speed",
          "che_ps_pumpset_2_current",
          "che_ps_pumpset_2_power",
          "che_ps_pumpset_3_pumpstatus",
          "che_ps_pumpset_3_no_flow_fault",
          "che_ps_pumpset_3_ESTOP",
          "che_ps_pumpset_3_circuit_breaker_trip",
          "che_ps_pumpset_3_drive_fault",
          "che_ps_pumpset_3_pres_fault",
          "che_ps_pumpset_3_temp_fault",
          "che_ps_pumpset_3_vib_fault",
          "che_ps_pumpset_3_mode",
          "che_ps_pumpset_3_run_hours",
          "che_ps_pumpset_3_del_pressure",
          "che_ps_pumpset_3_suct_pressure",
          "che_ps_pumpset_3_vsd_actual_speed",
          "che_ps_pumpset_3_current",
          "che_ps_pumpset_3_power",
          "che_ps_pumpset_4_pumpstatus",
          "che_ps_pumpset_4_no_flow_fault",
          "che_ps_pumpset_4_ESTOP",
          "che_ps_pumpset_4_circuit_breaker_trip",
          "che_ps_pumpset_4_drive_fault",
          "che_ps_pumpset_4_pres_fault",
          "che_ps_pumpset_4_temp_fault",
          "che_ps_pumpset_4_vib_fault",
          "che_ps_pumpset_4_mode",
          "che_ps_pumpset_4_run_hours",
          "che_ps_pumpset_4_del_pressure",
          "che_ps_pumpset_4_suct_pressure",
          "che_ps_pumpset_4_vsd_actual_speed",
          "che_ps_pumpset_4_current",
          "che_ps_pumpset_4_power",
          "che_ps_ut",
          "che_r_ut",
          "che_r_lvl",
          "che_r_lvl_East",
          "che_ps_pumpset_1_mode",
          "che_r_fr1100",
          "che_r_fr600",
          "che_ps_700_total_flow",
          "che_ps_moth_760_mm_total_flow",
          "che_ps_moth_900_mm_total_flow",
          "che_ps_walk_drive_off_500_mm_total_flow",
          "che_r_tf1100",
          "che_r_tf600"

      ])
   }setTimeout(readVal_CHE_R,sendSignal);
         }
       function readVal_Emer_R(){
        for (const s of sockets) {
          emits([
            'emer_lvl',
            'emer_ut',
            'emer_flow_rate',
          'emer_total_flow',
          'emer_battery_low',
          'emer_charger_ok',
          ])
     }setTimeout(readVal_Emer_R,sendSignal);
           }


           function readVal_DRIFT_R(){
            for (const s of sockets) {
              emits([
                     'drift_r_alarm_armed',
                     'drift_r_room_alarm',
                     'drift_r_ut',
                     'drift_r_solar_alarm',
                     'drift_r_door_alarm',
                     'drift_r_pepper_spray_armed',
                     'drift_r_pepper_spray_alarm',
                     'drift_r_pepper_spray_gas_left',
                     'drift_r_pepper_spray_battery_voltage',
                     'drift_r_reservoir_level',
                     'drift_r_flow_rate_1',
                     'drift_r_flow_rate_2',
                     'drift_r_total_flow_1',
                     'drift_r_total_flow_2',
              ])
         }setTimeout(readVal_DRIFT_R,sendSignal);
               }


               function readVal_MALI_R(){
                for (const s of sockets) {
                  emits([

                    "mali_lvl",
                    'mali_ut'

                  ])
                }setTimeout(readVal_MALI_R, sendSignal);
               }




           function readVal_KWANO_R(){
            for (const s of sockets) {
              emits([
                     'kwano_r_alarm_armed',
                     'kwano_r_room_alarm',
                     'kwano_r_ut',
                     'kwano_r_solar_alarm',
                     'kwano_r_door_alarm',
                     'kwano_r_pepper_spray_armed',
                     'kwano_r_pepper_spray_alarm',
                     'kwano_r_pepper_spray_gas_left',
                     'kwano_r_pepper_spray_battery_voltage',
                     'kwano_r_reservoir_level',
                     'kwano_r_flow_rate_1',
                     'kwano_r_flow_rate_2',
                     'kwano_r_total_flow_1',
                     'kwano_r_total_flow_2',
              ])
         }setTimeout(readVal_KWANO_R,sendSignal);
               }












           function readVal_RD_R(){
            for (const s of sockets) {
              emits([
              'rd_r_lvl',
              'rd_r_ut',
              ])
         }setTimeout(readVal_RD_R,sendSignal);
               }


           function readVal_SCHOE_R(){
            for(const s of sockets){
              emits([
                   'nmb_schoe_r_ut',
                   'nmb_schoe_r_voltage_monitor',
                   'nmb_schoe_r_actuator_valve_feedback_signal_error',
                   'nmb_schoe_r_actuator_valve_command_signal_error',
                   'nmb_schoe_r_reservoir_level_signal_error',
                   'nmb_schoe_r_actuator_mode',
                   'nmb_schoe_r_actuator_valve_fault',
                   'nmb_schoe_r_actuator_valve_status',
                   'nmb_schoe_r_actuator_valve_torque_fail_close',
                   'nmb_schoe_r_actuator_valve_torque_fail_open',
                   'nbm_schoe_r_plc_mode',
                   'nmb_schoe_r_general_fault',
                   'nmb_schoe_r_actuator_general_fault',
                   'nmb_schoe_r_actuator_valve_timeout',
                   'nmb_schoe_r_res_level',
                   'nmb_schoe_r_pressure',
                    'nmb_schoe_r_actuator_set_point',
                    'nmb_schoe_r_actuator_position'
              ])
            }setTimeout(readVal_SCHOE_R, 1000)
           }

           function readVal_Oli_R(){
            for (const s of sockets) {
              emits([
                'oli_lvl',
                'oli_ut',
                'batteryUnitUpdate'
              ])
         }setTimeout(readVal_Oli_R,sendSignal);
               }


       function readVal_HUP_GW(){
        for (const s of sockets) {
          emits([
          'hup1_voltage',
          'hup1_ut',
          'hup1_battery',
          'hup1_charge',
          'hup1_fault',
          'hup1_24_timer',
          'hup1_borehole_level_pr_fault',
          'hup1_stop_level',
          'hup1_no_flow_fault',
          'hup1_mode',
          'hup1_pump_mode',
          'hup1_trip_fault',
          'hup1_estop_active',
          'hup1_pump_general_fault',
          'hup1_pump_suf',
          'hup1_borehole_lvl',
          'hup1_flow_rate',
          'hup1_total_flow',
          'hup1_run_hours',
          'hup1_pump_timer'
          ])
     }setTimeout(readVal_HUP_GW,sendSignal);
           }

           function readVal_HUP2_GW(){
            for (const s of sockets) {
              emits([
              'hup2_voltage',
              'hup2_ut',
              'hup2_battery',
              'hup2_charge',
              'hup2_fault',
              'hup2_24_timer',
              'hup2_borehole_level_pr_fault',
              'hup2_stop_level',
              'hup2_no_flow_fault',
              'hup2_mode',
              'hup2_pump_mode',
              'hup2_trip_fault',
              'hup2_estop_active',
              'hup2_pump_general_fault',
              'hup2_pump_suf',
              'hup2_borehole_lvl',
              'hup2_flow_rate',
              'hup2_total_flow',
              'hup2_run_hours',
              'hup2_pump_timer'

              ])
         }setTimeout(readVal_HUP2_GW,sendSignal);
               }

               function readVal_HUP3_GW(){
                for (const s of sockets) {
                  emits([
                  'hup3_voltage',
                  'hup3_ut',
                  'hup3_battery',
                  'hup3_charge',
                  'hup3_fault',
                  'hup3_24_timer',
                  'hup3_borehole_level_pr_fault',
                  'hup3_stop_level',
                  'hup3_no_flow_fault',
                  'hup3_mode',
                  'hup3_pump_mode',
                  'hup3_trip_fault',
                  'hup3_estop_active',
                  'hup3_pump_general_fault',
                  'hup3_pump_suf',
                  'hup3_borehole_lvl',
                  'hup3_flow_rate',
                  'hup3_total_flow',
                  'hup3_run_hours',
                  'hup3_pump_timer'
                  ])
             }setTimeout(readVal_HUP3_GW,sendSignal);
                   }

                   function readVal_HUP4_GW(){
                    for (const s of sockets) {
                      emits([
                      'hup4_voltage',
                      'hup4_battery',
                      'hup4_ut',
                      'hup4_charge',
                      'hup4_fault',
                      'hup4_24_timer',
                      'hup4_borehole_level_pr_fault',
                      'hup4_stop_level',
                      'hup4_no_flow_fault',
                      'hup4_mode',
                      'hup4_pump_mode',
                      'hup4_trip_fault',
                      'hup4_estop_active',
                      'hup4_pump_general_fault',
                      'hup4_pump_suf',
                      'hup4_borehole_lvl',
                      'hup4_flow_rate',
                      'hup4_total_flow',
                      'hup4_run_hours',
                      'hup4_pump_timer',
                      ])
                 }setTimeout(readVal_HUP4_GW,sendSignal);
                       }


                       function readVal_HUP6_GW(){
                        for (const s of sockets) {
                          emits([
                          'hup6_voltage',
                          'hup6_battery',
                          'hup6_ut',
                          'hup6_charge',
                          'hup6_fault',
                          'hup6_24_timer',
                          'hup6_borehole_level_pr_fault',
                          'hup6_stop_level',
                          'hup6_no_flow_fault',
                          'hup6_mode',
                          'hup6_pump_mode',
                          'hup6_trip_fault',
                          'hup6_estop_active',
                          'hup6_pump_general_fault',
                          'hup6_pump_suf',
                          'hup6_borehole_lvl',
                          'hup6_flow_rate',
                          'hup6_total_flow',
                          'hup6_run_hours',
                          'hup6_pump_timer',
                          ])
                     }setTimeout(readVal_HUP6_GW,sendSignal);
                           }

 function readVal_HUM_GW(){
         for (const s of sockets) {
           emits([
                "hum_gw_last_update",
                "hum_gw_voltage_ok",
                "hum_gw_mode",
                "hum_gw_pump_status",
                "hum_gw_VSD_Fault",
                "hum_gw_borehole_low_level_fault",
                "hum_gw_raw_water_tank_low_level_fault",
                "hum_gw_raw_water_tank_high_level_fault",
                "hum_gw_final_water_tank_low_level_fault",
                "hum_gw_final_water_tank_high_level_fault",
                "hum_gw_flow_meter_1_flow_rate",
                "hum_gw_flow_meter_1_total_flow",
                "hum_gw_flow_meter_2_flow_rate",
                "hum_gw_flow_meter_2_total_flow",
                "hum_gw_flow_meter_3_flow_rate",
                "hum_gw_flow_meter_3_total_flow",
                "hum_gw_borehole_lvl",
                "hum_gw_raw_water_tank_lvl",
                "hum_gw_final_water_tank_lvl",
                "hum_gw_pressure",
                "hum_gw_run_hours"

           ])
          }setTimeout(readVal_HUM_GW,sendSignal);
                }


        function readVal_KARK_K1_GW(){
         for (const s of sockets) {
           emits([
            'gw_kark_k1_UT',
            'gw_kark_k1_level',
            'gw_kark_k1_run_hours',
            'gw_kark_k1_flow_rate',
            'gw_kark_k1_total_flow',
            'gw_kark_k1_current',
            'gw_kark_k1_mode',
            'gw_kark_k1_status',
            'gw_kark_k1_run_time_remaining',
            'gw_kark_k1_rest_time_remaining',
            'gw_kark_k1_estop',
            'gw_kark_k1_vsd_fault',
            'gw_kark_k1_voltage_ok',
            'gw_kark_k1_panel_door_open',
            'gw_kark_k1_low_flow_fault',
            'gw_kark_k1_charger_ok',
            'gw_kark_k1_borehol_low_level_fault',
            'gw_kark_k1_surge_arrester_ok',
            'gw_kark_k1_flow_comms',
            'gw_kark_k1_warning_level',
           ])
          }setTimeout(readVal_KARK_K1_GW,sendSignal);
                }


                function readVal_KARK_K2_GW(){
                  for (const s of sockets) {
                    emits([
                     'gw_kark_k2_UT',
                     'gw_kark_k2_level',
                     'gw_kark_k2_run_hours',
                     'gw_kark_k2_flow_rate',
                     'gw_kark_k2_total_flow',
                     'gw_kark_k2_current',
                     'gw_kark_k2_mode',
                     'gw_kark_k2_status',
                     'gw_kark_k2_run_time_remaining',
                     'gw_kark_k2_rest_time_remaining',
                     'gw_kark_k2_estop',
                     'gw_kark_k2_vsd_fault',
                     'gw_kark_k2_voltage_ok',
                     'gw_kark_k2_panel_door_open',
                     'gw_kark_k2_low_flow_fault',
                     'gw_kark_k2_charger_ok',
                     'gw_kark_k2_borehol_low_level_fault',
                     'gw_kark_k2_surge_arrester_ok',
                     'gw_kark_k2_flow_comms',
                     'gw_kark_k2_warning_level',
                    ])
                   }setTimeout(readVal_KARK_K2_GW,sendSignal);
                         }


     function readVal_SM_R(){
      for (const s of sockets) {
         emits([
        'sm_r_lvl',
        'sum_UT'
         ])
      }setTimeout(readVal_SM_R,sendSignal);
          }


       function readVal_VRH_R_PS(){
        for (const s of sockets) {
          emits([
            'vrh_del_rl','vrh_sc_rl','vrh_ut',
            'vrh_g_ps_mode','vrh_g_main_panel_surge','vrh_g_main_panel_voltage',
            'vrh_p1_kw','vrh_p2_kw','vrh_p3_kw',
            'vrh_p1_rpm','vrh_p2_rpm','vrh_p3_rpm',
            'vrh_p1_rt','vrh_p2_rt','vrh_p3_rt',
            'vrh_p1_a','vrh_p2_a','vrh_p3_a',
            'vrh_p1_status','vrh_p1_mode','vrh_p1_estop_fault',
            'vrh_p1_cb_pump_trip_fault','vrh_p1_power_on','vrh_p1_vsd_staus',
            'vrh_p2_status','vrh_p2_mode','vrh_p2_estop_fault',
            'vrh_p2_cb_pump_trip_fault','vrh_p2_power_on','vrh_p2_vsd_staus',
            'vrh_p3_status','vrh_p3_mode','vrh_p3_estop_fault',
            'vrh_p3_cb_pump_trip_fault','vrh_p3_power_on','vrh_p3_vsd_staus',
            ])

        }setTimeout(readVal_VRH_R_PS,sendSignal);
         }

      function readVal_GR_R(){
      for (const s of sockets) {
         s.emit('gr_east_rl',{gr_east_rl:gvar.gr_R_EAST_LVL})
         s.emit('gr_west_rl',{gr_west_rl:gvar.gr_R_WEST_LVL})
         s.emit('gr_inlet_flow',{gr_inlet_flow:gvar.gr_R_INTLET})
         s.emit('gr_outlet_flow',{gr_outlet_flow:gvar.gr_R_OUTLET})
         s.emit('gr_ut',{gr_ut:gvar.gr_R_UT})

       }setTimeout(readVal_GR_R,sendSignal);
       }

      function readVal_CHT_R(){
        for (const s of sockets) {
             emits([
             'cht_nc_rl',
             'cht_sc_rl',
             'cht_oh_rl',
             'cht_ut',
             'cht_fr',
             'cht_tf',

             "cht_g_panel_surge_arrestor",
             "cht_g_panel_voltage_okay",
             "cht_g_ps_mode",

             "cht_p1_rt",
             "cht_p1_a",
             "cht_p1_kw",
             "cht_p1_rpm",
             "cht_p1_status",
             "cht_p1_mode",
             "cht_p1_no_flow_fault",
             "cht_p1_estop_fault",
             "cht_p1_circuit_breaker_fault",
             "cht_p1_vsd_status",

             "cht_p2_rt",
             "cht_p2_a",
             "cht_p2_kw",
             "cht_p2_rpm",
             "cht_p2_status",
             "cht_p2_mode",
             "cht_p2_no_flow_fault",
             "cht_p2_estop_fault",
             "cht_p2_circuit_breaker_fault",
             "cht_p2_vsd_status",


            ])

        }setTimeout(readVal_CHT_R,sendSignal);
        }

///////////////////////////////////////////////////////PUMPSTATION}


////////////////////////////////////////////////////////VAN STADENS PUMP STATION
function readVal_VS_PS(){
  for (const s of sockets) {
    s.emit('vs_g_water_f',{vs_g_water_f:gvar.vs_G_WATER_D})
    s.emit('vs_g_pumps_f',{vs_g_pumps_f:gvar.vs_G_PUMPS_F})
    s.emit('vs_g_comms',{vs_g_comms:gvar.vs_G_COMMS})
    s.emit('vs_ps_ut',{vs_ps_ut:gvar.vs_PS_UT})
    s.emit('vs_p1_rh',{vs_p1_rh:gvar.vs_P1_RH})
    s.emit('vs_p1_del_press',{vs_p1_del_press:gvar.vs_P1_DEL_PRESS})
    s.emit('vs_p1_suc_press',{vs_p1_suc_press:gvar.vs_P1_SUC_PRESS})
    s.emit('vs_p1_mode',{vs_p1_mode:gvar.vs_P1_MODE})
    s.emit('vs_p1_status',{vs_p1_status:gvar.vs_P1_STATUS})
    s.emit('vs_p1_lsp',{vs_p1_lsp:gvar.vs_P1_LSP})
    s.emit('vs_p1_ldp',{vs_p1_ldp:gvar.vs_P1_LDP})
    s.emit('vs_p1_hdp',{vs_p1_hdp:gvar.vs_P1_HDP})
    s.emit('vs_p1_starter_fault',{vs_p1_starter_fault:gvar.vs_P1_STARTER_FAULT})
    s.emit('vs_p1_startup_fault',{vs_p1_startup_fault:gvar.vs_P1_STARTUP_FAULT})
    s.emit('vs_p2_rh',{vs_p2_rh:gvar.vs_P2_RH})
    s.emit('vs_p2_del_press',{vs_p2_del_press:gvar.vs_P2_DEL_PRESS})
    s.emit('vs_p2_suc_press',{vs_p2_suc_press:gvar.vs_P2_SUC_PRESS})
    s.emit('vs_p2_mode',{vs_p2_mode:gvar.vs_P2_MODE})
    s.emit('vs_p2_status',{vs_p2_status:gvar.vs_P2_STATUS})
    s.emit('vs_p2_lsp',{vs_p2_lsp:gvar.vs_P2_LSP})
    s.emit('vs_p2_ldp',{vs_p2_ldp:gvar.vs_P2_LDP})
    s.emit('vs_p2_hdp',{vs_p2_hdp:gvar.vs_P2_HDP})
    s.emit('vs_p2_starter_fault',{vs_p2_starter_fault:gvar.vs_P2_STARTER_FAULT})
    s.emit('vs_p2_startup_fault',{vs_p2_startup_fault:gvar.vs_P2_STARTUP_FAULT})

   } setTimeout(readVal_VS_PS, sendSignal);
        }


    function readVal_BH_PS(){
      for (const s of sockets) {
        //reservoir information
       s.emit('bh_start_f',{bh_start_f:gvar.bh_R_START_FLOAT}),
       s.emit('bh_stop_f',{bh_stop_f:gvar.bh_R_STOP_FLOAT}),
       s.emit('bh_sa',{bh_sa: gvar.bh_R_SURGE_ARRESTOR}),
       s.emit('bh_chs',{bh_chs: gvar.bh_R_CHARGER_STATUS}),
       s.emit('bh_d',{bh_d: gvar.bh_R_DOOR})
///// PUMP STATION Information
       s.emit('bhb_g_tele_control',{bhb_g_tele_control:gvar.bhb_G_TELE_CONTROL})
       s.emit('bhb_g_low_lvl_float',{bhb_g_low_lvl_float:gvar.bhb_G_LOW_LVL_FLOAT})
       s.emit('bhb_ps_ut',{bhb_ps_ut:gvar.bhb_PS_UT})


       s.emit('bhb_p1_rh',{bhb_p1_rh:gvar.bhb_P1_RH})
       s.emit('bhb_p1_mode',{bhb_p1_mode:gvar.bhb_P1_MODE})
       s.emit('bhb_p1_status',{bhb_p1_status:gvar.bhb_P1_STATUS})
       s.emit('bhb_p1_startup_fault',{bhb_p1_startup_fault:gvar.bhb_P1_STARTUP_FAULT})
       s.emit('bhb_p1_soft_s_fault',{bhb_p1_soft_s_fault:gvar.bhb_P1_SOFT_S_FAULT})
       s.emit('bhb_p1_no_flow',{bhb_p1_no_flow:gvar.bhb_P1_NO_FLOW})

       s.emit('bhb_p2_rh',{bhb_p2_rh:gvar.bhb_P2_RH})
       s.emit('bhb_p2_mode',{bhb_p2_mode:gvar.bhb_P2_MODE})
       s.emit('bhb_p2_status',{bhb_p2_status:gvar.bhb_P2_STATUS})

       s.emit('bhb_p2_startup_fault',{bhb_p2_startup_fault:gvar.bhb_P2_STARTUP_FAULT})
       s.emit('bhb_p2_soft_s_fault',{bhb_p2_soft_s_fault:gvar.bhb_P2_SOFT_S_FAULT})
       s.emit('bhb_p2_no_flow',{bhb_p2_no_flow:gvar.bhb_P2_NO_FLOW})


     }setTimeout(readVal_BH_PS,1000);
      }



      function readVal_BF_PS_R(){
        for (const s of sockets) {
          s.emit('bf_ps_ut',{bf_ps_ut:gvar.bf_PS_UT})
          s.emit('bf_g_sp',{bf_g_sp:gvar.bf_G_SP})
          s.emit('bf_g_fr',{bf_g_fr:gvar.bf_G_FR})
          s.emit('bf_g_mcc_estop',{bf_g_mcc_estop:gvar.bf_G_MCC_ESTOP})

          s.emit('bf_p1_mode',{bf_p1_mode:gvar.bf_P1_MODE})
          s.emit('bf_p1_status',{bf_p1_status:gvar.bf_P1_STATUS})
          s.emit('bf_p1_rh',{bf_p1_rh:gvar.bf_P1_RH})
          s.emit('bf_p1_pump_trip_fault',{bf_p1_pump_trip_fault:gvar.bf_P1_PUMP_TRIP_FAULT})
          s.emit('bf_p1_estop_fault',{bf_p1_estop_fault:gvar.bf_P1_ESTOP_FAULT})
          s.emit('bf_p1_no_flow_fault',{bf_p1_no_flow_fault:gvar.bf_P1_NO_FLOW_FAULT})

          s.emit('bf_p2_mode',{bf_p2_mode:gvar.bf_P2_MODE})
          s.emit('bf_p2_status',{bf_p2_status:gvar.bf_P2_STATUS})
          s.emit('bf_p2_rh',{bf_p2_rh:gvar.bf_P2_RH})
          s.emit('bf_p2_pump_trip_fault',{bf_p2_pump_trip_fault:gvar.bf_P2_PUMP_TRIP_FAULT})
          s.emit('bf_p2_estop_fault',{bf_p2_estop_fault:gvar.bf_P2_ESTOP_FAULT})
          s.emit('bf_p2_no_flow_fault',{bf_p2_no_flow_fault:gvar.bf_P2_NO_FLOW_FAULT})

          s.emit('bf_p3_mode',{bf_p3_mode:gvar.bf_P3_MODE})
          s.emit('bf_p3_status',{bf_p3_status:gvar.bf_P3_STATUS})
          s.emit('bf_p3_rh',{bf_p3_rh:gvar.bf_P3_RH})
          s.emit('bf_p3_pump_trip_fault',{bf_p3_pump_trip_fault:gvar.bf_P3_PUMP_TRIP_FAULT})
          s.emit('bf_p3_estop_fault',{bf_p3_estop_fault:gvar.bf_P3_ESTOP_FAULT})
          s.emit('bf_p3_no_flow_fault',{bf_p3_no_flow_fault:gvar.bf_P3_NO_FLOW_FAULT})

          s.emit('bf_p4_mode',{bf_p4_mode:gvar.bf_P4_MODE})
          s.emit('bf_p4_status',{bf_p4_status:gvar.bf_P4_STATUS})
          s.emit('bf_p4_rh',{bf_p4_rh:gvar.bf_P4_RH})
          s.emit('bf_p4_pump_trip_fault',{bf_p4_pump_trip_fault:gvar.bf_P4_PUMP_TRIP_FAULT})
          s.emit('bf_p4_estop_fault',{bf_p4_estop_fault:gvar.bf_P4_ESTOP_FAULT})
          s.emit('bf_p4_no_flow_fault',{bf_p4_no_flow_fault:gvar.bf_P4_NO_FLOW_FAULT})

       }setTimeout(readVal_BF_PS_R,sendSignal);
        }

        function readVal_HB_PS_R_2(){
          for (const s of sockets) {
            s.emit('hb_p1_rh',{hb_p1_rh:gvar.hb_P1_RH})
            s.emit('hb_p2_rh',{hb_p2_rh:gvar.hb_P2_RH})
            s.emit('hb_p3_rh',{hb_p3_rh:gvar.hb_P3_RH})

            s.emit('hb_p1_current',{hb_p1_current:gvar.hb_P1_CURRENT})
            s.emit('hb_p2_current',{hb_p2_current:gvar.hb_P2_CURRENT})
            s.emit('hb_p3_current',{hb_p3_current:gvar.hb_P3_CURRENT})

          }setTimeout(readVal_HB_PS_R_2, sendSignal);

         }



         function readVal_CG_PS(){
          for (const s of sockets) {
            s.emit('cg_g_ut',{cg_g_ut:gvar.cg_G_UT})
            s.emit('cg_g_m_cb_stat',{cg_g_m_cb_stat:gvar.cg_G_M_CB_STAT})
            s.emit('cg_g_sp_fail',{cg_g_sp_fail:gvar.cg_G_SP_FAIL})
            s.emit('cg_g_earth_fault',{cg_g_earth_fault:gvar.cg_G_EARTH_FAULT})
            s.emit('cg_g_ps_flood_alm',{cg_g_ps_flood_alm:gvar.cg_G_PS_FLOOD_ALM})
            s.emit('cg_g_sump_bypass',{cg_g_sump_bypass:gvar.cg_G_SUMP_BYPASS})
            s.emit('cg_g_t_bypass',{cg_g_t_bypass:gvar.cg_G_T_BYPASS})
            s.emit('cg_g_t1_selected',{cg_g_t1_selected:gvar.cg_G_T1_SELECTED})
            s.emit('cg_g_t2_selected',{cg_g_t2_selected:gvar.cg_G_T2_SELECTED})

            s.emit('cg_p1_stat',{cg_p1_stat:gvar.cg_P1_STAT}) ////////////////////pump 1
            s.emit('cg_p1_mode',{cg_p1_mode:gvar.cg_P1_MODE})
            s.emit('cg_p1_ex_fault_stat',{cg_p1_ex_fault_stat:gvar.cg_P1_EX_FAULT_STAT})
            s.emit('cg_p1_trip_stat',{cg_p1_trip_stat:gvar.cg_P1_TRIP_STAT})
            s.emit('cg_p1_e_stop_stat',{cg_p1_e_stop_stat:gvar.cg_P1_E_STOP_STAT})
            s.emit('cg_p1_cb_on_stat',{cg_p1_cb_on_stat:gvar.cg_P1_CB_ON_STAT})
            s.emit('cg_p1_lockout',{cg_p1_lockout:gvar.cg_P1_LOCKOUT})
            s.emit('cg_p1_s_u_p',{cg_p1_s_u_p:gvar.cg_P1_S_U_P})
            s.emit('cg_p1_d_o_p',{cg_p1_d_o_p:gvar.cg_P1_D_O_P})
            s.emit('cg_p1_s_p_s',{cg_p1_s_p_s:gvar.cg_P1_S_P_S})
            s.emit('cg_p1_d_p_s',{cg_p1_d_p_s:gvar.cg_P1_D_P_S})
            s.emit('cg_p1_b_t',{cg_p1_b_t:gvar.cg_P1_B_T})
            s.emit('cg_p1_v_c_t',{cg_p1_v_c_t:gvar.cg_P1_V_C_T})
            s.emit('cg_p1_m_w_t',{cg_p1_m_w_t:gvar.cg_P1_M_W_T})

            s.emit('cg_p2_stat',{cg_p2_stat:gvar.cg_P2_STAT}) ////////////////////pump 2
            s.emit('cg_p2_mode',{cg_p2_mode:gvar.cg_P2_MODE})
            s.emit('cg_p2_ex_fault_stat',{cg_p2_ex_fault_stat:gvar.cg_P2_EX_FAULT_STAT})
            s.emit('cg_p2_trip_stat',{cg_p2_trip_stat:gvar.cg_P2_TRIP_STAT})
            s.emit('cg_p2_e_stop_stat',{cg_p2_e_stop_stat:gvar.cg_P2_E_STOP_STAT})
            s.emit('cg_p2_cb_on_stat',{cg_p2_cb_on_stat:gvar.cg_P2_CB_ON_STAT})
            s.emit('cg_p2_lockout',{cg_p2_lockout:gvar.cg_P2_LOCKOUT})
            s.emit('cg_p2_s_u_p',{cg_p2_s_u_p:gvar.cg_P2_S_U_P})
            s.emit('cg_p2_d_o_p',{cg_p2_d_o_p:gvar.cg_P2_D_O_P})
            s.emit('cg_p2_s_p_s',{cg_p2_s_p_s:gvar.cg_P2_S_P_S})
            s.emit('cg_p2_d_p_s',{cg_p2_d_p_s:gvar.cg_P2_D_P_S})
            s.emit('cg_p2_b_t',{cg_p2_b_t:gvar.cg_P2_B_T})
            s.emit('cg_p2_v_c_t',{cg_p2_v_c_t:gvar.cg_P2_V_C_T})
            s.emit('cg_p2_m_w_t',{cg_p2_m_w_t:gvar.cg_P2_M_W_T})

            s.emit('cg_p3_stat',{cg_p3_stat:gvar.cg_P3_STAT}) ////////////////////pump 3
            s.emit('cg_p3_mode',{cg_p3_mode:gvar.cg_P3_MODE})
            s.emit('cg_p3_ex_fault_stat',{cg_p3_ex_fault_stat:gvar.cg_P3_EX_FAULT_STAT})
            s.emit('cg_p3_trip_stat',{cg_p3_trip_stat:gvar.cg_P3_TRIP_STAT})
            s.emit('cg_p3_e_stop_stat',{cg_p3_e_stop_stat:gvar.cg_P3_E_STOP_STAT})
            s.emit('cg_p3_cb_on_stat',{cg_p3_cb_on_stat:gvar.cg_P3_CB_ON_STAT})
            s.emit('cg_p3_lockout',{cg_p3_lockout:gvar.cg_P3_LOCKOUT})
            s.emit('cg_p3_s_u_p',{cg_p3_s_u_p:gvar.cg_P3_S_U_P})
            s.emit('cg_p3_d_o_p',{cg_p3_d_o_p:gvar.cg_P3_D_O_P})
            s.emit('cg_p3_s_p_s',{cg_p3_s_p_s:gvar.cg_P3_S_P_S})
            s.emit('cg_p3_d_p_s',{cg_p3_d_p_s:gvar.cg_P3_D_P_S})
            s.emit('cg_p3_b_t',{cg_p3_b_t:gvar.cg_P3_B_T})
            s.emit('cg_p3_v_c_t',{cg_p3_v_c_t:gvar.cg_P3_V_C_T})
            s.emit('cg_p3_m_w_t',{cg_p3_m_w_t:gvar.cg_P3_M_W_T})
        ///////////////////////////////////////////////////////////////////////
            s.emit('cg_g_suc_press',{cg_g_suc_press:gvar.cg_G_SUC_PRESS})
            s.emit('cg_g_del_press',{cg_g_del_press:gvar.cg_G_DEL_PRESS})
            s.emit('cg_g_sump_lvl',{cg_g_sump_lvl:gvar.cg_G_SUMP_LVL})

            s.emit('cg_t1_lvl',{cg_t1_lvl:gvar.cg_T1_LVL})
            s.emit('cg_t1_inlet_f',{cg_t1_inlet_f:gvar.cg_T1_INLET_F})
            s.emit('cg_t1_outlet_f',{cg_t1_outlet_f:gvar.cg_T1_OUTLET_F})

            s.emit('cg_t2_lvl',{cg_t2_lvl:gvar.cg_T2_LVL})
            s.emit('cg_t2_inlet_f',{cg_t2_inlet_f:gvar.cg_T2_INLET_F})
            s.emit('cg_t2_outlet_f',{cg_t2_outlet_f:gvar.cg_T2_OUTLET_F})

            s.emit('cg_p1_suc_press',{cg_p1_suc_press:gvar.cg_P1_SUC_PRESS})
            s.emit('cg_p1_del_press',{cg_p1_del_press:gvar.cg_P1_DEL_PRESS})
            s.emit('cg_p1_vib',{cg_p1_vib:gvar.cg_P1_VIB})
            s.emit('cg_p1_power',{cg_p1_power:gvar.cg_P1_POWER})
            s.emit('cg_p1_rh',{cg_p1_rh:gvar.cg_P1_RH})

             s.emit('cg_p2_suc_press',{cg_p2_suc_press:gvar.cg_P2_SUC_PRESS})
            s.emit('cg_p2_del_press',{cg_p2_del_press:gvar.cg_P2_DEL_PRESS})
            s.emit('cg_p2_vib',{cg_p2_vib:gvar.cg_P2_VIB})
            s.emit('cg_p2_power',{cg_p2_power:gvar.cg_P2_POWER})
            s.emit('cg_p2_rh',{cg_p2_rh:gvar.cg_P2_RH})

            s.emit('cg_p3_suc_press',{cg_p3_suc_press:gvar.cg_P3_SUC_PRESS})
            s.emit('cg_p3_del_press',{cg_p3_del_press:gvar.cg_P3_DEL_PRESS})
            s.emit('cg_p3_vib',{cg_p3_vib:gvar.cg_P3_VIB})
            s.emit('cg_p3_power',{cg_p3_power:gvar.cg_P3_POWER})
            s.emit('cg_p3_rh',{cg_p3_rh:gvar.cg_P3_RH})
          }
          setTimeout(readVal_CG_PS, sendSignal);
         }

/////////////////////////// Verwoerd PS
         function readVal_VW_PS(){
          for (const s of sockets) {
             emits([
              "vw_ut",
              "vw_g_sa_fault",
              "vw_g_charger_fault",
              "vw_g_sps_fault",
              "vw_g_dps_fault",
              "vw_g_fm_fault",
              "vw_g_pm_fault",
              "vw_p1_vsd_comms_fault",
              "vw_p1_vsd_fault",
              "vw_p1_estop_fault",
              "vw_p1_no_flow_fault",
              "vw_g_vm_fault",
              "vw_p1_startup_fault",
              "vw_p1_stat",
              "vw_p1_mode",
              "vw_p1_low_suc_press_fault",
              "vw_p1_high_del_press_fault",
              //analog
              "vw_p1_sp",
              "vw_p1_dp",
              "vw_p1_current",
              "vw_p1_speed",
              "vw_p1_power",
              "vw_p1_rh",
              "vw_p1_fr",
              "vw_p1_tf",
             ])
          }setTimeout(readVal_VW_PS,sendSignal);
              }


              function readval_kuis_r(){
                for(const s of sockets){
                  emits([
                    "klm_kruisR_ut",
                    "klm_kruisR_lvl",
                    "klm_kruisR_surge_arrestor",
                    "klm_kruisR_voltage_ok",
                    "klm_kruisR_door_contact",
                    "klm_kruisR_low_battery",
                    "klm_kruisR_high_float",
                    "klm_kruisR_low_float",
                  ])
                }setTimeout(readval_kuis_r,sendSignal)
              }


              function readVal_NMU_EFF_PS(){
                for (const s of sockets) {
                   emits([
                    "nmu_eff_ps_ut",
                    "nmu_eff_ps_flood_alarm",
                    "nmu_eff_ps_fr",
                    "nmu_eff_ps_tnf",
                    "nmu_eff_ps_del_press",
                    "nmu_eff_ps_dam_lvl",

                    "nmu_eff_p1_fault",
                    "nmu_eff_p1_status",
                    "nmu_eff_p1_mode",
                    "nmu_eff_p1_rh",
                    "nmu_eff_p1_speed",

                    "nmu_eff_p2_fault",
                    "nmu_eff_p2_status",
                    "nmu_eff_p2_mode",
                    "nmu_eff_p2_rh",
                    "nmu_eff_p2_speed",

                    "nmu_eff_p3_fault",
                    "nmu_eff_p3_status",
                    "nmu_eff_p3_mode",
                    "nmu_eff_p3_rh",
                    "nmu_eff_p3_speed",

                    "nmu_eff_p4_fault",
                    "nmu_eff_p4_status",
                    "nmu_eff_p4_mode",
                    "nmu_eff_p4_rh",
                    "nmu_eff_p4_speed",
                   ])
                }setTimeout(readVal_NMU_EFF_PS,sendSignal);
                    }



              function readVal_STAN_PS(){
                for (const s of sockets) {
                   emits([
                  "stan_common_suction_pressure",
                  "stan_common_delivery_pressure",
                  "stan_pump_station_flow",
                  "stan_ps_ut",


                  "stan_p1_stat",
                  "stan_p1_localremote",
                  "stan_p1_pumprunning",
                  "stan_p1_alarmshigh",
                  "stan_p1_alarmstrip",
                  "stan_p1_pumpavailable",
                  "stan_p1_vsd_actfreq",
                  "stan_p1_motor_power",

                  "stan_p2_stat",
                  "stan_p2_localremote",
                  "stan_p2_pumprunning",
                  "stan_p2_alarmshigh",
                  "stan_p2_alarmstrip",
                  "stan_p2_pumpavailable",
                  "stan_p2_vsd_actfreq",
                  "stan_p2_motor_power",

                  "stan_p3_stat",
                  "stan_p3_localremote",
                  "stan_p3_pumprunning",
                  "stan_p3_alarmshigh",
                  "stan_p3_alarmstrip",
                  "stan_p3_pumpavailable",
                  "stan_p3_vsd_actfreq",
                  "stan_p3_motor_power",

                  "stan_p4_stat",
                  "stan_p4_localremote",
                  "stan_p4_pumprunning",
                  "stan_p4_alarmshigh",
                  "stan_p4_alarmstrip",
                  "stan_p4_pumpavailable",
                  "stan_p4_vsd_actfreq",
                  "stan_p4_motor_power",
                   ])
                }setTimeout(readVal_STAN_PS,5000);
                    }






////////////Motherwell



////////////general
          function readVal_MW_PS_G(){
            for (const s of sockets) {
              emits([
                "mw_g_ut",
                "mw_g_common_suction_pressure",
                "mw_g_common_delivery_pressure",
                "mw_g_flowrate",
                "mw_g_speed_setpoint",
                "mw_g_pumps_required",
                "mw_g_res_level",

              ])
            }setTimeout(readVal_MW_PS_G,sendSignal);
                          }
///Pumpstation 1
          function readVal_MW_PS(){

            for (const s of sockets){
              emits([
                "mw_p1_runtime",
                "mw_p1_actual_speed",
                "mw_p1_number_of_starts",
                "mw_p1_running",
                "mw_p1_status",
                "mw_p1_mode",
                "mw_p1_emergency_stop",
                "mw_p1_alarm_trip",
                "mw_p1_no_flow",
                "mw_p2_runtime",
                "mw_p2_actual_speed",
                "mw_p2_number_of_starts",
                "mw_p2_running",
                "mw_p2_status",
                "mw_p2_mode",
                "mw_p2_emergency_stop",
                "mw_p2_alarm_trip",
                "mw_p2_no_flow",
                "mw_p3_runtime",
                "mw_p3_actual_speed",
                "mw_p3_number_of_starts",
                "mw_p3_running",
                "mw_p3_status",
                "mw_p3_mode",
                "mw_p3_emergency_stop",
                "mw_p3_alarm_trip",
                "mw_p3_no_flow",

              ])
            }setTimeout(readVal_MW_PS,sendSignal);
          }


          function readVal_storm_wtw(){

            for (const s of sockets){
              emits([
                "wtw_storms_UT",
                "wtw_storms_filter_pump1_mode",
                "wtw_storms_filter_pump1_status",
                "wtw_storms_filter_pump2_mode",
                "wtw_storms_filter_pump2_status",
                "wtw_storms_high_lift_pump1_mode",
                "wtw_storms_high_lift_pump1_status",
                "wtw_storms_high_lift_pump2_mode",
                "wtw_storms_high_lift_pump2_status",
                "wtw_storms_clear_water_tank_high_high",
                "wtw_storms_clear_water_tank_high",
                "wtw_storms_clear_water_tank_low",
                "wtw_storms_holding_reservoir_high",
                "wtw_storms_holding_reservoir_low",
                "wtw_storms_overhead_tank_high",
                "wtw_storms_overhead_tank_low",
                "wtw_storms_surge_arrester",
                "wtw_storms_door_mag",
                "wtw_storms_battery_low",
                "wtw_storms_voltage_ok",
                "wtw_storms_filter_pump1_run_hours",
                "wtw_storms_filter_pump2_run_hours",
                "wtw_storms_high_lift_pump1_run_hours",
                "wtw_storms_high_lift_pump2_run_hours",
                "wtw_storms_holding_reservoir_level",
                "wtw_storms_overhead_tank_level",
                "wtw_storms_pulse_count1_Total_Flow",
                "wtw_storms_pulse_count2_Total_Flow",

              ])
            }setTimeout(readVal_storm_wtw,sendSignal);
          }

          //#region Storms River
          function readVal_storm_ps(){

            for (const s of sockets){
              emits([
                "ps_storm_UT",
                "ps_storms_gp1_mode",
                "ps_storms_gp1_status",
                "ps_storms_gp1_fault_general",
                "ps_storms_gp1_vsd_fault",
                "ps_storms_gp1_startup_fault",
                "ps_storms_gp1_no_flow_fault",
                "ps_storms_gp2_mode",
                "ps_storms_gp2_status",
                "ps_storms_gp2_fault_general",
                "ps_storms_gp2_vsd_fault",
                "ps_storms_gp2_startup_fault",
                "ps_storms_gp2_no_flow_fault",
                "ps_storms_qp1_mode",
                "ps_storms_qp1_status",
                "ps_storms_qp1_fault_general",
                "ps_storms_qp1_vsd_fault",
                "ps_storms_qp1_startup_fault",
                "ps_storms_qp1_no_flow_fault",
                "ps_storms_qp2_mode",
                "ps_storms_qp2_status",
                "ps_storms_qp2_fault_general",
                "ps_storms_qp2_vsd_fault",
                "ps_storms_qp2_startup_fault",
                "ps_storms_qp2_no_flow_fault",
                "ps_storms_quarry_fill",
                "ps_storms_clear_water_tank_fill",
                "ps_storms_emergency_stop",
                "ps_storms_charger_fault",
                "ps_storms_flood_warning",
                "ps_storms_wtw_comms",
                "ps_storms_voltage_ok",
                "ps_storms_gpump1_run_hours",
                "ps_storms_gpump2_run_hours",
                "ps_storms_qpump1_run_hours",
                "ps_storms_qpump2_run_hours",
                "ps_storms_gorge_level",
                "ps_storms_quarry_level",

              ])
            }setTimeout(readVal_storm_ps,sendSignal);
          }


          ////#endregion


////////////////////////////////////////////////////////////////////////Ground Water

function readVal_NM_NPP_GW(){
  for (const s of sockets) {
     emits([
        "npp_g_ut",
        "npp_g_run_hours",
        "npp_g_total_flow",
        "npp_g_total_yield_to_date",
        "npp_g_annual_yield_setpoint",
        "npp_k_power",
        "npp_k_current",
        "npp_k_total_power",
        "npp_k_voltage",
        "npp_p_borehole_level",
        "npp_p_flow_rate",
        "npp_p_mode",
        "npp_p_status",
        "npp_f_pumprunning",
        "npp_f_fault_active",
        "npp_f_estopactive",
        "npp_f_vsdfault",
        "npp_f_panel_door_open",
        "npp_f_low_flow",
        "npp_f_charge_ok",
        "npp_f_low_level",
        "npp_f_annual_abstraction_limit_reached",
        "npp_f_flow_coms_fail",
        "npp_f_level_warning",
        "npp_f_pump_rest",
        "npp_f_recovery_level_not_reached",
        "npp_f_fault_active",
        "npp_f_voltage_ok",
        "npp_g_recovery_time",
        "npp_g_total_yield_limit_reached",
        "npp_g_targetflowsetpoint",
        "npp_p_pressure",
        "npp_p_vsdfrequency"




     ])
  }setTimeout(readVal_NM_NPP_GW,sendSignal);

      }




////////////////////////////////////////////////////////FLOW METERS
////////////////////////////////////////////////////////FM Tower
function readVal_FMT1_FM(){
  for (const s of sockets) {
    s.emit('fmt_fm_ut',{fmt_fm_ut:gvar.fmt_FM_UT})
    s.emit('fmt_fm_gas_l',{fmt_fm_gas_l:gvar.fmt_FM_GAS_L})
    s.emit('fmt_fm_battery_v',{fmt_fm_battery_v:gvar.fmt_FM_BATTERY_V})
    s.emit('fmt_fm_fr',{fmt_fm_fr:gvar.fmt_FM_FR})
    s.emit('fmt_fm_tf',{fmt_fm_tf:gvar.fmt_FM_TF})
    s.emit('fmt_fm_low_b',{fmt_fm_low_b:gvar.fmt_FM_LOW_B})
    s.emit('fmt_fm_alm_armd',{fmt_fm_alm_armd:gvar.fmt_FM_ALM_ARMD})
    s.emit('fmt_fm_chamber_tamp',{fmt_fm_chamber_tamp:gvar.fmt_FM_CHAMBER_TAMP})
    s.emit('fmt_fm_solar_panel_tamp',{fmt_fm_solar_panel_tamp:gvar.fmt_FM_SOLAR_PANEL_TAMP})
    s.emit('fmt_fm_door_opened',{fmt_fm_door_opened:gvar.fmt_FM_DOOR_OPENED})
    s.emit('fmt_fm_pepper_s_armd',{fmt_fm_pepper_s_armd:gvar.fmt_FM_PEPPER_S_ARMD})
    s.emit('fmt_fm_pepper_s_alm',{fmt_fm_pepper_s_alm:gvar.fmt_FM_PEPPER_S_ALM})

  }setTimeout(readVal_FMT1_FM, sendSignal);}

 function readVal_FMT2_FM(){
  for (const s of sockets) {
    s.emit('fmt_fm_press',{fmt_fm_press:gvar.fmt_FM_PRESS})
  }setTimeout(readVal_FMT2_FM, sendSignal);
 }

 function readVal_BETH_FPT(){
   for(const s of sockets){
     emits([
     "beth_totalflow",
     "beth_flowrate",
     "beth_pressure",
     "beth_ut",
     "beth_battery_status"
     ])
   }setTimeout(readVal_BETH_FPT,sendSignal);
 }




 function readVal_CIDZT_FPT(){
  for (const s of sockets) {
    emits([
      'fpt_cidzt_ut',

      'fpt_cidzt_surge_arrester_fault',
      'fpt_cidzt_charger_fault',
      'fpt_cidzt_panel_door',
      'fpt_cidzt_battery',

      'fpt_cidzt_idz_fm_s',
      'fpt_cidzt_mw_fm_s',

      'fpt_cidzt_idz_fr',
      'fpt_cidzt_idz_tf',

      'fpt_cidzt_mw_fr',
      'fpt_cidzt_mw_tf',
    ])
}setTimeout(readVal_CIDZT_FPT,sendSignal);
//s.listen()
     }

     function readVal_GT_BRG_FPT(){
      for (const s of sockets) {
         emits([
        "fpt_gt_brg_ut",
        "fpt_gt_brg_stl_p_press",
        "fpt_gt_brg_soco_p_press",
        "fpt_gt_brg_stl_p_fr",
        "fpt_gt_brg_stl_p_tf",
        "fpt_gt_brg_soco_p_fr",
        "fpt_gt_brg_soco_p_tf",

        "fpt_gt_brg_panel_door",
        "fpt_gt_brg_battery",
        "fpt_gt_brg_steal_p_press_analog_s",
        "fpt_gt_brg_soco_p_press_analog_s",
        "fpt_gt_brg_fm_stl_p_comms_s",
        "fpt_gt_brg_fm_soco_p_comms_s"
         ])
      }setTimeout(readVal_GT_BRG_FPT,sendSignal);
          }




 function readVal_SM_FM(){
  for (const s of sockets) {
     emits([
    'sm_fm_fr',
    'sm_ut',
    'sm_fm_tf'

     ])
  }setTimeout(readVal_SM_FM,sendSignal);
      }


      function readVal_UIT_FC_FPT(){
        for (const s of sockets) {
           emits([
          "fpt_uit_fc_ut",
          "fpt_uit_fc_press",
          "fpt_uit_fc_fr",
          "fpt_uit_fc_tf",

          "fpt_uit_fc_surge_arrester_fault",
          "fpt_uit_fc_charger_fault",
          "fpt_uit_fc_panel_door",
        "fpt_uit_fc_battery",
        "fpt_uit_fc_remote_io_comms",
        "fpt_uit_fc_flow_switch1",
        "fpt_uit_fc_flow_switch2",
        "fpt_uit_fc_pressure_analog_signal",
        "fpt_uit_fc_flow_meter_comms"
       ])
        }setTimeout(readVal_UIT_FC_FPT,sendSignal);
            }



     function readVal_NGT_WTW(){
       for (const s of sockets) {
         emits([
        'wtw_ngt_ut',
        'wtw_ngt_low_lift_fr',
        'wtw_ngt_high_lift_fr'
         ])
       }setTimeout(readVal_NGT_WTW,sendSignal);
           }

           function readVal_ELANDS_WTW(){
            for (const s of sockets) {
              emits([
                'wtw_elands_ut',
                'wtw_elands_FR',
                ,'wtw_elands_P',
              ])
            }setTimeout(readVal_ELANDS_WTW,sendSignal);
                }



function emits(tagArr){
  if (tagArr==undefined){}
  else{
  for (const s of sockets) {
    for (let i = 0; i < tagArr.length; i++) {
    s.emit(tagArr[i], {[tagArr[i]] :gvar[tagArr[i]] })
    }
   }
  }
}
///////////////////////////////////////////Feedlots

//Wessels
function readVal_wes1_fl(){
  for (const s of sockets) {
    emits([
      "wes1_fl_ut",
      "wes1_fl_p1_feed_A",
      "wes1_fl_p1_feed_B",
      "wes1_fl_p1_feed_C",
      "wes1_fl_p2_feed_A",
      "wes1_fl_p2_feed_B",
      "wes1_fl_p2_feed_C",
      "wes1_fl_p3_feed_A",
      "wes1_fl_p3_feed_B",
      "wes1_fl_p3_feed_C",
      "wes1_fl_p4_feed_A",
      "wes1_fl_p4_feed_B",
      "wes1_fl_p4_feed_C",
      "wes1_fl_p5_feed_A",
      "wes1_fl_p5_feed_B",
      "wes1_fl_p5_feed_C",
      "wes1_fl_p6_feed_A",
      "wes1_fl_p6_feed_B",
      "wes1_fl_p6_feed_C",
      "wes1_fl_p7_feed_A",
      "wes1_fl_p7_feed_B",
      "wes1_fl_p7_feed_C",
      "wes1_fl_p8_feed_A",
      "wes1_fl_p8_feed_B",
      "wes1_fl_p8_feed_C",
      "wes1_fl_p9_feed_A",
      "wes1_fl_p9_feed_B",
      "wes1_fl_p9_feed_C",
      "wes1_fl_p10_feed_A",
      "wes1_fl_p10_feed_B",
      "wes1_fl_p10_feed_C",
      "wes1_fl_p11_feed_A",
      "wes1_fl_p11_feed_B",
      "wes1_fl_p11_feed_C",
      "wes1_fl_p12_feed_A",
      "wes1_fl_p12_feed_B",
      "wes1_fl_p12_feed_C",
      "wes1_f1_feed_A_total",
      "wes1_f1_feed_B_total",
      "wes1_f1_feed_C_total",
    ])
  }setTimeout(readVal_wes1_fl,sendSignal);
      }

function readVal_wes2_fl(){
  for (const s of sockets) {
    emits([
      "wes2_fl_p1_lambs",
      "wes2_fl_p2_lambs",
      "wes2_fl_p3_lambs",
      "wes2_fl_p4_lambs",
      "wes2_fl_p5_lambs",
      "wes2_fl_p6_lambs",
      "wes2_fl_p7_lambs",
      "wes2_fl_p8_lambs",
      "wes2_fl_p9_lambs",
      "wes2_fl_p10_lambs",
      "wes2_fl_p11_lambs",
      "wes2_fl_p12_lambs",
      "wes_fl_saft",
      "wes_fl_sbft",
      "wes_fl_scft",
      "wes2_fl_pen1_feed_type",
      "wes2_fl_pen2_feed_type",
      "wes2_fl_pen3_feed_type",
      "wes2_fl_pen4_feed_type",
      "wes2_fl_pen5_feed_type",
      "wes2_fl_pen6_feed_type",
      "wes2_fl_pen7_feed_type",
      "wes2_fl_pen8_feed_type",
      "wes2_fl_pen9_feed_type",
      "wes2_fl_pen10_feed_type",
      "wes2_fl_pen11_feed_type",
      "wes2_fl_pen12_feed_type",
      "wes2_fl_sa_silo_levels",
      "wes2_fl_sb_silo_levels",
      "wes2_fl_sc_silo_levels",
    ])
  }setTimeout(readVal_wes2_fl,sendSignal);
      }



      function readVal_ISUZU_AUTO(){
        for (const s of sockets) {
          emits([
            "isuzu_oven1_vsd_speed",
            "isuzu_oven1_heat_ecvh_temp",
            "isuzu_oven1_temp1",
            "isuzu_oven1_temp2",
            "isuzu_oven2_vsd_speed",
            "isuzu_oven2_heat_ecvh_temp",
            "isuzu_oven2_temp1",
            "isuzu_oven2_temp2",
          ])
        }setTimeout(readVal_ISUZU_AUTO,sendSignal);
            }






    //Waplaas
const wesselsInput = require('./models/wesselsInput');

const  wb_control = require('./MODBUS_CONTROL/waplaas_control');



function Wes_PS_ControlWord(){

  var ip = gvar.mbusIP + '.36';
  var tag = "wes_mbw_success"

  gvar.wes1_mbw_success = 1;



  setInterval(()=>{
    var firstValue ={
      id:"wes1_fl",
      wes2_fl_p1_lambs:0,
      wes2_fl_p2_lambs:0,
      wes2_fl_p3_lambs:0,
      wes2_fl_p4_lambs:0,
      wes2_fl_p5_lambs:0,
      wes2_fl_p6_lambs:0,
      wes2_fl_p7_lambs:0,
      wes2_fl_p8_lambs:0,
      wes2_fl_p9_lambs:0,
      wes2_fl_p10_lambs:0,
      wes2_fl_p11_lambs:0,
      wes2_fl_p12_lambs:0,
      wes2_fl_pen1_feed_type:1,
      wes2_fl_pen2_feed_type:1,
      wes2_fl_pen3_feed_type:1,
      wes2_fl_pen4_feed_type:1,
      wes2_fl_pen5_feed_type:1,
      wes2_fl_pen6_feed_type:1,
      wes2_fl_pen7_feed_type:1,
      wes2_fl_pen8_feed_type:1,
      wes2_fl_pen9_feed_type:1,
      wes2_fl_pen10_feed_type:1,
      wes2_fl_pen11_feed_type:1,
      wes2_fl_pen12_feed_type:1,
    }

    var MongoClient = require('mongodb').MongoClient;
    var url= gvar.standardConnectionString;

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("HawkEye");


      dbo.collection("fl_currentvals").findOne({}, function(err, result) {

        if(result!=null){

          var marshall = 0;

          wesselsInput.find().then(result => {

            gvar.wes2_fl_p1_lambs_input = result[0].wes2_fl_p1_lambs;
            gvar.wes2_fl_p2_lambs_input = result[0].wes2_fl_p2_lambs;
            gvar.wes2_fl_p3_lambs_input = result[0].wes2_fl_p3_lambs;
            gvar.wes2_fl_p4_lambs_input = result[0].wes2_fl_p4_lambs;
            gvar.wes2_fl_p5_lambs_input = result[0].wes2_fl_p5_lambs;
            gvar.wes2_fl_p6_lambs_input = result[0].wes2_fl_p6_lambs;
            gvar.wes2_fl_p7_lambs_input = result[0].wes2_fl_p7_lambs;
            gvar.wes2_fl_p8_lambs_input = result[0].wes2_fl_p8_lambs;
            gvar.wes2_fl_p9_lambs_input = result[0].wes2_fl_p9_lambs;
            gvar.wes2_fl_p10_lambs_input = result[0].wes2_fl_p10_lambs;
            gvar.wes2_fl_p11_lambs_input = result[0].wes2_fl_p11_lambs;
            gvar.wes2_fl_p12_lambs_input = result[0].wes2_fl_p12_lambs;
            gvar.wes2_fl_pen1_feed_type_input = result[0].wes2_fl_pen1_feed_type;
            gvar.wes2_fl_pen2_feed_type_input = result[0].wes2_fl_pen2_feed_type;
            gvar.wes2_fl_pen3_feed_type_input = result[0].wes2_fl_pen3_feed_type;
            gvar.wes2_fl_pen4_feed_type_input = result[0].wes2_fl_pen4_feed_type;
            gvar.wes2_fl_pen5_feed_type_input = result[0].wes2_fl_pen5_feed_type;
            gvar.wes2_fl_pen6_feed_type_input = result[0].wes2_fl_pen6_feed_type;
            gvar.wes2_fl_pen7_feed_type_input = result[0].wes2_fl_pen7_feed_type;
            gvar.wes2_fl_pen8_feed_type_input = result[0].wes2_fl_pen8_feed_type;
            gvar.wes2_fl_pen9_feed_type_input = result[0].wes2_fl_pen9_feed_type;
            gvar.wes2_fl_pen10_feed_type_input = result[0].wes2_fl_pen10_feed_type;
            gvar.wes2_fl_pen11_feed_type_input = result[0].wes2_fl_pen11_feed_type;
            gvar.wes2_fl_pen12_feed_type_input = result[0].wes2_fl_pen12_feed_type;


            // console.log("Socket-io")
            // console.log(gvar.wes2_fl_p1_lambs_input)


          });

          if (gvar.wes2_fl_p1_lambs_input != gvar.wes2_fl_p1_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p1_lambs_input,ip,tag,1000 )
          }

          if (gvar.wes2_fl_p2_lambs_input != gvar.wes2_fl_p2_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p2_lambs_input,ip,tag,1001 )
          }

          if (gvar.wes2_fl_p3_lambs_input != gvar.wes2_fl_p3_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p3_lambs_input,ip,tag,1002 )
          }

          if (gvar.wes2_fl_p4_lambs_input != gvar.wes2_fl_p4_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p4_lambs_input,ip,tag,1003 )
          }

          if (gvar.wes2_fl_p5_lambs_input != gvar.wes5_fl_p1_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p5_lambs_input,ip,tag,1004 )
          }

          if (gvar.wes2_fl_p6_lambs_input != gvar.wes2_fl_p6_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p6_lambs_input,ip,tag,1005 )
          }

          if (gvar.wes2_fl_p7_lambs_input != gvar.wes2_fl_p1_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p7_lambs_input,ip,tag,1006 )
          }

          if (gvar.wes2_fl_p8_lambs_input != gvar.wes2_fl_p8_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p8_lambs_input,ip,tag,1007 )
          }

          if (gvar.wes2_fl_p9_lambs_input != gvar.wes2_fl_p9_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p9_lambs_input,ip,tag,1008 )
          }

          if (gvar.wes2_fl_p10_lambs_input != gvar.wes2_fl_p10_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p10_lambs_input,ip,tag,1009 )
          }

          if (gvar.wes2_fl_p11_lambs_input != gvar.wes2_fl_p11_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p11_lambs_input,ip,tag,1010 )
          }

          if (gvar.wes2_fl_p12_lambs_input != gvar.wes2_fl_p12_lambs){
            wb_control.writeValWaplaas(gvar.wes2_fl_p12_lambs_input,ip,tag,1011 )
          }

          ///////////////////////Feed Types

          if(gvar.wes2_fl_pen1_feed_type_input != gvar.wes2_fl_pen1_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen1_feed_type_input,ip,tag,1012)
          }

          if(gvar.wes2_fl_pen2_feed_type_input != gvar.wes2_fl_pen2_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen2_feed_type_input,ip,tag,1013)
          }

          if(gvar.wes2_fl_pen3_feed_type_input != gvar.wes2_fl_pen3_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen3_feed_type_input,ip,tag,1014)
          }

          if(gvar.wes2_fl_pen4_feed_type_input != gvar.wes2_fl_pen4_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen4_feed_type_input,ip,tag,1015)
          }


          if(gvar.wes2_fl_pen5_feed_type_input != gvar.wes2_fl_pen5_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen5_feed_type_input,ip,tag,1016)
          }

          if(gvar.wes2_fl_pen6_feed_type_input != gvar.wes2_fl_pen6_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen6_feed_type_input,ip,tag,1017)
          }

          if(gvar.wes2_fl_pen7_feed_type_input != gvar.wes2_fl_pen7_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen7_feed_type_input,ip,tag,1018)
          }

          if(gvar.wes2_fl_pen8_feed_type_input != gvar.wes2_fl_pen8_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen8_feed_type_input,ip,tag,1019)
          }


          if(gvar.wes2_fl_pen9_feed_type_input != gvar.wes2_fl_pen9_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen9_feed_type_input,ip,tag,1020)
          }

          if(gvar.wes2_fl_pen10_feed_type_input != gvar.wes2_fl_pen10_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen10_feed_type_input,ip,tag,1021)
          }

          if(gvar.wes2_fl_pen11_feed_type_input != gvar.wes2_fl_pen11_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen11_feed_type_input,ip,tag,1022)
          }

          if(gvar.wes2_fl_pen12_feed_type_input != gvar.wes2_fl_pen12_feed_type){
            wb_control.writeValWaplaas(gvar.wes2_fl_pen12_feed_type_input,ip,tag,1023)
          }



        }



      })

    })


  },100000)

}


const demoSiteControl = require('./models/demoSiteControl')


/////////////////////////////////////////////////////////////////////////////////////////////// CONTROL
const StanSiteControl = require('./models/stanSiteControl')


const  mb_control = require('./MODBUS_CONTROL/modbus_control')
num=0;




function Stan_PS_ControlWord(){
  if(num==0){}else{

    var ip = gvar.mbusIP +'.34'
  var tag = "stan_mbw_success"
  var mws = 1400        //memory word start
   gvar.stan_mbw_success=1;


setInterval(()=>{
  var firstValue={
    id:1,
    p1_run:false,
    p2_run:false,
    p3_run:false,
    p4_run:false,
    ps_control:false,
    ps_speed: 0
  }
  var MongoClient = require('mongodb').MongoClient;
  var url= gvar.standardConnectionString;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("HawkEye");

    dbo.collection("stan-site-controls").findOne({}, function(err, result) {

      if (result!=null){
// #region Mongo

  var marshal =0
  StanSiteControl.find().then(result=>{

    gvar.stan_p1_scada_start=result[0].p1_run
    gvar.stan_p2_scada_start=result[0].p2_run
    gvar.stan_p3_scada_start=result[0].p3_run
    gvar.stan_p4_scada_start=result[0].p4_run
    gvar.stan_enable_temp_control=result[0].ps_control
    gvar.stan_speed_ref=result[0].ps_speed
  });

if(gvar.stan_p1_scada_start==true){
  marshal = marshal + 1
}
if(gvar.stan_p2_scada_start==true){
  marshal = marshal + 2
}
if(gvar.stan_p3_scada_start==true){
  marshal = marshal + 4
}
if(gvar.stan_p4_scada_start==true){
  marshal = marshal + 8
}
if(gvar.stan_enable_temp_control==true){
  marshal = marshal + 16
}


if((marshal!=gvar.stan_cw_prev|| gvar.stan_speed_ref !=gvar.stan_s_prev) && gvar.stan_mbw_success==1){
  gvar.stan_mbw_success=0
  gvar.stan_cw_prev= marshal
  gvar.stan_s_prev= gvar.stan_speed_ref
  mb_control.writeVal(marshal,gvar.stan_speed_ref,ip,tag,mws)
}
// #endregion
      }
      else{
        dbo.collection("stan-site-controls").insertOne(firstValue,function(){

        })
      }
    })
})


},10000)

  }
}








server.listen(8081);
