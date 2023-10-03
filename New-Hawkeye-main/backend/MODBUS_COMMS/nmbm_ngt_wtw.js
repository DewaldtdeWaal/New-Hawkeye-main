module.exports = {readVal_NGT_WTW};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.5';
var regStart = 6;
var regNum = 4;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_NGT_WTW(){
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


        gvar.wtw_ngt_ut= Date().slice(4,Date().length-41);

        var rawData = new ArrayBuffer(16);
        var i0 = new Uint16Array(rawData);
        var f0 = new Float32Array(rawData);
        i0[4] = val[0]; //low
        i0[5] = val[1]; //high

        i0[6] = val[2]; //low
        i0[7] = val[3]; //high


        gvar.wtw_ngt_low_lift_fr = parseFloat(f0[2]).toFixed(1);
        gvar.wtw_ngt_high_lift_fr = parseFloat(f0[3]).toFixed(1);


        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
wtw_ngt_ut:gvar.wtw_ngt_ut,
wtw_ngt_low_lift_fr:gvar.wtw_ngt_low_lift_fr,
wtw_ngt_high_lift_fr:gvar.wtw_ngt_high_lift_fr,
id:"nmbm_ngt_wtw"

}

if(gvar.wtw_ngt_low_lift_fr!=undefined || gvar.wtw_ngt_low_lift_fr!=null){


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
  setTimeout(readVal_NGT_WTW, mbtimeout);
  }
