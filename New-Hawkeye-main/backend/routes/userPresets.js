const express = require("express");
const router = express.Router();
const UserPresets = require('../models/userPresets');




router.post('/save-user-presets', function(req,res){


var userEmail = req.body.userEmail
var presetName= req.body.presetName
var presetDescription= req.body.presetDescription
var selectedSites = req.body.selectedSites
var rightSelectedSites = req.body.rightSelectedSites

const userPresets = new UserPresets({
userEmail:userEmail,
presetName:presetName,
presetDescription:presetDescription,
selectedSites:selectedSites,
rightSelectedSites:rightSelectedSites
    });
    userPresets.save().then(result =>{
    res.status(201).json({
       message: "Preset saved successfully",
       result: result,
     });
   })
   .catch(err=>{
     res.status(500).json({
       error:err
     });
   });
  })

  router.post('/get-user-preset-names', function(req,res){

    var userEmail = req.body.userEmail

    var presetName_arr=[];
    var presetDescription_arr=[];

    UserPresets.find({userEmail:userEmail}).then(data =>{
            res.status(201).json({
                message: "Presets fetched successfully",
                record:data
              });
            })
            .catch(err=>{
              res.status(500).json({
                error:err
              });
            });
      })


  router.post('/get-user-presets', function(req,res){


    var userEmail = req.body.userEmail

    var presetName_arr=[];
    var presetDescription_arr=[];

    UserPresets.find({userEmail:userEmail}).then(data =>{
            res.status(201).json({
                message: "Presets fetched successfully",
                record:data
              });
            })
            .catch(err=>{
              res.status(500).json({
                error:err
              });
            });
      })

      router.post('/get-user-edit-preset', function(req,res){


        var userEmail = req.body.userEmail
        var presetName = req.body.presetName

        UserPresets.findOne({userEmail:userEmail,presetName:presetName}).then(data =>{
                res.status(201).json({
                    message: "Presets fetched successfully",
                    record:data
                  });
                })
                .catch(err=>{
                  res.status(500).json({
                    error:err
                  });
                });
          })



          router.post('/update-user-presets', function(req,res){

            var userEmail = req.body.userEmail

            var oldPresetName = req.body.oldPresetName
            var newPresetName = req.body.newPresetName
            var newPresetDescription = req.body.newPresetDescription
    const query = {userEmail:userEmail, presetName:oldPresetName}

    let updatedInfo={
      presetName:newPresetName,
      presetDescription:newPresetDescription,
      selectedSites:req.body.selectedSites,
      rightSelectedSites:req.body.rightSelectedSites
    }

            UserPresets.findOneAndUpdate(query,updatedInfo).then(data =>{
              console.log(data)
                    res.status(201).json({
                        message: "Preset Updated successfully",
                      });
                    })
                    .catch(err=>{
                      res.status(500).json({
                        error:err
                      });
                    });

          })


          router.post('/delete-user-preset',function(req,res){
            var userEmail = req.body.userEmail
            var PresetName = req.body.presetName
            const query = {userEmail:userEmail, presetName:PresetName}
            UserPresets.deleteOne(query).then(data =>{
           console.log(data)
                    res.status(201).json({
                        message: "Preset Deleted successfully",
                      });
                    })
                    .catch(err=>{
                      res.status(500).json({
                        error:err
                      });
                    });
          })

  module.exports= router;
