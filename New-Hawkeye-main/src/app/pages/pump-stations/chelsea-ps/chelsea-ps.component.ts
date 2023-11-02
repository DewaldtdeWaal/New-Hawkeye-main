import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {ChelseaService} from 'src/app/Service-Files/Reservoir/chelsea.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {Common} from 'src/app/class/common';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import {PostTrend} from 'src/app/Service-Files/PageTrend/pagePost.service'
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-chelsea-ps',
  templateUrl: './chelsea-ps.component.html',
  styleUrls: ['./chelsea-ps.component.css']
})

export class ChelseaPSComponent implements OnInit {

  userSites:string[];
  data: any=[];

  variable :any= {

  che_ps_ut: null,
  comms: null,
  che_ps_700_flow_rate:null,
  che_ps_moth_760_mm:null,
  che_ps_moth_900_mm:null,
  che_ps_walk_drive_off_500_mm:null,
  che_ps_pumpset_1_pumpstatus:null,
  che_ps_pumpset_1_run_hours:null,
  che_ps_pumpset_1_del_pressure:null,
  che_ps_pumpset_1_suct_pressure:null,
  che_ps_pumpset_1_vsd_actual_speed:null,
  che_ps_pumpset_1_current:null,
  che_ps_pumpset_1_power:null,
  che_ps_pumpset_2_pumpstatus:null,
  che_ps_pumpset_2_mode:null,
  che_ps_pumpset_2_run_hours:null,
  che_ps_pumpset_2_del_pressure:null,
  che_ps_pumpset_2_suct_pressure:null,
  che_ps_pumpset_2_vsd_actual_speed:null,
  che_ps_pumpset_2_current:null,
  che_ps_pumpset_2_power:null,
  che_ps_pumpset_3_pumpstatus:null,
  che_ps_pumpset_3_mode:null,
  che_ps_pumpset_3_run_hours:null,
  che_ps_pumpset_3_del_pressure:null,
  che_ps_pumpset_3_suct_pressure:null,
  che_ps_pumpset_3_vsd_actual_speed:null,
  che_ps_pumpset_3_current:null,
  che_ps_pumpset_3_power:null,
  che_ps_pumpset_4_pumpstatus:null,
  che_ps_pumpset_4_mode:null,
  che_ps_pumpset_4_run_hours:null,
  che_ps_pumpset_4_del_pressure:null,
  che_ps_pumpset_4_suct_pressure:null,
  che_ps_pumpset_4_vsd_actual_speed:null,
  che_ps_pumpset_4_current:null,
  che_ps_pumpset_4_power:null,
  che_ps_pumpset_1_mode:null,
  che_ps_700_total_flow:null,
che_ps_moth_760_mm_total_flow:null,
che_ps_moth_900_mm_total_flow:null,
che_ps_walk_drive_off_500_mm_total_flow:null,
  }




  public authListenerSubs!: Subscription;
  showNavigationButton: string;
  intervalLoop: any;
  theme:any = localStorage.getItem("theme");
  dataSourceG:any
  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceP3:any;
  dataSourceP4:any;

  ELEMENT_DATA_G: PeriodicElement[] = [];
  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];
  ELEMENT_DATA_P4: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  DateArr: any;
  CHE_PS_700_TF_arr: any[]
  CHE_PS_760_MM_TF_arr: any[]
  CHE_PS_900_MM_TF_arr: any[]
  CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr: any[]

  faultVariable:any={
  che_ps_flood_alarm: {
    value: null,
  alarm:"Fault",
  description:"Flood Alarm",
    alarmTrip: 1
  },
  che_ps_pumpset_g_control_voltage_loss:{
    value:null,
    alarm:"Fault",
    description:"Control Voltage Loss",
    alarmTrip:0,
  },
  che_ps_pumpset_1_no_flow_fault: {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_1_ESTOP: {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  che_ps_pumpset_1_circuit_breaker_trip:  {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  che_ps_pumpset_1_drive_fault: {
    value: null,
  alarm:"Fault",
  description:"Drive Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_1_pres_fault: {
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_1_temp_fault: {
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_1_vib_fault:{
    value:null,
    alarm:"Fault",
    description:"Vibration Fault",
    alarmTrip:1
  },
  che_ps_pumpset_2_no_flow_fault:{
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_2_ESTOP: {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  che_ps_pumpset_2_circuit_breaker_trip: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  che_ps_pumpset_2_drive_fault: {
    value: null,
  alarm:"Fault",
  description:"Drive Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_2_pres_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_2_temp_fault: {
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_2_vib_fault: {
    value:null,
    alarm:"Fault",
    description:"Vibration Fault",
    alarmTrip:1
  },
  che_ps_pumpset_3_no_flow_fault:{
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_3_ESTOP: {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  che_ps_pumpset_3_circuit_breaker_trip: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  che_ps_pumpset_3_drive_fault: {
    value: null,
  alarm:"Fault",
  description:"Drive Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_3_pres_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_3_temp_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_3_vib_fault:{
    value:null,
    alarm:"Fault",
    description:"Vibration Fault",
    alarmTrip:1
  },
  che_ps_pumpset_4_no_flow_fault:{
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_4_ESTOP: {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  che_ps_pumpset_4_circuit_breaker_trip: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  che_ps_pumpset_4_drive_fault: {
    value: null,
  alarm:"Fault",
  description:"Drive Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_4_pres_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_4_temp_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_4_vib_fault:{
    value:null,
    alarm:"Fault",
    description:"Vibration Fault",
    alarmTrip:1
  }

}

   tagArr:any=[
    "che_ps_ut",


    "che_ps_700_flow_rate",
    "che_ps_moth_760_mm",
    "che_ps_moth_900_mm",
    "che_ps_walk_drive_off_500_mm",

    "che_ps_pumpset_1_pumpstatus",
    "che_ps_pumpset_1_run_hours",
    "che_ps_pumpset_1_del_pressure",
    "che_ps_pumpset_1_suct_pressure",
    "che_ps_pumpset_1_vsd_actual_speed",
    "che_ps_pumpset_1_current",
    "che_ps_pumpset_1_power",
    "che_ps_pumpset_1_mode",
    "che_ps_pumpset_2_pumpstatus",

    "che_ps_pumpset_2_mode",
    "che_ps_pumpset_2_run_hours",
    "che_ps_pumpset_2_del_pressure",
    "che_ps_pumpset_2_suct_pressure",
    "che_ps_pumpset_2_vsd_actual_speed",
    "che_ps_pumpset_2_current",
    "che_ps_pumpset_2_power",
    "che_ps_pumpset_3_pumpstatus",

    "che_ps_pumpset_3_mode",
    "che_ps_pumpset_3_run_hours",
    "che_ps_pumpset_3_del_pressure",
    "che_ps_pumpset_3_suct_pressure",
    "che_ps_pumpset_3_vsd_actual_speed",
    "che_ps_pumpset_3_current",
    "che_ps_pumpset_3_power",
    "che_ps_pumpset_4_pumpstatus",

    "che_ps_pumpset_4_mode",
    "che_ps_pumpset_4_run_hours",
    "che_ps_pumpset_4_del_pressure",
    "che_ps_pumpset_4_suct_pressure",
    "che_ps_pumpset_4_vsd_actual_speed",
    "che_ps_pumpset_4_current",
    "che_ps_pumpset_4_power",


    "che_ps_700_total_flow",
"che_ps_moth_760_mm_total_flow",
"che_ps_moth_900_mm_total_flow",
"che_ps_walk_drive_off_500_mm_total_flow",
  ]

  faultArr:any=[
    "che_ps_pumpset_g_control_voltage_loss", // 0
    "che_ps_flood_alarm", // 1
    "che_ps_pumpset_1_no_flow_fault", // 2
    "che_ps_pumpset_1_ESTOP", // 3
    "che_ps_pumpset_1_circuit_breaker_trip", // 4
    "che_ps_pumpset_1_drive_fault", // 5
    "che_ps_pumpset_1_pres_fault", // 6
    "che_ps_pumpset_1_temp_fault", // 7
    "che_ps_pumpset_1_vib_fault", // 8
    "che_ps_pumpset_2_no_flow_fault", //9
    "che_ps_pumpset_2_ESTOP", // 10
    "che_ps_pumpset_2_circuit_breaker_trip", // 11
    "che_ps_pumpset_2_drive_fault", // 12
    "che_ps_pumpset_2_pres_fault", // 13
    "che_ps_pumpset_2_temp_fault", // 14
    "che_ps_pumpset_2_vib_fault", // 15
    "che_ps_pumpset_3_no_flow_fault", // 16
    "che_ps_pumpset_3_ESTOP", // 17
    "che_ps_pumpset_3_circuit_breaker_trip", // 18
    "che_ps_pumpset_3_drive_fault", // 19
    "che_ps_pumpset_3_pres_fault", // 20
    "che_ps_pumpset_3_temp_fault", // 21
    "che_ps_pumpset_3_vib_fault", // 22
    "che_ps_pumpset_4_no_flow_fault", // 23
    "che_ps_pumpset_4_ESTOP", // 24
    "che_ps_pumpset_4_circuit_breaker_trip", // 25
    "che_ps_pumpset_4_drive_fault", // 26
    "che_ps_pumpset_4_pres_fault", // 27
    "che_ps_pumpset_4_temp_fault", // 28
    "che_ps_pumpset_4_vib_fault", // 29

  ]
  options: EChartsOption;

  chelseaTrendTag:any[] = ["che_ps_700_total_flow","che_ps_moth_760_mm_total_flow","che_ps_moth_900_mm_total_flow","che_ps_walk_drive_off_500_mm_total_flow"]


  constructor( public rs: ReportService,private pt: PostTrend,private authService: AuthService,public recieve:Common,private pm:pagePostMethod  ) {


    this.isLoading = true;








     }

     isLoading: boolean = false;
  ngOnInit() {


    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_CHE_R":
          this.showNavigationButton = "true";
          break;
      }
    }




    this.intervalLoop = this.pm.findPageData("nmbm_che_ps_res", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.che_ps_ut)
       var alarmG: any [] = [this.faultVariable.che_ps_flood_alarm,this.faultVariable.che_ps_pumpset_g_control_voltage_loss]
       var alarm1: any [] = [this.faultVariable.che_ps_pumpset_1_no_flow_fault,this.faultVariable.che_ps_pumpset_1_ESTOP,this.faultVariable.che_ps_pumpset_1_circuit_breaker_trip,this.faultVariable.che_ps_pumpset_1_drive_fault ,this.faultVariable.che_ps_pumpset_1_pres_fault,this.faultVariable.che_ps_pumpset_1_temp_fault,this.faultVariable.che_ps_pumpset_1_vib_fault]
       var alarm2: any [] = [this.faultVariable.che_ps_pumpset_2_no_flow_fault,this.faultVariable.che_ps_pumpset_2_ESTOP,this.faultVariable.che_ps_pumpset_2_circuit_breaker_trip,this.faultVariable.che_ps_pumpset_2_drive_fault ,this.faultVariable.che_ps_pumpset_2_pres_fault,this.faultVariable.che_ps_pumpset_2_temp_fault,this.faultVariable.che_ps_pumpset_2_vib_fault]
       var alarm3: any [] = [this.faultVariable.che_ps_pumpset_3_no_flow_fault,this.faultVariable.che_ps_pumpset_3_ESTOP,this.faultVariable.che_ps_pumpset_3_circuit_breaker_trip,this.faultVariable.che_ps_pumpset_3_drive_fault ,this.faultVariable.che_ps_pumpset_3_pres_fault,this.faultVariable.che_ps_pumpset_3_temp_fault,this.faultVariable.che_ps_pumpset_3_vib_fault]
       var alarm4: any [] = [this.faultVariable.che_ps_pumpset_4_no_flow_fault,this.faultVariable.che_ps_pumpset_4_ESTOP,this.faultVariable.che_ps_pumpset_4_circuit_breaker_trip,this.faultVariable.che_ps_pumpset_4_drive_fault ,this.faultVariable.che_ps_pumpset_4_pres_fault,this.faultVariable.che_ps_pumpset_4_temp_fault,this.faultVariable.che_ps_pumpset_4_vib_fault]

       this.dataSourceG = new MatTableDataSource(Common.getAlarmValue(alarmG))
       this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
       this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
       this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
       this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))
    });

    var trend: any = {};

    this.pt.getPostTrend("CHEL_TF_TREND", this.chelseaTrendTag,null,null).then((data) => {

      trend=data;


      this.CHE_PS_700_TF_arr = trend.TotalFlowArr[0]
      this.CHE_PS_760_MM_TF_arr = trend.TotalFlowArr[1]
      this.CHE_PS_900_MM_TF_arr = trend.TotalFlowArr[2]
      this.CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr =  trend.TotalFlowArr[3]
      this.DateArr = trend.DateArr;

      var theme:any
      var tooltipBackground:any

      if (localStorage.getItem("theme") == "dark-theme"||localStorage.getItem("theme") == "dark-theme")
      {
        theme = '#FFFFFF'
        tooltipBackground = 'rgba(50,50,50,0.7)'
      }else  if (localStorage.getItem("theme") == "light-theme"||localStorage.getItem("theme") == "light-theme")
      {
      theme = '#797979'
      tooltipBackground = 'rgba(255, 255, 255, 1)'
      }
      this.options = {
        tooltip: {
          backgroundColor: tooltipBackground,
          textStyle:{ color: theme,},
           trigger: 'axis',
           position: ['10%', '10%']
         },
        grid: {
          bottom:"18%"
        },
        xAxis: {
            type: 'category',
            data: this.DateArr,
            axisLabel: { interval: 0, rotate: 90, color: theme },
        },
        yAxis:   {
          type: 'value',
          scale: true,
          name: 'Total Flow Ml',
          nameTextStyle: { color: theme},
          boundaryGap: [0.2, 0.2],
          min: 0,
          axisLabel: { rotate: 90, color: theme},
      },
      series: [ {
      name: 'Pumpstation Total Flow',
      data: this.CHE_PS_700_TF_arr,
      type: 'bar',
  },
  {
    name: 'Motherwell 760 mm Total Flow',
      data: this.CHE_PS_760_MM_TF_arr,
      type: 'bar',
  },
  {
    name: 'Motherwell 900 mm Total Flow',
      data: this.CHE_PS_900_MM_TF_arr,
      type: 'bar',
  },{
    name: 'Motherwell Walker Drive Offtake 500 mm',
    data: this.CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr,
    type: 'bar',
  }]




    }

    this.isLoading = false;
    })
  //   this.rs.GET_CHEL_TotalFlow().subscribe(data => {
  //     trend=data
  //     this.CHE_PS_700_TF_arr = trend.CHE_PS_700_TF_arr
  //     this.CHE_PS_760_MM_TF_arr = trend.CHE_PS_760_MM_TF_arr
  //     this.CHE_PS_900_MM_TF_arr = trend.CHE_PS_900_MM_TF_arr
  //     this.CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr = trend.CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr
  //     this.DateArr = trend.DateArr;
  //     var theme:any
  //     var tooltipBackground:any

  //     if (localStorage.getItem("theme") == "dark-theme"||localStorage.getItem("theme") == "dark-theme")
  //     {
  //       theme = '#FFFFFF'
  //       tooltipBackground = 'rgba(50,50,50,0.7)'
  //     }else  if (localStorage.getItem("theme") == "light-theme"||localStorage.getItem("theme") == "light-theme")
  //     {
  //     theme = '#797979'
  //     tooltipBackground = 'rgba(255, 255, 255, 1)'
  //     }
  //     this.options = {
  //       tooltip: {
  //         backgroundColor: tooltipBackground,
  //         textStyle:{ color: theme,},
  //          trigger: 'axis',
  //          position: ['10%', '10%']
  //        },
  //       grid: {
  //         bottom:"18%"
  //       },
  //       xAxis: {
  //           type: 'category',
  //           data: this.DateArr,
  //           axisLabel: { interval: 0, rotate: 90, color: theme },
  //       },
  //       yAxis:   {
  //         type: 'value',
  //         scale: true,
  //         name: 'Total Flow Ml',
  //         nameTextStyle: { color: theme},
  //         boundaryGap: [0.2, 0.2],
  //         min: 0,
  //         axisLabel: { rotate: 90, color: theme},
  //     },
  //     series: [ {
  //     name: 'Pumpstation Total Flow',
  //     data: this.CHE_PS_700_TF_arr,
  //     type: 'bar',
  // },
  // {
  //   name: 'Motherwell 760 mm Total Flow',
  //     data: this.CHE_PS_760_MM_TF_arr,
  //     type: 'bar',
  // },
  // {
  //   name: 'Motherwell 900 mm Total Flow',
  //     data: this.CHE_PS_900_MM_TF_arr,
  //     type: 'bar',
  // },{
  //   name: 'Motherwell Walker Drive Offtake 500 mm',
  //   data: this.CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr,
  //   type: 'bar',
  // }]




  //   }



  // })
}
onDateFilter(){
  this.isLoading = true;
  var start = this.range.value.start+'';
  var end = this.range.value.end+'';

 var startARR = start.toString().split(" ")
 var endARR = end.toString().split(" ")


 switch (startARR[1]) {
  case "Jan":
    startARR[1] = "1"
      break;
      case "Feb":
        startARR[1] = "2"
          break;
          case "Mar":
            startARR[1] = "3"
              break;
              case "Apr":
                startARR[1] = "4"
                  break;
                  case "May":
                    startARR[1] = "5"
                      break;
                      case "Jun":
                        startARR[1] = "6"
                          break;
                          case "Jul":
                            startARR[1] = "7"
                              break;
                              case "Aug":
                                startARR[1] = "8"
                                  break;
                                  case "Sep":
                                    startARR[1] = "9"
                                      break;
                                      case "Oct":
                                        startARR[1] = "10"
                                          break;
                                          case "Nov":
                                            startARR[1] = "11"
                                              break;
                                              case "Dec":
                                                startARR[1] = "12"
                                                  break;
                                                }
switch (endARR[1]) {
  case "Jan":
    endARR[1] = "1"
      break;
      case "Feb":
        endARR[1] = "2"
          break;
          case "Mar":
            endARR[1] = "3"
              break;
              case "Apr":
                endARR[1] = "4"
                  break;
                  case "May":
                    endARR[1] = "5"
                      break;
                      case "Jun":
                        endARR[1] = "6"
                          break;
                          case "Jul":
                            endARR[1] = "7"
                              break;
                              case "Aug":
                                endARR[1] = "8"
                                  break;
                                  case "Sep":
                                    endARR[1] = "9"
                                      break;
                                      case "Oct":
                                        endARR[1] = "10"
                                          break;
                                          case "Nov":
                                            endARR[1] = "11"
                                              break;
                                              case "Dec":
                                                endARR[1] = "12"
                                                  break;
                                                }

if (startARR[1].length==1){
startARR[1] = "0" + startARR[1]
}

if (endARR[1].length==1){
endARR[1] = "0" + endARR[1]
}


var newStart = startARR[3] +"-"+startARR[1]+"-"+startARR[2]
var newEnd = endARR[3] +"-"+endARR[1]+"-"+endARR[2]

console.log(newStart)
console.log(newEnd)

var trend :any;

//this.rs.GET_CHEL_Total_Flows_Dates(newStart, newEnd).subscribe(data => {

  this.pt.getPostTrend("CHEL_TF_TREND", this.chelseaTrendTag,newStart,newEnd).then((data) => {


trend=data

this.CHE_PS_700_TF_arr = trend.TotalFlowArr[0]
this.CHE_PS_760_MM_TF_arr = trend.TotalFlowArr[1]
this.CHE_PS_900_MM_TF_arr = trend.TotalFlowArr[2]
this.CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr =  trend.TotalFlowArr[3]
this.DateArr = trend.DateArr;
var theme:any
var tooltipBackground:any;

if (localStorage.getItem("theme") == "dark-theme"||localStorage.getItem("theme") == "dark-theme")
{
theme = '#FFFFFF'
tooltipBackground = 'rgba(50,50,50,0.7)'
}else  if (localStorage.getItem("theme") == "light-theme"||localStorage.getItem("theme") == "light-theme")
{
theme = '#797979'
tooltipBackground = 'rgba(255, 255, 255, 1)'
}

this.options = {
tooltip: {
  backgroundColor: tooltipBackground,
  textStyle:{ color: theme,},
   trigger: 'axis',
   position: ['10%', '10%']
 },
grid: {
  bottom:"18%"
},

xAxis: {
    type: 'category',
    data: this.DateArr,
    axisLabel: { interval: 0, rotate: 90, color: theme },
},
yAxis:   {
  type: 'value',
  scale: true,
  name: 'Total Flow Ml',
  nameTextStyle: { color: theme},
  boundaryGap: [0.2, 0.2],
  min: 0,
  axisLabel: { rotate: 90, color: theme},
},
series: [ {
  name: 'Pumpstation Total Flow',
  data: this.CHE_PS_700_TF_arr,
  type: 'bar',
},
{
name: 'Motherwell 760 mm Total Flow',
  data: this.CHE_PS_760_MM_TF_arr,
  type: 'bar',
},
{
name: 'Motherwell 900 mm Total Flow',
  data: this.CHE_PS_900_MM_TF_arr,
  type: 'bar',
},{
name: 'Motherwell Walker Drive Offtake 500 mm',
data: this.CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr,
type: 'bar',
}]
};

this.isLoading = false;
})


}





ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}



}
