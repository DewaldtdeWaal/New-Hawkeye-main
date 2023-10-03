//file stores all pump station trend data

const mongoose = require('mongoose');
const gvar = require('../variables')


module.exports = {VW_Trend_TF,VW_Trend_Trend,WW_PS_NMU_EFF_TotalFlow,WW_PS_NMU_EFF_Trend, NMBM_MW_BPS_Trend, NMBM_STAN_BPS_Trend,Storms_PS_Trend,Storms_PS_Trend_TF,Chatty_Trend_TF,Chelsea_PS_TREND};


  //Verwoerd Total Flow
  var FPT_TF_TrendSchema = mongoose.Schema({
    date:{type: Date},
    totalflow: {type: Number},
    })
  function VW_Trend_TF(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();

    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeVW=Get_UpdateTimeMS(gvar.vw_ut)

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (hour==23 && min==55){
      if(gvar.vw_p1_tf==undefined || gvar.vw_p1_tf==null || updateTimeVW<fiveMinAgo){}
      else
      {
        var DPN_VW_TF = mongoose.model('DPN_VW_TF',FPT_TF_TrendSchema,'DPN_VW_TF')
        var vw_TF = new DPN_VW_TF({
         date: date,
         totalflow: gvar.vw_p1_tf
      })
      vw_TF.save()
    }
     }setTimeout(VW_Trend_TF, 60000);
  }


  // Verwoerd Total Flow
  var DPN_VW_FR_TrendSchema = mongoose.Schema({
    date:{type: Date},
    flowRate: {type: Number},
    suction_pressure: {type: Number},
    delivery_pressure:{type: Number}
    })
  function VW_Trend_Trend(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();

    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeVW=Get_UpdateTimeMS(gvar.vw_ut)

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (min % 10 === 0){
      if(gvar.vw_p1_fr==undefined || gvar.vw_p1_fr==null ||
        gvar.vw_p1_fr==undefined || gvar.vw_p1_sp==null ||
        gvar.vw_p1_dp==undefined || gvar.vw_p1_dp==null ||updateTimeVW<fiveMinAgo){}
      else
      {
        var DPN_VW_FR = mongoose.model('DPN_VW_FR',DPN_VW_FR_TrendSchema,'DPN_VW_FR')
        var vw_FR = new DPN_VW_FR({
         date: date,
         flowRate: gvar.vw_p1_fr,
         suction_pressure: gvar.vw_p1_sp,
         delivery_pressure : gvar.vw_p1_dp,
      })
      vw_FR.save()
    }
     }setTimeout(VW_Trend_Trend, 60000);
  }






  var WW_PS_NMU_EFF_TotalFlowSchema = mongoose.Schema({
    date:{type: Date},
    totalflow: {type: Number},
    })
    function WW_PS_NMU_EFF_TotalFlow(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();

      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeVW=Get_UpdateTimeMS(gvar.vw_ut)

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

      if (hour==23 && min==55){
        if(gvar.nmu_eff_ps_tnf==undefined || gvar.nmu_eff_ps_tnf==null || updateTimeVW<fiveMinAgo){}
        else
        {
          var WW_PS_NMU_EFF_TF = mongoose.model('WW_PS_NMU_EFF_TF',WW_PS_NMU_EFF_TotalFlowSchema,'WW_PS_NMU_EFF_TF')
          var ps_NMU_EFF_TF = new WW_PS_NMU_EFF_TF({
           date: date,
           totalflow: gvar.nmu_eff_ps_tnf
        })
        ps_NMU_EFF_TF.save()
      }
       }setTimeout(WW_PS_NMU_EFF_TotalFlow, 60000);
    }




  var WW_PS_NMU_EFF_TrendsSchema = mongoose.Schema({
    date:{type: Date},
    flowRate: {type: Number},
    delivery_pressure:{type: Number},
    dam_level:{type:Number},
    p1_speed:{type:Number},
    p2_speed:{type:Number},
    p3_speed:{type:Number},
    jp_speed:{type:Number},
    })
    function WW_PS_NMU_EFF_Trend(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();

      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeVW=Get_UpdateTimeMS(gvar.vw_ut)

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

if (date){
        if(gvar.nmu_eff_ps_fr==undefined || gvar.nmu_eff_ps_fr==null ||
          gvar.nmu_eff_ps_del_press==undefined || gvar.nmu_eff_ps_del_press==null ||
          gvar.nmu_eff_ps_dam_lvl==undefined || gvar.nmu_eff_ps_dam_lvl==null ||
          gvar.nmu_eff_p1_speed==undefined || gvar.nmu_eff_p1_speed==null ||
          gvar.nmu_eff_p2_speed==undefined || gvar.nmu_eff_p2_speed==null ||
          gvar.nmu_eff_p3_speed==undefined || gvar.nmu_eff_p3_speed==null ||
          gvar.nmu_eff_p4_speed==undefined || gvar.nmu_eff_p4_speed==null ||
         updateTimeVW<fiveMinAgo){}
        else{
          var WW_PS_NMU_EFF_TREND = mongoose.model('WW_PS_NMU_EFF_TREND',WW_PS_NMU_EFF_TrendsSchema,'WW_PS_NMU_EFF_TREND')
          var ps_NMU_EFF_TREND = new WW_PS_NMU_EFF_TREND({
           date: date,
           flowRate: gvar.nmu_eff_ps_fr,
           delivery_pressure : gvar.nmu_eff_ps_del_press,
           dam_level: gvar.nmu_eff_ps_dam_lvl,
           p1_speed:  gvar.nmu_eff_p1_speed,
           p2_speed:  gvar.nmu_eff_p2_speed,
           p3_speed:  gvar.nmu_eff_p3_speed,
           jp_speed:  gvar.nmu_eff_p4_speed,
        })
        ps_NMU_EFF_TREND.save()
      }
       }setTimeout(WW_PS_NMU_EFF_Trend, 60000);
    }
//Motherwell
    var NMBM_MW_PS_TrendSchema = mongoose.Schema({
      date:{type: Date},
      flowRate: {type: Number},
      suction_pressure: {type: Number},
      delivery_pressure:{type: Number},



    })

    function NMBM_MW_BPS_Trend(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeVW=Get_UpdateTimeMS(gvar.mw_g_ut)

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
      if (min % 10 === 0){
      {
if (date){
        if(gvar.mw_g_common_suction_pressure ==  undefined || gvar.mw_g_common_suction_pressure == null ||
          gvar.mw_g_common_delivery_pressure == undefined || gvar.mw_g_common_delivery_pressure == null ||
          gvar.mw_g_flowrate ==undefined || gvar.mw_g_flowrate==null ||
         updateTimeVW<fiveMinAgo){}
        else{
          var NMBM_MW_PS_Trend = mongoose.model('NMBM_MW_PS_Trend',NMBM_MW_PS_TrendSchema,'NMBM_MW_PS_Trend')
          var nmbm_MW_PS_Trend = new NMBM_MW_PS_Trend({
           date: date,
           flowRate: gvar.mw_g_flowrate,
      suction_pressure: gvar.mw_g_common_suction_pressure,
      delivery_pressure:gvar.mw_g_common_delivery_pressure
        })
        nmbm_MW_PS_Trend.save()
      }
      }}setTimeout(NMBM_MW_BPS_Trend, 60000);
    }

  }


    //Standford
    var NMBM_STAN_BPS_TrendSchema = mongoose.Schema({
      date:{type: Date},
      flowRate:{type: Number},
      suction_pressure: {type: Number},
      delivery_pressure: {type: Number},
      p1_actfreq: {type: Number},
      p2_actfreq: {type: Number},
      p3_actfreq: {type: Number},
      p4_actfreq: {type: Number},
    })
    function NMBM_STAN_BPS_Trend(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeVW=Get_UpdateTimeMS(gvar.stan_ps_ut)

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
      if (min % 10 === 0)
      {
  if (date){
    if(gvar.stan_common_suction_pressure == undefined|| gvar.stan_common_suction_pressure == null ||
      gvar.stan_common_delivery_pressure == undefined|| gvar.stan_common_delivery_pressure == null ||
      gvar.stan_pump_station_flow == undefined || gvar.stan_pump_station_flow == null ||
      gvar.stan_p1_vsd_actfreq == undefined || gvar.stan_p1_vsd_actfreq == null ||
      gvar.stan_p2_vsd_actfreq == undefined || gvar.stan_p2_vsd_actfreq == null ||
      gvar.stan_p3_vsd_actfreq == undefined || gvar.stan_p3_vsd_actfreq == null ||
      gvar.stan_p4_vsd_actfreq == undefined || gvar.stan_p4_vsd_actfreq == null ||
      updateTimeVW<fiveMinAgo){}
      else{
        var NMBM_STAN_BPS_TREND = mongoose.model('NMBM_STAN_BPS_TREND',NMBM_STAN_BPS_TrendSchema,'NMBM_STAN_BPS_TREND')
        var nmbm_STAN_BPS_Trend = new NMBM_STAN_BPS_TREND({
          date: date,
          flowRate: gvar.stan_pump_station_flow,
          suction_pressure: gvar.stan_common_suction_pressure,
          delivery_pressure: gvar.stan_common_delivery_pressure,
          p1_actfreq: gvar.stan_p1_vsd_actfreq,
          p2_actfreq: gvar.stan_p2_vsd_actfreq,
          p3_actfreq: gvar.stan_p3_vsd_actfreq,
          p4_actfreq: gvar.stan_p4_vsd_actfreq
        })
        nmbm_STAN_BPS_Trend.save()
      }
    }}setTimeout(NMBM_STAN_BPS_Trend, 60000);
    }




    var stormsLevelScheme = mongoose.Schema({
      date:{type: Date},
      ps_storms_gorge_level: {type: Number},
      ps_storms_quarry_level: {type: Number},

    })
    function Storms_PS_Trend(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeVW=Get_UpdateTimeMS(gvar.ps_storm_UT)

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
      if (min % 10 === 0){
  if (date){
    if(gvar.ps_storms_quarry_level == undefined|| gvar.ps_storms_quarry_level == null ||
      gvar.ps_storms_gorge_level == undefined|| gvar.ps_storms_gorge_level == null ||
      updateTimeVW<fiveMinAgo){}
      else{
        var STORMS_PS_TREND = mongoose.model('STORMS_PS_TREND',stormsLevelScheme,'STORMS_PS_TREND')
        var storms_PS_TREND = new STORMS_PS_TREND({
          date: date,
          ps_storms_quarry_level: gvar.ps_storms_quarry_level,
          ps_storms_gorge_level: gvar.ps_storms_gorge_level,

        })
        storms_PS_TREND.save()
      }
    }}setTimeout(Storms_PS_Trend, 60000);
    }

    var stormsLevelSchemeTF = mongoose.Schema({
      date:{type: Date},
      wtw_storms_pulse_count1_Total_Flow: {type: Number},
      wtw_storms_pulse_count2_Total_Flow: {type: Number},

    })
      function Storms_PS_Trend_TF(){
        var now =  new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();

        var fiveMinAgo = Get_5Min_Ago();
        var updateTimeVW=Get_UpdateTimeMS(gvar.ps_storm_UT)

        var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

        if (hour == 23 && min == 59){
          if(gvar.wtw_storms_pulse_count1_Total_Flow == undefined|| gvar.wtw_storms_pulse_count1_Total_Flow == null ||
            gvar.wtw_storms_pulse_count2_Total_Flow == undefined|| gvar.wtw_storms_pulse_count2_Total_Flow == null ||
            updateTimeVW<fiveMinAgo){}
          else
          {
            var STORMS_PS_TREND_TF = mongoose.model('STORMS_PS_TREND_TF',stormsLevelSchemeTF,'STORMS_PS_TREND_TF')
            var storms_PS_TREND_TF = new STORMS_PS_TREND_TF({
             date: date,
             wtw_storms_pulse_count1_Total_Flow: gvar.wtw_storms_pulse_count1_Total_Flow,
             wtw_storms_pulse_count2_Total_Flow: gvar.wtw_storms_pulse_count2_Total_Flow,
          })
          storms_PS_TREND_TF.save()
        }
         }setTimeout(Storms_PS_Trend_TF, 60000);
      }



      var chattySchemeTF = mongoose.Schema({
        date:{type: Date},
        cht_tf: {type: Number},

      })
      function Chatty_Trend_TF(){
        var now =  new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var fiveMinAgo = Get_5Min_Ago();
        var updateTimeVW=Get_UpdateTimeMS(gvar.wtw_storms_UT)

        var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

        if (hour == 23 && min == 59){
          if(gvar.cht_tf == undefined|| gvar.cht_tf == null ||
        updateTimeVW<fiveMinAgo){}
        else{
          var CHATTY_TREND_TF = mongoose.model('CHATTY_TREND_TF',chattySchemeTF,'CHATTY_TREND_TF')
          var chatty_TREND_TF = new CHATTY_TREND_TF({
            date: date,
            cht_tf: gvar.cht_tf,

          })
          chatty_TREND_TF.save()

      }
      }setTimeout(Chatty_Trend_TF, 60000);

    }






    var chelsea_PS_TrendSchema = mongoose.Schema({
      date:{type: Date},
      che_ps_pumpset_1_vsd_actual_speed:{type: Number},
      che_ps_pumpset_1_del_pressure:{type: Number},
      che_ps_pumpset_1_suct_pressure:{type: Number},
      che_ps_pumpset_2_vsd_actual_speed:{type: Number},
      che_ps_pumpset_2_del_pressure:{type: Number},
      che_ps_pumpset_2_suct_pressure:{type: Number},
      che_ps_pumpset_3_vsd_actual_speed:{type: Number},
      che_ps_pumpset_3_del_pressure:{type: Number},
      che_ps_pumpset_3_suct_pressure:{type: Number},
      che_ps_pumpset_4_vsd_actual_speed:{type: Number},
      che_ps_pumpset_4_del_pressure:{type: Number},
      che_ps_pumpset_4_suct_pressure:{type: Number},
      che_ps_700_flow_rate:{type: Number}

    })
    function Chelsea_PS_TREND(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeVW=Get_UpdateTimeMS(gvar.che_r_ut)

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
      if (min % 10 === 0){
  if (date){
    if(gvar.che_ps_pumpset_1_vsd_actual_speed == undefined|| gvar.che_ps_pumpset_1_vsd_actual_speed == null ||
      gvar.che_ps_pumpset_1_del_pressure == undefined|| gvar.che_ps_pumpset_1_del_pressure == null ||
      gvar.che_ps_pumpset_1_suct_pressure == undefined|| gvar.che_ps_pumpset_1_suct_pressure == null ||
      gvar.che_ps_pumpset_2_vsd_actual_speed == undefined|| gvar.che_ps_pumpset_2_vsd_actual_speed == null ||
      gvar.che_ps_pumpset_2_del_pressure == undefined|| gvar.che_ps_pumpset_2_del_pressure == null ||
      gvar.che_ps_pumpset_2_suct_pressure == undefined|| gvar.che_ps_pumpset_2_suct_pressure == null ||
      gvar.che_ps_pumpset_3_vsd_actual_speed == undefined|| gvar.che_ps_pumpset_3_vsd_actual_speed == null ||
      gvar.che_ps_pumpset_3_del_pressure == undefined|| gvar.che_ps_pumpset_3_del_pressure == null ||
      gvar.che_ps_pumpset_3_suct_pressure == undefined|| gvar.che_ps_pumpset_3_suct_pressure == null ||
      gvar.che_ps_pumpset_4_vsd_actual_speed == undefined|| gvar.che_ps_pumpset_4_vsd_actual_speed == null ||
      gvar.che_ps_pumpset_4_del_pressure == undefined|| gvar.che_ps_pumpset_4_del_pressure == null ||
      gvar.che_ps_pumpset_4_suct_pressure == undefined|| gvar.che_ps_pumpset_4_suct_pressure == null ||
      gvar.che_ps_700_flow_rate == undefined|| gvar.che_ps_700_flow_rate == null ||
      updateTimeVW<fiveMinAgo){}
      else{
        var CHELSEA_PS_TREND = mongoose.model('CHELSEA_PS_TREND',chelsea_PS_TrendSchema,'CHELSEA_PS_TREND')
        var chelsea_PS_TREND = new CHELSEA_PS_TREND({
          date: date,
          che_ps_pumpset_1_vsd_actual_speed: gvar.che_ps_pumpset_1_vsd_actual_speed,
          che_ps_pumpset_1_del_pressure: gvar.che_ps_pumpset_1_del_pressure,
          che_ps_pumpset_1_suct_pressure: gvar.che_ps_pumpset_1_suct_pressure,
          che_ps_pumpset_2_vsd_actual_speed: gvar.che_ps_pumpset_2_vsd_actual_speed,
          che_ps_pumpset_2_del_pressure: gvar.che_ps_pumpset_2_del_pressure,
          che_ps_pumpset_2_suct_pressure: gvar.che_ps_pumpset_2_suct_pressure,
          che_ps_pumpset_3_vsd_actual_speed: gvar.che_ps_pumpset_3_vsd_actual_speed,
          che_ps_pumpset_3_del_pressure: gvar.che_ps_pumpset_3_del_pressure,
          che_ps_pumpset_3_suct_pressure: gvar.che_ps_pumpset_3_suct_pressure,
          che_ps_pumpset_4_vsd_actual_speed: gvar.che_ps_pumpset_4_vsd_actual_speed,
          che_ps_pumpset_4_del_pressure: gvar.che_ps_pumpset_4_del_pressure,
          che_ps_pumpset_4_suct_pressure: gvar.che_ps_pumpset_4_suct_pressure,
          che_ps_700_flow_rate:gvar.che_ps_700_flow_rate

        })
        chelsea_PS_TREND.save()
      }
    }}setTimeout(Chelsea_PS_TREND, 60000);
    }






    var WW_PS_NMU_EFF_1munite_TrendsSchema = mongoose.Schema({
      date:{type: Date},
      nmu_eff_ps_fr: {type: Number},
    })
      function WW_PS_NMU_EFF_Trend_1_Minute(){
        var now =  new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();

        var fiveMinAgo = Get_5Min_Ago();
        var updateTimeVW=Get_UpdateTimeMS(gvar.vw_ut)

        var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

  if (date){
          if(gvar.nmu_eff_ps_fr==undefined || gvar.nmu_eff_ps_fr==null ||
            gvar.nmu_eff_ps_del_press==undefined || gvar.nmu_eff_ps_del_press==null ||
            gvar.nmu_eff_ps_dam_lvl==undefined || gvar.nmu_eff_ps_dam_lvl==null ||
            gvar.nmu_eff_p1_speed==undefined || gvar.nmu_eff_p1_speed==null ||
            gvar.nmu_eff_p2_speed==undefined || gvar.nmu_eff_p2_speed==null ||
            gvar.nmu_eff_p3_speed==undefined || gvar.nmu_eff_p3_speed==null ||
            gvar.nmu_eff_p4_speed==undefined || gvar.nmu_eff_p4_speed==null ||
           updateTimeVW<fiveMinAgo){}
          else{
            var WW_PS_NMU_EFF_TREND = mongoose.model('TEST_TREND',WW_PS_NMU_EFF_1munite_TrendsSchema,'TEST_TREND')
            var ps_NMU_EFF_TREND = new WW_PS_NMU_EFF_TREND({
             date: date,
             nmu_eff_ps_fr: gvar.nmu_eff_ps_fr,

          })
          ps_NMU_EFF_TREND.save()
        }
         }setTimeout(WW_PS_NMU_EFF_Trend_1_Minute, 60000);
      }



      var WW_PS_NMU_EFF_10_munite_TrendsSchema = mongoose.Schema({
        date:{type: Date},
        nmu_eff_ps_del_press: {type: Number},
      })
        function WW_PS_NMU_EFF_Trend_1_Minute(){
          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes();

          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeVW=Get_UpdateTimeMS(gvar.vw_ut)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min % 10 === 0){
            if(gvar.nmu_eff_ps_fr==undefined || gvar.nmu_eff_ps_fr==null ||
              gvar.nmu_eff_ps_del_press==undefined || gvar.nmu_eff_ps_del_press==null ||
              gvar.nmu_eff_ps_dam_lvl==undefined || gvar.nmu_eff_ps_dam_lvl==null ||
              gvar.nmu_eff_p1_speed==undefined || gvar.nmu_eff_p1_speed==null ||
              gvar.nmu_eff_p2_speed==undefined || gvar.nmu_eff_p2_speed==null ||
              gvar.nmu_eff_p3_speed==undefined || gvar.nmu_eff_p3_speed==null ||
              gvar.nmu_eff_p4_speed==undefined || gvar.nmu_eff_p4_speed==null ||
             updateTimeVW<fiveMinAgo){}
            else{
              var WW_PS_NMU_EFF_TREND = mongoose.model('TEST_TREND',WW_PS_NMU_EFF_10_munite_TrendsSchema,'TEST_TREND')
              var ps_NMU_EFF_TREND = new WW_PS_NMU_EFF_TREND({
               date: date,
               nmu_eff_ps_del_press: gvar.nmu_eff_ps_del_press,

            })
            ps_NMU_EFF_TREND.save()
          }
           }setTimeout(WW_PS_NMU_EFF_Trend_1_Minute, 60000);
        }



        var chel_tf_Trend_shema = mongoose.Schema({
          date:{type: Date},


          che_ps_700_total_flow: {type: Number},
che_ps_moth_760_mm_total_flow: {type: Number},
che_ps_moth_900_mm_total_flow: {type: Number},
che_ps_walk_drive_off_500_mm_total_flow: {type: Number},
        })
          function Chelsea_TF(){
            var now =  new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hour = now.getHours();
            var min = now.getMinutes();

            var fiveMinAgo = Get_5Min_Ago();
            var updateTimeVW=Get_UpdateTimeMS(gvar.che_ps_ut)

            var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

            if (hour == 23 && min == 55){
              if(gvar.che_ps_700_total_flow==undefined || gvar.che_ps_700_total_flow==null ||
                gvar.che_ps_moth_760_mm_total_flow == undefined || gvar.che_ps_moth_760_mm_total_flow == null ||
                gvar.che_ps_moth_900_mm_total_flow == undefined || gvar.che_ps_moth_900_mm_total_flow == null  ||
                gvar.che_ps_walk_drive_off_500_mm_total_flow == undefined || gvar.che_ps_walk_drive_off_500_mm_total_flow == null ||
               updateTimeVW<fiveMinAgo){}
              else{
                var WW_PS_NMU_EFF_TREND = mongoose.model('CHEL_TF_TREND',chel_tf_Trend_shema,'CHEL_TF_TREND')
                var ps_NMU_EFF_TREND = new WW_PS_NMU_EFF_TREND({
                 date: date,
                 che_ps_700_total_flow: gvar.che_ps_700_total_flow,
                 che_ps_moth_760_mm_total_flow:gvar.che_ps_moth_760_mm_total_flow,
                 che_ps_moth_900_mm_total_flow:gvar.che_ps_moth_900_mm_total_flow,
                 che_ps_walk_drive_off_500_mm_total_flow:gvar.che_ps_walk_drive_off_500_mm_total_flow
              })
              ps_NMU_EFF_TREND.save()
            }
             }setTimeout(Chelsea_TF, 60000);
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







