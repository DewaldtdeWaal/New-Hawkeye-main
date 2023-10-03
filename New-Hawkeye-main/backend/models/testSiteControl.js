const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");


const Test_Site_Control_Scheme = mongoose.Schema({
  id:{type:Number},
  ps_control:{type:Boolean},
  ps_speed:{type:Number},


});
Test_Site_Control_Scheme.plugin(uniqueValidator);


module.exports = mongoose.model('Test-Site-Control', Test_Site_Control_Scheme);
