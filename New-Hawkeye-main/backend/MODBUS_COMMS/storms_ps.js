//Serves as a basic template for all future sites.

module.exports = {readVal_storm_ps};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.37';
//Memoryword(MW) you start at
var regStart = 100;
//Amount of Memorywords you have
var regNum = 12 ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_storm_ps(){
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
        gvar.ps_storm_UT =  Date().slice(4,Date().length-41);

        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1;
        }
        m.reverse();

        if(m[1]==1){
          gvar.ps_storms_gp1_mode = "Manual";
        }
        else if(m[0]==1){
          gvar.ps_storms_gp1_mode = "Auto"
        }

        if(m[3]==1){
          gvar.ps_storms_gp1_status = "Fault Active"
        }
        else if(m[7]==1){
          gvar.ps_storms_gp1_status="Running"
        }
        else if(m[2]==1){
          gvar.ps_storms_gp1_status = "Available"
        }
        else{
          gvar.ps_storms_gp1_status="Not Available"
        }

        gvar.ps_storms_gp1_fault_general = m[3]
        gvar.ps_storms_gp1_vsd_fault = m[4]
        gvar.ps_storms_gp1_startup_fault = m[5]
        gvar.ps_storms_gp1_no_flow_fault = m[6]

        if(m[9]==1){
          gvar.ps_storms_gp2_mode = "Manual";
        }
        else if(m[8]==1){
          gvar.ps_storms_gp2_mode = "Auto"
        }

        if(m[11]==1){
          gvar.ps_storms_gp2_status = "Fault Active"
        }
        else if(m[15]==1){
          gvar.ps_storms_gp2_status="Running"
        }
        else if(m[10]==1){
          gvar.ps_storms_gp2_status = "Available"
        }
        else{
          gvar.ps_storms_gp2_status="Not Available"
        }

        gvar.ps_storms_gp2_fault_general = m[11]
        gvar.ps_storms_gp2_vsd_fault = m[12]
        gvar.ps_storms_gp2_startup_fault = m[13]
        gvar.ps_storms_gp2_no_flow_fault = m[14]

        var a = parseInt(val[1]);
        var b = [];
        for (var i=0; i<16; i++) {
            b[i] =  ((a & 0x8000) ? 1 : 0);
            a = a << 1;
        }
        b.reverse();

        if(b[1]==1){
          gvar.ps_storms_qp1_mode = "Manual";
        }
        else if(b[0]==1){
          gvar.ps_storms_qp1_mode = "Auto"
        }

       if(b[3]==1){
          gvar.ps_storms_qp1_status = "Fault Active"
        }
        else if(b[7]==1){
          gvar.ps_storms_qp1_status="Running"
        }
        else if(b[2]==1){
          gvar.ps_storms_qp1_status = "Available"
        }
        else{
          gvar.ps_storms_qp1_status="Not Available"
        }

        gvar.ps_storms_qp1_fault_general = b[3]
        gvar.ps_storms_qp1_vsd_fault = b[4]
        gvar.ps_storms_qp1_startup_fault = b[5]
        gvar.ps_storms_qp1_no_flow_fault = b[6]

        if(b[9]==1){
          gvar.ps_storms_qp2_mode = "Manual";
        }
        else if(b[8]==1){
          gvar.ps_storms_qp2_mode = "Auto"
        }

        if(b[11]==1){
          gvar.ps_storms_qp2_status = "Fault Active"
        }
        else if(b[15]==1){
          gvar.ps_storms_qp2_status="Running"
        }
        else if(b[10]==1){
          gvar.ps_storms_qp2_status = "Available"
        }
        else{
          gvar.ps_storms_qp2_status="Not Available"
        }

        gvar.ps_storms_qp2_fault_general = b[11]
        gvar.ps_storms_qp2_vsd_fault = b[12]
        gvar.ps_storms_qp2_startup_fault = b[13]
        gvar.ps_storms_qp2_no_flow_fault = b[14]

        var c = parseInt(val[2]);
        var d = [];
        for (var i=0; i<16; i++) {
            d[i] =  ((c & 0x8000) ? 1 : 0);
            c = c << 1;
        }
        d.reverse();

        gvar.ps_storms_quarry_fill = d[0]
        gvar.ps_storms_clear_water_tank_fill = d[1]
        gvar.ps_storms_emergency_stop = d[2]

        gvar.ps_storms_charger_fault = d[3]
        gvar.ps_storms_flood_warning = d[4]
        gvar.ps_storms_wtw_comms = d[5]
        gvar.ps_storms_voltage_ok = d[6]

        gvar.ps_storms_gpump1_run_hours = parseInt(val[4])
        gvar.ps_storms_gpump2_run_hours = parseInt(val[5])
        gvar.ps_storms_qpump1_run_hours = parseInt(val[6])
        gvar.ps_storms_qpump2_run_hours = parseInt(val[7])

        var rawData = new ArrayBuffer(8);
        var i = new Uint16Array(rawData);
        var ii  = new Float32Array(rawData);
        i[0] = val[8]; //low
        i[1] = val[9]; //high

        i[2] = val[10]; //low
        i[3] = val[11]; //high

        gvar.ps_storms_gorge_level=parseFloat(ii[0].toFixed(2))

        gvar.ps_storms_quarry_level=parseFloat(ii[1].toFixed(2))

        if(gvar.ps_storms_gp1_mode!=undefined || gvar.ps_storms_gp1_mode!=null){
        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


     var firstValue ={

      ps_storm_UT:gvar. ps_storm_UT,
      ps_storms_gp1_mode:gvar.ps_storms_gp1_mode,
      ps_storms_gp1_status:gvar.ps_storms_gp1_status,
      ps_storms_gp1_fault_general:gvar.ps_storms_gp1_fault_general,
      ps_storms_gp1_vsd_fault:gvar.ps_storms_gp1_vsd_fault,
      ps_storms_gp1_startup_fault:gvar.ps_storms_gp1_startup_fault,
      ps_storms_gp1_no_flow_fault:gvar.ps_storms_gp1_no_flow_fault,
      ps_storms_gp2_mode:gvar.ps_storms_gp2_mode,
      ps_storms_gp2_status:gvar.ps_storms_gp2_status,
      ps_storms_gp2_fault_general:gvar.ps_storms_gp2_fault_general,
      ps_storms_gp2_vsd_fault:gvar.ps_storms_gp2_vsd_fault,
      ps_storms_gp2_startup_fault:gvar.ps_storms_gp2_startup_fault,
      ps_storms_gp2_no_flow_fault:gvar.ps_storms_gp2_no_flow_fault,
      ps_storms_qp1_mode:gvar.ps_storms_qp1_mode,
      ps_storms_qp1_status:gvar.ps_storms_qp1_status,
      ps_storms_qp1_fault_general:gvar.ps_storms_qp1_fault_general,
      ps_storms_qp1_vsd_fault:gvar.ps_storms_qp1_vsd_fault,
      ps_storms_qp1_startup_fault:gvar.ps_storms_qp1_startup_fault,
      ps_storms_qp1_no_flow_fault:gvar.ps_storms_qp1_no_flow_fault,
      ps_storms_qp2_mode:gvar.ps_storms_qp2_mode,
      ps_storms_qp2_status:gvar.ps_storms_qp2_status,
      ps_storms_qp2_fault_general:gvar.ps_storms_qp2_fault_general,
      ps_storms_qp2_vsd_fault:gvar.ps_storms_qp2_vsd_fault,
      ps_storms_qp2_startup_fault:gvar.ps_storms_qp2_startup_fault,
      ps_storms_qp2_no_flow_fault:gvar.ps_storms_qp2_no_flow_fault,
      ps_storms_quarry_fill:gvar.ps_storms_quarry_fill,
      ps_storms_clear_water_tank_fill:gvar.ps_storms_clear_water_tank_fill,
      ps_storms_emergency_stop:gvar.ps_storms_emergency_stop,
      ps_storms_charger_fault:gvar.ps_storms_charger_fault,
      ps_storms_flood_warning:gvar.ps_storms_flood_warning,
      ps_storms_wtw_comms:gvar.ps_storms_wtw_comms,
      ps_storms_voltage_ok:gvar.ps_storms_voltage_ok,
      ps_storms_gpump1_run_hours:gvar.ps_storms_gpump1_run_hours,
      ps_storms_gpump2_run_hours:gvar.ps_storms_gpump2_run_hours,
      ps_storms_qpump1_run_hours:gvar.ps_storms_qpump1_run_hours,
      ps_storms_qpump2_run_hours:gvar.ps_storms_qpump2_run_hours,
      ps_storms_gorge_level:gvar.ps_storms_gorge_level,
      ps_storms_quarry_level:gvar.ps_storms_quarry_level,
     id:"storms_ps"

     }


     fun.storeInDB(firstValue,"PS_CurrentVals")

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
  setTimeout(readVal_storm_ps, mbtimeout);
  }





