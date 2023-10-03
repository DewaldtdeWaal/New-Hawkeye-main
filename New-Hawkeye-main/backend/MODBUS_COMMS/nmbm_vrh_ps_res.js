module.exports = {readVal_VRH_R_PS};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.2';
var regStart = 1;//memory word //address
var regNum = 39; // number of words // quantity
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_VRH_R_PS(){
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


        gvar.vrh_del_rl = (parseInt(val[1])/10).toFixed(1);
        gvar.vrh_sc_rl = (parseInt(val[0])/10).toFixed(1);
        gvar.vrh_ut = Date().slice(4,Date().length-41);
   ////////////////////////////////////////////////////////////////////// General Marshal
        var p = parseInt(val[3]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();
        if(m[8]==0)
        {gvar.vrh_g_ps_mode="Automatic"}
        else if(m[8]==1)
        {gvatr.vrh_g_ps_mode="Manual"}
        gvar.vrh_g_main_panel_surge =m[9]
        gvar.vrh_g_main_panel_voltage=m[10]

   /////////////////////////////////////////////////////////////////// Pump 1 Marshal
        var p = parseInt(val[12]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();
        if(m[8]==1){
         gvar.vrh_p1_status = "Running"
        }
       else if(m[9]==1){
        gvar.vrh_p1_status = "Fault Active"
       }
       else if(m[8]==0 && m[9]==0 && (m[12]==1 || m[13]==1)){
         gvar.vrh_p1_status = "Available"
        }
        else if(m[8]==0 && m[9]==0 && (m[12]==0 && m[13]==0)){
         gvar.vrh_p1_status = "Stopped"
        }



        if (m[12] == 1)  {
         gvar.vrh_p1_mode= "Auto"
        }else if(m[13] == 1){
         gvar.vrh_p1_mode = "Manual"
        }else if(m[12] == 0 && m[13] ==0){
         gvar.vrh_p1_mode = "OFF"
        }

        gvar.vrh_p1_estop_fault =m[10]
        gvar.vrh_p1_cb_pump_trip_fault=m[11]

        gvar.vrh_p1_power_on=m[14]
        gvar.vrh_p1_vsd_staus=m[15]

   //////////////////////////////////////////////////////////////////////Pump 2 Marshal
   var p = parseInt(val[22]);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();
   if(m[8]==1){
    gvar.vrh_p2_status = "Running"
   }
   else if(m[9]==1){
   gvar.vrh_p2_status = "Fault Active"
   }
   else if(m[8]==0 && m[9]==0 && (m[12]==1 || m[13]==1)){
    gvar.vrh_p2_status = "Available"
   }
   else if(m[8]==0 && m[9]==0 && (m[12]==0 && m[13]==0)){
    gvar.vrh_p2_status = "Stopped"
   }


   if (m[12] == 1)  {
    gvar.vrh_p2_mode= "Auto"
   }else if(m[13] == 1){
    gvar.vrh_p2_mode = "Manual"
   }else if(m[12] == 0 && m[13] ==0){
    gvar.vrh_p2_mode = "OFF"
   }

   gvar.vrh_p2_estop_fault =m[10]
   gvar.vrh_p2_cb_pump_trip_fault=m[11]
   gvar.vrh_p2_power_on=m[14]
   gvar.vrh_p2_vsd_staus=m[15]
   //////////////////////////////////////////////////////////////////////Pump 3 Marshal
   var p = parseInt(val[32]);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();
   if(m[8]==1){
    gvar.vrh_p3_status = "Running"
   }
   else if(m[9]==1){
   gvar.vrh_p3_status = "Fault Active"
   }
   else if(m[8]==0 && m[9]==0 && (m[12]==1 || m[13]==1)){
    gvar.vrh_p3_status = "Available"
   }
   else if(m[8]==0 && m[9]==0 && (m[12]==0 && m[13]==0)){
    gvar.vrh_p3_status = "Stopped"
   }


   if (m[12] == 1)  {
    gvar.vrh_p3_mode= "Auto"
   }else if(m[13] == 1){
    gvar.vrh_p3_mode = "Manual"
   }else if(m[12] == 0 && m[13] ==0){
    gvar.vrh_p3_mode = "OFF"
   }

   gvar.vrh_p3_estop_fault =m[10]
   gvar.vrh_p3_cb_pump_trip_fault=m[11]
   gvar.vrh_p3_power_on=m[14]
   gvar.vrh_p3_vsd_staus=m[15]
   //////////////////////////////////////////////////////////////////////

   gvar.vrh_p1_kw= val[6]
   gvar.vrh_p2_kw= val[16]
   gvar.vrh_p3_kw= val[26]

   gvar.vrh_p1_rpm= val[5]
   gvar.vrh_p2_rpm= val[15]
   gvar.vrh_p3_rpm= val[25]


   gvar.vrh_p1_rt= val[8]
   gvar.vrh_p2_rt= val[18]
   gvar.vrh_p3_rt= val[28]

   gvar.vrh_p1_a= val[7]
   gvar.vrh_p2_a= val[17]
   gvar.vrh_p3_a= val[27]

   if(gvar.vrh_del_rl!=undefined || gvar.vrh_del_rl!=null){

   var MongoClient = require('mongodb').MongoClient;
   var url= gvar.standardConnectionString;


var firstValue ={
vrh_del_rl:gvar.vrh_del_rl,
vrh_sc_rl:gvar.vrh_sc_rl,
vrh_ut:gvar.vrh_ut,
vrh_g_ps_mode:gvar.vrh_g_ps_mode,
vrh_g_main_panel_surge:gvar.vrh_g_main_panel_surge,
vrh_g_main_panel_voltage:gvar.vrh_g_main_panel_voltage,
vrh_p1_status:gvar.vrh_p1_status,
vrh_p1_mode:gvar.vrh_p1_mode,
vrh_p1_estop_fault:gvar.vrh_p1_estop_fault,
vrh_p1_cb_pump_trip_fault:gvar.vrh_p1_cb_pump_trip_fault,
vrh_p1_power_on:gvar.vrh_p1_power_on,
vrh_p1_vsd_staus:gvar.vrh_p1_vsd_staus,
vrh_p2_status:gvar.vrh_p2_status,
vrh_p2_mode:gvar.vrh_p2_mode,
vrh_p2_estop_fault:gvar.vrh_p2_estop_fault,
vrh_p2_cb_pump_trip_fault:gvar.vrh_p2_cb_pump_trip_fault,
vrh_p2_power_on:gvar.vrh_p2_power_on,
vrh_p2_vsd_staus:gvar.vrh_p2_vsd_staus,
vrh_p3_status:gvar.vrh_p3_status,
vrh_p3_mode:gvar.vrh_p3_mode,
vrh_p3_estop_fault:gvar.vrh_p3_estop_fault,
vrh_p3_cb_pump_trip_fault:gvar.vrh_p3_cb_pump_trip_fault,
vrh_p3_power_on:gvar.vrh_p3_power_on,
vrh_p3_vsd_staus:gvar.vrh_p3_vsd_staus,
vrh_p1_kw:gvar.vrh_p1_kw,
vrh_p2_kw:gvar.vrh_p2_kw,
vrh_p3_kw:gvar.vrh_p3_kw,
vrh_p1_rpm:gvar.vrh_p1_rpm,
vrh_p2_rpm:gvar.vrh_p2_rpm,
vrh_p3_rpm:gvar.vrh_p3_rpm,
vrh_p1_rt:gvar.vrh_p1_rt,
vrh_p2_rt:gvar.vrh_p2_rt,
vrh_p3_rt:gvar.vrh_p3_rt,
vrh_p1_a:gvar.vrh_p1_a,
vrh_p2_a:gvar.vrh_p2_a,
vrh_p3_a:gvar.vrh_p3_a,
id:"nmbm_vrh_ps_r"

}


fun.storeInDB(firstValue,"R_CurrentVals")

   var reservoirTrend={
    vrh_ut:gvar.vrh_ut,
    vrh_del_rl:gvar.vrh_del_rl,
    vrh_sc_rl:gvar.vrh_sc_rl,
    id:"res_overview"

  }

  fun.storeInDB(reservoirTrend,"Res_CurrentVals")

        }

        var psTrend ={
          vrh_ut:gvar.vrh_ut,
          id:"PS_OVERVIEW"
        }

        fun.storeInDB(psTrend,"PUMP_CurrentVals")

         })
         .catch(function() {
          console.log(
            require("util").inspect(arguments, {
              depth: null,

            })
          );
        });
  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});
  setTimeout(readVal_VRH_R_PS, mbtimeout);
  }

