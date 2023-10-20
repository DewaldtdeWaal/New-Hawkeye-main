const express = require("express");
const { CONSOLE_APPENDER } = require("karma/lib/constants");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const gvar = require("../variables")



   router.post("/trends/reslevels/customrestrends", (req,res,next)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;

var st_georges_wtw_gw_FR_arr = []
var st_georges_wtw_gw_TF_arr = []
var st_georges_wtw_emer_hill_FR_arr = []
var st_georges_wtw_emer_hill_TF_arr = []

var klm_hup_wtw_flow_arr = []
var klm_hup_wtw_tf_arr = []

var klm_kruis_res_lvl_arr = []

var BERGEN_RES_R_LVL_arr =[]
var WOLWAS_RES_R_LVL_arr = []
var UMI_RES_R_LVL_arr = []
var KROON_RES_R_LVL_arr = []
var TINROOF_LVL_RES_LVL_arr = []
var DAMCAMP_LVL_RES_LVL_arr = []
var HOLDING_LVL_RES_LVL_arr = []

  var NMB_SCHOE_PRESSURE_array = []
  var NMB_SCHOE_RES_LEVEL_array = []
  var NMB_SCHOE_ACTUATOR_POSITION_array = []
  var NMB_SCHOE_ACTUATOR_SET_POINT_array = []
  var nmb_schoe_r_actuator_valve_feedback_signal_error_arr = []
  var nmb_schoe_r_actuator_valve_command_signal_error_arr = []
  var nmb_schoe_r_reservoir_level_signal_error_arr = []
  var nmb_schoe_r_actuator_valve_fault_arr = []
  var nmb_schoe_r_actuator_valve_torque_fail_close_arr = []
  var nmb_schoe_r_actuator_valve_torque_fail_open_arr = []
  var nmb_schoe_r_general_fault_arr = []
  var nmb_schoe_r_actuator_general_fault_arr = []
  var nmb_schoe_r_actuator_valve_timeout_arr = []




  //WDNR_ROSE_RES_OUT01
var WDNR_ROSE_TF_arr = []
var WDNR_ROSE_FR_arr = []

  //WDSR_ROWP_DMA_FLM01
var WDSR_ROWP_BAR_arr = []
var WDSR_ROWP_TF_arr = []
var WDSR_ROWP_FR_arr = []

  var DRS_LH_RES_LVL_arr = []

  var BUSH_CHURCH_SOCO_FR_arr = []
  var  BUSH_CHURCH_STEEL_FR_arr = []
  var BUSH_CHURCH_SOCCO_BAR_arr = []
  var BUSH_CHURCH_STEEL_BAR_arr = []
  var BUSH_PUMP_FR_arr = []
  var BUSH_GW_COMB_FLOW_RATE_arr = []
  var BUSH_TANK_LVL_arr = []
  var BUSH_STEEL_TF_arr = []
  var BUSH_SOCO_TF_arr = []
var BUSH_PUMP_TF_arr = []
  var BUSH_GW_TF_arr = []

  var HUM_GW_BOR_LVL_arr = []
  var HUM_GW_RAW_WATER_TANK_LVL_arr = []
  var HUM_GW_FIN_WAT_TANK_LVL_arr = []

  var AIR_PRT_LVL_arr = [];


  var KARK_K1_TF_arr = []
  var KARK_K1_FR_arr = []
  var KARK_K1_CUR_arr = []
  var KARK_K1_LVL_arr = []
  var KARK_K2_TF_arr = []
  var KARK_K2_FR_arr = []
  var KARK_K2_CUR_arr = []
  var KARK_K2_LVL_arr = []

  var GBW_ACT_BAR_arr = []
  var GBW_FLO_RAT_arr = []

  var DEMO_TEMP_arr = []

   var OLI_LVL_array = []
   var CGK_PRESSURE_array=[]
   var CGK_LEVEL_array = []
   var CGK_MOTHERWELL_FLOW_RATE_array = []
   var CGK_GRASSRIDGE_FLOW_RATE_array = []
   var CGK_COEGA_FLOW_RATE_array=[]
   var  CGK_MOTHERWELL_TOTAL_FLOW_array =[]
   var CGK_GRASSRIDGE_TOTAL_FLOW_array=[]
   var CGK_COEGA_TOTAL_FLOW_array=[]
   var GBarray=[];
   var GBFRarray = [];
   var CGK_KOP_NC_17_ML_array= []

   var CHE_FlowRate_array=[];


   var CHE_East_array=[];
   var CHE_West_array=[];
   var CHE_R_FR1200_arr = [];
   var CHE_R_FR600_arr = [];
   var CHE_R_TF600_arr = [];
   var CHE_R_TF1200_arr = [];

   var GR_EC_array=[];
   var GR_WC_array=[];
   var VSarray=[];
   var CHT_NC_array=[];
   var CHT_OR_array=[];
   var CHT_SC_array=[];
   var VRH_DL_array=[];
   var VRH_SL_array=[];
   var HBarray=[];
   var hb_P1_CURRENT_arr = []
   var hb_P2_CURRENT_arr = []
   var hb_P3_CURRENT_arr = []
   var hb_P1_RH_arr = []
   var hb_P2_RH_arr = []
   var hb_P3_RH_arr = []

   var LHarray=[];
   var LH_R_LVL_ARR=[]
   var TCarray=[];
   var BHB_array =[];
   var RD_LVL_array =[];
   var SM_LVL_array=[];
   var SM_FR_array=[];
   var GR_R_INLET_Arr = [];
   var GR_R_OUTLET_Arr = [];

   var EMER_H_Level_arr = [];
   var EMER_H_Flow_Rate_arr = [];
   var EMER_H_Total_Flow_arr = [];

  var LSD_FLOW_RATE_arr = [];
  var LSD_PRESSURE_arr = []
  var LSD_TOTAL_FLOW_arr = []


  var McNougTown_FLOW_RATE_arr = [];
  var McNougTown_PRESSURE_arr = []
  var McNougTown_TOTAL_FLOW_arr = []


var KWANO_R_RES_LVL_arr = []
var KWANO_R_FLOW_RATE_1_arr = []
var KWANO_R_FLOW_RATE_2_arr = []
var KWANO_R_TOTAL_FLOW_1_arr = []
var KWANO_R_TOTAL_FLOW_2_arr = []


 var drift_R_reservoir_level_arr = []
 var drift_R_flow_rate_1_arr = []
 var drift_R_flow_rate_2_arr = []
 var drift_R_total_flow_1_arr = []
 var drift_R_total_flow_2_arr = []

//FPT sites
   var BETH_PRESS_array=[];
   var BETH_FLOW_RATE_array=[];
   var BETH_BATTERY_STATUS_array=[];
   var BETH_TOTAL_FLOW_array=[];
   var FMT_FR_array =[];
   var FMT_TF_array = []
   var FMT_PRESS_array=[];
   var IDZ_FR_array =[];
   var IDZ_MW_FR_array=[];
   var GT_BRG_STL_FR_array=[];
   var GT_BRG_SOCO_FR_array=[];
   var GT_BRG_STL_PRESS_array=[];
   var GT_BRG_SOCO_PRESS_array=[];
   var UIT_FC_FR_array=[];
   var UIT_FC_PRESS_array=[];

   var STORMS_QUARRY_LEVEL_Arr=[];
   var STORMS_GORGE_LEVEL_Arr=[];
   var STORMS_HOLDING_RESERVOIR_LEVEL_Arr=[];
   var STORMS_OVERHEAD_TANK_LEVEL_Arr=[];

   var HUM_OFF_TAKE_TF_arr = [];
   var HUM_OFF_TAKE_BAR_arr = [];
   var HUM_OFF_TAKE_BAT_arr = []
   var JEFF_OFF_TAKE_TF_arr = [];
   var JEFF_OFF_TAKE_BAT_arr = []
   var KOU_MAIN_LINE_BAR_arr = [];
   var KOU_MAIN_LINE_BAT_arr = [];
   var ONS_PARA_TF_arr = [];
   var ONS_PARA_BAT_arr = []
   var ST_FRAN_OFF_TF_arr = [];
   var PARA_BEA_TF_arr = [];
   var ST_FRAN_PARA_BEA_BAT_arr =[];


// pump Stations
   var CG_CSP_Arr= [];
   var CG_CDP_Arr= [];
   var CG_S_LVL_Arr= [];
   var CG_T1_LVL_Arr= [];
   var CG_T1_IF_Arr= [];
   var CG_T1_OF_Arr= [];
   var CG_T2_LVL_Arr= [];
   var CG_T2_IF_Arr= [];
   var CG_T2_OF_Arr= [];

   var CHE_PS_P1_ACTUAL_SPEED_Arr = [];
   var CHE_PS_P1_DEL_PRESS_Arr = [];
   var CHE_PS_P1_SUCT_PRESS_Arr = [];
   var CHE_PS_P2_ACTUAL_SPEED_Arr = [];
   var CHE_PS_P2_DEL_PRESS_Arr = [];
   var CHE_PS_P2_SUCT_PRESS_Arr = [];
   var CHE_PS_P3_ACTUAL_SPEED_Arr = [];
   var CHE_PS_P3_DEL_PRESS_Arr = [];
   var CHE_PS_P3_SUCT_PRESS_Arr = [];
   var CHE_PS_P4_ACTUAL_SPEED_Arr = [];
   var CHE_PS_P4_DEL_PRESS_Arr = [];
   var CHE_PS_P4_SUCT_PRESS_Arr = [];
   var CHE_PS_700_FLOW_RATE_Arr = [];
   var CHE_PS_700_TOTAL_FLOW_Arr = [];



   var isuzu_oven1_vsd_speed_arr = [];
   var isuzu_oven1_heat_ecvh_temp_arr = []
   var isuzu_oven1_temp1_arr = []
   var isuzu_oven1_temp2_arr = []
   var isuzu_oven2_vsd_speed_arr =[]
   var isuzu_oven2_heat_ecvh_temp_arr =[]
   var isuzu_oven2_temp1_arr=[]
   var isuzu_oven2_temp2_arr=[]



  var  NMU_EFF_FR_Arr=[];
  var NMU_EFF_DP_Arr =[];
  var NMU_EFF_DAM_LVL_Arr =[];
  var NMU_EFF_P1_SPEED_Arr =[];
  var NMU_EFF_P2_SPEED_Arr =[];
  var NMU_EFF_P3_SPEED_Arr =[];
  var NMU_EFF_JP_SPEED_Arr =[];
  var MW_BPS_FlowRate_Arr =[];
  var MW_BPS_DeliveryPressure_Arr =[];
  var MW_BPS_SuctionPressure_Arr =[];
  var MW_LVL_array =[];


  //Ground Water
  var NMBM_NPP_GW_PRESSURE_Arr = [];
  var NMBM_NPP_GW_FLOW_RATE_Arr = [];
  var NMBM_NPP_GW_LEVEL_Arr = [];
  var NMBM_NPP_GW_TOTAL_FLOW_Arr = [];
  var KLM_HUP_WATER_LEVEL_Arr = [];
  var KLM_HUP_FLOWRATE_Arr = [];
  var KLM_HUP_TOTALFLOW_Arr = [];
  var KLM_HUP2_WATER_LEVEL_Arr = [];
  var KLM_HUP2_FLOWRATE_Arr = [];
  var KLM_HUP2_TOTALFLOW_Arr = [];
  var KLM_HUP3_WATER_LEVEL_Arr = [];
  var KLM_HUP3_FLOWRATE_Arr = [];
  var KLM_HUP3_TOTALFLOW_Arr = [];
  var KLM_HUP4_WATER_LEVEL_Arr = [];
  var KLM_HUP4_FLOWRATE_Arr = [];
  var KLM_HUP4_TOTALFLOW_Arr = [];
  var KLM_HUP6_WATER_LEVEL_Arr = [];
  var KLM_HUP6_FLOWRATE_Arr = [];
  var KLM_HUP6_TOTALFLOW_Arr = [];
  //Stanford Road
  var STAN_BPS_SuctionPressure_Arr =[];
  var STAN_BPS_DeliveryPressure_Arr =[];
  var STAN_BPS_FlowRate_Arr =[];
  var STAN_BPS_P1_FREQ_Arr =[];
  var STAN_BPS_P2_FREQ_Arr =[];
  var STAN_BPS_P3_FREQ_Arr =[];
  var STAN_BPS_P4_FREQ_Arr =[];


  var  klm_kruis12_lvl_arr=[];
  var  klm_kruis12_current_arr=[];
  var  klm_kruis12_bar_arr=[];
  var  klm_kruis12_flow_rate_arr=[];
  var  klm_kruis12_total_flow_arr=[];
  var  klm_kruis13_lvl_arr=[];
  var  klm_kruis13_current_arr=[];
  var  klm_kruis13_bar_arr=[];
  var  klm_kruis13_flow_rate_arr=[];
  var  klm_kruis13_total_flow_arr=[];
  var  klm_kruis14_lvl_arr=[];
  var  klm_kruis14_current_arr=[];
  var  klm_kruis14_bar_arr=[];
  var  klm_kruis14_flow_rate_arr=[];
  var  klm_kruis14_total_flow_arr=[];


  var mala_lvl_arr = [];

// WTW
var WTW_NGT_FM_LOW_FR_Arr = [];
var WTW_NGT_FM_HIGH_FR_Arr = [];
var ELA_FR_arr = [];
var ELA_P_arr = [];

//#endregion


    i = 0;
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
         var dbo = db.db("HawkEye");

if(req.body.startDate==null &&req.body.endDate==null){
  var dateBefore =  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
         var now =  new Date();
         dateNow =now;
         var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });
}
else{
  var start = req.body.startDate
  start = start + "T00:00:00.000+02:00"
  var end = req.body.endDate
  end = end + "T23:59:59.000+02:00"
      var query = ({ date: { $gte:new Date(start) , $lte:new Date(end) } });
}

count=0
sitesChosen = req.body.sites



if (sitesChosen==null){}else{
for ( i = 0; i < sitesChosen.length; i++) {
switch(sitesChosen[i]){
  //Resiovar





  case "Isuzu Oven 1 VSD Speed":
  trendData(isuzu_oven1_vsd_speed_arr,"isuzu_oven1_vsd_speed","ISUZU_TREND",query)
  count++;
  break;

  case "Isuzu Oven 1 Heat Exchanger Temperature":
    trendData(isuzu_oven1_heat_ecvh_temp_arr,"isuzu_oven1_heat_ecvh_temp","ISUZU_TREND",query)
  count++;
  break;

  case "Isuzu Oven 1 Temperature 1":
  trendData(isuzu_oven1_temp1_arr,"isuzu_oven1_temp1","ISUZU_TREND",query)
  count++;
  break;

  case "Isuzu Oven 1 Temperature 2":
  trendData(isuzu_oven1_temp2_arr,"isuzu_oven1_temp2","ISUZU_TREND",query)
  count++;
  break;

  case "Isuzu Oven 2 VSD Speed":
  trendData(isuzu_oven2_vsd_speed_arr,"isuzu_oven2_vsd_speed","ISUZU_TREND",query)
  count++;
  break;

  case "Isuzu Oven 2 Heat Exchanger Temperature":
  trendData(isuzu_oven2_heat_ecvh_temp_arr,"isuzu_oven2_heat_ecvh_temp","ISUZU_TREND",query)
  count++;
  break;

  case "Isuzu Oven 2 Temperature 1":
  trendData(isuzu_oven2_temp1_arr,"isuzu_oven2_temp1","ISUZU_TREND",query)
  count++;
  break;

  case "Isuzu Oven 2 Temperature 2":
  trendData(isuzu_oven2_temp2_arr,"isuzu_oven2_temp2","ISUZU_TREND",query)
  count++;
  break;

  case "Coega Kop Inlet Chamber 2 Ml":
    trendData(CGK_LEVEL_array,"level","NMBM_CGK_R_Trend", query);
    count++;
    break;

  case "Coega Kop Reservoir Pressure":
    trendData(CGK_PRESSURE_array,"pressure","NMBM_CGK_R_Trend",query)
  count++;
  break;

  case "Coega Kop North Chamber 17 Ml":
    trendData(CGK_KOP_NC_17_ML_array,"coe_kop_cloud_r_level","NMBM_CGK_R_Trend",query);
    count++
  break;


case "Demo Temp Level":
  trendData(DEMO_TEMP_arr,"level", "DEMO_TREND", query)
  count++;
  break;
  case "Coega Kop to Motherwell Flow Rate":
    trendData(CGK_MOTHERWELL_FLOW_RATE_array,"nmb_cgk_r_motherwell_outlet_flow_rate","NMBM_CGK_R_Trend",query)
count++;
break;
  case "Coega Kop from Grassridge Flow Rate":
    trendData(CGK_GRASSRIDGE_FLOW_RATE_array,"nmb_cgk_r_grassridge_inlet_flow_rate","NMBM_CGK_R_Trend",query)
  count++;
  break;

  case "Coega Kop to Coega IDZ Flow Rate":
    trendData(CGK_COEGA_FLOW_RATE_array,"nmb_cgk_r_coega_idz_outlet_flow_rate","NMBM_CGK_R_Trend",query)
    count++;
    break;

  case "Coega Kop to Coega IDZ Total Flow":
    TOTALFLOWTRENDDATA(CGK_COEGA_TOTAL_FLOW_array,"coegatotalflow","NMBM_CGK_R_TotalFlow",query)
    count++;
    break;

    case "Kruisfontein Reservoir Level":
      trendData(klm_kruis_res_lvl_arr, "level", "KLM_KRUIS_RES_LVL", query)
      count++;
      break;

      case "Lee Samuals Drive Flow Rate":
        trendData(LSD_FLOW_RATE_arr,"flowrate1","WDNR_LSAM_DMA_FLM01", query )
        count++;
        break;

        case "Lee Samuals Drive Total Flow":
          trendData(LSD_TOTAL_FLOW_arr,"totaliser1","WDNR_LSAM_DMA_FLM01", query)
          count++;
          break;

          case "Lee Samuals Drive Pressure":
            trendData(LSD_PRESSURE_arr,"pressure1","WDNR_LSAM_DMA_FLM01", query)
            count++;
          break;


          case "McNoughton Township South Flow Rate":
            trendData(McNougTown_FLOW_RATE_arr,"flowrate1","WDNR_MCNA_DMA_FLM01", query )
            count++;
            break;

            case "McNoughton Township South Total Flow":
              trendData(McNougTown_TOTAL_FLOW_arr,"totaliser1","WDNR_MCNA_DMA_FLM01", query)
              count++;
              break;

              case "McNoughton Township South Pressure":
                trendData(McNougTown_PRESSURE_arr,"pressure1","WDNR_MCNA_DMA_FLM01", query)
                count++;
              break;


case "Greenbushes Flow Rate":
  trendData(GBFRarray, "gb_R_FR","BR_GB_RES_LVL",query)
 count++;
 break;

 case "Greenbushes Reservoir Level":
  trendData(GBarray, "level","BR_GB_RES_LVL",query)
 count++;
 break;

case "Coega Kop to Motherwell Total Flow":
  TOTALFLOWTRENDDATA(CGK_MOTHERWELL_TOTAL_FLOW_array,"motherwelltotalflow","NMBM_CGK_R_TotalFlow",query)
  count++;
  break;

  case "Gamtoos Break Water Pressure":
    trendData(GBW_ACT_BAR_arr, "gbw_actual_pressure","NMNM_GWB_BAR_FLOW",query)
  count++
  break

  case "Gamtoos Break Water Flow Rate":
    trendData(GBW_FLO_RAT_arr,"gbw_flow_rate","NMNM_GWB_BAR_FLOW",query)
    count++
    break

case "Coega Kop from Grassridge Total Flow":
  TOTALFLOWTRENDDATA(CGK_GRASSRIDGE_TOTAL_FLOW_array,"grassridgetotalflow","NMBM_CGK_R_TotalFlow",query)
  count++;
  break;

case "Holding Reservoir Level":
  trendData(HOLDING_LVL_RES_LVL_arr,"level", "HOL_GRAAF_RES_LVL", query  )
  count++
  break;

  case "Damcamp Reservoir Level":
    trendData(DAMCAMP_LVL_RES_LVL_arr,"level", "DAMP_GRAAF_RES_LVL", query  )
  count++
  break;

  case "Tin Roof Reservoir Level":
    trendData(TINROOF_LVL_RES_LVL_arr,"level", "TIN_GRAAF_RES_LVL", query  )
  count++
  break;

case "Olifantskop Reservoir Level":
  trendData(OLI_LVL_array,"level", "OLI_LVL_TREND", query  )
  count++
  break;

case "Blue Horizon Bay Reservoir Level":
  trendData(BHB_array,"level", "DRS_BHB_RES_LVL", query  )
   count++;
break;

case "Grassridge East Chamber Level":
  trendData(GR_EC_array,"level", "BR_GR_EC_RES_LVL", query  )
   count++;
break;
case "Grassridge West Chamber Level":
  trendData(GR_WC_array,"level", "BR_GR_WC_RES_LVL", query  )
   count++;
break;
case "Van Stadens Reservoir Level":
  trendData(VSarray,"level", "BR_VS_RES_LVL", query  )
   count++;
break;
case "Chatty North Chamber Level":
  trendData(CHT_NC_array,"level", "DRN_CHT_NC_RES_LVL", query  )
   count++;
break;

case "Chatty Overhead Level":
  trendData(CHT_OR_array,"level", "DRN_CHT_OR_RES_LVL", query  )
   count++;
break;

case "Chatty South Chamber Level":
  trendData(CHT_SC_array,"level", "DRN_CHT_SC_RES_LVL", query  )
   count++;
break;

case "Van Riebeeck Hoogte Delivery Level":
  trendData(VRH_DL_array,"level", "DRN_VRH_DL_RES_LVL", query  )
   count++;
break;

case "Van Riebeeck Hoogte Suction Level":
  trendData(VRH_SL_array,"level", "DRN_VRH_SL_RES_LVL", query  )
   count++;
break;

case "Motherwell Reservoir Level":
  trendData(MW_LVL_array,"level", "NMB_MW_RES_LVL", query  )
  count++;
break;

case "Heatherbank Reservoir Level":
  trendData(HBarray,"level", "DRS_HB_RES_LVL", query  )
   count++;
break;


case "Heatherbank Pumpstation 1 Current":
  trendData(hb_P1_CURRENT_arr,"hb_P1_CURRENT", "DRS_HB_RES_LVL", query)
  count++;
  break;


  case "Heatherbank Pumpstation 2 Current":
    trendData(hb_P2_CURRENT_arr,"hb_P2_CURRENT", "DRS_HB_RES_LVL", query)
    count++;
  break;

  case "Heatherbank Pumpstation 3 Current":
    trendData(hb_P3_CURRENT_arr,"hb_P3_CURRENT", "DRS_HB_RES_LVL", query)
    count++;
    break;


    case "Heatherbank Pumpstation 1 Run Hours":
      trendData(hb_P1_RH_arr,"hb_P1_RH", "DRS_HB_PS_TF", query)
      count++;
      break;

      case "Heatherbank Pumpstation 2 Run Hours":
        trendData(hb_P2_RH_arr,"hb_P2_RH", "DRS_HB_PS_TF", query)
        count++;
      break;

      case "Heatherbank Pumpstation 3 Run Hours":
        trendData(hb_P3_RH_arr,"hb_P3_RH", "DRS_HB_PS_TF", query)
        count++;
      break;


case "Lovemore Heights Reservoir Level":
  trendData(LHarray,"lh_Res_lvl", "DRS_LH_RES_LVL", query  )
   count++;
break;

case "Theescombe Reservoir Level":
  trendData(TCarray,"level", "DRS_TC_RES_LVL", query  )
   count++;
break;
case "Rosedale Reservoir Level":
  trendData(RD_LVL_array,"level", "BR_RD_RES_LVL", query  )
   count++;
break;
case "Summit Reservoir Level":
  trendData(SM_LVL_array,"level", "BR_SM_TREND", query  )
   count++;
break;

case "Storms River Quarry Level":
  trendData(STORMS_QUARRY_LEVEL_Arr,"ps_storms_quarry_level","STORMS_PS_TREND", query)
  count++;
  break;

  case "Storms River Gorge Level":
    trendData(STORMS_GORGE_LEVEL_Arr,"ps_storms_gorge_level","STORMS_PS_TREND", query)
    count++;
    break;

    case "Storms River Holding Reservoir Level":
      trendData(STORMS_HOLDING_RESERVOIR_LEVEL_Arr,"wtw_storms_holding_reservoir_level","STORMS_WTW_TREND", query)
  count++;
  break;

  case "Storms River Overhead Tank Level":
    trendData(STORMS_OVERHEAD_TANK_LEVEL_Arr,"wtw_storms_overhead_tank_level","STORMS_WTW_TREND", query)
    count++;
    break;

    case "Humansdorp Off Take Total Flow":
      TOTALFLOWTRENDDATA(HUM_OFF_TAKE_TF_arr,"humansdorp_off_TF","HUMANSDORP_OFF_TAKE_TF",query)
    count++;
    break;

    case "Humansdorp Off Take Pressure":
      trendData(HUM_OFF_TAKE_BAR_arr,"humansdorp_off_take_pressure","HUMANSDORP_OFF_TAKE",query)
    count++;
    break;

    case "Humansdorp Off Take Battery Level":
      trendData(HUM_OFF_TAKE_BAT_arr,"humansdorp_off_take_battery_level","HUMANSDORP_OFF_TAKE",query)
      count++;
      break;

    case "Kouga Main Line Battery Level":
      trendData(KOU_MAIN_LINE_BAT_arr,"kou_main_line_battery_level","KOU_MAIN_LINE",query)
      count++;
      break;

      case "Kouga Main Line Pressure":
        trendData(KOU_MAIN_LINE_BAR_arr,"kou_main_line_pressure","KOU_MAIN_LINE",query)
      count++;
      break;

      case "St Francis Offtake Total Flow":
        TOTALFLOWTRENDDATA(ST_FRAN_OFF_TF_arr,"jb_ST_Francis_OffTake_Total_Flow","JB_PB_SFO_TOTAL_FLOW",query)
        count++;
        break;

        case "Paradise Beach Total Flow":
          TOTALFLOWTRENDDATA(PARA_BEA_TF_arr,"jb_Para_Bea_TF","JB_PB_SFO_TOTAL_FLOW",query)
        count++;
        break;

      case "Paradise/St Francis Battery Level":
        trendData(ST_FRAN_PARA_BEA_BAT_arr,"jb_PB_SFO_battery_level","JB_PB_SFO_BATTERY",query)
      count++;
      break;

      case "Ons Paradys Battery Level":
        trendData(ONS_PARA_BAT_arr,"ons_para_battery_level","ONS_PARA_BATTERY",query)
      count++;
      break;

      case "Ons Paradys Total Flow":
        TOTALFLOWTRENDDATA(ONS_PARA_TF_arr,"ons_para_TF","ONS_PARA_TOTAL_FLOW", query)
        count++;
        break;

      case "Jeffreys Bay Off Take Total Flow":
        TOTALFLOWTRENDDATA(JEFF_OFF_TAKE_TF_arr,"jeff_bay_off_take_total_flow","JEFF_BAY_TAKE_OFF",query)
      count++;
      break

      case "Jeffreys Bay Off Take Battery Level":
        trendData(JEFF_OFF_TAKE_BAT_arr,"jeff_bay_off_take_battery_level", "JEFF_BAY_TAKE_OFF_Battery_Level",query)
      count++;
      break;

    case "Grassridge Inlet Flow":
      trendData(GR_R_INLET_Arr,"gr_R_INLET_FLOWS","GRASS_RIDGE_RES_FLOW_RATES", query)
      count++;
      break;

    case "Grassridge Outlet Flow":
      trendData(GR_R_OUTLET_Arr,"gr_R_OUTLET_FLOW","GRASS_RIDGE_RES_FLOW_RATES", query)
      count++;
      break;

  case "Elandsjagt Flow Rate":
    trendData(ELA_FR_arr,"wtw_elands_FR","WTW_ELANDS_TREND",query)
    count++;
    break;

  case "Elandsjagt Pressure":
    trendData(ELA_P_arr,"wtw_elands_P","WTW_ELANDS_TREND",query)
    count++;
    break;

    case "FM Tower Flow Rate":
      trendData(FMT_FR_array, "flowRate", "FM_FMT_TREND", query)
      count++;
      break;

      case "FM Tower Total Flow":
        TOTALFLOWTRENDDATA(FMT_TF_array, "totalflow", "FM_FMT_TF", query)
      count++;
      break;

      case "FM Tower Pressure":
        trendData(FMT_PRESS_array, "pressure","FM_FMT_TREND", query)
        count++;
        break;

 case "Coega IDZ Flow Rate":
  trendData(IDZ_FR_array, "idz_FR", "FPT_IDZT_FRs", query)
  count++;
  break;

case "Coega Motherwell Flow Rate":
  trendData(IDZ_MW_FR_array, "motherwell_FR", "FPT_IDZT_FRs", query)
  count++;
  break;

case "Gamtoos Bridge Steel Pipe Flow Rate":
  trendData(GT_BRG_STL_FR_array, "steel_pipe_FR", "FPT_GT_BRG_TREND", query)
  count++;
  break;

  case "Gamtoos Bridge Socoman Pipe Flow Rate":
    trendData(GT_BRG_SOCO_FR_array, "socoman_pipe_FR", "FPT_GT_BRG_TREND", query);
    count++;
    break;

    case "Gamtoos Bridge Steel Pipe Pressure":
      trendData(GT_BRG_STL_PRESS_array, "steel_pipe_PRESS", "FPT_GT_BRG_TREND", query);
      count++;
      break

      case "Uitenhage Flow Chamber Flow Rate":
        trendData(UIT_FC_FR_array, "flow_rate", "FPT_UIT_FC_TREND", query);
        count++;
        break;

   case "Uitenhage Flow Chamber Pressure":
    trendData(UIT_FC_PRESS_array, "pressure", "FPT_UIT_FC_TREND", query);
    count++;
     break;

     case "Summit Flow Rate":
      trendData(SM_FR_array, "flowRate", "BR_SM_TREND", query);
      count++;
       break;

       case "Nooitgedacht High Level Flow Rate":
        trendData(WTW_NGT_FM_HIGH_FR_Arr ,"high_level_flow_rate" ,"WTW_NGT_FM_TREND", query);
        count++;
        break;

        case "Nooitgedacht Low Level Flow Rate":
          trendData(WTW_NGT_FM_LOW_FR_Arr ,"low_level_flow_rate" ,"WTW_NGT_FM_TREND", query);
          count++;
          break;

  case "Gamtoos Bridge Socoman Pipe Pressure":
    trendData(GT_BRG_SOCO_PRESS_array, "socoman_pipe_PRESS", "FPT_GT_BRG_TREND", query);
    count++;
    break;

case "Driftsands Reservoir Level":
  trendData(drift_R_reservoir_level_arr,'drift_r_reservoir_level',"NMB_DRIFT_RES_LVL",query)
count++;
break;

case "Driftsands Flow Rate 1":
  trendData(drift_R_flow_rate_1_arr,'drift_r_flow_rate_1',"NMB_DRIFT_RES_LVL",query)
count++;
break;

case "Driftsands Flow Rate 2":
  trendData(drift_R_flow_rate_2_arr,'drift_r_flow_rate_2',"NMB_DRIFT_RES_LVL",query)
count++;
break;

case "Driftsands Total Flow 1":
  TOTALFLOWTRENDDATA(drift_R_total_flow_1_arr,"drift_r_total_flow_1","NMB_DRIFT_TOTAL_FLOW",query)
count++;
break;

case "Driftsands Total Flow 2":
  TOTALFLOWTRENDDATA(drift_R_total_flow_2_arr,"drift_r_total_flow_2","NMB_DRIFT_TOTAL_FLOW",query)
count++;
break;

case "Bethelsdorp Pressure":
  trendData(BETH_PRESS_array ,'pressure' ,"FPT_BETH_TREND",query)
count++;
break;
case "Bethelsdorp Flow Rate":
  trendData( BETH_FLOW_RATE_array,'flowrate',"FPT_BETH_TREND",query)
count++;
break;

case "Chatty Flow Rate":
  trendData(CHE_FlowRate_array,'flowRate', "DRN_CHT_RES_TF",query)
count++;
break;

case "Bethelsdorp Battery Level":
  trendData(BETH_BATTERY_STATUS_array,'batterylvl',"FPT_BETH_TF",query)
count++;
break;
case "Bethelsdorp Total Flow":
  TOTALFLOWTRENDDATA(BETH_TOTAL_FLOW_array,'totalFlow',"FPT_BETH_TF",query)
count++;
break;

//Pump Station Sites
case"Crown Gardens Suction Pressure":
trendData(CG_CSP_Arr,'common_suction_pressure',"RW_CG_PS_TREND",query)
count++;
break;

case"Crown Gardens Delivery Pressure":
trendData(CG_CDP_Arr,'common_delivery_pressure',"RW_CG_PS_TREND",query)
count++;
break;
case"Crown Gardens Sump Level":
trendData(CG_S_LVL_Arr,'sump_level',"RW_CG_PS_TREND",query)
count++;
break;
case"Crown Gardens Tower 1 Level":
trendData(CG_T1_LVL_Arr,'tower1_level',"RW_CG_PS_TREND",query)
count++;
break;
case"Crown Gardens Tower 1 Inlet Flow":
trendData(CG_T1_IF_Arr,'tower1_inlet_flow',"RW_CG_PS_TREND",query)
count++;
break;
case"Crown Gardens Tower 1 Outlet Flow":
trendData(CG_T1_OF_Arr,'tower1_outlet_flow',"RW_CG_PS_TREND",query)
count++;
break;
case"Crown Gardens Tower 2 Level":
trendData(CG_T2_LVL_Arr,'tower2_level',"RW_CG_PS_TREND",query)
count++;
break;
case"Crown Gardens Tower 2 Inlet Flow":
trendData(CG_T2_IF_Arr,'tower2_inlet_flow',"RW_CG_PS_TREND",query)
count++;
break;
case"Crown Gardens Tower 2 Outlet Flow":
trendData(CG_T2_OF_Arr,'tower2_outlet_flow',"RW_CG_PS_TREND",query)
count++;
break;

case"NMU Effluent Flow Rate":
trendData(NMU_EFF_FR_Arr,"flowRate","WW_PS_NMU_EFF_TREND",query)
count++;
break;

case"NMU Effluent Delivery Pressure":
trendData(NMU_EFF_DP_Arr,"delivery_pressure","WW_PS_NMU_EFF_TREND",query)
count++;
break;

case"NMU Effluent Dam Level":
trendData(NMU_EFF_DAM_LVL_Arr,"dam_level","WW_PS_NMU_EFF_TREND",query)
count++;
break;

case"NMU Effluent Pump 1 Speed":
trendData(NMU_EFF_P1_SPEED_Arr,"p1_speed","WW_PS_NMU_EFF_TREND",query)
count++;
break;

case"NMU Effluent Pump 2 Speed":
trendData(NMU_EFF_P2_SPEED_Arr,"p2_speed","WW_PS_NMU_EFF_TREND",query)
count++;
break;

case"NMU Effluent Pump 3 Speed":
trendData(NMU_EFF_P3_SPEED_Arr,"p3_speed","WW_PS_NMU_EFF_TREND",query)
count++;
break;

case"NMU Effluent Jockey Pump Speed":
trendData(NMU_EFF_JP_SPEED_Arr,"jp_speed","WW_PS_NMU_EFF_TREND",query)
count++;
break;

case "Motherwell Flow Rate":
trendData(MW_BPS_FlowRate_Arr, "flowRate","NMBM_MW_PS_Trend",query)
count++;
break;

case "Motherwell Delivery Pressure":
trendData(MW_BPS_DeliveryPressure_Arr, "delivery_pressure","NMBM_MW_PS_Trend",query)
count++;
break;

case "Motherwell Suction Pressure":
trendData(MW_BPS_SuctionPressure_Arr, "suction_pressure","NMBM_MW_PS_Trend",query)
count++;
break;

case "Motherwell Suction Pressure":
trendData(MW_BPS_SuctionPressure_Arr, "suction_pressure","NMBM_MW_PS_Trend",query)
count++;
break;

case "Chelsea Pumpstation 1 Actual Speed":
  trendData(CHE_PS_P1_ACTUAL_SPEED_Arr,"che_ps_pumpset_1_vsd_actual_speed","CHELSEA_PS_TREND", query)
count++;
break;


case "Chelsea Pumpstation 1 Delivery Pressure":
  trendData(CHE_PS_P1_DEL_PRESS_Arr,"che_ps_pumpset_1_del_pressure","CHELSEA_PS_TREND",query)
count++;
break;

case "Chelsea Pumpstation 1 Suction Pressure":
  trendData(CHE_PS_P1_SUCT_PRESS_Arr,"che_ps_pumpset_1_suct_pressure","CHELSEA_PS_TREND", query)
count++;
break;

case "Chelsea Pumpstation 2 Actual Speed":
trendData(CHE_PS_P2_ACTUAL_SPEED_Arr,"che_ps_pumpset_2_vsd_actual_speed","CHELSEA_PS_TREND", query)
count++;
break;

      case "Chelsea Pumpstation 2 Delivery Pressure":
      trendData(CHE_PS_P2_DEL_PRESS_Arr,"che_ps_pumpset_2_del_pressure","CHELSEA_PS_TREND", query)
      count++;
      break;

      case "Chelsea Pumpstation 2 Suction Pressure":
        trendData(CHE_PS_P2_SUCT_PRESS_Arr,"che_ps_pumpset_2_suct_pressure","CHELSEA_PS_TREND", query)
        count++;
        break;

  case "Chelsea Pumpstation 3 Actual Speed":
  trendData(CHE_PS_P3_ACTUAL_SPEED_Arr,"che_ps_pumpset_3_vsd_actual_speed","CHELSEA_PS_TREND", query)
  count++;
  break;


  case "Chelsea Pumpstation 3 Delivery Pressure":
  trendData(CHE_PS_P3_DEL_PRESS_Arr,"che_ps_pumpset_3_del_pressure","CHELSEA_PS_TREND", query)
  count++;
  break;

  case "Chelsea Pumpstation 3 Suction Pressure":
    trendData(CHE_PS_P3_SUCT_PRESS_Arr,"che_ps_pumpset_3_suct_pressure","CHELSEA_PS_TREND", query)
    count++;
    break;

case "Chelsea Pumpstation 4 Actual Speed":
trendData(CHE_PS_P4_ACTUAL_SPEED_Arr,"che_ps_pumpset_4_vsd_actual_speed","CHELSEA_PS_TREND", query)
count++;
break;


case "Chelsea Pumpstation 4 Delivery Pressure":
trendData(CHE_PS_P4_DEL_PRESS_Arr,"che_ps_pumpset_4_del_pressure","CHELSEA_PS_TREND", query)
count++;
break;

      case "Chelsea Pumpstation 4 Suction Pressure":
        trendData(CHE_PS_P4_SUCT_PRESS_Arr,"che_ps_pumpset_4_suct_pressure","CHELSEA_PS_TREND", query)
        count++;
        break;

      case "Chelsea Pumpstation 700 Flow Rate":
        trendData(CHE_PS_700_FLOW_RATE_Arr,"che_ps_700_flow_rate","CHELSEA_PS_TREND", query)
        count++;
        break;

      case "Chelsea Pumpstation 700 Total Flow":
        trendData(CHE_PS_700_TOTAL_FLOW_Arr,"che_ps_700_total_flow","CHEL_TF_TREND",query)
        count++;
        break;


//Ground Water
case "Newton Park Pool Pressure":
  trendData(NMBM_NPP_GW_PRESSURE_Arr, "delivery_pressure","NMBM_NPP_GW_TREND",query)
count++;
break;


case "Newton Park Pool Flow Rate":
  trendData(NMBM_NPP_GW_FLOW_RATE_Arr, "flowRate","NMBM_NPP_GW_TREND",query)
count++;
break;

case "Newton Park Pool Water Level":
  trendData(NMBM_NPP_GW_LEVEL_Arr,"level","NMBM_NPP_GW_TREND",query)
count++;
break;

case "Newton Park Pool Total Flow":
  TOTALFLOWTRENDDATA(NMBM_NPP_GW_TOTAL_FLOW_Arr,"totalflow","NPP_TF_Trend", query)
count++;
  break;

  case "Schoemanshoek Pressure":
    trendData(NMB_SCHOE_PRESSURE_array,"nmb_schoe_r_pressure","NMB_SCHOE_FLOW_RATE",query)
  count++;
  break;

  case "Schoemanshoek Level":
    trendData(NMB_SCHOE_RES_LEVEL_array,"nmb_schoe_r_res_level","NMB_SCHOE_FLOW_RATE",query)
    count++;
    break;

  case "Schoemanshoek Actuator Position":
    trendData(NMB_SCHOE_ACTUATOR_POSITION_array,"nmb_schoe_r_actuator_position","NMB_SCHOE_FLOW_RATE",query)
    count++;
    break;

    case "Schoemanshoek Actuator Set Point":
      trendData(NMB_SCHOE_ACTUATOR_SET_POINT_array,"nmb_schoe_r_actuator_set_point","NMB_SCHOE_FLOW_RATE",query)
      count++;
      break;

 case "Schoemanshoek Actuator Valve Feedback Signal":
   trendData(nmb_schoe_r_actuator_valve_feedback_signal_error_arr,"nmb_schoe_r_actuator_valve_feedback_signal_error","NMB_SCHOE_FAULT",query)
   count++;
   break;

   case "Schoemanshoek Actuator Valve Command Signal":
     trendData(nmb_schoe_r_actuator_valve_command_signal_error_arr,"nmb_schoe_r_actuator_valve_command_signal_error","NMB_SCHOE_FAULT",query)
     count++;
     break;

     case "Schoemanshoek Reservoir Level Signal Error":
       trendData(nmb_schoe_r_reservoir_level_signal_error_arr,"nmb_schoe_r_reservoir_level_signal_error","NMB_SCHOE_FAULT",query)
     count++;
     break;

     case "Schoemanshoek Actuator Valve Fault":
       trendData(nmb_schoe_r_actuator_valve_fault_arr,"nmb_schoe_r_actuator_valve_fault","NMB_SCHOE_FAULT",query)
       count++;
       break;

  case "Schoemanshoek Actuator Valve Torque Fail Close":
    trendData(nmb_schoe_r_actuator_valve_torque_fail_close_arr,"nmb_schoe_r_actuator_valve_torque_fail_close","NMB_SCHOE_FAULT",query)
    count++;
    break;

    case "Schoemanshoek Actuator Valve Torque Fail Open":
      trendData(nmb_schoe_r_actuator_valve_torque_fail_open_arr,"nmb_schoe_r_actuator_valve_torque_fail_open","NMB_SCHOE_FAULT",query)
    count++;
    break;

    case "Lovemore Heights Overhead Tank":
      trendData(DRS_LH_RES_LVL_arr, "level", "DRS_LH_RES_LVL", query)
      count++;
      break;

    case "Schoemanshoek General Fault":
      trendData(nmb_schoe_r_general_fault_arr,"nmb_schoe_r_general_fault","NMB_SCHOE_FAULT",query)
      count++;
      break;

      case "Schoemanshoek Actuator General Fault":
        trendData(nmb_schoe_r_actuator_general_fault_arr,"nmb_schoe_r_actuator_general_fault","NMB_SCHOE_FAULT",query)
        count++;
        break;

        case "Schoemanshoek Actuator Valve Timeout":
          trendData(nmb_schoe_r_actuator_valve_timeout_arr,"nmb_schoe_r_actuator_valve_timeout","NMB_SCHOE_FAULT",query)
        count++;
        break;

        case "Bushy Park Soccoman Flow Rate":
          trendData(BUSH_CHURCH_SOCO_FR_arr,"bush_church_socco_fr","NMB_BUSH_FlowRate" ,query)
          count++;
          break;

   case "Bushy Park Steel Flow Rate":
     trendData(BUSH_CHURCH_STEEL_FR_arr,"bush_church_steel_fr","NMB_BUSH_FlowRate" ,query)
     count++;
     break;

     case "Bushy Park Steel Total Flow":
      trendData(BUSH_STEEL_TF_arr,"bush_church_steel_TF","NMB_BUSH_FR",query)
      count++;
      break;

      case "Bushy Park Soccoman Total Flow":
        trendData(BUSH_SOCO_TF_arr,"bush_church_soco_TF","NMB_BUSH_FR",query)
        count++;
        break;

   case "Bushy Park Soccoman Pressure":
     trendData(BUSH_CHURCH_SOCCO_BAR_arr,"bush_church_socco_bar","NMB_BUSH_FlowRate" ,query)
     count++;
     break;

   case "Bushy Park Steel Pressure":
     trendData(BUSH_CHURCH_STEEL_BAR_arr,"bush_church_steel_bar" ,"NMB_BUSH_FlowRate" ,query)
     count++;
     break;

   case "Bushy Park Pumpstation Flow Rate":
     trendData(BUSH_PUMP_FR_arr,"bush_pump_fr","NMB_BUSH_FlowRate" ,query)
     count++;
     break;

   case "Bushy Park Combined Borehole Flow Rate":
     trendData(BUSH_GW_COMB_FLOW_RATE_arr,"bush_gw_comb_flow_rate","NMB_BUSH_FlowRate" ,query)
     count++;
     break;

   case "Bushy Park Holding Tank Level":
     trendData( BUSH_TANK_LVL_arr,"bush_tank_lvl"  ,"NMB_BUSH_FlowRate" ,query)
     count++;
     break;

     case"Bushy Park Pumpstation Total Flow":
     trendData(BUSH_PUMP_TF_arr,"bush_ps_TF","NMB_BUSH_FR",query)
     count++;
     break;

     case"Bushy Park Combined Total Flow":
     trendData(BUSH_GW_TF_arr,"bush_gw_TF","NMB_BUSH_FR",query)
     count++;
     break;



// Stanford Road Road
  case "Stanford Road Suction Pressure":
    trendData(STAN_BPS_SuctionPressure_Arr,"suction_pressure","NMBM_STAN_BPS_TREND",query)
  count++;
  break;

  case "Stanford Road Delivery Pressure":
    trendData(STAN_BPS_DeliveryPressure_Arr,"delivery_pressure","NMBM_STAN_BPS_TREND",query)
  count++;
  break;

  case "Stanford Road Flow Rate":
    trendData(STAN_BPS_FlowRate_Arr,"flowRate","NMBM_STAN_BPS_TREND",query)
  count++;
  break;
  case "Stanford Road Pump 1 Frequency":
    trendData(STAN_BPS_P1_FREQ_Arr,"p1_actfreq","NMBM_STAN_BPS_TREND",query)
  count++;
  break;

  case "Stanford Road Pump 2 Frequency":
    trendData(STAN_BPS_P2_FREQ_Arr,"p2_actfreq","NMBM_STAN_BPS_TREND",query)
  count++;
  break;

  case "Stanford Road Pump 3 Frequency":
    trendData(STAN_BPS_P3_FREQ_Arr,"p3_actfreq","NMBM_STAN_BPS_TREND",query)
  count++;
  break;

  case "Stanford Road Pump 4 Frequency":
    trendData(STAN_BPS_P4_FREQ_Arr,"p4_actfreq","NMBM_STAN_BPS_TREND",query)
  count++;
  break;

  case "Kruisfontein Borhole 12 Level":
    trendData(klm_kruis12_lvl_arr,"gw_klm_kruis12_lvl", "KLM_KRUIS12_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 12 Current":
    trendData(klm_kruis12_current_arr,"gw_klm_kruis12_current", "KLM_KRUIS12_FLOW",query )
    count++;
    break;


  case "Kruisfontein Borhole 12 Pressure":
    trendData(klm_kruis12_bar_arr,"gw_klm_kruis12_bar", "KLM_KRUIS12_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 12 Flow Rate":
    trendData(klm_kruis12_flow_rate_arr,"gw_klm_kruis12_flow_rate", "KLM_KRUIS12_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 12 Total Flow":
    trendData(klm_kruis12_total_flow_arr,"gw_klm_kruis12_TF", "KLM_KRUIS12_TF", query)
    count++;
    break;

    case "Kruisfontein Borhole 13 Level":
    trendData(klm_kruis13_lvl_arr,"gw_klm_kruis13_lvl", "KLM_KRUIS13_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 13 Current":
    trendData(klm_kruis13_current_arr,"gw_klm_kruis13_current", "KLM_KRUIS13_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 13 Pressure":
    trendData(klm_kruis13_bar_arr,"gw_klm_kruis13_bar", "KLM_KRUIS13_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 13 Flow Rate":
    trendData(klm_kruis13_flow_rate_arr,"gw_klm_kruis13_flow_rate", "KLM_KRUIS13_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 13 Total Flow":
    trendData(klm_kruis13_total_flow_arr,"gw_klm_kruis13_TF", "KLM_KRUIS13_TF", query)
    count++;
    break;

    case "Kruisfontein Borhole 14 Level":
    trendData(klm_kruis14_lvl_arr,"gw_klm_kruis14_lvl", "KLM_KRUIS14_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 14 Current":
    trendData(klm_kruis14_current_arr,"gw_klm_kruis14_current", "KLM_KRUIS14_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 14 Pressure":
    trendData(klm_kruis14_bar_arr,"gw_klm_kruis14_bar", "KLM_KRUIS14_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 14 Flow Rate":
    trendData(klm_kruis14_flow_rate_arr,"gw_klm_kruis14_flow_rate", "KLM_KRUIS14_FLOW",query )
    count++;
    break;

  case "Kruisfontein Borhole 14 Total Flow":
    trendData(klm_kruis14_total_flow_arr,"gw_klm_kruis14_TF", "KLM_KRUIS14_TF", query)
    count++;
    break;

  case "Malabar Reservoir Level":
    trendData(mala_lvl_arr,"mali_lvl", "NMBM_MALI_R_DB",  query)
    count++;
    break;

    case "Humerail Borehol Level":
      trendData(HUM_GW_BOR_LVL_arr, "hum_gw_borehole_lvl","NMBM_HUM_GW_FLOWRATE", query)
    count++;
    break;

    case "Humerail Raw Water Tank Level":
      trendData(HUM_GW_RAW_WATER_TANK_LVL_arr, "hum_gw_raw_water_tank_lvl","NMBM_HUM_GW_FLOWRATE", query)
      count++;
      break;

      case "Humerail Final Water Tank Level":
        trendData(HUM_GW_FIN_WAT_TANK_LVL_arr, "hum_gw_final_water_tank_lvl","NMBM_HUM_GW_FLOWRATE", query)
        count++;
        break;


        case "Airport Reservoir Level":
          trendData(AIR_PRT_LVL_arr,"air_prt_R_lvl","AIR_PRT_LVL", query);
          count++;
          break

  case "Chelsea Reservoir West Chamber Level":
    trendData(CHE_West_array,"westChamber","BR_CHE_RES_LVL",query)
  count++;
  break;
  case "Chelsea Reservoir East Chamber Level":
    trendData(CHE_East_array,"eastChamber","BR_CHE_RES_LVL",query)
    count++;
    break;

    case "Chelsea Reservoir Summit 1200 mm Flow Rate":
      trendData(CHE_R_FR1200_arr, "che_r_fr1100", "BR_CHE_RES_LVL", query)
      count++;
      break;

      case "Chelsea Reservoir Greenbushes 600 mm Flow Rate":
        trendData(CHE_R_FR600_arr,"che_r_fr600", "BR_CHE_RES_LVL", query)
       count++;
       break;

   case "Chelsea Reservoir Summit 1200 mm Total Flow":
     trendData(CHE_R_TF1200_arr,"che_r_tf1100", "CHEL_RES_TF", query)

    count++;
    break;

   case "Chelsea Reservoir Greenbushes 600 mm Total Flow":
     trendData(CHE_R_TF600_arr,"che_r_tf600", "CHEL_RES_TF", query)
    count++;
    break;

    case "St Georges Borehole Flow Rate":
      trendData(st_georges_wtw_gw_FR_arr,"st_georges_wtw_gw_FR","WTW_ST_GEORGE_TREND",query)
      count++;
      break;

      case "St Georges Borehole Total Flow":
        trendData(st_georges_wtw_gw_TF_arr,"st_georges_wtw_gw_TF","WTW_ST_GEORGE_TREND_TF",query)
        count++;
        break;

        case "St Georges Emerald Hill Flow Rate":
          trendData(st_georges_wtw_emer_hill_FR_arr,"st_georges_wtw_emer_hill_FR","WTW_ST_GEORGE_TREND",query)
          count++;
          break;

          case "St Georges Emerald Hill Total Flow":
            trendData(st_georges_wtw_emer_hill_TF_arr,"st_georges_wtw_emer_hill_TF","WTW_ST_GEORGE_TREND_TF",query)
            count++;
            break;

             case "Humansdorp Inlet Flow Rate":
              trendData(klm_hup_wtw_flow_arr,"klm_hup_wtw_FR", "WTW_HUMANSDORP_FLOW", query)
              count++
              break;

              case "Humansdorp Inlet Total Flow":
                trendData(klm_hup_wtw_tf_arr,"klm_hup_wtw_TF", "Humansdrop_wtw_tf", query)
                count++;
              break;

  case "Bergendal Reservoir Level":
    trendData(BERGEN_RES_R_LVL_arr, "bergen_r_level","GRAAF_BERGEN_RES", query)
    count++;
    break;

    case "Kroonvale Reservoir Level":
      trendData(KROON_RES_R_LVL_arr,"kroon_r_level" ,"GRAAF_KROON_RES", query)
      count++;
      break;

      case "Umasizakhe Reservoir Level":
        trendData(UMI_RES_R_LVL_arr,"uma_r_level" ,"GRAAF_UMA_RES", query)
        count++;
        break;

        case "Wolwas Reservoir Level":
          trendData(WOLWAS_RES_R_LVL_arr, "wolwas_r_level","GRAAF_WOLWAS_RES" ,query)
          count++;
          break;

  //Ground Water
  case "HD1 Water Level":
    trendData(KLM_HUP_WATER_LEVEL_Arr,"level_HD1","KLM_HUP_GW_TREND" ,query)
  count++;
  break;
  case "HD1 Flow Rate":
    trendData(KLM_HUP_FLOWRATE_Arr,"flowRate_HD1","KLM_HUP_GW_TREND" ,query)
count++;
break;
case "HD1 Total Flow":
  TOTALFLOWTRENDDATA(KLM_HUP_TOTALFLOW_Arr,"total_flow_HD1","KLM_HUP_TF_TREND",query)
count++;
break;

case "HD2C Water Level":
  trendData(KLM_HUP2_WATER_LEVEL_Arr,'level_HD2C',"KLM_HUP2_GW_TREND",query)
count++;
break;
case "HD2C Flow Rate":
  trendData(KLM_HUP2_FLOWRATE_Arr,'flowRate_HD2C',"KLM_HUP2_GW_TREND",query)
count++;
break;
case "HD2C Total Flow":
  TOTALFLOWTRENDDATA(KLM_HUP2_TOTALFLOW_Arr,'total_flow_HD2C',"KLM_HUP2_TF_TREND",query)
count++;
break;
case "HD3 Water Level":
  trendData(KLM_HUP3_WATER_LEVEL_Arr,'level_HD3',"KLM_HUP3_GW_TREND",query)
count++;
break;
case "HD3 Flow Rate":
  trendData(KLM_HUP3_FLOWRATE_Arr,'flowRate_HD3',"KLM_HUP3_GW_TREND",query)
count++;
break;

case "HD3 Total Flow":
  TOTALFLOWTRENDDATA(KLM_HUP3_TOTALFLOW_Arr,'total_flow_HD3',"KLM_HUP3_TF_TREND",query)
count++;
break;
case "HD4 Water Level":
  trendData(KLM_HUP4_WATER_LEVEL_Arr,'level_HD4',"KLM_HUP4_GW_TREND",query)
count++;
break;
case "HD4 Flow Rate":
  trendData(KLM_HUP4_FLOWRATE_Arr,'flowRate_HD4',"KLM_HUP4_GW_TREND",query)
count++;
break;

case "HD4 Total Flow":
  TOTALFLOWTRENDDATA(KLM_HUP4_TOTALFLOW_Arr,'total_flow_HD4',"KLM_HUP4_TF_TREND", query)
count++;
break;

case "HD6 Water Level":
  trendData(KLM_HUP6_WATER_LEVEL_Arr,'level_HD6',"KLM_HUP6_GW_TREND",query)
count++;
break;
case "HD6 Flow Rate":
  trendData(KLM_HUP6_FLOWRATE_Arr,'flowRate_HD6',"KLM_HUP6_GW_TREND",query)
count++;
break;
case "HD6 Total Flow":
  TOTALFLOWTRENDDATA(KLM_HUP6_TOTALFLOW_Arr,'total_flow_HD6',"KLM_HUP6_TF_TREND",query)
count++;
break;

case "Emerald Hill Reservoir Level":
  trendData(EMER_H_Level_arr,"level","NMB_EMER_H_RES_LVL",query)
   count++;
break;

case "Emerald Hill Flow Rate":
  trendData(EMER_H_Flow_Rate_arr,"emer_flow_rate","NMB_EMER_H_RES_LVL",query)
   count++;
break;

case "Emerald Hill Total Flow":
  trendData(EMER_H_Total_Flow_arr,"emer_total_flow", "NMB_EMER_H_TOTAL_RES_LVL", query)
  count++;
  break;

case  "Kareedouw K1 Total Flow":
  trendData(KARK_K1_TF_arr,"gw_kark_k1_total_flow","KARK_K1_TOTAL_FLOW",query)
count++;
break;

case  "Kareedouw K1 Flow Rate":
trendData(KARK_K1_FR_arr,"gw_kark_k1_flow_rate","KARK_K1_FLOW_RATE",query)
count++;
break;

case   "Kareedouw K1 Current":
trendData(KARK_K1_CUR_arr,"gw_kark_k1_current","KARK_K1_FLOW_RATE",query)
count++;
break;

case      "Kareedouw K1 Level":
trendData(KARK_K1_LVL_arr,"gw_kark_k1_level","KARK_K1_FLOW_RATE",query)
count++;
break;


case  "Kareedouw K2 Total Flow":
  trendData(KARK_K2_TF_arr,"gw_kark_k2_total_flow","KARK_K2_TOTAL_FLOW",query)
count++;
break;

case  "Kareedouw K2 Flow Rate":
trendData(KARK_K2_FR_arr,"gw_kark_k2_flow_rate","KARK_K2_FLOW_RATE",query)
count++;
break;

case "Kareedouw K2 Current":
trendData(KARK_K2_CUR_arr,"gw_kark_k2_current","KARK_K2_FLOW_RATE",query)
count++;
break;

case "Kareedouw K2 Level":
trendData(KARK_K2_LVL_arr,"gw_kark_k2_level","KARK_K2_FLOW_RATE",query)
count++;
break;



case "Kwanobuhle Reservoir Level":
  trendData(KWANO_R_RES_LVL_arr, "kwano_r_reservoir_level" , "NMB_KWANO_R", query)
  count++;
  break;


  case "Kwanobuhle Reservoir Flow Rate 1":
    trendData(KWANO_R_FLOW_RATE_1_arr, "kwano_r_flow_rate_1" , "NMB_KWANO_R", query)
    count++;
    break;


    case "Kwanobuhle Reservoir Flow Rate 2":
  trendData(KWANO_R_FLOW_RATE_2_arr, "kwano_r_flow_rate_2" , "NMB_KWANO_R", query)
  count++;
  break;


  case "Kwanobuhle Reservoir Total Flow 1":
  trendData(KWANO_R_TOTAL_FLOW_1_arr, "kwano_r_total_flow_1" , "NMB_KWANO_R_TF", query)
  count++;
  break;

  case "Kwanobuhle Reservoir Total Flow 2":
  trendData(KWANO_R_TOTAL_FLOW_2_arr, "kwano_r_total_flow_2" , "NMB_KWANO_R_TF", query)
  count++;
  break;



  case "Rosedale Reservoir Total Flow":
    trendData(WDNR_ROSE_TF_arr,"totaliser1","WDNR_ROSE_RES_OUT01", query)
    count++;
    break;

  case "Rosedale Reservoir Flow Rate":
    trendData(WDNR_ROSE_FR_arr,"flowrate1","WDNR_ROSE_RES_OUT01", query)
    count++;
    break;

  case "Rowallan Park Extension Pressure":
    trendData(WDSR_ROWP_BAR_arr,"pressure1","WDSR_ROWP_DMA_FLM01", query)
    count++;
    break;

   case "Rowallan Park Extension Total Flow":
    trendData(WDSR_ROWP_TF_arr,"totaliser1","WDSR_ROWP_DMA_FLM01", query)
    count++;
     break;

    case "Rowallan Park Extension Flow Rate":
      trendData(WDSR_ROWP_FR_arr,"flowrate1","WDSR_ROWP_DMA_FLM01", query)
      count++;
      break;
}
}

var flag = false
if (count > 20){
  var seconds = 30000;
}
else if(count > 10){
  var seconds = 20000
}
else var seconds = 8000



setTimeout(function() {



  res.status(200).json({
    //ISUZU

    //Reservoir Sites
     GBarray,
     GBFRarray,
     GBW_ACT_BAR_arr,
     GBW_FLO_RAT_arr,
     OLI_LVL_array,
     CGK_PRESSURE_array,
     CGK_KOP_NC_17_ML_array,
     CGK_LEVEL_array,
     DEMO_TEMP_arr,
     CGK_COEGA_FLOW_RATE_array,
     CGK_MOTHERWELL_FLOW_RATE_array,
     CGK_GRASSRIDGE_FLOW_RATE_array,
     CGK_MOTHERWELL_TOTAL_FLOW_array,
     CGK_GRASSRIDGE_TOTAL_FLOW_array,
     CGK_COEGA_TOTAL_FLOW_array,
     klm_kruis_res_lvl_arr,
     LSD_FLOW_RATE_arr,
LSD_TOTAL_FLOW_arr,
LSD_PRESSURE_arr,
McNougTown_FLOW_RATE_arr,
McNougTown_TOTAL_FLOW_arr,
McNougTown_PRESSURE_arr,
     CHE_East_array,
     CHE_West_array,
     CHE_R_FR1200_arr,
     CHE_R_FR600_arr,
     CHE_R_TF600_arr,
     CHE_R_TF1200_arr,
     BERGEN_RES_R_LVL_arr,
     st_georges_wtw_gw_FR_arr,
st_georges_wtw_gw_TF_arr,
st_georges_wtw_emer_hill_FR_arr,
st_georges_wtw_emer_hill_TF_arr,
klm_hup_wtw_flow_arr,
klm_hup_wtw_tf_arr,
     WOLWAS_RES_R_LVL_arr,
     UMI_RES_R_LVL_arr,
     KROON_RES_R_LVL_arr,
     GR_EC_array,
     GR_WC_array,
     VSarray,
     CHT_NC_array,
     CHT_OR_array,
     CHT_SC_array,
     VRH_DL_array,
     VRH_SL_array,
     HBarray,
     hb_P1_CURRENT_arr,
     hb_P2_CURRENT_arr,
     hb_P3_CURRENT_arr,
     hb_P1_RH_arr,
     hb_P2_RH_arr,
     hb_P3_RH_arr,
     LHarray,
     BHB_array,
     TCarray,
     RD_LVL_array ,
     SM_LVL_array,
     SM_FR_array,
     CHE_FlowRate_array,
     EMER_H_Level_arr,
     EMER_H_Flow_Rate_arr,
     EMER_H_Total_Flow_arr,
     drift_R_reservoir_level_arr,
     drift_R_flow_rate_1_arr,
     drift_R_flow_rate_2_arr,
     NMB_SCHOE_PRESSURE_array,
     NMB_SCHOE_RES_LEVEL_array,
     NMB_SCHOE_ACTUATOR_POSITION_array,
     NMB_SCHOE_ACTUATOR_SET_POINT_array,
     nmb_schoe_r_actuator_valve_feedback_signal_error_arr,
     nmb_schoe_r_actuator_valve_command_signal_error_arr,
     nmb_schoe_r_reservoir_level_signal_error_arr,
     nmb_schoe_r_actuator_valve_fault_arr,
     nmb_schoe_r_actuator_valve_torque_fail_close_arr,
     nmb_schoe_r_actuator_valve_torque_fail_open_arr,
     DRS_LH_RES_LVL_arr,
     nmb_schoe_r_general_fault_arr,
     nmb_schoe_r_actuator_general_fault_arr,
     nmb_schoe_r_actuator_valve_timeout_arr,
     ONS_PARA_TF_arr,
     KARK_K1_TF_arr,
     KARK_K1_FR_arr,
     KARK_K1_CUR_arr,
     KARK_K1_LVL_arr,
     KARK_K2_TF_arr,
     KARK_K2_FR_arr,
     KARK_K2_CUR_arr,
     KARK_K2_LVL_arr,
     KWANO_R_RES_LVL_arr,
KWANO_R_FLOW_RATE_1_arr,
KWANO_R_FLOW_RATE_2_arr,
KWANO_R_TOTAL_FLOW_1_arr,
KWANO_R_TOTAL_FLOW_2_arr,

WDNR_ROSE_TF_arr,
WDNR_ROSE_FR_arr,
WDSR_ROWP_BAR_arr,
WDSR_ROWP_TF_arr,
WDSR_ROWP_FR_arr,

     BUSH_CHURCH_SOCO_FR_arr,
BUSH_CHURCH_STEEL_FR_arr,
BUSH_CHURCH_SOCCO_BAR_arr,
BUSH_CHURCH_STEEL_BAR_arr,
BUSH_PUMP_FR_arr,
BUSH_GW_COMB_FLOW_RATE_arr,
BUSH_TANK_LVL_arr,
BUSH_STEEL_TF_arr,
BUSH_SOCO_TF_arr,
BUSH_PUMP_TF_arr,
BUSH_GW_TF_arr,


 isuzu_oven1_vsd_speed_arr,
 isuzu_oven1_heat_ecvh_temp_arr,
 isuzu_oven1_temp1_arr,
 isuzu_oven1_temp2_arr,
 isuzu_oven2_vsd_speed_arr,
 isuzu_oven2_heat_ecvh_temp_arr,
 isuzu_oven2_temp1_arr,
 isuzu_oven2_temp2_arr,



//FPT Sites
FMT_FR_array,
FMT_TF_array,
FMT_PRESS_array,
IDZ_FR_array,
IDZ_MW_FR_array,
GT_BRG_STL_FR_array,
GT_BRG_SOCO_FR_array,
GT_BRG_STL_PRESS_array,
GT_BRG_SOCO_PRESS_array,
UIT_FC_FR_array,
UIT_FC_PRESS_array,
BETH_PRESS_array,
BETH_FLOW_RATE_array,
BETH_BATTERY_STATUS_array,
BETH_TOTAL_FLOW_array,
     //PumpStations
    CG_CSP_Arr,
    CG_CDP_Arr,
    CG_S_LVL_Arr,
    CG_T1_LVL_Arr,
    CG_T1_IF_Arr,
    CG_T1_OF_Arr,
    CG_T2_LVL_Arr,
    CG_T2_IF_Arr,
    CG_T2_OF_Arr,
    NMU_EFF_DP_Arr,
    NMU_EFF_FR_Arr,
    NMU_EFF_DAM_LVL_Arr,
    NMU_EFF_P1_SPEED_Arr,
    NMU_EFF_P2_SPEED_Arr,
    NMU_EFF_P3_SPEED_Arr,
    NMU_EFF_JP_SPEED_Arr,
    STORMS_QUARRY_LEVEL_Arr,
    STORMS_GORGE_LEVEL_Arr,
    STORMS_HOLDING_RESERVOIR_LEVEL_Arr,
    STORMS_OVERHEAD_TANK_LEVEL_Arr,
    HUM_OFF_TAKE_TF_arr,
HUM_OFF_TAKE_BAR_arr,
HUM_OFF_TAKE_BAT_arr,
KOU_MAIN_LINE_BAT_arr,
KOU_MAIN_LINE_BAR_arr,
ST_FRAN_OFF_TF_arr,
PARA_BEA_TF_arr,
ST_FRAN_PARA_BEA_BAT_arr,
ONS_PARA_BAT_arr,
AIR_PRT_LVL_arr,
    GR_R_INLET_Arr,
    GR_R_OUTLET_Arr,
    CHE_PS_P1_ACTUAL_SPEED_Arr,
    CHE_PS_P1_DEL_PRESS_Arr,
    CHE_PS_P1_SUCT_PRESS_Arr,
    CHE_PS_P2_ACTUAL_SPEED_Arr,
    CHE_PS_P2_DEL_PRESS_Arr,
    CHE_PS_P2_SUCT_PRESS_Arr,
    CHE_PS_P3_ACTUAL_SPEED_Arr,
    CHE_PS_P3_DEL_PRESS_Arr,
    CHE_PS_P3_SUCT_PRESS_Arr,
    CHE_PS_P4_ACTUAL_SPEED_Arr,
    CHE_PS_P4_DEL_PRESS_Arr,
    CHE_PS_P4_SUCT_PRESS_Arr,
    CHE_PS_700_FLOW_RATE_Arr,
    CHE_PS_700_TOTAL_FLOW_Arr,
    HOLDING_LVL_RES_LVL_arr,
DAMCAMP_LVL_RES_LVL_arr,
TINROOF_LVL_RES_LVL_arr,
JEFF_OFF_TAKE_TF_arr,
JEFF_OFF_TAKE_BAT_arr,
    //Stanford Road
    STAN_BPS_SuctionPressure_Arr,
  STAN_BPS_DeliveryPressure_Arr,
  STAN_BPS_FlowRate_Arr,
  STAN_BPS_P1_FREQ_Arr,
  STAN_BPS_P2_FREQ_Arr,
  STAN_BPS_P3_FREQ_Arr,
  STAN_BPS_P4_FREQ_Arr,
  mala_lvl_arr,
  klm_kruis12_lvl_arr,
  klm_kruis12_current_arr,
  klm_kruis12_bar_arr,
  klm_kruis12_flow_rate_arr,
  klm_kruis12_total_flow_arr,
  klm_kruis13_lvl_arr,
  klm_kruis13_current_arr,
  klm_kruis13_bar_arr,
  klm_kruis13_flow_rate_arr,
  klm_kruis13_total_flow_arr,
  klm_kruis14_lvl_arr,
  klm_kruis14_current_arr,
  klm_kruis14_bar_arr,
  klm_kruis14_flow_rate_arr,
  klm_kruis14_total_flow_arr,
  //Humerail
  HUM_GW_BOR_LVL_arr,
  HUM_GW_RAW_WATER_TANK_LVL_arr,
  HUM_GW_FIN_WAT_TANK_LVL_arr,

    //Motherwell
    MW_BPS_FlowRate_Arr,
    MW_BPS_DeliveryPressure_Arr,
    MW_BPS_SuctionPressure_Arr,
    MW_LVL_array,
         //Groundwater
    NMBM_NPP_GW_PRESSURE_Arr,
    NMBM_NPP_GW_FLOW_RATE_Arr,
    NMBM_NPP_GW_LEVEL_Arr,
    NMBM_NPP_GW_TOTAL_FLOW_Arr,
    KLM_HUP_WATER_LEVEL_Arr,
    KLM_HUP_FLOWRATE_Arr,
    KLM_HUP_TOTALFLOW_Arr,
    KLM_HUP2_WATER_LEVEL_Arr,
    KLM_HUP2_FLOWRATE_Arr,
    KLM_HUP2_TOTALFLOW_Arr,
    KLM_HUP3_WATER_LEVEL_Arr,
    KLM_HUP3_FLOWRATE_Arr,
    KLM_HUP3_TOTALFLOW_Arr,
    KLM_HUP4_WATER_LEVEL_Arr,
    KLM_HUP4_FLOWRATE_Arr,
    KLM_HUP4_TOTALFLOW_Arr,
    KLM_HUP6_WATER_LEVEL_Arr,
    KLM_HUP6_FLOWRATE_Arr,
    KLM_HUP6_TOTALFLOW_Arr,
  //WTW
     WTW_NGT_FM_HIGH_FR_Arr,
     WTW_NGT_FM_LOW_FR_Arr,
     ELA_FR_arr,
     ELA_P_arr,
     drift_R_total_flow_1_arr,
drift_R_total_flow_2_arr,
        });
     }, seconds);

}

     })

   })

   module.exports= router;






  function TOTALFLOWTRENDDATA(collectionArr, field,database,query)
  {
    let value;
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");


       dbo.collection(database).find(query,{ projection:{_id:0,date:1,[field]:1,}})


      .sort({date:1}).toArray(function(err, data){
        if (err) throw err;
        i = 1;
        j = i -1

         while (i < data.length ){
          //how do i get this to only 2 descible places
          value = [data[i].date,parseFloat((data[i][field] - data[j][field]).toFixed(2))]
          collectionArr[j] = value

        i++;
        j++
          }
          console.log(collectionArr)
      } );
     })
   }
   var dbo
   var MongoClient = require('mongodb').MongoClient;
   var url = gvar.standardConnectionString;
   MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     dbo   = db.db("HawkEye");

   })


   function trendData(collectionArr, field,database,  query)
   {
     var fieldQuery = {[field]:{$exists:true}}

     //Merging the properties of the fieldQuery and date based Query
     var newQuery = {...fieldQuery, ...query}

    dbo.collection(database).find(newQuery ,{ projection:{
         _id:0,
         date:1,
        [field]:1,


       }}).sort({date:1}).toArray(function(err, data){
        if (err) throw err;
        i = 0;
         while (i < data.length){
           collectionArr[i] = [data[i].date,data[i][field]]
        i++;
          }1
      } );
     }

