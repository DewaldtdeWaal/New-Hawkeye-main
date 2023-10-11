import { Component, OnInit } from '@angular/core';
import {jeffreysBay} from 'src/app/Service-Files/FPT/fpt.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common'
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-jeffreys-bay-off-take',
  templateUrl: './jeffreys-bay-off-take.component.html',
  styleUrls: ['./jeffreys-bay-off-take.component.css']
})
export class JeffreysBayOffTakeComponent implements OnInit {

  variable:any = {
  jeff_bay_off_take_battery_level:null,
  jeff_bay_off_take_last_update:null,
  jeff_bay_off_take_total_flow:null,
  jeff_bay_off_take_last_seen:null,
  comms:null,
  }
  isLoading: boolean = false;
  options: EChartsOption;

  TotalFlowArr: any[]=[];
  DateArr: any[]=[];
  data:any=[]
  intervalLoop: any;

   tagArr:any=[
    "jeff_bay_off_take_battery_level",
    "jeff_bay_off_take_last_update",
    "jeff_bay_off_take_total_flow",
    "jeff_bay_off_take_last_seen",]

  constructor(private ws: WebSocketService,private route:jeffreysBay,public rs: ReportService, public recieve:Common,private pm:pagePostMethod ,private pt: PostTrend) {
    this.isLoading = true;

    this.pm.findPageData("jeffreys_bay", "FPT_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
      this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


      this.variable.comms = Common.getLastUpdateBattery(this.variable.jeff_bay_off_take_last_update,this.variable.jeff_bay_off_take_last_seen)


      this.isLoading = false;

   })

   }
   range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  collectionName: any = "JEFF_BAY_TAKE_OFF"
  trendTag: any = ["jeff_bay_off_take_total_flow"]

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

var trend :any;

this.pt.getPostTrend(this.collectionName, this.trendTag,newStart,newEnd).then((data) => {
  trend=data
        this.TotalFlowArr = trend.TotalFlowArr[0];
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

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{


      this.pm.findPageData("jeffreys_bay", "FPT_CurrentVals").then((result) => {
        this.data =  result;
        console.log(this.data)
        this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data)


        this.variable.comms = Common.getLastUpdateBattery(this.variable.jeff_bay_off_take_last_update,this.variable.jeff_bay_off_take_last_seen)




     })
    },60000)

    var trend :any;


    this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
      trend=data
            this.TotalFlowArr = trend.TotalFlowArr[0];
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
            this.isLoading = false;
          })
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
