import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {GreenBushesService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
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
    gb_FR:any
    gb_RL:any
    intervalLoop: any
    gb_FRF:any
    gb_FRR:any
    gb_SA:any
    gb_CHS:any
    gb_D:any
    gb_UT:any
    res:any
  comms: string;
  data:any=[]
  TotalFlow_GB_FRR_Arr: any[];
  TotalFlow_GB_FRF_Arr: any[];
  constructor(private webSocketService: WebSocketService, private gbs:GreenBushesService,public rs: ReportService,public recieve:Common,private pm:pagePostMethod ) {
    this.gbs.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.gb_FR= this.data.routingArray[0].gb_R_FR
       this.gb_RL= this.data.routingArray[0].gb_R_LVL
       this.gb_FRF= this.data.routingArray[0].gb_R_FRF
       this.gb_FRR= this.data.routingArray[0].gb_R_FRR
       this.gb_SA= this.data.routingArray[0].gb_R_SURGE_ARRESTOR
       this.gb_CHS= this.data.routingArray[0].gb_R_CHARGER_STATUS
       this.gb_D= this.data.routingArray[0].gb_R_DOOR
       this.gb_UT= this.data.routingArray[0].gb_R_UT
       this.comms = Common.getLastUpdate(this.gb_UT)
       this.res= this.data.routingArray[0].gb_R_LVL
    })

   }

  //  recieveVals(tagArr: any[]){
  //   var tagVals:any = []
  //   for(let i = 0; i<tagArr.length ;i++){
  //     this.webSocketService.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
  //       tagVals[i] = data[tagArr[i]];

  //     })
  //   }
  //   return tagVals
  // }

  ngOnInit() {


    var tagVals:any=[]
    var tagArr =[
      'gb_ut',//0
      'gb_fr',//1
      'gb_rl',//2
      'gb_frf',//3
      'gb_frr',//4
      'gb_sa',//5
      'gb_chs',//6
      'gb_d',//7
      'gb_res',//8
    ]
    tagVals = this.recieve.recieveNMBMVals(tagArr);


    var updateTemp:any;
    setInterval(() =>{
        console.log(tagVals)
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){
        this.gb_UT = tagVals[0];
        this.gb_FR=  tagVals[1]
        this.gb_RL=  tagVals[2]
        this.gb_FRF=  tagVals[3]
        this.gb_FRR=  tagVals[4]
        this.gb_SA= tagVals[5]
        this.gb_CHS=  tagVals[6]
        this.gb_D=  tagVals[7]
        this.res =  tagVals[8]

      }

      this.comms = Common.getLastUpdate(this.gb_UT)
    },60000);

    var trend: any = {};
    this.rs.Get_GB_TotalFlows().subscribe(data => {
      trend=data
      this.TotalFlow_GB_FRR_Arr = trend.TotalFlow_GB_FRR_Arr;
      this.TotalFlow_GB_FRF_Arr = trend.TotalFlow_GB_FRF_Arr;
      console.log(this.TotalFlow_GB_FRF_Arr)
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

    })
      };
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

    this.rs.Get_GB_Total_Flows_Dates(newStart, newEnd).subscribe(data => {
      trend=data

      this.TotalFlow_GB_FRR_Arr = trend.TotalFlow_GB_FRR_Arr;
      this.TotalFlow_GB_FRF_Arr = trend.TotalFlow_GB_FRF_Arr;
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
    })


      }

      ngOnDestroy(){
        if(this.intervalLoop){
          clearInterval(this.intervalLoop)
        }
      }

  }






