
module.exports = {driver_creation};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('../MODBUS_COMMS/modbusfunctions')

var MongoClient = require('mongodb').MongoClient;
var url= gvar.standardConnectionString;


var data;


//Get IP address from Daniel
var ip
//Memoryword(MW) you start at
var regStart;
//Amount of Memorywords you have
var regNum ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function driver_creation(){
 setInterval(() => {


// console.log(ip)
},120000)




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
  setTimeout(driver_creation, mbtimeout);
  }




  function getFromDB(){

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("HawkEye");
      dbo.collection("drivers").findOne({ id: "HERE" }, function(err, result) {

       data = result;
       console.log(data.ipAddress);

       ip = data.ipAddress;

      })
    })
  }
