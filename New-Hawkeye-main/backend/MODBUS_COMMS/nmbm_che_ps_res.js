module.exports = {readVal_CHE_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')


var ip = gvar.mbusIP +'.10';
var regStart = 5500;//memory word
var regNum = 100; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_CHE_R(){
  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, timeout);
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


        gvar.che_ps_ut = Date().slice(4,Date().length-41);

        var m = []
         m = fun.parseVal(val[0])


        gvar.che_ps_pumpset_g_control_voltage_loss = m[0];
        gvar.che_ps_flood_alarm= m[1]


        var rawData = new ArrayBuffer(32);
        var j = new Uint16Array(rawData);
        var jj  = new Float32Array(rawData);


        j[0] =  val[4]; //low
        j[1] =  val[5]; //high
        j[2] =  val[6]; //low
        j[3] =  val[7]; //high
        j[4] =  val[8]; //low
        j[5] =  val[9]; //high
        j[6] =  val[10]; //low
        j[7] =  val[11]; //high
        j[8] =  val[12]; //low
        j[9] =  val[13]; //high
        j[10] =  val[14]; //low
        j[11] =  val[15]; //high
        j[12] =  val[16]; //low
        j[13] =  val[17]; //high
        j[14] =  val[18]; //low
        j[15] =  val[19]; //high


       gvar.che_ps_700_flow_rate=parseFloat(jj[0].toFixed(2));
       gvar.che_ps_700_total_flow=parseFloat(jj[1].toFixed(0));
       gvar.che_ps_moth_760_mm =parseFloat(jj[2].toFixed(2));
       gvar.che_ps_moth_760_mm_total_flow =parseFloat(jj[3].toFixed(0));
       gvar.che_ps_moth_900_mm=parseFloat(jj[4].toFixed(2));
       gvar.che_ps_moth_900_mm_total_flow=parseFloat(jj[5].toFixed(0));
       gvar.che_ps_walk_drive_off_500_mm =parseFloat(jj[6].toFixed(2));
       gvar.che_ps_walk_drive_off_500_mm_total_flow =parseFloat(jj[7].toFixed(0));



        var b = [];

        b = fun.parseVal(val[21]);




        var a = [];
        a = fun.parseVal(val[20]);

        if(b[0] == 1 || b[1] == 1 || b[2] == 1 || b[3] == 1 ||b[4] == 1 || b[5] == 1 || b[6] ==1 ){
          gvar.che_ps_pumpset_1_pumpstatus = "Fault Active";

        }
        else if(a[1] == 1){
          gvar.che_ps_pumpset_1_pumpstatus = "Running";
        }
        else if(a[0] == 1){
          gvar.che_ps_pumpset_1_pumpstatus = "Available";
        }
       else{
        gvar.che_ps_pumpset_1_pumpstatus = "Not Available";
       }



       var rawData = new ArrayBuffer(32);
        var i = new Uint16Array(rawData);
        var ii  = new Float32Array(rawData);


        i[0] =  val[24]; //low
        i[1] =  val[25]; //high
        i[2] =  val[26]; //low
        i[3] =  val[27]; //high
        i[4] =  val[28]; //low
        i[5] =  val[29]; //high
        i[6] =  val[30]; //low
        i[7] =  val[31]; //high
        i[8] =  val[32]; //low
        i[9] =  val[33]; //high
        i[10] =  val[34]; //low
        i[11] =  val[35]; //high
        i[12] =  val[36]; //low
        i[13] =  val[37]; //high


        gvar.che_ps_pumpset_1_mode = controlMode(parseFloat(ii[0].toFixed(0)));
        gvar.che_ps_pumpset_1_run_hours=parseFloat(ii[1].toFixed(0));
        gvar.che_ps_pumpset_1_del_pressure=parseFloat(ii[2].toFixed(3));
        gvar.che_ps_pumpset_1_suct_pressure=parseFloat(ii[3].toFixed(3));
        gvar.che_ps_pumpset_1_vsd_actual_speed=parseFloat(ii[4].toFixed(2));
        gvar.che_ps_pumpset_1_current=parseFloat(ii[5].toFixed(1));
        gvar.che_ps_pumpset_1_power=parseFloat(ii[6].toFixed(1));

        gvar.che_ps_pumpset_1_no_flow_fault = b[0]
        gvar.che_ps_pumpset_1_ESTOP = b[1]
        gvar.che_ps_pumpset_1_circuit_breaker_trip = b[2]
        gvar.che_ps_pumpset_1_drive_fault = b[3]
        gvar.che_ps_pumpset_1_pres_fault = b[4]
        gvar.che_ps_pumpset_1_temp_fault = b[5]
        gvar.che_ps_pumpset_1_vib_fault = b[6]



        var c = []
        c = fun.parseVal(val[40])

        var d =[]
        d = fun.parseVal(val[41])

        if(d[0] == 1 || d[1] == 1 || d[2] == 1 || d[3] == 1 ||d[4] == 1 || d[5] == 1 || d[6] ==1 ){
          gvar.che_ps_pumpset_2_pumpstatus = "Fault Active";

        }
        else if(c[1] == 1){
          gvar.che_ps_pumpset_2_pumpstatus = "Running";
        }
        else if(c[0] == 1){
          gvar.che_ps_pumpset_2_pumpstatus = "Available";
        }
       else{
        gvar.che_ps_pumpset_2_pumpstatus = "Not Available";
       }


       gvar.che_ps_pumpset_2_no_flow_fault = d[0]
       gvar.che_ps_pumpset_2_ESTOP = d[1]
       gvar.che_ps_pumpset_2_circuit_breaker_trip = d[2]
       gvar.che_ps_pumpset_2_drive_fault = d[3]
       gvar.che_ps_pumpset_2_pres_fault = d[4]
       gvar.che_ps_pumpset_2_temp_fault = d[5]
       gvar.che_ps_pumpset_2_vib_fault = d[6]




       var rawData = new ArrayBuffer(32);
       var j = new Uint16Array(rawData);
       var jj  = new Float32Array(rawData);

       j[0] =  val[44]; //low
       j[1] =  val[45]; //high
       j[2] =  val[46]; //low
       j[3] =  val[47]; //high
       j[4] =  val[48]; //low
       j[5] =  val[49]; //high
       j[6] =  val[50]; //low
       j[7] =  val[51]; //high
       j[8] =  val[52]; //low
       j[9] =  val[53]; //high
       j[10] =  val[54]; //low
       j[11] =  val[55]; //high
       j[12] =  val[56]; //low
       j[13] =  val[57]; //high

       gvar.che_ps_pumpset_2_mode =controlMode(parseFloat(jj[0].toFixed(0)));
       gvar.che_ps_pumpset_2_run_hours=parseFloat(jj[1].toFixed(0));
       gvar.che_ps_pumpset_2_del_pressure=parseFloat(jj[2].toFixed(3));
       gvar.che_ps_pumpset_2_suct_pressure=parseFloat(jj[3].toFixed(3));
       gvar.che_ps_pumpset_2_vsd_actual_speed=parseFloat(jj[4].toFixed(2));
       gvar.che_ps_pumpset_2_current=parseFloat(jj[5].toFixed(1));
       gvar.che_ps_pumpset_2_power=parseFloat(jj[6].toFixed(1));




       var e = []
       e = fun.parseVal(val[60])

       var f =[]
       f = fun.parseVal(val[61])

       if(f[0] == 1 || f[1] == 1 || f[2] == 1 || f[3] == 1 ||f[4] == 1 || f[5] == 1 || f[6] ==1 ){
         gvar.che_ps_pumpset_3_pumpstatus = "Fault Active";

       }
       else if(e[1] == 1){
         gvar.che_ps_pumpset_3_pumpstatus = "Running";
       }
       else if(e[0] == 1){
         gvar.che_ps_pumpset_3_pumpstatus = "Available";
       }
      else{
       gvar.che_ps_pumpset_3_pumpstatus = "Not Available";
      }


      gvar.che_ps_pumpset_3_no_flow_fault = f[0]
      gvar.che_ps_pumpset_3_ESTOP = f[1]
      gvar.che_ps_pumpset_3_circuit_breaker_trip = f[2]
      gvar.che_ps_pumpset_3_drive_fault = f[3]
      gvar.che_ps_pumpset_3_pres_fault = f[4]
      gvar.che_ps_pumpset_3_temp_fault = f[5]
      gvar.che_ps_pumpset_3_vib_fault = f[6]




      var rawData = new ArrayBuffer(32);
      var k = new Uint16Array(rawData);
      var kk  = new Float32Array(rawData);


      k[0] =  val[64]; //low
      k[1] =  val[65]; //high
      k[2] =  val[66]; //low
      k[3] =  val[67]; //high
      k[4] =  val[68]; //low
      k[5] =  val[69]; //high
      k[6] =  val[70]; //low
      k[7] =  val[71]; //high
      k[8] =  val[72]; //low
      k[9] =  val[73]; //high
      k[10] =  val[74]; //low
      k[11] =  val[75]; //high
      k[12] =  val[76]; //low
      k[13] =  val[77]; //high

      gvar.che_ps_pumpset_3_mode =controlMode(parseFloat(kk[0].toFixed(0)));
      gvar.che_ps_pumpset_3_run_hours=parseFloat(kk[1].toFixed(0));
      gvar.che_ps_pumpset_3_del_pressure=parseFloat(kk[2].toFixed(3));
      gvar.che_ps_pumpset_3_suct_pressure=parseFloat(kk[3].toFixed(3));
      gvar.che_ps_pumpset_3_vsd_actual_speed=parseFloat(kk[4].toFixed(2));
      gvar.che_ps_pumpset_3_current=parseFloat(kk[5].toFixed(1));
      gvar.che_ps_pumpset_3_power=parseFloat(kk[6].toFixed(1));



      var g = []
      g = fun.parseVal(val[80])

      var h =[]
      h = fun.parseVal(val[81])

      if(g[0] == 1 || g[1] == 1 || g[2] == 1 || g[3] == 1 ||g[4] == 1 || g[5] == 1 || g[6] ==1 ){
        gvar.che_ps_pumpset_4_pumpstatus = "Fault Active";

      }
      else if(h[1] == 1){
        gvar.che_ps_pumpset_4_pumpstatus = "Running";
      }
      else if(h[0] == 1){
        gvar.che_ps_pumpset_4_pumpstatus = "Available";
      }
     else{
      gvar.che_ps_pumpset_4_pumpstatus = "Not Available";
     }


     gvar.che_ps_pumpset_4_no_flow_fault = g[0]
     gvar.che_ps_pumpset_4_ESTOP = g[1]
     gvar.che_ps_pumpset_4_circuit_breaker_trip = g[2]
     gvar.che_ps_pumpset_4_drive_fault = g[3]
     gvar.che_ps_pumpset_4_pres_fault = g[4]
     gvar.che_ps_pumpset_4_temp_fault = g[5]
     gvar.che_ps_pumpset_4_vib_fault = g[6]




     var rawData = new ArrayBuffer(32);
     var l = new Uint16Array(rawData);
     var ll  = new Float32Array(rawData);


     l[0] =  val[84]; //low
     l[1] =  val[85]; //high
      l[2] =  val[86]; //low
      l[3] =  val[87]; //high
      l[4] =  val[88]; //low
      l[5] =  val[89]; //high
      l[6] =  val[80]; //low
      l[7] =  val[91]; //high
      l[8] =  val[92]; //low
      l[9] =  val[93]; //high
      l[10] =  val[94]; //low
      l[11] =  val[95]; //high
      l[12] =  val[96]; //low
      l[13] =  val[97]; //high

      gvar.che_ps_pumpset_4_mode =controlMode(parseFloat(ll[0].toFixed(0)));
     gvar.che_ps_pumpset_4_run_hours=parseFloat(ll[1].toFixed(0));
     gvar.che_ps_pumpset_4_del_pressure=parseFloat(ll[2].toFixed(3));
     gvar.che_ps_pumpset_4_suct_pressure=parseFloat(ll[3].toFixed(3));
     gvar.che_ps_pumpset_4_vsd_actual_speed=parseFloat(ll[4].toFixed(2));
     gvar.che_ps_pumpset_4_current=parseFloat(ll[5].toFixed(1));
     gvar.che_ps_pumpset_4_power=parseFloat(ll[6].toFixed(1));


     if(gvar.che_ps_pumpset_4_power!=undefined || gvar.che_ps_pumpset_4_power!=null){

      var MongoClient = require('mongodb').MongoClient;
      var url= gvar.standardConnectionString;

      var firstValue ={
        che_ps_pumpset_1_mode:gvar.che_ps_pumpset_1_mode,
        che_ps_pumpset_g_control_voltage_loss:gvar.che_ps_pumpset_g_control_voltage_loss,
        che_ps_flood_alarm:gvar.che_ps_flood_alarm,
        che_ps_700_flow_rate:gvar.che_ps_700_flow_rate,
        che_ps_moth_760_mm:gvar.che_ps_moth_760_mm,
        che_ps_moth_900_mm:gvar.che_ps_moth_900_mm,
        che_ps_walk_drive_off_500_mm:gvar.che_ps_walk_drive_off_500_mm,
        che_ps_pumpset_1_no_flow_fault:gvar.che_ps_pumpset_1_no_flow_fault,
        che_ps_pumpset_1_ESTOP:gvar.che_ps_pumpset_1_ESTOP,
        che_ps_pumpset_1_circuit_breaker_trip:gvar.che_ps_pumpset_1_circuit_breaker_trip,
        che_ps_pumpset_1_drive_fault:gvar.che_ps_pumpset_1_drive_fault,
        che_ps_pumpset_1_pres_fault:gvar.che_ps_pumpset_1_pres_fault,
        che_ps_pumpset_1_temp_fault:gvar.che_ps_pumpset_1_temp_fault,
        che_ps_pumpset_1_vib_fault:gvar.che_ps_pumpset_1_vib_fault,
        che_ps_pumpset_1_pumpstatus:gvar.che_ps_pumpset_1_pumpstatus,
        che_ps_pumpset_1_run_hours:gvar.che_ps_pumpset_1_run_hours,
        che_ps_pumpset_1_del_pressure:gvar.che_ps_pumpset_1_del_pressure,
        che_ps_pumpset_1_suct_pressure:gvar.che_ps_pumpset_1_suct_pressure,
        che_ps_pumpset_1_vsd_actual_speed:gvar.che_ps_pumpset_1_vsd_actual_speed,
        che_ps_pumpset_1_current:gvar.che_ps_pumpset_1_current,
        che_ps_pumpset_1_power:gvar.che_ps_pumpset_1_power,
        che_ps_pumpset_2_pumpstatus:gvar.che_ps_pumpset_2_pumpstatus,
        che_ps_pumpset_2_no_flow_fault:gvar.che_ps_pumpset_2_no_flow_fault,
        che_ps_pumpset_2_ESTOP:gvar.che_ps_pumpset_2_ESTOP,
        che_ps_pumpset_2_circuit_breaker_trip:gvar.che_ps_pumpset_2_circuit_breaker_trip,
        che_ps_pumpset_2_drive_fault:gvar.che_ps_pumpset_2_drive_fault,
        che_ps_pumpset_2_pres_fault:gvar.che_ps_pumpset_2_pres_fault,
        che_ps_pumpset_2_temp_fault:gvar.che_ps_pumpset_2_temp_fault,
        che_ps_pumpset_2_vib_fault:gvar.che_ps_pumpset_2_vib_fault,
        che_ps_pumpset_2_mode:gvar.che_ps_pumpset_2_mode,
        che_ps_pumpset_2_run_hours:gvar.che_ps_pumpset_2_run_hours,
        che_ps_pumpset_2_del_pressure:gvar.che_ps_pumpset_2_del_pressure,
        che_ps_pumpset_2_suct_pressure:gvar.che_ps_pumpset_2_suct_pressure,
        che_ps_pumpset_2_vsd_actual_speed:gvar.che_ps_pumpset_2_vsd_actual_speed,
        che_ps_pumpset_2_current:gvar.che_ps_pumpset_2_current,
        che_ps_pumpset_2_power:gvar.che_ps_pumpset_2_power,
        che_ps_pumpset_3_pumpstatus:gvar.che_ps_pumpset_3_pumpstatus,
        che_ps_pumpset_3_no_flow_fault:gvar.che_ps_pumpset_3_no_flow_fault,
        che_ps_pumpset_3_ESTOP:gvar.che_ps_pumpset_3_ESTOP,
        che_ps_pumpset_3_circuit_breaker_trip:gvar.che_ps_pumpset_3_circuit_breaker_trip,
        che_ps_pumpset_3_drive_fault:gvar.che_ps_pumpset_3_drive_fault,
        che_ps_pumpset_3_pres_fault:gvar.che_ps_pumpset_3_pres_fault,
        che_ps_pumpset_3_temp_fault:gvar.che_ps_pumpset_3_temp_fault,
        che_ps_pumpset_3_vib_fault:gvar.che_ps_pumpset_3_vib_fault,
        che_ps_pumpset_3_mode:gvar.che_ps_pumpset_3_mode,
        che_ps_pumpset_3_run_hours:gvar.che_ps_pumpset_3_run_hours,
        che_ps_pumpset_3_del_pressure:gvar.che_ps_pumpset_3_del_pressure,
        che_ps_pumpset_3_suct_pressure:gvar.che_ps_pumpset_3_suct_pressure,
        che_ps_pumpset_3_vsd_actual_speed:gvar.che_ps_pumpset_3_vsd_actual_speed,
        che_ps_pumpset_3_current:gvar.che_ps_pumpset_3_current,
        che_ps_pumpset_3_power:gvar.che_ps_pumpset_3_power,
        che_ps_pumpset_4_pumpstatus:gvar.che_ps_pumpset_4_pumpstatus,
        che_ps_pumpset_4_no_flow_fault:gvar.che_ps_pumpset_4_no_flow_fault,
        che_ps_pumpset_4_ESTOP:gvar.che_ps_pumpset_4_ESTOP,
        che_ps_pumpset_4_circuit_breaker_trip:gvar.che_ps_pumpset_4_circuit_breaker_trip,
        che_ps_pumpset_4_drive_fault:gvar.che_ps_pumpset_4_drive_fault,
        che_ps_pumpset_4_pres_fault:gvar.che_ps_pumpset_4_pres_fault,
        che_ps_pumpset_4_temp_fault:gvar.che_ps_pumpset_4_temp_fault,
        che_ps_pumpset_4_vib_fault:gvar.che_ps_pumpset_4_vib_fault,
        che_ps_pumpset_4_mode:gvar.che_ps_pumpset_4_mode,
        che_ps_pumpset_4_run_hours:gvar.che_ps_pumpset_4_run_hours,
        che_ps_pumpset_4_del_pressure:gvar.che_ps_pumpset_4_del_pressure,
        che_ps_pumpset_4_suct_pressure:gvar.che_ps_pumpset_4_suct_pressure,
        che_ps_pumpset_4_vsd_actual_speed:gvar.che_ps_pumpset_4_vsd_actual_speed,
        che_ps_pumpset_4_current:gvar.che_ps_pumpset_4_current,
        che_ps_pumpset_4_power:gvar.che_ps_pumpset_4_power,
        che_ps_ut:gvar.che_ps_ut,
        che_ps_700_total_flow:gvar.che_ps_700_total_flow,
        che_ps_moth_760_mm_total_flow:gvar.che_ps_moth_760_mm_total_flow,
        che_ps_moth_900_mm_total_flow:gvar.che_ps_moth_900_mm_total_flow,
        che_ps_walk_drive_off_500_mm_total_flow:gvar.che_ps_walk_drive_off_500_mm_total_flow,
        id:"nmbm_che_ps_res"

      }




              var psTrend ={
                che_r_ut:gvar.che_ps_ut,
                id:"PS_OVERVIEW"
              }
              fun.storeInDB(firstValue,"R_CurrentVals")
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

  setTimeout(readVal_CHE_R, mbtimeout);
  }



  function controlMode(modeStatus){

    var controlMode;

    if(modeStatus == 0 ){
      controlMode = "OFF";

    }else if(modeStatus == 1 ){
      controlMode = "MAN";
    }else if(modeStatus == 2 ){
      controlMode = "MAN";
    }else if(modeStatus == 3 ){
      controlMode = "AUTO";
    }else if(modeStatus == 4 ){
      controlMode = "MAINT";
    }else if(modeStatus == 5 ){
      controlMode = "MAN";
    }else if(modeStatus == 6 ){
      controlMode = "AUTO";
    }else if(modeStatus == 7 ){
      controlMode = "MAINT";
    }else if(modeStatus == 8 ){
      controlMode = "MAN";
    }else if(modeStatus == 9 ){
      controlMode = "AUTO";
    }


    return controlMode;
  }
