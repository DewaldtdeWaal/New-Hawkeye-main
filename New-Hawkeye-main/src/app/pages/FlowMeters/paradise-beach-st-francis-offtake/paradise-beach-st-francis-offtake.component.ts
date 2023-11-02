import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/Service-Files/report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common'
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-paradise-beach-st-francis-offtake',
  templateUrl: './paradise-beach-st-francis-offtake.component.html',
  styleUrls: ['./paradise-beach-st-francis-offtake.component.css']
})
export class ParadiseBeachStFrancisOfftakeComponent implements OnInit {

  variable:any = {
  jb_PB_SFO_ut:null,
  jb_PB_SFO_battery_level:null,
  jb_ST_Francis_OffTake_Total_Flow:null,
  jb_Para_Bea_TF:null,
  jb_PB_SFO_last_seen:null,
  comms:null,
  }
  data:any=[]
  intervalLoop:any
  jb_ST_Francis_OffTake_Total_Flow_Arr :any[]=[];
  jb_Para_Bea_TF_Arr:any[]=[];
 DateArr: any[]=[];
 options: EChartsOption;

  tagArr:any=[
  "jb_PB_SFO_ut",
  "jb_PB_SFO_battery_level",
  "jb_ST_Francis_OffTake_Total_Flow",
  "jb_Para_Bea_TF",
  "jb_PB_SFO_last_seen"

]
  constructor(public rs: ReportService, public recieve:Common,private pm:pagePostMethod,private pt: PostTrend ) {




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

this.pt.getPostTrend(this.collectionName, this.trendTag,newEnd,newStart).then((data) => {
  trend=data
        this.jb_ST_Francis_OffTake_Total_Flow_Arr = trend.TotalFlowArr[0]
        this.jb_Para_Bea_TF_Arr = trend.TotalFlowArr[1]
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
  name: 'St Francis',
    data: this.jb_ST_Francis_OffTake_Total_Flow_Arr,
    type: 'bar',

},{
  name: 'Paradise Beach',
  data: this.jb_Para_Bea_TF_Arr,
  type: 'bar',

}]
};

      })
}
collectionName:any ="JB_PB_SFO_TOTAL_FLOW"
trendTag:any = ["jb_ST_Francis_OffTake_Total_Flow","jb_Para_Bea_TF"]
isLoading: boolean = false;
  ngOnInit() {
    var tagVals:any=[]

    tagVals = this.recieve.recieveNonMVals(this.tagArr);

    this.intervalLoop = this.pm.findPageData("jeffreys_bay", "FPT_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
      this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

      this.variable.comms = Common.getLastUpdateBattery(this.variable.jb_PB_SFO_ut,this.variable.jb_PB_SFO_last_seen)



   })
    var trend :any;


    //this.rs.Get_PBSFO_Trend_Sites().subscribe(data => {

      this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
      trend=data
            this.jb_ST_Francis_OffTake_Total_Flow_Arr = trend.TotalFlowArr[0]
            this.jb_Para_Bea_TF_Arr = trend.TotalFlowArr[1]
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
                name: 'St Francis',
                  data: this.jb_ST_Francis_OffTake_Total_Flow_Arr,
                  type: 'bar',

              },{
                name: 'Paradise Beach',
                data: this.jb_Para_Bea_TF_Arr,
                type: 'bar',

            }]
            };

          })

}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
}
