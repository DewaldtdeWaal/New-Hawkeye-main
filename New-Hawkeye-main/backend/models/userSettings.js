const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSettingsScheme = mongoose.Schema({
userEmail:{type: String},
theme: {type: String}
});

userSettingsScheme.plugin(uniqueValidator);

module.exports = mongoose.model('userSettings', userSettingsScheme);
