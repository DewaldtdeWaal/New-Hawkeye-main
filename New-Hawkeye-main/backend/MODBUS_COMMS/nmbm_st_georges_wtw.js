//Serves as a basic template for all future sites.

module.exports = {readVal_ST_GRS_WTW};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('../MODBUS_COMMS/modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.36';
//Memoryword(MW) you start at
var regStart = 2000;
//Amount of Memorywords you have
var regNum = 6;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_ST_GRS_WTW(){
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
          gvar.st_georges_wtw_ut= Date().slice(4,Date().length-41);


          //MAKE THIS A DYNAMIC METHOD
          var rawData = new ArrayBuffer(8);
          var i = new Uint16Array(rawData);
          var f = new Float32Array(rawData);

          i[0] = val[0]; //low
          i[1] = val[1]; //high
          i[2] = val[2]; //low
          i[3] = val[3]; //high
          i[4] = val[4]; //low
          i[5] = val[5]; //high
          i[6] = val[6]; //low
          i[7] = val[7]; //high


          gvar.st_georges_wtw_gw_FR = parseFloat(f[0]).toFixed(0);
          gvar.st_georges_wtw_gw_TF = parseFloat(f[1]).toFixed(0);
          gvar.st_georges_wtw_emer_hill_FR= parseFloat(f[2]).toFixed(0);
          gvar.st_georges_wtw_emer_hill_TF= parseFloat(f[3]).toFixed(0);

          if(gvar.mali_lvl!=undefined || gvar.mali_lvl!=null){



            var firstValue ={

              st_georges_wtw_ut:gvar.st_georges_wtw_ut,
              st_georges_wtw_gw_FR:gvar.st_georges_wtw_gw_FR,
              st_georges_wtw_gw_TF:gvar.st_georges_wtw_gw_TF,
              st_georges_wtw_emer_hill_FR:gvar.st_georges_wtw_emer_hill_FR,
              st_georges_wtw_emer_hill_TF:gvar.st_georges_wtw_emer_hill_TF,
              id:"nmbm_st_georges_wtw"

            }

            fun.storeInDB(firstValue,"WTW_CurrentVals")


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
  setTimeout(readVal_ST_GRS_WTW, mbtimeout);
  }





