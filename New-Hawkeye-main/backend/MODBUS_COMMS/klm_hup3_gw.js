//Serves as a basic template for all future sites.

module.exports = {readVal_HUP3_GW};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.42';
//Memoryword(MW) you start at
var regStart = 200;
//Amount of Memorywords you have
var regNum = 22;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_HUP3_GW(){
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

  gvar.hup3_voltage=m[0]
  gvar.hup3_battery=m[1]
  gvar.hup3_charge=m[2]
  gvar.hup3_fault=m[3]
  gvar.hup3_24_timer=m[4]
  gvar.hup3_borehole_level_pr_fault=m[5]
  gvar.hup3_stop_level=m[6]
  gvar.hup3_no_flow_fault=m[7]
  if(m[8]==1){
    gvar.hup3_mode="Auto"
  }
  else if(m[9]==1){
    gvar.hup3_mode="Manual"
  }
  else {
    gvar.hup3_mode="Off"
  }

  if(m[4]==1){
    gvar.hup3_pump_timer="Pump Run"
    }
    else{
    gvar.hup3_pump_timer="Pump Rest"
    }

    if(m[12]==1|| m[13]==1|| m[14]==1|| m[15]==1){
      gvar.hup3_pump_mode="Pump Fault"
    }
    else if(m[11]==1){
      gvar.hup3_pump_mode="Pump Running"
    }
    else if(m[10]==1){
      gvar.hup3_pump_mode="Pump Available"
    }

    else if(m[6]==1){
      gvar.hup3_pump_mode="Not Available"


      }
      else{
        gvar.hup3_pump_mode="Not Available"
      }
  gvar.hup3_ut = Date().slice(4,Date().length-41);
gvar.hup3_trip_fault=m[12]
gvar.hup3_estop_active=m[13]
gvar.hup3_pump_general_fault=m[14]
gvar.hup3_pump_suf=m[15]

gvar.hup3_borehole_lvl  = (val[2]/10).toFixed(1);
gvar.hup3_flow_rate   = (val[3]/10).toFixed(1);
var rawData = new ArrayBuffer(4);
var k = new Uint16Array(rawData);
var kk  = new Uint32Array(rawData);


k[0]=val[4]
k[1]=val[5]
gvar.hup3_total_flow= (parseInt(kk[0].toFixed(1)));

var rawData = new ArrayBuffer(4);
var c = new Uint16Array(rawData);
var cc  = new Uint32Array(rawData);

c[0]=val[6]
c[1]=val[7]
gvar.hup3_run_hours= (parseInt(cc[0].toFixed(1)));



if(gvar.hup3_voltage!=undefined || gvar.hup3_voltage!=null){



var firstValue={
  hup3_ut:gvar.hup3_ut,
    hup3_voltage:gvar.hup3_voltage,
    hup3_battery:gvar.hup3_battery,
    hup3_charge:gvar.hup3_charge,
    hup3_fault:gvar.hup3_fault,
    hup3_24_timer:gvar.hup3_24_timer,
    hup3_borehole_level_pr_fault:gvar.hup3_borehole_level_pr_fault,
    hup3_stop_level:gvar.hup3_stop_level,
    hup3_no_flow_fault:gvar.hup3_no_flow_fault,
    hup3_mode:gvar.hup3_mode,
    hup3_pump_mode:gvar.hup3_pump_mode,
    hup3_trip_fault:gvar.hup3_trip_fault,
    hup3_estop_active:gvar.hup3_estop_active,
    hup3_pump_general_fault:gvar.hup3_pump_general_fault,
    hup3_pump_suf:gvar.hup3_pump_suf,
    hup3_borehole_lvl :gvar.hup3_borehole_lvl ,
    hup3_flow_rate  :gvar.hup3_flow_rate  ,
    hup3_total_flow:gvar.hup3_total_flow,
    hup3_pump_timer:gvar.hup3_pump_timer,
    hup3_run_hours:gvar.hup3_run_hours,
    id:"klm_hup3_gw"

};



fun.storeInDB(firstValue,"GRDW_CurrentVals")

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
  setTimeout(readVal_HUP3_GW, mbtimeout);
  }





