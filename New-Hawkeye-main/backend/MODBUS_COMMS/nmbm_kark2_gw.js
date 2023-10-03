//Serves as a basic template for all future sites.

module.exports = {readVal_KARK_K2_GW};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.32';
//Memoryword(MW) you start at
var regStart=50;
//Amount of Memorywords you have
var regNum= 20 ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_KARK_K2_GW(){
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

        console.log("kark2")
        console.log(val)
        console.log("kark2")

/////////////////////////////////////////////Input code
          gvar.gw_kark_k2_UT = Date().slice(4,Date().length-41);

          var p = parseInt(val[0]);
          var m = [];
          for (var i=0; i<16; i++) {
              m[i] =  ((p & 0x8000) ? 1 : 0);
              p = p << 1;
          }
          m.reverse();

          if(m[0]==1){
            gvar.gw_kark_k2_mode = "Auto";
          }
          else if(m[1]==1){
            gvar.gw_kark_k2_mode = "Manual";
          }
          else{
            gvar.gw_kark_k2_mode = "Off";
          }



          if(m[4] == 1 ){
            gvar.gw_kark_k2_status="Fault Active";
          }
          else if(m[3]==1){
            gvar.gw_kark_k2_status="Pump Running";
          }
          else if(m[15]==1){
            gvar.gw_kark_k2_status="Available"
          }
          else{
            gvar.gw_kark_k2_status="Not Available"
          }

          gvar.gw_kark_k2_estop=m[2]
          gvar.gw_kark_k2_vsd_fault=m[4]
          gvar.gw_kark_k2_voltage_ok=m[5]
          gvar.gw_kark_k2_room_alarm=m[6]
          gvar.gw_kark_k2_panel_door_open=m[7]
          gvar.gw_kark_k2_low_flow_fault=m[8]
          gvar.gw_kark_k2_charger_ok=m[9]
          gvar.gw_kark_k2_borehol_low_level_fault=m[10]
          gvar.gw_kark_k2_surge_arrester_ok=m[11]
          gvar.gw_kark_k2_flow_comms = m[12]
          gvar.gw_kark_k2_warning_level = m[13]



          gvar.gw_kark_k2_level  = (val[3]/100).toFixed(2);
          gvar.gw_kark_k2_run_hours = (val[2])
          gvar.gw_kark_k2_flow_rate = (val[4]/100).toFixed(2)
          gvar.gw_kark_k2_total_flow = (val[5]/10).toFixed(1);
          gvar.gw_kark_k2_current = (val[8]/100).toFixed(2);

          gvar.gw_kark_k2_run_time_remaining = parseFloat(val[6])
          gvar.gw_kark_k2_rest_time_remaining = parseFloat(val[7])

          var MongoClient = require('mongodb').MongoClient;
          var url= gvar.standardConnectionString;

          var firstValue ={
            gw_kark_k2_UT:gvar.gw_kark_k2_UT,
            gw_kark_k2_level:gvar.gw_kark_k2_level,
            gw_kark_k2_run_hours:gvar.gw_kark_k2_run_hours,
            gw_kark_k2_flow_rate:gvar.gw_kark_k2_flow_rate,
            gw_kark_k2_total_flow:gvar.gw_kark_k2_total_flow,
            gw_kark_k2_current:gvar.gw_kark_k2_current,
            gw_kark_k2_mode:gvar.gw_kark_k2_mode,
            gw_kark_k2_status:gvar.gw_kark_k2_status,
            gw_kark_k2_run_time_remaining:gvar.gw_kark_k2_run_time_remaining,
            gw_kark_k2_rest_time_remaining:gvar.gw_kark_k2_rest_time_remaining,
            gw_kark_k2_estop:gvar.gw_kark_k2_estop,
            gw_kark_k2_vsd_fault:gvar.gw_kark_k2_vsd_fault,
            gw_kark_k2_voltage_ok:gvar.gw_kark_k2_voltage_ok,
            gw_kark_k2_room_alarm:gvar.gw_kark_k2_room_alarm,
            gw_kark_k2_panel_door_open:gvar.gw_kark_k2_panel_door_open,
            gw_kark_k2_low_flow_fault:gvar.gw_kark_k2_low_flow_fault,
            gw_kark_k2_charger_ok:gvar.gw_kark_k2_charger_ok,
            gw_kark_k2_borehol_low_level_fault:gvar.gw_kark_k2_borehol_low_level_fault,
            gw_kark_k2_surge_arrester_ok:gvar.gw_kark_k2_surge_arrester_ok,
            gw_kark_k2_flow_comms:gvar.gw_kark_k2_flow_comms,
            gw_kark_k2_warning_level:gvar.gw_kark_k2_warning_level,
            id: "nmbm_kark_gw",
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
  setTimeout(readVal_KARK_K2_GW, mbtimeout);
  }





