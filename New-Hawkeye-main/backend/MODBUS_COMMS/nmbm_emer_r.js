//Serves as a basic template for all future sites.

module.exports = {readVal_Emer_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.45';
var regStart = 200;
//Amount of Memorywords you have
var regNum = 20;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_Emer_R(){
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

      var p = parseInt(val[0]);
      var m = [];
      for (var i=0; i<16; i++) {
      // test top bit and set corresponding payload
      m[i] =  ((p & 0x8000) ? 1 : 0);
      p = p << 1; // divide by two and keep as an integer
      }
      m.reverse();

      gvar.emer_battery_low = m[0]
      gvar.emer_charger_ok = m[1]

        gvar.emer_lvl = fun.checkLevel((val[2]/10).toFixed(1));
        gvar.emer_ut=Date().slice(4,Date().length-41);





        var rawData = new ArrayBuffer(16);
        var i = new Uint16Array(rawData);
        var ii  = new Float32Array(rawData);
        i[0] = val[4]
        i[1] = val[5]
        i[2] = val[6];
        i[3] = val[7];

        gvar.emer_flow_rate =  parseFloat(ii[0].toFixed(1) )
        gvar.emer_total_flow = parseFloat(ii[1].toFixed(1) )



        if(gvar.emer_lvl!=undefined || gvar.emer_lvl!=null){

          var MongoClient = require('mongodb').MongoClient;
          var url= gvar.standardConnectionString;


  var firstValue ={
    emer_lvl:gvar.emer_lvl,
    emer_ut:gvar.emer_ut,
    emer_flow_rate:gvar.emer_flow_rate,
    emer_total_flow:gvar.emer_total_flow,
    emer_battery_low:gvar.emer_battery_low,
    emer_charger_ok:gvar.emer_charger_ok,
    id:"nmbm_emer_r"





  }
  fun.storeInDB(firstValue,"R_CurrentVals")




          var reservoirTrend={
            emer_lvl:gvar.emer_lvl,
            emer_ut:gvar.emer_ut,
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
//Make sure this matches the method Name
  setTimeout(readVal_Emer_R, mbtimeout);
  }





