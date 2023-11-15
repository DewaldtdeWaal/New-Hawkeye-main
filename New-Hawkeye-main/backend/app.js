const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const admin = require('./Database-Functions/create_admin')
mongoose.set('strictQuery',false)
const getDriverValues = require('./routes/getDriver/getDriverRoutes')

const routing = require('./routes/routing/routing')

 
const routeSiteMethod = require("./routes/routeSiteMethod");
const pageTrend = require("./routes/PageTrend/PageTrend");

//const automotiverouting = require('./routes/Automotive/automotive')
const newtrendPicker = require('./routes/newTrendpicker');
const wesselsInput = require('./routes/wessels-input');
const testwritefunction = require('./routes/testwritefunction');
const driver = require('./routes/drivers')
const drivers = require('./routes/driver')
//const pumpoverview = require('./routes/Pumpstations/pumpoverview')
//const standfordRoad = require('./routes/Pumpstations/standfordpumponofstate')
//const fptRoutes= require('./routes/FPT/fpt')
//const pumpStation = require('./routes/Pumpstations/pump')
const wtw= require('./routes/WTW/wtw')
const westrends = require('./routes/wessels-trends')
const UsersRoutes = require("./routes/users")
const TrendPicker = require("./routes/trend-picker")
const reservoir = require("./routes/reservoir-trends")
const  FlowMeterRoutes= require("./routes/flow-meter-trends")
const FeedLotsRoutes = require("./routes/feed-lots-trends")
const crowngardensRoutes = require("./routes/crown-gardens-trends")
const adminRoutes = require("./routes/admin")
const controlLogRoutes = require("./routes/controlLogs")
const UserPresetRoutes = require("./routes/userPresets")
// const imagePleaseWork = require("./routes/index")
//const chelsea = require("./routes/Reservoir/Chelsea")
//const chatty = require("./routes/Reservoir/chatty")
//const wessels= require("./routes/Feedlots/wessels");
//const res_currentVals = require("./routes/Reservoir/Res_CurrentVals")

const demoControl = require("./routes/demo-control")
const SiteControl = require("./routes/site-control")
//const res = require("./routes/Reservoir/reservoir")
//NewtonParkPool
const newtonParkPool = require("./routes/GroundWater/newtonparkpool");
//const cougakop = require("./routes/Reservoir/Coega-kop");
//const bethelsdorp = require("./routes/FPT/Bethelsdorp")
//const groundwater = require("./routes/GroundWater/groundwaterroute")

const costom_trends = require("./routes/costom-trend")

//const humansdorp1 = require("./routes/GroundWater/humansdorp1")
//const humansdorp2 = require("./routes/GroundWater/humansdorp2")
//const humansdorp3 = require("./routes/GroundWater/humansdorp3")
//const humansdorp4 = require("./routes/GroundWater/humansdorp4")
//const humansdorp6 = require("./routes/GroundWater/humansdorp6")

const routeMethod = require("./routes/routeSiteMethod")

var gvar = require("./variables")







//////test

//https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
const app = express();
const nodemailer = require("nodemailer")


// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect(gvar.standardConnectionString, function(err, db) {
//   if (err) throw err;
//   gvar.dbo = db.db("HawkEye");

// })




app.listen(5000, () => {
  console.log()
})

// app.get('/', (req,res) =>{

//   sendEmail()
//   .then(response => res.send(response.message))
//   .catch(error => res.status(500).send(error.message))
// })

mongoose.connect(gvar.MongooseConnectionString, {useNewUrlParser: true})
.then(()=>{
console.log('Connected to database')
})
.catch(()=>{
console.log('Connection Failed')
});


const handleConnectionError = (error) => {
  console.log('Connection Failed', error);
  setTimeout(() => {
    mongoose.connect(gvar.MongooseConnectionString, { useNewUrlParser: true})
    .then(() => {
      console.log('Connected to database')
    })
    .catch(handleConnectionError)
  },60000);
};

mongoose.connect(gvar.MongooseConnectionString, {useNewUrlParser:true})
.then(() => {
  console.log("Connected to Database")
})
.catch(handleConnectionError)
admin.CreateAdmin();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname,"angular")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");  //"http://allelectrical.dyndns.org:4200/"
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(costom_trends);
app.use(testwritefunction);
//app.use(pumpoverview);
//app.use(groundwater);
//app.use(res_currentVals);
//app.use(pumpStation);
app.use(westrends);
//app.use(fptRoutes);
//app.use(standfordRoad);
app.use(wtw)
//app.use(chatty);
app.use(driver);
app.use(drivers);
//app.use(res);
//app.use(wessels);
//app.use(humansdorp1);
//app.use(humansdorp2);
//app.use(humansdorp4);
//app.use(humansdorp3);
//app.use(humansdorp6);
//app.use(bethelsdorp);

app.use(pageTrend)
app.use(reservoir);
app.use(UsersRoutes);
app.use(TrendPicker);
app.use(adminRoutes);
app.use(FeedLotsRoutes);
app.use(FlowMeterRoutes);
app.use(controlLogRoutes);
app.use(SiteControl);

app.use(routeMethod)

//app.use(routeSiteMethod)

app.use(demoControl);

app.use(newtrendPicker);

app.use(getDriverValues);

app.use(routing);

//app.use(automotiverouting);
app.use(wesselsInput);
app.use(newtonParkPool);
//app.use(chelsea);
// app.use(imagePleaseWork);
//app.use(cougakop);
app.use(UserPresetRoutes)
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular", "index.html"));
});






module.exports=app;
