import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {ChelseaService} from 'src/app/Service-Files/Reservoir/chelsea.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import { Common } from 'src/app/class/common';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-chelsea',
  templateUrl: './chelsea.component.html',
  styleUrls: ['./chelsea.component.css']
})
export class ChelseaComponent implements OnInit {
  intervalLoop: any
  data:any = []
  variable :any= {
  che_r_ut:null,
  che_r_fr1100:null,
  che_r_fr600:null,
  che_r_lvl:null,
  comms: null,
  che_r_lvl_East:null,
  che_r_tf1100:null,
che_r_tf600:null,
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  CHE_R_TF1100_arr: any[]
CHE_R_TF600_arr: any[]
DateArr: any;

  showNavigationButton: string;
  userSites:string[];
  public authListenerSubs!: Subscription;

   tagArr:any =[
    'che_r_ut',//0
    'che_r_lvl_East',//1
    'che_r_lvl',//2
    'che_r_fr1100',//3
    'che_r_fr600',//4
    "che_r_tf1100",
    "che_r_tf600"

  ]
  constructor(public rs: ReportService,private ws: WebSocketService,private ls:ListeningService,private che: ChelseaService,private userService: UsersService,private authService: AuthService,public recieve:Common ,private pm:pagePostMethod) {



   this.pm.findPageData("nmbm_che_ps_res", "PS_CurrentVals").then((result) => {
    this.data =  result;

    console.log(this.data)
   this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data)


  this.variable.comms = Common.getLastUpdate(this.variable.che_r_ut)
  });

    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_CHE_PS":
          this.showNavigationButton = "true";
          break;
      }




   }


  }

  options: EChartsOption;


  ngOnInit() {

    var tagVals:any=[]


    tagVals = this.recieve.recieveNMBMVals(this.tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{

      this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);
      this.variable.comms = Common.getLastUpdate(this.variable.che_r_ut)



 },60000)



 var trend: any = {};
 this.rs.GET_CHEL_RES_TotalFlow().subscribe(data => {
   trend=data
   this.CHE_R_TF1100_arr = trend.CHE_R_TF1100_arr
   this.CHE_R_TF600_arr = trend.CHE_R_TF600_arr


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
   series: [ {
   name: 'Summit 1200 mm',
   data: this.CHE_R_TF1100_arr,
   type: 'bar',
},
{
 name: 'Greenbushes 600 mm',
   data: this.CHE_R_TF600_arr,
   type: 'bar',
},
   ]




 }



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

  this.rs.GET_CHEL_RES_Total_Flows_Dates(newStart, newEnd).subscribe(data => {
  trend=data

  this.CHE_R_TF1100_arr = trend.CHE_R_TF1100_arr
  this.CHE_R_TF600_arr = trend.CHE_R_TF600_arr
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
  series: [ {
    name: 'Summit 1200 mm',
    data: this.CHE_R_TF1100_arr,
    type: 'bar',
 },
 {
  name: 'Greenbushes 600 mm',
    data: this.CHE_R_TF600_arr,
    type: 'bar',
 },
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
