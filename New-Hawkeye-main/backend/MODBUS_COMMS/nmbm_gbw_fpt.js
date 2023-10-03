//Serves as a basic template for all future sites.

module.exports = {readVal_GBW_FPT};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.29';
//Memoryword(MW) you start at
var regStart= 100;
//Amount of Memorywords you have
var regNum = 30 ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_GBW_FPT(){
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
          gvar.gbw_ut =Date().slice(4,Date().length-41);

          var rawData = new ArrayBuffer(8);
          var i = new Uint16Array(rawData);
          var ii  = new Float32Array(rawData);

          i[0] = val[0]
          i[1] = val[1]
          i[2] = val[2]
          i[3] = val[3]

          gvar.gbw_line_bar_in = parseFloat(ii[0])
          gvar.gbw_line_bar_out = parseFloat(ii[1]).toFixed(2)




          var p = parseInt(val[4]);
          var m = [];
          for (var i=0; i<16; i++) {
              // test top bit and set corresponding payload
              m[i] =  ((p & 0x8000) ? 1 : 0);
              p = p << 1; // divide by two and keep as an integer
          }
          m.reverse();

          if(m[0] == 0){
            gvar.gbw_mode = "Auto"
          }
          else if(m[0] == 1){
            gvar.gbw_mode = "Manual"
          }
          else {
            gvar.gbw_mode = "Off"
          }

          if(m[1] == 0){
            gvar.gbw_local_remote = "Remote"
          }
          else if (m[1] == 1){
            gvar.gbw_local_remote = "Local"
          }
          else{
            gvar.gbw_local_remote = "Off"
          }


          if(m[12] == 1 || m[11] == 1 || m[10]== 1|| m[9] == 1 || m[8] == 1 || m[7] == 1 || m[6] == 1)
          [
            gvar.gbw_status = "Fault Active"
          ]
          else if(m[2] == 1){
            gvar.gbw_status = "Open"
          }
          else if(m[3]==1){
            gvar.gbw_status = "Opening"
          }
          else if(m[4] == 1){
            gvar.gbw_status = "Closed"
          }
          else if(m[5] == 1){
            gvar.gbw_status = "Closing"
          }
          else{
            gvar.gbw_status = "Fault Active"
          }

          gvar.gbw_fault_door_opened = m[6]
          gvar.gbw_fault_high_pressure_fault = m[7]
          gvar.gbw_fault_MAC_limit_read = m[8]
          gvar.gbw_surge_arrest_fault = m[9]
          gvar.gbw_valve_fault = m[10]
          gvar.gbw_volt_fault = m[11]
          gvar.gbw_gen_fault = m[12]


          gvar.gbw_tank_level = val[6]

          var rawData = new ArrayBuffer(16);
          var f = new Uint16Array(rawData);
          var ff  = new Float32Array(rawData);



          f[0] = val[14]
          f[1] = val[15]

          f[2] = val[16]
          f[3] = val[17]

          f[4] = val[18]
          f[5] = val[19]

          f[6] = val[20]
          f[7] = val[21]

          gvar.gbw_actual_pressure = parseFloat(ff[0]).toFixed(2)
          gvar.gbw_flow_rate = parseFloat(ff[1]).toFixed(2)
          gvar.gbw_tf_for_to_sum = parseFloat(ff[2]).toFixed(2)
          gvar.gbw_tf_res_to_con = parseFloat(ff[3]).toFixed(2)


          if(gvar.gbw_line_bar_in!=undefined || gvar.gbw_line_bar_in!=null){
            var MongoClient = require('mongodb').MongoClient;
            var url= gvar.standardConnectionString;


    var firstValue ={
      gbw_ut:gvar.gbw_ut,
      gbw_line_bar_in:gvar.gbw_line_bar_in,
      gbw_line_bar_out:gvar.gbw_line_bar_out,
      gbw_mode:gvar.gbw_mode,
      gbw_local_remote:gvar.gbw_local_remote,
      gbw_status:gvar.gbw_status,
      gbw_fault_door_opened:gvar.gbw_fault_door_opened,
      gbw_fault_high_pressure_fault:gvar.gbw_fault_high_pressure_fault,
      gbw_fault_MAC_limit_read:gvar.gbw_fault_MAC_limit_read,
      gbw_surge_arrest_fault:gvar.gbw_surge_arrest_fault,
      gbw_valve_fault:gvar.gbw_valve_fault,
      gbw_volt_fault:gvar.gbw_volt_fault,
      gbw_gen_fault:gvar.gbw_gen_fault,
      gbw_tank_level:gvar.gbw_tank_level,
      gbw_actual_pressure:gvar.gbw_actual_pressure,
      gbw_flow_rate:gvar.gbw_flow_rate,
      gbw_tf_for_to_sum:gvar.gbw_tf_for_to_sum,
      gbw_tf_res_to_con:gvar.gbw_tf_res_to_con,
    id:"nmbm_gbw_fpt"
    }


    fun.storeInDB(firstValue,"FPT_CurrentVals")
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
  setTimeout(readVal_GBW_FPT, mbtimeout);
  }





