module.exports = {convertToBinary1,cloudWorksLastPole,convertDateTime,controlLevel,storeInDB};
const gvar = require('../variables')


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
  let res
   date.setHours(h, m, 0)
   date.toString();

   //Get minutes only returns the individual minutes.  This method will insure that a 0 is added when the time is asked and it's less than 10 minutes
   if(date.getMinutes()>9 ){
  res = `${date.getHours()+addHour}:${date.getMinutes()}`
}
else {
  res = `${date.getHours()+addHour}:${'0'+date.getMinutes()}`
}

  return res
}


function controlLevel(gvar){

  let number

    if(gvar <= 100 && gvar >= 0 ){
      number = gvar
       }
       else if(gvar >= 100){

        number = 100.0

       }
       else{
        number = 0
       }

       return number

}



function storeInDB(firstValue, databaseName){

  var MongoClient = require('mongodb').MongoClient;
  var url= gvar.standardConnectionString;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("HawkEye");


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
    db.close();



   })


  })




}
function formatDateToDBDate(date)
{const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().replace("Z", "+00:00");
  return formattedDate;
};

}
