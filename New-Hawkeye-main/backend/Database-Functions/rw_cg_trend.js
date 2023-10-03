const mongoose = require('mongoose');
const gvar = require('../variables')


module.exports = {CG_Trend};


var CG_TrendSchema = mongoose.Schema({
  date:{type: Date},
  common_suction_pressure: {type: Number},
  common_delivery_pressure: {type: Number},
  sump_level: {type: Number},
  tower1_level: {type: Number},
  tower1_inlet_flow: {type: Number},
  tower1_outlet_flow: {type: Number},
  tower2_level: {type: Number},
  tower2_inlet_flow: {type: Number},
  tower2_outlet_flow: {type: Number},

  })
function CG_Trend(){
  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes()

  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeCG=Get_UpdateTimeMS(gvar.cg_G_UT)



  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;

  if (min % 10 === 0){

    if((gvar.cg_G_SUC_PRESS==undefined || gvar.cg_G_SUC_PRESS==null)
    ||(gvar.cg_G_DEL_PRESS==undefined || gvar.cg_G_DEL_PRESS==null)
    ||(gvar.cg_G_SUMP_LVL==undefined || gvar.cg_G_SUMP_LVL==null)
    ||(gvar.cg_T1_LVL==undefined || gvar.cg_T1_LVL==null)
    ||(gvar.cg_T1_INLET_F==undefined || gvar.cg_T1_INLET_F==null)
    ||(gvar.cg_T1_OUTLET_F==undefined || gvar.cg_T1_OUTLET_F==null)
    ||(gvar.cg_T2_LVL==undefined || gvar.cg_T2_LVL==null)
    ||(gvar.cg_T2_INLET_F==undefined || gvar.cg_T2_INLET_F==null)
    ||(gvar.cg_T2_OUTLET_F==undefined || gvar.cg_T2_OUTLET_F==null) || updateTimeCG<fiveMinAgo){}
    else
    {
      var RW_CG_PS_TREND = mongoose.model('RW_CG_PS_TREND',CG_TrendSchema,'RW_CG_PS_TREND')
      var cg_TREND = new RW_CG_PS_TREND({
        date:date,
  common_suction_pressure: gvar.cg_G_SUC_PRESS,
  common_delivery_pressure: gvar.cg_G_DEL_PRESS,
  sump_level: gvar.cg_G_SUMP_LVL,
  tower1_level: gvar.cg_T1_LVL,
  tower1_inlet_flow: gvar.cg_T1_INLET_F,
  tower1_outlet_flow: gvar.cg_T1_OUTLET_F,
  tower2_level: gvar.cg_T2_LVL,
  tower2_inlet_flow: gvar.cg_T2_INLET_F,
  tower2_outlet_flow: gvar.cg_T2_OUTLET_F,
    })

    cg_TREND.save()
  }
   }setTimeout(CG_Trend, 60000);

}



function Get_UpdateTimeMS(UT){
  var updateTime = UT
  var  updateTimeMS =Date.parse(updateTime)
      return updateTimeMS}

function Get_5Min_Ago(){
  // Get current date minus 5 min in milliseconds
var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
var dateminus10minMS = cuurentDateMS - 300000
return dateminus10minMS
}
