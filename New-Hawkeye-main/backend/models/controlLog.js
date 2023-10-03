const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const controlLogScheme = mongoose.Schema({
  name: {type: String},
  date:{type: String},
  site: {type: String},
  pump:{type: String},
  description: {type: String},
});


controlLogScheme.plugin(uniqueValidator);

module.exports = mongoose.model('control-Log', controlLogScheme);
