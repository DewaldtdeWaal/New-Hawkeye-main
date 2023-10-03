//Serves as a basic template for all future sites.

module.exports = {readVal_ST_GRS_PS};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('../MODBUS_COMMS/modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.37';
//Memoryword(MW) you start at
var regStart;
//Amount of Memorywords you have
var regNum ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_ST_GRS_PS(){
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

// gvar.st_georges_ps_ut
// gvar.st_georges_ps_fr
// gvar.st_georges_ps_tf
// gvar.st_georges_ps_delivery_bar



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
  setTimeout(readVal_ST_GRS_PS, mbtimeout);
  }





