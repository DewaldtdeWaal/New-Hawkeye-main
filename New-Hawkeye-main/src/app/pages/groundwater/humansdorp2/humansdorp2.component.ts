import {MatTableDataSource} from '@angular/material/table';
import {  Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Injectable } from "@angular/core";
import { HumansDorp2Service } from 'src/app/Service-Files/GRDW/humansdorp2.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import {Common} from 'src/app/class/common';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-humansdorp2',
  templateUrl: './humansdorp2.component.html',
  styleUrls: ['./humansdorp2.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class Humansdorp2Component implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  options: EChartsOption;
  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttable: PeriodicElement[] = [];
  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);
  intervalLoop: any
  theme:any = localStorage.getItem("theme");


data:any = []

show1:any
show3:any
show4:any
show6:any

   tagArr:any=[
   "hup2_ut",// 1
   "hup2_mode",//9
   "hup2_pump_mode",//10
   "hup2_borehole_lvl",//15
   "hup2_flow_rate",//16
   "hup2_total_flow",//17
   "hup2_run_hours",//18
   "hup2_pump_timer"
  ]
  faultArr:any=[
    "hup2_voltage", //0
"hup2_borehole_level_pr_fault", //1
"hup2_battery", //2
"hup2_charge", //3
"hup2_trip_fault", //4
"hup2_no_flow_fault", //5
"hup2_24_timer", //6
"hup2_stop_level", //7
"hup2_fault", //8
"hup2_estop_active", //9
"hup2_pump_suf", //10
"hup2_pump_general_fault"
  ]

  variable:any = {
    hup2_ut:null,
    hup2_pump_mode:null,
    hup2_run_hours:null,
    hup2_pump_timer:null,
    hup2_mode: null,
    hup2_total_flow: null,
    hup2_flow_rate: null,
    hup2_borehole_lvl: null,
    comms:null,
  }

  num: any;
  total_flow_HD2_array: any;
  DateArr: any;
  faultVariable:any={


  hup2_voltage:{
    value: null,
  alarm:"Fault",
  description:"Voltage Fault",
    alarmTrip: 0
  },

  hup2_borehole_level_pr_fault:   {
    value: null,
  alarm:"Fault",
  description:"Borehole Level Signal Fault",
    alarmTrip: 1
  },
  hup2_battery:   {
    value: null,
  alarm:"Fault",
  description:"Battery Fault",
    alarmTrip: 0
  },
  hup2_charge:   {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 0
  },
  hup2_trip_fault:   {
    value: null,
  alarm:"Fault",
  description:"Pump Trip Fault",
    alarmTrip: 1
  },
  hup2_no_flow_fault:   {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  hup2_24_timer:   {
    value: null,
  alarm:"Fault",
  description:"Stop Request",
    alarmTrip: 0
  },
  hup2_stop_level:   {
    value: null,
  alarm:"Warning",
  description:"Stop Level Reached",
    alarmTrip: 1
  },
  hup2_fault:   {
    value: null,
  alarm:"Fault",
  description:"Fault Active",
    alarmTrip: 1
  },
  hup2_estop_active:   {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  hup2_pump_suf:   {
    value: null,
  alarm:"Fault",
  description:"Start Up Fault",
    alarmTrip: 1
  },
  hup2_pump_general_fault:{
    value:null,
    alarm:"Fault",
    description:"General Fault",
    alarmTrip: 1
  },

}

  constructor(public rs: ReportService,public recieve:Common,private authService: AuthService,private pm:pagePostMethod ,private pt: PostTrend ) {


    this.pm.findPageData("klm_hup2_gw", "GRDW_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.hup2_ut)

     var alarmG:any []=[this.faultVariable.hup2_voltage,this.faultVariable.hup2_pump_general_fault,this.faultVariable.hup2_borehole_level_pr_fault,this.faultVariable.hup2_battery,this.faultVariable.hup2_charge,this.faultVariable.hup2_trip_fault,this.faultVariable.hup2_no_flow_fault,this.faultVariable.hup2_24_timer,this.faultVariable.hup2_stop_level,this.faultVariable.hup2_fault,this.faultVariable.hup2_estop_active,this.faultVariable.hup2_pump_suf]

     this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))
    });





  }

  userSites:string[];
  public authListenerSubs!: Subscription;

  trendTag:any = ["total_flow_HD2C"]
  collectionName:any ="KLM_HUP2_TF_TREND"
  ngOnInit() {
    this.isLoading = true;
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "KLM_HUP_GW":
          this.show1 = true;
          break;

        case "KLM_HUP3_GW":
          this.show3 = true;
          break;


		    case "KLM_HUP4_GW":
          this.show4 = true;
          break;


		    case "KLM_HUP6_GW":
          this.show6 = true;
          break;

      }
    }

  var tagVals:any =[]
  var errorVals:any=[]
  tagVals = this.recieve.recieveNonMVals(this.tagArr);

  var updateTemp:any;

  errorVals = this.recieve.recieveNonMVals(this.faultArr)
  this.intervalLoop = setInterval(() =>{


    this.pm.findPageData("klm_hup2_gw", "GRDW_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.hup2_ut)

     var alarmG:any []=[this.faultVariable.hup2_voltage,this.faultVariable.hup2_pump_general_fault,this.faultVariable.hup2_borehole_level_pr_fault,this.faultVariable.hup2_battery,this.faultVariable.hup2_charge,this.faultVariable.hup2_trip_fault,this.faultVariable.hup2_no_flow_fault,this.faultVariable.hup2_24_timer,this.faultVariable.hup2_stop_level,this.faultVariable.hup2_fault,this.faultVariable.hup2_estop_active,this.faultVariable.hup2_pump_suf]

     this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))
    });




},60000)





var trend: any = {};
this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
  trend=data
this.total_flow_HD2_array = trend.TotalFlowArr[0];



  this.DateArr = trend.DateArr;


    this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","HD2C Total Flow",this.total_flow_HD2_array)
    this.isLoading = false;
}
)

}
isLoading: boolean = false;

onDateFilter(){
  this.isLoading = true;
  const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
  const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

var trend :any;

this.pt.getPostTrend(this.collectionName, this.trendTag,newStart,newEnd).then((data) => {
  trend=data
this.total_flow_HD2_array = trend.TotalFlowArr[0];
this.DateArr = trend.DateArr;


this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","HD2C Total Flow",this.total_flow_HD2_array);
this.isLoading = false;
})


}


ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}


}
