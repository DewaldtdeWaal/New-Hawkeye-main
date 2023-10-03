//Serves as a basic template for all future sites.

module.exports = {readVal_MALI_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('../MODBUS_COMMS/modbusfunctions')


//Get IP address from Daniel
var ip = gvar.mbusIP +'.26';
//Memoryword(MW) you start at
var regStart = 4;
//Amount of Memorywords you have
var regNum = 3;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_MALI_R(){
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
        gvar.mali_ut = Date().slice(4,Date().length-41);



        var rawData = new ArrayBuffer(32);
        var i = new Uint16Array(rawData);
        var f = new Float32Array(rawData);

        i[0] = val[0]; //low
        i[1] = val[1]; //high

        gvar.mali_lvl = parseFloat(f[0]).toFixed(0);

        console.log("gvar.mali_lvl")
        console.log(gvar.mali_lvl)
        console.log("gvar.mali_lvl")


        if(gvar.mali_lvl!=undefined || gvar.mali_lvl!=null){



          var firstValue ={
            mali_ut:gvar.mali_ut,
            mali_lvl:gvar.mali_lvl,
            id:"nmbm_mali_r"

            }

            fun.storeInDB(firstValue,"R_CurrentVals")
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
  setTimeout(readVal_MALI_R, mbtimeout);
  }





