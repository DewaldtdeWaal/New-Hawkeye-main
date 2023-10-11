import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';

import {MatDialog} from '@angular/material/dialog';

import{trendArray,variables,TrendPicker} from 'src/app/class/trendpicker'

//  import { TagSelectorDialogComponent } from '../trendpicker-v2/tag-selector-dialog/tag-selector-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Common } from 'src/app/class/common';


export interface PeriodicElement {
  name: string;
  min: number;
  max: number;
  average: number;
}
@Component({
  selector: 'app-test-picker',
  templateUrl: './test-picker.component.html',
  styleUrls: ['./test-picker.component.css']
})
export class TestPickerComponent implements OnInit {


  isLoading: boolean = false;
  options: any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
newStart:any
newEnd:any

public authListenerSubs!: Subscription;
userSites:string[];

  Sites = new FormControl();
  SitesList: string[] = [];

  Right = new FormControl();




////////////////////////////////////// Site Data Arrays
// Reservoirs
// variable:any={
//   BERGEN_RES_R_LVL_arr:[],
//   WOLWAS_RES_R_LVL_arr:[],
//   UMI_RES_R_LVL_arr:[],
//   KROON_RES_R_LVL_arr:[],
//   TINROOF_LVL_RES_LVL_arr:[],
//   DAMCAMP_LVL_RES_LVL_arr:[],
//   HOLDING_LVL_RES_LVL_arr:[],
//   ISUZU_OVEN1_TEMP1_arr:[],
//   ISUZU_OVEN1_TEMP2_arr:[],
//   ISUZU_OVEN1_HEAT_ECVH_TEMP_arr:[],
//   ISUZU_OVEN1_VSD_SPEED_arr:[],
//   ISUZU_OVEN2_TEMP1_arr:[],
//   ISUZU_OVEN2_TEMP2_arr:[],
//   ISUZU_OVEN2_HEAT_ECVH_TEMP_arr:[],
//   ISUZU_OVEN2_VSD_SPEED_arr:[],
//   BUSH_CHURCH_SOCO_FR_arr:[],
//   BUSH_CHURCH_STEEL_FR_arr:[],
//   BUSH_CHURCH_SOCCO_BAR_arr:[],
//   BUSH_CHURCH_STEEL_BAR_arr:[],
//   BUSH_PUMP_FR_arr:[],
//   BUSH_GW_COMB_FLOW_RATE_arr:[],
//   BUSH_TANK_LVL_arr:[],
//   HUM_OFF_TAKE_TF_arr:[],
//   HUM_OFF_TAKE_BAR_arr:[],
//   HUM_OFF_TAKE_BAT_arr:[],
//   JEFF_OFF_TAKE_TF_arr:[],
//   JEFF_OFF_TAKE_BAT_arr:[],
//   KOU_MAIN_LINE_BAR_arr:[],
//   KOU_MAIN_LINE_BAT_arr:[],
//   ONS_PARA_TF_arr:[],
//   ONS_PARA_BAT_arr:[],
//   ST_FRAN_OFF_TF_arr:[],
//   PARA_BEA_TF_arr:[],
//   ST_FRAN_PARA_BEA_BAT_arr:[],
//   GBW_ACT_BAR_arr:[],
//   GBW_FLO_RAT_arr:[],
//   OLI_LVL_array: [],
//   CGK_PRESSURE_array:[],
//   CGK_LEVEL_array:[],
//   CGK_MOTHERWELL_FLOW_RATE_array:[],
//   CGK_GRASSRIDGE_FLOW_RATE_array:[],
//   CGK_COEGA_FLOW_RATE_array:[],
//   CGK_MOTHERWELL_TOTAL_FLOW_array:[],
//   CGK_GRASSRIDGE_TOTAL_FLOW_array:[],
//   CGK_COEGA_TOTAL_FLOW_array:[],
//   NMB_SCHOE_PRESSURE_array:[],
//   NMB_SCHOE_RES_LEVEL_array:[],
//   NMB_SCHOE_ACTUATOR_POSITION_array:[],
//   NMB_SCHOE_ACTUATOR_SET_POINT_array:[],
//   ELA_FR_arr:[],
//   ELA_P_arr:[],
//   EMER_H_Level_arr: [],
//   EMER_H_Total_Flow_arr: [],
//   EMER_H_Flow_Rate_arr: [],
//   drift_R_reservoir_level_arr: [],
//   drift_R_flow_rate_1_arr: [],
//   drift_R_flow_rate_2_arr: [],
//    drift_R_total_flow_1_arr: [],
//   drift_R_total_flow_2_arr: [],
//   nmb_schoe_r_actuator_valve_feedback_signal_error_arr:[],
//   nmb_schoe_r_actuator_valve_command_signal_error_arr:[],
//   nmb_schoe_r_reservoir_level_signal_error_arr:[],
//   nmb_schoe_r_actuator_valve_fault_arr:[],
//   nmb_schoe_r_actuator_valve_torque_fail_close_arr:[],
//   nmb_schoe_r_actuator_valve_torque_fail_open_arr:[],
//   nmb_schoe_r_general_fault_arr:[],
//   nmb_schoe_r_actuator_general_fault_arr:[],
//   nmb_schoe_r_actuator_valve_timeout_arr:[],
//   KARK_K1_TF_arr:[],
//   KARK_K1_FR_arr:[],
//   KARK_K1_CUR_arr:[],
//   KARK_K1_LVL_arr:[],
//   KARK_K2_TF_arr:[],
//   KARK_K2_FR_arr:[],
//   KARK_K2_CUR_arr:[],
//   KARK_K2_LVL_arr:[],
//   GBarray:[],
//   GBFRarray:[],
//   CHE_East_array:[],
//   CHE_West_array:[],
//   CHE_FlowRate_array:[],
//   GR_EC_array:[],
//   GR_WC_array:[],
//   VSarray:[],
//   CHT_NC_array:[],
//   CHT_OR_array:[],
//   CHT_SC_array:[],
//   VRH_DL_array:[],
//   VRH_SL_array:[],
//   HBarray:[],
//   LHarray:[],
//   BHB_array:[],
//   TCarray:[],
//   RD_LVL_array:[],
//   SM_LVL_array:[],
//   SM_FR_array:[],
//   FMT_PRESS_array:[],
//   FMT_FR_array:[],
//   FMT_TF_array:[],
//   IDZ_FR_array:[],
//   IDZ_MW_FR_array:[],
//   GT_BRG_STL_FR_array:[],
//   GT_BRG_SOCO_FR_array:[],
//   GT_BRG_STL_PRESS_array:[],
//   GT_BRG_SOCO_PRESS_array:[],
//   UIT_FC_FR_array:[],
//   UIT_FC_PRESS_array:[],
//   BETH_PRESS_array:[],
//   BETH_FLOW_RATE_array:[],
//   BETH_BATTERY_STATUS_array: [],
//   BETH_TOTAL_FLOW_array: [],
//   CG_CSP_Arr: [],
//   CG_CDP_Arr: [],
//   CG_S_LVL_Arr: [],
//   CG_T1_LVL_Arr: [],
//   CG_T1_IF_Arr: [],
//   CG_T1_OF_Arr: [],
//   CG_T2_LVL_Arr: [],
//   CG_T2_IF_Arr: [],
//   CG_T2_OF_Arr: [],
//   NMU_EFF_FR_Arr: [],
//   NMU_EFF_DP_Arr: [],
//   NMU_EFF_DAM_LVL_Arr: [],
//   NMU_EFF_P1_SPEED_Arr: [],
//   NMU_EFF_P2_SPEED_Arr: [],
//   NMU_EFF_P3_SPEED_Arr: [],
//   NMU_EFF_JP_SPEED_Arr: [],
//   CHE_PS_P1_ACTUAL_SPEED_Arr: [],
//   CHE_PS_P1_DEL_PRESS_Arr: [],
//   CHE_PS_P1_SUCT_PRESS_Arr: [],
//   CHE_PS_P2_ACTUAL_SPEED_Arr: [],
//   CHE_PS_P2_DEL_PRESS_Arr: [],
//   CHE_PS_P2_SUCT_PRESS_Arr: [],
//   CHE_PS_P3_ACTUAL_SPEED_Arr: [],
//   CHE_PS_P3_DEL_PRESS_Arr: [],
//   CHE_PS_P3_SUCT_PRESS_Arr: [],
//   CHE_PS_P4_ACTUAL_SPEED_Arr: [],
//   CHE_PS_P4_DEL_PRESS_Arr: [],
//   CHE_PS_P4_SUCT_PRESS_Arr: [],
//   CHE_PS_700_FLOW_RATE_Arr:[],
//   NMBM_NPP_GW_PRESSURE_Arr:[],
//   NMBM_NPP_GW_FLOW_RATE_Arr:[],
//   NMBM_NPP_GW_LEVEL_Arr:[],
//   NMBM_NPP_GW_TOTAL_FLOW_Arr:[],
//   KLM_HUP_WATER_LEVEL_Arr:[],
//   KLM_HUP_FLOWRATE_Arr:[],
//   KLM_HUP_TOTALFLOW_Arr:[],
//   KLM_HUP2_WATER_LEVEL_Arr:[],
//   KLM_HUP2_FLOWRATE_Arr:[],
//   KLM_HUP2_TOTALFLOW_Arr:[],
//   KLM_HUP3_WATER_LEVEL_Arr:[],
//   KLM_HUP3_FLOWRATE_Arr:[],
//   KLM_HUP3_TOTALFLOW_Arr:[],
//   KLM_HUP4_WATER_LEVEL_Arr:[],
//   KLM_HUP4_FLOWRATE_Arr:[],
//   KLM_HUP4_TOTALFLOW_Arr:[],
//   KLM_HUP6_WATER_LEVEL_Arr:[],
//   KLM_HUP6_FLOWRATE_Arr:[],
//   KLM_HUP6_TOTALFLOW_Arr:[],
//   STORMS_QUARRY_LEVEL_Arr:[],
//   STORMS_GORGE_LEVEL_Arr:[],
//   STORMS_HOLDING_RESERVOIR_LEVEL_Arr:[],
//   STORMS_OVERHEAD_TANK_LEVEL_Arr:[],
//   STAN_BPS_SuctionPressure_Arr: [],
//   STAN_BPS_DeliveryPressure_Arr: [],
//   STAN_BPS_FlowRate_Arr: [],
//   STAN_BPS_P1_FREQ_Arr: [],
//   STAN_BPS_P2_FREQ_Arr: [],
//   STAN_BPS_P3_FREQ_Arr: [],
//   STAN_BPS_P4_FREQ_Arr: [],
//   MW_BPS_FlowRate_Arr: [],
//   MW_BPS_SuctionPressure_Arr: [],
//   MW_BPS_DeliveryPressure_Arr: [],
//   MW_LVL_array:[],
//   WTW_NGT_FM_HIGH_FR_Arr: [],
//   WTW_NGT_FM_LOW_FR_Arr: [],
//   GR_R_INLET_Arr:[],
//   GR_R_OUTLET_Arr:[],
//   HUM_GW_BOR_LVL_arr: [],
//   HUM_GW_RAW_WATER_TANK_LVL_arr: [],
//   HUM_GW_FIN_WAT_TANK_LVL_arr: [],
// }

variable:any = variables;

//////////////////////////////////////Site Right axis variables
GR_R_INLET_axis:any;
GR_R_OUTLET_axis:any;

HUM_GW_BOR_LVL_axis:any
HUM_GW_RAW_WATER_TANK_LVL_axis:any
HUM_GW_FIN_WAT_TANK_LVL_axis:any

  CGK_PRESSURE_axis:any
  CGK_LEVEL_axis:any
  CGK_MOTHERWELL_FLOW_RATE_axis:any
  CGK_GRASSRIDGE_FLOW_RATE_axis:any
  CGK_COEGA_FLOW_RATE_axis:any
  CGK_MOTHERWELL_TOTAL_FLOW_axis:any
  CGK_GRASSRIDGE_TOTAL_FLOW_axis:any
  CGK_COEGA_TOTAL_FLOW_axis:any
  GB_axis:any
  GBFR_axis:any


  NMB_SCHOE_PRESSURE_axis:any
  NMB_SCHOE_RES_LEVEL_axis:any
  NMB_SCHOE_ACTUATOR_POSITION_axis:any
  NMB_SCHOE_ACTUATOR_SET_POINT_axis:any

  CHE_East_axis:any
  CHE_West_axis:any

  ELA_FR_axis:any
  ELA_P_axis:any

  drift_res_level_axis:any
drift_res_flow_rate_1_axis:any
drift_res_flow_rate_2_axis:any
drift_res_total_flow_1_axis:any
drift_res_total_flow_2_axis:any

nmb_schoe_r_actuator_valve_feedback_signal_error_axis:any
nmb_schoe_r_actuator_valve_command_signal_error_axis:any
nmb_schoe_r_reservoir_level_signal_error_axis:any
nmb_schoe_r_actuator_valve_fault_axis:any
nmb_schoe_r_actuator_valve_torque_fail_close_axis:any
nmb_schoe_r_actuator_valve_torque_fail_open_axis:any
nmb_schoe_r_general_fault_axis:any
nmb_schoe_r_actuator_general_fault_axis:any
nmb_schoe_r_actuator_valve_timeout_axis:any

KARK_K1_TF_axis:any;
KARK_K1_FR_axis:any;
KARK_K1_CUR_axis:any;
KARK_K1_LVL_axis:any;
KARK_K2_TF_axis:any;
KARK_K2_FR_axis:any;
KARK_K2_CUR_axis:any;
KARK_K2_LVL_axis:any;

  EMER_H_LEVEL_axis:any
  EMER_H_FLOW_RATE_axis:any
  EMER_H_TOTAL_FLOW_axis:any



  BUSH_CHURCH_SOCO_FR_axis:any
  BUSH_CHURCH_STEEL_FR_axis:any
  BUSH_CHURCH_SOCCO_BAR_axis:any
  BUSH_CHURCH_STEEL_BAR_axis:any
  BUSH_PUMP_FR_axis:any
  BUSH_GW_COMB_FLOW_RATE_axis:any
  BUSH_TANK_LVL_axis:any

  HUM_OFF_TAKE_TF_axis:any
  HUM_OFF_TAKE_BAR_axis:any
  HUM_OFF_TAKE_BAT_axis:any
  JEFF_OFF_TAKE_TF_axis:any
  JEFF_OFF_TAKE_BAT_axis:any
  KOU_MAIN_LINE_BAR_axis:any
  KOU_MAIN_LINE_BAT_axis:any
  ONS_PARA_TF_axis:any
  ONS_PARA_BAT_axis:any
  ST_FRAN_OFF_TF_axis:any
  PARA_BEA_TF_axis:any
  ST_FRAN_PARA_BEA_BAT_axis:any

  GBW_ACT_BAR_axis:any
  GBW_FLO_RAT_axis:any

  OLI_LVL_axis:any

  KROON_RES_R_LVL_axis:any
  UMI_RES_R_LVL_axis:any
  WOLWAS_RES_R_LVL_axis:any
  BERGEN_RES_R_LVL_axis:any
  TINROOF_LVL_RES_LVL_axis:any
  DAMCAMP_LVL_RES_LVL_axis:any
  HOLDING_LVL_RES_LVL_axis:any

  GR_EC_axis:any
  CHE_fr_axis:any
  GR_WC_axis:any
  VS_axis:any
  CHT_NC_axis:any
  CHT_OR_axis:any
  CHT_SC_axis:any
  VRH_DL_axis:any
  VRH_SL_axis:any
   HB_axis:any
  LH_axis:any
  BHB_axis:any
  TC_axis:any
  RD_LVL_axis:any
  SM_FR_axis:any
  SM_LVL_axis:any
// FPT Sites

BETH_BATTERY_STATUS_axis:any
BETH_TOTAL_FLOW_axis:any
  BETH_PRESS_axis:any
  BETH_FLOW_RATE_axis:any
  FMT_FR_axis:any
  FMT_TF_axis:any
  FMT_PRESS_axis:any
  IDZ_FR_axis:any
  IDZ_MW_FR_axis:any
  GT_BRG_STL_FR_axis:any
  GT_BRG_SOCO_FR_axis:any
  GT_BRG_STL_PRESS_axis:any
  GT_BRG_SOCO_PRESS_axis:any
  UIT_FC_FR_axis:any
  UIT_FC_PRESS_axis:any
// Pump Stations
  CG_CSP_axis: any
  CG_CDP_axis: any
  CG_S_LVL_axis: any
  CG_T1_LVL_axis: any
  CG_T1_IF_axis: any
  CG_T1_OF_axis: any
  CG_T2_LVL_axis: any
  CG_T2_IF_axis: any
  CG_T2_OF_axis: any


  STORMS_QUARRY_LEVEL_axis:any
  STORMS_GORGE_LEVEL_axis:any
  STORMS_HOLDING_RESERVOIR_LEVEL_axis:any
  STORMS_OVERHEAD_TANK_LEVEL_axis:any
  //Ground Water

  //Humansdorp1
KLM_HUP_WATER_LEVEL_Axis:any
KLM_HUP_FLOWRATE_Axis:any
KLM_HUP_TOTALFLOW_Axis:any
//Humansdorp2
KLM_HUP2_WATER_LEVEL_Axis:any
KLM_HUP2_FLOWRATE_Axis:any
KLM_HUP2_TOTALFLOW_Axis:any
//Humansdorp3
KLM_HUP3_WATER_LEVEL_Axis:any
KLM_HUP3_FLOWRATE_Axis:any
KLM_HUP3_TOTALFLOW_Axis:any
//Humansdorp4
KLM_HUP4_WATER_LEVEL_Axis:any
KLM_HUP4_FLOWRATE_Axis:any
KLM_HUP4_TOTALFLOW_Axis:any
//Humansdorp6
KLM_HUP6_WATER_LEVEL_Axis:any
KLM_HUP6_FLOWRATE_Axis:any
KLM_HUP6_TOTALFLOW_Axis:any
  //Newton Park Pool
  NMBM_NPP_GW_PRESSURE_axis:any
  NMBM_NPP_GW_FLOW_RATE_axis:any
  NMBM_NPP_GW_LEVEL_axis:any
  NMBM_NPP_GW_TOTAL_FLOW_axis:any

  NMU_EFF_FR_axis: any;
  NMU_EFF_DP_axis: any;
  NMU_EFF_DAM_LVL_axis: any
  NMU_EFF_P1_SPEED_axis: any
  NMU_EFF_P2_SPEED_axis: any
  NMU_EFF_P3_SPEED_axis: any
  NMU_EFF_JP_SPEED_axis: any

  CHE_PS_P1_ACTUAL_SPEED_Axis: any
  CHE_PS_P1_DEL_PRESS_Axis: any
  CHE_PS_P1_SUCT_PRESS_Axis: any
  CHE_PS_P2_ACTUAL_SPEED_Axis: any
  CHE_PS_P2_DEL_PRESS_Axis: any
  CHE_PS_P2_SUCT_PRESS_Axis: any
  CHE_PS_P3_ACTUAL_SPEED_Axis: any
  CHE_PS_P3_DEL_PRESS_Axis: any
  CHE_PS_P3_SUCT_PRESS_Axis: any
  CHE_PS_P4_ACTUAL_SPEED_Axis: any
  CHE_PS_P4_DEL_PRESS_Axis: any
  CHE_PS_P4_SUCT_PRESS_Axis: any
  CHE_PS_700_FLOW_RATE_Axis:any

  MW_BPS_SuctionPressure_axis: any
  MW_BPS_DeliveryPressure_axis:any
  MW_LVL_axis:any
  MW_BPS_FlowRate_axis: any
  //Stanford Road Road
  STAN_BPS_SuctionPressure_axis:any
  STAN_BPS_DeliveryPressure_axis:any
  STAN_BPS_FlowRate_axis:any
  STAN_BPS_P1_FREQ_axis:any
  STAN_BPS_P2_FREQ_axis:any
  STAN_BPS_P3_FREQ_axis:any
  STAN_BPS_P4_FREQ_axis:any

// WTW

  WTW_NGT_FM_LOW_FR_axis:any
  WTW_NGT_FM_HIGH_FR_axis:any

//
    filterValue: any="";
    ELEMENT_DATA: PeriodicElement[] = [];
    displayedColumns :string[]= ['name','min', 'max', 'average'];

    dataSource:any;


    animal: string;
    name: string ;
  gamtoosArr:string[]

  selectedTags:string[]


  onTrendFilter(){
    this.isLoading=true;


    this.GR_R_INLET_axis = 0;
    this.GR_R_OUTLET_axis = 0;
    this.ELA_FR_axis = 0
    this.ELA_P_axis = 0;

    this.HUM_GW_BOR_LVL_axis = 0;
    this.HUM_GW_RAW_WATER_TANK_LVL_axis = 0;
    this.HUM_GW_FIN_WAT_TANK_LVL_axis = 0;

    this.drift_res_level_axis=0;
    this.drift_res_flow_rate_1_axis=0;
    this.drift_res_flow_rate_2_axis=0;
    this.drift_res_total_flow_1_axis= 0;
    this.drift_res_total_flow_2_axis= 0;


   this.nmb_schoe_r_actuator_valve_feedback_signal_error_axis = 0
   this.nmb_schoe_r_actuator_valve_command_signal_error_axis = 0
   this.nmb_schoe_r_reservoir_level_signal_error_axis = 0
   this.nmb_schoe_r_actuator_valve_fault_axis = 0
   this.nmb_schoe_r_actuator_valve_torque_fail_close_axis = 0
   this.nmb_schoe_r_actuator_valve_torque_fail_open_axis = 0
   this.nmb_schoe_r_general_fault_axis = 0
   this.nmb_schoe_r_actuator_general_fault_axis = 0
   this.nmb_schoe_r_actuator_valve_timeout_axis = 0



   this.BUSH_CHURCH_SOCO_FR_axis = 0
   this.BUSH_CHURCH_STEEL_FR_axis = 0
   this.BUSH_CHURCH_SOCCO_BAR_axis = 0
   this.BUSH_CHURCH_STEEL_BAR_axis = 0
   this.BUSH_PUMP_FR_axis = 0
   this.BUSH_GW_COMB_FLOW_RATE_axis = 0
   this.BUSH_TANK_LVL_axis = 0

   this.HUM_OFF_TAKE_TF_axis = 0
   this.HUM_OFF_TAKE_BAR_axis = 0
   this.HUM_OFF_TAKE_BAT_axis=0;
   this.JEFF_OFF_TAKE_TF_axis = 0
   this.JEFF_OFF_TAKE_BAT_axis=0
   this.KOU_MAIN_LINE_BAR_axis = 0
   this.KOU_MAIN_LINE_BAT_axis = 0
   this.ONS_PARA_TF_axis = 0
   this.ONS_PARA_BAT_axis = 0
   this.ST_FRAN_OFF_TF_axis = 0
   this.PARA_BEA_TF_axis = 0
  this.ST_FRAN_PARA_BEA_BAT_axis=0

  this.GBW_ACT_BAR_axis = 0
  this.GBW_FLO_RAT_axis = 0;

    this.EMER_H_LEVEL_axis= 0;
    this.EMER_H_FLOW_RATE_axis = 0;
    this.EMER_H_TOTAL_FLOW_axis = 0;
    this.CGK_PRESSURE_axis = 0
    this.OLI_LVL_axis = 0;
    this.KROON_RES_R_LVL_axis=0;
    this.UMI_RES_R_LVL_axis = 0;
    this.WOLWAS_RES_R_LVL_axis = 0;
    this.BERGEN_RES_R_LVL_axis = 0;
    this.TINROOF_LVL_RES_LVL_axis = 0;
    this.DAMCAMP_LVL_RES_LVL_axis = 0;
    this.HOLDING_LVL_RES_LVL_axis = 0;


    this.KARK_K1_TF_axis = 0;
    this.KARK_K1_FR_axis = 0;
    this.KARK_K1_CUR_axis = 0;
    this.KARK_K1_LVL_axis = 0;
    this.KARK_K2_TF_axis = 0;
    this.KARK_K2_FR_axis = 0;
    this.KARK_K2_CUR_axis = 0;
    this.KARK_K2_LVL_axis = 0;


    this.CGK_MOTHERWELL_TOTAL_FLOW_axis = 0
    this.CGK_COEGA_FLOW_RATE_axis=0
    this.CGK_GRASSRIDGE_TOTAL_FLOW_axis = 0
    this.CGK_COEGA_TOTAL_FLOW_axis = 0
    this.CGK_LEVEL_axis = 0
    this.CGK_MOTHERWELL_FLOW_RATE_axis = 0
    this.CGK_GRASSRIDGE_FLOW_RATE_axis = 0
    this.GB_axis = 0
    this.GBFR_axis = 0
    this.NMB_SCHOE_PRESSURE_axis = 0
    this.NMB_SCHOE_RES_LEVEL_axis = 0
    this.NMB_SCHOE_ACTUATOR_POSITION_axis= 0
    this.NMB_SCHOE_ACTUATOR_SET_POINT_axis = 0
    this.CHE_East_axis=0
    this.CHE_West_axis=0
    this.GR_EC_axis = 0
    this.CHE_fr_axis=0
    this.GR_WC_axis = 0
    this.VS_axis = 0
    this.CHT_NC_axis = 0
    this.CHT_OR_axis = 0
    this.CHT_SC_axis = 0
    this.VRH_DL_axis = 0
    this.VRH_SL_axis = 0
    this.HB_axis = 0
    this.LH_axis = 0
    this.BHB_axis = 0
    this.TC_axis = 0
    this.RD_LVL_axis=0
    this.SM_FR_axis=0
    this.SM_LVL_axis=0
// FPT Sites
    this.BETH_PRESS_axis=0
    this.BETH_FLOW_RATE_axis=0
    this.BETH_BATTERY_STATUS_axis=0
    this.BETH_TOTAL_FLOW_axis=0
    this.FMT_FR_axis = 0
    this.FMT_TF_axis=0
    this.FMT_PRESS_axis = 0
    this.IDZ_FR_axis=0
    this.IDZ_MW_FR_axis=0
    this.GT_BRG_STL_FR_axis=0
    this.GT_BRG_SOCO_FR_axis=0
    this.GT_BRG_STL_PRESS_axis=0
    this.GT_BRG_SOCO_PRESS_axis=0
    this.UIT_FC_FR_axis=0
    this.UIT_FC_PRESS_axis=0
//Pump Stations
    this.CG_CSP_axis=0
    this.CG_CDP_axis=0
    this.CG_S_LVL_axis=0
    this.CG_T1_LVL_axis=0
    this.CG_T1_IF_axis=0
    this.CG_T1_OF_axis=0
    this.CG_T2_LVL_axis=0
    this.CG_T2_IF_axis=0
    this.CG_T2_OF_axis=0
    this.NMU_EFF_FR_axis=0
    this.NMU_EFF_DP_axis=0
    this.NMU_EFF_DAM_LVL_axis=0
    this.NMU_EFF_P1_SPEED_axis=0
    this.NMU_EFF_P2_SPEED_axis=0
    this.NMU_EFF_P3_SPEED_axis=0
    this.NMU_EFF_JP_SPEED_axis=0

    this.CHE_PS_P1_ACTUAL_SPEED_Axis = 0
   this.CHE_PS_P1_DEL_PRESS_Axis = 0
    this.CHE_PS_P1_SUCT_PRESS_Axis = 0
    this.CHE_PS_P2_ACTUAL_SPEED_Axis=0
    this.CHE_PS_P2_DEL_PRESS_Axis=0
    this.CHE_PS_P2_SUCT_PRESS_Axis=0
    this.CHE_PS_P3_ACTUAL_SPEED_Axis=0
    this.CHE_PS_P3_DEL_PRESS_Axis=0
    this.CHE_PS_P3_SUCT_PRESS_Axis=0
    this.CHE_PS_P4_ACTUAL_SPEED_Axis=0
    this.CHE_PS_P4_DEL_PRESS_Axis=0
    this.CHE_PS_P4_SUCT_PRESS_Axis=0
    this.CHE_PS_700_FLOW_RATE_Axis=0
    //Storms River
    this.STORMS_QUARRY_LEVEL_axis=0
    this.STORMS_GORGE_LEVEL_axis=0
    this.STORMS_HOLDING_RESERVOIR_LEVEL_axis= 0;
    this.STORMS_OVERHEAD_TANK_LEVEL_axis = 0;
    //Ground Water
    this.NMBM_NPP_GW_PRESSURE_axis = 0;
    this.NMBM_NPP_GW_FLOW_RATE_axis = 0;
    this.NMBM_NPP_GW_LEVEL_axis = 0;
    this.NMBM_NPP_GW_TOTAL_FLOW_axis=0;
    this.KLM_HUP_WATER_LEVEL_Axis=0;
    this.KLM_HUP_FLOWRATE_Axis=0;
    this.KLM_HUP_TOTALFLOW_Axis=0;
    this.KLM_HUP2_WATER_LEVEL_Axis=0;
    this.KLM_HUP2_FLOWRATE_Axis=0;
    this.KLM_HUP2_TOTALFLOW_Axis=0;
    this.KLM_HUP3_WATER_LEVEL_Axis=0;
    this.KLM_HUP3_FLOWRATE_Axis=0;
    this.KLM_HUP3_TOTALFLOW_Axis=0;
    this.KLM_HUP4_WATER_LEVEL_Axis=0;
    this.KLM_HUP4_FLOWRATE_Axis=0;
    this.KLM_HUP4_TOTALFLOW_Axis=0;
    this.KLM_HUP6_WATER_LEVEL_Axis=0;
    this.KLM_HUP6_FLOWRATE_Axis=0;
    this.KLM_HUP6_TOTALFLOW_Axis=0;


  //Stanford Road Road
    this.STAN_BPS_SuctionPressure_axis = 0;
    this.STAN_BPS_DeliveryPressure_axis = 0;
    this.STAN_BPS_FlowRate_axis = 0;
    this.STAN_BPS_P1_FREQ_axis = 0;
    this.STAN_BPS_P2_FREQ_axis = 0;
    this.STAN_BPS_P3_FREQ_axis = 0;
    this.STAN_BPS_P4_FREQ_axis = 0;

  //Motherwell Pump Station
    this.MW_BPS_FlowRate_axis=0
    this.MW_BPS_DeliveryPressure_axis=0
    this.MW_LVL_axis = 0;
    this.MW_BPS_SuctionPressure_axis = 0


//WTW
    this.WTW_NGT_FM_LOW_FR_axis=0
    this.WTW_NGT_FM_HIGH_FR_axis=0;




    if(this.Right.value!=null){

for (var i = 0; i < this.Right.value.length;i++)
{
  switch (this.Right.value[i]) {
    // Reservoirs

    case"Grassridge Inlet Flow":
    this.GR_R_INLET_axis =1
    break;

    case"Grassridge Outlet Flow":
    this.GR_R_OUTLET_axis=1
    break;

    case "Humerail Borehol Level":
    this.HUM_GW_BOR_LVL_axis = 1
    break;

    case "Humerail Raw Water Tank Level":
    this.HUM_GW_RAW_WATER_TANK_LVL_axis = 1
    break;

    case "Humerail Final Water Tank Level":
    this.HUM_GW_FIN_WAT_TANK_LVL_axis = 1
    break;

    case"Coega Kop Reservoir Level":
    this.CGK_LEVEL_axis =1
    break;

    case"Coega Kop Reservoir Pressure":
    this.CGK_PRESSURE_axis=1
    break;

    case"Gamtoos Break Water Pressure":
    this.GBW_ACT_BAR_axis=1
    break;

    case"Gamtoos Break Water Flow Rate":
    this.GBW_FLO_RAT_axis=1
    break;



    case"Olifantskop Reservoir Level":
    this.OLI_LVL_axis=1
    break;


    case"Bergendal Reservoir Level":
    this.BERGEN_RES_R_LVL_axis=1
    break;

    case"Wolwas Reservoir Level":
    this.WOLWAS_RES_R_LVL_axis=1
    break;

    case"Umasizakhe Reservoir Level":
    this.UMI_RES_R_LVL_axis=1
    break;

    case"Kroonvale Reservoir Level":
    this.KROON_RES_R_LVL_axis=1
    break;


    case"Holding Reservoir Level":
    this.HOLDING_LVL_RES_LVL_axis=1
    break;

    case"Damcamp Reservoir Level":
    this.DAMCAMP_LVL_RES_LVL_axis=1
    break;

    case"Tin Roof Reservoir Level":
    this.TINROOF_LVL_RES_LVL_axis=1
    break;




    case"Elandsjagt Flow Rate":
    this.ELA_FR_axis=1
    break;


    case "Driftsands Reservoir Level":
      this.drift_res_level_axis=1
      break;

      case "Driftsands Flow Rate 1":
        this.drift_res_flow_rate_1_axis=1
        break;

        case "Driftsands Flow Rate 2":
          this.drift_res_flow_rate_2_axis=1
          break;

          case "Driftsands Total Flow 1":
            this.drift_res_total_flow_1_axis=1
            break;

            case "Driftsands Total Flow 2":
              this.drift_res_total_flow_2_axis=1
              break;

              case "Schoemanshoek Actuator Valve Feedback Signal":
                this.nmb_schoe_r_actuator_valve_feedback_signal_error_axis=1
                break;


                case "Schoemanshoek Actuator Valve Command Signal":
                  this.nmb_schoe_r_actuator_valve_command_signal_error_axis=1
                  break;

                  case "Schoemanshoek Reservoir Level Signal Error":
                  this.nmb_schoe_r_reservoir_level_signal_error_axis=1
                  break;



                  case "Schoemanshoek Actuator Valve Fault":
                this.nmb_schoe_r_actuator_valve_fault_axis=1
                break;


                case "Schoemanshoek Actuator Valve Torque Fail Close":
                  this.nmb_schoe_r_actuator_valve_torque_fail_close_axis=1
                  break;

                  case "Schoemanshoek Actuator Valve Torque Fail Open":
                  this.nmb_schoe_r_actuator_valve_torque_fail_open_axis=1
                  break;



                  case "Schoemanshoek General Fault":
                    this.nmb_schoe_r_general_fault_axis=1
                    break;


                    case "Schoemanshoek Actuator General Fault":
                      this.nmb_schoe_r_actuator_general_fault_axis=1
                      break;

                      case "Schoemanshoek Actuator Valve Timeout":
                      this.nmb_schoe_r_actuator_valve_timeout_axis=1
                      break;




    case "Emerald Hill Reservoir Level":
      this.EMER_H_LEVEL_axis=1
      break;

  case "Emerald Hill Flow Rate":
    this.EMER_H_FLOW_RATE_axis=1
    break;

    case "Emerald Hill Total Flow":
      this.EMER_H_TOTAL_FLOW_axis=1
      break;






    case "Bushy Park Soccoman Flow Rate":
     this.BUSH_CHURCH_SOCO_FR_axis = 1
     break;

    case "Bushy Park Steel Flow Rate":
      this.BUSH_CHURCH_STEEL_FR_axis = 1
      break;

    case "Bushy Park Soccoman Pressure":
      this.BUSH_CHURCH_SOCCO_BAR_axis = 1
      break;

    case "Bushy Park Steel Pressure":
      this.BUSH_CHURCH_STEEL_BAR_axis = 1
      break;

    case "Bushy Park Pumpstation Flow Rate":
      this.BUSH_PUMP_FR_axis = 1
      break;

    case "Bushy Park Combined Borehole Flow Rate":
      this.BUSH_GW_COMB_FLOW_RATE_axis = 1
      break;

    case "Bushy Park Holding Tank Level":
      this.BUSH_TANK_LVL_axis = 1
      break;

    case"Elandsjagt Pressure":
    this.ELA_P_axis=1
    break;

    case"Coega Kop to Coega IDZ Flow Rate":
    this.CGK_COEGA_FLOW_RATE_axis = 1
    break;

    case"Coega Kop to Motherwell Flow Rate":
    this.CGK_MOTHERWELL_TOTAL_FLOW_axis=1
    break;
    case"Coega Kop from Grassridge Total Flow":
    this.CGK_GRASSRIDGE_TOTAL_FLOW_axis=1
    break;
    case"Coega Kop to Coega IDZ Total Flow":
    this.CGK_COEGA_TOTAL_FLOW_axis=1
    break;
    case"Coega Kop to Motherwell Total Flow":
    this.CGK_MOTHERWELL_FLOW_RATE_axis = 1
    break;

    case"Coega Kop from Grassridge Flow Rate":
    this.CGK_GRASSRIDGE_FLOW_RATE_axis =1
    break;

    case "Greenbushes Reservoir Level":
    this.GB_axis = 1
      break;


      case "Greenbushes Flow Rate":
        this.GBFR_axis = 1
          break;

     case "Schoemanshoek Pressure":
       this.NMB_SCHOE_PRESSURE_axis = 1
         break;

      case "Schoemanshoek Level":
        this.NMB_SCHOE_RES_LEVEL_axis = 1
          break;


          case "Schoemanshoek Actuator Position":
            this.NMB_SCHOE_ACTUATOR_POSITION_axis = 1
              break;

           case "Schoemanshoek Actuator Set Point":
             this.NMB_SCHOE_ACTUATOR_SET_POINT_axis = 1
               break;




      case "Chelsea Reservoir East Chamber Level":
      this.CHE_East_axis = 1
        break;

      case "Chelsea Reservoir West Chamber Level":
        this.CHE_West_axis = 1
          break;
          case "Chatty Flow Rate":
        this.CHE_fr_axis = 1
          break;
        case "Grassridge East Chamber Level":
        this.GR_EC_axis = 1
          break;

          case "Grassridge West Chamber Level":
          this.GR_WC_axis = 1
            break;

            case "Van Stadens Reservoir Level":
            this.VS_axis = 1
              break;

            case "Chatty North Chamber Level":
            this.CHT_NC_axis = 1
              break;

              case "Chatty Overhead Level":
              this.CHT_OR_axis = 1
                break;

                case "Chatty South Chamber Level":
                this.CHT_SC_axis = 1
                  break;

                  case "Van Riebeeck Hoogte Delivery Level":
                  this.VRH_DL_axis = 1
                    break;

                    case "Van Riebeeck Hoogte Suction Level":
                    this.VRH_SL_axis = 1
                      break;

                      case "Lovemore Heights Reservoir Level":
                      this.LH_axis = 1
                        break;

                        case "Blue Horizon Bay Reservoir Level":
                        this.BHB_axis = 1
                          break;

                          case "Theescombe Reservoir Level":
                          this.TC_axis = 1
                            break;

                            case "Rosedale Reservoir Level":
                            this.RD_LVL_axis = 1
                            break;

                            case "Summit Reservoir Level":
                              this.SM_LVL_axis = 1
                              break;

                            case "Summit Flow Rate":
                              this.SM_FR_axis = 1
                              break;

                            case "Heatherbank Reservoir Level":
                              this.HB_axis = 1
                              break;
                            //FPT Sites
                            case "Bethelsdorp Battery Level":
                             this.BETH_BATTERY_STATUS_axis =1
                            break;

                            case "Bethelsdorp Total Flow":
                              this.BETH_TOTAL_FLOW_axis =1
                              break;

                            case"Bethelsdorp Pressure":
                            this.BETH_PRESS_axis = 1
                            break;

                            case"Bethelsdorp Flow Rate":
                            this.BETH_FLOW_RATE_axis = 1
                            break;

                            case "FM Tower Flow Rate":
                              this.FMT_FR_axis = 1
                                break;

                                case "FM Tower Total Flow":
                                  this.FMT_TF_axis = 1
                                  break;

                                case "FM Tower Pressure":
                                this.FMT_PRESS_axis = 1
                                break;

                                case "Coega IDZ Flow Rate":
                                  this.IDZ_FR_axis = 1
                                    break;

                                    case "Coega Motherwell Flow Rate":
                                    this.IDZ_MW_FR_axis = 1
                                    break;

                                    case "Gamtoos Bridge Steel Pipe Flow Rate":
                                      this.GT_BRG_STL_FR_axis = 1
                                        break;

  case "Gamtoos Bridge Socoman Pipe Flow Rate":
  this.GT_BRG_SOCO_FR_axis = 1
  break;

  case "Gamtoos Bridge Steel Pipe Pressure":
    this.GT_BRG_STL_PRESS_axis = 1
      break;

      case "Gamtoos Bridge Socoman Pipe Pressure":
      this.GT_BRG_SOCO_PRESS_axis = 1
      break;

  case "Uitenhage Flow Chamber Flow Rate":
    this.UIT_FC_FR_axis= 1
      break;

      case "Uitenhage Flow Chamber Pressure":
      this.UIT_FC_PRESS_axis = 1
      break;

      case "Humansdorp Off Take Total Flow":
        this.HUM_OFF_TAKE_TF_axis=1
        break

        case "Humansdorp Off Take Pressure":
          this.HUM_OFF_TAKE_BAR_axis =1
          break

          case "Humansdorp Off Take Battery Level":
            this.HUM_OFF_TAKE_BAT_axis =1
            break
            case "Jeffreys Bay Off Take Total Flow":
              this.JEFF_OFF_TAKE_TF_axis =1
              break

              case "Jeffreys Bay Off Take Battery Level":
                this.JEFF_OFF_TAKE_BAT_axis =1
                 break

        case "Kouga Main Line Battery Level":
          this.KOU_MAIN_LINE_BAT_axis =1;
          break

        case "Kouga Main Line Pressure":
          this.KOU_MAIN_LINE_BAR_axis =1
          break;


          case "Ons Paradys Total Flow":
            this.ONS_PARA_TF_axis =1;
            break

          case "Ons Paradys Battery Level":
            this.ONS_PARA_BAT_axis =1
            break;



          case "St Francis Offtake Total Flow":
            this.ST_FRAN_OFF_TF_axis=1
            break;


        case "Paradise Beach Total Flow":
           this.PARA_BEA_TF_axis=1
            break;


       case "Paradise/St Francis Battery Level":
         this.ST_FRAN_PARA_BEA_BAT_axis=1
         break;


                              //Storms River
                                case "Storms River Quarry Level":
                                  this.STORMS_QUARRY_LEVEL_axis = 1
                                  break;


                             case "Storms River Gorge Level":
                               this.STORMS_GORGE_LEVEL_axis = 1
                               break;

                          case "Storms River Holding Reservoir Level":
                           this.STORMS_HOLDING_RESERVOIR_LEVEL_axis = 1
                           break;


                           case "Storms River Overhead Tank Level":
                             this.STORMS_OVERHEAD_TANK_LEVEL_axis = 1
                             break;

    //Pump Stations
                                case "Crown Gardens Suction Pressure":
                                  this.CG_CSP_axis = 1
                                  break;

                                  case "Crown Gardens Delivery Pressure":
                                  this.CG_CDP_axis = 1
                                  break;

                                  case "Crown Gardens Sump Level":
                                    this.CG_S_LVL_axis = 1
                                    break;

                                    case "Crown Gardens Tower 1 Level":
                                    this.CG_T1_LVL_axis = 1
                                    break;

                                    case "Crown Gardens Tower 1 Inlet Flow":
                                    this.CG_T1_IF_axis = 1
                                    break;

                                    case "Crown Gardens Tower 1 Outlet Flow":
                                      this.CG_T1_OF_axis = 1
                                      break;

                                      case "Crown Gardens Tower 2 Level":
                                      this.CG_T2_LVL_axis = 1
                                      break;

                                      case "Crown Gardens Tower 2 Inlet Flow":
                                      this.CG_T2_IF_axis = 1
                                      break;

                                      case "Crown Gardens Tower 2 Outlet Flow":
                                      this.CG_T2_OF_axis = 1
                                      break;

                                      case "NMU Effluent Flow Rate":
                                        this.NMU_EFF_FR_axis = 1
                                        break;

                                        case "NMU Effluent Delivery Pressure":
                                        this.NMU_EFF_DP_axis = 1
                                        break;

                                        case "NMU Effluent Dam Level":
                                          this.NMU_EFF_DAM_LVL_axis = 1
                                          break;

                                          case "NMU Effluent Pump 1 Speed":
                                          this.NMU_EFF_P1_SPEED_axis = 1
                                          break;

                                          case "NMU Effluent Pump 2 Speed":
                                            this.NMU_EFF_P2_SPEED_axis = 1
                                            break;

                                            case "NMU Effluent Pump 3 Speed":
                                              this.NMU_EFF_P3_SPEED_axis = 1
                                              break;

                                              case "NMU Effluent Jockey Pump Speed":
                                              this.NMU_EFF_JP_SPEED_axis = 1
                                              break;



                                              case "Chelsea Pumpstation 1 Actual Speed":
                                                this.CHE_PS_P1_ACTUAL_SPEED_Axis = 1
                                                break;


                case "Chelsea Pumpstation 1 Delivery Pressure":
                this.CHE_PS_P1_DEL_PRESS_Axis = 1
                break;

               case "Chelsea Pumpstation 1 Suction Pressure":
                this.CHE_PS_P1_SUCT_PRESS_Axis = 1
                break;


              case "Chelsea Pumpstation 2 Actual Speed":
                this.CHE_PS_P2_ACTUAL_SPEED_Axis = 1
                break;


           case "Chelsea Pumpstation 2 Delivery Pressure":
              this.CHE_PS_P2_DEL_PRESS_Axis = 1
              break;

              case "Chelsea Pumpstation 2 Suction Pressure":
               this.CHE_PS_P2_SUCT_PRESS_Axis = 1
               break;

               case "Chelsea Pumpstation 3 Actual Speed":
                 this.CHE_PS_P3_ACTUAL_SPEED_Axis = 1
                 break;


       case "Chelsea Pumpstation 3 Delivery Pressure":
          this.CHE_PS_P3_DEL_PRESS_Axis = 1
          break;

          case "Chelsea Pumpstation 3 Suction Pressure":
           this.CHE_PS_P3_SUCT_PRESS_Axis = 1
           break;


           case "Chelsea Pumpstation 4 Actual Speed":
             this.CHE_PS_P4_ACTUAL_SPEED_Axis = 1
             break;


         case "Chelsea Pumpstation 4 Delivery Pressure":
            this.CHE_PS_P4_DEL_PRESS_Axis = 1
            break;

            case "Chelsea Pumpstation 4 Suction Pressure":
             this.CHE_PS_P4_SUCT_PRESS_Axis = 1
             break;

      case "Chelsea Pumpstation 700 Flow Rate":
        this.CHE_PS_700_FLOW_RATE_Axis = 1
        break;

          case "Motherwell Flow Rate":
            this.MW_BPS_FlowRate_axis = 1
            break;

          case "Motherwell Reservoir Level":
            this.MW_LVL_axis = 1
            break;

          case "Motherwell Delivery Pressure":
            this.MW_BPS_DeliveryPressure_axis = 1
            break;

          case "Motherwell Suction Pressure":
            this.MW_BPS_SuctionPressure_axis = 1
            break;
                                //Ground Water
                                case "Newton Park Pool Pressure":
                                  this.NMBM_NPP_GW_PRESSURE_axis=1
                                  break;

                                case "Newton Park Pool Flow Rate":
                                  this.NMBM_NPP_GW_FLOW_RATE_axis=1
                                  break;

                                case "Newton Park Pool Water Level":
                                  this.NMBM_NPP_GW_LEVEL_axis=1
                                  break;

                                case "Newton Park Pool Total Flow":
                                  this.NMBM_NPP_GW_TOTAL_FLOW_axis=1
                                  break;


                                case "Humansdorp 1 Water Level":
                                  this.KLM_HUP_WATER_LEVEL_Axis=1
                                  break;
                                case "Humansdorp 1 Flow Rate":
                                  this.KLM_HUP_FLOWRATE_Axis=1
                                  break;
                                case "Humansdorp 1 Total Flow":
                                  this.KLM_HUP_TOTALFLOW_Axis=1
                                  break;
                                  case "Humansdorp 2C Water Level":
                                    this.KLM_HUP2_WATER_LEVEL_Axis=1
                                    break;
                                  case "Humansdorp 2C Flow Rate":
                                    this.KLM_HUP2_FLOWRATE_Axis=1
                                    break;
                                  case "Humansdorp 2C Total Flow":
                                    this.KLM_HUP2_TOTALFLOW_Axis=1
                                    break;
                                    case "Humansdorp 3 Water Level":
                                  this.KLM_HUP3_WATER_LEVEL_Axis=1
                                  break;
                                case "Humansdorp 3 Flow Rate":
                                  this.KLM_HUP3_FLOWRATE_Axis=1
                                  break;
                                case "Humansdorp 3 Total Flow":
                                  this.KLM_HUP3_TOTALFLOW_Axis=1
                                  break;
                                  case "Humansdorp 4 Water Level ":
                                    this.KLM_HUP4_WATER_LEVEL_Axis=1
                                    break;
                                  case "Humansdorp 4 Flow Rate":
                                    this.KLM_HUP4_FLOWRATE_Axis=1
                                    break;
                                  case "Humansdorp 4 Total Flow":
                                    this.KLM_HUP4_TOTALFLOW_Axis=1
                                    break;

                                    case "Humansdorp 6 Water Level":
                                      this.KLM_HUP6_WATER_LEVEL_Axis=1
                                      break;
                                    case "Humansdorp 6 Flow Rate":
                                      this.KLM_HUP6_FLOWRATE_Axis=1
                                      break;
                                    case "Humansdorp 6 Total Flow":
                                      this.KLM_HUP6_TOTALFLOW_Axis=1
                                      break;




                                    //Stanford Road Road
                                    case "Stanford Road Suction Pressure":
                                      this.STAN_BPS_SuctionPressure_axis = 1
                                      break;

                                    case "Stanford Road Delivery Pressure":
                                      this.STAN_BPS_DeliveryPressure_axis = 1
                                      break;

                                    case "Stanford Road Flow Rate":
                                      this.STAN_BPS_FlowRate_axis = 1
                                      break;

                                    case "Stanford Road Pump 1 Frequency":
                                      this.STAN_BPS_P1_FREQ_axis = 1
                                      break;

                                    case "Stanford Road Pump 2 Frequency":
                                      this.STAN_BPS_P2_FREQ_axis = 1
                                      break;

                                    case "Stanford Road Pump 3 Frequency":
                                      this.STAN_BPS_P3_FREQ_axis = 1
                                      break;

                                    case "Stanford Road Pump 4 Frequency":
                                      this.STAN_BPS_P4_FREQ_axis = 1
                                      break;

                                              //Water Treatment Works
                                              case "Nooitgedacht High Level Flow Rate":
                                                this.WTW_NGT_FM_HIGH_FR_axis = 1
                                                break;

                                                case "Nooitgedacht Low Level Flow Rate":
                                                this.WTW_NGT_FM_LOW_FR_axis = 1
                                                break;

                                                case "Kareedouw K1 Total Flow":
                                                  this.KARK_K1_TF_axis = 1
                                                  break;

                                                  case  "Kareedouw K1 Flow Rate":
                                                    this.KARK_K1_FR_axis = 1
                                                    break;

                                                    case "Kareedouw K1 Current":
                                                      this.KARK_K1_CUR_axis = 1
                                                      break;

                                                      case"Kareedouw K1 Level":
                                                        this.KARK_K1_LVL_axis = 1
                                                        break;



                                                        case "Kareedouw K2 Total Flow":
                                                          this.KARK_K2_TF_axis = 1
                                                          break;

                                                          case  "Kareedouw K2 Flow Rate":
                                                            this.KARK_K2_FR_axis = 1
                                                            break;

                                                            case "Kareedouw K2 Current":
                                                              this.KARK_K2_CUR_axis = 1
                                                              break;

                                                              case"Kareedouw K2 Level":
                                                                this.KARK_K2_LVL_axis = 1
                                                                break;
}
}
}


//////////////////////////////////////////// Date Configuration
var start = this.range.value.start;
var end = this.range.value.end;

if (start!=null && end!=null){
  this.newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
  this.newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);
}
////////////////////////////////////////////
    var trend :any;
    if (this.Sites.value==null || this.Sites.value==undefined){}
    else{
    // this.rs.GetTrend_Sites(this.Sites.value,this.newStart,this.newEnd).subscribe(data => {
      console.log(this.Sites.value)
      console.log(this.selectedTags)
      this.rs.GetTrend_Sites(this.Sites.value,this.newStart,this.newEnd).then((data) => {


     trend= data


    this.variable = TrendPicker.getRouteDataForTrendPicker(data,this.variable,trendArray)







       var theme:any
       var tooltipBackground:any
       var countD =0 ;
       var countL =0 ;

       this.TrendInfoTable(this.Sites.value)

      if (localStorage.getItem("theme") == "dark-theme")
       {
         theme = '#FFFFFF'
         tooltipBackground = 'rgba(50,50,50,0.7)'
         countD++
         countL=0
  if (countD==1) {}
       }else if (localStorage.getItem("theme") == "light-theme")
       {
       theme = '#797979'
       tooltipBackground = 'rgba(255, 255, 255, 1)'
       countL++
       countD=0
       if (countL==1) {}
    }

    this.options = {
      grid: {
        left: '6%',
        right: '7%',
        top:'10%',
        bottom: '10%',
        containLabel: true
    },
    toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},

    dataZoom:[{

    type: 'slider',
    start: 0,
    end: 100,
    paddingTop:'10px',
    handleSize: 8

    },
    { start: 0,
     end:100}
    ],
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
      axisPointer: {
        type: 'cross'
      },
       trigger: 'axis',

       position: ['10%', '10%']

     },
      legend:{
        //bottom: 'bottom',
        data: this.Sites.value,
          top:'auto',
    type:'scroll',
    textStyle: {color:theme },
             },
             axisPointer:{
                  color: {color: theme}
             },

      xAxis: {
        type: 'time'  ,
        axisLabel: {color: theme},
        splitLine: {
          show: true
        },
      },
      yAxis: [
        {
          axisLabel: {color: theme},
        type: 'value',
        boundaryGap: [0, 0.05],
        },
        {
          axisLabel: {color: theme},
        type: 'value',
        boundaryGap: [0, 0.05],
        }

    ],

    //reservoir
      series: [{
        name: 'Greenbushes Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.GBFRarray,
        smooth: true,
        yAxisIndex:this.GBFR_axis,
      },{


        name: 'Greenbushes Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.GBarray,
        smooth: true,
        yAxisIndex:this.GB_axis,
      },
      {
        name: 'Coega Kop Reservoir Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CGK_PRESSURE_array,
        smooth: true,
        yAxisIndex:this.CGK_PRESSURE_axis,

      },

      {
        name: 'Gamtoos Break Water Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.GBW_ACT_BAR_arr,
        smooth: true,
        yAxisIndex:this.GBW_ACT_BAR_axis,

      },

      {
        name: 'Gamtoos Break Water Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.GBW_FLO_RAT_arr,
        smooth: true,
        yAxisIndex:this.GBW_FLO_RAT_axis,

      },


      {
        name: 'Olifantskop Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.OLI_LVL_array,
        smooth: true,
        yAxisIndex:this.OLI_LVL_axis,

      },

      {
        name: 'Bergendal Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.BERGEN_RES_R_LVL_arr,
        smooth: true,
        yAxisIndex:this.BERGEN_RES_R_LVL_axis,


      },

      {
        name: 'Wolwas Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.WOLWAS_RES_R_LVL_arr,
        smooth: true,
        yAxisIndex:this.WOLWAS_RES_R_LVL_axis,

      },

      {
        name: 'Umasizakhe Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.UMI_RES_R_LVL_arr,
        smooth: true,
        yAxisIndex:this.UMI_RES_R_LVL_axis,

      },

      {
        name: 'Kroonvale Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.KROON_RES_R_LVL_arr,
        smooth: true,
        yAxisIndex:this.KROON_RES_R_LVL_axis,

      },

      {
        name: 'Tin Roof Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.TINROOF_LVL_RES_LVL_arr,
        smooth: true,
        yAxisIndex:this.TINROOF_LVL_RES_LVL_axis,

      },

      {
        name: 'Damcamp Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.DAMCAMP_LVL_RES_LVL_arr,
        smooth: true,
        yAxisIndex:this.DAMCAMP_LVL_RES_LVL_axis,

      },

      {
        name: 'Holding Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.HOLDING_LVL_RES_LVL_arr,
        smooth: true,
        yAxisIndex:this.HOLDING_LVL_RES_LVL_axis,

      },

      {
        name: 'Schoemanshoek Pressure',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.NMB_SCHOE_PRESSURE_array,
        smooth: true,
        yAxisIndex:this.NMB_SCHOE_PRESSURE_axis,
         },
         {
          name: 'Schoemanshoek Level',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.NMB_SCHOE_RES_LEVEL_array,
          smooth: true,
          yAxisIndex:this.NMB_SCHOE_RES_LEVEL_axis,
           },

           {
            name: 'Schoemanshoek Actuator Position',
            type:'line',
            showSymbol: false,
            hoverAnimation: true,
            data:this.variable.NMB_SCHOE_ACTUATOR_POSITION_array,
            smooth: true,
            yAxisIndex:this.NMB_SCHOE_ACTUATOR_POSITION_axis,
             },
             {
              name: 'Schoemanshoek Actuator Set Point',
              type:'line',
              showSymbol: false,
              hoverAnimation: true,
              data:this.variable.NMB_SCHOE_ACTUATOR_SET_POINT_array,
              smooth: true,
              yAxisIndex:this.NMB_SCHOE_ACTUATOR_SET_POINT_axis,
               },

               {
                name: 'Schoemanshoek Actuator Valve Feedback Signal',
                type:'line',
                showSymbol: false,
                hoverAnimation: true,
                data:this.variable.nmb_schoe_r_actuator_valve_feedback_signal_error_arr,
                smooth: true,
                yAxisIndex:this.nmb_schoe_r_actuator_valve_feedback_signal_error_axis,
                 },
                 {
                  name: 'Schoemanshoek Actuator Valve Command Signal',
                  type:'line',
                  showSymbol: false,
                  hoverAnimation: true,
                  data:this.variable.nmb_schoe_r_actuator_valve_command_signal_error_arr,
                  smooth: true,
                  yAxisIndex:this.nmb_schoe_r_actuator_valve_command_signal_error_axis,
                   },
                   {
                    name: 'Schoemanshoek Reservoir Level Signal Error',
                    type:'line',
                    showSymbol: false,
                    hoverAnimation: true,
                    data:this.variable.nmb_schoe_r_reservoir_level_signal_error_arr,
                    smooth: true,
                    yAxisIndex:this.nmb_schoe_r_reservoir_level_signal_error_axis,
                     },
                     {
                      name: 'Schoemanshoek Actuator Valve Fault',
                      type:'line',
                      showSymbol: false,
                      hoverAnimation: true,
                      data:this.variable.nmb_schoe_r_actuator_valve_fault_arr,
                      smooth: true,
                      yAxisIndex:this.nmb_schoe_r_actuator_valve_fault_axis,
                       },
                       {
                        name: 'Schoemanshoek Actuator Valve Torque Fail Close',
                        type:'line',
                        showSymbol: false,
                        hoverAnimation: true,
                        data:this.variable.nmb_schoe_r_actuator_valve_torque_fail_close_arr,
                        smooth: true,
                        yAxisIndex:this.nmb_schoe_r_actuator_valve_torque_fail_close_axis,
                      },
                      {
                       name: 'Schoemanshoek Actuator Valve Torque Fail Open',
                       type:'line',
                       showSymbol: false,
                       hoverAnimation: true,
                       data:this.variable.nmb_schoe_r_actuator_valve_torque_fail_open_arr,
                       smooth: true,
                       yAxisIndex:this.nmb_schoe_r_actuator_valve_torque_fail_open_axis,
                        },
                        {
                         name: 'Schoemanshoek General Fault',
                         type:'line',
                         showSymbol: false,
                         hoverAnimation: true,
                         data:this.variable.nmb_schoe_r_general_fault_arr,
                         smooth: true,
                         yAxisIndex:this.nmb_schoe_r_general_fault_axis,
                          },
                    {
                     name: 'Schoemanshoek Actuator General Fault',
                     type:'line',
                     showSymbol: false,
                     hoverAnimation: true,
                     data:this.variable.nmb_schoe_r_actuator_general_fault_arr,
                     smooth: true,
                     yAxisIndex:this.nmb_schoe_r_actuator_general_fault_axis,
                      },
                      {
                       name: 'Schoemanshoek Actuator Valve Timeout',
                       type:'line',
                       showSymbol: false,
                       hoverAnimation: true,
                       data:this.variable.nmb_schoe_r_actuator_valve_timeout_arr,
                       smooth: true,
                       yAxisIndex:this.nmb_schoe_r_actuator_general_fault_axis,
                        },

      {
        name: 'Elandsjagt Flow Rate',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.ELA_FR_arr,
        smooth: true,
        yAxisIndex:this.ELA_FR_axis,
         },
         {
          name: 'Elandsjagt Pressure',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.ELA_P_arr,
          smooth: true,
          yAxisIndex:this.ELA_P_axis,
           },
           {
            name: 'Driftsands Reservoir Level',
            type:'line',
            showSymbol: false,
            hoverAnimation: true,
            data:this.variable.drift_R_reservoir_level_arr,
            smooth: true,
            yAxisIndex:this.drift_res_level_axis,
             },
         {
          name: 'Driftsands Flow Rate 1',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.drift_R_flow_rate_1_arr,
          smooth: true,
          yAxisIndex:this.drift_res_flow_rate_1_axis,
           },
           {
            name: 'Driftsands Flow Rate 2',
            type:'line',
            showSymbol: false,
            hoverAnimation: true,
            data:this.variable.drift_R_flow_rate_2_arr,
            smooth: true,
            yAxisIndex:this.drift_res_flow_rate_2_axis,
             },
             {
              name: 'Driftsands Total Flow 1',
              type:'line',
              showSymbol: false,
              hoverAnimation: true,
              data:this.variable.drift_R_total_flow_1_arr,
              smooth: true,
              yAxisIndex:this.drift_res_total_flow_1_axis,
               },
               {
                name: 'Driftsands Total Flow 2',
                type:'line',
                showSymbol: false,
                hoverAnimation: true,
                data:this.variable.drift_R_total_flow_2_arr,
                smooth: true,
                yAxisIndex:this.drift_res_total_flow_2_axis,
                 },


           {
            name: 'Emerald Hill Reservoir Level',
            type:'line',
            showSymbol: false,
            hoverAnimation: true,
            data:this.variable.EMER_H_Level_arr,
            smooth: true,
            yAxisIndex:this.EMER_H_LEVEL_axis,
             },
             {
              name: 'Emerald Hill Flow Rate',
              type:'line',
              showSymbol: false,
              hoverAnimation: true,
              data:this.variable.EMER_H_Flow_Rate_arr,
              smooth: true,
              yAxisIndex:this.EMER_H_FLOW_RATE_axis,
               },
               {
                name: 'Emerald Hill Total Flow',
                type:'line',
                showSymbol: false,
                hoverAnimation: true,
                data:this.variable.EMER_H_Total_Flow_arr,
                smooth: true,
                yAxisIndex:this.EMER_H_TOTAL_FLOW_axis,
                 },




               {
       name: 'Bushy Park Soccoman Flow Rate',
       type:'line',
       showSymbol: false,
       hoverAnimation: true,
       data:this.variable.BUSH_CHURCH_SOCO_FR_arr,
       smooth: true,
       yAxisIndex:this.BUSH_CHURCH_SOCO_FR_axis,
        },


    {
      name: 'Bushy Park Steel Flow Rate',
      type:'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.BUSH_CHURCH_STEEL_FR_arr,
      smooth: true,
      yAxisIndex:this.BUSH_CHURCH_STEEL_FR_axis,
       },

    {
     name: 'Bushy Park Soccoman Pressure',
     type:'line',
     showSymbol: false,
     hoverAnimation: true,
     data:this.variable.BUSH_CHURCH_SOCCO_BAR_arr,
     smooth: true,
     yAxisIndex:this.BUSH_CHURCH_SOCCO_BAR_axis,
      },

    {
     name: 'Bushy Park Steel Pressure',
     type:'line',
     showSymbol: false,
     hoverAnimation: true,
     data:this.variable.BUSH_CHURCH_STEEL_BAR_arr,
     smooth: true,
     yAxisIndex:this.BUSH_CHURCH_STEEL_BAR_axis,
      },

    {
     name: 'Bushy Park Pumpstation Flow Rate',
     type:'line',
     showSymbol: false,
     hoverAnimation: true,
     data:this.variable.BUSH_PUMP_FR_arr,
     smooth: true,
     yAxisIndex:this.BUSH_PUMP_FR_axis,
      },

    {
     name: 'Bushy Park Combined Borehole Flow Rate',
     type:'line',
     showSymbol: false,
     hoverAnimation: true,
     data:this.variable.BUSH_GW_COMB_FLOW_RATE_arr,
     smooth: true,
     yAxisIndex:this.BUSH_GW_COMB_FLOW_RATE_axis,
      },

      {
       name: 'Bushy Park Holding Tank Level',
       type:'line',
       showSymbol: false,
       hoverAnimation: true,
       data:this.variable.BUSH_TANK_LVL_arr,
       smooth: true,
       yAxisIndex:this.BUSH_TANK_LVL_axis,
        },





                    {
   name: 'Humansdorp Off Take Total Flow',
   type:'line',
   showSymbol: false,
   hoverAnimation: true,
   data:this.variable.HUM_OFF_TAKE_TF_arr,
   smooth: true,
   yAxisIndex:this.HUM_OFF_TAKE_TF_axis,
    },
     {
   name: 'Humansdorp Off Take Pressure',
   type:'line',
   showSymbol: false,
   hoverAnimation: true,
   data:this.variable.HUM_OFF_TAKE_BAR_arr,
   smooth: true,
   yAxisIndex:this.HUM_OFF_TAKE_BAR_axis,
    },
    {
      name: 'Humansdorp Off Take Battery Level',
      type:'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.HUM_OFF_TAKE_BAT_arr,
      smooth: true,
      yAxisIndex:this.HUM_OFF_TAKE_BAT_axis,
       },
    {
     name: 'Jeffreys Bay Off Take Total Flow',
     type:'line',
     showSymbol: false,
     hoverAnimation: true,
     data:this.variable.JEFF_OFF_TAKE_TF_arr,
     smooth: true,
     yAxisIndex:this.JEFF_OFF_TAKE_TF_axis,
      },
      {
        name: 'Jeffreys Bay Off Take Battery Level',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.JEFF_OFF_TAKE_BAT_arr,
        smooth: true,
        yAxisIndex:this.JEFF_OFF_TAKE_BAT_axis,
         },

      {
       name: 'Kouga Main Line Pressure',
       type:'line',
       showSymbol: false,
       hoverAnimation: true,
       data:this.variable.KOU_MAIN_LINE_BAR_arr,
       smooth: true,
       yAxisIndex:this.KOU_MAIN_LINE_BAR_axis,
        }, {
          name: 'Kouga Main Line Battery Level',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.KOU_MAIN_LINE_BAT_arr,
          smooth: true,
          yAxisIndex:this.KOU_MAIN_LINE_BAT_axis,
           },{
         name: 'Ons Paradys Total Flow',
         type:'line',
         showSymbol: false,
         hoverAnimation: true,
         data:this.variable.ONS_PARA_TF_arr,
         smooth: true,
         yAxisIndex:this.ONS_PARA_TF_axis,
        },{
          name: 'Ons Paradys Battery Level',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.ONS_PARA_BAT_arr,
          smooth: true,
          yAxisIndex:this.ONS_PARA_BAT_axis,
         },
        {
         name: 'St Francis Offtake Total Flow',
         type:'line',
         showSymbol: false,
         hoverAnimation: true,
         data:this.variable.ST_FRAN_OFF_TF_arr,
         smooth: true,
         yAxisIndex:this.ST_FRAN_OFF_TF_axis,
          }, {
           name: 'Paradise Beach Total Flow',
           type:'line',
           showSymbol: false,
           hoverAnimation: true,
           data:this.variable.PARA_BEA_TF_arr,
           smooth: true,
           yAxisIndex:this.PARA_BEA_TF_axis,
            },
        {
          name: 'Paradise/St Francis Battery Level',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.ST_FRAN_PARA_BEA_BAT_arr,
          smooth: true,
          yAxisIndex:this.ST_FRAN_PARA_BEA_BAT_axis,
           },
      {
        name: 'Coega Kop to Coega IDZ Total Flow',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CGK_COEGA_TOTAL_FLOW_array,
        smooth: true,
        yAxisIndex:this.CGK_COEGA_TOTAL_FLOW_axis,
         },
         {
          name: "Coega Kop to Coega IDZ Flow Rate",
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data: this.variable.CGK_COEGA_FLOW_RATE_array,
          smooth: true,
          yAxisIndex:this.CGK_COEGA_FLOW_RATE_axis
        },
        {
          name: 'Coega Kop to Motherwell Total Flow',
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.CGK_MOTHERWELL_TOTAL_FLOW_array,
          smooth: true,
          yAxisIndex:this.CGK_MOTHERWELL_TOTAL_FLOW_axis
         },
         {
          name: 'Coega Kop to Motherwell Flow Rate',
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.CGK_MOTHERWELL_FLOW_RATE_array,
          smooth: true,
          yAxisIndex:this.CGK_MOTHERWELL_FLOW_RATE_axis
         },
         {
          name: 'Coega Kop from Grassridge Total Flow',
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.CGK_GRASSRIDGE_TOTAL_FLOW_array,
          smooth: true,
          yAxisIndex:this.CGK_GRASSRIDGE_TOTAL_FLOW_axis

          },
         {
          name: 'Coega Kop from Grassridge Flow Rate',
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.CGK_GRASSRIDGE_FLOW_RATE_array,
          smooth: true,
          yAxisIndex:this.CGK_GRASSRIDGE_FLOW_RATE_axis

          },
         {
      name: 'Coega Kop Reservoir Level',
      type:'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.CGK_LEVEL_array,
      smooth: true,
      yAxisIndex:this.CGK_LEVEL_axis,
       }, {
        name: 'Chelsea Reservoir East Chamber Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_East_array,
        smooth: true,
        yAxisIndex:this.CHE_East_axis,
      },
      {
        name: 'Chelsea Reservoir West Chamber Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_West_array,
        smooth: true,
        yAxisIndex:this.CHE_West_axis,
      },{
        name: 'Chatty Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_FlowRate_array,
        smooth: true,
        yAxisIndex:this.CHE_fr_axis,
      },
      {
        name: 'Grassridge East Chamber Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.GR_EC_array,
        smooth: true,
        yAxisIndex:this.GR_EC_axis,
      },
      {
        name: 'Grassridge West Chamber Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.GR_WC_array,
        smooth: true,
        yAxisIndex:this.GR_WC_axis,
      },
      {
        name: 'Van Stadens Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.VSarray,
        smooth: true,
        yAxisIndex:this.VS_axis,

      },
      {
        name: 'Chatty North Chamber Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHT_NC_array,
        smooth: true,
        yAxisIndex:this.CHT_NC_axis,
      },
      {
        name: 'Chatty Overhead Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHT_OR_array,
        smooth: true,
        yAxisIndex:this.CHT_OR_axis,
      },
      {
        name: 'Chatty South Chamber Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHT_SC_array,
        smooth: true,
        yAxisIndex:this.CHT_SC_axis,
      },
      {
        name: 'Van Riebeeck Hoogte Delivery Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.VRH_DL_array,
        smooth: true,
        yAxisIndex:this.VRH_DL_axis,
      },
      {
        name: 'Van Riebeeck Hoogte Suction Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.VRH_SL_array,
        smooth: true,
        yAxisIndex:this.VRH_SL_axis,
      },
      {
        name: 'Heatherbank Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.HBarray,
        smooth: true,
        yAxisIndex:this.HB_axis,
      },
      {
        name: 'Lovemore Heights Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.LHarray,
        smooth: true,
        yAxisIndex:this.LH_axis,
      },
      {
        name: 'Blue Horizon Bay Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.BHB_array,
        smooth: true,
        yAxisIndex:this.BHB_axis,
      },
      {
        name: 'Rosedale Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.RD_LVL_array,
        smooth: true,
        yAxisIndex:this.RD_LVL_axis,
      },
      {
        name: 'Summit Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.SM_LVL_array,
        smooth: true,
        yAxisIndex:this.SM_LVL_axis,
      },
      {
        name: 'Summit Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.SM_FR_array,
        smooth: true,
        yAxisIndex:this.SM_FR_axis,
      },
      {
        name: 'Theescombe Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.TCarray,
        smooth: true,
        yAxisIndex:this.TC_axis,
      },
      {
        name: 'Grassridge Inlet Flow',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.GR_R_INLET_Arr,
        smooth: true,
        yAxisIndex:this.GR_R_INLET_axis,
      },
      {
        name: 'Grassridge Outlet Flow',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.GR_R_OUTLET_Arr,
        smooth: true,
        yAxisIndex:this.GR_R_OUTLET_axis,
      },
//FPT Sites

{
  name: 'Humerail Borehol Level',
  type: 'line',
  showSymbol: false,
  hoverAnimation: true,
  data: this.variable.HUM_GW_BOR_LVL_arr,
  smooth: true,
  yAxisIndex:this.HUM_GW_BOR_LVL_axis,
},

{
  name: 'Humerail Raw Water Tank Level',
  type: 'line',
  showSymbol: false,
  hoverAnimation: true,
  data: this.variable.HUM_GW_RAW_WATER_TANK_LVL_arr,
  smooth: true,
  yAxisIndex:this.HUM_GW_RAW_WATER_TANK_LVL_axis,
},
{
  name: 'Humerail Final Water Tank Level',
  type: 'line',
  showSymbol: false,
  hoverAnimation: true,
  data: this.variable.HUM_GW_FIN_WAT_TANK_LVL_arr,
  smooth: true,
  yAxisIndex:this.HUM_GW_FIN_WAT_TANK_LVL_axis,
},


      {
        name:"Bethelsdorp Battery Level",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.BETH_BATTERY_STATUS_array,
        smooth: true,
        yAxisIndex:this.BETH_BATTERY_STATUS_axis
      },
      {
        name:"Bethelsdorp Total Flow",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.BETH_TOTAL_FLOW_array,
        smooth: true,
        yAxisIndex:this.BETH_TOTAL_FLOW_axis
      },
      {
        name:"Bethelsdorp Pressure",
        type:'line',
        showSymbol:false,
        hoverAnimation:true,
        data:this.variable.BETH_PRESS_array,
        smooth:true,
        yAxisIndex:this.BETH_PRESS_axis
      },
      {
        name:"Bethelsdorp Flow Rate",
        type:'line',
        showSymbol:false,
        hoverAnimation:true,
        data:this.variable.BETH_FLOW_RATE_array,
        smooth:true,
        yAxisIndex:this.BETH_FLOW_RATE_axis
      },
      {
        name: 'FM Tower Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.FMT_FR_array,
        smooth: true,
        yAxisIndex:this.FMT_FR_axis,
      },

      {
        name: "FM Tower Total Flow",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.FMT_TF_array,
        smooth: true,
        yAxisIndex:this.FMT_TF_axis,
      },

      {
        name: 'FM Tower Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.FMT_PRESS_array,
        smooth: true,
        yAxisIndex:this.FMT_PRESS_axis,
      },


      {
        name: 'Coega IDZ Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.IDZ_FR_array,
        smooth: true,
        yAxisIndex:this.IDZ_FR_axis,
      },
      {
        name: 'Coega Motherwell Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.IDZ_MW_FR_array,
        smooth: true,
        yAxisIndex:this.IDZ_MW_FR_axis,
      },

      {
        name: 'Gamtoos Bridge Steel Pipe Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.GT_BRG_STL_FR_array,
        smooth: true,
        yAxisIndex:this.GT_BRG_STL_FR_axis,
      },
      {
        name: 'Gamtoos Bridge Socoman Pipe Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.GT_BRG_SOCO_FR_array,
        smooth: true,
        yAxisIndex:this.GT_BRG_SOCO_FR_axis,
      },

      {
        name: 'Gamtoos Bridge Steel Pipe Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.GT_BRG_STL_PRESS_array,
        smooth: true,
        yAxisIndex:this.GT_BRG_STL_PRESS_axis,
      },
      {
        name: 'Gamtoos Bridge Socoman Pipe Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.GT_BRG_SOCO_PRESS_array,
        smooth: true,
        yAxisIndex:this.GT_BRG_SOCO_PRESS_axis,
      },

      {
        name: 'Uitenhage Flow Chamber Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.UIT_FC_FR_array,
        smooth: true,
        yAxisIndex:this.UIT_FC_FR_axis,
      },
      {
        name: 'Uitenhage Flow Chamber Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.UIT_FC_PRESS_array,
        smooth: true,
        yAxisIndex:this.UIT_FC_PRESS_axis,
      },{
        name: 'Storms River Holding Reservoir Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.STORMS_HOLDING_RESERVOIR_LEVEL_Arr,
        smooth: true,
        yAxisIndex:this.STORMS_HOLDING_RESERVOIR_LEVEL_axis,
      },
      {
        name: 'Storms River Overhead Tank Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.STORMS_OVERHEAD_TANK_LEVEL_Arr,
        smooth: true,
        yAxisIndex:this.STORMS_GORGE_LEVEL_axis,
      },{
        name: 'Storms River Gorge Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.STORMS_GORGE_LEVEL_Arr,
        smooth: true,
        yAxisIndex:this.STORMS_OVERHEAD_TANK_LEVEL_axis,
      },
      {
        name: 'Storms River Quarry Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.STORMS_QUARRY_LEVEL_Arr,
        smooth: true,
        yAxisIndex:this.STORMS_QUARRY_LEVEL_axis,
      },
      //Pump Stations
      {
        name: 'Crown Gardens Suction Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CG_CSP_Arr,
        smooth: true,
        yAxisIndex:this.CG_CSP_axis,
      },

      {
        name: 'Crown Gardens Delivery Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CG_CDP_Arr,
        smooth: true,
        yAxisIndex:this.CG_CDP_axis,
      },
      {
        name: 'Crown Gardens Sump Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CG_S_LVL_Arr,
        smooth: true,
        yAxisIndex:this.CG_S_LVL_axis,
      },
      {
        name: 'Crown Gardens Tower 1 Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CG_T1_LVL_Arr,
        smooth: true,
        yAxisIndex:this.CG_T1_LVL_axis,
      },
      {
        name: 'Crown Gardens Tower 1 Inlet Flow',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CG_T1_IF_Arr,
        smooth: true,
        yAxisIndex:this.CG_T1_IF_axis,
      },
      {
        name: 'Crown Gardens Tower 1 Outlet Flow',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CG_T1_OF_Arr,
        smooth: true,
        yAxisIndex:this.CG_T1_OF_axis,
      },
      {
        name: 'Crown Gardens Tower 2 Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CG_T2_LVL_Arr,
        smooth: true,
        yAxisIndex:this.CG_T2_LVL_axis,
      },
      {
        name: 'Crown Gardens Tower 2 Inlet Flow',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CG_T2_IF_Arr,
        smooth: true,
        yAxisIndex:this.CG_T2_IF_axis,
      },
      {
        name: 'Crown Gardens Tower 2 Outlet Flow',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CG_T2_OF_Arr,
        smooth: true,
        yAxisIndex:this.CG_T2_OF_axis,
      },
      {
        name: 'NMU Effluent Delivery Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.NMU_EFF_DP_Arr,
        smooth: true,
        yAxisIndex:this.NMU_EFF_DP_axis,
      },
      {
        name: 'NMU Effluent Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.NMU_EFF_FR_Arr,
        smooth: true,
        yAxisIndex:this.NMU_EFF_FR_axis,
      },
      {
        name: 'NMU Effluent Dam Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.NMU_EFF_DAM_LVL_Arr,
        smooth: true,
        yAxisIndex:this.NMU_EFF_DAM_LVL_axis,
      },
      {
        name: 'NMU Effluent Pump 1 Speed',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.NMU_EFF_P1_SPEED_Arr,
        smooth: true,
        yAxisIndex:this.NMU_EFF_P1_SPEED_axis,
      },
      {
        name: 'NMU Effluent Pump 2 Speed',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.NMU_EFF_P2_SPEED_Arr,
        smooth: true,
        yAxisIndex:this.NMU_EFF_P2_SPEED_axis,
      },
      {
        name: 'NMU Effluent Pump 3 Speed',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.NMU_EFF_P3_SPEED_Arr,
        smooth: true,
        yAxisIndex:this.NMU_EFF_P3_SPEED_axis,
      },
      {
        name: 'NMU Effluent Jockey Pump Speed',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.NMU_EFF_JP_SPEED_Arr,
        smooth: true,
        yAxisIndex:this.NMU_EFF_JP_SPEED_axis,
      },


      {
        name: 'Chelsea Pumpstation 1 Actual Speed',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P1_ACTUAL_SPEED_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P1_ACTUAL_SPEED_Axis,
      },

      {
        name: 'Chelsea Pumpstation 1 Delivery Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P1_DEL_PRESS_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P1_DEL_PRESS_Axis,
      },

      {
        name: 'Chelsea Pumpstation 1 Suction Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P1_SUCT_PRESS_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P1_SUCT_PRESS_Axis,
      },

      {
        name: 'Chelsea Pumpstation 2 Actual Speed',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P2_ACTUAL_SPEED_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P2_ACTUAL_SPEED_Axis,
      },

      {
        name: 'Chelsea Pumpstation 2 Delivery Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P2_DEL_PRESS_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P2_DEL_PRESS_Axis,
      },

      {
        name: 'Chelsea Pumpstation 2 Suction Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P2_SUCT_PRESS_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P2_SUCT_PRESS_Axis,
      },


      {
        name: 'Chelsea Pumpstation 3 Actual Speed',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P3_ACTUAL_SPEED_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P3_ACTUAL_SPEED_Axis,
      },

      {
        name: 'Chelsea Pumpstation 3 Delivery Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P3_DEL_PRESS_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P3_DEL_PRESS_Axis,
      },

      {
        name: 'Chelsea Pumpstation 3 Suction Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P3_SUCT_PRESS_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P3_SUCT_PRESS_Axis,
      },

      {
        name: 'Chelsea Pumpstation 4 Actual Speed',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P4_ACTUAL_SPEED_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P4_ACTUAL_SPEED_Axis,
      },

      {
        name: 'Chelsea Pumpstation 4 Delivery Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P4_DEL_PRESS_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P4_DEL_PRESS_Axis,
      },

      {
        name: 'Chelsea Pumpstation 4 Suction Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_P4_SUCT_PRESS_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_P4_SUCT_PRESS_Axis,
      },
      {
        name: 'Chelsea Pumpstation 700 Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CHE_PS_700_FLOW_RATE_Arr,
        smooth: true,
        yAxisIndex:this.CHE_PS_700_FLOW_RATE_Axis,
      }, {
        name: 'Stanford Road Suction Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.STAN_BPS_SuctionPressure_Arr,
        smooth: true,
        yAxisIndex:this.STAN_BPS_SuctionPressure_axis,
      },
      {
        name: 'Stanford Road Delivery Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.STAN_BPS_DeliveryPressure_Arr,
        smooth: true,
        yAxisIndex: this.STAN_BPS_DeliveryPressure_axis
      },
      {
        name: 'Stanford Road Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.STAN_BPS_FlowRate_Arr,
        smooth: true,
        yAxisIndex: this.STAN_BPS_FlowRate_axis,
      },
       {
        name: 'Stanford Road Pump 1 Frequency',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.STAN_BPS_P1_FREQ_Arr,
        smooth: true,
        yAxisIndex: this.STAN_BPS_P1_FREQ_axis
      },
      {
        name: 'Stanford Road Pump 2 Frequency',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.STAN_BPS_P2_FREQ_Arr,
        smooth: true,
        yAxisIndex: this.STAN_BPS_P2_FREQ_axis
      },
      {
        name: 'Stanford Road Pump 3 Frequency',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.STAN_BPS_P3_FREQ_Arr,
        smooth: true,
        yAxisIndex: this.STAN_BPS_P3_FREQ_axis
      },
      {
        name: 'Stanford Road Pump 4 Frequency',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.STAN_BPS_P4_FREQ_Arr,
        smooth: true,
        yAxisIndex: this.STAN_BPS_P4_FREQ_axis
      },
      {
        name: 'Motherwell Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.MW_BPS_FlowRate_Arr,
        smooth: true,
        yAxisIndex:this.MW_BPS_FlowRate_axis,
      },
      {
        name: 'Motherwell Delivery Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.MW_BPS_DeliveryPressure_Arr,
        smooth: true,
        yAxisIndex:this.MW_BPS_DeliveryPressure_axis,
      },
      {
        name: "Motherwell Reservoir Level",
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.MW_LVL_array,
        smooth: true,
        yAxisIndex:this.MW_LVL_axis
      },
      {
        name: 'Motherwell Suction Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.MW_BPS_SuctionPressure_Arr,
        smooth: true,
        yAxisIndex:this.MW_BPS_SuctionPressure_axis,
      },
{
      //Ground Water
      name: 'Newton Park Pool Pressure',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.NMBM_NPP_GW_PRESSURE_Arr,
        smooth: true,
        yAxisIndex:this.NMBM_NPP_GW_PRESSURE_axis,
},{
        name: 'Newton Park Pool Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.NMBM_NPP_GW_FLOW_RATE_Arr,
        smooth: true,
        yAxisIndex:this.NMBM_NPP_GW_FLOW_RATE_axis,
},{
        name: 'Newton Park Pool Water Level',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.NMBM_NPP_GW_LEVEL_Arr,
        smooth: true,
        yAxisIndex:this.NMBM_NPP_GW_LEVEL_axis,
      //Newton Park Pool
    },
    {
      name: 'Newton Park Pool Total Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.NMBM_NPP_GW_TOTAL_FLOW_Arr,
      smooth: true,
      yAxisIndex:this.NMBM_NPP_GW_TOTAL_FLOW_axis,
    },
    {//Humansdorp
      name:'Humansdorp 1 Water Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation:true,
      data:this.variable.KLM_HUP_WATER_LEVEL_Arr,
      smooth: true,
      yAxisIndex:this.KLM_HUP_WATER_LEVEL_Axis,

    },
      {//Humansdorp
        name:'Humansdorp 1 Flow Rate',
        type:'line',
        showSymbol: false,
        hoverAnimation:true,
        data:this.variable.KLM_HUP_FLOWRATE_Arr,
        smooth: true,
        yAxisIndex:this.KLM_HUP_FLOWRATE_Axis

      },
      {//Humansdorp
        name:'Humansdorp 1 Total Flow',
        type:'line',
        showSymbol: false,
        hoverAnimation:true,
        data:this.variable.KLM_HUP_TOTALFLOW_Arr,
        smooth: true,
        yAxisIndex:this.KLM_HUP_TOTALFLOW_Axis,

      },
        {//Humansdorp
          name:'Humansdorp 2C Water Level',
          type:'line',
          showSymbol: false,
          hoverAnimation:true,
          data:this.variable.KLM_HUP2_WATER_LEVEL_Arr,
          smooth: true,
          yAxisIndex:this.KLM_HUP2_WATER_LEVEL_Axis,

        },
        {//Humansdorp
          name:'Humansdorp 2C Flow Rate',
          type:'line',
          showSymbol: false,
          hoverAnimation:true,
          data:this.variable.KLM_HUP2_FLOWRATE_Arr,
          smooth: true,
          yAxisIndex:this.KLM_HUP2_FLOWRATE_Axis

        },
          {//Humansdorp
            name:'Humansdorp 2C Total Flow',
            type:'line',
            showSymbol: false,
            hoverAnimation:true,
            data:this.variable.KLM_HUP2_TOTALFLOW_Arr,
            smooth: true,
            yAxisIndex:this.KLM_HUP2_TOTALFLOW_Axis,

          },
          {//Humansdorp
            name:'Humansdorp 3 Water Level',
            type:'line',
            showSymbol: false,
            hoverAnimation:true,
            data:this.variable.KLM_HUP3_WATER_LEVEL_Arr,
            smooth: true,
            yAxisIndex:this.KLM_HUP3_WATER_LEVEL_Axis,

          },
            {//Humansdorp
              name:'Humansdorp 3 Flow Rate',
              type:'line',
              showSymbol: false,
              hoverAnimation:true,
              data:this.variable.KLM_HUP3_FLOWRATE_Arr,
              smooth: true,
              yAxisIndex:this.KLM_HUP3_FLOWRATE_Axis,

            },
            {//Humansdorp
              name:'Humansdorp 3 Total Flow',
              type:'line',
              showSymbol: false,
              hoverAnimation:true,
              data:this.variable.KLM_HUP3_TOTALFLOW_Arr,
              smooth: true,
              yAxisIndex:this.KLM_HUP3_TOTALFLOW_Axis

            },
              {//Humansdorp
                name:'Humansdorp 4 Water Level ',
                type:'line',
                showSymbol: false,
                hoverAnimation:true,
                data:this.variable.KLM_HUP4_WATER_LEVEL_Arr,
                smooth: true,
                yAxisIndex:this.KLM_HUP4_WATER_LEVEL_Axis,

              },
              {//Humansdorp
                name:'Humansdorp 4 Flow Rate',
                type:'line',
                showSymbol: false,
                hoverAnimation:true,
                data:this.variable.KLM_HUP4_FLOWRATE_Arr,
                smooth: true,
                yAxisIndex:this.KLM_HUP4_FLOWRATE_Axis

              },
                {//Humansdorp
                  name:'Humansdorp 6 Total Flow',
                  type:'line',
                  showSymbol: false,
                  hoverAnimation:true,
                  data:this.variable.KLM_HUP6_TOTALFLOW_Arr,
                  smooth: true,
                  yAxisIndex:this.KLM_HUP6_TOTALFLOW_Axis
                },
                      {//Humansdorp
                        name:'Humansdorp 6 Water Level',
                        type:'line',
                        showSymbol: false,
                        hoverAnimation:true,
                        data:this.variable.KLM_HUP6_WATER_LEVEL_Arr,
                        smooth: true,
                        yAxisIndex:this.KLM_HUP6_WATER_LEVEL_Axis,

                      },
                      {//Humansdorp
                        name:'Humansdorp 6 Flow Rate',
                        type:'line',
                        showSymbol: false,
                        hoverAnimation:true,
                        data:this.variable.KLM_HUP6_FLOWRATE_Arr,
                        smooth: true,
                        yAxisIndex:this.KLM_HUP6_FLOWRATE_Axis

                      },
                        {//Humansdorp
                          name:'Humansdorp 4 Total Flow',
                          type:'line',
                          showSymbol: false,
                          hoverAnimation:true,
                          data:this.variable.KLM_HUP4_TOTALFLOW_Arr,
                          smooth: true,
                          yAxisIndex:this.KLM_HUP4_TOTALFLOW_Axis
                        },
      //Water Treatment Works
      {
        name: 'Nooitgedacht High Level Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.WTW_NGT_FM_HIGH_FR_Arr,
        smooth: true,
        yAxisIndex:this.WTW_NGT_FM_HIGH_FR_axis,
      },
      {
        name: 'Nooitgedacht Low Level Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.WTW_NGT_FM_LOW_FR_Arr,
        smooth: true,
        yAxisIndex:this.WTW_NGT_FM_LOW_FR_axis,
      },


      {
        name:  "Kareedouw K1 Total Flow",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KARK_K1_TF_arr,
        smooth: true,
        yAxisIndex:this.KARK_K1_TF_axis,
      },
      {
        name:  "Kareedouw K1 Flow Rate",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KARK_K1_FR_arr,
        smooth: true,
        yAxisIndex:this.KARK_K1_FR_axis,
      },

      {
        name:  "Kareedouw K1 Current",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KARK_K1_CUR_arr,
        smooth: true,
        yAxisIndex:this.KARK_K1_CUR_axis,
      },
      {
        name:  "Kareedouw K1 Level",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KARK_K1_LVL_arr,
        smooth: true,
        yAxisIndex:this.KARK_K1_LVL_axis,
      },

      {
        name:  "Kareedouw K2 Total Flow",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KARK_K2_TF_arr,
        smooth: true,
        yAxisIndex:this.KARK_K2_TF_axis,
      },
      {
        name:  "Kareedouw K2 Flow Rate",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KARK_K2_FR_arr,
        smooth: true,
        yAxisIndex:this.KARK_K2_FR_axis,
      },

      {
        name:  "Kareedouw K2 Current",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KARK_K2_CUR_arr,
        smooth: true,
        yAxisIndex:this.KARK_K2_CUR_axis,
      },
      {
        name:  "Kareedouw K2 Level",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KARK_K2_LVL_arr,
        smooth: true,
        yAxisIndex:this.KARK_K2_LVL_axis,
      },

    ]
    };
     // },500)
     this.isLoading=false;

    })

  }

}
  constructor(public dialog: MatDialog ,public rs: ReportService,private authService: AuthService, private userService: UsersService, private webSocketService: WebSocketService) {


  }





  ngOnInit() {




    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })

var count=0

for (let i = 0; i < this.userSites.length; i++) {

  switch (this.userSites[i]) {


    // Reservoirs
    case "NMB_VS_R":
this.SitesList[count]="Van Stadens Reservoir Level"
count++
      break;

    case "NMB_GBW_FPT":
      this.SitesList[count]="Gamtoos Break Water Pressure"
      count++
      this.SitesList[count]="Gamtoos Break Water Flow Rate"
      count++

      break;

    case "NMB_CGK_R":
      this.SitesList[count]="Coega Kop Reservoir Pressure"
      count++
      this.SitesList[count]="Coega Kop to Coega IDZ Flow Rate"
      count++
      this.SitesList[count]="Coega Kop to Motherwell Flow Rate"
      count++
      this.SitesList[count]="Coega Kop from Grassridge Total Flow"
      count++
      this.SitesList[count]="Coega Kop to Coega IDZ Total Flow"
      count++
      this.SitesList[count]="Coega Kop Reservoir Level"
      count++
      this.SitesList[count]="Coega Kop to Motherwell Total Flow"
      count++
      this.SitesList[count]="Coega Kop from Grassridge Flow Rate"
      count++
      this.SitesList[count]="Coega IDZ Outlet Total Flow to Coega Kop Reservoir"
      count++
      break;
    case "NMB_BHB_R":
      this.SitesList[count]="Blue Horizon Bay Reservoir Level"
count++
      break;



      case "NMB_EMERALD_R":
        this.SitesList[count]="Emerald Hill Reservoir Level"
        count++;
        break;


      case "NMB_DRIFT_R":
        this.SitesList[count]="Driftsands Reservoir Level"
        count++
        this.SitesList[count]="Driftsands Flow Rate 1"
        count++
        this.SitesList[count]="Driftsands Flow Rate 2"
        count++
        this.SitesList[count]="Driftsands Total Flow 1"
        count++
        this.SitesList[count]="Driftsands Total Flow 2"
        count++
        break;

      case "NMB_CHE_PS":
        this.SitesList[count]="Chelsea Pumpstation 1 Actual Speed"
  count++
  this.SitesList[count]="Chelsea Pumpstation 1 Delivery Pressure"
  count++
  this.SitesList[count]="Chelsea Pumpstation 1 Suction Pressure"
  count++
  this.SitesList[count]="Chelsea Pumpstation 2 Actual Speed"
  count++
  this.SitesList[count]="Chelsea Pumpstation 2 Delivery Pressure"
  count++
  this.SitesList[count]="Chelsea Pumpstation 2 Suction Pressure"
  count++
  this.SitesList[count]="Chelsea Pumpstation 3 Actual Speed"
  count++
  this.SitesList[count]="Chelsea Pumpstation 3 Delivery Pressure"
  count++
  this.SitesList[count]="Chelsea Pumpstation 3 Suction Pressure"
  count++
  this.SitesList[count]="Chelsea Pumpstation 4 Actual Speed"
  count++
  this.SitesList[count]="Chelsea Pumpstation 4 Delivery Pressure"
  count++
  this.SitesList[count]="Chelsea Pumpstation 4 Suction Pressure"
  count++
  this.SitesList[count]="Chelsea Pumpstation 700 Flow Rate"
  count++
        break;


           case "GRF_WOL_R":
          this.SitesList[count] = "Wolwas Reservoir Level"
          count++
          break;

           case "GRF_UMA_R":
          this.SitesList[count] = "Umasizakhe Reservoir Level"
          count++
          break;

           case "GRF_KROON_R":
          this.SitesList[count] = "Kroonvale Reservoir Level"
          count++
          break;

            case "GRF_BERGEN_R":
          this.SitesList[count] = "Bergendal Reservoir Level"
          count++
          break;

          case "GRF_TIN_R":
            this.SitesList[count] ="Tin Roof Reservoir Level"
            count++
            break;

            case "GRF_HOLD_R":
              this.SitesList[count] ="Holding Reservoir Level"
              count++
              break;

              case "GRF_DAMP_R":
                this.SitesList[count] ="Damcamp Reservoir Level"
                count++
                break;



    case "NMB_OLI_R":
      this.SitesList[count]="Olifantskop Reservoir Level"
      count++
      break;

      case "NMB_SCHOE_R":
        this.SitesList[count]="Schoemanshoek Pressure"
        count++
        this.SitesList[count]="Schoemanshoek Level"
        count++
        this.SitesList[count]="Schoemanshoek Actuator Position"
        count++
        this.SitesList[count]="Schoemanshoek Actuator Set Point"
        count++
        this.SitesList[count]="Schoemanshoek Actuator Valve Feedback Signal"
        count++
        this.SitesList[count]="Schoemanshoek Actuator Valve Command Signal"
        count++
        this.SitesList[count]="Schoemanshoek Reservoir Level Signal Error"
        count++
        this.SitesList[count]="Schoemanshoek Actuator Valve Fault"
        count++
        this.SitesList[count]="Schoemanshoek Actuator Valve Torque Fail Close"
        count++
        this.SitesList[count]="Schoemanshoek Actuator Valve Torque Fail Open"
        count++
        this.SitesList[count]="Schoemanshoek General Fault"
        count++
        this.SitesList[count]="Schoemanshoek Actuator General Fault"
        count++
        this.SitesList[count]="Schoemanshoek Actuator Valve Timeout"
        count++

        break;


    case "NMB_ELANDS_WTW":
      this.SitesList[count]="Elandsjagt Flow Rate"
      count++;
      this.SitesList[count]="Elandsjagt Pressure"
      count++;
      break;


    case "NMB_HB_R":
      this.SitesList[count]="Heatherbank Reservoir Level"
count++
      break;
    case "NMB_LH_R":
      this.SitesList[count]="Lovemore Heights Reservoir Level"
count++
      break;
    case "NMB_TC_R":
      this.SitesList[count]="Theescombe Reservoir Level"
count++
      break;
    case "NMB_CHE_R":
      this.SitesList[count]="Chelsea Reservoir West Chamber Level"
      count++;
      this.SitesList[count]="Chelsea Reservoir East Chamber Level"
      count++;
      break;
    case "NMB_CHT_R":
      this.SitesList[count]="Chatty North Chamber Level"
count++
      this.SitesList[count]="Chatty South Chamber Level"
count++
      this.SitesList[count]="Chatty Overhead Level"
count++
      this.SitesList[count]="Chatty Flow Rate"
      count++
      break;
    case "NMB_VRH_R":
      this.SitesList[count]="Van Riebeeck Hoogte Delivery Level"
count++
      this.SitesList[count]="Van Riebeeck Hoogte Suction Level"
count++
      break;
    case "NMB_GR_R":
      this.SitesList[count]="Grassridge East Chamber Level"
count++
      this.SitesList[count]="Grassridge West Chamber Level"
count++
this.SitesList[count]="Grassridge Inlet Flow"
count++
this.SitesList[count]="Grassridge Outlet Flow"
count++
      break;
    case "NMB_GB_R":
      this.SitesList[count]="Greenbushes Reservoir Level"
count++
this.SitesList[count]="Greenbushes Flow Rate"
count++
      break;
      case "NMB_RD_R":
        this.SitesList[count]="Rosedale Reservoir Level"
  count++
        break;
        case "NMB_SM_R":
          this.SitesList[count]="Summit Reservoir Level"
    count++
    this.SitesList[count]="Summit Flow Rate"
    count++
          break;

      //FPT Sites
    case "NMB_BETH_FPT":
      if (count>=1 ){count = 0}
      this.SitesList[count]="Bethelsdorp Pressure"
      count++
      this.SitesList[count]="Bethelsdorp Flow Rate"
      count++
      this.SitesList[count]="Bethelsdorp Battery Level"
      count++
      this.SitesList[count]="Bethelsdorp Total Flow"
      count++
      break;

      case "NMB_BUSH_FPT":
        if(count>=1){count = 0}
        this.SitesList[count] = "Bushy Park Soccoman Flow Rate";
        count++;
        this.SitesList[count] = "Bushy Park Steel Flow Rate";
        count++;
        this.SitesList[count] = "Bushy Park Soccoman Pressure";
        count++;
        this.SitesList[count] = "Bushy Park Steel Pressure";
        count++;
        this.SitesList[count] = "Bushy Park Pumpstation Flow Rate";
        count++;
        this.SitesList[count] = "Bushy Park Combined Borehole Flow Rate";
        count++;
        this.SitesList[count] = "Bushy Park Holding Tank Level";
        count++;
        break;

    case "HUM_HUM_GW":
      if (count>=1 ){count = 0}
      this.SitesList[count]="Humerail Borehol Level"
      count++
      this.SitesList[count]="Humerail Raw Water Tank Level"
      count++
      this.SitesList[count]="Humerail Final Water Tank Level"
      count++
      break;

    case "NMB_FMT_FPT":
      this.SitesList[count]="FM Tower Flow Rate"
      count++
      this.SitesList[count]="FM Tower Pressure"
      count++
      this.SitesList[count] = "FM Tower Total Flow"
      count++
      break;
      case "NMB_CIDZT_FPT":
        this.SitesList[count]="Coega IDZ Flow Rate"
  count++
        this.SitesList[count]="Coega Motherwell Flow Rate"
  count++
        break;
      case "NMB_GT_BRG_FPT":
          this.SitesList[count]="Gamtoos Bridge Steel Pipe Flow Rate"
    count++
          this.SitesList[count]="Gamtoos Bridge Socoman Pipe Flow Rate"
    count++
          this.SitesList[count]="Gamtoos Bridge Steel Pipe Pressure"
    count++
          this.SitesList[count]="Gamtoos Bridge Socoman Pipe Pressure"
    count++
          break;

          case "NMB_UIT_FC_FPT":
            this.SitesList[count]="Uitenhage Flow Chamber Flow Rate"
      count++
            this.SitesList[count]="Uitenhage Flow Chamber Pressure"
      count++
            break;

            case "NMB_HUP_OFF_TAKE_FPT":
              this.SitesList[count]="Humansdorp Off Take Total Flow"
              count++
              this.SitesList[count]="Humansdorp Off Take Pressure"
              count++
              this.SitesList[count]="Humansdorp Off Take Battery Level"
              count++
              break;




              case "NMB_JEFF_BAY_OFF_TAKE_FPT":
                this.SitesList[count]="Jeffreys Bay Off Take Total Flow"
                count++
                this.SitesList[count]="Jeffreys Bay Off Take Battery Level"
                count++

                break;

                case "NMB_KOU_MAIN_LINE_FPT":
                  this.SitesList[count]="Kouga Main Line Pressure"
                  count++
                  this.SitesList[count]="Kouga Main Line Battery Level"
                  count++

                  break;

                  case "NMB_ONS_PARA_FPT":
                    this.SitesList[count]="Ons Paradys Total Flow"
                    count++
                     this.SitesList[count]="Ons Paradys Battery Level"
                    count++
                    break;

                    case "NMB_PARA_BEA_ST_FRANCIS_FPT":
                      this.SitesList[count]="St Francis Offtake Total Flow"
                count++
                      this.SitesList[count]="Paradise Beach Total Flow"
                count++
                this.SitesList[count]="Paradise/St Francis Battery Level"
                count++
                      break;
      //Pump Stations


      case "TSI_STORMS_PS":
        this.SitesList[count]="Storms River Quarry Level"
      count++;
        this.SitesList[count]="Storms River Gorge Level"
      count++
        break;

        case "TSI_STORMS_WTW":
          this.SitesList[count]="Storms River Holding Reservoir Level"
        count++;
          this.SitesList[count]="Storms River Overhead Tank Level"
        count++
          break;
      case "NMB_STAN_R_PS":
        this.SitesList[count]="Stanford Road Flow Rate"
      count++
        this.SitesList[count]="Stanford Road Delivery Pressure"
      count++
        this.SitesList[count]="Stanford Road Suction Pressure"
      count++
        this.SitesList[count]="Stanford Road Pump 1 Frequency"
      count++
        this.SitesList[count]="Stanford Road Pump 2 Frequency"
      count++
        this.SitesList[count]="Stanford Road Pump 3 Frequency"
      count++
        this.SitesList[count]="Stanford Road Pump 4 Frequency"
      count++
        break;

      case "NMB_MW_PS":
            this.SitesList[count]="Motherwell Flow Rate"
      count++
            this.SitesList[count]="Motherwell Delivery Pressure"
      count++
      this.SitesList[count]="Motherwell Suction Pressure"
      count++
            break;

            case "NMB_MW_R":
              this.SitesList[count]="Motherwell Reservoir Level"
              count++;
              break;

    case "RW_CG_PS":
      this.SitesList[count]="Crown Gardens Suction Pressure"
count++
      this.SitesList[count]="Crown Gardens Delivery Pressure"
count++
      this.SitesList[count]="Crown Gardens Sump Level"
count++
      this.SitesList[count]="Crown Gardens Tower 1 Level"
count++
      this.SitesList[count]="Crown Gardens Tower 1 Inlet Flow"
count++
      this.SitesList[count]="Crown Gardens Tower 1 Outlet Flow"
count++
      this.SitesList[count]="Crown Gardens Tower 2 Level"
count++
      this.SitesList[count]="Crown Gardens Tower 2 Inlet Flow"
count++
      this.SitesList[count]="Crown Gardens Tower 2 Outlet Flow"
count++
      break;

      case "NMU_NMU_EFF":
        this.SitesList[count]="NMU Effluent Flow Rate"
        count++
        this.SitesList[count]="NMU Effluent Delivery Pressure"
        count++
        this.SitesList[count]="NMU Effluent Dam Level"
        count++
        this.SitesList[count]="NMU Effluent Pump 1 Speed"
        count++
        this.SitesList[count]="NMU Effluent Pump 2 Speed"
        count++
        this.SitesList[count]="NMU Effluent Pump 3 Speed"
        count++
        this.SitesList[count]="NMU Effluent Jockey Pump Speed"
        count++
break;
case "NMB_NGT_WTW":
  this.SitesList[count]="Nooitgedacht High Level Flow Rate"
count++
  this.SitesList[count]="Nooitgedacht Low Level Flow Rate"
count++
  break;


  case "KOU_KARK1_GW":
  this.SitesList[count]= "Kareedouw K1 Total Flow"
count++
  this.SitesList[count]= "Kareedouw K1 Flow Rate"
count++
this.SitesList[count]= "Kareedouw K1 Current"
count++
  this.SitesList[count]= "Kareedouw K1 Level"
count++
  break;


  case "KOU_KARK2_GW":
    this.SitesList[count]= "Kareedouw K2 Total Flow"
  count++
    this.SitesList[count]= "Kareedouw K2 Flow Rate"
  count++
  this.SitesList[count]= "Kareedouw K2 Current"
  count++
    this.SitesList[count]= "Kareedouw K2 Level"
  count++
    break;



   case "NMB_NPP_GW":
   this.SitesList[count]="Newton Park Pool Pressure"
   count++
   this.SitesList[count]="Newton Park Pool Flow Rate"
   count++
   this.SitesList[count]="Newton Park Pool Water Level"
   count++
  this.SitesList[count]="Newton Park Pool Total Flow"
    count++

   break;


  case"KLM_HUP_GW":
  this.SitesList[count]="Humansdorp 1 Water Level"
  count++
  this.SitesList[count]="Humansdorp 1 Flow Rate"
  count++
  this.SitesList[count]="Humansdorp 1 Total Flow"
  count++
  break;
  case"KLM_HUP2_GW":
  this.SitesList[count]="Humansdorp 2C Water Level"
  count++
  this.SitesList[count]="Humansdorp 2C Flow Rate"
  count++
  this.SitesList[count]="Humansdorp 2C Total Flow"
  count++
  break;
   case"KLM_HUP3_GW":
   this.SitesList[count]="Humansdorp 3 Water Level"
   count++
   this.SitesList[count]="Humansdorp 3 Flow Rate"
   count++
   this.SitesList[count]="Humansdorp 3 Total Flow"
   count++
   break;
case"KLM_HUP4_GW":
this.SitesList[count]="Humansdorp 4 Water Level "
count++
this.SitesList[count]="Humansdorp 4 Flow Rate"
count++
this.SitesList[count]="Humansdorp 4 Total Flow"
count++
break;

case"KLM_HUP6_GW":
this.SitesList[count]="Humansdorp 6 Water Level"
count++
this.SitesList[count]="Humansdorp 6 Flow Rate"
count++
this.SitesList[count]="Humansdorp 6 Total Flow"
count++
break;

  }
}
this.SitesList.sort(function(a,b){
  return a.localeCompare(b);
})
  }


  TrendInfoTable(sitesChosen:any[]){
    var maxValues=[]
    var minValues=[]
    var avgValues=[]
    this.dataSource=[];
    this.dataSource = new MatTableDataSource();
    this.ELEMENT_DATA=[];
    for (var m = 0; m < this.SitesList.length; m++) {
      switch (sitesChosen[m]) {
        // Reservoirs
        case "Greenbushes Flow Rate":
          if (this.variable.GBFRarray.length==0){break;}
            else{
     var arr = this.MinMaxAvg(m,this.variable.GBFRarray)!
     minValues[m]= arr[0]
     maxValues[m]=arr[1]
     avgValues[m]=arr[2]
        }

            break;
            case "Greenbushes Reservoir Level":
              if (this.variable.GBarray.length==0){break;}
                else{
         var arr = this.MinMaxAvg(m,this.variable.GBarray)!
         minValues[m]= arr[0]
         maxValues[m]=arr[1]
         avgValues[m]=arr[2]
            }

                break;

                case   "Kareedouw K1 Total Flow":
                  if (this.variable.KARK_K1_TF_arr.length==0){break;}
                    else{
             var arr = this.MinMaxAvg(m,this.variable.KARK_K1_TF_arr)!
             minValues[m]= arr[0]
             maxValues[m]=arr[1]
             avgValues[m]=arr[2]
                }
                    break;


                    case    "Kareedouw K1 Flow Rate":
                      if (this.variable.KARK_K1_FR_arr.length==0){break;}
                        else{
                 var arr = this.MinMaxAvg(m,this.variable.KARK_K1_FR_arr)!
                 minValues[m]= arr[0]
                 maxValues[m]=arr[1]
                 avgValues[m]=arr[2]
                    }

                        break;
                        case    "Kareedouw K1 Current":
                          if (this.variable.KARK_K1_CUR_arr.length==0){break;}
                            else{
                     var arr = this.MinMaxAvg(m,this.variable.KARK_K1_CUR_arr)!
                     minValues[m]= arr[0]
                     maxValues[m]=arr[1]
                     avgValues[m]=arr[2]
                        }
                            break;


                            case   "Kareedouw K1 Level":
                              if (this.variable.KARK_K1_LVL_arr.length==0){break;}
                                else{
                         var arr = this.MinMaxAvg(m,this.variable.KARK_K1_LVL_arr)!
                         minValues[m]= arr[0]
                         maxValues[m]=arr[1]
                         avgValues[m]=arr[2]
                            }

                                break;

                case   "Kareedouw K2 Total Flow":
                  if (this.variable.KARK_K2_TF_arr.length==0){break;}
                    else{
             var arr = this.MinMaxAvg(m,this.variable.KARK_K2_TF_arr)!
             minValues[m]= arr[0]
             maxValues[m]=arr[1]
             avgValues[m]=arr[2]
                }
                    break;


                    case    "Kareedouw K2 Flow Rate":
                      if (this.variable.KARK_K2_FR_arr.length==0){break;}
                        else{
                 var arr = this.MinMaxAvg(m,this.variable.KARK_K2_FR_arr)!
                 minValues[m]= arr[0]
                 maxValues[m]=arr[1]
                 avgValues[m]=arr[2]
                    }

                        break;
                        case    "Kareedouw K2 Current":
                          if (this.variable.KARK_K2_CUR_arr.length==0){break;}
                            else{
                     var arr = this.MinMaxAvg(m,this.variable.KARK_K2_CUR_arr)!
                     minValues[m]= arr[0]
                     maxValues[m]=arr[1]
                     avgValues[m]=arr[2]
                        }
                            break;


                            case   "Kareedouw K2 Level":
                              if (this.variable.KARK_K2_LVL_arr.length==0){break;}
                                else{
                         var arr = this.MinMaxAvg(m,this.variable.KARK_K2_LVL_arr)!
                         minValues[m]= arr[0]
                         maxValues[m]=arr[1]
                         avgValues[m]=arr[2]
                                            }

                                                break;




                 case   "Bushy Park Soccoman Flow Rate":
                   if (this.variable.BUSH_CHURCH_SOCO_FR_arr.length==0){break;}
                     else{
              var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_SOCO_FR_arr)!
              minValues[m]= arr[0]
              maxValues[m]=arr[1]
              avgValues[m]=arr[2]
                                 }
                                 break;

              case "Bushy Park Steel Flow Rate":
               if (this.variable.BUSH_CHURCH_STEEL_FR_arr.length==0){break;}
                 else{
          var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_STEEL_FR_arr)!
          minValues[m]= arr[0]
          maxValues[m]=arr[1]
          avgValues[m]=arr[2]
                             }
                        break;
            case "Bushy Park Soccoman Pressure":
             if (this.variable.BUSH_CHURCH_SOCCO_BAR_arr.length==0){break;}
               else{
        var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_SOCCO_BAR_arr)!
        minValues[m]= arr[0]
        maxValues[m]=arr[1]
        avgValues[m]=arr[2]
                           }
                      break;

             case "Bushy Park Steel Pressure":
              if (this.variable.BUSH_CHURCH_STEEL_BAR_arr.length==0){break;}
                else{
         var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_STEEL_BAR_arr)!
         minValues[m]= arr[0]
         maxValues[m]=arr[1]
         avgValues[m]=arr[2]
                            }
                       break;

             case "Bushy Park Pumpstation Flow Rate":
              if (this.variable.BUSH_PUMP_FR_arr.length==0){break;}
                else{
         var arr = this.MinMaxAvg(m,this.variable.BUSH_PUMP_FR_arr)!
         minValues[m]= arr[0]
         maxValues[m]=arr[1]
         avgValues[m]=arr[2]
                            }
                       break;


             case "Bushy Park Combined Borehole Flow Rate":
              if (this.variable.BUSH_GW_COMB_FLOW_RATE_arr.length==0){break;}
                else{
         var arr = this.MinMaxAvg(m,this.variable.BUSH_GW_COMB_FLOW_RATE_arr)!
         minValues[m]= arr[0]
         maxValues[m]=arr[1]
         avgValues[m]=arr[2]
                            }
                       break;


             case "Bushy Park Holding Tank Level":
              if ( this.variable.BUSH_TANK_LVL_arr.length==0){break;}
                else{
         var arr = this.MinMaxAvg(m,this.variable.BUSH_TANK_LVL_arr)!
         minValues[m]= arr[0]
         maxValues[m]=arr[1]
         avgValues[m]=arr[2]
                            }
                       break;




                case "Grassridge Inlet Flow":
                  if (this.variable.GR_R_INLET_Arr.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.GR_R_INLET_Arr)
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                       avgValues[m]=arr[2]

                     }
                     break;
                case "Grassridge Outlet Flow":
                  if (this.variable.GR_R_OUTLET_Arr.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.GR_R_OUTLET_Arr)
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                       avgValues[m]=arr[2]

                     }
                     break;


                     case "Humerail Borehol Level":
                      if (this.variable.HUM_GW_BOR_LVL_arr.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.HUM_GW_BOR_LVL_arr)
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                           avgValues[m]=arr[2]

                         }
                         break;

                         case "Humerail Raw Water Tank Level":
                          if (this.variable.HUM_GW_RAW_WATER_TANK_LVL_arr.length==0){
                            break;
                          }
                            else{
                              var arr = this.MinMaxAvg(m,this.variable.HUM_GW_RAW_WATER_TANK_LVL_arr)
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                               avgValues[m]=arr[2]

                             }
                             break;


                             case "Humerail Final Water Tank Level":
                              if (this.variable.HUM_GW_FIN_WAT_TANK_LVL_arr.length==0){
                                break;
                              }
                                else{
                                  var arr = this.MinMaxAvg(m,this.variable.HUM_GW_FIN_WAT_TANK_LVL_arr)
                                  minValues[m]= arr[0]
                                  maxValues[m]=arr[1]
                                   avgValues[m]=arr[2]

                                 }
                                 break;


            case "Chelsea Reservoir West Chamber Level":
              if (this.variable.CHE_West_array.length==0){
                break;
              }
                else{
                  var arr = this.MinMaxAvg(m,this.variable.CHE_West_array)!
                  minValues[m]= arr[0]
                  maxValues[m]=arr[1]
                  avgValues[m]=arr[2]
        }
              break;


            case "Chelsea Reservoir East Chamber Level":
              if (this.variable.CHE_East_array.length==0){
                break;
              }
                else{
                  var arr = this.MinMaxAvg(m,this.variable.CHE_East_array)!
                  minValues[m]= arr[0]
                  maxValues[m]=arr[1]
                  avgValues[m]=arr[2]
        }
              break;
              case "Chatty Flow Rate":
                if (this.variable.CHE_FlowRate_array.length==0){
                  break;
                }
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CHE_FlowRate_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
        }
                break;
              case "Grassridge East Chamber Level":
                if (this.variable.GR_EC_array.length==0){
                  break;
                }
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.GR_EC_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
        }
                break;

                case "Coega Kop to Coega IDZ Flow Rate":
                  if(this.variable.CGK_COEGA_FLOW_RATE_array.length==0){
                    break;
                  }else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_COEGA_FLOW_RATE_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                  case "Coega Kop Reservoir Pressure":
                  if(this.variable.CGK_PRESSURE_array.length==0) {
                    break;
                  }
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_PRESSURE_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                  case "Gamtoos Break Water Pressure":
                    if(this.variable.GBW_ACT_BAR_arr.length==0) {
                      break;
                    }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.GBW_ACT_BAR_arr)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
                    }
                    break;

                    case "Gamtoos Break Water Flow Rate":
                      if(this.variable.GBW_FLO_RAT_arr.length==0) {
                        break;
                      }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.GBW_FLO_RAT_arr)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
                      }
                      break;



                  case "Olifantskop Reservoir Level":
                    if(this.variable.OLI_LVL_array.length==0) {
                      break;
                    }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.OLI_LVL_array)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
                    }
                    break;


                    case "Bergendal Reservoir Level":
                      if(this.variable.BERGEN_RES_R_LVL_arr.length==0) {
                        break;
                      }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.variable.BERGEN_RES_R_LVL_arr)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
                      }
                      break;

                      case "Wolwas Reservoir Level":
                        if(this.variable.WOLWAS_RES_R_LVL_arr.length==0) {
                          break;
                        }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.WOLWAS_RES_R_LVL_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                        }
                        break;


                        case "Umasizakhe Reservoir Level":
                          if(this.variable.UMI_RES_R_LVL_arr.length==0) {
                            break;
                          }
                          else{
                            var arr = this.MinMaxAvg(m,this.variable.UMI_RES_R_LVL_arr)!
                            minValues[m]= arr[0]
                            maxValues[m]=arr[1]
                            avgValues[m]=arr[2]
                          }
                          break;

                          case "Kroonvale Reservoir Level":
                            if(this.variable.KROON_RES_R_LVL_arr.length==0) {
                              break;
                            }
                            else{
                              var arr = this.MinMaxAvg(m,this.variable.KROON_RES_R_LVL_arr)!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                            }
                            break;




                            case "Holding Reservoir Level":
                              if(this.variable.HOLDING_LVL_RES_LVL_arr.length==0) {
                                break;
                              }
                              else{
                                var arr = this.MinMaxAvg(m,this.variable.HOLDING_LVL_RES_LVL_arr)!
                                minValues[m]= arr[0]
                                maxValues[m]=arr[1]
                                avgValues[m]=arr[2]
                              }
                              break;

                              case "Damcamp Reservoir Level":
                                if(this.variable.DAMCAMP_LVL_RES_LVL_arr.length==0) {
                                  break;
                                }
                                else{
                                  var arr = this.MinMaxAvg(m,this.variable.DAMCAMP_LVL_RES_LVL_arr)!
                                  minValues[m]= arr[0]
                                  maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
                                }
                                break;


                                case "Tin Roof Reservoir Level":
                                  if(this.variable.TINROOF_LVL_RES_LVL_arr.length==0) {
                                    break;
                                  }
                                  else{
                                    var arr = this.MinMaxAvg(m,this.variable.TINROOF_LVL_RES_LVL_arr)!
                                    minValues[m]= arr[0]
                                    maxValues[m]=arr[1]
                                    avgValues[m]=arr[2]
                                  }
                                  break;

                case "Coega Kop Reservoir Level":
                  if(this.variable.CGK_LEVEL_array.length==0) {
                    break;
                  }
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_LEVEL_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                  case "Coega Kop to Coega IDZ Total Flow":
                  if(this.variable.CGK_COEGA_TOTAL_FLOW_array.length==0)
                  {break;}
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_COEGA_TOTAL_FLOW_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;


                  case "Coega Kop to Motherwell Total Flow":
                  if(this.variable.CGK_MOTHERWELL_TOTAL_FLOW_array.length==0)
                  {break;}
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_MOTHERWELL_TOTAL_FLOW_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                  case "Coega Kop from Grassridge Total Flow":
                  if(this.variable.CGK_GRASSRIDGE_TOTAL_FLOW_array.length==0)
                  {break;}
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_GRASSRIDGE_TOTAL_FLOW_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                case "Coega Kop to Motherwell Flow Rate":
                  if(this.variable.CGK_MOTHERWELL_FLOW_RATE_array.length==0) {
                    break;
                  } else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_MOTHERWELL_FLOW_RATE_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;


                case "Coega Kop from Grassridge Flow Rate":
                  if(this.variable.CGK_GRASSRIDGE_FLOW_RATE_array.length==0) {
                    break;
                  } else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_GRASSRIDGE_FLOW_RATE_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                case "Grassridge West Chamber Level":
                  if (this.variable.GR_WC_array.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.GR_WC_array)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
        }
                  break;

                  case "Van Stadens Reservoir Level":
                    if (this.variable.VSarray.length==0){
                      break;
                    }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.VSarray)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
        }
                    break;

                  case "Chatty North Chamber Level":
                      if (this.variable.CHT_NC_array.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.CHT_NC_array)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
        }
                    break;

                    case "Chatty Overhead Level":
                      if (this.variable.CHT_OR_array.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.CHT_OR_array)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                        }
                      break;

                      case "Chatty South Chamber Level":
                      if (this.variable.CHT_SC_array.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.CHT_SC_array)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                        }
                        break;

                        case "Van Riebeeck Hoogte Delivery Level":
                          if (this.variable.VRH_DL_array.length==0){
                            break;
                          }
                            else{
                              var arr = this.MinMaxAvg(m,this.variable.VRH_DL_array)!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                            }

                          break;

                          case "Van Riebeeck Hoogte Suction Level":
                            if (this.variable.VRH_SL_array.length==0){
                              break;
                            }
                              else{
                                var arr = this.MinMaxAvg(m,this.variable.VRH_SL_array)!
                                minValues[m]= arr[0]
                                maxValues[m]=arr[1]
                                avgValues[m]=arr[2]
                              }

                            break;

                            case "Lovemore Heights Reservoir Level":
                              if (this.variable.LHarray.length==0){
                                break;
                              }
                                else{
                                  var arr = this.MinMaxAvg(m,this.variable.LHarray)!
                                  minValues[m]= arr[0]
                                  maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
                                }

                              break;

                              case "Blue Horizon Bay Reservoir Level":
                                if (this.variable.BHB_array.length==0){
                                break;
                              }
                                else{
                                  var arr = this.MinMaxAvg(m,this.variable.BHB_array)!
                                  minValues[m]= arr[0]
                                  maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
        }
                                break;

                                case "Elandsjagt Flow Rate":
                                  if (this.variable.ELA_FR_arr.length==0){
                                  break;
                                }
                                  else{
                                    var arr = this.MinMaxAvg(m,this.variable.ELA_FR_arr)!
                                    minValues[m]= arr[0]
                                    maxValues[m]=arr[1]
                                    avgValues[m]=arr[2]
          }
                                  break;

                                  case "Elandsjagt Pressure":
                                    if (this.variable.ELA_P_arr.length==0){
                                    break;
                                  }
                                    else{
                                      var arr = this.MinMaxAvg(m,this.variable.ELA_P_arr)!
                                      minValues[m]= arr[0]
                                      maxValues[m]=arr[1]
                                      avgValues[m]=arr[2]
            }
                                    break;





                                  case "Schoemanshoek Pressure":
                                    if (this.variable.NMB_SCHOE_PRESSURE_array.length==0){
                                    break;
                                  }
                                    else{
                                      var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_PRESSURE_array)!
                                      minValues[m]= arr[0]
                                      maxValues[m]=arr[1]
                                      avgValues[m]=arr[2]
            }
                                    break;

                                    case "Schoemanshoek Level":
                                      if (this.variable.NMB_SCHOE_RES_LEVEL_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_RES_LEVEL_array)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                        avgValues[m]=arr[2]
              }
                                      break;


                                      case "Schoemanshoek Actuator Position":
                                        if (this.variable.NMB_SCHOE_ACTUATOR_POSITION_array.length==0){
                                        break;
                                      }
                                        else{
                                          var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_ACTUATOR_POSITION_array)!
                                          minValues[m]= arr[0]
                                          maxValues[m]=arr[1]
                                          avgValues[m]=arr[2]
                }
                                        break;

                                        case "Schoemanshoek Actuator Set Point":
                                          if (this.variable.NMB_SCHOE_ACTUATOR_SET_POINT_array.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_ACTUATOR_SET_POINT_array)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                  }
                                          break;

                                          case "Schoemanshoek Actuator Valve Feedback Signal":
                                            if (this.variable.nmb_schoe_r_actuator_valve_feedback_signal_error_arr.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_feedback_signal_error_arr)!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                              avgValues[m]=arr[2]
                    }
                                            break;




                                            case "Schoemanshoek Actuator Valve Command Signal":
                                              if (this.variable.nmb_schoe_r_actuator_valve_command_signal_error_arr.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_command_signal_error_arr)!
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                avgValues[m]=arr[2]
                      }
                                              break;


                                 case "Schoemanshoek Reservoir Level Signal Error":
                                   if (this.variable.nmb_schoe_r_reservoir_level_signal_error_arr.length==0){
                                   break;
                                 }
                                   else{
                                     var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_reservoir_level_signal_error_arr)!
                                     minValues[m]= arr[0]
                                     maxValues[m]=arr[1]
                                     avgValues[m]=arr[2]
                                  }
                                   break;




                                   case "Schoemanshoek Actuator Valve Fault":
                                     if (this.variable.nmb_schoe_r_actuator_valve_fault_arr.length==0){
                                     break;
                                   }
                                     else{
                                       var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_fault_arr)!
                                       minValues[m]= arr[0]
                                       maxValues[m]=arr[1]
                                       avgValues[m]=arr[2]
                                  }
                                     break;




                                     case "Schoemanshoek Actuator Valve Torque Fail Close":
                                      if (this.variable.nmb_schoe_r_actuator_valve_torque_fail_close_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.variable.nmb_schoe_r_actuator_valve_torque_fail_close_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                        avgValues[m]=arr[2]
                                     }
                                      break;




                                      case "Schoemanshoek Actuator Valve Torque Fail Open":
                                        if (this.variable.nmb_schoe_r_actuator_valve_torque_fail_open_arr.length==0){
                                        break;
                                      }
                                        else{
                                          var arr = this.MinMaxAvg(m,this.variable.variable.nmb_schoe_r_actuator_valve_torque_fail_open_arr)!
                                          minValues[m]= arr[0]
                                          maxValues[m]=arr[1]
                                          avgValues[m]=arr[2]
                                     }
                                        break;



                                        case "Schoemanshoek General Fault":
                                          if (this.variable.nmb_schoe_r_general_fault_arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.variable.nmb_schoe_r_general_fault_arr)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                                         }
                                          break;




                                          case "Schoemanshoek Actuator General Fault":
                                            if (this.variable.nmb_schoe_r_actuator_general_fault_arr.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.variable.nmb_schoe_r_actuator_general_fault_arr)!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                              avgValues[m]=arr[2]
                                         }
                                            break;



                                            case "Schoemanshoek Actuator Valve Timeout":
                                            if (this.variable.nmb_schoe_r_actuator_valve_timeout_arr.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.variable.nmb_schoe_r_actuator_valve_timeout_arr)!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                              avgValues[m]=arr[2]
                                         }
                                            break;

                                    case "Driftsands Reservoir Level":
                                      if (this.variable.drift_R_reservoir_level_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.variable.drift_R_reservoir_level_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                        avgValues[m]=arr[2]
                                      }
                                      break;

	                                 case "Driftsands Flow Rate 1":
                                      if (this.variable.drift_R_flow_rate_1_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.drift_R_flow_rate_1_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                        avgValues[m]=arr[2]
                                     }
                                      break;


		                               case "Driftsands Flow Rate 2":
                                      if (this.variable.drift_R_flow_rate_2_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.drift_R_flow_rate_2_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                        avgValues[m]=arr[2]
                                     }
                                      break;

                                      case "Driftsands Total Flow 1":
                                        if (this.variable.drift_R_total_flow_1_arr.length==0){
                                        break;
                                      }
                                        else{
                                          var arr = this.MinMaxAvg(m,this.variable.drift_R_total_flow_1_arr)!
                                          minValues[m]= arr[0]
                                          maxValues[m]=arr[1]
                                          avgValues[m]=arr[2]
                                       }
                                        break;


                                     case "Driftsands Total Flow 2":
                                        if (this.variable.drift_R_total_flow_2_arr.length==0){
                                        break;
                                      }
                                        else{
                                          var arr = this.MinMaxAvg(m,this.variable.drift_R_total_flow_2_arr)!
                                          minValues[m]= arr[0]
                                          maxValues[m]=arr[1]
                                          avgValues[m]=arr[2]
                                       }
                                        break;



                                    case "Emerald Hill Reservoir Level":
                                      if (this.variable.EMER_H_Level_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.EMER_H_Level_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                        avgValues[m]=arr[2]
                                      }
                                      break;

                                      case "Emerald Hill Flow Rate":
                                        if (this.variable.EMER_H_Flow_Rate_arr.length==0){
                                        break;
                                      }
                                        else{
                                          var arr = this.MinMaxAvg(m,this.variable.EMER_H_Flow_Rate_arr)!
                                          minValues[m]= arr[0]
                                          maxValues[m]=arr[1]
                                          avgValues[m]=arr[2]
                }
                                        break;

                                        case "Emerald Hill Total Flow":
                                          if (this.variable.EMER_H_Total_Flow_arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.EMER_H_Total_Flow_arr)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                  }
                     break;




                    case "Humansdorp Off Take Total Flow":
                      if (this.variable.HUM_OFF_TAKE_TF_arr.length==0){
                      break;
                    }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.HUM_OFF_TAKE_TF_arr)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
                                  }
                       break;

                       case "Humansdorp Off Take Pressure":
                      if (this.variable.HUM_OFF_TAKE_BAR_arr.length==0){
                      break;
                    }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.HUM_OFF_TAKE_BAR_arr)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
                                  }
                       break;

                       case "Humansdorp Off Take Battery Level":
                        if (this.variable.HUM_OFF_TAKE_BAT_arr.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.HUM_OFF_TAKE_BAT_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                                    }
                         break;

                       case "Jeffreys Bay Off Take Total Flow":
                        if (this.variable.JEFF_OFF_TAKE_TF_arr.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.JEFF_OFF_TAKE_TF_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                                    }
                         break;

                         case "Jeffreys Bay Off Take Battery Level":
                          if (this.variable.JEFF_OFF_TAKE_BAT_arr.length==0){
                          break;
                        }
                          else{
                            var arr = this.MinMaxAvg(m,this.variable.JEFF_OFF_TAKE_BAT_arr)!
                            minValues[m]= arr[0]
                            maxValues[m]=arr[1]
                            avgValues[m]=arr[2]
                                      }
                           break;

                         case "Kouga Main Line Pressure":
                        if (this.variable.KOU_MAIN_LINE_BAR_arr.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.KOU_MAIN_LINE_BAR_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                                    }
                         break;


                         case "Kouga Main Line Battery Level":
                          if (this.variable.KOU_MAIN_LINE_BAT_arr.length==0){
                          break;
                        }
                          else{
                            var arr = this.MinMaxAvg(m,this.variable.KOU_MAIN_LINE_BAT_arr)!
                            minValues[m]= arr[0]
                            maxValues[m]=arr[1]
                            avgValues[m]=arr[2]
                                      }
                           break;

                         case "Ons Paradys Total Flow":
                        if (this.variable.ONS_PARA_TF_arr.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.ONS_PARA_TF_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                                    }
                         break;

                         case "Ons Paradys Battery Level":
                          if (this.variable.ONS_PARA_BAT_arr.length==0){
                          break;
                        }
                          else{
                            var arr = this.MinMaxAvg(m,this.variable.ONS_PARA_BAT_arr)!
                            minValues[m]= arr[0]
                            maxValues[m]=arr[1]
                            avgValues[m]=arr[2]
                                      }
                           break;


                         case "St Francis Offtake Total Flow":
                          if (this.variable.ST_FRAN_OFF_TF_arr.length==0){
                          break;
                        }
                          else{
                            var arr = this.MinMaxAvg(m,this.variable.ST_FRAN_OFF_TF_arr)!
                            minValues[m]= arr[0]
                            maxValues[m]=arr[1]
                            avgValues[m]=arr[2]
                                      }
                           break;


                           case "Paradise Beach Total Flow":
                            if (this.variable.PARA_BEA_TF_arr.length==0){
                            break;
                          }
                            else{
                              var arr = this.MinMaxAvg(m,this.variable.PARA_BEA_TF_arr)!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                                        }
                             break;

                             case "Paradise/St Francis Battery Level":
                              if (this.variable.ST_FRAN_PARA_BEA_BAT_arr.length==0){
                              break;
                            }
                              else{
                                var arr = this.MinMaxAvg(m,this.variable.ST_FRAN_PARA_BEA_BAT_arr)!
                                minValues[m]= arr[0]
                                maxValues[m]=arr[1]
                                avgValues[m]=arr[2]
                                          }
                               break;



                                case "Rosedale Reservoir Level":
                                  if (this.variable.RD_LVL_array.length==0){
                                  break;
                                }
                                  else{
                                    var arr = this.MinMaxAvg(m,this.variable.RD_LVL_array)!
                                    minValues[m]= arr[0]
                                    maxValues[m]=arr[1]
                                    avgValues[m]=arr[2]
          }
                                  break;

                                  case "Summit Reservoir Level":
                                    if (this.variable.SM_LVL_array.length==0){
                                    break;
                                  }
                                    else{
                                      var arr = this.MinMaxAvg(m,this.variable.SM_LVL_array)!
                                      minValues[m]= arr[0]
                                      maxValues[m]=arr[1]
                                      avgValues[m]=arr[2]
            }
                                    break;

                                    case "Summit Flow Rate":
                                  if (this.variable.SM_FR_array.length==0){
                                  break;
                                }
                                  else{
                                    var arr = this.MinMaxAvg(m,this.variable.SM_FR_array)!
                                    minValues[m]= arr[0]
                                    maxValues[m]=arr[1]
                                    avgValues[m]=arr[2]
          }
                                  break;

                                case "Theescombe Reservoir Level":
                                  if (this.variable.TCarray.length==0){
                                    break;
                                  }
                                    else{
                                 var arr = this.MinMaxAvg(m,this.variable.TCarray)!
                                 minValues[m]= arr[0]
                                 maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
        }
                                  break;

                                  case "Heatherbank Reservoir Level":
                                    if (this.variable.HBarray.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.HBarray)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]
        }
                                  break;
                          // FPT Sites
                                  case "Bethelsdorp Battery Level":
                                    if (this.variable.BETH_BATTERY_STATUS_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.BETH_BATTERY_STATUS_array)
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

                                       }
                                       break;
                                  case "Bethelsdorp Total Flow":
                                    if (this.variable.BETH_TOTAL_FLOW_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.BETH_TOTAL_FLOW_array)
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

                                       }
                                       break;
                                  case "Bethelsdorp Pressure":
                                    if (this.variable.BETH_PRESS_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.BETH_PRESS_array)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

                                       }
                                       break;
                              case "Bethelsdorp Flow Rate":
                                    if (this.variable.BETH_FLOW_RATE_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.BETH_FLOW_RATE_array)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

                                  }
                                  break;



                                  case "FM Tower Flow Rate":
                                    if (this.variable.FMT_FR_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.FMT_FR_array)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

        }
                                      break;


                                      case "FM Tower Total Flow":
                                        if (this.variable.FMT_TF_array.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.FMT_TF_array)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                             avgValues[m]=arr[2]

            }
                                          break;

                                      case "FM Tower Pressure":
                                        if (this.variable.FMT_PRESS_array.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.FMT_PRESS_array )!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                             avgValues[m]=arr[2]

        }
                                      break;

                                      case "Coega IDZ Flow Rate":
                                        if (this.variable.IDZ_FR_array.length==0){
                                        break;
                                      }
                                        else{
                                          var arr = this.MinMaxAvg(m,this.variable.IDZ_FR_array )!
                                          minValues[m]= arr[0]
                                          maxValues[m]=arr[1]
                                          avgValues[m]=arr[2]
                }
                                        break;

                                        case "Coega Motherwell Flow Rate":
                                          if (this.variable.IDZ_MW_FR_array.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.IDZ_MW_FR_array)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                  }
                                          break;

                                          case "Gamtoos Bridge Steel Pipe Flow Rate":
                                            if (this.variable.GT_BRG_STL_FR_array.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.GT_BRG_STL_FR_array)!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                              avgValues[m]=arr[2]
                    }
                                            break;

                                            case "Gamtoos Bridge Socoman Pipe Flow Rate":
                                              if (this.variable.GT_BRG_SOCO_FR_array.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.GT_BRG_SOCO_FR_array)!
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                avgValues[m]=arr[2]
                      }
                                              break;

                                              case "Gamtoos Bridge Steel Pipe Pressure":
                                                if (this.variable.GT_BRG_STL_PRESS_array.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.GT_BRG_STL_PRESS_array)!
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                        }
                                                break;

                                                case "Gamtoos Bridge Socoman Pipe Pressure":
                                                  if (this.variable.GT_BRG_SOCO_PRESS_array.length==0){
                                                  break;
                                                }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.GT_BRG_SOCO_PRESS_array)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                          }
                                                  break;

                                              case "Uitenhage Flow Chamber Flow Rate":
                                                if (this.variable.UIT_FC_FR_array.length==0){
                                                  break;
                                                }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.UIT_FC_FR_array)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                      }
                                                break;

                                                case "Uitenhage Flow Chamber Pressure":
                                                  if (this.variable.CG_CSP_Arr.length==0){
                                                    break;
                                                  }
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.UIT_FC_PRESS_array)!
                                                      minValues[m]= arr[0]
                                                      maxValues[m]=arr[1]
                                                      avgValues[m]=arr[2]
                                                        }
                                                  break;

                                      // Pump Stations
                                      case "Storms River Holding Reservoir Level":
                                        if (this.variable.STORMS_GORGE_LEVEL_Arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.STORMS_GORGE_LEVEL_Arr)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
        }
                                        break;


                                      case "Storms River Overhead Tank Level":
                                        if (this.variable.STORMS_OVERHEAD_TANK_LEVEL_Arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.STORMS_OVERHEAD_TANK_LEVEL_Arr)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
        }
                                        break;


                                      case "Storms River Quarry Level":
                                        if (this.variable.STORMS_QUARRY_LEVEL_Arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.STORMS_QUARRY_LEVEL_Arr)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
        }
                                        break;


                                      case "Storms River Gorge Level":
                                        if (this.variable.STORMS_GORGE_LEVEL_Arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.STORMS_GORGE_LEVEL_Arr)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
        }
                                        break;


                                      case "Crown Gardens Suction Pressure":
                                        if (this.variable.CG_CSP_Arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.CG_CSP_Arr )!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
        }
                                        break;

                                        case "Crown Gardens Delivery Pressure":
                                          if (this.variable.CG_CDP_Arr.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.CG_CDP_Arr )!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                               avgValues[m]=arr[2]
        }
                                        break;

                                        case "Crown Gardens Sump Level":
                                          if (this.variable.CG_S_LVL_Arr.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.CG_S_LVL_Arr )!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                               avgValues[m]=arr[2]

        }
                                          break;

                                          case "Crown Gardens Tower 1 Level":
                                            if (this.variable.CG_T1_LVL_Arr.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.CG_T1_LVL_Arr)!
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                 avgValues[m]=arr[2]
        }
                                          break;

                                          case "Crown Gardens Tower 1 Inlet Flow":
                                            if (this.variable.CG_T1_IF_Arr.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.CG_T1_IF_Arr)
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                 avgValues[m]=arr[2]
        }
                                          break;

                                          case "Crown Gardens Tower 1 Outlet Flow":
                                            if (this.variable.CG_T1_OF_Arr.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.CG_T1_OF_Arr)
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                avgValues[m]=arr[2]
        }
                                            break;

                                            case "Crown Gardens Tower 2 Level":
                                              if (this.variable.CG_T2_LVL_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CG_T2_LVL_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
        }
                                            break;

                                            case "Crown Gardens Tower 2 Inlet Flow":
                                              if (this.variable.CG_T2_IF_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CG_T2_IF_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
        }
                                            break;

                                            case "Crown Gardens Tower 2 Outlet Flow":
                                              if (this.variable.CG_T2_OF_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CG_T2_OF_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "NMU Effluent Flow Rate":
                                              if (this.variable.NMU_EFF_FR_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_FR_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "NMU Effluent Delivery Pressure":
                                              if (this.variable.NMU_EFF_DP_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_DP_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "NMU Effluent Dam Level":
                                              if (this.variable.NMU_EFF_DAM_LVL_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_DAM_LVL_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "NMU Effluent Pump 1 Speed":
                                              if (this.variable.NMU_EFF_P1_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_P1_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "NMU Effluent Pump 2 Speed":
                                              if (this.variable.NMU_EFF_P2_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_P2_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "NMU Effluent Pump 3 Speed":
                                              if (this.variable.NMU_EFF_P3_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_P3_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "NMU Effluent Jockey Pump Speed":
                                              if (this.variable.NMU_EFF_JP_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_JP_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 1 Actual Speed":
                                              if (this.variable.CHE_PS_P1_ACTUAL_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P1_ACTUAL_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 1 Delivery Pressure":
                                              if (this.variable.CHE_PS_P1_DEL_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P1_DEL_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 1 Suction Pressure":
                                              if (this.variable.CHE_PS_P1_SUCT_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P1_SUCT_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "Chelsea Pumpstation 2 Actual Speed":
                                              if (this.variable.CHE_PS_P2_ACTUAL_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P2_ACTUAL_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 2 Delivery Pressure":
                                              if (this.variable.CHE_PS_P2_DEL_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P2_DEL_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 2 Suction Pressure":
                                              if (this.variable.CHE_PS_P2_SUCT_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P2_SUCT_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 3 Actual Speed":
                                              if (this.variable.CHE_PS_P3_ACTUAL_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P3_ACTUAL_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 3 Delivery Pressure":
                                              if (this.variable.CHE_PS_P3_DEL_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P3_DEL_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 3 Suction Pressure":
                                              if (this.variable.CHE_PS_P3_SUCT_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.variable.CHE_PS_P3_SUCT_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "Chelsea Pumpstation 4 Actual Speed":
                                              if (this.variable.CHE_PS_P4_ACTUAL_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.variable.CHE_PS_P4_ACTUAL_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 4 Delivery Pressure":
                                              if (this.variable.CHE_PS_P4_DEL_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.variable.CHE_PS_P4_DEL_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 4 Suction Pressure":
                                              if (this.variable. CHE_PS_P4_SUCT_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P4_SUCT_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 700 Flow Rate":
                                              if (this.variable.CHE_PS_700_FLOW_RATE_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_700_FLOW_RATE_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Motherwell Flow Rate":
                                              if (this.variable.MW_BPS_FlowRate_Arr.length == 0){
                                                break;
                                              }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.MW_BPS_FlowRate_Arr)
                                                minValues[m]= arr[0]
                                                maxValues[m]= arr[1]
                                                avgValues[m]=arr[2]
                                              }
                                              break;

                                              case "Motherwell Suction Pressure":
                                                if (this.variable.MW_BPS_SuctionPressure_Arr.length == 0){
                                                  break;
                                                }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.MW_BPS_SuctionPressure_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]= arr[1]
                                                  avgValues[m]=arr[2]
                                                }
                                                break;
                                                case "Motherwell Delivery Pressure":
                                                  if (this.variable.MW_BPS_DeliveryPressure_Arr.length == 0){
                                                    break;
                                                  }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.MW_BPS_DeliveryPressure_Arr)
                                                    minValues[m]= arr[0]
                                                    maxValues[m]= arr[1]
                                                    avgValues[m]=arr[2]
                                                  }
                                                  break;


                                                  case "Motherwell Reservoir Level":
                                                    if (this.variable.MW_LVL_array.length == 0){
                                                      break;
                                                    }
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.MW_LVL_array)
                                                      minValues[m]= arr[0]
                                                      maxValues[m]= arr[1]
                                                      avgValues[m]=arr[2]
                                                    }
                                                    break;

                                            //Ground Water
                                            case "Newton Park Pool Pressure":
                                              if(this.variable.NMBM_NPP_GW_PRESSURE_Arr.length ==0){
                                                break;
                                              }
                                              else{
                                                var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_PRESSURE_Arr)

                                                minValues[m]= arr[0]
                                                maxValues[m]= arr[1]
                                                avgValues[m]=arr[2]
                                              }break;

                                              case "Newton Park Pool Flow Rate":
                                                if(this.variable.NMBM_NPP_GW_FLOW_RATE_Arr.length ==0){
                                                  break;
                                                }
                                                else{
                                                  var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_FLOW_RATE_Arr)

                                                  minValues[m]= arr[0]
                                                  maxValues[m]= arr[1]
                                                  avgValues[m]=arr[2]
                                                }break;

                                                case "Newton Park Pool Water Level":
                                                  if(this.variable.NMBM_NPP_GW_LEVEL_Arr.length ==0){
                                                    break;
                                                  }
                                                  else{
                                                    var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_LEVEL_Arr)
                                                    minValues[m]= arr[0]
                                                    maxValues[m]= arr[1]
                                                    avgValues[m]=arr[2]
                                                  }break;

                                                case "Newton Park Pool Total Flow":
                                                  if(this.variable.NMBM_NPP_GW_TOTAL_FLOW_Arr.length == 0){
                                                    break;
                                                  }
                                                  else{
                                                    var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_TOTAL_FLOW_Arr)
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                  }break;


                                                  case "Humansdorp 1 Water Level":
                                                    if(this.variable.KLM_HUP_WATER_LEVEL_Arr.length ==0){
                                                      break;
                                                    }
                                                    else{
                                                      var arr=this.MinMaxAvg(m, this.variable.KLM_HUP_WATER_LEVEL_Arr )

                                                      minValues[m]= arr[0]
                                                      maxValues[m]= arr[1]
                                                      avgValues[m]=arr[2]
                                                    }break;

                                                    case "Humansdorp 1 Flow Rate":
                                                      if(this.variable.KLM_HUP_FLOWRATE_Arr.length ==0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr=this.MinMaxAvg(m, this.variable.KLM_HUP_FLOWRATE_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]= arr[1]
                                                        avgValues[m]=arr[2]
                                                      }break;

                                                    case "Humansdorp 1 Total Flow":
                                                      if(this.variable.KLM_HUP_TOTALFLOW_Arr.length == 0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr=this.MinMaxAvg(m, this.variable.KLM_HUP_TOTALFLOW_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]=arr[1]
                                                        avgValues[m]=arr[2]
                                                      }break;



                                                  case "Humansdorp 2C Water Level":
                                                    if(this.variable.KLM_HUP2_WATER_LEVEL_Arr.length ==0){
                                                      break;
                                                    }
                                                    else{
                                                      var arr=this.MinMaxAvg(m, this.variable.KLM_HUP2_WATER_LEVEL_Arr)

                                                      minValues[m]= arr[0]
                                                      maxValues[m]= arr[1]
                                                      avgValues[m]=arr[2]
                                                    }break;

                                                    case "Humansdorp 2C Flow Rate":
                                                      if(this.variable.KLM_HUP2_FLOWRATE_Arr.length ==0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr=this.MinMaxAvg(m, this.variable.KLM_HUP2_FLOWRATE_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]= arr[1]
                                                        avgValues[m]=arr[2]
                                                      }break;

                                                    case "Humansdorp 2C Total Flow":
                                                      if(this.variable.KLM_HUP2_TOTALFLOW_Arr.length == 0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr=this.MinMaxAvg(m, this.variable.KLM_HUP2_TOTALFLOW_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]=arr[1]
                                                        avgValues[m]=arr[2]
                                                      }break;

                                                      case "Humansdorp 3 Water Level":
                                                        if(this.variable.KLM_HUP3_WATER_LEVEL_Arr.length ==0){
                                                          break;
                                                        }
                                                        else{
                                                          var arr=this.MinMaxAvg(m, this.variable.KLM_HUP3_WATER_LEVEL_Arr)

                                                          minValues[m]= arr[0]
                                                          maxValues[m]= arr[1]
                                                          avgValues[m]=arr[2]
                                                        }break;

                                                        case "Humansdorp 3 Flow Rate":
                                                          if(this.variable.KLM_HUP3_FLOWRATE_Arr.length ==0){
                                                            break;
                                                          }
                                                          else{
                                                            var arr=this.MinMaxAvg(m, this.variable.KLM_HUP3_FLOWRATE_Arr)
                                                            minValues[m]= arr[0]
                                                            maxValues[m]= arr[1]
                                                            avgValues[m]=arr[2]
                                                          }break;

                                                        case "Humansdorp 3 Total Flow":
                                                          if(this.variable.KLM_HUP3_TOTALFLOW_Arr.length == 0){
                                                            break;
                                                          }
                                                          else{
                                                            var arr=this.MinMaxAvg(m, this.variable.KLM_HUP3_TOTALFLOW_Arr)
                                                            minValues[m]= arr[0]
                                                            maxValues[m]=arr[1]
                                                            avgValues[m]=arr[2]
                                                          }break;



                                                          case "Humansdorp 4 Water Level ":
                                                            if(this.variable.KLM_HUP4_WATER_LEVEL_Arr.length ==0){
                                                              break;
                                                            }
                                                            else{
                                                              var arr=this.MinMaxAvg(m, this.variable.KLM_HUP4_WATER_LEVEL_Arr)

                                                              minValues[m]= arr[0]
                                                              maxValues[m]= arr[1]
                                                              avgValues[m]=arr[2]
                                                            }break;

                                                            case "Humansdorp 4 Flow Rate":
                                                              if(this.variable.KLM_HUP4_FLOWRATE_Arr.length ==0){
                                                                break;
                                                              }
                                                              else{
                                                                var arr=this.MinMaxAvg(m, this.variable.KLM_HUP4_FLOWRATE_Arr)
                                                                minValues[m]= arr[0]
                                                                maxValues[m]= arr[1]
                                                                avgValues[m]=arr[2]
                                                              }break;

                                                            case "Humansdorp 4 Total Flow":
                                                              if(this.variable.KLM_HUP4_TOTALFLOW_Arr.length == 0){
                                                                break;
                                                              }
                                                              else{
                                                                var arr=this.MinMaxAvg(m, this.variable.KLM_HUP4_TOTALFLOW_Arr)
                                                                minValues[m]= arr[0]
                                                                maxValues[m]=arr[1]
                                                                avgValues[m]=arr[2]
                                                              }break;




                                                              case "Humansdorp 6 Water Level":
                                                                if(this.variable.KLM_HUP6_WATER_LEVEL_Arr.length ==0){
                                                                  break;
                                                                }
                                                                else{
                                                                  var arr=this.MinMaxAvg(m, this.variable.KLM_HUP6_WATER_LEVEL_Arr)

                                                                  minValues[m]= arr[0]
                                                                  maxValues[m]= arr[1]
                                                                  avgValues[m]=arr[2]
                                                                }break;

                                                                case "Humansdorp 6 Flow Rate":
                                                                  if(this.variable.KLM_HUP6_FLOWRATE_Arr.length ==0){
                                                                    break;
                                                                  }
                                                                  else{
                                                                    var arr=this.MinMaxAvg(m, this.variable.KLM_HUP6_FLOWRATE_Arr)
                                                                    minValues[m]= arr[0]
                                                                    maxValues[m]= arr[1]
                                                                    avgValues[m]=arr[2]
                                                                  }break;

                                                                case "Humansdorp 6 Total Flow":
                                                                  if(this.variable.KLM_HUP6_TOTALFLOW_Arr.length == 0){
                                                                    break;
                                                                  }
                                                                  else{
                                                                    var arr=this.MinMaxAvg(m, this.variable.KLM_HUP6_TOTALFLOW_Arr)
                                                                    minValues[m]= arr[0]
                                                                    maxValues[m]=arr[1]
                                                                    avgValues[m]=arr[2]
                                                                  }break;


                                            //Stanford Road Road
                                            case "Stanford Road Flow Rate":
                                              if(this.variable.STAN_BPS_FlowRate_Arr.length == 0){
                                                break;
                                              }
                                              else{
                                                var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_FlowRate_Arr)
                                                minValues[m]= arr[0]
                                                maxValues[m]= arr[1]
                                                avgValues[m]=arr[2]
                                              }
                                              break;
                                              case "Stanford Road Delivery Pressure":
                                                if(this.variable.STAN_BPS_DeliveryPressure_Arr.length == 0){
                                                  break;
                                                }
                                                else{
                                                  var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_DeliveryPressure_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]= arr[1]
                                                  avgValues[m]=arr[2]
                                                }
                                                break;
                                                case "Stanford Road Suction Pressure":
                                                  if(this.variable.STAN_BPS_SuctionPressure_Arr.length == 0){
                                                    break;
                                                  }
                                                  else{
                                                    var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_SuctionPressure_Arr)
                                                    minValues[m]= arr[0]
                                                    maxValues[m]= arr[1]
                                                    avgValues[m]=arr[2]
                                                  }
                                                 break;
                                                  case "Stanford Road Pump 1 Frequency":
                                                    if(this.variable.STAN_BPS_P1_FREQ_Arr.length == 0){
                                                      break;
                                                    }
                                                    else{
                                                      var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P1_FREQ_Arr)
                                                      minValues[m]= arr[0]
                                                      maxValues[m]= arr[1]
                                                      avgValues[m]=arr[2]
                                                    }
                                                    break;
                                                    case "Stanford Road Pump 2 Frequency":
                                                      if(this.variable.STAN_BPS_P2_FREQ_Arr.length == 0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P2_FREQ_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]= arr[1]
                                                        avgValues[m]=arr[2]
                                                      }
                                                      break;
                                                      case "Stanford Road Pump 3 Frequency":
                                                        if(this.variable.STAN_BPS_P3_FREQ_Arr.length == 0){
                                                          break;
                                                        }
                                                        else{
                                                          var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P3_FREQ_Arr)
                                                          minValues[m]= arr[0]
                                                          maxValues[m]= arr[1]
                                                          avgValues[m]=arr[2]
                                                        }
                                                        break;


                                                        case "Stanford Road Pump 4 Frequency":
                                                          if(this.variable.STAN_BPS_P4_FREQ_Arr.length == 0){
                                                            break;
                                                          }
                                                          else{
                                                            var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P4_FREQ_Arr)
                                                            minValues[m]= arr[0]
                                                            maxValues[m]= arr[1]
                                                            avgValues[m]=arr[2]
                                                          }
                                                          break;
                                            //Water Treatment Works
                                            case "Nooitgedacht High Level Flow Rate":
                                              if (this.variable.WTW_NGT_FM_HIGH_FR_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.WTW_NGT_FM_HIGH_FR_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Nooitgedacht Low Level Flow Rate":
                                              if (this.variable.WTW_NGT_FM_LOW_FR_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.WTW_NGT_FM_LOW_FR_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

      }

    }
    for(var i = 0; i < sitesChosen.length;i++)
    {
      this.ELEMENT_DATA[i]={ name: sitesChosen[i],min:minValues[i],max:maxValues[i],average:avgValues[i]};
    }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.filter = this.filterValue.trim().toLowerCase();
    }

     MinMaxAvg(m:any, siteArray:any[]) {
      var maxValues=[]
        var minValues=[]
        var avgValues=[]
          var avg: any = 0
    maxValues[m] = siteArray[0][1]
    minValues[m] = siteArray[0][1]
    avgValues[m] = siteArray[0][1]

    for (let i = 0; i < siteArray.length; i++) {

    if (maxValues[m]<siteArray[i][1]) {
    maxValues[m] = siteArray[i][1]
    }
    if (minValues[m]>siteArray[i][1]) {
    minValues[m] = siteArray[i][1]
    }

    avg  = siteArray[i][1] + avg
    }
    avg = (avg/siteArray.length).toFixed(2)
    avgValues[m]=avg

    var arr =[minValues[m],maxValues[m],avg]
    return arr



  }



}

