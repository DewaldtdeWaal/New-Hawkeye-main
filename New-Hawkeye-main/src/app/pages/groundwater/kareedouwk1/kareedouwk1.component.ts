import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {GroundwaterService} from 'src/app/Service-Files/GRDW/groundwater.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-kareedouwk1',
  templateUrl: './kareedouwk1.component.html',
  styleUrls: ['./kareedouwk1.component.css']
})
export class Kareedouwk1Component implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  options: EChartsOption;
  intervalLoop: any



  theme: any = localStorage.getItem("theme");
  DateArr: any;
  data:any = []
  generalfaulttable: PeriodicElement[] = [];

  variable:any = {
    gw_kark_k1_UT: null,
gw_kark_k1_level: null,
gw_kark_k1_run_hours: null,
gw_kark_k1_flow_rate: null,
gw_kark_k1_total_flow: null,
gw_kark_k1_current: null,
gw_kark_k1_mode: null,
gw_kark_k1_status: null,
gw_kark_k1_run_time_remaining: null,
gw_kark_k1_rest_time_remaining: null,
comms: null,
  }








generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);

displayedColumns :string[]= ['alarm', 'description'];



  showKark1:any;
  showKark2:any;


  public authListenerSubs!: Subscription;
  userSites:string[];

   tagArr:any=[
    "gw_kark_k1_UT",//0
    "gw_kark_k1_level",//1
    "gw_kark_k1_run_hours",//2
    "gw_kark_k1_flow_rate",//3
    "gw_kark_k1_total_flow",//4
    "gw_kark_k1_current",//5
    "gw_kark_k1_mode",//6
    "gw_kark_k1_status",//7
    "gw_kark_k1_run_time_remaining",//8
    "gw_kark_k1_rest_time_remaining",//9


 ]

 faultArr:any=[
  "gw_kark_k1_estop",
  "gw_kark_k1_vsd_fault",
  "gw_kark_k1_voltage_ok",
  "gw_kark_k1_panel_door_open",
  "gw_kark_k1_low_flow_fault",
  "gw_kark_k1_charger_ok",
  "gw_kark_k1_borehol_low_level_fault",
  "gw_kark_k1_surge_arrester_ok",
  "gw_kark_k1_warning_level",
  "gw_kark_k1_room_alarm",
  "gw_kark_k1_flow_comms",
 ]


  faultVariable:any={
  gw_kark_k1_estop: {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  gw_kark_k1_vsd_fault:{
    value: null,
  alarm:"Fault",
  description:"VSD Fault",
    alarmTrip: 1
  },
  gw_kark_k1_voltage_ok:{
    value: null,
  alarm:"Fault",
  description:"Voltage Not Ok",
    alarmTrip: 0
  },
  gw_kark_k1_panel_door_open:{
    value: null,
  alarm:"Fault",
  description:"Panel Door Open",
    alarmTrip: 1
  },
  gw_kark_k1_low_flow_fault:  {
    value: null,
  alarm:"Fault",
  description:"Low Flow Fault",
    alarmTrip: 1
  },
  gw_kark_k1_charger_ok:  {
    value: null,
  alarm:"Fault",
  description:"Charger Not OK",
    alarmTrip: 0
  },
  gw_kark_k1_borehol_low_level_fault:{
    value: null,
  alarm:"Fault",
  description:"Low Level Fault",
    alarmTrip: 1
  },
  gw_kark_k1_surge_arrester_ok:  {
    value: null,
  alarm:"Fault",
  description:"Surge Arrester Not Ok",
    alarmTrip: 0
  },
  gw_kark_k1_warning_level:{
    value: null,
    alarm: "Fault",
    description:"Warning Level Active",
    alarmTrip:1
  },
  gw_kark_k1_room_alarm:{
    value: null,
    alarm: "Fault",
    description:"Room Alarm",
    alarmTrip:1
  },
  gw_kark_k1_flow_comms:{
    value:null,
    alarm: "Fault",
    description:"Flow Comms Failure"
  }

  }
  total_flow_KARK_K1_array:any;


  constructor( public rs: ReportService,private authService: AuthService,public recieve:Common,private pm:pagePostMethod,private pt: PostTrend ) {

    this.isLoading = true;





  }



  collectionName:any ="KARK_K1_TOTAL_FLOW"
  trendTag:any = ["gw_kark_k1_total_flow"]

  ngOnInit(){

    this.intervalLoop = this.pm.findPageData("nmbm_kark_gw", "GRDW_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)

      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.gw_kark_k1_UT);

       var alarmG:any []=[this.faultVariable.gw_kark_k1_estop, this.faultVariable.gw_kark_k1_vsd_fault, this.faultVariable.gw_kark_k1_voltage_ok, this.faultVariable.gw_kark_k1_panel_door_open,this.faultVariable.gw_kark_k1_low_flow_fault,this.faultVariable.gw_kark_k1_charger_ok,this.faultVariable.gw_kark_k1_borehol_low_level_fault,this.faultVariable.gw_kark_k1_surge_arrester_ok,this.faultVariable.gw_kark_k1_warning_level,this.faultVariable.gw_kark_k1_room_alarm]

     this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))
    });


    this.showKark1 = "false";
    this.showKark2 = "false";


    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "KOU_KARK_R":
          this.showKark1 = "true";
          break;

      case "KOU_KARK2_GW":
        this.showKark2 = "true";
        break;

      }
    }




var trend: any = {};
//this.rs.Get_KARK_K1_TotalFlows().subscribe(data => {

  this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
  trend=data
  this.total_flow_KARK_K1_array =  trend.TotalFlowArr[0].differences;

  this.DateArr = trend.DateArr;


    this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_KARK_K1_array)
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

  this.total_flow_KARK_K1_array =  trend.TotalFlowArr[0].differences;
  this.DateArr = trend.DateArr;


  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_KARK_K1_array);

  this.isLoading = false
  })


  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
