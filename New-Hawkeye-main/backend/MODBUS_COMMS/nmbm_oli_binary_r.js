//Serves as a basic template for all future sites.

module.exports = {readVal_Oli_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
const fun = require('./modbusfunctions')
var mbCycleTime = 60000;
var mbRetry = 10000;


//Get IP address from Daniel
var ip = gvar.mbusIP +'.28';
var regStart = 300;
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
 var test = []
 var array = []
var finalString=''

        // gvar.oli_lvl = parseString(val[11])
        for (var i=0; i<8; i++) {
        test[i] = val[i + 12]
        array[i] = fun.cloudWorksLastPole(test[i])
       finalString= finalString + array[i]

        }










        gvar.batteryUnitUpdate = fun.convertDateTime(finalString)







        if(gvar.oli_lvl!=undefined || gvar.oli_lvl!=null){

          var MongoClient = require('mongodb').MongoClient;
          var url= gvar.standardConnectionString;


  var firstValue ={
    batteryUnitUpdate:gvar.batteryUnitUpdate,
    id:"nmbm_olip_r"

  }


  fun.storeInDB(firstValue,"R_CurrentVals")

          var reservoirTrend={
            batteryUnitUpdate:gvar.batteryUnitUpdate,
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
