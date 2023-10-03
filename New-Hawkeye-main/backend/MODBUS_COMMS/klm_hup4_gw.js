//Serves as a basic template for all future sites.

module.exports = {readVal_HUP4_GW};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.43';
//Memoryword(MW) you start at
var regStart = 200;
//Amount of Memorywords you have
var regNum = 22;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_HUP4_GW(){
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

  gvar.hup4_voltage=m[0]
  gvar.hup4_battery=m[1]
  gvar.hup4_charge=m[2]
  gvar.hup4_fault=m[3]
  gvar.hup4_24_timer=m[4]
  gvar.hup4_borehole_level_pr_fault=m[5]
  gvar.hup4_stop_level=m[6]
  gvar.hup4_no_flow_fault=m[7]
  if(m[8]==1){
    gvar.hup4_mode="Auto"
  }
  else if(m[9]==1){
    gvar.hup4_mode="Manual"
  }
  else{
    gvar.hup4_mode="Off"
  }
  if(m[4]==1){
    gvar.hup4_pump_timer="Pump Run"
    }
    else{
    gvar.hup4_pump_timer="Pump Rest"
    }


   if(m[12]==1|| m[13]==1|| m[14]==1|| m[15]==1){
      gvar.hup4_pump_mode="Pump Fault"
    }
 else if(m[11]==1){
    gvar.hup4_pump_mode="Pump Running"
  }
  else if(m[10]==1){
    gvar.hup4_pump_mode="Pump Available"
  }

  else if(m[6]==1){
  gvar.hup4_pump_mode="Not Available"


  }
  else{
    gvar.hup4_pump_mode="Not Available"
  }

gvar.hup4_trip_fault=m[12]
gvar.hup4_estop_active=m[13]
gvar.hup4_pump_general_fault=m[14]
gvar.hup4_pump_suf=m[15]
gvar.hup4_ut = Date().slice(4,Date().length-41);
gvar.hup4_borehole_lvl  = (val[2]/10).toFixed(1);
gvar.hup4_flow_rate   = (val[3]/10).toFixed(1);
var rawData = new ArrayBuffer(4);
var k = new Uint16Array(rawData);
var kk  = new Uint32Array(rawData);

gvar.klm_hup4_num_o_stops = val[8]
k[0]=val[4]
k[1]=val[5]
gvar.hup4_total_flow=(parseInt(kk[0].toFixed(0)));

var rawData = new ArrayBuffer(4);
var c = new Uint16Array(rawData);
var cc  = new Uint32Array(rawData);

c[0]=val[6]
c[1]=val[7]
gvar.hup4_run_hours= (parseInt(cc[0].toFixed(0)));
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


    if(gvar.hup4_voltage!=undefined || gvar.hup4_voltage!=null){



    var firstValue={
        hup4_ut:gvar.hup4_ut,
        hup4_voltage:gvar.hup4_voltage,
        hup4_battery:gvar.hup4_battery,
        hup4_charge:gvar.hup4_charge,
        hup4_fault:gvar.hup4_fault,
        hup4_24_timer:gvar.hup4_24_timer,
        hup4_borehole_level_pr_fault:gvar.hup4_borehole_level_pr_fault,
        hup4_stop_level:gvar.hup4_stop_level,
        hup4_no_flow_fault:gvar.hup4_no_flow_fault,
        hup4_mode:gvar.hup4_mode,
        hup4_pump_mode:gvar.hup4_pump_mode,
        hup4_trip_fault:gvar.hup4_trip_fault,
        hup4_estop_active:gvar.hup4_estop_active,
        hup4_pump_general_fault:gvar.hup4_pump_general_fault,
        hup4_pump_suf:gvar.hup4_pump_suf,
        hup4_borehole_lvl :gvar.hup4_borehole_lvl ,
        hup4_flow_rate  :gvar.hup4_flow_rate  ,
        hup4_total_flow:gvar.hup4_total_flow,
        hup4_pump_timer:gvar.hup4_pump_timer,
        hup4_run_hours:gvar.hup4_run_hours,
        id:"klm_hup4_gw",
        klm_hup4_num_o_stops:gvar.klm_hup4_num_o_stops
    };



    fun.storeInDB(firstValue,"GRDW_CurrentVals")
  }
             })

//Make sure this matches the method Name
  setTimeout(readVal_HUP4_GW, mbtimeout);
  }





