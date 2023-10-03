//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const scheme = mongoose.Schema({
  ipAddress:{type:String, required:true},
  driverName:{type:String, required:true, uniqueValidator:true},
  description:{type:String, required:true},
  siteType:{type:String, required:true},
  dataArray:{type:Array, required:true},
  updatedStatus:{type:Boolean, required:true},
})


scheme.plugin(uniqueValidator)

module.exports = mongoose.model('drivers', scheme);
