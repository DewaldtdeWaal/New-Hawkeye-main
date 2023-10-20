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
import{trendArray,variables,TrendPicker,axisValues, siteVariableMap} from 'src/app/class/trendpicker';
import { ngxCsv } from 'ngx-csv';

export interface PeriodicElement {
  name: string;
  min: number;
  max: number;
  average: number;
}

@Component({
  selector: 'app-trendpicker-v2',
  templateUrl: './trendpicker-v2.component.html',
  styleUrls: ['./trendpicker-v2.component.css']
})

export class TrendpickerV2Component implements OnInit {

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


variable:any = variables;




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


  isuzuTagListArr:string[]=[];
  isuzuSelected:boolean[]=[];



  airPortTagListArr:string[]=[];
  airPortSelected:boolean[]=[];


    kruisRTagListArr:string[]=[];
    kruisRSelected:boolean[]=[];

    kruis12GWTagListArr:string[]=[];
    kruis12GWSelected:boolean[]=[];

    kruis13GWTagListArr:string[]=[];
    kruis13GWSelected:boolean[]=[];

    kruis14GWTagListArr:string[]=[];
    kruis14GWSelected:boolean[]=[];

    schoeTagListArr:string[]=[];
    schoeTagsSelected:boolean[]=[];

    emerTagListArr:string[]=[];
    emerTagsSelected:boolean[]=[];

    bhbTagListArr:string[]=[];
    bhbTagsSelected:boolean[]=[];

    chtTagListArr:string[]=[];
    chtTagsSelected:boolean[]=[];

    driftTagListArr:string[]=[];
    driftTagsSelected:boolean[]=[];

    cheTagListArr:string[]=[];
    cheTagsSelected:boolean[]=[];

    chePSTagListArr:string[]=[];
    chePSTagsSelected:boolean[]=[];

    gbwTagListArr:string[]=[];
    gbwTagsSelected:boolean[]=[];

    cgkTagListArr:string[]=[];
    cgkTagsSelected:boolean[]=[];

    stGeorgeTagListArr:string[]=[]
    stGeorgeTagsSelected:boolean[]=[];

    bergenTagListArr:string[]=[]
    bergenTagsSelected:boolean[]=[];

    wolwasTagListArr:string[]=[]
    wolwasTagsSelected:boolean[]=[];

    umiTagListArr:string[]=[]
    umiTagsSelected:boolean[]=[];

    kroonTagListArr:string[]=[]
    kroonTagsSelected:boolean[]=[];

    tinroofTagListArr:string[]=[]
    tinroofTagsSelected:boolean[]=[];

    damcampTagListArr:string[]=[]
    damcampTagsSelected:boolean[]=[];

    holdingTagListArr:string[]=[]
    holdingTagsSelected:boolean[]=[];

    cgkIDZTagListArr:string[]=[];
    cgkIDZTagsSelected:boolean[]=[];

    cgTagListArr:string[]=[];
    cgTagsSelected:boolean[]=[];

    fmtTagListArr:string[]=[];
    fmtTagsSelected:boolean[]=[];

    gamtoosTagListArr:string[]=[];
    gamtoosTagsSelected:boolean[]=[];

    grTagListArr:string[]=[];
    grTagsSelected:boolean[]=[];

    gbTagListArr:string[]=[];
    gbTagsSelected:boolean[]=[];

    hbTagListArr:string[]=[];
    hbTagsSelected:boolean[]=[];

    hbpTagListArr:string[]=[];
    bhpTagsSelected:boolean[]=[];

    lhTagListArr:string[]=[];
    lhTagsSelected:boolean[]=[];

    mwTagListArr:string[]=[];
    mwTagsSelected:boolean[]=[];

    mwrTagListArr:string[]=[]
    mwrTagsSelected:boolean[]=[]

    npTagListArr:string[]=[];
    npTagsSelected:boolean[]=[];

    effTagListArr:string[]=[];
    effTagsSelected:boolean[]=[];

    ngtTagListArr:string[]=[];
    ngtTagsSelected:boolean[]=[];

    rdTagListArr:string[]=[];
    rdTagsSelected:boolean[]=[];

    stanTagListArr:string[]=[];
    stanTagsSelected:boolean[]=[];

    maliTagListArr:string[]=[];
    maliTagsSelected:boolean[]=[];

    smTagListArr:string[]=[];
    smTagsSelected:boolean[]=[];

    thTagListArr:string[]=[];
    thTagsSelected:boolean[]=[];

    uitTagListArr:string[]=[];
    uitTagsSelected:boolean[]=[];

    vrhTagListArr:string[]=[];
    vrhTagsSelected:boolean[]=[];

    vsTagListArr:string[]=[];
    vsTagsSelected:boolean[]=[];

    bethTagListArr:string[]=[]
    bethTagSelected:boolean[]=[]

    hup1TagListArr:string[]=[]
    hup1TagSelected:boolean[]=[]

    hup2TagListArr:string[]=[]
    hup2TagSelected:boolean[]=[]

    hup3TagListArr:string[]=[]
    hup3TagSelected:boolean[]=[]

    hup4TagListArr:string[]=[]
    hup4TagSelected:boolean[]=[]

    hup6TagListArr:string[]=[]
    hup6TagSelected:boolean[]=[]

    stormsTagListArr:string[]=[]
    stormsTagSelected:boolean[]=[]

    karkTagListArr:string[]=[];
    karkTagSelected:boolean[]=[];

    humGroundListArr:string[]=[]
    humGroundSelected:boolean[]=[]

    humOffTakeTagListArr:string[]=[]
    humOffTakeSelected:boolean[]=[]

    jeffBayOffTakeTagListArr:string[]=[]
    jeffBayOffTakeSelected:boolean[]=[]

    kougaMainLineTagListArr:string[]=[]
    kougaMainLineSelected:boolean[]=[]

    onsParadysTagListArr:string[]=[]
    onsParadysSelected:boolean[]=[]

    paraStFrancTagListArr:string[]=[]
    paraStFrancSelected:boolean[]=[]

    stormsWTWTagListArr:string[]=[]
    stormsWTWTagSelected:boolean[]=[]

    oliTagListArr:string[]=[]
    oliTagSelected:boolean[]=[]

    bushyPSTagListArr:string[]=[];
    bushyPSSelected:boolean[]=[];

    bushyFPTTagListArr:string[]=[];
    bushyFPTSelected:boolean[]=[];

  selectedTags:string[]=[]
  rightSelectedTags:string[]

    elandTagListArr:string[]=[]
    elandTagSelected:boolean[]=[]


    klmWtwInletListArr:string[]=[]
    klmWtwInletSelected:boolean[]=[]

    kwanoListArr:string[]=[]
    kwanoSelected:boolean[]=[]

    LSDListArr:string[]=[]
    LSDSelected:boolean[]=[]

    MNTSListArr:string[]=[]
    MNTSSelected:boolean[]=[]


    RPEListArr:string[]=[]
    RPESelected:boolean[]=[]

    RRListArr:string[]=[]
    RRSelected:boolean[]=[]



  constructor(private su: ServerURLService,private http: HttpClient,private tps:TrendPickerService,public dialog: MatDialog ,public rs: ReportService,public authService: AuthService, private renderer: Renderer2) {


    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;


      console.log("c")
      console.log(c)
      console.log("c")
      if(c > 0){
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8)
      }
    }



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
                break;

                case "NMB_MW_R":
                  if (count>=1 ){count = 0}
                  this.mwrTagListArr[count]="Reservoir Level"
                  count++
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
                 break
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

          case "NMB_BUSH_PS":
            if(count>=1){count = 0}
            this.bushyPSTagListArr[count]="Soccoman Flow Rate"
            count++
            this.bushyPSTagListArr[count]="Soccoman Pressure"
            count++
            this.bushyPSTagListArr[count]="Soccoman Total Flow"
            count++
            this.bushyPSTagListArr[count]="Steel Flow Rate"
            count++
            this.bushyPSTagListArr[count]="Steel Pressure"
            count++
            this.bushyPSTagListArr[count]="Steel Total Flow"
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
              break;




    }
      }
  }





  onTrendFilter(){
    this.isLoading=true;
    /////////////////////// initialize Right axis varibles
    this.RightAxisConfiguration(axisValues)
//////////////////////////////////////////// Date Configuration
     this.DateConfiguration();
////////////////////////////////////////////
    var trend :any;
    if (this.selectedTags==null || this.selectedTags==undefined)
    {}
    else{


      this.rs.GetTrend_Sites(this.selectedTags,this.newStart,this.newEnd).then((data) => {



     trend= data
     this.variable = TrendPicker.getRouteDataForTrendPicker(data,this.variable,trendArray)

     console.log(this.variable)


     this.showDownloadButton = true
     const button = document.getElementById("export");
     if (button) {
       button.style.display = "block";
     }


console.log(this.selectedTags)
      this.TrendInfoTable(this.selectedTags)
       var theme:any
       var tooltipBackground:any
       var countD =0 ;
       var countL =0 ;
          if (localStorage.getItem("theme") == "dark-theme")
       {
         theme = '#FFFFFF'
         tooltipBackground = 'rgba(50,50,50,0.7)'
         countD++
         countL=0
  if (countD==1) {}
       }else if (localStorage.getItem("theme") == "light-theme")
       {
       theme = '#797979'
       tooltipBackground = 'rgba(255, 255, 255, 1)'
       countL++
       countD=0
       if (countL==1) {}
    }



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
    series: [
      {
        name: 'Isuzu Oven 1 VSD Speed',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.isuzu_oven1_vsd_speed_arr,
        smooth: true,
        yAxisIndex:axisValues.isuzu_oven1_vsd_speed_axis,
        },
        {
          name: 'Isuzu Oven 1 Heat Exchanger Temperature',
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data: this.variable.isuzu_oven1_heat_ecvh_temp_arr,
          smooth: true,
          yAxisIndex:axisValues.isuzu_oven1_heat_ecvh_temp_axis,
          },
          {
            name: 'Isuzu Oven 1 Temperature 1',
            type: 'line',
            showSymbol: false,
            hoverAnimation: true,
            data: this.variable.isuzu_oven1_temp1_arr,
            smooth: true,
            yAxisIndex:axisValues.isuzu_oven1_temp1_axis,
            },
            {
              name: 'Isuzu Oven 1 Temperature 2',
              type: 'line',
              showSymbol: false,
              hoverAnimation: true,
              data: this.variable.isuzu_oven1_temp2_arr,
              smooth: true,
              yAxisIndex:axisValues.isuzu_oven1_temp2_axis,
              },

              {
                name: 'Isuzu Oven 2 VSD Speed',
                type: 'line',
                showSymbol: false,
                hoverAnimation: true,
                data: this.variable.isuzu_oven2_vsd_speed_arr,
                smooth: true,
                yAxisIndex:axisValues.isuzu_oven2_vsd_speed_axis,
                },
                {
                  name: 'Isuzu Oven 2 Heat Exchanger Temperature',
                  type: 'line',
                  showSymbol: false,
                  hoverAnimation: true,
                  data: this.variable.isuzu_oven2_heat_ecvh_temp_arr,
                  smooth: true,
                  yAxisIndex:axisValues.isuzu_oven2_heat_ecvh_temp_axis,
                  },
                  {
                    name: 'Isuzu Oven 2 Temperature 1',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: true,
                    data: this.variable.isuzu_oven2_temp1_arr,
                    smooth: true,
                    yAxisIndex:axisValues.isuzu_oven2_temp1_axis,
                    },
                    {
                      name: 'Isuzu Oven 2 Temperature 2',
                      type: 'line',
                      showSymbol: false,
                      hoverAnimation: true,
                      data: this.variable.isuzu_oven2_temp2_arr,
                      smooth: true,
                      yAxisIndex:axisValues.isuzu_oven2_temp2_axis,
                      },







      {
        name: "Kwanobuhle Reservoir Level",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KWANO_R_RES_LVL_arr,
        smooth: true,
        yAxisIndex:axisValues.KWANO_R_RES_LVL_axis,
      },
      {
        name: "Kwanobuhle Reservoir Flow Rate 1",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KWANO_R_FLOW_RATE_1_arr,
        smooth: true,
        yAxisIndex:axisValues.KWANO_R_FLOW_RATE_1_axis,
      },
      {
        name: "Kwanobuhle Reservoir Flow Rate 2",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KWANO_R_FLOW_RATE_2_arr,
        smooth: true,
        yAxisIndex:axisValues.KWANO_R_FLOW_RATE_2_axis,
      },
      {
        name: "Kwanobuhle Reservoir Total Flow 1",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KWANO_R_TOTAL_FLOW_1_arr,
        smooth: true,
        yAxisIndex:axisValues.KWANO_R_TOTAL_FLOW_1_axis,
      },
      {
        name: "Kwanobuhle Reservoir Total Flow 2",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.KWANO_R_TOTAL_FLOW_2_arr,
        smooth: true,
        yAxisIndex:axisValues.KWANO_R_TOTAL_FLOW_2_axis,
      },
      {
        name: 'Kruisfontein Borhole 12 Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.klm_kruis12_lvl_arr,
      smooth: true,
      yAxisIndex:axisValues.klm_kruis12_lvl_axis,
    },
    {
      name:"Kruisfontein Reservoir Level",
      type:'line',
      showSymbol: false,
      hoverAnimation:true,
      data:this.variable.klm_kruis_res_lvl_arr,
      smooth:true,
      yAxisIndex:axisValues.klm_kruis_res_lvl_axis
    },
    {
      name: 'Kruisfontein Borhole 12 Current',
    type: 'line',
    showSymbol: false,
    hoverAnimation: true,
    data: this.variable.klm_kruis12_current_arr,
    smooth: true,
    yAxisIndex:axisValues.klm_kruis12_current_axis,
  },
  {
    name: 'Kruisfontein Borhole 12 Pressure',
  type: 'line',
  showSymbol: false,
  hoverAnimation: true,
  data: this.variable.klm_kruis12_bar_arr,
  smooth: true,
  yAxisIndex:axisValues.klm_kruis12_bar_axis,
},   {
  name: 'Humansdorp Inlet Flow Rate',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_hup_wtw_flow_arr,
smooth: true,
yAxisIndex:axisValues.klm_hup_wtw_flow_axis,

},

{
name: 'Humansdorp Inlet Total Flow',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_hup_wtw_tf_arr,
smooth: true,
yAxisIndex:axisValues.klm_hup_wtw_tf_axis,
},
{
  name: 'Kruisfontein Borhole 12 Flow Rate',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis12_flow_rate_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis12_flow_rate_axis,
},
{
name: 'Kruisfontein Borhole 12 Total Flow',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis12_total_flow_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis12_total_flow_axis,
},
{
name: 'Kruisfontein Borhole 13 Level',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis13_lvl_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis13_lvl_axis,
},
{
name: 'Kruisfontein Borhole 13 Current',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis13_current_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis13_current_axis,
},
{
name: 'Kruisfontein Borhole 13 Pressure',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis13_bar_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis13_bar_axis,
},
{
name: 'Kruisfontein Borhole 13 Flow Rate',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis13_flow_rate_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis13_flow_rate_axis,
},
{
name: 'Kruisfontein Borhole 13 Total Flow',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis13_total_flow_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis13_total_flow_axis,
},
{
name: 'Kruisfontein Borhole 14 Level',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis14_lvl_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis14_lvl_axis,
},
{
name: 'Kruisfontein Borhole 14 Current',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis14_current_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis14_current_axis,
},
{
name: 'Kruisfontein Borhole 14 Pressure',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis14_bar_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis14_bar_axis,
},
{
name: 'Kruisfontein Borhole 14 Flow Rate',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis14_flow_rate_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis14_flow_rate_axis,
},
{
name: 'Kruisfontein Borhole 14 Total Flow',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.klm_kruis14_total_flow_arr,
smooth: true,
yAxisIndex:axisValues.klm_kruis14_total_flow_axis,
},

{
  name:"Lee Samuals Drive Pressure",
type: 'line',
showSymbol: false,
hoverAnimation:  true,
data:this.variable.LSD_PRESSURE_arr ,
smooth: true,
yAxisIndex:axisValues.LSD_PRESSURE_axis,
},
{
  name: "Lee Samuals Drive Total Flow",
type: 'line',
showSymbol: false,
hoverAnimation:  true,
data:this.variable.LSD_TOTAL_FLOW_arr,
smooth: true,
yAxisIndex:axisValues.LSD_TOTAL_FLOW_axis,
},
{
  name:"Lee Samuals Drive Flow Rate",
type: 'line',
showSymbol: false,
hoverAnimation:  true,
data:this.variable.LSD_FLOW_RATE_arr,
smooth: true,
yAxisIndex:axisValues.LSD_FLOW_RATE_axis,
},
{
  name:"McNoughton Township South Pressure",
  type: 'line',
  showSymbol: false,
  hoverAnimation:  true,
data:this.variable.McNougTown_PRESSURE_arr,
smooth: true,
yAxisIndex:axisValues.McNougTown_PRESSURE_axis,
},
{
  name:"McNoughton Township South Total Flow",
  type: 'line',
  showSymbol: false,
  hoverAnimation:  true,
  data:this.variable.McNougTown_TOTAL_FLOW_arr,
smooth: true,
yAxisIndex:axisValues.McNougTown_TOTAL_FLOW_axis,
},
{
  name:"McNoughton Township South Flow Rate",
  type: 'line',
  showSymbol: false,
  hoverAnimation:  true,
  data:this.variable.McNougTown_FLOW_RATE_arr,
  smooth: true,
  yAxisIndex:axisValues.McNougTown_FLOW_RATE_axis,
},

      {
      name: 'St Georges Borehole Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.st_georges_wtw_gw_FR_arr,
      smooth: true,
      yAxisIndex:axisValues.st_georges_wtw_gw_FR_axis,
    },

    {
      name: 'St Georges Borehole Total Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.st_georges_wtw_gw_TF_arr,
      smooth: true,
      yAxisIndex:axisValues.st_georges_wtw_gw_TF_axis,
    },

    {
      name: 'St Georges Emerald Hill Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.st_georges_wtw_emer_hill_FR_arr,
      smooth: true,
      yAxisIndex:axisValues.st_georges_wtw_emer_hill_FR_axis,
    },

    {
      name: 'St Georges Emerald Hill Total Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.st_georges_wtw_emer_hill_TF_arr,
      smooth: true,
      yAxisIndex:axisValues.st_georges_wtw_emer_hill_TF_axis,
    },

    {
      name:"Malabar Reservoir Level",
      type:'line',
      showSymbol:false,
      data:this.variable.mala_lvl_arr,
      smooth: true,
      yAxisIndex:axisValues.mala_lvl_axis
    },


    {


      name: 'Greenbushes Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GBFRarray,
      smooth: true,
      yAxisIndex:axisValues.GBFR_axis,
    },{
      name: 'Greenbushes Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GBarray,
      smooth: true,
      yAxisIndex:axisValues.GB_axis,
    },
    {
      name: 'Coega Kop Reservoir Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.CGK_PRESSURE_array,
      smooth: true,
      yAxisIndex:axisValues.CGK_PRESSURE_axis,
    },
    {
      name: 'Gamtoos Break Water Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.GBW_ACT_BAR_arr,
      smooth: true,
      yAxisIndex:axisValues.GBW_ACT_BAR_axis,
    },

    {
      name: 'Gamtoos Break Water Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.GBW_FLO_RAT_arr,
      smooth: true,
      yAxisIndex:axisValues.GBW_FLO_RAT_axis,

    },


    {
      name: 'Olifantskop Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.OLI_LVL_array,
      smooth: true,
      yAxisIndex:axisValues.OLI_LVL_axis,

    },

    {
      name: 'Bergendal Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.BERGEN_RES_R_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.BERGEN_RES_R_LVL_axis,
    },
    {
      name: 'Wolwas Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.WOLWAS_RES_R_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.WOLWAS_RES_R_LVL_axis,

    },

    {
      name: 'Umasizakhe Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.UMI_RES_R_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.UMI_RES_R_LVL_axis,

    },

    {
      name: 'Kroonvale Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.KROON_RES_R_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.KROON_RES_R_LVL_axis,

    },

    {
      name: 'Tin Roof Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.TINROOF_LVL_RES_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.TINROOF_LVL_RES_LVL_axis,

    },

    {
      name: 'Damcamp Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.DAMCAMP_LVL_RES_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.DAMCAMP_LVL_RES_LVL_axis,

    },

    {
      name: 'Holding Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.HOLDING_LVL_RES_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.HOLDING_LVL_RES_LVL_axis,

    },

    {
      name: 'Schoemanshoek Pressure',
      type:'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.NMB_SCHOE_PRESSURE_array,
      smooth: true,
      yAxisIndex:axisValues.NMB_SCHOE_PRESSURE_axis,
       },
       {
        name: 'Schoemanshoek Level',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.NMB_SCHOE_RES_LEVEL_array,
        smooth: true,
        yAxisIndex:axisValues.NMB_SCHOE_RES_LEVEL_axis,
         },

         {
          name: 'Schoemanshoek Actuator Position',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.NMB_SCHOE_ACTUATOR_POSITION_array,
          smooth: true,
          yAxisIndex:axisValues.NMB_SCHOE_ACTUATOR_POSITION_axis,
           },
           {
            name: 'Schoemanshoek Actuator Set Point',
            type:'line',
            showSymbol: false,
            hoverAnimation: true,
            data:this.variable.NMB_SCHOE_ACTUATOR_SET_POINT_array,
            smooth: true,
            yAxisIndex:axisValues.NMB_SCHOE_ACTUATOR_SET_POINT_axis,
             },

             {
              name: 'Schoemanshoek Actuator Valve Feedback Signal',
              type:'line',
              showSymbol: false,
              hoverAnimation: true,
              data:this.variable.nmb_schoe_r_actuator_valve_feedback_signal_error_arr,
              smooth: true,
              yAxisIndex:axisValues.nmb_schoe_r_actuator_valve_feedback_signal_error_axis,
               },
               {
                name: 'Schoemanshoek Actuator Valve Command Signal',
                type:'line',
                showSymbol: false,
                hoverAnimation: true,
                data:this.variable.nmb_schoe_r_actuator_valve_command_signal_error_arr,
                smooth: true,
                yAxisIndex:axisValues.nmb_schoe_r_actuator_valve_command_signal_error_axis,
                 },
                 {
                  name: 'Schoemanshoek Reservoir Level Signal Error',
                  type:'line',
                  showSymbol: false,
                  hoverAnimation: true,
                  data:this.variable.nmb_schoe_r_reservoir_level_signal_error_arr,
                  smooth: true,
                  yAxisIndex:axisValues.nmb_schoe_r_reservoir_level_signal_error_axis,
                   },
                   {
                    name: 'Schoemanshoek Actuator Valve Fault',
                    type:'line',
                    showSymbol: false,
                    hoverAnimation: true,
                    data:this.variable.nmb_schoe_r_actuator_valve_fault_arr,
                    smooth: true,
                    yAxisIndex:axisValues.nmb_schoe_r_actuator_valve_fault_axis,
                     },
                     {
                      name: 'Schoemanshoek Actuator Valve Torque Fail Close',
                      type:'line',
                      showSymbol: false,
                      hoverAnimation: true,
                      data:this.variable.nmb_schoe_r_actuator_valve_torque_fail_close_arr,
                      smooth: true,
                      yAxisIndex:axisValues.nmb_schoe_r_actuator_valve_torque_fail_close_axis,
                    },
                    {
                     name: 'Schoemanshoek Actuator Valve Torque Fail Open',
                     type:'line',
                     showSymbol: false,
                     hoverAnimation: true,
                     data:this.variable.nmb_schoe_r_actuator_valve_torque_fail_open_arr,
                     smooth: true,
                     yAxisIndex:axisValues.nmb_schoe_r_actuator_valve_torque_fail_open_axis,
                      },
                      {
                       name: 'Schoemanshoek General Fault',
                       type:'line',
                       showSymbol: false,
                       hoverAnimation: true,
                       data:this.variable.nmb_schoe_r_general_fault_arr,
                       smooth: true,
                       yAxisIndex:axisValues.nmb_schoe_r_general_fault_axis,
                        },
                  {
                   name: 'Schoemanshoek Actuator General Fault',
                   type:'line',
                   showSymbol: false,
                   hoverAnimation: true,
                   data:this.variable.nmb_schoe_r_actuator_general_fault_arr,
                   smooth: true,
                   yAxisIndex:axisValues.nmb_schoe_r_actuator_general_fault_axis,
                    },
                    {
                     name: 'Schoemanshoek Actuator Valve Timeout',
                     type:'line',
                     showSymbol: false,
                     hoverAnimation: true,
                     data:this.variable.nmb_schoe_r_actuator_valve_timeout_arr,
                     smooth: true,
                     yAxisIndex:axisValues.nmb_schoe_r_actuator_valve_timeout_axis,
                      },

    {
      name: 'Elandsjagt Flow Rate',
      type:'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.ELA_FR_arr,
      smooth: true,
      yAxisIndex:axisValues.ELA_FR_axis,
       },
       {
        name: 'Elandsjagt Pressure',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.ELA_P_arr,
        smooth: true,
        yAxisIndex:axisValues.ELA_P_axis,
         },
         {
          name: 'Driftsands Reservoir Level',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.drift_R_reservoir_level_arr,
          smooth: true,
          yAxisIndex:axisValues.drift_res_level_axis,
           },
       {
        name: 'Driftsands Flow Rate 1',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.drift_R_flow_rate_1_arr,
        smooth: true,
        yAxisIndex:axisValues.drift_res_flow_rate_1_axis,
         },
         {
          name: 'Driftsands Flow Rate 2',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.drift_R_flow_rate_2_arr,
          smooth: true,
          yAxisIndex:axisValues.drift_res_flow_rate_2_axis,
           },
           {
            name: 'Driftsands Total Flow 1',
            type:'line',
            showSymbol: false,
            hoverAnimation: true,
            data:this.variable.drift_R_total_flow_1_arr,
            smooth: true,
            yAxisIndex:axisValues.drift_res_total_flow_1_axis,
             },
             {
              name: 'Driftsands Total Flow 2',
              type:'line',
              showSymbol: false,
              hoverAnimation: true,
              data:this.variable.drift_R_total_flow_2_arr,
              smooth: true,
              yAxisIndex:axisValues.drift_res_total_flow_2_axis,
               },


         {
          name: 'Emerald Hill Reservoir Level',
          type:'line',
          showSymbol: false,
          hoverAnimation: true,
          data:this.variable.EMER_H_Level_arr,
          smooth: true,
          yAxisIndex:axisValues.EMER_H_LEVEL_axis,
           },
           {
            name: 'Emerald Hill Flow Rate',
            type:'line',
            showSymbol: false,
            hoverAnimation: true,
            data:this.variable.EMER_H_Flow_Rate_arr,
            smooth: true,
            yAxisIndex:axisValues.EMER_H_FLOW_RATE_axis,
             },
             {
              name: 'Emerald Hill Total Flow',
              type:'line',
              showSymbol: false,
              hoverAnimation: true,
              data:this.variable.EMER_H_Total_Flow_arr,
              smooth: true,
              yAxisIndex:axisValues.EMER_H_TOTAL_FLOW_axis,
               },

               {
                name: "Bushy Park Soccoman Total Flow",
                type:'line',
                showSymbol: false,
                hoverAnimation: true,
                data:this.variable.BUSH_SOCO_TF_arr,
                smooth: true,
                yAxisIndex:axisValues.BUSH_SOCO_TF_axis,
                 },

                 {
                  name: "Bushy Park Steel Total Flow",
                  type:'line',
                  showSymbol: false,
                  hoverAnimation: true,
                  data:this.variable.BUSH_STEEL_TF_arr,
                  smooth: true,
                  yAxisIndex:axisValues.BUSH_STEEL_TF_axis,
                   },

                   {
                     name:  "Bushy Park Pumpstation Total Flow",
                    type:'line',
                    showSymbol: false,
                    hoverAnimation: true,
                    data:this.variable.BUSH_PUMP_TF_arr,
                    smooth: true,
                    yAxisIndex:axisValues.BUSH_PUMP_TF_axis,
                     },

                     {
                      name: "Bushy Park Combined Total Flow",
                      type:'line',
                      showSymbol: false,
                      hoverAnimation: true,
                      data:this.variable.BUSH_GW_TF_arr,
                      smooth: true,
                      yAxisIndex:axisValues.BUSH_GW_TF_axis,
                       },



    {
     name: 'Bushy Park Soccoman Flow Rate',
     type:'line',
     showSymbol: false,
     hoverAnimation: true,
     data:this.variable.BUSH_CHURCH_SOCO_FR_arr,
     smooth: true,
     yAxisIndex:axisValues.BUSH_CHURCH_SOCO_FR_axis,
      },


  {
    name: 'Bushy Park Steel Flow Rate',
    type:'line',
    showSymbol: false,
    hoverAnimation: true,
    data:this.variable.BUSH_CHURCH_STEEL_FR_arr,
    smooth: true,
    yAxisIndex:axisValues.BUSH_CHURCH_STEEL_FR_axis,
     },
     {
      name: 'Airport Reservoir Level',
      type:'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.AIR_PRT_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.AIR_PRT_LVL_axis,
       },
  {
   name: 'Bushy Park Soccoman Pressure',
   type:'line',
   showSymbol: false,
   hoverAnimation: true,
   data:this.variable.BUSH_CHURCH_SOCCO_BAR_arr,
   smooth: true,
   yAxisIndex:axisValues.BUSH_CHURCH_SOCCO_BAR_axis,
    },

  {
   name: 'Bushy Park Steel Pressure',
   type:'line',
   showSymbol: false,
   hoverAnimation: true,
   data:this.variable.BUSH_CHURCH_STEEL_BAR_arr,
   smooth: true,
   yAxisIndex:axisValues.BUSH_CHURCH_STEEL_BAR_axis,
    },

  {
   name: 'Bushy Park Pumpstation Flow Rate',
   type:'line',
   showSymbol: false,
   hoverAnimation: true,
   data:this.variable.BUSH_PUMP_FR_arr,
   smooth: true,
   yAxisIndex:axisValues.BUSH_PUMP_FR_axis,
    },

  {
   name: 'Bushy Park Combined Borehole Flow Rate',
   type:'line',
   showSymbol: false,
   hoverAnimation: true,
   data:this.variable.BUSH_GW_COMB_FLOW_RATE_arr,
   smooth: true,
   yAxisIndex:axisValues.BUSH_GW_COMB_FLOW_RATE_axis,
    },

    {
     name: 'Bushy Park Holding Tank Level',
     type:'line',
     showSymbol: false,
     hoverAnimation: true,
     data:this.variable.BUSH_TANK_LVL_arr,
     smooth: true,
     yAxisIndex:axisValues.BUSH_TANK_LVL_axis,
      },





                  {
 name: 'Humansdorp Off Take Total Flow',
 type:'line',
 showSymbol: false,
 hoverAnimation: true,
 data:this.variable.HUM_OFF_TAKE_TF_arr,
 smooth: true,
 yAxisIndex:axisValues.HUM_OFF_TAKE_TF_axis,
  },
   {
 name: 'Humansdorp Off Take Pressure',
 type:'line',
 showSymbol: false,
 hoverAnimation: true,
 data:this.variable.HUM_OFF_TAKE_BAR_arr,
 smooth: true,
 yAxisIndex:axisValues.HUM_OFF_TAKE_BAR_axis,
  },
  {
    name: 'Humansdorp Off Take Battery Level',
    type:'line',
    showSymbol: false,
    hoverAnimation: true,
    data:this.variable.HUM_OFF_TAKE_BAT_arr,
    smooth: true,
    yAxisIndex:axisValues.HUM_OFF_TAKE_BAT_axis,
     },
  {
   name: 'Jeffreys Bay Off Take Total Flow',
   type:'line',
   showSymbol: false,
   hoverAnimation: true,
   data:this.variable.JEFF_OFF_TAKE_TF_arr,
   smooth: true,
   yAxisIndex:axisValues.JEFF_OFF_TAKE_TF_axis,
    },
    {
      name: 'Jeffreys Bay Off Take Battery Level',
      type:'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.JEFF_OFF_TAKE_BAT_arr,
      smooth: true,
      yAxisIndex:axisValues.JEFF_OFF_TAKE_BAT_axis,
       },

    {
     name: 'Kouga Main Line Pressure',
     type:'line',
     showSymbol: false,
     hoverAnimation: true,
     data:this.variable.KOU_MAIN_LINE_BAR_arr,
     smooth: true,
     yAxisIndex:axisValues.KOU_MAIN_LINE_BAR_axis,
      }, {
        name: 'Kouga Main Line Battery Level',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.KOU_MAIN_LINE_BAT_arr,
        smooth: true,
        yAxisIndex:axisValues.KOU_MAIN_LINE_BAT_axis,
         },{
       name: 'Ons Paradys Total Flow',
       type:'line',
       showSymbol: false,
       hoverAnimation: true,
       data:this.variable.ONS_PARA_TF_arr,
       smooth: true,
       yAxisIndex:axisValues.ONS_PARA_TF_axis,
      },{
        name: 'Ons Paradys Battery Level',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.ONS_PARA_BAT_arr,
        smooth: true,
        yAxisIndex:axisValues.ONS_PARA_BAT_axis,
       },
      {
       name: 'St Francis Offtake Total Flow',
       type:'line',
       showSymbol: false,
       hoverAnimation: true,
       data:this.variable.ST_FRAN_OFF_TF_arr,
       smooth: true,
       yAxisIndex:axisValues.ST_FRAN_OFF_TF_axis,
        }, {
         name: 'Paradise Beach Total Flow',
         type:'line',
         showSymbol: false,
         hoverAnimation: true,
         data:this.variable.PARA_BEA_TF_arr,
         smooth: true,
         yAxisIndex:axisValues.PARA_BEA_TF_axis,
          },
      {
        name: 'Paradise/St Francis Battery Level',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.ST_FRAN_PARA_BEA_BAT_arr,
        smooth: true,
        yAxisIndex:axisValues.ST_FRAN_PARA_BEA_BAT_axis,
         },
    {
      name: 'Coega Kop to Coega IDZ Total Flow',
      type:'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.CGK_COEGA_TOTAL_FLOW_array,
      smooth: true,
      yAxisIndex:axisValues.CGK_COEGA_TOTAL_FLOW_axis,
       },
       {
        name: "Coega Kop to Coega IDZ Flow Rate",
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.variable.CGK_COEGA_FLOW_RATE_array,
        smooth: true,
        yAxisIndex:axisValues.CGK_COEGA_FLOW_RATE_axis
      },
      {
        name: 'Coega Kop to Motherwell Total Flow',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CGK_MOTHERWELL_TOTAL_FLOW_array,
        smooth: true,
        yAxisIndex:axisValues.CGK_MOTHERWELL_TOTAL_FLOW_axis
       },
       {
        name: 'Coega Kop North Chamber 17 Ml',
        type:'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CGK_KOP_NC_17_ML_array,
        smooth: true,
        yAxisIndex:axisValues.CGK_KOP_NC_17_ML_axis,
         },
       {
        name: 'Coega Kop to Motherwell Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CGK_MOTHERWELL_FLOW_RATE_array,
        smooth: true,
        yAxisIndex:axisValues.CGK_MOTHERWELL_FLOW_RATE_axis
       },
       {
        name: 'Coega Kop from Grassridge Total Flow',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CGK_GRASSRIDGE_TOTAL_FLOW_array,
        smooth: true,
        yAxisIndex:axisValues.CGK_GRASSRIDGE_TOTAL_FLOW_axis

        },
       {
        name: 'Coega Kop from Grassridge Flow Rate',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data:this.variable.CGK_GRASSRIDGE_FLOW_RATE_array,
        smooth: true,
        yAxisIndex:axisValues.CGK_GRASSRIDGE_FLOW_RATE_axis

        },
       {
    name: 'Coega Kop Inlet Chamber 2 Ml',
    type:'line',
    showSymbol: false,
    hoverAnimation: true,
    data:this.variable.CGK_LEVEL_array,
    smooth: true,
    yAxisIndex:axisValues.CGK_LEVEL_axis,
     }, {
      name: 'Chelsea Reservoir East Chamber Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_East_array,
      smooth: true,
      yAxisIndex:axisValues.CHE_East_axis,
    },
    {
      name: 'Chelsea Reservoir West Chamber Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_West_array,
      smooth: true,
      yAxisIndex:axisValues.CHE_West_axis,
    },

    {
      name: 'Chelsea Reservoir Summit 1200 mm Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_R_FR1200_arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_R_FR1200_axis,
    },
    {
      name: 'Chelsea Reservoir Greenbushes 600 mm Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_R_FR600_arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_R_FR600_axis,
    },

    {
      name: 'Chelsea Reservoir Summit 1200 mm Total Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_R_TF1200_arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_R_TF1200_axis,
    },
    {
      name: 'Chelsea Reservoir Greenbushes 600 mm Total Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_R_TF600_arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_R_TF600_axis,
    },

    {
      name: 'Chatty Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_FlowRate_array,
      smooth: true,
      yAxisIndex:axisValues.CHE_fr_axis,


    },
    {
      name: 'Grassridge East Chamber Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GR_EC_array,
      smooth: true,
      yAxisIndex:axisValues.GR_EC_axis,
    },
    {
      name: 'Grassridge West Chamber Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GR_WC_array,
      smooth: true,
      yAxisIndex:axisValues.GR_WC_axis,
    },
    {
      name: 'Van Stadens Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.VSarray,
      smooth: true,
      yAxisIndex:axisValues.VS_axis,

    },
    {
      name: 'Chatty North Chamber Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHT_NC_array,
      smooth: true,
      yAxisIndex:axisValues.CHT_NC_axis,
    },
    {
      name: 'Chatty Overhead Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHT_OR_array,
      smooth: true,
      yAxisIndex:axisValues.CHT_OR_axis,
    },
    {
      name: 'Chatty South Chamber Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHT_SC_array,
      smooth: true,
      yAxisIndex:axisValues.CHT_SC_axis,
    },
    {
      name: 'Van Riebeeck Hoogte Delivery Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.VRH_DL_array,
      smooth: true,
      yAxisIndex:axisValues.VRH_DL_axis,
    },
    {
      name: 'Van Riebeeck Hoogte Suction Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.VRH_SL_array,
      smooth: true,
      yAxisIndex:axisValues.VRH_SL_axis,
    },
    {
      name: 'Heatherbank Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.HBarray,
      smooth: true,
      yAxisIndex:axisValues.HB_axis,
    },

    {
      name:"Heatherbank Pumpstation 1 Current",
      type:"line",
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.hb_P1_CURRENT_arr,
      smooth: true,
      yAxisIndex:axisValues.hb_P1_CURRENT_axis ,

    },
    {
      name:"Heatherbank Pumpstation 2 Current",
      type:"line",
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.hb_P2_CURRENT_arr,
      smooth: true,
      yAxisIndex:axisValues.hb_P2_CURRENT_axis ,

    },
    {
      name:"Heatherbank Pumpstation 3 Current",
      type:"line",
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.hb_P3_CURRENT_arr,
      smooth: true,
      yAxisIndex:axisValues.hb_P3_CURRENT_axis ,

    },
    {
      name:"Heatherbank Pumpstation 1 Run Hours",
      type:"line",
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.hb_P1_RH_arr,
      smooth: true,
      yAxisIndex:axisValues.hb_P1_RH_axis ,

    },
    {
      name:"Heatherbank Pumpstation 2 Run Hours",
      type:"line",
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.hb_P2_RH_arr,
      smooth: true,
      yAxisIndex:axisValues.hb_P2_RH_axis ,

    },
    {
      name:"Heatherbank Pumpstation 3 Run Hours",
      type:"line",
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.hb_P3_RH_arr,
      smooth: true,
      yAxisIndex:axisValues.hb_P3_RH_axis ,

    },
    {
      name: 'Lovemore Heights Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.LHarray,
      smooth: true,
      yAxisIndex:axisValues.LH_axis,
    },
    {
      name: 'Lovemore Heights Overhead Tank',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.DRS_LH_RES_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.DRS_LH_RES_LVL_axis,
    },
    {
      name: 'Blue Horizon Bay Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.BHB_array,
      smooth: true,
      yAxisIndex:axisValues.BHB_axis,
    },
    {
      name: 'Rosedale Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.RD_LVL_array,
      smooth: true,
      yAxisIndex:axisValues.RD_LVL_axis,
    },
    {
      name: 'Summit Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.SM_LVL_array,
      smooth: true,
      yAxisIndex:axisValues.SM_LVL_axis,
    },
    {
      name: 'Summit Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.SM_FR_array,
      smooth: true,
      yAxisIndex:axisValues.SM_FR_axis,
    },
    {
      name: 'Theescombe Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.TCarray,
      smooth: true,
      yAxisIndex:axisValues.TC_axis,
    },
    {
      name: 'Grassridge Inlet Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GR_R_INLET_Arr,
      smooth: true,
      yAxisIndex:axisValues.GR_R_INLET_axis,
    },
    {
      name: 'Grassridge Outlet Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GR_R_OUTLET_Arr,
      smooth: true,
      yAxisIndex:axisValues.GR_R_OUTLET_axis,
    },
//FPT Sites

{
name: 'Humerail Borehol Level',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.HUM_GW_BOR_LVL_arr,
smooth: true,
yAxisIndex:axisValues.HUM_GW_BOR_LVL_axis,
},

{
name: 'Humerail Raw Water Tank Level',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.HUM_GW_RAW_WATER_TANK_LVL_arr,
smooth: true,
yAxisIndex:axisValues.HUM_GW_RAW_WATER_TANK_LVL_axis,
},
{
name: 'Humerail Final Water Tank Level',
type: 'line',
showSymbol: false,
hoverAnimation: true,
data: this.variable.HUM_GW_FIN_WAT_TANK_LVL_arr,
smooth: true,
yAxisIndex:axisValues.HUM_GW_FIN_WAT_TANK_LVL_axis,
},


    {
      name:"Bethelsdorp Battery Level",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.BETH_BATTERY_STATUS_array,
      smooth: true,
      yAxisIndex:axisValues.BETH_BATTERY_STATUS_axis
    },
    {
      name:"Bethelsdorp Total Flow",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.BETH_TOTAL_FLOW_array,
      smooth: true,
      yAxisIndex:axisValues.BETH_TOTAL_FLOW_axis
    },
    {
      name:"Bethelsdorp Pressure",
      type:'line',
      showSymbol:false,
      hoverAnimation:true,
      data:this.variable.BETH_PRESS_array,
      smooth:true,
      yAxisIndex:axisValues.BETH_PRESS_axis
    },
    {
      name:"Bethelsdorp Flow Rate",
      type:'line',
      showSymbol:false,
      hoverAnimation:true,
      data:this.variable.BETH_FLOW_RATE_array,
      smooth:true,
      yAxisIndex:axisValues.BETH_FLOW_RATE_axis
    },
    {
      name: 'FM Tower Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.FMT_FR_array,
      smooth: true,
      yAxisIndex:axisValues.FMT_FR_axis,
    },

    {
      name: "FM Tower Total Flow",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.FMT_TF_array,
      smooth: true,
      yAxisIndex:axisValues.FMT_TF_axis,
    },

    {
      name: 'FM Tower Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.FMT_PRESS_array,
      smooth: true,
      yAxisIndex:axisValues.FMT_PRESS_axis,
    },


    {
      name: 'Coega IDZ Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.IDZ_FR_array,
      smooth: true,
      yAxisIndex:axisValues.IDZ_FR_axis,
    },
    {
      name: 'Coega Motherwell Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.IDZ_MW_FR_array,
      smooth: true,
      yAxisIndex:axisValues.IDZ_MW_FR_axis,
    },

    {
      name: 'Gamtoos Bridge Steel Pipe Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GT_BRG_STL_FR_array,
      smooth: true,
      yAxisIndex:axisValues.GT_BRG_STL_FR_axis,
    },
    {
      name: 'Gamtoos Bridge Socoman Pipe Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GT_BRG_SOCO_FR_array,
      smooth: true,
      yAxisIndex:axisValues.GT_BRG_SOCO_FR_axis,
    },

    {
      name: 'Gamtoos Bridge Steel Pipe Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GT_BRG_STL_PRESS_array,
      smooth: true,
      yAxisIndex:axisValues.GT_BRG_STL_PRESS_axis,
    },
    {
      name: 'Gamtoos Bridge Socoman Pipe Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.GT_BRG_SOCO_PRESS_array,
      smooth: true,
      yAxisIndex:axisValues.GT_BRG_SOCO_PRESS_axis,
    },

    {
      name: 'Uitenhage Flow Chamber Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.UIT_FC_FR_array,
      smooth: true,
      yAxisIndex:axisValues.UIT_FC_FR_axis,
    },
    {
      name: 'Uitenhage Flow Chamber Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.UIT_FC_PRESS_array,
      smooth: true,
      yAxisIndex:axisValues.UIT_FC_PRESS_axis,
    },{
      name: 'Storms River Holding Reservoir Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STORMS_HOLDING_RESERVOIR_LEVEL_Arr,
      smooth: true,
      yAxisIndex:axisValues.STORMS_HOLDING_RESERVOIR_LEVEL_axis,
    },
    {
      name: 'Storms River Overhead Tank Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STORMS_OVERHEAD_TANK_LEVEL_Arr,
      smooth: true,
      yAxisIndex:axisValues.STORMS_GORGE_LEVEL_axis,
    },{
      name: 'Storms River Gorge Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STORMS_GORGE_LEVEL_Arr,
      smooth: true,
      yAxisIndex:axisValues.STORMS_OVERHEAD_TANK_LEVEL_axis,
    },
    {
      name: 'Storms River Quarry Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STORMS_QUARRY_LEVEL_Arr,
      smooth: true,
      yAxisIndex:axisValues.STORMS_QUARRY_LEVEL_axis,
    },
    //Pump Stations
    {
      name: 'Crown Gardens Suction Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CG_CSP_Arr,
      smooth: true,
      yAxisIndex:axisValues.CG_CSP_axis,
    },

    {
      name: 'Crown Gardens Delivery Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CG_CDP_Arr,
      smooth: true,
      yAxisIndex:axisValues.CG_CDP_axis,
    },
    {
      name: 'Crown Gardens Sump Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CG_S_LVL_Arr,
      smooth: true,
      yAxisIndex:axisValues.CG_S_LVL_axis,
    },
    {
      name: 'Crown Gardens Tower 1 Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CG_T1_LVL_Arr,
      smooth: true,
      yAxisIndex:axisValues.CG_T1_LVL_axis,
    },
    {
      name: 'Crown Gardens Tower 1 Inlet Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CG_T1_IF_Arr,
      smooth: true,
      yAxisIndex:axisValues.CG_T1_IF_axis,
    },
    {
      name: 'Crown Gardens Tower 1 Outlet Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CG_T1_OF_Arr,
      smooth: true,
      yAxisIndex:axisValues.CG_T1_OF_axis,
    },
    {
      name: 'Crown Gardens Tower 2 Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CG_T2_LVL_Arr,
      smooth: true,
      yAxisIndex:axisValues.CG_T2_LVL_axis,
    },
    {
      name: 'Crown Gardens Tower 2 Inlet Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CG_T2_IF_Arr,
      smooth: true,
      yAxisIndex:axisValues.CG_T2_IF_axis,
    },
    {
      name: 'Crown Gardens Tower 2 Outlet Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CG_T2_OF_Arr,
      smooth: true,
      yAxisIndex:axisValues.CG_T2_OF_axis,
    },
    {
      name: 'NMU Effluent Delivery Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.NMU_EFF_DP_Arr,
      smooth: true,
      yAxisIndex:axisValues.NMU_EFF_DP_axis,
    },
    {
      name: 'NMU Effluent Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.NMU_EFF_FR_Arr,
      smooth: true,
      yAxisIndex:axisValues.NMU_EFF_FR_axis,
    },
    {
      name: 'NMU Effluent Dam Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.NMU_EFF_DAM_LVL_Arr ,
      smooth: true,
      yAxisIndex:axisValues.NMU_EFF_DAM_LVL_axis,
    },
    {
      name: 'NMU Effluent Pump 1 Speed',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.NMU_EFF_P1_SPEED_Arr,
      smooth: true,
      yAxisIndex:axisValues.NMU_EFF_P1_SPEED_axis,
    },
    {
      name: 'NMU Effluent Pump 2 Speed',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.NMU_EFF_P2_SPEED_Arr,
      smooth: true,
      yAxisIndex:axisValues.NMU_EFF_P2_SPEED_axis,
    },
    {
      name: 'NMU Effluent Pump 3 Speed',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.NMU_EFF_P3_SPEED_Arr,
      smooth: true,
      yAxisIndex:axisValues.NMU_EFF_P3_SPEED_axis,
    },
    {
      name: 'NMU Effluent Jockey Pump Speed',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.NMU_EFF_JP_SPEED_Arr,
      smooth: true,
      yAxisIndex:axisValues.NMU_EFF_JP_SPEED_axis,
    },


    {
      name: 'Chelsea Pumpstation 1 Actual Speed',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P1_ACTUAL_SPEED_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P1_ACTUAL_SPEED_Axis,
    },

    {
      name: 'Chelsea Pumpstation 1 Delivery Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P1_DEL_PRESS_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P1_DEL_PRESS_Axis,
    },

    {
      name: 'Chelsea Pumpstation 1 Suction Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P1_SUCT_PRESS_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P1_SUCT_PRESS_Axis,
    },

    {
      name: 'Chelsea Pumpstation 2 Actual Speed',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P2_ACTUAL_SPEED_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P2_ACTUAL_SPEED_Axis,
    },

    {
      name: 'Chelsea Pumpstation 2 Delivery Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P2_DEL_PRESS_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P2_DEL_PRESS_Axis,
    },

    {
      name: 'Chelsea Pumpstation 2 Suction Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P2_SUCT_PRESS_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P2_SUCT_PRESS_Axis,
    },


    {
      name: 'Chelsea Pumpstation 3 Actual Speed',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P3_ACTUAL_SPEED_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P3_ACTUAL_SPEED_Axis,
    },

    {
      name: 'Chelsea Pumpstation 3 Delivery Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P3_DEL_PRESS_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P3_DEL_PRESS_Axis,
    },

    {
      name: 'Chelsea Pumpstation 3 Suction Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P3_SUCT_PRESS_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P3_SUCT_PRESS_Axis,
    },

    {
      name: 'Chelsea Pumpstation 4 Actual Speed',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P4_ACTUAL_SPEED_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P4_ACTUAL_SPEED_Axis,
    },

    {
      name: 'Chelsea Pumpstation 4 Delivery Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P4_DEL_PRESS_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P4_DEL_PRESS_Axis,
    },

    {
      name: 'Chelsea Pumpstation 4 Suction Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_P4_SUCT_PRESS_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_P4_SUCT_PRESS_Axis,
    },
    {
      name: 'Chelsea Pumpstation 700 Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_700_FLOW_RATE_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_700_FLOW_RATE_Axis,
    },{
      name: 'Chelsea Pumpstation 700 Total Flow',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.CHE_PS_700_TOTAL_FLOW_Arr,
      smooth: true,
      yAxisIndex:axisValues.CHE_PS_700_TOTAL_FLOW_Axis,
    },  {
      name: 'Stanford Road Suction Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STAN_BPS_SuctionPressure_Arr,
      smooth: true,
      yAxisIndex:axisValues.STAN_BPS_SuctionPressure_axis,
    },
    {
      name: 'Stanford Road Delivery Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STAN_BPS_DeliveryPressure_Arr,
      smooth: true,
      yAxisIndex: axisValues.STAN_BPS_DeliveryPressure_axis
    },
    {
      name: 'Stanford Road Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STAN_BPS_FlowRate_Arr,
      smooth: true,
      yAxisIndex: axisValues.STAN_BPS_FlowRate_axis,
    },
     {
      name: 'Stanford Road Pump 1 Frequency',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STAN_BPS_P1_FREQ_Arr,
      smooth: true,
      yAxisIndex: axisValues.STAN_BPS_P1_FREQ_axis
    },
    {
      name: 'Stanford Road Pump 2 Frequency',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STAN_BPS_P2_FREQ_Arr,
      smooth: true,
      yAxisIndex: axisValues.STAN_BPS_P2_FREQ_axis
    },
    {
      name: 'Stanford Road Pump 3 Frequency',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STAN_BPS_P3_FREQ_Arr,
      smooth: true,
      yAxisIndex: axisValues.STAN_BPS_P3_FREQ_axis
    },
    {
      name: 'Stanford Road Pump 4 Frequency',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.STAN_BPS_P4_FREQ_Arr,
      smooth: true,
      yAxisIndex: axisValues.STAN_BPS_P4_FREQ_axis
    },
    {
      name: 'Motherwell Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.MW_BPS_FlowRate_Arr,
      smooth: true,
      yAxisIndex:axisValues.MW_BPS_FlowRate_axis,
    },
    {
      name: 'Motherwell Delivery Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.MW_BPS_DeliveryPressure_Arr,
      smooth: true,
      yAxisIndex:axisValues.MW_BPS_DeliveryPressure_axis,
    },
    {
      name: "Motherwell Reservoir Level",
      type:'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.MW_LVL_array,
      smooth: true,
      yAxisIndex:axisValues.MW_LVL_axis
    },
    {
      name: 'Motherwell Suction Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.MW_BPS_SuctionPressure_Arr,
      smooth: true,
      yAxisIndex:axisValues.MW_BPS_SuctionPressure_axis,
    },
{
    //Ground Water
    name: 'Newton Park Pool Pressure',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.NMBM_NPP_GW_PRESSURE_Arr,
      smooth: true,
      yAxisIndex:axisValues.NMBM_NPP_GW_PRESSURE_axis,
},{
      name: 'Newton Park Pool Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.NMBM_NPP_GW_FLOW_RATE_Arr,
      smooth: true,
      yAxisIndex:axisValues.NMBM_NPP_GW_FLOW_RATE_axis,
},{
      name: 'Newton Park Pool Water Level',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data:this.variable.NMBM_NPP_GW_LEVEL_Arr,
      smooth: true,
      yAxisIndex:axisValues.NMBM_NPP_GW_LEVEL_axis,
    //Newton Park Pool
  },
  {
    name: 'Newton Park Pool Total Flow',
    type: 'line',
    showSymbol: false,
    hoverAnimation: true,
    data:this.variable.NMBM_NPP_GW_TOTAL_FLOW_Arr,
    smooth: true,
    yAxisIndex:axisValues.NMBM_NPP_GW_TOTAL_FLOW_axis,
  },
  {//Humansdorp
    name:'HD1 Water Level',
    type: 'line',
    showSymbol: false,
    hoverAnimation:true,
    data:this.variable.KLM_HUP_WATER_LEVEL_Arr,
    smooth: true,
    yAxisIndex:axisValues.KLM_HUP_WATER_LEVEL_Axis,

  },
    {//Humansdorp
      name:'HD1 Flow Rate',
      type:'line',
      showSymbol: false,
      hoverAnimation:true,
      data:this.variable.KLM_HUP_FLOWRATE_Arr,
      smooth: true,
      yAxisIndex:axisValues.KLM_HUP_FLOWRATE_Axis

    },
    {//Humansdorp
      name:'HD1 Total Flow',
      type:'line',
      showSymbol: false,
      hoverAnimation:true,
      data:this.variable.KLM_HUP_TOTALFLOW_Arr,
      smooth: true,
      yAxisIndex:axisValues.KLM_HUP_TOTALFLOW_Axis,

    },
      {//Humansdorp
        name:'HD2C Water Level',
        type:'line',
        showSymbol: false,
        hoverAnimation:true,
        data:this.variable.KLM_HUP2_WATER_LEVEL_Arr,
        smooth: true,
        yAxisIndex:axisValues.KLM_HUP2_WATER_LEVEL_Axis,

      },
      {//Humansdorp
        name:'HD2C Flow Rate',
        type:'line',
        showSymbol: false,
        hoverAnimation:true,
        data:this.variable.KLM_HUP2_FLOWRATE_Arr,
        smooth: true,
        yAxisIndex:axisValues.KLM_HUP2_FLOWRATE_Axis

      },
        {//Humansdorp
          name:'HD2C Total Flow',
          type:'line',
          showSymbol: false,
          hoverAnimation:true,
          data:this.variable.KLM_HUP2_TOTALFLOW_Arr,
          smooth: true,
          yAxisIndex:axisValues.KLM_HUP2_TOTALFLOW_Axis,

        },
        {//Humansdorp
          name:'HD3 Water Level',
          type:'line',
          showSymbol: false,
          hoverAnimation:true,
          data:this.variable.KLM_HUP3_WATER_LEVEL_Arr,
          smooth: true,
          yAxisIndex:axisValues.KLM_HUP3_WATER_LEVEL_Axis,

        },
          {//Humansdorp
            name:'HD3 Flow Rate',
            type:'line',
            showSymbol: false,
            hoverAnimation:true,
            data:this.variable.KLM_HUP3_FLOWRATE_Arr,
            smooth: true,
            yAxisIndex:axisValues.KLM_HUP3_FLOWRATE_Axis,

          },
          {//Humansdorp
            name:'HD3 Total Flow',
            type:'line',
            showSymbol: false,
            hoverAnimation:true,
            data:this.variable.KLM_HUP3_TOTALFLOW_Arr,
            smooth: true,
            yAxisIndex:axisValues.KLM_HUP3_TOTALFLOW_Axis

          },
            {//Humansdorp
              name:'HD4 Water Level',
              type:'line',
              showSymbol: false,
              hoverAnimation:true,
              data:this.variable.KLM_HUP4_WATER_LEVEL_Arr,
              smooth: true,
              yAxisIndex:axisValues.KLM_HUP4_WATER_LEVEL_Axis,

            },
            {//Humansdorp
              name:'HD4 Flow Rate',
              type:'line',
              showSymbol: false,
              hoverAnimation:true,
              data:this.variable.KLM_HUP4_FLOWRATE_Arr,
              smooth: true,
              yAxisIndex:axisValues.KLM_HUP4_FLOWRATE_Axis

            },
              {//Humansdorp
                name:'HD6 Total Flow',
                type:'line',
                showSymbol: false,
                hoverAnimation:true,
                data:this.variable.KLM_HUP6_TOTALFLOW_Arr,
                smooth: true,
                yAxisIndex:axisValues.KLM_HUP6_TOTALFLOW_Axis
              },
                    {//Humansdorp
                      name:'HD6 Water Level',
                      type:'line',
                      showSymbol: false,
                      hoverAnimation:true,
                      data:this.variable.KLM_HUP6_WATER_LEVEL_Arr,
                      smooth: true,
                      yAxisIndex:axisValues.KLM_HUP6_WATER_LEVEL_Axis,

                    },
                    {//Humansdorp
                      name:'HD6 Flow Rate',
                      type:'line',
                      showSymbol: false,
                      hoverAnimation:true,
                      data:this.variable.KLM_HUP6_FLOWRATE_Arr,
                      smooth: true,
                      yAxisIndex:axisValues.KLM_HUP6_FLOWRATE_Axis

                    },
                      {//Humansdorp
                        name:'HD4 Total Flow',
                        type:'line',
                        showSymbol: false,
                        hoverAnimation:true,
                        data:this.variable.KLM_HUP4_TOTALFLOW_Arr,
                        smooth: true,
                        yAxisIndex:axisValues.KLM_HUP4_TOTALFLOW_Axis
                      },
    //Water Treatment Works
    {
      name: 'Nooitgedacht High Level Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.WTW_NGT_FM_HIGH_FR_Arr,
      smooth: true,
      yAxisIndex:axisValues.WTW_NGT_FM_HIGH_FR_axis,
    },
    {
      name: 'Nooitgedacht Low Level Flow Rate',
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.WTW_NGT_FM_LOW_FR_Arr,
      smooth: true,
      yAxisIndex:axisValues.WTW_NGT_FM_LOW_FR_axis,
    },


    {
      name:  "Kareedouw K1 Total Flow",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.KARK_K1_TF_arr,
      smooth: true,
      yAxisIndex:axisValues.KARK_K1_TF_axis,
    },
    {
      name:  "Kareedouw K1 Flow Rate",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.KARK_K1_FR_arr,
      smooth: true,
      yAxisIndex:axisValues.KARK_K1_FR_axis,
    },

    {
      name:  "Kareedouw K1 Current",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.KARK_K1_CUR_arr,
      smooth: true,
      yAxisIndex:axisValues.KARK_K1_CUR_axis,
    },
    {
      name:  "Kareedouw K1 Level",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.KARK_K1_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.KARK_K1_LVL_axis,
    },

    {
      name:  "Kareedouw K2 Total Flow",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.KARK_K2_TF_arr,
      smooth: true,
      yAxisIndex:axisValues.KARK_K2_TF_axis,
    },
    {
      name:  "Kareedouw K2 Flow Rate",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.KARK_K2_FR_arr,
      smooth: true,
      yAxisIndex:axisValues.KARK_K2_FR_axis,
    },

    {
      name:  "Kareedouw K2 Current",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.KARK_K2_CUR_arr,
      smooth: true,
      yAxisIndex:axisValues.KARK_K2_CUR_axis,
    },
    {
      name:  "Kareedouw K2 Level",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.KARK_K2_LVL_arr,
      smooth: true,
      yAxisIndex:axisValues.KARK_K2_LVL_axis,
    },
    {
      name:  "Rosedale Reservoir Total Flow",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.WDNR_ROSE_TF_arr,
      smooth: true,
      yAxisIndex:axisValues.WDNR_ROSE_TF_axis,
    },
    {
      name:  "Rosedale Reservoir Flow Rate",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.WDNR_ROSE_FR_arr,
      smooth: true,
      yAxisIndex:axisValues.WDNR_ROSE_FR_axis,
    },
    {
      name:  "Rowallan Park Extension Pressure",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.WDSR_ROWP_BAR_arr,
      smooth: true,
      yAxisIndex:axisValues.WDSR_ROWP_BAR_axis,
    },
    {
      name:  "Rowallan Park Extension Total Flow",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.WDSR_ROWP_TF_arr,
      smooth: true,
      yAxisIndex:axisValues.WDSR_ROWP_TF_axis,
    },
    {
      name:  "Rowallan Park Extension Flow Rate",
      type: 'line',
      showSymbol: false,
      hoverAnimation: true,
      data: this.variable.WDSR_ROWP_FR_arr,
      smooth: true,
      yAxisIndex:axisValues.WDSR_ROWP_FR_axis,
    },

  ]
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
  this.bushyPSSelected = [];
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



    case "Bushy Park Soccoman Flow Rate":
              this.bushyPSSelected[0] = true;
              break;

             case  "Bushy Park Soccoman Pressure":
               this.bushyPSSelected[1] = true;
               break;

             case "Bushy Park Soccoman Total Flow":
               this.bushyPSSelected[2] = true;
               break;

               case "Bushy Park Steel Flow Rate":
                this.bushyPSSelected[3] = true;
                break;

            case "Bushy Park Steel Pressure":
            this.bushyPSSelected[4] = true;
            break;


            case "Bushy Park Steel Total Flow":
              this.bushyPSSelected[5] = true;
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




  case "Chatty North Chamber Level":this.chtTagsSelected[0]=true
  break;
  case "Chatty South Chamber Level":this.chtTagsSelected[1]=true
  break;
  case "Chatty Overhead Level":this.chtTagsSelected[2]=true
  break;
  case "Chatty Flow Rate":this.chtTagsSelected[3]=true
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
  this.effTagsSelected[0]=true
  break;
  case"NMU Effluent Delivery Pressure":
  this.effTagsSelected[1]=true
  break;
  case"NMU Effluent Dam Level":
  this.effTagsSelected[2]=true
  break;
  case"NMU Effluent Pump 1 Speed":
  this.effTagsSelected[3]=true
  break;
  case"NMU Effluent Pump 2 Speed":
  this.effTagsSelected[4]=true
  break;
  case"NMU Effluent Pump 3 Speed":
  this.effTagsSelected[5]=true
  break;
  case"NMU Effluent Jockey Pump Speed":
  this.effTagsSelected[6]=true
  break;

  case "Motherwell Flow Rate":
    this.mwTagsSelected[0]=true
    break;
    case "Motherwell Delivery Pressure":
      this.mwTagsSelected[1]=true
    break;
    case "Motherwell Suction Pressure":
      this.mwTagsSelected[2]=true
  break;


  case "Motherwell Reservoir Level":
    this.mwrTagsSelected[0] = true;
    break;


  // Stanford Road
  case "Stanford Road Flow Rate":this.stanTagsSelected[0]=true
  break;
  case "Stanford Road Delivery Pressure":this.stanTagsSelected[1]=true
  break;
  case "Stanford Road Suction Pressure":this.stanTagsSelected[2]=true
  break;
  case "Stanford Road Pump 1 Frequency":this.stanTagsSelected[3]=true
  break;
  case "Stanford Road Pump 2 Frequency":this.stanTagsSelected[4]=true
  break;
  case "Stanford Road Pump 3 Frequency":this.stanTagsSelected[5]=true
  break;
  case "Stanford Road Pump 4 Frequency":this.stanTagsSelected[6]=true
  break;

  case "Malabar Reservoir Level":this.maliTagsSelected[0] = true;
  break;


  //Ground Water
  case "Newton Park Pool Pressure":
    this.npTagsSelected[0]=true
  break;
  case "Newton Park Pool Flow Rate":
    this.npTagsSelected[1]=true
  break;
  case "Newton Park Pool Water Level":
    this.npTagsSelected[2]=true
  break;
  case "Newton Park Pool Total Flow":
    this.npTagsSelected[3]=true
    break;


    case "HD1 Flow Rate":
      this.hup1TagSelected[0]=true
    break;
    case "HD1 Water Level":
      this.hup1TagSelected[1]=true
    break;
    case "HD1 Water Total Flow":
      this.hup1TagSelected[2]=true
    break;

    case "HD2C Flow Rate":
      this.hup2TagSelected[0]=true
    break;
    case "HD2C Water Level":
      this.hup2TagSelected[1]=true
    break;

    case "HD2C Water Total Flow":
      this.hup2TagSelected[2]=true
    break;
    case "HD3 Flow Rate":
      this.hup3TagSelected[0]=true
    break;
    case "HD3 Water Level":
      this.hup3TagSelected[1]=true
    break;
    case "HD3 Water Total Flow":
      this.hup3TagSelected[2]=true
    break;

    case "HD4 Flow Rate":
      this.hup4TagSelected[0]=true
    break;
    case "HD4 Water Level":
      this.hup4TagSelected[1]=true
    break;

    case "HD4 Water Total Flow":
      this.hup4TagSelected[2]=true
    break;
    case "HD6 Flow Rate":
      this.hup6TagSelected[0]=true
    break;
    case "HD6 Water Level":
      this.hup6TagSelected[1]=true
    break;
    case "HD6 Water Total Flow":
      this.hup6TagSelected[2]=true
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
this.ReadSelectedValues(this.isuzuTagListArr, this.isuzuSelected, "Isuzu Oven ")
this.ReadSelectedValues(this.kruisRTagListArr, this.kruisRSelected, "Kruisfontein ")
this.ReadSelectedValues(this.airPortTagListArr, this.airPortSelected, "Airport ")
this.ReadSelectedValues(this.kruis12GWTagListArr, this.kruis12GWSelected, "Kruisfontein Borhole 12 ")
this.ReadSelectedValues(this.kruis13GWTagListArr, this.kruis13GWSelected, "Kruisfontein Borhole 13 ")
this.ReadSelectedValues(this.kruis14GWTagListArr, this.kruis14GWSelected, "Kruisfontein Borhole 14 ")
this.ReadSelectedValues(this.stGeorgeTagListArr, this.stGeorgeTagsSelected, "St Georges ")
this.ReadSelectedValues(this.emerTagListArr,this.emerTagsSelected, "Emerald Hill ")
this.ReadSelectedValues(this.bhbTagListArr,this.bhbTagsSelected, "Blue Horizon Bay ")
this.ReadSelectedValues(this.chtTagListArr,this.chtTagsSelected, "Chatty ")
this.ReadSelectedValues(this.driftTagListArr,this.driftTagsSelected,"Driftsands ")
this.ReadSelectedValues(this.cheTagListArr,this.cheTagsSelected, "Chelsea ")
this.ReadSelectedValues(this.cgkTagListArr,this.cgkTagsSelected, "Coega Kop ")
this.ReadSelectedValues(this.grTagListArr,this.grTagsSelected, "Grassridge ")
this.ReadSelectedValues(this.oliTagListArr,this.oliTagSelected,"Olifantskop ")
this.ReadSelectedValues(this.bushyPSTagListArr, this.bushyPSSelected, "Bushy Park ")
this.ReadSelectedValues(this.bushyFPTTagListArr, this.bushyFPTSelected, "Bushy Park ")
this.ReadSelectedValues(this.gbTagListArr,this.gbTagsSelected, "Greenbushes ")
this.ReadSelectedValues(this.hbTagListArr,this.hbTagsSelected, "Heatherbank ")
this.ReadSelectedValues(this.hbpTagListArr,this.bhpTagsSelected, "Heatherbank Pumpstation ")
this.ReadSelectedValues(this.lhTagListArr,this.lhTagsSelected, "Lovemore Heights ")
this.ReadSelectedValues(this.rdTagListArr,this.rdTagsSelected, "Rosedale ")
this.ReadSelectedValues(this.schoeTagListArr,this.schoeTagsSelected, "Schoemanshoek ")
this.ReadSelectedValues(this.smTagListArr,this.smTagsSelected, "Summit ")
this.ReadSelectedValues(this.thTagListArr,this.thTagsSelected, "Theescombe ")
this.ReadSelectedValues(this.vrhTagListArr,this.vrhTagsSelected, "Van Riebeeck Hoogte ")
this.ReadSelectedValues(this.vsTagListArr,this.vsTagsSelected, "Van Stadens ")
this.ReadSelectedValues(this.effTagListArr,this.effTagsSelected, "NMU Effluent ")
this.ReadSelectedValues(this.bergenTagListArr,this.bergenTagsSelected, "Bergendal ")
this.ReadSelectedValues(this.wolwasTagListArr,this.wolwasTagsSelected, "Wolwas ")
this.ReadSelectedValues(this.umiTagListArr,this.umiTagsSelected, "Umasizakhe ")
this.ReadSelectedValues(this.kroonTagListArr,this.kroonTagsSelected, "Kroonvale ")
this.ReadSelectedValues(this.holdingTagListArr,this.holdingTagsSelected, "Holding ")
this.ReadSelectedValues(this.damcampTagListArr,this.damcampTagsSelected, "Damcamp ")
this.ReadSelectedValues(this.tinroofTagListArr,this.tinroofTagsSelected, "Tin Roof ")
this.ReadSelectedValues(this.cgTagListArr,this.cgTagsSelected, "Crown Gardens ")
this.ReadSelectedValues(this.mwTagListArr,this.mwTagsSelected, "Motherwell ")
this.ReadSelectedValues(this.mwrTagListArr, this.mwrTagsSelected, "Motherwell ")
this.ReadSelectedValues(this.stanTagListArr,this.stanTagsSelected, "Stanford Road ")
this.ReadSelectedValues(this.stormsTagListArr, this.stormsTagSelected, "Storms River ")
this.ReadSelectedValues(this.chePSTagListArr,this.chePSTagsSelected, "Chelsea ")
this.ReadSelectedValues(this.karkTagListArr, this.karkTagSelected,"Kareedouw ")
this.ReadSelectedValues(this.maliTagListArr,  this.maliTagsSelected, "Malabar ")
this.ReadSelectedValues(this.gbwTagListArr,this.gbwTagsSelected, "Gamtoos Break Water ")
this.ReadSelectedValues(this.cgkIDZTagListArr,this.cgkIDZTagsSelected, "Coega ")
this.ReadSelectedValues(this.fmtTagListArr,this.fmtTagsSelected, "FM Tower ")
this.ReadSelectedValues(this.gamtoosTagListArr,this.gamtoosTagsSelected, "Gamtoos Bridge ")
this.ReadSelectedValues(this.uitTagListArr,this.uitTagsSelected, "Uitenhage Flow Chamber ")
this.ReadSelectedValues(this.bethTagListArr,this.bethTagSelected, "Bethelsdorp ")
this.ReadSelectedValues(this.humGroundListArr, this.humGroundSelected, "Humerail ")
this.ReadSelectedValues(this.humOffTakeTagListArr,this.humOffTakeSelected,"Humansdorp ")
this.ReadSelectedValues(this.jeffBayOffTakeTagListArr,this.jeffBayOffTakeSelected,"Jeffreys Bay ")
this.ReadSelectedValues(this.kougaMainLineTagListArr,this.kougaMainLineSelected,"Kouga Main Line ")
this.ReadSelectedValues(this.onsParadysTagListArr,this.onsParadysSelected,"Ons Paradys ")
this.ReadSelectedValues(this.npTagListArr,this.npTagsSelected, "Newton Park Pool ")
this.ReadSelectedValues(this.hup1TagListArr,this.hup1TagSelected, "HD1 ")
this.ReadSelectedValues(this.hup2TagListArr,this.hup2TagSelected, "HD2C ")
this.ReadSelectedValues(this.hup3TagListArr,this.hup3TagSelected, "HD3 ")
this.ReadSelectedValues(this.hup4TagListArr,this.hup4TagSelected, "HD4 ")
this.ReadSelectedValues(this.hup6TagListArr,this.hup6TagSelected, "HD6 ")
this.ReadSelectedValues(this.ngtTagListArr,this.ngtTagsSelected, "Nooitgedacht ")
this.ReadSelectedValues(this.stormsWTWTagListArr, this.stormsWTWTagSelected, "Storms River ")
this.ReadSelectedValues(this.elandTagListArr,this.elandTagSelected, "Elandsjagt ")
this.ReadSelectedValues(this.klmWtwInletListArr , this.klmWtwInletSelected, "Humansdorp Inlet ")
this.ReadSelectedValues(this.kwanoListArr, this.kwanoSelected, "Kwanobuhle Reservoir ")
this.ReadSelectedValues(this.LSDListArr,this.LSDSelected,"Lee Samuals Drive " )
this.ReadSelectedValues(this.MNTSListArr,this.MNTSSelected,"McNoughton Township South ")

this.ReadSelectedValues(this.RRListArr,this.RRSelected,"Rowallan Park Extension " )

this.ReadSelectedValues(this.RPEListArr,this.RPESelected,"Rosedale Reservoir " )
console.log( this.selectedTags)
  }

  TrendInfoTable(sitesChosen:any[]){
    var maxValues=[]
    var minValues=[]
    var avgValues=[]
    this.dataSource=[];
    this.dataSource = new MatTableDataSource();
    this.ELEMENT_DATA=[];
    for (var m = 0; m < sitesChosen.length; m++) {
      switch (sitesChosen[m]) {
        // Reservoirs

        case "Isuzu Oven 1 VSD Speed":
          if(this.variable.isuzu_oven1_vsd_speed_arr.length == 0){break;}
          else{
            var arr = this.MinMaxAvg(m,this.variable.isuzu_oven1_vsd_speed_arr)!
            minValues[m]= arr[0]
            maxValues[m]=arr[1]
            avgValues[m]=arr[2]
               }

                   break;

            case "Isuzu Oven 1 Heat Exchanger Temperature":
             if(this.variable.isuzu_oven1_heat_ecvh_temp_arr.length == 0){break;}
             else{
               var arr = this.MinMaxAvg(m,this.variable.isuzu_oven1_heat_ecvh_temp_arr)!
               minValues[m]= arr[0]
               maxValues[m]=arr[1]
               avgValues[m]=arr[2]
                  }
              break;


              case "Isuzu Oven 1 Temperature 1":
                if(this.variable.isuzu_oven1_temp1_arr.length == 0){break;}
                else{
                  var arr = this.MinMaxAvg(m,this.variable.isuzu_oven1_temp1_arr)!
                  minValues[m]= arr[0]
                  maxValues[m]=arr[1]
                  avgValues[m]=arr[2]
                     }

                         break;

                  case "Isuzu Oven 1 Temperature 2":
                   if(this.variable.isuzu_oven1_temp2_arr.length == 0){break;}
                   else{
                     var arr = this.MinMaxAvg(m,this.variable.isuzu_oven1_temp2_arr)!
                     minValues[m]= arr[0]
                     maxValues[m]=arr[1]
                     avgValues[m]=arr[2]
                        }
                    break;



                    case "Isuzu Oven 2 VSD Speed":
                      if(this.variable.isuzu_oven2_vsd_speed_arr.length == 0){break;}
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.isuzu_oven2_vsd_speed_arr)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
                           }

                               break;

                        case "Isuzu Oven 2 Heat Exchanger Temperature":
                         if(this.variable.isuzu_oven2_heat_ecvh_temp_arr.length == 0){break;}
                         else{
                           var arr = this.MinMaxAvg(m,this.variable.isuzu_oven2_heat_ecvh_temp_arr)!
                           minValues[m]= arr[0]
                           maxValues[m]=arr[1]
                           avgValues[m]=arr[2]
                              }
                          break;


                          case "Isuzu Oven 2 Temperature 1":
                            if(this.variable.isuzu_oven2_temp1_arr.length == 0){break;}
                            else{
                              var arr = this.MinMaxAvg(m,this.variable.isuzu_oven2_temp1_arr)!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                                 }

                                     break;

                              case "Isuzu Oven 2 Temperature 2":
                               if(this.variable.isuzu_oven2_temp2_arr.length == 0){break;}
                               else{
                                 var arr = this.MinMaxAvg(m,this.variable.isuzu_oven2_temp2_arr)!
                                 minValues[m]= arr[0]
                                 maxValues[m]=arr[1]
                                 avgValues[m]=arr[2]
                                    }
                                break;










        case "Kwanobuhle Reservoir Level":
          if(this.variable.KWANO_R_RES_LVL_arr.length == 0){break;}
          else{
            var arr = this.MinMaxAvg(m,this.variable.KWANO_R_RES_LVL_arr)!
            minValues[m]= arr[0]
            maxValues[m]=arr[1]
            avgValues[m]=arr[2]
               }

                   break;


        case "Kwanobuhle Reservoir Flow Rate 1":
         if(this.variable.KWANO_R_FLOW_RATE_1_arr.length == 0){break;}
         else{
           var arr = this.MinMaxAvg(m,this.variable.KWANO_R_FLOW_RATE_1_arr)!
           minValues[m]= arr[0]
           maxValues[m]=arr[1]
           avgValues[m]=arr[2]
              }

                  break;


       case "Kwanobuhle Reservoir Flow Rate 2":
         if(this.variable.KWANO_R_FLOW_RATE_2_arr.length == 0){break;}
         else{
           var arr = this.MinMaxAvg(m,this.variable.KWANO_R_FLOW_RATE_2_arr)!
           minValues[m]= arr[0]
           maxValues[m]=arr[1]
           avgValues[m]=arr[2]
              }

                  break;


       case "Kwanobuhle Reservoir Total Flow 1":
        if(this.variable.KWANO_R_TOTAL_FLOW_1_arr.length == 0){break;}
        else{
          var arr = this.MinMaxAvg(m,this.variable.KWANO_R_TOTAL_FLOW_1_arr)!
          minValues[m]= arr[0]
          maxValues[m]=arr[1]
          avgValues[m]=arr[2]
             }

                 break;

       case "Kwanobuhle Reservoir Total Flow 2":
        if(this.variable.KWANO_R_TOTAL_FLOW_2_arr.length == 0){break;}
        else{
          var arr = this.MinMaxAvg(m,this.variable.KWANO_R_TOTAL_FLOW_2_arr)!
          minValues[m]= arr[0]
          maxValues[m]=arr[1]
          avgValues[m]=arr[2]
             }

                 break;




        case "Kruisfontein Borhole 12 Level":
          if(this.variable.klm_kruis12_lvl_arr.length == 0){break;}
          else{
            var arr = this.MinMaxAvg(m,this.variable.klm_kruis12_lvl_arr)!
            minValues[m]= arr[0]
            maxValues[m]=arr[1]
            avgValues[m]=arr[2]
               }

                   break;


                   case "Kruisfontein Reservoir Level":
                    if(this.variable.klm_kruis_res_lvl_arr.length == 0){break;}
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.klm_kruis_res_lvl_arr)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
                         }

                             break;


        case "Kruisfontein Borhole 12 Current":
         if(this.variable.klm_kruis12_current_arr.length == 0){break;}
         else{
           var arr = this.MinMaxAvg(m,this.variable.klm_kruis12_current_arr)!
           minValues[m]= arr[0]
           maxValues[m]=arr[1]
           avgValues[m]=arr[2]
              }

                  break;

         case "Kruisfontein Borhole 12 Pressure":
          if(this.variable.klm_kruis12_bar_arr.length == 0){break;}
          else{
            var arr = this.MinMaxAvg(m,this.variable.klm_kruis12_bar_arr)!
            minValues[m]= arr[0]
            maxValues[m]=arr[1]
            avgValues[m]=arr[2]
               }

                   break;

                   case "Humansdorp Inlet Total Flow":
                    if(this.variable.klm_hup_wtw_tf_arr.length == 0){break;}
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.klm_hup_wtw_tf_arr)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
                         }

                             break;



                   case "Humansdorp Inlet Flow Rate":
                    if(this.variable.klm_hup_wtw_flow_arr.length == 0){break;}
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.klm_hup_wtw_flow_arr)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
                         }

                             break;

          case "Kruisfontein Borhole 12 Flow Rate":
           if(this.variable.klm_kruis12_flow_rate_arr.length == 0){break;}
           else{
             var arr = this.MinMaxAvg(m,this.variable.klm_kruis12_flow_rate_arr)!
             minValues[m]= arr[0]
             maxValues[m]=arr[1]
             avgValues[m]=arr[2]
                }

                    break;


              case "Kruisfontein Borhole 12 Total Flow":
              if(this.variable.klm_kruis12_total_flow_arr.length == 0){break;}
              else{
                var arr = this.MinMaxAvg(m,this.variable.klm_kruis12_total_flow_arr)!
                minValues[m]= arr[0]
                maxValues[m]=arr[1]
                avgValues[m]=arr[2]
                   }

                       break;


                       case "Kruisfontein Borhole 13 Level":
                        if(this.variable.klm_kruis13_lvl_arr.length == 0){break;}
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.klm_kruis13_lvl_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                             }

                                 break;


                      case "Kruisfontein Borhole 13 Current":
                       if(this.variable.klm_kruis13_current_arr.length == 0){break;}
                       else{
                         var arr = this.MinMaxAvg(m,this.variable.klm_kruis13_current_arr)!
                         minValues[m]= arr[0]
                         maxValues[m]=arr[1]
                         avgValues[m]=arr[2]
                            }

                                break;

                       case "Kruisfontein Borhole 13 Pressure":
                        if(this.variable.klm_kruis13_bar_arr.length == 0){break;}
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.klm_kruis13_bar_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                             }

                                 break;



                        case "Kruisfontein Borhole 13 Flow Rate":
                         if(this.variable.klm_kruis13_flow_rate_arr.length == 0){break;}
                         else{
                           var arr = this.MinMaxAvg(m,this.variable.klm_kruis13_flow_rate_arr)!
                           minValues[m]= arr[0]
                           maxValues[m]=arr[1]
                           avgValues[m]=arr[2]
                              }

                                  break;


                            case "Kruisfontein Borhole 13 Total Flow":
                            if(this.variable.klm_kruis13_total_flow_arr.length == 0){break;}
                            else{
                              var arr = this.MinMaxAvg(m,this.variable.klm_kruis13_total_flow_arr)!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                                 }

                                     break;



                                     case "Kruisfontein Borhole 14 Level":
                        if(this.variable.klm_kruis14_lvl_arr.length == 0){break;}
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.klm_kruis14_lvl_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                             }

                                 break;


                      case "Kruisfontein Borhole 14 Current":
                       if(this.variable.klm_kruis14_current_arr.length == 0){break;}
                       else{
                         var arr = this.MinMaxAvg(m,this.variable.klm_kruis14_current_arr)!
                         minValues[m]= arr[0]
                         maxValues[m]=arr[1]
                         avgValues[m]=arr[2]
                            }

                                break;

                       case "Kruisfontein Borhole 14 Pressure":
                        if(this.variable.klm_kruis14_bar_arr.length == 0){break;}
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.klm_kruis14_bar_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                             }

                                 break;



                        case "Kruisfontein Borhole 14 Flow Rate":
                         if(this.variable.klm_kruis14_flow_rate_arr.length == 0){break;}
                         else{
                           var arr = this.MinMaxAvg(m,this.variable.klm_kruis14_flow_rate_arr)!
                           minValues[m]= arr[0]
                           maxValues[m]=arr[1]
                           avgValues[m]=arr[2]
                              }

                                  break;


                            case "Kruisfontein Borhole 14 Total Flow":
                            if(this.variable.klm_kruis14_total_flow_arr.length == 0){break;}
                            else{
                              var arr = this.MinMaxAvg(m,this.variable.klm_kruis14_total_flow_arr)!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                                 }

                                     break;


                        case "Lee Samuals Drive Pressure":
                          if(this.variable.LSD_PRESSURE_arr.length == 0){break;}
                          else{
                            var arr = this.MinMaxAvg(m,this.variable.LSD_PRESSURE_arr)!
                            minValues[m]= arr[0]
                            maxValues[m]=arr[1]
                            avgValues[m]=arr[2]
                               }

                          break;

                          case "Lee Samuals Drive Total Flow":
                            if(this.variable.LSD_TOTAL_FLOW_arr.length == 0){break;}
                            else{
                              var arr = this.MinMaxAvg(m,this.variable.LSD_TOTAL_FLOW_arr)!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                                 }

                            break;


                            case "Lee Samuals Drive Flow Rate":
                              if(this.variable.LSD_FLOW_RATE_arr.length == 0){break;}
                              else{
                                var arr = this.MinMaxAvg(m,this.variable.LSD_FLOW_RATE_arr)!
                                minValues[m]= arr[0]
                                maxValues[m]=arr[1]
                                avgValues[m]=arr[2]
                                   }

                              break;


                              case "McNoughton Township South Pressure":
                                if(this.variable.McNougTown_PRESSURE_arr.length == 0){break;}
                                else{
                                  var arr = this.MinMaxAvg(m,this.variable.McNougTown_PRESSURE_arr)!
                                  minValues[m]= arr[0]
                                  maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
                                     }

                                break;

                                case "McNoughton Township South Total Flow":
                                  if(this.variable.McNougTown_TOTAL_FLOW_arr.length == 0){break;}
                                  else{
                                    var arr = this.MinMaxAvg(m,this.variable.McNougTown_TOTAL_FLOW_arr)!
                                    minValues[m]= arr[0]
                                    maxValues[m]=arr[1]
                                    avgValues[m]=arr[2]
                                       }

                                  break;


                                  case "McNoughton Township South Flow Rate":
                                    if(this.variable.McNougTown_FLOW_RATE_arr.length == 0){break;}
                                    else{
                                      var arr = this.MinMaxAvg(m,this.variable.McNougTown_FLOW_RATE_arr)!
                                      minValues[m]= arr[0]
                                      maxValues[m]=arr[1]
                                      avgValues[m]=arr[2]
                                         }

                                    break;




        case "Greenbushes Reservoir Level":
          if (this.variable.GBarray.length==0){break;}
            else{
     var arr = this.MinMaxAvg(m,this.variable.GBarray)!
     minValues[m]= arr[0]
     maxValues[m]=arr[1]
     avgValues[m]=arr[2]
        }

            break;

            case "St Georges Borehole Flow Rate":
                                            if (this.variable.st_georges_wtw_gw_FR_arr.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.st_georges_wtw_gw_FR_arr)!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                              avgValues[m]=arr[2]
                                         }
                                            break;


                                            case "St Georges Borehole Total Flow":
                                              if (this.variable.st_georges_wtw_gw_TF_arr.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.st_georges_wtw_gw_TF_arr)!
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                avgValues[m]=arr[2]
                                           }
                                              break;


                                              case "St Georges Emerald Hill Flow Rate":
                                                if (this.variable.st_georges_wtw_emer_hill_FR_arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.st_georges_wtw_emer_hill_FR_arr)!
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                             }
                                                break;


                                                case "St Georges Emerald Hill Total Flow":
                                                  if (this.variable.st_georges_wtw_emer_hill_TF_arr.length==0){
                                                  break;
                                                }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.st_georges_wtw_emer_hill_TF_arr)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                               }
                                                  break;

                                                  case "Malabar Reservoir Level":
                                                    if(this.variable.mala_lvl_arr.length == 0){break;}
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.mala_lvl_arr)!
                                                      minValues[m]= arr[0]
                                                      maxValues[m]=arr[1]
                                                      avgValues[m]=arr[2]
                                                         }

                                                             break;



            case "Greenbushes Flow Rate":
              if (this.variable.GBFRarray.length==0){break;}
                else{
         var arr = this.MinMaxAvg(m,this.variable.GBFRarray)!
         minValues[m]= arr[0]
         maxValues[m]=arr[1]
         avgValues[m]=arr[2]
            }

                break;
            case "Chelsea Reservoir West Chamber Level":
              if (this.variable.CHE_West_array==undefined){
                break;
              }
                else{
                  var arr = this.MinMaxAvg(m,this.variable.CHE_West_array)!
                  minValues[m]= arr[0]
                  maxValues[m]=arr[1]
                  avgValues[m]=arr[2]
        }
              break;

              case "Chelsea Reservoir East Chamber Level":
                if (this.variable.CHE_East_array==undefined){
                  break;
                }
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CHE_East_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
          }
                break;


                case "Chelsea Reservoir Summit 1200 mm Flow Rate":
                  if (this.variable.CHE_R_FR1200_arr==undefined){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.CHE_R_FR1200_arr)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
            }
                  break;

                  case "Chelsea Reservoir Greenbushes 600 mm Flow Rate":
                    if (this.variable.CHE_R_FR600_arr==undefined){
                      break;
                    }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.CHE_R_FR600_arr)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
              }
                    break;


                    case "Chelsea Reservoir Summit 1200 mm Total Flow":
                      if (this.variable.CHE_R_TF1200_arr==undefined){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.CHE_R_TF1200_arr)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                }
                      break;

                      case "Chelsea Reservoir Greenbushes 600 mm Total Flow":
                        if (this.variable.CHE_R_TF600_arr==undefined){
                          break;
                        }
                          else{
                            var arr = this.MinMaxAvg(m,this.variable.CHE_R_TF600_arr)!
                            minValues[m]= arr[0]
                            maxValues[m]=arr[1]
                            avgValues[m]=arr[2]
                  }
                        break;




                case "Driftsands Reservoir Level":
                if (this.variable.drift_R_reservoir_level_arr==undefined){
                  break;
                }
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.drift_R_reservoir_level_arr)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
          }
                break;

                case "Driftsands Flow Rate 1":
                  if (this.variable.drift_R_flow_rate_1_arr==undefined){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.drift_R_flow_rate_1_arr)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
            }
                  break;



                case "Driftsands Flow Rate 2":
                  if (this.variable.drift_R_flow_rate_2_arr==undefined){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.drift_R_flow_rate_2_arr)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
            }
                  break;

                  case "Driftsands Total Flow 1":
                    if (this.variable.drift_R_total_flow_1_arr.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.drift_R_total_flow_1_arr)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
                   }
                    break;


                 case "Driftsands Total Flow 2":
                    if (this.variable.drift_R_total_flow_2_arr.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.drift_R_total_flow_2_arr)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
                   }
                    break;


                case "Storms River Holding Reservoir Level":
                  if (this.variable.STORMS_HOLDING_RESERVOIR_LEVEL_Arr.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.STORMS_HOLDING_RESERVOIR_LEVEL_Arr)
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
}
                  break;


                case "Storms River Overhead Tank Level":
                  if (this.variable.STORMS_OVERHEAD_TANK_LEVEL_Arr.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.STORMS_OVERHEAD_TANK_LEVEL_Arr)
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
}
                  break;


                case "Storms River Quarry Level":
                  if (this.variable.STORMS_QUARRY_LEVEL_Arr.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.STORMS_QUARRY_LEVEL_Arr)
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
}
                  break;


                case "Storms River Gorge Level":
                  if (this.variable.STORMS_GORGE_LEVEL_Arr.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.STORMS_GORGE_LEVEL_Arr)
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
}
                  break;

                  case "Grassridge Inlet Flow":
                    if (this.variable.GR_R_INLET_Arr.length==0){
                      break;
                    }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.GR_R_INLET_Arr)
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                         avgValues[m]=arr[2]

                       }
                       break;
                  case "Grassridge Outlet Flow":
                    if (this.variable.GR_R_OUTLET_Arr.length==0){
                      break;
                    }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.GR_R_OUTLET_Arr)
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                         avgValues[m]=arr[2]

                       }
                       break;






              case "Grassridge East Chamber Level":
                if (this.variable.GR_EC_array.length==0){
                  break;
                }
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.GR_EC_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
        }
                break;

                case "Coega Kop to Coega IDZ Flow Rate":
                  if(this.variable.CGK_COEGA_FLOW_RATE_array.length==0){
                    break;
                  }else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_COEGA_FLOW_RATE_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                  case "Coega Kop Reservoir Pressure":
                  if(this.variable.CGK_PRESSURE_array.length==0) {
                    break;
                  }
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_PRESSURE_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;


                  case "Olifantskop Reservoir Level":
                    if(this.variable.OLI_LVL_array.length==0) {
                      break;
                    }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.OLI_LVL_array)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
                    }
                    break;


                    case   "Bushy Park Soccoman Flow Rate":
                      if (this.variable.BUSH_CHURCH_SOCO_FR_arr.length==0){break;}
                        else{
                 var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_SOCO_FR_arr)!
                 minValues[m]= arr[0]
                 maxValues[m]=arr[1]
                 avgValues[m]=arr[2]
                                    }
                                    break;

                 case "Bushy Park Steel Flow Rate":
                  if (this.variable.BUSH_CHURCH_STEEL_FR_arr.length==0){break;}
                    else{
             var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_STEEL_FR_arr)!
             minValues[m]= arr[0]
             maxValues[m]=arr[1]
             avgValues[m]=arr[2]
                                }
                           break;

                           case "Airport Reservoir Level":
                            if (this.variable.AIR_PRT_LVL_arr.length==0){break;}
                              else{
                       var arr = this.MinMaxAvg(m,this.variable.AIR_PRT_LVL_arr)!
                       minValues[m]= arr[0]
                       maxValues[m]=arr[1]
                       avgValues[m]=arr[2]
                                          }
                                     break;



               case "Bushy Park Soccoman Pressure":
                if (this.variable.BUSH_CHURCH_SOCCO_BAR_arr.length==0){break;}
                  else{
           var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_SOCCO_BAR_arr)!
           minValues[m]= arr[0]
           maxValues[m]=arr[1]
           avgValues[m]=arr[2]
                              }
                         break;

                case "Bushy Park Steel Pressure":
                 if (this.variable.BUSH_CHURCH_STEEL_BAR_arr.length==0){break;}
                   else{
            var arr = this.MinMaxAvg(m,this.variable.BUSH_CHURCH_STEEL_BAR_arr)!
            minValues[m]= arr[0]
            maxValues[m]=arr[1]
            avgValues[m]=arr[2]
                               }
                          break;

                case "Bushy Park Pumpstation Flow Rate":
                 if (this.variable.BUSH_PUMP_FR_arr.length==0){break;}
                   else{
            var arr = this.MinMaxAvg(m,this.variable.BUSH_PUMP_FR_arr)!
            minValues[m]= arr[0]
            maxValues[m]=arr[1]
            avgValues[m]=arr[2]
                               }
                          break;


                case "Bushy Park Combined Borehole Flow Rate":
                 if (this.variable.BUSH_GW_COMB_FLOW_RATE_arr.length==0){break;}
                   else{
            var arr = this.MinMaxAvg(m,this.variable.BUSH_GW_COMB_FLOW_RATE_arr)!
            minValues[m]= arr[0]
            maxValues[m]=arr[1]
            avgValues[m]=arr[2]
                               }
                          break;


                case "Bushy Park Holding Tank Level":
                 if (this.variable.BUSH_TANK_LVL_arr.length==0){break;}
                   else{
            var arr = this.MinMaxAvg(m,this.variable.BUSH_TANK_LVL_arr)!
            minValues[m]= arr[0]
            maxValues[m]=arr[1]
            avgValues[m]=arr[2]
                               }
                          break;



                          case "Emerald Hill Reservoir Level":
                            if (this.variable.EMER_H_Level_arr.length==0){
                             break;
                          }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.EMER_H_Level_arr)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
                  }
                      break;





                    case "Emerald Hill Flow Rate":
                            if (this.variable.EMER_H_Flow_Rate_arr.length==0){
                             break;
                          }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.EMER_H_Flow_Rate_arr)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
                  }
                      break;


                    case "Emerald Hill Total Flow":
                            if (this.variable.EMER_H_Total_Flow_arr.length==0){
                             break;
                          }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.EMER_H_Total_Flow_arr)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
                  }
                      break;


                      case "Bushy Park Steel Total Flow":
                        if (this.variable.BUSH_STEEL_TF_arr.length==0){
                          break;
                       }
                   else{
                     var arr = this.MinMaxAvg(m,this.variable.BUSH_STEEL_TF_arr)!
                     minValues[m]= arr[0]
                     maxValues[m]=arr[1]
                     avgValues[m]=arr[2]
               }
                   break;


                   case "Bushy Park Soccoman Total Flow":
                    if (this.variable.BUSH_SOCO_TF_arr.length==0){
                      break;
                   }
               else{
                 var arr = this.MinMaxAvg(m,this.variable.BUSH_SOCO_TF_arr)!
                 minValues[m]= arr[0]
                 maxValues[m]=arr[1]
                 avgValues[m]=arr[2]
           }
               break;


                case "Coega Kop Inlet Chamber 2 Ml":
                  if(this.variable.CGK_LEVEL_array.length==0) {
                    break;
                  }
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_LEVEL_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                  case "Coega Kop to Coega IDZ Total Flow":
                  if(this.variable.CGK_COEGA_TOTAL_FLOW_array.length==0)
                  {break;}
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_COEGA_TOTAL_FLOW_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                  case "Coega Kop North Chamber 17 Ml":
                    if(this.variable.CGK_KOP_NC_17_ML_array.length==0) {
                      break;
                    }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.CGK_KOP_NC_17_ML_array)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
                    }
                    break;


                  case "Coega Kop to Motherwell Total Flow":
                  if(this.variable.CGK_MOTHERWELL_TOTAL_FLOW_array.length==0)
                  {break;}
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_MOTHERWELL_TOTAL_FLOW_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                  case "Coega Kop from Grassridge Total Flow":
                  if(this.variable.CGK_GRASSRIDGE_TOTAL_FLOW_array.length==0)
                  {break;}
                  else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_GRASSRIDGE_TOTAL_FLOW_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;

                case "Coega Kop to Motherwell Flow Rate":
                  if(this.variable.CGK_MOTHERWELL_FLOW_RATE_array.length==0) {
                    break;
                  } else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_MOTHERWELL_FLOW_RATE_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;


                case "Coega Kop from Grassridge Flow Rate":
                  if(this.variable.CGK_GRASSRIDGE_FLOW_RATE_array.length==0) {
                    break;
                  } else{
                    var arr = this.MinMaxAvg(m,this.variable.CGK_GRASSRIDGE_FLOW_RATE_array)!
                    minValues[m]= arr[0]
                    maxValues[m]=arr[1]
                    avgValues[m]=arr[2]
                  }
                  break;



                case "Grassridge West Chamber Level":
                  if (this.variable.GR_WC_array.length==0){
                    break;
                  }
                    else{
                      var arr = this.MinMaxAvg(m,this.variable.GR_WC_array)!
                      minValues[m]= arr[0]
                      maxValues[m]=arr[1]
                      avgValues[m]=arr[2]
        }
                  break;

                  case "Van Stadens Reservoir Level":
                    if (this.variable.VSarray.length==0){
                      break;
                    }
                      else{
                        var arr = this.MinMaxAvg(m,this.variable.VSarray)!
                        minValues[m]= arr[0]
                        maxValues[m]=arr[1]
                        avgValues[m]=arr[2]
        }
                    break;

                  case "Chatty North Chamber Level":
                      if (this.variable.CHT_NC_array.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.CHT_NC_array)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
        }
                    break;

                    case "Chatty Overhead Level":
                      if (this.variable.CHT_OR_array.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.CHT_OR_array)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                        }
                      break;

                      case "Chatty Flow Rate":
                        if (this.variable.CHE_FlowRate_array.length==0){
                          break;
                        }
                          else{
                            var arr = this.MinMaxAvg(m,this.variable.CHE_FlowRate_array)!
                            minValues[m]= arr[0]
                            maxValues[m]=arr[1]
                            avgValues[m]=arr[2]
                }
                        break;
                      case "Chatty South Chamber Level":
                      if (this.variable.CHT_SC_array.length==0){
                        break;
                      }
                        else{
                          var arr = this.MinMaxAvg(m,this.variable.CHT_SC_array)!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                        }
                        break;

                        case "Van Riebeeck Hoogte Delivery Level":
                          if (this.variable.VRH_DL_array.length==0){
                            break;
                          }
                            else{
                              var arr = this.MinMaxAvg(m,this.variable.VRH_DL_array)!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                            }

                          break;

                          case "Van Riebeeck Hoogte Suction Level":
                            if (this.variable.VRH_SL_array.length==0){
                              break;
                            }
                              else{
                                var arr = this.MinMaxAvg(m,this.variable.VRH_SL_array)!
                                minValues[m]= arr[0]
                                maxValues[m]=arr[1]
                                avgValues[m]=arr[2]
                              }

                            break;

                            case "Lovemore Heights Reservoir Level":
                              if (this.variable.LHarray.length==0){
                                break;
                              }
                                else{
                                  var arr = this.MinMaxAvg(m,this.variable.LHarray)!
                                  minValues[m]= arr[0]
                                  maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
                                }

                              break;

                              case "Lovemore Heights Overhead Tank":
                                if (this.variable.DRS_LH_RES_LVL_arr.length==0){
                                  break;
                                }
                                  else{
                                    var arr = this.MinMaxAvg(m,this.variable.DRS_LH_RES_LVL_arr)!
                                    minValues[m]= arr[0]
                                    maxValues[m]=arr[1]
                                    avgValues[m]=arr[2]
                                  }

                                break;

                              case "Blue Horizon Bay Reservoir Level":
                                if (this.variable.BHB_array.length==0){
                                break;
                              }
                                else{
                                  var arr = this.MinMaxAvg(m,this.variable.BHB_array)!
                                  minValues[m]= arr[0]
                                  maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
        }
                                break;

                                case "Rosedale Reservoir Level":
                                  if (this.variable.RD_LVL_array.length==0){
                                  break;
                                }
                                  else{
                                    var arr = this.MinMaxAvg(m,this.variable.RD_LVL_array)!
                                    minValues[m]= arr[0]
                                    maxValues[m]=arr[1]
                                    avgValues[m]=arr[2]
          }
                                  break;

                                  case "Summit Reservoir Level":
                                    if (this.variable.SM_LVL_array.length==0){
                                    break;
                                  }
                                    else{
                                      var arr = this.MinMaxAvg(m,this.variable.SM_LVL_array)!
                                      minValues[m]= arr[0]
                                      maxValues[m]=arr[1]
                                      avgValues[m]=arr[2]
            }
                                    break;

                                    case "Summit Flow Rate":
                                  if (this.variable.SM_FR_array.length==0){
                                  break;
                                }
                                  else{
                                    var arr = this.MinMaxAvg(m,this.variable.SM_FR_array)!
                                    minValues[m]= arr[0]
                                    maxValues[m]=arr[1]
                                    avgValues[m]=arr[2]
          }
                                  break;

                                case "Theescombe Reservoir Level":
                                  if (this.variable.TCarray.length==0){
                                    break;
                                  }
                                    else{
                                 var arr = this.MinMaxAvg(m,this.variable.TCarray)!
                                 minValues[m]= arr[0]
                                 maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
        }
                                  break;

                                  case "Heatherbank Reservoir Level":
                                    if (this.variable.HBarray.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.HBarray)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]
        }
                                  break;

                                  case "Heatherbank Pumpstation 1 Current":
                                     if (this.variable.hb_P1_CURRENT_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.hb_P1_CURRENT_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]
        }
                                    break;

                                    case "Heatherbank Pumpstation 2 Current":
                                       if (this.variable.hb_P2_CURRENT_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.hb_P2_CURRENT_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]
        }
                                    break;

                                    case "Heatherbank Pumpstation 3 Current":
                                       if (this.variable.hb_P3_CURRENT_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.hb_P3_CURRENT_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]
        }
                                    break;

                                    case "Heatherbank Pumpstation 1 Run Hours":
                                       if (this.variable.hb_P1_RH_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.hb_P1_RH_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]
        }
                                    break;

                                    case "Heatherbank Pumpstation 2 Run Hours":
                                       if (this.variable.hb_P2_RH_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.hb_P2_RH_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]
        }
                                    break;

                                    case "Heatherbank Pumpstation 3 Run Hours":
                                       if (this.variable.hb_P3_RH_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.hb_P3_RH_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]
        }
                                    break;
                          // FPT Sites
                                  case "Bethelsdorp Battery Level":
                                    if (this.variable.BETH_BATTERY_STATUS_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.BETH_BATTERY_STATUS_array)
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

                                       }
                                       break;
                                  case "Bethelsdorp Total Flow":
                                    if (this.variable.BETH_TOTAL_FLOW_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.BETH_TOTAL_FLOW_array)
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

                                       }
                                       break;
                                  case "Bethelsdorp Pressure":
                                    if (this.variable.BETH_PRESS_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.BETH_PRESS_array)
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

                                       }
                                       break;
                              case "Bethelsdorp Flow Rate":
                                    if (this.variable.BETH_FLOW_RATE_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.BETH_FLOW_RATE_array)
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

                                  }
                                  break;



                                  case "FM Tower Flow Rate":
                                    if (this.variable.FMT_FR_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.FMT_FR_array)
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]

        }
                                      break;

                                      case "FM Tower Pressure":
                                        if (this.variable.FMT_PRESS_array.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.FMT_PRESS_array)
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                             avgValues[m]=arr[2]

        }
                                      break;

                                      case "FM Tower Total Flow":
                                        if (this.variable.FMT_TF_array.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.FMT_TF_array)
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                             avgValues[m]=arr[2]

            }
                                          break;

                                      case "Coega IDZ Flow Rate":
                                        if (this.variable.IDZ_FR_array.length==0){
                                        break;
                                      }
                                        else{
                                          var arr = this.MinMaxAvg(m,this.variable.IDZ_FR_array)!
                                          minValues[m]= arr[0]
                                          maxValues[m]=arr[1]
                                          avgValues[m]=arr[2]
                }
                                        break;

                                        case "Coega Motherwell Flow Rate":
                                          if (this.variable.IDZ_MW_FR_array.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.IDZ_MW_FR_array)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                  }
                                          break;

                                          case "Gamtoos Bridge Steel Pipe Flow Rate":
                                            if (this.variable.GT_BRG_STL_FR_array.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.GT_BRG_STL_FR_array)!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                              avgValues[m]=arr[2]
                    }
                                            break;

                                            case "Gamtoos Bridge Socoman Pipe Flow Rate":
                                              if (this.variable.GT_BRG_SOCO_FR_array.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.GT_BRG_SOCO_FR_array)!
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                avgValues[m]=arr[2]
                      }
                                              break;

                                              case "Gamtoos Bridge Steel Pipe Pressure":
                                                if (this.variable.GT_BRG_STL_PRESS_array.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.GT_BRG_STL_PRESS_array)!
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                        }
                                                break;

                                                case "Gamtoos Bridge Socoman Pipe Pressure":
                                                  if (this.variable.GT_BRG_SOCO_PRESS_array.length==0){
                                                  break;
                                                }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.GT_BRG_SOCO_PRESS_array)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                          }
                                                  break;

                                              case "Uitenhage Flow Chamber Flow Rate":
                                                if (this.variable.UIT_FC_FR_array.length==0){
                                                  break;
                                                }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.UIT_FC_FR_array)
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                      }
                                                break;

                                                case "Uitenhage Flow Chamber Pressure":
                                                  if (this.variable.UIT_FC_PRESS_array.length==0){
                                                    break;
                                                  }
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.UIT_FC_PRESS_array)
                                                      minValues[m]= arr[0]
                                                      maxValues[m]=arr[1]
                                                      avgValues[m]=arr[2]
                                                        }
                                                  break;

                                                  case "Gamtoos Break Water Pressure":
                                                    if (this.variable.GBW_ACT_BAR_arr.length==0){
                                                      break;
                                                    }
                                                      else{
                                                        var arr = this.MinMaxAvg(m,this.variable.GBW_ACT_BAR_arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]=arr[1]
                                                        avgValues[m]=arr[2]
                                                          }
                                                    break;

                                                  case "Gamtoos Break Water Flow Rate":
                                                    if (this.variable.GBW_FLO_RAT_arr.length==0){
                                                      break;
                                                    }
                                                      else{
                                                        var arr = this.MinMaxAvg(m,this.variable.GBW_FLO_RAT_arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]=arr[1]
                                                        avgValues[m]=arr[2]
                                                          }
                                                    break;

                                      // Pump Stations
                                      case "Crown Gardens Suction Pressure":
                                        if (this.variable.CG_CSP_Arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.CG_CSP_Arr)
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
        }
                                        break;

                                        case "Crown Gardens Delivery Pressure":
                                          if (this.variable.CG_CDP_Arr.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.CG_CDP_Arr)
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                               avgValues[m]=arr[2]
        }
                                        break;

                                        case "Crown Gardens Sump Level":
                                          if (this.variable.CG_S_LVL_Arr.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.CG_S_LVL_Arr)
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                               avgValues[m]=arr[2]

        }
                                          break;

                                          case "Crown Gardens Tower 1 Level":
                                            if (this.variable.CG_T1_LVL_Arr.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.CG_T1_LVL_Arr)
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                 avgValues[m]=arr[2]
        }
                                          break;

                                          case "Crown Gardens Tower 1 Inlet Flow":
                                            if (this.variable.CG_T1_IF_Arr.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.CG_T1_IF_Arr)
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                 avgValues[m]=arr[2]
        }
                                          break;

                                          case "Crown Gardens Tower 1 Outlet Flow":
                                            if (this.variable.CG_T1_OF_Arr.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.CG_T1_OF_Arr)
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                avgValues[m]=arr[2]
        }
                                            break;

                                            case "Crown Gardens Tower 2 Level":
                                              if (this.variable.CG_T2_LVL_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CG_T2_LVL_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
        }
                                            break;

                                            case "Crown Gardens Tower 2 Inlet Flow":
                                              if (this.variable.CG_T2_IF_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CG_T2_IF_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
        }
                                            break;

                                            case "Crown Gardens Tower 2 Outlet Flow":
                                              if (this.variable.CG_T2_OF_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CG_T2_OF_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "NMU Effluent Flow Rate":
                                              if (this.variable.NMU_EFF_FR_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_FR_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "NMU Effluent Delivery Pressure":
                                              if (this.variable.NMU_EFF_DP_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_DP_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "NMU Effluent Dam Level":
                                              if (this.variable.NMU_EFF_DAM_LVL_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_DAM_LVL_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "NMU Effluent Pump 1 Speed":
                                              if (this.variable.NMU_EFF_P1_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_P1_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "NMU Effluent Pump 2 Speed":
                                              if (this.variable.NMU_EFF_P2_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_P2_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "NMU Effluent Pump 3 Speed":
                                              if (this.variable.NMU_EFF_P3_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_P3_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "NMU Effluent Jockey Pump Speed":
                                              if (this.variable.NMU_EFF_JP_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.NMU_EFF_JP_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 1 Actual Speed":
                                              if (this.variable.CHE_PS_P1_ACTUAL_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P1_ACTUAL_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 1 Delivery Pressure":
                                              if (this.variable.CHE_PS_P1_DEL_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P1_DEL_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 1 Suction Pressure":
                                              if (this.variable.CHE_PS_P1_SUCT_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P1_SUCT_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "Chelsea Pumpstation 2 Actual Speed":
                                              if (this.variable.CHE_PS_P2_ACTUAL_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P2_ACTUAL_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 2 Delivery Pressure":
                                              if (this.variable.CHE_PS_P2_DEL_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P2_DEL_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 2 Suction Pressure":
                                              if (this.variable.CHE_PS_P2_SUCT_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P2_SUCT_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 3 Actual Speed":
                                              if (this.variable.CHE_PS_P3_ACTUAL_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P3_ACTUAL_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 3 Delivery Pressure":
                                              if (this.variable.CHE_PS_P3_DEL_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P3_DEL_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 3 Suction Pressure":
                                              if (this.variable.CHE_PS_P3_SUCT_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P3_SUCT_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;



                                  case "Schoemanshoek Pressure":
                                    if (this.variable.NMB_SCHOE_PRESSURE_array.length==0){
                                    break;
                                  }
                                    else{
                                      var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_PRESSURE_array)!
                                      minValues[m]= arr[0]
                                      maxValues[m]=arr[1]
                                      avgValues[m]=arr[2]
            }
                                    break;

                                    case "Schoemanshoek Level":
                                      if (this.variable.NMB_SCHOE_RES_LEVEL_array.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_RES_LEVEL_array)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                        avgValues[m]=arr[2]
              }
                                      break;


                                      case "Schoemanshoek Actuator Position":
                                        if (this.variable.NMB_SCHOE_ACTUATOR_POSITION_array.length==0){
                                        break;
                                      }
                                        else{
                                          var arr = this.MinMaxAvg(m,this.variable.NMB_SCHOE_ACTUATOR_POSITION_array)!
                                          minValues[m]= arr[0]
                                          maxValues[m]=arr[1]
                                          avgValues[m]=arr[2]
                }
                                        break;

                                        case "Schoemanshoek Actuator Valve Feedback Signal":
                                          if (this.variable.nmb_schoe_r_actuator_valve_feedback_signal_error_arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_feedback_signal_error_arr)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                  }
                                          break;




                                          case "Schoemanshoek Actuator Valve Command Signal":
                                            if (this.variable.nmb_schoe_r_actuator_valve_command_signal_error_arr.length==0){
                                            break;
                                          }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_command_signal_error_arr)!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                              avgValues[m]=arr[2]
                    }
                                            break;


                               case "Schoemanshoek Reservoir Level Signal Error":
                                 if (this.variable.nmb_schoe_r_reservoir_level_signal_error_arr.length==0){
                                 break;
                               }
                                 else{
                                   var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_reservoir_level_signal_error_arr)!
                                   minValues[m]= arr[0]
                                   maxValues[m]=arr[1]
                                   avgValues[m]=arr[2]
                                }
                                 break;




                                 case "Schoemanshoek Actuator Valve Fault":
                                   if (this.variable.nmb_schoe_r_actuator_valve_fault_arr.length==0){
                                   break;
                                 }
                                   else{
                                     var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_fault_arr)!
                                     minValues[m]= arr[0]
                                     maxValues[m]=arr[1]
                                     avgValues[m]=arr[2]
                                }
                                   break;






                                   case "Schoemanshoek Actuator Valve Torque Fail Close":
                                    if (this.variable.nmb_schoe_r_actuator_valve_torque_fail_close_arr.length==0){
                                    break;
                                  }
                                    else{
                                      var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_torque_fail_close_arr)!
                                      minValues[m]= arr[0]
                                      maxValues[m]=arr[1]
                                      avgValues[m]=arr[2]
                                   }
                                    break;




                                    case "Schoemanshoek Actuator Valve Torque Fail Open":
                                      if (this.variable.nmb_schoe_r_actuator_valve_torque_fail_open_arr.length==0){
                                      break;
                                    }
                                      else{
                                        var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_torque_fail_open_arr)!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                        avgValues[m]=arr[2]
                                   }
                                      break;



                                      case "Schoemanshoek General Fault":
                                        if (this.variable.nmb_schoe_r_general_fault_arr.length==0){
                                        break;
                                      }
                                        else{
                                          var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_general_fault_arr)!
                                          minValues[m]= arr[0]
                                          maxValues[m]=arr[1]
                                          avgValues[m]=arr[2]
                                       }
                                        break;




                                        case "Schoemanshoek Actuator General Fault":
                                          if (this.variable.nmb_schoe_r_actuator_general_fault_arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_general_fault_arr)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                                       }
                                          break;

                                          case "Bergendal Reservoir Level":
                                            if(this.variable.BERGEN_RES_R_LVL_arr.length==0) {
                                              break;
                                            }
                                            else{
                                              var arr = this.MinMaxAvg(m,this.variable.BERGEN_RES_R_LVL_arr)!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                              avgValues[m]=arr[2]
                                            }
                                            break;

                                            case "Wolwas Reservoir Level":
                                              if(this.variable.WOLWAS_RES_R_LVL_arr.length==0) {
                                                break;
                                              }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.WOLWAS_RES_R_LVL_arr)!
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                avgValues[m]=arr[2]
                                              }
                                              break;


                                              case "Umasizakhe Reservoir Level":
                                                if(this.variable.UMI_RES_R_LVL_arr.length==0) {
                                                  break;
                                                }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.UMI_RES_R_LVL_arr)!
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                }
                                                break;




                                                case "Humerail Borehol Level":
                                                  if(this.variable.HUM_GW_BOR_LVL_arr.length==0) {
                                                    break;
                                                  }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.HUM_GW_BOR_LVL_arr)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                  }
                                                  break;


                                                case "Humerail Raw Water Tank Level":
                                                  if(this.variable.HUM_GW_RAW_WATER_TANK_LVL_arr.length==0) {
                                                    break;
                                                  }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.HUM_GW_RAW_WATER_TANK_LVL_arr)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                  }
                                                  break;




                                                case "Humerail Final Water Tank Level":
                                                  if(this.variable.HUM_GW_FIN_WAT_TANK_LVL_arr.length==0) {
                                                    break;
                                                  }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.HUM_GW_FIN_WAT_TANK_LVL_arr)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                  }
                                                  break;





                                                case "Kroonvale Reservoir Level":
                                                  if(this.variable.KROON_RES_R_LVL_arr.length==0) {
                                                    break;
                                                  }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.KROON_RES_R_LVL_arr)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                  }
                                                  break;

                                                  case "Holding Reservoir Level":
                                                    if(this.variable.HOLDING_LVL_RES_LVL_arr.length==0) {
                                                      break;
                                                    }
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.HOLDING_LVL_RES_LVL_arr)!
                                                      minValues[m]= arr[0]
                                                      maxValues[m]=arr[1]
                                                      avgValues[m]=arr[2]
                                                    }
                                                    break;

                                                    case "Damcamp Reservoir Level":
                                                      if(this.variable.DAMCAMP_LVL_RES_LVL_arr.length==0) {
                                                        break;
                                                      }
                                                      else{
                                                        var arr = this.MinMaxAvg(m,this.variable.DAMCAMP_LVL_RES_LVL_arr)!
                                                        minValues[m]= arr[0]
                                                        maxValues[m]=arr[1]
                                                        avgValues[m]=arr[2]
                                                      }
                                                      break;


                                                      case "Tin Roof Reservoir Level":
                                                        if(this.variable.TINROOF_LVL_RES_LVL_arr.length==0) {
                                                          break;
                                                        }
                                                        else{
                                                          var arr = this.MinMaxAvg(m,this.variable.TINROOF_LVL_RES_LVL_arr)!
                                                          minValues[m]= arr[0]
                                                          maxValues[m]=arr[1]
                                                          avgValues[m]=arr[2]
                                                        }
                                                        break;


                                          case "Schoemanshoek Actuator Valve Timeout":
                                          if (this.variable.nmb_schoe_r_actuator_valve_timeout_arr.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.nmb_schoe_r_actuator_valve_timeout_arr)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                                       }
                                          break;
                                        case "Schoemanshoek Actuator Set Point":
                                          if (this.variable.NMB_SCHOE_ACTUATOR_SET_POINT_array.length==0){
                                          break;
                                        }
                                          else{
                                            var arr = this.MinMaxAvg(m,this.variable.variable.NMB_SCHOE_ACTUATOR_SET_POINT_array)!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                  }
                                          break;



                                            case "Chelsea Pumpstation 4 Actual Speed":
                                              if (this.variable.CHE_PS_P4_ACTUAL_SPEED_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P4_ACTUAL_SPEED_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 4 Delivery Pressure":
                                              if (this.variable.CHE_PS_P4_DEL_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P4_DEL_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 4 Suction Pressure":
                                              if (this.variable.CHE_PS_P4_SUCT_PRESS_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_P4_SUCT_PRESS_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;
                                            case "Chelsea Pumpstation 700 Flow Rate":
                                              if (this.variable.CHE_PS_700_FLOW_RATE_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_700_FLOW_RATE_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Chelsea Pumpstation 700 Total Flow":
                                              if (this.variable.CHE_PS_700_TOTAL_FLOW_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.CHE_PS_700_TOTAL_FLOW_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "Motherwell Flow Rate":
                                              if (this.variable.MW_BPS_FlowRate_Arr.length == 0){
                                                break;
                                              }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.MW_BPS_FlowRate_Arr)
                                                minValues[m]= arr[0]
                                                maxValues[m]= arr[1]
                                                avgValues[m]=arr[2]
                                              }
                                              break;

                                              case "Motherwell Suction Pressure":
                                                if (this.variable.MW_BPS_SuctionPressure_Arr.length == 0){
                                                  break;
                                                }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.MW_BPS_SuctionPressure_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]= arr[1]
                                                  avgValues[m]=arr[2]
                                                }
                                                break;
                                                case "Motherwell Delivery Pressure":
                                                  if (this.variable.MW_BPS_DeliveryPressure_Arr.length == 0){
                                                    break;
                                                  }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.MW_BPS_DeliveryPressure_Arr)
                                                    minValues[m]= arr[0]
                                                    maxValues[m]= arr[1]
                                                    avgValues[m]=arr[2]
                                                  }
                                                  break;
                                                  case "Motherwell Reservoir Level":
                                                    if (this.variable.MW_LVL_array.length == 0){
                                                      break;
                                                    }
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.MW_LVL_array)
                                                      minValues[m]= arr[0]
                                                      maxValues[m]= arr[1]
                                                      avgValues[m]=arr[2]
                                                    }
                                                    break;

                                            //Ground Water
                                            case "Newton Park Pool Pressure":
                                              if(this.variable.NMBM_NPP_GW_PRESSURE_Arr.length ==0){
                                                break;
                                              }
                                              else{
                                                var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_PRESSURE_Arr)

                                                minValues[m]= arr[0]
                                                maxValues[m]= arr[1]
                                                avgValues[m]=arr[2]
                                              }break;

                                              case "Newton Park Pool Flow Rate":
                                                if(this.variable.NMBM_NPP_GW_FLOW_RATE_Arr.length ==0){
                                                  break;
                                                }
                                                else{
                                                  var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_FLOW_RATE_Arr)

                                                  minValues[m]= arr[0]
                                                  maxValues[m]= arr[1]
                                                  avgValues[m]=arr[2]
                                                }break;

                                                case "Newton Park Pool Water Level":
                                                  if(this.variable.NMBM_NPP_GW_LEVEL_Arr.length ==0){
                                                    break;
                                                  }
                                                  else{
                                                    var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_LEVEL_Arr)
                                                    minValues[m]= arr[0]
                                                    maxValues[m]= arr[1]
                                                    avgValues[m]=arr[2]
                                                  }break;

                                                case "Newton Park Pool Total Flow":
                                                  if(this.variable.NMBM_NPP_GW_TOTAL_FLOW_Arr.length == 0){
                                                    break;
                                                  }
                                                  else{
                                                    var arr=this.MinMaxAvg(m, this.variable.NMBM_NPP_GW_TOTAL_FLOW_Arr)
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                  }break;

                                                  case "HD1 Water Level":
                                                    if(this.variable.KLM_HUP_WATER_LEVEL_Arr.length ==0){
                                                      break;
                                                    }
                                                    else{
                                                      var arr=this.MinMaxAvg(m, this.variable.KLM_HUP_WATER_LEVEL_Arr)

                                                      minValues[m]= arr[0]
                                                      maxValues[m]= arr[1]
                                                      avgValues[m]=arr[2]
                                                    }break;

                                                    case "HD1 Flow Rate":
                                                      if(this.variable.KLM_HUP_FLOWRATE_Arr.length ==0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr=this.MinMaxAvg(m, this.variable.KLM_HUP_FLOWRATE_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]= arr[1]
                                                        avgValues[m]=arr[2]
                                                      }break;

                                                    case "HD1 Total Flow":
                                                      if(this.variable.KLM_HUP_TOTALFLOW_Arr.length == 0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr=this.MinMaxAvg(m, this.variable.KLM_HUP_TOTALFLOW_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]=arr[1]
                                                        avgValues[m]=arr[2]
                                                      }break;



                                                  case "HD2C Water Level":
                                                    if(this.variable.KLM_HUP2_WATER_LEVEL_Arr.length ==0){
                                                      break;
                                                    }
                                                    else{
                                                      var arr=this.MinMaxAvg(m, this.variable.KLM_HUP2_WATER_LEVEL_Arr)

                                                      minValues[m]= arr[0]
                                                      maxValues[m]= arr[1]
                                                      avgValues[m]=arr[2]
                                                    }break;

                                                    case "HD2C Flow Rate":
                                                      if(this.variable.KLM_HUP2_FLOWRATE_Arr.length ==0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr=this.MinMaxAvg(m, this.variable.KLM_HUP2_FLOWRATE_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]= arr[1]
                                                        avgValues[m]=arr[2]
                                                      }break;

                                                    case "HD2C Total Flow":
                                                      if(this.variable.KLM_HUP2_TOTALFLOW_Arr.length == 0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr=this.MinMaxAvg(m, this.variable.KLM_HUP2_TOTALFLOW_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]=arr[1]
                                                        avgValues[m]=arr[2]
                                                      }break;

                                                      case "HD3 Water Level":
                                                        if(this.variable.KLM_HUP3_WATER_LEVEL_Arr.length ==0){
                                                          break;
                                                        }
                                                        else{
                                                          var arr=this.MinMaxAvg(m, this.variable.KLM_HUP3_WATER_LEVEL_Arr)

                                                          minValues[m]= arr[0]
                                                          maxValues[m]= arr[1]
                                                          avgValues[m]=arr[2]
                                                        }break;

                                                        case "HD3 Flow Rate":
                                                          if(this.variable.KLM_HUP3_FLOWRATE_Arr.length ==0){
                                                            break;
                                                          }
                                                          else{
                                                            var arr=this.MinMaxAvg(m, this.variable.KLM_HUP3_FLOWRATE_Arr)
                                                            minValues[m]= arr[0]
                                                            maxValues[m]= arr[1]
                                                            avgValues[m]=arr[2]
                                                          }break;

                                                        case "HD3 Total Flow":
                                                          if(this.variable.KLM_HUP3_TOTALFLOW_Arr.length == 0){
                                                            break;
                                                          }
                                                          else{
                                                            var arr=this.MinMaxAvg(m, this.variable.KLM_HUP3_TOTALFLOW_Arr)
                                                            minValues[m]= arr[0]
                                                            maxValues[m]=arr[1]
                                                            avgValues[m]=arr[2]
                                                          }break;
                                                          case "HD4 Water Level":
                                                            if(this.variable.KLM_HUP4_WATER_LEVEL_Arr.length ==0){
                                                              break;
                                                            }
                                                            else{
                                                              var arr=this.MinMaxAvg(m, this.variable.KLM_HUP4_WATER_LEVEL_Arr)

                                                              minValues[m]= arr[0]
                                                              maxValues[m]= arr[1]
                                                              avgValues[m]=arr[2]
                                                            }break;

                                                            case "HD4 Flow Rate":
                                                              if(this.variable.KLM_HUP4_FLOWRATE_Arr.length ==0){
                                                                break;
                                                              }
                                                              else{
                                                                var arr=this.MinMaxAvg(m, this.variable.KLM_HUP4_FLOWRATE_Arr)
                                                                minValues[m]= arr[0]
                                                                maxValues[m]= arr[1]
                                                                avgValues[m]=arr[2]
                                                              }break;

                                                            case "HD4 Total Flow":
                                                              if(this.variable.KLM_HUP4_TOTALFLOW_Arr.length == 0){
                                                                break;
                                                              }
                                                              else{
                                                                var arr=this.MinMaxAvg(m, this.variable.KLM_HUP4_TOTALFLOW_Arr)
                                                                minValues[m]= arr[0]
                                                                maxValues[m]=arr[1]
                                                                avgValues[m]=arr[2]
                                                              }break;


                                                              case "HD6 Water Level":
                                                                if(this.variable.KLM_HUP6_WATER_LEVEL_Arr.length ==0){
                                                                  break;
                                                                }
                                                                else{
                                                                  var arr=this.MinMaxAvg(m, this.variable.KLM_HUP6_WATER_LEVEL_Arr)

                                                                  minValues[m]= arr[0]
                                                                  maxValues[m]= arr[1]
                                                                  avgValues[m]=arr[2]
                                                                }break;

                                                                case "HD6 Flow Rate":
                                                                  if(this.variable.KLM_HUP6_FLOWRATE_Arr.length ==0){
                                                                    break;
                                                                  }
                                                                  else{
                                                                    var arr=this.MinMaxAvg(m, this.variable.KLM_HUP6_FLOWRATE_Arr)
                                                                    minValues[m]= arr[0]
                                                                    maxValues[m]= arr[1]
                                                                    avgValues[m]=arr[2]
                                                                  }break;

                                                                case "HD6 Total Flow":
                                                                  if(this.variable.KLM_HUP6_TOTALFLOW_Arr.length == 0){
                                                                    break;
                                                                  }
                                                                  else{
                                                                    var arr=this.MinMaxAvg(m, this.variable.KLM_HUP6_TOTALFLOW_Arr)
                                                                    minValues[m]= arr[0]
                                                                    maxValues[m]=arr[1]
                                                                    avgValues[m]=arr[2]
                                                                  }break;



                                            //Stanford Road Road
                                            case "Stanford Road Flow Rate":
                                              if(this.variable.STAN_BPS_FlowRate_Arr.length == 0){
                                                break;
                                              }
                                              else{
                                                var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_FlowRate_Arr)
                                                minValues[m]= arr[0]
                                                maxValues[m]= arr[1]
                                                avgValues[m]=arr[2]
                                              }
                                              break;
                                              case "Stanford Road Delivery Pressure":
                                                if(this.variable.STAN_BPS_DeliveryPressure_Arr.length == 0){
                                                  break;
                                                }
                                                else{
                                                  var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_DeliveryPressure_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]= arr[1]
                                                  avgValues[m]=arr[2]
                                                }
                                                break;
                                                case "Stanford Road Suction Pressure":
                                                  if(this.variable.STAN_BPS_SuctionPressure_Arr.length == 0){
                                                    break;
                                                  }
                                                  else{
                                                    var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_SuctionPressure_Arr)
                                                    minValues[m]= arr[0]
                                                    maxValues[m]= arr[1]
                                                    avgValues[m]=arr[2]
                                                  }
                                                 break;
                                                  case "Stanford Road Pump 1 Frequency":
                                                    if(this.variable.STAN_BPS_P1_FREQ_Arr.length == 0){
                                                      break;
                                                    }
                                                    else{
                                                      var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P1_FREQ_Arr)
                                                      minValues[m]= arr[0]
                                                      maxValues[m]= arr[1]
                                                      avgValues[m]=arr[2]
                                                    }
                                                    break;
                                                    case "Stanford Road Pump 2 Frequency":
                                                      if(this.variable.STAN_BPS_P2_FREQ_Arr.length == 0){
                                                        break;
                                                      }
                                                      else{
                                                        var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P2_FREQ_Arr)
                                                        minValues[m]= arr[0]
                                                        maxValues[m]= arr[1]
                                                        avgValues[m]=arr[2]
                                                      }
                                                      break;
                                                      case "Stanford Road Pump 3 Frequency":
                                                        if(this.variable.STAN_BPS_P3_FREQ_Arr.length == 0){
                                                          break;
                                                        }
                                                        else{
                                                          var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P3_FREQ_Arr)
                                                          minValues[m]= arr[0]
                                                          maxValues[m]= arr[1]
                                                          avgValues[m]=arr[2]
                                                        }
                                                        break;
                                                        case "Stanford Road Pump 4 Frequency":
                                                          if(this.variable.STAN_BPS_P4_FREQ_Arr.length == 0){
                                                            break;
                                                          }
                                                          else{
                                                            var arr = this.MinMaxAvg(m, this.variable.STAN_BPS_P4_FREQ_Arr)
                                                            minValues[m]= arr[0]
                                                            maxValues[m]= arr[1]
                                                            avgValues[m]=arr[2]
                                                          }
                                                          break;
                                            //Water Treatment Works
                                            case "Nooitgedacht High Level Flow Rate":
                                              if (this.variable.WTW_NGT_FM_HIGH_FR_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.WTW_NGT_FM_HIGH_FR_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;

                                            case "Nooitgedacht Low Level Flow Rate":
                                              if (this.variable.WTW_NGT_FM_LOW_FR_Arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.WTW_NGT_FM_LOW_FR_Arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;


                                            case "Elandsjagt Flow Rate":
                                              if (this.variable.ELA_FR_arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.ELA_FR_arr)
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                   }
                                            break;
                                            case "Elandsjagt Pressure":
                                              if (this.variable.ELA_P_arr.length==0){
                                              break;
                                            }
                                              else{
                                                var arr = this.MinMaxAvg(m,this.variable.ELA_P_arr)!
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                avgValues[m]=arr[2]
                      }
                                              break;



                                              case "Humansdorp Off Take Total Flow":
                                                if (this.variable.HUM_OFF_TAKE_TF_arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.HUM_OFF_TAKE_TF_arr)!
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                            }
                                                 break;

                                                 case "Humansdorp Off Take Pressure":
                                                if (this.variable.HUM_OFF_TAKE_BAR_arr.length==0){
                                                break;
                                              }
                                                else{
                                                  var arr = this.MinMaxAvg(m,this.variable.HUM_OFF_TAKE_BAR_arr)!
                                                  minValues[m]= arr[0]
                                                  maxValues[m]=arr[1]
                                                  avgValues[m]=arr[2]
                                                            }
                                                 break;

                                                 case "Humansdorp Off Take Battery Level":
                                                  if (this.variable.HUM_OFF_TAKE_BAT_arr.length==0){
                                                  break;
                                                }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.HUM_OFF_TAKE_BAT_arr)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                              }
                                                   break;

                                                 case "Jeffreys Bay Off Take Total Flow":
                                                  if (this.variable.JEFF_OFF_TAKE_TF_arr.length==0){
                                                  break;
                                                }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.JEFF_OFF_TAKE_TF_arr)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                              }
                                                   break;

                                                   case "Jeffreys Bay Off Take Battery Level":
                                                    if (this.variable.JEFF_OFF_TAKE_BAT_arr.length==0){
                                                    break;
                                                  }
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.JEFF_OFF_TAKE_BAT_arr)!
                                                      minValues[m]= arr[0]
                                                      maxValues[m]=arr[1]
                                                      avgValues[m]=arr[2]
                                                                }
                                                     break;

                                                   case "Kouga Main Line Pressure":
                                                  if (this.variable.KOU_MAIN_LINE_BAR_arr.length==0){
                                                  break;
                                                }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.KOU_MAIN_LINE_BAR_arr)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                              }
                                                   break;


                                                   case "Kouga Main Line Battery Level":
                                                    if (this.variable.KOU_MAIN_LINE_BAT_arr.length==0){
                                                    break;
                                                  }
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.KOU_MAIN_LINE_BAT_arr)!
                                                      minValues[m]= arr[0]
                                                      maxValues[m]=arr[1]
                                                      avgValues[m]=arr[2]
                                                                }
                                                     break;

                                                   case "Ons Paradys Total Flow":
                                                  if (this.variable.ONS_PARA_TF_arr.length==0){
                                                  break;
                                                }
                                                  else{
                                                    var arr = this.MinMaxAvg(m,this.variable.ONS_PARA_TF_arr)!
                                                    minValues[m]= arr[0]
                                                    maxValues[m]=arr[1]
                                                    avgValues[m]=arr[2]
                                                              }
                                                   break;

                                                   case "Ons Paradys Battery Level":
                                                    if (this.variable.ONS_PARA_BAT_arr.length==0){
                                                    break;
                                                  }
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.ONS_PARA_BAT_arr)!
                                                      minValues[m]= arr[0]
                                                      maxValues[m]=arr[1]
                                                      avgValues[m]=arr[2]
                                                                }
                                                     break;


                                                   case "St Francis Offtake Total Flow":
                                                    if (this.variable.ST_FRAN_OFF_TF_arr.length==0){
                                                    break;
                                                  }
                                                    else{
                                                      var arr = this.MinMaxAvg(m,this.variable.ST_FRAN_OFF_TF_arr)!
                                                      minValues[m]= arr[0]
                                                      maxValues[m]=arr[1]
                                                      avgValues[m]=arr[2]
                                                                }
                                                     break;


                                                     case "Paradise Beach Total Flow":
                                                      if (this.variable.PARA_BEA_TF_arr.length==0){
                                                      break;
                                                    }
                                                      else{
                                                        var arr = this.MinMaxAvg(m,this.variable.PARA_BEA_TF_arr)!
                                                        minValues[m]= arr[0]
                                                        maxValues[m]=arr[1]
                                                        avgValues[m]=arr[2]
                                                                  }
                                                       break;

                                                       case "Paradise/St Francis Battery Level":
                                                        if (this.variable.ST_FRAN_PARA_BEA_BAT_arr.length==0){
                                                        break;
                                                      }
                                                        else{
                                                          var arr = this.MinMaxAvg(m,this.variable.ST_FRAN_PARA_BEA_BAT_arr)!
                                                          minValues[m]= arr[0]
                                                          maxValues[m]=arr[1]
                                                          avgValues[m]=arr[2]
                                                                    }
                                                         break;

             case   "Kareedouw K1 Total Flow":
              if (this.variable.KARK_K1_TF_arr.length==0){break;}
                else{
         var arr = this.MinMaxAvg(m,this.variable.KARK_K1_TF_arr)!
         minValues[m]= arr[0]
         maxValues[m]=arr[1]
         avgValues[m]=arr[2]
            }
                break;


                case    "Kareedouw K1 Flow Rate":
                  if (this.variable.KARK_K1_FR_arr.length==0){break;}
                    else{
             var arr = this.MinMaxAvg(m,this.variable.KARK_K1_FR_arr)!
             minValues[m]= arr[0]
             maxValues[m]=arr[1]
             avgValues[m]=arr[2]
                }

                    break;
                    case    "Kareedouw K1 Current":
                      if (this.variable.KARK_K1_CUR_arr.length==0){break;}
                        else{
                 var arr = this.MinMaxAvg(m,this.variable.KARK_K1_CUR_arr)!
                 minValues[m]= arr[0]
                 maxValues[m]=arr[1]
                 avgValues[m]=arr[2]
                    }
                        break;


                        case   "Kareedouw K1 Level":
                          if (this.variable.KARK_K1_LVL_arr.length==0){break;}
                            else{
                     var arr = this.MinMaxAvg(m,this.variable.KARK_K1_LVL_arr)!
                     minValues[m]= arr[0]
                     maxValues[m]=arr[1]
                     avgValues[m]=arr[2]
                        }

                            break;

            case   "Kareedouw K2 Total Flow":
              if (this.variable.KARK_K2_TF_arr.length==0){break;}
                else{
         var arr = this.MinMaxAvg(m,this.variable.KARK_K2_TF_arr)!
         minValues[m]= arr[0]
         maxValues[m]=arr[1]
         avgValues[m]=arr[2]
            }
                break;


                case    "Kareedouw K2 Flow Rate":
                  if (this.variable.KARK_K2_FR_arr.length==0){break;}
                    else{
             var arr = this.MinMaxAvg(m,this.variable.KARK_K2_FR_arr)!
             minValues[m]= arr[0]
             maxValues[m]=arr[1]
             avgValues[m]=arr[2]
                }

                    break;
                    case    "Kareedouw K2 Current":
                      if (this.variable.KARK_K2_CUR_arr.length==0){break;}
                        else{
                 var arr = this.MinMaxAvg(m,this.variable.KARK_K2_CUR_arr)!
                 minValues[m]= arr[0]
                 maxValues[m]=arr[1]
                 avgValues[m]=arr[2]
                    }
                        break;


                        case   "Kareedouw K2 Level":
                          if (this.variable.KARK_K2_LVL_arr.length==0){break;}
                            else{
                     var arr = this.MinMaxAvg(m,this.variable.KARK_K2_LVL_arr)!
                     minValues[m]= arr[0]
                     maxValues[m]=arr[1]
                     avgValues[m]=arr[2]
                                        }

                        break;

                        case    "Rosedale Reservoir Total Flow":
                          if (this.variable.WDNR_ROSE_TF_arr.length==0){break;}
                            else{
                     var arr = this.MinMaxAvg(m,this.variable.WDNR_ROSE_TF_arr)!
                     minValues[m]= arr[0]
                     maxValues[m]=arr[1]
                     avgValues[m]=arr[2]
                        }
                            break;


                            case    "Rosedale Reservoir Flow Rate":
                              if (this.variable.WDNR_ROSE_FR_arr.length==0){break;}
                                else{
                         var arr = this.MinMaxAvg(m,this.variable.WDNR_ROSE_FR_arr)!
                         minValues[m]= arr[0]
                         maxValues[m]=arr[1]
                         avgValues[m]=arr[2]
                            }
                                break;




                                case    "Rowallan Park Extension Pressure":
                                  if (this.variable.WDSR_ROWP_BAR_arr.length==0){break;}
                                    else{
                             var arr = this.MinMaxAvg(m,this.variable.WDSR_ROWP_BAR_arr)!
                             minValues[m]= arr[0]
                             maxValues[m]=arr[1]
                             avgValues[m]=arr[2]
                                }
                                    break;


                                case    "Rowallan Park Extension Total Flow":
                                  if (this.variable.WDSR_ROWP_TF_arr.length==0){break;}
                                    else{
                             var arr = this.MinMaxAvg(m,this.variable.WDSR_ROWP_TF_arr)!
                             minValues[m]= arr[0]
                             maxValues[m]=arr[1]
                             avgValues[m]=arr[2]
                                }
                                    break;


                                    case    "Rowallan Park Extension Flow Rate":
                                      if (this.variable.WDSR_ROWP_FR_arr.length==0){break;}
                                        else{
                                 var arr = this.MinMaxAvg(m,this.variable.WDSR_ROWP_FR_arr)!
                                 minValues[m]= arr[0]
                                 maxValues[m]=arr[1]
                                 avgValues[m]=arr[2]
                                    }
                                        break;




      }

    }
    for(var i = 0; i < sitesChosen.length;i++)
    {
      this.ELEMENT_DATA[i]={ name: sitesChosen[i],min:minValues[i],max:maxValues[i],average:avgValues[i]};
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

RightAxisConfiguration(AxisValue:any){


  var axisvalues = AxisValue;


 if(this.tps.rightSelectedTags!=null){
  console.log(this.tps.rightSelectedSites)


  for (var i = 0; i < this.tps.rightSelectedTags.length;i++)
  {
    switch (this.tps.rightSelectedTags[i]) {
      // Reservoirs

      case "Isuzu Oven 1 VSD Speed":
        axisvalues.isuzu_oven1_vsd_speed_axis = 1
        break;

      case "Isuzu Oven 1 Heat Exchanger Temperature":
        axisvalues.isuzu_oven1_heat_ecvh_temp_axis = 1
        break;

      case "Isuzu Oven 1 Temperature 1":
        axisvalues.isuzu_oven1_temp1_axis = 1
        break;

      case "Isuzu Oven 1 Temperature 2":
        axisvalues.isuzu_oven1_temp2_axis = 1
        break;

        case "Isuzu Oven 2 VSD Speed":
          axisvalues.isuzu_oven2_vsd_speed_axis = 1
          break;

        case "Isuzu Oven 2 Heat Exchanger Temperature":
          axisvalues.isuzu_oven2_heat_ecvh_temp_axis = 1
          break;

        case "Isuzu Oven 2 Temperature 1":
          axisvalues.isuzu_oven2_temp1_axis = 1
          break;

        case "Isuzu Oven 2 Temperature 2":
          axisvalues.isuzu_oven2_temp2_axis = 1
          break;



      case "Kwanobuhle Reservoir Level":
        axisvalues.KWANO_R_RES_LVL_axis = 1
        break;

        case "Kwanobuhle Reservoir Flow Rate 1":
        axisvalues.KWANO_R_FLOW_RATE_1_axis = 1
        break;

      case "Kwanobuhle Reservoir Flow Rate 2":
        axisvalues.KWANO_R_FLOW_RATE_2_axis = 1
        break;

        case "Kwanobuhle Reservoir Total Flow 1":
        axisvalues.KWANO_R_TOTAL_FLOW_1_axis = 1
        break;

      case "Kwanobuhle Reservoir Total Flow 2":
        axisvalues.KWANO_R_TOTAL_FLOW_2_axis = 1
        break;

      case"Coega Kop Inlet Chamber 2 Ml":
      axisvalues.CGK_LEVEL_axis =1
      break;

      case"Coega Kop Reservoir Pressure":
      axisvalues.CGK_PRESSURE_axis=1
      break;

      case"Olifantskop Reservoir Level":
      axisvalues.OLI_LVL_axis=1
      break;

      case "Bushy Park Soccoman Flow Rate":
     axisvalues.BUSH_CHURCH_SOCO_FR_axis = 1
     break;

    case "Bushy Park Steel Flow Rate":
      axisvalues.BUSH_CHURCH_STEEL_FR_axis = 1
      break;

    case "Bushy Park Soccoman Pressure":
      axisvalues.BUSH_CHURCH_SOCCO_BAR_axis = 1
      break;

      case  "Airport Reservoir Level":
        axisvalues.AIR_PRT_LVL_axis = 1
        break;

      case "Kruisfontein Reservoir Level":
        axisValues.klm_kruis_res_lvl_axis = 1
        break;

      case"Kruisfontein Borhole 12 Level":
    axisValues.klm_kruis12_lvl_axis = 1
    break;

    case"Kruisfontein Borhole 12 Current":
    axisValues.klm_kruis12_current_axis = 1
    break;

    case"Kruisfontein Borhole 12 Pressure":
    axisValues.klm_kruis12_bar_axis = 1
    break;

    case"Kruisfontein Borhole 12 Flow Rate":
    axisValues.klm_kruis12_flow_rate_axis = 1
    break;

    case"Kruisfontein Borhole 12 Total Flow":
    axisValues.klm_kruis12_total_flow_axis = 1
    break;

    case"Kruisfontein Borhole 13 Level":
    axisValues.klm_kruis13_lvl_axis = 1
    break;

    case"Kruisfontein Borhole 13 Current":
    axisValues.klm_kruis13_current_axis = 1
    break;

    case"Kruisfontein Borhole 13 Pressure":
    axisValues.klm_kruis13_bar_axis = 1
    break;

    case"Kruisfontein Borhole 13 Flow Rate":
    axisValues.klm_kruis13_flow_rate_axis = 1
    break;

    case"Kruisfontein Borhole 13 Total Flow":
    axisValues.klm_kruis13_total_flow_axis = 1
    break;



    case"Kruisfontein Borhole 14 Level":
    axisValues.klm_kruis14_lvl_axis = 1
    break;

    case"Kruisfontein Borhole 14 Current":
    axisValues.klm_kruis14_current_axis = 1
    break;

    case"Kruisfontein Borhole 14 Pressure":
    axisValues.klm_kruis14_bar_axis = 1
    break;

    case"Kruisfontein Borhole 14 Flow Rate":
    axisValues.klm_kruis14_flow_rate_axis = 1
    break;

    case"Kruisfontein Borhole 14 Total Flow":
    axisValues.klm_kruis14_total_flow_axis = 1
    break;

    case"Lee Samuals Drive Pressure":
    axisValues.LSD_PRESSURE_axis = 1
    break;

    case"Lee Samuals Drive Total Flow":
    axisValues.LSD_TOTAL_FLOW_axis = 1
    break;

    case"Lee Samuals Drive Flow Rate":
    axisValues.LSD_FLOW_RATE_axis = 1
    break;

    case"McNoughton Township South Pressure":
    axisValues.McNougTown_PRESSURE_axis = 1
    break;

    case"McNoughton Township South Total Flow":
    axisValues.McNougTown_TOTAL_FLOW_axis = 1
    break;

    case"McNoughton Township South Flow Rate":
    axisValues.McNougTown_FLOW_RATE_axis = 1
    break;








    case "Bushy Park Steel Pressure":
      axisvalues.BUSH_CHURCH_STEEL_BAR_axis = 1
      break;

    case "Bushy Park Pumpstation Flow Rate":
      axisvalues.BUSH_PUMP_FR_axis = 1
      break;

    case "Bushy Park Combined Borehole Flow Rate":
      axisvalues.BUSH_GW_COMB_FLOW_RATE_axis = 1
      break;

    case "Bushy Park Holding Tank Level":
      axisvalues.BUSH_TANK_LVL_axis = 1
      break;

      case "Emerald Hill Reservoir Level":
        axisvalues.EMER_H_axis = 1
        break;



         case "Humansdorp Off Take Total Flow":
          axisvalues.HUM_OFF_TAKE_TF_axis=1
          break

          case "Humansdorp Off Take Pressure":
            axisvalues.HUM_OFF_TAKE_BAR_axis =1
            break

            case "Humansdorp Off Take Battery Level":
              axisvalues.HUM_OFF_TAKE_BAT_axis =1
              break
              case "Jeffreys Bay Off Take Total Flow":
                axisvalues.JEFF_OFF_TAKE_TF_axis =1
                break

                case "Jeffreys Bay Off Take Battery Level":
                  axisvalues.JEFF_OFF_TAKE_BAT_axis =1
                   break

          case "Kouga Main Line Battery Level":
            axisvalues.KOU_MAIN_LINE_BAT_axis =1;
            break

          case "Kouga Main Line Pressure":
            axisvalues.KOU_MAIN_LINE_BAR_axis =1
            break;


            case "Ons Paradys Total Flow":
              axisvalues.ONS_PARA_TF_axis =1;
              break

            case "Ons Paradys Battery Level":
              axisvalues.ONS_PARA_BAT_axis =1
              break;



            case "St Francis Offtake Total Flow":
              axisvalues.ST_FRAN_OFF_TF_axis=1
              break;


          case "Paradise Beach Total Flow":
             axisvalues.PARA_BEA_TF_axis=1
              break;


         case "Paradise/St Francis Battery Level":
           axisvalues.ST_FRAN_PARA_BEA_BAT_axis=1
           break;

        case"Bergendal Reservoir Level":
        axisvalues.BERGEN_RES_R_LVL_axis=1
        break;

        case"Wolwas Reservoir Level":
        axisvalues.WOLWAS_RES_R_LVL_axis=1
        break;



        case"Humerail Borehol Level":
        axisvalues.HUM_GW_BOR_LVL_axis = 1
        break;

        case"Humerail Raw Water Tank Level":
        axisvalues.HUM_GW_RAW_WATER_TANK_LVL_axis = 1
        break;

        case"Humerail Final Water Tank Level":
        axisvalues.HUM_GW_FIN_WAT_TANK_LVL_axis = 1
        break;

        case"Umasizakhe Reservoir Level":
        axisvalues.UMI_RES_R_LVL_axis=1
        break;

        case"Kroonvale Reservoir Level":
        axisvalues.KROON_RES_R_LVL_axis=1
        break;

        case"Holding Reservoir Level":
        axisvalues.HOLDING_LVL_RES_LVL_axis=1
        break;

        case"Damcamp Reservoir Level":
        axisvalues.DAMCAMP_LVL_RES_LVL_axis=1
        break;

        case"Tin Roof Reservoir Level":
        axisvalues.TINROOF_LVL_RES_LVL_axis=1
        break;



        case "Schoemanshoek Pressure":
       axisvalues.NMB_SCHOE_PRESSURE_axis = 1
         break;

      case "Schoemanshoek Level":
        axisvalues.NMB_SCHOE_RES_LEVEL_axis = 1
          break;


     case "Schoemanshoek Actuator Position":
       axisvalues.NMB_SCHOE_ACTUATOR_POSITION_axis = 1
         break;

      case "Schoemanshoek Actuator Set Point":
        axisvalues.NMB_SCHOE_ACTUATOR_SET_POINT_axis = 1
          break;


       case "Schoemanshoek Actuator Valve Feedback Signal":
         axisvalues.nmb_schoe_r_actuator_valve_feedback_signal_error_axis = 1
           break;

       case "Schoemanshoek Actuator Valve Command Signal":
         axisvalues.nmb_schoe_r_actuator_valve_command_signal_error_axis = 1
           break;

       case "Schoemanshoek Reservoir Level Signal Error":
         axisvalues.nmb_schoe_r_reservoir_level_signal_error_axis = 1
           break;

       case "Schoemanshoek Actuator Valve Fault":
           axisvalues.nmb_schoe_r_actuator_valve_fault_axis = 1
               break;

        case "Schoemanshoek Actuator Valve Torque Fail Close":
          axisvalues.nmb_schoe_r_actuator_valve_torque_fail_close_axis = 1
          break;

         case "Schoemanshoek Actuator Valve Torque Fail Open":
           axisvalues.nmb_schoe_r_actuator_valve_torque_fail_open_axis = 1
             break;

         case "Schoemanshoek General Fault":
           axisvalues.nmb_schoe_r_general_fault_axis = 1
             break;

          case "Schoemanshoek Actuator General Fault":
            axisvalues.nmb_schoe_r_actuator_general_fault_axis = 1
              break;

          case "Schoemanshoek Actuator Valve Timeout":
          axisvalues.nmb_schoe_r_actuator_valve_timeout_axis = 1
            break;




      case"Coega Kop to Coega IDZ Flow Rate":
      axisvalues.CGK_COEGA_FLOW_RATE_axis = 1
      break;

      case"Coega Kop to Motherwell Flow Rate":
      axisvalues.CGK_MOTHERWELL_TOTAL_FLOW_axis=1
      break;
      case"Coega Kop North Chamber 17 Ml":
      axisvalues.CGK_KOP_NC_17_ML_axis =1
      break;
      case"Coega Kop from Grassridge Total Flow":
      axisvalues.CGK_GRASSRIDGE_TOTAL_FLOW_axis=1
      break;
      case"Coega Kop to Coega IDZ Total Flow":
      axisvalues.CGK_COEGA_TOTAL_FLOW_axis=1
      break;
      case"Coega Kop to Motherwell Total Flow":
      axisvalues.CGK_MOTHERWELL_FLOW_RATE_axis = 1
      break;

      case"Coega Kop from Grassridge Flow Rate":
      axisvalues.CGK_GRASSRIDGE_FLOW_RATE_axis =1
      break;

      case "Greenbushes Reservoir Level":
      axisvalues.GB_axis = 1
        break;


        case "Greenbushes Flow Rate":
          axisvalues.GBFR_axis = 1
            break;

            case "St Georges Borehole Flow Rate":
              axisValues.st_georges_wtw_gw_FR_axis = 1;
                    break;

                  case "St Georges Borehole Total Flow":
              axisValues.st_georges_wtw_gw_TF_axis = 1;
                      break;

                  case "St Georges Emerald Hill Flow Rate":
              axisValues.st_georges_wtw_emer_hill_FR_axis = 1;
                        break;

                  case "St Georges Emerald Hill Total Flow":
                    axisValues.st_georges_wtw_emer_hill_TF_axis = 1;
                          break;



        case "Chelsea Reservoir West Chamber Level":
          axisValues.CHE_West_axis = 1
          break;

          case "Chelsea Reservoir East Chamber Level":
            axisValues.CHE_East_axis = 1
              break;

        case "Chelsea Reservoir Summit 1200 mm Flow Rate":
          axisValues.CHE_R_FR1200_axis = 1;
          break;

        case "Chelsea Reservoir Greenbushes 600 mm Flow Rate":
          axisValues.CHE_R_FR600_axis = 1;
          break;

          case "Chelsea Reservoir Summit 1200 mm Total Flow":
            axisValues.CHE_R_TF1200_axis = 1;
            break;

          case "Chelsea Reservoir Greenbushes 600 mm Total Flow":
            axisValues.CHE_R_TF600_axis = 1;
            break;

       case "Driftsands Reservoir Level":
        axisValues.drift_res_level_axis=1
      break;

      case "Driftsands Flow Rate 1":
        axisValues.drift_res_flow_rate_1_axis=1
        break;

        case "Driftsands Flow Rate 2":
          axisValues.drift_res_flow_rate_2_axis=1
          break;

          case "Driftsands Total Flow 1":
            axisValues.drift_res_total_flow_1_axis=1
            break;

            case "Driftsands Total Flow 2":
              axisValues.drift_res_total_flow_2_axis=1
              break;


          case "Grassridge East Chamber Level":
          axisValues.GR_EC_axis = 1
            break;

            case "Grassridge West Chamber Level":
            axisValues.GR_WC_axis = 1
              break;

      case "Grassridge Inlet Flow":
         axisValues.GR_R_INLET_axis = 1
           break;

         case "Grassridge Outlet Flow":
         axisValues.GR_R_OUTLET_axis = 1
           break;

              case "Van Stadens Reservoir Level":
              axisValues.VS_axis = 1
                break;

              case "Chatty North Chamber Level":
              axisValues.CHT_NC_axis = 1
                break;

                case "Chatty Overhead Level":
                axisValues.CHT_OR_axis = 1
                  break;

        case "Chatty Flow Rate":
        axisValues.CHE_fr_axis = 1
          break;

                  case "Chatty South Chamber Level":
                  axisValues.CHT_SC_axis = 1
                    break;

                    case "Van Riebeeck Hoogte Delivery Level":
                    axisValues.VRH_DL_axis = 1
                      break;

                      case "Van Riebeeck Hoogte Suction Level":
                      axisValues.VRH_SL_axis = 1
                        break;

                        case "Lovemore Heights Reservoir Level":
                        axisValues.LH_axis = 1
                          break;

                          case "Lovemore Heights Overhead Tank":
                            axisValues.DRS_LH_RES_LVL_axis = 1
                              break;

                          case "Blue Horizon Bay":
                          axisValues.BHB_axis = 1
                            break;

                            case "Theescombe Reservoir Level":
                            axisValues.TC_axis = 1
                              break;

                              case "Rosedale Reservoir Level":
                              axisValues.RD_LVL_axis = 1
                              break;

                              case "Summit Reservoir Level":
                                axisValues.SM_LVL_axis = 1
                                break;

                              case "Summit Flow Rate":
                                axisValues.SM_FR_axis = 1
                                break;

                              case "Heatherbank Reservoir Level":
                                axisValues.HB_axis = 1
                                break;

                              case "Heatherbank Pumpstation 1 Current":
                                axisValues.hb_P1_CURRENT_axis = 1;
                                break;

                              case "Heatherbank Pumpstation 2 Current":
                                axisValues.hb_P2_CURRENT_axis = 1
                              break;

                              case "Heatherbank Pumpstation 3 Current":
                                axisValues.hb_P3_CURRENT_axis = 1
                              break;


                              case "Heatherbank Pumpstation 1 Run Hours":
                                axisValues.hb_P1_RH_axis = 1
                                break;

                              case "Heatherbank Pumpstation 2 Run Hours":
                                axisValues.hb_P2_RH_axis = 1
                               break;

                              case "Heatherbank Pumpstation 3 Run Hours":
                                axisValues.hb_P3_RH_axis = 1
                               break;
                              //FPT Sites
                              case "Bethelsdorp Battery Level":
                               axisValues.BETH_BATTERY_STATUS_axis =1
                              break;

                              case "Bethelsdorp Total Flow":
                                axisValues.BETH_TOTAL_FLOW_axis =1
                                break;

                              case"Bethelsdorp Pressure":
                              axisValues.BETH_PRESS_axis = 1
                              break;

                              case"Bethelsdorp Flow Rate":
                              axisValues.BETH_FLOW_RATE_axis = 1
                              break;

                              case "FM Tower Flow Rate":
                                axisValues.FMT_FR_axis = 1
                                  break;

                         case "FM Tower Pressure":
                         axisValues.FMT_PRESS_axis = 1
                         break;

                         case "FM Tower Total Flow":
                         axisValues.FMT_TF_axis = 1;
                         break;
                         case "Coega IDZ Flow Rate":
                           axisValues.IDZ_FR_axis = 1
                             break;

                             case "Coega Motherwell Flow Rate":
                             axisValues.IDZ_MW_FR_axis = 1
                             break;

                             case "Gamtoos Bridge Steel Pipe Flow Rate":
                               axisValues.GT_BRG_STL_FR_axis = 1
                                 break;

                                 case "Gamtoos Bridge Socoman Pipe Flow Rate":
                                 axisValues.GT_BRG_SOCO_FR_axis = 1
                                 break;

                                 case "Gamtoos Bridge Steel Pipe Pressure":
                                   axisValues.GT_BRG_STL_PRESS_axis = 1
                                     break;

                                     case "Gamtoos Bridge Socoman Pipe Pressure":
                                     axisValues.GT_BRG_SOCO_PRESS_axis = 1
                                     break;

                                 case "Uitenhage Flow Chamber Flow Rate":
                                   axisValues.UIT_FC_FR_axis= 1
                                     break;

                                     case "Uitenhage Flow Chamber Pressure":
                                     axisValues.UIT_FC_PRESS_axis = 1
                                     break;


                          case "Gamtoos Break Water Pressure":
                            axisValues.GBW_ACT_BAR_axis= 1
                              break;

                         case "Gamtoos Break Water Flow Rate":
                         axisValues.GBW_FLO_RAT_axis = 1
                         break;
                    //Pump Stations
                    case "Crown Gardens Suction Pressure":
                      axisValues.CG_CSP_axis = 1
                      break;

                      case "Crown Gardens Delivery Pressure":
                      axisValues.CG_CDP_axis = 1
                     break;

                     case "Crown Gardens Sump Level":
                       axisValues.CG_S_LVL_axis = 1
                       break;

                       case "Crown Gardens Tower 1 Level":
                       axisValues.CG_T1_LVL_axis = 1
                       break;

                       case "Crown Gardens Tower 1 Inlet Flow":
                       axisValues.CG_T1_IF_axis = 1
                       break;

                       case "Crown Gardens Tower 1 Outlet Flow":
                         axisValues.CG_T1_OF_axis = 1
                         break;

                         case "Crown Gardens Tower 2 Level":
                         axisValues.CG_T2_LVL_axis = 1
                         break;

                         case "Crown Gardens Tower 2 Inlet Flow":
                         axisValues.CG_T2_IF_axis = 1
                         break;

                         case "Crown Gardens Tower 2 Outlet Flow":
                         axisValues.CG_T2_OF_axis = 1
                         break;

                         case "NMU Effluent Flow Rate":
                           axisValues.NMU_EFF_FR_axis = 1
                           break;

                      case "NMU Effluent Delivery Pressure":
                      axisValues.NMU_EFF_DP_axis = 1
                      break;

                      case "NMU Effluent Dam Level":
                        axisValues.NMU_EFF_DAM_LVL_axis = 1
                        break;

                        case "NMU Effluent Pump 1 Speed":
                        axisValues.NMU_EFF_P1_SPEED_axis = 1
                        break;

                        case "NMU Effluent Pump 2 Speed":
                          axisValues.NMU_EFF_P2_SPEED_axis = 1
                          break;

                          case "NMU Effluent Pump 3 Speed":
                            axisValues.NMU_EFF_P3_SPEED_axis = 1
                            break;

                            case "NMU Effluent Jockey Pump Speed":
                            axisValues.NMU_EFF_JP_SPEED_axis = 1
                            break;

                            case "Chelsea Pumpstation 1 Actual Speed":
                              axisValues.CHE_PS_P1_ACTUAL_SPEED_Axis = 1
                              break;


                  case "Chelsea Pumpstation 1 Delivery Pressure":
                  axisValues.CHE_PS_P1_DEL_PRESS_Axis = 1
                  break;

                 case "Chelsea Pumpstation 1 Suction Pressure":
                  axisValues.CHE_PS_P1_SUCT_PRESS_Axis = 1
                  break;


                case "Chelsea Pumpstation 2 Actual Speed":
                  axisValues.CHE_PS_P2_ACTUAL_SPEED_Axis = 1
                  break;


             case "Chelsea Pumpstation 2 Delivery Pressure":
                axisValues.CHE_PS_P2_DEL_PRESS_Axis = 1
                break;

                case "Chelsea Pumpstation 2 Suction Pressure":
                 axisValues.CHE_PS_P2_SUCT_PRESS_Axis = 1
                 break;

                 case "Chelsea Pumpstation 3 Actual Speed":
                   axisValues.CHE_PS_P3_ACTUAL_SPEED_Axis = 1
                   break;


         case "Chelsea Pumpstation 3 Delivery Pressure":
            axisValues.CHE_PS_P3_DEL_PRESS_Axis = 1
            break;

            case "Chelsea Pumpstation 3 Suction Pressure":
             axisValues.CHE_PS_P3_SUCT_PRESS_Axis = 1
             break;


             case "Chelsea Pumpstation 4 Actual Speed":
               axisValues.CHE_PS_P4_ACTUAL_SPEED_Axis = 1
               break;

               case "Rosedale Reservoir Total Flow":
                axisValues.WDNR_ROSE_TF_axis = 1;
                break;

                case "Rosedale Reservoir Flow Rate":
                  axisValues.WDNR_ROSE_FR_axis = 1
                  break;


                  case "Rowallan Park Extension Pressure":
                    axisValues.WDSR_ROWP_BAR_axis = 1
                    break;


                    case "Rowallan Park Extension Total Flow":
                      axisValues.WDSR_ROWP_TF_axis = 1;
                      break;

                      case "Rowallan Park Extension Flow Rate":
                        axisValues.WDSR_ROWP_FR_axis = 1
                        break;


           case "Chelsea Pumpstation 4 Delivery Pressure":
              axisValues.CHE_PS_P4_DEL_PRESS_Axis = 1
              break;

              case "Chelsea Pumpstation 4 Suction Pressure":
               axisValues.CHE_PS_P4_SUCT_PRESS_Axis = 1
               break;

        case "Chelsea Pumpstation 700 Flow Rate":
          axisValues.CHE_PS_700_FLOW_RATE_Axis = 1
          break;


          case "Chelsea Pumpstation 700 Total Flow":
            axisValues.CHE_PS_700_TOTAL_FLOW_Axis = 1
            break;


                            case "Motherwell Flow Rate":
                              axisValues.MW_BPS_FlowRate_axis = 1
                              break;

                            case "Motherwell Delivery Pressure":
                              axisValues.MW_BPS_DeliveryPressure_axis = 1
                              break;

                            case "Motherwell Suction Pressure":
                              axisValues.MW_BPS_SuctionPressure_axis = 1
                              break;

                            case "Motherwell Reservoir Level":
                              axisValues.MW_LVL_axis = 1;
                              break;

                              case "Storms River Quarry Level":
                                axisValues.STORMS_GORGE_LEVEL_axis = 1
                                break;

                              case "Storms River Gorge Level":
                                axisValues.STORMS_QUARRY_LEVEL_axis = 1
                                break;

                                case "Storms River Holding Reservoir Level":
                                  axisValues.STORMS_GORGE_LEVEL_axis = 1
                                  break;

                                case "Storms River Overhead Tank Level":
                                  axisValues.STORMS_QUARRY_LEVEL_axis = 1
                                  break;


                                  //Ground Water
                                  case "Newton Park Pool Pressure":
                                    axisValues.NMBM_NPP_GW_PRESSURE_axis=1
                                    break;

                                  case "Newton Park Pool Flow Rate":
                                    axisValues.NMBM_NPP_GW_FLOW_RATE_axis=1
                                    break;

                                  case "Newton Park Pool Water Level":
                                    axisValues.NMBM_NPP_GW_LEVEL_axis=1
                                    break;

                                  case "Newton Park Pool Total Flow":
                                    axisValues.NMBM_NPP_GW_TOTAL_FLOW_axis=1
                                    break;


                                    case "HD1 Water Level":
                                  axisValues.KLM_HUP_WATER_LEVEL_Axis=1
                                  break;
                                case "HD1 Flow Rate":
                                  axisValues.KLM_HUP_FLOWRATE_Axis=1
                                  break;
                                case "HD1 Total Flow":
                                  axisValues.KLM_HUP_TOTALFLOW_Axis=1
                                  break;
                                  case "HD2C Water Level":
                                    axisValues.KLM_HUP2_WATER_LEVEL_Axis=1
                                    break;
                                  case "HD2C Flow Rate":
                                    axisValues.KLM_HUP2_FLOWRATE_Axis=1
                                    break;
                                  case "HD2C Total Flow":
                                    axisValues.KLM_HUP2_TOTALFLOW_Axis=1
                                    break;
                                    case "HD3 Water Level":
                                  axisValues.KLM_HUP3_WATER_LEVEL_Axis=1
                                  break;
                                case "HD3 Flow Rate":
                                  axisValues.KLM_HUP3_FLOWRATE_Axis=1
                                  break;
                                case "HD3 Total Flow":
                                  axisValues.KLM_HUP3_TOTALFLOW_Axis=1
                                  break;
                                  case "HD4 Water Level":
                                    axisValues.KLM_HUP4_WATER_LEVEL_Axis=1
                                    break;
                                  case "HD4 Flow Rate":
                                    axisValues.KLM_HUP4_FLOWRATE_Axis=1
                                    break;
                                  case "HD4 Total Flow":
                                    axisValues.KLM_HUP4_TOTALFLOW_Axis=1
                                    break;
                                    case "HD6 Water Level":
                                      axisValues.KLM_HUP6_WATER_LEVEL_Axis=1
                                      break;
                                    case "HD6 Flow Rate":
                                      axisValues.KLM_HUP6_FLOWRATE_Axis=1
                                      break;
                                    case "HD6 Total Flow":
                                      axisValues.KLM_HUP6_TOTALFLOW_Axis=1
                                      break;


                                      //Stanford Road Road
                                      case "Stanford Road Suction Pressure":
                                        axisValues.STAN_BPS_SuctionPressure_axis = 1
                                        break;

                                      case "Stanford Road Delivery Pressure":
                                        axisValues.STAN_BPS_DeliveryPressure_axis = 1
                                        break;

                                      case "Stanford Road Flow Rate":
                                        axisValues.STAN_BPS_FlowRate_axis = 1
                                        break;

                                      case "Stanford Road Pump 1 Frequency":
                                        axisValues.STAN_BPS_P1_FREQ_axis = 1
                                        break;

                                      case "Stanford Road Pump 2 Frequency":
                                        axisValues.STAN_BPS_P2_FREQ_axis = 1
                                        break;

                                      case "Stanford Road Pump 3 Frequency":
                                        axisValues.STAN_BPS_P3_FREQ_axis = 1
                                        break;

                                      case "Stanford Road Pump 4 Frequency":
                                        axisValues.STAN_BPS_P4_FREQ_axis = 1
                                        break;


    case "Malabar Reservoir Level":
      axisValues.mala_lvl_axis = 1;
      break;


                                                //Water Treatment Works
                                                case "Nooitgedacht High Level Flow Rate":
                                                  axisValues.WTW_NGT_FM_HIGH_FR_axis = 1
                                                  break;

                                                  case "Nooitgedacht Low Level Flow Rate":
                                                  axisValues.WTW_NGT_FM_LOW_FR_axis = 1
                                                  break;

                                    case "Elandsjagt Flow Rate":
                                      axisValues.ELA_FR_axis = 1
                                      break;

                                      case "Elandsjagt Pressure":
                                      axisValues.ELA_P_axis = 1
                                      break;
    }



  }
      }
}






DateConfiguration(){
  var start = this.range.value.start;
  var end = this.range.value.end;

  if (start!=null && end!=null){
  var startARR = start.toString().split(" ")
  var endARR = end.toString().split(" ")
  switch (startARR[1]) {
  case "Jan":
    startARR[1] = "1"
      break;
      case "Feb":
        startARR[1] = "2"
          break;
          case "Mar":
            startARR[1] = "3"
              break;
              case "Apr":
                startARR[1] = "4"
                  break;
                  case "May":
                    startARR[1] = "5"
                      break;
                      case "Jun":
                        startARR[1] = "6"
                          break;
                          case "Jul":
                            startARR[1] = "7"
                              break;
                              case "Aug":
                                startARR[1] = "8"
                                  break;
                                  case "Sep":
                                    startARR[1] = "9"
                                      break;
                                      case "Oct":
                                        startARR[1] = "10"
                                          break;
                                          case "Nov":
                                            startARR[1] = "11"
                                              break;
                                              case "Dec":
                                                startARR[1] = "12"
                                                  break;
                                                }
  switch (endARR[1]) {
  case "Jan":
    endARR[1] = "1"
      break;
      case "Feb":
        endARR[1] = "2"
          break;
          case "Mar":
            endARR[1] = "3"
              break;
              case "Apr":
                endARR[1] = "4"
                  break;
                  case "May":
                    endARR[1] = "5"
                      break;
                      case "Jun":
                        endARR[1] = "6"
                          break;
                          case "Jul":
                            endARR[1] = "7"
                              break;
                              case "Aug":
                                endARR[1] = "8"
                                  break;
                                  case "Sep":
                                    endARR[1] = "9"
                                      break;
                                      case "Oct":
                                        endARR[1] = "10"
                                          break;
                                          case "Nov":
                                            endARR[1] = "11"
                                              break;
                                              case "Dec":
                                                endARR[1] = "12"
                                                  break;
                                                }
  if (startARR[1].length==1){
  startARR[1] = "0" + startARR[1]
  }
  if (endARR[1].length==1){
  endARR[1] = "0" + endARR[1]
  }
  this.newStart = startARR[3] +"-"+startARR[1]+"-"+startARR[2]
  this.newEnd = endARR[3] +"-"+endARR[1]+"-"+endARR[2]
  }
}

 ReadSelectedValues(arr:string[],selectedArr:boolean[], name:string){
  for (let i = 0; i < arr.length; i++) {

    if(selectedArr[i]==true){
      this.selectedTags[this.count]= name + arr[i]
      this.count++
    //  console.log(this.selectedTags)

    }
  }
}



handleClick() {
  this.isLoading=true;
  // Define an interface called AxisMap which allows any string key and value of any type.
  interface AxisMap {
    [key: string]: any;
  }

  // Declare two variables called fileInfo and objArr (Note: They are not initialized yet).
  var fileInfo, objArr;

  // Create a constant called axisMap and assign it a value of siteVariableMap (which should be defined somewhere else)
  const axisMap: AxisMap = siteVariableMap;

  // Assign the value of the selected site from the Sites object to a variable called siteWhichWasPicked.
  let siteWhichWasPicked: string[] = this.tps.selectedTags;

  console.log(siteWhichWasPicked)

  // Get the first character of siteWhichWasPicked and assign it to a constant called siteName.


  for(let i =0; i<siteWhichWasPicked.length; i ++){

  const siteName = siteWhichWasPicked[i];
  // Get the axis map for the site corresponding to the first letter of the site name.
  // If it doesn't exist, throw an error.
  const arr = axisMap[siteName];
  if (!arr) {
    throw new Error(`Invalid site name: ${siteName}`);
  }



  // Map items in the `variable` property of `this` (whatever 'this' refers to) using a callback function
  // that formats each item as a Javascript object with "date" and "data" properties.
  // The formatting is done using the `convertDateTime()` function.
  objArr = this.variable[arr].map((item: any[]) => {
    return {
      date: convertDateTime(item[0]),
      data: item[1]
    };
  });

  // Set the options for the CSV file to be downloaded.
  // This includes a title, field separator, quotes, headers, decimal separator, and more.
  const options = {
    title: 'User Details',
    fieldSeparator: ',',
    quoteStrings: '"',
    headers: ["Date", "Value"],
    decimalseparator: '.',
    showLabels: false,
    noDownload: false,
    showTitle: false,
    useBom: false,
  };

  // Generate a new CSV file using the objArr data, siteName as the filename, and the options above.
  fileInfo = new ngxCsv(objArr, siteName, options);

  }
  this.isLoading=false;
    }




}
function convertDateTime(inputDateTime:any){

  const dateObject = new Date(inputDateTime);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getSeconds().toString().padStart(2, '0');
  const outputDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return outputDateTime;
  }





function axisConfiguration(axisValues:any,inputString:any ){
  const axisMap: Record<string,string> = {
    "Coega Kop to Motherwell Total Flow": "CGK_MOTHERWELL_FLOW_RATE_axis",
    "Coega Kop from Grassridge Flow Rate": "CGK_GRASSRIDGE_FLOW_RATE_axis",
    "Greenbushes Reservoir Level": "GB_axis",
    "Greenbushes Flow Rate": "GBFR_axis",
    "St Georges Borehole Flow Rate": "st_georges_wtw_gw_FR_axis",
    "St Georges Borehole Total Flow": "st_georges_wtw_gw_TF_axis",
    "St Georges Emerald Hill Flow Rate": "st_georges_wtw_emer_hill_FR_axis",
    "St Georges Emerald Hill Total Flow": "st_georges_wtw_emer_hill_TF_axis"
  };

  axisValues[axisMap[inputString]] = 1;

}


function createTagLists(): Record<string, any> {
  const tagNames = ['bhb', 'kruis12GW', 'kruis13GW', 'kruis14GW', 'cht', 'kark', 'che', 'chePS', 'cgk', 'cgkIDZ', 'drift', 'kruisR', 'cg', 'fmt', 'gamtoos', 'gr', 'gb', 'hb', 'lh', 'bergen', 'wolwas', 'umi', 'kroon', 'mw', 'mwr', 'np', 'eff', 'ngt', 'rd', 'stGeorge', 'stan', 'sm', 'schoe', 'th', 'uit', 'mali', 'emer', 'tinroof', 'damcamp', 'holding', 'vrh', 'vs', 'bushy', 'beth', 'hup1', 'hup2', 'hup3', 'hup4', 'klmWtwInlet', 'hup6', 'humGround', 'storms', 'stormsWTW', 'humOffTake', 'jeffBayOffTake', 'kougaMainLine', 'gbw', 'onsParadys', 'oli', 'eland'];
  const result: Record<string, any> = {};
  for (const tagName of tagNames) {
    const tagListName = `${tagName}TagList`;
    const selectedTagsName = `${tagName}SelectedTags`;
    result[tagListName] = [];
    result[selectedTagsName] = [];
  }
  return result;
}







const myObject = createTagLists();
