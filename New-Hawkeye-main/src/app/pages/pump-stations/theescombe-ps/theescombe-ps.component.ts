import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import {TheescombeService} from 'src/app/Service-Files/Reservoir/reservoir.service'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-theescombe-ps',
  templateUrl: './theescombe-ps.component.html',
  styleUrls: ['./theescombe-ps.component.css']
})
export class TheescombePSComponent implements OnInit {

  tc_R_UT:any
  tc_G_SP:any

  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;
  intervalLoop: any

tc_P1_POWER:any
tc_P1_MODE:any
tc_P1_STATUS:any
tc_P1_RH:any
tc_P1_PRESS_DIFF:any


tc_P2_POWER:any
tc_P2_MODE:any
tc_P2_STATUS:any
tc_P2_RH:any
tc_P2_PRESS_DIFF:any


tc_P3_POWER:any
tc_P3_MODE:any
tc_P3_STATUS:any
tc_P3_RH:any
tc_P3_PRESS_DIFF:any
variable :any= {
  tc_R_UT:null,
  tc_G_SP:null,
  tc_P1_POWER:null,
  tc_P1_MODE:null,
  tc_P1_STATUS:null,
  tc_P1_RH:null,
  tc_P1_PRESS_DIFF:null,
  tc_P2_POWER:null,
  tc_P2_MODE:null,
  tc_P2_STATUS:null,
  tc_P2_RH:null,
  tc_P2_PRESS_DIFF:null,
  tc_P3_POWER:null,
  tc_P3_MODE:null,
  tc_P3_STATUS:null,
  tc_P3_RH:null,
  tc_P3_PRESS_DIFF:null,
}

tagArr:any=[
"tc_R_UT",
"tc_G_SP",
"tc_P1_POWER",
"tc_P1_MODE",
"tc_P1_STATUS",
"tc_P1_RH",
"tc_P1_PRESS_DIFF",
"tc_P2_POWER",
"tc_P2_MODE",
"tc_P2_STATUS",
"tc_P2_RH",
"tc_P2_PRESS_DIFF",
"tc_P3_POWER",
"tc_P3_MODE",
"tc_P3_STATUS",
"tc_P3_RH",
"tc_P3_PRESS_DIFF",
]

faultArr:any=[
"tc_P1_PUMP_TRIP_FAULT",
"tc_P1_ESTOP_FAULT",
"tc_P1_NO_FLOW_FAULT",
"tc_P1_EARTH_FAULT",
"tc_P2_PUMP_TRIP_FAULT",
"tc_P2_ESTOP_FAULT",
"tc_P2_NO_FLOW_FAULT",
"tc_P2_EARTH_FAULT",
"tc_P3_PUMP_TRIP_FAULT",
"tc_P3_ESTOP_FAULT",
"tc_P3_NO_FLOW_FAULT",
"tc_P3_EARTH_FAULT",
]


  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];
  ELEMENT_DATA_G: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceP3:any;

  theme:any  = localStorage.getItem("theme");
  comms: string;
  data: any=[];

  faultVariable:any={
  tc_P1_PUMP_TRIP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  },
tc_P1_ESTOP_FAULT: {
  value: null,
alarm:"Fault",
description:"Emergency Stop",
  alarmTrip: 1
},
tc_P1_NO_FLOW_FAULT: {
  value: null,
alarm:"Fault",
description:"No Flow",
  alarmTrip: 1
},
tc_P1_EARTH_FAULT: {
  value: null,
alarm:"Fault",
description:"Earth Fault",
  alarmTrip: 1
},

tc_P2_PUMP_TRIP_FAULT: {
  value: null,
alarm:"Fault",
description:"Pump Trip",
  alarmTrip: 1
},
tc_P2_ESTOP_FAULT: {
value: null,
alarm:"Fault",
description:"Emergency Stop",
alarmTrip: 1
},
tc_P2_NO_FLOW_FAULT: {
value: null,
alarm:"Fault",
description:"No Flow",
alarmTrip: 1
},
tc_P2_EARTH_FAULT: {
value: null,
alarm:"Fault",
description:"Earth Fault",
alarmTrip: 1
},

tc_P3_PUMP_TRIP_FAULT:{
  value: null,
alarm:"Fault",
description:"Pump Trip",
  alarmTrip: 1
},
tc_P3_ESTOP_FAULT:{
value: null,
alarm:"Fault",
description:"Emergency Stop",
alarmTrip: 1
},
tc_P3_NO_FLOW_FAULT:{
value: null,
alarm:"Fault",
description:"No Flow",
alarmTrip: 1
},
tc_P3_EARTH_FAULT:{
value: null,
alarm:"Fault",
description:"Earth Fault",
alarmTrip: 1
}}
  constructor( private chat: TheescombeService ,private authService: AuthService,public recieve:Common , private pm:pagePostMethod) {





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
        case "NMB_TC_R":
          this.showNavigationButton = "true";
          break;
      }
    }



    this.intervalLoop = this.pm.findPageData("nmbm_tc_ps_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.comms = Common.getLastUpdate(this.variable.tc_R_UT)

     var alarm1: any [] =[this.faultVariable.tc_P1_PUMP_TRIP_FAULT,this.faultVariable.tc_P1_ESTOP_FAULT,this.faultVariable.tc_P1_NO_FLOW_FAULT,this.faultVariable.tc_P1_EARTH_FAULT]
     var alarm2: any [] =[this.faultVariable.tc_P2_PUMP_TRIP_FAULT,this.faultVariable.tc_P2_ESTOP_FAULT,this.faultVariable.tc_P2_NO_FLOW_FAULT,this.faultVariable.tc_P2_EARTH_FAULT]
     var alarm3: any [] =[this.faultVariable.tc_P3_PUMP_TRIP_FAULT,this.faultVariable.tc_P3_ESTOP_FAULT,this.faultVariable.tc_P3_NO_FLOW_FAULT,this.faultVariable.tc_P3_EARTH_FAULT]

     this.dataSourceP1= new MatTableDataSource(Common.getAlarmValue(alarm1))

     this.dataSourceP2= new MatTableDataSource(Common.getAlarmValue(alarm2))

     this.dataSourceP3= new MatTableDataSource(Common.getAlarmValue(alarm3))


    })



  }


  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
}
