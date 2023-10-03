module.exports = {readVal_MW_PS};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.6';
var regStart=0;
var regNum=104;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_MW_PS(){
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


/////////////////////////////////////////////Input code
 //pump1
gvar.mw_p1_runtime= val[21];
gvar.mw_p1_actual_speed = val[23];
gvar.mw_p1_number_of_starts = val[14];



var p = parseInt(val[12]);
var m = [];
for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1; // divide by two and keep as an integer
}
m.reverse();

if(m[8]==1){
  gvar.mw_p1_mode= "Local"
}
else if(m[8]==0)
{
  gvar.mw_p1_mode="Remote"
}


var q = parseInt(val[13]);
var b = [];
for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    b[i] =  ((q & 0x8000) ? 1 : 0);
    q = q << 1; // divide by two and keep as an integer
}
b.reverse();

if(b[0]==1){
  gvar.mw_p1_status="Running";
}
else if(m[12]==0 || m[4]==0 || b[2] == 1)
{
  gvar.mw_p1_status="Fault Active"
}
else if(b[3]==1)
{
  gvar.mw_p1_status="Available"
}
else
{
  gvar.mw_p1_status="Not Available"
}



gvar.mw_p1_emergency_stop = m[5]
gvar.mw_p1_alarm_trip= b[2];
gvar.mw_p1_no_flow=m[14]





gvar.mw_p2_runtime = val[61]
gvar.mw_p2_actual_speed = val[63]
gvar.mw_p2_number_of_starts= val[54]


var p2 = parseInt(val[52]);
var m2 = [];
for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    m2[i] =  ((p2 & 0x8000) ? 1 : 0);
    p2 = p2 << 1; // divide by two and keep as an integer
}

if(m2[8]==1){
  gvar.mw_p2_mode= "Local"
}
else if(m2[8]==0)
{
  gvar.mw_p2_mode="Remote"
}

var q2 = parseInt(val[53]);
var b2 = [];
for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    b2[i] =  ((q2 & 0x8000) ? 1 : 0);
    q2 = q2 << 1; // divide by two and keep as an integer
}
b2.reverse();

if(b2[0]==1){
  gvar.mw_p2_status="Running";
}
else if(m2[12]==0 || m2[4]==0 || b2[2] == 1)
{
  gvar.mw_p2_status="Fault Active"
}
else if(b2[3]==1)
{
  gvar.mw_p2_status="Available"
}
else
{
  gvar.mw_p2_status="Not Available"
}


gvar.mw_p2_emergency_stop = m2[5]
gvar.mw_p2_alarm_trip= b2[2];
gvar.mw_p2_no_flow=m2[14]


 //Pump 3


 gvar.mw_p3_runtime = val[101]
 gvar.mw_p3_actual_speed = val[103]
 gvar.mw_p3_number_of_starts= val[94]


 var p3 = parseInt(val[92]);
 var m3 = [];
 for (var i=0; i<16; i++) {
     // test top bit and set corresponding payload
     m3[i] =  ((p3 & 0x8000) ? 1 : 0);
     p3 = p3 << 1; // divide by two and keep as an integer
 }

 if(m3[8]==1){
   gvar.mw_p3_mode= "Local"
 }
 else
 {
   gvar.mw_p3_mode="Remote"
 }

 var q3 = parseInt(val[93]);
 var b3 = [];
 for (var i=0; i<16; i++) {
     // test top bit and set corresponding payload
     b3[i] =  ((q3 & 0x8000) ? 1 : 0);
     q3 = q3 << 1; // divide by two and keep as an integer
 }
 b3.reverse();

 if(b3[0]==1){
   gvar.mw_p3_status="Running";
 }
 else if(m3[12]==0 || m3[4]==0 || b3[2] == 1)
 {
   gvar.mw_p3_status="Fault Active"
 }
 else if(b3[3]==1)
 {
   gvar.mw_p3_status="Available"
 }
 else
 {
   gvar.mw_p3_status="Not Available"
 }


 gvar.mw_p3_emergency_stop = m3[5]
 gvar.mw_p3_alarm_trip= b3[2];
 gvar.mw_p3_no_flow=m3[14]

 if(gvar.mw_p1_runtime!=undefined || gvar.mw_p1_runtime!=null){



var firstValue ={
mw_p1_runtime:gvar.mw_p1_runtime,
mw_p1_actual_speed:gvar.mw_p1_actual_speed,
mw_p1_number_of_starts:gvar.mw_p1_number_of_starts,
mw_p1_mode:gvar.mw_p1_mode,
mw_p1_status:gvar.mw_p1_status,
mw_p1_emergency_stop:gvar.mw_p1_emergency_stop,
mw_p1_alarm_trip:gvar.mw_p1_alarm_trip,
mw_p1_no_flow:gvar.mw_p1_no_flow,
mw_p2_runtime:gvar.mw_p2_runtime,
mw_p2_actual_speed:gvar.mw_p2_actual_speed,
mw_p2_number_of_starts:gvar.mw_p2_number_of_starts,
mw_p2_mode:gvar.mw_p2_mode,
mw_p2_status:gvar.mw_p2_status,
mw_p2_emergency_stop:gvar.mw_p2_emergency_stop,
mw_p2_alarm_trip:gvar.mw_p2_alarm_trip,
mw_p2_no_flow:gvar.mw_p2_no_flow,
mw_p3_runtime:gvar.mw_p3_runtime,
mw_p3_actual_speed:gvar.mw_p3_actual_speed,
mw_p3_number_of_starts:gvar.mw_p3_number_of_starts,
mw_p3_mode:gvar.mw_p3_mode,
mw_p3_status:gvar.mw_p3_status,
mw_p3_emergency_stop:gvar.mw_p3_emergency_stop,
mw_p3_alarm_trip:gvar.mw_p3_alarm_trip,
mw_p3_no_flow:gvar.mw_p3_no_flow,
id:"nmbm_mw_ps"

}


fun.storeInDB(firstValue,"PS_CurrentVals")

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
//Make sure this matches the method Name
  setTimeout(readVal_MW_PS, mbtimeout);
  }
