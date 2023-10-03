const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const Site_Schema = mongoose.Schema({
  id:{type:Number},
  CurrentValues:{type:Object},
  SiteName:{type:String}


})


module.exports = mongoose.model('NMBM_CLOUDWORKS_Drivers', Site_Schema);
