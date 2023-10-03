const express = require("express");

const router = express.Router();
const StanSiteControl = require('../models/stanSiteControl')


router.get('/pumpstations/stanfordroad/get/controltoggle', function(req,res){


  StanSiteControl.find().then(resp=>{
       var pump_control_arr=[]
       var pump_speed_arr = []
      //  var p2_run_arr = []
      //  var p3_run_arr = []
      //  var p4_run_arr = []

//console.log(resp)
i=0
while (i<resp.length){

  pump_control_arr[i] = (resp[i].ps_control)
  pump_speed_arr[i] = (resp[i].ps_speed)
  i++
}

res.status(200).json({
  ps_control:pump_control_arr[0],
  ps_speed:pump_speed_arr[0]

});
  })
    })

router.post('/pumpstations/stanfordroad/post/saveStanPumpControl', function(req,res, next){
      var ps_control = req.body.stan_hawkeye_enable_control


      StanSiteControl.findOneAndUpdate({id: 1},{ps_control:ps_control} ).then(result =>{
      console.log(ps_control)
              res.status(200).json({
                message: " ps_control Saved successfully",
              });
            })
            .catch(err=>{
              res.status(500).json({
                error:err
              });
            });
          });


router.post('/pumpstations/stanfordroad/post/saveStanPump1Run', function(req,res, next){
            var p1_run = req.body.stan_hawkeye_p1_run_control

            StanSiteControl.findOneAndUpdate({id: 1},{p1_run:p1_run} ).then(result =>{
            console.log(p1_run)
                    res.status(200).json({
                      message: " p1_run Saved successfully",
                    });
                  })
                  .catch(err=>{
                    res.status(500).json({
                      error:err
                    });
                  });

                })

router.post('/pumpstations/stanfordroad/post/saveStanPump2Run', function(req,res, next){
            var p2_run = req.body.stan_hawkeye_p2_run_control

            StanSiteControl.findOneAndUpdate({id: 1},{p2_run:p2_run} ).then(result =>{
            console.log(p2_run)
                    res.status(200).json({
                      message: " p2_run Saved successfully",
                    });
                  })
                  .catch(err=>{
                    res.status(500).json({
                      error:err
                    });
                  });
                })



router.post('/pumpstations/stanfordroad/post/saveStanPump3Run', function(req,res, next){
                  var p3_run = req.body.stan_hawkeye_p3_run_control

                  StanSiteControl.findOneAndUpdate({id: 1},{p3_run:p3_run} ).then(result =>{
                  console.log(p3_run)
                          res.status(200).json({
                            message: " p3_run Saved successfully",
                          });
                        })
                        .catch(err=>{
                          res.status(500).json({
                            error:err
                          });
                        });

                      })


router.post('/pumpstations/stanfordroad/post/saveStanPump4Run', function(req,res, next){
                        var p4_run = req.body.stan_hawkeye_p4_run_control

                        StanSiteControl.findOneAndUpdate({id: 1},{p4_run:p4_run} ).then(result =>{
                        console.log(p4_run)
                                res.status(200).json({
                                  message: " p4_run Saved successfully",
                                });
                              })
                              .catch(err=>{
                                res.status(500).json({
                                  error:err
                                });
                              });

                            })
 router.post('/pumpstations/stanfordroad/post/saveStanPumpSpeedCotrol', function(req,res, next){
                        var ps_speed = req.body.stan_hawkeye_ps_speed_control

                        StanSiteControl.findOneAndUpdate({id: 1},{ps_speed:ps_speed} ).then(result =>{
                        console.log(ps_speed)
                                res.status(200).json({
                                  message: " ps_speed Saved successfully",
                                  ps_speed:ps_speed
                                });
                              })
                              .catch(err=>{
                                res.status(500).json({
                                  error:err
                                });
                              });

                            })

  module.exports= router;
