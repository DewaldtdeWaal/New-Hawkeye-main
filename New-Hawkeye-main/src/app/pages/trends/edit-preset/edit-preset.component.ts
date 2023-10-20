import { HttpClient } from '@angular/common/http';
import {Component, Inject, OnInit,OnDestroy, ViewChild} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { ServerURLService } from 'src/app/Service-Files/server-url.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { TrendPickerService } from '../trendpicker.service';

@Component({
  selector: 'app-edit-preset',
  templateUrl: './edit-preset.component.html',
  styleUrls: ['./edit-preset.component.css']
})
export class EditPresetComponent implements OnInit {
  presetName :any
  presetDescription:any
  selectedSites:any[]
  rightSelectedSites:any[]



  Right = new FormControl();

  Preset = new FormControl();
  PresetList: string[] = [];
  // selectedSites:any[][]=[]
  selectedTags:any[]=[]




showAuto: any;
showRes: any;
showPS:any;
showFPT: any;
showGW:any;
showWTW:any;
showZones:any



showResMenu: boolean = false;
showPSMenu: boolean = false;
showTrendsMenu: boolean = false;
showFM_Menu: boolean = false;
showWTW_Menu: boolean = false;
showAdminMenu: boolean = false;
showGWMenu: boolean = false;
showAutoMenu: boolean = false;
showZoneMenu: boolean = false;


showPresetMenu:boolean =false
isExpanded = true;
isShowing = false;

panelOpenState = true;
flag :boolean = false

public authListenerSubs!: Subscription;

userSites:string[];
Sites = new FormControl();
SitesList: string[] = [];

count:number

oldPresetName:string


intervalFunction:any

  @ViewChild(MatAccordion) accordion: MatAccordion;
  userEmail: string;
  createPresetErr: boolean=false;


  bhbTagListArr:string[]=[];
  bhbTagsSelected:boolean[]=[];

  kruis12GWTagListArr:string[]=[];
  kruis12GWSelected:boolean[]=[];

  kruis13GWTagListArr:string[]=[];
  kruis13GWSelected:boolean[]=[];

  kruis14GWTagListArr:string[]=[];
  kruis14GWSelected:boolean[]=[];

  airPortTagListArr:string[]=[];
  airPortSelected:boolean[]=[];

  chtTagListArr:string[]=[];
  chtTagsSelected:boolean[]=[];

  karkTagListArr:string[]=[];
  karkTagSelected:boolean[]=[];

  cheTagListArr:string[]=[];
  cheTagsSelected:boolean[]=[];

  chePSTagListArr:string[]=[];
  chePSTagsSelected:boolean[]=[];

  cgkTagListArr:string[]=[];
  cgkTagsSelected:boolean[]=[];

  isuzuTagListArr:string[]=[];
  isuzuSelected:boolean[]=[];

  cgkIDZTagListArr:string[]=[];
  cgkIDZTagsSelected:boolean[]=[];

  driftTagListArr:string[]=[];
  driftTagsSelected:boolean[]=[];

  kruisRTagListArr:string[]=[];
  kruisRSelected:boolean[]=[];

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

  lhTagListArr:string[]=[];
  lhTagsSelected:boolean[]=[];

  bergenTagListArr:string[]=[]
  bergenTagsSelected:boolean[]=[];

  wolwasTagListArr:string[]=[]
  wolwasTagsSelected:boolean[]=[];

  umiTagListArr:string[]=[]
  umiTagsSelected:boolean[]=[];

  kroonTagListArr:string[]=[]
  kroonTagsSelected:boolean[]=[];

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

  stGeorgeTagListArr:string[]=[]
  stGeorgeTagsSelected:boolean[]=[];

  stanTagListArr:string[]=[];
  stanTagsSelected:boolean[]=[];

  smTagListArr:string[]=[];
  smTagsSelected:boolean[]=[];

  schoeTagListArr:string[]=[];
  schoeTagsSelected:boolean[]=[];

  thTagListArr:string[]=[];
  thTagsSelected:boolean[]=[];

  uitTagListArr:string[]=[];
  uitTagsSelected:boolean[]=[];

  maliTagListArr:string[]=[];
  maliTagsSelected:boolean[]=[];

  emerTagListArr:string[]=[];
  emerTagsSelected:boolean[]=[];

  tinroofTagListArr:string[]=[]
  tinroofTagsSelected:boolean[]=[];

  damcampTagListArr:string[]=[]
  damcampTagsSelected:boolean[]=[];

  holdingTagListArr:string[]=[]
  holdingTagsSelected:boolean[]=[];

  vrhTagListArr:string[]=[];
  vrhTagsSelected:boolean[]=[];

  vsTagListArr:string[]=[];
  vsTagsSelected:boolean[]=[];

  bushyPSTagListArr:string[]=[];
  bushyPSSelected:boolean[]=[];

  bushyFPTTagListArr:string[]=[];
  bushyFPTSelected:boolean[]=[];

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

  klmWtwInletListArr:string[]=[]
  klmWtwInletSelected:boolean[]=[]

  hup6TagListArr:string[]=[]
  hup6TagSelected:boolean[]=[]

  humGroundListArr:string[]=[]
  humGroundSelected:boolean[]=[]

  stormsTagListArr:string[]=[]
  stormsTagSelected:boolean[]=[]

  stormsWTWTagListArr:string[]=[]
  stormsWTWTagSelected:boolean[]=[]

  humOffTakeTagListArr:string[]=[]
  humOffTakeSelected:boolean[]=[]

  jeffBayOffTakeTagListArr:string[]=[]
  jeffBayOffTakeSelected:boolean[]=[]

  kougaMainLineTagListArr:string[]=[]
  kougaMainLineSelected:boolean[]=[]

  gbwTagListArr:string[]=[];
  gbwTagsSelected:boolean[]=[];

  onsParadysTagListArr:string[]=[]
  onsParadysSelected:boolean[]=[]

  oliTagListArr:string[]=[]
  oliTagSelected:boolean[]=[]

  elandTagListArr:string[]=[]
  elandTagSelected:boolean[]=[]

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


  constructor(private su: ServerURLService,private ts:TrendPickerService,private http: HttpClient, public rs: ReportService,private authService: AuthService, private userService: UsersService, private webSocketService: WebSocketService,
      private tps:TrendPickerService,private router: Router
  ) {


    setTimeout(() => {
      this.flag=true
    }, 10);

    this.intervalFunction = setInterval(() => {
      this.selectedTags=[]
this.count = 0
// Reservoirs
this.ReadSelectedValues(this.stGeorgeTagListArr, this.stGeorgeTagsSelected, "St Georges ")
this.ReadSelectedValues(this.airPortTagListArr, this.airPortSelected, "Airport ")
this.ReadSelectedValues(this.maliTagListArr,this.maliTagsSelected, "Malabar ")
this.ReadSelectedValues(this.isuzuTagListArr, this.isuzuSelected, "Isuzu Oven ")
this.ReadSelectedValues(this.emerTagListArr,this.emerTagsSelected, "Emerald Hill ")
this.ReadSelectedValues(this.bhbTagListArr,this.bhbTagsSelected, "Blue Horizon Bay ")
this.ReadSelectedValues(this.chtTagListArr,this.chtTagsSelected, "Chatty ")
this.ReadSelectedValues(this.cheTagListArr,this.cheTagsSelected, "Chelsea ")
this.ReadSelectedValues(this.cgkTagListArr,this.cgkTagsSelected, "Coega Kop ")
this.ReadSelectedValues(this.driftTagListArr,this.driftTagsSelected,"Driftsands ")
this.ReadSelectedValues(this.grTagListArr,this.grTagsSelected, "Grassridge ")
this.ReadSelectedValues(this.gbTagListArr,this.gbTagsSelected, "Greenbushes ")
this.ReadSelectedValues(this.hbTagListArr,this.hbTagsSelected, "Heatherbank ")
this.ReadSelectedValues(this.lhTagListArr,this.lhTagsSelected, "Lovemore Heights ")
this.ReadSelectedValues(this.rdTagListArr,this.rdTagsSelected, "Rosedale ")
this.ReadSelectedValues(this.schoeTagListArr,this.schoeTagsSelected, "Schoemanshoek ")
this.ReadSelectedValues(this.smTagListArr,this.smTagsSelected, "Summit ")
this.ReadSelectedValues(this.thTagListArr,this.thTagsSelected, "Theescombe ")
this.ReadSelectedValues(this.vrhTagListArr,this.vrhTagsSelected, "Van Riebeeck Hoogte ")
this.ReadSelectedValues(this.vsTagListArr,this.vsTagsSelected, "Van Stadens ")
this.ReadSelectedValues(this.oliTagListArr,this.oliTagSelected,"Olifantskop ")
this.ReadSelectedValues(this.bergenTagListArr,this.bergenTagsSelected, "Bergendal ")
this.ReadSelectedValues(this.wolwasTagListArr,this.wolwasTagsSelected, "Wolwas ")
this.ReadSelectedValues(this.umiTagListArr,this.umiTagsSelected, "Umasizakhe ")
this.ReadSelectedValues(this.kroonTagListArr,this.kroonTagsSelected, "Kroonvale ")
this.ReadSelectedValues(this.holdingTagListArr,this.holdingTagsSelected, "Holding ")
this.ReadSelectedValues(this.damcampTagListArr,this.damcampTagsSelected, "Damcamp ")
this.ReadSelectedValues(this.tinroofTagListArr,this.tinroofTagsSelected, "Tin Roof ")
this.ReadSelectedValues(this.effTagListArr,this.effTagsSelected, "NMU Effluent ")
this.ReadSelectedValues(this.kruisRTagListArr, this.kruisRSelected, "Kruisfontein ")
this.ReadSelectedValues(this.kwanoListArr, this.kwanoSelected, "Kwanobuhle Reservoir ")
// Pump Stations
this.ReadSelectedValues(this.cgTagListArr,this.cgTagsSelected, "Crown Gardens ")
this.ReadSelectedValues(this.mwTagListArr,this.mwTagsSelected, "Motherwell ")
this.ReadSelectedValues(this.mwrTagListArr, this.mwrTagsSelected, "Motherwell ")
this.ReadSelectedValues(this.stanTagListArr,this.stanTagsSelected, "Stanford Road ")
this.ReadSelectedValues(this.stormsTagListArr, this.stormsTagSelected, "Storms River ")
this.ReadSelectedValues(this.chePSTagListArr,this.chePSTagsSelected, "Chelsea ")
// FPT
this.ReadSelectedValues(this.cgkIDZTagListArr,this.cgkIDZTagsSelected, "Coega ")
this.ReadSelectedValues(this.fmtTagListArr,this.fmtTagsSelected, "FM Tower ")
this.ReadSelectedValues(this.gamtoosTagListArr,this.gamtoosTagsSelected, "Gamtoos Bridge ")
this.ReadSelectedValues(this.uitTagListArr,this.uitTagsSelected, "Uitenhage Flow Chamber ")
this.ReadSelectedValues(this.bethTagListArr,this.bethTagSelected, "Bethelsdorp ")
this.ReadSelectedValues(this.gbwTagListArr,this.gbwTagsSelected, "Gamtoos Break Water ")
this.ReadSelectedValues(this.humOffTakeTagListArr,this.humOffTakeSelected,"Humansdorp ")
this.ReadSelectedValues(this.jeffBayOffTakeTagListArr,this.jeffBayOffTakeSelected,"Jeffreys Bay ")
this.ReadSelectedValues(this.kougaMainLineTagListArr,this.kougaMainLineSelected,"Kouga Main Line ")
this.ReadSelectedValues(this.onsParadysTagListArr,this.onsParadysSelected,"Ons Paradys ")
this.ReadSelectedValues(this.bushyPSTagListArr, this.bushyPSSelected, "Bushy Park ")
this.ReadSelectedValues(this.bushyFPTTagListArr, this.bushyFPTSelected, "Bushy Park ")
// Groundwater
this.ReadSelectedValues(this.npTagListArr,this.npTagsSelected, "Newton Park Pool ")
this.ReadSelectedValues(this.hup1TagListArr,this.hup1TagSelected, "HD1 ")
this.ReadSelectedValues(this.hup2TagListArr,this.hup2TagSelected, "HD2C ")
this.ReadSelectedValues(this.hup3TagListArr,this.hup3TagSelected, "HD3 ")
this.ReadSelectedValues(this.hup4TagListArr,this.hup4TagSelected, "HD4 ")
this.ReadSelectedValues(this.hup6TagListArr,this.hup6TagSelected, "HD6 ")
this.ReadSelectedValues(this.humGroundListArr, this.humGroundSelected, "Humerail ")
this.ReadSelectedValues(this.klmWtwInletListArr , this.klmWtwInletSelected, "Humansdorp Inlet ")

//Water Treatment works
this.ReadSelectedValues(this.ngtTagListArr,this.ngtTagsSelected, "Nooitgedacht ")
this.ReadSelectedValues(this.stormsWTWTagListArr, this.stormsWTWTagSelected, "Storms River ")
this.ReadSelectedValues(this.elandTagListArr,this.elandTagSelected, "Elandsjagt ")

this.ReadSelectedValues(this.LSDListArr,this.LSDSelected,"Lee Samuals Drive " )
this.ReadSelectedValues(this.MNTSListArr,this.MNTSSelected,"McNoughton Township South ")
this.ReadSelectedValues(this.RRListArr,this.RRSelected,"Rowallan Park Extension " )
this.ReadSelectedValues(this.RPEListArr,this.RPESelected,"Rosedale Reservoir " )

}, 500);

  }

  ngOnInit() {
    this.userSites = this.authService.getUserSites();
    this.userEmail = this.authService.getUserEmail();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
      this.userEmail = this.authService.getUserEmail();
    })


this.presetName=this.ts.getPresetName()
this.presetDescription=this.ts.getPresetDescription()

this.oldPresetName=this.presetName
console.log(this.presetName)
if(this.presetName==null|| this.presetName == undefined|| this.presetName==""){
  this.router.navigate(["hawkeye/trends/manage-preset"])
}

this.selectedSites=this.ts.selectedSites
this.rightSelectedSites=this.ts.rightSelectedSites


var count=0
this.showRes = false;
this.showPS = false;
this.showFPT = false;
this.showGW = false;
this.showWTW = false;



for (let i = 0; i < this.userSites.length; i++) {

  switch (this.userSites[i]) {

      // Reservoirs

      case "NMB_VS_R":
        if (count>=1 ){count = 0}
  this.vsTagListArr[count]="Reservoir Level"
  count++
  this.showRes= true;


        break;
        case "NMB_CGK_R":
          if (count>=1 ){count = 0}
          this.cgkTagListArr[count]="Reservoir Pressure"
          count++
          this.cgkTagListArr[count]="Inlet Chamber 2 Ml"
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
          this.cgkTagListArr[count]="North Chamber 17 Ml"
          count++
		     this.showRes= true;
          break;


      case "NMB_LSD_ZS":
        if(count>=1){count = 0}
        this.LSDListArr[count]="Pressure";
        count++;
        this.LSDListArr[count]="Total Flow";
        count++;
        this.LSDListArr[count]="Flow Rate";
        count++;
        this.showZones = true

        break;



        case "NMB_MNTS_ZS":
          if(count>=1){count = 0}
          this.MNTSListArr[count]="Pressure";
          count++;
          this.MNTSListArr[count]="Total Flow";
          count++;
          this.MNTSListArr[count]="Flow Rate";
          count++;
          this.showZones = true
          break;

          case "NMB_RPE_ZS":
            if (count>=1 ){count = 0}
            this.RRListArr[count]="Pressure";
            count++;
            this.RRListArr[count]="Total Flow";
            count++;
            this.RRListArr[count]="Flow Rate";
            count++;
            this.showZones=true;
          break;

          case "NMB_RD_ZS":
            if (count>=1 ){count = 0}
            this.RPEListArr[count]="Total Flow";
            count++;
            this.RPEListArr[count]="Flow Rate";
            count++;
            this.showZones=true;
            break;

          case "GRF_BERGEN_R":
            if (count>=1 ){count = 0}
            this.bergenTagListArr[count]="Reservoir Level"
               count++
          break;

          case "GRF_WOL_R":
            if (count>=1 ){count = 0}
            this.wolwasTagListArr[count]="Reservoir Level"
            console.log(this.wolwasTagListArr[count])
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

                case "NMB_MALI_R":
                  if(count>=1){count = 0}
                  this.maliTagListArr[count]="Reservoir Level";
                  count++
                     this.showRes= true;
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
                    this.showRes= true;
                    break;

                    case "NMB_EMERALD_R":
                      if (count>=1 ){count = 0}
                      this.emerTagListArr[count]="Reservoir Level"
                count++
                this.emerTagListArr[count]="Flow Rate"
                count++;
                this.emerTagListArr[count]="Total Flow"
                count++;
             this.showRes= true;
                      break;


      case "NMB_BHB_R":
        if (count>=1 ){count = 0}
        this.bhbTagListArr[count]="Reservoir Level"
  count++
  this.showRes= true;
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
          this.showAuto = true;
          break;

        case "KOU_KARK1_GW":
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
            this.karkTagListArr[count]= "K2 Total Flow"
          count++
            this.karkTagListArr[count]= "K2 Flow Rate"
          count++
          this.karkTagListArr[count]= "K2 Current"
          count++
            this.karkTagListArr[count]= "K2 Level"
          count++
            break;
            case "NMB_AIR_PRT":
              if (count>=1 ){count = 0}
        this.airPortTagListArr[count]="Reservoir Level"
        count++
        this.showRes= true;
              break;
      case "NMB_HB_R":
        if (count>=1 ){count = 0}
        this.hbTagListArr[count]="Reservoir Level"
  count++
  this.showRes= true;
        break;
        case "NMB_LH_R":
          if (count>=1 ){count = 0}
          this.lhTagListArr[count]="Reservoir Level"
          count++
          this.lhTagListArr[count]="Overhead Tank"
          count++
		   this.showRes= true;
          break;
      case "NMB_TC_R":
        if (count>=1 ){count = 0}
        this.thTagListArr[count]="Reservoir Level"
  count++
  this.showRes= true;
        break;

        case "NMB_DRIFT_R":
          if(count>=1){count = 0}
          this.driftTagListArr[count]="Reservoir Level"
          count++
          this.driftTagListArr[count]="Flow Rate 1"
          count++
          this.driftTagListArr[count]="Flow Rate 2"
          count++
          this.driftTagListArr[count]="Driftsands Total Flow 1"
          count++
          this.driftTagListArr[count]="Driftsands Total Flow 2"
          count++
          this.showRes= true;


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
          case"NMB_HUP_OFF_TAKE_FPT":
          if(count>=1){count=0}
          this.humOffTakeTagListArr[count]="Off Take Total Flow"
          count++;
          this.humOffTakeTagListArr[count]="Off Take Pressure"
          count++
          this.humOffTakeTagListArr[count]="Off Take Battery Level"
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


          case "NMB_GBW_FPT":
            if (count>=1 ){count = 0}
            this.gbwTagListArr[count]="Pressure"
      count++
            this.gbwTagListArr[count]="Flow Rate"
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

            this.showRes= true;
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
  this.showRes= true;
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
      this.showPS = true;
          break;

        case "TSI_STORMS_PS":
          if(count>=1){count = 0}
          this.stormsTagListArr[count]="Quarry Level"
      count++
          this.stormsTagListArr[count]="Gorge Level"
       count++

       this.showPS = true;
            break;
            case "TSI_STORMS_WTW":
              if(count>=1){count = 0}
              this.stormsWTWTagListArr[count]="Holding Reservoir Level"
          count++
              this.stormsWTWTagListArr[count]="Overhead Tank Level"
           count++
           this.showWTW= true;
                break;
      case "NMB_VRH_R":
        if (count>=1 ){count = 0}
        this.vrhTagListArr[count]="Delivery Level"
  count++
        this.vrhTagListArr[count]="Suction Level"
  count++
  this.showRes= true;

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
    this.showRes= true;
          break;
        case "NMB_GB_R":
          if (count>=1 ){count = 0}
          this.gbTagListArr[count]="Reservoir Level"
    count++
          this.gbTagListArr[count]="Flow Rate"
    count++
    this.showRes= true;
          break;
        case "NMB_RD_R":
          if (count>=1 ){count = 0}
          this.rdTagListArr[count]="Reservoir Level"
    count++
    this.showRes= true;

          break;
          case "NMB_SM_R":
            if (count>=1 ){count = 0}
            this.smTagListArr[count]="Reservoir Level"
      count++
      this.smTagListArr[count]="Flow Rate"
      count++
      this.showRes= true;

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
              this.showPS = true;
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
               this.showFPT = true
              break;
        //FPT Sites
        case "NMB_BETH_FPT":
          if (count>=1 ){count = 0}
          this.bethTagListArr[count]="Battery Level"
          count++
          this.bethTagListArr[count]="Flow Rate"
          count++
          this.bethTagListArr[count]="Pressure"
          count++
          this.bethTagListArr[count]="Total Flow"
          count++
          this.showFPT = true;
          break;
          case "NMB_FMT_FPT":
            if (count>=1 ){count = 0}
            this.fmtTagListArr[count]="Flow Rate"
      count++
            this.fmtTagListArr[count]="Pressure "
      count++
            this.fmtTagListArr[count]="Total Flow"
            count++
            this.showFPT = true;
            break;
        case "NMB_CIDZT_FPT":
          if (count>=1 ){count = 0}
          this.cgkIDZTagListArr[count]="IDZ Flow Rate"
    count++
          this.cgkIDZTagListArr[count]="Motherwell Flow Rate"
    count++
    this.showFPT = true;
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
      this.showFPT = true;
            break;



            case "NMB_UIT_FC_FPT":
              if (count>=1 ){count = 0}
              this.uitTagListArr[count]="Flow Rate"
        count++
              this.uitTagListArr[count]="Pressure"
        count++
        this.showFPT = true;
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
        this.showPS = true;
          break;

        case "NMB_MW_PS":
          if (count>=1 ){count = 0}
              this.mwTagListArr[count]="Flow Rate"
        count++
              this.mwTagListArr[count]="Delivery Pressure"
        count++
              this.mwTagListArr[count]="Suction Pressure"
        count++
               this.showPS = true;
              break;


              case "NMB_MW_R":
               if (count>=1 ){count = 0}
                 this.mwrTagListArr[count]="Reservoir Level"
                  count++
                  this.showRes = true;
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
        this.showPS = true;
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

  case "KLM_KUI_R":
    if (count>=1 ){count = 0}
this.kruisRTagListArr[count]="Reservoir Level"
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

  this.showRes = true;
break;

  /////////////////////////////////////////WTW
  case "NMB_NGT_WTW":
    if (count>=1 ){count = 0}
    this.ngtTagListArr[count]="High Level Flow Rate"
  count++
    this.ngtTagListArr[count]="Low Level Flow Rate"
  count++
  this.showWTW= true;
    break;

    case "NMB_ELANDS_WTW":
      if(count>=1){count = 0}
      this.elandTagListArr[count]="Flow Rate"
     count++
     this.elandTagListArr[count]="Pressure"
     count++
     this.showWTW= true;
      break;

    ///////////////////////////////Groundwater
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
      this.showGW = true;
     break;
     case "KLM_HUP_GW":
          if (count>=1 ){count = 0}
          this.hup1TagListArr[count] ="Flow Rate"
          count++
          this.hup1TagListArr[count] ="Water Level"
          count++
          this.hup1TagListArr[count] ="Total Flow"
          count++
             this.showGW = true;
           break
           case "KLM_HUP2_GW":
            if (count>=1 ){count = 0}
            this.hup2TagListArr[count] ="Flow Rate"
            count++
            this.hup2TagListArr[count] ="Water Level"
            count++
            this.hup2TagListArr[count] ="Total Flow"
            count++
               this.showGW = true;
             break
             case "KLM_HUP3_GW":
              if (count>=1 ){count = 0}
              this.hup3TagListArr[count] ="Flow Rate"
              count++
              this.hup3TagListArr[count] ="Water Level"
              count++
              this.hup3TagListArr[count] ="Total Flow"
              count++
                 this.showGW = true;
               break
               case "KLM_HUP4_GW":
                if (count>=1 ){count = 0}
                this.hup4TagListArr[count] ="Flow Rate"
                count++
                this.hup4TagListArr[count] ="Water Level"
                count++
               this.hup4TagListArr[count] ="Total Flow"
                count++
                   this.showGW = true;
                 break
                 case "KLM_HUP6_GW":
                  if (count>=1 ){count = 0}
                  this.hup6TagListArr[count] ="Flow Rate"
                  count++
                  this.hup6TagListArr[count] ="Water Level"
                  count++
                  this.hup6TagListArr[count] ="Total Flow"
                  count++
                     this.showGW = true;
                   break

                   case "KLM_HUP_WTW":
                    if(count>=1){count = 0}
                    this.klmWtwInletListArr[count]="Flow Rate";
                    count++
                    this.klmWtwInletListArr[count]="Total Flow";
                    count++
            this.showWTW = true;
                    break;

               case "HUM_HUM_GW":
                if(count>=1){count=0}
                this.humGroundListArr[count]="Borehol Level"
                count++;
                this.humGroundListArr[count]="Raw Water Tank Level"
                count++;
                this.humGroundListArr[count]="Final Water Tank Level"
                count++;
                this.showGW = true;
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
                    this.showGW = true;
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
                    this.showGW = true;
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
                      this.showGW = true;
                      break;

      case "NMB_OLI_R":
      if(count>=1){count = 0}
      this.oliTagListArr[count]="Reservoir Level"
      count++
      this.showRes= true;

      break;





  }

  }
  console.log(this.chtTagListArr)
if(this.selectedSites)
      for (let i = 0; i < this.selectedSites.length; i++) {
        switch(this.selectedSites[i]){

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


          case "Airport Reservoir Level":
            this.airPortSelected[0] = true;
            break;

          case "Schoemanshoek Pressure":
            this.schoeTagsSelected[0]=true;
            break

            case "Schoemanshoek Level":
            this.schoeTagsSelected[1]=true;
            break

            case "Schoemanshoek Actuator Position":
            this.schoeTagsSelected[2]=true;
            break

            case "Schoemanshoek Actuator Set Point":
            this.schoeTagsSelected[3]=true;
            break

            case "Schoemanshoek Actuator Valve Feedback Signal":
              this.schoeTagsSelected[4]=true;
              break

              case "Schoemanshoek Actuator Valve Command Signal":
              this.schoeTagsSelected[5]=true;
              break

              case "Schoemanshoek Reservoir Level Signal Error":
              this.schoeTagsSelected[6]=true;
              break

              case "Schoemanshoek Actuator Valve Fault":
              this.schoeTagsSelected[7]=true;
              break

              case "Schoemanshoek Actuator Valve Torque Fail Close":
              this.schoeTagsSelected[8]=true;
              break

              case "Schoemanshoek Actuator Valve Torque Fail Open":
                this.schoeTagsSelected[9]=true;
                break

                case "Schoemanshoek General Fault":
                  this.schoeTagsSelected[10]=true;
                  break

                  case "Schoemanshoek Actuator General Fault":
                    this.schoeTagsSelected[11]=true;
                    break

                    case "Schoemanshoek Actuator Valve Timeout":
                      this.schoeTagsSelected[12]=true;
                      break

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



          case "Olifantskop Reservoir Level":
            this.oliTagSelected[0]=true
            break;


        case "Greenbushes Reservoir Level":
          this.gbTagsSelected[0]=true
        break;

        case "Blue Horizon Bay Reservoir Level":
          this.bhbTagsSelected[0]=true
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

                case "Emerald Hill Reservoir Level":
                  this.emerTagsSelected[0]=true;
                  break;

                  case "Emerald Hill Flow Rate":
                    this.emerTagsSelected[1]=true;
                    break;

                    case "Emerald Hill Total Flow":
                      this.emerTagsSelected[2]=true;
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

        //FPT Sites
        case "Bethelsdorp Battery Level":
          this.bethTagSelected[0]=true
        break;
        case "Bethelsdorp Flow Rate":
          this.bethTagSelected[1]=true
        break;
        case "Bethelsdorp Pressure":
          this.bethTagSelected[2]=true
        break;
        case "Bethelsdorp Total Flow":
          this.bethTagSelected[3] = true ;
          break;

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


        case "Gamtoos Break Water Pressure":
          this.gbwTagsSelected[0]=true;
          break;

          case "Gamtoos Break Water Flow Rate":
            this.gbwTagsSelected[1]=true;
            break;


        //Pump Station Sites
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

        case "Kruisfontein Reservoir Level":
          this.kruisRSelected[0] = true;
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

        case "Motherwell Flow Rate":
          this.mwTagsSelected[0]=true
          break;
          case "Motherwell Delivery Pressure":
            this.mwTagsSelected[1]=true
          break;
          case "Motherwell Suction Pressure":
            this.mwTagsSelected[2]=true
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

          case "Humansdorp WTW Inlet Flow Rate":
            this.klmWtwInletSelected[0] = true;
            break;

            case "Humansdorp WTW Inlet Total Flow":
            this.klmWtwInletSelected[1] = true;
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



          //Ground Water

        //WTW
        case "Nooitgedacht High Level Flow Rate":
          this.ngtTagsSelected[0]=true
        break;

        case "Nooitgedacht Low Level Flow Rate":
          this.ngtTagsSelected[1]=true
        break;

        case "Storms River Holding Reservoir Level":
          this.stormsWTWTagSelected[0]=true
          break;

      case "Storms River Overhead Tank Level":
        this.stormsWTWTagSelected[1]=true
        break;


        case "Elandsjagt Flow Rate":
          this.elandTagSelected[0]=true
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
        }
      }

     this.Right.setValue(this.rightSelectedSites)
  }




  onEditPreset(form: NgForm){
var oldPresetName = this.presetName
var oldPresetDescription = this.presetDescription

    var newPresetName = form.value.presetName
    var newPresetDescription = form.value.presetDescription
    this.count = 0
    // Reservoirs
    this.ReadSelectedValues(this.kruis12GWTagListArr, this.kruis12GWSelected, "Kruisfontein Borhole 12 ")
    this.ReadSelectedValues(this.kruis13GWTagListArr, this.kruis13GWSelected, "Kruisfontein Borhole 13 ")
    this.ReadSelectedValues(this.kruis14GWTagListArr, this.kruis14GWSelected, "Kruisfontein Borhole 14 ")
    this.ReadSelectedValues(this.isuzuTagListArr, this.isuzuSelected, "Isuzu Oven ")
    this.ReadSelectedValues(this.bhbTagListArr,this.bhbTagsSelected, "Blue Horizon Bay ")
    this.ReadSelectedValues(this.airPortTagListArr, this.airPortSelected, "Airport ")
    this.ReadSelectedValues(this.karkTagListArr, this.karkTagSelected,"Kareedouw ")
    this.ReadSelectedValues(this.chtTagListArr,this.chtTagsSelected, "Chatty ")
    this.ReadSelectedValues(this.cheTagListArr,this.cheTagsSelected, "Chelsea ")
    this.ReadSelectedValues(this.cgkTagListArr,this.cgkTagsSelected, "Coega Kop ")
    this.ReadSelectedValues(this.grTagListArr,this.grTagsSelected, "Grassridge ")
    this.ReadSelectedValues(this.gbTagListArr,this.gbTagsSelected, "Greenbushes ")
    this.ReadSelectedValues(this.hbTagListArr,this.hbTagsSelected, "Heatherbank ")
    this.ReadSelectedValues(this.lhTagListArr,this.lhTagsSelected, "Lovemore Heights ")
    this.ReadSelectedValues(this.rdTagListArr,this.rdTagsSelected, "Rosedale ")
    this.ReadSelectedValues(this.schoeTagListArr,this.schoeTagsSelected, "Schoemanshoek ")
    this.ReadSelectedValues(this.smTagListArr,this.smTagsSelected, "Summit ")
    this.ReadSelectedValues(this.thTagListArr,this.thTagsSelected, "Theescombe ")
    this.ReadSelectedValues(this.vrhTagListArr,this.vrhTagsSelected, "Van Riebeeck Hoogte ")
    this.ReadSelectedValues(this.vsTagListArr,this.vsTagsSelected, "Van Stadens ")
    this.ReadSelectedValues(this.driftTagListArr,this.driftTagsSelected,"Driftsands ")
    this.ReadSelectedValues(this.effTagListArr,this.effTagsSelected, "NMU Effluent ")
    this.ReadSelectedValues(this.kruisRTagListArr, this.kruisRSelected, "Kruisfontein ")
    this.ReadSelectedValues(this.kwanoListArr, this.kwanoSelected, "Kwanobuhle Reservoir ")
    // Pump Stations
    this.ReadSelectedValues(this.cgTagListArr,this.cgTagsSelected, "Crown Gardens ")
    this.ReadSelectedValues(this.mwTagListArr,this.mwTagsSelected, "Motherwell ")
    this.ReadSelectedValues(this.mwrTagListArr, this.mwrTagsSelected, "Motherwell ")
    this.ReadSelectedValues(this.stanTagListArr,this.stanTagsSelected, "Stanford Road ")
    this.ReadSelectedValues(this.stormsTagListArr, this.stormsTagSelected, "Storms River ")
    this.ReadSelectedValues(this.chePSTagListArr,this.chePSTagsSelected, "Chelsea ")

    // FPT
    this.ReadSelectedValues(this.cgkIDZTagListArr,this.cgkIDZTagsSelected, "Coega ")
    this.ReadSelectedValues(this.fmtTagListArr,this.fmtTagsSelected, "FM Tower ")
    this.ReadSelectedValues(this.gamtoosTagListArr,this.gamtoosTagsSelected, "Gamtoos Bridge ")
    this.ReadSelectedValues(this.uitTagListArr,this.uitTagsSelected, "Uitenhage Flow Chamber ")
    this.ReadSelectedValues(this.bethTagListArr,this.bethTagSelected, "Bethelsdorp ")
    this.ReadSelectedValues(this.bushyPSTagListArr, this.bushyPSSelected, "Bushy Park ")
    this.ReadSelectedValues(this.bushyFPTTagListArr, this.bushyFPTSelected, "Bushy Park ")
    this.ReadSelectedValues(this.gbwTagListArr,this.gbwTagsSelected, "Gamtoos Break Water ")
    this.ReadSelectedValues(this.humOffTakeTagListArr,this.humOffTakeSelected,"Humansdorp ")
    this.ReadSelectedValues(this.jeffBayOffTakeTagListArr,this.jeffBayOffTakeSelected,"Jeffreys Bay ")
    this.ReadSelectedValues(this.kougaMainLineTagListArr,this.kougaMainLineSelected,"Kouga Main Line ")
    this.ReadSelectedValues(this.onsParadysTagListArr,this.onsParadysSelected,"Ons Paradys ")
    // Groundwater
    this.ReadSelectedValues(this.npTagListArr,this.npTagsSelected, "Newton Park Pool ")
    this.ReadSelectedValues(this.hup1TagListArr,this.hup1TagSelected, "HD1 ")
    this.ReadSelectedValues(this.hup2TagListArr,this.hup2TagSelected, "HD2C ")
    this.ReadSelectedValues(this.hup3TagListArr,this.hup3TagSelected, "HD3 ")
    this.ReadSelectedValues(this.hup4TagListArr,this.hup4TagSelected, "HD4 ")
    this.ReadSelectedValues(this.hup6TagListArr,this.hup6TagSelected, "HD6 ")
    this.ReadSelectedValues(this.humGroundListArr, this.humGroundSelected, "Humerail ")
    this.ReadSelectedValues(this.klmWtwInletListArr , this.klmWtwInletSelected, "Humansdorp Inlet ")
    //Water Treatment works
    this.ReadSelectedValues(this.ngtTagListArr,this.ngtTagsSelected, "Nooitgedacht ")
    this.ReadSelectedValues(this.stormsWTWTagListArr, this.stormsWTWTagSelected, "Storms River ")
    this.ReadSelectedValues(this.elandTagListArr,this.elandTagSelected, "Elandsjagt ")

    this.ReadSelectedValues(this.LSDListArr,this.LSDSelected,"Lee Samuals Drive " )
    this.ReadSelectedValues(this.MNTSListArr,this.MNTSSelected,"McNoughton Township South ")
    this.ReadSelectedValues(this.RRListArr,this.RRSelected,"Rowallan Park Extension " )
    this.ReadSelectedValues(this.RPEListArr,this.RPESelected,"Rosedale Reservoir " )
// Uitenhage

    this.http.post(this.su.serverURL+"/update-user-presets",
    {
       userEmail:this.userEmail,
       oldPresetName:this.oldPresetName,
       newPresetName:newPresetName,
       newPresetDescription:newPresetDescription,
       selectedSites:this.selectedTags,
       rightSelectedSites:this.Right.value
      }


    ).subscribe(
      data=>{
        console.log(data)
      },
      err=>{
        console.log(err)
        this.createPresetErr = true
        setTimeout(() => {
          this.createPresetErr = false
        }, 4000);

      }
    )



    this.router.navigate(["hawkeye/trends/manage-preset"])

}


onDeletePreset(){


  this.http.post(this.su.serverURL+"/delete-user-preset", {
     userEmail:this.userEmail,
     presetName:this.presetName,

    }
  ).subscribe(
    data=>{
      console.log(data)
    },
    err=>{
      console.log(err)
      this.createPresetErr = true
      setTimeout(() => {
        this.createPresetErr = false
      }, 4000);

    }
  )

  this.router.navigate(["hawkeye/trends/manage-preset"])
}

ReadSelectedValues(arr:string[],selectedArr:boolean[], name:string){
  for (let i = 0; i < arr.length; i++) {
    if(selectedArr[i]==true){
      this.selectedTags[this.count]= name + arr[i]
      this.count++
    }
  }
}

ngOnDestroy(){
  if(this.intervalFunction){
    clearInterval(this.intervalFunction)
  }
}
}
