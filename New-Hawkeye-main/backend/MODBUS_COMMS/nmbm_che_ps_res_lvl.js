module.exports = {readVal_CHE_R_TEST};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = '127.1.1.11';
var regStart = 1502;//memory word
var regNum = 11; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_CHE_R_TEST(){
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

        var rawData = new ArrayBuffer(32);
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
        i[8] = val[8]; //low
        i[9] = val[9]; //high
        i[10] = val[10]; //low
        i[11] = val[11]; //high

        gvar.che_r_lvl = fun.checkLevel((f[0]).toFixed(1));
        gvar.che_r_lvl_East = fun.checkLevel((f[1]).toFixed(1));
        gvar.che_r_fr1100 = parseFloat(f[2]).toFixed(1);
        gvar.che_r_tf1100 = parseFloat(f[3]).toFixed(1);
        gvar.che_r_fr600 = parseFloat(f[4]).toFixed(1);
        gvar.che_r_tf600 = parseFloat(f[5]).toFixed(1);
        gvar.che_r_ut = Date().slice(4,Date().length-41);

        if(gvar.che_r_lvl_East!=undefined || gvar.che_r_lvl_East!=null){

        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;

var firstValue ={
che_r_lvl_East:gvar.che_r_lvl_East,
che_r_lvl:gvar.che_r_lvl,
che_r_ut:gvar.che_r_ut,
che_r_fr1100:gvar.che_r_fr1100,
che_r_tf1100:gvar.che_r_tf1100,
che_r_fr600:gvar.che_r_fr600,
che_r_tf600:gvar.che_r_tf600,
id:"nmbm_che_ps_res"
}

var reservoirTrend={
  che_r_lvl_East:gvar.che_r_lvl_East,
  che_r_lvl:gvar.che_r_lvl,
  che_r_ut:gvar.che_r_ut,
  id:"res_overview"
}

        fun.storeInDB(firstValue,"R_CurrentVals")


        fun.storeInDB(reservoirTrend,"Res_CurrentVals")


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

  setTimeout(readVal_CHE_R_TEST, mbtimeout);
  }
