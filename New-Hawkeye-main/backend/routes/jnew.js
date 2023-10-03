router.get("/groundwater/KLM_KRUIS14_TF", (req,res)=>{    //
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");
     var dateBefore =  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)

     var now =  new Date();

     dateNow =now;
     var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });


     var total_flow_1_array=[];

     var DateArr=[];


     dbo.collection("KLM_KRUIS14_TF").find(query,{ projection: { _id: 0, gw_klm_kruis14_TF:1,date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

    var num1 = data[i+1].gw_klm_kruis14_TF
    var num2 =data[i].gw_klm_kruis14_TF
    total_flow_1_array[i]= (num1-num2).toFixed(2)





    d_arr = (data[i+1].date)
    d_arr = d_arr.toLocaleString()
          var d = d_arr.substr(0,10)
          //var t = d_arr.substr(14,8)
              d = d.split("/")
              d = d[0] +"-"+d[1] +"-"+d[2]

    DateArr[i] = d
   i++;
   }

 res.status(200).json({
  total_flow_1_array,
  DateArr,
  });
 } );
 })

}

 )

 router.post("/groundwater/KLM_KRUIS14_TF", (req,res)=>{      //
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

//2021-08-09T22:00:00.000+00:00   1632607200000
var start = req.body.startDate
start = start + "T00:00:00.000+02:00"
var end = req.body.endDate
end = (end + "T00:00:00.000+02:00")

endTemp = new Date(end)
endTemp =endTemp.getTime()
endTemp =  (endTemp + 1 * 24 * 60 * 60 * 1000)

end = endTemp;

var query = ({ date: { $gte:new Date(start) , $lte:new Date(end) } });


var total_flow_1_array=[];

var DateArr=[];


    dbo.collection("KLM_KRUIS14_TF").find(query,{ projection: { _id: 0, gw_klm_kruis14_TF:1 , date: 1 } }).sort({date:1}).toArray(function(err, data){
     if (err) throw err;
     i = 0;

     while (i < data.length-1){

      var num1 = data[i+1].gw_klm_kruis14_TF
      var num2 =data[i].gw_klm_kruis14_TF
      total_flow_1_array[i]= (num1-num2).toFixed(2)







      d_arr = (data[i+1].date)
      d_arr = d_arr.toLocaleString()
            var d = d_arr.substr(0,10)
            //var t = d_arr.substr(12,8)
                d = d.split("/")
                d = d[0] +"-"+d[1] +"-"+d[2]

      DateArr[i] = d
     i++;

     }

 res.status(200).json({
  total_flow_1_array,
  DateArr,
  });
 } );
 })

}
)
