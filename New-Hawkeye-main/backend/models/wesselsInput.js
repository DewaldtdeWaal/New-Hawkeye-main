const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userScheme = mongoose.Schema({
  wes2_fl_p1_lambs: {type:Number, required:true},
  wes2_fl_p2_lambs: {type:Number, required:true},
  wes2_fl_p3_lambs: {type:Number, required:true},
  wes2_fl_p4_lambs: {type:Number, required:true},
  wes2_fl_p5_lambs: {type:Number, required:true},
  wes2_fl_p6_lambs: {type:Number, required:true},
  wes2_fl_p7_lambs: {type:Number, required:true},
  wes2_fl_p8_lambs: {type:Number, required:true},
  wes2_fl_p9_lambs: {type:Number, required:true},
  wes2_fl_p10_lambs: {type:Number, required:true},
  wes2_fl_p11_lambs: {type:Number, required:true},
  wes2_fl_p12_lambs: {type:Number, required:true},
  wes2_fl_pen1_feed_type: {type:Number, required:true},
  wes2_fl_pen2_feed_type: {type:Number, required:true},
  wes2_fl_pen3_feed_type: {type:Number, required:true},
  wes2_fl_pen4_feed_type: {type:Number, required:true},
  wes2_fl_pen5_feed_type: {type:Number, required:true},
  wes2_fl_pen6_feed_type: {type:Number, required:true},
  wes2_fl_pen7_feed_type: {type:Number, required:true},
  wes2_fl_pen8_feed_type: {type:Number, required:true},
  wes2_fl_pen9_feed_type: {type:Number, required:true},
  wes2_fl_pen10_feed_type: {type:Number, required:true},
  wes2_fl_pen11_feed_type: {type:Number, required:true},
  wes2_fl_pen12_feed_type: {type:Number, required:true},
  id: {type:String, required:true}



});

userScheme.plugin(uniqueValidator);
module.exports = mongoose.model('fl_currentvals', userScheme);
