module.exports = {readVal_SM_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.18';
var regStart = 1;
var regNum = 21;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_SM_R(){
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
        gvar.sum_UT = Date().slice(4,Date().length-41);
        var rawData = new ArrayBuffer(4);
        var i0 = new Uint16Array(rawData);
        var f0 = new Float32Array(rawData);
        i0[0] = val[3]; //low
        i0[1] = val[2]; //high
        gvar.sm_r_lvl = fun.checkLevel(f0[0].toFixed(2))

        var rawData = new ArrayBuffer(16);
        var i = new Uint16Array(rawData);
        var ii  = new Uint32Array(rawData);
        i[0] = val[18]; //low
        i[1] = val[17]; //high
        gvar.sm_fm_tf=((ii[0]/10).toFixed(1))

         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });

        if(gvar.sm_r_lvl!=undefined || gvar.sm_r_lvl!=null){

        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
sm_r_lvl:gvar.sm_r_lvl,
sm_fm_tf:gvar.sm_fm_tf,
sum_UT:gvar.sum_UT,
id:"nmbm_sm_r"

}


        fun.storeInDB(firstValue,"R_CurrentVals");

        var reservoirTrend={
          sum_UT:gvar.sum_UT,
          sm_r_lvl:gvar.sm_r_lvl,
          id:"res_overview"

        }

        fun.storeInDB(reservoirTrend,"Res_CurrentVals")

              }

  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});
  setTimeout(readVal_SM_R, mbtimeout);
  }
