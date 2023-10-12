import {MatTableDataSource} from '@angular/material/table';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Injectable } from "@angular/core";
import { HumansDorp1Service } from 'src/app/Service-Files/GRDW/humansdorp1.service';
import { IpService } from 'src/app/Service-Files/ip.service';
import { HttpClient } from '@angular/common/http';
import { ReportService } from 'src/app/Service-Files/report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';

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

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
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

  constructor(private ws: WebSocketService, public rs: ReportService, private hum: HumansDorp1Service,public recieve:Common,private authService: AuthService,private pm:pagePostMethod,private pt: PostTrend ) {
    this.isLoading = true;



    this.pm.findPageData("klm_hup_gw", "GRDW_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.hup1_ut)

     var alarmG:any []=[this.faultVariable.hup1_voltage,this.faultVariable.hup1_pump_general_fault,this.faultVariable.hup1_borehole_level_pr_fault,this.faultVariable.hup1_battery,this.faultVariable.hup1_charge,this.faultVariable.hup1_trip_fault,this.faultVariable.hup1_no_flow_fault,this.faultVariable.hup1_24_timer,this.faultVariable.hup1_stop_level,this.faultVariable.hup1_fault,this.faultVariable.hup1_estop_active,this.faultVariable.hup1_pump_suf]

     this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))


    });



  }
  isLoading: boolean = false;
  userSites:string[];
  public authListenerSubs!: Subscription;
  trendTag:any = ["total_flow_HD1"]
  collectionName:any ="KLM_HUP_TF_TREND"
  ngOnInit() {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {


      case "KLM_HUP2_GW":
        this.show2 = true;
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



  this.intervalLoop = setInterval(() =>{



    this.pm.findPageData("klm_hup_gw", "GRDW_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.hup1_ut)

     var alarmG:any []=[this.faultVariable.hup1_voltage,this.faultVariable.hup1_pump_general_fault,this.faultVariable.hup1_borehole_level_pr_fault,this.faultVariable.hup1_battery,this.faultVariable.hup1_charge,this.faultVariable.hup1_trip_fault,this.faultVariable.hup1_no_flow_fault,this.faultVariable.hup1_24_timer,this.faultVariable.hup1_stop_level,this.faultVariable.hup1_fault,this.faultVariable.hup1_estop_active,this.faultVariable.hup1_pump_suf]

     this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))
    });




},60000)


var trend: any = {};






  this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
    trend=data
  this.total_flow_HD1_array = trend.TotalFlowArr[0];

  this.DateArr = trend.DateArr;


    this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","HD1 Total Flow",this.total_flow_HD1_array);
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
  this.total_flow_HD1_array = trend.TotalFlowArr[0];

this.DateArr = trend.DateArr;


this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","HD1 Total Flow",this.total_flow_HD1_array);

this.isLoading = false;
})


}
ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}
}
