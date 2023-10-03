const mongoose = require('mongoose');
const bethelsdorpScheme = mongoose.Schema({
  beth_totalflow:{type: Number},
  beth_flowrate:{type: Number},
  beth_pressure:{type: Number},
  beth_ut:{type: Number},
  id:{type: String},

})





module.exports = mongoose.model('FPT_CurrentVals', bethelsdorpScheme);
