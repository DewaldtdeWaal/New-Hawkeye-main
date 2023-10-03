//Serves as a basic template for all future sites.

module.exports = {readVal_BUSH_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.48';
//Memoryword(MW) you start at
var regStart = 2000;
//Amount of Memorywords you have
var regNum = 22 ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_BUSH_R(){
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

        var rawData = new ArrayBuffer(64);
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
        i[12] = val[12]; //low
        i[13] = val[13]; //high

        i[14] = val[14]
        i[15] = val[15]
        i[16] = val[16]
        i[17] = val[17]
        i[18] = val[18]
        i[19] = val[19]
        i[20] = val[20]
        i[21] = val[21]

        gvar.bush_church_steel_fr = parseFloat(f[0]).toFixed(1)
        gvar.bush_church_socco_fr = parseFloat(f[1]).toFixed(1)
        gvar.bush_church_steel_bar = parseFloat(f[2]).toFixed(1)
        gvar.bush_church_socco_bar = parseFloat(f[3]).toFixed(1)
        gvar.bush_pump_fr = parseFloat(f[4]).toFixed(1)
        gvar.bush_gw_comb_flow_rate = parseFloat(f[5]).toFixed(1)
        gvar.bush_tank_lvl = parseFloat(f[6]).toFixed(1)
        gvar.bush_church_steel_TF = parseFloat(f[7]).toFixed(1)
        gvar.bush_church_soco_TF = parseFloat(f[8]).toFixed(1)
        gvar.bush_ps_TF = parseFloat(f[9]).toFixed(1)
        gvar.bush_gw_TF = parseFloat(f[10]).toFixed(1)







        gvar.bush_UT = Date().slice(4,Date().length-41);


        var firstValue ={
          bush_church_socco_fr:gvar.bush_church_socco_fr,
          bush_church_steel_fr:gvar.bush_church_steel_fr,
          bush_church_socco_bar:gvar.bush_church_socco_bar,
          bush_church_steel_bar:gvar.bush_church_steel_bar,
          bush_pump_fr:gvar.bush_pump_fr,
          bush_gw_comb_flow_rate:gvar.bush_gw_comb_flow_rate,
          bush_tank_lvl:gvar.bush_tank_lvl,
          bush_UT:gvar.bush_UT,
          bush_gw_TF:gvar.bush_gw_TF,
bush_ps_TF:gvar.bush_ps_TF,
bush_church_steel_TF:gvar.bush_church_steel_TF,
bush_church_soco_TF:gvar.bush_church_soco_TF,
          id:"nmbm_bush_r"




          }

          fun.storeInDB(firstValue,"R_CurrentVals")

          var psTrend ={
            bush_UT:gvar.bush_UT,
            id:"PS_OVERVIEW"
          }


          var FptTrend ={
            bush_UT:gvar.bush_UT,
            id:"fpt_currentvals"
          }

         fun.storeInDB(psTrend,"PUMP_CurrentVals")

         var FptTrend ={
          bush_UT:gvar.bush_UT,
          id:"fpt_currentvals"
        }
         fun.storeInDB(FptTrend,"F_CurrentVals")
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
  setTimeout(readVal_BUSH_R, mbtimeout);
  }





