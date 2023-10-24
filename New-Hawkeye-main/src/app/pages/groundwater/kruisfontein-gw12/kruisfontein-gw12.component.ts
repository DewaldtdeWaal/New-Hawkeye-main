import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Injectable } from "@angular/core";
import { AuthService } from 'src/app/Service-Files/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import { ListeningService} from 'src/app/listening.service';
import { NewtonParkPoolService } from 'src/app/Service-Files/newtonparkpool.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
import { Subscription } from 'rxjs';
import {kruisfonteinRouting} from 'src/app/Service-Files/GRDW/groundwater.service'
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-kruisfontein-gw12',
  templateUrl: './kruisfontein-gw12.component.html',
  styleUrls: ['./kruisfontein-gw12.component.css']
})


export class KruisfonteinGW12Component implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  options: EChartsOption;
  total_flow_1_array:any
  generalfaultdatasource :any
  comms:any
  theme:any;
  status:any;
  displayedColumns :string[]= ['alarm', 'description'];
  showGW13:any
  showGW14:any
  showR:any
  DateArr: any;
  pumpfaulttable: PeriodicElement[] = [];
  pumpfaultdatasource :any =  new MatTableDataSource(this.pumpfaulttable);
  variable:any = {
    gw_klm_kruis12_UT:null,
    gw_klm_kruis12_run_hours:null,
    gw_klm_kruis12_number_of_starts:null,
    gw_klm_kruis12_flow_rate:null,
    gw_klm_kruis12_TF:null,
    gw_klm_kruis12_lvl:null,
    gw_klm_kruis12_bar:null,
    gw_klm_kruis12_control_mode:null,
    gw_klm_kruis12_vsd:null,
    gw_klm_kruis12_target_flow:null,
    gw_klm_kruis12_target_freq:null,
    gw_klm_kruis12_voltage:null,
    gw_klm_kruis12_current:null,
    gw_klm_kruis12_power:null,
    gw_klm_kruis12_total_power:null,
    gw_klm_kruis12_status:null,
    comms:null,
    gw_klm_kruis12_mode:null,

  }


  data:any = []
  tagArr:any=[
     "gw_klm_kruis12_UT",
     "gw_klm_kruis12_run_hours",
     "gw_klm_kruis12_number_of_starts",
     "gw_klm_kruis12_flow_rate",
     "gw_klm_kruis12_TF",
     "gw_klm_kruis12_lvl",
     "gw_klm_kruis12_bar",
     "gw_klm_kruis12_control_mode",
     "gw_klm_kruis12_vsd",
     "gw_klm_kruis12_target_flow",
     "gw_klm_kruis12_target_freq",
     "gw_klm_kruis12_voltage",
     "gw_klm_kruis12_current",
     "gw_klm_kruis12_power",
     "gw_klm_kruis12_total_power",
     "gw_klm_kruis12_status",
     "gw_klm_kruis12_mode",
  ]

  faultVariable:any={
gw_klm_kruis12_bar_fault:{
    value: null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip: 1
 },
gw_klm_kruis12_lvl_fault:{
    value: null,
    alarm:"Fault",
    description:"Level Fault",
    alarmTrip: 1
 },
gw_klm_kruis12_flow_fault:{
    value: null,
    alarm:"Fault",
    description:"Flow Fault",
    alarmTrip: 1
 },
gw_klm_kruis12_voltage_not_okay:{
    value: null,
    alarm:"Warning",
    description:"Voltage Not Okay",
    alarmTrip: 1
 },
gw_klm_kruis12_emergency_stop:{
    value: null,
    alarm:"Fault",
    description:"Emergency Stop",
    alarmTrip: 1
 },
gw_klm_kruis12_vsd_fault:{
    value: null,
    alarm:"Fault",
    description:"VSD Fault",
    alarmTrip: 1
 },
gw_klm_kruis12_res_communication_fault:{
    value: null,
    alarm:"Fault",
    description:"Reservoir Communication Fault",
    alarmTrip: 1
 },
gw_klm_kruis12_res_ful:{
    value: null,
    alarm:"Warning",
    description:"Reservoir Full",
    alarmTrip: 1
 },

  }
  intervalLoop: any
  faultArr:any=[

"gw_klm_kruis12_bar_fault",
"gw_klm_kruis12_lvl_fault",
"gw_klm_kruis12_flow_fault",
"gw_klm_kruis12_voltage_not_okay",
"gw_klm_kruis12_emergency_stop",
"gw_klm_kruis12_vsd_fault",
"gw_klm_kruis12_res_communication_fault",
"gw_klm_kruis12_res_ful",
  ]
  userSites:string[];
  tableDataPump1: PeriodicElement[] = [];
  dataSourceP1:any = new MatTableDataSource(this.tableDataPump1);
  public authListenerSubs!: Subscription;
  constructor(private ls:ListeningService, private ws:WebSocketService,  public rs: ReportService,public recieve:Common,private authService: AuthService,private GWS:kruisfonteinRouting,private pm:pagePostMethod,private pt: PostTrend )  {
    this.isLoading  = true;
    this.theme = localStorage.getItem("theme");

    this.pm.findPageData("Kuis", "GRDW_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.faultVariable =   Common.getFaultRouteDatas(this.faultArr,this.faultVariable,this.data)

     this.variable.comms = Common.getLastUpdate(this.variable.gw_klm_kruis12_UT)
     var alarm1: any [] = [this.faultVariable.gw_klm_kruis12_bar_fault,this.faultVariable.gw_klm_kruis12_lvl_fault,this.faultVariable.gw_klm_kruis12_flow_fault,this.faultVariable.gw_klm_kruis12_voltage_not_okay,this.faultVariable.gw_klm_kruis12_emergency_stop,this.faultVariable.gw_klm_kruis12_vsd_fault,this.faultVariable.gw_klm_kruis12_res_communication_fault,this.faultVariable.gw_klm_kruis12_res_ful,]
    this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
    });


   }
   collectionName:any ="KLM_KRUIS12_TF"
   trendTag:any = ["gw_klm_kruis12_TF"]
  ngOnInit() {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "KLM_KUI_13_GW":
          this.showGW13 = "true";
          break;

      case "KLM_KUI_14_GW":
        this.showGW14 = "true";
        break;


        case "KLM_KUI_R":
          this.showR = "true";
          break;

      }
    }


    var tagVals:any =[]
    var errorVals:any=[]
    tagVals = this.recieve.recieveNonMVals(this.tagArr);
    errorVals = this.recieve.recieveNonMVals(this.faultArr)

    this.intervalLoop = setInterval(() =>{
      this.pm.findPageData("Kuis", "GRDW_CurrentVals").then((result) => {
        this.data =  result;
        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
       this.faultVariable =   Common.getFaultRouteDatas(this.faultArr,this.faultVariable,this.data)

       this.variable.comms = Common.getLastUpdate(this.variable.gw_klm_kruis12_UT)
       var alarm1: any [] = [this.faultVariable.gw_klm_kruis12_bar_fault,this.faultVariable.gw_klm_kruis12_lvl_fault,this.faultVariable.gw_klm_kruis12_flow_fault,this.faultVariable.gw_klm_kruis12_voltage_not_okay,this.faultVariable.gw_klm_kruis12_emergency_stop,this.faultVariable.gw_klm_kruis12_vsd_fault,this.faultVariable.gw_klm_kruis12_res_communication_fault,this.faultVariable.gw_klm_kruis12_res_ful,]
      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      });
    },60000 )
    var trend: any = {};
    this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
      trend=data
      this.total_flow_1_array =  trend.TotalFlowArr[0];

      this.DateArr = trend.DateArr;
        var theme:any
        var tooltipBackground:any
        this.isLoading  = false;

  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_1_array)

    }
    )

  }

  isLoading: boolean = false;


  onDateFilter(){
    this.isLoading  = true;
    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

  var trend :any;

  this.pt.getPostTrend(this.collectionName, this.trendTag,newStart,newEnd).then((data) => {
  trend=data

  this.total_flow_1_array =  trend.TotalFlowArr[0];
  this.DateArr = trend.DateArr;

  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_1_array);
  })

  this.isLoading  = false;
  }


ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}

}
