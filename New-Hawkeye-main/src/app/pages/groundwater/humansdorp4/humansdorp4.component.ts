import {MatTableDataSource} from '@angular/material/table';
import {  Component, OnInit, ViewChild } from '@angular/core';

import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import {Common} from 'src/app/class/common';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-humansdorp4',
  templateUrl: './humansdorp4.component.html',
  styleUrls: ['./humansdorp4.component.css']
})
export class Humansdorp4Component implements OnInit {

  options: EChartsOption;
  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttable: PeriodicElement[] = [];
  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);
  intervalLoop: any
  theme:any = localStorage.getItem("theme");
  pumpmode: any ;
  pressure: any
flowrate :any
vsdfrequency: any

data:any = []

   tagArr:any=[
   "hup4_ut",// 1
   "hup4_mode",//9
   "hup4_pump_mode",//10
   "hup4_borehole_lvl",//15
   "hup4_flow_rate",//16
   "hup4_total_flow",//17
   "hup4_run_hours",//18
   "hup4_pump_timer",
   "klm_hup4_num_o_stops"
  ]
  faultArr:any=[
    "hup4_voltage", //0
"hup4_borehole_level_pr_fault", //1
"hup4_battery", //2
"hup4_charge", //3
"hup4_trip_fault", //4
"hup4_no_flow_fault", //5
"hup4_24_timer", //6
"hup4_stop_level", //7
"hup4_fault", //8
"hup4_estop_active", //9
"hup4_pump_suf", //10
"hup4_pump_general_fault" //11
  ]

  variable:any = {
    hup4_ut:null,
    hup4_pump_mode:null,
    hup4_run_hours:null,
    hup4_pump_timer:null,
    hup4_mode: null,
    hup4_total_flow: null,
    hup4_flow_rate: null,
    hup4_borehole_lvl: null,
    klm_hup4_num_o_stops:null,
    comms:null,
  }

  num: any;
  total_flow_HD4_array: any;
  DateArr: any;

  show2:any
  show3:any
  show1:any
  show6:any
  faultVariable:any={


  hup4_voltage:{
    value: null,
  alarm:"Fault",
  description:"Voltage Fault",
    alarmTrip: 0
  },

  hup4_borehole_level_pr_fault:   {
    value: null,
  alarm:"Fault",
  description:"Borehole Level Signal Fault",
    alarmTrip: 1
  },
  hup4_battery:   {
    value: null,
  alarm:"Fault",
  description:"Battery Fault",
    alarmTrip: 0
  },
  hup4_charge:   {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 0
  },
  hup4_trip_fault:   {
    value: null,
  alarm:"Fault",
  description:"Pump Trip Fault",
    alarmTrip: 1
  },
  hup4_no_flow_fault:   {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  hup4_24_timer:   {
    value: null,
  alarm:"Fault",
  description:"Stop Request",
    alarmTrip: 0
  },
  hup4_stop_level:   {
    value: null,
  alarm:"Warning",
  description:"Stop Level Reached",
    alarmTrip: 1
  },
  hup4_fault:   {
    value: null,
  alarm:"Fault",
  description:"Fault Active",
    alarmTrip: 1
  },
  hup4_estop_active:   {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  hup4_pump_suf:   {
    value: null,
  alarm:"Fault",
  description:"Start Up Fault",
    alarmTrip: 1
  },
  hup4_pump_general_fault:{
    value:null,
    alarm:"Fault",
    description:"General Fault",
    alarmTrip: 1
  },
}


  constructor(public rs: ReportService,public recieve:Common,private authService: AuthService,private pm:pagePostMethod,private pt: PostTrend ) {

  }
  userSites:string[];
  public authListenerSubs!: Subscription;

  isLoading: boolean = false;

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

      case "KLM_HUP2_GW":
        this.show2 = true;
        break;


        case "KLM_HUP3_GW":
          this.show3 = true;
          break;


		    case "KLM_HUP6_GW":
          this.show6 = true;
          break;

      }
    }

    this.intervalLoop = this.pm.findPageData("klm_hup4_gw", "GRDW_CurrentVals").subscribe((result) => {
      this.data =  result;

       
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.hup4_ut)

     var alarmG:any []=[this.faultVariable.hup4_voltage,this.faultVariable.hup4_pump_general_fault,this.faultVariable.hup4_borehole_level_pr_fault,this.faultVariable.hup4_battery,this.faultVariable.hup4_charge,this.faultVariable.hup4_trip_fault,this.faultVariable.hup4_no_flow_fault,this.faultVariable.hup4_24_timer,this.faultVariable.hup4_stop_level,this.faultVariable.hup4_fault,this.faultVariable.hup4_estop_active,this.faultVariable.hup4_pump_suf]

     this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))
    });




  }
  collectionName:any ="KLM_HUP4_GW_TREND";
  range:any;
  options1: EChartsOption;
  tfCollection:any = "KLM_HUP4_TF_TREND";
  totalFlowTags :any = ["total_flow_HD4"]
  flowTags :any = ["flowRate_HD4"]
  siteTitle:unknown = "HD4"
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



  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
}
