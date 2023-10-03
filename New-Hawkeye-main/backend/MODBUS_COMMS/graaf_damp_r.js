//Serves as a basic template for all future sites.

module.exports = {readVal_DAMP_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.1';
//Memoryword(MW) you start at
var regStart = 4;
//Amount of Memorywords you have
var regNum = 5


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_DAMP_R(){
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

        gvar.damp_r_ut= Date().slice(4,Date().length-41);

        var rawData = new ArrayBuffer(16);
        var i = new Uint16Array(rawData);
        var f = new Float32Array(rawData);

        i[0] = val[0]; //low
        i[1] = val[1]; //high


gvar.damp_r_level =  ((ii[0]/10)).toFixed(1);




if(gvar.damp_r_level!=undefined || gvar.damp_r_level!=null){




var firstValue ={
damp_r_level:gvar.damp_r_level,
damp_r_ut:gvar.damp_r_ut,
id:"graaf"
}


fun.storeInDB(firstValue,"R_CurrentVals")


  var reservoirTrend={
    damp_r_level:gvar.damp_r_level,
    damp_r_ut:gvar.damp_r_ut,
    id:"res_overview"

  }



  fun.storeInDB(reservoirTrend,"Res_CurrentVals")

        }

/////////////////////////////////////////////Input code

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
  setTimeout(readVal_DAMP_R, mbtimeout);
  }




