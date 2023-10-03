const mongoose = require('mongoose');
const gvar = require('../variables')

module.exports = {WTW_NGT_FM_Trend,STORMS_WTW_Trend,WTW_ELANDS_FR,WTW_ST_GEORGES};




var WW_NGT_FM_TrendSchema = mongoose.Schema({
  date:{type: Date},
  high_level_flow_rate: {type: Number},
  low_level_flow_rate:{type: Number},

  })
  function WTW_NGT_FM_Trend(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();

    var fiveMinAgo = Get_5Min_Ago();
    var updateTime=Get_UpdateTimeMS(gvar.wtw_ngt_ut)

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;


  if (min % 10 === 0){
      if(gvar.wtw_ngt_high_lift_fr==undefined || gvar.wtw_ngt_high_lift_fr==null ||
        gvar.wtw_ngt_low_lift_fr==undefined || gvar.wtw_ngt_low_lift_fr==null ||
       updateTime<fiveMinAgo){

      }
      else{
        var WTW_NGT_FM_TREND = mongoose.model('WTW_NGT_FM_TREND',WW_NGT_FM_TrendSchema,'WTW_NGT_FM_TREND')
        var wtw_NGT_FM_TREND = new WTW_NGT_FM_TREND({
         date: date,
         high_level_flow_rate : gvar.wtw_ngt_high_lift_fr,
         low_level_flow_rate : gvar.wtw_ngt_low_lift_fr,
      })
      wtw_NGT_FM_TREND.save()

  }
     }setTimeout(WTW_NGT_FM_Trend, 60000);
  }


  var STORMS_WTW_TrendSchema = mongoose.Schema({
    date:{type: Date},
    wtw_storms_holding_reservoir_level: {type: Number},
    wtw_storms_overhead_tank_level:{type: Number},
    })
    function STORMS_WTW_Trend(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();

      var fiveMinAgo = Get_5Min_Ago();
      var updateTime=Get_UpdateTimeMS(gvar.wtw_storms_UT)

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

      if (min % 10 === 0){
        if(gvar.wtw_storms_holding_reservoir_level==undefined || gvar.wtw_storms_holding_reservoir_level==null ||
          gvar.wtw_storms_overhead_tank_level==undefined || gvar.wtw_storms_overhead_tank_level==null ||
         updateTime<fiveMinAgo){

        }
        else{
          var STORMS_WTW_TREND = mongoose.model('STORMS_WTW_TREND',STORMS_WTW_TrendSchema,'STORMS_WTW_TREND')
          var storms_WTW_TREND = new STORMS_WTW_TREND({
           date: date,
           wtw_storms_holding_reservoir_level : gvar.wtw_storms_holding_reservoir_level,
           wtw_storms_overhead_tank_level : gvar.wtw_storms_overhead_tank_level,
        })
        storms_WTW_TREND.save()
      }

       }setTimeout(STORMS_WTW_Trend, 60000);
    }


    var wtw_ELANDS_FR_TrendSchema = mongoose.Schema({
      date:{type: Date},
      wtw_elands_FR: {type: Number},
      wtw_elands_P: {type: Number}

      })
      function WTW_ELANDS_FR(){
        var now =  new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();

        var fiveMinAgo = Get_5Min_Ago();
        var updateTime=Get_UpdateTimeMS(gvar.wtw_elands_ut)

        var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

        if (min % 10 === 0){
          if(gvar.wtw_elands_FR==undefined || gvar.wtw_elands_FR==null ||
            gvar.wtw_elands_P==undefined || gvar.wtw_elands_P==null ||
           updateTime<fiveMinAgo){
          }
          else{
            var WTW_ELANDS_TREND = mongoose.model('WTW_ELANDS_TREND',wtw_ELANDS_FR_TrendSchema,'WTW_ELANDS_TREND')
            var wtw_ELANDS_TREND = new WTW_ELANDS_TREND({
             date: date,
             wtw_elands_FR : gvar.wtw_elands_FR,
             wtw_elands_P  : gvar.wtw_elands_P,
          })
          wtw_ELANDS_TREND.save()
        }

         }setTimeout(WTW_ELANDS_FR, 60000);
      }


      var wtw_ST_GEORGES_TrendSchema = mongoose.Schema({
        date:{type: Date},
        st_georges_wtw_gw_FR: {type: Number},
        st_georges_wtw_gw_TF: {type: Number},
        st_georges_wtw_emer_hill_FR: {type: Number},
        st_georges_wtw_emer_hill_TF: {type: Number},

        })

        function WTW_ST_GEORGES(){
          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes();

          var fiveMinAgo = Get_5Min_Ago();
          var updateTime=Get_UpdateTimeMS(gvar.st_georges_wtw_ut)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min % 10 === 0){
          if(gvar.st_georges_wtw_gw_FR == undefined || gvar.st_georges_wtw_gw_FR==null ||
            gvar.st_georges_wtw_gw_TF == undefined || gvar.st_georges_wtw_gw_TF == null ||
            gvar.st_georges_wtw_emer_hill_FR == undefined || gvar.st_georges_wtw_emer_hill_FR==null ||
            gvar.st_georges_wtw_emer_hill_TF == undefined || gvar.st_georges_wtw_emer_hill_TF == null ||
            updateTime<fiveMinAgo){}
          }
          else {
            var WTW_ST_GEORGE_TREND = mongoose.model('WTW_ST_GEORGE_TREND',wtw_ST_GEORGES_TrendSchema,'WTW_ST_GEORGE_TREND')
            var wtw_ST_GEORGE_TREND = new WTW_ST_GEORGE_TREND({
              date: date,
              st_georges_wtw_gw_FR:gvar.st_georges_wtw_gw_FR,
              st_georges_wtw_gw_TF:gvar.st_georges_wtw_gw_TF,
              st_georges_wtw_emer_hill_FR:gvar.st_georges_wtw_emer_hill_FR,
              st_georges_wtw_emer_hill_TF:gvar.st_georges_wtw_emer_hill_TF

            })
            wtw_ST_GEORGE_TREND.save()

          }setTimeout(WTW_ST_GEORGES, 60000);
        }
        var wtw_ST_GEORGES_TF_TrendSchema = mongoose.Schema({
          date:{type: Date},
          st_georges_wtw_emer_hill_TF: {type: Number},

          st_georges_wtw_gw_TF: {type: Number},


          })

        function WTW_ST_GEORGES_total_flow(){
          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes();

          var fiveMinAgo = Get_5Min_Ago();
          var updateTime=Get_UpdateTimeMS(gvar.st_georges_wtw_ut)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (hour == 23 && min == 55){
          if(gvar.st_georges_wtw_gw_TF == undefined || gvar.st_georges_wtw_gw_TF==null |
            gvar.st_georges_wtw_emer_hill_TF == undefined || gvar.st_georges_wtw_emer_hill_TF==null ||
            updateTime<fiveMinAgo){}
          }
          else {
            var WTW_ST_GEORGE_TREND_TF = mongoose.model('WTW_ST_GEORGE_TREND_TF',wtw_ST_GEORGES_TF_TrendSchema,'WTW_ST_GEORGE_TREND_TF')
            var wtw_ST_GEORGE_TREND_TF = new WTW_ST_GEORGE_TREND_TF({
              date: date,
              st_georges_wtw_emer_hill_TF:gvar.st_georges_wtw_emer_hill_TF,

              st_georges_wtw_gw_TF:gvar.st_georges_wtw_gw_TF,


            })
            wtw_ST_GEORGE_TREND_TF.save()

          }setTimeout(WTW_ST_GEORGES_total_flow, 60000);
        }



        var PS_CROWN_TF_TrendSchema = mongoose.Schema({
          date:{type: Date},
          klm_hup_wtw_TF: {type: Number},
          })


          function PS_CROWN_TF(){
            var now =  new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hour = now.getHours();
            var min = now.getMinutes();

            var fiveMinAgo = Get_5Min_Ago();
            var updateTime=Get_UpdateTimeMS(gvar.klm_hup_wtw_ut)

            var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

            if (min){
            if(gvar.klm_hup_wtw_TF == undefined || gvar.klm_hup_wtw_TF==null ||
              updateTime<fiveMinAgo){}
            }
            else {
              var WTW_HUP_INLET_TF = mongoose.model('WTW_HUP_INLET_TF',PS_CROWN_TF_TrendSchema,'WTW_HUP_INLET_TF')
              var wtw_HUP_INLET_TF = new WTW_HUP_INLET_TF({
                date: date,
                klm_hup_wtw_TF:gvar.klm_hup_wtw_TF,
              })
              wtw_HUP_INLET_TF.save()

            }setTimeout(PS_CROWN_TF, 60000);
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
