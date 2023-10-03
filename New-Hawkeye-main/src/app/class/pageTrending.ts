import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable({  providedIn: 'root'})

export class totalFlowTrend{
  options:EChartsOption;
  data: any=[];







  public onDateFilter(getTrendMethod:any,  TotalFlowArr: any[]=[], DateArr: any[]=[], START:any, END:any){
    var start = START;
    var end =END;

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

getTrendMethod(newStart, newEnd).subscribe((data: any) => {
  trend=data

        TotalFlowArr = trend.TotalFlowArr;
        DateArr = trend.DateArr;
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
      data: DateArr,
      axisLabel: { interval: 0, rotate: 90, color: theme },
  },
  yAxis:   {
    type: 'value',
    scale: true,
    name: 'Total Flow',
    nameTextStyle: { color: theme},
    boundaryGap: [0.2, 0.2],
    min: 0,
    axisLabel: {  rotate: 90, color: theme},
},
  series: [{
      data: TotalFlowArr,
      type: 'bar',
      color: "rgb(89, 105, 128)"
  }]
};

      })
}
}


