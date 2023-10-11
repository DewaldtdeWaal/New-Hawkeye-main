import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/Service-Files/report.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import * as echarts from 'echarts';
import { UsersService } from 'src/app/Service-Files/users.service';
import { ListeningService } from 'src/app/listening.service';
import { EChartsOption } from 'echarts';
import {Gamtoos} from 'src/app/Service-Files/FPT/gamtoos.service'
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-gamtoos-bridge',
  templateUrl: './gamtoos-bridge.component.html',
  styleUrls: ['./gamtoos-bridge.component.css']
})
export class GamtoosBridgeComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  variable:any = {
  fpt_gt_brg_ut:null,
  fpt_gt_brg_stl_p_press:null,
  fpt_gt_brg_soco_p_press:null,
  fpt_gt_brg_stl_p_fr:null,
  fpt_gt_brg_stl_p_tf:null,
  fpt_gt_brg_soco_p_fr:null,
  fpt_gt_brg_soco_p_tf:null,
  fpt_gt_brg_panel_door:null,
  fpt_gt_brg_battery:null,
  fpt_gt_brg_steal_p_press_analog_s:null,
  fpt_gt_brg_soco_p_press_analog_s:null,
  fpt_gt_brg_fm_stl_p_comms_s:null,
  fpt_gt_brg_fm_soco_p_comms_s:null,
  comms:null,
  }

  options: EChartsOption;
  intervalLoop: any


  TotalFlow_STL_Arr: any[];
  TotalFlow_SOCO_Arr: any[];
  DateArr: any;
  data:any=[]

   tagArr:any=[
    "fpt_gt_brg_ut",//0
    "fpt_gt_brg_stl_p_press",//1
    "fpt_gt_brg_soco_p_press",//2
    "fpt_gt_brg_stl_p_fr",//3
    "fpt_gt_brg_stl_p_tf",//4
    "fpt_gt_brg_soco_p_fr",//5
    "fpt_gt_brg_soco_p_tf",//6
    "fpt_gt_brg_panel_door",//7
    "fpt_gt_brg_battery",//8
    "fpt_gt_brg_steal_p_press_analog_s",//9
    "fpt_gt_brg_soco_p_press_analog_s",//10
    "fpt_gt_brg_fm_stl_p_comms_s",//11
    "fpt_gt_brg_fm_soco_p_comms_s",//12

  ]
  constructor(public rs: ReportService,public us: UsersService, public ls:ListeningService, public recieve:Common ,private pm:pagePostMethod,private pt: PostTrend) {

    this.isLoading = true;


    this.pm.findPageData("nmbm_gt_brg_fpt", "FPT_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
      this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
      this.variable.comms = Common.getLastUpdate(this.variable.fpt_gt_brg_ut)




   })

  }

  collectionName: any = "FPT_GT_BRG_TFs"
  trendTag: any = ["steel_pipe_TF", "socoman_pipe_TF"]
  ngOnInit(){
    var tagVals:any=[]

    tagVals = this.recieve.recieveNMBMVals(this.tagArr);



    this.intervalLoop = setInterval(() =>{


      this.pm.findPageData("nmbm_gt_brg_fpt", "FPT_CurrentVals").then((result) => {
        this.data =  result;
        console.log(this.data)
        this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
        this.variable.comms = Common.getLastUpdate(this.variable.fpt_gt_brg_ut)




     })

      },60000)

    var trend :any;
  //  this.rs.Get_GT_BRG_Total_Flows().subscribe(data => {

      this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
      trend=data
      this.TotalFlow_STL_Arr = trend.TotalFlowArr[0];
        this.TotalFlow_SOCO_Arr = trend.TotalFlowArr[1];
        this.DateArr = trend.DateArr;
            var theme:any
            var tooltipBackground:any;

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
                name: 'Total Flow ML',
                nameTextStyle: { color: theme},
                boundaryGap: [0.2, 0.2],
                min: 0,
                axisLabel: {  rotate: 90, color: theme},
            },
              series: [
                {
                name: 'Steel Pipe Total Flow',
                  data: this.TotalFlow_STL_Arr,
                  type: 'bar',
              },
              {
                name: 'Socoman Pipe Total Flow',
                  data: this.TotalFlow_SOCO_Arr,
                  type: 'bar',
              }
            ]
            };
            this.isLoading = false;
          })



      }

      isLoading: boolean = false;
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

this.pt.getPostTrend(this.collectionName, this.trendTag,newEnd,newStart).then((data) => {
  trend=data

        this.TotalFlow_STL_Arr = trend.TotalFlow_STL_Arr;
        this.TotalFlow_SOCO_Arr = trend.TotalFlow_SOCO_Arr;
        this.DateArr = trend.DateArr;
        var theme:any
        var tooltipBackground:any;

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
    name: 'Total Flow ML',
    nameTextStyle: { color: theme},
    boundaryGap: [0.2, 0.2],
    min: 0,
    axisLabel: {  rotate: 90, color: theme},
},
  series: [
    {
    name: 'Steel Pipe Total Flow',
      data: this.TotalFlow_STL_Arr,
      type: 'bar',

  },
  {
    name: 'Socoman Pipe Total Flow',
      data: this.TotalFlow_SOCO_Arr,
      type: 'bar',

  }
]
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
