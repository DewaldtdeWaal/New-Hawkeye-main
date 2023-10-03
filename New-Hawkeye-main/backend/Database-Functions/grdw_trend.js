const mongoose = require('mongoose');
const gvar = require('../variables')


module.exports={NMBM_NPP_GW_Trend,NPP_TREND_TF,KLM_HUP_GW_TF,KLM_HUP_GW_Trend,KLM_HUP2_GW_TF,KLM_HUP2_GW_Trend,KLM_HUP3_GW_TF,KLM_HUP3_GW_Trend,KLM_HUP4_GW_TF,KLM_HUP4_GW_Trend,KLM_HUP6_GW_TF,KLM_HUP6_GW_Trend,NMBM_HUM_GW_FLOW,KARK_K1_FLOW_GW_RATE}
//#region NewtonParkPool (don't delete this)
var NMBM_NPP_GW_TrendSchema = mongoose.Schema({
  date:{type: Date},
  flowRate: {type: Number},
  level: {type: Number},
  delivery_pressure:{type: Number},




})

function NMBM_NPP_GW_Trend(){
  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeVW=Get_UpdateTimeMS(gvar.npp_g_ut)

  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

  if (min % 10 === 0){
    if(gvar.npp_p_flow_rate ==  undefined || gvar.npp_p_flow_rate == null ||
      gvar.npp_p_borehole_level == undefined || gvar.npp_p_borehole_level == null ||
      gvar.npp_p_pressure ==undefined || gvar.npp_p_pressure==null ||
     updateTimeVW<fiveMinAgo){}
    else{
      var NMBM_NPP_GW_TREND = mongoose.model('NMBM_NPP_GW_TREND',NMBM_NPP_GW_TrendSchema,'NMBM_NPP_GW_TREND')
      var nmbm_NPP_GW_Trend = new NMBM_NPP_GW_TREND({
       date: date,
       delivery_pressure: gvar.npp_p_pressure,
       flowRate: gvar.npp_p_flow_rate,
  level:gvar.npp_p_borehole_level
    })
    nmbm_NPP_GW_Trend.save()
  }
  }setTimeout(NMBM_NPP_GW_Trend, 60000);
}

var NMBM_NPP_TF_TrendSchema = mongoose.Schema({
  date:{type: Date},
  totalflow: {type: Number},
  })
//#endregion

//#region  Humpans dorp boreholes (don't delete this)
//TF means total flow
function NPP_TREND_TF(){
  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes()
  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min; // get current date and time

  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeFMT=Get_UpdateTimeMS(gvar.npp_g_ut)
  if (hour==23&& min==59){ // totalflow data must only be recorded at midnight
    if(gvar.npp_g_total_flow==undefined || gvar.npp_g_total_flow==null || updateTimeFMT<fiveMinAgo){}
    else
    {
      var NPP_TF_TREND = mongoose.model('NPP_TF_Trend',NMBM_NPP_TF_TrendSchema,'NPP_TF_Trend')
      var NPP_TF_Trend = new NPP_TF_TREND({
       date: date,
      totalflow: gvar.npp_g_total_flow,
    })

    NPP_TF_Trend.save()// save data in DB
  }
   }setTimeout(NPP_TREND_TF, 60000); //function repeats every 1 min
  }
  var  KLM_HUP_GW_TrendSchema = mongoose.Schema({
    date:{type: Date},
    flowRate_HD1: {type: Number},
    level_HD1: {type: Number},





  })

  function KLM_HUP_GW_Trend(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeVW=Get_UpdateTimeMS(gvar.fmt_FM_UT)

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
    if (min % 10 === 0){
      if(gvar.hup1_borehole_lvl ==  undefined || gvar.hup1_borehole_lvl == null ||
        gvar.hup1_flow_rate ==undefined || gvar.hup1_flow_rate==null ||
       updateTimeVW<fiveMinAgo){}
      else{
        var KLM_HUP_GW_TREND = mongoose.model('KLM_HUP_GW_TREND',KLM_HUP_GW_TrendSchema,'KLM_HUP_GW_TREND')
        var klm_HUP_GW_Trend = new KLM_HUP_GW_TREND({
         date: date,
         flowRate_HD1: gvar.hup1_flow_rate,
         level_HD1: gvar.hup1_borehole_lvl,


      })
      klm_HUP_GW_Trend.save()
    }}setTimeout(KLM_HUP_GW_Trend, 60000);
  }

    var NMBM_HUM_GW_FLOW_TrendSchema = mongoose.Schema({
    date:{type:Date},

    hum_gw_borehole_lvl: {type:Number},
hum_gw_raw_water_tank_lvl: {type:Number},
hum_gw_final_water_tank_lvl: {type:Number},
  })

  function NMBM_HUM_GW_FLOW(){

    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes()

    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeFMT=Get_UpdateTimeMS(gvar.hum_gw_last_update)

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (min == 00 || min == 10 || min == 20 || min == 30 || min == 40 || min == 50){

      if(

        gvar.hum_gw_borehole_lvl == undefined || gvar.hum_gw_borehole_lvl == null ||
        gvar.hum_gw_raw_water_tank_lvl == undefined || gvar.hum_gw_raw_water_tank_lvl == null ||
        gvar.hum_gw_final_water_tank_lvl == undefined || gvar.hum_gw_final_water_tank_lvl == null ||
          updateTimeFMT<fiveMinAgo){}
          else
          {
            var NMBM_HUM_GW_FLOWRATE = mongoose.model("NMBM_HUM_GW_FLOWRATE",NMBM_HUM_GW_FLOW_TrendSchema, "NMBM_HUM_GW_FLOWRATE")
            var nmbm_HUM_GW_FLOWRATE = new NMBM_HUM_GW_FLOWRATE({
              date:date,
              hum_gw_borehole_lvl: gvar.hum_gw_borehole_lvl,
hum_gw_raw_water_tank_lvl: gvar.hum_gw_raw_water_tank_lvl,
hum_gw_final_water_tank_lvl: gvar.hum_gw_final_water_tank_lvl,

            })
            nmbm_HUM_GW_FLOWRATE.save();
          }
    }setTimeout(NMBM_HUM_GW_FLOW, 60000)


  }

  var KLM_HUP_GW_TF_TrendSchema = mongoose.Schema({
    date:{type: Date},
    total_flow_HD1: {type: Number},
    })
  //TF means total flow
  function KLM_HUP_GW_TF(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes()
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min; // get current date and time

    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeFMT=Get_UpdateTimeMS(gvar.hup1_ut)
    if (hour==23&& min==59) { // totalflow data must only be recorded at midnight
      if(gvar.hup1_total_flow==undefined || gvar.hup1_total_flow==null ||
        updateTimeFMT<fiveMinAgo){}
      else
      {
        var KLM_HUP_TF_TREND = mongoose.model('KLM_HUP_TF_TREND',KLM_HUP_GW_TF_TrendSchema,'KLM_HUP_TF_TREND')
        var klm_HUP_GW_TF = new KLM_HUP_TF_TREND({
         date: date,
         total_flow_HD1: gvar.hup1_total_flow,
      })

      klm_HUP_GW_TF.save()// save data in DB
    }
     }setTimeout(KLM_HUP_GW_TF, 60000); //function repeats every 1 min
    }
  var  KLM_HUP2_GW_TrendSchema = mongoose.Schema({
    date:{type: Date},

    flowRate_HD2C: {type: Number},
    level_HD2C: {type: Number},





  })
  function KLM_HUP2_GW_Trend(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeVW=Get_UpdateTimeMS(gvar.hup2_ut)

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (min % 10 === 0){
      if(
        gvar.hup2_borehole_lvl == undefined || gvar.hup2_borehole_lvl == null ||
        gvar.hup2_flow_rate ==undefined || gvar.hup2_flow_rate==null ||
       updateTimeVW<fiveMinAgo){}
      else{
        var KLM_HUP2_GW_TREND = mongoose.model('KLM_HUP2_GW_TREND',KLM_HUP2_GW_TrendSchema,'KLM_HUP2_GW_TREND')
        var klm_HUP2_GW_Trend = new KLM_HUP2_GW_TREND({
         date: date,
         flowRate_HD2C: gvar.hup2_flow_rate,
         level_HD2C: gvar.hup2_borehole_lvl,

      })
      klm_HUP2_GW_Trend.save()
    }
    }setTimeout(KLM_HUP2_GW_Trend, 60000);
  }
  var KLM_HUP2_GW_TF_TrendSchema = mongoose.Schema({
    date:{type: Date},
    total_flow_HD2C: {type: Number},
    })
  //TF means total flow
  function KLM_HUP2_GW_TF(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes()
    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min; // get current date and time

    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeFMT=Get_UpdateTimeMS(gvar.hup2_ut)
    if (hour==23&& min==59){ // totalflow data must only be recorded at midnight
      if(
        gvar.hup2_total_flow==undefined || gvar.hup2_total_flow==null ||

        updateTimeFMT<fiveMinAgo){}
      else
      {
        var KLM_HUP2_TF_TREND = mongoose.model('KLM_HUP2_TF_TREND',KLM_HUP2_GW_TF_TrendSchema,'KLM_HUP2_TF_TREND')
        var klm_HUP2_GW_TF = new KLM_HUP2_TF_TREND({
         date: date,
         total_flow_HD2C: gvar.hup2_total_flow,
      })

      klm_HUP2_GW_TF.save()// save data in DB
    }
     }setTimeout(KLM_HUP2_GW_TF, 60000); //function repeats every 1 min
    }
    var  KLM_HUP3_GW_TrendSchema = mongoose.Schema({
      date:{type: Date},
      flowRate_HD3: {type: Number},
      level_HD3: {type: Number},





    })
    function KLM_HUP3_GW_Trend(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeVW=Get_UpdateTimeMS(gvar.hup3_ut)

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

      if (min % 10 === 0)
        if(
          gvar.hup3_borehole_lvl ==undefined || gvar.hup3_borehole_lvl==null ||
          gvar.hup3_flow_rate ==undefined || gvar.hup3_flow_rate==null ||
         updateTimeVW<fiveMinAgo){}
        else{
          var KLM_HUP3_GW_TREND = mongoose.model('KLM_HUP3_GW_TREND',KLM_HUP3_GW_TrendSchema,'KLM_HUP3_GW_TREND')
          var klm_HUP3_GW_TREND = new KLM_HUP3_GW_TREND({
           date: date,
           flowRate_HD3: gvar.hup3_flow_rate,
           level_HD3: gvar.hup3_borehole_lvl,

        })
        klm_HUP3_GW_TREND.save()
      }setTimeout(KLM_HUP3_GW_Trend, 60000);
      }
    var KLM_HUP3_GW_TF_TrendSchema = mongoose.Schema({
      date:{type: Date},
      total_flow_HD3: {type: Number},
      })
    //TF means total flow
    function KLM_HUP3_GW_TF(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes()
      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min; // get current date and time

      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeFMT=Get_UpdateTimeMS(gvar.hup3_ut)
      if (hour==23&& min==59){ // totalflow data must only be recorded at midnight
        if(

          gvar.hup3_total_flow==undefined || gvar.hup3_total_flow==null ||
          updateTimeFMT<fiveMinAgo){}
        else
        {
          var KLM_HUP3_TF_TREND = mongoose.model('KLM_HUP3_TF_TREND',KLM_HUP3_GW_TF_TrendSchema,'KLM_HUP3_TF_TREND')
          var klm_HUP3_TF_TREND = new KLM_HUP3_TF_TREND({
           date: date,
           total_flow_HD3: gvar.hup3_total_flow,
        })

        klm_HUP3_TF_TREND.save()// save data in DB
      }
       }setTimeout(KLM_HUP3_GW_TF, 60000); //function repeats every 1 min
      }


    var  KLM_HUP4_GW_TrendSchema = mongoose.Schema({
      date:{type: Date},
      flowRate_HD4: {type: Number},
      level_HD4: {type: Number},




    })

    function KLM_HUP4_GW_Trend(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeVW=Get_UpdateTimeMS(gvar.hup4_ut)

      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

      if (min % 10 === 0)
        if(
          gvar.hup4_borehole_lvl ==undefined || gvar.hup4_borehole_lvl==null ||
          gvar.hup4_flow_rate ==undefined || gvar.hup4_flow_rate==null ||
         updateTimeVW<fiveMinAgo){}
        else{
          var KLM_HUP4_GW_TREND = mongoose.model('KLM_HUP4_GW_TREND',KLM_HUP4_GW_TrendSchema,'KLM_HUP4_GW_TREND')
          var klm_HUP4_GW_TREND = new KLM_HUP4_GW_TREND({
           date: date,
           flowRate_HD4: gvar.hup4_flow_rate,
           level_HD4: gvar.hup4_borehole_lvl

        })
        klm_HUP4_GW_TREND.save()
      }setTimeout(KLM_HUP4_GW_Trend, 60000);
      }


    var KLM_HUP4_GW_TF_TrendSchema = mongoose.Schema({
      date:{type: Date},
      total_flow_HD4: {type: Number},
      })
    //TF means total flow
    function KLM_HUP4_GW_TF(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes()
      var date = year + "-" + month + "-" + day +" "+ hour +":"+ min; // get current date and time

      var fiveMinAgo = Get_5Min_Ago();
      var updateTimeFMT=Get_UpdateTimeMS(gvar.hup4_ut)
      if (hour==23&& min==59){ // totalflow data must only be recorded at midnight
        if(
          gvar.hup4_total_flow==undefined || gvar.hup4_total_flow==null ||
          updateTimeFMT<fiveMinAgo){}
        else
        {
          var KLM_HUP4_TF_TREND = mongoose.model('KLM_HUP4_TF_TREND',KLM_HUP4_GW_TF_TrendSchema,'KLM_HUP4_TF_TREND')
          var klm_HUP4_GW_TF = new KLM_HUP4_TF_TREND({
           date: date,
           total_flow_HD4:  gvar.hup4_total_flow
        })

        klm_HUP4_GW_TF.save()// save data in DB
      }
       }setTimeout(KLM_HUP4_GW_TF, 60000); //function repeats every 1 min
      }



      var  KLM_HUP6_GW_TrendSchema = mongoose.Schema({
        date:{type: Date},
        flowRate_HD6: {type: Number},
        level_HD6: {type: Number},
      })

      function KLM_HUP6_GW_Trend(){
        var now =  new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var fiveMinAgo = Get_5Min_Ago();
        var updateTimeVW=Get_UpdateTimeMS(gvar.hup6_ut)

        var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

        if (min % 10 === 0)
          if(
            gvar.hup6_borehole_lvl ==undefined || gvar.hup6_borehole_lvl==null ||
            gvar.hup6_flow_rate ==undefined || gvar.hup6_flow_rate==null ||
           updateTimeVW<fiveMinAgo){}
          else{
            var KLM_HUP6_GW_TREND = mongoose.model('KLM_HUP6_GW_TREND',KLM_HUP6_GW_TrendSchema,'KLM_HUP6_GW_TREND')
            var klm_HUP6_GW_TREND = new KLM_HUP6_GW_TREND({
             date: date,
             flowRate_HD6: gvar.hup6_flow_rate,
             level_HD6: gvar.hup6_borehole_lvl

          })
          klm_HUP6_GW_TREND.save()
        }setTimeout(KLM_HUP6_GW_Trend, 60000);
        }


      var KLM_HUP6_GW_TF_TrendSchema = mongoose.Schema({
        date:{type: Date},
        total_flow_HD6: {type: Number},
        })
      //TF means total flow
      function KLM_HUP6_GW_TF(){
        var now =  new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes()
        var date = year + "-" + month + "-" + day +" "+ hour +":"+ min; // get current date and time

        var fiveMinAgo = Get_5Min_Ago();
        var updateTimeFMT=Get_UpdateTimeMS(gvar.hup4_ut)
        if (hour==23&& min==59){ // totalflow data must only be recorded at midnight
          if(
            gvar.hup6_total_flow==undefined || gvar.hup6_total_flow==null ||
            updateTimeFMT<fiveMinAgo){}
          else
          {
            var KLM_HUP6_TF_TREND = mongoose.model('KLM_HUP6_TF_TREND',KLM_HUP6_GW_TF_TrendSchema,'KLM_HUP6_TF_TREND')
            var klm_HUP6_GW_TF = new KLM_HUP6_TF_TREND({
             date: date,
             total_flow_HD6:  gvar.hup6_total_flow
          })

          klm_HUP6_GW_TF.save()// save data in DB
        }
         }setTimeout(KLM_HUP6_GW_TF, 60000); //function repeats every 1 min
        }


        var NMBM_HUM_GW_FLOW_TrendSchema = mongoose.Schema({
          date:{type:Date},

          hum_gw_borehole_lvl: {type:Number},
hum_gw_raw_water_tank_lvl: {type:Number},
hum_gw_final_water_tank_lvl: {type:Number},
        })

        function NMBM_HUM_GW_FLOW(){

          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes()

          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeFMT=Get_UpdateTimeMS(gvar.hum_gw_last_update)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min % 10 === 0){

            if(

              gvar.hum_gw_borehole_lvl == undefined || gvar.hum_gw_borehole_lvl == null ||
              gvar.hum_gw_raw_water_tank_lvl == undefined || gvar.hum_gw_raw_water_tank_lvl == null ||
              gvar.hum_gw_final_water_tank_lvl == undefined || gvar.hum_gw_final_water_tank_lvl == null ||
                updateTimeFMT<fiveMinAgo){}
                else
                {
                  var NMBM_HUM_GW_FLOWRATE = mongoose.model("NMBM_HUM_GW_FLOWRATE",NMBM_HUM_GW_FLOW_TrendSchema, "NMBM_HUM_GW_FLOWRATE")
                  var nmbm_HUM_GW_FLOWRATE = new NMBM_HUM_GW_FLOWRATE({
                    date:date,
                    hum_gw_borehole_lvl: gvar.hum_gw_borehole_lvl,
hum_gw_raw_water_tank_lvl: gvar.hum_gw_raw_water_tank_lvl,
hum_gw_final_water_tank_lvl: gvar.hum_gw_final_water_tank_lvl,

                  })
                  nmbm_HUM_GW_FLOWRATE.save();
                }
          }setTimeout(NMBM_HUM_GW_FLOW, 60000)


        }

        var KARK_K1_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_kark_k1_flow_rate: {type:Number},
          gw_kark_k1_current: {type:Number},
          gw_kark_k1_level: {type:Number},
        })

        function KARK_K1_FLOW_GW_RATE(){

          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes()

          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeFMT=Get_UpdateTimeMS(gvar.gw_kark_k1_UT)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min % 10 === 0){

            if(

              gvar.gw_kark_k1_flow_rate == undefined || gvar.gw_kark_k1_flow_rate == null ||
              gvar.gw_kark_k1_current == undefined || gvar.gw_kark_k1_current == null ||
              gvar.gw_kark_k1_level == undefined || gvar.gw_kark_k1_level == null ||
                updateTimeFMT<fiveMinAgo){}
                else
                {
                  var KARK_K1_FLOW_RATE = mongoose.model("KARK_K1_FLOW_RATE",KARK_K1_TrendSchema, "KARK_K1_FLOW_RATE")
                  var kark_K1_FLOW_RATE = new KARK_K1_FLOW_RATE({
                    date:date,
                    gw_kark_k1_flow_rate: gvar.gw_kark_k1_flow_rate,
                    gw_kark_k1_current: gvar.gw_kark_k1_current,
                    gw_kark_k1_level: gvar.gw_kark_k1_level,

                  })
                  kark_K1_FLOW_RATE.save();
                }
          }setTimeout(KARK_K1_FLOW_GW_RATE, 60000)
        }

        var KARK_K1_TF_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_kark_k1_total_flow: {type:Number},

        })

        function KARK_K1_TF_GW_RATE(){

          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes()

          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeFMT=Get_UpdateTimeMS(gvar.gw_kark_k1_UT)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min % 10 === 0){

            if(

              gvar.gw_kark_k1_total_flow == undefined || gvar.gw_kark_k1_total_flow == null ||

                updateTimeFMT<fiveMinAgo){}
                else
                {
                  var KARK_K1_TOTAL_FLOW = mongoose.model("KARK_K1_TOTAL_FLOW",KARK_K1_TF_TrendSchema, "KARK_K1_TOTAL_FLOW")
                  var kark_K1_TOTAL_FLOW = new KARK_K1_TOTAL_FLOW({
                    date:date,
                    gw_kark_k1_total_flow: gvar.gw_kark_k1_total_flow,


                  })
                  kark_K1_TOTAL_FLOW.save();
                }
          }setTimeout(KARK_K1_TF_GW_RATE, 60000)
        }


        var KARK_K2_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_kark_k2_flow_rate: {type:Number},
          gw_kark_k2_current: {type:Number},
          gw_kark_k2_level: {type:Number},
        })

        function KARK_K2_FLOW_GW_RATE(){

          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes()

          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeFMT=Get_UpdateTimeMS(gvar.gw_kark_k2_UT)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min % 10 === 0){

            if(

              gvar.gw_kark_k2_flow_rate == undefined || gvar.gw_kark_k2_flow_rate == null ||
              gvar.gw_kark_k2_current == undefined || gvar.gw_kark_k2_current == null ||
              gvar.gw_kark_k2_level == undefined || gvar.gw_kark_k2_level == null ||
                updateTimeFMT<fiveMinAgo){}
                else
                {
                  var KARK_K2_FLOW_RATE = mongoose.model("KARK_K2_FLOW_RATE",KARK_K2_TrendSchema, "KARK_K2_FLOW_RATE")
                  var kark_K2_FLOW_RATE = new KARK_K2_FLOW_RATE({
                    date:date,
                    gw_kark_k2_flow_rate: gvar.gw_kark_k2_flow_rate,
                    gw_kark_k2_current: gvar.gw_kark_k2_current,
                    gw_kark_k2_level: gvar.gw_kark_k2_level,

                  })
                  kark_K2_FLOW_RATE.save();
                }
          }setTimeout(KARK_K2_FLOW_GW_RATE, 60000)
        }



        var KARK_K2_TF_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_kark_k2_total_flow: {type:Number},

        })

        function KARK_K2_TF_GW_RATE(){

          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes()

          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeFMT=Get_UpdateTimeMS(gvar.gw_kark_k1_UT)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min == 55 && hour == 23){

            if( gvar.gw_kark_k2_total_flow == undefined || gvar.gw_kark_k2_total_flow == null ||
                updateTimeFMT<fiveMinAgo){}
                else
                {
                  var KARK_K2_TOTAL_FLOW = mongoose.model("KARK_K2_TOTAL_FLOW",KARK_K2_TF_TrendSchema, "KARK_K2_TOTAL_FLOW")
                  var kark_K2_TOTAL_FLOW = new KARK_K2_TOTAL_FLOW({
                    date:date,
                    gw_kark_k2_total_flow: gvar.gw_kark_k2_total_flow,


                  })
                  kark_K2_TOTAL_FLOW.save();
                }
          }setTimeout(KARK_K2_TF_GW_RATE, 60000)
        }


        var KRUIS_BOREHOLE12_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_klm_kruis12_lvl: {type:Number},
          gw_klm_kruis12_vsd: {type:Number},
          gw_klm_kruis12_bar: {type:Number},
          gw_klm_kruis12_flow_rate: {type:Number},
          gw_klm_kruis12_voltage: {type:Number},
          gw_klm_kruis12_current: {type:Number},
          gw_klm_kruis12_power: {type:Number},
        })

        function KLM_KRUIS12_TREND(){
        var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      const date = `${year}-${month}-${day} ${hour}:${min}`;
      var fiveMinAgo = Get_5Min_Ago();

      var updateTime_KLM_UT=Get_UpdateTimeMS(gvar.gw_klm_kruis12_UT)
      if (min % 10 === 0){
        if(gvar.gw_klm_kruis12_lvl == undefined ||      gvar.gw_klm_kruis12_lvl == null ||
           gvar.gw_klm_kruis12_vsd == undefined ||       gvar.gw_klm_kruis12_vsd == null ||
           gvar.gw_klm_kruis12_bar == undefined ||       gvar.gw_klm_kruis12_bar == null ||
           gvar.gw_klm_kruis12_flow_rate == undefined || gvar.gw_klm_kruis12_flow_rate == null ||
           gvar.gw_klm_kruis12_voltage == undefined ||   gvar.gw_klm_kruis12_voltage == null ||
           gvar.gw_klm_kruis12_current == undefined ||   gvar.gw_klm_kruis12_current == null ||
           gvar.gw_klm_kruis12_power == undefined ||     gvar.gw_klm_kruis12_power == null ||
           updateTime_KLM_UT<fiveMinAgo
           ){}
           else
           {
            var KLM_KRUIS12_FLOW = mongoose.model("KLM_KRUIS12_FLOW",KRUIS_BOREHOLE12_TrendSchema,"KLM_KRUIS12_FLOW")
            var klm_KRUIS12_FLOW = new KLM_KRUIS12_FLOW({
              date:date,
              gw_klm_kruis12_lvl:gvar.gw_klm_kruis12_lvl,
              gw_klm_kruis12_vsd:gvar.gw_klm_kruis12_vsd,
              gw_klm_kruis12_bar:gvar.gw_klm_kruis12_bar,
              gw_klm_kruis12_flow_rate:gvar.gw_klm_kruis12_flow_rate,
              gw_klm_kruis12_voltage:gvar.gw_klm_kruis12_voltage,
              gw_klm_kruis12_current:gvar.gw_klm_kruis12_current,
              gw_klm_kruis12_power:gvar.gw_klm_kruis12_power,

            })
            klm_KRUIS12_FLOW.save()
          }

      }setTimeout(KLM_KRUIS12_TREND, 60000)

        }


        var KRUIS_BOREHOLE13_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_klm_kruis13_lvl: {type:Number},
          gw_klm_kruis13_vsd: {type:Number},
          gw_klm_kruis13_bar: {type:Number},
          gw_klm_kruis13_flow_rate: {type:Number},
          gw_klm_kruis13_voltage: {type:Number},
          gw_klm_kruis13_current: {type:Number},
          gw_klm_kruis13_power: {type:Number},
        })

        function KLM_KRUIS13_TREND(){
        var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      const date = `${year}-${month}-${day} ${hour}:${min}`;
      var fiveMinAgo = Get_5Min_Ago();

      var updateTime_KLM_UT=Get_UpdateTimeMS(gvar.gw_klm_kruis13_UT)
      if (min % 10 === 0){
        if(gvar.gw_klm_kruis13_lvl == undefined ||      gvar.gw_klm_kruis13_lvl == null ||
           gvar.gw_klm_kruis13_vsd == undefined ||       gvar.gw_klm_kruis13_vsd == null ||
           gvar.gw_klm_kruis13_bar == undefined ||       gvar.gw_klm_kruis13_bar == null ||
           gvar.gw_klm_kruis13_flow_rate == undefined || gvar.gw_klm_kruis13_flow_rate == null ||
           gvar.gw_klm_kruis13_voltage == undefined ||   gvar.gw_klm_kruis13_voltage == null ||
           gvar.gw_klm_kruis13_current == undefined ||   gvar.gw_klm_kruis13_current == null ||
           gvar.gw_klm_kruis13_power == undefined ||     gvar.gw_klm_kruis13_power == null ||
           updateTime_KLM_UT<fiveMinAgo
           ){}
           else
           {
            var KLM_KRUIS13_FLOW = mongoose.model("KLM_KRUIS13_FLOW",KRUIS_BOREHOLE13_TrendSchema,"KLM_KRUIS13_FLOW")
            var klm_KRUIS13_FLOW = new KLM_KRUIS13_FLOW({
              date:date,
              gw_klm_kruis13_lvl:gvar.gw_klm_kruis13_lvl,
              gw_klm_kruis13_vsd:gvar.gw_klm_kruis13_vsd,
              gw_klm_kruis13_bar:gvar.gw_klm_kruis13_bar,
              gw_klm_kruis13_flow_rate:gvar.gw_klm_kruis13_flow_rate,
              gw_klm_kruis13_voltage:gvar.gw_klm_kruis13_voltage,
              gw_klm_kruis13_current:gvar.gw_klm_kruis13_current,
              gw_klm_kruis13_power:gvar.gw_klm_kruis13_power,

            })
            klm_KRUIS13_FLOW.save()
          }

      }setTimeout(KLM_KRUIS13_TREND, 60000)

        }


        var KRUIS_BOREHOLE14_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_klm_kruis14_lvl: {type:Number},
          gw_klm_kruis14_vsd: {type:Number},
          gw_klm_kruis14_bar: {type:Number},
          gw_klm_kruis14_flow_rate: {type:Number},
          gw_klm_kruis14_voltage: {type:Number},
          gw_klm_kruis14_current: {type:Number},
          gw_klm_kruis14_power: {type:Number},
        })

        function KLM_KRUIS14_TREND(){
        var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      const date = `${year}-${month}-${day} ${hour}:${min}`;
      var fiveMinAgo = Get_5Min_Ago();

      var updateTime_KLM_UT=Get_UpdateTimeMS(gvar.gw_klm_kruis14_UT)
      if (min % 10 === 0){
        if(gvar.gw_klm_kruis14_lvl == undefined ||      gvar.gw_klm_kruis14_lvl == null ||
           gvar.gw_klm_kruis14_vsd == undefined ||       gvar.gw_klm_kruis14_vsd == null ||
           gvar.gw_klm_kruis14_bar == undefined ||       gvar.gw_klm_kruis14_bar == null ||
           gvar.gw_klm_kruis14_flow_rate == undefined || gvar.gw_klm_kruis14_flow_rate == null ||
           gvar.gw_klm_kruis14_voltage == undefined ||   gvar.gw_klm_kruis14_voltage == null ||
           gvar.gw_klm_kruis14_current == undefined ||   gvar.gw_klm_kruis14_current == null ||
           gvar.gw_klm_kruis14_power == undefined ||     gvar.gw_klm_kruis14_power == null ||
           updateTime_KLM_UT<fiveMinAgo
           ){}
           else
           {
            var KLM_KRUIS14_FLOW = mongoose.model("KLM_KRUIS14_FLOW",KRUIS_BOREHOLE14_TrendSchema,"KLM_KRUIS14_FLOW")
            var klm_KRUIS14_FLOW = new KLM_KRUIS14_FLOW({
              date:date,
              gw_klm_kruis14_lvl:gvar.gw_klm_kruis14_lvl,
              gw_klm_kruis14_vsd:gvar.gw_klm_kruis14_vsd,
              gw_klm_kruis14_bar:gvar.gw_klm_kruis14_bar,
              gw_klm_kruis14_flow_rate:gvar.gw_klm_kruis14_flow_rate,
              gw_klm_kruis14_voltage:gvar.gw_klm_kruis14_voltage,
              gw_klm_kruis14_current:gvar.gw_klm_kruis14_current,
              gw_klm_kruis14_power:gvar.gw_klm_kruis14_power,

            })
            klm_KRUIS14_FLOW.save()
          }

      }setTimeout(KLM_KRUIS14_TREND, 60000)

        }


        var KRUIS_BOREHOLE12_TF_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_klm_kruis12_TF: {type:Number},
          gw_klm_kruis12_total_power: {type:Number},

        })


        function KLM_KRUIS12_TREND_TF(){

          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes()

          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeFMT=Get_UpdateTimeMS(gvar.gw_klm_kruis12_UT)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min == 55 && hour == 23){
            if(gvar.gw_klm_kruis12_TF == undefined || gvar.gw_klm_kruis12_TF == null ||
              gvar.gw_klm_kruis12_total_power == undefined ||gvar.gw_klm_kruis12_total_power == undefined||
              updateTimeFMT<fiveMinAgo
              ){}
              else{
                var KLM_KRUIS12_FLOW = mongoose.model("KLM_KRUIS12_TF",KRUIS_BOREHOLE12_TF_TrendSchema,"KLM_KRUIS12_TF")
                var klm_KRUIS12_FLOW = new KLM_KRUIS12_FLOW({
                  date:date,
                  gw_klm_kruis12_TF:gvar.gw_klm_kruis12_TF,
                  gw_klm_kruis12_total_power:gvar.gw_klm_kruis12_total_power,
                })
                klm_KRUIS12_FLOW.save()
              }


          }setTimeout(KLM_KRUIS12_TREND_TF, 60000)

        }

        var KRUIS_BOREHOLE13_TF_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_klm_kruis13_TF: {type:Number},
          gw_klm_kruis13_total_power: {type:Number},

        })

        function KLM_KRUIS13_TREND_TF(){

          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes()

          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeFMT=Get_UpdateTimeMS(gvar.gw_klm_kruis13_UT)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min == 55 && hour == 23){
            if(gvar.gw_klm_kruis13_TF == undefined || gvar.gw_klm_kruis13_TF == null ||
              gvar.gw_klm_kruis13_total_power == undefined ||gvar.gw_klm_kruis13_total_power == undefined||
              updateTimeFMT<fiveMinAgo
              ){}
              else{
                var KLM_KRUIS13_FLOW = mongoose.model("KLM_KRUIS13_TF",KRUIS_BOREHOLE13_TF_TrendSchema,"KLM_KRUIS13_TF")
                var klm_KRUIS13_FLOW = new KLM_KRUIS13_FLOW({
                  date:date,
                  gw_klm_kruis13_TF:gvar.gw_klm_kruis13_TF,
                  gw_klm_kruis13_total_power:gvar.gw_klm_kruis13_total_power,
                })
                klm_KRUIS13_FLOW.save()
              }


          }setTimeout(KLM_KRUIS13_TREND_TF, 60000)

        }

        var KRUIS_BOREHOLE14_TF_TrendSchema = mongoose.Schema({
          date:{type:Date},
          gw_klm_kruis14_TF: {type:Number},
          gw_klm_kruis14_total_power: {type:Number},

        })

        function KLM_KRUIS14_TREND_TF(){

          var now =  new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var hour = now.getHours();
          var min = now.getMinutes()

          var fiveMinAgo = Get_5Min_Ago();
          var updateTimeFMT=Get_UpdateTimeMS(gvar.gw_klm_kruis14_UT)

          var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

          if (min == 55 && hour == 23){
            if(gvar.gw_klm_kruis14_TF == undefined || gvar.gw_klm_kruis14_TF == null ||
              gvar.gw_klm_kruis14_total_power == undefined ||gvar.gw_klm_kruis14_total_power == undefined||
              updateTimeFMT<fiveMinAgo
              ){}
              else{
                var KLM_KRUIS14_FLOW = mongoose.model("KLM_KRUIS14_TF",KRUIS_BOREHOLE14_TF_TrendSchema,"KLM_KRUIS14_TF")
                var klm_KRUIS14_FLOW = new KLM_KRUIS14_FLOW({
                  date:date,
                  gw_klm_kruis14_TF:gvar.gw_klm_kruis14_TF,
                  gw_klm_kruis14_total_power:gvar.gw_klm_kruis14_total_power,
                })
                klm_KRUIS14_FLOW.save()
              }


          }setTimeout(KLM_KRUIS14_TREND_TF, 60000)

        }


//#endregion

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


