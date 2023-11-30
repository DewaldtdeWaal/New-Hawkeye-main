import {MatTableDataSource} from '@angular/material/table';
import {  Component, OnInit, ViewChild } from '@angular/core';

import { Injectable } from "@angular/core";

import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import {svgImage} from "src/app/Service-Files/SVGImage/svgImage.service"
//HumansDorp1Servicea
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Injectable({ providedIn: "root" })
@Component({
  selector: 'app-humansdorp',
  templateUrl: './humansdorp.component.html',
  styleUrls: ['./humansdorp.component.css']
})
export class HumansdorpComponent implements OnInit {

  
  options: EChartsOption;
  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttable: PeriodicElement[] = [];
  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);
  intervalLoop: any
  theme:any  = localStorage.getItem("theme");


data:any = []

   tagArr:any=[
   "hup1_ut",// 1
   "hup1_mode",//9
   "hup1_pump_mode",//10
   "hup1_borehole_lvl",//15
   "hup1_flow_rate",//16
   "hup1_total_flow",//17
   "hup1_run_hours",//18
   "hup1_pump_timer",
   "klm_hup1_num_o_stops"

  ]
  faultArr:any=[
    "hup1_voltage", //0
"hup1_borehole_level_pr_fault", //1
"hup1_battery", //2
"hup1_charge", //3
"hup1_trip_fault", //4
"hup1_no_flow_fault", //5
"hup1_24_timer", //6
"hup1_stop_level", //7
"hup1_fault", //8
"hup1_estop_active", //9
"hup1_pump_suf", //10
"hup1_pump_general_fault" //11
  ]


  Ground:any = "Ground";
  Pump:any = "Pump";

  //how do i add arrays in this object
  variable:any ={
    hup1_ut:null,
    hup1_pump_mode:null,
    hup1_run_hours:null,
    hup1_pump_timer:null,
    hup1_mode: null,
    hup1_total_flow: null,
    hup1_flow_rate: null,
    hup1_borehole_lvl: null,
    comms:null,
    klm_hup1_num_o_stops:null
  }

  show2:any
show3:any
show4:any
show6:any


  num: any;
  total_flow_HD1_array: any;
  DateArr: any;
  faultVariable:any={


  hup1_voltage:{
    value: null,
  alarm:"Fault",
  description:"Voltage Fault",
    alarmTrip: 0
  },

  hup1_borehole_level_pr_fault:   {
    value: null,
  alarm:"Fault",
  description:"Borehole Level Signal Fault",
    alarmTrip: 1
  },
  hup1_battery:   {
    value: null,
  alarm:"Fault",
  description:"Battery Fault",
    alarmTrip: 0
  },
  hup1_charge:   {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 0
  },
  hup1_trip_fault:   {
    value: null,
  alarm:"Fault",
  description:"Pump Trip Fault",
    alarmTrip: 1
  },
  hup1_no_flow_fault:   {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  hup1_24_timer:   {
    value: null,
  alarm:"Fault",
  description:"Stop Request",
    alarmTrip: 0
  },
  hup1_stop_level:   {
    value: null,
  alarm:"Warning",
  description:"Stop Level Reached",
    alarmTrip: 1
  },
  hup1_fault:   {
    value: null,
  alarm:"Fault",
  description:"Fault Active",
    alarmTrip: 1
  },
  hup1_estop_active:   {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  hup1_pump_suf:   {
    value: null,
  alarm:"Fault",
  description:"Start Up Fault",
    alarmTrip: 1
  },
  hup1_pump_general_fault:{
    value:null,
    alarm:"Fault",
    description:"General Fault",
    alarmTrip: 1
  },
}

  pumpTitle:any = "Pump"

  variablesMatric:any=[{}]
  constructor( public rs: ReportService,public recieve:Common,private authService: AuthService,private pm:pagePostMethod,private pt: PostTrend ) {
    this.isLoading = true;
  }

  pumpColor:any
  isLoading: boolean;
  userSites:string[];
  public authListenerSubs!: Subscription;
  collectionName:any ="KLM_HUP_GW_TREND"
  range:any;
  options1: EChartsOption;
  tfCollection:any = "KLM_HUP_TF_TREND";
  totalFlowTags :any = ["total_flow_HD1"]
  flowTags :any = ["flowRate_HD1"]
  siteTitle:unknown = "HD1"
  recieveDate($event: any){
    var trend :any;
    this.range = $event;
    this.isLoading = true;
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collectionName,this.totalFlowTags,this.flowTags,start,end).then((data) => {

      trend = data;

       
      this.options1 = Common.getOptionsBarAndLine(this.options1,"Flow Rate l/s",trend.FlowRateArr[0],"Total Flow m³",trend.TotalFlowArr[0]);
      this.isLoading = false;
    })

  }

   siteShowMapping:any = {
    "KLM_HUP2_GW": 'show2',
    "KLM_HUP3_GW": 'show3',
    "KLM_HUP4_GW": 'show4',
    "KLM_HUP6_GW": 'show6'
  };
  showProperty:any
  ngOnInit() {
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
  

  
    for (let i = 0; i < this.userSites.length; i++) {
       this.showProperty = this.siteShowMapping[this.userSites[i]];
      if (this.showProperty) {
        this.showProperty = true;
      }
    }
  
  
    

    this.intervalLoop = this.pm.findPageData("klm_hup_gw", "GRDW_CurrentVals").subscribe((result) => {
      this.data =  result;
      
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.hup1_ut)

     var alarmG:any []=[this.faultVariable.hup1_voltage,this.faultVariable.hup1_pump_general_fault,this.faultVariable.hup1_borehole_level_pr_fault,this.faultVariable.hup1_battery,this.faultVariable.hup1_charge,this.faultVariable.hup1_trip_fault,this.faultVariable.hup1_no_flow_fault,this.faultVariable.hup1_24_timer,this.faultVariable.hup1_stop_level,this.faultVariable.hup1_fault,this.faultVariable.hup1_estop_active,this.faultVariable.hup1_pump_suf]

     this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))

     this.pumpColor =svgImage.getSVGColor(this.variable.hup1_pump_mode)

     this.variablesMatric=[{
      rowType:"TextRow",
      label:"Mode",
      value:this.variable.hup1_mode
     },{
      rowType:"TextRow",
      label:"Status",
      value:this.variable.hup1_pump_mode
     },{
      rowType:"Level",
      label:"Level",
      value:this.variable.hup1_borehole_lvl + " m"
     },
     {
      rowType:"Flow Rate",
      label:"Flow Rate",
      value:this.variable.hup1_flow_rate + " l/s"
     },
     {
      rowType:"TextRow",
      label:"Total Flow",
      value:this.variable.hup1_total_flow + " m³"
     },
     {
      rowType:"TextRow",
      label:"Timer Status",
      value:this.variable.hup1_pump_timer
     },
     {
      rowType:"TextRow",
      label:"Run Hours",
      value:this.variable.hup1_run_hours + " h"
     },
     {
      rowType:"TextRow",
      label:"Number of Stops",
      value:this.variable.klm_hup1_num_o_stops
     },
]

    });
}



ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
}
