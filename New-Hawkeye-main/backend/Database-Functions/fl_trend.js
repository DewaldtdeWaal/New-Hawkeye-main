const mongoose = require('mongoose');
const gvar = require('../variables')

//called in server.js
module.exports = {WES_FEED_Trend,WES_FEED_FillingTotal,WES_FEED_FeedTotal};



var WES_FEED_TrendSchema = mongoose.Schema({
  date:{type: Date},
  wes1_fl_p1_feed_A: {type: Number},
  wes1_fl_p1_feed_B: {type: Number},
  wes1_fl_p1_feed_C: {type: Number},
  wes1_fl_p2_feed_A: {type: Number},
  wes1_fl_p2_feed_B: {type: Number},
  wes1_fl_p2_feed_C: {type: Number},
  wes1_fl_p3_feed_A: {type: Number},
  wes1_fl_p3_feed_B: {type: Number},
  wes1_fl_p3_feed_C: {type: Number},
  wes1_fl_p4_feed_A: {type: Number},
  wes1_fl_p4_feed_B: {type: Number},
  wes1_fl_p4_feed_C: {type: Number},
  wes1_fl_p5_feed_A: {type: Number},
  wes1_fl_p5_feed_B: {type: Number},
  wes1_fl_p5_feed_C: {type: Number},
  wes1_fl_p6_feed_A: {type: Number},
  wes1_fl_p6_feed_B: {type: Number},
  wes1_fl_p6_feed_C: {type: Number},
  wes1_fl_p7_feed_A: {type: Number},
  wes1_fl_p7_feed_B: {type: Number},
  wes1_fl_p7_feed_C: {type: Number},
  wes1_fl_p8_feed_A: {type: Number},
  wes1_fl_p8_feed_B: {type: Number},
  wes1_fl_p8_feed_C: {type: Number},
  wes1_fl_p9_feed_A: {type: Number},
  wes1_fl_p9_feed_B: {type: Number},
  wes1_fl_p9_feed_C: {type: Number},
  wes1_fl_p10_feed_A: {type: Number},
  wes1_fl_p10_feed_B: {type: Number},
  wes1_fl_p10_feed_C: {type: Number},
  wes1_fl_p11_feed_A: {type: Number},
  wes1_fl_p11_feed_B: {type: Number},
  wes1_fl_p11_feed_C: {type: Number},
  wes1_fl_p12_feed_A: {type: Number},
  wes1_fl_p12_feed_B: {type: Number},
  wes1_fl_p12_feed_C: {type: Number},
  wes1_f1_feed_A_total: {type: Number},
  wes1_f1_feed_B_total: {type: Number},
  wes1_f1_feed_C_total: {type: Number},
  wes2_fl_pen1_feed_type: {type: Number},
  wes2_fl_pen2_feed_type: {type: Number},
  wes2_fl_pen3_feed_type: {type: Number},
  wes2_fl_pen4_feed_type: {type: Number},
  wes2_fl_pen5_feed_type: {type: Number},
  wes2_fl_pen6_feed_type: {type: Number},
  wes2_fl_pen7_feed_type: {type: Number},
  wes2_fl_pen8_feed_type: {type: Number},
  wes2_fl_pen9_feed_type: {type: Number},
  wes2_fl_pen10_feed_type: {type: Number},
  wes2_fl_pen11_feed_type: {type: Number},
  wes2_fl_pen12_feed_type: {type: Number},
  wes2_fl_sa_silo_levels: {type: Number},
  wes2_fl_sb_silo_levels: {type: Number},
  wes2_fl_sc_silo_levels: {type: Number},
  wes2_fl_p1_lambs: {type: Number},
  wes2_fl_p2_lambs: {type: Number},
  wes2_fl_p3_lambs: {type: Number},
  wes2_fl_p4_lambs: {type: Number},
  wes2_fl_p5_lambs: {type: Number},
  wes2_fl_p6_lambs: {type: Number},
  wes2_fl_p7_lambs: {type: Number},
  wes2_fl_p8_lambs: {type: Number},
  wes2_fl_p9_lambs: {type: Number},
  wes2_fl_p10_lambs: {type: Number},
  wes2_fl_p11_lambs: {type: Number},
  wes2_fl_p12_lambs: {type: Number},



  })
function WES_FEED_Trend(){

  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes()
  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeFMT=Get_UpdateTimeMS(gvar.wes1_fl_ut)
  if (min % 10 === 0){

    if((gvar.wes1_fl_p1_feed_A==undefined || gvar.wes1_fl_p1_feed_A==null)
    ||(gvar.wes1_fl_p1_feed_B==undefined || gvar.wes1_fl_p1_feed_B==null)
    ||(gvar.wes1_fl_p1_feed_C==undefined || gvar.wes1_fl_p1_feed_C==null)
    ||(gvar.wes1_fl_p2_feed_A==undefined || gvar.wes1_fl_p2_feed_A==null)
    ||(gvar.wes1_fl_p2_feed_B==undefined || gvar.wes1_fl_p2_feed_B==null)
    ||(gvar.wes1_fl_p2_feed_C==undefined || gvar.wes1_fl_p2_feed_C==null)
    ||(gvar.wes1_fl_p3_feed_A==undefined || gvar.wes1_fl_p3_feed_A==null)
    ||(gvar.wes1_fl_p3_feed_B==undefined || gvar.wes1_fl_p3_feed_B==null)
    ||(gvar.wes1_fl_p3_feed_C==undefined || gvar.wes1_fl_p3_feed_C==null)
    ||(gvar.wes1_fl_p4_feed_A==undefined || gvar.wes1_fl_p4_feed_A==null)
    ||(gvar.wes1_fl_p4_feed_B==undefined || gvar.wes1_fl_p4_feed_B==null)
    ||(gvar.wes1_fl_p4_feed_C==undefined || gvar.wes1_fl_p4_feed_C==null)
    ||(gvar.wes1_fl_p5_feed_A==undefined || gvar.wes1_fl_p5_feed_A==null)
    ||(gvar.wes1_fl_p5_feed_B==undefined || gvar.wes1_fl_p5_feed_B==null)
    ||(gvar.wes1_fl_p5_feed_C==undefined || gvar.wes1_fl_p5_feed_C==null)
    ||(gvar.wes1_fl_p6_feed_A==undefined || gvar.wes1_fl_p6_feed_A==null)
    ||(gvar.wes1_fl_p6_feed_B==undefined || gvar.wes1_fl_p6_feed_B==null)
    ||(gvar.wes1_fl_p6_feed_C==undefined || gvar.wes1_fl_p6_feed_C==null)
    ||(gvar.wes1_fl_p7_feed_A==undefined || gvar.wes1_fl_p7_feed_A==null)
    ||(gvar.wes1_fl_p7_feed_B==undefined || gvar.wes1_fl_p7_feed_B==null)
    ||(gvar.wes1_fl_p7_feed_C==undefined || gvar.wes1_fl_p7_feed_C==null)
    ||(gvar.wes1_fl_p8_feed_A==undefined || gvar.wes1_fl_p8_feed_A==null)
    ||(gvar.wes1_fl_p8_feed_B==undefined || gvar.wes1_fl_p8_feed_B==null)
    ||(gvar.wes1_fl_p8_feed_C==undefined || gvar.wes1_fl_p8_feed_C==null)
    ||(gvar.wes1_fl_p9_feed_A==undefined || gvar.wes1_fl_p9_feed_A==null)
    ||(gvar.wes1_fl_p9_feed_B==undefined || gvar.wes1_fl_p9_feed_B==null)
    ||(gvar.wes1_fl_p9_feed_C==undefined || gvar.wes1_fl_p9_feed_C==null)
    ||(gvar.wes1_fl_p10_feed_A==undefined || gvar.wes1_fl_p10_feed_A==null)
    ||(gvar.wes1_fl_p10_feed_B==undefined || gvar.wes1_fl_p10_feed_B==null)
    ||(gvar.wes1_fl_p10_feed_C==undefined || gvar.wes1_fl_p10_feed_C==null)
    ||(gvar.wes1_fl_p11_feed_A==undefined || gvar.wes1_fl_p11_feed_A==null)
    ||(gvar.wes1_fl_p11_feed_B==undefined || gvar.wes1_fl_p11_feed_B==null)
    ||(gvar.wes1_fl_p11_feed_C==undefined || gvar.wes1_fl_p11_feed_C==null)
    ||(gvar.wes1_fl_p12_feed_A==undefined || gvar.wes1_fl_p12_feed_A==null)
    ||(gvar.wes1_fl_p12_feed_B==undefined || gvar.wes1_fl_p12_feed_B==null)
    ||(gvar.wes1_fl_p12_feed_C==undefined || gvar.wes1_fl_p12_feed_C==null)
    ||(gvar.wes1_f1_feed_A_total==undefined || gvar.wes1_f1_feed_A_total==null)
    ||(gvar.wes1_f1_feed_B_total==undefined || gvar.wes1_f1_feed_B_total==null)
    ||(gvar.wes1_f1_feed_C_total==undefined || gvar.wes1_f1_feed_C_total==null)
    ||(gvar.wes2_fl_pen1_feed_type==undefined || gvar.wes2_fl_pen1_feed_type==null)
    ||(gvar.wes2_fl_pen2_feed_type==undefined || gvar.wes2_fl_pen2_feed_type==null)
    ||(gvar.wes2_fl_pen3_feed_type==undefined || gvar.wes2_fl_pen3_feed_type==null)
    ||(gvar.wes2_fl_pen4_feed_type==undefined || gvar.wes2_fl_pen4_feed_type==null)
    ||(gvar.wes2_fl_pen5_feed_type==undefined || gvar.wes2_fl_pen5_feed_type==null)
    ||(gvar.wes2_fl_pen6_feed_type==undefined || gvar.wes2_fl_pen6_feed_type==null)
    ||(gvar.wes2_fl_pen7_feed_type==undefined || gvar.wes2_fl_pen7_feed_type==null)
    ||(gvar.wes2_fl_pen8_feed_type==undefined || gvar.wes2_fl_pen8_feed_type==null)
    ||(gvar.wes2_fl_pen9_feed_type==undefined || gvar.wes2_fl_pen9_feed_type==null)
    ||(gvar.wes2_fl_pen10_feed_type==undefined || gvar.wes2_fl_pen10_feed_type==null)
    ||(gvar.wes2_fl_pen11_feed_type==undefined || gvar.wes2_fl_pen11_feed_type==null)
    ||(gvar.wes2_fl_pen12_feed_type==undefined || gvar.wes2_fl_pen12_feed_type==null)
    ||(gvar.wes2_fl_sa_silo_levels==undefined || gvar.wes2_fl_sa_silo_levels==null)
    ||(gvar.wes2_fl_sb_silo_levels==undefined || gvar.wes2_fl_sb_silo_levels==null)
    ||(gvar.wes2_fl_sc_silo_levels==undefined || gvar.wes2_fl_sc_silo_levels==null)
    ||(gvar.wes2_fl_p1_lambs==undefined || gvar.wes2_fl_p1_lambs==null)
    ||(gvar.wes2_fl_p2_lambs==undefined || gvar.wes2_fl_p2_lambs==null)
    ||(gvar.wes2_fl_p3_lambs==undefined || gvar.wes2_fl_p3_lambs==null)
    ||(gvar.wes2_fl_p4_lambs==undefined || gvar.wes2_fl_p4_lambs==null)
    ||(gvar.wes2_fl_p5_lambs==undefined || gvar.wes2_fl_p5_lambs==null)
    ||(gvar.wes2_fl_p6_lambs==undefined || gvar.wes2_fl_p6_lambs==null)
    ||(gvar.wes2_fl_p7_lambs==undefined || gvar.wes2_fl_p7_lambs==null)
    ||(gvar.wes2_fl_p8_lambs==undefined || gvar.wes2_fl_p8_lambs==null)
    ||(gvar.wes2_fl_p9_lambs==undefined || gvar.wes2_fl_p9_lambs==null)
    ||(gvar.wes2_fl_p10_lambs==undefined || gvar.wes2_fl_p10_lambs==null)
    ||(gvar.wes2_fl_p11_lambs==undefined || gvar.wes2_fl_p11_lambs==null)
    ||(gvar.wes2_fl_p12_lambs==undefined || gvar.wes2_fl_p12_lambs==null)





    || updateTimeFMT<fiveMinAgo){}
    else
     {
       var WES_FEED_TREND = mongoose.model('WES_FEED_TREND',WES_FEED_TrendSchema,'WES_FEED_TREND')
       var wes_feed_TREND = new WES_FEED_TREND({
        date: date,
        wes1_fl_p1_feed_A:gvar.wes1_fl_p1_feed_A,
        wes1_fl_p1_feed_B:gvar.wes1_fl_p1_feed_B,
        wes1_fl_p1_feed_C:gvar.wes1_fl_p1_feed_C,
        wes1_fl_p2_feed_A:gvar.wes1_fl_p2_feed_A,
        wes1_fl_p2_feed_B:gvar.wes1_fl_p2_feed_B,
        wes1_fl_p2_feed_C:gvar.wes1_fl_p2_feed_C,
        wes1_fl_p3_feed_A:gvar.wes1_fl_p3_feed_A,
        wes1_fl_p3_feed_B:gvar.wes1_fl_p3_feed_B,
        wes1_fl_p3_feed_C:gvar.wes1_fl_p3_feed_C,
        wes1_fl_p4_feed_A:gvar.wes1_fl_p4_feed_A,
        wes1_fl_p4_feed_B:gvar.wes1_fl_p4_feed_B,
        wes1_fl_p4_feed_C:gvar.wes1_fl_p4_feed_C,
        wes1_fl_p5_feed_A:gvar.wes1_fl_p5_feed_A,
        wes1_fl_p5_feed_B:gvar.wes1_fl_p5_feed_B,
        wes1_fl_p5_feed_C:gvar.wes1_fl_p5_feed_C,
        wes1_fl_p6_feed_A:gvar.wes1_fl_p6_feed_A,
        wes1_fl_p6_feed_B:gvar.wes1_fl_p6_feed_B,
        wes1_fl_p6_feed_C:gvar.wes1_fl_p6_feed_C,
        wes1_fl_p7_feed_A:gvar.wes1_fl_p7_feed_A,
        wes1_fl_p7_feed_B:gvar.wes1_fl_p7_feed_B,
        wes1_fl_p7_feed_C:gvar.wes1_fl_p7_feed_C,
        wes1_fl_p8_feed_A:gvar.wes1_fl_p8_feed_A,
        wes1_fl_p8_feed_B:gvar.wes1_fl_p8_feed_B,
        wes1_fl_p8_feed_C:gvar.wes1_fl_p8_feed_C,
        wes1_fl_p9_feed_A:gvar.wes1_fl_p9_feed_A,
        wes1_fl_p9_feed_B:gvar.wes1_fl_p9_feed_B,
        wes1_fl_p9_feed_C:gvar.wes1_fl_p9_feed_C,
        wes1_fl_p10_feed_A:gvar.wes1_fl_p10_feed_A,
        wes1_fl_p10_feed_B:gvar.wes1_fl_p10_feed_B,
        wes1_fl_p10_feed_C:gvar.wes1_fl_p10_feed_C,
        wes1_fl_p11_feed_A:gvar.wes1_fl_p11_feed_A,
        wes1_fl_p11_feed_B:gvar.wes1_fl_p11_feed_B,
        wes1_fl_p11_feed_C:gvar.wes1_fl_p11_feed_C,
        wes1_fl_p12_feed_A:gvar.wes1_fl_p12_feed_A,
        wes1_fl_p12_feed_B:gvar.wes1_fl_p12_feed_B,
        wes1_fl_p12_feed_C:gvar.wes1_fl_p12_feed_C,
        wes1_f1_feed_A_total:gvar.wes1_f1_feed_A_total,
        wes1_f1_feed_B_total:gvar.wes1_f1_feed_B_total,
        wes1_f1_feed_C_total:gvar.wes1_f1_feed_C_total,
        wes2_fl_pen1_feed_type:gvar.wes2_fl_pen1_feed_type,
        wes2_fl_pen2_feed_type:gvar.wes2_fl_pen2_feed_type,
        wes2_fl_pen3_feed_type:gvar.wes2_fl_pen3_feed_type,
        wes2_fl_pen4_feed_type:gvar.wes2_fl_pen4_feed_type,
        wes2_fl_pen5_feed_type:gvar.wes2_fl_pen5_feed_type,
        wes2_fl_pen6_feed_type:gvar.wes2_fl_pen6_feed_type,
        wes2_fl_pen7_feed_type:gvar.wes2_fl_pen7_feed_type,
        wes2_fl_pen8_feed_type:gvar.wes2_fl_pen8_feed_type,
        wes2_fl_pen9_feed_type:gvar.wes2_fl_pen9_feed_type,
        wes2_fl_pen10_feed_type:gvar.wes2_fl_pen10_feed_type,
        wes2_fl_pen11_feed_type:gvar.wes2_fl_pen11_feed_type,
        wes2_fl_pen12_feed_type:gvar.wes2_fl_pen12_feed_type,
        wes2_fl_sa_silo_levels:gvar.wes2_fl_sa_silo_levels,
        wes2_fl_sb_silo_levels:gvar.wes2_fl_sb_silo_levels,
        wes2_fl_sc_silo_levels:gvar.wes2_fl_sc_silo_levels,
        wes2_fl_p1_lambs:gvar.wes2_fl_p1_lambs,
        wes2_fl_p2_lambs:gvar.wes2_fl_p2_lambs,
        wes2_fl_p3_lambs:gvar.wes2_fl_p3_lambs,
        wes2_fl_p4_lambs:gvar.wes2_fl_p4_lambs,
        wes2_fl_p5_lambs:gvar.wes2_fl_p5_lambs,
        wes2_fl_p6_lambs:gvar.wes2_fl_p6_lambs,
        wes2_fl_p7_lambs:gvar.wes2_fl_p7_lambs,
        wes2_fl_p8_lambs:gvar.wes2_fl_p8_lambs,
        wes2_fl_p9_lambs:gvar.wes2_fl_p9_lambs,
        wes2_fl_p10_lambs:gvar.wes2_fl_p10_lambs,
        wes2_fl_p11_lambs:gvar.wes2_fl_p11_lambs,
        wes2_fl_p12_lambs:gvar.wes2_fl_p12_lambs,


     })
     wes_feed_TREND.save()
   }
  }setTimeout(WES_FEED_Trend, 60000);
  }


  var WES_FEED_FillingTotal_Scheme = mongoose.Schema({
    date:{type: Date},
    wes_fl_saft:{type: Number},
    wes_fl_sbft:{type: Number},
    wes_fl_scft:{type: Number},

    })
  function WES_FEED_FillingTotal(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    var fiveMinAgo = Get_5Min_Ago();
    var updateTime_UIT_FC=Get_UpdateTimeMS(gvar.wes1_fl_ut)
    if (hour==23 && min==50){
      if((gvar.wes_fl_saft==undefined || gvar.wes_fl_saft==null)
      || (gvar.wes_fl_sbft==undefined || gvar.wes_fl_sbft==null)
      || (gvar.wes_fl_scft==undefined || gvar.wes_fl_scft==null)
      || updateTime_UIT_FC<fiveMinAgo)
      {}
      else
      {
        var WES_FEED_FILLINGTOTAL = mongoose.model('WES_FEED_FILLINGTOTAL',WES_FEED_FillingTotal_Scheme,'WES_FEED_FILLINGTOTAL')
        var wes_FEED_FILLINGTOTAL = new WES_FEED_FILLINGTOTAL({
         date: date,
         wes_fl_saft: gvar.wes_fl_saft,
         wes_fl_sbft: gvar.wes_fl_sbft,
         wes_fl_scft: gvar.wes_fl_scft
      })
      wes_FEED_FILLINGTOTAL.save()
    }
     }setTimeout(WES_FEED_FillingTotal, 60000);
  }




  var WES_FEED_FeedTotal_Scheme = mongoose.Schema({
    date:{type: Date},
    wes1_f1_feed_A_total:{type: Number},
    wes1_f1_feed_B_total:{type: Number},
    wes1_f1_feed_C_total:{type: Number},

    })
  function WES_FEED_FeedTotal(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
    var fiveMinAgo = Get_5Min_Ago();
    var updateTime_UIT_FC=Get_UpdateTimeMS(gvar.wes1_fl_ut)
    if (hour==23 && min==50){
      if((gvar.wes1_f1_feed_A_total==undefined || gvar.wes1_f1_feed_A_total==null)
      || (gvar.wes1_f1_feed_B_total==undefined || gvar.wes1_f1_feed_B_total==null)
      || (gvar.wes1_f1_feed_C_total==undefined || gvar.wes1_f1_feed_C_total==null)
      || updateTime_UIT_FC<fiveMinAgo)
      {}
      else
      {
        var WES_FEED_FEEDTOTAL = mongoose.model('WES_FEED_FEEDTOTAL',WES_FEED_FeedTotal_Scheme,'WES_FEED_FEEDTOTAL')
        var wes_FEED_FEEDTOTAL = new WES_FEED_FEEDTOTAL({
         date: date,
         wes1_f1_feed_A_total: gvar.wes1_f1_feed_A_total,
         wes1_f1_feed_B_total: gvar.wes1_f1_feed_B_total,
         wes1_f1_feed_C_total: gvar.wes1_f1_feed_C_total
      })
      wes_FEED_FEEDTOTAL.save()
    }
     }setTimeout(WES_FEED_FeedTotal, 60000);
  }

  function Get_UpdateTimeMS(UT){
    var updateTime = UT
    var  updateTimeMS =Date.parse(updateTime)
        return updateTimeMS}

  function Get_5Min_Ago(){
  var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
  var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
  var dateminus10minMS = cuurentDateMS - 300000
  return dateminus10minMS
  }



  function Get_UpdateTimeMS(UT){
    var updateTime = UT
    var  updateTimeMS =Date.parse(updateTime)
        return updateTimeMS}

  function Get_5Min_Ago(){
  var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
  var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
  var dateminus10minMS = cuurentDateMS - 300000
  return dateminus10minMS
  }


