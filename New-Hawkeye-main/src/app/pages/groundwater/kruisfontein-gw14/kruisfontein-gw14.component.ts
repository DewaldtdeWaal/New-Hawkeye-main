import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Injectable } from "@angular/core";
import {kruisfonteinRouting} from 'src/app/Service-Files/GRDW/groundwater.service'
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import { ListeningService} from 'src/app/listening.service';
import { NewtonParkPoolService } from 'src/app/Service-Files/newtonparkpool.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';

export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-kruisfontein-gw14',
  templateUrl: './kruisfontein-gw14.component.html',
  styleUrls: ['./kruisfontein-gw14.component.css']
})
export class KruisfonteinGW14Component implements OnInit {
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
  showGW12:any
  showGW13:any
  showR:any
  DateArr: any;
  pumpfaulttable: PeriodicElement[] = [];
  pumpfaultdatasource :any =  new MatTableDataSource(this.pumpfaulttable);
  variable:any = {
    gw_klm_kruis14_UT:null,
    gw_klm_kruis14_run_hours:null,
    gw_klm_kruis14_number_of_starts:null,
    gw_klm_kruis14_flow_rate:null,
    gw_klm_kruis14_TF:null,
    gw_klm_kruis14_lvl:null,
    gw_klm_kruis14_bar:null,
    gw_klm_kruis14_control_mode:null,
    gw_klm_kruis14_vsd:null,
    gw_klm_kruis14_target_flow:null,
    gw_klm_kruis14_target_freq:null,
    gw_klm_kruis14_voltage:null,
    gw_klm_kruis14_current:null,
    gw_klm_kruis14_power:null,
    gw_klm_kruis14_total_power:null,
    gw_klm_kruis14_status:null,
    comms:null,
    gw_klm_kruis14_mode:null,

  }


  data:any = []
  tagArr:any=[
     "gw_klm_kruis14_UT",
     "gw_klm_kruis14_run_hours",
     "gw_klm_kruis14_number_of_starts",
     "gw_klm_kruis14_flow_rate",
     "gw_klm_kruis14_TF",
     "gw_klm_kruis14_lvl",
     "gw_klm_kruis14_bar",
     "gw_klm_kruis14_control_mode",
     "gw_klm_kruis14_vsd",
     "gw_klm_kruis14_target_flow",
     "gw_klm_kruis14_target_freq",
     "gw_klm_kruis14_voltage",
     "gw_klm_kruis14_current",
     "gw_klm_kruis14_power",
     "gw_klm_kruis14_total_power",
     "gw_klm_kruis14_status",
     "gw_klm_kruis14_mode",
  ]

  faultVariable:any={
gw_klm_kruis14_bar_fault:{
    value: null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip: 1
 },
gw_klm_kruis14_lvl_fault:{
    value: null,
    alarm:"Fault",
    description:"Level Fault",
    alarmTrip: 1
 },
gw_klm_kruis14_flow_fault:{
    value: null,
    alarm:"Fault",
    description:"Flow Fault",
    alarmTrip: 1
 },
gw_klm_kruis14_voltage_not_okay:{
    value: null,
    alarm:"Warning",
    description:"Voltage Not Okay",
    alarmTrip: 1
 },
gw_klm_kruis14_emergency_stop:{
    value: null,
    alarm:"Fault",
    description:"Emergency Stop",
    alarmTrip: 1
 },
gw_klm_kruis14_vsd_fault:{
    value: null,
    alarm:"Fault",
    description:"VSD Fault",
    alarmTrip: 1
 },
gw_klm_kruis14_res_communication_fault:{
    value: null,
    alarm:"Fault",
    description:"Reservoir Communication Fault",
    alarmTrip: 1
 },
gw_klm_kruis14_res_ful:{
    value: null,
    alarm:"Warning",
    description:"Reservoir Full",
    alarmTrip: 1
 },

  }
  intervalLoop: any
  faultArr:any=[

"gw_klm_kruis14_bar_fault",
"gw_klm_kruis14_lvl_fault",
"gw_klm_kruis14_flow_fault",
"gw_klm_kruis14_voltage_not_okay",
"gw_klm_kruis14_emergency_stop",
"gw_klm_kruis14_vsd_fault",
"gw_klm_kruis14_res_communication_fault",
"gw_klm_kruis14_res_ful",
  ]
  userSites:string[];
  tableDataPump1: PeriodicElement[] = [];
  dataSourceP1:any = new MatTableDataSource(this.tableDataPump1);
  public authListenerSubs!: Subscription;
  constructor(private ls:ListeningService, private ws:WebSocketService,  public rs: ReportService,public recieve:Common,private authService: AuthService,private GWS:kruisfonteinRouting ,private pm:pagePostMethod)  {
    this.theme = localStorage.getItem("theme");
    this.pm.findPageData("Kuis", "GRDW_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.faultVariable =   Common.getFaultRouteDatas(this.faultArr,this.faultVariable,this.data)

     this.variable.comms = Common.getLastUpdate(this.variable.gw_klm_kruis14_UT)
     var alarm1: any [] = [this.faultVariable.gw_klm_kruis14_bar_fault,this.faultVariable.gw_klm_kruis14_lvl_fault,this.faultVariable.gw_klm_kruis14_flow_fault,this.faultVariable.gw_klm_kruis14_voltage_not_okay,this.faultVariable.gw_klm_kruis14_emergency_stop,this.faultVariable.gw_klm_kruis14_vsd_fault,this.faultVariable.gw_klm_kruis14_res_communication_fault,this.faultVariable.gw_klm_kruis14_res_ful,]
    this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
    });


   }

  ngOnInit() {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "KLM_KUI_12_GW":
          this.showGW12 = "true";
          break;

      case "KLM_KUI_13_GW":
        this.showGW13 = "true";
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

       this.variable.comms = Common.getLastUpdate(this.variable.gw_klm_kruis14_UT)
       var alarm1: any [] = [this.faultVariable.gw_klm_kruis14_bar_fault,this.faultVariable.gw_klm_kruis14_lvl_fault,this.faultVariable.gw_klm_kruis14_flow_fault,this.faultVariable.gw_klm_kruis14_voltage_not_okay,this.faultVariable.gw_klm_kruis14_emergency_stop,this.faultVariable.gw_klm_kruis14_vsd_fault,this.faultVariable.gw_klm_kruis14_res_communication_fault,this.faultVariable.gw_klm_kruis14_res_ful,]
      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      });
    },60000 )
    var trend: any = {};
    this.rs.Get_Kruis14_TotalFlows().subscribe(data => {
      trend=data
      this.total_flow_1_array = trend.total_flow_1_array;

      this.DateArr = trend.DateArr;
        var theme:any
        var tooltipBackground:any


  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_1_array)

    }
    )

  }




  onDateFilter(){
    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

  var trend :any;

  this.rs.Get_Kruis14_Total_Flows_Dates(newStart, newEnd).subscribe(data => {
  trend=data

  this.total_flow_1_array = trend.total_flow_1_array;
  this.DateArr = trend.DateArr;
  var theme:any
  var tooltipBackground:any;

  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_1_array)
  })


  }


ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}

}
