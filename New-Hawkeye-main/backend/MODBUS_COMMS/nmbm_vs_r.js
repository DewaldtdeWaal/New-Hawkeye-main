module.exports = {readVal_VS_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.8';
var regStart = 50;
var regNum = 2;
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_VS_R(){
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



        gvar.vs_R_LVL = fun.checkLevel((val[1]/10).toFixed(1));

        var Stat1 = (val[0].toString(2)).split('')
        Stat1.reverse();
        gvar.vs_R_SURGE_ARRESTOR = Stat1[0];
        gvar.vs_R_CHARGER_STATUS = Stat1[1];
        gvar.vs_R_DOOR = Stat1[2]
        gvar.vs_R_UT = Date().slice(4,Date().length-41);

        if(gvar.vs_R_LVL!=undefined || gvar.vs_R_LVL!=null){
        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
vs_R_LVL:gvar.vs_R_LVL,
vs_R_SURGE_ARRESTOR:gvar.vs_R_SURGE_ARRESTOR,
vs_R_CHARGER_STATUS:gvar.vs_R_CHARGER_STATUS,
vs_R_DOOR:gvar.vs_R_DOOR,
vs_R_UT:gvar.vs_R_UT,





id:"nmbm_vs_r"

}


fun.storeInDB(firstValue,"R_CurrentVals")

        var reservoirTrend={
          vs_R_UT:gvar.vs_R_UT,
          vs_R_LVL:gvar.vs_R_LVL,
          id:"res_overview"

        }

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
  setTimeout(readVal_VS_R, mbtimeout);
  }
