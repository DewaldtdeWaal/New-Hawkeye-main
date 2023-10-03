module.exports = {readVal_NMB_CGK_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.35';

var regStart=200;

var regNum=30;


var timeout = 5000;
var mbtimeout=mbRetry
//Input function Name
function readVal_NMB_CGK_R(){
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

/////////////////////////////////////////////Input code


        gvar.nmb_cgk_r_ut = Date().slice(4,Date().length-41);
        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++){
          m[i] =  ((p & 0x8000) ? 1 : 0);
          p = p << 1; // divide by two and keep as an integer
      }
      m.reverse();

      gvar.nmb_cgk_r_chargerstatus = m[0];

      if(m[2]==1){
        gvar.nmb_cgk_r_actuator_status= "Open";
      }
      else if(m[3]==1){
        gvar.nmb_cgk_r_actuator_status= "Closing";
      }

      else if(m[4]==1){
        gvar.nmb_cgk_r_actuator_status= "Closed";
      }
      else if(m[1] == 1)
      {
        gvar.nmb_cgk_r_actuator_status = "Opening";
      }
      else if(m[5] == 1){
        gvar.nmb_cgk_r_actuator_status = "Fault Active";
      }

      if(m[5]==1){
        gvar.nmb_cgk_r_fault_statuses = "Fault Active"
      }
      else if(m[2]==1){
        gvar.nmb_cgk_r_fault_statuses= "Open"
      }
      else if(m[3]==1){
        gvar.nmb_cgk_r_fault_statuses= "Closing"
      }

      else if(m[4]==1){
        gvar.nmb_cgk_r_fault_statuses= "Closed"
      }
      else if(m[1] == 1)
      {
        gvar.nmb_cgk_r_fault_statuses = "Opening"
      }

      gvar.nmb_cgk_r_fault_status=m[5];

      if(m[6]==1){
        gvar.nmb_cgk_r_mode = "Manual"
      }
      else if(m[7]==1){
        gvar.nmb_cgk_r_mode = "Auto"
      }
      else if(m[8]==1){
        gvar.nmb_cgk_r_mode= "Remote"
      }

      if(m[9]==1){
        gvar.nmb_cgk_r_control_valve_1="Open";
      }else{
        gvar.nmb_cgk_r_control_valve_1="Closed";
      }

      if (m[10]==0)
      {
        gvar.nmb_cgk_r_control_valve_2="Open";
      }
      else{
        gvar.nmb_cgk_r_control_valve_2="Closed";
      }

      gvar.nmb_cgk_r_res_warning_level= m[11]

      gvar.nmb_cgk_r_res_level_sensor = m[12]
      gvar.nmb_cgk_r_valve_chamber_pressure_sensor=m[13]
      gvar.nmb_cgk_r_grassridge_inlet_flow_meter=m[14]
      gvar.nmb_cgk_r_coega_idz_outlet_flow_meter=m[15]



      var p2 = parseInt(val[1]);
      var m2 = [];

        for (var i=0; i<16; i++){
          m2[i] =  ((p & 0x8000) ? 1 : 0);
          p2 = p2 << 1; // divide by two and keep as an integer
      }
      m2.reverse();

      gvar.nmb_cgk_r_mother_outlet_flow_meter_analog_signal = m2[0]


        gvar.nmb_cgk_r_reservoir_level = (val[2]/10).toFixed(1);
        gvar.nmb_cgk_r_valve_chamber_pressure=val[3];
        gvar.nmb_cgk_r_grassridge_inlet_flow_rate=(val[4]/10).toFixed(1);

        var rawData = new ArrayBuffer(4);
        var i = new Uint16Array(rawData);
        var ii  = new Uint32Array(rawData);

        i[0] = val[6]; //low
        i[1] = val[7]; //high

     gvar.nmb_cgk_r_grassridge_inlet_total_flow=parseInt((ii[0].toFixed(0))/1000).toFixed(1);
        gvar.nmb_cgk_r_coega_idz_outlet_flow_rate=(val[8]/10).toFixed(1);

        var rawData = new ArrayBuffer(4);
        var j = new Uint16Array(rawData);
        var jj  = new Uint32Array(rawData);

        j[0] = val[10]; //low
        j[1] = val[11]; //high
        gvar.nmb_cgk_r_coega_idz_outlet_total_flow= (parseInt(jj[0].toFixed(0))/10).toFixed(1);

        gvar.nmb_cgk_r_motherwell_outlet_flow_rate=(val[12]/10).toFixed(1);


        var rawData = new ArrayBuffer(4);
        var k = new Uint16Array(rawData);
        var kk  = new Uint32Array(rawData);


        k[0]=val[14]
        k[1]=val[15]
        gvar.nmb_cgk_r_motherwell_outlet_total_flow= (parseInt(kk[0].toFixed(0))/10).toFixed(1);





        if(gvar.nmb_cgk_r_chargerstatus!=undefined || gvar.nmb_cgk_r_chargerstatus!=null){


        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;



        var firstValue ={
          last_update:gvar.nmb_cgk_r_ut,
          chargerstatus:gvar.nmb_cgk_r_chargerstatus,
          actuator_status:gvar.nmb_cgk_r_actuator_status,
          mode:gvar.nmb_cgk_r_mode,
          control_valve1:gvar.nmb_cgk_r_control_valve_1,
          control_valve2:gvar.nmb_cgk_r_control_valve_2,
          reservoir_warning_level:gvar.nmb_cgk_r_res_warning_level,
          reservoir_level_sensor:gvar.nmb_cgk_r_res_level_sensor,
          valve_chamber_pressure_sensor:gvar.nmb_cgk_r_valve_chamber_pressure_sensor,
          grassridge_inlet_flow_meter: gvar.nmb_cgk_r_grassridge_inlet_flow_meter,
          coega_outlet_flow_meter:gvar.nmb_cgk_r_coega_idz_outlet_flow_meter,
          motherwell_outlet_flow_meter_analog_signal: gvar.nmb_cgk_r_mother_outlet_flow_meter_analog_signal,
          reservoir_level:gvar.nmb_cgk_r_reservoir_level,
          fault_status:gvar.nmb_cgk_r_fault_status,
          valve_chamber_pressure:gvar.nmb_cgk_r_valve_chamber_pressure,
          grassridge_inlet_total_flow:gvar.nmb_cgk_r_grassridge_inlet_total_flow,
          grassridge_inlet_flow_rate:gvar.nmb_cgk_r_grassridge_inlet_flow_rate,
          coega_idz_outlet_flow_rate:gvar.nmb_cgk_r_coega_idz_outlet_flow_rate,
          coega_idz_outlet_total_flow:gvar.nmb_cgk_r_coega_idz_outlet_total_flow,
          motherwell_outlet_flow_rate:gvar.nmb_cgk_r_motherwell_outlet_flow_rate,
          motherwell_outlet_total_flow:gvar.nmb_cgk_r_motherwell_outlet_total_flow,
          imagestatus:gvar.nmb_cgk_r_fault_statuses,
          id:"cgk"


        }


        var reservoirTrend={
          nmb_cgk_r_ut:gvar.nmb_cgk_r_ut,
          nmb_cgk_r_reservoir_level:gvar.nmb_cgk_r_reservoir_level,
          id:"res_overview"

        }
        fun.storeInDB(firstValue,"R_CurrentVals")
        fun.storeInDB(reservoirTrend,"Res_CurrentVals")




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
//Make sure this matches the method Name
 setTimeout(readVal_NMB_CGK_R, mbtimeout);
  }

