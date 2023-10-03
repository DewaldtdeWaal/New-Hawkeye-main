module.exports = {readVal_VS_PS};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.7';
var regStart = 100;
var regNum = 8;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_VS_PS(){
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





        gvar.vs_P1_RH = val[6];
        gvar.vs_P1_DEL_PRESS = (val[2]/1000).toFixed(2);
        gvar.vs_P1_SUC_PRESS = (val[4]/1000).toFixed(2);
        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();
       if (m[0]==1) {
         gvar.vs_P1_MODE = 'Auto'
       }
       else if (m[1]==1) {
         gvar.vs_P1_MODE = 'manual'
       }
       else if (m[0]==0 && m[1]==0){
         gvar.vs_P1_MODE = 'OFF'
       }
       if (m[3]==1) {
         gvar.vs_P1_STATUS = 'Running'
       }
       else if (m[2]==1) {
         gvar.vs_P1_STATUS = 'Available'
       }
       else if (m[9]==1){
         gvar.vs_P1_STATUS = 'Fault Active'
       }
        else if (m[3] == 0 && m[2] == 0 && m[9] == 0){
          gvar.vs_P1_STATUS= 'Unavailable'
        }
        gvar.vs_P1_LSP = m[4]
        gvar.vs_P1_LDP = m[5]
        gvar.vs_P1_HDP = m[6]
        gvar.vs_P1_STARTUP_FAULT = m[7]
        gvar.vs_P1_STARTER_FAULT = m[8]

        gvar.vs_G_WATER_D=m[15]
        gvar.vs_G_PUMPS_F=m[14]
        gvar.vs_G_COMMS=m[13]
   /////////////////////////////////////////////////////////////////////PUMP 2
        gvar.vs_P2_RH = val[7];
        gvar.vs_P2_DEL_PRESS = (val[3]/1000).toFixed(2);
        gvar.vs_P2_SUC_PRESS = (val[5]/1000).toFixed(2);
        var p = parseInt(val[1]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();
       if (m[0]==1) {
         gvar.vs_P2_MODE = 'Auto'
       }
       else if (m[1]==1) {
         gvar.vs_P2_MODE = 'manual'
       }
       else if (m[0]==0 && m[1]==0){
         gvar.vs_P2_MODE = 'OFF'
       }
       if (m[3]==1) {
         gvar.vs_P2_STATUS = 'Running'
       }
       else if (m[2]==1) {
         gvar.vs_P2_STATUS = 'Available'
       }
       else if (m[9]==1){
         gvar.vs_P2_STATUS = 'Fault Active'
       }
        else if (m[3] == 0 && m[2] == 0 && m[9] == 0){
          gvar.vs_P2_STATUS= 'Unavailable'
        }
        gvar.vs_P2_LSP = m[4]
        gvar.vs_P2_LDP = m[5]
        gvar.vs_P2_HDP = m[6]
        gvar.vs_P2_STARTUP_FAULT = m[7]
        gvar.vs_P2_STARTER_FAULT = m[8]


        gvar.vs_PS_UT = Date().slice(4,Date().length-41);

        if(gvar.vs_P1_RH!=undefined || gvar.vs_P1_RH!=null){
        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
vs_P1_RH:gvar.vs_P1_RH,
vs_P1_DEL_PRESS:gvar.vs_P1_DEL_PRESS,
vs_P1_SUC_PRESS:gvar.vs_P1_SUC_PRESS,
vs_P1_MODE:gvar.vs_P1_MODE,
vs_P1_STATUS:gvar.vs_P1_STATUS,
vs_P1_LSP:gvar.vs_P1_LSP,
vs_P1_LDP:gvar.vs_P1_LDP,
vs_P1_HDP:gvar.vs_P1_HDP,
vs_P1_STARTUP_FAULT:gvar.vs_P1_STARTUP_FAULT,
vs_P1_STARTER_FAULT:gvar.vs_P1_STARTER_FAULT,
vs_G_WATER_D:gvar.vs_G_WATER_D,
vs_G_PUMPS_F:gvar.vs_G_PUMPS_F,
vs_G_COMMS:gvar.vs_G_COMMS,
vs_P2_RH:gvar.vs_P2_RH,
vs_P2_DEL_PRESS:gvar.vs_P2_DEL_PRESS,
vs_P2_SUC_PRESS:gvar.vs_P2_SUC_PRESS,
vs_P2_MODE:gvar.vs_P2_MODE,
vs_P2_STATUS:gvar.vs_P2_STATUS,
vs_P2_LSP:gvar.vs_P2_LSP,
vs_P2_LDP:gvar.vs_P2_LDP,
vs_P2_HDP:gvar.vs_P2_HDP,
vs_P2_STARTUP_FAULT:gvar.vs_P2_STARTUP_FAULT,
vs_P2_STARTER_FAULT:gvar.vs_P2_STARTER_FAULT,
vs_PS_UT:gvar.vs_PS_UT,





id:"nmbm_vs_ps"

}


fun.storeInDB(firstValue,"PS_CurrentVals")


      }

      var psTrend ={
        vs_PS_UT:gvar.vs_PS_UT,
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
  setTimeout(readVal_VS_PS, mbtimeout);
  }
