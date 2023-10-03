const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an instance of Express Router
const site = require("../models/site"); // Importing the Driver model
const gvar = require("../variables"); // Importing some variables (not used in this code)
const checkAuth = require("../middleware/check-auth"); // Importing middleware for checking authentication
var MongoClient = require('mongodb').MongoClient;
var url= gvar.standardConnectionString;
router.use(express.json()); // Middleware to parse incoming request body as JSON


router.post("/get-site-data", async (req, res) => {

  console.log(req.body.SiteName)

  var siteName = req.body.SiteName

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

    var query = {SiteName: siteName};
    var routingArray=[]
    dbo.collection("NMBM_CLOUDWORKS_Drivers").find(query).toArray(function(err,data){




            //So I'm only taking the tags in the CurrentValues I don't need the values in the Site Data, Because I would already have the description in the Front end.
            routingArray[0] =data[0].CurrentValues



            console.log(routingArray[0])




      res.status(200).json({
        routingArray

           });

    })

  })

})

module.exports = router;
