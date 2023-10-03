module.exports = {readVal_LH_PS_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')


var ip = gvar.mbusIP +'.22';
var regStart = 100;
var regNum = 5;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_LH_PS_R(){
  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, timeout)
  const options = {
  'host' : ip,
  'port' : 502
  };
  socket.connect(options);
  socket.on("connect", function() {
    client
      .readHoldingRegisters(regStart,regNum)
      .then(function(resp) {
        var val = (resp.response._body.values);
        socket.end();
        mbtimeout = mbCycleTime;

        gvar.lh_R_OVER_LVL = fun.checkLevel((val[2]/10).toFixed(1));

        console.log("gvar.lh_R_OVER_LVL")

    //    gvar.lh_R_OVER_LVL =
        gvar.lh_UT = Date().slice(4,Date().length-41);

              var p = parseInt(val[0]);
             var m = [];
             for (var i=0; i<16; i++) {
                 // test top bit and set corresponding payload
                 m[i] =  ((p & 0x8000) ? 1 : 0);
                 p = p << 1; // divide by two and keep as an integer
             }
             m.reverse();
    ///////////////////////////////////////////////////////pump1
             if (m[0] == 1)  {
              gvar.lh_P1_MODE= "Auto"
             }else if(m[1] == 1){
              gvar.lh_P1_MODE = "Manual"
             }else if(m[0] == 0 && m[1] ==0){
              gvar.lh_P1_MODE = "Off"
             }

             if(m[3]==1){
               gvar.lh_P1_STATUS = "Running"
              }
             else if (m[2]==1) {
              gvar.lh_P1_STATUS  = "Available"
             }
             else if(m[4]==1){
              gvar.lh_P1_STATUS = "Fault Active"
             }
             else if(m[2]==0 && m[3]==0 && m[4]==0){
              gvar.lh_P1_STATUS = "Not Available"
             }

           gvar.lh_P1_SOFT_S_FAULT= m[7]
           gvar.lh_P1_NO_FLOW_FAULT=m[6]
           gvar.lh_P1_ESTOP_FAULT = m[5]
           gvar.lh_P1_RH= val[3]

    ///////////////////////////////////////////////////////pump2
           if (m[8] == 1)  {
            gvar.lh_P2_MODE= "Auto"
           }else if(m[9] == 1){
            gvar.lh_P2_MODE = "Manual"
           }else if(m[8] == 0 && m[9] ==0){
            gvar.lh_P2_MODE = "Off"
           }

            if(m[11]==1){
             gvar.lh_P2_STATUS = "Running"
            }
           else if (m[10]==1) {
            gvar.lh_P2_STATUS  = "Available"
           }
           else if(m[12]==1){
            gvar.lh_P2_STATUS = "Fault Active"
           }
           else if(m[10]==0 && m[11]==0 && m[12]==0){
            gvar.lh_P2_STATUS = "Not Available"
           }

         gvar.lh_P2_SOFT_S_FAULT= m[15]
         gvar.lh_P2_NO_FLOW_FAULT=m[14]
         gvar.lh_P2_ESTOP_FAULT = m[13]

          gvar.lh_P2_RH= val[4]



          if(gvar.lh_R_OVER_LVL!=undefined || gvar.lh_R_OVER_LVL!=null){

          var MongoClient = require('mongodb').MongoClient;
          var url= gvar.standardConnectionString;


  var firstValue ={
  lh_R_OVER_LVL:gvar.lh_R_OVER_LVL,
  lh_UT:gvar.lh_UT,
  lh_P1_MODE:gvar.lh_P1_MODE,
  lh_P1_STATUS:gvar.lh_P1_STATUS,
  lh_P1_SOFT_S_FAULT:gvar.lh_P1_SOFT_S_FAULT,
  lh_P1_NO_FLOW_FAULT:gvar.lh_P1_NO_FLOW_FAULT,
  lh_P1_ESTOP_FAULT:gvar.lh_P1_ESTOP_FAULT,
  lh_P1_RH:gvar.lh_P1_RH,
  lh_P2_MODE:gvar.lh_P2_MODE,
  lh_P2_STATUS:gvar.lh_P2_STATUS,
  lh_P2_SOFT_S_FAULT:gvar.lh_P2_SOFT_S_FAULT,
  lh_P2_NO_FLOW_FAULT:gvar.lh_P2_NO_FLOW_FAULT,
  lh_P2_ESTOP_FAULT:gvar.lh_P2_ESTOP_FAULT,
  lh_P2_RH:gvar.lh_P2_RH,
  id:"nmbm_lh_ps_r"

  }

  fun.storeInDB(firstValue,"R_CurrentVals")

          var reservoirTrend={
            lh_UT:gvar.lh_UT,
            lh_R_OVER_LVL:gvar.lh_R_OVER_LVL,
            id:"res_overview"

          }

          fun.storeInDB(reservoirTrend,"Res_CurrentVals")

                }
                var psTrend ={
                  lh_UT:gvar.lh_UT,
                  id:"PS_OVERVIEW"
                }

                fun.storeInDB(psTrend,"PUMP_CurrentVals")

         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });
  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});
  setTimeout(readVal_LH_PS_R, mbtimeout);
  }

