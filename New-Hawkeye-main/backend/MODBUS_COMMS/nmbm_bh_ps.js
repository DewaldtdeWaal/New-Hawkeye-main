module.exports = {readVal_BH_PS};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;

var ip = gvar.mbusIP +'.20';
var regStart = 100;
var regNum = 4;
var timeout = 5000;
var mbtimeout=mbRetry
const fun = require('./modbusfunctions')
function readVal_BH_PS(){
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



        gvar.bhb_P1_RH = val[2];
        gvar.bhb_P2_RH = val[3];

        var p = parseInt(val[0]);
             var m = [];
             for (var i=0; i<16; i++) {
                 // test top bit and set corresponding payload
                 m[i] =  ((p & 0x8000) ? 1 : 0);
                 p = p << 1; // divide by two and keep as an integer
             }
             m.reverse();
             if (m[0] == 1)  {
              gvar.bhb_P1_MODE = "Auto"
             }else
             {
               gvar.bhb_P1_MODE = "OFF/Manual"
             }

             if(m[2]==1){
              gvar.bhb_P1_STATUS = "Running"
             }
             else if (m[1]==1) {
               gvar.bhb_P1_STATUS = "Available"
             }
             else if(m[3]==1){
              gvar.bhb_P1_STATUS = "Fault Active"
             }
             else if(m[1]==0 && m[2]==0 && m[3]==0){
              gvar.bhb_P1_STATUS = "Not Available"
             }

              gvar.bhb_P1_STARTUP_FAULT = m[4]
              gvar.bhb_P1_SOFT_S_FAULT = m[5]
              gvar.bhb_P1_NO_FLOW = m[6]


        /////////////////////////////////////////////////////////////////////
              if (m[8] == 1)  {
                gvar.bhb_P2_MODE = "Auto"
               }else
               {
                 gvar.bhb_P2_MODE = "OFF/Manual"
               }


               if(m[10]==1){
                gvar.bhb_P2_STATUS = "Running"
               }
               else if (m[9]==1) {
                 gvar.bhb_P2_STATUS = "Available"
               }
               else if(m[11]==1){
                gvar.bhb_P2_STATUS = "Fault Active"
               }
               else if(m[9]==0 && m[10]==0 && m[11]==0){
                gvar.bhb_P2_STATUS = "Not Available"
               }

                gvar.bhb_P2_STARTUP_FAULT = m[12]
                gvar.bhb_P2_SOFT_S_FAULT = m[13]
                gvar.bhb_P2_NO_FLOW = m[14]




             var p = parseInt(val[1]);
             var m = [];
             for (var i=0; i<16; i++) {
                 // test top bit and set corresponding payload
                 m[i] =  ((p & 0x8000) ? 1 : 0);
                 p = p << 1; // divide by two and keep as an integer
             }
             m.reverse();
             gvar.bhb_G_TELE_CONTROL=m[0];
             gvar.bhb_G_LOW_LVL_FLOAT=m[1];

             gvar.bh_R_START_FLOAT = m[2];
             gvar.bh_R_STOP_FLOAT = m[3];
             gvar.bhb_PS_UT = Date().slice(4,Date().length-41);



             if(gvar.bhb_P1_STATUS!=undefined || gvar.bhb_P1_STATUS!=null){
             var MongoClient = require('mongodb').MongoClient;
             var url= gvar.standardConnectionString;

     var firstValue ={
     bhb_P1_RH:gvar.bhb_P1_RH,
     bhb_P2_RH:gvar.bhb_P2_RH,
     bhb_P1_MODE:gvar.bhb_P1_MODE,
     bhb_P1_STATUS:gvar.bhb_P1_STATUS,
     bhb_P1_STARTUP_FAULT:gvar.bhb_P1_STARTUP_FAULT,
     bhb_P1_SOFT_S_FAULT:gvar.bhb_P1_SOFT_S_FAULT,
     bhb_P1_NO_FLOW:gvar.bhb_P1_NO_FLOW,
     bhb_P2_MODE:gvar.bhb_P2_MODE,
     bhb_P2_STATUS:gvar.bhb_P2_STATUS,
     bhb_P2_STARTUP_FAULT:gvar.bhb_P2_STARTUP_FAULT,
     bhb_P2_SOFT_S_FAULT:gvar.bhb_P2_SOFT_S_FAULT,
     bhb_P2_NO_FLOW:gvar.bhb_P2_NO_FLOW,
     bhb_G_TELE_CONTROL:gvar.bhb_G_TELE_CONTROL,
     bhb_G_LOW_LVL_FLOAT:gvar.bhb_G_LOW_LVL_FLOAT,
     bh_R_START_FLOAT:gvar.bh_R_START_FLOAT,
     bh_R_STOP_FLOAT:gvar.bh_R_STOP_FLOAT,
     bhb_PS_UT:gvar.bhb_PS_UT,
     id:"nmbm_bh_ps"
     }

     var secondValue={
      bh_R_START_FLOAT:gvar.bh_R_START_FLOAT,
      bh_R_STOP_FLOAT:gvar.bh_R_STOP_FLOAT,
     }
     var psTrend ={
      bhb_PS_UT:gvar.bhb_PS_UT,
      id:"PS_OVERVIEW"
    }

    fun.storeInDB(firstValue,"PS_CurrentVals")
    fun.storeInDB(secondValue,"R_CurrentVals")
    fun.storeInDB(psTrend,"PUMP_CurrentVals")



          }







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
  setTimeout(readVal_BH_PS, mbtimeout);
  }


