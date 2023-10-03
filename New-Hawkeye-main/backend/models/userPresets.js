const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userPresetsScheme = mongoose.Schema({

userEmail:{type: String},
presetName:{type: String, required:true,unique:true},
presetDescription:{type: String, required:true},
selectedSites:{type: Array, required:true},
rightSelectedSites:{type: Array, required:true}


});

userPresetsScheme.plugin(uniqueValidator);

module.exports = mongoose.model('userPresets', userPresetsScheme);
