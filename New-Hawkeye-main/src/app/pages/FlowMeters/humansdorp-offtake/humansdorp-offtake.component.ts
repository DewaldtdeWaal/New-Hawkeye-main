import { Component, OnInit } from '@angular/core';
import {jeffreysBay} from 'src/app/Service-Files/FPT/fpt.service'
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';

//TrendPircker
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
@Component({
  selector: 'app-humansdorp-offtake',
  templateUrl: './humansdorp-offtake.component.html',
  styleUrls: ['./humansdorp-offtake.component.css']
})
export class HumansdorpOfftakeComponent implements OnInit {

  variable:any = {
humansdorp_off_take_battery_level:null,
humansdorp_off_take_ut:null,
humansdorp_off_take_pressure:null,
humansdorp_off_TF:null,
humansdorp_off_take_last_seen:null,
comms:null,
  }
data:any=[]
  intervalLoop:any;
  options: EChartsOption;

 TotalFlowArr: any[]=[];
 DateArr: any[]=[];

  tagArr:any=[
  "humansdorp_off_take_battery_level",
  "humansdorp_off_take_ut",
  "humansdorp_off_take_pressure",
  "humansdorp_off_TF",
  "humansdorp_off_take_last_seen"

]

  constructor(private route:jeffreysBay, private ws: WebSocketService,public rs: ReportService, public recieve:Common ) {
    this.route.GetSiteValues()
    .subscribe(rsp => {
      this.data = rsp;
      this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)

      this.variable.comms = Common.getLastUpdateBattery(this.variable.humansdorp_off_take_ut,this.variable.humansdorp_off_take_last_seen)


    })


   }

     range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  onDateFilter(){
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

var trend :any;

this.rs.Post_HumanDorpTrend_Sites(newStart, newEnd).subscribe(data => {
  trend=data

        this.TotalFlowArr = trend.TotalFlowArr;
        this.DateArr = trend.DateArr;
        var theme:any
        var tooltipBackground:any;

console.log(localStorage.getItem("theme"))
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
    name: 'Total Flow m³',
    nameTextStyle: { color: theme},
    boundaryGap: [0.2, 0.2],
    min: 0,
    axisLabel: {  rotate: 90, color: theme},
},
  series: [{
      data: this.TotalFlowArr,
      type: 'bar',
      color: "rgb(89, 105, 128)"
  }]
};

      })
}

  ngOnInit() {
    var tagVals:any=[]

    tagVals = this.recieve.recieveNonMVals(this.tagArr);


    this.intervalLoop = setInterval(() =>{

      this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);
      this.variable.comms = Common.getLastUpdateBattery(this.variable.humansdorp_off_take_ut,this.variable.humansdorp_off_take_last_seen)


    },60000)


    var trend :any;


    this.rs.GetHumanDorpTrend_Sites().subscribe(data => {
      trend=data
            this.TotalFlowArr = trend.TotalFlowArr;
            this.DateArr = trend.DateArr;

            var theme:any
            var tooltipBackground:any;

//console.log(this.userService.theme)
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
                name: 'Total Flow m³',
                nameTextStyle: { color: theme},
                boundaryGap: [0.2, 0.2],
                min: 0,
                axisLabel: {  rotate: 90, color: theme},
            },
              series: [{
                  data: this.TotalFlowArr,
                  type: 'bar',
                  color: "rgb(89, 105, 128)"
              }]
            };

          })
  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
