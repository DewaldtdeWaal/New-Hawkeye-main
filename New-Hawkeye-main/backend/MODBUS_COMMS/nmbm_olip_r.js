//Serves as a basic template for all future sites.

module.exports = {readVal_Oli_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.28';
var regStart = 103;
//Amount of Memorywords you have
var regNum = 22;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_Oli_R(){
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

        gvar.oli_lvl = fun.checkLevel((val[0]/10).toFixed(1));
        gvar.oli_ut=Date().slice(4,Date().length-41);



        if(gvar.oli_lvl!=undefined || gvar.oli_lvl!=null){



  var firstValue ={
    oli_lvl:gvar.oli_lvl,
    oli_ut:gvar.oli_ut,
    id:"nmbm_olip_r"





  }


 fun.storeInDB(firstValue,"R_CurrentVals")


          var reservoirTrend={
            oli_lvl:gvar.oli_lvl,
            oli_ut:gvar.oli_ut,
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
  setTimeout(readVal_Oli_R, mbtimeout);
  }





