module.exports = {readVal_STAN_PS_3};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.34';
var regStart = 92;
var regNum = 50;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_STAN_PS_3(){


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
      .then(function(resp) {console.log
        var val = (resp.response._body.values);
        socket.end();
        mbtimeout = mbCycleTime;


/////////////////////////////////////////////Pump 3
var p = parseInt(val[0]); //pump set
  var l = [];
  for (var i=0; i<16; i++) {
      // test top bit and set corresponding payload
      l[i] =  ((p & 0x8000) ? 1 : 0);
      p = p << 1; // divide by two and keep as an integer
  }
  l.reverse();

  if(l[8]==1){
    gvar.stan_p3_localremote="Local"
  }
  else if(l[8]==0){
    gvar.stan_p3_localremote="Remote"
  }



  var p = parseInt(val[1]); //pump set
  var l = [];
  for (var i=0; i<16; i++) {
      // test top bit and set corresponding payload
      l[i] =  ((p & 0x8000) ? 1 : 0);
      p = p << 1; // divide by two and keep as an integer
  }
  l.reverse();

  gvar.stan_p3_pumprunning=l[0]
  gvar.stan_p3_alarmshigh=l[1]
  gvar.stan_p3_alarmstrip= l[2]
  gvar.stan_p3_pumpavailable=l[3]
  if(l[0]==1){
    gvar.stan_p3_stat="Running"
  }
  else if(l[0]==0 && l[3]==1 ){
    gvar.stan_p3_stat="Available"
  }
  else if(l[1]==1 || l[2]==1 ){
    gvar.stan_p3_stat="Fault Active"
  }
  else if(l[1]==0 && l[2]==0 && l[3]==0 && l[1]==0){
    gvar.stan_p3_stat="Not Available"
  }

  gvar.stan_p3_vsd_actfreq=(val[4]/10).toFixed(1)
  gvar.stan_p3_motor_power=val[5]
//////////////////////////////////////////////////////////////  Pump 4
var p = parseInt(val[40]); //pump set
var l = [];
for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    l[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1; // divide by two and keep as an integer
}
l.reverse();

if(l[8]==1){
  gvar.stan_p4_localremote="Local"
}
else if(l[8]==0){
  gvar.stan_p4_localremote="Remote"
}



var p = parseInt(val[41]); //pump set
var l = [];
for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    l[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1; // divide by two and keep as an integer
}
l.reverse();

gvar.stan_p4_pumprunning=l[0]
gvar.stan_p4_alarmshigh=l[1]
gvar.stan_p4_alarmstrip= l[2]
gvar.stan_p4_pumpavailable=l[3]

if(l[0]==1){
  gvar.stan_p4_stat="Running"
}
else if(l[0]==0 && l[3]==1 ){
  gvar.stan_p4_stat="Available"
}
else if(l[1]==1 || l[2]==1 ){
  gvar.stan_p4_stat="Fault Active"
}
else if(l[1]==0 && l[2]==0 && l[3]==0 && l[1]==0){
  gvar.stan_p4_stat="Not Available"
}

gvar.stan_p4_vsd_actfreq=(val[44]/10).toFixed(1)
gvar.stan_p4_motor_power=val[45]

if(gvar.stan_p3_localremote!=undefined || gvar.stan_p3_localremote!=null){

var MongoClient = require('mongodb').MongoClient;
var url= gvar.standardConnectionString;


var firstValue ={
stan_p3_localremote:gvar.stan_p3_localremote,
stan_p3_pumprunning:gvar.stan_p3_pumprunning,
stan_p3_alarmshigh:gvar.stan_p3_alarmshigh,
stan_p3_alarmstrip:gvar.stan_p3_alarmstrip,
stan_p3_pumpavailable:gvar.stan_p3_pumpavailable,
stan_p3_stat:gvar.stan_p3_stat,
stan_p3_vsd_actfreq:gvar.stan_p3_vsd_actfreq,
stan_p3_motor_power:gvar.stan_p3_motor_power,
stan_p4_localremote:gvar.stan_p4_localremote,
stan_p4_pumprunning:gvar.stan_p4_pumprunning,
stan_p4_alarmshigh:gvar.stan_p4_alarmshigh,
stan_p4_alarmstrip:gvar.stan_p4_alarmstrip,
stan_p4_pumpavailable:gvar.stan_p4_pumpavailable,
stan_p4_stat:gvar.stan_p4_stat,
stan_p4_vsd_actfreq:gvar.stan_p4_vsd_actfreq,
stan_p4_motor_power:gvar.stan_p4_motor_power,
id:"nmbm_stan_ps"

}


fun.storeInDB(firstValue,"PS_CurrentVals")
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
  setTimeout(readVal_STAN_PS_3, 5000);
  }
