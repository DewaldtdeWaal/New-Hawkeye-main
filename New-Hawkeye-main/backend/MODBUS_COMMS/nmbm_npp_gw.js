module.exports = { readVal_NM_NPP_GW };
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP + '.3';
//Memoryword(MW) you start at
var regStart = 300;
//Amount of Memorywords you have
var regNum = 24;


var timeout = 8000;
var mbtimeout = mbRetry
//Input function Namem
function readVal_NM_NPP_GW() {
  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, timeout)
  const options = {
    'host': ip,
    'port': 502
  };
  socket.connect(options);
  socket.on("connect", function () {
    client
      .readHoldingRegisters(regStart, regNum)
      .then(function (resp) {
        var val = (resp.response._body.values);
        socket.end();
        mbtimeout = mbCycleTime;


        /////////////////////////////////////////////Input code
        //Communication
        gvar.npp_g_ut = Date().slice(4, Date().length - 41);

        //General



        gvar.npp_g_run_hours = val[2];
        gvar.npp_p_flow_rate = (val[6] / 100).toFixed(1);
        gvar.npp_g_total_yield_to_date = val[8];
        gvar.npp_g_annual_yield_setpoint = val[9];
        gvar.npp_p_borehole_level = (val[10] / 100).toFixed(2);
        //k
        //still need to do voltageOk
        gvar.npp_k_voltage = val[12];
        gvar.npp_k_current = (val[13] / 1000).toFixed(1);
        gvar.npp_k_power = val[14];
        gvar.npp_k_total_power = val[15];

        //Pump

       
        //borehole water level and borehole level setpoint, make sure with daniel

        gvar.npp_p_pressure = (val[18] / 10).toFixed(1);

        var rawData = new ArrayBuffer(4);
        var i = new Uint16Array(rawData);
        var ii = new Uint32Array(rawData);


        i[0] = val[20]; //low
        i[1] = val[21]; //high

        gvar.npp_g_total_flow = parseInt(ii[0].toFixed(0));

        gvar.npp_g_targetflowsetpoint = (val[22] / 10).toFixed(1);
        gvar.npp_p_vsdfrequency = (val[23] / 10).toFixed(1);

        var p = parseInt(val[0]);
        var m = [];
        for (var i = 0; i < 16; i++) {
          // test top bit and set corresponding payload
          m[i] = ((p & 0x8000) ? 1 : 0);
          p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();


        if (m[0] == 1) {
          gvar.npp_p_mode = "Auto";
        }
        else if (m[1] == 1) {
          gvar.npp_p_mode = "Manual";
        }
        else {
          gvar.npp_p_mode = "Off";
        }



        if (m[3] == 1) {
          gvar.npp_p_status = "Pump Running";
        }
        else if (m[6] == 1) {///Check if voltageOk applies here
          gvar.npp_p_status = "Fault Active";
        }
        else if (m[0] == 0) {
          gvar.npp_p_status = "Not Available"
        }
        else {
          gvar.npp_p_status = "Available";
        }




        gvar.npp_f_estopactive = m[2];
        gvar.npp_f_vsdfault = m[4];
        gvar.npp_f_voltage_ok = m[5];
        gvar.npp_f_fault_active = m[6];
        gvar.npp_f_panel_door_open = m[7];
        gvar.npp_f_low_flow = m[8];
        gvar.npp_f_charge_ok = m[9];
        gvar.npp_f_low_level = m[10];
        gvar.npp_f_annual_abstraction_limit_reached = m[11];
        gvar.npp_f_flow_coms_fail = m[12];
        gvar.npp_f_level_warning = m[13];
        gvar.npp_f_pump_rest = m[14];
        gvar.npp_f_recovery_level_not_reached = m[15];





        if (gvar.npp_f_recovery_level_not_reached != undefined || gvar.npp_f_recovery_level_not_reached != null) {

          var firstValue = {
            last_update: gvar.npp_g_ut,
            pumprunning: gvar.npp_f_pumprunning,
            pumpmode: gvar.npp_p_mode,
            status: gvar.npp_p_status,
            runhours: gvar.npp_g_run_hours,
            flowrate: gvar.npp_p_flow_rate,
            totalflow: gvar.npp_g_total_flow,
            annualyieldsetpoint: gvar.npp_g_annual_yield_setpoint,
            totalyieldtodate: gvar.npp_g_total_yield_to_date,
            boreholelevel: gvar.npp_p_borehole_level,
            voltage: gvar.npp_k_voltage,
            current: gvar.npp_k_current,
            power: gvar.npp_k_power,
            totalpower: gvar.npp_k_total_power,
            estopactive: gvar.npp_f_estopactive,
            vsdfault: gvar.npp_f_vsdfault,
            paneldooropen: gvar.npp_f_panel_door_open,
            lowflow: gvar.npp_f_low_flow,
            lowlevel: gvar.npp_f_low_level,
            annualabstractionlimitreached: gvar.npp_f_annual_abstraction_limit_reached,
            flowcomsfail: gvar.npp_f_flow_coms_fail,
            levelwarning: gvar.npp_f_level_warning,
            pumprest: gvar.npp_f_pump_rest,
            recoverylevelnotreached: gvar.npp_f_recovery_level_not_reached,
            faultactive: gvar.npp_f_fault_active,
            voltageok: gvar.npp_f_voltage_ok,
            recoverytime: gvar.npp_f_recovery_time,
            chargerfault: gvar.npp_f_charge_ok,
            pressure: gvar.npp_p_pressure,
            targetflowsetpoint: gvar.npp_g_targetflowsetpoint,
            vsdfrequency: gvar.npp_p_vsdfrequency,

            id: "npp"
          };


          fun.storeInDB(firstValue, "GRDW_CurrentVals")







        }







      })
      .catch(function () {
        console.error(
          require("util").inspect(arguments, {
            depth: null
          })
        );
      });
  })
  socket.on("error", function () {
    mbtimeout = mbRetry
  });
  //Make sure this matches the method Name
  setTimeout(readVal_NM_NPP_GW, mbtimeout);
}





