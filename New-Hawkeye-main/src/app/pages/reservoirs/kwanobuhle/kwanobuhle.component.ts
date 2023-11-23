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
  selector: 'app-kwanobuhle',
  templateUrl: './kwanobuhle.component.html',
  styleUrls: ['./kwanobuhle.component.css']
})
export class KwanobuhleComponent implements OnInit {


  kwano_r_alarm_armed:any;

  kwano_r_ut:any;
  kwano_r_solar_alarm:any;
  kwano_r_door_alarm:any;
  kwano_r_pepper_spray_armed:any;
  kwano_r_pepper_spray_alarm:any;
  kwano_r_pepper_spray_gas_left:any;
  kwano_r_pepper_spray_battery_voltage:any;
  kwano_r_reservoir_level:any;
  kwano_r_flow_rate_1:any;
  kwano_r_flow_rate_2:any;
  kwano_r_total_flow_1:any;
  kwano_r_total_flow_2:any;
   comms: any;
   data:any=[]

   generalfaulttable: PeriodicElement[] = [];
   displayedColumns :string[]= ['alarm', 'description'];
   generalfaulttabledatasource: any = new MatTableDataSource(this.generalfaulttable)
   intervalLoop: any;


   faultVariable:any={
   kwano_r_solar_alarm: {
    value: null,
    alarm:"Fault",
    description:"Solar Alarm",
    alarmTrip: 1
 },



kwano_r_pepper_spray_alarm: {
  value: null,
  alarm:"Fault",
  description:"Pepper Spray Alarm",
  alarmTrip: 1
},

kwano_r_door_alarm: {
value: null,
alarm:"Fault",
description:"Room Door Alarm",
alarmTrip: 1
},
   }

   faultArr:any=[]

   tagArr:any=[
    "kwano_r_alarm_armed",
"kwano_r_ut",
"kwano_r_pepper_spray_armed",
"kwano_r_pepper_spray_gas_left",
"kwano_r_pepper_spray_battery_voltage",
"kwano_r_reservoir_level",
"kwano_r_flow_rate_1",
"kwano_r_flow_rate_2",
"kwano_r_total_flow_1",
"kwano_r_total_flow_2",
   ]

   variable:any ={
    kwano_r_alarm_armed:null,
    kwano_r_ut:null,
    kwano_r_pepper_spray_armed:null,
    kwano_r_pepper_spray_gas_left:null,
    kwano_r_pepper_spray_battery_voltage:null,
    kwano_r_reservoir_level:null,
    kwano_r_flow_rate_1:null,
    kwano_r_flow_rate_2:null,
    kwano_r_total_flow_1:null,
    kwano_r_total_flow_2:null,


   }

  constructor(public rs: ReportService, public us: UsersService,public recieve:Common ,private pm:pagePostMethod, private pt: PostTrend)
  {




   }



   siteTitle:any = "Kwanobuhle";

   levelArr: any[]=[];
   range:any
   options1: EChartsOption;
   options2: EChartsOption;
   isLoading:boolean = true;
   tfCollection:any = "NMB_KWANO_R_TF"
   collection:any = "NMB_KWANO_R"
   totalFlowTags:any =["kwano_r_total_flow_1","kwano_r_total_flow_2"]
   flowTags:unknown = ["kwano_r_flow_rate_1","kwano_r_flow_rate_2","kwano_r_reservoir_level"] 
   recieveDate($event: any){
    this.isLoading = true
    var trend :any;
    this.range = $event;
 
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)
 
    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collection,this.totalFlowTags,this.flowTags,start,end).then((data) => {
      trend = data;
      
   this.options1 = this.recieve.getOptionsBarAndLine2("Flow Rate 1 ", trend.FlowRateArr[0],"Flow Rate 2 ",trend.FlowRateArr[1],"Total Flow 1 Ml", trend.TotalFlowArr[0],"Total Flow 2 Ml", trend.TotalFlowArr[1],"Ml","")

   this.options2 = Common.getOptionsForLine(this.options2,"Level %", trend.FlowRateArr[2])
    this.isLoading = false;

    })
  }



  ngOnInit() {



    this.intervalLoop = this.pm.findPageData("nmbm_kwano_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;
       
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      var alarm1: any [] = [this.faultVariable.kwano_r_solar_alarm,this.faultVariable.kwano_r_pepper_spray_alarm,this.faultVariable.kwano_r_door_alarm ]
      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.comms = Common.getLastUpdate(this.variable.kwano_r_ut)
    });
  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


}
