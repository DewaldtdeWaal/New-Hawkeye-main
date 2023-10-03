module.exports = {readVal_GB_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.9';
var regStart = 50;//memory word
var regNum = 7; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_GB_R(){
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

        mbtimeout = mbCycleTime;
        gvar.gb_R_LVL = fun.checkLevel((val[1]/10).toFixed(1));
        gvar.gb_R_FR = (val[2]/100).toFixed(1);
        var frf1= val[3];
        var frf2 = val[4];
        gvar.gb_R_FRF = ((frf1*65536)+ frf2)/10;
        var frr1= val[5];
        var frr2 = val[6];
        gvar.gb_R_FRR = ((frr1*65536)+ frr2)/10;
        gvar.gb_R_UT = Date().slice(4,Date().length-41);

        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();
        gvar.gb_R_SURGE_ARRESTOR = m[0];
        gvar.gb_R_CHARGER_STATUS = m[1];
        gvar.gb_R_DOOR = m[2]



        if(gvar.gb_R_LVL!=undefined || gvar.gb_R_LVL!=null){

        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
gb_R_LVL:gvar.gb_R_LVL,
gb_R_FR:gvar.gb_R_FR,
gb_R_FRF:gvar.gb_R_FRF,
gb_R_FRR:gvar.gb_R_FRR,
gb_R_UT:gvar.gb_R_UT,
gb_R_SURGE_ARRESTOR:gvar.gb_R_SURGE_ARRESTOR,
gb_R_CHARGER_STATUS:gvar.gb_R_CHARGER_STATUS,
gb_R_DOOR:gvar.gb_R_DOOR,
id:"nmbm_gb_r"





}


fun.storeInDB(firstValue,"R_CurrentVals")


        var reservoirTrend={
          gb_R_LVL:gvar.gb_R_LVL,
          gb_R_UT:gvar.gb_R_UT,
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
  setTimeout(readVal_GB_R, mbtimeout);
  }
