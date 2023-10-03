module.exports = {readVal_CIDZT_FPT};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;

var ip = gvar.mbusIP +'.27';
var regStart = 200;//memory word
var regNum = 10; // number of words
var timeout = 8000;
var mbtimeout=mbRetry
const fun = require('./modbusfunctions')
function readVal_CIDZT_FPT(){
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


        gvar.fpt_cidzt_ut= Date().slice(4,Date().length-41);

        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();


        gvar.fpt_cidzt_surge_arrester_fault = m[0]
        //gvar.fpt_cidzt_charger_fault= m[1]
        gvar.fpt_cidzt_panel_door= m[2]
        gvar.fpt_cidzt_battery= m[3]

        if(m[1]==1)
        {gvar.fpt_cidzt_charger_fault=0
        }
        else
        {gvar.fpt_cidzt_charger_fault=1}


        //Mathew
        if (m[4]==0){
          gvar.fpt_cidzt_idz_fm_s= "OK"
        }else if(m[4]==1){
          gvar.fpt_cidzt_idz_fm_s= "NOT OK"
        }

        if (m[5]==0){
          gvar.fpt_cidzt_mw_fm_s= "OK"
        }else if(m[5]==1){
          gvar.fpt_cidzt_mw_fm_s= "NOT OK"
        }


        gvar.fpt_cidzt_idz_fr= (val[2]/10).toFixed(2)


        gvar.fpt_cidzt_mw_fr =(val[6]/10).toFixed(2)


        var rawData = new ArrayBuffer(36);
        var i = new Uint16Array(rawData);
        var ii  = new Uint32Array(rawData);
        var f = new Float32Array(rawData);
        i[0] = val[4]; //low
        i[1] = val[5]; //high

        i[2] = val[8]; //low
        i[3] = val[9]; //high




        gvar.fpt_cidzt_idz_tf=((ii[0]/10)).toFixed(1)

        gvar.fpt_cidzt_mw_tf= ((ii[1]/10)).toFixed(1)

        if(gvar.fpt_cidzt_panel_door!=undefined || gvar.fpt_cidzt_panel_door!=null){




var firstValue ={
fpt_cidzt_ut:gvar.fpt_cidzt_ut,
fpt_cidzt_surge_arrester_fault:gvar.fpt_cidzt_surge_arrester_fault,
fpt_cidzt_panel_door:gvar.fpt_cidzt_panel_door,
fpt_cidzt_battery:gvar.fpt_cidzt_battery,
fpt_cidzt_charger_fault:gvar.fpt_cidzt_charger_fault,
fpt_cidzt_idz_fm_s:gvar.fpt_cidzt_idz_fm_s,
fpt_cidzt_mw_fm_s:gvar.fpt_cidzt_mw_fm_s,
fpt_cidzt_idz_fr:gvar.fpt_cidzt_idz_fr,
fpt_cidzt_mw_fr:gvar.fpt_cidzt_mw_fr,
fpt_cidzt_idz_tf:gvar.fpt_cidzt_idz_tf,
fpt_cidzt_mw_tf:gvar.fpt_cidzt_mw_tf,


id:"nmbm_cidzt_fpt"





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
  setTimeout(readVal_CIDZT_FPT, mbtimeout);
  }
