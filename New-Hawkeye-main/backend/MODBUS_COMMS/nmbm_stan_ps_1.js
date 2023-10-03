module.exports = {readVal_STAN_PS_1};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.34';
var regStart = 0;
var regNum = 60;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_STAN_PS_1(){


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

        gvar.stan_ps_ut = Date().slice(4,Date().length-41);

//////////////////////////////////////////////////////////////  Pump 1
        var p = parseInt(val[12]); //pump set
        var l = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            l[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        l.reverse();

        if(l[8]==1){
          gvar.stan_p1_localremote="Local"
        }
        else if(l[8]==0){
          gvar.stan_p1_localremote="Remote"
        }



        var p = parseInt(val[13]); //pump set
        var l = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            l[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        l.reverse();

        gvar.stan_p1_pumprunning=l[0]
        gvar.stan_p1_alarmshigh=l[1]
        gvar.stan_p1_alarmstrip= l[2]
        gvar.stan_p1_pumpavailable=l[3]

        if(l[0]==1){
          gvar.stan_p1_stat="Running"
        }
        else if(l[0]==0 && l[3]==1 ){
          gvar.stan_p1_stat="Available"
        }
        else if(l[1]==1 || l[2]==1 ){
          gvar.stan_p1_stat="Fault Active"
        }
        else if(l[1]==0 && l[2]==0 && l[3]==0 && l[1]==0){
          gvar.stan_p1_stat="Not Available"
        }

        gvar.stan_p1_vsd_actfreq=(val[16]/10).toFixed(1)
        gvar.stan_p1_motor_power=val[17]


  //////////////////////////////////////////////////////////////  Pump 2
  var p = parseInt(val[52]); //pump set
  var l = [];
  for (var i=0; i<16; i++) {
      // test top bit and set corresponding payload
      l[i] =  ((p & 0x8000) ? 1 : 0);
      p = p << 1; // divide by two and keep as an integer
  }
  l.reverse();

  if(l[8]==1){
    gvar.stan_p2_localremote="Local"
  }
  else if(l[8]==0){
    gvar.stan_p2_localremote="Remote"
  }



  var p = parseInt(val[53]); //pump set
  var l = [];
  for (var i=0; i<16; i++) {
      // test top bit and set corresponding payload
      l[i] =  ((p & 0x8000) ? 1 : 0);
      p = p << 1; // divide by two and keep as an integer
  }
  l.reverse();

  gvar.stan_p2_pumprunning=l[0]
  gvar.stan_p2_alarmshigh=l[1]
  gvar.stan_p2_alarmstrip= l[2]
  gvar.stan_p2_pumpavailable=l[3]

  if(l[0]==1){
    gvar.stan_p2_stat="Running"
  }
  else if(l[0]==0 && l[3]==1 ){
    gvar.stan_p2_stat="Available"
  }
  else if(l[1]==1 || l[2]==1 ){
    gvar.stan_p2_stat="Fault Active"
  }
  else if(l[1]==0 && l[2]==0 && l[3]==0 && l[1]==0){
    gvar.stan_p2_stat="Not Available"
  }

  gvar.stan_p2_vsd_actfreq=(val[56]/10).toFixed(1)
  gvar.stan_p2_motor_power=val[57]
  //////////////////////////////////////////////////////////////  Pump 3 and Pump 4 are on nmbm_stan_ps_3
  if(gvar.stan_p1_localremote!=undefined || gvar.stan_p1_localremote!=null){
  var MongoClient = require('mongodb').MongoClient;
  var url= gvar.standardConnectionString;


var firstValue ={
stan_ps_ut:gvar.stan_ps_ut,
stan_p1_localremote:gvar.stan_p1_localremote,
stan_p1_pumprunning:gvar.stan_p1_pumprunning,
stan_p1_alarmshigh:gvar.stan_p1_alarmshigh,
stan_p1_alarmstrip:gvar.stan_p1_alarmstrip,
stan_p1_pumpavailable:gvar.stan_p1_pumpavailable,
stan_p1_stat:gvar.stan_p1_stat,
stan_p1_vsd_actfreq:gvar.stan_p1_vsd_actfreq,
stan_p1_motor_power:gvar.stan_p1_motor_power,
stan_p2_localremote:gvar.stan_p2_localremote,
stan_p2_pumprunning:gvar.stan_p2_pumprunning,
stan_p2_alarmshigh:gvar.stan_p2_alarmshigh,
stan_p2_alarmstrip:gvar.stan_p2_alarmstrip,
stan_p2_pumpavailable:gvar.stan_p2_pumpavailable,
stan_p2_stat:gvar.stan_p2_stat,
stan_p2_vsd_actfreq:gvar.stan_p2_vsd_actfreq,
stan_p2_motor_power:gvar.stan_p2_motor_power,

id:"nmbm_stan_ps"

}


fun.storeInDB(firstValue,"PS_CurrentVals")



  var psTrend ={
    stan_ps_ut:gvar.stan_ps_ut,
    id:"PS_OVERVIEW"
  }

  fun.storeInDB(psTrend,"PUMP_CurrentVals")

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
  setTimeout(readVal_STAN_PS_1, 5000);
  }
