import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {emeraldHillService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Common } from 'src/app/class/common';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ReportService } from 'src/app/Service-Files/report.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-emeraldhill',
  templateUrl: './emeraldhill.component.html',
  styleUrls: ['./emeraldhill.component.css']
})
export class EmeraldhillComponent implements OnInit {

  isLoading: boolean = false;
  emer_lvl:any
  comms:any
  emer_ut:any
  data: any=[];
  intervalLoop: any;
  emer_flow_rate: any;
  emer_total_flow: any;
  emer_battery_low: any;
  emer_charger_ok: any;

  generalfaulttable: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttabledatasource: any = new MatTableDataSource(this.generalfaulttable)

  options: EChartsOption;
  faultVariable:any={
  bateryLow: {
    value: null,
    alarm:"Fault",
    description:"Battery Low",
    alarmTrip: 1
 },

 chargerOk: {
  value: null,
  alarm:"Fault",
  description:"Charger Not OK",
  alarmTrip: 1
}}

variable :any= {
  emer_lvl:null,
  emer_ut:null,
  emer_flow_rate:null,
  emer_total_flow:null,
  emer_battery_low:null,
  emer_charger_ok:null,
}

faultArr:any=[
  "bateryLow",
"chargerOk"
]
tagArr:any=[

  "emer_lvl",
  "emer_ut",
  "emer_flow_rate",
  "emer_total_flow",
  "emer_battery_low",
  "emer_charger_ok",
  ]

total_flow_1_array: any[]=[];
DateArr: any[]=[];


  constructor(private emer:emeraldHillService,public recieve:Common,public rs: ReportService,private pm:pagePostMethod,private pt: PostTrend ) {
    this.isLoading = true;


    this.pm.findPageData("nmbm_emer_r", "R_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.comms = Common.getLastUpdate(this.variable.emer_ut)
       var alarm: any [] =[this.faultVariable.bateryLow, this.faultVariable.chargerOk]

      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm))

    });
   }

   collectionName: any = "NMB_EMER_H_TOTAL_RES_LVL"
   trendTag: any = ["emer_total_flow"]



  ngOnInit() {

    this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
      trend=data

      console.log(trend)

      this.total_flow_1_array = trend.TotalFlowArr[0];
      this.DateArr = trend.DateArr;

            this.options = Common.getOptions(this.options,this.DateArr,"Total Flow Ml","Total Flow Ml",this.total_flow_1_array)
            this.isLoading = false;
          })


    this.intervalLoop = setInterval(() =>{
      this.pm.findPageData("nmbm_emer_r", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
        Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

       this.comms = Common.getLastUpdate(this.variable.emer_ut)
         var alarm: any [] =[this.faultVariable.bateryLow, this.faultVariable.chargerOk]

        this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm))

      });


    },60000);
    var trend :any;






}


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  onDateFilter(){
    this.isLoading = true;
    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

    var trend :any;

    this.pt.getPostTrend(this.collectionName, this.trendTag,newStart,newEnd).then((data) => {
      trend=data


      this.total_flow_1_array =trend.TotalFlowArr[0];
            this.DateArr = trend.DateArr;



            this.options = Common.getOptions(this.options,this.DateArr,"Total Flow Ml","Total Flow Ml",this.total_flow_1_array)


            this.isLoading = false;
          })


  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
