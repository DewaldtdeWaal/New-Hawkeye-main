import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import {heatherBankComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-heatherbank-ps',
  templateUrl: './heatherbank-ps.component.html',
  styleUrls: ['./heatherbank-ps.component.css']
})
export class HeatherbankPSComponent implements OnInit {


  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;

  hb_PS_UT:any
  intervalLoop: any
  hb_P1_RH:any
  hb_P1_MODE: any
  hb_P1_STATUS: any
  hb_P1_CURRENT: any

  hb_P2_RH:any
  hb_P2_MODE: any
  hb_P2_STATUS: any
  hb_P2_CURRENT: any


  hb_P3_RH:any
  hb_P3_MODE: any
  hb_P3_STATUS: any
  hb_P3_CURRENT: any


  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceP3:any;
theme:any = localStorage.getItem("theme");
  comms: string;
  data: any=[];

  tagArr:any=[

    "hb_R_UT",
    "hb_P1_RH",
    "hb_P1_MODE",
    "hb_P1_STATUS",
    "hb_P1_CURRENT",
    "hb_P2_RH",
    "hb_P2_MODE",
    "hb_P2_STATUS",
    "hb_P2_CURRENT",
    "hb_P3_RH",
    "hb_P3_MODE",
    "hb_P3_STATUS",
    "hb_P3_CURRENT",
    "hb_P1_NO_FLOW_FAULT",

  ]

  faultArr:any=[
    "hb_P1_PUMP_CB_TRIP_FAULT",
    "hb_P1_STARTUP_FAULT",
    "hb_P1_ESTOP_FAULT",
    "hb_P2_PUMP_CB_TRIP_FAULT",
    "hb_P2_STARTUP_FAULT",
    "hb_P2_ESTOP_FAULT",
    "hb_P2_NO_FLOW_FAULT",
    "hb_P3_PUMP_CB_TRIP_FAULT",
    "hb_P3_STARTUP_FAULT",
    "hb_P3_ESTOP_FAULT",
    "hb_P3_NO_FLOW_FAULT",
  ]

  variable:any ={
    hb_R_UT:null,
    hb_P1_RH:null,
    hb_P1_MODE:null,
    hb_P1_STATUS:null,
    hb_P1_CURRENT:null,
    hb_P2_RH:null,
    hb_P2_MODE:null,
    hb_P2_STATUS:null,
    hb_P2_CURRENT:null,
    hb_P3_RH:null,
    hb_P3_MODE:null,
    hb_P3_STATUS:null,
    hb_P3_CURRENT:null,
    hb_P1_NO_FLOW_FAULT:null,
  }

  faultVariable:any={
  hb_P1_PUMP_CB_TRIP_FAULT:  {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  hb_P1_STARTUP_FAULT:  {
    value: null,
  alarm:"Fault",
  description:"Soft Stop",
    alarmTrip: 1
  },
  hb_P1_ESTOP_FAULT:  {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  hb_P1_NO_FLOW_FAULT: {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  },
  hb_P2_PUMP_CB_TRIP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  hb_P2_STARTUP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Soft Stop",
    alarmTrip: 1
  },
  hb_P2_ESTOP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  hb_P2_NO_FLOW_FAULT: {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  },
  hb_P3_PUMP_CB_TRIP_FAULT:  {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  hb_P3_STARTUP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Soft Stop",
    alarmTrip: 1
  },
  hb_P3_ESTOP_FAULT:  {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  hb_P3_NO_FLOW_FAULT:  {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  }
}

  constructor(private authService: AuthService,public recieve:Common ,private pm:pagePostMethod ) {






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
        case "NMB_HB_R":
          this.showNavigationButton = "true";
          break;
      }
    }

    this.intervalLoop = this.pm.findPageData("heaterbank_pump", "PS_CurrentVals").subscribe((result) => {
      this.data =  result;
       
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.comms = Common.getLastUpdate(this.variable.hb_R_UT)
      var alarm1: any [] = [this.faultVariable.hb_P1_NO_FLOW_FAULT,this.faultVariable.hb_P1_PUMP_CB_TRIP_FAULT,this.faultVariable.hb_P1_STARTUP_FAULT,this.faultVariable.hb_P1_ESTOP_FAULT ]
      var alarm2: any [] = [this.faultVariable.hb_P2_NO_FLOW_FAULT,this.faultVariable.hb_P2_PUMP_CB_TRIP_FAULT,this.faultVariable.hb_P2_STARTUP_FAULT,this.faultVariable.hb_P2_ESTOP_FAULT ]
      var alarm3: any [] = [this.faultVariable.hb_P3_NO_FLOW_FAULT,this.faultVariable.hb_P3_PUMP_CB_TRIP_FAULT,this.faultVariable.hb_P3_STARTUP_FAULT,this.faultVariable.hb_P3_ESTOP_FAULT ]


      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))

    });


  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
