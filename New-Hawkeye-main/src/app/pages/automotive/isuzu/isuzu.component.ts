import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Common } from 'src/app/class/common';
import {IsuzuService} from 'src/app/Service-Files/Automotive/automotive.service'
import {ReportService} from 'src/app/Service-Files/report.service'
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';

@Component({
  selector: 'app-isuzu',
  templateUrl: './isuzu.component.html',
  styleUrls: ['./isuzu.component.css']
})
export class IsuzuComponent implements OnInit {
  comms: string;

ovenOne: EChartsOption;
ovenTwo: EChartsOption;

DateArr: any[]=[];
data:any = []
 ISUZU_OVEN1_TEMP1_arr: any[]=[]
 ISUZU_OVEN1_TEMP2_arr: any[]=[]
 ISUZU_OVEN2_TEMP2_arr: any[]=[]
 ISUZU_OVEN2_TEMP1_arr: any[]=[]

 ISUZU_OVEN1_VSD_SPEED_arr: any[]=[]
 ISUZU_OVEN2_VSD_SPEED_arr: any[]=[]

 ISUZU_OVEN1_HEAT_ECVH_TEMP_arr:any[]=[]
ISUZU_OVEN2_HEAT_ECVH_TEMP_arr: any[]=[]
  isuzu_ut: any;
  isuzu_oven2_temp2: any;
  isuzu_oven2_temp1: any;
  isuzu_oven2_heat_ecvh_temp: any;
  isuzu_oven2_vsd_speed: any;
  isuzu_oven1_temp2: any;
  isuzu_oven1_temp1: any;
  isuzu_oven1_heat_ecvh_temp: any;
  isuzu_oven1_vsd_speed: any;
  theme: string | null;
  intervalLoop: any;
  updateloop:any

  constructor(private ws: WebSocketService,public rs:ReportService, public is:IsuzuService,public recieve:Common  ) {
    this.is.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
    this.isuzu_ut = this.data.routingArray[0].isuzu_ut;
    this.comms = Common.getLastUpdate(this.isuzu_ut)
    this.isuzu_oven1_vsd_speed = this.data.routingArray[0].isuzu_oven1_vsd_speed
    this.isuzu_oven1_heat_ecvh_temp = this.data.routingArray[0].isuzu_oven1_heat_ecvh_temp
    this.isuzu_oven1_temp1 = this.data.routingArray[0].isuzu_oven1_temp1
    this.isuzu_oven1_temp2 = this.data.routingArray[0].isuzu_oven1_temp2
    this.isuzu_oven2_vsd_speed = this.data.routingArray[0].isuzu_oven2_vsd_speed
    this.isuzu_oven2_heat_ecvh_temp = this.data.routingArray[0].isuzu_oven2_heat_ecvh_temp
    this.isuzu_oven2_temp1 = this.data.routingArray[0].isuzu_oven2_temp1
    this.isuzu_oven2_temp2 = this.data.routingArray[0].isuzu_oven2_temp2







   });



  this.Event0();
}


Event0(){

  var trend :any;
  var array = ['isuzu_oven1_temp1','isuzu_oven1_temp2','isuzu_oven2_temp1','isuzu_oven2_temp2',"isuzu_oven1_heat_ecvh_temp","isuzu_oven2_heat_ecvh_temp", "isuzu_oven1_vsd_speed", "isuzu_oven2_vsd_speed"]

  this.rs.GetIsuzuTrendData(array).subscribe(data => {
    trend=data
          this.ISUZU_OVEN1_TEMP1_arr = trend.ISUZU_OVEN1_TEMP1_arr
          this.ISUZU_OVEN1_TEMP2_arr = trend.ISUZU_OVEN1_TEMP2_arr
          this.ISUZU_OVEN2_TEMP1_arr = trend.ISUZU_OVEN2_TEMP1_arr
          this.ISUZU_OVEN2_TEMP2_arr = trend.ISUZU_OVEN2_TEMP2_arr
          this.ISUZU_OVEN1_HEAT_ECVH_TEMP_arr = trend.ISUZU_OVEN1_HEAT_ECVH_TEMP_arr
          this.ISUZU_OVEN2_HEAT_ECVH_TEMP_arr = trend.ISUZU_OVEN2_HEAT_ECVH_TEMP_arr
          this.ISUZU_OVEN1_VSD_SPEED_arr = trend.ISUZU_OVEN1_VSD_SPEED_arr
          this.ISUZU_OVEN2_VSD_SPEED_arr = trend.ISUZU_OVEN2_VSD_SPEED_arr



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

          this.ovenOne = {
            tooltip: {
              backgroundColor: tooltipBackground,
              textStyle:{ color: theme,},
               trigger: 'axis',
               position: ['10%', '10%']
             },
             legend: {
              textStyle: {color:theme },
             },
            grid: {
              bottom:"18%"
            },
            xAxis: {
              type: 'time',
            // data: this.DateArr,
              splitLine: {
                show: true,

              },
              axisLabel: {  color: theme },
          },
          yAxis: {
            type: 'value',

            axisLabel: {  rotate: 60, color: theme },


          },
            series: [{
                name: "Temperature 1",
                data: this.ISUZU_OVEN1_TEMP1_arr,
                type: 'line',
                smooth: true,
                showSymbol: false,

            },{
              name: "Temperature 2",
              data: this.ISUZU_OVEN1_TEMP2_arr,
              type: 'line',
              smooth: true,
              showSymbol: false,
            },{
              name: "Heat Exchange",
              data: this.ISUZU_OVEN1_HEAT_ECVH_TEMP_arr,
              type: 'line',
              smooth: true,
              showSymbol: false,
          },{
            name: "VSD Speed",
            data: this.ISUZU_OVEN1_VSD_SPEED_arr,
            type: 'line',
            smooth: true,
            showSymbol: false,
        }]
          };

          this.ovenTwo = {
            tooltip: {
              backgroundColor: tooltipBackground,
              textStyle:{ color: theme,},
               trigger: 'axis',
               position: ['10%', '10%']
             },
             legend: {
              textStyle: {color:theme },
             },
            grid: {
              bottom:"18%"
            },
            xAxis: {
              type: 'time',
            // data: this.DateArr,
              splitLine: {
                show: true,

              },
              axisLabel: {  color: theme },
          },
          yAxis: {
            type: 'value',
            axisLabel: {  rotate: 60, color: theme },
          },
            series: [{
            name: "Temperature 1",
            data: this.ISUZU_OVEN2_TEMP1_arr,
            type: 'line',
            smooth: true,
            showSymbol: false,
        },{
          name: "Temperature 2",
          data: this.ISUZU_OVEN2_TEMP2_arr,
          type: 'line',
          smooth: true,
          showSymbol: false,
      },{
        name: "Heat Exchange",
        data: this.ISUZU_OVEN2_HEAT_ECVH_TEMP_arr,
        type: 'line',
        smooth: true,
        showSymbol: false,
    } ,{
      name: "VSD Speed",
      data: this.ISUZU_OVEN2_VSD_SPEED_arr,
      type: 'line',
      smooth: true,
      showSymbol: false,
  }]
          };

        })

};

  ngOnInit() {



    var tagVals:any =[]
    var tagArr=[
      "isuzu_ut",
      "isuzu_oven1_vsd_speed",
      "isuzu_oven1_heat_ecvh_temp",
      "isuzu_oven1_temp1",
      "isuzu_oven1_temp2",
      "isuzu_oven2_vsd_speed",
      "isuzu_oven2_heat_ecvh_temp",
      "isuzu_oven2_temp1",
      "isuzu_oven2_temp2",
    ]

    tagVals = this.recieve.recieveNonMVals(tagArr);
    var updateTemp:any;

    this.intervalLoop = setInterval(() =>{

      updateTemp = tagVals[0];

      if(updateTemp !==undefined){
     this.isuzu_ut = tagVals[0]
     this.isuzu_oven1_vsd_speed = tagVals[1]
     this.isuzu_oven1_heat_ecvh_temp = tagVals[2]
     this.isuzu_oven1_temp1 = tagVals[3]
     this.isuzu_oven1_temp2 = tagVals[4]
     this.isuzu_oven2_vsd_speed = tagVals[5]
     this.isuzu_oven2_heat_ecvh_temp = tagVals[6]
     this.isuzu_oven2_temp1 = tagVals[7]
     this.isuzu_oven2_temp2 = tagVals[8]


    }
    this.comms = Common.getLastUpdate(this.isuzu_ut)
    },60000)


    this.updateloop = setInterval(() =>{


      this.Event0();
    },600000)

  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }

    if(this.updateloop){
      clearInterval(this.updateloop);
    }
  }

}
