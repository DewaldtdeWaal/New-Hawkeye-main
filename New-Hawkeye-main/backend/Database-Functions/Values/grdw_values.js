module.exports = {GetVal_npp};
const gvar = require('../../variables')

function GetVal_npp(){
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {id:"npp"};


    dbo.collection("GRDW_CurrentVals").find(query).toArray(function(err,data){

      if(err) throw err;

      gvar.last_update=data[0].last_update
      gvar.pumprunning=data[0].pumprunning
      gvar.pumpmode=data[0].pumpmode
      gvar.status=data[0].status
      gvar.runhours=data[0].runhours
      gvar.flowrate=data[0].flowrate
      gvar.totalflow=data[0].totalflow
      gvar.annualyieldsetpoint=data[0].annualyieldsetpoint
      gvar.totalyieldtodate=data[0].totalyieldtodate
      gvar.boreholelevel=data[0].boreholelevel
      gvar.voltage=data[0].voltage
      gvar.current=data[0].current
      gvar.power=data[0].power
      gvar.totalpower=data[0].totalpower
      gvar.estopactive=data[0].estopactive
      gvar.vsdfault=data[0].vsdfault
      gvar.paneldooropen=data[0].paneldooropen
      gvar.lowflow=data[0].lowflow
      gvar.lowlevel=data[0].lowlevel
      gvar.annualabstractionlimitreached=data[0].annualabstractionlimitreached
      gvar.flowcomsfail=data[0].flowcomsfail
      gvar.levelwarning=data[0].levelwarning
      gvar.pumprest=data[0].pumprest
      gvar.recoverylevelnotreached=data[0].recoverylevelnotreached
      gvar.faultactive=data[0].faultactive
      gvar.voltageok=data[0].voltageok
      gvar.recoverytime=data[0].recoverytime
      gvar.chargerfault=data[0].chargerfault
      gvar.pressure=data[0].pressure
      gvar.targetflowsetpoint=data[0].targetflowsetpoint
      gvar.vsdfrequency=data[0].vsdfrequency

	})
  })
}
