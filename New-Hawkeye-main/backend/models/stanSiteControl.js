const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const Stan_Site_Control_Scheme = mongoose.Schema({
  id:{type:Number},
  ps_control:{type:Boolean},
  ps_speed:{type:Number},
  p1_run:{type:Boolean},
  p2_run:{type:Boolean},
  p3_run:{type:Boolean},
  p4_run:{type:Boolean},
});
Stan_Site_Control_Scheme.plugin(uniqueValidator);

module.exports = mongoose.model('Stan-Site-Control', Stan_Site_Control_Scheme);