//Serves as a basic template for all future sites.

module.exports = {readVal_storm_wtw};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.38';
//Memoryword(MW) you start at
var regStart = 100;
//Amount of Memorywords you have
var regNum = 16


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_storm_wtw(){
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
      gvar.wtw_storms_UT = Date().slice(4,Date().length-41);

      var p = parseInt(val[0]);
      var m = [];
      for (var i=0; i<16; i++) {
          m[i] =  ((p & 0x8000) ? 1 : 0);
          p = p << 1;
      }
      m.reverse();
      if(m[0]==1)
      {
      gvar.wtw_storms_filter_pump1_mode="Auto"
      }
      else if(m[1]==1)
      {
        gvar.wtw_storms_filter_pump1_mode="Manual"
      }
      else{
        gvar.wtw_storms_filter_pump1_mode="Off"
      }

      if(m[2]==1)
      {
        gvar.wtw_storms_filter_pump1_status="Running"
      }
      else if(m[3]==1)
      {
        gvar.wtw_storms_filter_pump1_status="Fault Active"
      }
       else{
        gvar.wtw_storms_filter_pump1_status="Stopped"
      }
      if(m[4]==1)
      {
        gvar.wtw_storms_filter_pump2_mode="Auto"
      }
      else if(m[5]==1)
      {
        gvar.wtw_storms_filter_pump2_mode="Manual"
      }
      else{
        gvar.wtw_storms_filter_pump2_mode="Off"
      }

      if(m[6]==1)
      {
        gvar.wtw_storms_filter_pump2_status="Running"
      }
      else if(m[7]==1)
      {
        gvar.wtw_storms_filter_pump2_status="Fault Active"
      }
      else{
        gvar.wtw_storms_filter_pump2_status="Stopped"
      }

      if(m[8]==1)
      {
        gvar.wtw_storms_high_lift_pump1_mode="Manual"
      }
      else if(m[9]==1)
      {
        gvar.wtw_storms_high_lift_pump1_mode="Auto"
      }
      else{
        gvar.wtw_storms_high_lift_pump1_mode="Off"
      }

      if(m[10]==1)
      {
        gvar.wtw_storms_high_lift_pump1_status="Running"
      }
      else if(m[11]==1)
      {
        gvar.wtw_storms_high_lift_pump1_status="Fault Active"
      }
      else{
        gvar.wtw_storms_high_lift_pump1_status="Stopped"
      }


      if(m[12]==1)
      {
        gvar.wtw_storms_high_lift_pump2_mode="Manual"
      }
      else if(m[13]==1)
      {
        gvar.wtw_storms_high_lift_pump2_mode="Auto"
      }
      else{
        gvar.wtw_storms_high_lift_pump2_mode="Off"
      }

      if(m[14]==1)
      {
        gvar.wtw_storms_high_lift_pump2_status="Running"
      }
      else if(m[15]==1)
      {
        gvar.wtw_storms_high_lift_pump2_status="Fault Active"
      }else{
        gvar.wtw_storms_high_lift_pump2_status="Stopped"
      }

      var a = parseInt(val[1]);
      var b = [];
      for (var i=0; i<16; i++) {
          b[i] =  ((a & 0x8000) ? 1 : 0);
          a = a << 1;
      }
      b.reverse();

     gvar.wtw_storms_clear_water_tank_high_high = b[0]
     gvar.wtw_storms_clear_water_tank_high = b[1]
     gvar.wtw_storms_clear_water_tank_low = b[2]
     gvar.wtw_storms_holding_reservoir_high = b[3]
     gvar.wtw_storms_holding_reservoir_low = b[4]
     gvar.wtw_storms_overhead_tank_high = b[5]
     gvar.wtw_storms_overhead_tank_low = b[6]
     gvar.wtw_storms_surge_arrester = b[7]
     gvar.wtw_storms_door_mag = b[8]
     gvar.wtw_storms_battery_low = b[9]
     gvar.wtw_storms_voltage_ok = b[10]

     gvar.wtw_storms_filter_pump1_run_hours=parseInt(val[4])
     gvar.wtw_storms_filter_pump2_run_hours=parseInt(val[5])
     gvar.wtw_storms_high_lift_pump1_run_hours=parseInt(val[6])
     gvar.wtw_storms_high_lift_pump2_run_hours=parseInt(val[7])


     var rawData = new ArrayBuffer(16);
     var i0 = new Uint16Array(rawData);
     var f0 = new Float32Array(rawData);

     i0[0] = val[8]; //low
     i0[1] = val[9]; //high

     i0[2] = val[10]; //low
     i0[3] = val[11]; //high

     i0[4] = val[12]; //low
     i0[5] = val[13]; //high

     i0[6] = val[14]; //low
     i0[7] = val[15]; //high

     gvar.wtw_storms_holding_reservoir_level = parseFloat(f0[0]).toFixed(1);
     gvar.wtw_storms_overhead_tank_level = parseFloat(f0[1]).toFixed(1);
     gvar.wtw_storms_pulse_count1_Total_Flow = parseFloat(f0[2]).toFixed(1);
     gvar.wtw_storms_pulse_count2_Total_Flow = parseFloat(f0[3]).toFixed(1);




     var MongoClient = require('mongodb').MongoClient;
     var url= gvar.standardConnectionString;


         var firstValue ={
           wtw_storms_UT:gvar.wtw_storms_UT,
           wtw_storms_filter_pump1_mode:gvar.wtw_storms_filter_pump1_mode,
           wtw_storms_filter_pump1_status:gvar.wtw_storms_filter_pump1_status,
           wtw_storms_filter_pump2_mode:gvar.wtw_storms_filter_pump2_mode,
           wtw_storms_filter_pump2_status:gvar.wtw_storms_filter_pump2_status,
           wtw_storms_high_lift_pump1_mode:gvar.wtw_storms_high_lift_pump1_mode,
           wtw_storms_high_lift_pump1_status:gvar.wtw_storms_high_lift_pump1_status,
           wtw_storms_high_lift_pump2_mode:gvar.wtw_storms_high_lift_pump2_mode,
           wtw_storms_high_lift_pump2_status:gvar.wtw_storms_high_lift_pump2_status,
           wtw_storms_clear_water_tank_high_high:gvar.wtw_storms_clear_water_tank_high_high,
           wtw_storms_clear_water_tank_high:gvar.wtw_storms_clear_water_tank_high,
           wtw_storms_clear_water_tank_low:gvar.wtw_storms_clear_water_tank_low,
           wtw_storms_holding_reservoir_high:gvar.wtw_storms_holding_reservoir_high,
           wtw_storms_holding_reservoir_low:gvar.wtw_storms_holding_reservoir_low,
           wtw_storms_overhead_tank_high:gvar.wtw_storms_overhead_tank_high,
           wtw_storms_overhead_tank_low:gvar.wtw_storms_overhead_tank_low,
           wtw_storms_surge_arrester:gvar.wtw_storms_surge_arrester,
           wtw_storms_door_mag:gvar.wtw_storms_door_mag,
           wtw_storms_battery_low:gvar.wtw_storms_battery_low,
           wtw_storms_voltage_ok:gvar.wtw_storms_voltage_ok,
           wtw_storms_filter_pump1_run_hours:gvar.wtw_storms_filter_pump1_run_hours,
           wtw_storms_filter_pump2_run_hours:gvar.wtw_storms_filter_pump2_run_hours,
           wtw_storms_high_lift_pump1_run_hours:gvar.wtw_storms_high_lift_pump1_run_hours,
           wtw_storms_high_lift_pump2_run_hours:gvar.wtw_storms_high_lift_pump2_run_hours,
           wtw_storms_holding_reservoir_level:gvar.wtw_storms_holding_reservoir_level,
           wtw_storms_overhead_tank_level:gvar.wtw_storms_overhead_tank_level,
           wtw_storms_pulse_count1_Total_Flow:gvar.wtw_storms_pulse_count1_Total_Flow,
           wtw_storms_pulse_count2_Total_Flow:gvar.wtw_storms_pulse_count2_Total_Flow,
         id:"storms_wtw"

         }



         fun.storeInDB(firstValue,"WTW_CurrentVals")


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
  setTimeout(readVal_storm_wtw, mbtimeout);
  }
