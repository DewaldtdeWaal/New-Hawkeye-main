//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const loggedInUserScheme = mongoose.Schema({
userEmail:{type: String},
date: {type: String}
});

loggedInUserScheme.plugin(uniqueValidator);

module.exports = mongoose.model('loggedInUser', loggedInUserScheme);
