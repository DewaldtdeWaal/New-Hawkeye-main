//Information for this type of page

const mongoose = require('mongoose');


const newtonparkpoolScheme= mongoose.Schema({
  last_update:{type:String},
  pumprunning: {type: String},
  pumpmode:{type: String},
  status:{type: String},
  runhours:{type: Number},
  flowrate:{type: Number},
  totalflow:{type: Number},
  totalyieldtodate:{type: Number},
  boreholelevel:{type: Number},
  voltage:{type: Number},
  current:{type: Number},
  power:{type: Number},
  totalpower:{type: Number},
  estopactive:{type: Number},
  vsdfault:{type: Number},
  paneldooropen:{type: Number},
  lowflow:{type: Number},
  lowlevel:{type: Number},
  annualyieldsetpoint: {type: Number},
  annualabstractionlimitreached: {type: Number},
  flowcomsfail:{type: Number},
  levelwarning:{type: Number},
  recoverylevelnotreached:{type: Number},
  faultactive: {type: Number},
  recoverytime:{type: Number},
  chargerfault:{type: Number},
  voltageok:{type: Number},
  pressure:{type: Number},
  targetflowsetpoint:{type: Number},
  vsdfrequency:{type: Number},
  id:{type: String}

});

module.exports = mongoose.model('GRDW_CurrentVals', newtonparkpoolScheme);
//Mongoose.Model is used to create a model
//first item in bracket is the name of the model
//Second item is to create the schema

