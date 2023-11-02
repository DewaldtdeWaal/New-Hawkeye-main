import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/Service-Files/report.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import * as echarts from 'echarts';
import { UsersService } from 'src/app/Service-Files/users.service';
import { ListeningService } from 'src/app/listening.service';
import {CoegaIDZT} from 'src/app/Service-Files/FPT/coegaidzt.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';



type EChartsOption = echarts.EChartsOption;
export interface PeriodicElement {
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-coega-idz-t',
  templateUrl: './coega-idz-t.component.html',
  styleUrls: ['./coega-idz-t.component.css']
})
export class CoegaIDZTComponent implements OnInit {
  generalfaulttable: PeriodicElement[] = [];
  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);

  fpt_cidzt_ut:any


  intervalLoop: any

  fpt_cidzt_panel_door:any
  fpt_cidzt_battery:any

  fpt_cidzt_idz_fm_s:any
  fpt_cidzt_mw_fm_s:any

  fpt_cidzt_idz_fr:any
  fpt_cidzt_idz_tf:any

  fpt_cidzt_mw_fr:any
  fpt_cidzt_mw_tf:any

  panel_door_stat:any
  battery_stat:any

  ELEMENT_DATA_G: PeriodicElement[] = [];

  options: EChartsOption;
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceG:any  = new MatTableDataSource(this.ELEMENT_DATA_G);
  comms: string;

  TotalFlowIDZArr: any[]=[];
  TotalFlowMWArr: any[]=[];
  DateArr: any[]=[];
  data: any=[];

  variable:any = {
        fpt_cidzt_ut:null,
        fpt_cidzt_surge_arrester_fault:null,
        fpt_cidzt_charger_fault:null,
        fpt_cidzt_panel_door:null,
        fpt_cidzt_battery:null,
        fpt_cidzt_idz_fm_s:null,
        fpt_cidzt_mw_fm_s:null,
        fpt_cidzt_idz_fr:null,
        fpt_cidzt_idz_tf:null,
        fpt_cidzt_mw_fr:null,
        fpt_cidzt_mw_tf:null,
  }

  faultVariable:any={
  fpt_cidzt_surge_arrester_fault: {
    value: null,
  alarm:"Fault",
  description:"Surge Arrester",
    alarmTrip: 1
  },
  fpt_cidzt_charger_fault: {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 0
  }
}

  tagArr:any = [
    'fpt_cidzt_ut',//0


    'fpt_cidzt_panel_door',//3
    'fpt_cidzt_battery',//4
    'fpt_cidzt_idz_fm_s',//5
    'fpt_cidzt_mw_fm_s',//6
    'fpt_cidzt_idz_fr',//7
    'fpt_cidzt_idz_tf',//8
    'fpt_cidzt_mw_fr',//9
    'fpt_cidzt_mw_tf',//10
    "panel_door_stat",
    "battery_stat",
  ]

  faultArr:any=[

    "fpt_cidzt_charger_fault",
    'fpt_cidzt_surge_arrester_fault',//1

  ]
  constructor(public rs: ReportService, public recieve:Common,private pm:pagePostMethod,private pt: PostTrend ) {
    this.isLoading = true;





  }

  collectionName:any ="FPT_IDZT_TFs"
trendTag:any =["motherwell_TF","idz_TF"]

isLoading: boolean = false;
  ngOnInit(){

    this.intervalLoop = this.pm.findPageData("nmbm_cidzt_fpt", "FPT_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.comms = Common.getLastUpdate(this.variable.fpt_cidzt_ut)

       var alarm1: any [] = [this.faultVariable.fpt_cidzt_surge_arrester_fault,this.faultVariable.fpt_cidzt_charger_fault]

       this.generalfaultdatasource= new MatTableDataSource(Common.getAlarmValue(alarm1))



   })


    var trend :any;



      this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {


      trend=data


            this.TotalFlowMWArr =  trend.TotalFlowArr[0];
            this.TotalFlowIDZArr =  trend.TotalFlowArr[1];
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
                  name: 'IDZ',
                    data: this.TotalFlowIDZArr,
                    type: 'bar',

                },
                {
                  name: 'Motherwell',
                    data: this.TotalFlowMWArr,
                    type: 'bar',

                }
            ]
            };
            this.isLoading = false;
          })
  }



  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

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

  this.TotalFlowMWArr =  trend.TotalFlowArr[0];
  this.TotalFlowIDZArr =  trend.TotalFlowArr[1];
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
    name: 'IDZ',
      data: this.TotalFlowIDZArr,
      type: 'bar',
  },
  {
    name: 'Motherwell',
      data: this.TotalFlowMWArr,
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
