//Name of my schema (blueprint for mongodb)
var NMBM_MW_PS_TrendSchema = mongoose.Schema({
  date:{type: Date},
  level: {type: Number},
  grassridge_inlet_flow_rate: {type: Number},
  delivery_pressure:{type: Number},



})

function NMBM_MW_PS_Trend(){
  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var fiveMinAgo = Get_5Min_Ago();
  var updateTimeVW=Get_UpdateTimeMS(gvar.vw_ut)

  var date = year + "-" + month + "-" + day +" "+ hour +":"+ min;
  if (min == 00 || min == 10 || min == 20 || min == 30 || min == 40 || min == 50)
  {
if (date){
    if(gvar.mw_g_common_suction_pressure ==  undefined || gvar.mw_g_common_suction_pressure == null ||
      gvar.mw_g_common_delivery_pressure == undefined || gvar.mw_g_common_delivery_pressure == null ||
      gvar.mw_g_flowrate ==undefined || gvar.mw_g_flowrate==null ||
     updateTimeVW<fiveMinAgo){}
    else{
      var NMBM_MW_PS_Trend = mongoose.model('NMBM_MW_PS_Trend',NMBM_MW_PS_TrendSchema,'NMBM_MW_PS_Trend')
      var nmbm_MW_PS_Trend = new NMBM_MW_PS_Trend({
       date: date,
       flowRate: gvar.mw_g_flowrate,
  suction_pressure: gvar.mw_g_common_suction_pressure,
  delivery_pressure:gvar.mw_g_common_delivery_pressure
    })
    nmbm_MW_PS_Trend.save()
  }
  }}setTimeout(NMBM_MW_PS_Trend, 60000);
}
