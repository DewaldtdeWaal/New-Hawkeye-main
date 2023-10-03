const mongoose = require('mongoose');


const coegakopScheme= mongoose.Schema({
  last_update:{type:String},
  chargerstatus:{type: String},
  actuator_status:{type: String},
  mode:{type:String},
  control_valve1:{type: String},
  control_valve2:{type: String},
  reservoir_warning_level:{type:Number},
  reservoir_level_sensor:{type: Number},
  valve_chamber_pressure_sensor:{type: Number},
  grassridge_inlet_flow_meter: {type: Number},
  coega_outlet_flow_meter:{type: Number},
  motherwell_outlet_flow_meter_analog_signal: {type: Number},
  reservoir_level:{type: Number},
  fault_status:{type: Number},
  valve_chamber_pressure:{type: Number},
  grassridge_inlet_total_flow:{type: Number},
  grassridge_inlet_flow_rate:{type: Number},
  coega_idz_outlet_flow_rate:{type: Number},
  coega_idz_outlet_total_flow:{type: Number},
  motherwell_outlet_flow_rate:{type: Number},
  motherwell_outlet_total_flow:{type: Number},
  imagestatus:{type: String},
  id:{type:String}
});


module.exports = mongoose.model('R_CurrentVals', coegakopScheme);
