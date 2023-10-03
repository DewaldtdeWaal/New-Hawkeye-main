module.exports = {readVal_UIT_FC_FPT};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
const fun = require('./modbusfunctions')
var mbCycleTime = 60000;
var mbRetry = 10000;

var ip = gvar.mbusIP +'.32';
var regStart = 200;
var regNum = 7;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_UIT_FC_FPT(){

  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, timeout)
  const options = {
  'host' : ip,
  'port' : 502
  };
  socket.connect(options);
  socket.on("connect", function() {
    client
      .readInputRegisters(regStart,regNum)
      .then(function(resp) {
        var val = (resp.response._body.values);
        socket.end();
        mbtimeout = mbCycleTime;

        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1;
        }
        m.reverse();
        gvar.fpt_uit_fc_surge_arrester_fault=m[0]
        gvar.fpt_uit_fc_charger_fault=m[1]
        gvar.fpt_uit_fc_panel_door=m[2]
        gvar.fpt_uit_fc_battery=m[3]
        gvar.fpt_uit_fc_remote_io_comms=m[4]
        gvar.fpt_uit_fc_flow_switch1=m[5]
        gvar.fpt_uit_fc_flow_switch2=m[6]
        gvar.fpt_uit_fc_pressure_analog_signal=m[7]
        gvar.fpt_uit_fc_flow_meter_comms=m[8]


        gvar.fpt_uit_fc_ut=  Date().slice(4,Date().length-41);
        gvar.fpt_uit_fc_press= (val[2]/100).toFixed(2)
        gvar.fpt_uit_fc_fr= (val[3]/100).toFixed(2)


        var rawData = new ArrayBuffer(36);
        var i = new Uint16Array(rawData);
        var ii  = new Uint32Array(rawData);
        i[0] = val[5]; //low
        i[1] = val[6]; //high



        gvar.fpt_uit_fc_tf=((ii[0]/100)).toFixed(2)


        if(gvar.fpt_uit_fc_surge_arrester_fault!=undefined || gvar.fpt_uit_fc_surge_arrester_fault!=null){


        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
fpt_uit_fc_surge_arrester_fault:gvar.fpt_uit_fc_surge_arrester_fault,
fpt_uit_fc_charger_fault:gvar.fpt_uit_fc_charger_fault,
fpt_uit_fc_panel_door:gvar.fpt_uit_fc_panel_door,
fpt_uit_fc_battery:gvar.fpt_uit_fc_battery,
fpt_uit_fc_remote_io_comms:gvar.fpt_uit_fc_remote_io_comms,
fpt_uit_fc_flow_switch1:gvar.fpt_uit_fc_flow_switch1,
fpt_uit_fc_flow_switch2:gvar.fpt_uit_fc_flow_switch2,
fpt_uit_fc_pressure_analog_signal:gvar.fpt_uit_fc_pressure_analog_signal,
fpt_uit_fc_flow_meter_comms:gvar.fpt_uit_fc_flow_meter_comms,
fpt_uit_fc_ut:gvar.fpt_uit_fc_ut,
fpt_uit_fc_press:gvar.fpt_uit_fc_press,
fpt_uit_fc_fr:gvar.fpt_uit_fc_fr,
fpt_uit_fc_tf:gvar.fpt_uit_fc_tf,
id:"nmbm_uit_fc_fpt"

}


fun.storeInDB(firstValue,"FPT_CurrentVals")

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
  setTimeout(readVal_UIT_FC_FPT, mbtimeout);
  }
