//Serves as a basic template for all future sites.

module.exports = {readval_kuis_r};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.10';
//Memoryword(MW) you start at
var regStart=400;
//Amount of Memorywords you have
var regNum = 3 ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readval_kuis_r(){
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

      gvar.klm_kruisR_ut = Date().slice(4,Date().length-41);

      var p = parseInt(val[0]);
      var m = [];
      for (var i=0; i<16; i++) {
          m[i] =  ((p & 0x8000) ? 1 : 0);
          p = p << 1;
      }
      m.reverse();


      gvar.klm_kruisR_surge_arrestor = m[0]
      gvar.klm_kruisR_voltage_ok = m[1]
      gvar.klm_kruisR_door_contact = m[2]
      gvar.klm_kruisR_low_battery = m[3]
      gvar.klm_kruisR_high_float = m[4]
      gvar.klm_kruisR_low_float = m[5]

      var rawData = new ArrayBuffer(2);
        var i = new Uint16Array(rawData);
        var f  = new Float32Array(rawData);

      i[0] = val[2]
      i[1] = val[3]


      gvar.klm_kruisR_lvl = parseFloat(f[0]).toFixed(1)

      var firstValue={

        klm_kruisR_ut:gvar.klm_kruisR_ut,
        klm_kruisR_lvl:gvar.klm_kruisR_lvl,
        klm_kruisR_surge_arrestor:gvar.klm_kruisR_surge_arrestor,
        klm_kruisR_voltage_ok:gvar.klm_kruisR_voltage_ok,
        klm_kruisR_door_contact:gvar.klm_kruisR_door_contact,
        klm_kruisR_low_battery:gvar.klm_kruisR_low_battery,
        klm_kruisR_high_float:gvar.klm_kruisR_high_float,
        klm_kruisR_low_float:gvar.klm_kruisR_low_float

      }

      fun.storeInDB(firstValue,"R_CurrentVals")


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
  setTimeout(readval_kuis_r, mbtimeout);
  }





