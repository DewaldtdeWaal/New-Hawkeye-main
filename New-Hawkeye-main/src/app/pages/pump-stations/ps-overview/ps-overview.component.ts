import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {resOverviewRouteComponent} from 'src/app/Service-Files/Pumpstation/pumpoverview.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Common } from 'src/app/class/common';
export interface PeriodicElement {
  Name: string;
  communication_status: any;
  url:any;
}


@Component({
  selector: 'app-ps-overview',
  templateUrl: './ps-overview.component.html',
  styleUrls: ['./ps-overview.component.css']
})
export class PsOverviewComponent implements OnInit {

  displayedColumns :string[]= ['Name', 'communication_status'];
  userSites:string[];
  public authListenerSubs!: Subscription;
  data: any=[];

  responseData: any= []
  variable = {
  stan_ps_ut: null,
  bf_PS_UT: null,
  vs_PS_UT: null,
  hb_R_UT: null,
  cht_ut: null,
  mw_g_ut: null,
  cg_G_UT: null,
  bush_UT:null,
  che_r_ut: null,
  bhb_PS_UT: null,
  vrh_ut: null,
  ps_storm_UT: null,
  lh_UT: null,
  nmu_eff_ps_ut: null,
  tc_R_UT: null,
  }


  ELEMENT_DATA: PeriodicElement[] = [];
  filterValue: any="";
  @ViewChild(MatSort) sort: MatSort;
  dataSource:any;


  resOverviewInterval: any;

  bhb_PS_comms:any
  lh_comms: any;
  tc_R_comms: any;
  nmu_eff_ps_comms: any;
  bush_comms:any;
  stan_ps_comms:any;
  bf_PS_comms:any;
  ps_storm_comms:any;
  vrh_comms:any;
  mw_g_comms:any;
  vs_PS_comms:any;
  che_r_comms:any;
  cg_G_comms:any;
  cht_comms:any;
  hb_R_comms:any


   tagArr:any =[
    "stan_ps_ut",
    "bf_PS_UT",
    "vs_PS_UT",
    "hb_R_UT",
    "cht_ut",
    "mw_g_ut",
    "cg_G_UT",
    "bush_UT",
    "che_r_ut",
    "bhb_PS_UT",
    "vrh_ut",
    "ps_storm_UT",
    "lh_UT",
    "nmu_eff_ps_ut",
    "tc_R_UT",

    ]
  constructor(private route:resOverviewRouteComponent,private authService: AuthService, private ws:WebSocketService ,private router: Router ,public recieve:Common ) {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    this.getRouteInformation(this.variable).then((response) => {
      this.responseData = response


      this.renderPage(this.responseData)
    })




  }

  recieveVals(tagArr: any[]){
    var tagVals:any = []
    for(let i = 0; i<tagArr.length ;i++){
      this.ws.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
        tagVals[i] = data[tagArr[i]];

      })
    }
    return tagVals
  }

  recieveVals_non_nmbm(tagArr: any[]){
    var tagVals:any = []
    for(let i = 0; i<tagArr.length ;i++){
      this.ws.listen(tagArr[i]).subscribe((data:any)=>{
        tagVals[i] = data[tagArr[i]];

      })
    }
    return tagVals
  }

  ngOnInit() {








    this.resOverviewInterval = setInterval(() =>{

      this.getRouteInformation(this.variable).then((response) => {
        this.responseData = response


        this.renderPage(this.responseData)
      })



    },60000)




  }


  getCommunicationStatus(lastUpdate:any, communication_status:any) {

    var updateTime = lastUpdate
    var updateTimeMS =Date.parse(updateTime)
    var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
    var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
    var dateminus5minMS = cuurentDateMS - 300000

while (updateTime != undefined) {
    if(updateTime.length ==0){}
    else{
      if (updateTimeMS>dateminus5minMS)
      {
        communication_status = "assets/img/General/Green Circle Tick.png"
      }
      else{
        communication_status = "assets/img/General/Red Circle Cross.png"
      }


      return communication_status;
    }
    }


  }


  listening(name:any, Communication_status:any,  Count:any,URL:any  ){

    this.ELEMENT_DATA[Count]={ Name:name, communication_status:Communication_status,  url:  URL };
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
     this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

}

applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
 this.dataSource.filter = this.filterValue.trim().toLowerCase();
}

navigateToSite(element:any){
  let route = element;
  this.router.navigate([route]);

}

ngOnDestroy(){
  if(this.resOverviewInterval){
    clearInterval(this.resOverviewInterval)
  }
}

async getRouteInformation(variable:any): Promise<any> {


  return new Promise(async (resolve, reject) => {
    try {
      const response = await this.route.GetSiteValues();

      this.data = response;

      variable = await this.recieve.recieveRouteData(this.tagArr,variable, this.data.routingArray);

      console.log(variable)
      resolve(variable);
    } catch (error) {

      console.error(error);
      reject(error);
    }
  });
}


async renderPage(variable:any){

  console.log(variable);


    var count=0;
    for (var i = 0; i < this.userSites.length; i++){
      switch (this.userSites[i]) {

        case "NMB_BUSH_PS":
          if(this.variable.bush_UT != null || this.variable.bush_UT != undefined){
            this.bush_comms = this.getCommunicationStatus(this.variable.bush_UT, this.bush_comms)
            this.listening("Bushy Park", this.bush_comms, count,"/hawkeye/pumpstations/bushypark-wtw")
            count++;
          }
          break;
        case "NMB_BHB_PS":
          if(this.variable.bhb_PS_UT  != null || this.variable.bhb_PS_UT  != undefined){
          this.bhb_PS_comms =  this.getCommunicationStatus(this.variable.bhb_PS_UT, this.bhb_PS_comms)
          this.listening("Blue Horizon Bay", this.bhb_PS_comms, count, "/hawkeye/pumpstations/bluehorizonbay")
          count++;
        }
          break;
        case "NMB_BFT_PS":
          if(this.variable.bf_PS_UT  != null || this.variable.bf_PS_UT  != undefined){
          this.bf_PS_comms = this.getCommunicationStatus(this.variable.bf_PS_UT,this.bf_PS_comms)
          this.listening("Buffelsfontein",this.bf_PS_comms, count,"/hawkeye/pumpstations/buffelsfontein" )
          count++;
        }
          break;

        case "NMB_STAN_R_PS":
          if(this.variable.stan_ps_ut  != null || this.variable.stan_ps_ut  != undefined){
          this.stan_ps_comms = this.getCommunicationStatus(this.variable.stan_ps_ut,this.stan_ps_comms )
          this.listening("Standford Road",this.stan_ps_comms,count, "/hawkeye/pumpstations/stanford-road")
          count++;
        }
          break;

        case "TSI_STORMS_PS":
          if(this.variable.ps_storm_UT  != null || this.variable.ps_storm_UT  != undefined){
          this.ps_storm_comms = this.getCommunicationStatus(this.variable.ps_storm_UT, this.ps_storm_comms)
          this.listening("Storms River", this.ps_storm_comms, count, "/hawkeye/pumpstations/stormsriver")
          count++;
        }
          break;

        case "NMB_VRH_PS":
          if(this.variable.vrh_ut  != null || this.variable.vrh_ut  != undefined){
          this.vrh_comms = this.getCommunicationStatus(this.variable.vrh_ut, this.vrh_comms)
          this.listening("Van Riebeeck Hoogte", this.vrh_comms, count, "/hawkeye/pumpstations/vanriebeekhoogte")
          count++;
          }
          break;


       case "NMB_VS_PS":
        if(this.variable.vs_PS_UT != null || this.variable.vs_PS_UT  != undefined){
         this.vs_PS_comms = this.getCommunicationStatus(this.variable.vs_PS_UT, this.vs_PS_comms)
         this.listening("Van Stadens", this.vs_PS_comms, count, "/hawkeye/pumpstations/vanstadens")
         count++;
        }
         break;




         case "HWK_DEMO_PS":
          if(this.variable.vs_PS_UT != null || this.variable.vs_PS_UT  != undefined){
           this.vs_PS_comms = this.getCommunicationStatus(this.variable.vs_PS_UT, this.vs_PS_comms)
           this.listening("Demo Pump Station", this.vs_PS_comms, count, "/hawkeye/pumpstations/demo-ps")
           count++;
          }
           break;

      case "NMB_HB_PS":
        if(this.variable.hb_R_UT  != null || this.variable.hb_R_UT  != undefined){
        this.hb_R_comms = this.getCommunicationStatus(this.variable.hb_R_UT, this.hb_R_comms)
        this.listening("Heatherbank", this.hb_R_comms, count, "/hawkeye/pumpstations/heatherbank")
        count++;
      }
        break;

      case "NMB_CHT_PS":
        if(this.variable.cht_ut  != null || this.variable.cht_ut  != undefined){
        this.cht_comms = this.getCommunicationStatus(this.variable.cht_ut, this.cht_comms)
        this.listening("Chatty", this.cht_comms, count, "/hawkeye/pumpstations/chatty")
        count++;
      }
        break;

      case "NMB_MW_PS":
        if(this.variable.mw_g_ut  != null || this.variable.mw_g_ut  != undefined){
        this.mw_g_comms = this.getCommunicationStatus(this.variable.mw_g_ut, this.mw_g_comms)
        this.listening("Motherwell", this.mw_g_comms, count, "/hawkeye/pumpstations/motherwell")
        count++;
      }
        break;

      case "RW_CG_PS":
        if(this.variable.cg_G_UT  != null || this.variable.cg_G_UT  != undefined){
        this.cg_G_comms = this.getCommunicationStatus(this.variable.cg_G_UT, this.cg_G_comms)
        this.listening("Crown Gardens", this.cg_G_comms, count, "/hawkeye/pumpstations/crowngardens")
        count++;
      }
        break;

      case "NMB_CHE_PS":
        if(this.variable.che_r_ut  != null || this.variable.che_r_ut  != undefined){
        this.che_r_comms = this.getCommunicationStatus(this.variable.che_r_ut, this.che_r_comms)
        this.listening("Chelsea", this.che_r_comms, count, "/hawkeye/pumpstations/chelsea-ps")
        count++;
        }
        break;

      case "NMU_NMU_EFF":
        if(this.variable.nmu_eff_ps_ut != null || this.variable.nmu_eff_ps_ut  != undefined){
        this.nmu_eff_ps_comms = this.getCommunicationStatus(this.variable.nmu_eff_ps_ut, this.nmu_eff_ps_comms)
        this.listening("NMU Effluent", this.nmu_eff_ps_comms, count, "/hawkeye/pumpstations/nmu-effluent")
        count++;
      }
        break;

      case "NMB_LH_PS":
        if(this.variable.lh_UT != null || this.variable.lh_UT  != undefined){
        this.lh_comms = this.getCommunicationStatus(this.variable.lh_UT, this.lh_comms)
        this.listening("Lovemore Heights", this.lh_comms, count,"/hawkeye/pumpstations/lovemoreheights")
        count++;
        }
        break;

      case "NMB_TC_PS":
        if(this.variable.tc_R_UT  != null || this.variable.tc_R_UT  != undefined){
        this.tc_R_comms = this.getCommunicationStatus(this.variable.tc_R_UT, this.tc_R_comms)
        this.listening("Theescombe", this.tc_R_comms, count,"/hawkeye/pumpstations/theescombe")
        count++;
      }
        break;
      }
      }


}


}
