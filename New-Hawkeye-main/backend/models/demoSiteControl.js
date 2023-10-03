const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const Control_Scheme = mongoose.Schema({
  id:{type:Number},
  light_control:{type:Boolean}
})

Control_Scheme.plugin(uniqueValidator);

module.exports = mongoose.model('Demo-Site-Control', Control_Scheme);
