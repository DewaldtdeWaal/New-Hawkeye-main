const express = require("express");
const router = express.Router();
const gvar = require('../../variables')
















function GetRouteData(path, ID){
  router.get(path, function (req,res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");

      var query = {id: ID};
      var routingArray=[]
      dbo.collection("PS_CurrentVals").find(query).toArray(function(err,data){

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
  })
}
GetRouteData("/buffelsfontein/values",'nmbm_bf_ps')
GetRouteData("/crowngardens/values",'rw_cg_ps')
GetRouteData("/motherwell/values",'nmbm_mw_ps')
GetRouteData("/nmu-effluent/values",'nmbm_nmu_eff_ps')
GetRouteData("/vanstadens/values",'nmbm_vs_ps')
GetRouteData("/bluehorizonbay/values",'nmbm_bh_ps')
GetRouteData("/stormsriver/values",'storms_ps')
GetRouteData("/chatty/values","nmbm_cht_ps_res")
GetRouteData("/pumpstations/heatherbank/values","heaterbank_pump")
GetRouteData("/hawkeye/pumpstations/stanford-road","nmbm_stan_ps")



module.exports = router;
