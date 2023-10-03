module.exports = {readVal_BH_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
var ip = gvar.mbusIP +'.21';
var regStart = 50;
var regNum = 2;
var timeout = 5000;
var mbtimeout=mbRetry
const fun = require('./modbusfunctions')

function readVal_BH_R(){
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
        gvar.bh_R_UT = Date().slice(4,Date().length-41);
         mbtimeout = mbCycleTime;
         var p = parseInt(val[0]);
         var m = [];
         for (var i=0; i<16; i++) {
             // test top bit and set corresponding payload
             m[i] =  ((p & 0x8000) ? 1 : 0);
             p = p << 1; // divide by two and keep as an integer
         }
         m.reverse();
         gvar.bh_R_SURGE_ARRESTOR = m[0];
         gvar.bh_R_CHARGER_STATUS = m[1];
         gvar.bh_R_DOOR = m[2];
         gvar.bh_R_LVL = fun.checkLevel((val[1]/10).toFixed(1));
         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });



        if(gvar.bh_R_UT!=undefined || gvar.bh_R_UT!=null){

        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
bh_R_UT:gvar.bh_R_UT,
bh_R_SURGE_ARRESTOR:gvar.bh_R_SURGE_ARRESTOR,
bh_R_CHARGER_STATUS:gvar.bh_R_CHARGER_STATUS,
bh_R_DOOR:gvar.bh_R_DOOR,
bh_R_LVL:gvar.bh_R_LVL,
id:"nmbm_bh_r"

}

var reservoirTrend={
  bh_R_UT:gvar.bh_R_UT,
  bh_R_LVL:gvar.bh_R_LVL,
  id:"res_overview"

}

fun.storeInDB(reservoirTrend,"Res_CurrentVals")
fun.storeInDB(firstValue,"R_CurrentVals")



      }

  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});
  setTimeout(readVal_BH_R, mbtimeout);
  }
