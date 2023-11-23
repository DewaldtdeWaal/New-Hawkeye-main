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
  selector: 'app-humansdorp3',
  templateUrl: './humansdorp3.component.html',
  styleUrls: ['./humansdorp3.component.css']
})
export class Humansdorp3Component implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  options: EChartsOption;
  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttable: PeriodicElement[] = [];
  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);
  intervalLoop: any
  theme:any =localStorage.getItem("theme");
  pumpmode: any ;
  pressure: any
flowrate :any
vsdfrequency: any

data:any = []

show2:any
show1:any
show4:any
show6:any

   tagArr:any=[
   "hup3_ut",// 1
   "hup3_mode",//9
   "hup3_pump_mode",//10
   "hup3_borehole_lvl",//15
   "hup3_flow_rate",//16
   "hup3_total_flow",//17
   "hup3_run_hours",//18
   "hup3_pump_timer"
  ]
  faultArr:any=[
    "hup3_voltage", //0
"hup3_borehole_level_pr_fault", //1
"hup3_battery", //2
"hup3_charge", //3
"hup3_trip_fault", //4
"hup3_no_flow_fault", //5
"hup3_24_timer", //6
"hup3_stop_level", //7
"hup3_fault", //8
"hup3_estop_active", //9
"hup3_pump_suf", //10
"hup3_pump_general_fault" //11
  ]

  variable:any = {
    hup3_ut:null,
    hup3_pump_mode:null,
    hup3_run_hours:null,
    hup3_pump_timer:null,
    hup3_mode: null,
    hup3_total_flow: null,
    hup3_flow_rate: null,
    hup3_borehole_lvl: null,
    comms:null,
  }

  num: any;
  total_flow_HD3_array: any;
  DateArr: any;
  faultVariable:any={


  hup3_voltage:{
    value: null,
  alarm:"Fault",
  description:"Voltage Fault",
    alarmTrip: 0
  },

  hup3_borehole_level_pr_fault:   {
    value: null,
  alarm:"Fault",
  description:"Borehole Level Signal Fault",
    alarmTrip: 1
  },
  hup3_battery:   {
    value: null,
  alarm:"Fault",
  description:"Battery Fault",
    alarmTrip: 0
  },
  hup3_charge:   {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 0
  },
  hup3_trip_fault:   {
    value: null,
  alarm:"Fault",
  description:"Pump Trip Fault",
    alarmTrip: 1
  },
  hup3_no_flow_fault:   {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  hup3_24_timer:   {
    value: null,
  alarm:"Fault",
  description:"Stop Request",
    alarmTrip: 0
  },
  hup3_stop_level:   {
    value: null,
  alarm:"Warning",
  description:"Stop Level Reached",
    alarmTrip: 1
  },
  hup3_fault:   {
    value: null,
  alarm:"Fault",
  description:"Fault Active",
    alarmTrip: 1
  },
  hup3_estop_active:   {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  hup3_pump_suf:   {
    value: null,
  alarm:"Fault",
  description:"Start Up Fault",
    alarmTrip: 1
  },
  hup3_pump_general_fault:{
    value:null,
    alarm:"Fault",
    description:"General Fault",
    alarmTrip: 1
  },
}

trendTag:any = ["total_flow_HD3"]
collectionName:any ="KLM_HUP3_TF_TREND"

  constructor( public rs: ReportService,public recieve:Common,private authService: AuthService,private pm:pagePostMethod ,private pt: PostTrend) {
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


		    case "KLM_HUP4_GW":
          this.show4 = true;
          break;


		    case "KLM_HUP6_GW":
          this.show6 = true;
          break;

      }
    }

    this.intervalLoop = this.pm.findPageData("klm_hup3_gw", "GRDW_CurrentVals").subscribe((result) => {
      this.data =  result;

       
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.hup3_ut)

     var alarmG:any []=[this.faultVariable.hup3_voltage,this.faultVariable.hup3_pump_general_fault,this.faultVariable.hup3_borehole_level_pr_fault,this.faultVariable.hup3_battery,this.faultVariable.hup3_charge,this.faultVariable.hup3_trip_fault,this.faultVariable.hup3_no_flow_fault,this.faultVariable.hup3_24_timer,this.faultVariable.hup3_stop_level,this.faultVariable.hup3_fault,this.faultVariable.hup3_estop_active,this.faultVariable.hup3_pump_suf]

     this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))
    });


var trend: any = {};
this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
  trend=data

    this.total_flow_HD3_array = trend.TotalFlowArr[0].differences;

    this.DateArr = trend.DateArr;

      this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","HD3 Total Flow",this.total_flow_HD3_array)
      this.isLoading = false;
  }
  )

  }


  onDateFilter(){

    this.isLoading = true;

    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

  var trend :any;

  this.pt.getPostTrend(this.collectionName, this.trendTag,newStart,newEnd).then((data) => {
    trend=data

      this.total_flow_HD3_array = trend.TotalFlowArr[0].differences;
  this.DateArr = trend.DateArr;


  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","HD3 Total Flow",this.total_flow_HD3_array);

  this.isLoading = false;
  })


}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}

}
