module.exports = {readVal_NMU_EFF_PS};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;

var ip = gvar.mbusIP +'.33';
var regStart = 0;//memory word //address
var regNum = 38; // number of words // quantity
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_NMU_EFF_PS(){
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


        gvar.nmu_eff_ps_ut = Date().slice(4,Date().length-41);
   ////////////////////////////////////////////////////////////////////// General
   var temp = swap16(val[0])
   var p = parseInt(temp);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();

gvar.nmu_eff_ps_flood_alarm=m[0]

   gvar.nmu_eff_ps_fr=(val[11]/10).toFixed(1)
   gvar.nmu_eff_ps_tnf=(val[12]/10).toFixed(1)
   gvar.nmu_eff_ps_del_press=(val[13]/10).toFixed(1)
   gvar.nmu_eff_ps_dam_lvl=(val[14]/10).toFixed(1)
   ////////////////////////////////////////////////////////////////////// pump 1
var temp = swap16(val[20]) // Byte swap
   var p = parseInt(temp);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();

   if(m[0]==1 || m[1]==1 || m[2]==1 || m[3]==1 || m[6]==1){
    gvar.nmu_eff_p1_fault=1
   }
   else{
    gvar.nmu_eff_p1_fault=0
   }

//
   if(m[5]==1){
  gvar.nmu_eff_p1_status="Running"
   }
   else if(gvar.nmu_eff_p1_fault==1){
  gvar.nmu_eff_p1_status="Fault Active"
   }
   else if(  m[4]==1 ){
       gvar.nmu_eff_p1_status="Available"
  }
  else if( m[5]==0 &&  gvar.nmu_eff_p1_fault==0){
       gvar.nmu_eff_p1_status="Not Available"
  }


//
     if(m[7]==1){
      gvar.nmu_eff_p1_mode="Auto"
     }
     else if(m[8]==1){
      gvar.nmu_eff_p1_mode="Manual"
     }
     else if (m[7]==0 && m[8]==0)
     {
      gvar.nmu_eff_p1_mode="OFF"
     }



      gvar.nmu_eff_p1_rh=val[21]
      gvar.nmu_eff_p1_speed=(val[22]/10).toFixed(1)
/////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////// pump 2
   var temp = swap16(val[25]) // Byte swap
   var p = parseInt(temp);
   var m = [];
   for (var i=0; i<16; i++) {
       // test top bit and set corresponding payload
       m[i] =  ((p & 0x8000) ? 1 : 0);
       p = p << 1; // divide by two and keep as an integer
   }
   m.reverse();

   if(m[0]==1 || m[1]==1 || m[2]==1 || m[3]==1 || m[6]==1){
    gvar.nmu_eff_p2_fault=1
   }
   else{
    gvar.nmu_eff_p2_fault=0
   }

//
   if(m[5]==1){
  gvar.nmu_eff_p2_status="Running"
   }
   else if(gvar.nmu_eff_p2_fault==1){
  gvar.nmu_eff_p2_status="Fault Active"
   }
   else if( m[4]==1){
       gvar.nmu_eff_p2_status="Available"
  }
  else if( (m[5]==0 && gvar.nmu_eff_p2_fault==0)){
       gvar.nmu_eff_p2_status="Not Available"
  }

//
     if(m[7]==1){
      gvar.nmu_eff_p2_mode="Auto"
     }
     else if(m[8]==1){
      gvar.nmu_eff_p2_mode="Manual"
     }
     else if (m[7]==0 && m[8]==0)
     {
      gvar.nmu_eff_p2_mode="OFF"
     }



      gvar.nmu_eff_p2_rh=val[26]
      gvar.nmu_eff_p2_speed=(val[27]/10).toFixed(1)
/////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////// pump 3

 var temp = swap16(val[30]) // Byte swap
 var p = parseInt(temp);
 var m = [];
 for (var i=0; i<16; i++) {
     // test top bit and set corresponding payload
     m[i] =  ((p & 0x8000) ? 1 : 0);
     p = p << 1; // divide by two and keep as an integer
 }
 m.reverse();

 if(m[0]==1 || m[1]==1 || m[2]==1 || m[3]==1 || m[6]==1){
  gvar.nmu_eff_p3_fault=1
 }
 else{
  gvar.nmu_eff_p3_fault=0
 }

//
 if(m[5]==1){
gvar.nmu_eff_p3_status="Running"
 }
 else if(gvar.nmu_eff_p3_fault==1){
gvar.nmu_eff_p3_status="Fault Active"
 }
 else if(  m[4]==1 ){
     gvar.nmu_eff_p3_status="Available"
}
else if( (m[5]==0 && gvar.nmu_eff_p3_fault==0) ){
     gvar.nmu_eff_p3_status="Not Available"
}

//
   if(m[7]==1){
    gvar.nmu_eff_p3_mode="Auto"
   }
   else if(m[8]==1){
    gvar.nmu_eff_p3_mode="Manual"
   }
   else if (m[7]==0 && m[8]==0)
   {
    gvar.nmu_eff_p3_mode="OFF"
   }



    gvar.nmu_eff_p3_rh=val[31]
    gvar.nmu_eff_p3_speed=(val[32]/10).toFixed(1)
/////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////// pump 4 Jockey Pump

 var temp = swap16(val[35]) // Byte swap
 var p = parseInt(temp);
 var m = [];
 for (var i=0; i<16; i++) {
     // test top bit and set corresponding payload
     m[i] =  ((p & 0x8000) ? 1 : 0);
     p = p << 1; // divide by two and keep as an integer
 }
 m.reverse();

 if(m[0]==1 || m[1]==1 || m[2]==1 || m[3]==1 || m[6]==1){
  gvar.nmu_eff_p4_fault=1
 }
 else{
  gvar.nmu_eff_p4_fault=0
 }

//
 if(m[5]==1){
gvar.nmu_eff_p4_status="Running"
 }
 else if(gvar.nmu_eff_p4_fault==1){
gvar.nmu_eff_p4_status="Fault Active"
 }
 else if(  m[4]==1 ){
     gvar.nmu_eff_p4_status="Available"
}
else if( (m[5]==0 && gvar.nmu_eff_p4_fault==0) ){
     gvar.nmu_eff_p4_status="Not Available"
}

//
   if(m[7]==1){
    gvar.nmu_eff_p4_mode="Auto"
   }
   else if(m[8]==1){
    gvar.nmu_eff_p4_mode="Manual"
   }
   else if (m[7]==0 && m[8]==0)
   {
    gvar.nmu_eff_p4_mode="OFF"
   }



    gvar.nmu_eff_p4_rh=val[36]
    gvar.nmu_eff_p4_speed=(val[37]/10).toFixed(1)


    if(gvar.nmu_eff_ps_flood_alarm!=undefined || gvar.nmu_eff_ps_flood_alarm!=null){




var firstValue ={
nmu_eff_ps_ut:gvar.nmu_eff_ps_ut,
nmu_eff_ps_flood_alarm:gvar.nmu_eff_ps_flood_alarm,
nmu_eff_ps_fr:gvar.nmu_eff_ps_fr,
nmu_eff_ps_tnf:gvar.nmu_eff_ps_tnf,
nmu_eff_ps_del_press:gvar.nmu_eff_ps_del_press,
nmu_eff_ps_dam_lvl:gvar.nmu_eff_ps_dam_lvl,
nmu_eff_p1_fault:gvar.nmu_eff_p1_fault,
nmu_eff_p1_status:gvar.nmu_eff_p1_status,
nmu_eff_p1_mode:gvar.nmu_eff_p1_mode,
nmu_eff_p1_rh:gvar.nmu_eff_p1_rh,
nmu_eff_p1_speed:gvar.nmu_eff_p1_speed,
nmu_eff_p2_fault:gvar.nmu_eff_p2_fault,
nmu_eff_p2_status:gvar.nmu_eff_p2_status,
nmu_eff_p2_mode:gvar.nmu_eff_p2_mode,
nmu_eff_p2_rh:gvar.nmu_eff_p2_rh,
nmu_eff_p2_speed:gvar.nmu_eff_p2_speed,
nmu_eff_p3_fault:gvar.nmu_eff_p3_fault,
nmu_eff_p3_status:gvar.nmu_eff_p3_status,
nmu_eff_p3_mode:gvar.nmu_eff_p3_mode,
nmu_eff_p3_rh:gvar.nmu_eff_p3_rh,
nmu_eff_p3_speed:gvar.nmu_eff_p3_speed,
nmu_eff_p4_fault:gvar.nmu_eff_p4_fault,
nmu_eff_p4_status:gvar.nmu_eff_p4_status,
nmu_eff_p4_mode:gvar.nmu_eff_p4_mode,
nmu_eff_p4_rh:gvar.nmu_eff_p4_rh,
nmu_eff_p4_speed:gvar.nmu_eff_p4_speed,
id:"nmbm_nmu_eff_ps"

}

fun.storeInDB(firstValue,"PS_CurrentVals")
    var psTrend ={
      nmu_eff_ps_ut:gvar.nmu_eff_ps_ut,
      id:"PS_OVERVIEW"
    }

    fun.storeInDB(psTrend,"PUMP_CurrentVals")
  }
/////////////////////////////////////////////////////////////

         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null,

            })
          );
        });
  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});
  setTimeout(readVal_NMU_EFF_PS, mbtimeout);
  }


function swap16(val) {
    return ((val & 0xFF) << 8)
           | ((val >> 8) & 0xFF);
}


