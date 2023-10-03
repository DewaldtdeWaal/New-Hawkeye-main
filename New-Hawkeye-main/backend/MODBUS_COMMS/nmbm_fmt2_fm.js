module.exports = {readVal_FMT2_FM};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.16';
var regStart = 90;//memory word
var regNum = 1; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_FMT2_FM(){
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

        gvar.fmt_FM_PRESS = ((parseFloat(val[0]))/1000).toFixed(3);




        if(gvar.fmt_FM_PRESS!=undefined || gvar.fmt_FM_PRESS!=null){



var firstValue ={
fmt_FM_PRESS:gvar.fmt_FM_PRESS,
id:"nmbm_fmt_fm"

}


fun.storeInDB(firstValue,"FPT_CurrentVals")

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
  setTimeout(readVal_FMT2_FM, mbtimeout);
  }
