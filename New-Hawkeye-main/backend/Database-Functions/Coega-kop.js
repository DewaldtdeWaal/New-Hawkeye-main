
module.exports = {GetVal_NMB_CGK_R};
const gvar = require('../variables')

function GetVal_NMB_CGK_R(){


  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"cgk"};


    dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;




      // gvar.nmb_cgk_r_actuator_status = data[0].actuator_status;
      // gvar.nmb_cgk_r_ut = data[0].last_update;


      // gvar.nmb_cgk_r_actuator_fault_status;
      // gvar.nmb_cgk_r_chargerstatus = data[0].chargerstatus;
      // gvar.nmb_cgk_r_res_warning_level =data[0].reservoir_warning_level
      // gvar.nmb_cgk_r_res_level_sensor = data[0].reservoir_level_sensor
      // gvar.nmb_cgk_r_valve_chamber_pressure_sensor = data[0].valve_chamber_pressure_sensor
      // gvar.nmb_cgk_r_grassridge_inlet_flow_meter =  data[0].grassridge_inlet_flow_meter
      // gvar.nmb_cgk_r_coega_idz_outlet_flow_meter = data[0].coega_outlet_flow_meter

      // gvar.nmb_cgk_r_mode=data[0].mode
      // gvar.nmb_cgk_r_fault_statuses=data[0].imagestatus

      // gvar.nmb_cgk_r_fault_status = data[0].fault_status
      // gvar.nmb_cgk_r_control_valve_1 = data[0].control_valve1
      // gvar.nmb_cgk_r_coontrol_valve_2 = data[0].control_valve2

      // gvar.nmb_cgk_r_motherwell_outlet_flow_meter_analog_signal = data[0].motherwell_outlet_flow_meter_analog_signal

      // gvar.nmb_cgk_r_reservoir_level = data[0].reservoir_level
      // gvar.nmb_cgk_r_valve_chamber_pressure =data[0].valve_chamber_pressure

      // gvar.nmb_cgk_r_grassridge_inlet_flow_rate = data[0].grassridge_inlet_flow_rate
      // gvar.nmb_cgk_r_grassridge_inlet_total_flow = data[0].grassridge_inlet_total_flow
      // gvar.nmb_cgk_r_coega_idz_outlet_flow_rate = data[0].coega_idz_outlet_flow_rate
      // gvar.nmb_cgk_r_coega_idz_outlet_total_flow = data[0].coega_idz_outlet_total_flow
      // gvar.nmb_cgk_r_motherwell_outlet_flow_rate = data[0].motherwell_outlet_flow_rate
      // gvar.nmb_cgk_r_motherwell_outlet_total_flow = data[0].motherwell_outlet_total_flow






    })



  })


}



