module.exports = {readVal_BF_PS_R}; // called in server.js
const Modbus = require('jsmodbus'); //imports modbus library
const net = require('net');
const gvar = require('../variables') // imorts global variables
var mbCycleTime = 60000; // cycles every 60 sec
var mbRetry = 10000; // 10sec retry time

var ip = gvar.mbusIP +'.24';  // ip address of device
var regStart = 400;  // start at specified memory word
var regNum = 17; // number of words
var timeout = 5000; // 5 sec timeout
var mbtimeout=mbRetry
const fun = require('./modbusfunctions')
function readVal_BF_PS_R(){
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

        gvar.bf_PS_UT = Date().slice(4,Date().length-41);

       var rawData = new ArrayBuffer(36);
  var i = new Uint16Array(rawData);
  var ii  = new Uint32Array(rawData);
  var f = new Float32Array(rawData);

  i[0] = val[6]; //low
  i[1] = val[5]; //high

  i[2] = val[8]; //low
  i[3] = val[7]; //high

  i[4] = val[10]; //low
  i[5] = val[9]; //high

  i[6] = val[12]; //low
  i[7] = val[11]; //high

  i[8] = val[14]; //low
  i[9] = val[13]; //high

  i[10] = val[16]; //low
  i[11] = val[15]; //high


  gvar.bf_G_SP = parseFloat(f[4]).toFixed(1)

  gvar.bf_G_FR = parseFloat(f[5]).toFixed(1)

  gvar.bf_P1_RH=parseInt(ii[0])
  gvar.bf_P2_RH=parseInt(ii[1])
  gvar.bf_P3_RH=parseInt(ii[2])
  gvar.bf_P4_RH=parseInt(ii[3])

  var pg = parseInt(val[4]);
  var mg = [];
  for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    mg[i] =  ((pg & 0x8000) ? 1 : 0);
    pg = pg << 1; // divide by two and keep as an integer
  }
  mg.reverse();
  gvar.bf_G_MCC_ESTOP= mg[0]
  /////////////////////////////////////////////////////////////Pump 1
  var p = parseInt(val[0]);
  var m = [];
  for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1; // divide by two and keep as an integer
  }
  m.reverse();
  if(m[1]==1){
    gvar.bf_P1_STATUS = "Running"
   }
   else if (m[0]==0||m[2]==1||m[5]==1 ||mg[0]==1) {
     gvar.bf_P1_STATUS = "Fault Active"
   }
   else if ((m[3]==1||m[4]==1) && (m[0]==0||m[2]==1||m[5]==1||mg[0]==1)) {
    gvar.bf_P1_STATUS = "Available"
  }
   else if(m[0]==1 && m[2]==0 && m[5]==0 ||m[1==0]){
    gvar.bf_P1_STATUS = "Not Available"
   }


   if(m[3]==1){
    gvar.bf_P1_MODE = "Local"
   }
   else if(m[4]==1){
    gvar.bf_P1_MODE = "Remote"
   }
   gvar.bf_P1_PUMP_TRIP_FAULT = m[2]
   gvar.bf_P1_ESTOP_FAULT = m[0]
   gvar.bf_P1_NO_FLOW_FAULT=m[5]



   /////////////////////////////////////////////////////////////Pump 2
  var p = parseInt(val[1]);
  var m = [];
  for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1; // divide by two and keep as an integer
  }
  m.reverse();
  if(m[1]==1){
    gvar.bf_P2_STATUS = "Running"
   }
   else if (m[0]==0||m[2]==1||m[5]==1 ||mg[0]==1) {
     gvar.bf_P2_STATUS = "Fault Active"
   }
   else if ((m[3]==1||m[4]==1) && (m[0]==0||m[2]==1||m[5]==1||mg[0]==1)) {
    gvar.bf_P2_STATUS = "Available"
  }
   else if(m[0]==1 && m[2]==0 && m[5]==0 ||m[1==0]){
    gvar.bf_P2_STATUS = "Not Available"
   }

   if(m[3]==1){
    gvar.bf_P2_MODE = "Local"
   }
   else if(m[4]==1){
    gvar.bf_P2_MODE = "Remote"
   }
   gvar.bf_P2_PUMP_TRIP_FAULT = m[2]
   gvar.bf_P2_ESTOP_FAULT = m[0]
   gvar.bf_P2_NO_FLOW_FAULT=m[5]


   /////////////////////////////////////////////////////////////Pump 3
  var p = parseInt(val[2]);
  var m = [];
  for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1; // divide by two and keep as an integer
  }
  m.reverse();
  if(m[1]==1){
    gvar.bf_P3_STATUS = "Running"
   }
   else if (m[0]==0||m[2]==1||m[5]==1 ||mg[0]==1) {
     gvar.bf_P3_STATUS = "Fault Active"
   }
   else if ((m[3]==1||m[4]==1) && (m[0]==0||m[2]==1||m[5]==1||mg[0]==1)) {
    gvar.bf_P3_STATUS = "Available"
  }
   else if(m[0]==1 && m[2]==0 && m[5]==0 ||m[1==0]){
    gvar.bf_P3_STATUS = "Not Available"
   }

   if(m[3]==1){
    gvar.bf_P3_MODE = "Local"
   }
   else if(m[4]==1){
    gvar.bf_P3_MODE = "Remote"
   }
   gvar.bf_P3_PUMP_TRIP_FAULT = m[2]
   gvar.bf_P3_ESTOP_FAULT = m[0]
   gvar.bf_P3_NO_FLOW_FAULT=m[5]


   /////////////////////////////////////////////////////////////Pump 4
  var p = parseInt(val[3]);
  var m = [];
  for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1; // divide by two and keep as an integer
  }
  m.reverse();
  if(m[1]==1){
    gvar.bf_P4_STATUS = "Running"
   }
   else if (m[0]==0||m[2]==1||m[5]==1 ||mg[0]==1) {
     gvar.bf_P4_STATUS = "Fault Active"
   }
   else if ((m[3]==1||m[4]==1) && (m[0]==0||m[2]==1||m[5]==1||mg[0]==1)) {
    gvar.bf_P4_STATUS = "Available"
  }
   else if(m[0]==1 && m[2]==0 && m[5]==0 ||m[1==0]){
    gvar.bf_P4_STATUS = "Not Available"
   }

   if(m[3]==1){
    gvar.bf_P4_MODE = "Local"
   }
   else if(m[4]==1){
    gvar.bf_P4_MODE = "Remote"
   }

   gvar.bf_P4_PUMP_TRIP_FAULT = m[2]
   gvar.bf_P4_ESTOP_FAULT = m[0]
   gvar.bf_P4_NO_FLOW_FAULT=m[5]


   if(gvar.bf_PS_UT!=undefined || gvar.bf_PS_UT!=null){

   var MongoClient = require('mongodb').MongoClient;
   var url= gvar.standardConnectionString;


var firstValue ={
bf_PS_UT:gvar.bf_PS_UT,
bf_G_SP:gvar.bf_G_SP,
bf_G_FR:gvar.bf_G_FR,
bf_P1_RH:gvar.bf_P1_RH,
bf_P2_RH:gvar.bf_P2_RH,
bf_P3_RH:gvar.bf_P3_RH,
bf_P4_RH:gvar.bf_P4_RH,
bf_G_MCC_ESTOP:gvar.bf_G_MCC_ESTOP,
bf_P1_STATUS:gvar.bf_P1_STATUS,
bf_P1_MODE:gvar.bf_P1_MODE,
bf_P1_PUMP_TRIP_FAULT:gvar.bf_P1_PUMP_TRIP_FAULT,
bf_P1_ESTOP_FAULT:gvar.bf_P1_ESTOP_FAULT,
bf_P1_NO_FLOW_FAULT:gvar.bf_P1_NO_FLOW_FAULT,
bf_P2_STATUS:gvar.bf_P2_STATUS,
bf_P2_MODE:gvar.bf_P2_MODE,
bf_P2_PUMP_TRIP_FAULT:gvar.bf_P2_PUMP_TRIP_FAULT,
bf_P2_ESTOP_FAULT:gvar.bf_P2_ESTOP_FAULT,
bf_P2_NO_FLOW_FAULT:gvar.bf_P2_NO_FLOW_FAULT,
bf_P3_STATUS:gvar.bf_P3_STATUS,
bf_P3_MODE:gvar.bf_P3_MODE,
bf_P3_PUMP_TRIP_FAULT:gvar.bf_P3_PUMP_TRIP_FAULT,
bf_P3_ESTOP_FAULT:gvar.bf_P3_ESTOP_FAULT,
bf_P3_NO_FLOW_FAULT:gvar.bf_P3_NO_FLOW_FAULT,
bf_P4_STATUS:gvar.bf_P4_STATUS,
bf_P4_MODE:gvar.bf_P4_MODE,
bf_P4_PUMP_TRIP_FAULT:gvar.bf_P4_PUMP_TRIP_FAULT,
bf_P4_ESTOP_FAULT:gvar.bf_P4_ESTOP_FAULT,
bf_P4_NO_FLOW_FAULT:gvar.bf_P4_NO_FLOW_FAULT,
id:"nmbm_bf_ps"

}


fun.storeInDB(firstValue,"PS_CurrentVals")





var psTrend ={
  bf_PS_UT:gvar.bf_PS_UT,
  id:"PS_OVERVIEW"
}



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
  setTimeout(readVal_BF_PS_R, mbtimeout);
  }


