module.exports = {readVal_TC_PS_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.23';
var regStart = 6;
var regNum = 11;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_TC_PS_R(){
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


        gvar.tc_R_LVL = fun.checkLevel((val[10]/100).toFixed(1));
        gvar.tc_R_UT = Date().slice(4,Date().length-41);

        var p = parseInt(val[9]); //pump set2
        var l = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            l[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        l.reverse();
        gvar.tc_R_HIGH_FLOAT = l[8];
        gvar.tc_R_LOW_FLOAT = l[9];

        if(l[1] == 1)
        gvar.tc_P3_POWER = "On";
        else if(l[1]==0)
        {gvar.tc_P3_POWER = "Off"}

        if (l[2]==1)
        {gvar.tc_P3_MODE = "Remote"}
        else if(l[3]==1)
        {gvar.tc_P3_MODE = "Auto"}
        else if(l[3]==0 && l[2]==0)
        {gvar.tc_P3_MODE = "Off/Manual"}

        gvar.tc_P3_PUMP_TRIP_FAULT = l[5]
        gvar.tc_P3_ESTOP_FAULT = l[0]
        gvar.tc_P3_EARTH_FAULT = l[6]

        gvar.tc_P3_RH = val[2];
        gvar.tc_P3_PRESS_DIFF = (val[5]/1000).toFixed(2);

        gvar.tc_PS_UT= Date().slice(4,Date().length-41);
        gvar.tc_G_SP= (val[6]/1000).toFixed(2);


        var p = parseInt(val[8]); //pump set1
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();
        if(m[1] == 1)
        gvar.tc_P1_POWER = "On";
        else if(m[1]==0)
        {gvar.tc_P1_POWER = "Off"}

        if (m[2]==1)
        {gvar.tc_P1_MODE = "Remote"}
        else if(m[3]==1)
        {gvar.tc_P1_MODE = "Auto"}
        else if(m[3]==0 && m[2]==0)
        {gvar.tc_P1_MODE = "Off/Manual"}
        gvar.tc_P1_RH = val[0];
        gvar.tc_P1_PRESS_DIFF = (val[3]/1000).toFixed(2);
        gvar.tc_P1_PUMP_TRIP_FAULT = m[5]
        gvar.tc_P1_ESTOP_FAULT = m[0]
        gvar.tc_P1_EARTH_FAULT = m[6]

        if(m[9] == 1)
        gvar.tc_P2_POWER = "On";
        else if(m[9]==0)
        {gvar.tc_P2_POWER = "Off"}

        if (m[10]==1)
        {gvar.tc_P2_MODE = "Remote"}
        else if(m[11]==1)
        {gvar.tc_P2_MODE = "Auto"}
        else if(m[10]==0 && m[11]==0)
        {gvar.tc_P2_MODE = "Off/Manual"}

        gvar.tc_P2_RH = val[1];
        gvar.tc_P2_PRESS_DIFF = (val[4]/1000).toFixed(2);
        gvar.tc_P2_PUMP_TRIP_FAULT = m[13]
        gvar.tc_P2_ESTOP_FAULT = m[8]
        gvar.tc_P2_EARTH_FAULT = m[14]

        var z = parseInt(val[7]); //pump set3
        var i = [];
        for (var q=0; q<16; q++) {
            // test top bit and set corresponding payload
            i[q] =  ((z & 0x8000) ? 1 : 0);
            z = z << 1; // divide by two and keep as an integer
        }
        i.reverse();

        if(m[4]==1)
        {gvar.tc_P1_STATUS= "Running"}
        else if(i[0]==1)
        {gvar.tc_P1_STATUS= "Available"}
        else if(i[3]==1)
        {gvar.tc_P1_STATUS= "Fault Active"}
        else if(m[4]==0 && i[0]==0 && i[3]==0)
        {gvar.tc_P1_STATUS= "Not Available"
        }



        if(m[12]==1)
        {gvar.tc_P2_STATUS= "Running"}
        else if(i[1]==1)
        {gvar.tc_P2_STATUS= "Available"}
        else if(i[4]==1)
        {gvar.tc_P2_STATUS= "Fault Active"}
        else if(m[12]==0 && i[1]==0 && i[4]==0)
        {gvar.tc_P2_STATUS= "Not Available"
        }


        if(l[4]==1)
        {gvar.tc_P3_STATUS= "Running"}
        else if(i[2]==1)
        {gvar.tc_P3_STATUS= "Available"}
        else if(i[5]==1)
        {gvar.tc_P3_STATUS= "Fault Active"}
        else if(l[4]==0 && i[2]==0 && i[5]==0)
        {gvar.tc_P3_STATUS= "Not Available"
        }

       gvar.tc_P1_NO_FLOW_FAULT = i[6];
       gvar.tc_P2_NO_FLOW_FAULT = i[7];
       gvar.tc_P3_NO_FLOW_FAULT = i[8];





         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });

        if(gvar.tc_R_LVL!=undefined || gvar.tc_R_LVL!=null){
        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
tc_R_LVL:gvar.tc_R_LVL,
tc_R_UT:gvar.tc_R_UT,
tc_R_HIGH_FLOAT:gvar.tc_R_HIGH_FLOAT,
tc_R_LOW_FLOAT:gvar.tc_R_LOW_FLOAT,
tc_P3_POWER:gvar.tc_P3_POWER,
tc_P3_MODE:gvar.tc_P3_MODE,
tc_P3_PUMP_TRIP_FAULT:gvar.tc_P3_PUMP_TRIP_FAULT,
tc_P3_ESTOP_FAULT:gvar.tc_P3_ESTOP_FAULT,
tc_P3_EARTH_FAULT:gvar.tc_P3_EARTH_FAULT,
tc_P3_RH:gvar.tc_P3_RH,
tc_P3_PRESS_DIFF:gvar.tc_P3_PRESS_DIFF,
tc_PS_UT:gvar.tc_PS_UT,
tc_G_SP:gvar.tc_G_SP,
tc_P1_POWER:gvar.tc_P1_POWER,
tc_P1_MODE:gvar.tc_P1_MODE,
tc_P1_RH:gvar.tc_P1_RH,
tc_P1_PRESS_DIFF:gvar.tc_P1_PRESS_DIFF,
tc_P1_PUMP_TRIP_FAULT:gvar.tc_P1_PUMP_TRIP_FAULT,
tc_P1_ESTOP_FAULT:gvar.tc_P1_ESTOP_FAULT,
tc_P1_EARTH_FAULT:gvar.tc_P1_EARTH_FAULT,
tc_P2_POWER:gvar.tc_P2_POWER,
tc_P2_MODE:gvar.tc_P2_MODE,
tc_P2_RH:gvar.tc_P2_RH,
tc_P2_PRESS_DIFF:gvar.tc_P2_PRESS_DIFF,
tc_P2_PUMP_TRIP_FAULT:gvar.tc_P2_PUMP_TRIP_FAULT,
tc_P2_ESTOP_FAULT:gvar.tc_P2_ESTOP_FAULT,
tc_P2_EARTH_FAULT:gvar.tc_P2_EARTH_FAULT,
tc_P1_STATUS:gvar.tc_P1_STATUS,
tc_P2_STATUS:gvar.tc_P2_STATUS,
tc_P3_STATUS:gvar.tc_P3_STATUS,
tc_P1_NO_FLOW_FAULT:gvar.tc_P1_NO_FLOW_FAULT,
tc_P2_NO_FLOW_FAULT:gvar.tc_P2_NO_FLOW_FAULT,
tc_P3_NO_FLOW_FAULT:gvar.tc_P3_NO_FLOW_FAULT,


id:"nmbm_tc_ps_r"

}


fun.storeInDB(firstValue,"R_CurrentVals")

        var reservoirTrend={
          tc_R_UT:gvar.tc_R_UT,
          tc_R_LVL:gvar.tc_R_LVL,
          id:"res_overview"

        }

        fun.storeInDB(reservoirTrend,"Res_CurrentVals")

                var psTrend ={
                  tc_R_UT:gvar.tc_R_UT,
                  id:"PS_OVERVIEW"
                }

                fun.storeInDB(psTrend,"PUMP_CurrentVals")
              }

  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});
  setTimeout(readVal_TC_PS_R, mbtimeout);
  }


