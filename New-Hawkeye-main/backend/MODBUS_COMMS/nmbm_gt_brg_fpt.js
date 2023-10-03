module.exports = {readVal_GT_BRG_FPT};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;

var ip = gvar.mbusIP +'.31';
var regStart = 200;//memory word
var regNum = 12; // number of words
var timeout = 8000;
var mbtimeout=mbRetry
const fun = require('./modbusfunctions')
function readVal_GT_BRG_FPT(){
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

        gvar.fpt_gt_brg_ut= Date().slice(4,Date().length-41);

        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();

        gvar.fpt_gt_brg_panel_door= m[0]
        gvar.fpt_gt_brg_battery= m[1]
        gvar.fpt_gt_brg_steal_p_press_analog_s= m[2]
        gvar.fpt_gt_brg_soco_p_press_analog_s= m[3]
        gvar.fpt_gt_brg_fm_stl_p_comms_s= m[4]
        gvar.fpt_gt_brg_fm_soco_p_comms_s= m[5]
        gvar.fpt_gt_brg_stl_p_press=(val[2]/100).toFixed(2)
        gvar.fpt_gt_brg_soco_p_press=(val[3]/100).toFixed(2)
        gvar.fpt_gt_brg_stl_p_fr=(val[4]/100).toFixed(2)
        gvar.fpt_gt_brg_soco_p_fr=(val[8]/100).toFixed(2)




        var rawData = new ArrayBuffer(36);
        var i = new Uint16Array(rawData);
        var ii  = new Uint32Array(rawData);
        var f = new Float32Array(rawData);
        i[0] = val[6]; //low
        i[1] = val[7]; //high

        i[2] = val[10]; //low
        i[3] = val[11]; //high

        gvar.fpt_gt_brg_stl_p_tf=((ii[0]/10)).toFixed(1)
        gvar.fpt_gt_brg_soco_p_tf= ((ii[1]/10)).toFixed(1)

         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });

        if(gvar.fpt_gt_brg_panel_door!=undefined || gvar.fpt_gt_brg_panel_door!=null){

        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
fpt_gt_brg_ut:gvar.fpt_gt_brg_ut,
fpt_gt_brg_panel_door:gvar.fpt_gt_brg_panel_door,
fpt_gt_brg_battery:gvar.fpt_gt_brg_battery,
fpt_gt_brg_steal_p_press_analog_s:gvar.fpt_gt_brg_steal_p_press_analog_s,
fpt_gt_brg_soco_p_press_analog_s:gvar.fpt_gt_brg_soco_p_press_analog_s,
fpt_gt_brg_fm_stl_p_comms_s:gvar.fpt_gt_brg_fm_stl_p_comms_s,
fpt_gt_brg_fm_soco_p_comms_s:gvar.fpt_gt_brg_fm_soco_p_comms_s,
fpt_gt_brg_stl_p_press:gvar.fpt_gt_brg_stl_p_press,
fpt_gt_brg_stl_p_fr:gvar.fpt_gt_brg_stl_p_fr,
fpt_gt_brg_soco_p_fr:gvar.fpt_gt_brg_soco_p_fr,
fpt_gt_brg_stl_p_tf:gvar.fpt_gt_brg_stl_p_tf,
fpt_gt_brg_soco_p_tf:gvar.fpt_gt_brg_soco_p_tf,
fpt_gt_brg_soco_p_press:gvar.fpt_gt_brg_soco_p_press,
id:"nmbm_gt_brg_fpt"





}


fun.storeInDB(firstValue,"FPT_CurrentVals")




      }
  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});
  setTimeout(readVal_GT_BRG_FPT, mbtimeout);
  }
