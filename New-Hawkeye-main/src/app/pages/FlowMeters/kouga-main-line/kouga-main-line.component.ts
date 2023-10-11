import { Component, OnInit } from '@angular/core';
import {jeffreysBay} from 'src/app/Service-Files/FPT/fpt.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-kouga-main-line',
  templateUrl: './kouga-main-line.component.html',
  styleUrls: ['./kouga-main-line.component.css']
})
export class KougaMainLineComponent implements OnInit {

  variable:any = {
  comms:null,
  ons_para_ut:null,
  ons_para_battery_level:null,
  ons_para_TF:null,
  ons_para_last_seen:null,
  kou_main_line_ut:null,
    kou_main_line_battery_level:null,
    kou_main_line_pressure:null,
    kou_main_line_last_seen:null,
    kou_comms:null,
    ons_comms:null,
  }

    data:any=[]
    intervalLoop:any
    options: EChartsOption;
 TotalFlowArr: any[]=[];
 DateArr: any[]=[];

  tagArr:any=[
  "ons_para_ut",
  "ons_para_battery_level",
  "ons_para_TF",
  "ons_para_last_seen",
  "kou_main_line_ut",
  "kou_main_line_battery_level",
  "kou_main_line_pressure",
  "kou_main_line_last_seen",
]

collectionName: any = "ONS_PARA_TOTAL_FLOW"
trendTag: any = ["ons_para_TF"]
  constructor(private ws: WebSocketService,private route:jeffreysBay,public rs: ReportService, public recieve:Common,private pm:pagePostMethod,private pt: PostTrend ) {
    this.isLoading = true;

    this.pm.findPageData("jeffreys_bay", "FPT_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
      this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


      this.variable.ons_comms = Common.getLastUpdateBattery(this.variable.ons_para_ut,this.variable.ons_para_last_seen)

      this.variable.kou_comms = Common.getLastUpdateBattery(this.variable.kou_main_line_ut,this.variable.kou_main_line_last_seen)




   })

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

        this.TotalFlowArr = trend.TotalFlowArr[0];
        this.DateArr = trend.DateArr;
        var theme:any
        var tooltipBackground:any;
        this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","",this.TotalFlowArr);
        this.isLoading = false;
})

  }
  isLoading: boolean = false;
  ngOnInit() {
    var tagVals:any=[]


    tagVals = this.recieve.recieveNonMVals(this.tagArr);


    this.intervalLoop = setInterval(() =>{
		  console.log(tagVals)

      this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);
      this.variable.ons_comms = Common.getLastUpdateBattery(this.variable.ons_para_ut,this.variable.ons_para_last_seen)

      this.variable.kou_comms = Common.getLastUpdateBattery(this.variable.kou_main_line_ut,this.variable.kou_main_line_last_seen)



    },60000)

    var trend :any;


    this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
      trend=data

            this.TotalFlowArr = trend.TotalFlowArr[0];
            this.DateArr = trend.DateArr;



//console.log(this.userService.theme)
this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","",this.TotalFlowArr)
this.isLoading = false;
          })
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
