import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/Service-Files/report.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';

export interface PeriodicElement{
  alarm: string;
  description: string;
}


@Component({
  selector: 'app-driftsands',
  templateUrl: './driftsands.component.html',
  styleUrls: ['./driftsands.component.css']
})
export class DriftsandsComponent implements OnInit {
 drift_r_alarm_armed:any;
 drift_r_pepper_spray_armed:any;
 faultVariable:any={
 drift_r_room_alarm: {
  value: null,
alarm:"Fault",
description:"Room Alarm",
  alarmTrip: 1
},
 drift_r_solar_alarm:{
  value: null,
alarm:"Fault",
description:"Solar Alarm",
  alarmTrip: 1
},
 drift_r_door_alarm: {
  value: null,
alarm:"Fault",
description:"Room Door Alarm",
  alarmTrip: 1
},

 drift_r_pepper_spray_alarm: {
  value: null,
alarm:"Fault",
description:"Pepper Spray Alarm",
  alarmTrip: 1
},
 }
 drift_r_pepper_spray_gas_left:any;
 drift_r_pepper_spray_battery_voltage:any;
 drift_r_reservoir_level:any;
 drift_r_flow_rate_1:any;
 drift_r_flow_rate_2:any;
 drift_r_total_flow_1:any;
 drift_r_total_flow_2:any;
 drift_r_ut:any;
  comms: any;
  data:any=[]

  generalfaulttable: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttabledatasource: any = new MatTableDataSource(this.generalfaulttable)
  intervalLoop: any;


  tagArr:any=[
    'drift_r_ut',//0
   'drift_r_alarm_armed',//1
   'drift_r_room_alarm',//2
   'drift_r_solar_alarm',//3
   'drift_r_door_alarm',//4
   'drift_r_pepper_spray_armed',//5
   'drift_r_pepper_spray_alarm',//6
   'drift_r_pepper_spray_gas_left',//7
   'drift_r_pepper_spray_battery_voltage',//8
   'drift_r_reservoir_level',//9
   'drift_r_flow_rate_1',//10
   'drift_r_flow_rate_2',//11
   'drift_r_total_flow_1',//12
   'drift_r_total_flow_2',//13



  ]

  variable:any = {
    drift_r_ut:null,
    drift_r_alarm_armed:null,
    drift_r_room_alarm:null,
    drift_r_solar_alarm:null,
    drift_r_door_alarm:null,
    drift_r_pepper_spray_armed:null,
    drift_r_pepper_spray_alarm:null,
    drift_r_pepper_spray_gas_left:null,
    drift_r_pepper_spray_battery_voltage:null,
    drift_r_reservoir_level:null,
    drift_r_flow_rate_1:null,
    drift_r_flow_rate_2:null,
    drift_r_total_flow_1:null,
    drift_r_total_flow_2:null,


  }

  faultArr:any=[
    "drift_r_room_alarm",
"drift_r_solar_alarm",
"drift_r_door_alarm",
"drift_r_pepper_spray_alarm",
  ]



  siteTitle:any = "Driftsands";
  trendTag:any = ["drift_r_reservoir_level","drift_r_flow_rate_1", "drift_r_flow_rate_2"]
  tfTrendTag:any = ["drift_r_total_flow_1","drift_r_total_flow_2"]
  collectionName:any ="NMB_DRIFT_RES_LVL"
  tfCollectionName:any ="NMB_DRIFT_TOTAL_FLOW"
  levelArr: any[]=[];
  range:any
  options: EChartsOption;
  options2:EChartsOption;
  isLoading:boolean = true;

  recieveDate($event: any){
    this.isLoading = true
   var trend :any;
   this.range = $event;

   const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

  this.pt.getFlowAndTotalFlowCollection(this.tfCollectionName, this.collectionName , this.tfTrendTag, this.trendTag, start, end ).then((data) => {

    trend = data;


    this.options = this.recieve.getOptionsBarAndLine2("Flow Rate 1", trend.FlowRateArr[1],"Flow Rate 2", trend.FlowRateArr[2],"Total Flow 1", trend.TotalFlowArr[0],"Total Flow 2", trend.TotalFlowArr[1],"Ml","l/s")
    this.options2 = Common.getOptionsForLine(this.options2,"Level %", trend.FlowRateArr[0])

    this.isLoading = false;
  })

 }



  constructor( public rs: ReportService, public us: UsersService,public recieve:Common ,private pm:pagePostMethod, private pt: PostTrend) { }



  ngOnInit() {



    this.pm.findPageData("nmbm_drift_res", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.comms = Common.getLastUpdate(this.variable.drift_r_ut)
     var alarm: any[] = [this.faultVariable.drift_r_door_alarm, this.faultVariable.drift_r_solar_alarm, this.faultVariable.drift_r_room_alarm,this.faultVariable.drift_r_pepper_spray_alarm  ]

     this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm));

    });


  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
}

