import {  Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ListeningService } from 'src/app/listening.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import {vanStadensComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service'
import { Subscription } from 'rxjs';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement {
  alarm: string;
  description: string;
}




@Component({
  selector: 'app-van-stadens-ps',
  templateUrl: './van-stadens-ps.component.html',
  styleUrls: ['./van-stadens-ps.component.css']
})
export class VanStadensPSComponent implements OnInit {
faults = true ;
intervalLoop: any

  vs_PS_UT:any

  vs_P1_STATUS:any
  vs_P1_MODE:any
  vs_RH_P1 :any
  vs_P1_SUC_PRESS :any
  vs_P1_DEL_PRESS :any
  vs_P2_STATUS:any
  vs_P2_MODE:any
  vs_P2_SUC_PRESS :any
  vs_P2_DEL_PRESS :any
  vs_P2_RH :any




  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;


   tagArr:any=[
    "vs_PS_UT",
    "vs_P1_STATUS",
    "vs_P1_MODE",
    "vs_RH_P1",
    "vs_P1_SUC_PRESS",
    "vs_P1_DEL_PRESS",
    "vs_P2_STATUS",
    "vs_P2_MODE",
    "vs_P2_RH",
    "vs_P2_SUC_PRESS",
    "vs_P2_DEL_PRESS",
    "vs_G_WATER_D",

  ]
  faultArr:any=[
    "vs_P1_LSP",
"vs_P1_HDP",
"vs_P1_STARTER_FAULT",
"vs_P1_STARTUP_FAULT",
"vs_P1_LDP",
"vs_P2_LSP",
"vs_P2_HDP",
"vs_P2_STARTER_FAULT",
"vs_P2_STARTUP_FAULT",
"vs_P2_LDP",
"vs_G_COMMS",
"vs_G_PUMPS_F",
  ]

  variable :any= {
    vs_PS_UT:null,
    vs_P1_STATUS:null,
    vs_P1_MODE:null,
    vs_RH_P1:null,
    vs_P1_SUC_PRESS:null,
    vs_P1_DEL_PRESS:null,
    vs_P2_STATUS:null,
    vs_P2_MODE:null,
    vs_P2_RH:null,
    vs_P2_SUC_PRESS:null,
    vs_P2_DEL_PRESS:null,
    vs_G_WATER_D:null,




  }



  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_G: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any  = new MatTableDataSource(this.ELEMENT_DATA_P1);
  dataSourceP2:any = new MatTableDataSource(this.ELEMENT_DATA_P2);
  dataSourceG:any  = new MatTableDataSource(this.ELEMENT_DATA_G);


 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatSort) sort2: MatSort;

theme:any  = localStorage.getItem("theme");
  comms: string;
  data: any=[];

  faultVariable:any={

  vs_P1_LSP : {
    value: null,
  alarm:"Fault",
  description:"Low Suction Pressure",
    alarmTrip: 1
  },
  vs_P1_HDP : {
    value: null,
  alarm:"Fault",
  description:"High Delivery Pressure",
    alarmTrip: 1
  },
  vs_P1_STARTER_FAULT : {
    value: null,
  alarm:"Fault",
  description:"Soft Starter",
    alarmTrip: 1
  },
  vs_P1_STARTUP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Startup",
    alarmTrip: 1
  },

  vs_P1_LDP :{
    value:null,
    alarm:"Fault",
    description:"Low Delivery Pressure",
    alarmTrip: 1
  },

  vs_P2_LSP : {
    value: null,
  alarm:"Fault",
  description:"Low Suction Pressure",
    alarmTrip: 1
  },
  vs_P2_HDP : {
    value: null,
  alarm:"Fault",
  description:"High Delivery Pressure",
    alarmTrip: 1
  },
  vs_P2_STARTER_FAULT : {
    value: null,
  alarm:"Fault",
  description:"Soft Starter",
    alarmTrip: 1
  },
  vs_P2_STARTUP_FAULT : {
    value: null,
  alarm:"Fault",
  description:"Startup",
    alarmTrip: 1
  },
  vs_P2_LDP :{
  value:null,
  alarm:"Fault",
  description:"Low Delivery Pressure",
  alarmTrip: 1
},

  vs_G_COMMS: {
    value: null,
  alarm:"Fault",
  description:"Comms Failure",
    alarmTrip: 1
  },
  vs_G_PUMPS_F: {
    value: null,
  alarm:"Fault",
  description:"Pump Flood",
    alarmTrip: 1
  }}
  constructor(private authService:AuthService,public ls: ListeningService, public us:UsersService,public recieve:Common, private pm:pagePostMethod ) {






  }

  ngOnInit() {


    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_VS_R":
          this.showNavigationButton = "true";
          break;
      }
    }

    this.intervalLoop = this.pm.findPageData("nmbm_vs_ps", "PS_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.comms = Common.getLastUpdate(this.variable.vs_PS_UT)

     var alarm1: any [] = [this.faultVariable.vs_P1_LSP,this.faultVariable.vs_P1_HDP,this.faultVariable.vs_P1_STARTER_FAULT,this.faultVariable.vs_P1_STARTUP_FAULT, this.faultVariable.vs_P1_LDP]
     var alarm2: any [] = [this.faultVariable.vs_P2_LSP,this.faultVariable.vs_P2_HDP,this.faultVariable.vs_P2_STARTER_FAULT,this.faultVariable.vs_P2_STARTUP_FAULT, this.faultVariable.vs_P2_LDP]
     var alarmG: any [] = [this.faultVariable.vs_G_PUMPS_F,this.faultVariable.vs_G_COMMS]
     this.dataSourceG= new MatTableDataSource(Common.getAlarmValue(alarmG))
     this.dataSourceP1= new MatTableDataSource(Common.getAlarmValue(alarm1))
     this.dataSourceP2= new MatTableDataSource(Common.getAlarmValue(alarm2))


    })
  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
}
