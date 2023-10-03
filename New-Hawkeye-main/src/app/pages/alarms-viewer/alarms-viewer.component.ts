
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ListeningService } from 'src/app/listening.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  site_name: string;
  alarm_type:string
  description: string;
  url:any;
}


@Component({
  selector: 'app-alarms-viewer',
  templateUrl: './alarms-viewer.component.html',
  styleUrls: ['./alarms-viewer.component.css']
})
export class AlarmsViewerComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  ELEMENT_DATAVS: PeriodicElement[] = [];
  filterValue: any="";
    displayedColumns :string[]= ['site_name', 'alarm_type','description'];
    dataSource:any;
    dataSourceVS:any;
    public authListenerSubs!: Subscription;
    userSites:any[]
    intervalLoop: any


    count = 0
    @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService,private ls:ListeningService, private router: Router) {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })

    this.ls.listening([
      'hb_p1_pump_cb_trip_fault','hb_p1_startup_fault','hb_p1_estop_fault','hb_p1_no_flow_fault',
      'hb_p2_pump_cb_trip_fault','hb_p2_startup_fault','hb_p2_estop_fault','hb_p2_no_flow_fault',
      'hb_p3_pump_cb_trip_fault','hb_p3_startup_fault','hb_p3_estop_fault','hb_p3_no_flow_fault',
      'vs_g_comms',
      'vs_p1_lsp','vs_p1_ldp','vs_p1_hdp','vs_p1_starter_fault','vs_p1_startup_fault',
      'vs_p2_lsp','vs_p2_ldp','vs_p2_hdp','vs_p2_starter_fault','vs_p2_startup_fault',
      'bhb_p1_startup_fault','bhb_p1_soft_s_fault','bhb_p1_no_flow',
      'bhb_p2_startup_fault','bhb_p2_soft_s_fault','bhb_p2_no_flow',
      'lh_p1_estop_fault','lh_P1_SOFT_S_FAULT','lh_P1_NO_FLOW_FAULT',
      'lh_P2_ESTOP_FAULT','lh_P2_SOFT_S_FAULT','lh_p2_no_flow_fault',
      'bf_p1_pump_trip_fault','bf_p1_estop_fault','bf_p1_no_flow_fault',
      'bf_p2_pump_trip_fault','bf_p2_estop_fault','bf_p2_no_flow_fault',
      'bf_p3_pump_trip_fault','bf_p3_estop_fault','bf_p3_no_flow_fault',
      'bf_p4_pump_trip_fault','bf_p4_estop_fault','bf_p4_no_flow_fault',
      'tc_p1_pump_trip_fault','tc_p1_pump_trip_fault','tc_p1_no_flow_fault', 'tc_p1_earth_fault',
      'tc_p2_pump_trip_fault','tc_p2_pump_trip_fault','tc_p2_no_flow_fault', 'tc_p2_earth_fault',
      'tc_p3_pump_trip_fault','tc_p3_pump_trip_fault','tc_p3_no_flow_fault', 'tc_p3_earth_fault',
      'cg_g_m_cb_stat','cg_g_sp_fail','cg_g_earth_fault','cg_g_ps_flood_alm',
      'cg_p1_trip_stat','cg_p1_ex_fault_stat','cg_p1_e_stop_stat','cg_p1_cb_on_stat','cg_p1_lockout','cg_p1_s_u_p','cg_p1_d_o_p','cg_p1_s_p_s','cg_p1_d_p_s','cg_p1_b_t','cg_p1_v_c_t','cg_p1_m_w_t',
      'cg_p2_trip_stat','cg_p2_ex_fault_stat','cg_p2_e_stop_stat','cg_p2_cb_on_stat','cg_p2_lockout','cg_p2_s_u_p','cg_p2_d_o_p','cg_p2_s_p_s','cg_p2_d_p_s','cg_p2_b_t','cg_p2_v_c_t','cg_p2_m_w_t',
      'cg_p3_trip_stat','cg_p3_ex_fault_stat','cg_p3_e_stop_stat','cg_p3_cb_on_stat','cg_p3_lockout','cg_p3_s_u_p','cg_p3_d_o_p','cg_p3_s_p_s','cg_p3_d_p_s','cg_p3_b_t','cg_p3_v_c_t','cg_p3_m_w_t',
      'vrh_p1_estop_fault','vrh_p1_cb_pump_trip_fault',
      'vrh_p2_estop_fault','vrh_p2_cb_pump_trip_fault',
      'vrh_p3_estop_fault','vrh_p3_cb_pump_trip_fault',
      'cht_p1_no_flow_fault','cht_p1_estop_fault','cht_p1_circuit_breaker_fault',
      'cht_p2_no_flow_fault','cht_p2_estop_fault','cht_p2_circuit_breaker_fault',
      'vw_g_sa_fault',   'vw_g_charger_fault',    'vw_g_sps_fault',   'vw_g_dps_fault',   'vw_g_fm_fault',    'vw_g_pm_fault',    'vw_g_vm_fault',
      'vw_p1_vsd_comms_fault',   'vw_p1_vsd_fault',    'vw_p1_estop_fault',   'vw_p1_no_flow_fault',   'vw_p1_startup_fault','vw_p1_low_suc_press_fault','vw_p1_high_del_press_fault',
      'mw_p1_no_flow','mw_p1_alarm_trip','mw_p1_emergency_stop', 'mw_p2_no_flow', 'mw_p2_alarm_trip','mw_p2_emergency_stop','mw_p3_no_flow','mw_p3_alarm_trip','mw_p3_emergency_stop',
     'stan_p1_alarmshigh', 'stan_p1_alarmstrip', 'stan_p2_alarmshigh', 'stan_p2_alarmstrip', 'stan_p3_alarmshigh','stan_p3_alarmstrip','stan_p4_alarmshigh','stan_p4_alarmstrip',
     'nmu_eff_p1_fault','nmu_eff_p2_fault','nmu_eff_p3_fault','nmu_eff_p4_fault','che_ps_pumpset_1_no_flow_fault','che_ps_pumpset_1_ESTOP','che_ps_pumpset_1_circuit_breaker_trip','che_ps_pumpset_1_drive_fault','che_ps_pumpset_1_control_voltage_loss','che_ps_pumpset_2_no_flow_fault',
     'che_ps_pumpset_2_ESTOP','che_ps_pumpset_2_circuit_breaker_trip','che_ps_pumpset_2_drive_fault','che_ps_pumpset_2_control_voltage_loss','che_ps_pumpset_3_no_flow_fault','che_ps_pumpset_3_ESTOP', 'che_ps_pumpset_3_circuit_breaker_trip','che_ps_pumpset_3_drive_fault',
     'che_ps_pumpset_3_control_voltage_loss','che_ps_pumpset_4_no_flow_fault','che_ps_pumpset_4_ESTOP','che_ps_pumpset_4_circuit_breaker_trip','che_ps_pumpset_4_drive_fault','che_ps_pumpset_4_control_voltage_loss','ps_storms_gp1_fault_general','ps_storms_gp1_vsd_fault',
     'ps_storms_gp1_startup_fault','ps_storms_gp1_no_flow_fault','ps_storms_gp2_fault_general','ps_storms_gp2_vsd_fault','ps_storms_gp2_startup_fault','ps_storms_gp2_no_flow_fault','ps_storms_qp1_fault_general','ps_storms_qp1_vsd_fault','ps_storms_qp1_startup_fault',
     'ps_storms_qp1_no_flow_fault','ps_storms_qp2_fault_general','ps_storms_qp2_vsd_fault','ps_storms_qp2_startup_fault','ps_storms_qp2_no_flow_fault', 'fpt_uit_fc_surge_arrester_fault','fpt_uit_fc_charger_fault','fpt_uit_fc_remote_io_comms','fpt_uit_fc_pressure_analog_signal',
     'fpt_uit_fc_flow_meter_comms','fmt_fm_chamber_tamp','fmt_fm_solar_panel_tamp','fmt_fm_door_opened','fpt_cidzt_surge_arrester_fault','fpt_cidzt_charger_fault','hup1_voltage','hup1_borehole_level_pr_fault','hup1_battery','hup1_charge','hup1_trip_fault','hup1_no_flow_fault' ,
     'hup1_24_timer','hup1_stop_level','hup1_fault','hup1_estop_active','hup1_pump_suf','hup2_voltage','hup2_borehole_level_pr_fault','hup2_battery','hup2_charge','hup2_trip_fault','hup2_no_flow_fault','hup2_24_timer','hup2_stop_level','hup2_fault','hup2_estop_active','hup2_pump_suf',
    'hup3_voltage','hup3_borehole_level_pr_fault','hup3_battery','hup3_charge','hup3_trip_fault','hup3_no_flow_fault','hup3_24_timer','hup3_stop_level','hup3_fault','hup3_estop_active','hup3_pump_suf','hup4_voltage' ,'hup4_borehole_level_pr_fault' ,'hup4_battery' ,'hup4_charge',
     'hup4_trip_fault' ,'hup4_no_flow_fault' ,'hup4_24_timer' ,'hup4_stop_level' ,'hup4_fault' ,'hup4_estop_active' ,'hup4_pump_suf'    ,
    'gw_kark_k1_estop','gw_kark_k1_vsd_fault','gw_kark_k1_voltage_ok','gw_kark_k1_panel_door_open','gw_kark_k1_low_flow_fault','gw_kark_k1_charger_ok','gw_kark_k1_borehol_low_level_fault','gw_kark_k1_surge_arrester_ok','gw_kark_k1_flow_comms','gw_kark_k_warning_level',
    'npp_f_fault_active','npp_f_estopactive','npp_f_vsdfault','npp_f_panel_door_open','npp_f_low_flow','npp_f_charge_ok','npp_f_low_level','npp_f_annual_abstraction_limit_reached','npp_f_flow_coms_fail','npp_f_level_warning','npp_f_pump_rest','npp_f_recovery_level_not_reached','npp_f_voltage_ok',
    'che_ps_flood_alarm'
    ]
      );


var HB_PS_P1_tagArr = ['hb_p1_pump_cb_trip_fault','hb_p1_startup_fault','hb_p1_estop_fault','hb_p1_no_flow_fault']
var HB_PS_P2_tagArr = ['hb_p2_pump_cb_trip_fault','hb_p2_startup_fault','hb_p2_estop_fault','hb_p2_no_flow_fault']
var HB_PS_P3_tagArr = ['hb_p3_pump_cb_trip_fault','hb_p3_startup_fault','hb_p3_estop_fault','hb_p3_no_flow_fault']
var HB_PS_alarmArr = ["FAULT","FAULT","FAULT","FAULT"]
var HB_PS_descriptionArr=["Circuit Breaker Trip","Start Up","Emergency Stop","No Flow"]

var VS_PS_G_tagArr = ['vs_g_comms']
var VS_PS_G_alarmArr = ["FAULT"]
var VS_PS_G_descriptionArr=['Comms Fail']
var VS_PS_P1_tagArr = ['vs_p1_lsp','vs_p1_ldp','vs_p1_hdp','vs_p1_starter_fault','vs_p1_startup_fault']
var VS_PS_P2_tagArr = ['vs_p2_lsp','vs_p2_ldp','vs_p2_hdp','vs_p2_starter_fault','vs_p2_startup_fault']
var VS_PS_alarmArr = ["FAULT","FAULT","FAULT","FAULT","FAULT"]
var VS_PS_descriptionArr=["Low Suction Pressure","Low Delivery Pressure","High Delivery Pressure","Soft Starter", 'Startup']


var BHB_PS_P1_tagArr = ['bhb_p1_startup_fault','bhb_p1_soft_s_fault','bhb_p1_no_flow']
var BHB_PS_P2_tagArr = ['bhb_p2_startup_fault','bhb_p2_soft_s_fault','bhb_p2_no_flow']
var BHB_PS_alarmArr = ['FAULT',"FAULT","FAULT"]
var BHB_PS_descriptionArr=["STARTUP","SOFT STARTER","NO FLOW"]

var LH_PS_P1_tagArr = ['lh_p1_estop_fault','lh_P1_SOFT_S_FAULT','lh_P1_NO_FLOW_FAULT']
var LH_PS_P2_tagArr = ['lh_P2_ESTOP_FAULT','lh_P2_SOFT_S_FAULT','lh_p2_no_flow_fault']
var LH_PS_alarmArr = ['FAULT',"FAULT","FAULT"]
var LH_PS_descriptionArr=["EMERGENCY STOP","SOFT STARTER","NO FLOW"]

var BFT_PS_G_tagArr = ['bf_g_mcc_estop']
var BFT_PS_G_alarmArr = ["FAULT"]
var BFT_PS_G_descriptionArr=['MCC Emergency Stop']
var BFT_PS_P1_tagArr = ['bf_p1_pump_trip_fault','bf_p1_estop_fault','bf_p1_no_flow_fault']
var BFT_PS_P2_tagArr = ['bf_p2_pump_trip_fault','bf_p2_estop_fault','bf_p2_no_flow_fault']
var BFT_PS_P3_tagArr = ['bf_p3_pump_trip_fault','bf_p3_estop_fault','bf_p3_no_flow_fault']
var BFT_PS_P4_tagArr = ['bf_p4_pump_trip_fault','bf_p4_estop_fault','bf_p4_no_flow_fault']
var BFT_PS_alarmArr = ["FAULT","FAULT","FAULT"]
var BFT_PS_descriptionArr=["Pump Trip","Emergency Stop","No Flow"]

var TC_PS_P1_tagArr = ['tc_p1_pump_trip_fault','tc_p1_pump_trip_fault','tc_p1_no_flow_fault', 'tc_p1_earth_fault']
var TC_PS_P2_tagArr = ['tc_p2_pump_trip_fault','tc_p2_pump_trip_fault','tc_p2_no_flow_fault', 'tc_p2_earth_fault']
var TC_PS_P3_tagArr = ['tc_p3_pump_trip_fault','tc_p3_pump_trip_fault','tc_p3_no_flow_fault', 'tc_p3_earth_fault']
var TC_PS_alarmArr = ['FAULT',"FAULT","FAULT","FAULT"]
var TC_PS_descriptionArr=["PUMP TRIP","EMERGENCY STOP","NO FLOW","EARTH FAULT"]

var CG_PS_G_tagArr = ['cg_g_m_cb_stat','cg_g_sp_fail','cg_g_earth_fault','cg_g_ps_flood_alm']
var CG_PS_G_alarmArr = ["FAULT","FAULT","FAULT","FAULT"]
var CG_PS_G_descriptionArr=['Main Circuit Breaker', 'Station Phase Failed','Earth Fault','Pump Station Flood Alarm']
var CG_PS_P1_tagArr = ['cg_p1_trip_stat','cg_p1_ex_fault_stat','cg_p1_e_stop_stat','cg_p1_cb_on_stat','cg_p1_lockout','cg_p1_s_u_p','cg_p1_d_o_p','cg_p1_s_p_s','cg_p1_d_p_s','cg_p1_b_t','cg_p1_v_c_t','cg_p1_m_w_t']
var CG_PS_P2_tagArr = ['cg_p2_trip_stat','cg_p2_ex_fault_stat','cg_p2_e_stop_stat','cg_p2_cb_on_stat','cg_p2_lockout','cg_p2_s_u_p','cg_p2_d_o_p','cg_p2_s_p_s','cg_p2_d_p_s','cg_p2_b_t','cg_p2_v_c_t','cg_p2_m_w_t']
var CG_PS_P3_tagArr = ['cg_p3_trip_stat','cg_p3_ex_fault_stat','cg_p3_e_stop_stat','cg_p3_cb_on_stat','cg_p3_lockout','cg_p3_s_u_p','cg_p3_d_o_p','cg_p3_s_p_s','cg_p3_d_p_s','cg_p3_b_t','cg_p3_v_c_t','cg_p3_m_w_t']
var CG_PS_alarmArr = ["FAULT","FAULT","FAULT","FAULT","FAULT","FAULT","FAULT","FAULT","FAULT","FAULT","FAULT","FAULT"]
var CG_PS_descriptionArr=["Trip Fault","Exterior Fault","Emergency Stop","Circuit Breaker On","Lockout","Suction Under Pressure","Delivery Under Pressure","Suction Pressure Swich","Delivery Pressure Switch",'Bearing Temperature',"Volute Casing Temperature","Motor Winding Temperature",]

var VRH_PS_P1_tagArr = ['vrh_p1_estop_fault','vrh_p1_cb_pump_trip_fault']
var VRH_PS_P2_tagArr = ['vrh_p2_estop_fault','vrh_p2_cb_pump_trip_fault']
var VRH_PS_P3_tagArr = ['vrh_p3_estop_fault','vrh_p3_cb_pump_trip_fault']
var VRH_PS_alarmArr = ['FAULT',"FAULT"]
var VRH_PS_descriptionArr=["EMERGENCY STOP","CIRCUIT BREAKER"]


var CHT_PS_P1_tagArr = ['cht_p1_no_flow_fault','cht_p1_estop_fault','cht_p1_circuit_breaker_fault']
var CHT_PS_P2_tagArr = ['cht_p2_no_flow_fault','cht_p2_estop_fault','cht_p2_circuit_breaker_fault']
var CHT_PS_alarmArr = ['FAULT',"FAULT","FAULT"]
var CHT_PS_descriptionArr=['No Flow','Emergency Stop','Circuit Breaker']

var VW_PS_G_tagArr = [     'vw_g_sa_fault',   'vw_g_charger_fault',    'vw_g_sps_fault',   'vw_g_dps_fault',   'vw_g_fm_fault',    'vw_g_pm_fault',    'vw_g_vm_fault',]
var VW_PS_G_alarmArr = ['FAULT','FAULT','FAULT','FAULT','FAULT','FAULT','FAULT']
var VW_PS_G_descriptionArr=['Surge Arrester','Charger','Suction Pressure Sensor','Delivery Pressure Sensor','Flow Meter','Power Meter','Voltage Monitor']
var VW_PS_P1_tagArr = ['vw_p1_vsd_comms_fault',   'vw_p1_vsd_fault',    'vw_p1_estop_fault',   'vw_p1_no_flow_fault',   'vw_p1_startup_fault','vw_p1_low_suc_press_fault','vw_p1_high_del_press_fault']
var VW_PS_alarmArr =   ['FAULT','FAULT','FAULT','FAULT','FAULT','FAULT', 'FAULT']
var VW_PS_descriptionArr=['VSD comms','VSD','Emergency Stop','No Flow','Startup','Low Suction Pressure','High Delivery Pressure']

var MW_PS_P1_tagArr = ['mw_p1_no_flow','mw_p1_alarm_trip','mw_p1_emergency_stop']
var MW_PS_P2_tagArr = ['mw_p2_no_flow', 'mw_p2_alarm_trip', 'mw_p2_emergency_stop']
var MW_PS_P3_tagArr = ['mw_p3_no_flow','mw_p3_alarm_trip','mw_p3_emergency_stop']
var MW_PS_alarmArr = ['FAULT', 'FAULT','FAULT']
var MW_PS_description = ['No Flow', 'Alarm Trip', 'Emergency Stop']



var STAN_P1_tagArr=['stan_p1_alarmshigh','stan_p1_alarmstrip']
var STAN_P2_tagArr=['stan_p2_alarmshigh','stan_p2_alarmstrip']
var STAN_P3_tagArr=['stan_p3_alarmshigh','stan_p3_alarmstrip']
var STAN_P4_tagArr=['stan_p4_alarmshigh','stan_p4_alarmstrip']
var STAN_PS_tagArr=['ALARM','ALARM']
var STAN_PS_description=['Alarm High', 'Alarm Trip']

var EFF_PS1_tagArr=['nmu_eff_p1_fault']
var EFF_PS2_tagArr=['nmu_eff_p2_fault']
var EFF_PS3_tagArr=['nmu_eff_p3_fault']
var EFF_PS4_tagArr=['nmu_eff_p4_fault']
var EFF_PS_tagArr=['FAULT',]
var EFF_PS_description=['Fault Active']


var UIT_PS1_tagArr=['fpt_uit_fc_surge_arrester_fault','fpt_uit_fc_charger_fault','fpt_uit_fc_remote_io_comms','fpt_uit_fc_pressure_analog_signal','fpt_uit_fc_flow_meter_comms',]
var UIT_PS_tagArr=['FAULT','FAULT','FAULT','FAULT','FAULT']
var UIT_PS_description=['Surge Arrester', 'Charger', 'Remote IO Comms Link', 'Pressure Analog Signal', 'Flow Meter Comms']

var CHE_PSG_tagArr=['che_ps_flood_alarm']
var CHE_PSG_label=['Fault']
var CHE_PSG_description=['Flood Alarm']

var CHE_PS1_tagArr=['che_ps_pumpset_1_no_flow_fault','che_ps_pumpset_1_ESTOP','che_ps_pumpset_1_circuit_breaker_trip','che_ps_pumpset_1_drive_fault','che_ps_pumpset_1_control_voltage_loss' ]
var CHE_PS2_tagArr=['che_ps_pumpset_2_no_flow_fault','che_ps_pumpset_2_ESTOP','che_ps_pumpset_2_circuit_breaker_trip','che_ps_pumpset_2_drive_fault','che_ps_pumpset_2_control_voltage_loss' ]
var CHE_PS3_tagArr=['che_ps_pumpset_3_no_flow_fault','che_ps_pumpset_3_ESTOP','che_ps_pumpset_3_circuit_breaker_trip','che_ps_pumpset_3_drive_fault','che_ps_pumpset_3_control_voltage_loss' ]
var CHE_PS4_tagArr=['che_ps_pumpset_4_no_flow_fault','che_ps_pumpset_4_ESTOP','che_ps_pumpset_4_circuit_breaker_trip','che_ps_pumpset_4_drive_fault','che_ps_pumpset_4_control_voltage_loss' ]
var CHE_PS_tagArr=['FAULT','FAULT','FAULT','FAULT','FAULT',]
var CHE_PS_description=['No Flow Fault','E-Stop Active','Circuit Breaker Trip','Drive Fault','Control Voltage Loss']

var STORMS_GP1_tagArr=['ps_storms_gp1_fault_general','ps_storms_gp1_vsd_fault','ps_storms_gp1_startup_fault','ps_storms_gp1_no_flow_fault']
var STORMS_GP2_tagArr=['ps_storms_gp2_fault_general','ps_storms_gp2_vsd_fault','ps_storms_gp2_startup_fault','ps_storms_gp2_no_flow_fault']
var STORMS_QP1_tagArr=['ps_storms_qp1_fault_general','ps_storms_qp1_vsd_fault','ps_storms_qp1_startup_fault','ps_storms_qp1_no_flow_fault']
var STORMS_QP2_tagArr=['ps_storms_qp2_fault_general','ps_storms_qp2_vsd_fault','ps_storms_qp2_startup_fault','ps_storms_qp2_no_flow_fault']
var STORMS_PS_tagArr=['FAULT','FAULT','FAULT','FAULT',]
var STORMS_PS_description=['General Failure','VSD Fault','Startup Fault','No Flow Fault']


var fm_Tower_FPT_tagArr=['fmt_fm_chamber_tamp','fmt_fm_solar_panel_tamp','fmt_fm_door_opened']
var fm_Tower_tagArr=['Fault', 'ALARM', 'Fault']
var fm_Tower_description = ['Chamber Tamper', 'Panel Tamper', 'Door Opened']

var coega_IDZT_tagArr=['fpt_cidzt_surge_arrester_fault','fpt_cidzt_charger_fault']
var coega_tagArr=['Fault','Fault']
var coega_description=['Surge Arrester', 'Charger Fault']


var gw1_humansdorp1_tagArr=['hup1_borehole_level_pr_fault','hup1_trip_fault','hup1_no_flow_fault','hup1_estop_active','hup1_pump_suf']
var gw1_humansdrop1_description=['Borehole Level Signal Fault',  'Pump Trip Fault','No Flow Fault','E-Stop Active','Start Up Fault']
var gw1_humansdorp1_label=['Fault', 'Fault', 'Fault', 'Fault', 'Fault']
var gw0_humansdorp1_tagArr=['hup1_voltage','hup1_battery','hup1_charge','hup1_24_timer','hup1_stop_level','hup1_fault']
var gw0_humansdorp1_description=['Voltage Fault','Battery Fault','Charger Fault','Stop Request','Stop Level Reached','General Fault']
var gw_humansdorp1_label=['Fault','Fault','Fault','Fault','Warning','Fault']



var gw1_humansdorp2_tagArr=['hup2_borehole_level_pr_fault','hup2_trip_fault','hup2_no_flow_fault','hup2_estop_active','hup2_pump_suf','hup2_stop_level','hup2_fault']
var gw1_humansdrop2_description=['Borehole Level Signal Fault',  'Pump Trip Fault','No Flow Fault','E-Stop Active','Start Up Fault','Stop Level Reached','General Fault']
var gw1_humansdorp2_label=['Fault','Fault','Fault','Fault','Fault','Warning','Fault']
var gw0_humansdorp2_tagArr=['hup2_voltage','hup2_battery','hup2_charge','hup2_24_timer']
var gw0_humansdrop2_description = ['Voltage Fault','Battery Fault','Charger Fault','Stop Request']
var gw0_humansdorp2_label = ['Fault','Fault','Fault','Fault']


var gw1_humansdorp3_tagArr=['hup3_borehole_level_pr_fault','hup3_trip_fault','hup3_estop_active','hup3_pump_suf','hup3_no_flow_fault',]
var gw1_humansdrop3_description=['Borehole Level Signal Fault',  'Pump Trip Fault','E-Stop Active','Start Up Fault','No Flow Fault']
var gw1_humansdorp3_label=['Fault','Fault','Fault','Fault','Fault']
var gw0_humansdorp3_tagArr=['hup3_voltage','hup3_battery','hup3_charge','hup3_24_timer','hup3_stop_level','hup3_fault']
var gw0_humansdrop3_description=['Voltage Fault','Battery Fault','Charger Fault','Stop Request','Stop Level Reached', 'General Fault']
var gw0_humansdorp3_label=['Fault', 'Fault','Fault', 'Fault','Warning', 'Fault']





var gw1_humansdorp4_tagArr=['hup4_borehole_level_pr_fault','hup4_trip_fault','hup4_no_flow_fault','hup4_estop_active','hup4_stop_level','hup4_pump_suf','hup4_fault']
var gw1_humansdrop4_description=["Borehole Level Signal Fault","Pump Trip Fault",'No Flow Fault', 'E-Stop Active','Stop Level Reached','Start Up Fault','General Fault']
var gw1_humansdorp4_label=['Fault', 'Fault', 'Fault', 'Fault','Fault', 'Fault','Fault']


var gw0_humansdorp4_tagArr=['hup4_voltage','hup4_battery','hup4_charge','hup4_24_timer']
var gw0_humansdorp_description=['Voltage Fault','Battery Fault','Charger Fault','Stop Request']
var gw0_humansdorp4_label = ['Fault','Fault','Fault','Warning']


var gw_kark_tagArr=['gw_kark_k1_estop','gw_kark_k1_vsd_fault','gw_kark_k1_voltage_ok','gw_kark_k1_panel_door_open','gw_kark_k1_low_flow_fault','gw_kark_k1_charger_ok','gw_kark_k1_borehol_low_level_fault','gw_kark_k1_surge_arrester_ok','gw_kark_k1_flow_comms','gw_kark_k_warning_level',]
var gw_kark_description=['E-Stop Active','VSD Fault','Voltage Ok','Panel Door Open','Low Flow Fault','Charger OK','Low Level Fault','Surge Arrester Not Ok','Surge Flow Fault','Warning Level']
var gw_kark_label = ['Fault', 'Fault', 'Fault','Fault','Fault','Fault', 'Fault', 'Fault','Fault','Fault',]

var gw1_npp_tagArr=['npp_f_fault_active','npp_f_estopactive','npp_f_vsdfault','npp_f_annual_abstraction_limit_reached','npp_f_flow_coms_fail','npp_f_level_warning']
var gw1_npp_description=['Fault Active','Emergency Stop','VSD Fault','Abstraction Reached','Flow Comms Fault','Low Level Warning']
var gw1_npp_label=['Fault','Fault','Fault','Warning','Fault','Warning']

var gw0_npp_tagArr=['npp_f_panel_door_open','npp_f_charge_ok','npp_f_voltage_ok']
var gw0_npp_description=['Door Open','Charger Fault','Voltage Not Ok']
var gw0_npp_label=['Warning','Fault','Fault']

this.intervalLoop = setInterval(()=>{


  this.GW0_NPP(gw0_npp_tagArr,gw0_npp_label,gw0_npp_description)
  this.GW1_NPP(gw1_npp_tagArr,gw1_npp_label,gw1_npp_description)


  this.GW_KARK(gw_kark_tagArr,gw_kark_label,gw_kark_description)

    this.Humansdorp_gw1(gw1_humansdorp1_tagArr,gw1_humansdorp1_label,gw1_humansdrop1_description)
    this.Humansdorp_0_gw1(gw0_humansdorp1_tagArr,gw_humansdorp1_label,gw0_humansdorp1_description)
    this.Humansdorp_gw2(gw1_humansdorp2_tagArr,gw1_humansdorp2_label,gw1_humansdrop2_description)
    this.Humansdorp_0_gw2(gw0_humansdorp2_tagArr,gw0_humansdorp2_label, gw0_humansdrop2_description)
    this.Humansdorp_gw3(gw1_humansdorp3_tagArr,gw1_humansdorp3_label,gw1_humansdrop3_description)
    this.Humansdorp_0_gw3(gw0_humansdorp3_tagArr,gw0_humansdorp3_label,gw0_humansdrop3_description)
    this.Humansdorp_gw4(gw1_humansdorp4_tagArr,gw1_humansdorp4_label,gw1_humansdrop4_description)
   this.Humansdorp_0_gw4(gw0_humansdorp4_tagArr,gw0_humansdorp4_label,gw0_humansdorp_description)


  this.COEGA_FPT(coega_IDZT_tagArr,coega_tagArr,coega_description)


    this.UIT_FPT(UIT_PS1_tagArr, UIT_PS_tagArr,UIT_PS_description)

    this.Storm_PS1(STORMS_GP1_tagArr,STORMS_PS_tagArr,STORMS_PS_description)

    this.Storm_PS2(STORMS_GP2_tagArr,STORMS_PS_tagArr,STORMS_PS_description)
    this.Storm_PS3(STORMS_QP1_tagArr,STORMS_PS_tagArr,STORMS_PS_description)
    this.Storm_PS4(STORMS_QP2_tagArr,STORMS_PS_tagArr,STORMS_PS_description)

    this.EFF_PS1(EFF_PS1_tagArr,EFF_PS_tagArr,EFF_PS_description)
    this.EFF_PS2(EFF_PS2_tagArr,EFF_PS_tagArr,EFF_PS_description)
    this.EFF_PS3(EFF_PS3_tagArr,EFF_PS_tagArr,EFF_PS_description)
    this.EFF_PS4(EFF_PS4_tagArr,EFF_PS_tagArr,EFF_PS_description)


    this.Stan_PS1(STAN_P1_tagArr,STAN_PS_tagArr,STAN_PS_description)
    this.Stan_PS2(STAN_P2_tagArr,STAN_PS_tagArr,STAN_PS_description)
    this.Stan_PS3(STAN_P3_tagArr,STAN_PS_tagArr,STAN_PS_description)
    this.Stan_PS4(STAN_P4_tagArr,STAN_PS_tagArr,STAN_PS_description)

    this.Heatherbank_PS1(HB_PS_P1_tagArr, HB_PS_alarmArr,HB_PS_descriptionArr )
    this.Heatherbank_PS2(HB_PS_P2_tagArr, HB_PS_alarmArr,HB_PS_descriptionArr )
    this.Heatherbank_PS3(HB_PS_P3_tagArr, HB_PS_alarmArr,HB_PS_descriptionArr )

    this.VanStadens_G(VS_PS_G_tagArr, VS_PS_G_alarmArr,VS_PS_G_descriptionArr )
    this.VanStadens_PS1(VS_PS_P1_tagArr, VS_PS_alarmArr,VS_PS_descriptionArr )
    this.VanStadens_PS2(VS_PS_P2_tagArr, VS_PS_alarmArr,VS_PS_descriptionArr )

    this.BlueHorizonBay_PS1(BHB_PS_P1_tagArr, BHB_PS_alarmArr,BHB_PS_descriptionArr )
    this.BlueHorizonBay_PS2(BHB_PS_P2_tagArr, BHB_PS_alarmArr,BHB_PS_descriptionArr )

    this.LovemoreHeights_PS1(LH_PS_P1_tagArr, LH_PS_alarmArr,LH_PS_descriptionArr )
    this.LovemoreHeights_PS2(LH_PS_P2_tagArr, LH_PS_alarmArr,LH_PS_descriptionArr )

    this.Buffelsfontein_G  (BFT_PS_G_tagArr, BFT_PS_G_alarmArr,BFT_PS_G_descriptionArr )
    this.Buffelsfontein_PS1(BFT_PS_P1_tagArr, BFT_PS_alarmArr,BFT_PS_descriptionArr )
    this.Buffelsfontein_PS2(BFT_PS_P2_tagArr, BFT_PS_alarmArr,BFT_PS_descriptionArr )
    this.Buffelsfontein_PS3(BFT_PS_P3_tagArr, BFT_PS_alarmArr,BFT_PS_descriptionArr )
    this.Buffelsfontein_PS4(BFT_PS_P4_tagArr, BFT_PS_alarmArr,BFT_PS_descriptionArr )

    this.Theescombe_PS1(TC_PS_P1_tagArr, TC_PS_alarmArr,TC_PS_descriptionArr )
    this.Theescombe_PS2(TC_PS_P2_tagArr, TC_PS_alarmArr,TC_PS_descriptionArr )
    this.Theescombe_PS3(TC_PS_P3_tagArr, TC_PS_alarmArr,TC_PS_descriptionArr )

    this.CrownGardens_G(CG_PS_G_tagArr, CG_PS_G_alarmArr,CG_PS_G_descriptionArr )
    this.CrownGardens_PS1(CG_PS_P1_tagArr, CG_PS_alarmArr,CG_PS_descriptionArr )
    this.CrownGardens_PS2(CG_PS_P2_tagArr, CG_PS_alarmArr,CG_PS_descriptionArr )
    this.CrownGardens_PS3(CG_PS_P3_tagArr, CG_PS_alarmArr,CG_PS_descriptionArr )

    this.VanRiebeeckHoogte_PS1(VRH_PS_P1_tagArr, VRH_PS_alarmArr,VRH_PS_descriptionArr )
    this.VanRiebeeckHoogte_PS2(VRH_PS_P2_tagArr, VRH_PS_alarmArr,VRH_PS_descriptionArr )
    this.VanRiebeeckHoogte_PS3(VRH_PS_P3_tagArr, VRH_PS_alarmArr,VRH_PS_descriptionArr )


    this.Motherwell_PS1(MW_PS_P1_tagArr,MW_PS_alarmArr,MW_PS_description)
    this.Motherwell_PS2(MW_PS_P2_tagArr,MW_PS_alarmArr,MW_PS_description)
    this.Motherwell_PS3(MW_PS_P3_tagArr,MW_PS_alarmArr,MW_PS_description)


    this.Chatty_PS1(CHT_PS_P1_tagArr, CHT_PS_alarmArr,CHT_PS_descriptionArr )
    this.Chatty_PS2(CHT_PS_P2_tagArr, CHT_PS_alarmArr,CHT_PS_descriptionArr )

    this.Verwoerd_G(VW_PS_G_tagArr, VW_PS_G_alarmArr,VW_PS_G_descriptionArr )
    this.Verwoerd_PS1(VW_PS_P1_tagArr, VW_PS_alarmArr,VW_PS_descriptionArr )

    this.FMT_FPT(fm_Tower_FPT_tagArr,fm_Tower_tagArr,fm_Tower_description)

    this.Chelsea_PSG(CHE_PSG_tagArr,CHE_PSG_label,CHE_PSG_description)
    this.Chelsea_PS1(CHE_PS1_tagArr,CHE_PS_tagArr,CHE_PS_description)

    this.Chelsea_PS2(CHE_PS2_tagArr,CHE_PS_tagArr,CHE_PS_description)
    this.Chelsea_PS3(CHE_PS3_tagArr,CHE_PS_tagArr,CHE_PS_description)
    this.Chelsea_PS4(CHE_PS4_tagArr,CHE_PS_tagArr,CHE_PS_description)









    this.count = 0

  },3000)


  }


  ngOnInit()   {  }


  EFF_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMU_NMU_EFF")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "NMU Effluent Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/nmu-effluent"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  EFF_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMU_NMU_EFF")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "NMU Effluent Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/nmu-effluent"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  EFF_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMU_NMU_EFF")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "NMU Effluent Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/nmu-effluent"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  EFF_PS4(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMU_NMU_EFF")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "NMU Effluent Pump 4", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/nmu-effluent"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Stan_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMB_STAN_R_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Stanford Road Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i], url: "/hawkeye/pumpstations/stanford-road"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Stan_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMB_STAN_R_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Stanford Road Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i], url: "/hawkeye/pumpstations/stanford-road"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Stan_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMB_STAN_R_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Stanford Road Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i], url: "/hawkeye/pumpstations/stanford-road"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Stan_PS4(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMB_STAN_R_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Stanford Road Pump 4", alarm_type:alarmArr[i], description: descriptionArr[i],  url: "/hawkeye/pumpstations/stanford-road"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Motherwell_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMB_MW_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Motherwell Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i] ,url: "/hawkeye/pumpstations/motherwell"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Motherwell_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMB_MW_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Motherwell Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/motherwell"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Motherwell_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMB_MW_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Motherwell Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/motherwell"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  Heatherbank_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){

    var varArr:any=[]
const findval = this.userSites.includes("NMB_HB_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Heatherbank Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/heatherbank"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  Heatherbank_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_HB_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Heatherbank Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/heatherbank"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  Heatherbank_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_HB_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Heatherbank Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/heatherbank"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  VanStadens_G(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_VS_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Van Stadens General", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/vanstadens"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  VanStadens_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_VS_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Van Stadens Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/vanstadens"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  VanStadens_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_VS_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Van Stadens Pump 2", alarm_type: alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/vanstadens"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  BlueHorizonBay_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_BHB_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Blue Horizon Bay Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/bluehorizonbay"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  BlueHorizonBay_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_BHB_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Blue Horizon Bay Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/bluehorizonbay"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  LovemoreHeights_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_LH_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Lovemore Heights Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/lovemoreheights"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  LovemoreHeights_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_LH_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Lovemore Heights Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/lovemoreheights"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Buffelsfontein_G(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_BFT_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Buffelsfontein General", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  Buffelsfontein_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_BFT_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if (tagArr[i]=="bf_p1_estop_fault"){
            if(varArr[i]==0){
              this.ELEMENT_DATA[this.count]={  site_name: "Buffelsfontein Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
              this.dataSource.sort = this.sort;
              this.dataSource.filter = this.filterValue.trim().toLowerCase();
              this.count++
            }
          }
          else{
            if(varArr[i]==1){
              this.ELEMENT_DATA[this.count]={  site_name: "Buffelsfontein Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
              this.dataSource.sort = this.sort;
              this.dataSource.filter = this.filterValue.trim().toLowerCase();
              this.count++
            }
          }

    }
  }

  }
  Buffelsfontein_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_BFT_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if (tagArr[i]=="bf_p2_estop_fault"){
            if(varArr[i]==0){
              this.ELEMENT_DATA[this.count]={  site_name: "Buffelsfontein Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
              this.dataSource.sort = this.sort;
              this.dataSource.filter = this.filterValue.trim().toLowerCase();
              this.count++
            }
          }
          else{
            if(varArr[i]==1){
              this.ELEMENT_DATA[this.count]={  site_name: "Buffelsfontein Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
              this.dataSource.sort = this.sort;
              this.dataSource.filter = this.filterValue.trim().toLowerCase();
              this.count++
            }
          }
    }
  }

  }
  Buffelsfontein_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_BFT_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if (tagArr[i]=="bf_p3_estop_fault"){
            if(varArr[i]==0){
              this.ELEMENT_DATA[this.count]={  site_name: "Buffelsfontein Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
              this.dataSource.sort = this.sort;
              this.dataSource.filter = this.filterValue.trim().toLowerCase();
              this.count++
            }
          }
          else{
            if(varArr[i]==1){
              this.ELEMENT_DATA[this.count]={  site_name: "Buffelsfontein Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
              this.dataSource.sort = this.sort;
              this.dataSource.filter = this.filterValue.trim().toLowerCase();
              this.count++
            }
          }
    }
  }

  }
  Buffelsfontein_PS4(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_BFT_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if (tagArr[i]=="bf_p4_estop_fault"){
            if(varArr[i]==0){
              this.ELEMENT_DATA[this.count]={  site_name: "Buffelsfontein Pump 4", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
              this.dataSource.sort = this.sort;
              this.dataSource.filter = this.filterValue.trim().toLowerCase();
              this.count++
            }
          }
          else{
            if(varArr[i]==1){
              this.ELEMENT_DATA[this.count]={  site_name: "Buffelsfontein Pump 4", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
              this.dataSource.sort = this.sort;
              this.dataSource.filter = this.filterValue.trim().toLowerCase();
              this.count++
            }
          }
    }
  }

  }

  Theescombe_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_TC_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Theescombe Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  Theescombe_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_TC_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Theescombe Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  Theescombe_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_TC_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Theescombe Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/buffelsfontein"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  CrownGardens_G(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CG_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Crown Gardens General", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/crowngardens"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  CrownGardens_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CG_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Crown Gardens Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/crowngardens"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  CrownGardens_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CG_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Crown Gardens Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/crowngardens"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  CrownGardens_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CG_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Crown Gardens Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/crowngardens"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  VanRiebeeckHoogte_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_VRH_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Van Riebeeck Hoogte Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/vanriebeekhoogte"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  VanRiebeeckHoogte_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_VRH_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Van Riebeeck Hoogte Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/vanriebeekhoogte"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  VanRiebeeckHoogte_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_VRH_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Van Riebeeck Hoogte Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/vanriebeekhoogte"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Chatty_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CHT_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Chatty Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/chatty"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  Chatty_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CHT_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Chatty Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/chatty"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Verwoerd_G(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_VW_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Verwoerd General", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/verwoerd"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }
  Verwoerd_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_VW_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Verwoerd Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/verwoerd"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Chelsea_PSG(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CHE_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Chelsea Pumpstation", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/chelsea-ps"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Chelsea_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CHE_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Chelsea Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/chelsea-ps"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Chelsea_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CHE_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Chelsea Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/chelsea-ps"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  Chelsea_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CHE_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Chelsea Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/chelsea-ps"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Chelsea_PS4(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CHE_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Chelsea Pump 4", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/chelsea-ps"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }



  Storm_PS1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("TSI_STORMS_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Storms River Pump 1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/stormsriver"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  Storm_PS2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("TSI_STORMS_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Storms River Pump 2", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/stormsriver"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }



  Storm_PS3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("TSI_STORMS_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Storms River Pump 3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/stormsriver"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  Storm_PS4(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("TSI_STORMS_PS")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Storms River Pump 4", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/pumpstations/stormsriver"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  UIT_FPT(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_UIT_FC_FPT")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Uitenhage Flow Chamber", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/fptsites/uitenhage-flow-chamber"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  FMT_FPT(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_FMT_FPT")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "FM Tower", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/fptsites/fmtower"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  COEGA_FPT(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_CIDZT_FPT")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Coega IDZT", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/fptsites/coegaidzt"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  Humansdorp_gw1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("KLM_HUP_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "HD1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/humansdorp"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Humansdorp_gw2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("KLM_HUP2_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);

          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "HD2C", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/humansdorp2"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }



  Humansdorp_gw3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("KLM_HUP3_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "HD3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/humansdorp3"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Humansdorp_gw4(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("KLM_HUP4_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "HD4", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/humansdorp4"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  Humansdorp_0_gw1(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("KLM_HUP_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==0){
            this.ELEMENT_DATA[this.count]={  site_name: "HD1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/humansdorp"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Humansdorp_0_gw2(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("KLM_HUP2_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==0){
            this.ELEMENT_DATA[this.count]={  site_name: "HD2C", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/humansdorp2"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }



  Humansdorp_0_gw3(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("KLM_HUP3_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==0){
            this.ELEMENT_DATA[this.count]={  site_name: "HD3", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/humansdorp3"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  Humansdorp_0_gw4(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("KLM_HUP4_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==0){
            this.ELEMENT_DATA[this.count]={  site_name: "HD4", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/humansdorp4"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  GW_KARK(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("KOU_KARK1_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==0){
            this.ELEMENT_DATA[this.count]={  site_name: "Kareedouw K1", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/kareedouwk1"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  GW0_NPP(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_NPP_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==0){
            this.ELEMENT_DATA[this.count]={  site_name: "Newton Park Pool", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/newtonparkpool"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }


  GW1_NPP(tagArr: any[], alarmArr: any[],descriptionArr:any[] ){
    var varArr:any=[]
const findval = this.userSites.includes("NMB_NPP_GW")
if(findval== true){
    for(let i = 0; i<tagArr.length ;i++){
          varArr[i] = localStorage.getItem(tagArr[i]);
          if(varArr[i]==1){
            this.ELEMENT_DATA[this.count]={  site_name: "Newton Park Pool", alarm_type:alarmArr[i], description: descriptionArr[i],url: "/hawkeye/groundwater/newtonparkpool"}
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.count++
          }
    }
  }

  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = this.filterValue.trim().toLowerCase();
 }


 navigateToSite(element:any){
  let route = element;
  this.router.navigate([route]);

}


ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}
}
