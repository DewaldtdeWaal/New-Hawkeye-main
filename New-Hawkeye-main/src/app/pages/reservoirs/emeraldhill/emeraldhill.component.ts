import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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


  constructor(public recieve:Common,public rs: ReportService,private pm:pagePostMethod,private pt: PostTrend ) {
  


    this.intervalLoop = this.pm.findPageData("nmbm_emer_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.comms = Common.getLastUpdate(this.variable.emer_ut)
       var alarm: any [] =[this.faultVariable.bateryLow, this.faultVariable.chargerOk]

      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm))

    });
   }




  ngOnInit() {


}


  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


  siteTitle:any = "Emerald Hill";
  trendTag:any = ["level","emer_flow_rate"]
  tfTrendTag:any = ["emer_total_flow"]
  collectionName:any ="NMB_EMER_H_RES_LVL"
  tfCollectionName:any ="NMB_EMER_H_TOTAL_RES_LVL"
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

    this.options = Common.getOptionsBarAndLine(this.options,"Flow Rate Ml/d",trend.FlowRateArr[1],"Total Flow Ml", trend.TotalFlowArr[0] )

    this.options2 = Common.getOptionsForLine(this.options2,"Level %", trend.FlowRateArr[0])
    this.isLoading = false;
  })

 }
}
