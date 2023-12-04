import { Component, Inject,HostListener, OnInit,Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TrendPickerService } from '../trendpicker.service';
import { HttpClient } from '@angular/common/http';
import { ServerURLService } from 'src/app/Service-Files/server-url.service';
import { RouterModule } from '@angular/router';
import{siteData} from 'src/app/class/trendpicker';
import { ngxCsv } from 'ngx-csv';

// import { TrendV2 } from "src/app/class/trendpicker_v2";
import { Common } from 'src/app/class/common';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  name: string;
  min: number;
  max: number;
  average: number;
}
@Component({
  selector: 'app-demo-trend',
  templateUrl: './demo-trend.component.html',
  styleUrls: ['./demo-trend.component.css']
})
export class DemoTrendComponent implements OnInit {
 
  showDownloadButton:any

  isLoading: boolean = false;
  options: any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
newStart:any
newEnd:any

public authListenerSubs!: Subscription;
userSites:string[];

  Sites = new FormControl();
  SitesList: string[] = [];

  Right = new FormControl();


////////////////////////////////////// Site Data Arrays





    filterValue: any="";
    ELEMENT_DATA: PeriodicElement[] = [];
    displayedColumns :string[]= ['name','min', 'max', 'average'];
//List for selection
    dataSource:any;


  Preset = new FormControl();
  PresetList: string[] = [];
  selectedSites:any[][]=[]
  rightSelectedSites:any[][]=[]
  userEmail: string;
  count: any;
  numTags: any;

  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;

  isShow: boolean;
  topPosToStartShowing = 100;


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

    schoeArr:any[]=["Schoemanshoek Pressure","Schoemanshoek Level","Schoemanshoek Actuator Position","Schoemanshoek Actuator Set Point","Schoemanshoek Actuator Valve Feedback Signal","Schoemanshoek Actuator Valve Command Signal","Schoemanshoek Reservoir Level Signal Error","Schoemanshoek Actuator Valve Fault","Schoemanshoek Actuator Valve Torque Fail Close","Schoemanshoek Actuator Valve Torque Fail Open","Schoemanshoek General Fault","Schoemanshoek Actuator General Fault","Schoemanshoek Actuator Valve Timeout"];
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

    driftArr:any[]=["Driftsands Reservoir Level","Driftsands Flow Rate 1","Driftsands Flow Rate 2","Driftsands Total Flow 1","Driftsands Total Flow 2"];
    driftTagListArr:string[]=[];
    driftTagsSelected:boolean[]=[];

    cheArr:any[]=["Chelsea Reservoir West Chamber Level","Chelsea Reservoir East Chamber Level","Chelsea Reservoir Summit 1200 mm Flow Rate","Chelsea Reservoir Summit 1200 mm Total Flow", "Chelsea Reservoir Greenbushes 600 mm Flow Rate","Chelsea Reservoir Greenbushes 600 mm Total Flow"];
    cheTagListArr:string[]=[];
    cheTagsSelected:boolean[]=[];

    chePSArr:any[]=["Chelsea Pumpstation 1 Actual Speed","Chelsea Pumpstation 1 Delivery Pressure","Chelsea Pumpstation 1 Suction Pressure","Chelsea Pumpstation 2 Actual Speed","Chelsea Pumpstation 2 Delivery Pressure","Chelsea Pumpstation 2 Suction Pressure","Chelsea Pumpstation 3 Actual Speed","Chelsea Pumpstation 3 Delivery Pressure","Chelsea Pumpstation 3 Suction Pressure", "Chelsea Pumpstation 4 Actual Speed","Chelsea Pumpstation 4 Delivery Pressure","Chelsea Pumpstation 4 Suction Pressure","Chelsea Pumpstation 700 Flow Rate","Chelsea Pumpstation 700 Total Flow"]
    chePSTagListArr:string[]=[];
    chePSTagsSelected:boolean[]=[];

    gbwArr:any[]=["Gamtoos Break Water Pressure","Gamtoos Break Water Flow Rate"];
    gbwTagListArr:string[]=[];
    gbwTagsSelected:boolean[]=[];

    cgkArr:any[]=["Coega Kop Reservoir Pressure","Coega Kop Inlet Chamber 2 Ml","Coega Kop to Coega IDZ Flow Rate","Coega Kop to Motherwell Flow Rate","Coega Kop from Grassridge Flow Rate","Coega Kop from Grassridge Total Flow","Coega Kop to Coega IDZ Total Flow","Coega Kop to Motherwell Total Flow","Coega IDZ Outlet Total Flow to Coega Kop Reservoir","Coega Kop North Chamber 17 Ml"]
    cgkTagListArr:string[]=[];
    cgkTagsSelected:boolean[]=[];

    stGeorgeArr:any[]=["St Georges Borehole Flow Rate","St Georges Borehole Total Flow","St Georges Emerald Hill Flow Rate","St Georges Emerald Hill Total Flow"];
    stGeorgeTagListArr:string[]=[]
    stGeorgeTagsSelected:boolean[]=[];

    bergenArr:any[]=["Bergendal Reservoir Level"];
    bergenTagListArr:string[]=[]
    bergenTagsSelected:boolean[]=[];

    wolwasArr:any[]=["Wolwas Reservoir Level"];
    wolwasTagListArr:string[]=[]
    wolwasTagsSelected:boolean[]=[];

    umiArr:any[]=["Umasizakhe Reservoir Level"];
    umiTagListArr:string[]=[]
    umiTagsSelected:boolean[]=[];

    kroonArr:any[]=["Kroonvale Reservoir Level"];
    kroonTagListArr:string[]=[]
    kroonTagsSelected:boolean[]=[];

    tinroofArr:any[]=["Tin Roof Reservoir Level"];
    tinroofTagListArr:string[]=[]
    tinroofTagsSelected:boolean[]=[];

    damcampArr:any[]=["Damcamp Reservoir Level"];
    damcampTagListArr:string[]=[]
    damcampTagsSelected:boolean[]=[];

    holdingArr:any[]=["Holding Reservoir Level"];
    holdingTagListArr:string[]=[]
    holdingTagsSelected:boolean[]=[];

    cgkIDZArr:any[]=["Coega IDZ Flow Rate","Coega Motherwell Flow Rate"];
    cgkIDZTagListArr:string[]=[];
    cgkIDZTagsSelected:boolean[]=[];

    cgArr:any[]=["Crown Gardens Suction Pressure","Crown Gardens Delivery Pressure","Crown Gardens Sump Level","Crown Gardens Tower 1 Level","Crown Gardens Tower 1 Inlet Flow","Crown Gardens Tower 1 Outlet Flow","Crown Gardens Tower 2 Level","Crown Gardens Tower 2 Inlet Flow","Crown Gardens Tower 2 Outlet Flow"];
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
    bethTagListArr:string[]=[]
    bethTagSelected:boolean[]=[]

    hup1Arr:any[]=["HD1 Flow Rate","HD1 Water Level","HD1 Water Total Flow"];
    hup1TagListArr:string[]=[]
    hup1TagSelected:boolean[]=[]

    hup2Arr:any[]=["HD2C Flow Rate","HD2C Water Level", "HD2C Water Total Flow"];
    hup2TagListArr:string[]=[]
    hup2TagSelected:boolean[]=[]

    hup3Arr:any[]=["HD3 Flow Rate", "HD3 Water Level", "HD3 Water Total Flow"];
    hup3TagListArr:string[]=[]
    hup3TagSelected:boolean[]=[]

    hup4Arr:any[]=["HD4 Flow Rate","HD4 Water Level", "HD4 Water Total Flow"];
    hup4TagListArr:string[]=[]
    hup4TagSelected:boolean[]=[]

    hup6Arr:any[]=["HD6 Flow Rate","HD6 Water Level", "HD6 Water Total Flow"];
    hup6TagListArr:string[]=[]
    hup6TagSelected:boolean[]=[]

    stormsArr:any[]=["Storms River Quarry Level","Storms River Gorge Level"];
    stormsTagListArr:string[]=[]
    stormsTagSelected:boolean[]=[]

    karkArr:any[]=[ "Kareedouw K1 Total Flow","Kareedouw K1 Flow Rate","Kareedouw K1 Current", "Kareedouw K1 Level","Kareedouw K2 Total Flow", "Kareedouw K2 Flow Rate","Kareedouw K2 Current", "Kareedouw K2 Level"];
    karkTagListArr:string[]=[];
    karkTagSelected:boolean[]=[];

    humGroundArr:any[]=["Humerail Borehol Level","Humerail Raw Water Tank Level","Humerail Final Water Tank Level"];
    humGroundListArr:string[]=[]
    humGroundSelected:boolean[]=[]

    humOffTakeArr:any[]=["Humansdorp Off Take Total Flow","Humansdorp Off Take Pressure","Humansdorp Off Take Battery Level"];
    humOffTakeTagListArr:string[]=[]
    humOffTakeSelected:boolean[]=[]

    jeffBayOffArr:any[]=["Jeffreys Bay Off Take Total Flow","Jeffreys Bay Off Take Battery Level"];
    jeffBayOffTakeTagListArr:string[]=[]
    jeffBayOffTakeSelected:boolean[]=[]

    kougaMainLineArr:any[]=["Kouga Main Line Battery Level","Kouga Main Line Pressure"];
    kougaMainLineTagListArr:string[]=[]
    kougaMainLineSelected:boolean[]=[]

    onsParadysArr:any[]=["Ons Paradys Total Flow","Ons Paradys Battery Level"];
    onsParadysTagListArr:string[]=[]
    onsParadysSelected:boolean[]=[]

    stormsWTWArr:any[]=["Storms River Holding Reservoir Level","Storms River Overhead Tank Level"]
    stormsWTWTagListArr:string[]=[]
    stormsWTWTagSelected:boolean[]=[]

    oliArr:any[]=["Olifantskop Reservoir Level"]
    oliTagListArr:string[]=[]
    oliTagSelected:boolean[]=[]

    bushyFPTArr:any[]=[ "Bushy Park Pumpstation Flow Rate","Bushy Park Pumpstation Total Flow","Bushy Park Combined Borehole Flow Rate","Bushy Park Combined Total Flow", "Bushy Park Holding Tank Level", "Bushy Park Soccoman Flow Rate", "Bushy Park Soccoman Pressure","Bushy Park Soccoman Total Flow","Bushy Park Steel Flow Rate", "Bushy Park Steel Pressure","Bushy Park Steel Total Flow"]
    bushyFPTTagListArr:string[]=[];
    bushyFPTSelected:boolean[]=[];

  selectedTags:string[]=[]
  rightSelectedTags:string[]

    elandArr:any[]=["Elandsjagt Flow Rate", "Elandsjagt Pressure"]
    elandTagListArr:string[]=[]
    elandTagSelected:boolean[]=[]

    klmArr:any[]=["Humansdorp Inlet Flow Rate","Humansdorp Inlet Total Flow"]
    klmWtwInletListArr:string[]=[]
    klmWtwInletSelected:boolean[]=[]

    kwanoArr:any[]=[ "Kwanobuhle Reservoir Level","Kwanobuhle Reservoir Flow Rate 1","Kwanobuhle Reservoir Flow Rate 2","Kwanobuhle Reservoir Total Flow 1","Kwanobuhle Reservoir Total Flow 2"]
    kwanoListArr:string[]=[]
    kwanoSelected:boolean[]=[]

    LSDArr:any[]=[ "Lee Samuals Drive Pressure","Lee Samuals Drive Total Flow", "Lee Samuals Drive Flow Rate"]
    LSDListArr:string[]=[]
    LSDSelected:boolean[]=[]

    MNTArr:any[]=["McNoughton Township South Pressure","McNoughton Township South Total Flow","McNoughton Township South Flow Rate"]
    MNTSListArr:string[]=[]
    MNTSSelected:boolean[]=[]

    RPEArr:any[]=["Rosedale Reservoir Total Flow","Rosedale Reservoir Flow Rate"]
    RPEListArr:string[]=[]
    RPESelected:boolean[]=[]

    RRArr:any[]=["Rowallan Park Extension Pressure","Rowallan Park Extension Total Flow","Rowallan Park Extension Flow Rate"]
    RRListArr:string[]=[]
    RRSelected:boolean[]=[]

    LINTWTWArr:any[]=["Linton Back Wash Flow Rate", "Linton Back Wash Total Flow","Linton Raw Water Flow Rate","Linton Raw Water Total Flow","Linton Final Water Flow Rate","Linton Final Water Total Flow"]
    LINTWTWListArr:string[]=[]
    LINTWTWSelected:boolean[]=[]

    LINTRESArr:any[]=["Linton Reservoir Level"]
    LINTRESListArr:string[]=[]
    LINTRESSelected:boolean[]=[]

    GlenResArr:any[]=["Glendinningvale Reservoir Level"]
    GlenResListArr:string[]=[]
    GlenResSelected:boolean[]=[]
    
    GlenFPTArr:any[]=["Glendinningvale Inlet Pressure","Glendinningvale Inlet Flow Rate","Glendinningvale Inlet Total Flow","Glendinningvale Borehole Flow Rate","Glendinningvale Borehole Total Flow"]
    GlenFPTListArr:string[]=[]
    GlenFPTSelected:boolean[]=[]

    GlenWTWArr:any[]=["Glendinningvale Pump 1 Run Time","Glendinningvale Pump 2 Run Time","Glendinningvale Pump 1 Number Of Starts","Glendinningvale Pump 2 Number Of Starts","Glendinningvale Potential of Hydrogen","Glendinningvale Oxidation Reduction Potential"]
    GlenWTWListArr:string[]=[]
    GlenWTWSelected:boolean[]=[]


    siteData:any = siteData;

  constructor(private su: ServerURLService,private http: HttpClient,private tps:TrendPickerService,public dialog: MatDialog ,public rs: ReportService,public authService: AuthService, private renderer: Renderer2,private datePipe: DatePipe) {

    this.showDownloadButton = false
    window.addEventListener("load", () => {
      const button = document.getElementById("export");
      if (button) {
        button.style.display = "none";
      }
    });
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }



    this.userSites = this.authService.getUserSites();
    this.userEmail = this.authService.getUserEmail()
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
      this.userEmail = this.authService.getUserEmail()
    })

// Get Values from Manual Select
     this.selectedTags=this.tps.selectedTags
     this.rightSelectedTags=this.tps.rightSelectedTags


    this.http.post(this.su.serverURL+"/get-user-preset-names", {userEmail:this.userEmail}).subscribe(
      (data:any)=>{
        if(data.record)

       
        for (let i = 0; i < data.record.length; i++) {
          this.PresetList[i] = data.record[i].presetName
           this.selectedSites.push(data.record[i].selectedSites)
           this.rightSelectedSites.push(data.record[i].rightSelectedSites)
        }
      },
      err=>{
        console.log(err)
       } )
  }

  ngOnInit() {








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





  onTrendFilter(){
    this.isLoading=true;
    /////////////////////// initialize Right axis varibles
    this.RightAxisConfiguration()
//////////////////////////////////////////// Date Configuration
     this.DateConfiguration();
////////////////////////////////////////////
    var trend :any;

    let seriesData = []
    let sendingData = []
    let minMaxAvgData = []

    if (this.selectedTags) {
      for(let i = 0; i < this.selectedTags.length; i++){
        if(this.selectedTags[i] in this.siteData){
          sendingData.push(this.siteData[this.selectedTags[i]])
        }
   
      }
    
     

      this.rs.GetTrend_Sites(sendingData,this.newStart,this.newEnd).then((data) => {

     trend= data

     seriesData = this.returnSeriesData(trend.trendArr)

     minMaxAvgData = this.returnAverageMinMax(trend.trendArr)


      this.buildAxis(seriesData)

      console.log(this.objMap)


     //this.variable = TrendPicker.getRouteDataForTrendPicker(data,this.variable,trendArray)

   


     this.showDownloadButton = true
     const button = document.getElementById("export");
     if (button) {
       button.style.display = "block";
     }



      this.TrendInfoTable(minMaxAvgData)
      const {theme, tooltipBackground} = Common.getTheme();



    this.options = {
      grid: {
        left: '6%',
        right: '7%',
        top:'10%',
        bottom: '10%',
        containLabel: true
    },
    toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},

    dataZoom:[{

    type: 'slider',
    start: 0,
    end: 100,
    paddingTop:'10px',
    handleSize: 8

    },
    { start: 0,
     end:100}
    ],
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
      axisPointer: {
        type: 'cross'
      },
       trigger: 'axis',

       position: ['10%', '10%']

     },
      legend:{
        //bottom: 'bottom',
        data: this.selectedTags,
          top:'auto',
    type:'scroll',
    textStyle: {color:theme },
             },
             axisPointer:{

                  color: {color: theme}

             },

      xAxis: {
        type: 'time'  ,
        axisLabel: {color: theme},
        splitLine: {
          show: true
        },
      },
      yAxis: [
        {
          axisLabel: {color: theme},
        type: 'value',
        boundaryGap: [0, 0.05],
        },
        {
          axisLabel: {color: theme},
        type: 'value',
        boundaryGap: [0, 0.05],
        }

    ],

    //reservoir
    series:seriesData
    };

     this.isLoading=false;

    })

  }

}

onPresetSelect(resp:any){

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
  this.bethTagSelected=[]
  this.humGroundSelected=[]
  this.hup1TagSelected=[]
  this.hup2TagSelected=[]
  this.hup3TagSelected=[]
  this.hup4TagSelected=[]
  this.hup6TagSelected=[]
  this.stormsTagSelected=[]
  this.stormsWTWTagSelected=[]
  this.elandTagSelected=[]
  this.bergenTagsSelected=[]
  this.wolwasTagsSelected=[]
  this.umiTagsSelected=[]
  this.kroonTagsSelected=[]
  this.tinroofTagsSelected=[];
  this.damcampTagsSelected=[];
  this.holdingTagsSelected=[];
  this.jeffBayOffTakeSelected=[];
  this.humOffTakeSelected=[]
  this.klmWtwInletSelected=[]
  this.kwanoSelected=[]
  this.selectedTags=[]

var pName = resp.value

  for (let i = 0; i < this.PresetList.length; i++) {

if(pName ==this.PresetList[i]){
for (let m = 0; m < this.selectedSites[i].length; m++) {

  switch(this.selectedSites[i][m]){

    case "Kruisfontein Borhole 12 Level":
      this.kruis12GWSelected[0] = true;
      break;

      case "Kruisfontein Borhole 12 Current":
        this.kruis12GWSelected[1] = true;
        break;

      case "Kruisfontein Borhole 12 Pressure":
        this.kruis12GWSelected[2] = true;
        break;

        case "Kruisfontein Borhole 12 Flow Rate":
          this.kruis12GWSelected[3] = true;
          break;

          case "Kruisfontein Borhole 12 Total Flow":
            this.kruis12GWSelected[4] = true;
            break;

            case "Isuzu Oven 1 VSD Speed":
              this.isuzuSelected[0] = true;
              break;

            case "Isuzu Oven 1 Heat Exchanger Temperature":
              this.isuzuSelected[1] = true;
              break;

            case "Isuzu Oven 1 Temperature 1":
              this.isuzuSelected[2] = true;
              break;

            case "Isuzu Oven 1 Temperature 2":
              this.isuzuSelected[3] = true;
              break;

              case "Isuzu Oven 2 VSD Speed":
              this.isuzuSelected[4] = true;
              break;

              case "Isuzu Oven 2 Heat Exchanger Temperature":
              this.isuzuSelected[5] = true;
              break;

              case "Isuzu Oven 2 Temperature 1":
              this.isuzuSelected[6] = true;
              break;

              case "Isuzu Oven 2 Temperature 2":
              this.isuzuSelected[7] = true;
              break;

              case "Airport Reservoir Level":
                this.airPortSelected[0] = true;
                break;

            case "Kruisfontein Reservoir Level":
              this.kruisRSelected[0] = true;
              break;

            case "Kruisfontein Borhole 13 Level":
              this.kruis13GWSelected[0] = true;
              break;

              case "Kruisfontein Borhole 13 Current":
                this.kruis13GWSelected[1] = true;
                break;

              case "Kruisfontein Borhole 13 Pressure":
                this.kruis13GWSelected[2] = true;
                break;

                case "Kruisfontein Borhole 13 Flow Rate":
                  this.kruis13GWSelected[3] = true;
                  break;

      case "Kruisfontein Borhole 13 Total Flow":
        this.kruis13GWSelected[4] = true;
        break;


      case "Kruisfontein Borhole 14 Level":
        this.kruis14GWSelected[0] = true;
        break;

      case "Kruisfontein Borhole 14 Current":
        this.kruis14GWSelected[1] = true;
        break;

      case "Kruisfontein Borhole 14 Pressure":
        this.kruis14GWSelected[2] = true;
        break;

      case "Kruisfontein Borhole 14 Flow Rate":
        this.kruis14GWSelected[3] = true;
        break;

      case "Kruisfontein Borhole 14 Total Flow":
        this.kruis14GWSelected[4] = true;
        break;


    //Reservoir

    case "Coega Kop Reservoir Pressure":  this.cgkTagsSelected[0]=true
    break;
    case "Coega Kop Inlet Chamber 2 Ml":  this.cgkTagsSelected[1]=true
    break;
    case "Coega Kop to Coega IDZ Flow Rate":  this.cgkTagsSelected[2]=true
    break;
    case "Coega Kop to Motherwell Flow Rate": this.cgkTagsSelected[3]=true
    break;
    case "Coega Kop from Grassridge Flow Rate": this.cgkTagsSelected[4]=true
    break;
    case "Coega Kop from Grassridge Total Flow":this.cgkTagsSelected[5]=true
    break;
    case "Coega Kop to Coega IDZ Total Flow":this.cgkTagsSelected[6]=true
    break;
    case "Coega Kop to Motherwell Total Flow": this.cgkTagsSelected[7]=true
    break;
    case "Coega IDZ Outlet Total Flow to Coega Kop Reservoir" : this.cgkTagsSelected[8]=true
    break;
    case "Coega Kop North Chamber 17 Ml" : this.cgkTagsSelected[9]=true
    break;



    

             case "Bushy Park Pumpstation Flow Rate":
               this.bushyFPTSelected[0] = true;
               break;

             case "Bushy Park Pumpstation Total Flow":
               this.bushyFPTSelected[1] = true;
               break;

            case "Bushy Park Combined Borehole Flow Rate":
              this.bushyFPTSelected[2] = true;
              break;

            case "Bushy Park Combined Total Flow":
              this.bushyFPTSelected[3] = true;
              break;

    case "Bushy Park Holding Tank Level":
      this.bushyFPTSelected[4] = true;
      break;


    case "Bushy Park Soccoman Flow Rate":
    this.bushyFPTSelected[5] = true;
    break;

    case  "Bushy Park Soccoman Pressure":
      this.bushyFPTSelected[6] = true;
      break;

    case "Bushy Park Soccoman Total Flow":
      this.bushyFPTSelected[7] = true;
      break;

  case "Bushy Park Steel Flow Rate":
   this.bushyFPTSelected[8] = true;
   break;

  case "Bushy Park Steel Pressure":
  this.bushyFPTSelected[9] = true;
  break;


 case "Bushy Park Steel Total Flow":
   this.bushyFPTSelected[10] = true;
   break;



case "Olifantskop Reservoir Level":
  this.oliTagSelected[0]=true
  break;

  case "Greenbushes Reservoir Level":
    this.gbTagsSelected[0]=true
  break;

  case "Greenbushes Flow Rate":
    this.gbTagsSelected[1]=true
  break;

  case "Emerald Hill Reservoir Level":
    this.emerTagsSelected[0]=true;
    break;

    case "Emerald Hill Flow Rate":
      this.emerTagsSelected[1]=true;
      break;

      case "Emerald Hill Total Flow":
        this.emerTagsSelected[2]=true;
        break;

  case "Blue Horizon Bay Reservoir Level":
    this.bhbTagsSelected[0]=true
  break;


  case"St Georges Borehole Flow Rate":
  this.stGeorgeTagsSelected[0] = true;
  break;

  case"St Georges Borehole Total Flow":
  this.stGeorgeTagsSelected[1] = true;
  break;

  case"St Georges Emerald Hill Flow Rate":
  this.stGeorgeTagsSelected[2] = true;
  break;

    case"St Georges Emerald Hill Total Flow":
    this.stGeorgeTagsSelected[3] = true;
  break;


  case "Driftsands Reservoir Level":
    this.driftTagsSelected[0]=true;
    break;

    case "Driftsands Flow Rate 1":
      this.driftTagsSelected[1]=true;
      break;

      case "Driftsands Flow Rate 2":
        this.driftTagsSelected[2]=true;
        break;


        case "Driftsands Total Flow 1":
          this.driftTagsSelected[3]=true;
          break;

          case "Driftsands Total Flow 2":
            this.driftTagsSelected[4]=true;
            break;


            case "Schoemanshoek Pressure":
              this.schoeTagsSelected[0]=true;
              break;

              case "Schoemanshoek Level":
              this.schoeTagsSelected[1]=true;
              break;

              case "Schoemanshoek Actuator Position":
              this.schoeTagsSelected[2]=true;
              break;

              case "Schoemanshoek Actuator Set Point":
              this.schoeTagsSelected[3]=true;
              break;

              case "Schoemanshoek Actuator Valve Feedback Signal":
                this.schoeTagsSelected[4]=true;
                break;

                case "Schoemanshoek Actuator Valve Command Signal":
                this.schoeTagsSelected[5]=true;
                break;

                case "Schoemanshoek Reservoir Level Signal Error":
                this.schoeTagsSelected[6]=true;
                break;

                case "Schoemanshoek Actuator Valve Fault":
                this.schoeTagsSelected[7]=true;
                break;

                case "Schoemanshoek Actuator Valve Torque Fail Close":
                this.schoeTagsSelected[8]=true;
                break;

                case "Schoemanshoek Actuator Valve Torque Fail Open":
                  this.schoeTagsSelected[9]=true;
                break;

                case "Schoemanshoek General Fault":
                  this.schoeTagsSelected[10]=true;
                break;

                case "Schoemanshoek Actuator General Fault":
                  this.schoeTagsSelected[11]=true;
                  break;

                 case "Schoemanshoek Actuator Valve Timeout":
                   this.schoeTagsSelected[12]=true;
                   break;


  case "Chelsea Reservoir West Chamber Level":
          this.cheTagsSelected[0]=true
        break;

        case "Chelsea Reservoir East Chamber Level":
          this.cheTagsSelected[1]=true
        break;

        case "Chelsea Reservoir Summit 1200 mm Flow Rate":
          this.cheTagsSelected[2]=true
          break;

        case "Chelsea Reservoir Summit 1200 mm Total Flow":
          this.cheTagsSelected[3]=true
          break;

        case "Chelsea Reservoir Greenbushes 600 mm Flow Rate":
          this.cheTagsSelected[4]=true
          break;

        case "Chelsea Reservoir Greenbushes 600 mm Total Flow":
          this.cheTagsSelected[5]=true
          break;

        case "Chelsea Pumpstation 1 Actual Speed":
          this.chePSTagsSelected[0]=true
        break;

        case "Chelsea Pumpstation 1 Delivery Pressure":
          this.chePSTagsSelected[1]=true
        break;
        case "Chelsea Pumpstation 1 Suction Pressure":
          this.chePSTagsSelected[2]=true
        break;
        case "Chelsea Pumpstation 2 Actual Speed":
          this.chePSTagsSelected[3]=true
        break;

        case "Chelsea Pumpstation 2 Delivery Pressure":
          this.chePSTagsSelected[4]=true
        break;
        case "Chelsea Pumpstation 2 Suction Pressure":
          this.chePSTagsSelected[5]=true
        break;

        case "Chelsea Pumpstation 3 Actual Speed":
          this.chePSTagsSelected[6]=true
        break;

        case "Chelsea Pumpstation 3 Delivery Pressure":
          this.chePSTagsSelected[7]=true
        break;
        case "Chelsea Pumpstation 3 Suction Pressure":
          this.chePSTagsSelected[8]=true
        break;
        case "Chelsea Pumpstation 4 Actual Speed":
          this.chePSTagsSelected[9]=true
        break;

        case "Chelsea Pumpstation 4 Delivery Pressure":
          this.chePSTagsSelected[10]=true
        break;
        case "Chelsea Pumpstation 4 Suction Pressure":
          this.chePSTagsSelected[11]=true
        break;
        case "Chelsea Pumpstation 700 Flow Rate":
          this.chePSTagsSelected[12]=true;
          break;

          case "Chelsea Pumpstation 700 Total Flow":
            this.chePSTagsSelected[13] = true;
            break;


      case "Gamtoos Break Water Pressure":
        this.gbwTagsSelected[0]=true;
        break;

        case "Gamtoos Break Water Flow Rate":
          this.gbwTagsSelected[1]=true;
          break;

  case "Grassridge East Chamber Level":
    this.grTagsSelected[0]=true
  break;
  case "Grassridge West Chamber Level":
    this.grTagsSelected[1]=true
  break;
  case "Grassridge Inlet Flow":
    this.grTagsSelected[2]=true
  break;
  case "Grassridge Outlet Flow":
    this.grTagsSelected[3]=true
  break;

  case "Van Stadens Reservoir Level":
    this.vsTagsSelected[0]=true
  break;

  case "Chatty North Chamber Level":
  this.chtTagsSelected[0]=true
  break;

  case "Chatty South Chamber Level":
  this.chtTagsSelected[1]=true
  break;

  case "Chatty Overhead Level":
  this.chtTagsSelected[2]=true
  break;

  case "Chatty Flow Rate":
  this.chtTagsSelected[3]=true
  break;


  case "Van Riebeeck Hoogte Delivery Level":
    this.vrhTagsSelected[0]=true
  break;
  case "Van Riebeeck Hoogte Suction Level":
    this.vrhTagsSelected[1]=true
  break;

  case "Heatherbank Reservoir Level":
    this.hbTagsSelected[0]=true
  break;

  case "Heatherbank Pumpstation 1 Current":
    this.bhpTagsSelected[0]=true;
    break;

    case "Heatherbank Pumpstation 2 Current":
      this.bhpTagsSelected[1]=true;
    break;

    case "Heatherbank Pumpstation 3 Current":
      this.bhpTagsSelected[2]=true;
    break;

    case "Heatherbank Pumpstation 1 Run Hours":
      this.bhpTagsSelected[3]=true;
      break;

      case "Heatherbank Pumpstation 2 Run Hours":
        this.bhpTagsSelected[4]=true;
      break;

      case "Heatherbank Pumpstation 3 Run Hours":
        this.bhpTagsSelected[5]=true;
      break;
  case "Lovemore Heights Reservoir Level":
    this.lhTagsSelected[0]=true
  break;

  case "Lovemore Heights Overhead Tank":
    this.lhTagsSelected[1]=true
  break;

  case "Theescombe Reservoir Level":
    this.thTagsSelected[0]=true
  break;

  case "Rosedale Reservoir Level":
    this.rdTagsSelected[0]=true
  break;

  case "Summit Reservoir Level":
    this.smTagsSelected[0]=true
  break;
  case "Summit Flow Rate":
    this.smTagsSelected[1]=true
  break;

  case "Bergendal Reservoir Level":
    this.bergenTagsSelected[0] =true;
    break

    case "Wolwas Reservoir Level":
      this.wolwasTagsSelected[0] =true;
      break



    case "Humerail Borehol Level":
      this.humGroundSelected[0] = true;
      break;

    case "Humerail Raw Water Tank Level":
      this.humGroundSelected[1] = true;
      break;

    case "Humerail Final Water Tank Level":
      this.humGroundSelected[2] = true;
      break;


      case "Jeffreys Bay Off Take Total Flow":
        this.jeffBayOffTakeSelected[0] = true;
        break;

        case "Jeffreys Bay Off Take Battery Level":
          this.jeffBayOffTakeSelected[1] = true;
          break;


          case "Humansdorp Off Take Total Flow":
            this.humOffTakeSelected[0]=true;
            break;


            case "Humansdorp Off Take Pressure":
              this.humOffTakeSelected[1]=true;
              break;

              case "Humansdorp Off Take Battery Level":
                this.humOffTakeSelected[2]=true;
                break;



      case "Umasizakhe Reservoir Level":
        this.umiTagsSelected[0] =true;
    break

    case "Kroonvale Reservoir Level":
      this.kroonTagsSelected[0] =true;
      break

      case "Holding Reservoir Level":
        this.holdingTagsSelected[0] = true;
        break;

     case "Damcamp Reservoir Level":
      this.damcampTagsSelected[0] = true;
       break;

    case "Tin Roof Reservoir Level":
      this.tinroofTagsSelected[0]=true;
       break;
  //FPT Sites
  case "FM Tower Flow Rate":
    this.fmtTagsSelected[0]=true
  break;
  case "FM Tower Pressure":
    this.fmtTagsSelected[1]=true
  break;
case "FM Tower Total Flow":
  this.fmtTagsSelected[2]=true
  break;
  case "Coega IDZ Flow Rate":
    this.cgkIDZTagsSelected[0]=true
  break;
  case "Coega Motherwell Flow Rate":
    this.cgkIDZTagsSelected[1]=true
  break;

  case "Gamtoos Bridge Steel Pipe Flow Rate":
    this.gamtoosTagsSelected[0]=true
  break;
  case "Gamtoos Bridge Socoman Pipe Flow Rate":
    this.gamtoosTagsSelected[1]=true
  break;
  case "Gamtoos Bridge Steel Pipe Pressure":
    this.gamtoosTagsSelected[2]=true
  break;
  case "Gamtoos Bridge Socoman Pipe Pressure":
    this.gamtoosTagsSelected[3]=true
  break;


  case "Uitenhage FC Flow Rate":
    this.uitTagsSelected[0]=true
  break;
  case "Uitenhage FC Pressure":
    this.uitTagsSelected[1]=true
  break;


  case "Bethelsdorp Battery Level":
    this.bethTagSelected[0]=true;
    break;

  case "Bethelsdorp Flow Rate":
    this.bethTagSelected[1]= true;
    break;

  case "Bethelsdorp Pressure":
    this.bethTagSelected[2] = true;
    break;

  case "Bethelsdorp Total Flow":
    this.bethTagSelected[3] = true ;
    break;

    case "Kareedouw K1 Total Flow":
      this.karkTagSelected[0] = true;
      break;

    case "Kareedouw K1 Flow Rate":
      this.karkTagSelected[1] = true;
      break;

    case "Kareedouw K1 Current":
      this.karkTagSelected[2] = true;
      break;

    case "Kareedouw K1 Level":
      this.karkTagSelected[3] = true;
      break;

    case "Kareedouw K2 Total Flow":
      this.karkTagSelected[4] = true;
      break;

    case "Kareedouw K2 Flow Rate":
      this.karkTagSelected[5] = true;
      break;

    case "Kareedouw K2 Current":
      this.karkTagSelected[6] = true;
      break;

    case "Kareedouw K2 Level":
      this.karkTagSelected[7] = true;
      break;
  //Pump Station Sites

  case"Storms River Quarry Level":
  this.stormsTagSelected[0]=true
  break;

  case"Storms River Gorge Level":
  this.stormsTagSelected[1]=true
  break;

  case "Storms River Holding Reservoir Level":
    this.stormsWTWTagSelected[0]=true
    break;

case "Storms River Overhead Tank Level":
  this.stormsWTWTagSelected[1]=true
  break;

  case"Crown Gardens Suction Pressure":
this.cgTagsSelected[0]=true
  break;
  case"Crown Gardens Delivery Pressure":
  this.cgTagsSelected[1]=true
  break;
  case"Crown Gardens Sump Level":
  this.cgTagsSelected[2]=true
  break;
  case"Crown Gardens Tower 1 Level":
  this.cgTagsSelected[3]=true
  break;
  case"Crown Gardens Tower 1 Inlet Flow":
  this.cgTagsSelected[4]=true
  break;
  case"Crown Gardens Tower 1 Outlet Flow":
  this.cgTagsSelected[5]=true
  break;
  case"Crown Gardens Tower 2 Level":
  this.cgTagsSelected[6]=true
  break;
  case"Crown Gardens Tower 2 Inlet Flow":
  this.cgTagsSelected[7]=true
  break;
  case"Crown Gardens Tower 2 Outlet Flow":
  this.cgTagsSelected[8]=true
  break;

  case"NMU Effluent Flow Rate":
  this.effTagsSelected[0]=true;
  break;
  case"NMU Effluent Delivery Pressure":
  this.effTagsSelected[1]=true;
  break;
  case"NMU Effluent Dam Level":
  this.effTagsSelected[2]=true;
  break;
  case"NMU Effluent Pump 1 Speed":
  this.effTagsSelected[3]=true;
  break;
  case"NMU Effluent Pump 2 Speed":
  this.effTagsSelected[4]=true;
  break;
  case"NMU Effluent Pump 3 Speed":
  this.effTagsSelected[5]=true;
  break;
  case"NMU Effluent Jockey Pump Speed":
  this.effTagsSelected[6]=true;
  break;

  case "Motherwell Flow Rate":
    this.mwTagsSelected[0]=true;
    break;
    case "Motherwell Delivery Pressure":
      this.mwTagsSelected[1]=true;
    break;
    case "Motherwell Suction Pressure":
      this.mwTagsSelected[2]=true;
  break;

  case "Motherwell Total Flow":
    this.mwTagsSelected[3]=true;
    break;

    case "Motherwell Pump 1 Speed":
      this.mwTagsSelected[4]=true;
    break;

    case "Motherwell Pump 2 Speed":
       this.mwTagsSelected[5]=true;
    break;

    case "Motherwell Pump 3 Speed":
       this.mwTagsSelected[6]=true;
      break;

      case "Motherwell Pump 4 Speed":
         this.mwTagsSelected[7]=true;
      break;

    case "Motherwell Reservoir North Chamber Level":
          this.mwrTagsSelected[0] = true;
      break;

      case "Motherwell Reservoir South Chamber Level":
            this.mwrTagsSelected[1] = true;
      break;


  // Stanford Road
  case "Stanford Road Flow Rate":this.stanTagsSelected[0]=true;
  break;
  case "Stanford Road Delivery Pressure":this.stanTagsSelected[1]=true;
  break;
  case "Stanford Road Suction Pressure":this.stanTagsSelected[2]=true;
  break;
  case "Stanford Road Pump 1 Frequency":this.stanTagsSelected[3]=true;
  break;
  case "Stanford Road Pump 2 Frequency":this.stanTagsSelected[4]=true
  break;
  case "Stanford Road Pump 3 Frequency":this.stanTagsSelected[5]=true;
  break;
  case "Stanford Road Pump 4 Frequency":this.stanTagsSelected[6]=true;
  break;

  case "Malabar Reservoir Level":this.maliTagsSelected[0] = true;
  break;


  //Ground Water
  case "Newton Park Pool Pressure":
    this.npTagsSelected[0]=true;
  break;
  case "Newton Park Pool Flow Rate":
    this.npTagsSelected[1]=true;
  break;
  case "Newton Park Pool Water Level":
    this.npTagsSelected[2]=true;
  break;
  case "Newton Park Pool Total Flow":
    this.npTagsSelected[3]=true;
    break;


    case "HD1 Flow Rate":
      this.hup1TagSelected[0]=true;
    break;
    case "HD1 Water Level":
      this.hup1TagSelected[1]=true;
    break;
    case "HD1 Water Total Flow":
      this.hup1TagSelected[2]=true;
    break;

    case "HD2C Flow Rate":
      this.hup2TagSelected[0]=true;
    break;
    case "HD2C Water Level":
      this.hup2TagSelected[1]=true;
    break;

    case "HD2C Water Total Flow":
      this.hup2TagSelected[2]=true;
    break;
    case "HD3 Flow Rate":
      this.hup3TagSelected[0]=true;
    break;
    case "HD3 Water Level":
      this.hup3TagSelected[1]=true;
    break;
    case "HD3 Water Total Flow":
      this.hup3TagSelected[2]=true;
    break;

    case "HD4 Flow Rate":
      this.hup4TagSelected[0]=true;
    break;
    case "HD4 Water Level":
      this.hup4TagSelected[1]=true;
    break;

    case "HD4 Water Total Flow":
      this.hup4TagSelected[2]=true;
    break;
    case "HD6 Flow Rate":
      this.hup6TagSelected[0]=true;
    break;
    case "HD6 Water Level":
      this.hup6TagSelected[1]=true;
    break;
    case "HD6 Water Total Flow":
      this.hup6TagSelected[2]=true;
    break;


  //WTW
  case "Nooitgedacht High Level Flow Rate":
    this.ngtTagsSelected[0]=true
  break;

  case "Nooitgedacht Low Level Flow Rate":
    this.ngtTagsSelected[1]=true
  break;

case "Humansdorp Inlet Flow Rate":
  this.klmWtwInletSelected[0] = true;
  break;

  case "Humansdorp Inlet Total Flow":
  this.klmWtwInletSelected[1] = true;
  break;


  case "Elandsjagt Flow Rate":
    this.elandTagSelected[0]=true
    break;
    case "Elandsjagt Pressure":
      this.elandTagSelected[1]=true
      break;

      case "Kwanobuhle Reservoir Level":
        this.kwanoSelected[0] = true;
        break;

      case "Kwanobuhle Reservoir Flow Rate 1":
        this.kwanoSelected[1] = true;
        break;

      case "Kwanobuhle Reservoir Flow Rate 2":
        this.kwanoSelected[2] = true;
        break;

      case "Kwanobuhle Reservoir Total Flow 1":
        this.kwanoSelected[3] = true;
        break;

      case "Kwanobuhle Reservoir Total Flow 2":
        this.kwanoSelected[4] = true;
        break;


        case "Lee Samuals Drive Pressure":
          this.LSDSelected[0] = true;
          break;

        case "Lee Samuals Drive Total Flow":
          this.LSDSelected[1] = true;
          break;

        case "Lee Samuals Drive Flow Rate":
          this.LSDSelected[2] = true;
          break;



          case "McNoughton Township South Pressure":
            this.MNTSSelected[0] = true;
            break;

          case "McNoughton Township South Total Flow":
            this.MNTSSelected[1] = true;
            break;

          case "McNoughton Township South Flow Rate":
            this.MNTSSelected[2] = true;
            break;


            case "Rosedale Reservoir Total Flow":
              this.RPESelected[0] = true;
              break;

              case "Rosedale Reservoir Flow Rate":
                this.RPESelected[1] = true;
                break;



                case "Rowallan Park Extension Pressure":
                  this.RRSelected[0] = true;
                  break;

                  case "Rowallan Park Extension Total Flow":
                    this.RRSelected[1] = true;
                    break;


                    case "Rowallan Park Extension Flow Rate":
                    this.RRSelected[2] = true;
                    break;

                    case "Linton Back Wash Flow Rate":
                      this.LINTWTWSelected[0]=true;
                      break;

                      case "Linton Back Wash Total Flow":
                        this.LINTWTWSelected[1]=true;
                      break;

                      case "Linton Raw Water Flow Rate":
                        this.LINTWTWSelected[2]=true;
                      break;

                      case "Linton Raw Water Total Flow":
                        this.LINTWTWSelected[3]=true;
                      break;

                      case "Linton Final Water Flow Rate":
                        this.LINTWTWSelected[4]=true;
                      break;

                      case "Linton Final Water Total Flow":
                        this.LINTWTWSelected[5]=true;
                      break;


                      case "Linton Reservoir Level":
                        this.LINTRESSelected[0]=true;
                        break;


                        case "Glendinningvale Reservoir Level":
                          this.GlenResSelected[0]=true;
                          break;


                          case "Glendinningvale Inlet Pressure":
                            this.GlenFPTSelected[0]=true;
                            break;

                            case "Glendinningvale Inlet Flow Rate":
                            this.GlenFPTSelected[1]=true;
                            break;


                            case "Glendinningvale Inlet Total Flow":
                            this.GlenFPTSelected[2]=true;
                            break;

                            case "Glendinningvale Borehole Flow Rate":
                            this.GlenFPTSelected[3]=true;
                            break;
   
                            case "Glendinningvale Borehole Total Flow":
                            this.GlenFPTSelected[4]=true;
                            break;


                            case "Glendinningvale Pump 1 Run Time":
                            this.GlenWTWSelected[0]=true;
                            break;

                            case "Glendinningvale Pump 2 Run Time":
                            this.GlenWTWSelected[1]=true;
                            break;

                            case "Glendinningvale Pump 1 Number Of Starts":
                            this.GlenWTWSelected[2]=true;
                            break;

                            case "Glendinningvale Pump 2 Number Of Starts":
                            this.GlenWTWSelected[3]=true;
                            break;

                            case "Glendinningvale Potential of Hydrogen":
                            this.GlenWTWSelected[4]=true;
                            break;

                            case "Glendinningvale Oxidation Reduction Potential":
                            this.GlenWTWSelected[5]=true;
                            break;

  }}


}


}

for (let i = 0; i < this.PresetList.length; i++) {

if(pName ==this.PresetList[i]){
  this.tps.rightSelectedTags = this.rightSelectedSites[i]
}
}


this.count = 0
// Reservoirs
this.ReadSelectedValues(this.isuzuTagListArr, this.isuzuSelected, "Isuzu Oven ");
this.ReadSelectedValues(this.kruisRTagListArr, this.kruisRSelected, "Kruisfontein ");
this.ReadSelectedValues(this.airPortTagListArr, this.airPortSelected, "Airport ");
this.ReadSelectedValues(this.kruis12GWTagListArr, this.kruis12GWSelected, "Kruisfontein Borhole 12 ");
this.ReadSelectedValues(this.kruis13GWTagListArr, this.kruis13GWSelected, "Kruisfontein Borhole 13 ");
this.ReadSelectedValues(this.kruis14GWTagListArr, this.kruis14GWSelected, "Kruisfontein Borhole 14 ");
this.ReadSelectedValues(this.stGeorgeTagListArr, this.stGeorgeTagsSelected, "St Georges ");
this.ReadSelectedValues(this.emerTagListArr,this.emerTagsSelected, "Emerald Hill ");
this.ReadSelectedValues(this.bhbTagListArr,this.bhbTagsSelected, "Blue Horizon Bay ");
this.ReadSelectedValues(this.chtTagListArr,this.chtTagsSelected, "Chatty ");
this.ReadSelectedValues(this.driftTagListArr,this.driftTagsSelected,"Driftsands ");
this.ReadSelectedValues(this.cheTagListArr,this.cheTagsSelected, "Chelsea ");
this.ReadSelectedValues(this.cgkTagListArr,this.cgkTagsSelected, "Coega Kop ");
this.ReadSelectedValues(this.grTagListArr,this.grTagsSelected, "Grassridge ");
this.ReadSelectedValues(this.oliTagListArr,this.oliTagSelected,"Olifantskop ");
this.ReadSelectedValues(this.bushyFPTTagListArr, this.bushyFPTSelected, "Bushy Park ");
this.ReadSelectedValues(this.gbTagListArr,this.gbTagsSelected, "Greenbushes ");
this.ReadSelectedValues(this.hbTagListArr,this.hbTagsSelected, "Heatherbank ");
this.ReadSelectedValues(this.hbpTagListArr,this.bhpTagsSelected, "Heatherbank Pumpstation ");
this.ReadSelectedValues(this.lhTagListArr,this.lhTagsSelected, "Lovemore Heights ");
this.ReadSelectedValues(this.rdTagListArr,this.rdTagsSelected, "Rosedale ");
this.ReadSelectedValues(this.schoeTagListArr,this.schoeTagsSelected, "Schoemanshoek ");
this.ReadSelectedValues(this.smTagListArr,this.smTagsSelected, "Summit ");
this.ReadSelectedValues(this.thTagListArr,this.thTagsSelected, "Theescombe ");
this.ReadSelectedValues(this.vrhTagListArr,this.vrhTagsSelected, "Van Riebeeck Hoogte ");
this.ReadSelectedValues(this.vsTagListArr,this.vsTagsSelected, "Van Stadens ");
this.ReadSelectedValues(this.effTagListArr,this.effTagsSelected, "NMU Effluent ");
this.ReadSelectedValues(this.bergenTagListArr,this.bergenTagsSelected, "Bergendal ");
this.ReadSelectedValues(this.wolwasTagListArr,this.wolwasTagsSelected, "Wolwas ");
this.ReadSelectedValues(this.umiTagListArr,this.umiTagsSelected, "Umasizakhe ");
this.ReadSelectedValues(this.kroonTagListArr,this.kroonTagsSelected, "Kroonvale ");
this.ReadSelectedValues(this.holdingTagListArr,this.holdingTagsSelected, "Holding ");
this.ReadSelectedValues(this.damcampTagListArr,this.damcampTagsSelected, "Damcamp ");
this.ReadSelectedValues(this.tinroofTagListArr,this.tinroofTagsSelected, "Tin Roof ");
this.ReadSelectedValues(this.cgTagListArr,this.cgTagsSelected, "Crown Gardens ");
this.ReadSelectedValues(this.mwTagListArr,this.mwTagsSelected, "Motherwell ");
this.ReadSelectedValues(this.mwrTagListArr, this.mwrTagsSelected, "Motherwell Reservoir ");
this.ReadSelectedValues(this.stanTagListArr,this.stanTagsSelected, "Stanford Road ");
this.ReadSelectedValues(this.stormsTagListArr, this.stormsTagSelected, "Storms River ");
this.ReadSelectedValues(this.chePSTagListArr,this.chePSTagsSelected, "Chelsea ");
this.ReadSelectedValues(this.karkTagListArr, this.karkTagSelected,"Kareedouw ");
this.ReadSelectedValues(this.maliTagListArr,  this.maliTagsSelected, "Malabar ");
this.ReadSelectedValues(this.gbwTagListArr,this.gbwTagsSelected, "Gamtoos Break Water ");
this.ReadSelectedValues(this.cgkIDZTagListArr,this.cgkIDZTagsSelected, "Coega ");
this.ReadSelectedValues(this.fmtTagListArr,this.fmtTagsSelected, "FM Tower ");
this.ReadSelectedValues(this.gamtoosTagListArr,this.gamtoosTagsSelected, "Gamtoos Bridge ");
this.ReadSelectedValues(this.uitTagListArr,this.uitTagsSelected, "Uitenhage Flow Chamber ");
this.ReadSelectedValues(this.bethTagListArr,this.bethTagSelected, "Bethelsdorp ");
this.ReadSelectedValues(this.humGroundListArr, this.humGroundSelected, "Humerail ");
this.ReadSelectedValues(this.humOffTakeTagListArr,this.humOffTakeSelected,"Humansdorp ");
this.ReadSelectedValues(this.jeffBayOffTakeTagListArr,this.jeffBayOffTakeSelected,"Jeffreys Bay ");
this.ReadSelectedValues(this.kougaMainLineTagListArr,this.kougaMainLineSelected,"Kouga Main Line ");
this.ReadSelectedValues(this.onsParadysTagListArr,this.onsParadysSelected,"Ons Paradys ");
this.ReadSelectedValues(this.npTagListArr,this.npTagsSelected, "Newton Park Pool ");
this.ReadSelectedValues(this.hup1TagListArr,this.hup1TagSelected, "HD1 ");
this.ReadSelectedValues(this.hup2TagListArr,this.hup2TagSelected, "HD2C ");
this.ReadSelectedValues(this.hup3TagListArr,this.hup3TagSelected, "HD3 ");
this.ReadSelectedValues(this.hup4TagListArr,this.hup4TagSelected, "HD4 ");
this.ReadSelectedValues(this.hup6TagListArr,this.hup6TagSelected, "HD6 ");
this.ReadSelectedValues(this.ngtTagListArr,this.ngtTagsSelected, "Nooitgedacht ");
this.ReadSelectedValues(this.stormsWTWTagListArr, this.stormsWTWTagSelected, "Storms River ");
this.ReadSelectedValues(this.elandTagListArr,this.elandTagSelected, "Elandsjagt ");
this.ReadSelectedValues(this.klmWtwInletListArr , this.klmWtwInletSelected, "Humansdorp Inlet ");
this.ReadSelectedValues(this.kwanoListArr, this.kwanoSelected, "Kwanobuhle Reservoir ");
this.ReadSelectedValues(this.LSDListArr,this.LSDSelected,"Lee Samuals Drive " );
this.ReadSelectedValues(this.GlenResListArr,this.GlenResSelected,"Glendinningvale Reservoir " );
this.ReadSelectedValues(this.GlenFPTListArr,this.GlenFPTSelected,"Glendinningvale " );
this.ReadSelectedValues(this.GlenWTWListArr,this.GlenWTWSelected,"Glendinningvale " );
this.ReadSelectedValues(this.LINTRESListArr,this.LINTRESSelected,"Linton Reservoir " );
this.ReadSelectedValues(this.LINTWTWListArr,this.LINTWTWSelected,"Linton " );
this.ReadSelectedValues(this.MNTSListArr,this.MNTSSelected,"McNoughton Township South ");
this.ReadSelectedValues(this.RRListArr,this.RRSelected,"Rowallan Park Extension " );
this.ReadSelectedValues(this.RPEListArr,this.RPESelected,"Rosedale Reservoir " );
// console.log( this.selectedTags)
  }

  TrendInfoTable(sitesChosen:any[]){
    this.dataSource=[];
    this.dataSource = new MatTableDataSource();
    this.ELEMENT_DATA=[];
    
    for(var i = 0; i < sitesChosen.length;i++)
    {
      this.ELEMENT_DATA[i]={ name: sitesChosen[i].name,min:sitesChosen[i].min,max:sitesChosen[i].max,average:sitesChosen[i].avg};
    }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.filter = this.filterValue.trim().toLowerCase();
    }


       MinMaxAvg(m:any, siteArray:any[]){
        var maxValues=[]
          var minValues=[]
          var avgValues=[]
            var avg: any = 0
      maxValues[m] = siteArray[0][1]
      minValues[m] = siteArray[0][1]
      avgValues[m] = siteArray[0][1]

      for (let i = 0; i < siteArray.length; i++) {

      if (maxValues[m]<siteArray[i][1]) {
      maxValues[m] = siteArray[i][1]
      }
      if (minValues[m]>siteArray[i][1]) {
      minValues[m] = siteArray[i][1]
      }

      avg  = siteArray[i][1] + avg
      }
      avg = (avg/siteArray.length).toFixed(2)
      avgValues[m]=avg

      var arr =[minValues[m],maxValues[m],avg]
      return arr
   }

   //trying to find right axis values.  It will go through the thing with a hashmap.
RightAxisConfiguration(){

 if(this.tps.rightSelectedTags!=null){

  for (var i = 0; i < this.tps.rightSelectedTags.length;i++)
  {
    let rightSelect:string = this.tps.rightSelectedTags[i]

    if(rightSelect in this.siteData)
    {
      this.siteData[rightSelect].yAxisIndex = 1;
    }
    else 
    {
      console.log("This value was not found");
    }

  }
  }
}

returnSeriesData(array:any[]){

  let series = []

  for(let i = 0; i < array.length; i++){
    series.push({name: array[i].name, yAxisIndex:array[i].yAxisIndex, data:array[i].data,   smooth: true,   type: 'line',showSymbol: false,hoverAnimation: true,});
  }


  return series

}

returnAverageMinMax(array:any[]){

  let series = [];



  let localArray:any = []
  let localArray2:any = []

  let column

  for(let i = 0; i < array.length; i++){

    //Array[i].data is a 2d Array.
    localArray = array[i].data;


    for(let j = 0; j < localArray[0].length; j++){
     column = localArray.map((row: any[]) => row[j]);
    }

    // Convert strings to numbers
    let numberArray = column.map((value: string) => parseFloat(value));

    // Calculate average
    let avg = (numberArray.reduce((a:number, b:number) => a + b, 0)) / numberArray.length;
    
    let min = Math.min(...numberArray)

    let max = Math.max(...numberArray)
  
     series.push({name: array[i].name, min:min.toFixed(2), max:max.toFixed(2), avg:avg.toFixed(2)})
  }

  return series;
}


DateConfiguration(){
  var start = this.range.value.start;
  var end = this.range.value.end;

  if (start!=null && end!=null){

  const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);


  this.newStart = start
  this.newEnd = end
  }
}

 ReadSelectedValues(arr:string[],selectedArr:boolean[], name:string){
  for (let i = 0; i < arr.length; i++) {

    if(selectedArr[i]==true){
      this.selectedTags[this.count]= name + arr[i]
      this.count++;
    }
  }
}

siteVariableMap:any
objMap = new Map<string, object>();
async buildAxis(dataStructure: any) {
  let objMap = new Map<string, object>();

  for (let i = 0; i < dataStructure.length; i++) {
    objMap.set(dataStructure[i].name, dataStructure[i].data);
  }

  this.objMap = objMap;
}

 handleClick() {
  this.isLoading = true;

  interface AxisMap {
    [key: string]: any;
  }

  let fileInfo;


  for (let i = 0; i < this.selectedTags.length; i++) {
    const siteName = this.selectedTags[i];


    const arr = this.objMap.get(this.selectedTags[i]);



    if (!arr) {
      throw new Error(`Invalid site name: ${siteName}`);
    }



    const options = {
      title: 'User Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      headers: ['Date', 'Value'],
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
    };

    fileInfo = new ngxCsv(arr, siteName, options);
  }

  this.isLoading = false;
}

convertDateTime(inputDateTime: any) {
  // Use Angular's DatePipe for consistent date formatting
  return this.datePipe.transform(inputDateTime, 'dd/MM/yyyy HH:mm:ss') || '';
}
}