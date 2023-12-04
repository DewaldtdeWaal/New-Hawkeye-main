import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service-Files/auth.service';

@Component({
  selector: 'app-trend-picker-display',
  templateUrl: './trend-picker-display.component.html',
  styleUrls: ['./trend-picker-display.component.css']
})
export class TrendPickerDisplayComponent implements OnInit {


  userSites:string[];
  userEmail: string;

  constructor(public authService: AuthService,) {

    
    this.userSites = this.authService.getUserSites();
    this.userEmail = this.authService.getUserEmail()
   }

   count: any;


   isuzuArr:any[]=["Isuzu Oven 1 VSD Speed","Isuzu Oven 1 Heat Exchanger Temperature","Isuzu Oven 1 Temperature 1","Isuzu Oven 1 Temperature 2","Isuzu Oven 2 VSD Speed","Isuzu Oven 2 Heat Exchanger Temperature","Isuzu Oven 2 Temperature 1","Isuzu Oven 2 Temperature 2"];
   isuzuTagListArr:string[]=[];
   isuzuSelected:boolean[]=[];
 
   airPortArr:any[]=["Airport Reservoir Level"];
   airPortTagListArr:string[]=[];
   airPortSelected:boolean[]=[];
 
     kruisArr:any[]=["Kruisfontein Reservoir Level"];
     kruisRTagListArr:string[]=[];
     kruisRSelected:boolean[]=[];
 
     kruis12GWArr:any[]=["Kruisfontein Borhole 12 Level","Kruisfontein Borhole 12 Current","Kruisfontein Borhole 12 Pressure","Kruisfontein Borhole 12 Flow Rate","Kruisfontein Borhole 12 Total Flow"];
     kruis12GWTagListArr:string[]=[];
     kruis12GWSelected:boolean[]=[];
 
     kruis13GWArr:any[]=["Kruisfontein Borhole 13 Level","Kruisfontein Borhole 13 Current","Kruisfontein Borhole 13 Pressure","Kruisfontein Borhole 13 Flow Rate","Kruisfontein Borhole 13 Total Flow"];
     kruis13GWTagListArr:string[]=[];
     kruis13GWSelected:boolean[]=[];
 
     kruis14GWArr:any[]=["Kruisfontein Borhole 14 Level","Kruisfontein Borhole 14 Current","Kruisfontein Borhole 14 Pressure","Kruisfontein Borhole 14 Flow Rate","Kruisfontein Borhole 14 Total Flow"];
     kruis14GWTagListArr:string[]=[];
     kruis14GWSelected:boolean[]=[];
 
     schoeArr:any[]=["Schoemanshoek Pressure","Schoemanshoek Level","Schoemanshoek Actuator Position","Schoemanshoek Actuator Set Point","Schoemanshoek Actuator Valve Feedback Signal","Schoemanshoek Actuator Valve Command Signal","Schoemanshoek Reservoir Level Signal Error","Schoemanshoek Actuator Valve Fault","Schoemanshoek Actuator Valve Torque Fail Close","Schoemanshoek Actuator Valve Torque Fail Open","Schoemanshoek General Fault","Schoemanshoek Actuator General Fault","Schoemanshoek Actuator Valve Timeout"]
     schoeTagListArr:string[]=[];
     schoeTagsSelected:boolean[]=[];
 
     emerArr:any[]=["Emerald Hill Reservoir Level","Emerald Hill Flow Rate","Emerald Hill Total Flow"];
     emerTagListArr:string[]=[];
     emerTagsSelected:boolean[]=[];
 
     bhbArr:any[]=["Blue Horizon Bay Reservoir Level"];
     bhbTagListArr:string[]=[];
     bhbTagsSelected:boolean[]=[];
 
     chtArr:any[]=["Chatty North Chamber Level","Chatty South Chamber Level","Chatty Overhead Level","Chatty Flow Rate"];
     chtTagListArr:string[]=[];
     chtTagsSelected:boolean[]=[];
 
     driftArr:any[]=["Driftsands Reservoir Level","Driftsands Flow Rate 1","Driftsands Flow Rate 2","Driftsands Total Flow 1","Driftsands Total Flow 2"]
     driftTagListArr:string[]=[];
     driftTagsSelected:boolean[]=[];
 
     cheArr:any[]=["Chelsea Reservoir West Chamber Level","Chelsea Reservoir East Chamber Level","Chelsea Reservoir Summit 1200 mm Flow Rate","Chelsea Reservoir Summit 1200 mm Total Flow", "Chelsea Reservoir Greenbushes 600 mm Flow Rate","Chelsea Reservoir Greenbushes 600 mm Total Flow"]
     cheTagListArr:string[]=[];
     cheTagsSelected:boolean[]=[];
 
     chePSArr:any[]=["Chelsea Pumpstation 1 Actual Speed","Chelsea Pumpstation 1 Delivery Pressure","Chelsea Pumpstation 1 Suction Pressure","Chelsea Pumpstation 2 Actual Speed","Chelsea Pumpstation 2 Delivery Pressure","Chelsea Pumpstation 2 Suction Pressure","Chelsea Pumpstation 3 Actual Speed","Chelsea Pumpstation 3 Delivery Pressure","Chelsea Pumpstation 3 Suction Pressure", "Chelsea Pumpstation 4 Actual Speed","Chelsea Pumpstation 4 Delivery Pressure","Chelsea Pumpstation 4 Suction Pressure","Chelsea Pumpstation 700 Flow Rate","Chelsea Pumpstation 700 Total Flow"]
     chePSTagListArr:string[]=[];
     chePSTagsSelected:boolean[]=[];
 
     gbwArr:any[]=["Gamtoos Break Water Pressure","Gamtoos Break Water Flow Rate"];
     gbwTagListArr:string[]=[];
     gbwTagsSelected:boolean[]=[];
 
     cgkArr:any[]=["Coega Kop Reservoir Pressure","Coega Kop Inlet Chamber 2 Ml","Coega Kop to Coega IDZ Flow Rate","Coega Kop to Motherwell Flow Rate","Coega Kop from Grassridge Flow Rate","Coega Kop from Grassridge Total Flow","Coega Kop to Coega IDZ Total Flow","Coega Kop to Motherwell Total Flow","Coega IDZ Outlet Total Flow to Coega Kop Reservoir","Coega Kop North Chamber 17 Ml"];
     cgkTagListArr:string[]=[];
     cgkTagsSelected:boolean[]=[];
 
     stGeorgeArr:any[]=["St Georges Borehole Flow Rate","St Georges Borehole Total Flow","St Georges Emerald Hill Flow Rate","St Georges Emerald Hill Total Flow"];
     stGeorgeTagListArr:string[]=[];
     stGeorgeTagsSelected:boolean[]=[];
 
     bergenArr:any[]=["Bergendal Reservoir Level"];
     bergenTagListArr:string[]=[];
     bergenTagsSelected:boolean[]=[];
 
     wolwasArr:any[]=["Wolwas Reservoir Level"];
     wolwasTagListArr:string[]=[];
     wolwasTagsSelected:boolean[]=[];
 
     umiArr:any[]=["Umasizakhe Reservoir Level"];
     umiTagListArr:string[]=[];
     umiTagsSelected:boolean[]=[];
 
     kroonArr:any[]=["Kroonvale Reservoir Level"];
     kroonTagListArr:string[]=[];
     kroonTagsSelected:boolean[]=[];
 
     tinroofArr:any[]=["Tin Roof Reservoir Level"];
     tinroofTagListArr:string[]=[];
     tinroofTagsSelected:boolean[]=[];
 
     damcampArr:any[]=["Damcamp Reservoir Level"];
     damcampTagListArr:string[]=[];
     damcampTagsSelected:boolean[]=[];
 
     holdingArr:any[]=["Holding Reservoir Level"];
     holdingTagListArr:string[]=[];
     holdingTagsSelected:boolean[]=[];
 
     cgkIDZArr:any[]=["Coega IDZ Flow Rate","Coega Motherwell Flow Rate"];
     cgkIDZTagListArr:string[]=[];
     cgkIDZTagsSelected:boolean[]=[];
 
     cgArr:any[]=["Crown Gardens Suction Pressure","Crown Gardens Delivery Pressure","Crown Gardens Sump Level","Crown Gardens Tower 1 Level","Crown Gardens Tower 1 Inlet Flow","Crown Gardens Tower 1 Outlet Flow","Crown Gardens Tower 2 Level","Crown Gardens Tower 2 Inlet Flow","Crown Gardens Tower 2 Outlet Flow"]
     cgTagListArr:string[]=[];
     cgTagsSelected:boolean[]=[];
 
     fmtArr:any[]=["FM Tower Flow Rate","FM Tower Pressure","FM Tower Total Flow"];
     fmtTagListArr:string[]=[];
     fmtTagsSelected:boolean[]=[];
 
     gamtoosArr:any[]=["Gamtoos Bridge Steel Pipe Flow Rate","Gamtoos Bridge Socoman Pipe Flow Rate","Gamtoos Bridge Steel Pipe Pressure","Gamtoos Bridge Socoman Pipe Pressure"];
     gamtoosTagListArr:string[]=[];
     gamtoosTagsSelected:boolean[]=[];
 
     grArr:any[]=["Grassridge East Chamber Level","Grassridge West Chamber Level","Grassridge Inlet Flow","Grassridge Outlet Flow"];
     grTagListArr:string[]=[];
     grTagsSelected:boolean[]=[];
 
     gbArr:any[]=["Greenbushes Reservoir Level","Greenbushes Flow Rate"];
     gbTagListArr:string[]=[];
     gbTagsSelected:boolean[]=[];
 
     hbArr:any[]=["Heatherbank Reservoir Level"];
     hbTagListArr:string[]=[];
     hbTagsSelected:boolean[]=[];
 
     hbpArr:any[]=["Heatherbank Pumpstation 1 Current","Heatherbank Pumpstation 2 Current","Heatherbank Pumpstation 3 Current","Heatherbank Pumpstation 1 Run Hours","Heatherbank Pumpstation 2 Run Hours","Heatherbank Pumpstation 3 Run Hours"];
     hbpTagListArr:string[]=[];
     bhpTagsSelected:boolean[]=[];
 
     lhArr:any[]=["Lovemore Heights Reservoir Level","Lovemore Heights Overhead Tank"];
     lhTagListArr:string[]=[];
     lhTagsSelected:boolean[]=[];
 
     mwArr:any[]=["Motherwell Flow Rate","Motherwell Delivery Pressure","Motherwell Suction Pressure","Motherwell Total Flow","Motherwell Pump 1 Speed","Motherwell Pump 2 Speed","Motherwell Pump 3 Speed","Motherwell Pump 4 Speed"];
     mwTagListArr:string[]=[];
     mwTagsSelected:boolean[]=[];
 
     mwrArr:any[]=["Motherwell Reservoir North Chamber Level","Motherwell Reservoir South Chamber Level"];
     mwrTagListArr:string[]=[]
     mwrTagsSelected:boolean[]=[]
 
     npArr:any[]=["Newton Park Pool Pressure","Newton Park Pool Flow Rate","Newton Park Pool Water Level", "Newton Park Pool Total Flow"];
     npTagListArr:string[]=[];
     npTagsSelected:boolean[]=[];
 
     effArr:any[]=[  "NMU Effluent Flow Rate","NMU Effluent Delivery Pressure","NMU Effluent Dam Level","NMU Effluent Pump 1 Speed","NMU Effluent Pump 2 Speed","NMU Effluent Pump 3 Speed","NMU Effluent Jockey Pump Speed"];
     effTagListArr:string[]=[];
     effTagsSelected:boolean[]=[];
 
     ngtArr:any[]=[ "Nooitgedacht High Level Flow Rate", "Nooitgedacht Low Level Flow Rate"];
     ngtTagListArr:string[]=[];
     ngtTagsSelected:boolean[]=[];
 
     rdArr:any[]=["Rosedale Reservoir Level"];
     rdTagListArr:string[]=[];
     rdTagsSelected:boolean[]=[];
 
     stanArr:any[]=["Stanford Road Flow Rate","Stanford Road Delivery Pressure", "Stanford Road Suction Pressure", "Stanford Road Pump 1 Frequency","Stanford Road Pump 2 Frequency", "Stanford Road Pump 3 Frequency", "Stanford Road Pump 4 Frequency"];
     stanTagListArr:string[]=[];
     stanTagsSelected:boolean[]=[];
 
     maliArr:any[]=["Malabar Reservoir Level"];
     maliTagListArr:string[]=[];
     maliTagsSelected:boolean[]=[];
 
     smArr:any[]=["Summit Reservoir Level","Summit Flow Rate"];
     smTagListArr:string[]=[];
     smTagsSelected:boolean[]=[];
 
     thArr:any[]=["Theescombe Reservoir Level"];
     thTagListArr:string[]=[];
     thTagsSelected:boolean[]=[];
 
     uitArr:any[]=["Uitenhage FC Flow Rate","Uitenhage FC Pressure"];
     uitTagListArr:string[]=[];
     uitTagsSelected:boolean[]=[];
 
     vrhArr:any[]=["Van Riebeeck Hoogte Delivery Level","Van Riebeeck Hoogte Suction Level"];
     vrhTagListArr:string[]=[];
     vrhTagsSelected:boolean[]=[];
 
     vsArr:any[]=["Van Stadens Reservoir Level"];
     vsTagListArr:string[]=[];
     vsTagsSelected:boolean[]=[];
 
     bethArr:any[]=["Bethelsdorp Battery Level","Bethelsdorp Flow Rate","Bethelsdorp Pressure","Bethelsdorp Total Flow"];
     bethTagListArr:string[]=[];
     bethTagSelected:boolean[]=[];
 
     hup1Arr:any[]=["HD1 Flow Rate","HD1 Water Level","HD1 Water Total Flow"];
     hup1TagListArr:string[]=[];
     hup1TagSelected:boolean[]=[];
 
     hup2Arr:any[]=["HD2C Flow Rate","HD2C Water Level", "HD2C Water Total Flow"];
     hup2TagListArr:string[]=[];
     hup2TagSelected:boolean[]=[];
 
     hup3Arr:any[]=["HD3 Flow Rate", "HD3 Water Level", "HD3 Water Total Flow"];
     hup3TagListArr:string[]=[];
     hup3TagSelected:boolean[]=[];
 
     hup4Arr:any[]=["HD4 Flow Rate","HD4 Water Level", "HD4 Water Total Flow"];
     hup4TagListArr:string[]=[];
     hup4TagSelected:boolean[]=[];
 
     hup6Arr:any[]=["HD6 Flow Rate","HD6 Water Level", "HD6 Water Total Flow"];
     hup6TagListArr:string[]=[];
     hup6TagSelected:boolean[]=[];
 
     stormsArr:any[]=["Storms River Quarry Level","Storms River Gorge Level"];
     stormsTagListArr:string[]=[];
     stormsTagSelected:boolean[]=[];
 
     karkArr:any[]=[ "Kareedouw K1 Total Flow","Kareedouw K1 Flow Rate","Kareedouw K1 Current", "Kareedouw K1 Level","Kareedouw K2 Total Flow", "Kareedouw K2 Flow Rate","Kareedouw K2 Current", "Kareedouw K2 Level"]
     karkTagListArr:string[]=[];
     karkTagSelected:boolean[]=[];
 
     humGroundArr:any[]=["Humerail Borehol Level","Humerail Raw Water Tank Level","Humerail Final Water Tank Level"];
     humGroundListArr:string[]=[];
     humGroundSelected:boolean[]=[];
 
     humOffTakeArr:any[]=["Humansdorp Off Take Total Flow","Humansdorp Off Take Pressure","Humansdorp Off Take Battery Level"]
     humOffTakeTagListArr:string[]=[];
     humOffTakeSelected:boolean[]=[];
 
     jeffBayOffArr:any[]=["Jeffreys Bay Off Take Total Flow","Jeffreys Bay Off Take Battery Level"];
     jeffBayOffTakeTagListArr:string[]=[];
     jeffBayOffTakeSelected:boolean[]=[];
 
     kougaMainLineArr:any[]=["Kouga Main Line Battery Level","Kouga Main Line Pressure"];
     kougaMainLineTagListArr:string[]=[];
     kougaMainLineSelected:boolean[]=[];
 
     onsParadysArr:any[]=["Ons Paradys Total Flow","Ons Paradys Battery Level"];
     onsParadysTagListArr:string[]=[];
     onsParadysSelected:boolean[]=[];

     stormsWTWArr:any[]=["Storms River Holding Reservoir Level","Storms River Overhead Tank Level"];
     stormsWTWTagListArr:string[]=[];
     stormsWTWTagSelected:boolean[]=[];
 
     oliArr:any[]=["Olifantskop Reservoir Level"];
     oliTagListArr:string[]=[];
     oliTagSelected:boolean[]=[];
 
     bushyFPTArr:any[]=[ "Bushy Park Pumpstation Flow Rate","Bushy Park Pumpstation Total Flow","Bushy Park Combined Borehole Flow Rate","Bushy Park Combined Total Flow", "Bushy Park Holding Tank Level", "Bushy Park Soccoman Flow Rate", "Bushy Park Soccoman Pressure","Bushy Park Soccoman Total Flow","Bushy Park Steel Flow Rate", "Bushy Park Steel Pressure","Bushy Park Steel Total Flow"]
     bushyFPTTagListArr:string[]=[];
     bushyFPTSelected:boolean[]=[];
 
   selectedTags:string[]=[]
   rightSelectedTags:string[]
 
     elandArr:any[]=["Elandsjagt Flow Rate", "Elandsjagt Pressure"];
     elandTagListArr:string[]=[];
     elandTagSelected:boolean[]=[];
 
     klmArr:any[]=["Humansdorp Inlet Flow Rate","Humansdorp Inlet Total Flow"];
     klmWtwInletListArr:string[]=[];
     klmWtwInletSelected:boolean[]=[];
 
     kwanoArr:any[]=[ "Kwanobuhle Reservoir Level","Kwanobuhle Reservoir Flow Rate 1","Kwanobuhle Reservoir Flow Rate 2","Kwanobuhle Reservoir Total Flow 1","Kwanobuhle Reservoir Total Flow 2"];
     kwanoListArr:string[]=[];
     kwanoSelected:boolean[]=[];
 
     LSDArr:any[]=[ "Lee Samuals Drive Pressure","Lee Samuals Drive Total Flow", "Lee Samuals Drive Flow Rate"];
     LSDListArr:string[]=[];
     LSDSelected:boolean[]=[];
 
     MNTArr:any[]=["McNoughton Township South Pressure","McNoughton Township South Total Flow","McNoughton Township South Flow Rate"];
     MNTSListArr:string[]=[];
     MNTSSelected:boolean[]=[];
 
     RPEArr:any[]=["Rosedale Reservoir Total Flow","Rosedale Reservoir Flow Rate"];
     RPEListArr:string[]=[];
     RPESelected:boolean[]=[];
 
     RRArr:any[]=["Rowallan Park Extension Pressure","Rowallan Park Extension Total Flow","Rowallan Park Extension Flow Rate"];
     RRListArr:string[]=[];
     RRSelected:boolean[]=[];
 
 
     LINTWTWArr:any[]=["Linton Back Wash Flow Rate", "Linton Back Wash Total Flow","Linton Raw Water Flow Rate","Linton Raw Water Total Flow","Linton Final Water Flow Rate","Linton Final Water Total Flow"];
     LINTWTWListArr:string[]=[];
     LINTWTWSelected:boolean[]=[];
 
     LINTRESArr:any[]=["Linton Reservoir Level"];
     LINTRESListArr:string[]=[];
     LINTRESSelected:boolean[]=[];
 
     GlenResArr:any[]=["Glendinningvale Reservoir Level"];
     GlenResListArr:string[]=[];
     GlenResSelected:boolean[]=[];
     
     GlenFPTArr:any[]=["Glendinningvale Inlet Pressure","Glendinningvale Inlet Flow Rate","Glendinningvale Inlet Total Flow","Glendinningvale Borehole Flow Rate","Glendinningvale Borehole Total Flow"];
     GlenFPTListArr:string[]=[];
     GlenFPTSelected:boolean[]=[];
 
     GlenWTWArr:any[]=["Glendinningvale Pump 1 Run Time","Glendinningvale Pump 2 Run Time","Glendinningvale Pump 1 Number Of Starts","Glendinningvale Pump 2 Number Of Starts","Glendinningvale Potential of Hydrogen","Glendinningvale Oxidation Reduction Potential"]
     GlenWTWListArr:string[]=[];
     GlenWTWSelected:boolean[]=[];

  ngOnInit() {

    
   }


   getListArr(){

    
    var count=0
    for (let i = 0; i < this.userSites.length; i++) {
      switch (this.userSites[i]) {

        // Reservoirs
        //Don't add name of site
        case "NMB_VS_R":
          if (count>=1 ){count = 0}
    this.vsTagListArr[count]="Reservoir Level"
    count++
          break;


          case "KLM_KUI_R":
            if (count>=1 ){count = 0}
      this.kruisRTagListArr[count]="Reservoir Level"
      count++
            break;

            case "NMB_AIR_PRT":
              if (count>=1 ){count = 0}
        this.airPortTagListArr[count]="Reservoir Level"
        count++
              break;

            case "ISUZU_AUTO":
              if(count>=1){count = 0}
              this.isuzuTagListArr[count]="1 VSD Speed"
              count++
              this.isuzuTagListArr[count]="1 Heat Exchanger Temperature"
              count++
              this.isuzuTagListArr[count]="1 Temperature 1"
              count++
              this.isuzuTagListArr[count]="1 Temperature 2"
              count++
              this.isuzuTagListArr[count]="2 VSD Speed"
              count++
              this.isuzuTagListArr[count]="2 Heat Exchanger Temperature"
              count++
              this.isuzuTagListArr[count]="2 Temperature 1"
              count++
              this.isuzuTagListArr[count]="2 Temperature 2"
              count++

              break;

          case "KLM_KUI_12_GW":
            if(count>=1){count = 0}
              this.kruis12GWTagListArr[count]="Level";
              count++;
              this.kruis12GWTagListArr[count]="Current";
              count++;
              this.kruis12GWTagListArr[count]="Pressure";
              count++;
              this.kruis12GWTagListArr[count]="Flow Rate";
              count++;
              this.kruis12GWTagListArr[count]="Total Flow";
              count++;
            break;

            case "KLM_KUI_13_GW":
              if(count>=1){count = 0}
              this.kruis13GWTagListArr[count]="Level";
              count++;
              this.kruis13GWTagListArr[count]="Current";
              count++;
              this.kruis13GWTagListArr[count]="Pressure";
              count++;
              this.kruis13GWTagListArr[count]="Flow Rate";
              count++;
              this.kruis13GWTagListArr[count]="Total Flow";
              count++;
              break;

              case "KLM_KUI_14_GW":
                if(count>=1){count = 0}
                this.kruis14GWTagListArr[count]="Level";
                count++;
                this.kruis14GWTagListArr[count]="Current";
                count++;
                this.kruis14GWTagListArr[count]="Pressure";
                count++;
                this.kruis14GWTagListArr[count]="Flow Rate";
                count++;
                this.kruis14GWTagListArr[count]="Total Flow";
                count++;
                break;

          case "GRF_BERGEN_R":
            if (count>=1 ){count = 0}
            this.bergenTagListArr[count]="Reservoir Level"
               count++
          break;

          case "GRF_WOL_R":
            if (count>=1 ){count = 0}
            this.wolwasTagListArr[count]="Reservoir Level"
            count++
            break;

            case "GRF_UMA_R":
              if (count>=1 ){count = 0}
              this.umiTagListArr[count]="Reservoir Level"
                 count++
              break;

              case "GRF_KROON_R":
                  if (count>=1 ){count = 0}
                  this.kroonTagListArr[count]="Reservoir Level"
                  count++
                break;

          case "GRF_TIN_R":
            if (count>=1 ){count = 0}
            this.tinroofTagListArr[count]="Reservoir Level"
            count++
          break;

          case "GRF_DAMP_R":
            if (count>=1 ){count = 0}
            this.damcampTagListArr[count]="Reservoir Level"
            count++
          break;

              case "GRF_HOLD_R":
            if (count>=1 ){count = 0}
            this.holdingTagListArr[count]="Reservoir Level"
            count++
          break;



        case "NMB_CGK_R":
          if (count>=1 ){count = 0}
          this.cgkTagListArr[count]="Reservoir Pressure"
          count++
          this.cgkTagListArr[count]="Reservoir Level"
          count++
          this.cgkTagListArr[count]="to Coega IDZ Flow Rate"
          count++
          this.cgkTagListArr[count]="to Motherwell Flow Rate"
          count++
          this.cgkTagListArr[count]="from Grassridge Flow Rate"
          count++
          this.cgkTagListArr[count]="from Grassridge Total Flow"
          count++
          this.cgkTagListArr[count]="to Coega IDZ Total Flow"
          count++
          this.cgkTagListArr[count]="to Motherwell Total Flow"
          count++
          break;


          case"NMB_SCHOE_R":
          if (count>=1 ){count = 0}
          this.schoeTagListArr[count]="Pressure"
          count++;
          this.schoeTagListArr[count]="Level"
          count++;
          this.schoeTagListArr[count]="Actuator Position"
          count++;
          this.schoeTagListArr[count]="Actuator Set Point"
          count++;
          this.schoeTagListArr[count]="Actuator Valve Feedback Signal"
          count++;
            this.schoeTagListArr[count]="Actuator Valve Command Signal"
          count++;
          this.schoeTagListArr[count]="Reservoir Level Signal Error"
          count++;
            this.schoeTagListArr[count]="Actuator Valve Fault"
          count++;
          this.schoeTagListArr[count]="Actuator Valve Torque Fail Close"
          count++;
            this.schoeTagListArr[count]="Actuator Valve Torque Fail Open"
          count++;
          this.schoeTagListArr[count]="General Fault"
          count++;
            this.schoeTagListArr[count]="Actuator General Fault"
          count++;
          this.schoeTagListArr[count]="Actuator Valve Timeout"
          count++;
          break;

        case "NMB_EMERALD_R":
          if (count>=1 ){count = 0}
          this.emerTagListArr[count]="Reservoir Level"
    count++
    this.emerTagListArr[count]="Flow Rate"
    count++;
    this.emerTagListArr[count]="Total Flow"
    count++;

          break;

          case "NMB_STG_R":
            if(count>= 1){count = 0}
            this.stGeorgeTagListArr[count]="Borehole Flow Rate"
            count++;
            this.stGeorgeTagListArr[count]="Borehole Total Flow"
            count++;
            this.stGeorgeTagListArr[count]="Emerald Hill Flow Rate"
            count++;
            this.stGeorgeTagListArr[count]="Emerald Hill Total Flow"
            count++;
            break;

        case "NMB_BHB_R":
          if (count>=1 ){count = 0}
          this.bhbTagListArr[count]="Reservoir Level"
    count++
          break;

          case "NMB_HB_PS":
            if (count>=1 ){count = 0}
            this.hbpTagListArr[count]="1 Current";
            count++;
            this.hbpTagListArr[count]="2 Current";
            count++;
            this.hbpTagListArr[count]="3 Current";
            count++;
            this.hbpTagListArr[count]="1 Run Hours";
            count++;
            this.hbpTagListArr[count]="2 Run Hours";
            count++;
            this.hbpTagListArr[count]="3 Run Hours";
            count++;
            break;

        case "NMB_HB_R":
          if (count>=1 ){count = 0}
          this.hbTagListArr[count]="Reservoir Level"
    count++
          break;

        case "NMB_HB_PS":
        if(count>=1){count = 0}

        break;

        case "NMB_LH_R":
          if (count>=1 ){count = 0}
          this.lhTagListArr[count]="Reservoir Level"
          count++
          this.lhTagListArr[count]="Overhead Tank"
          count++
          break;
        case "NMB_TC_R":
          if (count>=1 ){count = 0}
          this.thTagListArr[count]="Reservoir Level"
    count++
          break;

    case "NMB_DRIFT_R":
      if(count>=1){count = 0}
      this.driftTagListArr[count]="Reservoir Level"
      count++
      this.driftTagListArr[count]="Flow Rate 1"
      count++
      this.driftTagListArr[count]="Flow Rate 2"
      count++
      break;



        case "NMB_CHE_R":
          if (count>=1 ){count = 0}
          this.cheTagListArr[count]="Reservoir West Chamber Level"
          count++
          this.cheTagListArr[count]="Reservoir East Chamber Level"
          count++
          this.cheTagListArr[count]="Reservoir Summit 1200 mm Flow Rate"
          count++
          this.cheTagListArr[count]="Reservoir Summit 1200 mm Total Flow"
          count++
          this.cheTagListArr[count]="Reservoir Greenbushes 600 mm Flow Rate"
          count++
          this.cheTagListArr[count]="Reservoir Greenbushes 600 mm Total Flow"
          count++
          break;

          case "NMB_CHE_PS":
            if (count>=1 ){count = 0}
      this.chePSTagListArr[count]="Pumpstation 1 Actual Speed"
      count++
      this.chePSTagListArr[count]="Pumpstation 1 Delivery Pressure"
      count++
      this.chePSTagListArr[count]="Pumpstation 1 Suction Pressure"
      count++
      this.chePSTagListArr[count]="Pumpstation 2 Actual Speed"
      count++
      this.chePSTagListArr[count]="Pumpstation 2 Delivery Pressure"
      count++
      this.chePSTagListArr[count]="Pumpstation 2 Suction Pressure"
      count++
      this.chePSTagListArr[count]="Pumpstation 3 Actual Speed"
      count++
      this.chePSTagListArr[count]="Pumpstation 3 Delivery Pressure"
      count++
      this.chePSTagListArr[count]="Pumpstation 3 Suction Pressure"
      count++
      this.chePSTagListArr[count]="Pumpstation 4 Actual Speed"
      count++
      this.chePSTagListArr[count]="Pumpstation 4 Delivery Pressure"
      count++
      this.chePSTagListArr[count]="Pumpstation 4 Suction Pressure"
      count++
      this.chePSTagListArr[count]="Pumpstation 700 Flow Rate"
      count++
      this.chePSTagListArr[count]="Pumpstation 700 Total Flow"
      count++
            break;




        case "NMB_CHT_R":
          if (count>=1 ){count = 0}
          this.chtTagListArr[count]="North Chamber Level"
    count++
          this.chtTagListArr[count]="South Chamber Level"
    count++
          this.chtTagListArr[count]="Overhead Level"
    count++
    this.chtTagListArr[count]="Flow Rate"
    count++

break;
      case "TSI_STORMS_PS":
        if(count>=1){count = 0}
        this.stormsTagListArr[count]="Quarry Level"
    count++
        this.stormsTagListArr[count]="Gorge Level"
     count++

          break;


          case "KOU_KARK1_GW":
                if (count>=1 ){count = 0}
            this.karkTagListArr[count]= "K1 Total Flow"
          count++
            this.karkTagListArr[count]= "K1 Flow Rate"
          count++
          this.karkTagListArr[count]= "K1 Current"
          count++
            this.karkTagListArr[count]= "K1 Level"
          count++
            break;

            case "KOU_KARK2_GW":
              if (count >=4)
              {
                this.karkTagListArr[count]= "K2 Total Flow"
                count++
                  this.karkTagListArr[count]= "K2 Flow Rate"
                count++
                this.karkTagListArr[count]= "K2 Current"
                count++
                  this.karkTagListArr[count]= "K2 Level"
                count++
              }
             else {count = 0

          this.karkTagListArr[count]= "K2 Total Flow"
        count++
          this.karkTagListArr[count]= "K2 Flow Rate"
        count++
        this.karkTagListArr[count]= "K2 Current"
        count++
          this.karkTagListArr[count]= "K2 Level"
        count++
      }
          break;


          case"NMB_HUP_OFF_TAKE_FPT":
          if(count>=1){count=0}
          this.humOffTakeTagListArr[count]="Off Take Total Flow"
          count++;
          this.humOffTakeTagListArr[count]="Off Take Pressure"
          count++
          this.humOffTakeTagListArr[count]="Off Take Battery Level"
          count++;
          break;


          case "HUM_HUM_GW":
            if(count>=1){count=0}
            this.humGroundListArr[count]="Borehol Level"
            count++;
            this.humGroundListArr[count]="Raw Water Tank Level"
            count++;
            this.humGroundListArr[count]="Final Water Tank Level"
            count++;
            break;

          case"NMB_JEFF_BAY_OFF_TAKE_FPT":
          if(count>=1){count=0}
          this.jeffBayOffTakeTagListArr[count]="Off Take Total Flow"
          count++;
          this.jeffBayOffTakeTagListArr[count]="Off Take Battery Level"
          count++;

          break;

          case"NMB_KOU_MAIN_LINE_FPT":
          if(count>=1){count=0}
          this.kougaMainLineTagListArr[count]="Battery Level"
          count++;
          this.kougaMainLineTagListArr[count]="Pressure";
          count++
          break;

          case"NMB_ONS_PARA_FPT":
          if(count>=1){count=0}
          this.onsParadysTagListArr[count]="Total Flow"
          count++;
          this.onsParadysTagListArr[count]="Battery Level"
          count++;
          break;



        case "NMB_VRH_R":
          if (count>=1 ){count = 0}
          this.vrhTagListArr[count]="Delivery Level"
           count++
          this.vrhTagListArr[count]="Suction Level"
           count++
          break;

        case "NMB_GR_R":
          if (count>=1 ){count = 0}
          this.grTagListArr[count]="East Chamber Level"
          count++
          this.grTagListArr[count]="West Chamber Level"
          count++
          this.grTagListArr[count]="Inlet Flow"
          count++
          this.grTagListArr[count]="Outlet Flow"
          count++
          break;
        case "NMB_GB_R":
          if (count>=1 ){count = 0}
          this.gbTagListArr[count]="Reservoir Level"
           count++
          this.gbTagListArr[count]="Flow Rate"
          count++
          break;

          case "NMB_RD_R":
            if (count>=1 ){count = 0}
            this.rdTagListArr[count]="Reservoir Level"
            count++
            break;
            case "NMB_SM_R":
              if (count>=1 ){count = 0}
              this.smTagListArr[count]="Reservoir Level"
               count++
               this.smTagListArr[count]="Flow Rate"
               count++
              break;
          //FPT Sites
        case "NMB_FMT_FPT":
          if (count>=1 ){count = 0}
          this.fmtTagListArr[count]="Flow Rate"
    count++
          this.fmtTagListArr[count]="Pressure "
    count++
          this.fmtTagListArr[count]="Total Flow"
          count++
          break;
          case "NMB_CIDZT_FPT":
            if (count>=1 ){count = 0}
            this.cgkIDZTagListArr[count]="IDZ Flow Rate"
      count++
            this.cgkIDZTagListArr[count]="Motherwell Flow Rate"
      count++
            break;

            case "NMB_GBW_FPT":
              if (count>=1 ){count = 0}
              this.gbwTagListArr[count]="Pressure"
        count++
              this.gbwTagListArr[count]="Flow Rate"
        count++
              break;




          case "NMB_GT_BRG_FPT":
          if (count>=1 ){count = 0}
              this.gamtoosTagListArr[count]="Steel Pipe Flow Rate"
        count++
              this.gamtoosTagListArr[count]="Socoman Pipe Flow Rate"
        count++
              this.gamtoosTagListArr[count]="Steel Pipe Pressure"
        count++
              this.gamtoosTagListArr[count]="Socoman Pipe Pressure"
        count++
              break;

              case "NMB_UIT_FC_FPT":
                if (count>=1 ){count = 0}
                this.uitTagListArr[count]="Flow Rate"
          count++
                this.uitTagListArr[count]="Pressure"
          count++
                break;

                case "NMB_BETH_FPT":
                  if(count>=1){count = 0}
                  this.bethTagListArr[count] = "Battery Level"
                  count++
                  this.bethTagListArr[count]="Flow Rate"
                  count++
                  this.bethTagListArr[count] = "Pressure"
                  count++
                  this.bethTagListArr[count]="Total Flow"
                  count++
                  break;

          //Pump Stations
          case "NMB_STAN_R_PS":
            if (count>=1 ){count = 0}
            this.stanTagListArr[count]="Flow Rate"
          count++
            this.stanTagListArr[count]="Delivery Pressure"
          count++
            this.stanTagListArr[count]="Suction Pressure"
          count++
            this.stanTagListArr[count]="Pump 1 Frequency"
          count++
            this.stanTagListArr[count]="Pump 2 Frequency"
          count++
            this.stanTagListArr[count]="Pump 3 Frequency"
          count++
            this.stanTagListArr[count]="Pump 4 Frequency"
          count++
            break;

            case "NMB_MALI_R":
              if(count>=1){count = 0}
              this.maliTagListArr[count]="Reservoir Level";
              count++
              break;

          case "NMB_MW_PS":
            if (count>=1 ){count = 0}
                this.mwTagListArr[count]="Flow Rate"
          count++
                this.mwTagListArr[count]="Delivery Pressure"
          count++
          this.mwTagListArr[count]="Suction Pressure"
          count++
          this.mwTagListArr[count]="Total Flow"
          count++
          this.mwTagListArr[count]="Pump 1 Speed"
          count++
          this.mwTagListArr[count]="Pump 2 Speed"
          count++
          this.mwTagListArr[count]="Pump 3 Speed"
          count++
          this.mwTagListArr[count]="Pump 4 Speed"
          count++
                break;

                case "NMB_MW_R":
                  if (count>=1 ){count = 0}
                  this.mwrTagListArr[count]="North Chamber Level";
                  count++;
                  this.mwrTagListArr[count]="South Chamber Level";
                  count++;
                  break;



                      case "RW_CG_PS":
            if (count>=1 ){count = 0}
            this.cgTagListArr[count]="Suction Pressure"
            count++
            this.cgTagListArr[count]="Delivery Pressure"
            count++
            this.cgTagListArr[count]="Sump Level"
            count++
            this.cgTagListArr[count]="Tower 1 Level"
            count++
            this.cgTagListArr[count]="Tower 1 Inlet Flow"
           count++
            this.cgTagListArr[count]="Tower 1 Outlet Flow"
           count++
            this.cgTagListArr[count]="Tower 2 Level"
            count++
            this.cgTagListArr[count]="Tower 2 Inlet Flow"
            count++
            this.cgTagListArr[count]="Tower 2 Outlet Flow"
            count++
            break;

          case "NMU_NMU_EFF":
            if (count>=1 ){count = 0}
            this.effTagListArr[count]="Flow Rate"
            count++
            this.effTagListArr[count]="Delivery Pressure"
            count++
            this.effTagListArr[count]="Dam Level"
            count++
            this.effTagListArr[count]="Pump 1 Speed"
            count++
            this.effTagListArr[count]="Pump 2 Speed"
            count++
            this.effTagListArr[count]="Pump 3 Speed"
            count++
            this.effTagListArr[count]="Jockey Pump Speed"
            count++
            break;
       //Ground Water
      case "NMB_NPP_GW":
        if (count>=1 ){count = 0}
       this.npTagListArr[count]="Pressure"
       count++
       this.npTagListArr[count]="Flow Rate"
       count++
       this.npTagListArr[count]="Water Level"
       count++
      this.npTagListArr[count]="Total Flow"
        count++

       break;

       case "KLM_HUP_GW":
        if (count>=1 ){count = 0}
        this.hup1TagListArr[count] ="Flow Rate"
        count++
        this.hup1TagListArr[count] ="Water Level"
        count++
        this.hup1TagListArr[count] ="Total Flow"
        count++
         break
         case "KLM_HUP2_GW":
          if (count>=1 ){count = 0}
          this.hup2TagListArr[count] ="Flow Rate"
          count++
          this.hup2TagListArr[count] ="Water Level"
          count++
          this.hup2TagListArr[count] ="Total Flow"
          count++
           break
           case "KLM_HUP3_GW":
            if (count>=1 ){count = 0}
            this.hup3TagListArr[count] ="Flow Rate"
            count++
            this.hup3TagListArr[count] ="Water Level"
            count++
            this.hup3TagListArr[count] ="Total Flow"
            count++
             break
             case "KLM_HUP4_GW":
              if (count>=1 ){count = 0}
              this.hup4TagListArr[count] ="Flow Rate"
              count++
              this.hup4TagListArr[count] ="Water Level"
              count++
             this.hup4TagListArr[count] ="Total Flow"
              count++
               break
               case "KLM_HUP6_GW":
                if (count>=1 ){count = 0}
                this.hup6TagListArr[count] ="Flow Rate"
                count++
                this.hup6TagListArr[count] ="Water Level"
                count++
                this.hup6TagListArr[count] ="Total Flow"
                count++
                 break;


       //Water Treatment works
       case "NMB_NGT_WTW":
        if (count>=1 ){count = 0}
        this.ngtTagListArr[count]="High Level Flow Rate"
      count++
        this.ngtTagListArr[count]="Low Level Flow Rate"
      count++
        break;
        case "TSI_STORMS_WTW":
          if(count>=1){count = 0}
          this.stormsWTWTagListArr[count]="Holding Reservoir Level"
      count++
          this.stormsWTWTagListArr[count]="Overhead Tank Level"
       count++

            break;
     case "NMB_ELANDS_WTW":
       if(count>=1){count = 0}
       this.elandTagListArr[count]="Flow Rate"
      count++
       break;

      case "KLM_HUP_WTW":
        if(count>=1){count = 0}
        this.klmWtwInletListArr[count]="Flow Rate";
        count++
        this.klmWtwInletListArr[count]="Total Flow";
        count++

        break;

        case "NMB_KWANO_R":
          if(count>=1){count = 0}
          this.kwanoListArr[count]="Level";
          count++;
          this.kwanoListArr[count]="Flow Rate 1";
          count++;
          this.kwanoListArr[count]="Flow Rate 2";
          count++;
          this.kwanoListArr[count]="Total Flow 1";
          count++;
          this.kwanoListArr[count]="Total Flow 2";
          count++;
        break;


        case "NMB_LSD_ZS":
          if(count>=1){count = 0}
          this.LSDListArr[count]="Pressure";
          count++;
          this.LSDListArr[count]="Total Flow";
          count++;
          this.LSDListArr[count]="Flow Rate";
          count++;
          break;



          case "NMB_MNTS_ZS":
            if (count>=1 ){count = 0}
            this.MNTSListArr[count]="Pressure";
            count++;
            this.MNTSListArr[count]="Total Flow";
            count++;
            this.MNTSListArr[count]="Flow Rate";
            count++;
            break;

            case "NMB_RD_ZS":
              if (count>=1 ){count = 0}
              this.RPEListArr[count]="Total Flow";
              count++;
              this.RPEListArr[count]="Flow Rate";
              count++;
              break;

              case "NMB_RPE_ZS":
                if (count>=1 ){count = 0}
                this.RRListArr[count]="Pressure";
                count++;
                this.RRListArr[count]="Total Flow";
                count++;
                this.RRListArr[count]="Extension Flow Rate";
                count++;
              break;

        case "NMB_OLI_R":
          if(count>=1){count = 0}
          this.oliTagListArr[count]="Reservoir Level"
          count++
          break;

            case "NMB_BUSH_FPT":
              if(count>=1){count = 0}
              this.bushyFPTTagListArr[count]="Pumpstation Flow Rate";
              count++;
              this.bushyFPTTagListArr[count]="Pumpstation Total Flow";
              count++;
              this.bushyFPTTagListArr[count]="Combined Borehole Flow Rate";
              count++;
              this.bushyFPTTagListArr[count]="Combined Total Flow";
              count++;
              this.bushyFPTTagListArr[count]="Holding Tank Level";
              count++;
              this.bushyFPTTagListArr[count]="Soccoman Flow Rate"
              count++
              this.bushyFPTTagListArr[count]="Soccoman Pressure"
              count++
              this.bushyFPTTagListArr[count]="Soccoman Total Flow"
              count++
              this.bushyFPTTagListArr[count]="Steel Flow Rate"
              count++
              this.bushyFPTTagListArr[count]="Steel Pressure"
              count++
              this.bushyFPTTagListArr[count]="Steel Total Flow"
              count++
              break;

              case "NMB_LIN_WTW":
                if(count>=1){count = 0}
                this.LINTWTWListArr[count]="Back Wash Flow Rate"
                count++;
                this.LINTWTWListArr[count]="Back Wash Total Flow"
                count++;
                this.LINTWTWListArr[count]="Raw Water Flow Rate"
                count++;
                this.LINTWTWListArr[count]="Raw Water Total Flow"
                count++;
                this.LINTWTWListArr[count]="Final Water Flow Rate"
                count++;
                this.LINTWTWListArr[count]="Final Water Total Flow"
                count++;
                break;
                case "NMB_LIN_R":
                  if(count>=1){count = 0}
                  this.LINTRESListArr[count]="Level"
                  count++
                  break;

                  case "NMB_GLEN_R":
                    if(count>=1){count = 0}
                    this.GlenResListArr[count]="Level"
                    count++
                    break;

                    case "NMB_GLEN_FPT":
                      if(count>=1){count = 0}
                      this.GlenFPTListArr[count]="Inlet Pressure"
                      count++
                      this.GlenFPTListArr[count]="Inlet Flow Rate"
                      count++
                      this.GlenFPTListArr[count]="Inlet Total Flow"
                      count++
                      this.GlenFPTListArr[count]="Borehole Flow Rate"
                      count++
                      this.GlenFPTListArr[count]="Borehole Total Flow"
                      count++
                      break;

                      case "NMB_GLEN_WTW":
                        if(count>=1){count = 0}
                        this.GlenWTWListArr[count]="Pump 1 Run Time";
                        count++;
                        this.GlenWTWListArr[count]="Pump 2 Run Time";
                        count++;
                        this.GlenWTWListArr[count]="Pump 1 Number Of Starts";
                        count++;
                        this.GlenWTWListArr[count]="Pump 2 Number Of Starts";
                        count++;
                        this.GlenWTWListArr[count]="Potential of Hydrogen";
                        count++;
                        this.GlenWTWListArr[count]="Oxidation Reduction Potential";
                        count++;
                        break;
    }
      }
   }


   getSelected($resp:any){

   }

   emptySelected(){
    this.emerTagsSelected=[]
    this.bhbTagsSelected=[];
    this.chtTagsSelected=[];
    this.cheTagsSelected=[];
    this.driftTagsSelected=[]
    this.cgkTagsSelected=[];
    this.cgkIDZTagsSelected=[];
    this.cgTagsSelected=[];
    this.fmtTagsSelected=[];
    this.gamtoosTagsSelected=[];
    this.grTagsSelected=[];
    this.oliTagSelected=[];
    this.bushyFPTSelected = [];
    this.gbTagsSelected=[];
    this.hbTagsSelected=[];
    this.bhpTagsSelected=[]
    this.lhTagsSelected=[];
    this.mwTagsSelected=[];
    this.mwrTagsSelected=[];
   this. npTagsSelected=[];
    this.effTagsSelected=[];
    this.ngtTagsSelected=[];
    this.rdTagsSelected=[];
    this.stanTagsSelected=[];
    this.maliTagsSelected = [];
    this.smTagsSelected=[];
    this.thTagsSelected=[];
    this.uitTagsSelected=[];
    this.vrhTagsSelected=[];
    this.vsTagsSelected=[];
    this.bethTagSelected=[];
    this.humGroundSelected=[];
    this.hup1TagSelected=[];
    this.hup2TagSelected=[];
    this.hup3TagSelected=[];
    this.hup4TagSelected=[];
    this.hup6TagSelected=[];
    this.stormsTagSelected=[];
    this.stormsWTWTagSelected=[];
    this.elandTagSelected=[];
    this.bergenTagsSelected=[];
    this.wolwasTagsSelected=[];
    this.umiTagsSelected=[];
    this.kroonTagsSelected=[];
    this.tinroofTagsSelected=[];
    this.damcampTagsSelected=[];
    this.holdingTagsSelected=[];
    this.jeffBayOffTakeSelected=[];
    this.humOffTakeSelected=[];
    this.klmWtwInletSelected=[];
    this.kwanoSelected=[];
    this.selectedTags=[];
  
   }


   ReadSelectedValues(arr:string[],selectedArr:boolean[], name:string){
    for (let i = 0; i < arr.length; i++) {
  
      if(selectedArr[i]==true){
        this.selectedTags[this.count]= name + arr[i]
        this.count++;
      }
    }
  }

}
