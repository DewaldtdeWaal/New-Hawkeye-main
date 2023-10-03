//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userScheme = mongoose.Schema({
firstName: {type: String, required:true},
secondName: {type: String, required:true},
contactNumber:{type: Number, required:true},
// idNumber: {type: Number, required:false ,unique:true},
supervisorEmail: {type: String, required:false},
userEmail:{type: String, required:true, unique:true},
password:{type: String, required:true},
userSites: {type: Array,required:true}


});

userScheme.plugin(uniqueValidator);

module.exports = mongoose.model('user', userScheme);

