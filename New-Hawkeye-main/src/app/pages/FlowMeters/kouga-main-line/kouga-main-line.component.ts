import { Component, OnInit } from '@angular/core';
import {jeffreysBay} from 'src/app/Service-Files/FPT/fpt.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { Common } from 'src/app/class/common';
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
  constructor(private ws: WebSocketService,private route:jeffreysBay,public rs: ReportService, public recieve:Common ) {
    this.route.GetSiteValues()
    .subscribe(rsp => {
      this.data = rsp;
      this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)


      this.variable.ons_comms = Common.getLastUpdateBattery(this.variable.ons_para_ut,this.variable.ons_para_last_seen)

      this.variable.kou_comms = Common.getLastUpdateBattery(this.variable.kou_main_line_ut,this.variable.kou_main_line_last_seen)


    })

   }

   range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });



  onDateFilter(){

    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

var trend :any;

this.rs.Post_ONS_Trend_Sites(newStart, newEnd).subscribe(data => {
  trend=data

        this.TotalFlowArr = trend.TotalFlowArr;
        this.DateArr = trend.DateArr;
        var theme:any
        var tooltipBackground:any;
        this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","",this.TotalFlowArr)
})

  }
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


    this.rs.Get_ONS_Trend_Sites().subscribe(data => {
      trend=data
            this.TotalFlowArr = trend.TotalFlowArr;
            this.DateArr = trend.DateArr;



//console.log(this.userService.theme)
this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","",this.TotalFlowArr)

          })
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
