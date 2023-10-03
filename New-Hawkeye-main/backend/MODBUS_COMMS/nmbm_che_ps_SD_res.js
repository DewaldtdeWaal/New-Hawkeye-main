//Serves as a basic template for all future sites.

module.exports = {readVal_CHE_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.10';
//Memoryword(MW) you start at
var regStart=910;
//Amount of Memorywords you have
var regNum = 328 ;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_CHE_R(){
  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, timeout)
  const options = {
  'host' : ip,
  'port' : 502
  };
  socket.connect(options);
  socket.on("connect", function() {
    client
      .readHoldingRegisters(regStart,regNum)
      .then(function(resp) {
        var val = (resp.response._body.values);
        socket.end();
        mbtimeout = mbCycleTime;


/////////////////////////////////////////////Input code

var rawData = new ArrayBuffer(32);
var i = new Uint16Array(rawData);
var f = new Float32Array(rawData);

i[0] = val[0];
i[1] = val[1];

i[2] = val[28]
i[3] = val[29]

i[0] = val[100];
i[1] = val[101];

i[2] = val[128]
i[3] = val[129]

i[4] = val[200];
i[5] = val[201];

i[6] = val[228]
i[7] = val[229]

i[8] = val[300];
i[9] = val[301];

i[10] = val[328]
i[11] = val[329]



    gvar.che_ps_pumpset_1_del_pressure = parseFloat(f[0]).toFixed(3);
    gvar.che_ps_pumpset_1_suct_pressure = parseFloat(f[1]).toFixed(3)

    gvar.che_ps_pumpset_2_del_pressure = parseFloat(f[2]).toFixed(3);
    gvar.che_ps_pumpset_2_suct_pressure = parseFloat(f[3]).toFixed(3)


    gvar.che_ps_pumpset_3_del_pressure = parseFloat(f[4]).toFixed(3);
    gvar.che_ps_pumpset_3_suct_pressure = parseFloat(f[5]).toFixed(3)

    gvar.che_ps_pumpset_4_del_pressure = parseFloat(f[6]).toFixed(3);
    gvar.che_ps_pumpset_4_suct_pressure = parseFloat(f[7]).toFixed(3)



    if(gvar.che_ps_pumpset_1_del_pressure!=undefined || gvar.che_ps_pumpset_1_del_pressure!=null){

      var MongoClient = require('mongodb').MongoClient;
      var url= gvar.standardConnectionString;


var firstValue ={
  che_ps_pumpset_1_del_pressure:gvar.che_ps_pumpset_1_del_pressure,
che_ps_pumpset_1_suct_pressure:gvar.che_ps_pumpset_1_suct_pressure,
che_ps_pumpset_2_del_pressure:gvar.che_ps_pumpset_2_del_pressure,
che_ps_pumpset_2_suct_pressure:gvar.che_ps_pumpset_2_suct_pressure,
che_ps_pumpset_3_del_pressure:gvar.che_ps_pumpset_3_del_pressure,
che_ps_pumpset_3_suct_pressure:gvar.che_ps_pumpset_3_suct_pressure,
che_ps_pumpset_4_del_pressure:gvar.che_ps_pumpset_4_del_pressure,
che_ps_pumpset_4_suct_pressure:gvar.che_ps_pumpset_4_suct_pressure,

id:"nmbm_che_ps_res"

}
fun.storeInDB(firstValue,"R_CurrentVals")


      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("HawkEye");


        dbo.collection("R_CurrentVals").findOne({id:{$all: ['nmbm_che_ps_res']}}, function(err, result) {

          if (result!=null){}
          else{
            dbo.collection("R_CurrentVals").insertOne(firstValue, function() {

            });
          }



      })
      var myquery = { id: "nmbm_che_ps_res"};
      var newvalues = {$set: firstValue



      };
      dbo.collection("R_CurrentVals").updateOne(myquery, newvalues, function(err, res){
        if (err) throw err;
        db.close();



       })


      })




            }

         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });
  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});
//Make sure this matches the method Name
  setTimeout(readVal_CHE_R, mbtimeout);
  }





