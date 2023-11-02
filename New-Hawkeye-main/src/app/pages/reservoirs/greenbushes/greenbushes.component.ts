import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {GreenBushesService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-greenbushes',
  templateUrl: './greenbushes.component.html',
  styleUrls: ['./greenbushes.component.css']
})
export class GreenbushesComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  options: EChartsOption;
  theme:any;
  DateArr: any;
    gb_R_FR:any
    gb_RL:any
    intervalLoop: any
    gb_R_FRF:any
    gb_R_FRR:any
    gb_R_SURGE_ARRESTOR:any
    gb_R_CHARGER_STATUS:any
    gb_R_DOOR:any
    gb_R_UT:any
    gb_R_LVL:any
  comms: string;
  data:any=[]
  TotalFlow_GB_FRR_Arr: any[];
  TotalFlow_GB_FRF_Arr: any[];

  variable :any= {

    gb_R_FR:null,
    gb_R_FRF:null,
    gb_R_FRR:null,
    gb_R_SURGE_ARRESTOR:null,
    gb_R_CHARGER_STATUS:null,
    gb_R_DOOR:null,
    gb_R_UT:null,
    gb_R_LVL:null,


  }

  tagArr:any=[
    "gb_R_FR",
    "gb_R_FRF",
    "gb_R_FRR",
    "gb_R_SURGE_ARRESTOR",
    "gb_R_CHARGER_STATUS",
    "gb_R_DOOR",
    "gb_R_UT",
    "gb_R_LVL",

  ]
  constructor( public rs: ReportService,public recieve:Common,private pm:pagePostMethod,private pt: PostTrend, ) {

    this.isLoading = true;

    this.intervalLoop = this.pm.findPageData("nmbm_gb_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.comms = Common.getLastUpdate(this.variable.gb_R_UT)
    });

   }
   trendTag:any =["gb_R_FRR","gb_R_FRF"]
   collectionName:any = "BR_GB_RES_LVL_TF"
   isLoading: boolean = false;
  ngOnInit() {



    // setInterval(() =>{
    //   this.pm.findPageData("nmbm_gb_r", "R_CurrentVals").subscribe((result) => {
    //     this.data =  result;

    //     console.log(this.data)
    //    this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    //   this.comms = Common.getLastUpdate(this.variable.gb_R_UT)
    //   });
    // },60000);

    var trend: any = {};
   // this.rs.Get_GB_TotalFlows().subscribe(data => {

      this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
      trend=data
      this.TotalFlow_GB_FRR_Arr = trend.TotalFlowArr[0];
      this.TotalFlow_GB_FRF_Arr = trend.TotalFlowArr[1];


      this.DateArr = trend.DateArr;
        var theme:any
        var tooltipBackground:any

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
            name: 'Total Flow Ml',
            nameTextStyle: { color: theme},
            boundaryGap: [0.2, 0.2],
            min: 0,
            axisLabel: { rotate: 90, color: theme},
        },
          series: [

          {
            name: 'Greenbushes Reverse Flow Rate',
              data: this.TotalFlow_GB_FRR_Arr,
              type: 'bar',
          },
          {
            name: 'Greenbushes Forward Flow Rate',
              data: this.TotalFlow_GB_FRF_Arr,
              type: 'bar',
          }
        ]
        };
        this.isLoading = false;
    })
      };
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
      this.TotalFlow_GB_FRR_Arr = trend.TotalFlowArr[0];
      this.TotalFlow_GB_FRF_Arr = trend.TotalFlowArr[1];
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
        name: 'Total Flow Ml',
        nameTextStyle: { color: theme},
        boundaryGap: [0.2, 0.2],
        min: 0,
        axisLabel: { rotate: 90, color: theme},
    },
    series: [

      {
        name: 'Greenbushes Reverse Flow Rate',
          data: this.TotalFlow_GB_FRR_Arr,
          type: 'bar',
      },
      {
        name: 'Greenbushes Forward Flow Rate',
          data: this.TotalFlow_GB_FRF_Arr,
          type: 'bar',
      }
    ]
    };
    this.isLoading = false;
    })


      }

      ngOnDestroy():void{
        if(this.intervalLoop){
          this.intervalLoop.unsubscribe();

        }
      }

  }






