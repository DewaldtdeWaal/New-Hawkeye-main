//Serves as a basic template for all future sites.

module.exports = {readVal_SCHOE_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.47';
//Memoryword(MW) you start at
var regStart = 200;
//Amount of Memorywords you have
var regNum = 6;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_SCHOE_R(){
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

        gvar.nmb_schoe_r_ut = Date().slice(4,Date().length-41);


        var p = parseInt(val[0]);
        var m = [];

        for (var i=0; i<16; i++){
          m[i] =  ((p & 0x8000) ? 1 : 0);
          p = p << 1; // divide by two and keep as an integer
      }
      m.reverse();

      if(m[0] == 1){
        gvar.nmb_schoe_r_voltage_monitor = "NOT OKAY";
      }
      else if(m[0]==0){
        gvar.nmb_schoe_r_voltage_monitor = "OKAY";
      }


      gvar.nmb_schoe_r_actuator_valve_feedback_signal_error = m[2];
      gvar.nmb_schoe_r_actuator_valve_command_signal_error = m[3];

      gvar.nmb_schoe_r_reservoir_level_signal_error = m[4];
      if(m[6]== 1){
        gvar.nmb_schoe_r_actuator_mode  = "Remote";
      }else if(m[7] == 1){
        gvar.nmb_schoe_r_actuator_mode  = "Local";
      }
      else{
        gvar.nmb_schoe_r_actuator_mode  = "Off";
      }

      gvar.nmb_schoe_r_actuator_valve_fault = m[8];


      if(m[8] == 1){
        gvar.nmb_schoe_r_actuator_valve_status = "Fault Active"
      }
      else if(m[10]==1){
        gvar.nmb_schoe_r_actuator_valve_status = "Open"
      }
      else if(m[9]== 1){
        gvar.nmb_schoe_r_actuator_valve_status = "Closed"
      }
      else if(m[11]==1){
        gvar.nmb_schoe_r_actuator_valve_status = "Closing"
      }
      else if(m[12]== 1){
        gvar.nmb_schoe_r_actuator_valve_status = "Opening"
      }
      else{
        gvar.nmb_schoe_r_actuator_valve_status = "Healthy"
      }


      gvar.nmb_schoe_r_actuator_valve_torque_fail_close = m[13]

      gvar.nmb_schoe_r_actuator_valve_torque_fail_open = m[14];



      var p1 = parseInt(val[1]);
      var m1 = [];

      for (var i=0; i<16; i++){
        m1[i] =  ((p1 & 0x8000) ? 1 : 0);
        p1 = p1 << 1; // divide by two and keep as an integer
    }
    m1.reverse();

    if (m[15]== 1){
    gvar.nbm_schoe_r_plc_mode = "Auto"
  }
  else if (m1[0] == 1){
    gvar.nbm_schoe_r_plc_mode = "Manual"
  }


    gvar.nmb_schoe_r_general_fault = m1[1];
    gvar.nmb_schoe_r_actuator_general_fault = m1[2];
    gvar.nmb_schoe_r_actuator_valve_timeout = m1[3]

    gvar.nmb_schoe_r_actuator_position =  (val[2])

    gvar.nmb_schoe_r_res_level = fun.checkLevel(val[3])
    gvar.nmb_schoe_r_pressure = (val[4])
    gvar.nmb_schoe_r_actuator_set_point = (val[5]);


    if(gvar.nmb_schoe_r_res_level!=undefined || gvar.nmb_schoe_r_res_level!=null){
      var MongoClient = require('mongodb').MongoClient;
      var url= gvar.standardConnectionString;


    var firstValue ={
      nmb_schoe_r_ut:gvar.nmb_schoe_r_ut,
      nmb_schoe_r_voltage_monitor:gvar.nmb_schoe_r_voltage_monitor,
      nmb_schoe_r_actuator_valve_feedback_signal_error:gvar.nmb_schoe_r_actuator_valve_feedback_signal_error,
      nmb_schoe_r_actuator_valve_command_signal_error:gvar.nmb_schoe_r_actuator_valve_command_signal_error,
      nmb_schoe_r_reservoir_level_signal_error:gvar.nmb_schoe_r_reservoir_level_signal_error,
      nmb_schoe_r_actuator_mode:gvar.nmb_schoe_r_actuator_mode,
      nmb_schoe_r_actuator_valve_fault:gvar.nmb_schoe_r_actuator_valve_fault,
      nmb_schoe_r_actuator_valve_status:gvar.nmb_schoe_r_actuator_valve_status,
      nmb_schoe_r_actuator_valve_torque_fail_close:gvar.nmb_schoe_r_actuator_valve_torque_fail_close,
      nmb_schoe_r_actuator_valve_torque_fail_open:gvar.nmb_schoe_r_actuator_valve_torque_fail_open,
     nbm_schoe_r_plc_mode: gvar.nbm_schoe_r_plc_mode,
     nmb_schoe_r_general_fault:gvar.nmb_schoe_r_general_fault,
     nmb_schoe_r_actuator_general_fault:gvar.nmb_schoe_r_actuator_general_fault,
     nmb_schoe_r_actuator_valve_timeout: gvar.nmb_schoe_r_actuator_valve_timeout,
     nmb_schoe_r_res_level:gvar.nmb_schoe_r_res_level,
     nmb_schoe_r_pressure:gvar.nmb_schoe_r_pressure,
     nmb_schoe_r_actuator_position:gvar.nmb_schoe_r_actuator_position,
     nmb_schoe_r_actuator_set_point:gvar.nmb_schoe_r_actuator_set_point,
    id:"nmbm_schoe_r"

    }



    fun.storeInDB(firstValue,"R_CurrentVals")


      var reservoirTrend={
        nmb_schoe_r_ut:gvar.nmb_schoe_r_ut,
        nmb_schoe_r_res_level:gvar.nmb_schoe_r_res_level,
        id:"res_overview"

      }

     fun.storeInDB(reservoirTrend,"Res_CurrentVals")

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
  setTimeout(readVal_SCHOE_R, mbtimeout);
  }
