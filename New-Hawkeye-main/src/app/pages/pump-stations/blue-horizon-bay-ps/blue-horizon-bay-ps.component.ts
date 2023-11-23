import {  Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';

import {Common} from 'src/app/class/common'
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';

export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-blue-horizon-bay-ps',
  templateUrl: './blue-horizon-bay-ps.component.html',
  styleUrls: ['./blue-horizon-bay-ps.component.css']
})
export class BlueHorizonBayPSComponent implements OnInit {
  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;



  bhb_PS_UT:any
  bhb_G_TELE_CONTROL:any
  bhb_G_LOW_LVL_FLOAT:any

  bhb_P1_RH:any
  bhb_P1_MODE: any




  bhb_P2_RH:any
  bhb_P2_MODE: any
  bhb_P2_STATUS: any




  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_G: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceG:any;
  theme:any = localStorage.getItem("theme");
  comms: string;
  data: any=[];
  intervalLoop: any



  bhb_P1_STATUS: any;
  faultVariable:any={
  bhb_P1_STARTUP_FAULT:  {
    value: null,
    alarm:"Fault",
    description:"Startup Fault",
    alarmTrip: 1
 },

  bhb_P1_SOFT_S_FAULT: {
    value: null,
    alarm:"Fault",
    description:"Soft Start Fault",
    alarmTrip: 1
 },
  bhb_P1_NO_FLOW:  {
    value: null,
    alarm:"Fault",
    description:"No Flow Fault",
    alarmTrip: 1
 },


  bhb_P2_SOFT_S_FAULT:  {
    value: null,
    alarm:"Fault",
    description:"Soft Start Fault",
    alarmTrip: 1
 },
  bhb_P2_STARTUP_FAULT: {
    value: null,
    alarm:"Fault",
    description:"Startup Fault",
    alarmTrip: 1
 },
  bhb_P2_NO_FLOW:  {
    value: null,
    alarm:"Fault",
    description:"No Flow Fault",
    alarmTrip: 1
 }
  }
  tagArr:any=[
    "bhb_PS_UT",
    "bhb_G_TELE_CONTROL",
    "bhb_G_LOW_LVL_FLOAT",
    "bhb_P1_RH",
    "bhb_P1_MODE",
    "bhb_P1_STATUS",
    "bhb_P2_RH",
    "bhb_P2_MODE",
    "bhb_P2_STATUS",
]
variable :any= {
  bhb_PS_UT:null,
bhb_G_TELE_CONTROL:null,
bhb_G_LOW_LVL_FLOAT:null,
bhb_P1_RH:null,
bhb_P1_MODE:null,
bhb_P1_STATUS:null,
bhb_P2_RH:null,
bhb_P2_MODE:null,
bhb_P2_STATUS:null,
}
faultArr:any=[
  "bhb_P1_SOFT_S_FAULT",
"bhb_P1_STARTUP_FAULT",
"bhb_P1_NO_FLOW",
"bhb_P2_SOFT_S_FAULT",
"bhb_P2_STARTUP_FAULT",
"bhb_P2_NO_FLOW",
]
  constructor( private pm:pagePostMethod,private authService: AuthService,public recieve:Common  ) {










  }




  ngOnInit(){
    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_BHB_R":
          this.showNavigationButton = "true";
          break;
      }
    }



    this.intervalLoop = this.pm.findPageData("nmbm_bh_ps", "PS_CurrentVals").subscribe((result) => {
      this.data =  result;

       
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.comms = Common.getLastUpdate(this.variable.bhb_PS_UT)
     var alarm1: any [] = [this.faultVariable.bhb_P1_SOFT_S_FAULT,this.faultVariable.bhb_P1_STARTUP_FAULT,this.faultVariable.bhb_P1_NO_FLOW]
     var alarm2: any [] = [this.faultVariable.bhb_P2_SOFT_S_FAULT,this.faultVariable.bhb_P2_STARTUP_FAULT,this.faultVariable.bhb_P2_NO_FLOW]




     this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
     this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))


    })






  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
