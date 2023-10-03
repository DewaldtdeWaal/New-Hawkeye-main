const mongoose = require('mongoose');//import library MongoDB
const gvar = require('../variables')// import access global variables

//called in server.js
module.exports = {ReservoirTrends,ReservoirTotalFlows, CoegaKopTrend,CoegaKopTrendTotalFlow,Greenbushes_Reservoir,Greenbushes_Reservoir_TF, Grassridge_Flow,EmeraldHill_Flow,Drift_Flow,Drift_TotalFlow,EmeraldHill_TotalFlow,SCHOE_FLOW_RATE,SCHOE_FAULT, WOLWAS_RES,BERGEN_RES,UMI_RES,KROON_RES, DAMP_RES, TIN_RES, HOL_RES,BUSH_FR_Trend,KARK_R_Trend,COE_KOP_R_Trend };

// schema/structure of fields used in mongoDB collections
var reservoirTrendSchema = mongoose.Schema({
date:{type: Date},
level: {type: Number},
})
var TF_TrendSchema = mongoose.Schema({
  date:{type: Date},
  totalflow: {type: Number},
  })
var summitTrendSchema = mongoose.Schema({
  date:{type: Date},
  flowRate:{type: Number},
  level: {type: Number},
  })
var chealseaTrendSchema = mongoose.Schema({
  date:{type: Date},
  eastChamber: {type: Number},
  westChamber: {type: Number},
  lvl: {type: Number},


})

var chattyTrendSchema = mongoose.Schema({
  date:{type: Date},
  flowRate:{type: Number},
})

function ReservoirTrends(){  //creates and saves all Reservoir levels in the DB for trends
  var now =  new Date();

var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var hour = now.getHours();
var min = now.getMinutes();

var date = year + "-" + month + "-" + day +" "+ hour +":"+ min; //gets the present date and time

var fiveMinAgo = Get_5Min_Ago();

  var updateTimeBHB=Get_UpdateTimeMS(gvar.bh_R_UT)
  var updateTimeCHT=Get_UpdateTimeMS(gvar.cht_ut)
  var updateTimeEMER = Get_UpdateTimeMS(gvar.emer_ut)
  var updateTimeCHE=Get_UpdateTimeMS(gvar.che_r_ut)
  var updateTimeGR=Get_UpdateTimeMS(gvar.gr_R_UT)
  var updateTimeGB=Get_UpdateTimeMS(gvar.gb_R_UT)
  var updateTimeHB=Get_UpdateTimeMS(gvar.hb_R_UT)
  var updateTimeLH=Get_UpdateTimeMS(gvar.lh_UT)
  var updateTimeTC=Get_UpdateTimeMS(gvar.tc_R_UT)
  var updateTimeVRH=Get_UpdateTimeMS(gvar.vrh_ut)
  var updateTimeVS=Get_UpdateTimeMS(gvar.vs_R_UT)
  var updateTimeSM=Get_UpdateTimeMS(gvar.sm_ut)
  var updateTimeRD=Get_UpdateTimeMS(gvar.rd_r_ut)
  var updateTimeOli = Get_UpdateTimeMS(gvar.oli_ut)
  var updateTimeMW = Get_UpdateTimeMS(gvar.mw_g_ut)
  var updateTimeKRUISRES = Get_UpdateTimeMS(gvar.klm_kruisR_ut)



  if (min % 10 === 0){ // to make sure data only saves every 10min
   if(gvar.bh_R_LVL==undefined || gvar.bh_R_LVL==null|| updateTimeBHB<fiveMinAgo){} //data wont save if invalid
   else
   {
     var DRS_BHB_RES_LVL = mongoose.model('DRS_BHB_RES_LVL',reservoirTrendSchema,'DRS_BHB_RES_LVL')// creates collection (model name, fields used, colelction name)
     var bhb_RES_LVL = new DRS_BHB_RES_LVL({
      date: date, // storing the current date
     level: gvar.bh_R_LVL, //stroing the current value
   })
  bhb_RES_LVL.save() //save to DB
}

if(gvar.temp_lvl == undefined || gvar.temp_lvl == null){}
  else{
    var DEMO_TREND = mongoose.model('DEMO_TREND', reservoirTrendSchema,'DEMO_TREND')
    var nmb_mw_RES_LVL = new DEMO_TREND({
      date:date,
      level:gvar.temp_lvl,
    })
    nmb_mw_RES_LVL.save();
  }
}

if(gvar.mw_g_res_level == undefined || gvar.mw_g_res_level == null || updateTimeMW<fiveMinAgo ) {}
  else{
    var NMB_MW_RES_LVL = mongoose.model('NMB_MW_RES_LVL', reservoirTrendSchema,'NMB_MW_RES_LVL')
    var nmb_mw_RES_LVL = new NMB_MW_RES_LVL({
      date:date,
      level:gvar.mw_g_res_level,
    })
    nmb_mw_RES_LVL.save();

  }

  if(gvar.klm_kruisR_lvl == undefined || gvar.klm_kruisR_lvl == null ||updateTimeKRUISRES<fiveMinAgo ){}
  else {
   var KLM_KRUIS_RES_LVL = mongoose.model("KLM_KRUIS_RES_LVL", reservoirTrendSchema,"KLM_KRUIS_RES_LVL")
   var klm_KRUIS_RES_LVL = new KLM_KRUIS_RES_LVL({
    date:date,
    level:gvar.klm_kruisR_lvl
   })
   klm_KRUIS_RES_LVL.save();
  }




   if(gvar.cht_nc_rl==undefined || gvar.cht_nc_rl==null || updateTimeCHT<fiveMinAgo){}
   else
   {
    var DRN_CHT_NC_RES_LVL = mongoose.model('DRN_CHT_NC_RES_LVL',reservoirTrendSchema,'DRN_CHT_NC_RES_LVL')
    var cht_nc_res_lvl = new DRN_CHT_NC_RES_LVL({
      date: date,
      level: gvar.cht_nc_rl,
    })
    cht_nc_res_lvl.save()

  }




  if(gvar.cht_oh_rl==undefined || gvar.cht_oh_rl==null || updateTimeCHT<fiveMinAgo){}
  else
  {
    var DRN_CHT_OR_RES_LVL = mongoose.model('DRN_CHT_OR_RES_LVL',reservoirTrendSchema,'DRN_CHT_OR_RES_LVL')
    var cht_OR_RES_LVL = new DRN_CHT_OR_RES_LVL({
      date: date,
      level: gvar.cht_oh_rl,
    })
    cht_OR_RES_LVL.save()
  }

  chattyTrendSchema

  if(gvar.cht_fr==undefined || gvar.cht_fr==null || updateTimeCHT<fiveMinAgo){}
  else
  {
    var DRN_CHT_FR = mongoose.model('DRN_CHT_RES_TF',  chattyTrendSchema,'DRN_CHT_RES_TF')
    var cht_FR = new DRN_CHT_FR({
      date: date,
      flowRate: gvar.cht_fr,
    })
    cht_FR.save()
  }

  if(gvar.cht_sc_rl==undefined || gvar.cht_sc_rl==null || updateTimeCHT<fiveMinAgo){}
  else
  {
    var DRN_CHT_SC_RES_LVL = mongoose.model('DRN_CHT_SC_RES_LVL',reservoirTrendSchema,'DRN_CHT_SC_RES_LVL')
    var cht_SC_RES_LVL = new DRN_CHT_SC_RES_LVL({
      date: date,
      level: gvar.cht_sc_rl,
    })
    cht_SC_RES_LVL.save()
  }

  if(gvar.che_r_lvl==undefined || gvar.che_r_lvl==null ||
    gvar.che_r_lvl_East==undefined || gvar.che_r_lvl_East == null ||
    updateTimeCHE<fiveMinAgo){}
  else
  {
    var BR_CHE_RES_LVL = mongoose.model('BR_CHE_RES_LVL',chealseaTrendSchema,'BR_CHE_RES_LVL')
    var che_RES_LVL = new BR_CHE_RES_LVL({
      date: date,
      westChamber: gvar.che_r_lvl,
      eastChamber:gvar.che_r_lvl_East,
      lvl:gvar.che_r_lvl
    })
    che_RES_LVL.save()
  }

  if(gvar.gr_R_EAST_LVL==undefined || gvar.gr_R_EAST_LVL==null || updateTimeGR<fiveMinAgo){}
  else
  {
    var BR_GR_EC_RES_LVL = mongoose.model('BR_GR_EC_RES_LVL',reservoirTrendSchema,'BR_GR_EC_RES_LVL')
    var gr_EC_RES_LVL = new BR_GR_EC_RES_LVL({
      date: date,
      level: gvar.gr_R_EAST_LVL,
    })
    gr_EC_RES_LVL.save()
  }


  if(gvar.gr_R_WEST_LVL==undefined || gvar.gr_R_WEST_LVL==null || updateTimeGR<fiveMinAgo){}
  else
  {
    var BR_GR_WC_RES_LVL = mongoose.model('BR_GR_WC_RES_LVL',reservoirTrendSchema,'BR_GR_WC_RES_LVL')
    var gr_WC_RES_LVL = new BR_GR_WC_RES_LVL({
      date: date,
      level: gvar.gr_R_WEST_LVL,
    })
    gr_WC_RES_LVL.save()
  }



  if(gvar.hb_R_LVL==undefined || gvar.hb_R_LVL==null || updateTimeHB<fiveMinAgo){}
  else
  {
    var DRS_HB_RES_LVL = mongoose.model('DRS_HB_RES_LVL',reservoirTrendSchema,'DRS_HB_RES_LVL')
    var hb_RES_LVL = new DRS_HB_RES_LVL({
      date: date,
      level: gvar.hb_R_LVL,
    })
    hb_RES_LVL.save()
  }

  if(gvar.lh_R_OVER_LVL==undefined || gvar.lh_R_OVER_LVL==null || updateTimeLH<fiveMinAgo){}
  else
  {
    var DRS_LH_RES_LVL = mongoose.model('DRS_LH_RES_LVL',reservoirTrendSchema,'DRS_LH_RES_LVL')
    var lh_RES_LVL = new DRS_LH_RES_LVL({
      date: date,
      level: gvar.lh_R_OVER_LVL,
    })
    lh_RES_LVL.save()
  }

  if(gvar.lh_Res_lvl==undefined || gvar.lh_Res_lvl==null || updateTimeLH<fiveMinAgo){}
  else
  {
    var DRS_LH_RES_LVL = mongoose.model('DRS_LH_RES_LVL',reservoirTrendSchema,'DRS_LH_RES_LVL')
    var lh_RES_LVL = new DRS_LH_RES_LVL({
      date: date,
      lh_Res_lvl: gvar.lh_Res_lvl,
    })
    lh_RES_LVL.save()
  }



  if(gvar.tc_R_LVL==undefined || gvar.tc_R_LVL==null || updateTimeTC<fiveMinAgo){}
  else
  {
    var DRS_TC_RES_LVL = mongoose.model('DRS_TC_RES_LVL',reservoirTrendSchema,'DRS_TC_RES_LVL')
    var tc_RES_LVL = new DRS_TC_RES_LVL({
      date: date,
      level: gvar.tc_R_LVL,
    })
    tc_RES_LVL.save()
  }

  if(gvar.vrh_sc_rl==undefined || gvar.vrh_sc_rl==null || updateTimeVRH<fiveMinAgo){}
  else
  {
    var DRN_VRH_SL_RES_LVL = mongoose.model('DRN_VRH_SL_RES_LVL',reservoirTrendSchema,'DRN_VRH_SL_RES_LVL')
    var vrh_SL_RES_LVL = new DRN_VRH_SL_RES_LVL({
      date: date,
      level: gvar.vrh_sc_rl,
    })
    vrh_SL_RES_LVL.save()
  }


  if(gvar.vrh_del_rl==undefined || gvar.vrh_del_rl==null || updateTimeVRH<fiveMinAgo){}
  else
  {
    var DRN_VRH_DL_RES_LVL = mongoose.model('DRN_VRH_DL_RES_LVL',reservoirTrendSchema,'DRN_VRH_DL_RES_LVL')
    var vrh_DL_RES_LVL = new DRN_VRH_DL_RES_LVL({
      date: date,
      level: gvar.vrh_del_rl,
    })
    vrh_DL_RES_LVL.save()
  }


  if(gvar.vs_R_LVL==undefined || gvar.vs_R_LVL==null || updateTimeVS<fiveMinAgo){}
  else
  {
    var BR_VS_RES_LVL = mongoose.model('BR_VS_RES_LVL',reservoirTrendSchema,'BR_VS_RES_LVL')
    var vs_RES_LVL = new BR_VS_RES_LVL({
      date: date,
      level: gvar.vs_R_LVL,
    })
    vs_RES_LVL.save()
  }

  if(gvar.rd_r_lvl==undefined || gvar.rd_r_lvl==null || updateTimeRD<fiveMinAgo){}
  else
  {
    var BR_RD_RES_LVL = mongoose.model('BR_RD_RES_LVL',reservoirTrendSchema,'BR_RD_RES_LVL')
    var rd_RES_LVL = new BR_RD_RES_LVL({
      date: date,
      level: gvar.rd_r_lvl,
    })
    rd_RES_LVL.save()
  }


  if(gvar.sm_r_lvl==undefined || gvar.sm_r_lvl==null || updateTimeSM<fiveMinAgo){}
  else
  {
    var BR_SM_TREND = mongoose.model('BR_SM_TREND',summitTrendSchema,'BR_SM_TREND')
    var sm_TREND = new BR_SM_TREND({
      date: date,
      flowRate: gvar.sm_fm_fr,
      level: gvar.sm_r_lvl,
    })
    sm_TREND.save()
  }


  if(gvar.oli_ut==undefined || gvar.oli_ut==null || updateTimeOli<fiveMinAgo){}
  else
  {
    var OLI_LVL_TREND = mongoose.model('OLI_LVL_TREND',reservoirTrendSchema,'OLI_LVL_TREND')
    var oli_LVL_TREND = new OLI_LVL_TREND({
      date: date,
      level: gvar.oli_lvl,
    })
    oli_LVL_TREND.save()
  }


  }setTimeout(ReservoirTrends, 60000); // repeats function every one minute







  var NMBM_CGK_R_TrendSchema = mongoose.Schema({
    date:{type: Date},
    level: {type: Number},
    nmb_cgk_r_grassridge_inlet_flow_rate: {type: Number},
    nmb_cgk_r_motherwell_outlet_flow_rate:{type: Number},
    nmb_cgk_r_coega_idz_outlet_flow_rate:{type: Number},
    pressure:{type: Number}
  })
  function CoegaKopTrend() {
  var now =  new Date();

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeCGK=Get_UpdateTimeMS(gvar.nmb_cgk_r_ut)
  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

  if (min % 10 === 0){
    if(gvar.nmb_cgk_r_reservoir_level == undefined || gvar.nmb_cgk_r_reservoir_level == null ||
      gvar.nmb_cgk_r_grassridge_inlet_flow_rate == undefined || gvar.nmb_cgk_r_grassridge_inlet_flow_rate == null ||
      gvar.nmb_cgk_r_motherwell_outlet_flow_rate == undefined || gvar.nmb_cgk_r_motherwell_outlet_flow_rate == null||
      gvar.nmb_cgk_r_coega_idz_outlet_flow_rate ==undefined ||  gvar.nmb_cgk_r_coega_idz_outlet_flow_rate ==null ||
      gvar.nmb_cgk_r_valve_chamber_pressure==undefined ||  gvar.nmb_cgk_r_valve_chamber_pressure==null ||
      updateTimeCGK<fiveMinAgo){}
   else{
    var NMBM_CGK_R_Trend = mongoose.model('NMBM_CGK_R_Trend',NMBM_CGK_R_TrendSchema,'NMBM_CGK_R_Trend' )
    var nmbm_CGK_R_Trend = new NMBM_CGK_R_Trend({
      date: date,
      level:gvar.nmb_cgk_r_reservoir_level,
      nmb_cgk_r_grassridge_inlet_flow_rate: gvar.nmb_cgk_r_grassridge_inlet_flow_rate,
      nmb_cgk_r_motherwell_outlet_flow_rate: gvar.nmb_cgk_r_motherwell_outlet_flow_rate,
      nmb_cgk_r_coega_idz_outlet_flow_rate: gvar.nmb_cgk_r_coega_idz_outlet_flow_rate,
      pressure:gvar.nmb_cgk_r_valve_chamber_pressure

    })
    nmbm_CGK_R_Trend.save();
  }
  }setTimeout(CoegaKopTrend, 60000);
}


 var NMBM_CGK_R_TotalFlow_TrendSchema = mongoose.Schema({
    date:{type: Date},
    coegatotalflow: {type: Number},
    motherwelltotalflow: {type: Number},
    grassridgetotalflow:{type: Number}
  })
  function CoegaKopTrendTotalFlow() {
  var now =  new Date();

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeCGK=Get_UpdateTimeMS(gvar.nmb_cgk_r_ut)
  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

 if (hour==23 && min==55){
    if(gvar.nmb_cgk_r_grassridge_inlet_total_flow == undefined || gvar.nmb_cgk_r_grassridge_inlet_total_flow == null ||
      gvar.nmb_cgk_r_coega_idz_outlet_total_flow == undefined || gvar.nmb_cgk_r_coega_idz_outlet_total_flow == null ||
      gvar.nmb_cgk_r_motherwell_outlet_total_flow == undefined || gvar.nmb_cgk_r_motherwell_outlet_total_flow == null||
      updateTimeCGK<fiveMinAgo){}
   else{
    var NMBM_CGK_R_TotalFlow = mongoose.model('NMBM_CGK_R_TotalFlow',NMBM_CGK_R_TotalFlow_TrendSchema,'NMBM_CGK_R_TotalFlow' )
    var nmbm_CGK_R_TotalFlow = new NMBM_CGK_R_TotalFlow({
      date: date,
      grassridgetotalflow: gvar.nmb_cgk_r_grassridge_inlet_total_flow,
      coegatotalflow: gvar.nmb_cgk_r_coega_idz_outlet_total_flow,
      motherwelltotalflow: gvar.nmb_cgk_r_motherwell_outlet_total_flow

    })
    nmbm_CGK_R_TotalFlow.save();
  }
  }setTimeout(CoegaKopTrendTotalFlow, 60000)
 }


 function ReservoirTotalFlows(){  //creates and saves all Reservoir levels in the DB for trends
  var now =  new Date();

var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var hour = now.getHours();
var min = now.getMinutes();
var fiveMinAgo = Get_5Min_Ago();
var updateTimeSM=Get_UpdateTimeMS(gvar.sm_ut)

var date = year + "-" + month + "-" + day +" "+ hour +":"+ min; //gets the present date and time

      if (hour==23 && min==55){ //save at midnight

  if(gvar.sm_fm_tf==undefined || gvar.sm_fm_tf==null || updateTimeSM<fiveMinAgo){}
  else
  {
    var BR_SM_TF = mongoose.model('BR_SM_TF',TF_TrendSchema,'BR_SM_TF')
    var sm_TF = new BR_SM_TF({
     date: date,
    totalflow: gvar.sm_fm_tf,
  })
  sm_TF.save()
}
}  setTimeout(ReservoirTotalFlows, 60000); // repeats function every one minute

 }



 var BR_GB_RES_LVLTrendSchema = mongoose.Schema({
  date:{type: Date},
  level: {type: Number},
  gb_R_FR: {type: Number},
})
function Greenbushes_Reservoir() {
var now =  new Date();

var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var hour = now.getHours();
var min = now.getMinutes();
var fiveMinAgo = Get_5Min_Ago();
var updateTimeCGK=Get_UpdateTimeMS(gvar.gb_R_UT)
var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

if (min % 10 === 0){
  if(gvar.gb_R_FR == undefined || gvar.gb_R_FR == null ||
    gvar.gb_R_LVL == undefined || gvar.gb_R_LVL == null ||

    updateTimeCGK<fiveMinAgo){}
 else{
  var BR_GB_RES_LVL = mongoose.model('BR_GB_RES_LVL',BR_GB_RES_LVLTrendSchema,'BR_GB_RES_LVL' )
  var br_GB_RES_LVL = new BR_GB_RES_LVL({
    date: date,
    level:gvar.gb_R_LVL,
    gb_R_FR:gvar.gb_R_FR
  })
  br_GB_RES_LVL.save();
}
}setTimeout(Greenbushes_Reservoir, 60000);
}


var BR_GB_RES_LVL_TF_TrendSchema = mongoose.Schema({
  date:{type: Date},
  gb_R_FRF: {type: Number},
  gb_R_FRR:{type: Number}
})
function Greenbushes_Reservoir_TF() {
var now =  new Date();

var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var hour = now.getHours();
var min = now.getMinutes();
var fiveMinAgo = Get_5Min_Ago();
var updateTimeCGK=Get_UpdateTimeMS(gvar.gb_R_UT)
var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

if (hour==23 && min==55){
  if(gvar.gb_R_FRR == undefined || gvar.gb_R_FRR == null ||
    gvar.gb_R_FRF == undefined || gvar.gb_R_FRF == null ||

    updateTimeCGK<fiveMinAgo){}
 else{
  var BR_GB_RES_LVL_TF = mongoose.model('BR_GB_RES_LVL_TF',BR_GB_RES_LVL_TF_TrendSchema,'BR_GB_RES_LVL_TF' )
  var br_GB_RES_LVL_TF = new BR_GB_RES_LVL_TF({
    date: date,
    gb_R_FRR:gvar.gb_R_FRR,
    gb_R_FRF:gvar.gb_R_FRF
  })
  br_GB_RES_LVL_TF.save();
}
}setTimeout(Greenbushes_Reservoir_TF, 60000);
}

var grassRidgeFlowRateSchema = mongoose.Schema({
  date:{type: Date},
  gr_R_INLET_FLOWS: {type: Number},
  gr_R_OUTLET_FLOW: {type: Number},
})

function Grassridge_Flow() {
  var now =  new Date();

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeCGK=Get_UpdateTimeMS(gvar.gr_ut)
  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

  if (min % 10 === 0){
    if(gvar.gr_R_INTLET == undefined || gvar.gr_R_INTLET == null ||
      gvar.gr_R_OUTLET == undefined || gvar.gr_R_OUTLET == null ||

      updateTimeCGK<fiveMinAgo){}
   else{
    var GRASS_RIDGE_RES_FLOW_RATES = mongoose.model('GRASS_RIDGE_RES_FLOW_RATES',grassRidgeFlowRateSchema,'GRASS_RIDGE_RES_FLOW_RATES' )
    var grass_RES_RIDGE_FLOW_RATES = new GRASS_RIDGE_RES_FLOW_RATES({
      date: date,
      gr_R_INLET_FLOWS:gvar.gr_R_INTLET,
      gr_R_OUTLET_FLOW:gvar.gr_R_OUTLET
    })
    grass_RES_RIDGE_FLOW_RATES.save();
  }
  }setTimeout(Grassridge_Flow, 60000);
  }


  var emerFlowRateSchema = mongoose.Schema({
    date:{type: Date},
    level: {type: Number},
    emer_flow_rate: {type: Number},
  })

  function EmeraldHill_Flow() {
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.emer_ut)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (min % 10 === 0){
      if(gvar.emer_lvl == undefined || gvar.emer_lvl == null ||
        gvar.emer_flow_rate == undefined || gvar.emer_flow_rate == null ||

        updateTimeCGK<fiveMinAgo){}
     else{
      var NMB_EMER_H_RES_LVL = mongoose.model('NMB_EMER_H_RES_LVL',emerFlowRateSchema,'NMB_EMER_H_RES_LVL' )
      var emer_RES_FLOW_RATES = new NMB_EMER_H_RES_LVL({
        date: date,
        level:gvar.emer_lvl,
        emer_flow_rate:gvar.emer_flow_rate,
      })
      emer_RES_FLOW_RATES.save();
    }
    }setTimeout(EmeraldHill_Flow, 60000);
    }

    var emerTotalFlowRateSchema = mongoose.Schema({
      date:{type: Date},

      emer_total_flow: {type: Number},
    })

    function EmeraldHill_TotalFlow() {
      var now =  new Date();

      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeCGK=Get_UpdateTimeMS(gvar.emer_ut)
      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

      if (min == 23 && hour == 55){
        if(gvar.emer_total_flow == undefined || gvar.emer_total_flow == null ||

          updateTimeCGK<fiveMinAgo){}
       else{
        var NMB_EMER_H_TOTAL_RES_LVL = mongoose.model('NMB_EMER_H_TOTAL_RES_LVL',emerTotalFlowRateSchema,'NMB_EMER_H_TOTAL_RES_LVL' )
        var emer_EMER_H_TOTAL_RES_LVL = new NMB_EMER_H_TOTAL_RES_LVL({
          date: date,
          emer_total_flow:gvar.emer_total_flow,
        })
        emer_EMER_H_TOTAL_RES_LVL.save();
      }
      }setTimeout(EmeraldHill_TotalFlow, 60000);
      }



  var driftFlowRateSchema = mongoose.Schema({
    date:{type: Date},
    drift_r_reservoir_level: {type: Number},
    drift_r_flow_rate_1: {type: Number},
    drift_r_flow_rate_2: {type: Number},

  })

  function Drift_Flow() {
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.drift_r_ut)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (min % 10 === 0){
      if(gvar.drift_r_reservoir_level == undefined || gvar.drift_r_reservoir_level == null ||
        gvar.drift_r_flow_rate_1 == undefined || gvar.drift_r_flow_rate_1 == null ||
        gvar.drift_r_flow_rate_2 == undefined || gvar.drift_r_flow_rate_2 == null ||


        updateTimeCGK<fiveMinAgo){}
     else{
      var NMB_DRIFT_RES_LVL = mongoose.model('NMB_DRIFT_RES_LVL',driftFlowRateSchema,'NMB_DRIFT_RES_LVL' )
      var nmb_DRIFT_RES_LVL = new NMB_DRIFT_RES_LVL({
        date: date,
        drift_r_reservoir_level:gvar.drift_r_reservoir_level,
        drift_r_flow_rate_1:gvar.drift_r_flow_rate_1,
        drift_r_flow_rate_2:gvar.drift_r_flow_rate_2,
      })
      nmb_DRIFT_RES_LVL.save();
    }
    }setTimeout(Drift_Flow, 60000);
    }






      var driftTotalFlowRateSchema = mongoose.Schema({
        date:{type: Date},
        drift_r_total_flow_1: {type: Number},
        drift_r_total_flow_2: {type: Number},
      })

      function Drift_TotalFlow() {
        var now =  new Date();

        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var fiveMinAgo = Get_5Min_Ago();
        var updateTimeCGK=Get_UpdateTimeMS(gvar.drift_r_ut)
        var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

        if (hour==23 && min==55){
          if(gvar.drift_r_total_flow_1 == undefined || gvar.drift_r_total_flow_1 == null ||
            gvar.drift_r_total_flow_2 == undefined || gvar.drift_r_total_flow_2 == null ||

            updateTimeCGK<fiveMinAgo){}
         else{
          var NMB_DRIFT_TOTAL_FLOW = mongoose.model('NMB_DRIFT_TOTAL_FLOW',driftTotalFlowRateSchema,'NMB_DRIFT_TOTAL_FLOW' )
          var nmb_DRIFT_TOTAL_FLOW = new NMB_DRIFT_TOTAL_FLOW({
            date: date,
            drift_r_total_flow_1:gvar.drift_r_total_flow_1,
            drift_r_total_flow_2:gvar.drift_r_total_flow_2,
          })
          nmb_DRIFT_TOTAL_FLOW.save();
        }
        }setTimeout(Drift_TotalFlow, 60000);
        }




        var schoelFlowRateSchema = mongoose.Schema({
          date:{type: Date},
          nmb_schoe_r_res_level: {type: Number},
          nmb_schoe_r_pressure: {type: Number},
          nmb_schoe_r_actuator_position: {type: Number},
          nmb_schoe_r_actuator_set_point: {type: Number},
        })

        function SCHOE_FLOW_RATE() {
          var now =  new Date();

          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes();
          var sec = now.getSeconds();
          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeCGK=Get_UpdateTimeMS(gvar.nmb_schoe_r_ut)
          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min +":" + sec;

          if (date){
            if(gvar.nmb_schoe_r_res_level == undefined || gvar.nmb_schoe_r_res_level == null ||
              gvar.nmb_schoe_r_pressure == undefined || gvar.nmb_schoe_r_pressure == null ||
              gvar.nmb_schoe_r_actuator_position == undefined || gvar.nmb_schoe_r_actuator_position == null ||
              gvar.nmb_schoe_r_actuator_set_point == undefined || gvar.nmb_schoe_r_actuator_set_point == null ||

              updateTimeCGK<fiveMinAgo){}
           else{
            var NMB_SCHOE_FLOW_RATE = mongoose.model('NMB_SCHOE_FLOW_RATE',schoelFlowRateSchema,'NMB_SCHOE_FLOW_RATE' )
            var nmb_SCHOE_FLOW_RATE = new NMB_SCHOE_FLOW_RATE({
              date: date,
              nmb_schoe_r_res_level:gvar.nmb_schoe_r_res_level,
              nmb_schoe_r_pressure:gvar.nmb_schoe_r_pressure,
              nmb_schoe_r_actuator_position:gvar.nmb_schoe_r_actuator_position,
              nmb_schoe_r_actuator_set_point:gvar.nmb_schoe_r_actuator_set_point,
            })
            nmb_SCHOE_FLOW_RATE.save();
          }
          }setTimeout(SCHOE_FLOW_RATE, 10000);
          }

          var schoeFaultSchema = mongoose.Schema({
            date:{type: Date},
            nmb_schoe_r_actuator_valve_feedback_signal_error: {type: Number},
            nmb_schoe_r_actuator_valve_command_signal_error: {type: Number},
            nmb_schoe_r_reservoir_level_signal_error: {type: Number},
            nmb_schoe_r_actuator_valve_fault: {type: Number},
            nmb_schoe_r_actuator_valve_torque_fail_close: {type: Number},
            nmb_schoe_r_actuator_valve_torque_fail_open: {type: Number},
            nmb_schoe_r_general_fault: {type: Number},
            nmb_schoe_r_actuator_general_fault: {type: Number},
            nmb_schoe_r_actuator_valve_timeout: {type: Number},
          })

          function SCHOE_FAULT() {
            var now =  new Date();

            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hour = now.getHours();
            var min = now.getMinutes();
            var sec = now.getSeconds();
            var fiveMinAgo = Get_5Min_Ago();
            var updateTimeCGK=Get_UpdateTimeMS(gvar.nmb_schoe_r_ut)
            var date = year + "-" + month + "-" + day +" "+ hour +":"+ min +":" + sec;

            if (date){
              if(gvar.nmb_schoe_r_actuator_valve_feedback_signal_error == undefined || gvar.nmb_schoe_r_actuator_valve_feedback_signal_error == null ||
                gvar.nmb_schoe_r_actuator_valve_command_signal_error == undefined || gvar.nmb_schoe_r_actuator_valve_command_signal_error == null ||
                gvar.nmb_schoe_r_reservoir_level_signal_error == undefined || gvar.nmb_schoe_r_reservoir_level_signal_error == null ||
                gvar.nmb_schoe_r_actuator_valve_fault == undefined || gvar.nmb_schoe_r_actuator_valve_fault == null ||
                gvar.nmb_schoe_r_actuator_valve_torque_fail_close == undefined || gvar.nmb_schoe_r_actuator_valve_torque_fail_close == null ||
                gvar.nmb_schoe_r_actuator_valve_torque_fail_open == undefined || gvar.nmb_schoe_r_actuator_valve_torque_fail_open == null ||
                gvar.nmb_schoe_r_general_fault == undefined || gvar.nmb_schoe_r_general_fault == null ||
                gvar.nmb_schoe_r_actuator_general_fault == undefined || gvar.nmb_schoe_r_actuator_general_fault == null ||
                gvar.nmb_schoe_r_actuator_valve_timeout == undefined || gvar.nmb_schoe_r_actuator_valve_timeout == null ||

                updateTimeCGK<fiveMinAgo){}
             else{
              var NMB_SCHOE_FAULT = mongoose.model('NMB_SCHOE_FAULT',schoeFaultSchema,'NMB_SCHOE_FAULT' )
              var nmb_SCHOE_FAULT = new NMB_SCHOE_FAULT({
                date: date,
                nmb_schoe_r_actuator_valve_feedback_signal_error:gvar.nmb_schoe_r_actuator_valve_feedback_signal_error,
                nmb_schoe_r_actuator_valve_command_signal_error:gvar.nmb_schoe_r_actuator_valve_command_signal_error,
                nmb_schoe_r_reservoir_level_signal_error:gvar.nmb_schoe_r_reservoir_level_signal_error,
                nmb_schoe_r_actuator_valve_fault:gvar.nmb_schoe_r_actuator_valve_fault,
                nmb_schoe_r_actuator_valve_torque_fail_close:gvar.nmb_schoe_r_actuator_valve_torque_fail_close,
                nmb_schoe_r_actuator_valve_torque_fail_open:gvar.nmb_schoe_r_actuator_valve_torque_fail_open,
                nmb_schoe_r_general_fault:gvar.nmb_schoe_r_general_fault,
                nmb_schoe_r_actuator_general_fault:gvar.nmb_schoe_r_actuator_general_fault,
                nmb_schoe_r_actuator_valve_timeout:gvar.nmb_schoe_r_actuator_valve_timeout,
              })
              nmb_SCHOE_FAULT.save();
            }
            }setTimeout(SCHOE_FAULT, 10000);
            }

            var bergenScheme = mongoose.Schema({
              date: {type:Date},
              bergen_r_level: {type: Number},
            })

            function BERGEN_RES() {
              var now =  new Date();

              var year = now.getFullYear();
              var month = now.getMonth() + 1;
              var day = now.getDate();
              var hour = now.getHours();
              var min = now.getMinutes();
              var fiveMinAgo = Get_5Min_Ago();
              var updateTimeCGK=Get_UpdateTimeMS(gvar.bergen_r_ut)
              var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

              if (min === 0 ){
                if( gvar.bergen_r_level == undefined || gvar.bergen_r_level == null ||


                  updateTimeCGK<fiveMinAgo){}
               else{
                var GRAAF_BERGEN_RES = mongoose.model('GRAAF_BERGEN_RES',bergenScheme,'GRAAF_BERGEN_RES' )
                var graaf_BERGEN_RES = new GRAAF_BERGEN_RES({
                  date: date,
                  bergen_r_level:gvar.bergen_r_level,
                })
                graaf_BERGEN_RES.save();
              }
              }setTimeout(BERGEN_RES, 60000);
              }

            var wolwasScheme = mongoose.Schema({
              date: {type:Date},
              wolwas_r_level: {type: Number},
            })

            function WOLWAS_RES() {
              var now =  new Date();

              var year = now.getFullYear();
              var month = now.getMonth() + 1;
              var day = now.getDate();
              var hour = now.getHours();
              var min = now.getMinutes();
              var fiveMinAgo = Get_5Min_Ago();
              var updateTimeCGK=Get_UpdateTimeMS(gvar.wolwas_r_ut)
              var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

              if (min === 0 ){
                if( gvar.wolwas_r_level == undefined || gvar.wolwas_r_level == null ||


                  updateTimeCGK<fiveMinAgo){}
               else{
                var GRAAF_WOLWAS_RES = mongoose.model('GRAAF_WOLWAS_RES',wolwasScheme,'GRAAF_WOLWAS_RES' )
                var graaf_WOLWAS_RES = new GRAAF_WOLWAS_RES({
                  date: date,
                  wolwas_r_level:gvar.wolwas_r_level,
                })
                graaf_WOLWAS_RES.save();
              }
              }setTimeout(WOLWAS_RES, 60000);
              }

            var umiScheme = mongoose.Schema({
              date: {type:Date},
              uma_r_level: {type: Number},
            })

            function UMI_RES() {
              var now =  new Date();

              var year = now.getFullYear();
              var month = now.getMonth() + 1;
              var day = now.getDate();
              var hour = now.getHours();
              var min = now.getMinutes();
              var fiveMinAgo = Get_5Min_Ago();
              var updateTimeCGK=Get_UpdateTimeMS(gvar.uma_r_ut)
              var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

              if (min === 0 ){
                if(
                  gvar.uma_r_level == undefined || gvar.uma_r_level == null ||


                  updateTimeCGK<fiveMinAgo){}
               else{
                var GRAAF_UMA_RES = mongoose.model('GRAAF_UMA_RES',umiScheme,'GRAAF_UMA_RES' )
                var graaf_UMI_RES = new GRAAF_UMA_RES({
                  date: date,
                  uma_r_level:gvar.uma_r_level,
                })
                graaf_UMI_RES.save();
              }
              }setTimeout(UMI_RES, 60000);
              }


            var DAMP_scheme = mongoose.Schema({
              date: {type:Date},
              level:{type: Number},
            })

            function DAMP_RES(){
              var now =  new Date();

              var year = now.getFullYear();
              var month = now.getMonth() + 1;
              var day = now.getDate();
              var hour = now.getHours();
              var min = now.getMinutes();
              var fiveMinAgo = Get_5Min_Ago();
              var updateTimeCGK=Get_UpdateTimeMS(gvar.damp_r_ut)
              var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

              if (min === 0 ){
                if(gvar.damp_r_level==undefined || gvar.damp_r_level==null|| updateTimeCGK<fiveMinAgo){}
                else{
                  var DAMP_GRAAF_RES_LVL = mongoose.model('DAMP_GRAAF_RES_LVL',DAMP_scheme,'DAMP_GRAAF_RES_LVL')// creates collection (model name, fields used, colelction name)
                  var damp_GRAAF_RES_LVL = new DAMP_GRAAF_RES_LVL({
                   date: date, // storing the current date
                  level: gvar.damp_r_level, //stroing the current value
                })
                damp_GRAAF_RES_LVL.save() //save to DB
                }
              }setTimeout(DAMP_RES, 60000)


            }

            var tin_scheme = mongoose.Schema({
              date: {type:Date},
              level:{type: Number},
            })

            function TIN_RES(){
              var now =  new Date();

              var year = now.getFullYear();
              var month = now.getMonth() + 1;
              var day = now.getDate();
              var hour = now.getHours();
              var min = now.getMinutes();
              var fiveMinAgo = Get_5Min_Ago();
              var updateTimeCGK=Get_UpdateTimeMS(gvar.tin_r_ut)
              var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

              if (min === 0 ){
                if(gvar.tin_r_level==undefined || gvar.tin_r_level==null|| updateTimeCGK<fiveMinAgo){}
                else{
                  var TIN_GRAAF_RES_LVL = mongoose.model('TIN_GRAAF_RES_LVL',tin_scheme,'TIN_GRAAF_RES_LVL')// creates collection (model name, fields used, colelction name)
                   var tin_GRAAF_RES_LVL = new TIN_GRAAF_RES_LVL({
                     date: date, // storing the current date
                     level: gvar.tin_r_level, //stroing the current value
                 })
                   tin_GRAAF_RES_LVL.save() //save to DB


                }

               }setTimeout(TIN_RES, 60000)

            }

            var hol_scheme = mongoose.Schema({
              date: {type:Date},
              level:{type: Number},
            })

            function HOL_RES(){
              var now =  new Date();

              var year = now.getFullYear();
              var month = now.getMonth() + 1;
              var day = now.getDate();
              var hour = now.getHours();
              var min = now.getMinutes();
              var fiveMinAgo = Get_5Min_Ago();
              var updateTimeCGK=Get_UpdateTimeMS(gvar.hol_r_ut)
              var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

              if (min === 0 ){
                if(gvar.hol_r_level==undefined || gvar.hol_r_level==null|| updateTimeCGK<fiveMinAgo){}
                else{
                  var HOL_GRAAF_RES_LVL = mongoose.model('HOL_GRAAF_RES_LVL',hol_scheme,'HOL_GRAAF_RES_LVL')// creates collection (model name, fields used, colelction name)
                  var hol_GRAAF_RES_LVL = new HOL_GRAAF_RES_LVL({
                   date: date, // storing the current date
                  level: gvar.hol_r_level, //stroing the current value
                })
                hol_GRAAF_RES_LVL.save() //save to DB

                }

               }setTimeout(HOL_RES, 60000)

            }




            var kroonScheme = mongoose.Schema({
              date: {type:Date},
              kroon_r_level: {type: Number},
            })

            function KROON_RES() {
              var now =  new Date();

              var year = now.getFullYear();
              var month = now.getMonth() + 1;
              var day = now.getDate();
              var hour = now.getHours();
              var min = now.getMinutes();
              var fiveMinAgo = Get_5Min_Ago();
              var updateTimeCGK=Get_UpdateTimeMS(gvar.kroon_r_ut)
              var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

              if (min === 0 ){
                if(gvar.kroon_r_level == undefined || gvar.kroon_r_level == null ||


                  updateTimeCGK<fiveMinAgo){}
               else{
                var GRAAF_KROON_RES = mongoose.model('GRAAF_KROON_RES',kroonScheme,'GRAAF_KROON_RES' )
                var graaf_KROON_RES = new GRAAF_KROON_RES({
                  date: date,
                  kroon_r_level:gvar.kroon_r_level,
                })
                graaf_KROON_RES.save();
              }
              }setTimeout(KROON_RES, 60000);
              }



              var BUSH_FR_TrendSchema = mongoose.Schema({
                date:{type: Date},

                bush_church_socco_fr: {type: Number},
                bush_church_steel_fr: {type: Number},
                bush_church_socco_bar:{type: Number},

                bush_church_steel_bar: {type: Number},
                bush_pump_fr: {type: Number},
                bush_gw_comb_flow_rate:{type: Number},

                bush_tank_lvl:{type: Number},
                })
              function BUSH_FR_Trend(){
                var now =  new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var day = now.getDate();
                var hour = now.getHours();
                var min = now.getMinutes();

                var fiveMinAgo = Get_5Min_Ago();
                var updateTimeVW=Get_UpdateTimeMS(gvar.bush_UT)

                var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

                if (min % 10 === 0){
                  if(
                    gvar.bush_church_socco_fr==undefined || gvar.bush_church_socco_fr==null ||
                    gvar.bush_church_steel_fr==undefined || gvar.bush_church_steel_fr==null ||
                    gvar.bush_church_socco_bar==undefined || gvar.bush_church_socco_bar==null ||
                    gvar.bush_church_steel_bar==undefined || gvar.bush_church_steel_bar==null ||
                    gvar.bush_pump_fr==undefined || gvar.bush_pump_fr==null ||
                    gvar.bush_gw_comb_flow_rate==undefined || gvar.bush_gw_comb_flow_rate==null ||
                    gvar.bush_tank_lvl==undefined || gvar.bush_tank_lvl==null ||
                    updateTimeVW<fiveMinAgo){}
                  else
                  {
                    var NMB_BUSH_FR = mongoose.model('NMB_BUSH_FR',BUSH_FR_TrendSchema,'NMB_BUSH_FR')
                    var nmb_BUSH_FR = new NMB_BUSH_FR({
                     date: date,
                     bush_church_socco_fr: gvar.bush_church_socco_fr,
                     bush_church_steel_fr: gvar.bush_church_steel_fr,
                     bush_church_socco_bar : gvar.bush_church_socco_bar,
                     bush_church_steel_bar: gvar.bush_church_steel_bar,
                     bush_pump_fr: gvar.bush_pump_fr,
                     bush_gw_comb_flow_rate : gvar.bush_gw_comb_flow_rate,
                     bush_tank_lvl : gvar.no,
                  })
                  nmb_BUSH_FR.save()
                }
                 }setTimeout(BUSH_FR_Trend, 60000);
              }


              var KARK_R_TrendSchema = mongoose.Schema({
                date:{type: Date},

                kark_R_lvl: {type: Number},

                })

                function KARK_R_Trend(){
                  var now =  new Date();
                  var year = now.getFullYear();
                  var month = now.getMonth() + 1;
                  var day = now.getDate();
                  var hour = now.getHours();
                  var min = now.getMinutes();

                  var fiveMinAgo = Get_5Min_Ago();
                  var updateTime=Get_UpdateTimeMS(gvar.kark_R_comms_UT)

                var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

                if (min === 0){
                  if(
                    gvar.bush_church_socco_fr==undefined || gvar.bush_church_socco_fr==null ||
                    updateTime<fiveMinAgo){}
                    else{
                      var KARK_R = mongoose.model('KARK_R',KARK_R_TrendSchema,'KARK_R')
                      var kark_R = new KARK_R({
                        date: date,
                        kark_R_lvl:gvar.kark_R_lvl

                      })
                      kark_R.save()

                    }
                }setTimeout(KARK_R_Trend, 60000);


                }

                var COE_KOP_R_TrendSchema = mongoose.Schema({
                  date:{type: Date},

                  coe_kop_cloud_r_level: {type: Number},

                  })

                  function COE_KOP_R_Trend(){
                    var now =  new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth() + 1;
                    var day = now.getDate();
                    var hour = now.getHours();
                    var min = now.getMinutes();

                    var fiveMinAgo = Get_5Min_Ago();
                    var updateTime=Get_UpdateTimeMS(gvar.coe_kop_cloud_r_ut)

                  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

                  //Find another way to write this if statemenmt
                  if (min === 0){
                    if(
                      gvar.coe_kop_cloud_r_level==undefined || gvar.coe_kop_cloud_r_level==null ||
                      updateTime<fiveMinAgo){}
                      else{
                        var NMBM_CGK_R_Trend = mongoose.model('NMBM_CGK_R_Trend',COE_KOP_R_TrendSchema,'NMBM_CGK_R_Trend')
                        var nmbm_CGK_R_Trend = new NMBM_CGK_R_Trend({
                          date: date,
                          coe_kop_cloud_r_level:gvar.coe_kop_cloud_r_level

                        })
                        nmbm_CGK_R_Trend.save()

                      }
                  }setTimeout(KARK_R_Trend, 60000);


                  }


                  var bush_TF_TrendSchema = mongoose.Schema({
                    date:{type:Date},
                    bush_gw_TF:{type: Number},
                    bush_ps_TF:{type: Number},
                    bush_church_steel_TF:{type: Number},
                    bush_church_soco_TF:{type: Number},
                  })

                  function BUSH_FR_Trend_TF(){
                    var now =  new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth() + 1;
                    var day = now.getDate();
                    var hour = now.getHours();
                    var min = now.getMinutes();

                    var fiveMinAgo = Get_5Min_Ago();
                    var updateTimeVW=Get_UpdateTimeMS(gvar.bush_UT)
                    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

                    if(hour == 23 && min == 55){
                      if(gvar.bush_gw_TF == undefined || gvar.bush_gw_TF == null||
                        gvar.bush_ps_TF == undefined || gvar.bush_ps_TF == null||
                        gvar.bush_church_steel_TF == undefined || gvar.bush_church_steel_TF == null||
                        gvar.bush_church_soco_TF == undefined || gvar.bush_church_soco_TF == null|| updateTimeVW<fiveMinAgo){}

                    else{
                      var NMB_BUSH_FR = mongoose.model('NMB_BUSH_FR',bush_TF_TrendSchema,'NMB_BUSH_FR')
                      var nmb_BUSH_FR = new NMB_BUSH_FR({
                        date: date,
                        coe_kop_cloud_r_level:gvar.coe_kop_cloud_r_level

                      })
                      nmb_BUSH_FR.save()

                    }


                  }setTimeout(BUSH_FR_Trend_TF, 60000)

                  }





                  var kwano_R_TrendSchema = mongoose.Schema({
                    date:{type:Date},
                    kwano_r_reservoir_level:{type: Number},
                    kwano_r_flow_rate_1:{type: Number},
                    kwano_r_flow_rate_2:{type: Number},
                  })


                    function KWANO_R_Trend(){
                    var now =  new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth() + 1;
                    var day = now.getDate();
                    var hour = now.getHours();
                    var min = now.getMinutes();

                    var fiveMinAgo = Get_5Min_Ago();
                    var updateTimeVW=Get_UpdateTimeMS(gvar.kwano_r_ut)
                    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;


                    if (min % 10 === 0){
                      if(gvar.kwano_r_reservoir_level == undefined ||gvar.kwano_r_reservoir_level == null ||
                        gvar.kwano_r_flow_rate_1 == undefined ||gvar.kwano_r_flow_rate_1 == null ||
                        gvar.kwano_r_flow_rate_2 == undefined ||gvar.kwano_r_flow_rate_2 == null ||
                        updateTimeVW<fiveMinAgo){}
                    }
                    else{
                      var NMB_KWANO_R = mongoose.model('NMB_KWANO_R',kwano_R_TrendSchema,'NMB_KWANO_R')
                      var nmb_KWANO_R = new NMB_KWANO_R({
                        date: date,
                        kwano_r_reservoir_level:gvar.kwano_r_reservoir_level,
                        kwano_r_flow_rate_1:gvar.kwano_r_flow_rate_1,
                        kwano_r_flow_rate_2:gvar.kwano_r_flow_rate_2
                      })
                      nmb_KWANO_R.save()
                    }setTimeout(KWANO_R_Trend, 60000)
                  }

                  var kwano_TF_TrendSchema = mongoose.Schema({
                    date:{type:Date},
                    kwano_r_total_flow_1:{type: Number},
                    kwano_r_total_flow_2:{type: Number},
                  })

                    function KWANO_R_Trend_TF(){
                    var now =  new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth() + 1;
                    var day = now.getDate();
                    var hour = now.getHours();
                    var min = now.getMinutes();

                    var fiveMinAgo = Get_5Min_Ago();
                    var updateTimeVW=Get_UpdateTimeMS(gvar.kwano_r_ut)
                    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

                    if(hour == 23 && min == 55){
                      if(gvar.kwano_r_total_flow_1 == undefined ||gvar.kwano_r_total_flow_1 == null ||
                        gvar.kwano_r_total_flow_2 == undefined ||gvar.kwano_r_total_flow_2 == null ||
                        updateTimeVW<fiveMinAgo){}
                    }
                    else{
                      var NMB_KWANO_R_TF = mongoose.model('NMB_KWANO_R_TF',kwano_TF_TrendSchema,'NMB_KWANO_R_TF')
                      var nmb_KWANO_R_TF = new NMB_KWANO_R_TF({
                        date: date,
                        kwano_r_total_flow_1:gvar.kwano_r_total_flow_1,
                        kwano_r_total_flow_2:gvar.kwano_r_total_flow_2
                      })
                      nmb_KWANO_R_TF.save()
                    }setTimeout(KWANO_R_Trend_TF, 60000)
                  }


                  var chelsea_Res_TF_TrendSchema = mongoose.Schema({
                    date:{type:Date},
                    che_r_tf1100:{type: Number},
                    che_r_tf600:{type: Number},
                  })

                  function CHEL_R_TF_TREND(){
                    var now =  new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth() + 1;
                    var day = now.getDate();
                    var hour = now.getHours();
                    var min = now.getMinutes();

                    var fiveMinAgo = Get_5Min_Ago();
                    var updateTimeVW=Get_UpdateTimeMS(gvar.che_r_ut)
                    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

                    if(hour == 23 && min == 55){
                      if(gvar.che_r_tf1100 == undefined ||gvar.che_r_tf1100 == null ||
                        gvar.che_r_tf600 == undefined ||gvar.che_r_tf600 == null ||
                        updateTimeVW<fiveMinAgo){}
                    }
                    else{
                      var NMB_KWANO_R_TF = mongoose.model('CHEL_RES_TF',chelsea_Res_TF_TrendSchema,'CHEL_RES_TF')
                      var nmb_KWANO_R_TF = new NMB_KWANO_R_TF({
                        date: date,
                        che_r_tf600:gvar.che_r_tf600,
                        che_r_tf1100:gvar.che_r_tf1100
                      })
                      nmb_KWANO_R_TF.save()
                    }setTimeout(CHEL_R_TF_TREND, 60000)
                  }

                  function HEATH_R_PS_TREND(){
                    var now =  new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth() + 1;
                    var day = now.getDate();
                    var hour = now.getHours();
                    var min = now.getMinutes();

                    var fiveMinAgo = Get_5Min_Ago();
                    var updateTimeVW=Get_UpdateTimeMS(gvar.hb_R_UT)
                    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

                    if (min % 10 === 0){
                      if(gvar.hb_R_LVL==undefined || gvar.hb_R_LVL==null  ||
                        gvar.hb_P1_CURRENT == undefined || gvar.hb_P1_CURRENT==null  ||
                        gvar.hb_P2_CURRENT == undefined || gvar.hb_P2_CURRENT==null  ||
                        gvar.hb_P3_CURRENT == undefined || gvar.hb_P3_CURRENT==null  ||
                        updateTimeVW<fiveMinAgo){}
                       else{
                        var DRS_HB_RES_LVL = mongoose.model('DRS_HB_RES_LVL',hb_RES_PS_TrendSchema,'DRS_HB_RES_LVL')
                        var hb_RES_LVL = new DRS_HB_RES_LVL({
                          date: date,
                          level: gvar.hb_R_LVL,
                          hb_P1_CURRENT:gvar.hb_P1_CURRENT,
                          hb_P2_CURRENT:gvar.hb_P2_CURRENT,
                          hb_P3_CURRENT:gvar.hb_P3_CURRENT,
                        })
                        hb_RES_LVL.save()

                      }

                      }
                      if(hour == 23 && min == 55){
                        if(gvar.hb_P1_RH ==undefined|| gvar.hb_P1_RH==null ||
                          gvar.hb_P2_RH ==undefined|| gvar.hb_P2_RH==null ||
                          gvar.hb_P3_RH ==undefined|| gvar.hb_P3_RH==null ||

                          updateTimeVW<fiveMinAgo){console.log("This also wont' work")}
                          else{
                            var DRS_HB_RES_LVL = mongoose.model('DRS_HB_RES_LVL',hb_RES_PS_TF_TrendSchema,'DRS_HB_RES_LVL')
                            var hb_RES_LVL = new DRS_HB_RES_LVL({
                              date:date,
                              hb_P3_RH:gvar.hb_P3_RH,
                              hb_P1_RH:gvar.hb_P1_RH,
                              hb_P2_RH:gvar.hb_P2_RH,

                             })
                             hb_RES_LVL.save()
                          }
                       }


                    setTimeout(HEATH_R_PS_TREND, 60000)
                  }



 function Get_UpdateTimeMS(UT){
  var updateTime = UT
  var  updateTimeMS =Date.parse(updateTime)
      return updateTimeMS}

function Get_5Min_Ago(){
  // Get current date minus 5 min in milliseconds
var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
var dateminus10minMS = cuurentDateMS - 300000
return dateminus10minMS
}


