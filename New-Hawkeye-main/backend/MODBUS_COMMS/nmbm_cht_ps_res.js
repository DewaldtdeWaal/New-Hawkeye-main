module.exports = {readVal_CHT_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.ChattymbusIP +'.1';
var regStart = 205;//memory word
var regNum = 40; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_CHT_R(){
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

        gvar.cht_nc_rl = fun.checkLevel((parseInt(val[0])).toFixed(1));
        gvar.cht_sc_rl = fun.checkLevel((parseInt(val[1])).toFixed(1));
        gvar.cht_oh_rl = fun.checkLevel((parseInt(val[2])).toFixed(1));
        gvar.cht_ut = Date().slice(4,Date().length-41);

        gvar.cht_fr = (parseInt(val[5]/10)).toFixed(1);
        gvar.cht_tf = (parseInt(val[6]));

        var p = parseInt(val[15]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();
        gvar.cht_R_NC_PF = m[3];
        gvar.cht_R_SC_PF = m[4];
        gvar.cht_R_OH_PF = m[2];
   //ANALOG
        gvar.cht_p1_rt = parseInt(val[20])
        gvar.cht_p1_a =  parseFloat(val[23]/10).toFixed(1)
        gvar.cht_p1_kw = parseFloat(val[25]/10).toFixed(1)
        gvar.cht_p1_rpm = parseInt(val[22])

        gvar.cht_p2_rt = parseInt(val[34])
        gvar.cht_p2_a =  parseFloat(val[37]/10).toFixed(1)
        gvar.cht_p2_kw = parseFloat(val[39]/10).toFixed(1)
        gvar.cht_p2_rpm = parseInt(val[36])
   //
   // Pump Set General
   var p = parseInt(val[16]);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();

   if(m[0]==0){
     gvar.cht_g_ps_mode = "Automatic"
   }
   else if (m[0]==1){
       gvar.cht_g_ps_mode = "Manual"
   }

   gvar.cht_g_panel_surge_arrestor = m[7]
   gvar.cht_g_panel_voltage_okay= m[1]

   //



   // PUMP SET 1 Stat
   var p = parseInt(val[18]);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();


   var available =m[7]
   var running = m[9]
   var fault = m[10]

   var manual = m[13]
   var auto = m[12]

   if (running == 1){
     gvar.cht_p1_status = "Running"
   }
   else if (available==1)
   {
     gvar.cht_p1_status = "Available"
   }
   else if (fault==1)
   {
     gvar.cht_p1_status = "Fault Active"
   }
   else if (running==0 && fault==0 && available==0)
   {
     gvar.cht_p1_status = "Stopped"
   }


   if (auto==1){
     gvar.cht_p1_mode="Automatic"
   }
   else if (manual==1){
     gvar.cht_p1_mode="Manual"
   }
   else if (manual==0 && auto==0){
     gvar.cht_p1_mode="OFF"
   }
   //


   // Pump Set 1 Faults
   var p = parseInt(val[16]);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();

   gvar.cht_p1_no_flow_fault = m[0]
   gvar.cht_p1_estop_fault = m[8]
   gvar.cht_p1_circuit_breaker_fault= m[9]
   gvar.cht_p1_vsd_status= m[10]

   //
   // PUMP SET 2 Stat
   var p = parseInt(val[32]);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();


   var available =m[7]
   var running = m[9]
   var fault = m[10]

   var manual = m[13]
   var auto = m[12]

   if (running == 1){
     gvar.cht_p2_status = "Running"
   }
   else if (available==1)
   {
     gvar.cht_p2_status = "Available"
   }
   else if (fault==1)
   {
     gvar.cht_p2_status = "Fault Active"
   }
   else if (running==0 && fault==0 && available==0)
   {
     gvar.cht_p2_status = "Stopped"
   }


   if (auto==1){
     gvar.cht_p2_mode="Automatic"
   }
   else if (manual==1){
     gvar.cht_p2_mode="Manual"
   }
   else if (manual==0 && auto==0){
     gvar.cht_p2_mode="OFF"
   }

   //


   // Pump Set 2 Faults
   var p = parseInt(val[30]);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();

   gvar.cht_p2_no_flow_fault = m[0]
   gvar.cht_p2_estop_fault = m[8]
   gvar.cht_p2_circuit_breaker_fault= m[9]
   gvar.cht_p2_vsd_status= m[10]

   if(gvar.cht_nc_rl!=undefined || gvar.cht_nc_rl!=null){




var firstValue ={
cht_nc_rl:gvar.cht_nc_rl,
cht_sc_rl:gvar.cht_sc_rl,
cht_oh_rl:gvar.cht_oh_rl,
cht_ut:gvar.cht_ut,
cht_fr:gvar.cht_fr,
cht_tf:gvar.cht_tf,
cht_R_NC_PF:gvar.cht_R_NC_PF,
cht_R_SC_PF:gvar.cht_R_SC_PF,
cht_R_OH_PF:gvar.cht_R_OH_PF,
cht_p1_rt:gvar.cht_p1_rt,
cht_p1_a:gvar.cht_p1_a,
cht_p1_kw:gvar.cht_p1_kw,
cht_p1_rpm:gvar.cht_p1_rpm,
cht_p2_rt:gvar.cht_p2_rt,
cht_p2_a:gvar.cht_p2_a,
cht_p2_kw:gvar.cht_p2_kw,
cht_p2_rpm:gvar.cht_p2_rpm,
cht_g_ps_mode:gvar.cht_g_ps_mode,
cht_g_panel_surge_arrestor:gvar.cht_g_panel_surge_arrestor,
cht_g_panel_voltage_okay:gvar.cht_g_panel_voltage_okay,
cht_p1_status:gvar.cht_p1_status,
cht_p1_mode:gvar.cht_p1_mode,
cht_p1_no_flow_fault:gvar.cht_p1_no_flow_fault,
cht_p1_estop_fault:gvar.cht_p1_estop_fault,
cht_p1_circuit_breaker_fault:gvar.cht_p1_circuit_breaker_fault,
cht_p1_vsd_status:gvar.cht_p1_vsd_status,
cht_p2_status:gvar.cht_p2_status,
cht_p2_mode:gvar.cht_p2_mode,
cht_p2_no_flow_fault:gvar.cht_p2_no_flow_fault,
cht_p2_estop_fault:gvar.cht_p2_estop_fault,
cht_p2_circuit_breaker_fault:gvar.cht_p2_circuit_breaker_fault,
cht_p2_vsd_status:gvar.cht_p2_vsd_status,


id:"nmbm_cht_ps_res"

}
var reservoirTrend={
  cht_ut:gvar.cht_ut,
  cht_nc_rl:gvar.cht_nc_rl,
  cht_sc_rl:gvar.cht_sc_rl,
  cht_oh_rl:gvar.cht_oh_rl,
  id:"res_overview"

}

var psTrend ={
  cht_ut:gvar.cht_ut,
  id:"PS_OVERVIEW"
}

  fun.storeInDB(firstValue,"PS_CurrentVals")

  fun.storeInDB(reservoirTrend,"Res_CurrentVals")

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
  setTimeout(readVal_CHT_R, mbtimeout);
  }
