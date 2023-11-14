const mongoose = require('mongoose');
const User = require('../models/user');

// called in server.js
module.exports = {CreateAdmin};


//this is the array for the admin
const admin = ["ADMIN","NMB_TEST"];
const nmbmAdmin = ["ADMIN_NMBM"];
const nmbmUser = ["USER_NMBM"]
//This is the array for all of the NMBM sites
const nmbmSites = ["NMB_BHB_R","NMB_AIR_PRT","NMB_LSD_ZS","NMB_MNTS_ZS","NMB_RD_ZS","NMB_RPE_ZS","NMB_CGK_R","NMB_CHE_R","NMB_CHT_R","NMB_DRIFT_R","NMB_EMERALD_R","NMB_GB_R","NMB_GR_R","NMB_HB_R","NMB_KWANO_R","NMB_LH_R","NMB_MW_R","NMB_OLI_R","NMB_RD_R","NMB_SM_R","NMB_TC_R","NMB_VRH_R","NMB_VS_R","NMB_BFT_PS","NMB_BHB_PS","NMB_CHE_PS","NMB_CHT_PS","NMB_HB_PS","NMB_LH_PS","NMB_MW_PS","NMB_STAN_R_PS","NMB_TC_PS","NMB_VRH_PS","NMB_VS_PS","NMB_VW_PS","HUM_HUM_GW","NMB_NPP_GW","NMB_BETH_FPT","NMB_CIDZT_FPT","NMB_FMT_FPT","NMB_GBW_FPT","NMB_GT_BRG_FPT","NMB_UIT_FC_FPT","NMB_STAN_R_PS_CON","NMB_NGT_WTW","NMB_LIN_WTW","NMB_ELANDS_WTW","NMB_FAIR_GW","NMB_GLEN_GW","NMB_FNGH_GW",'NMB_STGP_GW',"NMB_BUSH_FPT","NMB_STG_PS","NMB_STG_R","NMB_MALI_R","NMB_HUP_OFF_TAKE_FPT", "NMB_JEFF_BAY_OFF_TAKE_FPT","NMB_KOU_MAIN_LINE_FPT","NMB_PARA_BEA_ST_FRANCIS_FPT","NMB_LIN_R",];
//This is the array for the non nmbm sites
const nonNmbmSites = ["ISUZU_AUTO","GRF_BERGEN_R","GRF_DAMP_R","GRF_HOLD_R","GRF_KROON_R","GRF_TIN_R","GRF_UMA_R","GRF_WOL_R","NMU_NMU_EFF", "TSI_STORMS_PS","RW_CG_PS","KLM_HUP_GW","KLM_HUP2_GW","KLM_HUP3_GW","KLM_HUP4_GW","KLM_HUP6_GW","WES_FL","TSI_STORMS_WTW","KOU_KARK_R","KOU_KARK1_GW","KOU_KARK2_GW","KLM_KUI_12_GW","KLM_KUI_13_GW","KLM_KUI_14_GW","KLM_KUI_R","KLM_HUP_WTW"];
//
const trendpicker = ["V2_PICKER_TRENDS"];
const overview =["HWK_PO","HWK_FO","HWK_RO"];
const demo = ["HWK_DEMO_R", "HWK_DEMO_PS","CSV_DOWNLOAD","testPicker","DRIVER", ];

const adminArray = admin.concat(nmbmSites,nonNmbmSites,trendpicker,overview,demo);
const nmbmArray = nmbmAdmin.concat(nmbmSites,trendpicker,overview)



function CreateAdmin(){ // Function that checks for admin account, if no account admin is created.


  ///////////console.log(admin)
  //saving new admin data in DB

User.updateMany({userSites:{ $in: ["ADMIN_NMBM"]}},
{

  $set: {userSites:nmbmArray}
}
).then((result=>{}))}


User.findOneAndUpdate({userEmail: "admin@macautomation.co.za"},
{
  firstName: "Admin",
secondName: "Account",
contactNumber: 165165,
userEmail: "admin@macautomation.co.za",
password: "$2a$06$QVSnHGgtsDfzV8RwDdk6sOA1gctzxoNcWKNlqgpX7lSO0JGxLIjEa", //encrypted password for M@CAutomation1
userSites:adminArray
}).then((result=>{

if (result==null) {
  const user = new User({
    firstName: "Admin",
    secondName: "Account",
    contactNumber: 165165,
    userEmail: "admin@macautomation.co.za",
    password: "$2a$06$QVSnHGgtsDfzV8RwDdk6sOA1gctzxoNcWKNlqgpX7lSO0JGxLIjEa", //encrypted password for M@CAutomation1
    userSites: adminArray
    });
    user.save().then(result =>{
    })
    .catch(err=>{
    });
}
}))
