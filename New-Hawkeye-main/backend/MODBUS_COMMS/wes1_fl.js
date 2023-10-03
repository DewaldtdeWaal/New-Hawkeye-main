module.exports = {readVal_wes1_fl};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')

//Get IP address from Daniel
var ip = gvar.mbusIP +'.36';
//Memoryword(MW) you start at
var regStart = 500;
//Amount of Memorywords you have
var regNum = 78;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_wes1_fl(){
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
var p = parseInt(val[0]);
var m = [];
for (var i=0; i<32; i++) {
    // test top bit and set corresponding payload
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1; // divide by two and keep as an integer
}
m.reverse();


gvar.wes1_fl_ut =  Date().slice(4,Date().length-41);

var rawData = new ArrayBuffer(156);
        var i = new Uint16Array(rawData);
        var ii  = new Float32Array(rawData);


        i[0] = val[0]; //low
        i[1] = val[1]; //high
        i[2] = val[2]; //low
        i[3] = val[3]; //high
        i[4] = val[4]; //low
        i[5] = val[5]; //high
        i[6] = val[6]; //low
        i[7] = val[7]; //high
        i[8] = val[8]; //low
        i[9] = val[9]; //high
        i[10] = val[10]; //low
        i[11] = val[11]; //high
        i[12] = val[12]; //low
        i[13] = val[13]; //high
        i[14] = val[14]; //low
        i[15] = val[15]; //high
        i[16] = val[16]; //low
        i[17] = val[17]; //high
        i[18] = val[18]; //low
        i[19] = val[19]; //high
        i[20] = val[20]; //low
        i[21] = val[21]; //high
        i[22] = val[22]; //low
        i[23] = val[23]; //high
        i[24] = val[24]; //low
        i[25] = val[25]; //high
        i[26] = val[26]; //low
        i[27] = val[27]; //high
        i[28] = val[28]; //low
        i[29] = val[29]; //high
        i[30] = val[30]; //low
        i[31] = val[31]; //high
        i[32] = val[32]; //low
        i[33] = val[33]; //high
        i[34] = val[34]; //low
        i[35] = val[35]; //high
        i[36] = val[36]; //low
        i[37] = val[37]; //high
        i[38] = val[38]; //low
        i[39] = val[39]; //high
        i[40] = val[40]; //low
        i[41] = val[41]; //high
        i[42] = val[42]; //low
        i[43] = val[43]; //high
        i[44] = val[44]; //low
        i[45] = val[45]; //high
        i[46] = val[46]; //low
        i[47] = val[47]; //high
        i[48] = val[48]; //low
        i[49] = val[49]; //high
        i[50] = val[50]; //low
        i[51] = val[51]; //high
        i[52] = val[52]; //low
        i[53] = val[53]; //high
        i[54] = val[54]; //low
        i[55] = val[55]; //high
        i[56] = val[56]; //low
        i[57] = val[57]; //high
        i[58] = val[58]; //low
        i[59] = val[59]; //high
        i[60] = val[60]; //low
        i[61] = val[61]; //high
        i[62] = val[62]; //low
        i[63] = val[63]; //high
        i[64] = val[64]; //low
        i[65] = val[65]; //high
        i[66] = val[66]; //low
        i[67] = val[67]; //high
        i[68] = val[68]; //low
        i[69] = val[69]; //high
        i[70] = val[70]; //low
        i[71] = val[71]; //high
        i[72] = val[72]; //low
        i[73] = val[73]; //higj
        i[74] = val[74]; //low
        i[75] = val[75]; //high
        i[76] = val[76]; //low
        i[77] = val[77]; //high


gvar.wes1_fl_p1_feed_A = parseFloat(ii[0].toFixed(1));
gvar.wes1_fl_p1_feed_B = parseFloat(ii[1].toFixed(1));
gvar.wes1_fl_p1_feed_C = parseFloat(ii[2].toFixed(1));
gvar.wes1_fl_p2_feed_A = parseFloat(ii[3].toFixed(1));
gvar.wes1_fl_p2_feed_B = parseFloat(ii[4].toFixed(1));
gvar.wes1_fl_p2_feed_C = parseFloat(ii[5].toFixed(1));
gvar.wes1_fl_p3_feed_A = parseFloat(ii[6].toFixed(1));
gvar.wes1_fl_p3_feed_B = parseFloat(ii[7].toFixed(1));
gvar.wes1_fl_p3_feed_C = parseFloat(ii[8].toFixed(1));
gvar.wes1_fl_p4_feed_A = parseFloat(ii[9].toFixed(1));
gvar.wes1_fl_p4_feed_B = parseFloat(ii[10].toFixed(1));
gvar.wes1_fl_p4_feed_C = parseFloat(ii[11].toFixed(1));
gvar.wes1_fl_p5_feed_A = parseFloat(ii[12].toFixed(1));
gvar.wes1_fl_p5_feed_B = parseFloat(ii[13].toFixed(1));
gvar.wes1_fl_p5_feed_C = parseFloat(ii[14].toFixed(1));
gvar.wes1_fl_p6_feed_A = parseFloat(ii[15].toFixed(1));
gvar.wes1_fl_p6_feed_B = parseFloat(ii[16].toFixed(1));
gvar.wes1_fl_p6_feed_C = parseFloat(ii[17].toFixed(1));
gvar.wes1_fl_p7_feed_A = parseFloat(ii[18].toFixed(1));
gvar.wes1_fl_p7_feed_B = parseFloat(ii[19].toFixed(1));
gvar.wes1_fl_p7_feed_C = parseFloat(ii[20].toFixed(1));
gvar.wes1_fl_p8_feed_A = parseFloat(ii[21].toFixed(1));
gvar.wes1_fl_p8_feed_B = parseFloat(ii[22].toFixed(1));
gvar.wes1_fl_p8_feed_C = parseFloat(ii[23].toFixed(1));
gvar.wes1_fl_p9_feed_A = parseFloat(ii[24].toFixed(1));
gvar.wes1_fl_p9_feed_B = parseFloat(ii[25].toFixed(1));
gvar.wes1_fl_p9_feed_C = parseFloat(ii[26].toFixed(1));
gvar.wes1_fl_p10_feed_A = parseFloat(ii[27].toFixed(1));
gvar.wes1_fl_p10_feed_B = parseFloat(ii[28].toFixed(1));
gvar.wes1_fl_p10_feed_C = parseFloat(ii[29].toFixed(1));
gvar.wes1_fl_p11_feed_A = parseFloat(ii[30].toFixed(1));
gvar.wes1_fl_p11_feed_B = parseFloat(ii[31].toFixed(1));
gvar.wes1_fl_p11_feed_C = parseFloat(ii[32].toFixed(1));
gvar.wes1_fl_p12_feed_A = parseFloat(ii[33].toFixed(1));
gvar.wes1_fl_p12_feed_B = parseFloat(ii[34].toFixed(1));
gvar.wes1_fl_p12_feed_C = parseFloat(ii[35].toFixed(1));
gvar.wes1_f1_feed_A_total = parseFloat(ii[36].toFixed(1));
gvar.wes1_f1_feed_B_total = parseFloat(ii[37].toFixed(1));
gvar.wes1_f1_feed_C_total = parseFloat(ii[38].toFixed(1));


if(gvar.wes1_fl_p1_feed_A!=undefined || gvar.wes1_fl_p1_feed_A!=null){


var MongoClient = require('mongodb').MongoClient;
var url= gvar.standardConnectionString;


var firstValue={
  wes1_fl_ut:gvar.wes1_fl_ut,
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

    id:"wes1_fl"

};





fun.storeInDB(firstValue, "FL_CurrentVals")
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
  setTimeout(readVal_wes1_fl, mbtimeout);
  }





