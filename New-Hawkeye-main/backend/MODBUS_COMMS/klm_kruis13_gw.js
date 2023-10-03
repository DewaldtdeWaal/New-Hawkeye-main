//Serves as a basic template for all future sites.

module.exports = {readval_kuis13_gw};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('../MODBUS_COMMS/modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.12';
//Memoryword(MW) you start at
var regStart = 1000;
//Amount of Memorywords you have
var regNum = 30 ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readval_kuis13_gw(){
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
gvar.gw_klm_kruis13_UT = Date().slice(4,Date().length-41);

var rawData = new ArrayBuffer(64);
var i = new Uint16Array(rawData);
var f = new Float32Array(rawData);

i[0] = val[0]
i[1] = val[1]
i[2] = val[2]
i[3] = val[3]

i[4] = val[4]
i[5] = val[5]
i[6] = val[6]
i[7] = val[7]

i[8] =val[8]
i[9] =val[9]
i[10] =val[10]
i[11] =val[11]

i[12] =val[12]
i[13] =val[13]
i[14] =val[14]
i[15] =val[15]

i[16] =val[16]
i[17] =val[17]
i[18] =val[18]
i[19] =val[19]

i[20] =val[20]
i[21] =val[21]
i[22] =val[22]
i[23] =val[23]
i[24] =val[24]
i[25] =val[25]




gvar.gw_klm_kruis13_run_hours= parseFloat(f[0]).toFixed(0);
gvar.gw_klm_kruis13_number_of_starts = parseFloat(f[1]).toFixed(0);
gvar.gw_klm_kruis13_flow_rate = parseFloat(f[2]).toFixed(1);
gvar.gw_klm_kruis13_TF = parseFloat(f[3]).toFixed(0);
gvar.gw_klm_kruis13_lvl = parseFloat(f[4]).toFixed(1);
gvar.gw_klm_kruis13_bar = parseFloat(f[5]).toFixed(1);
gvar.gw_klm_kruis13_vsd = parseFloat(f[6]).toFixed(1);
gvar.gw_klm_kruis13_target_flow = parseFloat(f[7]).toFixed(1);
gvar.gw_klm_kruis13_target_freq = parseFloat(f[8]).toFixed(0);
gvar.gw_klm_kruis13_voltage = parseFloat(f[9]).toFixed(1);
gvar.gw_klm_kruis13_current = parseFloat(f[10]).toFixed(1);
gvar.gw_klm_kruis13_power = parseFloat(f[11]).toFixed(1);
gvar.gw_klm_kruis13_total_power = parseFloat(f[12]).toFixed(1);

if(  gvar.gw_klm_kruis13_power  == -0.0){
  gvar.gw_klm_kruis13_power  = "0.0"
}
if(  gvar.gw_klm_kruis13_power  < 0.0){
  gvar.gw_klm_kruis13_power  = "0.0"
}


//make this a method
var p = parseInt(val[27]);
var m = [];
for (var i=0; i<16; i++) {
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1;
}
m.reverse();


if(m[1] == 1){
  gvar.gw_klm_kruis13_status = "Running"
}
else if(m[2] == 1){
  gvar.gw_klm_kruis13_status = "Available"
}
else if(m[5] == 1){
  gvar.gw_klm_kruis13_status = "Interlocked"
}
else{
  gvar.gw_klm_kruis13_status = undefined
}


var p = parseInt(val[29]);
var m = [];
for (var i=0; i<16; i++) {
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1;
}
m.reverse();

gvar.gw_klm_kruis13_bar_fault = m[0]
gvar.gw_klm_kruis13_lvl_fault = m[1]
gvar.gw_klm_kruis13_flow_fault = m[3]
gvar.gw_klm_kruis13_voltage_not_okay = m[4]
gvar.gw_klm_kruis13_emergency_stop = m[5]
gvar.gw_klm_kruis13_vsd_fault = m[6]
gvar.gw_klm_kruis13_res_communication_fault = m[8]
gvar.gw_klm_kruis13_res_ful = m[11]


if(val[26] == 0 ){
  gvar.gw_klm_kruis13_mode = "Panel Off"
}
else if(val[26] == 1){
  gvar.gw_klm_kruis13_mode = "Panel Manual"
}
else if(val[26] == 3){
  gvar.gw_klm_kruis13_mode = "HMI Auto"
}
else if(val[26] == 5){
  gvar.gw_klm_kruis13_mode =  "SCADA Manual"
}
else if(val[26] == 6){
  gvar.gw_klm_kruis13_mode = "SCADA Auto"
}
else{
  gvar.gw_klm_kruis13_mode = undefined
}

var p = parseInt(val[28]);
var m = [];
for (var i=0; i<16; i++) {
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1;
}
m.reverse();

if(m[0] == 1){
  gvar.gw_klm_kruis13_control_mode = "Flow Control"
}
else if(m[1] == 1){
  gvar.gw_klm_kruis13_control_mode = "Frequency Control"
}
else{
  gvar.gw_klm_kruis13_control_mode = undefined
}

var firstValue={
gw_klm_kruis13_run_hours:gvar.gw_klm_kruis13_run_hours,
gw_klm_kruis13_number_of_starts:gvar.gw_klm_kruis13_number_of_starts,
gw_klm_kruis13_flow_rate:gvar.gw_klm_kruis13_flow_rate,
gw_klm_kruis13_TF:gvar.gw_klm_kruis13_TF,
gw_klm_kruis13_lvl:gvar.gw_klm_kruis13_lvl,
gw_klm_kruis13_bar:gvar.gw_klm_kruis13_bar,
gw_klm_kruis13_control_mode:gvar.gw_klm_kruis13_control_mode,
gw_klm_kruis13_vsd:gvar.gw_klm_kruis13_vsd,
gw_klm_kruis13_target_flow:gvar.gw_klm_kruis13_target_flow,
gw_klm_kruis13_target_freq:gvar.gw_klm_kruis13_target_freq,
gw_klm_kruis13_voltage:gvar.gw_klm_kruis13_voltage,
gw_klm_kruis13_current:gvar.gw_klm_kruis13_current,
gw_klm_kruis13_power:gvar.gw_klm_kruis13_power,
gw_klm_kruis13_total_power:gvar.gw_klm_kruis13_total_power,
gw_klm_kruis13_UT:gvar.gw_klm_kruis13_UT,
gw_klm_kruis13_status:gvar.gw_klm_kruis13_status,
gw_klm_kruis13_mode:gvar.gw_klm_kruis13_mode,
gw_klm_kruis13_bar_fault:gvar.gw_klm_kruis13_bar_fault,
gw_klm_kruis13_lvl_fault:gvar.gw_klm_kruis13_lvl_fault,
gw_klm_kruis13_flow_fault:gvar.gw_klm_kruis13_flow_fault,
gw_klm_kruis13_voltage_not_okay:gvar.gw_klm_kruis13_voltage_not_okay,
gw_klm_kruis13_emergency_stop:gvar.gw_klm_kruis13_emergency_stop,
gw_klm_kruis13_vsd_fault:gvar.gw_klm_kruis13_vsd_fault,
gw_klm_kruis13_res_communication_fault:gvar.gw_klm_kruis13_res_communication_fault,
gw_klm_kruis13_res_ful:gvar.gw_klm_kruis13_res_ful,
  id:"Kuis"

}

fun.storeInDB(firstValue,"GRDW_CurrentVals")

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
  setTimeout(readval_kuis13_gw, mbtimeout);
  }


function breakVal(val){
  var p = parseInt(val);
  var m = [];
  for (var i=0; i<8; i++) {
      m[i] =  ((p & 0x8000) ? 1 : 0);
      p = p << 1;
  }
  m.reverse();


  return m;
}


