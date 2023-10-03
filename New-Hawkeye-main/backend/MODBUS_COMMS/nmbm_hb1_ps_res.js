module.exports = {readVal_HB_PS_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.25';
var regStart = 700;
var regNum = 18;
var timeout = 8000;
var mbtimeout=mbRetry


function readVal_HB_PS_R(){
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


        var rawData = new ArrayBuffer(4);
        var i = new Uint16Array(rawData);
        var f = new Float32Array(rawData);

        i[0] = val[0]
        i[1] = val[1]

        gvar.hb_R_LVL =  fun.checkLevel(parseFloat(f[0].toFixed(1)));





        console.log("gvar.hb_R_LVL");
        console.log(gvar.hb_R_LVL);
        console.log("gvar.hb_R_LVL");


        gvar.hb_R_UT = Date().slice(4,Date().length-41);


        var p1 = parseInt(val[3]);
        var m1 = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m1[i] =  ((p1 & 0x8000) ? 1 : 0);
            p1 = p1 << 1; // divide by two and keep as an integer
        }
        m1.reverse();


        var p2 = parseInt(val[4]);
        var m2 = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m2[i] =  ((p2 & 0x8000) ? 1 : 0);
            p2 = p2 << 1; // divide by two and keep as an integer
        }
        m2.reverse();


        var p3 = parseInt(val[2]);
        var m3 = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m3[i] =  ((p3 & 0x8000) ? 1 : 0);
            p3 = p3 << 1; // divide by two and keep as an integer
        }
        m3.reverse();


        console.log("m3[0]")
        console.log(m3[0])
        console.log("m3[0]")

   //p1
        if(m3[0]==1)
        {
         gvar.hb_P1_STATUS = "Running"
        }
        else if (m1[11]== 1)
        gvar.hb_P1_STATUS = "Available"

        else if (m2[1]== 1)
        gvar.hb_P1_STATUS = "Fault Active"

        else if (m2[1]== 0 || m1[11]== 0 || m3[0]==0)
        gvar.hb_P1_STATUS = "Not Available"


        if(m1[0]==1)
        {
         gvar.hb_P1_MODE = "Auto"
        }
        else
        gvar.hb_P1_MODE = "Off/Manual"



   // p2
        if(m3[1]==1)
        {
         gvar.hb_P2_STATUS = "Running"
        }
        else if (m1[12]== 1)
        gvar.hb_P2_STATUS = "Available"

        else if (m2[2]== 1)
        gvar.hb_P2_STATUS = "Fault Active"

        else if (m2[2]== 0 || m1[12]== 0 || m3[1]==0)
        gvar.hb_P2_STATUS = "Not Available"


        if(m1[1]==1)
        {
         gvar.hb_P2_MODE = "Auto"
        }
        else
        gvar.hb_P2_MODE = "Off/Manual"



   // p3
        if(m3[2]==1)
        {
         gvar.hb_P3_STATUS = "Running"
        }
        else if (m1[13]== 1)
        gvar.hb_P3_STATUS = "Available"

        else if (m2[3]== 1)
        gvar.hb_P3_STATUS = "Fault Active"

        else if (m2[3]== 0 || m1[13]== 0 || m3[1]==0)
        gvar.hb_P3_STATUS = "Not Available"


        if(m1[2]==1)
        {
         gvar.hb_P3_MODE = "Auto"
        }
        else
        gvar.hb_P3_MODE = "Off/Manual"


       //  gvar.hb_P1_MODE

         gvar.hb_P1_PUMP_CB_TRIP_FAULT= m2[8]
         gvar.hb_P2_PUMP_CB_TRIP_FAULT= m2[9]
         gvar.hb_P3_PUMP_CB_TRIP_FAULT= m2[10]

         gvar.hb_P1_STARTUP_FAULT = m1[14]
         gvar.hb_P2_STARTUP_FAULT = m1[15]
         gvar.hb_P3_STARTUP_FAULT = m2[0]

         gvar.hb_P1_ESTOP_FAULT= m1[3]
         gvar.hb_P2_ESTOP_FAULT= m1[4]
         gvar.hb_P3_ESTOP_FAULT= m1[5]

         gvar.hb_P1_NO_FLOW_FAULT = m1[6]
         gvar.hb_P2_NO_FLOW_FAULT = m1[7]
         gvar.hb_P3_NO_FLOW_FAULT = m1[8]


         var rawData = new ArrayBuffer(36);
         var j = new Uint16Array(rawData);
         var ff = new Float32Array(rawData);

         j[0] = val[6]
         j[1] = val[7]

         j[2] = val[8]
         j[3] = val[9]

         j[4] = val[10]
         j[5] = val[11]

         j[6] = val[12]
         j[7] = val[13]

         j[8] = val[14]
         j[9] = val[15]

         j[10] = val[16]
         j[11] = val[17]







         gvar.hb_P1_RH  =  parseFloat(ff[3].toFixed(0));
         gvar.hb_P2_RH = parseFloat(ff[4].toFixed(0));
         gvar.hb_P3_RH = parseFloat(ff[5].toFixed(0));

         gvar.hb_P1_CURRENT  = parseFloat(ff[0].toFixed(1));
         gvar.hb_P2_CURRENT  = parseFloat(ff[1].toFixed(1));
         gvar.hb_P3_CURRENT  = parseFloat(ff[2].toFixed(1));



         if(gvar.hb_R_LVL!=undefined || gvar.hb_R_LVL!=null){




 var firstValue ={
 hb_R_LVL:gvar.hb_R_LVL,
 hb_R_UT:gvar.hb_R_UT,
 hb_P1_STATUS:gvar.hb_P1_STATUS,
 hb_P1_MODE:gvar.hb_P1_MODE,
 hb_P2_STATUS:gvar.hb_P2_STATUS,
 hb_P2_MODE:gvar.hb_P2_MODE,
 hb_P3_STATUS:gvar.hb_P3_STATUS,
 hb_P3_MODE:gvar.hb_P3_MODE,
 hb_P1_PUMP_CB_TRIP_FAULT:gvar.hb_P1_PUMP_CB_TRIP_FAULT,
 hb_P2_PUMP_CB_TRIP_FAULT:gvar.hb_P2_PUMP_CB_TRIP_FAULT,
 hb_P3_PUMP_CB_TRIP_FAULT:gvar.hb_P3_PUMP_CB_TRIP_FAULT,
 hb_P1_STARTUP_FAULT:gvar.hb_P1_STARTUP_FAULT,
 hb_P2_STARTUP_FAULT:gvar.hb_P2_STARTUP_FAULT,
 hb_P3_STARTUP_FAULT:gvar.hb_P3_STARTUP_FAULT,
 hb_P1_ESTOP_FAULT:gvar.hb_P1_ESTOP_FAULT,
 hb_P2_ESTOP_FAULT:gvar.hb_P2_ESTOP_FAULT,
 hb_P3_ESTOP_FAULT:gvar.hb_P3_ESTOP_FAULT,
 hb_P1_NO_FLOW_FAULT:gvar.hb_P1_NO_FLOW_FAULT,
 hb_P2_NO_FLOW_FAULT:gvar.hb_P2_NO_FLOW_FAULT,
 hb_P3_NO_FLOW_FAULT:gvar.hb_P3_NO_FLOW_FAULT,
 hb_P1_RH:gvar.hb_P1_RH,
hb_P2_RH:gvar.hb_P2_RH,
hb_P3_RH:gvar.hb_P3_RH,
hb_P1_CURRENT:gvar.hb_P1_CURRENT,
hb_P2_CURRENT:gvar.hb_P2_CURRENT,
hb_P3_CURRENT:gvar.hb_P3_CURRENT,
 id:"heaterbank_pump"

 }


 fun.storeInDB(firstValue,"PS_CurrentVals")


         var reservoirTrend={
          hb_R_UT:gvar.hb_R_UT,
          hb_R_LVL:gvar.hb_R_LVL,
          id:"res_overview"

        }



        fun.storeInDB(reservoirTrend,"Res_CurrentVals")
              }

              var psTrend ={
                hb_R_UT:gvar.hb_R_UT,
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

  setTimeout(readVal_HB_PS_R, mbtimeout);
  }
