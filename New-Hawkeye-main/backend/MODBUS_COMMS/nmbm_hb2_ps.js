module.exports = {readVal_HB_PS_R_2};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.25';
var regStart = 700;
var regNum = 11;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_HB_PS_R_2(){
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

        gvar.hb_P1_RH = val[2]
        gvar.hb_P2_RH = val[6]
        gvar.hb_P3_RH = val[10]

        gvar.hb_P1_CURRENT = val[0]
        gvar.hb_P2_CURRENT = val[4]
        gvar.hb_P3_CURRENT = val[8]

         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });

        if(gvar.hb_P1_RH!=undefined || gvar.hb_P1_RH!=null){

        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
hb_P1_RH:gvar.hb_P1_RH,
hb_P2_RH:gvar.hb_P2_RH,
hb_P3_RH:gvar.hb_P3_RH,
hb_P1_CURRENT:gvar.hb_P1_CURRENT,
hb_P2_CURRENT:gvar.hb_P2_CURRENT,
hb_P3_CURRENT:gvar.hb_P3_CURRENT,
id:"heaterbank_pump"

}


fun.storeInDB(firstValue,"PS_CurrentVals")

      }
  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});

  setTimeout(readVal_HB_PS_R_2, mbtimeout);
  }
