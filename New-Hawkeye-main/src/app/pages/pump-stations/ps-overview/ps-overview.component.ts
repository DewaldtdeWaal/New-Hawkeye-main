import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {resOverviewRouteComponent} from 'src/app/Service-Files/Pumpstation/pumpoverview.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
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

  constructor(private route:resOverviewRouteComponent,private authService: AuthService, private ws:WebSocketService ,private router: Router ,public recieve:Common,private pm:pagePostMethod ) {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngOnInit() {
    this.intervalLoop = this.pm.findPageData("PS_OVERVIEW", "PUMP_CurrentVals").subscribe((result) => {

      this.variable = result
      this.renderPage(this.variable)
    });
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
intervalLoop:any
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}

async renderPage(variable:any){
    var count=0;
    for (var i = 0; i < this.userSites.length; i++){
      switch (this.userSites[i]) {
        case "NMU_NMU_EFF":
          if(this.variable.nmu_eff_ps_ut != null || this.variable.nmu_eff_ps_ut  != undefined){
          this.nmu_eff_ps_comms = this.getCommunicationStatus(this.variable.nmu_eff_ps_ut, this.nmu_eff_ps_comms)
          this.listening("NMU Effluent", this.nmu_eff_ps_comms, count, "/hawkeye/pumpstations/nmu-effluent")
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
              case "TSI_STORMS_PS":
            if(this.variable.ps_storm_UT  != null || this.variable.ps_storm_UT  != undefined){
            this.ps_storm_comms = this.getCommunicationStatus(this.variable.ps_storm_UT, this.ps_storm_comms)
            this.listening("Storms River", this.ps_storm_comms, count, "/hawkeye/pumpstations/stormsriver")
            count++;
          }
            break;
      }
      }
}
}
