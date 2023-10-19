import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "../Service-Files/auth.service";
import { ServerURLService } from "../Service-Files/server-url.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,  private su: ServerURLService) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var isAuth = this.authService.getIsAuth();

    if (!isAuth) {
     this.router.navigate(['/hawkeye/login']);
    }


    var url = window.location.href
    //var urlArr= url.split("4200")// FOR localhost
      //var urlArr= url.split("hawkeye")// FOR SERVER
    var urlArr= url.split(this.su.guardURL)// lOCALHOST

    url = urlArr[1];
    switch (url) {
      case "/add-user" :
         url = "ADMIN"
         break;

         case "/admin/manage-accounts":
           url = "ADMIN"
           break;

           case "/admin/manage-accounts/edit-account":
            url = "ADMIN"
            break;

            case "/sub-admin/nmbm-manage-accounts":
              url = "ADMIN_NMBM";
              break;

              case "/sub-admin/nmbm-add-user":
                url = "ADMIN_NMBM";
              break;


              case "/sub-admin/nmbm-manage-accounts/nmbm-edit-accounts":
                url = "ADMIN_NMBM";
              break;





      ///////////////////////////////// RESERVOIR OVERVIEWS
  case "/reservoirs/overview":
        url = "HWK_RO"
        break;

        case "/fptsites/fpt-overview":
          url="HWK_FO"
          break;


          case "/reservoirs/airportres":
            url = "NMB_AIR_PRT";
            break;
        //////test overviews
        case "/pumpstations/test":
        url="NMB_TEST"
        break;


///////////////////////////////////////Automotive

        case "/automotive/isuzu":
          url= "ISUZU_AUTO"
          break;


        case "/drivers/driver":
          url="DRIVER"
          break;

          case "/drivers/driverEdit":
            url = "DRIVER"
            break;

            case "/drivers/manageDriver":
              url= "DRIVER"
              break;

      ///////////////////////////////// RESERVOIRS

      case "/reservoirs/motherwellres":
        url="NMB_MW_R"
        break;

      case "/reservoirs/bergendal":
        url="GRF_BERGEN_R"
        break;

         case "/reservoirs/damcamp":
        url="GRF_DAMP_R"
        break;

        case "/reservoirs/holding":
          url="GRF_HOLD_R"
          break;

           case "/reservoirs/kroonvale":
          url="GRF_KROON_R"
          break;

          case "/reservoirs/tinroof":
            url="GRF_TIN_R"
            break;

             case "/reservoirs/umasizakhe":
            url="GRF_UMA_R"
            break;

            case "/reservoirs/wolwas":
              url="GRF_WOL_R"
              break;

      case "/reservoirs/kwanobuhle":
        url="NMB_KWANO_R"
        break;

        case "/wtw/humansdorpwtw":
          url = "KLM_HUP_WTW"
          break;

      case "/reservoirs/driftsands":
        url="NMB_DRIFT_R"
        break;


      case "/reservoirs/emeraldhill":
        url="NMB_EMERALD_R"
        break;

      case "/reservoirs/oliphantskop":
        url= "NMB_OLI_R"
        break;


      case "/reservoirs/greenbushes":
            url = "NMB_GB_R"
            break;

     case "/reservoirs/vanstadens":
            url = "NMB_VS_R"
            break;

     case "/reservoirs/bluehorizonbay":
            url = "NMB_BHB_R"
            break;

     case "/reservoirs/heatherbank":
            url = "NMB_HB_R"
            break;

    case "/reservoirs/lovemoreheights":
           url = "NMB_LH_R"
           break;

    case "/reservoirs/malibar":
      url="NMB_MALI_R"
      break;

    case "/reservoirs/theescombe":
           url = "NMB_TC_R"
           break;

    case "/reservoirs/chelsea":
           url = "NMB_CHE_R"
           break;

    case "/reservoirs/chatty":
          url = "NMB_CHT_R"
          break;

    case "/reservoirs/vanriebeekhoogte":
          url = "NMB_VRH_R"
          break;

    case "/reservoirs/grassridge":
          url = "NMB_GR_R"
          break;

    case "/reservoirs/demo-res":
            url = "HWK_DEMO_R"
            break;


    case "/reservoirs/rosedale":
           url = "NMB_RD_R"
           break;

    case "/reservoirs/summit":
             url = "NMB_SM_R"
             break;
     case "/reservoirs/coegakop":
              url="NMB_CGK_R"
              break;
      case "/reservoirs/coegakopdownload":
              url="NMB_CGK_R"
              break;



      case "/groundwater/fairview":
        url="NMB_FAIR_GW";
        break;

       case "/groundwater/glendinningvale":
         url="NMB_GLEN_GW";
         break;

       case "/groundwater/fortnottingham":
         url="NMB_FNGH_GW";
         break;

       case "/groundwater/stgeorgespark":
         url="NMB_STGP_GW";
         break;



         case "/groundwater/kruisfontein-gw12":
          url = "KLM_KUI_12_GW"
          break;


          case "/groundwater/kruisfontein-gw13":
            url = "KLM_KUI_13_GW"
            break;

            case "/groundwater/kruisfontein-gw14":
              url = "KLM_KUI_14_GW"
              break;


              case "/reservoirs/kruisfontein-r":
                url = "KLM_KUI_R"
                break;




      ///////////////////////////////// PUMP STATIONS

      case "/pumpstations/test-pumpstation":
        url="TEST_PUMPSTATION";
        break;

      case "/pumpstations/ps-overview":
        url="HWK_PO"
        break;


      case "/reservoirs/schoemanshoek":
        url="NMB_SCHOE_R";
        break;


        case "/pumpstations/vanstadens":
            url = "NMB_VS_PS"
            break;


       case "/pumpstations/chelsea-ps":
        url = "NMB_CHE_PS"
        break;

        case "/pumpstations/bluehorizonbay":
            url = "NMB_BHB_PS"
            break;

            case "/pumpstations/lovemoreheights":
              url = "NMB_LH_PS"
              break;

              case "/pumpstations/heatherbank":
            url = "NMB_HB_PS"
            break;

            case "/pumpstations/theescombe":
            url = "NMB_TC_PS"
            break;

            case "/pumpstations/buffelsfontein":
            url = "NMB_BFT_PS"
            break;

            case "/pumpstations/crowngardens":
              // Rand Water
               url = "RW_CG_PS"
               break;

            case "/pumpstations/demo-ps":
              url = "HWK_DEMO_PS"
              break;

            case "/pumpstations/vanriebeekhoogte":
              url = "NMB_VRH_PS"
              break;

            case "/pumpstations/chatty":
                url = "NMB_CHT_PS"
                break;
                case "/pumpstations/chatty/chattydownload":
                  url = "NMB_CHT_PS"
                  break;

            case "/pumpstations/verwoerd":
                  url = "NMB_VW_PS"
                  break;

             case "/pumpstations/stanford-road":
               url = "NMB_STAN_R_PS"
               break;


              case "/pumpstations/nmu-effluent":
                url = "NMU_NMU_EFF"
                break;

              case "/pumpstations/motherwell":
                url = "NMB_MW_PS"
                break;

                case "/pumpstations/bushypark-wtw":
                  url="NMB_BUSH_PS"
                  break;


              case "/pumpstations/stormsriver":
                url="TSI_STORMS_PS"
                break;

                case "/pumpstations/st-georges":
                  url="NMB_STG_PS"
                  break;


             //Ground Water
            case "/groundwater/newtonparkpool":
              url = "NMB_NPP_GW"
              break;

            case "/groundwater/humansdorp":
              url="KLM_HUP_GW"
              break;
            case "/groundwater/humansdorp2":
              url="KLM_HUP2_GW"
              break;
             case "/groundwater/humansdorp3":
               url="KLM_HUP3_GW"
               break;
            case "/groundwater/humansdorp4":
              url="KLM_HUP4_GW"
              break;

              case "/groundwater/humansdorp6":
                url="KLM_HUP6_GW"
                break;

            case "/groundwater/kareedouwk1":
              url="KOU_KARK1_GW"
              break;


              case "/groundwater/kareedouwk2":
                url="KOU_KARK2_GW"
                break;


                case "/reservoirs/kareedouwkres":
                  url="KOU_KARK_R"
                  break;

                  case "/reservoirs/st-georges-res":
                    url="NMB_STG_R"
                    break;


                  case "/groundwater/humerail":
                    url="HUM_HUM_GW"
                    break;
                     //////////////////// FPT


                     case "/fptsites/gamtoos-break-water":
                      url="NMB_GBW_FPT"
                      break;

                     case "/fptsites/humansdorp-offtake":
                      url="NMB_HUP_OFF_TAKE_FPT";
                      break;

                    case "/fptsites/jeffreys-bay-off-take":
                      url="NMB_JEFF_BAY_OFF_TAKE_FPT";
                      break;

                    case "/fptsites/kouga-main-line":
                      url="NMB_KOU_MAIN_LINE_FPT";
                      break;


                    case "/fptsites/bushypark-fpt":
                      url = "NMB_BUSH_FPT";
                      break;


                    case "/fptsites/ons-paradys":
                      url="NMB_ONS_PARA_FPT";
                      break;

                    case "/fptsites/paradise-beach-st-francis-offtake":
                      url="NMB_PARA_BEA_ST_FRANCIS_FPT";
                      break;




                  case "/fptsites/fmtower":
                    url = "NMB_FMT_FPT"
                    break;

                    case "/fptsites/coegaidzt":
                      url = "NMB_CIDZT_FPT"
                      break;

                      case "/fptsites/gamtoos-bridge":
                        url = "NMB_GT_BRG_FPT"
                        break;

                        case "/fptsites/uitenhage-flow-chamber":
                          url = "NMB_UIT_FC_FPT"
                          break;


                      case "/fptsites/bethelsdorp":
                        url="NMB_BETH_FPT"
                        break;

                          ///////////////////// WTW
                     case "/wtw/nooitgedacht":
                       url = "NMB_NGT_WTW"
                       break;


                      //  case "/wtw/st-georges":
                      //   url="NMB_STG_WTW"
                      //   break;


                       case "/wtw/stormsriver-wtw":
                        url = "TSI_STORMS_WTW"
                        break;

                        case "/wtw/elandsjagt":
                          url = "NMB_ELANDS_WTW"
                          break;


                          case "/zones/lee-samuals-drive":
                              url = "NMB_LSD_ZS"
                            break;


                            case "/zones/mc-noughtontownshipsouth":
                                url = "NMB_MNTS_ZS"
                              break;



                       ////////////////////
                       case "/feedlots/wessels":
                         url="WES_FL"
                         break;

                        case "/feedlots/waplaasinput":
                          url="WES_FL"
                          break;


              ////////////////////////////////TRENDS


                case '/trends/trendpickerV2':
                  url = "V2_PICKER_TRENDS"
                  break;

                  case '/trends/add-preset':
                    url = "V2_PICKER_TRENDS"
                    break;

                    case '/trends/manage-preset':
                      url = "V2_PICKER_TRENDS"
                      break;


                    case '/trends/edit-preset':
                      url = "V2_PICKER_TRENDS"
                      break;

              case '/trends/waplaastrends':
                url = "WES_FL"
                break;


                case '/trends/csv':
                  url ="CSV_DOWNLOAD"
                  break;

        case "/trends/test-picker":
          url = "testPicker";
          break;

    }


var userSites = this.authService.getUserSites()

   for (let i = 0; i < userSites.length; i++) {
    if(userSites[i] == url){
      isAuth= true;break
    }


     if(url== "/login" || url== "/home"  || url==""|| url =="/"||url =="/edit-password"||url =="/color-customization"||url =="/alarms-viewer"||url=="/pumpstations/control-log-viewer"||url=="/trends/tag-selector"){
      isAuth= true;

    }else
    isAuth=false
  }
  return isAuth
  }
}
