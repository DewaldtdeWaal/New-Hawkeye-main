import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/Service-Files/report.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import * as echarts from 'echarts';
import { UsersService } from 'src/app/Service-Files/users.service';
import {FMT} from 'src/app/Service-Files/FPT/fmtower.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';

type EChartsOption = echarts.EChartsOption;
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-fm-tower',
  templateUrl: './fm-tower.component.html',
  styleUrls: ['./fm-tower.component.css']
})
export class FMTowerComponent implements OnInit {
  fmt_FM_UT:any
  fmt_FM_GAS_L:any
  fmt_FM_BATTERY_V:any
  fmt_FM_TF:any
  fmt_FM_PRESS:any
  fmt_FM_FR:any
  fmt_FM_LOW_B:any
  fmt_FM_ALM_ARMD:any
  fmt_FM_PEPPER_S_ARMD:any
  fmt_FM_PEPPER_S_ALM:any

  intervalLoop: any
 TotalFlowArr: any[]=[];
 DateArr: any[]=[];

  PS_ALM:any
  PS_ARMD:any
  G_ALM: any
B_STAT: any




myChart:any;
theme:any
  ELEMENT_DATA_ALM: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];
  dataSourceALM:any;
  comms: string;
  data: any=[];
  faultVariable:any={
  fmt_FM_CHAMBER_TAMP: {
    value: null,
  alarm:"Fault",
  description:"Chamber Tamper",
    alarmTrip: 1
  },
  fmt_FM_SOLAR_PANEL_TAMP: {
    value: null,
  alarm:"ALARM",
  description:"Panel Tamper",
    alarmTrip: 1
  },
  fmt_FM_DOOR_OPENED: {
    value: null,
  alarm:"Fault",
  description:"Door Opened",
    alarmTrip: 1
  }
}
  variable:any = {
    fmt_FM_UT:null,
    fmt_FM_FR:null,
    fmt_FM_GAS_L:null,
    fmt_FM_BATTERY_V:null,
    fmt_FM_TF:null,
    fmt_FM_ALM_ARMD:null,
    fmt_FM_CHAMBER_TAMP:null,
    fmt_FM_DOOR_OPENED:null,
    fmt_FM_LOW_B:null,
    fmt_FM_PEPPER_S_ALM:null,
    fmt_FM_PEPPER_S_ARMD:null,
    fmt_FM_SOLAR_PANEL_TAMP:null,
    fmt_FM_PRESS:null,
}


tagArr:any = [
  "fmt_FM_UT",
  "fmt_FM_FR",
  "fmt_FM_GAS_L",
  "fmt_FM_BATTERY_V",
  "fmt_FM_TF",
  "fmt_FM_ALM_ARMD",
  "fmt_FM_LOW_B",
  "fmt_FM_PEPPER_S_ALM",
  "fmt_FM_PEPPER_S_ARMD",
  "fmt_FM_PRESS",

]
faultArr:any=[
  "fmt_FM_CHAMBER_TAMP",
"fmt_FM_SOLAR_PANEL_TAMP",
"fmt_FM_DOOR_OPENED",
]

  constructor(private pt: PostTrend,public rs: ReportService, public recieve:Common,private pm:pagePostMethod ) {
  



  }

  siteTitle:any = "FM Tower"
  range:any;
  options1: EChartsOption;
  options2:EChartsOption;
  tfCollection:any = "FM_FMT_TF";
  collection:any = "FM_FMT_TREND";
  totalFlowTags :any = ["totalflow"]
  flowTags :any = ["flowRate", "pressure"]
  isLoading: boolean = true;

  options2Name:string = "Pressure Data"
  recieveDate($event: any){
    var trend :any;
    this.range = $event;
    this.isLoading = true;
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collection,this.totalFlowTags,this.flowTags,start,end).then((data) => {

      trend = data;

      this.options1 = Common.getOptionsBarAndLine(this.options1,"Flow Rate Ml/d",trend.FlowRateArr[0],"Total Flow Ml",trend.TotalFlowArr[0]);
      this.options2 = Common.getOptionsForLine(this.options2,"Pressure Bar",trend.FlowRateArr[1])
      this.isLoading = false;


    })

  }


  ngOnInit() {

    this.intervalLoop = this.pm.findPageData("nmbm_fmt_fm", "FPT_CurrentVals").subscribe((result) => {
      this.data =  result;
      
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.comms = Common.getLastUpdate(this.variable.fmt_FM_UT)
      var alarm1: any [] = [this.faultVariable.fmt_FM_CHAMBER_TAMP,this.faultVariable.fmt_FM_SOLAR_PANEL_TAMP,this.faultVariable.fmt_FM_DOOR_OPENED]

      this.dataSourceALM= new MatTableDataSource(Common.getAlarmValue(alarm1))

   })





}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
}
