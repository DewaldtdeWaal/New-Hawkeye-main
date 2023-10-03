const express = require("express");
const router = express.Router();
const gvar = require('../../variables');

var MongoClient = require('mongodb').MongoClient;
var url = gvar.standardConnectionString;
var dbo
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    dbo = db.db("HawkEye");

})





getRoutingFunctions("/hawkeye/reservoirs/airport", "air_prt", "R_CurrentVals");

getRoutingFunctions("/hawkeye/alarms", "ALARMS", "ALARMS_CurrentVals");
getRoutingFunctions("/hawkeye/auto/isuzu", "isuzu_auto", "AUTO_CurrentVals");
getRoutingFunctions("/wessels/values", "wes1_fl", "FL_CurrentVals");
getRoutingFunctions("/bethelsdorp/values", "nmbm_beth_fpt", "FPT_CurrentVals");
getRoutingFunctions("/fptCurrentvals/values", "fpt_currentvals", "F_CurrentVals");
getRoutingFunctions("/coegaidzt/values", "nmbm_cidzt_fpt", "FPT_CurrentVals");
getRoutingFunctions("/fmtower/values", "nmbm_fmt_fm", "FPT_CurrentVals");
getRoutingFunctions("/gamtoos-bridge/values", "nmbm_gt_brg_fpt", "FPT_CurrentVals");
getRoutingFunctions("/uitenhage-flow-chamber/values", "nmbm_uit_fc_fpt", "FPT_CurrentVals");
getRoutingFunctions("/jeffreysBay/values", "jeffreys_bay", "FPT_CurrentVals");
getRoutingFunctions("/fptsites/gamtoos-break-water", "nmbm_gbw_fpt", "FPT_CurrentVals");
getRoutingFunctions("/groundwater/kareedouwk1", "nmbm_kark_gw", "GRDW_CurrentVals");
getRoutingFunctions("/hawkeye/groundwater/humerail/values", "nmbm_hum_gw", "GRDW_CurrentVals");
getRoutingFunctions("/hawkeye/groundwater/kruisfontein/values", "Kuis", "GRDW_CurrentVals");
getRoutingFunctions("/humansdorp/values", "klm_hup_gw", "GRDW_CurrentVals");
getRoutingFunctions("/humansdorp2/values", "klm_hup2_gw", "GRDW_CurrentVals");
getRoutingFunctions("/humansdorp3/values", "klm_hup3_gw", "GRDW_CurrentVals");
getRoutingFunctions("/humansdorp4/values", "klm_hup4_gw", "GRDW_CurrentVals");
getRoutingFunctions("/humansdorp6/values", "klm_hup6_gw", "GRDW_CurrentVals");
getRoutingFunctions("/newtonpark/values", "npp", "GRDW_CurrentVals");
getRoutingFunctions("/buffelsfontein/values", "nmbm_bf_ps", "PS_CurrentVals");
getRoutingFunctions("/crowngardens/values", "rw_cg_ps", "PS_CurrentVals");
getRoutingFunctions("/motherwell/values", "nmbm_mw_ps", "PS_CurrentVals");
getRoutingFunctions("/nmu-effluent/values", "nmbm_nmu_eff_ps", "PS_CurrentVals");
getRoutingFunctions("/vanstadens/values", "nmbm_vs_ps", "PS_CurrentVals");
getRoutingFunctions("/bluehorizonbay/values", "nmbm_bh_ps", "PS_CurrentVals");
getRoutingFunctions("/stormsriver/values", "storms_ps", "PS_CurrentVals");
getRoutingFunctions("/chatty/values", "nmbm_cht_ps_res", "PS_CurrentVals");
getRoutingFunctions("/pumpstations/heatherbank/values", "heaterbank_pump", "PS_CurrentVals");
getRoutingFunctions("/hawkeye/pumpstations/stanford-road", "nmbm_stan_ps", "PS_CurrentVals");
getRoutingFunctions("/hawkeye/pumpstations/ps-overview/values", "PS_OVERVIEW", "PUMP_CurrentVals");
getRoutingFunctions("/stanfordroad", 1, "stan-site-controls");
getRoutingFunctions("/chatty/res/values", "nmbm_cht_ps_res", "R_CurrentVals");
getRoutingFunctions("/chelsea/values", "nmbm_che_ps_res", "R_CurrentVals");
getRoutingFunctions("/coegakop/values", "cgk", "R_CurrentVals");
getRoutingFunctions("/res-currentvals/values", "res_overview", "Res_CurrentVals");
getRoutingFunctions("/hawkeye/reservoirs/oliphantskop", "nmbm_olip_r", "R_CurrentVals");
getRoutingFunctions("/reservoirs/bluehorizonbay/values", "nmbm_bh_r", "R_CurrentVals");
getRoutingFunctions("/greenbushes/values", "nmbm_gb_r", "R_CurrentVals");
getRoutingFunctions("/grassridge/values", "nmbm_gr_wtw_r", "R_CurrentVals");
getRoutingFunctions("/lovemoreheights/values", "nmbm_lh_ps_r", "R_CurrentVals");
getRoutingFunctions("/rosedale/values", "nmbm_rd_r", "R_CurrentVals");
getRoutingFunctions("/summit/values", "nmbm_sm_r", "R_CurrentVals");
getRoutingFunctions("/theescombe/values", "nmbm_tc_ps_r", "R_CurrentVals");
getRoutingFunctions("/vanriebeekhoogte/values", "nmbm_vrh_ps_r", "R_CurrentVals");
getRoutingFunctions("/vanstadens/res/values", "nmbm_vs_r", "R_CurrentVals");
getRoutingFunctions("/hawkeye/reservoirs/bushypark", "nmbm_bush_r", "R_CurrentVals");
getRoutingFunctions("/hawkeye/reservoirs/emeraldhill", "nmbm_emer_r", "R_CurrentVals");
getRoutingFunctions("/hawkeye/reservoirs/driftsands", "nmbm_drift_res", "R_CurrentVals");
getRoutingFunctions("/hawkeye/reservoirs/schoemanshoek", "nmbm_schoe_r", "R_CurrentVals");
getRoutingFunctions("/hawkeye/reservoirs/kwanobuhle", "nmbm_kwano_r", "R_CurrentVals");
getRoutingFunctions("/hawkeye/reservoirs/graaf", "graaf", "R_CurrentVals");
getRoutingFunctions("/hawkeye/reservoirs/malibar", "nmbm_mali_r", "R_CurrentVals");
getRoutingFunctions("/stormsriver-wtw/values", "storms_wtw", "WTW_CurrentVals");
getRoutingFunctions("/Nooitgedacht-wtw/values", "nmbm_ngt_wtw", "WTW_CurrentVals");
getRoutingFunctions("/hawkeye/wtw/elands", "nmbm_elands_wtw", "WTW_CurrentVals");
getRoutingFunctions("/hawkeye/wtw/st-georges", "nmbm_st_georges_wtw", "WTW_CurrentVals");
getRoutingFunctions("/hawkeye/wtw/humansdorpwtw", "klm_hup_wtw", "WTW_CurrentVals");








function getRoutingFunctions(path, ID, collection){
  router.get(path, function (req,res) {

    var query = {id: ID};
    var routingArray=[]
    dbo.collection(collection).find(query).toArray(function(err,data){

      if(err) throw err;
      var i=0;
      while (i < data.length)
          {
            routingArray[i] =data[i]
               i++;
           }
      res.status(200).json({
        routingArray
           });



    })


  })


}


router.post("/pageValues", async (req, res) => {
  console.log(req.body);
  var query = {id: req.body.Id};
  db.collection(req.body.Collection).findOne(query, function(err, data){
    if(err) throw err;
    res.status(200).json(data);
  })
})
router.get("/pageValues", function (req,res) {

  var query = {id: "klm_hup_wtw"};
  var routingArray=[]
  dbo.collection("WTW_CurrentVals").find(query).toArray(function(err,data){

    if(err) throw err;
    var i=0;
    while (i < data.length)
        {
          routingArray[i] =data[i]
             i++;
         }
    res.status(200).json({
      routingArray
         });



  })


})

module.exports = router;
