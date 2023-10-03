module.exports = {convertToBinary1,cloudWorksLastPole,convertDateTime,modeStatus,parseVal,storeInDB,checkLevel};

const gvar = require('../variables')

var MongoClient = require('mongodb').MongoClient;
var url = gvar.standardConnectionString;
var dbo
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    dbo = db.db("HawkEye");

})

function convertToBinary1 (number) {
  let num = number;
  let binary = (num % 2).toString();
  for (; num > 1; ) {
      num = parseInt(num / 2);
      binary =  (num % 2) + (binary);
  }
   return binary;
}

function cloudWorksLastPole(array){

  var one = convertToBinary1(array);
  var len = one.length;
  var valOneP1 = one.slice(0,len-8)
  var valOneP2 = one.slice(len - 8)
  var decryptedOne = valOneP1.replace(/\d+./g,x=>String.fromCharCode('0b'+x))
  var decryptedTwo = valOneP2.replace(/\d+./g,x=>String.fromCharCode('0b'+x))
  decryptedOne.toString()
  decryptedTwo.toString()

  return decryptedOne+decryptedTwo;

}

function modeStatus(NUM){
  var status

  if (NUM = 0)
  status = "Off"
  else if(NUM = 1)
  status = "Manual"
  else if(NUM = 2)
  status = "Manual"
  else if(NUM = 3)
  status = "Auto"
  else if(NUM = 4)
  status = "Maintenance"
  else if(NUM = 5)
  status = "Manual"
  else if(NUM = 6)
  status = "Auto"
  else if(NUM = 7)
  status = "Maintenance"
  else if(NUM = 8)
  status = "Manual"
  else if(NUM = 9)
  status = "Auto"

  return status;
}

function convertDateTime(finalString){
  var timeAlone = finalString.slice(11);

  var months=["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"]

  var dd = finalString.slice(0,2)
  var mm = finalString.slice(3,5)
  var yy = finalString.slice(6,11)

  var month = months[mm - 1]

  var timePlusTwo = getTime(timeAlone.toString(),2)

//if it is earlier than 10 am
  var sliceFirstTwo = timePlusTwo.slice(1, 2)
  if (sliceFirstTwo == ":"){
    timePlusTwo = "0" + timePlusTwo
  }

  var fullMonth = month + " "  +dd + " " +yy +timePlusTwo;

  return fullMonth.toString();
}


function getTime(time, addHour) {
  let [h, m] = time.split(':');
  let date = new Date();
   date.setHours(h, m, 0)
   date.toString();
  let res = `${date.getHours()+addHour}:${date.getMinutes()}`
  return res
}



function parseVal(val){
  var p = parseInt(val);
  var m = [];
  for (var i=0; i<16; i++) {
  // test top bit and set corresponding payload
  m[i] =  ((p & 0x8000) ? 1 : 0);
  p = p << 1; // divide by two and keep as an integer
}


  return m.reverse();
}





function storeInDB(firstValue, databaseName){




    dbo.collection(databaseName).findOne({id:{$all: [firstValue.id]}}, function(err, result) {

      if (result!=null){}
      else{
        dbo.collection(databaseName).insertOne(firstValue, function() {

        });
      }

  })
  var myquery = { id: firstValue.id};
  var newvalues = {$set: firstValue

  };
  dbo.collection(databaseName).updateOne(myquery, newvalues, function(err, res){
    if (err) throw err;


   })



}




function checkLevel(value){
  if(value <=100 || value >=0){
    return value;
  }
}


//Ask Daniel about this
function createFloatArray(vals) {
  // Create a new ArrayBuffer with the appropriate size
  var rawData = new ArrayBuffer(vals.length * Uint16Array.BYTES_PER_ELEMENT);

  // Create a new Uint16Array and initialize it with the input values
  var i = new Uint16Array(rawData);
  for (var j = 0; j < vals.length; j++) {
    i[2*j] = vals[j] & 0xFFFF;
    i[2*j+1] = vals[j] >>> 16;
  }

  // Return the corresponding Float32Array
  return new Float32Array(rawData);
}
