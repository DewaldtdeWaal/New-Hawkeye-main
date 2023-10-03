const express = require("express");
const router = express.Router();
const fl_currentvals = require('../models/wesselsInput')

router.post('/feedlots/wessels/post', function(req, res){
  var wes2_fl_pen1_feed_type = req.body.wes2_fl_pen1_feed_type
  var wes2_fl_p1_lambs = req.body.wes2_fl_p1_lambs

  var wes2_fl_pen2_feed_type = req.body.wes2_fl_pen2_feed_type
  var wes2_fl_p2_lambs = req.body.wes2_fl_p2_lambs

  var wes2_fl_pen3_feed_type = req.body.wes2_fl_pen3_feed_type
  var wes2_fl_p3_lambs = req.body.wes2_fl_p3_lambs

  var wes2_fl_pen4_feed_type = req.body.wes2_fl_pen4_feed_type
  var wes2_fl_p4_lambs = req.body.wes2_fl_p4_lambs

  var wes2_fl_pen5_feed_type = req.body.wes2_fl_pen5_feed_type
  var wes2_fl_p5_lambs = req.body.wes2_fl_p5_lambs

  var wes2_fl_pen5_feed_type = req.body.wes2_fl_pen5_feed_type
  var wes2_fl_p5_lambs = req.body.wes2_fl_p5_lambs

  var wes2_fl_pen6_feed_type = req.body.wes2_fl_pen6_feed_type
  var wes2_fl_p6_lambs = req.body.wes2_fl_p6_lambs

  var wes2_fl_pen7_feed_type = req.body.wes2_fl_pen7_feed_type
  var wes2_fl_p7_lambs = req.body.wes2_fl_p7_lambs

  var wes2_fl_pen8_feed_type = req.body.wes2_fl_pen8_feed_type
  var wes2_fl_p8_lambs = req.body.wes2_fl_p8_lambs

  var wes2_fl_pen9_feed_type = req.body.wes2_fl_pen9_feed_type
  var wes2_fl_p9_lambs = req.body.wes2_fl_p9_lambs

  var wes2_fl_pen10_feed_type = req.body.wes2_fl_pen10_feed_type
  var wes2_fl_p10_lambs = req.body.wes2_fl_p10_lambs

  var wes2_fl_pen11_feed_type = req.body.wes2_fl_pen11_feed_type
  var wes2_fl_p11_lambs = req.body.wes2_fl_p11_lambs

  var wes2_fl_pen12_feed_type = req.body.wes2_fl_pen12_feed_type
  var wes2_fl_p12_lambs = req.body.wes2_fl_p12_lambs

  fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p1_lambs:wes2_fl_p1_lambs,wes2_fl_pen1_feed_type:wes2_fl_pen1_feed_type,wes2_fl_p2_lambs:wes2_fl_p2_lambs,wes2_fl_pen2_feed_type:wes2_fl_pen2_feed_type,wes2_fl_p3_lambs:wes2_fl_p3_lambs,wes2_fl_pen3_feed_type:wes2_fl_pen3_feed_type,wes2_fl_p4_lambs:wes2_fl_p4_lambs,wes2_fl_pen4_feed_type:wes2_fl_pen4_feed_type,wes2_fl_p5_lambs:wes2_fl_p5_lambs,wes2_fl_pen5_feed_type:wes2_fl_pen5_feed_type,wes2_fl_p6_lambs:wes2_fl_p6_lambs,wes2_fl_pen6_feed_type:wes2_fl_pen6_feed_type,wes2_fl_p7_lambs:wes2_fl_p7_lambs,wes2_fl_pen7_feed_type:wes2_fl_pen7_feed_type,wes2_fl_p8_lambs:wes2_fl_p8_lambs,wes2_fl_pen8_feed_type:wes2_fl_pen8_feed_type,wes2_fl_p9_lambs:wes2_fl_p9_lambs,wes2_fl_pen9_feed_type:wes2_fl_pen9_feed_type,wes2_fl_p10_lambs:wes2_fl_p10_lambs,wes2_fl_pen10_feed_type:wes2_fl_pen10_feed_type,wes2_fl_p11_lambs:wes2_fl_p11_lambs,wes2_fl_pen11_feed_type:wes2_fl_pen11_feed_type,wes2_fl_p12_lambs:wes2_fl_p12_lambs,wes2_fl_pen12_feed_type:wes2_fl_pen12_feed_type,
 }).then(result => {

    res.status(200).json({
      message: "Feedlot Saved Success",
      wes2_fl_p1_lambs:wes2_fl_p1_lambs,
      wes2_fl_pen1_feed_type:wes2_fl_pen1_feed_type,
      wes2_fl_p2_lambs:wes2_fl_p2_lambs,
      wes2_fl_pen2_feed_type:wes2_fl_pen2_feed_type,
      wes2_fl_p3_lambs:wes2_fl_p3_lambs,
      wes2_fl_pen3_feed_type:wes2_fl_pen3_feed_type,
      wes2_fl_p4_lambs:wes2_fl_p4_lambs,
      wes2_fl_pen4_feed_type:wes2_fl_pen4_feed_type,
      wes2_fl_p5_lambs:wes2_fl_p5_lambs,
      wes2_fl_pen5_feed_type:wes2_fl_pen5_feed_type,
      wes2_fl_p6_lambs:wes2_fl_p6_lambs,
      wes2_fl_pen6_feed_type:wes2_fl_pen6_feed_type,
      wes2_fl_p7_lambs:wes2_fl_p7_lambs,
      wes2_fl_pen7_feed_type:wes2_fl_pen7_feed_type,
      wes2_fl_p8_lambs:wes2_fl_p8_lambs,
      wes2_fl_pen8_feed_type:wes2_fl_pen8_feed_type,
      wes2_fl_p9_lambs:wes2_fl_p9_lambs,
      wes2_fl_pen9_feed_type:wes2_fl_pen9_feed_type,
      wes2_fl_p10_lambs:wes2_fl_p10_lambs,
      wes2_fl_pen10_feed_type:wes2_fl_pen10_feed_type,
      wes2_fl_p11_lambs:wes2_fl_p11_lambs,
      wes2_fl_pen11_feed_type:wes2_fl_pen11_feed_type,
      wes2_fl_p12_lambs:wes2_fl_p12_lambs,
      wes2_fl_pen12_feed_type:wes2_fl_pen12_feed_type,
    });
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    });
  });
})


  router.post('/feedlots1/wessels/post', function(req, res){
    var wes2_fl_pen1_feed_type = req.body.wes2_fl_pen1_feed_type
    var wes2_fl_p1_lambs = req.body.wes2_fl_p1_lambs


    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p1_lambs:wes2_fl_p1_lambs,wes2_fl_pen1_feed_type:wes2_fl_pen1_feed_type }).then(result => {

      res.status(200).json({
        message: "Feedlot 1 Saved Success",
        wes2_fl_p1_lambs:wes2_fl_p1_lambs,
        wes2_fl_pen1_feed_type:wes2_fl_pen1_feed_type,
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });
  })

  router.post('/feedlots2/wessels/post', function(req, res){

    var wes2_fl_pen2_feed_type = req.body.wes2_fl_pen2_feed_type
    var wes2_fl_p2_lambs = req.body.wes2_fl_p2_lambs


    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p2_lambs:wes2_fl_p2_lambs,wes2_fl_pen2_feed_type:wes2_fl_pen2_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 2 Saved Success",
        wes2_fl_p2_lambs:wes2_fl_p2_lambs,
        wes2_fl_pen2_feed_type:wes2_fl_pen2_feed_type
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });
  })

  router.post('/feedlots3/wessels/post', function(req, res){

    var wes2_fl_pen3_feed_type = req.body.wes2_fl_pen3_feed_type
    var wes2_fl_p3_lambs = req.body.wes2_fl_p3_lambs

    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p3_lambs:req.body.wes2_fl_p3_lambs}).then(result => {


      res.status(200).json({
        message: "Feedlot 3 Saved Success",
        wes2_fl_p3_lambs:wes2_fl_p3_lambs,
        wes2_fl_pen3_feed_type:wes2_fl_pen3_feed_type
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  router.post('/feedlots4/wessels/post', function(req, res){

    var wes2_fl_pen4_feed_type = req.body.wes2_fl_pen4_feed_type
    var wes2_fl_p4_lambs = req.body.wes2_fl_p4_lambs

    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p4_lambs:wes2_fl_p4_lambs,wes2_fl_pen4_feed_type:wes2_fl_pen4_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 4 Saved Success",
        wes2_fl_p4_lambs:wes2_fl_p4_lambs,
        wes2_fl_pen4_feed_type:wes2_fl_pen4_feed_type
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  router.post('/feedlots5/wessels/post', function(req, res){
    var wes2_fl_pen5_feed_type = req.body.wes2_fl_pen5_feed_type
    var wes2_fl_p5_lambs = req.body.wes2_fl_p5_lambs


    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p5_lambs:req.body.wes2_fl_p5_lambs,wes2_fl_pen5_feed_type:wes2_fl_pen5_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 5 Saved Success",
        wes2_fl_p5_lambs:wes2_fl_p5_lambs,
        wes2_fl_pen5_feed_type:wes2_fl_pen5_feed_type
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  router.post('/feedlots6/wessels/post', function(req, res){

    var wes2_fl_pen6_feed_type = req.body.wes2_fl_pen6_feed_type
    var wes2_fl_p6_lambs = req.body.wes2_fl_p6_lambs

    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p6_lambs:wes2_fl_p6_lambs,wes2_fl_pen6_feed_type:wes2_fl_pen6_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 6 Saved Success",
        wes2_fl_p6_lambs:wes2_fl_p6_lambs,
        wes2_fl_pen6_feed_type:wes2_fl_pen6_feed_type
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  router.post('/feedlots7/wessels/post', function(req, res){

    var wes2_fl_pen7_feed_type = req.body.wes2_fl_pen7_feed_type
    var wes2_fl_p7_lambs = req.body.wes2_fl_p7_lambs

    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p7_lambs:wes2_fl_p7_lambs,wes2_fl_pen7_feed_type:wes2_fl_pen7_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 7 Saved Success",
        wes2_fl_p7_lambs:wes2_fl_p7_lambs,
        wes2_fl_pen7_feed_type:wes2_fl_pen7_feed_type


      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  router.post('/feedlots8/wessels/post', function(req, res){


    var wes2_fl_pen8_feed_type = req.body.wes2_fl_pen8_feed_type
    var wes2_fl_p8_lambs = req.body.wes2_fl_p8_lambs

    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p8_lambs:wes2_fl_p8_lambs,wes2_fl_pen8_feed_type:wes2_fl_pen8_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 8 Saved Success",
        wes2_fl_p8_lambs:wes2_fl_p8_lambs,
        wes2_fl_pen8_feed_type:wes2_fl_pen8_feed_type
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  router.post('/feedlots9/wessels/post', function(req, res){

    var wes2_fl_pen9_feed_type = req.body.wes2_fl_pen9_feed_type
    var wes2_fl_p9_lambs = req.body.wes2_fl_p9_lambs

    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p9_lambs:wes2_fl_p9_lambs,wes2_fl_pen9_feed_type:wes2_fl_pen9_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 9 Saved Success",
        wes2_fl_p9_lambs:wes2_fl_p9_lambs,
        wes2_fl_pen9_feed_type:wes2_fl_pen9_feed_type
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  router.post('/feedlots10/wessels/post', function(req, res){

    var wes2_fl_pen10_feed_type = req.body.wes2_fl_pen10_feed_type
    var wes2_fl_p10_lambs = req.body.wes2_fl_p10_lambs

    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p10_lambs:wes2_fl_p10_lambs,wes2_fl_pen10_feed_type:wes2_fl_pen10_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 10 Saved Success",
        wes2_fl_p10_lambs:wes2_fl_p10_lambs,
        wes2_fl_pen10_feed_type:wes2_fl_pen10_feed_type

      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  router.post('/feedlots11/wessels/post', function(req, res){

    var wes2_fl_pen11_feed_type = req.body.wes2_fl_pen11_feed_type
    var wes2_fl_p11_lambs = req.body.wes2_fl_p11_lambs


    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p11_lambs:wes2_fl_p11_lambs,wes2_fl_pen11_feed_type:wes2_fl_pen11_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 11 Saved Success",
        wes2_fl_p11_lambs:wes2_fl_p11_lambs,
        wes2_fl_pen11_feed_type:wes2_fl_pen11_feed_type
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  router.post('/feedlots12/wessels/post', function(req, res){

    var wes2_fl_pen12_feed_type = req.body.wes2_fl_pen12_feed_type
    var wes2_fl_p12_lambs = req.body.wes2_fl_p12_lambs


    fl_currentvals.findOneAndUpdate({id:"wes1_fl"},{wes2_fl_p12_lambs:wes2_fl_p12_lambs,wes2_fl_pen12_feed_type:wes2_fl_pen12_feed_type}).then(result => {

      res.status(200).json({
        message: "Feedlot 12 Saved Success",
        wes2_fl_p12_lambs:wes2_fl_p12_lambs,
        wes2_fl_pen12_feed_type:wes2_fl_pen12_feed_type
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });

  })

  module.exports= router;
