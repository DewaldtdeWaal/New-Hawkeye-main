
module.exports = {demo_function};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('../MODBUS_COMMS/modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.4';
//Memoryword(MW) you start at
var regStart = 100;
//Amount of Memorywords you have
var regNum = 5;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function demo_function(){
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

      gvar.demo_ut = Date().slice(4,Date().length-41);

      var rawData = new ArrayBuffer(4);
      var i = new Uint16Array(rawData);
      var f = new Float32Array(rawData);

      i[0] = val[0]; //low
      i[1] = val[1]; //high

      gvar.temp_lvl = parseFloat(f[0]).toFixed(1);

      var p = parseInt(val[2]);
      var m = [];
      for (var i=0; i<16; i++) {
        // test top bit and set corresponding payload
        m[i] =  ((p & 0x8000) ? 1 : 0);
        p = p << 1; // divide by two and keep as an integer
      }
      m.reverse();

      gvar.demo_surge_omitter = m[0]
      gvar.voltage_ok = m[1];
      gvar.door_contact = m[2];
      gvar.pump_run = m[3];

      var a = parseInt(val[2]);
      var b = [];
      for (var i=0; i<16; i++) {
        // test top bit and set corresponding payload
        m[i] =  ((a & 0x8000) ? 1 : 0);
        a = a << 1; // divide by two and keep as an integer
      }
      b.reverse();

      gvar.start_pump_output = b[0];


      if(gvar.bf_PS_UT!=undefined || gvar.bf_PS_UT!=null){




     var firstValue ={
      demo_ut:gvar.demo_ut,
      temp_lvl:gvar.temp_lvl,
      demo_surge_omitter:gvar.demo_surge_omitter,
      voltage_ok:gvar.voltage_ok,
      door_contact:gvar.door_contact,
      pump_run:gvar.pump_run,
      start_pump_output:gvar.start_pump_output,
      id:"demo_ONOff"
     }

     fun.storeInDB(firstValue,"demo-site")


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
  setTimeout(demo_function, mbtimeout);
  }





