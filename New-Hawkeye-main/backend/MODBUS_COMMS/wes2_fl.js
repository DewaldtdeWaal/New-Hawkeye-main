module.exports = {readVal_wes2_fl};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.36';
//Memoryword(MW) you start at
var regStart = 158;
//Amount of Memorywords you have
var regNum = 60;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_wes2_fl(){
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
gvar.wes2_fl_pen1_feed_type = val[0]
gvar.wes2_fl_pen2_feed_type = val[1]
gvar.wes2_fl_pen3_feed_type = val[2]
gvar.wes2_fl_pen4_feed_type = val[3]
gvar.wes2_fl_pen5_feed_type = val[4]
gvar.wes2_fl_pen6_feed_type = val[5]
gvar.wes2_fl_pen7_feed_type = val[6]
gvar.wes2_fl_pen8_feed_type = val[7]
gvar.wes2_fl_pen9_feed_type = val[8]
gvar.wes2_fl_pen10_feed_type = val[9]
gvar.wes2_fl_pen11_feed_type = val[10]
gvar.wes2_fl_pen12_feed_type = val[11]
gvar.wes2_fl_sa_silo_levels = val[13]
gvar.wes2_fl_sb_silo_levels = val[14]
gvar.wes2_fl_sc_silo_levels = val[15]



gvar.wes2_fl_p1_lambs=val[32]
gvar.wes2_fl_p2_lambs=val[33]
gvar.wes2_fl_p3_lambs=val[34]
gvar.wes2_fl_p4_lambs=val[35]
gvar.wes2_fl_p5_lambs=val[36]
gvar.wes2_fl_p6_lambs=val[37]
gvar.wes2_fl_p7_lambs=val[38]
gvar.wes2_fl_p8_lambs=val[39]
gvar.wes2_fl_p9_lambs=val[40]
gvar.wes2_fl_p10_lambs=val[41]
gvar.wes2_fl_p11_lambs=val[42]
gvar.wes2_fl_p12_lambs=val[43]
gvar.wes_fl_saft= val[44]
gvar.wes_fl_sbft= val[45]
gvar.wes_fl_scft= val[46]
// console.log("Memory Word 1000")
// console.log(val[842])

if(gvar.wes2_fl_pen1_feed_type!=undefined || gvar.wes2_fl_pen1_feed_type!=null){

var MongoClient = require('mongodb').MongoClient;
var url= gvar.standardConnectionString;


var firstValue={
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
  wes_fl_saft:gvar.wes_fl_saft,
  wes_fl_sbft:gvar.wes_fl_sbft,
  wes_fl_scft:gvar.wes_fl_scft,

    id:"wes1_fl"

};

    fun.storeInDB(firstValue, "FL_CurrentVals");


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
  setTimeout(readVal_wes2_fl, mbtimeout);
  }





