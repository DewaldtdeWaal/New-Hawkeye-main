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
import {getKruis12Service} from 'src/app/Service-Files/Driver/getDriver.service';

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
  intervalLoop: any
  options: EChartsOption;
  total_flow_1_array:any
  generalfaultdatasource :any
  comms:any
  theme:any = localStorage.getItem("theme");
  status:any;
  displayedColumns :string[]= ['alarm', 'description'];
  showGW13:any
  showGW14:any
  showR:any
  DateArr: any;
  pumpfaulttable: PeriodicElement[] = [];
  pumpfaultdatasource :any =  new MatTableDataSource(this.pumpfaulttable);
  data:any = []

  variable:any = {
    gw_klm_kruis12_UT:null,
    gw_klm_kruis12_TF:null,
    gw_klm_kruis12_bar:null,
    gw_klm_kruis12_current:null,
    gw_klm_kruis12_flow_rate:null,
    gw_klm_kruis12_lvl:null,
    gw_klm_kruis12_number_of_starts:null,
    gw_klm_kruis12_power:null,
    gw_klm_kruis12_run_hours:null,
    gw_klm_kruis12_target_flow:null,
    gw_klm_kruis12_target_freq:null,
    gw_klm_kruis12_total_power:null,
    gw_klm_kruis12_vsd:null,
    gw_klm_kruis12_mode:null,
    gw_klm_kruis12_voltage:null,
    gw_klm_kruis12_status:null,
    comms:null,
    siteName:null,
    date:null,
  }
  dataArray:any


  //Explain this in typescript and how would i access a value in a loop
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

  userSites:string[];
  tableDataPump1: PeriodicElement[] = [];
  dataSourceP1:any = new MatTableDataSource(this.tableDataPump1);
  public authListenerSubs!: Subscription;
  constructor(private ls:ListeningService, private ws:WebSocketService,  public rs: ReportService,public recieve:Common,private authService: AuthService,public GKS: getKruis12Service )  {

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

    this.GKS.GetSiteValues()
    .subscribe(rsp => {
      this.data = rsp;
      this.variable.siteName = this.data.routingArray[0].description;
      this.variable.gw_klm_kruis12_UT = this.data.routingArray[0].date;
      this.variable.comms = Common.getLastUpdate(this.variable.gw_klm_kruis12_UT)
      this.dataArray = this.data.routingArray[0].dataArray;
      this.variable.gw_klm_kruis12_TF = this.dataArray[8];
      this.variable.gw_klm_kruis12_bar = this.dataArray[9];
      this.variable.gw_klm_kruis12_current = this.dataArray[10];
      this.variable.gw_klm_kruis12_flow_rate = this.dataArray[11];
      this.variable.gw_klm_kruis12_lvl = this.dataArray[12];
      this.variable.gw_klm_kruis12_number_of_starts = this.dataArray[13];
      this.variable.gw_klm_kruis12_power = this.dataArray[14]
      this.variable.gw_klm_kruis12_run_hours = this.dataArray[15];
      this.variable.gw_klm_kruis12_target_flow = this.dataArray[16];
      this.variable.gw_klm_kruis12_target_freq = this.dataArray[17];
      this.variable.gw_klm_kruis12_total_power = this.dataArray[18];
      this.variable.gw_klm_kruis12_vsd = this.dataArray[19]
      this.variable.gw_klm_kruis12_voltage = this.dataArray[26];

       this.faultVariable.gw_klm_kruis12_bar_fault.value = this.dataArray[0].value
       this.faultVariable.gw_klm_kruis12_emergency_stop.value = this.dataArray[1].value
       this.faultVariable.gw_klm_kruis12_flow_fault.value = this.dataArray[2].value
       this.faultVariable.gw_klm_kruis12_lvl_fault.value = this.dataArray[3].value
       this.faultVariable.gw_klm_kruis12_res_communication_fault.value = this.dataArray[4].value
       this.faultVariable.gw_klm_kruis12_res_ful.value = this.dataArray[5].value
       this.faultVariable.gw_klm_kruis12_voltage_not_okay.value = this.dataArray[6].value
       this.faultVariable.gw_klm_kruis12_vsd_fault.value = this.dataArray[7].value

       var alarm1: any [] = [this.faultVariable.gw_klm_kruis12_bar_fault,this.faultVariable.gw_klm_kruis12_lvl_fault,this.faultVariable.gw_klm_kruis12_flow_fault,this.faultVariable.gw_klm_kruis12_voltage_not_okay,this.faultVariable.gw_klm_kruis12_emergency_stop,this.faultVariable.gw_klm_kruis12_vsd_fault,this.faultVariable.gw_klm_kruis12_res_communication_fault,this.faultVariable.gw_klm_kruis12_res_ful,]

     this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.variable.gw_klm_kruis12_mode = this.workOutMode(this.dataArray[20]);
     this.variable.gw_klm_kruis12_control_mode = this.workoutControlMode(this.dataArray[22], this.dataArray[23]);
     this.variable.gw_klm_kruis12_status = this.workoutStatus(this.dataArray[24], this.dataArray[25], this.dataArray[26])
    }
    )

   }

   onDateFilter(){
    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

  var trend :any;

  this.rs.Get_Kruis12_Total_Flows_Dates(newStart, newEnd).subscribe(data => {
  trend=data

  this.total_flow_1_array = trend.total_flow_1_array;

  console.log("this.total_flow_1_array")
  console.log(this.total_flow_1_array)
  console.log("this.total_flow_1_array")
  this.DateArr = trend.DateArr;

  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_1_array)
  })


  }

  ngOnInit() {




   this.intervalLoop = setInterval(() =>{

    this.GKS.GetSiteValues()
    .subscribe(rsp => {
      this.data = rsp;


      console.log(this.data.routingArray[0])


      this.variable.siteName = this.data.routingArray[0].description;
      this.variable.gw_klm_kruis12_UT = this.data.routingArray[0].date;
      this.variable.comms = Common.getLastUpdate(this.variable.gw_klm_kruis12_UT)
      this.dataArray = this.data.routingArray[0].dataArray;
      this.variable.gw_klm_kruis12_TF = this.dataArray[8];
      this.variable.gw_klm_kruis12_bar = this.dataArray[9];
      this.variable.gw_klm_kruis12_current = this.dataArray[10];
      this.variable.gw_klm_kruis12_flow_rate = this.dataArray[11];
      this.variable.gw_klm_kruis12_lvl = this.dataArray[12];
      this.variable.gw_klm_kruis12_number_of_starts = this.dataArray[13];
      this.variable.gw_klm_kruis12_power = this.dataArray[14]
      this.variable.gw_klm_kruis12_run_hours = this.dataArray[15];
      this.variable.gw_klm_kruis12_target_flow = this.dataArray[16];
      this.variable.gw_klm_kruis12_target_freq = this.dataArray[17];
      this.variable.gw_klm_kruis12_total_power = this.dataArray[18];
      this.variable.gw_klm_kruis12_vsd = this.dataArray[19]
      this.variable.gw_klm_kruis12_voltage = this.dataArray[26];

       this.faultVariable.gw_klm_kruis12_bar_fault.value = this.dataArray[0].value
       this.faultVariable.gw_klm_kruis12_emergency_stop.value = this.dataArray[1].value
       this.faultVariable.gw_klm_kruis12_flow_fault.value = this.dataArray[2].value
       this.faultVariable.gw_klm_kruis12_lvl_fault.value = this.dataArray[3].value
       this.faultVariable.gw_klm_kruis12_res_communication_fault.value = this.dataArray[4].value
       this.faultVariable.gw_klm_kruis12_res_ful.value = this.dataArray[5].value
       this.faultVariable.gw_klm_kruis12_voltage_not_okay.value = this.dataArray[6].value
       this.faultVariable.gw_klm_kruis12_vsd_fault.value = this.dataArray[7].value

       var alarm1: any [] = [this.faultVariable.gw_klm_kruis12_bar_fault,this.faultVariable.gw_klm_kruis12_lvl_fault,this.faultVariable.gw_klm_kruis12_flow_fault,this.faultVariable.gw_klm_kruis12_voltage_not_okay,this.faultVariable.gw_klm_kruis12_emergency_stop,this.faultVariable.gw_klm_kruis12_vsd_fault,this.faultVariable.gw_klm_kruis12_res_communication_fault,this.faultVariable.gw_klm_kruis12_res_ful,]

     this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.variable.gw_klm_kruis12_mode = this.workOutMode(this.dataArray[20]);
     this.variable.gw_klm_kruis12_control_mode = this.workoutControlMode(this.dataArray[22], this.dataArray[23]);
     this.variable.gw_klm_kruis12_status = this.workoutStatus(this.dataArray[24], this.dataArray[25], this.dataArray[26])
    }
    )

 }, 60000)


 var trend: any = {};
 this.rs.Get_Kruis12_TotalFlows().subscribe(data => {
  trend=data
  this.total_flow_1_array = trend.total_flow_1_array;

  this.DateArr = trend.DateArr;
    var theme:any
    var tooltipBackground:any


this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_1_array)

}
)

  }

ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}

 workoutControlMode(variable1:any,variable2:any){

  var status;


  if(variable1.value == 1){
    status = variable1.description;
  }
  else if(variable2.value == 1){
    status = variable2.description;
  }


  return status;



}

workOutMode(variable1: any){
  var status;
  if(variable1.value == 0){
    status = "Panel Off";
  }
  else if (variable1.value  == 1){
    status = "Panel Manual";
  }
  else if (variable1.value  == 3){
    status = "HMI Auto";
  }
  else if (variable1.value  == 5){
    status = "SCADA Manual";
  }
  else if (variable1.value  == 6){
    status = "SCADA Auto";
  }
  else{
    status = undefined;
  }

  return status;

}


workoutStatus(variable1:any,variable2:any,variable3:any ){

  var status;
  if(variable1.value == 1){
    status = variable1.description
  }
  else if(variable2.value == 1){
    status = variable2.description
  }
  else if(variable3.value == 1){
    status = variable3.description
  }
  else{
   status = undefined
  }

  return status;

}








}
