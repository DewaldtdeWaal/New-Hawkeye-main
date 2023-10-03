//Serves as a basic template for all future sites.

module.exports = {readVal_HOLD_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip  = gvar.mbusIP +'.1';
//Memoryword(MW) you start at
var regStart = 3000;
//Amount of Memorywords you have
var regNum = 22


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_HOLD_R(){
  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, timeout)
  const options = {
  'host' : ip,
  'port' : 503
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

gvar.hol_r_ut= Date().slice(4,Date().length-41);
gvar.hol_r_level =  (val[0]/10).toFixed(1);

if(gvar.hol_r_level!=undefined || gvar.hol_r_level!=null){

  var MongoClient = require('mongodb').MongoClient;
  var url= gvar.standardConnectionString;


var firstValue ={
hol_r_level:gvar.hol_r_level,
hol_r_ut:gvar.hol_r_ut,
id:"graaf"





}


fun.storeInDB(firstValue,"R_CurrentVals")


  var reservoirTrend={
    hol_r_level:gvar.hol_r_level,
    hol_r_ut:gvar.hol_r_ut,
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
  setTimeout(readVal_HOLD_R, mbtimeout);
  }




