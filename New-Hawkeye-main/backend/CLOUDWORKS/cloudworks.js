//Serves as a basic template for all future sites.

module.exports = {read_cloudworks };
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
const fun = require('./cloudworksfunctions')


//Get IP address from Daniel
var ip = '40.114.246.217'
var regStart = 0;
//Amount of Memorywords you have
var regNum = 22;
var connected = 0;
var init = 0;
var error = 0;
var poll = 0;
var pollEnd = 14;

var timeout = 2000;

//Input function Name

function read_cloudworks(){
  error =0;
  const socket = new net.Socket()
  const GR_Wolwas_R_CLIENT = new Modbus.client.TCP(socket, 2, timeout)
  const GR_Bergendal_R_CLIENT = new Modbus.client.TCP(socket, 5, timeout)
  const GR_Umasizakhe_R_CLIENT = new Modbus.client.TCP(socket, 6, timeout)
  const GR_Kroonvale_R_CLIENT = new Modbus.client.TCP(socket, 8, timeout)
  const NMBM_OLI_R_CLIENT = new Modbus.client.TCP(socket,9, timeout)
  const JB_OFF_TAKE_FPT_CLIENT = new Modbus.client.TCP(socket,10, timeout)
  const JB_PARADISE_BEA_FPT_CLIENT = new Modbus.client.TCP(socket,11, timeout)
  const JB_ONS_PARADYS_FPT_CLIENT = new Modbus.client.TCP(socket,12,timeout)
  const JB_KOUGA_MAIN_LINE_FPT_CLIENT = new Modbus.client.TCP(socket,13,timeout)
  const HUMANS_OFF_TAKE_FPT_CLIENT = new Modbus.client.TCP(socket,14,timeout)
  const Kareedouw_WTW_RES = new Modbus.client.TCP(socket,15,timeout)
  const GR_Holding_R_CLIENT = new Modbus.client.TCP(socket, 16, timeout)
  const GR_Tinroof_R_CLIENT = new Modbus.client.TCP(socket, 17, timeout)
  const COE_KOP_R_CLIENT = new Modbus.client.TCP(socket, 18, timeout)


  const options = {
  'host' : ip,
  'port' : 503
  };
  if(connected == 0 ){
  socket.connect(options);
  }

    socket.on("connect", function() {
      connected = 1;

      if (init == 0){
      readval1()
      init = 1;
    }

 function readval1(){

      if(poll == 0){

        GR_Wolwas_R_CLIENT
        .readInputRegisters(regStart,regNum)
        .then(function(resp) {
           gvar.gr_wolwas_r = (resp.response._body.values);

           var test = []
           var array = []
          var finalString='';

       for (var i=0; i<8; i++) {
       test[i] = gvar.gr_wolwas_r[i + 12]
       array[i] = fun.cloudWorksLastPole(test[i])
      finalString= finalString + array[i]
       }

       gvar.wolwas_r_ut  = Date().slice(4,Date().length-41);

       var wolwas_level = (gvar.gr_wolwas_r[0] * 0.0294117 ).toFixed(1);

       gvar.wolwas_r_level = fun.controlLevel(wolwas_level)

       gvar.wolwas_r_battery_level = (gvar.gr_wolwas_r[1]);
       gvar.wolwas_r_poll_ut = fun.convertDateTime(finalString)

       if(gvar.wolwas_r_battery_level!=undefined || gvar.wolwas_r_battery_level!=null){

        var firstValue={
          wolwas_r_ut:gvar.wolwas_r_ut,
          wolwas_r_level:gvar.wolwas_r_level,
          wolwas_r_battery_level:gvar.wolwas_r_battery_level,
          wolwas_r_poll_ut:gvar.wolwas_r_poll_ut,
          id:"graaf"
        };

        var reservoirTrend={
          wolwas_r_ut:gvar.wolwas_r_ut,
          wolwas_r_level:gvar.wolwas_r_level,
          wolwas_r_poll_ut:gvar.wolwas_r_poll_ut,
          id:"res_overview"
        }

            fun.storeInDB(firstValue,"R_CurrentVals")
            fun.storeInDB(reservoirTrend,"Res_CurrentVals")

      }
          }).catch(function() {
            console.error(
              require("util").inspect(arguments, {
                depth: null
              })
            );
            error = 1

          });
      }
      else if(poll == 1){
        GR_Bergendal_R_CLIENT
        .readInputRegisters(regStart,regNum)
        .then(function(resp) {
          gvar.gr_bergendal_r = (resp.response._body.values);

          var test = []
          var array = []
          var finalString='';

       for (var i=0; i<8; i++) {
       test[i] = gvar.gr_bergendal_r[i + 12]
       array[i] = fun.cloudWorksLastPole(test[i])
      finalString= finalString + array[i]

       }

       gvar.bergen_r_ut  = Date().slice(4,Date().length-41);
       var bergen_level =  (gvar.gr_bergendal_r[0] * 0.03125 ).toFixed(1);
        gvar.bergen_r_level =  fun.controlLevel(bergen_level)

       gvar.bergen_r_battery_level = (gvar.gr_bergendal_r[1]);
       gvar.bergen_r_poll_ut = fun.convertDateTime(finalString)

       if(gvar.bergen_r_level!=undefined || gvar.bergen_r_level!=null){

        var firstValue={
          bergen_r_ut:gvar.bergen_r_ut,
          bergen_r_level:gvar.bergen_r_level,
          bergen_r_battery_level:gvar.bergen_r_battery_level,
          bergen_r_poll_ut:gvar.bergen_r_poll_ut,
          id:"graaf"
        };

        var reservoirTrend={
          bergen_r_ut:gvar.bergen_r_ut,
          bergen_r_level:gvar.bergen_r_level,
          bergen_r_poll_ut:gvar.bergen_r_poll_ut,
          id:"res_overview"
        }

        fun.storeInDB(firstValue,"R_CurrentVals")
        fun.storeInDB(reservoirTrend,"Res_CurrentVals")

      }
        }).catch(function() {
            console.error(
              require("util").inspect(arguments, {
                depth: null
              })
            );
            error = 1
          });
      }
     else if(poll == 2){
        GR_Umasizakhe_R_CLIENT
        .readInputRegisters(regStart,regNum)
        .then(function(resp) {
          gvar.gr_umasizakhe_r  = (resp.response._body.values);

          var test = []
          var array = []
          var finalString='';

       // gvar.oli_lvl = parseString(val[11])
       for (var i=0; i<8; i++) {
       test[i] = gvar.gr_umasizakhe_r[i + 12]
       array[i] = fun.cloudWorksLastPole(test[i])
      finalString= finalString + array[i]
       }

       gvar.uma_r_ut  = Date().slice(4,Date().length-41);
       var uma_level =  (gvar.gr_umasizakhe_r[0] *  0.03077 ).toFixed(1);

        gvar.uma_r_level =  fun.controlLevel(uma_level)
       gvar.uma_r_battery_level = (gvar.gr_umasizakhe_r[1]);
       gvar.uma_r_poll_ut = fun.convertDateTime(finalString)

       if(gvar.uma_r_level!=undefined || gvar.uma_r_level!=null){

        var firstValue={
          uma_r_ut:gvar.uma_r_ut,
          uma_r_level:gvar.uma_r_level,
          uma_r_battery_level:gvar.uma_r_battery_level,
          uma_r_poll_ut:gvar.uma_r_poll_ut,
          id:"graaf"
        };

        var reservoirTrend={
          uma_r_ut:gvar.uma_r_ut,
          uma_r_level:gvar.uma_r_level,
          uma_r_poll_ut:gvar.uma_r_poll_ut,
          id:"res_overview"

        }

        fun.storeInDB(firstValue,"R_CurrentVals")
        fun.storeInDB(reservoirTrend,"Res_CurrentVals")

      }
        }).catch(function() {
            console.error(
              require("util").inspect(arguments, {
                depth: null
              })
            );
            error = 1

          });
      }
    else if(poll == 3){

        GR_Kroonvale_R_CLIENT
        .readInputRegisters(regStart,regNum)
        .then(function(resp) {
          gvar.gr_kroonvale_r = (resp.response._body.values);

          var test = []
          var array = []
          var finalString='';

       for (var i=0; i<8; i++) {
       test[i] = gvar.gr_kroonvale_r[i + 12]
       array[i] = fun.cloudWorksLastPole(test[i])
      finalString= finalString + array[i]}

       gvar.kroon_r_ut  = Date().slice(4,Date().length-41);
       var kroon_level = (gvar.gr_kroonvale_r[0] * 0.02165 ).toFixed(1);
       gvar.kroon_r_level =  fun.controlLevel(kroon_level)
       gvar.kroon_r_battery_level = (gvar.gr_kroonvale_r[1]);
       gvar.kroon_r_poll_ut = fun.convertDateTime(finalString)


       if(gvar.kroon_r_level!=undefined && gvar.kroon_r_level!=null){

        var firstValue={
          kroon_r_ut:gvar.kroon_r_ut,
          kroon_r_level:gvar.kroon_r_level,
          kroon_r_battery_level:gvar.kroon_r_battery_level,
          kroon_r_poll_ut:gvar.kroon_r_poll_ut,
          id:"graaf"
        };

        var reservoirTrend={
          kroon_r_ut:gvar.kroon_r_ut,
          kroon_r_level:gvar.kroon_r_level,
          kroon_r_poll_ut:gvar.kroon_r_poll_ut,
          id:"res_overview"

        }

        fun.storeInDB(firstValue,"R_CurrentVals")
        fun.storeInDB(reservoirTrend,"Res_CurrentVals")
      }
        }).catch(function() {
            console.error(
              require("util").inspect(arguments, {
                depth: null
              })
            );
            error = 1

          });
      }
      else if(poll == 4){
         NMBM_OLI_R_CLIENT
        .readInputRegisters(regStart,regNum)
        .then(function(resp) {
          var val= (resp.response._body.values);

          var test = []
          var array = []
         var finalString='';

      var oli_level = (val[0]/87).toFixed(1);

       gvar.oli_lvl =  fun.controlLevel(oli_level)

       gvar.oli_ut=Date().slice(4,Date().length-41);

       for (var i=0; i<8; i++) {
        test[i] = val[i + 12]
        array[i] = fun.cloudWorksLastPole(test[i])
       finalString= finalString + array[i]

        }

        gvar.batteryUnitUpdate = fun.convertDateTime(finalString)

       if(gvar.oli_lvl!=undefined || gvar.oli_lvl!=null){

 var firstValue ={
   oli_lvl:gvar.oli_lvl,
   oli_ut:gvar.oli_ut,
   batteryUnitUpdate:gvar.batteryUnitUpdate,
   id:"nmbm_olip_r"
 }

         var reservoirTrend={
           oli_lvl:gvar.oli_lvl,
           oli_ut:gvar.oli_ut,
           oli_batteryUnitUpdate:gvar.batteryUnitUpdate,
           id:"res_overview"
         }

         fun.storeInDB(firstValue,"R_CurrentVals")
         fun.storeInDB(reservoirTrend,"Res_CurrentVals")
               }

        }).catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
          error = 1

        });

      }
      else if(poll == 5){
        GR_Holding_R_CLIENT.readInputRegisters(regStart, regNum).then(function(resp){
          var val = (resp.response._body.values);

          var test = [];
          var array = [];
          var finalString='';

          for (var i=0; i<8; i++) {
            test[i] = val[i + 12]
            array[i] = fun.cloudWorksLastPole(test[i])
           finalString= finalString + array[i]
            }

            gvar.hol_r_ut  = Date().slice(4,Date().length-41);

            var rawData = new ArrayBuffer(4);
            var i = new Uint16Array(rawData);
            var f = new Float32Array(rawData);

            i[0] = val[2]; //low
            i[1] = val[3]; //high

            var holLevel = (val[0]/10).toFixed(1)

            gvar.hol_r_level =  fun.controlLevel(holLevel)
            gvar.hol_r_battery_level=  fun.controlLevel(val[1])
            gvar.hol_r_poll_ut =  fun.convertDateTime(finalString)

            if(gvar.hol_r_level != undefined || gvar.hol_r_level!=null){

              var firstValue ={
                hol_r_ut:gvar.hol_r_ut,
                hol_r_level:gvar.hol_r_level,
                hol_r_battery_level:gvar.hol_r_battery_level,
                hol_r_poll_ut:gvar.hol_r_poll_ut,
                id:"graaf"
              };

              var reservoirTrend={
                hol_r_ut:gvar.hol_r_ut,
                hol_r_level:gvar.hol_r_level,
                hol_r_poll_ut:gvar.hol_r_poll_ut,
                id:"res_overview"
              }

              fun.storeInDB(firstValue,"R_CurrentVals")
              fun.storeInDB(reservoirTrend,"Res_CurrentVals")
            }

        }).catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
          error = 1

        });

      }
      else if(poll == 6){
        GR_Tinroof_R_CLIENT.readInputRegisters(regStart, regNum).then(function(resp){
          var val  = (resp.response._body.values);

          var test = [];
          var array = [];
          var finalString='';


          for (var i=0; i<8; i++) {
            test[i] = val[i + 12]
            array[i] = fun.cloudWorksLastPole(test[i])
           finalString= finalString + array[i]
            }

            gvar.tin_r_ut  = Date().slice(4,Date().length-41);

            var rawData = new ArrayBuffer(4);
            var i = new Uint16Array(rawData);
            var f = new Float32Array(rawData);

            i[0] = val[2]; //low
            i[1] = val[3]; //high

            var tinLevel = parseFloat(f[0]).toFixed(1);

            gvar.tin_r_level =  fun.controlLevel(tinLevel)

            gvar.tin_r_battery_level = fun.controlLevel(val[1])
            gvar.tin_r_poll_ut =  fun.convertDateTime(finalString).toString();

            if(gvar.tin_r_level != undefined || gvar.tin_r_level!=null){

              var firstValue ={
                tin_r_ut:gvar.tin_r_ut,
                tin_r_level:gvar.tin_r_level,
                tin_r_battery_level:gvar.tin_r_battery_level,
                tin_r_poll_ut:gvar.tin_r_poll_ut,
                id:"graaf"
              };

              var reservoirTrend={
                tin_r_ut:gvar.tin_r_ut,
                tin_r_level:gvar.tin_r_level,
                tin_r_poll_ut:gvar.tin_r_poll_ut,
                id:"res_overview"
              }

              fun.storeInDB(firstValue,"R_CurrentVals")
              fun.storeInDB(reservoirTrend,"Res_CurrentVals")
            }
        }).catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
          error = 1
        });
      }
      else if(poll == 7){
        JB_OFF_TAKE_FPT_CLIENT.readInputRegisters(regStart, regNum).then(function(resp){
          var val  = (resp.response._body.values);

          var test = [];
          var array = [];
          var finalString='';


          for (var i=0; i<8; i++) {
            test[i] = val[i + 12]
            array[i] = fun.cloudWorksLastPole(test[i])
           finalString= finalString + array[i]
            }

            gvar.jeff_bay_off_take_last_seen = fun.convertDateTime(finalString)

            gvar.jeff_bay_off_take_battery_level = fun.controlLevel(val[1]);

            var rawData = new ArrayBuffer(32);
            var i = new Uint16Array(rawData);
            var f = new Float32Array(rawData);

            i[0] = val[9]; //low
            i[1] = val[8]; //high

            gvar.jeff_bay_off_take_total_flow = parseFloat(f[0]).toFixed(0);

            gvar.jeff_bay_off_take_last_update = Date().slice(4,Date().length-41);

            if(gvar.jeff_bay_off_take_total_flow != undefined || gvar.jeff_bay_off_take_total_flow!=null){
              var firstValue ={
                jeff_bay_off_take_battery_level:gvar.jeff_bay_off_take_battery_level,
                jeff_bay_off_take_last_update:gvar.jeff_bay_off_take_last_update,
                jeff_bay_off_take_total_flow:gvar.jeff_bay_off_take_total_flow,
                jeff_bay_off_take_last_seen:gvar.jeff_bay_off_take_last_seen,
                id:"jeffreys_bay"
                }

                      var fptTrends={
                        jeff_bay_off_take_last_update:gvar.jeff_bay_off_take_last_update,
                        jeff_bay_off_take_last_seen:gvar.jeff_bay_off_take_last_seen,
                        id:"fpt_currentvals"
                      }

                          fun.storeInDB(firstValue,"FPT_CurrentVals")
                          fun.storeInDB(fptTrends,"F_CurrentVals")

            }
        }).catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
          error = 1

        });

      }
      else if(poll == 8){
        JB_PARADISE_BEA_FPT_CLIENT.readInputRegisters(regStart, regNum).then(function(resp){
          var val  = (resp.response._body.values);

          var test = [];
          var array = [];
          var finalString='';


          for (var i=0; i<8; i++) {
            test[i] = val[i + 12]
            array[i] = fun.cloudWorksLastPole(test[i])
           finalString= finalString + array[i]
            }

            gvar.jb_PB_SFO_ut =Date().slice(4,Date().length-41);

            gvar.jb_PB_SFO_battery_level = fun.controlLevel(val[1])

            gvar.jb_PB_SFO_last_seen = fun.convertDateTime(finalString)

            var rawData = new ArrayBuffer(32);
            var i = new Uint16Array(rawData);
            var f = new Float32Array(rawData);

            i[0] = val[9]; //low
            i[1] = val[8]; //high
            i[2] = val[11]
            i[3] = val[10]

            gvar.jb_ST_Francis_OffTake_Total_Flow = parseFloat(f[0]).toFixed(0);
            gvar.jb_Para_Bea_TF = parseFloat(f[1]/10).toFixed(0)

            if(gvar.jb_ST_Francis_OffTake_Total_Flow != undefined || gvar.jb_ST_Francis_OffTake_Total_Flow!=null){

              var firstValue ={
                 jb_PB_SFO_ut:gvar.jb_PB_SFO_ut,
                 jb_PB_SFO_battery_level:gvar.jb_PB_SFO_battery_level,
                 jb_ST_Francis_OffTake_Total_Flow:gvar.jb_ST_Francis_OffTake_Total_Flow,
                jb_Para_Bea_TF:gvar.jb_Para_Bea_TF,
                 jb_PB_SFO_last_seen:gvar.jb_PB_SFO_last_seen,
                id:"jeffreys_bay"}
                      var fptTrends={
                        jb_PB_SFO_ut:gvar.jb_PB_SFO_ut,
                        id:"fpt_currentvals"
                      }

                      fun.storeInDB(firstValue,"FPT_CurrentVals")
                      fun.storeInDB(fptTrends,"F_CurrentVals")
            }

      }).catch(function() {
        console.error(
          require("util").inspect(arguments, {
            depth: null
          })
        );
        error = 1

      });
      }
      else if(poll == 9){

        JB_ONS_PARADYS_FPT_CLIENT.readInputRegisters(regStart, regNum).then(function(resp){
          var val  = (resp.response._body.values);

          var test = [];
          var array = [];
          var finalString='';

          for (var i=0; i<8; i++) {
            test[i] = val[i + 12]
            array[i] = fun.cloudWorksLastPole(test[i])
           finalString= finalString + array[i]

            }
            gvar.ons_para_last_seen = fun.convertDateTime(finalString)

            gvar.ons_para_ut = Date().slice(4,Date().length-41);

            gvar.ons_para_battery_level = fun.controlLevel(val[1])

            var rawData = new ArrayBuffer(32);
            var i = new Uint16Array(rawData);
            var f = new Float32Array(rawData);


            i[0] = val[9]; //low
            i[1] = val[8]; //high

            gvar.ons_para_TF = parseFloat(f[0]).toFixed(0);

            if(gvar.ons_para_TF != undefined || gvar.ons_para_TF!=null){

              var firstValue ={
                ons_para_ut:gvar.ons_para_ut,
                ons_para_battery_level:gvar.ons_para_battery_level,
                ons_para_TF:gvar.ons_para_TF,
                ons_para_last_seen:gvar.ons_para_last_seen,
                id:"jeffreys_bay"
                }

                      var fptTrends={
                        ons_para_ut:gvar.ons_para_ut,
                        id:"fpt_currentvals"
                      }

                      fun.storeInDB(firstValue,"FPT_CurrentVals")
                      fun.storeInDB(fptTrends,"F_CurrentVals")

            }
      }).catch(function() {
        console.error(
          require("util").inspect(arguments, {
            depth: null
          })
        );
        error = 1

      });

      }
      else if(poll == 10){

        JB_KOUGA_MAIN_LINE_FPT_CLIENT.readInputRegisters(regStart, regNum).then(function(resp){
          var val  = (resp.response._body.values);

          var test = [];
          var array = [];
          var finalString='';

          for (var i=0; i<8; i++) {
            test[i] = val[i + 12]
            array[i] = fun.cloudWorksLastPole(test[i])
           finalString= finalString + array[i]

            }
            gvar.kou_main_line_ut = Date().slice(4,Date().length-41);
            gvar.kou_main_line_last_seen = fun.convertDateTime(finalString)
            gvar.kou_main_line_pressure = (val[0]/1000).toFixed(1)
            gvar.kou_main_line_battery_level = fun.controlLevel(val[1])

            if(gvar.kou_main_line_pressure != undefined || gvar.kou_main_line_pressure!=null){

              var firstValue ={
                kou_main_line_ut :gvar.kou_main_line_ut,
                kou_main_line_battery_level:gvar.kou_main_line_battery_level,
                kou_main_line_pressure:gvar.kou_main_line_pressure ,
                kou_main_line_last_seen:gvar.kou_main_line_last_seen,
                id:"jeffreys_bay"
                }

                      var fptTrends={
                        kou_main_line_ut:gvar.kou_main_line_ut,
                        id:"fpt_currentvals"
                      }

                      fun.storeInDB(firstValue,"FPT_CurrentVals")
                      fun.storeInDB(fptTrends,"F_CurrentVals")

            }
      }).catch(function() {
        console.error(
          require("util").inspect(arguments, {
            depth: null
          })
        );
        error = 1

      });

      }
      else if(poll == 11){

        HUMANS_OFF_TAKE_FPT_CLIENT.readInputRegisters(regStart, regNum).then(function(resp){
          var val  = (resp.response._body.values);

          var test = [];
          var array = [];
          var finalString='';

          for (var i=0; i<8; i++) {
            test[i] = val[i + 12]
            array[i] = fun.cloudWorksLastPole(test[i])
           finalString= finalString + array[i]
            }

           gvar.humansdorp_off_take_ut = Date().slice(4,Date().length-41);

           gvar.humansdorp_off_take_last_seen  = fun.convertDateTime(finalString)

           gvar.humansdorp_off_take_pressure = (val[0]/1000).toFixed(1)
           gvar.humansdorp_off_take_battery_level = fun.controlLevel(val[1])

           var rawData = new ArrayBuffer(32);
           var i = new Uint16Array(rawData);
           var f = new Float32Array(rawData);

           i[0] = val[9]; //low
           i[1] = val[8]; //high

           gvar.humansdorp_off_TF  = parseFloat(f[0]/10).toFixed(0);

              if(gvar.humansdorp_off_take_pressure != undefined || gvar.humansdorp_off_take_pressure!=null){

              var firstValue ={
                humansdorp_off_take_battery_level: gvar.humansdorp_off_take_battery_level,
                humansdorp_off_take_ut:gvar.humansdorp_off_take_ut,
                humansdorp_off_take_pressure:gvar.humansdorp_off_take_pressure,
                humansdorp_off_TF:gvar.humansdorp_off_TF,
                humansdorp_off_take_last_seen:gvar.humansdorp_off_take_last_seen,
                id:"jeffreys_bay"
                }

                      var fptTrends={
                        humansdorp_off_take_ut:gvar.humansdorp_off_take_ut,
                        id:"fpt_currentvals"
                      }

                      fun.storeInDB(firstValue,"FPT_CurrentVals")
                      fun.storeInDB(fptTrends,"F_CurrentVals")

            }
      }).catch(function() {
        console.error(
          require("util").inspect(arguments, {
            depth: null
          })
        );
        error = 1

      });

      }
      else if(poll == 12){
      COE_KOP_R_CLIENT.readInputRegisters(regStart, regNum).then(function(resp){
         var val  = (resp.response._body.values);

     var test = [];
     var array = [];
     var finalString='';

      for (var i=0; i<8; i++) {
        test[i] = val[i + 12]
        array[i] = fun.cloudWorksLastPole(test[i])
        finalString= finalString + array[i]
        }

      gvar.coe_kop_cloud_r_ut  = Date().slice(4,Date().length-41);
        var coe_kop_level =  (val[0] * (100/9500)).toFixed(1);
        gvar.coe_kop_cloud_r_level =  fun.controlLevel(coe_kop_level)
        gvar.coe_kop_r_battery_level = (val[1]);
        gvar.coe_kop_r_battery_poll_ut = fun.convertDateTime(finalString)

       var firstValue={
         coe_kop_cloud_r_ut:gvar.coe_kop_cloud_r_ut,
         coe_kop_cloud_r_level:gvar.coe_kop_cloud_r_level,
         coe_kop_r_battery_level:gvar.coe_kop_r_battery_level,
         coe_kop_r_battery_poll_ut:gvar.coe_kop_r_battery_poll_ut,
         id:"cgk"
       };

       var reservoirTrend={
         kroon_r_ut:gvar.coe_kop_cloud_r_ut,
         kroon_r_level:gvar.coe_kop_cloud_r_level,
         kroon_r_poll_ut:gvar.coe_kop_r_battery_poll_ut,
         id:"res_overview"
        }

     fun.storeInDB(firstValue,"R_CurrentVals")
     fun.storeInDB(reservoirTrend,"Res_CurrentVals")


    }).catch(function() {
        console.error(
          require("util").inspect(arguments, {
            depth: null
          })
        );
        error = 1

      });

      }
      else if(poll==13){
        Kareedouw_WTW_RES.readInputRegisters(regStart, regNum).then(function(resp){
           var val  = (resp.response._body.values);

       var test = [];
       var array = [];
       var finalString='';

       for (var i=0; i<8; i++) {
         test[i] = val[i + 12]
         array[i] = fun.cloudWorksLastPole(test[i])
         finalString= finalString + array[i]
         }

         gvar.kark_R_comms_UT  = Date().slice(4,Date().length-41);
         var coe_kop_level =  (val[0] * 0.02857142857).toFixed(1);
         gvar.kark_R_lvl =  fun.controlLevel(coe_kop_level)
         gvar.kark_R_battery_lvl = (val[1]);
         gvar.kark_R_battery_unit_UT = fun.convertDateTime(finalString)

       var firstValue={
         kark_R_comms_UT:gvar.kark_R_comms_UT,
         kark_R_lvl:gvar.kark_R_lvl,
         kark_R_battery_lvl:gvar.kark_R_battery_lvl,
         kark_R_battery_unit_UT:gvar.kark_R_battery_unit_UT,
         id:"nmbm_kark_gw"

       };

     var reservoirTrend={
       kark_R_comms_UT:gvar.kark_R_comms_UT,
       kark_R_battery_lvl:gvar.kark_R_battery_lvl,
       kark_R_battery_unit_UT:gvar.kark_R_battery_unit_UT,
       id:"res_overview"
     }
     fun.storeInDB(firstValue,"GRDW_CurrentVals")
     fun.storeInDB(reservoirTrend,"Res_CurrentVals")

       }).catch(function() {
         console.error(
           require("util").inspect(arguments, {
             depth: null
           })
         );
         error = 1
       });
        }
           if(error == 1){
            console.log("Error1")

            init=0
            error= 0;
            connected = 0;
              setTimeout( read_cloudworks, 10000)

           }else
           {
            poll++;
            if(poll >= pollEnd){
              poll = 0;
            }
            setTimeout(readval1, 10000);
          }
          }
      })

      socket.on("error", function(){

        console.log("Error2")

          init=0
          error= 0;
          connected = 0;

            setTimeout(read_cloudworks, 10000)
    });
  }
