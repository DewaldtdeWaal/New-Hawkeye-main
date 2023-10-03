const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const gvar = require("../variables")


router.post("/trends/mongodb/customrestrends", (req,res,next)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;



})

module.exports = router;
