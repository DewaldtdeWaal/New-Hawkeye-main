module.exports = {readVal_VW_PS};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.26';
var regStart = 200;//memory word
var regNum = 20; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_VW_PS(){
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



        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();
        gvar.vw_g_sa_fault=m[0]
        gvar.vw_g_charger_fault=m[1]
        gvar.vw_g_sps_fault=m[2]
        gvar.vw_g_dps_fault=m[3]
        gvar.vw_g_fm_fault=m[4]
        gvar.vw_g_pm_fault=m[5]
        gvar.vw_g_vm_fault=m[12]

        gvar.vw_p1_vsd_comms_fault=m[6]
        gvar.vw_p1_vsd_fault=m[9]
        gvar.vw_p1_estop_fault=m[10]
        gvar.vw_p1_no_flow_fault=m[11]
        gvar.vw_p1_startup_fault=m[14]
        gvar.vw_p1_low_suc_press_fault=m[15]

        var a = parseInt(val[1]);
        var b = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            b[i] =  ((a & 0x8000) ? 1 : 0);
            a = a << 1; // divide by two and keep as an integer
        }
        b.reverse();
        gvar.vw_p1_high_del_press_fault=b[0]

        if(m[7]==1){gvar.vw_p1_mode="Auto"}
        else if(m[8]==1){gvar.vw_p1_mode="Manual"}
        else if(m[8]==0||m[7]==0){gvar.vw_p1_mode="OFF"}


        if(m[13]==1){gvar.vw_p1_stat="Running"}
        else if(m[7]==1||m[8]==1&&m[13]==0){gvar.vw_p1_stat="Available"}
        else if(
         gvar.vw_p1_vsd_comms_fault==1||
         gvar.vw_p1_vsd_fault==1||
         gvar.vw_p1_estop_fault==1||
         gvar.vw_p1_no_flow_fault==1||
         gvar.vw_p1_startup_fault==1||
         gvar.vw_p1_low_suc_press_fault==1||
         gvar.vw_p1_high_del_press_fault==1)
         {gvar.vw_p1_stat="Fault Active"}
        else if(m[7]==0||m[8]==0 && m[13]==0){gvar.vw_p1_stat="Unavailable"}


        gvar.vw_p1_sp=(val[2]/10).toFixed(1)
        gvar.vw_p1_dp=(val[3]/10).toFixed(1)
        gvar.vw_p1_current=(val[4]/10).toFixed(1)
        gvar.vw_p1_speed=val[5]
        gvar.vw_p1_power=(val[6]/10).toFixed(1)
        gvar.vw_p1_fr=(val[10]/100).toFixed(1)


        var rawData = new ArrayBuffer(16);
        var i = new Uint16Array(rawData);
        var ii  = new Uint32Array(rawData);


        i[0] = val[8]; //low
        i[1] = val[9]; //high

        i[2] = val[11]; //low
        i[3] = val[12]; //high

        gvar.vw_p1_rh=parseInt(ii[0].toFixed(0))
        gvar.vw_p1_tf=parseInt((ii[1]/10).toFixed(0))


        gvar.vw_ut = Date().slice(4,Date().length-41);

        if(gvar.vw_g_sa_fault!=undefined || gvar.vw_g_sa_fault!=null){
        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
vw_g_sa_fault:gvar.vw_g_sa_fault,
vw_g_charger_fault:gvar.vw_g_charger_fault,
vw_g_sps_fault:gvar.vw_g_sps_fault,
vw_g_dps_fault:gvar.vw_g_dps_fault,
vw_g_fm_fault:gvar.vw_g_fm_fault,
vw_g_pm_fault:gvar.vw_g_pm_fault,
vw_g_vm_fault:gvar.vw_g_vm_fault,
vw_p1_vsd_comms_fault:gvar.vw_p1_vsd_comms_fault,
vw_p1_vsd_fault:gvar.vw_p1_vsd_fault,
vw_p1_estop_fault:gvar.vw_p1_estop_fault,
vw_p1_no_flow_fault:gvar.vw_p1_no_flow_fault,
vw_p1_startup_fault:gvar.vw_p1_startup_fault,
vw_p1_low_suc_press_fault:gvar.vw_p1_low_suc_press_fault,
vw_p1_mode:gvar.vw_p1_mode,
vw_p1_high_del_press_fault:gvar.vw_p1_high_del_press_fault,
vw_p1_stat:gvar.vw_p1_stat,
vw_p1_sp:gvar.vw_p1_sp,
vw_p1_dp:gvar.vw_p1_dp,
vw_p1_current:gvar.vw_p1_current,
vw_p1_speed:gvar.vw_p1_speed,
vw_p1_power:gvar.vw_p1_power,
vw_p1_fr:gvar.vw_p1_fr,
vw_p1_rh:gvar.vw_p1_rh,
vw_p1_tf:gvar.vw_p1_tf,
vw_ut:gvar.vw_ut,

id:"nmbm_vw_ps"

}


fun.storeInDB(firstValue,"PS_CurrentVals")
      }
      var psTrend ={
        vw_ut:gvar.vw_ut,
        id:"PS_OVERVIEW"
      }

      fun.storeInDB(psTrend,"PUMP_CurrentVals")
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

  setTimeout(readVal_VW_PS, mbtimeout);
  }
