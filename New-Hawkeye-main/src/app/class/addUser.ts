import { NgForm } from '@angular/forms';
import { UsersService } from '../Service-Files/users.service';


//is there a way for me to set each element in this sitemap to null.  These are the checked elements
export const siteMap = {
  "HWK_RO": "HWK_RO_CHECKED",
  "ISUZU_AUTO": "isuzu_AUTO_CHECKED",
  "NMB_VS_R": "nmb_VS_R_CHECKED",
  "NMB_BHB_R": "nmb_BHB_R_CHECKED",
  "NMB_HB_R": "nmb_HB_R_CHECKED",
  "NMB_LH_R": "nmb_LH_R_CHECKED",
  "NMB_MALI_R":"nmb_MALI_R_CHECKED",
  "NMB_MW_R": "nmb_MW_R_CHECKED",
  "NMB_TC_R": "nmb_TC_R_CHECKED",
  "NMB_CHE_R": "nmb_CHE_R_CHECKED",
  "NMB_CHT_R": "nmb_CHT_R_CHECKED",
  "NMB_VRH_R": "nmb_VRH_R_CHECKED",
  "NMB_GR_R": "nmb_GR_R_CHECKED",
  "NMB_DRIFT_R": "nmb_DRIFT_R_CHECKED",
  "NMB_KWANO_R": "nmb_KWANO_R_CHECKED",
  "NMB_EMERALD_R": "nmb_EMERALD_R_CHECKED",
  "NMB_GB_R": "nmb_GB_R_CHECKED",
  "HWK_DEMO_R": "HWK_DEMO_R_CHECKED",
  "NMB_RD_R":"nmb_RD_R_CHECKED",
  "NMB_SCHOE_R":"nmb_SCHOE_R_CHECKED",
  "NMB_SM_R":"nmb_SM_R_CHECKED",
  "NMB_CGK_R":"nmb_CGK_R_CHECKED",
  "NMB_OLI_R":"nmb_OLI_R_CHECKED",
  "GRF_BERGEN_R":"GRF_BERGEN_R_CHECKED",
  "NMB_AIR_PRT":"NMB_AIR_PRT_CHECKED",
  "GRF_DAMP_R":"GRF_DAMP_R_CHECKED",
  "GRF_HOLD_R":"GRF_HOLD_R_CHECKED",
  "GRF_KROON_R":"GRF_KROON_R_CHECKED",
  "GRF_TIN_R":"GRF_TIN_R_CHECKED",
  "GRF_UMA_R":"GRF_UMA_R_CHECKED",
  "GRF_WOL_R":"GRF_WOL_R_CHECKED",
  "NMB_FAIR_GW":"NMB_FAIR_GW_CHECKED",
  "NMB_GLEN_GW":"NMB_GLEN_GW_CHECKED",
  "NMB_FNGH_GW":"NMB_FNGH_GW_CHECKED",
  "NMB_STGP_GW":"NMB_STGP_GW_CHECKED",
  "HWK_PO":"HWK_PO_CHECKED",
  "HWK_FO":"HWK_FO_CHECKED",
  "NMB_VS_PS":"nmb_VS_PS_CHECKED",
  "NMB_BHB_PS":"nmb_BHB_PS_CHECKED",
  "NMB_LH_PS":"nmb_LH_PS_CHECKED",
  "NMB_BFT_PS":"nmb_BFT_PS_CHECKED",
  "NMB_TC_PS":"nmb_TC_PS_CHECKED",
  "NMB_HB_PS":"nmb_HB_PS_CHECKED",
  "RW_CG_PS":"rw_CG_PS_CHECKED",
  "HWK_DEMO_PS":"HWK_DEMO_PS_CHECKED",
  "NMB_VRH_PS":"nmb_VRH_PS_CHECKED",
  "NMB_CHT_PS":"nmb_CHT_PS_CHECKED",
  "NMB_VW_PS":"nmb_VW_PS_CHECKED",
  "NMB_TEST":"nmb_TEST_PS_CHECKED",
  "NMU_NMU_EFF":"NMU_NMU_EFF_PS_CHECKED",
  "NMB_STAN_R_PS":"nmb_STAN_R_PS_CHECKED",
  "NMB_STAN_R_PS_CON":"nmb_STAN_R_PS_CON_CHECKED",
  "NMB_MW_PS":"nmb_MW_PS_CHECKED",
  "TSI_STORMS_PS":"TSI_STORMS_PS_CHECKED",
  "NMB_CHE_PS":"nmb_CHE_PS_CHECKED",
  "NMB_NPP_GW":"nmb_NPP_GW_CHECKED",
  "KLM_HUP_GW":"klm_HUP_GW_CHECKED",
  "KLM_HUP2_GW":"klm_HUP2_GW_CHECKED",
  "KLM_HUP3_GW":"klm_HUP3_GW_CHECKED",
  "KLM_HUP4_GW":"klm_HUP4_GW_CHECKED",
  "KLM_HUP6_GW":"klm_HUP6_GW_CHECKED",
  "KOU_KARK1_GW":"KOU_KARK1_GW_CHECKED",
  "KOU_KARK_R":"KOU_KARK_R_CHECKED",
  "KOU_KARK2_GW":"KOU_KARK2_GW_CHECKED",
  "HUM_HUM_GW":"HUM_HUM_GW_CHECKED",
  "NMB_FMT_FPT":"nmb_FMT_FPT_CHECKED",
  "NMB_CIDZT_FPT":"nmb_CIDZT_FPT_CHECKED",
  "NMB_GT_BRG_FPT":"nmb_GT_BRG_FPT_CHECKED",
  "NMB_GBW_FPT":"nmb_GBW_FPT_CHECKED",
  "NMB_UIT_FC_FPT":"nmb_UIT_FC_CHECKED",
  "NMB_JEFF_BAY_OFF_TAKE_FPT":"nmb_JEFF_BAY_OFF_TAKE_FPT_CHECKED",
  "NMB_PARA_BEA_ST_FRANCIS_FPT":"nmb_PARA_BEA_ST_FRANCIS_FPT_CHECKED",
  "NMB_KOU_MAIN_LINE_FPT":"nmb_KOU_MAIN_LINE_FPT_CHECKED",
  "NMB_HUP_OFF_TAKE_FPT":"nmb_HUP_OFF_TAKE_FPT_CHECKED",
  "NMB_GLEN_R":"NMB_GLEN_R_CHECKED",


  "NMB_GLEN_FPT":"NMB_GLEN_FPT_CHECKED",
  
  
  "NMB_GLEN_WTW":"NMB_GLEN_WTW_CHECKED",



  "NMB_BETH_FPT":"nmb_BETH_FPT_CHECKED",
  "NMB_NGT_WTW":"nmb_NGT_WTW_CHECKED",
  "TSI_STORMS_WTW":"TSI_STORMS_WTW_CHECKED",
  "NMB_ELANDS_WTW":"nmb_ELANDS_WTW_CHECKED",
  "NMB_LIN_WTW":"NMB_LIN_WTW_CHECKED",
  "WES_FL":"wes_FL_CHECKED",
  // "PICKER_TRENDS":"all_PICKER_TRENDS_CHECKED",
  "V2_PICKER_TRENDS":"all_V2_PICKER_TRENDS_CHECKED",
  "CSV_DOWNLOAD":"all_CSV_DOWNLOAD_CHECKED",
  "NMB_BUSH_FPT":"nmb_BUSH_FPT_CHECKED",
  "ADMIN_NMBM":"admin_NMBM_CHECKED",
  "USER_NMBM":"user_NMBM_CHECKED",
  "NMB_STG_R":"nmb_STG_R_CHECKED",
  "NMB_LIN_R":"NMB_LIN_R_CHECKED",
  "NMB_STG_PS":"nmb_STG_PS_CHECKED",
  "KLM_KUI_12_GW":"klm_KUI_12_GW_CHECKED",
  "KLM_KUI_13_GW":"klm_KUI_13_GW_CHECKED",
  "KLM_KUI_14_GW":"klm_KUI_14_GW_CHECKED",
  "KLM_KUI_R":"klm_KUI_R_CHECKED",
  "KLM_HUP_WTW": "klm_HUP_WTW_CHECKED",

  "NMB_LSD_ZS": "nmb_LSD_ZS_CHECKED",
  "NMB_MNTS_ZS": "nmb_MNTS_ZS_CHECKED",

  "NMB_RD_ZS":"NMB_RD_ZS_CHECKED",
  "NMB_RPE_ZS":"NMB_RPE_ZS_CHECKED"


};

export const sitesAvailable:any={
  klm_HUP_WTW_CHECKED:false,
  nmb_LSD_ZS_CHECKED:false,
  NMB_RD_ZS_CHECKED:false,
NMB_RPE_ZS_CHECKED:false,
nmb_MNTS_ZS_CHECKED:false,
  HWK_RO_CHECKED:false,
  klm_KUI_R_CHECKED:false,
  nmb_EMERALD_R_CHECKED:false,
  nmb_GB_R_CHECKED:false,
  nmb_VS_R_CHECKED:false,
  nmb_BHB_R_CHECKED:false,
  nmb_HB_R_CHECKED:false,
  nmb_LH_R_CHECKED:false,
  nmb_MALI_R_CHECKED:false,
  nmb_MW_R_CHECKED:false,
  nmb_TC_R_CHECKED:false,
  nmb_CHE_R_CHECKED:false,
  nmb_CHT_R_CHECKED:false,
  nmb_VRH_R_CHECKED:false,
  nmb_GR_R_CHECKED:false,
  nmb_DRIFT_R_CHECKED:false,
  nmb_KWANO_R_CHECKED:false,
  HWK_DEMO_R_CHECKED:false,
  nmb_RD_R_CHECKED:false,
  nmb_SM_R_CHECKED:false,
  nmb_SCHOE_R_CHECKED:false,
  nmb_CGK_R_CHECKED:false,
  nmb_OLI_R_CHECKED:false,
  nmb_CGKD_R_CHECKED:false,
  GRF_WOL_R_CHECKED:false,
  GRF_UMA_R_CHECKED:false,
  GRF_TIN_R_CHECKED:false,
  GRF_KROON_R_CHECKED:false,
  GRF_HOLD_R_CHECKED:false,
  GRF_DAMP_R_CHECKED:false,
  GRF_BERGEN_R_CHECKED:false,
  NMB_AIR_PRT_CHECKED:false,
  isuzu_AUTO_CHECKED:false,
  NMB_FAIR_GW_CHECKED:false,
  NMB_GLEN_GW_CHECKED:false,
  NMB_FNGH_GW_CHECKED:false,
  NMB_STGP_GW_CHECKED:false,
  HWK_PO_CHECKED:false,
  HWK_FO_CHECKED:false,
  nmb_VS_PS_CHECKED:false,
  nmb_BHB_PS_CHECKED:false,
  nmb_LH_PS_CHECKED:false,
  nmb_BFT_PS_CHECKED:false,
  nmb_TC_PS_CHECKED:false,
  nmb_HB_PS_CHECKED:false,
  rw_CG_PS_CHECKED:false,
  HWK_DEMO_PS_CHECKED:false,
  nmb_VRH_PS_CHECKED:false,
  nmb_CHT_PS_CHECKED:false,
  nmb_VW_PS_CHECKED:false,
  nmb_TEST_PS_CHECKED:false,
  NMU_NMU_EFF_PS_CHECKED:false,
  nmb_STAN_R_PS_CHECKED:false,
  nmb_STAN_R_PS_CON_CHECKED:false,
  nmb_MW_PS_CHECKED:false,
  TSI_STORMS_PS_CHECKED:false,
  nmb_CHE_PS_CHECKED:false,
  nmb_NPP_GW_CHECKED:false,
  klm_HUP_GW_CHECKED:false,
  klm_HUP2_GW_CHECKED:false,
  klm_HUP3_GW_CHECKED:false,
  klm_HUP4_GW_CHECKED:false,
  klm_HUP6_GW_CHECKED:false,
  KOU_KARK1_GW_CHECKED:false,
  KOU_KARK2_GW_CHECKED:false,
  HUM_HUM_GW_CHECKED:false,
  KOU_KARK_R_CHECKED:false,
  nmb_FMT_FPT_CHECKED:false,
  nmb_CIDZT_FPT_CHECKED:false,
  nmb_GT_BRG_FPT_CHECKED:false,
  nmb_GBW_FPT_CHECKED:false,
  nmb_UIT_FC_CHECKED:false,
  nmb_JEFF_BAY_OFF_TAKE_FPT_CHECKED:false,
  nmb_PARA_BEA_ST_FRANCIS_FPT_CHECKED:false,
  nmb_KOU_MAIN_LINE_FPT_CHECKED:false,
  nmb_HUP_OFF_TAKE_FPT_CHECKED:false,
  NMB_GLEN_R_CHECKED:false,
  NMB_GLEN_FPT_CHECKED:false,
  NMB_GLEN_WTW_CHECKED:false,
  nmb_BETH_FPT_CHECKED:false,
  nmb_NGT_WTW_CHECKED:false,
  TSI_STORMS_WTW_CHECKED:false,
  nmb_ELANDS_WTW_CHECKED:false,
  NMB_LIN_WTW_CHECKED:false,
  wes_FL_CHECKED:false,
  all_RES_TRENDS_CHECKED:false,
  all_V2_PICKER_TRENDS_CHECKED:false,
  all_CSV_DOWNLOAD_CHECKED:false,
  rw_CG_TRENDS_CHECKED:false,
  nmb_FMT_FPT_TRENDS_CHECKED:false,
  nmb_BUSH_FPT_CHECKED:false,
admin_NMBM_CHECKED:false,
user_NMBM_CHECKED:false,
nmb_STG_R_CHECKED:false,
NMB_LIN_R_CHECKED:false,
nmb_STG_PS_CHECKED:false,
klm_KUI_12_GW_CHECKED:false,
klm_KUI_13_GW_CHECKED:false,
klm_KUI_14_GW_CHECKED:false,
}

export class addUser  {




  public static addSites(form: NgForm ){

    const userSites: string[]=[];



    if(form.value.KLM_KUI_12_GW)
    {
      userSites.push("KLM_KUI_12_GW")
    }
    if(form.value.KLM_KUI_13_GW)
    {
      userSites.push("KLM_KUI_13_GW")
    }
    if(form.value.KLM_KUI_14_GW)
    {
      userSites.push("KLM_KUI_14_GW")
    }

    if(form.value.HWK_RO)
    {
      userSites.push("HWK_RO")
    }

    if(form.value.NMB_STG_R){
      userSites.push("NMB_STG_R")
    }


    if(form.value.NMB_LIN_R){
      userSites.push("NMB_LIN_R")
    }

    if(form.value.NMB_STG_PS){
      userSites.push("NMB_STG_PS")
    }


    if(form.value.KLM_HUP_WTW)
    {
      userSites.push("KLM_HUP_WTW")
    }

    if(form.value.NMB_CGK_R)
    {
      userSites.push("NMB_CGK_R")
    }

    if(form.value.NMB_OLI_R)
    {
      userSites.push("NMB_OLI_R")
    }
    if(form.value.NMB_VS_R)
    {
      userSites.push("NMB_VS_R")
    }
    if(form.value.NMB_EMERALD_R)
    {
      userSites.push("NMB_EMERALD_R")
    }
    if(form.value.NMB_DRIFT_R){
      userSites.push("NMB_DRIFT_R")
    }


    if(form.value.KLM_KUI_R){
      userSites.push("KLM_KUI_R")
    }







    if(form.value.NMB_TEST){
      userSites.push("NMB_TEST")
    }


    if(form.value.NMB_BHB_R)
    {
      userSites.push("NMB_BHB_R")
    }

    if(form.value.NMB_HB_R)
    {
      userSites.push("NMB_HB_R")
    }

    if(form.value.NMB_LH_R)
    {
      userSites.push("NMB_LH_R")
    }


    if(form.value.NMB_MALI_R){
      userSites.push("NMB_MALI_R")
    }

    if(form.value.NMB_MW_R ){
      userSites.push("NMB_MW_R")
    }

    if(form.value.NMB_TC_R)
    {
      userSites.push("NMB_TC_R")
    }

    if(form.value.NMB_CHE_R)
    {
      userSites.push("NMB_CHE_R")
    }

    if(form.value.NMB_CHT_R)
    {
      userSites.push("NMB_CHT_R")
    }

    if(form.value.NMB_VRH_R)
    {
      userSites.push("NMB_VRH_R")
    }

    if(form.value.NMB_GR_R)
    {
      userSites.push("NMB_GR_R")
    }

    if(form.value.NMB_GB_R)
    {
      userSites.push("NMB_GB_R")
    }

    if(form.value.NMB_RD_R)
    {
      userSites.push("NMB_RD_R")
    }
    if (form.value.NMB_SCHOE_R)
    {
      userSites.push("NMB_SCHOE_R")
    }

    if (form.value.NMB_KWANO_R)
    {
      userSites.push("NMB_KWANO_R")
    }

    if(form.value.NMB_SM_R)
    {
      userSites.push("NMB_SM_R")
    }

    if(form.value.HWK_DEMO_R)
    {
      userSites.push("HWK_DEMO_R")
    }

    if(form.value.HWK_PO)
    {
      userSites.push("HWK_PO")
    }

    if(form.value.HWK_FO)
    {
      userSites.push("HWK_FO")
    }

    if(form.value.NMB_VS_PS)
    {
      userSites.push("NMB_VS_PS")
    }

    if(form.value.NMB_BHB_PS)
    {
      userSites.push("NMB_BHB_PS")
    }
    if(form.value.NMB_CHE_PS)
    {
      userSites.push("NMB_CHE_PS")
    }
    if(form.value.NMB_LH_PS)
    {
      userSites.push("NMB_LH_PS")
    }

    if(form.value.NMB_BFT_PS)
    {
      userSites.push("NMB_BFT_PS")
    }

    if(form.value.NMB_TC_PS)
    {
      userSites.push("NMB_TC_PS")
    }

    if(form.value.NMB_HB_PS)
    {
      userSites.push("NMB_HB_PS")
    }

    if(form.value.HWK_DEMO_PS)
    {
      userSites.push("HWK_DEMO_PS")
    }
    if(form.value.NMB_VRH_PS)
    {
      userSites.push("NMB_VRH_PS")
    }
    if(form.value.NMB_CHT_PS)
    {
      userSites.push("NMB_CHT_PS")
    }
    if(form.value.NMB_VW_PS)
    {
      userSites.push("NMB_VW_PS")
    }
    if(form.value.NMB_STAN_R_PS)
    {
      userSites.push("NMB_STAN_R_PS")
    }
    if(form.value.NMB_STAN_R_PS_CON)
    {
      userSites.push("NMB_STAN_R_PS_CON")
    }

    if(form.value.NMB_MW_PS)
    {
      userSites.push("NMB_MW_PS")
    }


    if(form.value.NMB_FAIR_GW)
    {
      userSites.push("NMB_FAIR_GW")
    }

    if(form.value.NMB_GLEN_GW)
    {
      userSites.push("NMB_GLEN_GW")
    }

    if(form.value.NMB_FNGH_GW)
    {
      userSites.push("NMB_FNGH_GW")
    }

    if(form.value.NMB_STGP_GW)
    {
      userSites.push("NMB_STGP_GW")
    }



    //Ground Water
    if(form.value.NMB_NPP_GW)
    {
      userSites.push("NMB_NPP_GW")
    }


  if(form.value.KOU_KARK1_GW){
    userSites.push("KOU_KARK1_GW")
        }

  if(form.value.KOU_KARK2_GW){
      userSites.push("KOU_KARK2_GW")
        }

    if(form.value.HUM_HUM_GW)
    {
      userSites.push("HUM_HUM_GW")
    }

   if(form.value.KOU_KARK_R)
   {
    userSites.push("KOU_KARK_R")
   }


    if(form.value.NMB_FMT_FPT)
    {
      userSites.push("NMB_FMT_FPT")
    }
    if(form.value.NMB_CIDZT_FPT)
    {
      userSites.push("NMB_CIDZT_FPT")
    }
    if(form.value.NMB_GT_BRG_FPT)
    {
      userSites.push("NMB_GT_BRG_FPT")
    }

    if(form.value.NMB_GBW_FPT){
      userSites.push("NMB_GBW_FPT")
    }

    if(form.value.NMB_UIT_FC_FPT)
    {
      userSites.push("NMB_UIT_FC_FPT")
    }
    if(form.value.NMB_BETH_FPT){
      userSites.push("NMB_BETH_FPT")
    }

    if(form.value.NMB_LSD_ZS){
      userSites.push("NMB_LSD_ZS")
    }

    if(form.value.NMB_MNTS_ZS){
      userSites.push("NMB_MNTS_ZS")
    }

    if(form.value.NMB_NGT_WTW){
      userSites.push("NMB_NGT_WTW")
    }
    if(form.value.NMB_JEFF_BAY_OFF_TAKE_FPT){
      userSites.push("NMB_JEFF_BAY_OFF_TAKE_FPT")
    }

    if(form.value.NMB_ELANDS_WTW)
    {
      userSites.push("NMB_ELANDS_WTW")
    }

    if(form.value.NMB_LIN_WTW){
      userSites.push("NMB_LIN_WTW")
    }

    if(form.value.NMB_PARA_BEA_ST_FRANCIS_FPT){
      userSites.push("NMB_PARA_BEA_ST_FRANCIS_FPT")
    }


    if(form.value.NMB_RD_ZS){
      userSites.push("NMB_RD_ZS")
    }
    if(form.value.NMB_RPE_ZS){
      userSites.push("NMB_RPE_ZS")
    }


    if(form.value.TSI_STORMS_WTW)
    {
      userSites.push("TSI_STORMS_WTW")
    }


    if(form.value.ISUZU_AUTO){
      userSites.push("ISUZU_AUTO")
    }
    if(form.value.GRF_BERGEN_R){
      userSites.push("GRF_BERGEN_R")
    }

    if(form.value.NMB_AIR_PRT){
      userSites.push("NMB_AIR_PRT")
    }

    if(form.value.GRF_DAMP_R){
      userSites.push("GRF_DAMP_R")
    }

    if(form.value.GRF_HOLD_R){
      userSites.push("GRF_HOLD_R")
    }

    if(form.value.GRF_KROON_R){
      userSites.push("GRF_KROON_R")
    }

    if(form.value.NMB_KOU_MAIN_LINE_FPT){
      userSites.push("NMB_KOU_MAIN_LINE_FPT")
    }
    if(form.value.NMB_BUSH_FPT){
      userSites.push("NMB_BUSH_FPT")
    }



    if(form.value.ADMIN_NMBM){
      userSites.push("ADMIN_NMBM")
    }

    if(form.value.USER_NMBM){
      userSites.push("USER_NMBM")
    }




    if(form.value.GRF_TIN_R){
      userSites.push("GRF_TIN_R")
    }

    if(form.value.GRF_UMA_R){
      userSites.push("GRF_UMA_R")
    }

    if(form.value.GRF_WOL_R){
      userSites.push("GRF_WOL_R")
    }

    if(form.value.NMU_NMU_EFF)
    {
      userSites.push("NMU_NMU_EFF")
    }

    if(form.value.TSI_STORMS_PS)
    {
      userSites.push("TSI_STORMS_PS")
    }

    if(form.value.RW_CG_PS)
    {
      userSites.push("RW_CG_PS")
    }

    if(form.value.KLM_HUP_GW){
      userSites.push("KLM_HUP_GW")
    }

    if(form.value.WES_FL){
      userSites.push("WES_FL")
    }

    if(form.value.NMB_HUP_OFF_TAKE_FPT){
      userSites.push("NMB_HUP_OFF_TAKE_FPT")
    }


    if(form.value.NMB_GLEN_R){
      userSites.push("NMB_GLEN_R")
    }

    if(form.value.NMB_GLEN_FPT){
      userSites.push("NMB_GLEN_FPT")
    }

    if(form.value.NMB_GLEN_WTW){
      userSites.push("NMB_GLEN_WTW")
    }



    if(form.value.V2_PICKER_TRENDS)
    {
      userSites.push("V2_PICKER_TRENDS")
    }

    if(form.value.CSV_DOWNLOAD){
      userSites.push("CSV_DOWNLOAD")
    }

    if(form.value.KLM_HUP2_GW){
      userSites.push("KLM_HUP2_GW")
    }
    if(form.value.KLM_HUP3_GW){
      userSites.push("KLM_HUP3_GW")
    }
   if(form.value.KLM_HUP4_GW){
    userSites.push("KLM_HUP4_GW")
        }
    if(form.value.KLM_HUP6_GW){
      userSites.push("KLM_HUP6_GW")
    }





    return userSites;
  }




}
