const mongoose = require('mongoose');
const gvar = require('../variables')


module.exports={ISUZU_AUTO_Trend}


var ISUZU_AUTO_TrendSchema = mongoose.Schema({
  date:{type: Date},
  isuzu_oven1_vsd_speed: {type: Number},
  isuzu_oven1_heat_ecvh_temp: {type: Number},
  isuzu_oven1_temp1: {type: Number},
  isuzu_oven1_temp2: {type: Number},
  isuzu_oven2_vsd_speed: {type: Number},
  isuzu_oven2_heat_ecvh_temp: {type: Number},
  isuzu_oven2_temp1: {type: Number},
  isuzu_oven2_temp2: {type: Number},
  })

  function ISUZU_AUTO_Trend(){
    var now =  new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var fiveMinAgo = Get_5Min_Ago();
    var updateTimeVW=Get_UpdateTimeMS(gvar.isuzu_ut)

    var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

    if (date){
      if(gvar.isuzu_oven1_vsd_speed ==  undefined || gvar.isuzu_oven1_vsd_speed == null ||
        gvar.isuzu_oven1_heat_ecvh_temp == undefined || gvar.isuzu_oven1_heat_ecvh_temp == null ||
        gvar.isuzu_oven1_temp1 ==undefined || gvar.isuzu_oven1_temp1==null ||
        gvar.isuzu_oven1_temp2 ==undefined || gvar.isuzu_oven1_temp2==null ||
        gvar.isuzu_oven2_vsd_speed ==  undefined || gvar.isuzu_oven2_vsd_speed == null ||
        gvar.isuzu_oven2_heat_ecvh_temp == undefined || gvar.isuzu_oven2_heat_ecvh_temp == null ||
        gvar.isuzu_oven2_temp1 ==undefined || gvar.isuzu_oven2_temp1==null ||
        gvar.isuzu_oven2_temp2 ==undefined || gvar.isuzu_oven2_temp2==null ||




       updateTimeVW<fiveMinAgo){}
      else{
        var ISUZU_TREND = mongoose.model('ISUZU_TREND',ISUZU_AUTO_TrendSchema,'ISUZU_TREND')
        var isuzu_TREND = new ISUZU_TREND({
         date: date,
         isuzu_oven1_vsd_speed: gvar.isuzu_oven1_vsd_speed,
         isuzu_oven1_heat_ecvh_temp: gvar.isuzu_oven1_heat_ecvh_temp,
         isuzu_oven1_temp1:gvar.isuzu_oven1_temp1,
         isuzu_oven1_temp2: gvar.isuzu_oven1_temp2,
         isuzu_oven2_vsd_speed:gvar.isuzu_oven2_vsd_speed,
         isuzu_oven2_heat_ecvh_temp: gvar.isuzu_oven2_heat_ecvh_temp,
         isuzu_oven2_temp1: gvar.isuzu_oven2_temp1,
         isuzu_oven2_temp2:gvar.isuzu_oven2_temp2,
      })
      isuzu_TREND.save()
    }
    }setTimeout(ISUZU_AUTO_Trend, 60000);
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
