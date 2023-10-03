//Serves as a basic template for all future sites.

module.exports = {readVal_TIN_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip
//Memoryword(MW) you start at
var regStart = 3000;
//Amount of Memorywords you have
var regNum = 22


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_TIN_R(){
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


gvar.tin_r_ut= Date().slice(4,Date().length-41);
gvar.tin_r_level =  (val[0]/10).toFixed(1);

if(gvar.tin_r_level!=undefined || gvar.tin_r_level!=null){

  var MongoClient = require('mongodb').MongoClient;
  var url= gvar.standardConnectionString;


var firstValue ={
tin_r_level:gvar.tin_r_level,
tin_r_ut:gvar.tin_r_ut,
id:"graaf"





}


fun.storeInDB(firstValue,"R_CurrentVals")

  var reservoirTrend={
    tin_r_level:gvar.tin_r_level,
    tin_r_ut:gvar.tin_r_ut,
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
  setTimeout(readVal_TIN_R, mbtimeout);
  }




