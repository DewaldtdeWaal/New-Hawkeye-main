const app = require("./app");
const http = require("http");
const debug = require('debug')('node-angular');
const cors = require('cors');
app.use(
  cors({
    origin:"http://mac-creations.co.za:3000"
  })
)
var gvar = require("./variables")

const multer = require('multer');
const AllResTrends = require('./Database-Functions/res_trends')
const FPT_Trend = require('./Database-Functions/fpt_trend')
const PS_Trend = require('./Database-Functions/ps_trend')
const Storms_Trend = require('./Database-Functions/storms_trend')
const CG_Trend = require('./Database-Functions/rw_cg_trend')
const WTW_Trend = require('./Database-Functions/wtw_trend')
const GW_Trend = require('./Database-Functions/grdw_trend')
const FL_Trend = require('./Database-Functions/fl_trend')
const AUTO_Trend = require('./Database-Functions/auto_trend')

const oneBigVar = require('./Database-Functions/oneBigVar')



const ws = require('./socket-io-server')

const mb_GBW_FPT = require('./MODBUS_COMMS/nmbm_gbw_fpt')
      mb_GBW_FPT.readVal_GBW_FPT()

const mb_GB_R = require("./MODBUS_COMMS/nmbm_gb_r");
      mb_GB_R.readVal_GB_R();

const mb_CGK_R= require("./MODBUS_COMMS/nmbm_cgk_r");
      mb_CGK_R.readVal_NMB_CGK_R();

const mb_BH_R = require("./MODBUS_COMMS/nmbm_bh_r");
      mb_BH_R.readVal_BH_R(); 

const mb_BUSH_R = require("./MODBUS_COMMS/nmbm_bush_r")
mb_BUSH_R.readVal_BUSH_R();

const mb_VS_R = require("./MODBUS_COMMS/nmbm_vs_r");
      mb_VS_R.readVal_VS_R();

      const klm_HUP_WTW = require("./MODBUS_COMMS/klm_hup_wtw")
klm_HUP_WTW.readVal_HUP_WTW()

const mb_HB_PS_R = require("./MODBUS_COMMS/nmbm_hb1_ps_res");
      mb_HB_PS_R.readVal_HB_PS_R();

const mb_BH_PS = require("./MODBUS_COMMS/nmbm_bh_ps")
      mb_BH_PS.readVal_BH_PS();

const mb_LH_PS_R = require("./MODBUS_COMMS/nmbm_lh_ps_res")
      mb_LH_PS_R.readVal_LH_PS_R();

const mb_TC_PS_RES = require("./MODBUS_COMMS/nmbm_tc_ps_res")
      mb_TC_PS_RES.readVal_TC_PS_R();

const mb_CHE_R = require("./MODBUS_COMMS/nmbm_che_ps_res")
      mb_CHE_R.readVal_CHE_R();


const mb_EMER_R = require("./MODBUS_COMMS/nmbm_emer_r")
      mb_EMER_R.readVal_Emer_R();

const mb_DRIFT_R = require("./MODBUS_COMMS/nmbm_drift_res")
      mb_DRIFT_R.readVal_DRIFT_R();


const mb_MALI_R = require("./MODBUS_COMMS/nmbm_mali_r")
      mb_MALI_R.readVal_MALI_R();

// const cloud = require("./CLOUDWORKS/cloudworks")
// cloud.graaf_cloudworks()

// const cloudWorks = require("./CLOUDWORKS/graafcloudworks2")
// cloudWorks.graaf_cloudworks2();


const mb_RD_R = require("./MODBUS_COMMS/nmbm_rd_res")
      mb_RD_R.readVal_RD_R();

const mb_SCHOE_R = require("./MODBUS_COMMS/nmbm_schoe_r")
      mb_SCHOE_R.readVal_SCHOE_R();



const mb_Oli_R = require("./MODBUS_COMMS/nmbm_olip_r")
      mb_Oli_R.readVal_Oli_R();

const mb_Oli_B_R = require("./MODBUS_COMMS/nmbm_oli_binary_r")
      mb_Oli_B_R.readVal_Oli_R();

const mb_SM_R = require("./MODBUS_COMMS/nmbm_sm_res")
      mb_SM_R.readVal_SM_R();

const mb_GR_R = require("./MODBUS_COMMS/nmbm_gr_wtw_res")
      mb_GR_R.readVal_GR_R();

const mb_VRH_R_PS = require("./MODBUS_COMMS/nmbm_vrh_ps_res")
      mb_VRH_R_PS.readVal_VRH_R_PS();

const mb_CHT_R = require("./MODBUS_COMMS/nmbm_cht_ps_res")
      mb_CHT_R.readVal_CHT_R();

const mb_CG_PS = require("./MODBUS_COMMS/rw_cg_ps")
      mb_CG_PS.readVal_CG_PS();

const mb_NMU_EFF_PS = require("./MODBUS_COMMS/nmbm_nmu_eff_ps")
      mb_NMU_EFF_PS.readVal_NMU_EFF_PS();



      // const test = require("./MODBUS_COMMS/test");
      // test.readVal_test();

// /////////////////////////////////////PUMPSTATIONS

const mb_MW_PS_G = require("./MODBUS_COMMS/nmbm_mw_ps_g")
      mb_MW_PS_G.readVal_MW_PS_G();

const mb_MW_PS = require("./MODBUS_COMMS/nmbm_mw_ps")
      mb_MW_PS.readVal_MW_PS();

const storm_ps = require("./MODBUS_COMMS/storms_ps")
      storm_ps.readVal_storm_ps();

      const storm_wtw = require("./MODBUS_COMMS/storms_wtw")
      storm_wtw.readVal_storm_wtw();

const mb_VS_PS = require("./MODBUS_COMMS/nmbm_vs_ps")
mb_VS_PS.readVal_VS_PS();

const mb_BF_PS = require("./MODBUS_COMMS/nmbm_bf_ps")
mb_BF_PS.readVal_BF_PS_R();

const mb_HB_PS_R_2 = require("./MODBUS_COMMS/nmbm_hb2_ps")
mb_HB_PS_R_2.readVal_HB_PS_R_2();


const mb_VW_PS = require("./MODBUS_COMMS/nmbm_vw_ps")
mb_VW_PS.readVal_VW_PS();

const mb_STAN_PS_1 = require("./MODBUS_COMMS/nmbm_stan_ps_1")
mb_STAN_PS_1.readVal_STAN_PS_1();
const mb_STAN_PS_2 = require("./MODBUS_COMMS/nmbm_stan_ps_2")
mb_STAN_PS_2.readVal_STAN_PS_2();
const mb_STAN_PS_3 = require("./MODBUS_COMMS/nmbm_stan_ps_3")
mb_STAN_PS_3.readVal_STAN_PS_3();

////////////////////////////////////////Ground Water
//Newton Park Pool
const mb_NPP_GW = require("./MODBUS_COMMS/nmbm_npp_gw")
mb_NPP_GW.readVal_NM_NPP_GW();


const mb_ISUZU_AUTO= require("./MODBUS_COMMS/isuzu_auto")
mb_ISUZU_AUTO.readVal_ISUZU_AUTO()


const driver = require("./MODBUS_COMMS/drivers_tagCreation")
driver.driver_creation()

// const klm_HUP_GW = require("./CLOUDWORKS/klm_hup_gw")
// klm_HUP_GW.readVal_HUP_GW();
const klm_HUP2_GW = require("./MODBUS_COMMS/klm_hup2_gw")
klm_HUP2_GW.readVal_HUP2_GW();
const klm_HUP3_GW = require("./MODBUS_COMMS/klm_hup3_gw")
klm_HUP3_GW.readVal_HUP3_GW();
const klm_HUP4_GW = require("./MODBUS_COMMS/klm_hup4_gw")
klm_HUP4_GW.readVal_HUP4_GW();
const klm_HUP6_GW = require("./MODBUS_COMMS/klm_hup6_gw")
klm_HUP6_GW.readVal_HUP6_GW()


const demo = require("./MODBUS_COMMS/demo_ONOff");
demo.demo_function()

const klm_KUIS12_gw = require("./MODBUS_COMMS/klm_kruis12_gw")
klm_KUIS12_gw.readval_kuis12_gw();



const klm_KUIS13_gw = require("./MODBUS_COMMS/klm_kruis13_gw")
klm_KUIS13_gw.readval_kuis13_gw();

const klm_KUIS14_gw = require("./MODBUS_COMMS/klm_kruis14_gw")
klm_KUIS14_gw.readval_kuis14_gw();


const klm_KUIS_r = require("./MODBUS_COMMS/klm_kruis_r")
klm_KUIS_r.readval_kuis_r();


const mb_Kark_GW = require("./MODBUS_COMMS/nmbm_kark1_gw")
     mb_Kark_GW.readVal_KARK_K1_GW();

const mb_Kark2_GW = require("./MODBUS_COMMS/nmbm_kark2_gw")
      mb_Kark2_GW.readVal_KARK_K2_GW();


const mb_HUM_GW = require("./MODBUS_COMMS/nmbm_hum_gw")
mb_HUM_GW.readVal_HUM_GW();
// /////////////////////////////////////FPT Sites
const mb_BETH_FPT=require("./MODBUS_COMMS/nmbm_beth_fpt")
mb_BETH_FPT.readVal_BETH_FPT();

const mb_FMT1_FM = require("./MODBUS_COMMS/nmbm_fmt1_fm")
mb_FMT1_FM.readVal_FMT1_FM();

const mb_FMT2_FM = require("./MODBUS_COMMS/nmbm_fmt2_fm")
mb_FMT2_FM.readVal_FMT2_FM()

const mb_SM_FM = require("./MODBUS_COMMS/nmbm_sm_fm")
mb_SM_FM.readVal_SM_FM()

const mb_CIDZT_FPT = require("./MODBUS_COMMS/nmbm_cidzt_fpt")
mb_CIDZT_FPT.readVal_CIDZT_FPT()

const mb_GT_BRG_FPT = require("./MODBUS_COMMS/nmbm_gt_brg_fpt")
mb_GT_BRG_FPT.readVal_GT_BRG_FPT()

const mb_UIT_FC_FPT = require("./MODBUS_COMMS/nmbm_uit_fc_fpt")
mb_UIT_FC_FPT.readVal_UIT_FC_FPT()

/////////////////////////////////////////////////// WTW Sites
const mb_NGT_WTW = require("./MODBUS_COMMS/nmbm_ngt_wtw")
mb_NGT_WTW.readVal_NGT_WTW()


const mb_ELANDS_WTW = require("./MODBUS_COMMS/nmbm_elands_wtw")
mb_ELANDS_WTW.readVal_ELANDS_WTW()



////////////////////////////////////////////////// Feedlot
const wes1_fl = require("./MODBUS_COMMS/wes1_fl")
wes1_fl.readVal_wes1_fl();


const wes2_fl = require("./MODBUS_COMMS/wes2_fl")
wes2_fl.readVal_wes2_fl();
 

const getnew = require("./Database-Functions/Coega-kop");
const { default: mongoose } = require("mongoose");

getnew.GetVal_NMB_CGK_R();
//websockets(ws) functions
ws.readVal_GB_R();
ws.readVal_GBW_FPT();
ws.readVal_BH_R();
ws.readVal_BUSH_R();
ws.readVal_VS_R();
ws.readVal_HB_PS_R();
ws.readVal_LH_PS_R();
ws.readVal_TC_PS_R();
ws.readVal_CHE_R();
ws.readVal_Emer_R();
ws.readVal_DRIFT_R();
ws.readVal_MALI_R();
ws.readVal_RD_R();
ws.readVal_SCHOE_R();
ws.readVal_Oli_R();
// ws.readVal_Oli_B_R();
ws.readVal_SM_R();
ws.readVal_VRH_R_PS();
ws.readVal_GR_R();
ws.readVal_CHT_R();
ws.readVal_NMB_CGK_R();

//Pumpstation
ws.readVal_BH_PS()
ws.readVal_VS_PS();
ws.readVal_BH_PS();
ws.readVal_BF_PS_R()
ws.readVal_HB_PS_R_2();
ws.readVal_CG_PS();
ws.readval_kuis_r();
ws.readVal_VW_PS();
ws.readVal_NMU_EFF_PS();
ws.readVal_STAN_PS();
ws.readVal_MW_PS_G();
ws.readVal_MW_PS();
ws.readVal_storm_wtw();
ws.readVal_storm_ps();

//Groundwater
ws.readVal_NM_NPP_GW();
ws.readVal_HUP_GW();
ws.readVal_HUP2_GW();
ws.readVal_HUP3_GW();
ws.readVal_HUP4_GW();
ws.readVal_HUP6_GW();
ws.readVal_KARK_K1_GW();
ws.readVal_KARK_K2_GW();
ws.readVal_HUM_GW();

ws.readVal_FMT1_FM();
ws.readVal_FMT2_FM();
ws.readVal_SM_FM();
ws.readVal_CIDZT_FPT();
ws.readVal_GT_BRG_FPT();
ws.readVal_UIT_FC_FPT();
ws.readVal_BETH_FPT();
ws.readVal_wes1_fl();
ws.readVal_wes2_fl();



// Auto
ws.readVal_ISUZU_AUTO()





// var alarmName = ["Fairview"]
// var alarm=[[],[]]
// var emailList=["dewaldt18@gmail.com"]









ws.readVal_NGT_WTW();
ws.readVal_ELANDS_WTW();
// Control

setTimeout(() => {
    ws.Wes_PS_ControlWord();
}, 1000)

setTimeout(() => {
      ws.Stan_PS_ControlWord();
}, 10000);





AllResTrends.ReservoirTrends();
AllResTrends.ReservoirTotalFlows();

AllResTrends.Greenbushes_Reservoir();
AllResTrends.Greenbushes_Reservoir_TF();
AllResTrends.Grassridge_Flow();
AllResTrends.EmeraldHill_Flow();
AllResTrends.Drift_Flow();
AllResTrends.Drift_TotalFlow();

AllResTrends.SCHOE_FLOW_RATE();
AllResTrends.SCHOE_FAULT();

AllResTrends.EmeraldHill_TotalFlow()

AllResTrends.CoegaKopTrend();
AllResTrends.CoegaKopTrendTotalFlow();


AllResTrends.BERGEN_RES();
AllResTrends.WOLWAS_RES();
AllResTrends.UMI_RES();
AllResTrends.KROON_RES();
AllResTrends.DAMP_RES();
AllResTrends.TIN_RES();
AllResTrends.HOL_RES();
AllResTrends.BUSH_FR_Trend();
AllResTrends.KARK_R_Trend();

AllResTrends.COE_KOP_R_Trend();



AUTO_Trend.ISUZU_AUTO_Trend()

FL_Trend.WES_FEED_Trend();
FL_Trend.WES_FEED_FillingTotal();
FL_Trend.WES_FEED_FeedTotal();

FPT_Trend.FMT_Trend();
FPT_Trend.FMT_Trend_TF();

FPT_Trend.JeffBayTakeOffTotalFlowFPT();
FPT_Trend.JeffBayTakeOffBatteryFPT();
FPT_Trend.JB_PB_SFO_TF();
FPT_Trend.JB_PB_SFO_BATTER();
FPT_Trend.ONS_PARA_TF();
FPT_Trend.ONS_PARA_BATTER();
FPT_Trend.KOU_MAIN_LIN();
FPT_Trend.HUMANSDORP_OFF_TAK();
FPT_Trend.HUMANSDORP_OFF_TAK_TF();
FPT_Trend.GAMTOOS_BREAK_WATER_BAR_FLOW();

FPT_Trend.IDZT_Trend_TF();
FPT_Trend.IDZT_Trend_FR();

FPT_Trend.GT_BRG_TF();
FPT_Trend.GT_BRG_Trend();


FPT_Trend.UIT_FC_TF();
FPT_Trend.UIT_FC_Trend();
FPT_Trend.BETH_Trend();
FPT_Trend.BETH_FPT_TF();
//FPT_Trend.FPT_TRENDS()

PS_Trend.VW_Trend_Trend();
PS_Trend.VW_Trend_TF();
PS_Trend.WW_PS_NMU_EFF_TotalFlow();
PS_Trend.WW_PS_NMU_EFF_Trend();
CG_Trend.CG_Trend();
PS_Trend.NMBM_MW_BPS_Trend();
PS_Trend.NMBM_STAN_BPS_Trend();
PS_Trend.Storms_PS_Trend();
PS_Trend.Storms_PS_Trend_TF();
PS_Trend.Chatty_Trend_TF();
PS_Trend.Chelsea_PS_TREND();
WTW_Trend.WTW_NGT_FM_Trend();
WTW_Trend.STORMS_WTW_Trend();
WTW_Trend.WTW_ELANDS_FR();
//Ground Water
GW_Trend.NMBM_NPP_GW_Trend();
GW_Trend.NPP_TREND_TF();
GW_Trend.KLM_HUP_GW_Trend();
GW_Trend.KLM_HUP_GW_TF();
GW_Trend.KLM_HUP2_GW_Trend();
GW_Trend.KLM_HUP2_GW_TF();
GW_Trend.KLM_HUP3_GW_Trend();
GW_Trend.KLM_HUP3_GW_TF();
GW_Trend.KLM_HUP4_GW_Trend();
GW_Trend.KLM_HUP4_GW_TF();
GW_Trend.KLM_HUP6_GW_TF();
GW_Trend.KLM_HUP6_GW_Trend();




// GW_Trend.NMBM_HUM_GW_TF()
GW_Trend.NMBM_HUM_GW_FLOW()

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
     // console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
     // console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);




















var MongoClient = require('mongodb').MongoClient;

var url= gvar.standardConnectionString;

var MongoClient = require('mongodb').MongoClient;

var url= gvar.standardConnectionString;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
   var dbo = db.db("HawkEye");
  var query = {id:"ALARMS"};
  dbo.collection("ALARMS_CurrentVals").find(query).sort({_id:-1}).toArray(function(err,data){
   // gvar.fmt_FM_LOW_B = data[0].fmt_FM_LOW_B


    gvar.hum_gw_raw_water_tank_lvl = data[0].fmt_FM_LOW_B
    gvar.hum_gw_final_water_tank_lvl= data[0].fmt_FM_LOW_B
 })


})




setInterval(() => {

      // faultEmail( gvar.hum_gw_voltage_ok,0,"hum_gw_voltage_ok_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "Voltage Fault detected at:")
      // faultEmail( gvar.hum_gw_VSD_Fault,1,"hum_gw_VSD_Fault_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "VSD Fault detected at:")
      // faultEmail( gvar.hum_gw_borehole_low_level_fault,1,"hum_gw_borehole_low_level_fault_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "Low level detected at:")
      // faultEmail( gvar.hum_gw_raw_water_tank_low_level_fault,1,"hum_gw_raw_water_tank_low_level_fault_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "Low level detected at:")
      // faultEmail( gvar.hum_gw_final_water_tank_low_level_fault,1,"hum_gw_final_water_tank_low_level_fault_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "Final Water Tank Low Level:")

      // faultEmail(gvar.nmb_schoe_r_actuator_valve_feedback_signal_error,1,"nmb_schoe_r_actuator_valve_feedback_signal_error_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Valve Signal Error detected at: ")
      // faultEmail(gvar.nmb_schoe_r_reservoir_level_signal_error,1,"nmb_schoe_r_reservoir_level_signal_error_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Level Signal detected at")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_command_signal_error,1,"nmb_schoe_r_actuator_valve_command_signal_error_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Command Signal detected at")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_fault,1,"nmb_schoe_r_actuator_valve_fault_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Fault detected at:")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_torque_fail_close,1,"nmb_schoe_r_actuator_valve_torque_fail_close_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Torque fail close at:")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_torque_fail_open,1,"nmb_schoe_r_actuator_valve_torque_fail_open_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Torque fail open at:")
      // faultEmail(gvar.nmb_schoe_r_general_fault,1,"nmb_schoe_r_general_fault_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "General Fault at:")
      // faultEmail(gvar.nmb_schoe_r_actuator_general_fault,1,"nmb_schoe_r_actuator_general_fault_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Actuator General fault: ")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_timeout,1,"nmb_schoe_r_actuator_valve_timeout_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Valve timeout at: ")

     //


      // levelWarningEmail(gvar.hum_gw_raw_water_tank_lvl,50,100,"hum_gw_raw_water_tank_lvl_low_trigger","hum_gw_raw_water_tank_lvl_high_trigger", "dewaldt@macautomation.co.za","Humerail Raw Water Tank","Level below 50% in raw water tank detected at : ","" )

      // levelWarningEmail(gvar.hum_gw_final_water_tank_lvl,50,100,"hum_gw_final_water_tank_lvl_low_trigger","hum_gw_final_water_tank_lvl_high_trigger", "dewaldt@macautomation.co.za","Humerail Final Water Tank","Level below 50% in final water tank detected at : ","" )




},10000)



var MongoClient = require('mongodb').MongoClient;

var url= gvar.standardConnectionString;


async function faultEmail(gvarAlarm ,condition, object, emailList, subject, message){

  detectNulls(object,"Not Sent")

if(gvarAlarm == condition && gvar[object] != "Sent" )
{
      sendEmail(emailList,subject,message)
      updatedb(object, "Sent")

}
else if(gvarAlarm != condition && gvar[object] == "Sent")
{
  updatedb(object, "Not Sent")
}

}


function sendEmail(emailList,subject,Message){
  const isoDate = new Date().toISOString().toString();
  let date = new Date(isoDate);

  let formattedDate = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    });

console.log(formattedDate);

        const nodemailer = require("nodemailer");
          var emailBody = Message + " " + formattedDate;

          async function main() {
            let transporter = nodemailer.createTransport({
              host: "mail.macautomation.co.za",
              port: 26,
              secure: false,
              auth: {
                user: 'dewaldt@macautomation.co.za',
                pass: "Beanstalk2022",
              },
              tls:{
                rejectUnauthorized:false
              }
            });

            let info = await transporter.sendMail({
              from: '"Dewaldt de Waal" <dewaldt@macautomation.co.za>',
              to: emailList,
              subject: subject,
              text: emailBody,
            });

            console.log("Message sent: %s", info.messageId);

            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }

          main().catch(console.error);
        }

function detectNulls(object,string){
  if(gvar[object] == null || gvar[object]== undefined){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");
      var query = {id:"ALARMS"};
      dbo.collection("ALARMS_CurrentVals").find(query).sort({_id:-1}).toArray(function(err,data){
        gvar[object] = data[0][object]

        if(gvar[object] == null || gvar[object]== undefined)
        {
           gvar[object] = string;
           var firstValue ={
           [object]:gvar[object],
           id:"ALARMS"
         }
           var myquery = { id: "ALARMS"};
           var newValues = {$set:firstValue }

           dbo.collection("ALARMS_CurrentVals").updateOne(myquery,newValues , function(err, res){
           if (err) throw err;
           db.close();
            });

           }
     })



   })

  }


}


function updatedb(object, string){

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

gvar[object] = string;
var firstValue ={
    [object]:gvar[object],
    id:"ALARMS"
  }
var myquery = { id: "ALARMS"};
var newValues = {$set:firstValue }

dbo.collection("ALARMS_CurrentVals").updateOne(myquery,newValues , function(err, res){
    if (err) throw err;
    db.close();
     });
    })

}












async function levelWarningEmail(gvar1 , condition1, condition2, object1,object2, emailList, subject, message1,message2 )
{
  detectNulls(object1,"Not Sent")

  detectNulls(object2,"Not Sent")

if (gvar1 < condition1 && gvar[object1] == "Not Sent"  && gvar[object1] != undefined){
  sendEmail(emailList,subject,message1);
  updatedb(object1, "Sent")
}
else if(gvar1 > condition1 && gvar[object1] == "Sent" && gvar[object1] != undefined ){
  updatedb(object1, "Not Sent")
}
else if(gvar1 > condition2 && gvar[object2] != "Sent" && gvar[object2] != undefined){

  sendEmail(emailList,subject,message2);
  updatedb(object2, "Sent")


}
else if(gvar1 < condition2 && gvar[object2] == "Sent" && gvar[object2] != undefined){

  updatedb(object2, "Not Sent")
}


}
