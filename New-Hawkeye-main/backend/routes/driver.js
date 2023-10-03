const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an instance of Express Router
const Driver = require("../models/driverCreation"); // Importing the Driver model
const gvar = require("../variables"); // Importing some variables (not used in this code)
const checkAuth = require("../middleware/check-auth"); // Importing middleware for checking authentication
var MongoClient = require('mongodb').MongoClient;
var url= gvar.standardConnectionString;
router.use(express.json()); // Middleware to parse incoming request body as JSON

router.post("/addDriver", async (req, res) => { // HTTP POST method for adding a new driver




  try {
    const { ipAddress, driverName, description, siteType, dataArray, id,updatedStatus } =
      req.body; // Extracting data from the request body
    const driver = await Driver.findOne({ driverName }); // Searching for a driver with the same driverName
    if (driver) { // If a driver is found
      return res.status(401).json({ message: "Drivername Already Used!" }); // Return error response
    }


    const Drivers = new Driver({ // Creating a new instance of Driver model with extracted data
      ipAddress,
      driverName,
      description,
      siteType,
      dataArray,
      updatedStatus
    });

    console.log(Drivers) // Debugging line to print the Driver object

    const result = await Drivers.save(); // Saving user data to database
    res.status(201).json({ // Returning success response with saved data
      message: "Driver added successfully",
      result,
    });

  } catch (error) { // Handling errors with try-catch block
    console.log(error)
    res.status(500).json({ // Returning error response
      error,
    });
  }
});



router.post("/update/driver", async (req, res) => {

  console.log(req.body)


  var updateDriver = {
    ipAddress:req.body.ipAddress,
    driverName:req.body.driverName,
    description:req.body.description,
    siteType:req.body.siteType,
    dataArray: req.body.dataArray,
    updatedStatus:req.body.updatedStatus
  }

  Driver.findOneAndUpdate({driverName:req.body.driverName}, updateDriver).then(result =>{
    res.status(200).json({
        message: "Driver has been updated successfully",
      });
  })
});








router.get("/driver/manage-drivers", (req,res)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.MongooseConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("HawkEye");

    var query = {}
    var count =0
    var ipAdderess_Arr=[];
    var driverName_Arr=[];
    var description_Arr=[];
    var siteType_Arr=[];


    dbo.collection("drivers").find(query,{ projection: {
      _id: 0,
      ipAddress:1,
      driverName:1,
      description:1,
      siteType: 1,

    }}).toArray(function(err, data){
      if (err) throw err;
      i = 0;

      while (i < data.length){
        ipAdderess_Arr[i] = data[i].ipAddress
        driverName_Arr[i] = data[i].driverName
        description_Arr[i] = data[i].description
        siteType_Arr[i] = data[i].siteType

        i++;
      }
 count++;
 res.status(200).json({
  ipAdderess_Arr,
  driverName_Arr,
  description_Arr,
  siteType_Arr,
   });
  } );
 })
 }

  )

module.exports = router; // Exporting the router object
