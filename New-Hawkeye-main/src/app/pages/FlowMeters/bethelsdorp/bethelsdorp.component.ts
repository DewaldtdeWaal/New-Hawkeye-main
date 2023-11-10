import { Component, Injectable, OnInit } from '@angular/core';
import { BethelsdorpService } from 'src/app/Service-Files/bethelsdorp.service';
import { MatTableDataSource } from '@angular/material/table';
import { ListeningService} from 'src/app/listening.service';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { UsersService } from 'src/app/Service-Files/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';

import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';

@Component({
  selector: 'app-bethelsdorp',
  templateUrl: './bethelsdorp.component.html',
  styleUrls: ['./bethelsdorp.component.css']
})

@Injectable({ providedIn: "root"})
export class BethelsdorpComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  isLoading: boolean = false;
  variable:any = {
  beth_ut:null,
  beth_totalflow:null,
  beth_flowrate:null,
  beth_pressure:null,
  beth_battery_status:null,
  comms: null,
  }

   tagArr:any=[
    "beth_totalflow", //0
    "beth_flowrate", //1
    "beth_pressure", //2
    "beth_battery_status", //3
    "beth_ut", //4

  ]

  options: EChartsOption;
  TotalFlow_BETH_Arr:any[];
  DateArr: any;
  theme: any = localStorage.getItem("theme");
  data:any=[]
  intervalLoop: any;
  constructor(public rs: ReportService, public us: UsersService, public recieve:Common,private pm:pagePostMethod,private pt: PostTrend  ) {




   }

   collectionName: any = "FPT_BETH_TF"
   trendTag: any = ["totalFlow"]
  ngOnInit() {



    this.intervalLoop = this.pm.findPageData("nmbm_beth_fpt", "FPT_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


     this.variable.comms = Common.getLastUpdate(this.variable.beth_ut)

    });





      var trend: any = {};

      this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
        this.isLoading = true;
        trend=data
      this.TotalFlow_BETH_Arr = trend.TotalFlowArr[0].differences;


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

          this.options = Common.getOptions(this.options,this.DateArr,"Total Flow Ml","Bethelsdorp Total Flow",this.TotalFlow_BETH_Arr)


          this.isLoading = false;

      })


    }

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

  this.pt.getPostTrend(this.collectionName, this.trendTag,newStart,newEnd).then((data) => {
    this.isLoading = true;

    trend=data
  this.TotalFlow_BETH_Arr = trend.TotalFlowArr[0].differences;
    this.DateArr = trend.DateArr;
    console.log(this.TotalFlow_BETH_Arr)

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

  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow Ml","Bethelsdorp Total Flow",this.TotalFlow_BETH_Arr)
  this.isLoading = false;
  })


    }
    ngOnDestroy():void{
      if(this.intervalLoop){
        this.intervalLoop.unsubscribe();

      }
    }


  }
