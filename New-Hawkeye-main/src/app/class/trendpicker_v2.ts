


// export class Trendpicker_v2{

//   schoeTagListArr:string[]=[];
//   schoeTagsSelected:boolean[]=[];

//   emerTagListArr:string[]=[];
//   emerTagsSelected:boolean[]=[];

//   bhbTagListArr:string[]=[];
//   bhbTagsSelected:boolean[]=[];

//   chtTagListArr:string[]=[];
//   chtTagsSelected:boolean[]=[];

//   driftTagListArr:string[]=[];
//   driftTagsSelected:boolean[]=[];

//   cheTagListArr:string[]=[];
//   cheTagsSelected:boolean[]=[];

//   chePSTagListArr:string[]=[];
//   chePSTagsSelected:boolean[]=[];

//   gbwTagListArr:string[]=[];
//   gbwTagsSelected:boolean[]=[];

//   cgkTagListArr:string[]=[];
//   cgkTagsSelected:boolean[]=[];

//   stGeorgeTagListArr:string[]=[]
//   stGeorgeTagsSelected:boolean[]=[];

//   bergenTagListArr:string[]=[]
//   bergenTagsSelected:boolean[]=[];

//   wolwasTagListArr:string[]=[]
//   wolwasTagsSelected:boolean[]=[];

//   umiTagListArr:string[]=[]
//   umiTagsSelected:boolean[]=[];

//   kroonTagListArr:string[]=[]
//   kroonTagsSelected:boolean[]=[];

//   tinroofTagListArr:string[]=[]
//   tinroofTagsSelected:boolean[]=[];

//   damcampTagListArr:string[]=[]
//   damcampTagsSelected:boolean[]=[];

//   holdingTagListArr:string[]=[]
//   holdingTagsSelected:boolean[]=[];

//   cgkIDZTagListArr:string[]=[];
//   cgkIDZTagsSelected:boolean[]=[];

//   cgTagListArr:string[]=[];
//   cgTagsSelected:boolean[]=[];

//   fmtTagListArr:string[]=[];
//   fmtTagsSelected:boolean[]=[];

//   gamtoosTagListArr:string[]=[];
//   gamtoosTagsSelected:boolean[]=[];

//   grTagListArr:string[]=[];
//   grTagsSelected:boolean[]=[];

//   gbTagListArr:string[]=[];
//   gbTagsSelected:boolean[]=[];

//   hbTagListArr:string[]=[];
//   hbTagsSelected:boolean[]=[];

//   lhTagListArr:string[]=[];
//   lhTagsSelected:boolean[]=[];

//   mwTagListArr:string[]=[];
//   mwTagsSelected:boolean[]=[];

//   mwrTagListArr:string[]=[]
//   mwrTagsSelected:boolean[]=[]

//   npTagListArr:string[]=[];
//   npTagsSelected:boolean[]=[];

//   effTagListArr:string[]=[];
//   effTagsSelected:boolean[]=[];

//   ngtTagListArr:string[]=[];
//   ngtTagsSelected:boolean[]=[];

//   rdTagListArr:string[]=[];
//   rdTagsSelected:boolean[]=[];

//   stanTagListArr:string[]=[];
//   stanTagsSelected:boolean[]=[];

//   maliTagListArr:string[]=[];
//   maliTagsSelected:boolean[]=[];

//   smTagListArr:string[]=[];
//   smTagsSelected:boolean[]=[];

//   thTagListArr:string[]=[];
//   thTagsSelected:boolean[]=[];

//   uitTagListArr:string[]=[];
//   uitTagsSelected:boolean[]=[];

//   vrhTagListArr:string[]=[];
//   vrhTagsSelected:boolean[]=[];

//   vsTagListArr:string[]=[];
//   vsTagsSelected:boolean[]=[];

//   bethTagListArr:string[]=[]
//   bethTagSelected:boolean[]=[]

//   hup1TagListArr:string[]=[]
//   hup1TagSelected:boolean[]=[]

//   hup2TagListArr:string[]=[]
//   hup2TagSelected:boolean[]=[]

//   hup3TagListArr:string[]=[]
//   hup3TagSelected:boolean[]=[]

//   hup4TagListArr:string[]=[]
//   hup4TagSelected:boolean[]=[]

//   hup6TagListArr:string[]=[]
//   hup6TagSelected:boolean[]=[]

//   stormsTagListArr:string[]=[]
//   stormsTagSelected:boolean[]=[]

//   karkTagListArr:string[]=[];
//   karkTagSelected:boolean[]=[];

//   humGroundListArr:string[]=[]
//   humGroundSelected:boolean[]=[]

//   humOffTakeTagListArr:string[]=[]
//   humOffTakeSelected:boolean[]=[]

//   jeffBayOffTakeTagListArr:string[]=[]
//   jeffBayOffTakeSelected:boolean[]=[]

//   kougaMainLineTagListArr:string[]=[]
//   kougaMainLineSelected:boolean[]=[]

//   onsParadysTagListArr:string[]=[]
//   onsParadysSelected:boolean[]=[]

//   paraStFrancTagListArr:string[]=[]
//   paraStFrancSelected:boolean[]=[]

//   stormsWTWTagListArr:string[]=[]
//   stormsWTWTagSelected:boolean[]=[]

//   oliTagListArr:string[]=[]
//   oliTagSelected:boolean[]=[]

//   bushyTagListArr:string[]=[]
//   bushyTagSelected:boolean[]=[]

// selectedTags:string[]=[]
// rightSelectedTags:string[]

//   elandTagListArr:string[]=[]
//   elandTagSelected:boolean[]=[]


//   constructor(){
//   const selections = [
//     {tagListArr: this.stGeorgeTagListArr, tagsSelected:this.stGeorgeTagsSelected,location: "St Georges " },
//     {tagListArr: this.emerTagListArr, tagsSelected:this.emerTagsSelected,location: "Emerald Hill " },
//     {tagListArr: this.bhbTagListArr, tagsSelected:this.bhbTagsSelected,location: "Blue Horizon Bay " },
//     {tagListArr: this.chtTagListArr, tagsSelected:this.}



//     { tagListArr: this.cgkIDZTagListArr, tagsSelected: this.cgkIDZTagsSelected, location: "Coega " },
//     { tagListArr: this.fmtTagListArr, tagsSelected: this.fmtTagsSelected, location: "FM Tower " },
//     { tagListArr: this.gamtoosTagListArr, tagsSelected: this.gamtoosTagsSelected, location: "Gamtoos Bridge " },
//     { tagListArr: this.uitTagListArr, tagsSelected: this.uitTagsSelected, location: "Uitenhage Flow Chamber " },
//     { tagListArr: this.bethTagListArr, tagsSelected: this.bethTagSelected, location: "Bethelsdorp " },
//     { tagListArr: this.humGroundListArr, tagsSelected: this.humGroundSelected, location: "Humerail " },
//     { tagListArr: this.humOffTakeTagListArr, tagsSelected: this.humOffTakeSelected, location: "Humansdorp " },
//     { tagListArr: this.jeffBayOffTakeTagListArr, tagsSelected: this.jeffBayOffTakeSelected, location: "Jeffreys Bay " },
//     { tagListArr: this.kougaMainLineTagListArr, tagsSelected: this.kougaMainLineSelected, location: "Kouga Main Line " },
//     { tagListArr: this.onsParadysTagListArr, tagsSelected: this.onsParadysSelected, location: "Ons Paradys " },
//     { tagListArr: this.npTagListArr, tagsSelected: this.npTagsSelected, location: "Newton Park Pool " },
//     { tagListArr: this.hup1TagListArr, tagsSelected: this.hup1TagSelected, location: "Humansdorp 1 " },
//     { tagListArr: this.hup2TagListArr, tagsSelected: this.hup2TagSelected, location: "Humansdorp 2C " },
//     { tagListArr: this.hup3TagListArr, tagsSelected: this.hup3TagSelected, location: "Humansdorp 3 " },
//     { tagListArr: this.hup4TagListArr, tagsSelected: this.hup4TagSelected, location: "Humansdorp 4 " },
//     { tagListArr: this.hup6TagListArr, tagsSelected: this.hup6TagSelected, location: "Humansdorp 6 " },
//     { tagListArr: this.ngtTagListArr, tagsSelected: this.ngtTagsSelected, location: "Nooitgedacht " },
//     { tagListArr: this.stormsWTWTagListArr, tagsSelected: this.stormsWTWTagSelected, location: "Storms River " },
//     { tagListArr: this.elandTagListArr, tagsSelected: this.elandTagSelected, location: "Elandsjagt " }
//   ];
// }





// }










// TrendInfoTable(sitesChosen:any[]){
//   var maxValues=[]
//   var minValues=[]
//   var avgValues=[]
//   this.dataSource=[];
//   this.dataSource = new MatTableDataSource();
//   this.ELEMENT_DATA=[];
//   for (var m = 0; m < this.SitesList.length; m++) {
//     switch (sitesChosen[m]) {
//       // Reservoirs

//       case "Malabar Reservoir Level":
//         if(this.variable.mala_lvl_arr.length == 0){break;}
//         else{
//           var arr = this.MinMaxAvg(m,this.variable.mala_lvl_arr,sitesChosen[m],"Malabar Reservoir Level")!
//           minValues[m]= arr[0]
//           maxValues[m]=arr[1]
//           avgValues[m]=arr[2]
//              }

//                  break;


//       case "Greenbushes Flow Rate":
//         if (this.variable.GBFRarray.length==0){break;}
//           else{
//    var arr = this.MinMaxAvg(m,this.variable.GBFRarray,sitesChosen[m],"Greenbushes Flow Rate")!
//    minValues[m]= arr[0]
//    maxValues[m]=arr[1]
//    avgValues[m]=arr[2]
//       }

//           break;
//           case "Greenbushes Reservoir Level":
//             if (this.variable.GBarray.length==0){break;}
//               else{
//        var arr = this.MinMaxAvg(m,this.variable.GBarray,sitesChosen[m],"Greenbushes Reservoir Level")!
//        minValues[m]= arr[0]
//        maxValues[m]=arr[1]
//        avgValues[m]=arr[2]
//           }

//               break;

//               case   "Kareedouw K1 Total Flow":
//                 if (this.variable.KARK_K1_TF_arr.length==0){break;}
//                   else{
//            var arr = this.MinMaxAvg(m,this.variable.KARK_K1_TF_arr,sitesChosen[m],  "Kareedouw K1 Total Flow")!
//            minValues[m]= arr[0]
//            maxValues[m]=arr[1]
//            avgValues[m]=arr[2]
//               }
//                   break;


//                   case    "Kareedouw K1 Flow Rate":
//                     if (this.variable.KARK_K1_FR_arr.length==0){break;}
//                       else{
//                var arr = this.MinMaxAvg(m,this.variable.KARK_K1_FR_arr,sitesChosen[m],  "Kareedouw K1 Flow Rate")!
//                minValues[m]= arr[0]
//                maxValues[m]=arr[1]
//                avgValues[m]=arr[2]
//                   }

//                       break;
//                       case    "Kareedouw K1 Current":
//                         if (this.variable.KARK_K1_CUR_arr.length==0){break;}
//                           else{
//                    var arr = this.MinMaxAvg(m,this.variable.KARK_K1_CUR_arr,sitesChosen[m], "Kareedouw K1 Current")!
//                    minValues[m]= arr[0]
//                    maxValues[m]=arr[1]
//                    avgValues[m]=arr[2]
//                       }
//                           break;


//                           case   "Kareedouw K1 Level":
//                             if (this.variable.KARK_K1_LVL_arr.length==0){break;}
//                               else{
//                        var arr = this.MinMaxAvg(m,this.variable.KARK_K1_LVL_arr,sitesChosen[m],   "Kareedouw K1 Level")!
//                        minValues[m]= arr[0]
//                        maxValues[m]=arr[1]
//                        avgValues[m]=arr[2]
//                           }

//                               break;

//               case   "Kareedouw K2 Total Flow":
//                 if (this.variable.KARK_K2_TF_arr.length==0){break;}
//                   else{
//            var arr = this.MinMaxAvg(m,this.variable.KARK_K2_TF_arr,sitesChosen[m],  "Kareedouw K2 Total Flow")!
//            minValues[m]= arr[0]
//            maxValues[m]=arr[1]
//            avgValues[m]=arr[2]
//               }
//                   break;


//                   case    "Kareedouw K2 Flow Rate":
//                     if (this.variable.KARK_K2_FR_arr.length==0){break;}
//                       else{

//                var arr = this.MinMaxAvg(m,this.variable.KARK_K2_FR_arr,sitesChosen[m],  "Kareedouw K2 Flow Rate")!
//                minValues[m]= arr[0]
//                maxValues[m]=arr[1]
//                avgValues[m]=arr[2]
//                   }

//                       break;
//                       case    "Kareedouw K2 Current":
//                         if (this.variable.KARK_K2_CUR_arr.length==0){break;}
//                           else{
//                    var arr = this.MinMaxAvg(m,this.variable.KARK_K2_CUR_arr,sitesChosen[m], "Kareedouw K2 Current")!
//                    minValues[m]= arr[0]
//                    maxValues[m]=arr[1]
//                    avgValues[m]=arr[2]
//                       }
//                           break;


//                           case   "Kareedouw K2 Level":
//                             if (this.variable.KARK_K2_LVL_arr.length==0){break;}
//                               else{
//                        var arr = this.MinMaxAvg(m,this.variable.KARK_K2_LVL_arr,sitesChosen[m],   "Kareedouw K2 Level")!
//                        minValues[m]= arr[0]
//                        maxValues[m]=arr[1]
//                        avgValues[m]=arr[2]
//                                           }

//                                               break;




//                case   "Bushy Park Soccoman Flow Rate":
//                  if (this.variable.BUSH_CHURCH_SOCO_FR_arr.length==0){break;}
//                    else{
//             var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_SOCO_FR_arr,sitesChosen[m],"Bushy Park Soccoman Flow Rate")!
//             minValues[m]= arr[0]
//             maxValues[m]=arr[1]
//             avgValues[m]=arr[2]
//                                }
//                                break;

//             case "Bushy Park Steel Flow Rate":
//              if (this.variable.BUSH_CHURCH_STEEL_FR_arr.length==0){break;}
//                else{
//         var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_STEEL_FR_arr,sitesChosen[m],"Bushy Park Steel Flow Rate")!
//         minValues[m]= arr[0]
//         maxValues[m]=arr[1]
//         avgValues[m]=arr[2]
//                            }
//                       break;
//           case "Bushy Park Soccoman Pressure":
//            if (this.variable.BUSH_CHURCH_SOCCO_BAR_arr.length==0){break;}
//              else{
//       var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_SOCCO_BAR_arr,sitesChosen[m],"Bushy Park Soccoman Pressure")!
//       minValues[m]= arr[0]
//       maxValues[m]=arr[1]
//       avgValues[m]=arr[2]
//                          }
//                     break;

//            case "Bushy Park Steel Pressure":
//             if (this.variable.BUSH_CHURCH_STEEL_BAR_arr.length==0){break;}
//               else{
//        var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_STEEL_BAR_arr,sitesChosen[m],"Bushy Park Steel Pressure")!
//        minValues[m]= arr[0]
//        maxValues[m]=arr[1]
//        avgValues[m]=arr[2]
//                           }
//                      break;

//            case "Bushy Park Pumpstation Flow Rate":
//             if (this.variable.BUSH_PUMP_FR_arr.length==0){break;}
//               else{
//        var arr = this.MinMaxAvg(m,this.variable.BUSH_PUMP_FR_arr,sitesChosen[m],"Bushy Park Pumpstation Flow Rate")!
//        minValues[m]= arr[0]
//        maxValues[m]=arr[1]
//        avgValues[m]=arr[2]
//                           }
//                      break;


//            case "Bushy Park Combined Borehole Flow Rate":
//             if (this.variable.BUSH_GW_COMB_FLOW_RATE_arr.length==0){break;}
//               else{
//        var arr = this.MinMaxAvg(m,this.variable.BUSH_GW_COMB_FLOW_RATE_arr,sitesChosen[m],"Bushy Park Combined Borehole Flow Rate")!
//        minValues[m]= arr[0]
//        maxValues[m]=arr[1]
//        avgValues[m]=arr[2]
//                           }
//                      break;


//            case "Bushy Park Holding Tank Level":
//             if (this.variable.BUSH_TANK_LVL_arr.length==0){break;}
//               else{
//        var arr = this.MinMaxAvg(m,this.variable.BUSH_TANK_LVL_arr,sitesChosen[m],"Bushy Park Holding Tank Level")!
//        minValues[m]= arr[0]
//        maxValues[m]=arr[1]
//        avgValues[m]=arr[2]
//                           }
//                      break;




//               case "Grassridge Inlet Flow":
//                 if (this.variable.GR_R_INLET_Arr.length==0){
//                   break;
//                 }
//                   else{
//                     var arr = this.MinMaxAvg(m,this.variable.GR_R_INLET_Arr,sitesChosen[m],"Grassridge Inlet Flow")
//                     minValues[m]= arr[0]
//                     maxValues[m]=arr[1]
//                      avgValues[m]=arr[2]

//                    }
//                    break;
//               case "Grassridge Outlet Flow":
//                 if (this.variable.GR_R_OUTLET_Arr.length==0){
//                   break;
//                 }
//                   else{
//                     var arr = this.MinMaxAvg(m,this.variable.GR_R_OUTLET_Arr,sitesChosen[m],"Grassridge Outlet Flow")
//                     minValues[m]= arr[0]
//                     maxValues[m]=arr[1]
//                      avgValues[m]=arr[2]

//                    }
//                    break;


//                    case "Humerail Borehol Level":
//                     if (this.variable.HUM_GW_BOR_LVL_arr.length==0){
//                       break;
//                     }
//                       else{
//                         var arr = this.MinMaxAvg(m,this.variable.HUM_GW_BOR_LVL_arr,sitesChosen[m],"Humerail Borehol Level")
//                         minValues[m]= arr[0]
//                         maxValues[m]=arr[1]
//                          avgValues[m]=arr[2]

//                        }
//                        break;

//                        case "Humerail Raw Water Tank Level":
//                         if (this.variable.HUM_GW_RAW_WATER_TANK_LVL_arr.length==0){
//                           break;
//                         }
//                           else{
//                             var arr = this.MinMaxAvg(m,this.variable.HUM_GW_RAW_WATER_TANK_LVL_arr,sitesChosen[m],"Humerail Raw Water Tank Level")
//                             minValues[m]= arr[0]
//                             maxValues[m]=arr[1]
//                              avgValues[m]=arr[2]

//                            }
//                            break;


//                            case "Humerail Final Water Tank Level":
//                             if (this.variable.HUM_GW_FIN_WAT_TANK_LVL_arr.length==0){
//                               break;
//                             }
//                               else{
//                                 var arr = this.MinMaxAvg(m,this.variable.HUM_GW_FIN_WAT_TANK_LVL_arr,sitesChosen[m],"Humerail Final Water Tank Level")
//                                 minValues[m]= arr[0]
//                                 maxValues[m]=arr[1]
//                                  avgValues[m]=arr[2]

//                                }
//                                break;


//           case "Chelsea Reservoir West Chamber Level":
//             if (this.variable.CHE_West_array.length==0){
//               break;
//             }
//               else{
//                 var arr = this.MinMaxAvg(m,this.variable.CHE_West_array,sitesChosen[m],"Chelsea Reservoir West Chamber Level")!
//                 minValues[m]= arr[0]
//                 maxValues[m]=arr[1]
//                 avgValues[m]=arr[2]
//       }
//             break;


//           case "Chelsea Reservoir East Chamber Level":
//             if (this.variable.CHE_East_array.length==0){
//               break;
//             }
//               else{
//                 var arr = this.MinMaxAvg(m,this.variable.CHE_East_array,sitesChosen[m],"Chelsea Reservoir East Chamber Level")!
//                 minValues[m]= arr[0]
//                 maxValues[m]=arr[1]
//                 avgValues[m]=arr[2]
//       }
//             break;
//             case "Chatty Flow Rate":
//               if (this.variable.CHE_FlowRate_array.length==0){
//                 break;
//               }
//                 else{
//                   var arr = this.MinMaxAvg(m,this.variable.CHE_FlowRate_array,sitesChosen[m],"Chatty Flow Rate")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//       }
//               break;
//             case "Grassridge East Chamber Level":
//               if (this.variable.GR_EC_array.length==0){
//                 break;
//               }
//                 else{
//                   var arr = this.MinMaxAvg(m,this.variable.GR_EC_array,sitesChosen[m],"Grassridge East Chamber Level")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//       }
//               break;

//               case "Coega Kop to Coega IDZ Flow Rate":
//                 if(this.variable.CGK_COEGA_FLOW_RATE_array.length==0){
//                   break;
//                 }else{
//                   var arr = this.MinMaxAvg(m,this.variable.CGK_COEGA_FLOW_RATE_array,sitesChosen[m],"Coega Kop to Coega IDZ Flow Rate")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//                 }
//                 break;

//                 case "Coega Kop Reservoir Pressure":
//                 if(this.variable.CGK_PRESSURE_array.length==0) {
//                   break;
//                 }
//                 else{
//                   var arr = this.MinMaxAvg(m,this.variable.CGK_PRESSURE_array,sitesChosen[m],"Coega Kop Reservoir Pressure")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//                 }
//                 break;

//                 case "Gamtoos Break Water Pressure":
//                   if(this.variable.GBW_ACT_BAR_arr.length==0) {
//                     break;
//                   }
//                   else{
//                     var arr = this.MinMaxAvg(m,this.variable.GBW_ACT_BAR_arr,sitesChosen[m],"Gamtoos Break Water Pressure")!
//                     minValues[m]= arr[0]
//                     maxValues[m]=arr[1]
//                     avgValues[m]=arr[2]
//                   }
//                   break;

//                   case "Gamtoos Break Water Flow Rate":
//                     if(this.variable.GBW_FLO_RAT_arr.length==0) {
//                       break;
//                     }
//                     else{
//                       var arr = this.MinMaxAvg(m,this.variable.GBW_FLO_RAT_arr,sitesChosen[m],"Gamtoos Break Water Flow Rate")!
//                       minValues[m]= arr[0]
//                       maxValues[m]=arr[1]
//                       avgValues[m]=arr[2]
//                     }
//                     break;



//                 case "Olifantskop Reservoir Level":
//                   if(this.variable.OLI_LVL_array.length==0) {
//                     break;
//                   }
//                   else{
//                     var arr = this.MinMaxAvg(m,this.variable.OLI_LVL_array,sitesChosen[m],"Olifantskop Reservoir Level")!
//                     minValues[m]= arr[0]
//                     maxValues[m]=arr[1]
//                     avgValues[m]=arr[2]
//                   }
//                   break;


//                   case "Bergendal Reservoir Level":
//                     if(this.variable.BERGEN_RES_R_LVL_arr.length==0) {
//                       break;
//                     }
//                     else{
//                       var arr = this.MinMaxAvg(m,this.variable.BERGEN_RES_R_LVL_arr,sitesChosen[m],"Bergendal Reservoir Level")!
//                       minValues[m]= arr[0]
//                       maxValues[m]=arr[1]
//                       avgValues[m]=arr[2]
//                     }
//                     break;

//                     case "Wolwas Reservoir Level":
//                       if(this.variable.WOLWAS_RES_R_LVL_arr.length==0) {
//                         break;
//                       }
//                       else{
//                         var arr = this.MinMaxAvg(m,this.variable.WOLWAS_RES_R_LVL_arr,sitesChosen[m],"Wolwas Reservoir Level")!
//                         minValues[m]= arr[0]
//                         maxValues[m]=arr[1]
//                         avgValues[m]=arr[2]
//                       }
//                       break;


//                       case "Umasizakhe Reservoir Level":
//                         if(this.variable.UMI_RES_R_LVL_arr.length==0) {
//                           break;
//                         }
//                         else{
//                           var arr = this.MinMaxAvg(m,this.variable.UMI_RES_R_LVL_arr,sitesChosen[m],"Umasizakhe Reservoir Level")!
//                           minValues[m]= arr[0]
//                           maxValues[m]=arr[1]
//                           avgValues[m]=arr[2]
//                         }
//                         break;

//                         case "Kroonvale Reservoir Level":
//                           if(this.variable.KROON_RES_R_LVL_arr.length==0) {
//                             break;
//                           }
//                           else{
//                             var arr = this.MinMaxAvg(m,this.variable.KROON_RES_R_LVL_arr,sitesChosen[m],"Kroonvale Reservoir Level")!
//                             minValues[m]= arr[0]
//                             maxValues[m]=arr[1]
//                             avgValues[m]=arr[2]
//                           }
//                           break;




//                           case "Holding Reservoir Level":
//                             if(this.variable.HOLDING_LVL_RES_LVL_arr.length==0) {
//                               break;
//                             }
//                             else{
//                               var arr = this.MinMaxAvg(m,this.variable.HOLDING_LVL_RES_LVL_arr,sitesChosen[m],"Holding Reservoir Level")!
//                               minValues[m]= arr[0]
//                               maxValues[m]=arr[1]
//                               avgValues[m]=arr[2]
//                             }
//                             break;

//                             case "Damcamp Reservoir Level":
//                               if(this.variable.DAMCAMP_LVL_RES_LVL_arr.length==0) {
//                                 break;
//                               }
//                               else{
//                                 var arr = this.MinMaxAvg(m,this.variable.DAMCAMP_LVL_RES_LVL_arr,sitesChosen[m],"Damcamp Reservoir Level")!
//                                 minValues[m]= arr[0]
//                                 maxValues[m]=arr[1]
//                                 avgValues[m]=arr[2]
//                               }
//                               break;


//                               case "Tin Roof Reservoir Level":
//                                 if(this.variable.TINROOF_LVL_RES_LVL_arr.length==0) {
//                                   break;
//                                 }
//                                 else{
//                                   var arr = this.MinMaxAvg(m,this.variable.TINROOF_LVL_RES_LVL_arr,sitesChosen[m],"Tin Roof Reservoir Level")!
//                                   minValues[m]= arr[0]
//                                   maxValues[m]=arr[1]
//                                   avgValues[m]=arr[2]
//                                 }
//                                 break;

//               case "Coega Kop Reservoir Level":
//                 if(this.variable.CGK_LEVEL_array.length==0) {
//                   break;
//                 }
//                 else{
//                   var arr = this.MinMaxAvg(m,this.variable.CGK_LEVEL_array,sitesChosen[m],"Coega Kop Reservoir Level")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//                 }
//                 break;

//                 case "Coega Kop to Coega IDZ Total Flow":
//                 if(this.variable.CGK_COEGA_TOTAL_FLOW_array.length==0)
//                 {break;}
//                 else{
//                   var arr = this.MinMaxAvg(m,this.variable.CGK_COEGA_TOTAL_FLOW_array,sitesChosen[m],"Coega Kop to Coega IDZ Total Flow")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//                 }
//                 break;


//                 case "Coega Kop to Motherwell Total Flow":
//                 if(this.variable.CGK_MOTHERWELL_TOTAL_FLOW_array.length==0)
//                 {break;}
//                 else{
//                   var arr = this.MinMaxAvg(m,this.variable.CGK_MOTHERWELL_TOTAL_FLOW_array,sitesChosen[m],"Coega Kop to Motherwell Total Flow")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//                 }
//                 break;

//                 case "Coega Kop from Grassridge Total Flow":
//                 if(this.variable.CGK_GRASSRIDGE_TOTAL_FLOW_array.length==0)
//                 {break;}
//                 else{
//                   var arr = this.MinMaxAvg(m,this.variable.CGK_GRASSRIDGE_TOTAL_FLOW_array,sitesChosen[m],"Coega Kop from Grassridge Total Flow")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//                 }
//                 break;

//               case "Coega Kop to Motherwell Flow Rate":
//                 if(this.variable.CGK_MOTHERWELL_FLOW_RATE_array.length==0) {
//                   break;
//                 } else{
//                   var arr = this.MinMaxAvg(m,this.variable.CGK_MOTHERWELL_FLOW_RATE_array,sitesChosen[m],"Coega Kop to Motherwell Flow Rate")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//                 }
//                 break;


//               case "Coega Kop from Grassridge Flow Rate":
//                 if(this.variable.CGK_GRASSRIDGE_FLOW_RATE_array.length==0) {
//                   break;
//                 } else{
//                   var arr = this.MinMaxAvg(m,this.variable.CGK_GRASSRIDGE_FLOW_RATE_array,sitesChosen[m],"Coega Kop from Grassridge Flow Rate")!
//                   minValues[m]= arr[0]
//                   maxValues[m]=arr[1]
//                   avgValues[m]=arr[2]
//                 }
//                 break;

//               case "Grassridge West Chamber Level":
//                 if (this.variable.GR_WC_array.length==0){
//                   break;
//                 }
//                   else{
//                     var arr = this.MinMaxAvg(m,this.variable.GR_WC_array,sitesChosen[m],"Grassridge West Chamber Level")!
//                     minValues[m]= arr[0]
//                     maxValues[m]=arr[1]
//                     avgValues[m]=arr[2]
//       }
//                 break;

//                 case "Van Stadens Reservoir Level":
//                   if (this.variable.VSarray.length==0){
//                     break;
//                   }
//                     else{
//                       var arr = this.MinMaxAvg(m,this.variable.VSarray,sitesChosen[m],"Van Stadens Reservoir Level")!
//                       minValues[m]= arr[0]
//                       maxValues[m]=arr[1]
//                       avgValues[m]=arr[2]
//       }
//                   break;

//                 case "Chatty North Chamber Level":
//                     if (this.variable.CHT_NC_array.length==0){
//                       break;
//                     }
//                       else{
//                         var arr = this.MinMaxAvg(m,this.variable.CHT_NC_array,sitesChosen[m],"Chatty North Chamber Level")!
//                         minValues[m]= arr[0]
//                         maxValues[m]=arr[1]
//                         avgValues[m]=arr[2]
//       }
//                   break;

//                   case "Chatty Overhead Level":
//                     if (this.variable.CHT_OR_array.length==0){
//                       break;
//                     }
//                       else{
//                         var arr = this.MinMaxAvg(m,this.variable.CHT_OR_array,sitesChosen[m],"Chatty Overhead Level")!
//                         minValues[m]= arr[0]
//                         maxValues[m]=arr[1]
//                         avgValues[m]=arr[2]
//                       }
//                     break;

//                     case "Chatty South Chamber Level":
//                     if (this.variable.CHT_SC_array.length==0){
//                       break;
//                     }
//                       else{
//                         var arr = this.MinMaxAvg(m,this.variable.CHT_SC_array,sitesChosen[m],"Chatty South Chamber Level")!
//                         minValues[m]= arr[0]
//                         maxValues[m]=arr[1]
//                         avgValues[m]=arr[2]
//                       }
//                       break;

//                       case "Van Riebeeck Hoogte Delivery Level":
//                         if (this.variable.VRH_DL_array.length==0){
//                           break;
//                         }
//                           else{
//                             var arr = this.MinMaxAvg(m,this.variable.VRH_DL_array,sitesChosen[m],"Van Riebeeck Hoogte Delivery Level")!
//                             minValues[m]= arr[0]
//                             maxValues[m]=arr[1]
//                             avgValues[m]=arr[2]
//                           }

//                         break;

//                         case "Van Riebeeck Hoogte Suction Level":
//                           if (this.variable.VRH_SL_array.length==0){
//                             break;
//                           }
//                             else{
//                               var arr = this.MinMaxAvg(m,this.variable.VRH_SL_array,sitesChosen[m],"Van Riebeeck Hoogte Suction Level")!
//                               minValues[m]= arr[0]
//                               maxValues[m]=arr[1]
//                               avgValues[m]=arr[2]
//                             }

//                           break;

//                           case "Lovemore Heights Reservoir Level":
//                             if (this.variable.LHarray.length==0){
//                               break;
//                             }
//                               else{
//                                 var arr = this.MinMaxAvg(m,this.variable.LHarray,sitesChosen[m],"Lovemore Heights Reservoir Level")!
//                                 minValues[m]= arr[0]
//                                 maxValues[m]=arr[1]
//                                 avgValues[m]=arr[2]
//                               }

//                             break;

//                             case "Blue Horizon Bay Reservoir Level":
//                               if (this.variable.BHB_array.length==0){
//                               break;
//                             }
//                               else{
//                                 var arr = this.MinMaxAvg(m,this.variable.BHB_array,sitesChosen[m],"Blue Horizon Bay Reservoir Level")!
//                                 minValues[m]= arr[0]
//                                 maxValues[m]=arr[1]
//                                 avgValues[m]=arr[2]
//       }
//                               break;

//                               case "Elandsjagt Flow Rate":
//                                 if (this.variable.ELA_FR_arr.length==0){
//                                 break;
//                               }
//                                 else{
//                                   var arr = this.MinMaxAvg(m,this.variable.ELA_FR_arr,sitesChosen[m],"Elandsjagt Flow Rate")!
//                                   minValues[m]= arr[0]
//                                   maxValues[m]=arr[1]
//                                   avgValues[m]=arr[2]
//         }
//                                 break;

//                                 case "Elandsjagt Pressure":
//                                   if (this.variable.ELA_P_arr.length==0){
//                                   break;
//                                 }
//                                   else{
//                                     var arr = this.MinMaxAvg(m,this.variable.ELA_P_arr,sitesChosen[m],"Elandsjagt Pressure")!
//                                     minValues[m]= arr[0]
//                                     maxValues[m]=arr[1]
//                                     avgValues[m]=arr[2]
//           }
//                                   break;


//                                 case "Schoemanshoek Pressure":
//                                   if (this.variable.NMB_SCHOE_PRESSURE_array.length==0){
//                                   break;
//                                 }
//                                   else{
//                                     var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_PRESSURE_array,sitesChosen[m],"Schoemanshoek Pressure")!
//                                     minValues[m]= arr[0]
//                                     maxValues[m]=arr[1]
//                                     avgValues[m]=arr[2]
//           }
//                                   break;

//                                   case "Schoemanshoek Level":
//                                     if (this.variable.NMB_SCHOE_RES_LEVEL_array.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_RES_LEVEL_array,sitesChosen[m],"Schoemanshoek Level")!
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                       avgValues[m]=arr[2]
//             }
//                                     break;


//                                     case "Schoemanshoek Actuator Position":
//                                       if (this.variable.NMB_SCHOE_ACTUATOR_POSITION_array.length==0){
//                                       break;
//                                     }
//                                       else{
//                                         var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_ACTUATOR_POSITION_array,sitesChosen[m],"Schoemanshoek Actuator Position")!
//                                         minValues[m]= arr[0]
//                                         maxValues[m]=arr[1]
//                                         avgValues[m]=arr[2]
//               }
//                                       break;

//                                       case "Schoemanshoek Actuator Set Point":
//                                         if (this.variable.NMB_SCHOE_ACTUATOR_SET_POINT_array.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_ACTUATOR_SET_POINT_array,sitesChosen[m],"Schoemanshoek Actuator Set Point")!
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                           avgValues[m]=arr[2]
//                 }
//                                         break;

//                                         case "Schoemanshoek Actuator Valve Feedback Signal":
//                                           if (this.variable.nmb_schoe_r_actuator_valve_feedback_signal_error_arr.length==0){
//                                           break;
//                                         }
//                                           else{
//                                             var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_feedback_signal_error_arr,sitesChosen[m],"Schoemanshoek Actuator Valve Feedback Signal")!
//                                             minValues[m]= arr[0]
//                                             maxValues[m]=arr[1]
//                                             avgValues[m]=arr[2]
//                   }
//                                           break;




//                                           case "Schoemanshoek Actuator Valve Command Signal":
//                                             if (this.variable.nmb_schoe_r_actuator_valve_command_signal_error_arr.length==0){
//                                             break;
//                                           }
//                                             else{
//                                               var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_command_signal_error_arr,sitesChosen[m],"Schoemanshoek Actuator Valve Command Signal")!
//                                               minValues[m]= arr[0]
//                                               maxValues[m]=arr[1]
//                                               avgValues[m]=arr[2]
//                     }
//                                             break;


//                                case "Schoemanshoek Reservoir Level Signal Error":
//                                  if (this.variable.nmb_schoe_r_reservoir_level_signal_error_arr.length==0){
//                                  break;
//                                }
//                                  else{
//                                    var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_reservoir_level_signal_error_arr,sitesChosen[m],"Schoemanshoek Reservoir Level Signal Error")!
//                                    minValues[m]= arr[0]
//                                    maxValues[m]=arr[1]
//                                    avgValues[m]=arr[2]
//                                 }
//                                  break;




//                                  case "Schoemanshoek Actuator Valve Fault":
//                                    if (this.variable.nmb_schoe_r_actuator_valve_fault_arr.length==0){
//                                    break;
//                                  }
//                                    else{
//                                      var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_fault_arr,sitesChosen[m],"Schoemanshoek Actuator Valve Fault")!
//                                      minValues[m]= arr[0]
//                                      maxValues[m]=arr[1]
//                                      avgValues[m]=arr[2]
//                                 }
//                                    break;




//                                    case "Schoemanshoek Actuator Valve Torque Fail Close":
//                                     if (this.variable.nmb_schoe_r_actuator_valve_torque_fail_close_arr.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_torque_fail_close_arr,sitesChosen[m],"Schoemanshoek Actuator Valve Torque Fail Close")!
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                       avgValues[m]=arr[2]
//                                    }
//                                     break;




//                                     case "Schoemanshoek Actuator Valve Torque Fail Open":
//                                       if (this.variable.nmb_schoe_r_actuator_valve_torque_fail_open_arr.length==0){
//                                       break;
//                                     }
//                                       else{
//                                         var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_torque_fail_open_arr,sitesChosen[m],"Schoemanshoek Actuator Valve Torque Fail Open")!
//                                         minValues[m]= arr[0]
//                                         maxValues[m]=arr[1]
//                                         avgValues[m]=arr[2]
//                                    }
//                                       break;



//                                       case "Schoemanshoek General Fault":
//                                         if (this.variable.nmb_schoe_r_general_fault_arr.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_general_fault_arr,sitesChosen[m],"Schoemanshoek General Fault")!
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                           avgValues[m]=arr[2]
//                                        }
//                                         break;


//                                         case "St Georges Borehole Flow Rate":
//                                           if (this.variable.st_georges_wtw_gw_FR_arr.length==0){
//                                           break;
//                                         }
//                                           else{
//                                             var arr = this.MinMaxAvg(m,this.variable.st_georges_wtw_gw_FR_arr,sitesChosen[m],"St Georges Borehole Flow Rate")!
//                                             minValues[m]= arr[0]
//                                             maxValues[m]=arr[1]
//                                             avgValues[m]=arr[2]
//                                        }
//                                           break;


//                                           case "St Georges Borehole Total Flow":
//                                             if (this.variable.st_georges_wtw_gw_TF_arr.length==0){
//                                             break;
//                                           }
//                                             else{
//                                               var arr = this.MinMaxAvg(m,this.variable.st_georges_wtw_gw_TF_arr,sitesChosen[m],"St Georges Borehole Total Flow")!
//                                               minValues[m]= arr[0]
//                                               maxValues[m]=arr[1]
//                                               avgValues[m]=arr[2]
//                                          }
//                                             break;


//                                             case "St Georges Emerald Hill Flow Rate":
//                                               if (this.variable.st_georges_wtw_emer_hill_FR_arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.st_georges_wtw_emer_hill_FR_arr,sitesChosen[m],"St Georges Emerald Hill Flow Rate")!
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                            }
//                                               break;


//                                               case "St Georges Emerald Hill Total Flow":
//                                                 if (this.variable.st_georges_wtw_emer_hill_TF_arr.length==0){
//                                                 break;
//                                               }
//                                                 else{
//                                                   var arr = this.MinMaxAvg(m,this.variable.st_georges_wtw_emer_hill_TF_arr,sitesChosen[m],"St Georges Emerald Hill Total Flow")!
//                                                   minValues[m]= arr[0]
//                                                   maxValues[m]=arr[1]
//                                                   avgValues[m]=arr[2]
//                                              }
//                                                 break;


//                                         case "Schoemanshoek Actuator General Fault":
//                                           if (this.variable.nmb_schoe_r_actuator_general_fault_arr.length==0){
//                                           break;
//                                         }
//                                           else{
//                                             var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_general_fault_arr,sitesChosen[m],"Schoemanshoek Actuator General Fault")!
//                                             minValues[m]= arr[0]
//                                             maxValues[m]=arr[1]
//                                             avgValues[m]=arr[2]
//                                        }
//                                           break;



//                                           case "Schoemanshoek Actuator Valve Timeout":
//                                           if (this.variable.nmb_schoe_r_actuator_valve_timeout_arr.length==0){
//                                           break;
//                                         }
//                                           else{
//                                             var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_timeout_arr,sitesChosen[m],"Schoemanshoek Actuator Valve Timeout")!
//                                             minValues[m]= arr[0]
//                                             maxValues[m]=arr[1]
//                                             avgValues[m]=arr[2]
//                                        }
//                                           break;

//                                   case "Driftsands Reservoir Level":
//                                     if (this.variable.drift_R_reservoir_level_arr.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.drift_R_reservoir_level_arr,sitesChosen[m],"Driftsands Reservoir Level")!
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                       avgValues[m]=arr[2]
//                                     }
//                                     break;

//                                  case "Driftsands Flow Rate 1":
//                                     if (this.variable.drift_R_flow_rate_1_arr.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.drift_R_flow_rate_1_arr,sitesChosen[m],"Driftsands Flow Rate 1")!
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                       avgValues[m]=arr[2]
//                                    }
//                                     break;


//                                  case "Driftsands Flow Rate 2":
//                                     if (this.variable.drift_R_flow_rate_2_arr.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.drift_R_flow_rate_2_arr,sitesChosen[m],"Driftsands Flow Rate 2")!
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                       avgValues[m]=arr[2]
//                                    }
//                                     break;

//                                     case "Driftsands Total Flow 1":
//                                       if (this.variable.drift_R_total_flow_1_arr.length==0){
//                                       break;
//                                     }
//                                       else{
//                                         var arr = this.MinMaxAvg(m,this.variable.drift_R_total_flow_1_arr,sitesChosen[m],"Driftsands Total Flow 1")!
//                                         minValues[m]= arr[0]
//                                         maxValues[m]=arr[1]
//                                         avgValues[m]=arr[2]
//                                      }
//                                       break;


//                                    case "Driftsands Total Flow 2":
//                                       if (this.variable.drift_R_total_flow_2_arr.length==0){
//                                       break;
//                                     }
//                                       else{
//                                         var arr = this.MinMaxAvg(m,this.variable.drift_R_total_flow_2_arr,sitesChosen[m],"Driftsands Total Flow 2")!
//                                         minValues[m]= arr[0]
//                                         maxValues[m]=arr[1]
//                                         avgValues[m]=arr[2]
//                                      }
//                                       break;



//                                   case "Emerald Hill Reservoir Level":
//                                     if (this.variable.EMER_H_Level_arr.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.EMER_H_Level_arr,sitesChosen[m],"Emerald Hill Reservoir Level")!
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                       avgValues[m]=arr[2]
//                                     }
//                                     break;

//                                     case "Emerald Hill Flow Rate":
//                                       if (this.variable.EMER_H_Flow_Rate_arr.length==0){
//                                       break;
//                                     }
//                                       else{
//                                         var arr = this.MinMaxAvg(m,this.variable.EMER_H_Flow_Rate_arr,sitesChosen[m],"Emerald Hill Flow Rate")!
//                                         minValues[m]= arr[0]
//                                         maxValues[m]=arr[1]
//                                         avgValues[m]=arr[2]
//               }
//                                       break;

//                                       case "Emerald Hill Total Flow":
//                                         if (this.variable.EMER_H_Total_Flow_arr.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.EMER_H_Total_Flow_arr,sitesChosen[m],"Emerald Hill Total Flow")!
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                           avgValues[m]=arr[2]
//                 }
//                    break;



//                   case "Humansdorp Off Take Total Flow":
//                     if (this.variable.HUM_OFF_TAKE_TF_arr.length==0){
//                     break;
//                   }
//                     else{
//                       var arr = this.MinMaxAvg(m,this.variable.HUM_OFF_TAKE_TF_arr,sitesChosen[m],"Humansdorp Off Take Total Flow")!
//                       minValues[m]= arr[0]
//                       maxValues[m]=arr[1]
//                       avgValues[m]=arr[2]
//                                 }
//                      break;

//                      case "Humansdorp Off Take Pressure":
//                     if (this.variable.HUM_OFF_TAKE_BAR_arr.length==0){
//                     break;
//                   }
//                     else{
//                       var arr = this.MinMaxAvg(m,this.variable.HUM_OFF_TAKE_BAR_arr,sitesChosen[m],"Humansdorp Off Take Pressure")!
//                       minValues[m]= arr[0]
//                       maxValues[m]=arr[1]
//                       avgValues[m]=arr[2]
//                                 }
//                      break;

//                      case "Humansdorp Off Take Battery Level":
//                       if (this.variable.HUM_OFF_TAKE_BAT_arr.length==0){
//                       break;
//                     }
//                       else{
//                         var arr = this.MinMaxAvg(m,this.variable.HUM_OFF_TAKE_BAT_arr,sitesChosen[m],"Humansdorp Off Take Battery Level")!
//                         minValues[m]= arr[0]
//                         maxValues[m]=arr[1]
//                         avgValues[m]=arr[2]
//                                   }
//                        break;

//                      case "Jeffreys Bay Off Take Total Flow":
//                       if (this.variable.JEFF_OFF_TAKE_TF_arr.length==0){
//                       break;
//                     }
//                       else{
//                         var arr = this.MinMaxAvg(m,this.variable.JEFF_OFF_TAKE_TF_arr,sitesChosen[m],"Jeffreys Bay Off Take Total Flow")!
//                         minValues[m]= arr[0]
//                         maxValues[m]=arr[1]
//                         avgValues[m]=arr[2]
//                                   }
//                        break;

//                        case "Jeffreys Bay Off Take Battery Level":
//                         if (this.variable.JEFF_OFF_TAKE_BAT_arr.length==0){
//                         break;
//                       }
//                         else{
//                           var arr = this.MinMaxAvg(m,this.variable.JEFF_OFF_TAKE_BAT_arr,sitesChosen[m],"Jeffreys Bay Off Take Battery Level")!
//                           minValues[m]= arr[0]
//                           maxValues[m]=arr[1]
//                           avgValues[m]=arr[2]
//                                     }
//                          break;

//                        case "Kouga Main Line Pressure":
//                       if (this.variable.KOU_MAIN_LINE_BAR_arr.length==0){
//                       break;
//                     }
//                       else{
//                         var arr = this.MinMaxAvg(m,this.variable.KOU_MAIN_LINE_BAR_arr,sitesChosen[m],"Kouga Main Line Pressure")!
//                         minValues[m]= arr[0]
//                         maxValues[m]=arr[1]
//                         avgValues[m]=arr[2]
//                                   }
//                        break;


//                        case "Kouga Main Line Battery Level":
//                         if (this.variable.KOU_MAIN_LINE_BAT_arr.length==0){
//                         break;
//                       }
//                         else{
//                           var arr = this.MinMaxAvg(m,this.variable.KOU_MAIN_LINE_BAT_arr,sitesChosen[m],"Kouga Main Line Battery Level")!
//                           minValues[m]= arr[0]
//                           maxValues[m]=arr[1]
//                           avgValues[m]=arr[2]
//                                     }
//                          break;

//                        case "Ons Paradys Total Flow":
//                       if (this.variable.ONS_PARA_TF_arr.length==0){
//                       break;
//                     }
//                       else{
//                         var arr = this.MinMaxAvg(m,this.variable.ONS_PARA_TF_arr,sitesChosen[m],"Ons Paradys Total Flow")!
//                         minValues[m]= arr[0]
//                         maxValues[m]=arr[1]
//                         avgValues[m]=arr[2]
//                                   }
//                        break;

//                        case "Ons Paradys Battery Level":
//                         if (this.variable.ONS_PARA_BAT_arr.length==0){
//                         break;
//                       }
//                         else{
//                           var arr = this.MinMaxAvg(m,this.variable.ONS_PARA_BAT_arr,sitesChosen[m],"Ons Paradys Battery Level")!
//                           minValues[m]= arr[0]
//                           maxValues[m]=arr[1]
//                           avgValues[m]=arr[2]
//                                     }
//                          break;


//                        case "St Francis Offtake Total Flow":
//                         if (this.variable.ST_FRAN_OFF_TF_arr.length==0){
//                         break;
//                       }
//                         else{
//                           var arr = this.MinMaxAvg(m,this.variable.ST_FRAN_OFF_TF_arr,sitesChosen[m],"St Francis Offtake Total Flow")!
//                           minValues[m]= arr[0]
//                           maxValues[m]=arr[1]
//                           avgValues[m]=arr[2]
//                                     }
//                          break;


//                          case "Paradise Beach Total Flow":
//                           if (this.variable.PARA_BEA_TF_arr.length==0){
//                           break;
//                         }
//                           else{
//                             var arr = this.MinMaxAvg(m,this.variable.PARA_BEA_TF_arr,sitesChosen[m],"Paradise Beach Total Flow")!
//                             minValues[m]= arr[0]
//                             maxValues[m]=arr[1]
//                             avgValues[m]=arr[2]
//                                       }
//                            break;

//                            case "Paradise/St Francis Battery Level":
//                             if (this.variable.ST_FRAN_PARA_BEA_BAT_arr.length==0){
//                             break;
//                           }
//                             else{
//                               var arr = this.MinMaxAvg(m,this.variable.ST_FRAN_PARA_BEA_BAT_arr,sitesChosen[m],"Paradise/St Francis Battery Level")!
//                               minValues[m]= arr[0]
//                               maxValues[m]=arr[1]
//                               avgValues[m]=arr[2]
//                                         }
//                              break;



//                               case "Rosedale Reservoir Level":
//                                 if (this.variable.RD_LVL_array.length==0){
//                                 break;
//                               }
//                                 else{
//                                   var arr = this.MinMaxAvg(m,this.variable.RD_LVL_array,sitesChosen[m],"Rosedale Reservoir Level")!
//                                   minValues[m]= arr[0]
//                                   maxValues[m]=arr[1]
//                                   avgValues[m]=arr[2]
//         }
//                                 break;

//                                 case "Summit Reservoir Level":
//                                   if (this.variable.SM_LVL_array.length==0){
//                                   break;
//                                 }
//                                   else{
//                                     var arr = this.MinMaxAvg(m,this.variable.SM_LVL_array,sitesChosen[m],"Summit Reservoir Level")!
//                                     minValues[m]= arr[0]
//                                     maxValues[m]=arr[1]
//                                     avgValues[m]=arr[2]
//           }
//                                   break;

//                                   case "Summit Flow Rate":
//                                 if (this.variable.SM_FR_array.length==0){
//                                 break;
//                               }
//                                 else{
//                                   var arr = this.MinMaxAvg(m,this.variable.SM_FR_array,sitesChosen[m],"Summit Flow Rate")!
//                                   minValues[m]= arr[0]
//                                   maxValues[m]=arr[1]
//                                   avgValues[m]=arr[2]
//         }
//                                 break;

//                               case "Theescombe Reservoir Level":
//                                 if (this.variable.TCarray.length==0){
//                                   break;
//                                 }
//                                   else{
//                                var arr = this.MinMaxAvg(m,this.variable.TCarray,sitesChosen[m],"Theescombe Reservoir Level")!
//                                minValues[m]= arr[0]
//                                maxValues[m]=arr[1]
//                                 avgValues[m]=arr[2]
//       }
//                                 break;

//                                 case "Heatherbank Reservoir Level":
//                                   if (this.variable.HBarray.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.HBarray,sitesChosen[m],"Heatherbank Reservoir Level")!
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                        avgValues[m]=arr[2]
//       }
//                                 break;
//                         // FPT Sites
//                                 case "Bethelsdorp Battery Level":
//                                   if (this.variable.BETH_BATTERY_STATUS_array.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.BETH_BATTERY_STATUS_array,sitesChosen[m],"Bethelsdorp Pressure")
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                        avgValues[m]=arr[2]

//                                      }
//                                      break;
//                                 case "Bethelsdorp Total Flow":
//                                   if (this.variable.BETH_TOTAL_FLOW_array.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.BETH_TOTAL_FLOW_array,sitesChosen[m],"Bethelsdorp Pressure")
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                        avgValues[m]=arr[2]

//                                      }
//                                      break;
//                                 case "Bethelsdorp Pressure":
//                                   if (this.variable.BETH_PRESS_array.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.BETH_PRESS_array,sitesChosen[m],"Bethelsdorp Pressure")
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                        avgValues[m]=arr[2]

//                                      }
//                                      break;
//                             case "Bethelsdorp Flow Rate":
//                                   if (this.variable.BETH_FLOW_RATE_array.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.BETH_FLOW_RATE_array,sitesChosen[m],"Bethelsdorp Flow Rate")
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                        avgValues[m]=arr[2]

//                                 }
//                                 break;



//                                 case "FM Tower Flow Rate":
//                                   if (this.variable.FMT_FR_array.length==0){
//                                     break;
//                                   }
//                                     else{
//                                       var arr = this.MinMaxAvg(m,this.variable.FMT_FR_array,sitesChosen[m],"FM Tower Flow Rate")
//                                       minValues[m]= arr[0]
//                                       maxValues[m]=arr[1]
//                                        avgValues[m]=arr[2]

//       }
//                                     break;


//                                     case "FM Tower Total Flow":
//                                       if (this.variable.FMT_TF_array.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.FMT_TF_array,sitesChosen[m],"FM Tower Total Flow")
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                            avgValues[m]=arr[2]

//           }
//                                         break;

//                                     case "FM Tower Pressure":
//                                       if (this.variable.FMT_PRESS_array.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.FMT_PRESS_array,sitesChosen[m],"FM Tower Pressure")
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                            avgValues[m]=arr[2]

//       }
//                                     break;

//                                     case "Coega IDZ Flow Rate":
//                                       if (this.variable.IDZ_FR_array.length==0){
//                                       break;
//                                     }
//                                       else{
//                                         var arr = this.MinMaxAvg(m,this.variable.IDZ_FR_array,sitesChosen[m],"Coega IDZ Flow Rate")!
//                                         minValues[m]= arr[0]
//                                         maxValues[m]=arr[1]
//                                         avgValues[m]=arr[2]
//               }
//                                       break;

//                                       case "Coega Motherwell Flow Rate":
//                                         if (this.variable.IDZ_MW_FR_array.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.IDZ_MW_FR_array,sitesChosen[m],"Coega Motherwell Flow Rate")!
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                           avgValues[m]=arr[2]
//                 }
//                                         break;

//                                         case "Gamtoos Bridge Steel Pipe Flow Rate":
//                                           if (this.variable.GT_BRG_STL_FR_array.length==0){
//                                           break;
//                                         }
//                                           else{
//                                             var arr = this.MinMaxAvg(m,this.variable.GT_BRG_STL_FR_array,sitesChosen[m],"Gamtoos Bridge Steel Pipe Flow Rate")!
//                                             minValues[m]= arr[0]
//                                             maxValues[m]=arr[1]
//                                             avgValues[m]=arr[2]
//                   }
//                                           break;

//                                           case "Gamtoos Bridge Socoman Pipe Flow Rate":
//                                             if (this.variable.GT_BRG_SOCO_FR_array.length==0){
//                                             break;
//                                           }
//                                             else{
//                                               var arr = this.MinMaxAvg(m,this.variable.GT_BRG_SOCO_FR_array,sitesChosen[m],"Gamtoos Bridge Socoman Pipe Flow Rate")!
//                                               minValues[m]= arr[0]
//                                               maxValues[m]=arr[1]
//                                               avgValues[m]=arr[2]
//                     }
//                                             break;

//                                             case "Gamtoos Bridge Steel Pipe Pressure":
//                                               if (this.variable.GT_BRG_STL_PRESS_array.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.GT_BRG_STL_PRESS_array,sitesChosen[m],"Gamtoos Bridge Steel Pipe Pressure")!
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                       }
//                                               break;

//                                               case "Gamtoos Bridge Socoman Pipe Pressure":
//                                                 if (this.variable.GT_BRG_SOCO_PRESS_array.length==0){
//                                                 break;
//                                               }
//                                                 else{
//                                                   var arr = this.MinMaxAvg(m,this.variable.GT_BRG_SOCO_PRESS_array,sitesChosen[m],"Gamtoos Bridge Socoman Pipe Pressure")!
//                                                   minValues[m]= arr[0]
//                                                   maxValues[m]=arr[1]
//                                                   avgValues[m]=arr[2]
//                         }
//                                                 break;

//                                             case "Uitenhage Flow Chamber Flow Rate":
//                                               if (this.variable.UIT_FC_FR_array.length==0){
//                                                 break;
//                                               }
//                                                 else{
//                                                   var arr = this.MinMaxAvg(m,this.variable.UIT_FC_FR_array,sitesChosen[m],"Uitenhage Flow Chamber Flow Rate")
//                                                   minValues[m]= arr[0]
//                                                   maxValues[m]=arr[1]
//                                                   avgValues[m]=arr[2]
//                                                     }
//                                               break;

//                                               case "Uitenhage Flow Chamber Pressure":
//                                                 if (this.variable.CG_CSP_Arr.length==0){
//                                                   break;
//                                                 }
//                                                   else{
//                                                     var arr = this.MinMaxAvg(m,this.variable.UIT_FC_PRESS_array,sitesChosen[m]," Uitenhage Flow Chamber Pressure")
//                                                     minValues[m]= arr[0]
//                                                     maxValues[m]=arr[1]
//                                                     avgValues[m]=arr[2]
//                                                       }
//                                                 break;

//                                     // Pump Stations
//                                     case "Storms River Holding Reservoir Level":
//                                       if (this.variable.STORMS_GORGE_LEVEL_Arr.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.STORMS_GORGE_LEVEL_Arr,sitesChosen[m],"Storms River Holding Reservoir Level")
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                           avgValues[m]=arr[2]
//       }
//                                       break;


//                                     case "Storms River Overhead Tank Level":
//                                       if (this.variable.STORMS_OVERHEAD_TANK_LEVEL_Arr.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.STORMS_OVERHEAD_TANK_LEVEL_Arr,sitesChosen[m],"Storms River Overhead Tank Level")
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                           avgValues[m]=arr[2]
//       }
//                                       break;


//                                     case "Storms River Quarry Level":
//                                       if (this.variable.STORMS_QUARRY_LEVEL_Arr.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.STORMS_QUARRY_LEVEL_Arr,sitesChosen[m],"Storms River Quarry Level")
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                           avgValues[m]=arr[2]
//       }
//                                       break;


//                                     case "Storms River Gorge Level":
//                                       if (this.variable.STORMS_GORGE_LEVEL_Arr.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.STORMS_GORGE_LEVEL_Arr,sitesChosen[m],"Storms River Gorge Level")
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                           avgValues[m]=arr[2]
//       }
//                                       break;


//                                     case "Crown Gardens Suction Pressure":
//                                       if (this.variable.CG_CSP_Arr.length==0){
//                                         break;
//                                       }
//                                         else{
//                                           var arr = this.MinMaxAvg(m,this.variable.CG_CSP_Arr,sitesChosen[m],"Crown Gardens Suction Pressure")
//                                           minValues[m]= arr[0]
//                                           maxValues[m]=arr[1]
//                                           avgValues[m]=arr[2]
//       }
//                                       break;

//                                       case "Crown Gardens Delivery Pressure":
//                                         if (this.variable.CG_CDP_Arr.length==0){
//                                           break;
//                                         }
//                                           else{
//                                             console.log(this.variable.CG_CDP_Arr)
//                                             var arr = this.MinMaxAvg(m,this.variable.CG_CDP_Arr,sitesChosen[m],"Crown Gardens Suction Pressure")
//                                             minValues[m]= arr[0]
//                                             maxValues[m]=arr[1]
//                                              avgValues[m]=arr[2]
//       }
//                                       break;

//                                       case "Crown Gardens Sump Level":
//                                         if (this.variable.CG_S_LVL_Arr.length==0){
//                                           break;
//                                         }
//                                           else{
//                                             var arr = this.MinMaxAvg(m,this.variable.CG_S_LVL_Arr,sitesChosen[m],"Crown Gardens Sump Level")
//                                             minValues[m]= arr[0]
//                                             maxValues[m]=arr[1]
//                                              avgValues[m]=arr[2]

//       }
//                                         break;

//                                         case "Crown Gardens Tower 1 Level":
//                                           if (this.variable.CG_T1_LVL_Arr.length==0){
//                                             break;
//                                           }
//                                             else{
//                                               var arr = this.MinMaxAvg(m,this.variable.CG_T1_LVL_Arr,sitesChosen[m],"Crown Gardens Tower 1 Level")
//                                               minValues[m]= arr[0]
//                                               maxValues[m]=arr[1]
//                                                avgValues[m]=arr[2]
//       }
//                                         break;

//                                         case "Crown Gardens Tower 1 Inlet Flow":
//                                           if (this.variable.CG_T1_IF_Arr.length==0){
//                                             break;
//                                           }
//                                             else{
//                                               var arr = this.MinMaxAvg(m,this.variable.CG_T1_IF_Arr,sitesChosen[m],"Crown Gardens Tower 1 Inlet Flow")
//                                               minValues[m]= arr[0]
//                                               maxValues[m]=arr[1]
//                                                avgValues[m]=arr[2]
//       }
//                                         break;

//                                         case "Crown Gardens Tower 1 Outlet Flow":
//                                           if (this.variable.CG_T1_OF_Arr.length==0){
//                                             break;
//                                           }
//                                             else{
//                                               var arr = this.MinMaxAvg(m,this.variable.CG_T1_OF_Arr,sitesChosen[m],"Crown Gardens Tower 1 Outlet Flow")
//                                               minValues[m]= arr[0]
//                                               maxValues[m]=arr[1]
//                                               avgValues[m]=arr[2]
//       }
//                                           break;

//                                           case "Crown Gardens Tower 2 Level":
//                                             if (this.variable.CG_T2_LVL_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CG_T2_LVL_Arr,sitesChosen[m],"Crown Gardens Tower 2 Level")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//       }
//                                           break;

//                                           case "Crown Gardens Tower 2 Inlet Flow":
//                                             if (this.variable.CG_T2_IF_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CG_T2_IF_Arr,sitesChosen[m],"Crown Gardens Tower 2 Inlet Flow")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//       }
//                                           break;

//                                           case "Crown Gardens Tower 2 Outlet Flow":
//                                             if (this.variable.CG_T2_OF_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CG_T2_OF_Arr,sitesChosen[m],"Crown Gardens Tower 2 Outlet Flow")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;


//                                           case "NMU Effluent Flow Rate":
//                                             if (this.variable.NMU_EFF_FR_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_FR_Arr,sitesChosen[m],"NMU Effluent Flow Rate")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "NMU Effluent Delivery Pressure":
//                                             if (this.variable.NMU_EFF_DP_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_DP_Arr,sitesChosen[m],"NMU Effluent Delivery Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "NMU Effluent Dam Level":
//                                             if (this.variable.NMU_EFF_DAM_LVL_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_DAM_LVL_Arr,sitesChosen[m],"NMU Effluent Dam Level")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;


//                                           case "NMU Effluent Pump 1 Speed":
//                                             if (this.variable.NMU_EFF_P1_SPEED_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_P1_SPEED_Arr,sitesChosen[m],"NMU Effluent Pump 1 Speed")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "NMU Effluent Pump 2 Speed":
//                                             if (this.variable.NMU_EFF_P2_SPEED_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_P2_SPEED_Arr,sitesChosen[m],"NMU Effluent Pump 2 Speed")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;


//                                           case "NMU Effluent Pump 3 Speed":
//                                             if (this.variable.NMU_EFF_P3_SPEED_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_P3_SPEED_Arr,sitesChosen[m],"NMU Effluent Pump 3 Speed")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;


//                                           case "NMU Effluent Jockey Pump Speed":
//                                             if (this.variable.NMU_EFF_JP_SPEED_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_JP_SPEED_Arr,sitesChosen[m],"NMU Effluent Jockey Pump Speed")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 1 Actual Speed":
//                                             if (this.variable.CHE_PS_P1_ACTUAL_SPEED_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P1_ACTUAL_SPEED_Arr,sitesChosen[m],"Chelsea Pumpstation 1 Actual Speed")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 1 Delivery Pressure":
//                                             if (this.variable.CHE_PS_P1_DEL_PRESS_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P1_DEL_PRESS_Arr,sitesChosen[m],"Chelsea Pumpstation 1 Delivery Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 1 Suction Pressure":
//                                             if (this.variable.CHE_PS_P1_SUCT_PRESS_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P1_SUCT_PRESS_Arr,sitesChosen[m],"Chelsea Pumpstation 1 Suction Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;


//                                           case "Chelsea Pumpstation 2 Actual Speed":
//                                             if (this.variable.CHE_PS_P2_ACTUAL_SPEED_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P2_ACTUAL_SPEED_Arr,sitesChosen[m],"Chelsea Pumpstation 2 Actual Speed")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 2 Delivery Pressure":
//                                             if (this.variable.CHE_PS_P2_DEL_PRESS_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P2_DEL_PRESS_Arr,sitesChosen[m],"Chelsea Pumpstation 2 Delivery Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 2 Suction Pressure":
//                                             if (this.variable.CHE_PS_P2_SUCT_PRESS_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P2_SUCT_PRESS_Arr,sitesChosen[m],"Chelsea Pumpstation 2 Suction Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 3 Actual Speed":
//                                             if (this.variable.CHE_PS_P3_ACTUAL_SPEED_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P3_ACTUAL_SPEED_Arr,sitesChosen[m],"Chelsea Pumpstation 3 Actual Speed")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 3 Delivery Pressure":
//                                             if (this.variable.CHE_PS_P3_DEL_PRESS_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P3_DEL_PRESS_Arr,sitesChosen[m],"Chelsea Pumpstation 3 Delivery Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 3 Suction Pressure":
//                                             if (this.variable.CHE_PS_P3_SUCT_PRESS_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P3_SUCT_PRESS_Arr,sitesChosen[m],"Chelsea Pumpstation 3 Suction Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;


//                                           case "Chelsea Pumpstation 4 Actual Speed":
//                                             if (this.variable.CHE_PS_P4_ACTUAL_SPEED_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P4_ACTUAL_SPEED_Arr,sitesChosen[m],"Chelsea Pumpstation 4 Actual Speed")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 4 Delivery Pressure":
//                                             if (this.variable.CHE_PS_P4_DEL_PRESS_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P4_DEL_PRESS_Arr,sitesChosen[m],"Chelsea Pumpstation 4 Delivery Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 4 Suction Pressure":
//                                             if (this.variable.CHE_PS_P4_SUCT_PRESS_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P4_SUCT_PRESS_Arr,sitesChosen[m],"Chelsea Pumpstation 4 Suction Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Chelsea Pumpstation 700 Flow Rate":
//                                             if (this.variable.CHE_PS_700_FLOW_RATE_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.CHE_PS_700_FLOW_RATE_Arr,sitesChosen[m],"Chelsea Pumpstation 700 Flow Rate")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Motherwell Flow Rate":
//                                             if (this.variable.MW_BPS_FlowRate_Arr.length == 0){
//                                               break;
//                                             }
//                                             else{
//                                               var arr = this.MinMaxAvg(m,this.variable.MW_BPS_FlowRate_Arr,sitesChosen[m], "Motherwell Flow Rate")
//                                               minValues[m]= arr[0]
//                                               maxValues[m]= arr[1]
//                                               avgValues[m]=arr[2]
//                                             }
//                                             break;

//                                             case "Motherwell Suction Pressure":
//                                               if (this.variable.MW_BPS_SuctionPressure_Arr.length == 0){
//                                                 break;
//                                               }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.MW_BPS_SuctionPressure_Arr,sitesChosen[m], "Motherwell Suction Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]= arr[1]
//                                                 avgValues[m]=arr[2]
//                                               }
//                                               break;
//                                               case "Motherwell Delivery Pressure":
//                                                 if (this.variable.MW_BPS_DeliveryPressure_Arr.length == 0){
//                                                   break;
//                                                 }
//                                                 else{
//                                                   var arr = this.MinMaxAvg(m,this.variable.MW_BPS_DeliveryPressure_Arr,sitesChosen[m], "Motherwell Delivery Pressure")
//                                                   minValues[m]= arr[0]
//                                                   maxValues[m]= arr[1]
//                                                   avgValues[m]=arr[2]
//                                                 }
//                                                 break;


//                                                 case "Motherwell Reservoir Level":
//                                                   if (this.variable.MW_LVL_array.length == 0){
//                                                     break;
//                                                   }
//                                                   else{
//                                                     var arr = this.MinMaxAvg(m,this.variable.MW_LVL_array,sitesChosen[m], "Motherwell Reservoir Level")
//                                                     minValues[m]= arr[0]
//                                                     maxValues[m]= arr[1]
//                                                     avgValues[m]=arr[2]
//                                                   }
//                                                   break;

//                                           //Ground Water
//                                           case "Newton Park Pool Pressure":
//                                             if(this.variable.NMBM_NPP_GW_PRESSURE_Arr.length ==0){
//                                               break;
//                                             }
//                                             else{
//                                               var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_PRESSURE_Arr, sitesChosen[m],"Newton Park Pool Pressure")

//                                               minValues[m]= arr[0]
//                                               maxValues[m]= arr[1]
//                                               avgValues[m]=arr[2]
//                                             }break;

//                                             case "Newton Park Pool Flow Rate":
//                                               if(this.variable.NMBM_NPP_GW_FLOW_RATE_Arr.length ==0){
//                                                 break;
//                                               }
//                                               else{
//                                                 var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_FLOW_RATE_Arr, sitesChosen[m],"Newton Park Pool Flow Rate")

//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]= arr[1]
//                                                 avgValues[m]=arr[2]
//                                               }break;

//                                               case "Newton Park Pool Water Level":
//                                                 if(this.variable.NMBM_NPP_GW_LEVEL_Arr.length ==0){
//                                                   break;
//                                                 }
//                                                 else{
//                                                   var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_LEVEL_Arr, sitesChosen[m],"Newton Park Pool Water Level")
//                                                   minValues[m]= arr[0]
//                                                   maxValues[m]= arr[1]
//                                                   avgValues[m]=arr[2]
//                                                 }break;

//                                               case "Newton Park Pool Total Flow":
//                                                 if(this.variable.NMBM_NPP_GW_TOTAL_FLOW_Arr.length == 0){
//                                                   break;
//                                                 }
//                                                 else{
//                                                   var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_TOTAL_FLOW_Arr, sitesChosen[m],"Newton Park Pool Total Flow")
//                                                   minValues[m]= arr[0]
//                                                   maxValues[m]=arr[1]
//                                                   avgValues[m]=arr[2]
//                                                 }break;


//                                                 case "Humansdorp 1 Water Level":
//                                                   if(this.variable.KLM_HUP_WATER_LEVEL_Arr.length ==0){
//                                                     break;
//                                                   }
//                                                   else{
//                                                     var arr=this.MinMaxAvg(m, this.variable.KLM_HUP_WATER_LEVEL_Arr, sitesChosen[m],"Humansdorp 1 Water Level")

//                                                     minValues[m]= arr[0]
//                                                     maxValues[m]= arr[1]
//                                                     avgValues[m]=arr[2]
//                                                   }break;

//                                                   case "Humansdorp 1 Flow Rate":
//                                                     if(this.variable.KLM_HUP_FLOWRATE_Arr.length ==0){
//                                                       break;
//                                                     }
//                                                     else{
//                                                       var arr=this.MinMaxAvg(m, this.variable.KLM_HUP_FLOWRATE_Arr, sitesChosen[m],"Humansdorp 1 Flow Rate")
//                                                       minValues[m]= arr[0]
//                                                       maxValues[m]= arr[1]
//                                                       avgValues[m]=arr[2]
//                                                     }break;

//                                                   case "Humansdorp 1 Total Flow":
//                                                     if(this.variable.KLM_HUP_TOTALFLOW_Arr.length == 0){
//                                                       break;
//                                                     }
//                                                     else{
//                                                       var arr=this.MinMaxAvg(m, this.variable.KLM_HUP_TOTALFLOW_Arr, sitesChosen[m],"Humansdorp 1 Total Flow")
//                                                       minValues[m]= arr[0]
//                                                       maxValues[m]=arr[1]
//                                                       avgValues[m]=arr[2]
//                                                     }break;



//                                                 case "Humansdorp 2C Water Level":
//                                                   if(this.variable.KLM_HUP2_WATER_LEVEL_Arr.length ==0){
//                                                     break;
//                                                   }
//                                                   else{
//                                                     var arr=this.MinMaxAvg(m, this.variable.KLM_HUP2_WATER_LEVEL_Arr, sitesChosen[m],"Humansdorp 2C Water Level")

//                                                     minValues[m]= arr[0]
//                                                     maxValues[m]= arr[1]
//                                                     avgValues[m]=arr[2]
//                                                   }break;

//                                                   case "Humansdorp 2C Flow Rate":
//                                                     if(this.variable.KLM_HUP2_FLOWRATE_Arr.length ==0){
//                                                       break;
//                                                     }
//                                                     else{
//                                                       var arr=this.MinMaxAvg(m, this.variable.KLM_HUP2_FLOWRATE_Arr, sitesChosen[m],"Humansdorp 2C Flow Rate")
//                                                       minValues[m]= arr[0]
//                                                       maxValues[m]= arr[1]
//                                                       avgValues[m]=arr[2]
//                                                     }break;

//                                                   case "Humansdorp 2C Total Flow":
//                                                     if(this.variable.KLM_HUP2_TOTALFLOW_Arr.length == 0){
//                                                       break;
//                                                     }
//                                                     else{
//                                                       var arr=this.MinMaxAvg(m, this.variable.KLM_HUP2_TOTALFLOW_Arr, sitesChosen[m],"Humansdorp 2C Total Flow")
//                                                       minValues[m]= arr[0]
//                                                       maxValues[m]=arr[1]
//                                                       avgValues[m]=arr[2]
//                                                     }break;

//                                                     case "Humansdorp 3 Water Level":
//                                                       if(this.variable.KLM_HUP3_WATER_LEVEL_Arr.length ==0){
//                                                         break;
//                                                       }
//                                                       else{
//                                                         var arr=this.MinMaxAvg(m, this.variable.KLM_HUP3_WATER_LEVEL_Arr, sitesChosen[m],"Humansdorp 3 Water Level")

//                                                         minValues[m]= arr[0]
//                                                         maxValues[m]= arr[1]
//                                                         avgValues[m]=arr[2]
//                                                       }break;

//                                                       case "Humansdorp 3 Flow Rate":
//                                                         if(this.variable.KLM_HUP3_FLOWRATE_Arr.length ==0){
//                                                           break;
//                                                         }
//                                                         else{
//                                                           var arr=this.MinMaxAvg(m, this.variable.KLM_HUP3_FLOWRATE_Arr, sitesChosen[m],"Humansdorp 3 Flow Rate")
//                                                           minValues[m]= arr[0]
//                                                           maxValues[m]= arr[1]
//                                                           avgValues[m]=arr[2]
//                                                         }break;

//                                                       case "Humansdorp 3 Total Flow":
//                                                         if(this.variable.KLM_HUP3_TOTALFLOW_Arr.length == 0){
//                                                           break;
//                                                         }
//                                                         else{
//                                                           var arr=this.MinMaxAvg(m, this.variable.KLM_HUP3_TOTALFLOW_Arr, sitesChosen[m],"Humansdorp 3 Total Flow")
//                                                           minValues[m]= arr[0]
//                                                           maxValues[m]=arr[1]
//                                                           avgValues[m]=arr[2]
//                                                         }break;



//                                                         case "Humansdorp 4 Water Level ":
//                                                           if(this.variable.KLM_HUP4_WATER_LEVEL_Arr.length ==0){
//                                                             break;
//                                                           }
//                                                           else{
//                                                             var arr=this.MinMaxAvg(m, this.variable.KLM_HUP4_WATER_LEVEL_Arr, sitesChosen[m],"Humansdorp 4 Water Level ")

//                                                             minValues[m]= arr[0]
//                                                             maxValues[m]= arr[1]
//                                                             avgValues[m]=arr[2]
//                                                           }break;

//                                                           case "Humansdorp 4 Flow Rate":
//                                                             if(this.variable.KLM_HUP4_FLOWRATE_Arr.length ==0){
//                                                               break;
//                                                             }
//                                                             else{
//                                                               var arr=this.MinMaxAvg(m, this.variable.KLM_HUP4_FLOWRATE_Arr, sitesChosen[m],"Humansdorp 4 Flow Rate")
//                                                               minValues[m]= arr[0]
//                                                               maxValues[m]= arr[1]
//                                                               avgValues[m]=arr[2]
//                                                             }break;

//                                                           case "Humansdorp 4 Total Flow":
//                                                             if(this.variable.KLM_HUP4_TOTALFLOW_Arr.length == 0){
//                                                               break;
//                                                             }
//                                                             else{
//                                                               var arr=this.MinMaxAvg(m, this.variable.KLM_HUP4_TOTALFLOW_Arr, sitesChosen[m],"Humansdorp 4 Total Flow")
//                                                               minValues[m]= arr[0]
//                                                               maxValues[m]=arr[1]
//                                                               avgValues[m]=arr[2]
//                                                             }break;




//                                                             case "Humansdorp 6 Water Level":
//                                                               if(this.variable.KLM_HUP6_WATER_LEVEL_Arr.length ==0){
//                                                                 break;
//                                                               }
//                                                               else{
//                                                                 var arr=this.MinMaxAvg(m, this.variable.KLM_HUP6_WATER_LEVEL_Arr, sitesChosen[m],"Humansdorp 6 Water Level")

//                                                                 minValues[m]= arr[0]
//                                                                 maxValues[m]= arr[1]
//                                                                 avgValues[m]=arr[2]
//                                                               }break;

//                                                               case "Humansdorp 6 Flow Rate":
//                                                                 if(this.variable.KLM_HUP6_FLOWRATE_Arr.length ==0){
//                                                                   break;
//                                                                 }
//                                                                 else{
//                                                                   var arr=this.MinMaxAvg(m, this.variable.KLM_HUP6_FLOWRATE_Arr, sitesChosen[m],"Humansdorp 6 Flow Rate")
//                                                                   minValues[m]= arr[0]
//                                                                   maxValues[m]= arr[1]
//                                                                   avgValues[m]=arr[2]
//                                                                 }break;

//                                                               case "Humansdorp 6 Total Flow":
//                                                                 if(this.variable.KLM_HUP6_TOTALFLOW_Arr.length == 0){
//                                                                   break;
//                                                                 }
//                                                                 else{
//                                                                   var arr=this.MinMaxAvg(m, this.variable.KLM_HUP6_TOTALFLOW_Arr, sitesChosen[m],"Humansdorp 6 Total Flow")
//                                                                   minValues[m]= arr[0]
//                                                                   maxValues[m]=arr[1]
//                                                                   avgValues[m]=arr[2]
//                                                                 }break;


//                                           //Stanford Road Road
//                                           case "Stanford Road Flow Rate":
//                                             if(this.variable.STAN_BPS_FlowRate_Arr.length == 0){
//                                               break;
//                                             }
//                                             else{
//                                               var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_FlowRate_Arr, sitesChosen[m],"Stanford Road Flow Rate")
//                                               minValues[m]= arr[0]
//                                               maxValues[m]= arr[1]
//                                               avgValues[m]=arr[2]
//                                             }
//                                             break;
//                                             case "Stanford Road Delivery Pressure":
//                                               if(this.variable.STAN_BPS_DeliveryPressure_Arr.length == 0){
//                                                 break;
//                                               }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_DeliveryPressure_Arr, sitesChosen[m],"Stanford Road Delivery Pressure")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]= arr[1]
//                                                 avgValues[m]=arr[2]
//                                               }
//                                               break;
//                                               case "Stanford Road Suction Pressure":
//                                                 if(this.variable.STAN_BPS_SuctionPressure_Arr.length == 0){
//                                                   break;
//                                                 }
//                                                 else{
//                                                   var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_SuctionPressure_Arr, sitesChosen[m],"Stanford Road Suction Pressure")
//                                                   minValues[m]= arr[0]
//                                                   maxValues[m]= arr[1]
//                                                   avgValues[m]=arr[2]
//                                                 }
//                                                break;
//                                                 case "Stanford Road Pump 1 Frequency":
//                                                   if(this.variable.STAN_BPS_P1_FREQ_Arr.length == 0){
//                                                     break;
//                                                   }
//                                                   else{
//                                                     var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P1_FREQ_Arr, sitesChosen[m],"Stanford Road Pump 1 Frequency")
//                                                     minValues[m]= arr[0]
//                                                     maxValues[m]= arr[1]
//                                                     avgValues[m]=arr[2]
//                                                   }
//                                                   break;
//                                                   case "Stanford Road Pump 2 Frequency":
//                                                     if(this.variable.STAN_BPS_P2_FREQ_Arr.length == 0){
//                                                       break;
//                                                     }
//                                                     else{
//                                                       var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P2_FREQ_Arr, sitesChosen[m],"Stanford Road Pump 2 Frequency")
//                                                       minValues[m]= arr[0]
//                                                       maxValues[m]= arr[1]
//                                                       avgValues[m]=arr[2]
//                                                     }
//                                                     break;
//                                                     case "Stanford Road Pump 3 Frequency":
//                                                       if(this.variable.STAN_BPS_P3_FREQ_Arr.length == 0){
//                                                         break;
//                                                       }
//                                                       else{
//                                                         var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P3_FREQ_Arr, sitesChosen[m],"Stanford Road Pump 3 Frequency")
//                                                         minValues[m]= arr[0]
//                                                         maxValues[m]= arr[1]
//                                                         avgValues[m]=arr[2]
//                                                       }
//                                                       break;


//                                                       case "Stanford Road Pump 4 Frequency":
//                                                         if(this.variable.STAN_BPS_P4_FREQ_Arr.length == 0){
//                                                           break;
//                                                         }
//                                                         else{
//                                                           var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P4_FREQ_Arr, sitesChosen[m],"Stanford Road Pump 4 Frequency")
//                                                           minValues[m]= arr[0]
//                                                           maxValues[m]= arr[1]
//                                                           avgValues[m]=arr[2]
//                                                         }
//                                                         break;
//                                           //Water Treatment Works
//                                           case "Nooitgedacht High Level Flow Rate":
//                                             if (this.variable.WTW_NGT_FM_HIGH_FR_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.WTW_NGT_FM_HIGH_FR_Arr,sitesChosen[m],"Nooitgedacht High Level Flow Rate")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//                                           case "Nooitgedacht Low Level Flow Rate":
//                                             if (this.variable.WTW_NGT_FM_LOW_FR_Arr.length==0){
//                                               break;
//                                             }
//                                               else{
//                                                 var arr = this.MinMaxAvg(m,this.variable.WTW_NGT_FM_LOW_FR_Arr,sitesChosen[m],"Nooitgedacht Low Level Flow Rate")
//                                                 minValues[m]= arr[0]
//                                                 maxValues[m]=arr[1]
//                                                 avgValues[m]=arr[2]
//                                                  }
//                                           break;

//     }

//   }
//   for(var i = 0; i < sitesChosen.length;i++)
//   {
//     this.ELEMENT_DATA[i]={ name: sitesChosen[i],min:minValues[i],max:maxValues[i],average:avgValues[i]};
//   }
//       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
//       this.dataSource.filter = this.filterValue.trim().toLowerCase();
//   }

//        MinMaxAvg(m:any, siteArray:any[], sitesChosen:any, Site:string) {
//       var maxValues=[]
//         var minValues=[]
//         var avgValues=[]
//           var avg: any = 0
//     maxValues[m] = siteArray[0][1]
//     minValues[m] = siteArray[0][1]
//     avgValues[m] = siteArray[0][1]

//     for (let i = 0; i < siteArray.length; i++) {

//     if (maxValues[m]<siteArray[i][1]) {
//     maxValues[m] = siteArray[i][1]
//     }
//     if (minValues[m]>siteArray[i][1]) {
//     minValues[m] = siteArray[i][1]
//     }

//     avg  = siteArray[i][1] + avg
//     }
//     avg = (avg/siteArray.length).toFixed(2)
//     avgValues[m]=avg

//     var arr =[minValues[m],maxValues[m],avg]
//     return arr



//   }
