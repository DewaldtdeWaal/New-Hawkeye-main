//Serves as a basic template for all future sites.

module.exports = {readVal_HUP_WTW};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('../MODBUS_COMMS/modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.19';
//Memoryword(MW) you start at
var regStart = 202;
//Amount of Memorywords you have
var regNum = 20 ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_HUP_WTW(){
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


        var rawData = new ArrayBuffer(4);
        var i = new Uint16Array(rawData);
        var f = new Float32Array(rawData);

        gvar.klm_hup_wtw_ut = Date().slice(4,Date().length-41);

        gvar.klm_hup_wtw_TF = val[9]

    
        


          i[0] = val[0]
          i[1] = val[1]

          gvar.klm_hup_wtw_FR = parseFloat(f[0]).toFixed(1)



          var firstValue ={
            klm_hup_wtw_ut:gvar.klm_hup_wtw_ut,
            klm_hup_wtw_FR:gvar.klm_hup_wtw_FR,
            klm_hup_wtw_TF:gvar.klm_hup_wtw_TF,
            id:"klm_hup_wtw"
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
  setTimeout(readVal_HUP_WTW, mbtimeout);
  }





