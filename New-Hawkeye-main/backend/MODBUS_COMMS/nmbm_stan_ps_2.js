module.exports = {readVal_STAN_PS_2};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.34';
var regStart = 670;
var regNum = 6;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_STAN_PS_2(){
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

        var rawData = new ArrayBuffer(16);
        var i0 = new Uint16Array(rawData);
        var f0 = new Float32Array(rawData);
        i0[0] = val[0]; //low
        i0[1] = val[1]; //high

        i0[2] = val[2]; //low
        i0[3] = val[3]; //high


        i0[4] = val[4]; //low
        i0[5] = val[5]; //high


        gvar.stan_common_suction_pressure = parseFloat(f0[0]).toFixed(1);
        gvar.stan_common_delivery_pressure = parseFloat(f0[1]).toFixed(1);
        gvar.stan_pump_station_flow = parseFloat(f0[2]).toFixed(1);


        if(gvar.stan_common_suction_pressure!=undefined || gvar.stan_common_suction_pressure!=null){



var firstValue ={
stan_common_suction_pressure:gvar.stan_common_suction_pressure,
stan_common_delivery_pressure:gvar.stan_common_delivery_pressure,
stan_pump_station_flow:gvar.stan_pump_station_flow,
id:"nmbm_stan_ps"

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
  setTimeout(readVal_STAN_PS_2, 5000);
  }
