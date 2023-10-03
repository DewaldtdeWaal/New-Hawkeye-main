//Serves as a basic template for all future sites.

module.exports = {readVal_DRIFT_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.46';
//Memoryword(MW) you start at
var regStart = 200;
//Amount of Memorywords you have
var regNum = 20;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_DRIFT_R(){
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

        gvar.drift_r_ut = Date().slice(4,Date().length-41);

        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();

        i

        if(m[0] == 0){
        gvar.drift_r_alarm_armed = "Not Armed";
        }
        else if (m[0] == 1){
          gvar.drift_r_alarm_armed = "Armed";

        }


        gvar.drift_r_room_alarm = m[1];
        gvar.drift_r_solar_alarm = m[2];
        gvar.drift_r_door_alarm = m[3]



        if(m[4] == 0){
          gvar.drift_r_pepper_spray_armed = "Not Armed"
        }else{
          gvar.drift_r_pepper_spray_armed = "Armed";
        }



        gvar.drift_r_pepper_spray_alarm = m[5];

        gvar.drift_r_pepper_spray_gas_left = (val[2]);
        gvar.drift_r_pepper_spray_battery_voltage = (val[3]/10).toFixed(1);
        gvar.drift_r_reservoir_level = fun.checkLevel((val[4]/10).toFixed(1));
        gvar.drift_r_flow_rate_1 = (val[5]/10).toFixed(1);


        var rawData = new ArrayBuffer(32);
        var i = new Uint16Array(rawData);
        var ii  = new Uint32Array(rawData);
        i[0] = val[6];
        i[1] = val[7];
        i[2] = val[9]
        i[3] = val[10]

        gvar.drift_r_total_flow_1 = parseFloat(ii[0].toFixed(1) )
        gvar.drift_r_total_flow_2 = parseFloat(ii[1].toFixed(1) )



        gvar.drift_r_flow_rate_2 = (val[8]/10).toFixed(1);

        var firstValue ={
         drift_r_alarm_armed:gvar.drift_r_alarm_armed,
         drift_r_room_alarm:gvar.drift_r_room_alarm,
         drift_r_ut:gvar.drift_r_ut,
         drift_r_solar_alarm:gvar.drift_r_solar_alarm,
         drift_r_door_alarm:gvar.drift_r_door_alarm,
         drift_r_pepper_spray_armed:gvar.drift_r_pepper_spray_armed,
         drift_r_pepper_spray_alarm:gvar.drift_r_pepper_spray_alarm,
         drift_r_pepper_spray_gas_left:gvar.drift_r_pepper_spray_gas_left,
         drift_r_pepper_spray_battery_voltage:gvar.drift_r_pepper_spray_battery_voltage,
         drift_r_reservoir_level:gvar.drift_r_reservoir_level,
         drift_r_flow_rate_1:gvar.drift_r_flow_rate_1,
         drift_r_flow_rate_2:gvar.drift_r_flow_rate_2,
         drift_r_total_flow_1:gvar.drift_r_total_flow_1,
         drift_r_total_flow_2:gvar.drift_r_total_flow_2,
          id:"nmbm_drift_res"

        }

        fun.storeInDB(firstValue,"R_CurrentVals")


        var reservoirTrend={
          drift_r_reservoir_level:gvar.drift_r_reservoir_level,
          drift_r_ut:gvar.drift_r_ut,
          id:"res_overview"

        }

        fun.storeInDB(reservoirTrend,"Res_CurrentVals")


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
  setTimeout(readVal_DRIFT_R, mbtimeout);
  }





