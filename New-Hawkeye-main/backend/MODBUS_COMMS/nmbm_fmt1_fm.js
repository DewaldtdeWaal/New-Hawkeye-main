module.exports = {readVal_FMT1_FM};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.16';
var regStart = 100;//memory word
var regNum = 6; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_FMT1_FM(){
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
        gvar.fmt_FM_UT= Date().slice(4,Date().length-41);
        gvar.fmt_FM_GAS_L =val[1]
        gvar.fmt_FM_BATTERY_V =(val[2]/1000).toFixed(2);
        gvar.fmt_FM_FR = (val[3]/100).toFixed(2);

        var rawData = new ArrayBuffer(16);
        var i0 = new Uint16Array(rawData);
        var f0 = new Float32Array(rawData);
        i0[4] = val[4]; //low
        i0[5] = val[5]; //high
        gvar.fmt_FM_TF = parseFloat(f0[2]/1000).toFixed(2);


        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1;
        }
        m.reverse();
        gvar.fmt_FM_LOW_B = m[0];
        gvar.fmt_FM_ALM_ARMD = m[1];
        gvar.fmt_FM_CHAMBER_TAMP = m[2];
        gvar.fmt_FM_SOLAR_PANEL_TAMP = m[3];
        gvar.fmt_FM_DOOR_OPENED = m[4];
        gvar.fmt_FM_PEPPER_S_ARMD = m[6];
        gvar.fmt_FM_PEPPER_S_ALM = m[7];


        if(gvar.fmt_FM_TF!=undefined || gvar.fmt_FM_TF!=null){
        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
  fmt_FM_FR:gvar.fmt_FM_FR,
  fmt_FM_TF:gvar.fmt_FM_TF,
  fmt_FM_UT:gvar.fmt_FM_UT,
  fmt_FM_BATTERY_V:gvar.fmt_FM_BATTERY_V,
  fmt_FM_GAS_L:gvar.fmt_FM_GAS_L,
fmt_FM_LOW_B:gvar.fmt_FM_LOW_B,
fmt_FM_ALM_ARMD:gvar.fmt_FM_ALM_ARMD,
fmt_FM_CHAMBER_TAMP:gvar.fmt_FM_CHAMBER_TAMP,
fmt_FM_SOLAR_PANEL_TAMP:gvar.fmt_FM_SOLAR_PANEL_TAMP,
fmt_FM_DOOR_OPENED:gvar.fmt_FM_DOOR_OPENED,
fmt_FM_PEPPER_S_ARMD:gvar.fmt_FM_PEPPER_S_ARMD,
fmt_FM_PEPPER_S_ALM:gvar.fmt_FM_PEPPER_S_ALM,
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
  setTimeout(readVal_FMT1_FM, mbtimeout);
  }
