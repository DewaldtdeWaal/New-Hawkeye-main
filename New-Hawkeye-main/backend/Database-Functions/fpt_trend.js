// file saves all FPT site Trends information

const mongoose = require('mongoose');
const gvar = require('../variables')

//called in server.js
module.exports = {FMT_Trend,FMT_Trend_TF,IDZT_Trend_TF,IDZT_Trend_FR,GT_BRG_TF,GT_BRG_Trend,UIT_FC_TF,UIT_FC_Trend,BETH_Trend,BETH_FPT_TF, JeffBayTakeOffTotalFlowFPT,JeffBayTakeOffBatteryFPT, JB_PB_SFO_TF,JB_PB_SFO_BATTER,ONS_PARA_TF,ONS_PARA_BATTER,KOU_MAIN_LIN,HUMANSDORP_OFF_TAK,HUMANSDORP_OFF_TAK_TF,GAMTOOS_BREAK_WATER_BAR_FLOW};









//FM Tower Total Flow
var FPT_TF_TrendSchema = mongoose.Schema({
  date:{type: Date},
  totalflow: {type: Number},
  })

function FMT_Trend_TF(){
  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes()
  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min; // get current date and time

  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeFMT=Get_UpdateTimeMS(gvar.fmt_FM_UT)
  if (hour==23 && min==59){ // totalflow data must only be recorded at midnight
    if(gvar.fmt_FM_TF==undefined || gvar.fmt_FM_TF==null || updateTimeFMT<fiveMinAgo){}
    else
    {
      var FM_FMT_TF = mongoose.model('FM_FMT_TF',FPT_TF_TrendSchema,'FM_FMT_TF')
      var fmt_TF = new FM_FMT_TF({
       date: date,
      totalflow: gvar.fmt_FM_TF,
    })

    fmt_TF.save()// save data in DB
  }
   }setTimeout(FMT_Trend_TF, 60000); //function repeats every 1 min
}

//FM Tower Trend
var FMT_TrendSchema = mongoose.Schema({
  date:{type: Date},
  flowRate: {type: Number},
  pressure: {type: Number},
  })
function FMT_Trend(){

  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes()
  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeFMT=Get_UpdateTimeMS(gvar.fmt_FM_UT)
  if (min % 10 === 0){

    if((gvar.fmt_FM_FR==undefined || gvar.fmt_FM_FR==null)
    ||(gvar.fmt_FM_PRESS==undefined || gvar.fmt_FM_PRESS==null) || updateTimeFMT<fiveMinAgo){}
    else
     {
       var FM_FMT_TREND = mongoose.model('FM_FMT_TREND',FMT_TrendSchema,'FM_FMT_TREND')
       var fmt_TREND = new FM_FMT_TREND({
        date: date,
       flowRate: gvar.fmt_FM_FR,
       pressure: gvar.fmt_FM_PRESS,
     })
     fmt_TREND.save()
   }
  }setTimeout(FMT_Trend, 60000);
  }


//Coega IDZT Total Flow
  var IDZT_TF_Schema = mongoose.Schema({
    date:{type: Date},
    motherwell_TF: {type: Number},
    idz_TF: {type: Number},
    })
  function IDZT_Trend_TF(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCIDZT=Get_UpdateTimeMS(gvar.fpt_cidzt_ut)
    if (hour==23 && min==59)
    {
      if(
        ((gvar.fpt_cidzt_mw_tf==undefined || gvar.fpt_cidzt_mw_tf==null)
      ||(gvar.fpt_cidzt_idz_tf==undefined || gvar.fpt_cidzt_idz_tf==null)) || updateTimeCIDZT<fiveMinAgo
      ){}
      else
      {
        var FPT_IDZT_TFs = mongoose.model('FPT_IDZT_TFs',IDZT_TF_Schema,'FPT_IDZT_TFs')
        var idzt_TFs = new FPT_IDZT_TFs({
         date: date,
         motherwell_TF: gvar.fpt_cidzt_mw_tf,
         idz_TF:gvar.fpt_cidzt_idz_tf
      })
      idzt_TFs.save()
    }
     }setTimeout(IDZT_Trend_TF, 60000);
  }



//Coega IDZT Flow Rates
  var IDZT_TrendSchema = mongoose.Schema({
    date:{type: Date},
    motherwell_FR: {type: Number},
    idz_FR: {type: Number},
    })
  function IDZT_Trend_FR(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCIDZT=Get_UpdateTimeMS(gvar.fpt_cidzt_ut)
    if (min % 10 === 0){
      if((gvar.motherwellTF==undefined || gvar.motherwellTF==null)
    ||(gvar.fpt_cidzt_idz_tf==undefined || gvar.fpt_cidzt_idz_tf==null) || updateTimeCIDZT<fiveMinAgo){}
      else
      {
        var FPT_IDZT_FRs = mongoose.model('FPT_IDZT_FRs',IDZT_TrendSchema,'FPT_IDZT_FRs')
        var idzt_FRs = new FPT_IDZT_FRs({
         date: date,
         motherwell_FR: gvar.fpt_cidzt_mw_fr,
         idz_FR:gvar.fpt_cidzt_idz_fr
      })
      idzt_FRs.save()
    }
     }setTimeout(IDZT_Trend_FR, 60000);
  }


  //Gamtoos Bridge Total Flow
  var GT_BRG_TF_Schema = mongoose.Schema({
    date:{type: Date},
    steel_pipe_TF: {type: Number},
    socoman_pipe_TF: {type: Number},
    })
  function GT_BRG_TF(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeGT_BRG=Get_UpdateTimeMS(gvar.fpt_cidzt_ut)
    if (hour==23 && min==59){
      if(
        ((gvar.fpt_gt_brg_stl_p_tf==undefined || gvar.fpt_gt_brg_stl_p_tf==null)
      ||(gvar.fpt_gt_brg_soco_p_tf==undefined || gvar.fpt_gt_brg_soco_p_tf==null))
      || updateTimeGT_BRG<fiveMinAgo
      ){}
      else
      {
        var FPT_GT_BRG_TFs = mongoose.model('FPT_GT_BRG_TFs',GT_BRG_TF_Schema,'FPT_GT_BRG_TFs')
        var gt_brg_TFs = new FPT_GT_BRG_TFs({
         date: date,
         steel_pipe_TF: gvar.fpt_gt_brg_stl_p_tf,
         socoman_pipe_TF:gvar.fpt_gt_brg_soco_p_tf
      })
      gt_brg_TFs.save()
    }
     }setTimeout(GT_BRG_TF, 60000);
  }



//Gamtoos Bridge Trend
  var GT_BRG_TrendSchema = mongoose.Schema({
    date:{type: Date},
    steel_pipe_FR: {type: Number},
    socoman_pipe_FR: {type: Number},
    steel_pipe_PRESS: {type: Number},
    socoman_pipe_PRESS: {type: Number},
    })
  function GT_BRG_Trend(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
    var fiveMinAgo = Get_5Min_Ago();

    var updateTimeGT_BRG=Get_UpdateTimeMS(gvar.fpt_gt_brg_ut)
    if (min % 10 === 0){
      if((gvar.fpt_gt_brg_stl_p_press==undefined || gvar.fpt_gt_brg_stl_p_press==null)
      ||(gvar.fpt_gt_brg_soco_p_press==undefined || gvar.fpt_gt_brg_soco_p_press==null)
      ||(gvar.fpt_gt_brg_stl_p_fr==undefined || gvar.fpt_gt_brg_stl_p_fr==null)
      ||(gvar.fpt_gt_brg_soco_p_fr==undefined || gvar.fpt_gt_brg_soco_p_fr==null)
      || updateTimeGT_BRG<fiveMinAgo){}
      else
      {
        var FPT_GT_BRG_TREND = mongoose.model('FPT_GT_BRG_TREND',GT_BRG_TrendSchema,'FPT_GT_BRG_TREND')
        var gt_brg_TREND = new FPT_GT_BRG_TREND({
          date: date,
          steel_pipe_FR: gvar.fpt_gt_brg_stl_p_fr,
          socoman_pipe_FR: gvar.fpt_gt_brg_soco_p_fr,
          steel_pipe_PRESS: gvar.fpt_gt_brg_stl_p_press,
          socoman_pipe_PRESS: gvar.fpt_gt_brg_soco_p_press
      })
      gt_brg_TREND.save()
    }
     }setTimeout(GT_BRG_Trend, 60000);
  }








    //Uitenhage Total Flow
    var UIT_FC_TF_Scheme = mongoose.Schema({
      date:{type: Date},
      totalFlow: {type: Number},

      })
    function UIT_FC_TF(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

      var fiveMinAgo = Get_5Min_Ago();
      var updateTime_UIT_FC=Get_UpdateTimeMS(gvar.fpt_uit_fc_ut)
      if (hour==23 && min==59){
        if(
        ((gvar.fpt_uit_fc_tf==undefined || gvar.fpt_uit_fc_tf==null)) || updateTime_UIT_FC<fiveMinAgo
        ){}
        else
        {
          var FPT_UIT_FC_TF = mongoose.model('FPT_UIT_FC_TF',UIT_FC_TF_Scheme,'FPT_UIT_FC_TF')
          var uit_FC_TF = new FPT_UIT_FC_TF({
           date: date,
           totalFlow: gvar.fpt_uit_fc_tf,
        })
        uit_FC_TF.save()
      }
       }setTimeout(UIT_FC_TF, 60000);
    }



  //Gamtoos Bridge Trend
    var UIT_FC_TREND_Scheme = mongoose.Schema({
      date:{type: Date},
      flow_rate: {type: Number},
      pressure: {type: Number},
      })
    function UIT_FC_Trend(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      const date = `${year}-${month}-${day} ${hour}:${min}`;
      var fiveMinAgo = Get_5Min_Ago();

      var updateTime_UIT_FC=Get_UpdateTimeMS(gvar.fpt_uit_fc_ut)
      if (min % 10 === 0){
        if((gvar.fpt_uit_fc_press==undefined || gvar.fpt_uit_fc_press==null)
        ||(gvar.fpt_uit_fc_fr==undefined || gvar.fpt_uit_fc_fr==null)
        || updateTime_UIT_FC<fiveMinAgo){}
        else
        {
          var FPT_UIT_FC_TREND = mongoose.model('FPT_UIT_FC_TREND',UIT_FC_TREND_Scheme,'FPT_UIT_FC_TREND')
          var uit_FC_TREND = new FPT_UIT_FC_TREND({
            date: date,
            flow_rate: gvar.fpt_uit_fc_fr,
            pressure: gvar.fpt_uit_fc_press
        })
        uit_FC_TREND.save()
      }
       }setTimeout(UIT_FC_Trend, 60000);
    }


    var BETH_TREND_Scheme=mongoose.Schema({
      date:{type: Date},
      pressure:{type: Number},
      flowrate:{type: Number}
    })
    function BETH_Trend(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
      var fiveMinAgo = Get_5Min_Ago();

      var updateTime_BETH=Get_UpdateTimeMS(gvar.beth_ut)
      if (min % 10 === 0){
        if((gvar.beth_flowrate==undefined || gvar.beth_flowrate==null)
        ||(gvar.beth_pressure==undefined || gvar.beth_pressure==null)
        || updateTime_BETH<fiveMinAgo){}
        else
        {
          var FPT_BETH_TREND = mongoose.model('FPT_BETH_TREND',BETH_TREND_Scheme,'FPT_BETH_TREND')
          var beth_FPT_TREND = new FPT_BETH_TREND({
            date: date,
            flowrate: gvar.beth_flowrate,
            pressure: gvar.beth_pressure
        })
        beth_FPT_TREND.save()
        }
       }setTimeout(BETH_Trend, 60000)
  }
  var UIT_FC_TF_Scheme = mongoose.Schema({
    date:{type: Date},
    totalFlow: {type: Number},
    batterylvl: {type: Number}

    })
  function BETH_FPT_TF(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
    var fiveMinAgo = Get_5Min_Ago();
    var updateTime_UIT_FC=Get_UpdateTimeMS(gvar.beth_ut)
    if (hour==23 && min==59){
      if((gvar.beth_totalflow==undefined || gvar.beth_totalflow==null)
      || (gvar.beth_battery_status==undefined || gvar.beth_battery_status==null)
      || updateTime_UIT_FC<fiveMinAgo)
      {}
      else
      {
        var FPT_BETH_TF = mongoose.model('FPT_BETH_TF',UIT_FC_TF_Scheme,'FPT_BETH_TF')
        var beth_FPT_TF = new FPT_BETH_TF({
         date: date,
         totalFlow: gvar.beth_totalflow,
         batterylvl: gvar.beth_battery_status
      })
      beth_FPT_TF.save()
    }
     }setTimeout(BETH_FPT_TF, 60000);
  }


  var jeffBayTakeOffTotalFlowScheme = mongoose.Schema({
    date: {type:Date},
    jeff_bay_off_take_total_flow: {type: Number},
  })

  function JeffBayTakeOffTotalFlowFPT(){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.jeff_bay_off_take_last_update)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if(hour == 23 && min == 59){
      if(gvar.jeff_bay_off_take_total_flow == undefined || gvar.jeff_bay_off_take_total_flow  == null ||
        updateTimeCGK<fiveMinAgo){}
        else{
          var JEFF_BAY_TAKE_OFF = mongoose.model('JEFF_BAY_TAKE_OFF',jeffBayTakeOffTotalFlowScheme,'JEFF_BAY_TAKE_OFF')
          var jeff_BAY_TAKE_OFF = new JEFF_BAY_TAKE_OFF({
            date:date,
            jeff_bay_off_take_total_flow:gvar.jeff_bay_off_take_total_flow,
          })
          jeff_BAY_TAKE_OFF.save()
        }
    }setTimeout(JeffBayTakeOffTotalFlowFPT,60000)

  }

  var jeffBayTakeOffBatteryScheme = mongoose.Schema({
    date: {type:Date},
    jeff_bay_off_take_battery_level: {type: Number},
  })

  function JeffBayTakeOffBatteryFPT(){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.jeff_bay_off_take_last_update)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if(hour == 23 && min ==55){
      if(gvar.jeff_bay_off_take_battery_level == undefined || gvar.jeff_bay_off_take_battery_level  == null ||
        updateTimeCGK<fiveMinAgo){}
        else{
          var JEFF_BAY_TAKE_OFF_Battery_Level = mongoose.model('JEFF_BAY_TAKE_OFF_Battery_Level',jeffBayTakeOffBatteryScheme,'JEFF_BAY_TAKE_OFF_Battery_Level')
          var jeff_BAY_TAKE_OFF_Battery_Level = new JEFF_BAY_TAKE_OFF_Battery_Level({
            date:date,
            jeff_bay_off_take_battery_level:gvar.jeff_bay_off_take_battery_level,
          })
          jeff_BAY_TAKE_OFF_Battery_Level.save()
        }
    }setTimeout(JeffBayTakeOffBatteryFPT,60000)

  }

  var jb_PB_SFO_TF_Scheme = mongoose.Schema({
    date: {type: Date},
    jb_ST_Francis_OffTake_Total_Flow: {type: Number},
    jb_Para_Bea_TF: {type: Number},
  })

  function JB_PB_SFO_TF(){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.jb_PB_SFO_ut)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if(hour==23 && min==59){
      if(gvar.jb_ST_Francis_OffTake_Total_Flow ==undefined || gvar.jb_ST_Francis_OffTake_Total_Flow ==null ||
        gvar.jb_Para_Bea_TF == undefined || gvar.jb_Para_Bea_TF == null ||
        updateTimeCGK<fiveMinAgo){}
        else {
          var JB_PB_SFO_TOTAL_FLOW = mongoose.model('JB_PB_SFO_TOTAL_FLOW', jb_PB_SFO_TF_Scheme,'JB_PB_SFO_TOTAL_FLOW')
          var jb_PB_SFO_TOTAL_FLOW = new JB_PB_SFO_TOTAL_FLOW({
            date:date,
            jb_ST_Francis_OffTake_Total_Flow: gvar.jb_ST_Francis_OffTake_Total_Flow,
            jb_Para_Bea_TF: gvar.jb_Para_Bea_TF
          })
          jb_PB_SFO_TOTAL_FLOW.save()
        }
    }   setTimeout(JB_PB_SFO_TF,60000)
  }

  var jb_PB_SFO_Battery_Scheme = mongoose.Schema({
    date: {type: Date},
    jb_PB_SFO_battery_level: {type: Number},
  })

  function JB_PB_SFO_BATTER(){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.jb_PB_SFO_ut)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (min === 0 ){
      if(gvar.jb_PB_SFO_battery_level ==undefined || gvar.jb_PB_SFO_battery_level ==null ||
        updateTimeCGK<fiveMinAgo){}
        else {
          var JB_PB_SFO_BATTERY = mongoose.model('JB_PB_SFO_BATTERY', jb_PB_SFO_Battery_Scheme,'JB_PB_SFO_BATTERY')
          var jb_PB_SFO_BATTERY = new JB_PB_SFO_BATTERY({
            date:date,
            jb_PB_SFO_battery_level: gvar.jb_PB_SFO_battery_level,
          })
          jb_PB_SFO_BATTERY.save()
        }


    }   setTimeout(JB_PB_SFO_BATTER,60000)

  }

  var ONS_PARA_TF_SCHEME = mongoose.Schema({
    date: {type: Date},
    ons_para_TF: {type: Number}
  })

  function ONS_PARA_TF(){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.ons_para_ut)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if(hour == 23 && min == 59){
      if(gvar.ons_para_TF == undefined || gvar.ons_para_TF == null ||
        updateTimeCGK<fiveMinAgo){}
        else{
          var ONS_PARA_TOTAL_FLOW = mongoose.model('ONS_PARA_TOTAL_FLOW',ONS_PARA_TF_SCHEME,'ONS_PARA_TOTAL_FLOW')
          var ons_PARA_TOTAL_FLOW = new ONS_PARA_TOTAL_FLOW({
            date:date,
            ons_para_TF: gvar.ons_para_TF
          })
          ons_PARA_TOTAL_FLOW.save()
        }
    } setTimeout(ONS_PARA_TF,60000)
  }

  var ONS_PARA_BATTERY_LEVEL_SCHEME = mongoose.Schema({
    date: {type: Date},
    ons_para_battery_level: {type: Number}
  })


  function ONS_PARA_BATTER(){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.ons_para_ut)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (min === 0 ){
        if(gvar.ons_para_battery_level == undefined || gvar.ons_para_battery_level == null ||
        updateTimeCGK<fiveMinAgo){}
        else{
          var ONS_PARA_BATTERY = mongoose.model('ONS_PARA_BATTERY',ONS_PARA_BATTERY_LEVEL_SCHEME,'ONS_PARA_BATTERY')
          var ons_PARA_BATTERY = new ONS_PARA_BATTERY({
            date:date,
            ons_para_battery_level: gvar.ons_para_battery_level
          })
          ons_PARA_BATTERY.save()
        }
    }setTimeout(ONS_PARA_BATTER, 60000)
  }

  var KOU_MAIN_LINE_SCHEME = mongoose.Schema({
    date:{type: Date},
    kou_main_line_battery_level:{type: Number},
    kou_main_line_pressure:{type: Number},
  })

  function KOU_MAIN_LIN(){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.kou_main_line_ut)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;


    if (min === 0 ){
      if(gvar.kou_main_line_battery_level == undefined || gvar.kou_main_line_battery_level == null ||
        gvar.kou_main_line_pressure == undefined || gvar.kou_main_line_pressure == null ||
      updateTimeCGK<fiveMinAgo){}
      else{
        var KOU_MAIN_LINE = mongoose.model('KOU_MAIN_LINE',KOU_MAIN_LINE_SCHEME,'KOU_MAIN_LINE')
        var kou_MAIN_LINE = new KOU_MAIN_LINE({
          date:date,
          kou_main_line_battery_level:gvar.kou_main_line_battery_level,
          kou_main_line_pressure:gvar.kou_main_line_pressure

        })
        kou_MAIN_LINE.save()
      }
  }setTimeout(KOU_MAIN_LIN, 60000)
  }


  var HUMANSDORP_OFF_TAKE_Battery = mongoose.Schema({
    date:{type: Date},
    humansdorp_off_take_battery_level: {type: Number},
    humansdorp_off_take_pressure: {type: Number},
  })

  function HUMANSDORP_OFF_TAK(){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.humansdorp_off_take_ut)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (min === 0 ){
      if(gvar.humansdorp_off_take_pressure == undefined || gvar.humansdorp_off_take_pressure == null ||
        gvar.humansdorp_off_take_battery_level == undefined || gvar.humansdorp_off_take_battery_level == null ||
      updateTimeCGK<fiveMinAgo){}
      else{
        var HUMANSDORP_OFF_TAKE = mongoose.model('HUMANSDORP_OFF_TAKE',HUMANSDORP_OFF_TAKE_Battery,'HUMANSDORP_OFF_TAKE')
        var humansdorp_OFF_TAKE = new HUMANSDORP_OFF_TAKE({
          date:date,
          humansdorp_off_take_pressure:gvar.humansdorp_off_take_pressure,
          humansdorp_off_take_battery_level:gvar.humansdorp_off_take_battery_level

        })
        humansdorp_OFF_TAKE.save()
      }
  }setTimeout(HUMANSDORP_OFF_TAK, 60000)
  }

  var HUMANSDORP_OFF_TAKE_Total = mongoose.Schema({
    date: {type: Date},
    humansdorp_off_TF: {type: Number},
  })

  function HUMANSDORP_OFF_TAK_TF(){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeCGK=Get_UpdateTimeMS(gvar.humansdorp_off_take_ut)
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;


  if(hour == 23 && min == 59){
    if(gvar.humansdorp_off_TF == undefined || gvar.humansdorp_off_TF == null ||
    updateTimeCGK<fiveMinAgo){}
    else{
      var HUMANSDORP_OFF_TAKE_TF = mongoose.model('HUMANSDORP_OFF_TAKE_TF',HUMANSDORP_OFF_TAKE_Total,'HUMANSDORP_OFF_TAKE_TF')
      var humansdorp_OFF_TAKE_TF = new HUMANSDORP_OFF_TAKE_TF({
        date:date,
        humansdorp_off_TF:gvar.humansdorp_off_TF,

      })
      humansdorp_OFF_TAKE_TF.save()
    }
}setTimeout(HUMANSDORP_OFF_TAK_TF, 60000)
}



var GAMTOOS_BREAK_WATER_BAR_FLOW_SCHEME = mongoose.Schema({
  date: {type: Date},
  gbw_actual_pressure: {type: Number},
  gbw_flow_rate: {type: Number},
})

function GAMTOOS_BREAK_WATER_BAR_FLOW(){
  var now =  new Date();

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeCGK=Get_UpdateTimeMS(gvar.gbw_ut)
  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;


  if (min % 10 === 0){
  if(gvar.gbw_actual_pressure == undefined || gvar.gbw_actual_pressure == null ||
    gvar.gbw_flow_rate == undefined || gvar.gbw_flow_rate == null ||
  updateTimeCGK<fiveMinAgo){}
  else{
    var NMNM_GWB_BAR_FLOW = mongoose.model('NMNM_GWB_BAR_FLOW',GAMTOOS_BREAK_WATER_BAR_FLOW_SCHEME,'NMNM_GWB_BAR_FLOW')
    var nmbm_GWB_BAR_FLOW = new NMNM_GWB_BAR_FLOW({
      date:date,
      gbw_actual_pressure:gvar.gbw_actual_pressure,
      gbw_flow_rate:gvar.gbw_flow_rate,

    })
    nmbm_GWB_BAR_FLOW.save()
  }
}setTimeout(GAMTOOS_BREAK_WATER_BAR_FLOW, 60000)
}




  function Get_UpdateTimeMS(UT){
    var updateTime = UT
    var  updateTimeMS =Date.parse(updateTime)
        return updateTimeMS}

  function Get_5Min_Ago(){
  var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
  var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
  var dateminus10minMS = cuurentDateMS - 300000
  return dateminus10minMS
  }


