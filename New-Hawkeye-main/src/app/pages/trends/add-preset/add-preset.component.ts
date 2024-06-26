import { HttpClient } from '@angular/common/http';
import {Component, Inject, OnInit,OnDestroy, ViewChild} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { ServerURLService } from 'src/app/Service-Files/server-url.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { TrendPickerService } from '../trendpicker.service';

@Component({
  selector: 'app-add-preset',
  templateUrl: './add-preset.component.html',
  styleUrls: ['./add-preset.component.css']
})
export class AddPresetComponent implements OnInit {
  Right = new FormControl();

  Preset = new FormControl();
  PresetList: string[] = [];
  selectedSites:any[][]=[]
  selectedTags:any[]=[]

  isuzuTagListArr:string[]=[];
  isuzuSelected:boolean[]=[];

bhbTagListArr:string[]=[];
bhbTagsSelected:boolean[]=[];

chtTagListArr:string[]=[];
chtTagsSelected:boolean[]=[];

airPortTagListArr:string[]=[];
airPortSelected:boolean[]=[];


kruis12GWTagListArr:string[]=[];
kruis12GWSelected:boolean[]=[];

kruis13GWTagListArr:string[]=[];
kruis13GWSelected:boolean[]=[];

kruis14GWTagListArr:string[]=[];
kruis14GWSelected:boolean[]=[];


cheTagListArr:string[]=[];
cheTagsSelected:boolean[]=[];

driftTagListArr:string[]=[];
driftTagsSelected:boolean[]=[];

cgkTagListArr:string[]=[];
cgkTagsSelected:boolean[]=[];

cgkIDZTagListArr:string[]=[];
cgkIDZTagsSelected:boolean[]=[];

cgTagListArr:string[]=[];
cgTagsSelected:boolean[]=[];

chePSTagListArr:string[]=[];
chePSTagsSelected:boolean[]=[];

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

karkTagListArr:string[]=[];
karkTagSelected:boolean[]=[];

effTagListArr:string[]=[];
effTagsSelected:boolean[]=[];

kruisRTagListArr:string[]=[];
kruisRSelected:boolean[]=[];

ngtTagListArr:string[]=[];
ngtTagsSelected:boolean[]=[];

rdTagListArr:string[]=[];
rdTagsSelected:boolean[]=[];

maliTagListArr:string[]=[];
maliTagsSelected:boolean[]=[];

stanTagListArr:string[]=[];
stanTagsSelected:boolean[]=[];

smTagListArr:string[]=[];
smTagsSelected:boolean[]=[];

thTagListArr:string[]=[];
thTagsSelected:boolean[]=[];

uitTagListArr:string[]=[];
uitTagsSelected:boolean[]=[];


schoeTagListArr:string[]=[];
schoeTagsSelected:boolean[]=[];


vrhTagListArr:string[]=[];
vrhTagsSelected:boolean[]=[];

stGeorgeTagListArr:string[]=[]
stGeorgeTagsSelected:boolean[]=[];

emerTagListArr:string[]=[];
emerTagsSelected:boolean[]=[];

humGroundListArr:string[]=[]
humGroundSelected:boolean[]=[]

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

// bushyPSTagListArr:string[]=[];
// bushyPSSelected:boolean[]=[];

bushyFPTTagListArr:string[]=[];
bushyFPTSelected:boolean[]=[];

stormsTagListArr:string[]=[]
stormsTagSelected:boolean[]=[]

stormsWTWTagListArr:string[]=[]
stormsWTWTagSelected:boolean[]=[]

oliTagListArr:string[]=[]
oliTagSelected:boolean[]=[]

elandTagListArr:string[]=[]
elandTagSelected:boolean[]=[]

klmWtwInletListArr:string[]=[]
klmWtwInletSelected:boolean[]=[]

humOffTakeTagListArr:string[]=[]
humOffTakeSelected:boolean[]=[]

jeffBayOffTakeTagListArr:string[]=[]
jeffBayOffTakeSelected:boolean[]=[]

kougaMainLineTagListArr:string[]=[]
kougaMainLineSelected:boolean[]=[]

gbwTagListArr:string[]=[];
gbwTagsSelected:boolean[]=[];

kwanoListArr:string[]=[]
kwanoSelected:boolean[]=[]

LSDListArr:string[]=[]
LSDSelected:boolean[]=[]

MNTSListArr:string[]=[]
MNTSSelected:boolean[]=[]

onsParadysTagListArr:string[]=[]
onsParadysSelected:boolean[]=[]

RPEListArr:string[]=[]
RPESelected:boolean[]=[]

RRListArr:string[]=[]
RRSelected:boolean[]=[]

LINTWTWListArr:string[]=[]
LINTWTWSelected:boolean[]=[]

LINTRESListArr:string[]=[]
LINTRESSelected:boolean[]=[]

GlenResListArr:string[]=[]
GlenResSelected:boolean[]=[]

GlenFPTListArr:string[]=[]
GlenFPTSelected:boolean[]=[];

GlenWTWListArr:string[]=[]
GlenWTWSelected:boolean[]=[]



paraStFrancTagListArr:string[]=[]
  paraStFrancSelected: boolean[] = []
  
  BloemFMListArr:string[]=[]
  BloemFMListSelected: boolean[] = []

hankSewagePSListArr: string[] = []
  hankSewagePSListSelected: boolean[] = []

showResMenu: boolean = false;
showPSMenu: boolean = false;
showTrendsMenu: boolean = false;
showFM_Menu: boolean = false;
showWTW_Menu: boolean = false;
showAdminMenu: boolean = false;
showGWMenu: boolean = false;
showAutoMenu: boolean = false;
showZoneMenu: boolean = false;



showAuto: any;
showRes: any;
showPS:any;
showFPT: any;
showGW:any;
showWTW:any;
showZones:any

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

presetName:string
presetDescription:string

intervalFunction:any

  @ViewChild(MatAccordion) accordion: MatAccordion;
  userEmail: string;
  createPresetErr: boolean=false;

  addPresetErrorMsg:string
  addPresetError:boolean = false
  addPresetSuccess:boolean=false
  addPresetSuccessMsg ="Preset has been added successfully"

  constructor(private http: HttpClient,private su: ServerURLService,private _snackBar: MatSnackBar,
    public rs: ReportService,private authService: AuthService, private userService: UsersService, private webSocketService: WebSocketService,
private tps:TrendPickerService,private router: Router
  ) {

    setTimeout(() => {
      this.flag=true
    }, 10);

    this.intervalFunction = setInterval(() => {
this.count = 0

this.selectedTags=[]

// Reservoirs
this.ReadSelectedValues(this.stGeorgeTagListArr, this.stGeorgeTagsSelected, "St Georges ")
this.ReadSelectedValues(this.airPortTagListArr, this.airPortSelected, "Airport ")
this.ReadSelectedValues(this.kruis12GWTagListArr, this.kruis12GWSelected, "Kruisfontein Borhole 12 ")
this.ReadSelectedValues(this.kruis13GWTagListArr, this.kruis13GWSelected, "Kruisfontein Borhole 13 ")
this.ReadSelectedValues(this.kruis14GWTagListArr, this.kruis14GWSelected, "Kruisfontein Borhole 14 ")
this.ReadSelectedValues(this.maliTagListArr,this.maliTagsSelected, "Malabar ")
this.ReadSelectedValues(this.emerTagListArr,this.emerTagsSelected, "Emerald Hill ")
this.ReadSelectedValues(this.bhbTagListArr,this.bhbTagsSelected, "Blue Horizon Bay ")
this.ReadSelectedValues(this.isuzuTagListArr, this.isuzuSelected, "Isuzu Oven ")
this.ReadSelectedValues(this.chtTagListArr,this.chtTagsSelected, "Chatty ")
this.ReadSelectedValues(this.cheTagListArr,this.cheTagsSelected, "Chelsea ")
this.ReadSelectedValues(this.cgkTagListArr,this.cgkTagsSelected, "Coega Kop ")
this.ReadSelectedValues(this.grTagListArr,this.grTagsSelected, "Grassridge ")
this.ReadSelectedValues(this.gbTagListArr,this.gbTagsSelected, "Greenbushes ")
this.ReadSelectedValues(this.hbTagListArr,this.hbTagsSelected, "Heatherbank ")
this.ReadSelectedValues(this.hbpTagListArr,this.bhpTagsSelected, "Heatherbank Pumpstation ")
this.ReadSelectedValues(this.lhTagListArr,this.lhTagsSelected, "Lovemore Heights ")
this.ReadSelectedValues(this.rdTagListArr,this.rdTagsSelected, "Rosedale ")
this.ReadSelectedValues(this.smTagListArr,this.smTagsSelected, "Summit ")
this.ReadSelectedValues(this.schoeTagListArr,this.schoeTagsSelected, "Schoemanshoek ")
this.ReadSelectedValues(this.thTagListArr,this.thTagsSelected, "Theescombe ")
this.ReadSelectedValues(this.vrhTagListArr,this.vrhTagsSelected, "Van Riebeeck Hoogte ")
this.ReadSelectedValues(this.vsTagListArr,this.vsTagsSelected, "Van Stadens ")
this.ReadSelectedValues(this.stormsTagListArr, this.stormsTagSelected, "Storms River ")
this.ReadSelectedValues(this.oliTagListArr,this.oliTagSelected,"Olifantskop ")
this.ReadSelectedValues(this.driftTagListArr,this.driftTagsSelected,"Driftsands ")
this.ReadSelectedValues(this.bergenTagListArr,this.bergenTagsSelected, "Bergendal ")
this.ReadSelectedValues(this.wolwasTagListArr,this.wolwasTagsSelected, "Wolwas ")
this.ReadSelectedValues(this.umiTagListArr,this.umiTagsSelected, "Umasizakhe ")
this.ReadSelectedValues(this.kroonTagListArr,this.kroonTagsSelected, "Kroonvale ")
this.ReadSelectedValues(this.holdingTagListArr,this.holdingTagsSelected, "Holding ")
this.ReadSelectedValues(this.damcampTagListArr,this.damcampTagsSelected, "Damcamp ")
this.ReadSelectedValues(this.tinroofTagListArr,this.tinroofTagsSelected, "Tin Roof ")
this.ReadSelectedValues(this.LINTRESListArr,this.LINTRESSelected,"Linton Reservoir " );
this.ReadSelectedValues(this.GlenResListArr,this.GlenResSelected,"Glendinningvale Reservoir " );
this.ReadSelectedValues(this.GlenFPTListArr,this.GlenFPTSelected,"Glendinningvale " )
this.ReadSelectedValues(this.GlenWTWListArr,this.GlenWTWSelected,"Glendinningvale " )
this.ReadSelectedValues(this.paraStFrancTagListArr, this.paraStFrancSelected, "Paradise Beach")
	

this.ReadSelectedValues(this.effTagListArr,this.effTagsSelected, "NMU Effluent ")
this.ReadSelectedValues(this.kruisRTagListArr, this.kruisRSelected, "Kruisfontein ")
this.ReadSelectedValues(this.kwanoListArr, this.kwanoSelected, "Kwanobuhle Reservoir ")
// Pump Stations
this.ReadSelectedValues(this.cgTagListArr,this.cgTagsSelected, "Crown Gardens ")
this.ReadSelectedValues(this.mwTagListArr,this.mwTagsSelected, "Motherwell ")
this.ReadSelectedValues(this.mwrTagListArr, this.mwrTagsSelected, "Motherwell Reservoir ")
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
// this.ReadSelectedValues(this.bushyPSTagListArr, this.bushyPSSelected, "Bushy Park ")
this.ReadSelectedValues(this.bushyFPTTagListArr, this.bushyFPTSelected, "Bushy Park ")
// Groundwater
this.ReadSelectedValues(this.npTagListArr,this.npTagsSelected, "Newton Park Pool ")
this.ReadSelectedValues(this.karkTagListArr, this.karkTagSelected,"Kareedouw ")
this.ReadSelectedValues(this.hup1TagListArr,this.hup1TagSelected, "HD1 ")
this.ReadSelectedValues(this.hup2TagListArr,this.hup2TagSelected, "HD2C ")
this.ReadSelectedValues(this.hup3TagListArr,this.hup3TagSelected, "HD3 ")
this.ReadSelectedValues(this.hup4TagListArr,this.hup4TagSelected, "HD4 ")
this.ReadSelectedValues(this.hup6TagListArr,this.hup6TagSelected, "HD6 ")
this.ReadSelectedValues(this.humGroundListArr, this.humGroundSelected, "Humerail ")

//Water Treatment works
this.ReadSelectedValues(this.ngtTagListArr,this.ngtTagsSelected, "Nooitgedacht ")
this.ReadSelectedValues(this.stormsWTWTagListArr, this.stormsWTWTagSelected, "Storms River ")
this.ReadSelectedValues(this.elandTagListArr,this.elandTagSelected, "Elandsjagt ")
this.ReadSelectedValues(this.klmWtwInletListArr , this.klmWtwInletSelected, "Humansdorp Inlet ")
this.ReadSelectedValues(this.LINTWTWListArr,this.LINTWTWSelected,"Linton " )

      this.ReadSelectedValues(this.BloemFMListArr, this.BloemFMListSelected, "Bloemendal Res FM ");
this.ReadSelectedValues(this.LSDListArr,this.LSDSelected,"Lee Samuals Drive " )
this.ReadSelectedValues(this.MNTSListArr,this.MNTSSelected,"McNoughton Township South ")
this.ReadSelectedValues(this.RRListArr,this.RRSelected,"Rowallan Park Extension " )
      this.ReadSelectedValues(this.RPEListArr, this.RPESelected, "Rosedale Reservoir ")
      
      this.ReadSelectedValues(this.hankSewagePSListArr,this.hankSewagePSListSelected,"Hankey Sewage ")

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



    this.http.post(this.su.serverURL+"/get-user-preset-names", {userEmail:this.userEmail}).subscribe(
      (data:any)=>{
      if(data.result)
        for (let i = 0; i < data.result.length; i++) {

          this.PresetList[i] = data.result[i].presetName
          this.selectedSites.push(data.result[i].selectedSites )
        }
      },
      err=>{
        console.log(err)

       } )


       var count=0
       this.showAuto = false;
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

                case "NMB_LIN_R":
                  if(count>=1){count = 0}
                  this.LINTRESListArr[count]="Level"
                  count++
                    this.showRes = true;
                  break;

                  case "NMB_GLEN_R":
                    if(count>=1){count = 0}
                    this.GlenResListArr[count]="Level"
                    count++;
                    this.showRes = true;
                    break;

            case "NMB_PARA_BEA_ST_FRANCIS_FPT":
            if(count>=1){count = 0}
            this.paraStFrancTagListArr[count]="Flow Rate";
            count++;
            this.paraStFrancTagListArr[count]="Total Flow";
            count++;
            this.paraStFrancTagListArr[count]="St Francis Total Flow";
            count++;
            this.paraStFrancTagListArr[count]="St Francis Flow Rate";
            count++;
            this.showFPT= true;
            break
            
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
                      count++;
                      this.showFPT = true;
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
                        this.showWTW = true;
                        break;


                     

        // case "NMB_BUSH_PS":
        //   if(count>=1){count = 0}
        //   this.bushyPSTagListArr[count]="Soccoman Flow Rate"
        //   count++
        //   this.bushyPSTagListArr[count]="Soccoman Pressure"
        //   count++
        //   this.bushyPSTagListArr[count]="Soccoman Total Flow"
        //   count++
        //   this.bushyPSTagListArr[count]="Steel Flow Rate"
        //   count++
        //   this.bushyPSTagListArr[count]="Steel Pressure"
        //   count++
        //   this.bushyPSTagListArr[count]="Steel Total Flow"
        //   count++
        //   this.showPS = true;
        //   break;


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
          this.showFPT = true
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
          this.showRes = true;
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


      case "NMB_BHB_R":
        if (count>=1 ){count = 0}
        this.bhbTagListArr[count]="Reservoir Level"
  count++
  this.showRes= true;
        break;
      case "NMB_HB_R":
        if (count>=1 ){count = 0}
        this.hbTagListArr[count]="Reservoir Level"
  count++
  this.showRes= true;
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
         this.showPS = true;
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

        case "NMB_AIR_PRT":
          if (count>=1 ){count = 0}
    this.airPortTagListArr[count]="Reservoir Level"
    count++

  this.showRes= true;

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
            this.jeffBayOffTakeTagListArr[count]="Off Take Flow Rate"
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

            case"NMB_ONS_PARA_FPT":
            if(count>=1){count=0}
            this.onsParadysTagListArr[count]="Total Flow"
            count++;
            this.onsParadysTagListArr[count]="Battery Level"
            count++;
            this.showFPT = true;
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
    
          case "NMB_STAN_R_PS":
          if (count >= 1) { count = 0 }
          this.stanTagListArr[count] = "Common Suction Pressure";
          count++;
          this.stanTagListArr[count] = "Common Delivery Pressure";
          count++;
          this.stanTagListArr[count] = "Flow Rate";
          count++;
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
        this.showPS = true;
              break;

                case "NMB_MW_R":
                    if (count>=1 ){count = 0}
                    this.mwrTagListArr[count]="North Chamber Level";
                    count++;
                    this.mwrTagListArr[count]="South Chamber Level";
                    count++;
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
  /////////////////////////////////////////WTW
  case "NMB_NGT_WTW":
          if (count>=1 ){count = 0}
          this.ngtTagListArr[count]="High Level Flow Rate"
        count++
          this.ngtTagListArr[count]="Low Level Flow Rate"
        count++
		      this.showWTW= true;
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


     case "NMB_BLOEM_FM_ZS":
          if (count >= 1) { count = 0 }
          this.BloemFMListArr[count] = "Flow Rate";
          count++;
          this.BloemFMListArr[count] = "Total Flow";
          count++;
          this.BloemFMListArr[count] = "Battery Level";
          count++;
          this.showZones = true;
      break;
    
     case "KOU_HANK_SEW_PS":
          if (count >= 1) { count = 0 }
          this.hankSewagePSListArr[count] = "Flow Rate 1";
          count++;
          this.hankSewagePSListArr[count] = "Flow Rate 2";
          count++;
          this.hankSewagePSListArr[count] = "Average Current";
          count++;
          this.hankSewagePSListArr[count] = "Pump 1 Speed";
          count++;
          this.hankSewagePSListArr[count] = "Pump 2 Speed";
          count++;
          this.hankSewagePSListArr[count] = "Pump 3 Speed";
          count++;
          this.hankSewagePSListArr[count] = "Total Flow 1";
          count++;
          this.hankSewagePSListArr[count] = "Total Flow 2";
          count++;
          this.showPS = true;
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
    this.showGW = true;

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
          this.showGW = true;
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
          this.hup3TagListArr[count] ="Total Flow'"
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


             case "KLM_HUP_WTW":
              if(count>=1){count = 0}
              this.klmWtwInletListArr[count]="Flow Rate";
              count++
              this.klmWtwInletListArr[count]="Total Flow";
              count++
              this.showWTW = true;
              break;

             case "HUM_HUM_GW":
              if(count>=1){count=1}
              this.humGroundListArr[count]="Borehol Level"
              count++;
              this.humGroundListArr[count]="Raw Water Tank Level"
              count++;
              this.humGroundListArr[count]="Final Water Tank Level"
              count++;
              this.showGW = true;
              break;

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

      case "NMB_OLI_R":
      if(count>=1){count = 0}
      this.oliTagListArr[count]="Reservoir Level"
      count++
      this.showRes= true;

      break;







  }

  }


  }


  onSavePreset(form: NgForm){

    var presetName = form.value.presetName
    var presetDescription = form.value.presetDescription

    this.count = 0
    // Reservoirs

    this.ReadSelectedValues(this.kruis12GWTagListArr, this.kruis12GWSelected, "Kruisfontein Borhole 12 ")
    this.ReadSelectedValues(this.kruis13GWTagListArr, this.kruis13GWSelected, "Kruisfontein Borhole 13 ")
    this.ReadSelectedValues(this.kruis14GWTagListArr, this.kruis14GWSelected, "Kruisfontein Borhole 14 ")
    this.ReadSelectedValues(this.bhbTagListArr,this.bhbTagsSelected, "Blue Horizon Bay ")
    this.ReadSelectedValues(this.isuzuTagListArr, this.isuzuSelected, "Isuzu Oven ")
    this.ReadSelectedValues(this.airPortTagListArr, this.airPortSelected, "Airport ")
    this.ReadSelectedValues(this.emerTagListArr,this.emerTagsSelected, "Emerald Hill ")
    this.ReadSelectedValues(this.chtTagListArr,this.chtTagsSelected, "Chatty ")
    this.ReadSelectedValues(this.cheTagListArr,this.cheTagsSelected, "Chelsea ")
    this.ReadSelectedValues(this.cgkTagListArr,this.cgkTagsSelected, "Coega Kop ")
    this.ReadSelectedValues(this.grTagListArr,this.grTagsSelected, "Grassridge ")
    this.ReadSelectedValues(this.gbTagListArr,this.gbTagsSelected, "Greenbushes ")
    this.ReadSelectedValues(this.hbTagListArr,this.hbTagsSelected, "Heatherbank ")
    this.ReadSelectedValues(this.hbpTagListArr,this.bhpTagsSelected, "Heatherbank Pumpstation ")
    this.ReadSelectedValues(this.lhTagListArr,this.lhTagsSelected, "Lovemore Heights ")
    this.ReadSelectedValues(this.rdTagListArr,this.rdTagsSelected, "Rosedale ")
    this.ReadSelectedValues(this.smTagListArr,this.smTagsSelected, "Summit ")
    this.ReadSelectedValues(this.schoeTagListArr,this.schoeTagsSelected, "Schoemanshoek ")
    this.ReadSelectedValues(this.thTagListArr,this.thTagsSelected, "Theescombe ")
    this.ReadSelectedValues(this.vrhTagListArr,this.vrhTagsSelected, "Van Riebeeck Hoogte ")
    this.ReadSelectedValues(this.vsTagListArr,this.vsTagsSelected, "Van Stadens ")
    this.ReadSelectedValues(this.oliTagListArr,this.oliTagSelected,"Olifantskop ")
    this.ReadSelectedValues(this.driftTagListArr,this.driftTagsSelected,"Driftsands ")
    this.ReadSelectedValues(this.effTagListArr,this.effTagsSelected, "NMU Effluent ")
    this.ReadSelectedValues(this.kruisRTagListArr, this.kruisRSelected, "Kruisfontein ")
    this.ReadSelectedValues(this.LINTRESListArr,this.LINTRESSelected,"Linton Reservoir " )
    this.ReadSelectedValues(this.GlenResListArr,this.GlenResSelected,"Glendinningvale Reservoir " );
this.ReadSelectedValues(this.GlenFPTListArr,this.GlenFPTSelected,"Glendinningvale " )
this.ReadSelectedValues(this.GlenWTWListArr,this.GlenWTWSelected,"Glendinningvale " )
this.ReadSelectedValues(this.paraStFrancTagListArr, this.paraStFrancSelected, "Paradise Beach")
	
    this.ReadSelectedValues(this.kwanoListArr, this.kwanoSelected, "Kwanobuhle Reservoir ")
    // Pump Stations
    this.ReadSelectedValues(this.cgTagListArr,this.cgTagsSelected, "Crown Gardens ")
    this.ReadSelectedValues(this.mwTagListArr,this.mwTagsSelected, "Motherwell ")
    this.ReadSelectedValues(this.mwrTagListArr, this.mwrTagsSelected, "Motherwell Reservoir ")
    this.ReadSelectedValues(this.stanTagListArr,this.stanTagsSelected, "Stanford Road ")
    this.ReadSelectedValues(this.stormsTagListArr, this.stormsTagSelected, "Storms River ")
    this.ReadSelectedValues(this.chePSTagListArr,this.chePSTagsSelected, "Chelsea ")
	
    // FPT
    this.ReadSelectedValues(this.cgkIDZTagListArr,this.cgkIDZTagsSelected, "Coega ")
    this.ReadSelectedValues(this.fmtTagListArr,this.fmtTagsSelected, "FM Tower ")
    this.ReadSelectedValues(this.gamtoosTagListArr,this.gamtoosTagsSelected, "Gamtoos Bridge ")
    this.ReadSelectedValues(this.uitTagListArr,this.uitTagsSelected, "Uitenhage Flow Chamber ")
    this.ReadSelectedValues(this.bethTagListArr,this.bethTagSelected, "Bethelsdorp ")

    this.ReadSelectedValues(this.humOffTakeTagListArr,this.humOffTakeSelected,"Humansdorp ")
this.ReadSelectedValues(this.jeffBayOffTakeTagListArr,this.jeffBayOffTakeSelected,"Jeffreys Bay ")
this.ReadSelectedValues(this.kougaMainLineTagListArr,this.kougaMainLineSelected,"Kouga Main Line ")
this.ReadSelectedValues(this.onsParadysTagListArr,this.onsParadysSelected,"Ons Paradys ")
this.ReadSelectedValues(this.gbwTagListArr,this.gbwTagsSelected, "Gamtoos Break Water ")
// this.ReadSelectedValues(this.bushyPSTagListArr, this.bushyPSSelected, "Bushy Park ")
this.ReadSelectedValues(this.bushyFPTTagListArr, this.bushyFPTSelected, "Bushy Park ")
    // Groundwater
    this.ReadSelectedValues(this.npTagListArr,this.npTagsSelected, "Newton Park Pool ")
    this.ReadSelectedValues(this.karkTagListArr, this.karkTagSelected,"Kareedouw ")
    this.ReadSelectedValues(this.hup1TagListArr,this.hup1TagSelected, "HD1 ")
this.ReadSelectedValues(this.hup2TagListArr,this.hup2TagSelected, "HD2C ")
this.ReadSelectedValues(this.hup3TagListArr,this.hup3TagSelected, "HD3 ")
this.ReadSelectedValues(this.hup4TagListArr,this.hup4TagSelected, "HD4 ")
this.ReadSelectedValues(this.hup6TagListArr,this.hup6TagSelected, "HD6 ")
this.ReadSelectedValues(this.humGroundListArr, this.humGroundSelected, "Humerail ")

    //Water Treatment works
    this.ReadSelectedValues(this.ngtTagListArr,this.ngtTagsSelected, "Nooitgedacht ")
    this.ReadSelectedValues(this.stormsWTWTagListArr, this.stormsWTWTagSelected, "Storms River ")
    this.ReadSelectedValues(this.elandTagListArr,this.elandTagSelected, "Elandsjagt ")
    this.ReadSelectedValues(this.klmWtwInletListArr , this.klmWtwInletSelected, "Humansdorp Inlet ")
    this.ReadSelectedValues(this.LINTWTWListArr,this.LINTWTWSelected,"Linton " )

    this.ReadSelectedValues(this.BloemFMListArr, this.BloemFMListSelected, "Bloemendal Res FM ");
    this.ReadSelectedValues(this.LSDListArr,this.LSDSelected,"Lee Samuals Drive " )
this.ReadSelectedValues(this.MNTSListArr,this.MNTSSelected,"McNoughton Township South ")
this.ReadSelectedValues(this.RRListArr,this.RRSelected,"Rowallan Park Extension " )
    this.ReadSelectedValues(this.RPEListArr, this.RPESelected, "Rosedale Reservoir ")
    
    this.ReadSelectedValues(this.hankSewagePSListArr,this.hankSewagePSListSelected,"Hankey Sewage ")

    var rightAxisTags = this.Right.value
    if (rightAxisTags==null) {
      rightAxisTags=[]
    }

    this.http.post(this.su.serverURL+"/save-user-presets", {userEmail:this.userEmail, presetName:presetName,presetDescription:presetDescription, selectedSites:this.selectedTags, rightSelectedSites:rightAxisTags}).subscribe(
      data=>{
        console.log(data)
        this.addPresetSuccess=true
        this.addPresetError=false

      },
      err=>{
        console.log(err)
        this.addPresetErrorMsg = err.error.message;
        this.addPresetError = true
       //this.createPresetErr = true
        // setTimeout(() => {
        //   this.createPresetErr = false
        // }, 4000);

      }
    )
    this.presetName=""
    this.presetDescription=""


this.humGroundSelected=[]
this.bhbTagsSelected=[];
this.emerTagsSelected=[];
this.isuzuSelected = [];
this.chtTagsSelected=[];
this.cheTagsSelected=[];
this.cgkTagsSelected=[];
this.cgkIDZTagsSelected=[];
this.cgTagsSelected=[];
this.fmtTagsSelected=[];
this.gamtoosTagsSelected=[];
this.grTagsSelected=[];
this.gbTagsSelected=[];
this.hbTagsSelected=[];
this.bhpTagsSelected=[]
this.lhTagsSelected=[];
this.chePSTagsSelected=[];
this.schoeTagsSelected=[];
this.mwTagsSelected=[];
this.mwrTagsSelected=[]
this.npTagsSelected=[];
this.effTagsSelected=[];
this.kruisRSelected=[]
this.LINTRESSelected=[];
this.GlenResSelected=[]
this.paraStFrancSelected=[]
this.GlenFPTSelected=[]
this.GlenWTWSelected=[]
this.ngtTagsSelected=[];
this.rdTagsSelected=[];
this.stanTagsSelected=[];
this.smTagsSelected=[];
this.thTagsSelected=[];
this.uitTagsSelected=[];
this.vrhTagsSelected=[];
this.vsTagsSelected=[];
this.bethTagSelected=[]
this.karkTagSelected=[]
this.hup1TagSelected=[]
this.hup2TagSelected=[]
this.hup3TagSelected=[]
this.hup4TagSelected=[]
this.hup6TagSelected=[]
this.stormsTagSelected=[]
this.stormsWTWTagSelected=[]
this.oliTagSelected=[]
this.elandTagSelected=[]
this.klmWtwInletSelected=[]
this.LINTWTWSelected=[]
this.LSDSelected = []
this.MNTSSelected = []
this.driftTagsSelected=[];
// this.bushyPSSelected = []
this.bushyFPTSelected = []
this.airPortSelected= [];
this.humOffTakeSelected=[]
this.jeffBayOffTakeSelected = []
this.kougaMainLineSelected = []
this.onsParadysSelected = []
this.RRSelected = []
    this.RPESelected = []
    this.hankSewagePSListSelected = [];

this.Right = new FormControl();


}

closeSnackBar() {
  this.addPresetSuccess=false
  this.addPresetError=false

  };
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
