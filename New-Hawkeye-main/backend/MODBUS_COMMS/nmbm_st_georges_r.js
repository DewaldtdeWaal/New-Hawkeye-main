//Serves as a basic template for all future sites.

module.exports = {};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('../MODBUS_COMMS/modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.38';
//Memoryword(MW) you start at
var regStart;
//Amount of Memorywords you have
var regNum ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_ST_GRS_R(){
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

// st_georges_r_ut
// st_georges_r_lvl
// st_georges_r_25_mm_church_fr
// st_georges_r_25_mm_church_tf
// st_georges_r_300_m_church_fr
// st_georges_r_300_m_church_tf

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
  setTimeout(test, mbtimeout);
  }





