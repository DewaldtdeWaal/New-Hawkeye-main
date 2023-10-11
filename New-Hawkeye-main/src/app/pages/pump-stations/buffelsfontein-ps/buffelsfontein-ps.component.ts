import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import {BuffelsFonteinComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service'
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-buffelsfontein-ps',
  templateUrl: './buffelsfontein-ps.component.html',
  styleUrls: ['./buffelsfontein-ps.component.css']
})
export class BuffelsfonteinPSComponent implements OnInit {
  bf_PS_UT:any
  bf_G_SP:any
  bf_G_FR:any

  bf_P1_MODE:any
  bf_P1_STATUS:any
  bf_P1_RH:any


  bf_P2_MODE:any
  bf_P2_STATUS:any
  bf_P2_RH:any


  bf_P3_MODE:any
  bf_P3_STATUS:any
  bf_P3_RH:any


  bf_P4_MODE:any
  bf_P4_STATUS:any
  bf_P4_RH:any


  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];
  ELEMENT_DATA_P4: PeriodicElement[] = [];
  ELEMENT_DATA_G: PeriodicElement[] = [];

  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceP3:any;
  dataSourceP4:any;
  dataSourceG:any;
theme:any = localStorage.getItem("theme")
  comms: string;
  data: any=[];
  intervalLoop: any


  faultVariable:any={
  bf_G_MCC_ESTOP: {
    value: null,
  alarm:"Fault",
  description:"MCC Emergency Stop",
    alarmTrip: 1
  },
  bf_P1_PUMP_TRIP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  },
  bf_P1_ESTOP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 0,
  },
  bf_P1_NO_FLOW_FAULT: {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  },
  bf_P2_PUMP_TRIP_FAULT:{
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  },
  bf_P2_ESTOP_FAULT:{
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 0
  },
  bf_P2_NO_FLOW_FAULT:{
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  },

  bf_P3_PUMP_TRIP_FAULT:{
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  },
  bf_P3_ESTOP_FAULT:{
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 0
  },
  bf_P3_NO_FLOW_FAULT:{
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  },

  bf_P4_PUMP_TRIP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  },
  bf_P4_ESTOP_FAULT:{
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 0
  },
  bf_P4_NO_FLOW_FAULT: {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  },
  }

  variable :any= {
    bf_PS_UT:null,
    bf_G_SP:null,
    bf_G_FR:null,
    bf_P1_MODE:null,
    bf_P1_STATUS:null,
    bf_P1_RH:null,
    bf_P2_MODE:null,
    bf_P2_STATUS:null,
    bf_P2_RH:null,
    bf_P3_MODE:null,
    bf_P3_STATUS:null,
    bf_P3_RH:null,
    bf_P4_MODE:null,
    bf_P4_STATUS:null,
    bf_P4_RH:null,

  }

  tagArr:any =[
    "bf_PS_UT",
"bf_G_SP",
"bf_G_FR",
"bf_P1_MODE",
"bf_P1_STATUS",
"bf_P1_RH",
"bf_P2_MODE",
"bf_P2_STATUS",
"bf_P2_RH",
"bf_P3_MODE",
"bf_P3_STATUS",
"bf_P3_RH",
"bf_P4_MODE",
"bf_P4_STATUS",
"bf_P4_RH",
  ]

  faultArr:any=[
    "bf_G_MCC_ESTOP",
    "bf_P1_PUMP_TRIP_FAULT",
    "bf_P1_ESTOP_FAULT",
    "bf_P1_NO_FLOW_FAULT",
    "bf_P2_PUMP_TRIP_FAULT",
    "bf_P2_ESTOP_FAULT",
    "bf_P2_NO_FLOW_FAULT",
    "bf_P3_PUMP_TRIP_FAULT",
    "bf_P3_ESTOP_FAULT",
    "bf_P3_NO_FLOW_FAULT",
    "bf_P4_PUMP_TRIP_FAULT",
    "bf_P4_ESTOP_FAULT",
    "bf_P4_NO_FLOW_FAULT",

  ]

  constructor(private webSocketService: WebSocketService, private us: UsersService,private chat:BuffelsFonteinComponent,public recieve:Common,private pm:pagePostMethod, ) {

    this.pm.findPageData("nmbm_bf_ps", "PS_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.comms = Common.getLastUpdate(this.variable.bf_PS_UT)

     var alarmG: any [] = [this.faultVariable.bf_G_MCC_ESTOP]
      var alarm1: any [] = [this.faultVariable.bf_P1_PUMP_TRIP_FAULT,this.faultVariable.bf_P1_ESTOP_FAULT,this.faultVariable.bf_P1_NO_FLOW_FAULT]
      var alarm2: any [] = [this.faultVariable.bf_P2_PUMP_TRIP_FAULT,this.faultVariable.bf_P2_ESTOP_FAULT,this.faultVariable.bf_P2_NO_FLOW_FAULT]
      var alarm3: any [] = [this.faultVariable.bf_P3_PUMP_TRIP_FAULT,this.faultVariable.bf_P3_ESTOP_FAULT,this.faultVariable.bf_P3_NO_FLOW_FAULT]
      var alarm4: any [] = [this.faultVariable.bf_P4_PUMP_TRIP_FAULT,this.faultVariable.bf_P4_ESTOP_FAULT,this.faultVariable.bf_P4_NO_FLOW_FAULT]

      this.dataSourceG = new MatTableDataSource(Common.getAlarmValue(alarmG))
      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
      this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))


    })
   }


  ngOnInit(){

    this.intervalLoop = setInterval(() =>{

      this.pm.findPageData("nmbm_bf_ps", "PS_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
        Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

       this.comms = Common.getLastUpdate(this.variable.bf_PS_UT)

       var alarmG: any [] = [this.faultVariable.bf_G_MCC_ESTOP]
        var alarm1: any [] = [this.faultVariable.bf_P1_PUMP_TRIP_FAULT,this.faultVariable.bf_P1_ESTOP_FAULT,this.faultVariable.bf_P1_NO_FLOW_FAULT]
        var alarm2: any [] = [this.faultVariable.bf_P2_PUMP_TRIP_FAULT,this.faultVariable.bf_P2_ESTOP_FAULT,this.faultVariable.bf_P2_NO_FLOW_FAULT]
        var alarm3: any [] = [this.faultVariable.bf_P3_PUMP_TRIP_FAULT,this.faultVariable.bf_P3_ESTOP_FAULT,this.faultVariable.bf_P3_NO_FLOW_FAULT]
        var alarm4: any [] = [this.faultVariable.bf_P4_PUMP_TRIP_FAULT,this.faultVariable.bf_P4_ESTOP_FAULT,this.faultVariable.bf_P4_NO_FLOW_FAULT]

        this.dataSourceG = new MatTableDataSource(Common.getAlarmValue(alarmG))
        this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
        this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
        this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
        this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))


      })

    },60000)
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
