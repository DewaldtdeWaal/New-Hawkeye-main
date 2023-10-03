module.exports = {readVal_CG_PS};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.30';
var regStart = 200//memory word
var regNum = 35; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_CG_PS(){
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



        gvar.cg_G_UT = Date().slice(4,Date().length-41);
        // ANALOG
        var rawData = new ArrayBuffer(24);
   var i = new Uint16Array(rawData);
   var ii  = new Uint32Array(rawData);

   i[0] = val[19]; //low
   i[1] = val[18]; //high

   i[2] = val[26]; //low
   i[3] = val[25]; //high

   i[4] = val[33]; //low
   i[5] = val[32]; //high


   gvar.cg_P1_RH=parseInt(ii[0])
   gvar.cg_P2_RH=parseInt(ii[1])
   gvar.cg_P3_RH=parseInt(ii[2])


        gvar.cg_G_SUC_PRESS= (val[5]/10).toFixed(1);
        gvar.cg_G_DEL_PRESS= (val[6]/10).toFixed(1);
        gvar.cg_G_SUMP_LVL= (val[7]/10).toFixed(1);

        gvar.cg_T1_LVL= (val[8]/10).toFixed(1);
        gvar.cg_T1_INLET_F= (val[10]/10).toFixed(1);
        gvar.cg_T1_OUTLET_F= (val[11]/10).toFixed(1);

        gvar.cg_T2_LVL= (val[9]/10).toFixed(1);
        gvar.cg_T2_INLET_F= (val[12]/10).toFixed(1);
        gvar.cg_T2_OUTLET_F= (val[13]/10).toFixed(1);

        gvar.cg_P1_SUC_PRESS= (val[14]/10).toFixed(1);
        gvar.cg_P1_DEL_PRESS= (val[15]/10).toFixed(1);
        gvar.cg_P1_VIB= val[16].toFixed(1);
        gvar.cg_P1_POWER= (val[17]/10).toFixed(1);


        gvar.cg_P2_SUC_PRESS= (val[21]/10).toFixed(1);
        gvar.cg_P2_DEL_PRESS= (val[22]/10).toFixed(1);
        gvar.cg_P2_VIB= val[23].toFixed(1);
        gvar.cg_P2_POWER= (val[24]/10).toFixed(1);


        gvar.cg_P3_SUC_PRESS= (val[28]/10).toFixed(1);
        gvar.cg_P3_DEL_PRESS= (val[29]/10).toFixed(1);
        gvar.cg_P3_VIB= val[30].toFixed(1);
        gvar.cg_P3_POWER= (val[31]/10).toFixed(1);




        //MARSHELS
        var p = parseInt(val[0]); //General
        var m = [];
        for (var i=0; i<16; i++) {

            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1;
        }
        m.reverse();
        gvar.cg_G_M_CB_STAT = m[0];
        gvar.cg_G_SP_FAIL = m[1];
        gvar.cg_G_EARTH_FAULT = m[2];
        gvar.cg_G_PS_FLOOD_ALM = m[3];
        gvar.cg_G_SUMP_BYPASS = m[4];
        gvar.cg_G_T_BYPASS = m[5];
        gvar.cg_G_T1_SELECTED = m[6];
        gvar.cg_G_T2_SELECTED = m[7];

   ///////////////////////////////////////////////////////////////////pump 1
        var p = parseInt(val[2]);
        var m = [];
        for (var i=0; i<16; i++) {

            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1;
        }
        m.reverse();
        if(m[2]==1){
         gvar.cg_P1_STAT = "Running"
        }
        else if (m[15]==1) {
          gvar.cg_P1_STAT = "Fault Active"
        }
        else if ((m[2]==0)&& (m[15]==0) &&(m[0]==1)&& m[1]==0) {
         gvar.cg_P1_STAT = "Available"
       }
        else{
         gvar.cg_P1_STAT = "Not Available"
        }

        if(m[0]==1){
         gvar.cg_P1_MODE = "Auto"
        }
        else if(m[1]==1){
         gvar.cg_P1_MODE = "Manual"
        }else{
         gvar.cg_P1_MODE = "OFF"
        }

        //faults
        gvar.cg_P1_TRIP_STAT = m[3];
        gvar.cg_P1_EX_FAULT_STAT = m[4];
        gvar.cg_P1_E_STOP_STAT = m[5];
        gvar.cg_P1_CB_ON_STAT = m[6];
        gvar.cg_P1_LOCKOUT = m[7];
        gvar.cg_P1_S_U_P = m[8];
        gvar.cg_P1_D_O_P = m[9];
        gvar.cg_P1_S_P_S = m[10];
        gvar.cg_P1_D_P_S = m[11];
        gvar.cg_P1_B_T = m[12];
        gvar.cg_P1_V_C_T = m[13];
        gvar.cg_P1_M_W_T = m[14];

   ////////////////////////////////////////////////////////////////// pump 2
       var p = parseInt(val[3]);
       var m = [];
       for (var i=0; i<16; i++) {

           m[i] =  ((p & 0x8000) ? 1 : 0);
           p = p << 1;
       }
       m.reverse();
       if(m[2]==1){
         gvar.cg_P2_STAT = "Running"
        }
        else if (m[15]==1) {
          gvar.cg_P2_STAT = "Fault Active"
        }
        else if ((m[2]==0)&& (m[15]==0) &&(m[0]==1)&& m[1]==0) {
         gvar.cg_P2_STAT = "Available"
       }
        else{
         gvar.cg_P2_STAT = "Not Available"
        }

        if(m[0]==1){
         gvar.cg_P2_MODE = "Auto"
        }
        else if(m[1]==1){
         gvar.cg_P2_MODE = "Manual"
        }
        else{
         gvar.cg_P2_MODE = "OFF"
        }

       //faults
       gvar.cg_P2_TRIP_STAT = m[3];
       gvar.cg_P2_EX_FAULT_STAT = m[4];
       gvar.cg_P2_E_STOP_STAT = m[5];
       gvar.cg_P2_CB_ON_STAT = m[6];
       gvar.cg_P2_LOCKOUT = m[7];
       gvar.cg_P2_S_U_P = m[8];
       gvar.cg_P2_D_O_P = m[9];
       gvar.cg_P2_S_P_S = m[10];
       gvar.cg_P2_D_P_S = m[11];
       gvar.cg_P2_B_T = m[12];
       gvar.cg_P2_V_C_T = m[13];
       gvar.cg_P2_M_W_T = m[14];

   /////////////////////////////////////////////////////// pump 3
      var p = parseInt(val[4]);
      var m = [];
      for (var i=0; i<16; i++) {

          m[i] =  ((p & 0x8000) ? 1 : 0);
          p = p << 1;
      }
      m.reverse();
      if(m[2]==1){
       gvar.cg_P3_STAT = "Running"
      }
      else if (m[15]==1) {
        gvar.cg_P3_STAT = "Fault Active"
      }
      else if ((m[2]==0)&& (m[15]==0) &&(m[0]==1)&& m[1]==0) {
       gvar.cg_P3_STAT = "Available"
     }
      else{
       gvar.cg_P3_STAT = "Not Available"
      }

      if(m[0]==1){
       gvar.cg_P3_MODE = "Auto"
      }
      else if(m[1]==1){
       gvar.cg_P3_MODE = "Manual"
      }else{
       gvar.cg_P3_MODE = "OFF"
      }

      //faults
      gvar.cg_P3_TRIP_STAT = m[3];
      gvar.cg_P3_EX_FAULT_STAT = m[4];
      gvar.cg_P3_E_STOP_STAT = m[5];
      gvar.cg_P3_CB_ON_STAT = m[6];
      gvar.cg_P3_LOCKOUT = m[7];
      gvar.cg_P3_S_U_P = m[8];
      gvar.cg_P3_D_O_P = m[9];
      gvar.cg_P3_S_P_S = m[10];
      gvar.cg_P3_D_P_S = m[11];
      gvar.cg_P3_B_T = m[12];
      gvar.cg_P3_V_C_T = m[13];
      gvar.cg_P3_M_W_T = m[14];
   //////////////////////////////////////////////////////


   if(gvar.cg_P1_RH!=undefined || gvar.cg_P1_RH!=null){
   var MongoClient = require('mongodb').MongoClient;
   var url= gvar.standardConnectionString;


var firstValue ={
cg_G_UT:gvar.cg_G_UT,
cg_P1_RH:gvar.cg_P1_RH,
cg_P2_RH:gvar.cg_P2_RH,
cg_P3_RH:gvar.cg_P3_RH,
cg_G_SUC_PRESS:gvar.cg_G_SUC_PRESS,
cg_G_DEL_PRESS:gvar.cg_G_DEL_PRESS,
cg_G_SUMP_LVL:gvar.cg_G_SUMP_LVL,
cg_T1_LVL:gvar.cg_T1_LVL,
cg_T1_INLET_F:gvar.cg_T1_INLET_F,
cg_T1_OUTLET_F:gvar.cg_T1_OUTLET_F,
cg_T2_LVL:gvar.cg_T2_LVL,
cg_T2_INLET_F:gvar.cg_T2_INLET_F,
cg_T2_OUTLET_F:gvar.cg_T2_OUTLET_F,
cg_P1_SUC_PRESS:gvar.cg_P1_SUC_PRESS,
cg_P1_DEL_PRESS:gvar.cg_P1_DEL_PRESS,
cg_P1_VIB:gvar.cg_P1_VIB,
cg_P1_POWER:gvar.cg_P1_POWER,
cg_P2_SUC_PRESS:gvar.cg_P2_SUC_PRESS,
cg_P2_DEL_PRESS:gvar.cg_P2_DEL_PRESS,
cg_P2_VIB:gvar.cg_P2_VIB,
cg_P2_POWER:gvar.cg_P2_POWER,
cg_P3_SUC_PRESS:gvar.cg_P3_SUC_PRESS,
cg_P3_DEL_PRESS:gvar.cg_P3_DEL_PRESS,
cg_P3_VIB:gvar.cg_P3_VIB,
cg_P3_POWER:gvar.cg_P3_POWER,
cg_G_M_CB_STAT:gvar.cg_G_M_CB_STAT,
cg_G_SP_FAIL:gvar.cg_G_SP_FAIL,
cg_G_EARTH_FAULT:gvar.cg_G_EARTH_FAULT,
cg_G_PS_FLOOD_ALM:gvar.cg_G_PS_FLOOD_ALM,
cg_G_SUMP_BYPASS:gvar.cg_G_SUMP_BYPASS,
cg_G_T_BYPASS:gvar.cg_G_T_BYPASS,
cg_G_T1_SELECTED:gvar.cg_G_T1_SELECTED,
cg_G_T2_SELECTED:gvar.cg_G_T2_SELECTED,
cg_P1_STAT:gvar.cg_P1_STAT,
cg_P1_MODE:gvar.cg_P1_MODE,
cg_P1_TRIP_STAT:gvar.cg_P1_TRIP_STAT,
cg_P1_EX_FAULT_STAT:gvar.cg_P1_EX_FAULT_STAT,
cg_P1_E_STOP_STAT:gvar.cg_P1_E_STOP_STAT,
cg_P1_CB_ON_STAT:gvar.cg_P1_CB_ON_STAT,
cg_P1_LOCKOUT:gvar.cg_P1_LOCKOUT,
cg_P1_S_U_P:gvar.cg_P1_S_U_P,
cg_P1_D_O_P:gvar.cg_P1_D_O_P,
cg_P1_S_P_S:gvar.cg_P1_S_P_S,
cg_P1_D_P_S:gvar.cg_P1_D_P_S,
cg_P1_B_T:gvar.cg_P1_B_T,
cg_P1_V_C_T:gvar.cg_P1_V_C_T,
cg_P1_M_W_T:gvar.cg_P1_M_W_T,
cg_P2_STAT:gvar.cg_P2_STAT,
cg_P2_MODE:gvar.cg_P2_MODE,
cg_P2_TRIP_STAT:gvar.cg_P2_TRIP_STAT,
cg_P2_EX_FAULT_STAT:gvar.cg_P2_EX_FAULT_STAT,
cg_P2_E_STOP_STAT:gvar.cg_P2_E_STOP_STAT,
cg_P2_CB_ON_STAT:gvar.cg_P2_CB_ON_STAT,
cg_P2_LOCKOUT:gvar.cg_P2_LOCKOUT,
cg_P2_S_U_P:gvar.cg_P2_S_U_P,
cg_P2_D_O_P:gvar.cg_P2_D_O_P,
cg_P2_S_P_S:gvar.cg_P2_S_P_S,
cg_P2_D_P_S:gvar.cg_P2_D_P_S,
cg_P2_B_T:gvar.cg_P2_B_T,
cg_P2_V_C_T:gvar.cg_P2_V_C_T,
cg_P2_M_W_T:gvar.cg_P2_M_W_T,
cg_P3_STAT:gvar.cg_P3_STAT,
cg_P3_MODE:gvar.cg_P3_MODE,
cg_P3_TRIP_STAT:gvar.cg_P3_TRIP_STAT,
cg_P3_EX_FAULT_STAT:gvar.cg_P3_EX_FAULT_STAT,
cg_P3_E_STOP_STAT:gvar.cg_P3_E_STOP_STAT,
cg_P3_CB_ON_STAT:gvar.cg_P3_CB_ON_STAT,
cg_P3_LOCKOUT:gvar.cg_P3_LOCKOUT,
cg_P3_S_U_P:gvar.cg_P3_S_U_P,
cg_P3_D_O_P:gvar.cg_P3_D_O_P,
cg_P3_S_P_S:gvar.cg_P3_S_P_S,
cg_P3_D_P_S:gvar.cg_P3_D_P_S,
cg_P3_B_T:gvar.cg_P3_B_T,
cg_P3_V_C_T:gvar.cg_P3_V_C_T,
cg_P3_M_W_T:gvar.cg_P3_M_W_T,
id:"rw_cg_ps"

}


fun.storeInDB(firstValue,"PS_CurrentVals")
  }

  var psTrend ={
    cg_G_UT:gvar.cg_G_UT,
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
  setTimeout(readVal_CG_PS, mbtimeout);
  }


