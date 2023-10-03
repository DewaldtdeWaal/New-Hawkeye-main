import { Component, Injectable, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { EChartsOption } from 'echarts';
import {WesselsService} from 'src/app/Service-Files/Feedlots/wessels.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { Subscription } from 'rxjs';
import { Common } from 'src/app/class/common';
import { FormControl, FormGroup } from '@angular/forms';
const MaterialModule =[
  MatButtonModule
]





@Component({
  selector: 'app-wessels',
  templateUrl: './wessels.component.html',
  styleUrls: ['./wessels.component.css']
})
@Injectable({ providedIn: "root"})
export class WesselsComponent implements OnInit {

  isLoading: boolean = false;
  userSites:string[];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  option: EChartsOption;



  DateArr: any;
  barOptions: EChartsOption;
  siloOptions: EChartsOption;
  SitesList: string[] = [];


public authListenerSubs!: Subscription;
//#region Variables
comms:any
wes1_fl_ut:any;
  wes1_fl_p1_feed_A: any;
  wes1_fl_p1_feed_B: any;
  wes1_fl_p1_feed_C: any;
  wes1_fl_p2_feed_A: any;
  wes1_fl_p2_feed_B: any;
  wes1_fl_p2_feed_C: any;
  wes1_fl_p3_feed_A: any;
  wes1_fl_p3_feed_B: any;
  wes1_fl_p3_feed_C: any;
  wes1_fl_p4_feed_A: any;
  wes1_fl_p4_feed_B: any;
  wes1_fl_p4_feed_C: any;
  wes1_fl_p5_feed_A: any;
  wes1_fl_p5_feed_B: any;
  wes1_fl_p5_feed_C: any;
  wes1_fl_p6_feed_A: any;
  wes1_fl_p6_feed_B: any;
  wes1_fl_p6_feed_C: any;
  wes1_fl_p7_feed_A: any;
  wes1_fl_p7_feed_B: any;
  wes1_fl_p8_feed_A: any;
  wes1_fl_p7_feed_C: any;
  wes1_fl_p8_feed_B: any;
  wes1_fl_p8_feed_C: any;
  wes1_fl_p12_feed_C: any;
  wes1_fl_p12_feed_B: any;
  wes1_fl_p9_feed_A: any;
  wes1_fl_p9_feed_B: any;
  wes1_fl_p11_feed_C: any;
  wes1_fl_p10_feed_C: any;
  wes1_fl_p10_feed_B: any;
  wes1_fl_p9_feed_C: any;
  wes1_fl_p10_feed_A: any;
  wes1_fl_p11_feed_A: any;
  wes1_fl_p12_feed_A: any;
  wes1_fl_p11_feed_B: any;
  wes1_f1_feed_A_total: any;
  wes1_f1_feed_B_total: any;
  wes1_f1_feed_C_total: any;
  wes2_fl_p1_lambs: any;
  wes2_fl_p2_lambs: any;
  wes2_fl_p3_lambs: any;
  wes2_fl_p4_lambs: any;
  wes2_fl_p5_lambs: any;
  wes2_fl_p6_lambs: any;
  wes2_fl_p8_lambs: any;
  wes2_fl_p7_lambs: any;
  wes2_fl_p9_lambs: any;
  wes2_fl_p11_lambs: any;
  wes2_fl_p12_lambs: any;
  wes2_fl_p10_lambs: any;



  wes2_fl_sa_silo_levels: any;
  wes2_fl_sb_silo_levels: any;
  wes2_fl_sc_silo_levels: any;

  TF24_wes1_fl_feed_A_arr: any;
  TF24_wes1_fl_feed_B_arr: any;
  TF24_wes1_fl_feed_C_arr: any;
  TF31_wes1_fl_feed_A_arr: any;
  TF31_wes1_fl_feed_B_arr: any;
  TF31_wes1_fl_feed_C_arr: any;
  intervalLoop:any
  DateArr31: any[]=[];
  trend: any = {};
  L31_wes2_fl_lambs_arr: any;
  showSilos:any
 name24:any
  name32:any
  Silo_A_arr: any;
  Silo_B_arr: any;
  Silo_C_arr: any;
  DateSilo: any;

  data:any=[]

//#endregion



  constructor(public rs: ReportService, private wes :WesselsService,public recieve:Common ) {

    this.wes.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.wes1_fl_ut=this.data.routingArray[0].wes1_fl_ut
       this.wes1_fl_p1_feed_A=this.data.routingArray[0].wes1_fl_p1_feed_A;
       this.wes1_fl_p1_feed_B=this.data.routingArray[0].wes1_fl_p1_feed_B;
       this.wes1_fl_p1_feed_C=this.data.routingArray[0].wes1_fl_p1_feed_C;
       this.wes1_fl_p2_feed_A=this.data.routingArray[0].wes1_fl_p2_feed_A;
       this.wes1_fl_p2_feed_B=this.data.routingArray[0].wes1_fl_p2_feed_B;
       this.wes1_fl_p2_feed_C=this.data.routingArray[0].wes1_fl_p2_feed_C;
       this.wes1_fl_p3_feed_A=this.data.routingArray[0].wes1_fl_p3_feed_A;
       this.wes1_fl_p3_feed_B=this.data.routingArray[0].wes1_fl_p3_feed_B;
       this.wes1_fl_p3_feed_C=this.data.routingArray[0].wes1_fl_p3_feed_C;
       this.wes1_fl_p4_feed_A=this.data.routingArray[0].wes1_fl_p4_feed_A;
       this.wes1_fl_p4_feed_B=this.data.routingArray[0].wes1_fl_p4_feed_B;
       this.wes1_fl_p4_feed_C=this.data.routingArray[0].wes1_fl_p4_feed_C;
       this.wes1_fl_p5_feed_A=this.data.routingArray[0].wes1_fl_p5_feed_A;
       this.wes1_fl_p5_feed_B=this.data.routingArray[0].wes1_fl_p5_feed_B;
       this.wes1_fl_p5_feed_C=this.data.routingArray[0].wes1_fl_p5_feed_C;
       this.wes1_fl_p6_feed_A=this.data.routingArray[0].wes1_fl_p6_feed_A;
       this.wes1_fl_p6_feed_B=this.data.routingArray[0].wes1_fl_p6_feed_B;
       this.wes1_fl_p6_feed_C=this.data.routingArray[0].wes1_fl_p6_feed_C;
       this.wes1_fl_p7_feed_A=this.data.routingArray[0].wes1_fl_p7_feed_A;
       this.wes1_fl_p7_feed_B=this.data.routingArray[0].wes1_fl_p7_feed_B;
       this.wes1_fl_p7_feed_C=this.data.routingArray[0].wes1_fl_p7_feed_C;
       this.wes1_fl_p8_feed_A=this.data.routingArray[0].wes1_fl_p8_feed_A;
       this.wes1_fl_p8_feed_B=this.data.routingArray[0].wes1_fl_p8_feed_B;
       this.wes1_fl_p8_feed_C=this.data.routingArray[0].wes1_fl_p8_feed_C;
       this.wes1_fl_p9_feed_A=this.data.routingArray[0].wes1_fl_p9_feed_A;
       this.wes1_fl_p9_feed_B=this.data.routingArray[0].wes1_fl_p9_feed_B;
       this.wes1_fl_p9_feed_C=this.data.routingArray[0].wes1_fl_p9_feed_C;
       this.wes1_fl_p10_feed_A=this.data.routingArray[0].wes1_fl_p10_feed_A;
       this.wes1_fl_p10_feed_B=this.data.routingArray[0].wes1_fl_p10_feed_B;
       this.wes1_fl_p10_feed_C=this.data.routingArray[0].wes1_fl_p10_feed_C;
       this.wes1_fl_p11_feed_A=this.data.routingArray[0].wes1_fl_p11_feed_A;
       this.wes1_fl_p11_feed_B=this.data.routingArray[0].wes1_fl_p11_feed_B;
       this.wes1_fl_p11_feed_C=this.data.routingArray[0].wes1_fl_p11_feed_C;
       this.wes1_fl_p12_feed_A=this.data.routingArray[0].wes1_fl_p12_feed_A;
       this.wes1_fl_p12_feed_B=this.data.routingArray[0].wes1_fl_p12_feed_B;
       this.wes1_fl_p12_feed_C=this.data.routingArray[0].wes1_fl_p12_feed_C;
       this.wes2_fl_p1_lambs=this.data.routingArray[0].wes2_fl_p1_lambs;
       this.wes2_fl_p2_lambs=this.data.routingArray[0].wes2_fl_p2_lambs;
       this.wes2_fl_p3_lambs=this.data.routingArray[0].wes2_fl_p3_lambs;
       this.wes2_fl_p4_lambs=this.data.routingArray[0].wes2_fl_p4_lambs;
       this.wes2_fl_p5_lambs=this.data.routingArray[0].wes2_fl_p5_lambs;
       this.wes2_fl_p6_lambs=this.data.routingArray[0].wes2_fl_p6_lambs;
       this.wes2_fl_p7_lambs=this.data.routingArray[0].wes2_fl_p7_lambs;
       this.wes2_fl_p8_lambs=this.data.routingArray[0].wes2_fl_p8_lambs;
       this.wes2_fl_p9_lambs=this.data.routingArray[0].wes2_fl_p9_lambs;
       this.wes2_fl_p10_lambs=this.data.routingArray[0].wes2_fl_p10_lambs;
       this.wes2_fl_p11_lambs=this.data.routingArray[0].wes2_fl_p11_lambs;
       this.wes2_fl_p12_lambs=this.data.routingArray[0].wes2_fl_p12_lambs;
       this.wes2_fl_sa_silo_levels=this.data.routingArray[0].wes2_fl_sa_silo_levels;
       this.wes2_fl_sb_silo_levels=this.data.routingArray[0].wes2_fl_sb_silo_levels;
       this.wes2_fl_sc_silo_levels=this.data.routingArray[0].wes2_fl_sc_silo_levels;
       this.wes1_f1_feed_A_total=this.data.routingArray[0].wes1_f1_feed_A_total;
       this.wes1_f1_feed_B_total=this.data.routingArray[0].wes1_f1_feed_B_total;
       this.wes1_f1_feed_C_total=this.data.routingArray[0].wes1_f1_feed_C_total;



       this.comms = Common.getLastUpdate(this.wes1_fl_ut);
      }) ;

      this.Event0();

  }


//#region "Events"





  Event0(){
    this.showSilos=false;
    this.name24= "Total Feed (24 Hour Trend)"
    this.name32="Total Feed (31 Day Trend)"
    this.isLoading=true;
    var trend: any = {};

    var array = ['wes1_f1_feed_A_total','wes1_f1_feed_B_total','wes1_f1_feed_C_total']
    this.rs.Post_Wessels_Total_Feeds(array).subscribe(data => {
      trend=data
      this.TF24_wes1_fl_feed_A_arr = trend.TF24_wes1_fl_feed_A_arr;
      this.TF24_wes1_fl_feed_B_arr = trend.TF24_wes1_fl_feed_B_arr;
      this.TF24_wes1_fl_feed_C_arr = trend.TF24_wes1_fl_feed_C_arr;

     this.TF31_wes1_fl_feed_A_arr = trend.TF31_wes1_fl_feed_A_arr
     this.TF31_wes1_fl_feed_B_arr = trend.TF31_wes1_fl_feed_B_arr
     this.TF31_wes1_fl_feed_C_arr = trend.TF31_wes1_fl_feed_C_arr





      this.DateArr31 = trend.DateArr31;

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


      this.option = {
        tooltip: {
          backgroundColor: tooltipBackground,
          textStyle:{ color: theme,},
           trigger: 'axis',
           position: ['10%', '10%']
         },   legend: {
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
        series: [
          {
          name: 'Feed A Total',
            data: this.TF24_wes1_fl_feed_A_arr,
            type: 'line',
            color: 'rgb(56,91,172)',
            smooth: true,
            showSymbol: false,

        },
                {
             name: 'Feed B Total',
            data: this.TF24_wes1_fl_feed_B_arr,
            type: 'line',
            color: 'rgb(89,189,89)',
            smooth: true,
            showSymbol: false,


        },
        {
          name: 'Feed C Total',
            data: this.TF24_wes1_fl_feed_C_arr,
            type: 'line',
            color: 'rgb(221,169,47)',
            smooth: true,
            showSymbol: false,

        },
      ]
      };
      this.barOptions = {
        tooltip: {
          backgroundColor: tooltipBackground,
          textStyle:{ color: theme,},
           trigger: 'axis',
           position: ['5%', '10%']
         },
        legend: {   textStyle: {color:theme },},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.DateArr31,
            axisLabel: {  color: theme },
          },

        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {  rotate: 60, color: theme },

          }
        ],
        series: [
          {
            name: 'Feed A Total',
            type: 'bar',
            stack: 'Ad',
            color: 'rgb(56,91,172)',
            emphasis: {
              focus: 'series'
            },
            data: this.TF31_wes1_fl_feed_A_arr
          },
          {
            name: 'Feed B Total',
            type: 'bar',
            stack: 'Ad',
            color: 'rgb(89,189,89)',
            emphasis: {
              focus: 'series'
            },
            data: this.TF31_wes1_fl_feed_B_arr
          },
          {
            name: 'Feed C Total',
            type: 'bar',
            stack: 'Ad',
            color: 'rgb(221,169,47)',
            emphasis: {
              focus: 'series'
            },
            data: this.TF31_wes1_fl_feed_C_arr
          },

        ]
      };
      this.isLoading=false;
    })





  }
 Event1( lot:any){
  this.showSilos=false;
   var i:any;
   var array:any
   var trend: any = {};
   this.isLoading=true;
   for(i = 1;  i < 13; i++)
 array = ["wes1_fl_p"+lot+"_feed_A","wes1_fl_p"+lot+"_feed_B","wes1_fl_p"+lot+"_feed_C","wes2_fl_p"+lot+"_lambs"]
 this.name24= "Feedlot "+lot+" (24 Hour Trend)"
 this.name32="Feedlot "+lot+" (31 Day Trend)"






  this.rs.Post_Wessels_Total_Feeds(array).subscribe((data: any) => {
    trend=data
    this.TF24_wes1_fl_feed_A_arr = trend.TF24_wes1_fl_feed_A_arr;
    this.TF24_wes1_fl_feed_B_arr = trend.TF24_wes1_fl_feed_B_arr;
    this.TF24_wes1_fl_feed_C_arr = trend.TF24_wes1_fl_feed_C_arr;
    this.TF31_wes1_fl_feed_A_arr = trend.TF31_wes1_fl_feed_A_arr;
    this.TF31_wes1_fl_feed_B_arr = trend.TF31_wes1_fl_feed_B_arr;
    this.TF31_wes1_fl_feed_C_arr = trend.TF31_wes1_fl_feed_C_arr;
    this.L31_wes2_fl_lambs_arr = trend.L31_wes2_fl_lambs_arr;
    this.DateArr31 = trend.DateArr31;


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

  this.option = {
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
       trigger: 'axis',
       position: ['10%', '10%']
     },   legend: {
      textStyle: {color:theme },
     },
    grid: {
      bottom:"18%"
    },
    xAxis: {
        type: 'time',
      // data: this.DateArr,
        splitLine: {
          show: true
        },
        axisLabel: {  color: theme },
    },
    yAxis: {
      type: 'value',
      axisLabel: {  rotate: 60, color: theme },

    },
    series: [
      {
      name: 'Feed A Total',
        data: this.TF24_wes1_fl_feed_A_arr,
        type: 'line',
        color: 'rgb(56,91,172)',
        smooth: true,
        showSymbol: false,

    },
            {
         name: 'Feed B Total',
        data: this.TF24_wes1_fl_feed_B_arr,
        type: 'line',
        color: 'rgb(89,189,89)',
        smooth: true,
        showSymbol: false,


    },
    {
      name: 'Feed C Total',
        data: this.TF24_wes1_fl_feed_C_arr,
        type: 'line',
        color: 'rgb(221,169,47)',
        smooth: true,
        showSymbol: false,

    },
  ]
  };
  this.barOptions = {
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
       trigger: 'axis',
       position: ['5%', '10%']
     },
    legend: {   textStyle: {color:theme },},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: this.DateArr31,
        axisLabel: {  color: theme },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {  rotate: 60, color: theme },

      }
    ],
    series: [  {
      name: 'Animal Count',
      type: 'bar',
      color: 'rgb(157,97,221)',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: this.L31_wes2_fl_lambs_arr
    },
      {
        name: 'Feed A Total',
        type: 'bar',
        stack: 'Ad',
        color: 'rgb(56,91,172)',
        emphasis: {
          focus: 'series'
        },
        data: this.TF31_wes1_fl_feed_A_arr
      },
      {
        name: 'Feed B Total',
        type: 'bar',
        stack: 'Ad',
        color: 'rgb(89,189,89)',
        emphasis: {
          focus: 'series'
        },
        data: this.TF31_wes1_fl_feed_B_arr
      },
      {
        name: 'Feed C Total',
        type: 'bar',
        stack: 'Ad',
        color: 'rgb(221,169,47)',
        emphasis: {
          focus: 'series'
        },
        data: this.TF31_wes1_fl_feed_C_arr
      },

    ]
  };
  this.isLoading=false;
 })


 }


  Event2(){
    this.isLoading=true;
    var i:any;
    var array:any
    var trend: any = {};
    this.showSilos=true;


    for(i = 1;  i < 13; i++)
  array = ["wes2_fl_sa_silo_levels","wes2_fl_sb_silo_levels","wes2_fl_sc_silo_levels","wes2_fl_p1_lambs","wes_fl_saft","wes_fl_sbft","wes_fl_scft" ]//I'm Passing a field for Sheep.  The algoritm requires the 4th value be for sheep.
  this.name24="24 Hour Trend Data"
  this.name32="31 Day Trend Data"





   this.rs.Post_Wessels_Total_Feeds(array).subscribe((data: any) => {
     trend=data
     this.TF24_wes1_fl_feed_A_arr = trend.TF24_wes1_fl_feed_A_arr;
     this.TF24_wes1_fl_feed_B_arr = trend.TF24_wes1_fl_feed_B_arr;
     this.TF24_wes1_fl_feed_C_arr = trend.TF24_wes1_fl_feed_C_arr;
     this.TF31_wes1_fl_feed_A_arr = trend.TF31_wes1_fl_feed_A_arr;
     this.TF31_wes1_fl_feed_B_arr = trend.TF31_wes1_fl_feed_B_arr;
     this.TF31_wes1_fl_feed_C_arr = trend.TF31_wes1_fl_feed_C_arr;
     this.Silo_A_arr=trend.Silo_A_arr;
     this.Silo_B_arr=trend.Silo_B_arr;
     this.Silo_C_arr=trend.Silo_C_arr;
     this.DateArr31 = trend.DateArr31;
     this.DateSilo = trend.DateSilo;



     var theme:any;
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

   this.option = {
     tooltip: {
       backgroundColor: tooltipBackground,
       textStyle:{ color: theme,},
        trigger: 'axis',
        position: ['10%', '10%']
      },   legend: {
       textStyle: {color:theme },
      },
     grid: {
       bottom:"18%"
     },
     xAxis: {
         type: 'time',
       // data: this.DateArr,
         splitLine: {
           show: true
         },
         axisLabel: {  color: theme },
     },
     yAxis: {
       type: 'value',
       axisLabel: {  rotate: 60, color: theme },

     },
     series: [
       {
       name: 'Silo A Total',
         data: this.TF24_wes1_fl_feed_A_arr,
         type: 'line',
         color: 'rgb(56,91,172)',
         smooth: true,
         showSymbol: false,

     },
             {
          name: 'Silo B Total',
         data: this.TF24_wes1_fl_feed_B_arr,
         type: 'line',
         color: 'rgb(89,189,89)',
         smooth: true,
         showSymbol: false,
     },
     {
       name: 'Silo C Total',
         data: this.TF24_wes1_fl_feed_C_arr,
         type: 'line',
         color: 'rgb(221,169,47)',
         smooth: true,
         showSymbol: false,
     },
   ]
   };
   this.barOptions = {
     tooltip: {
       backgroundColor: tooltipBackground,
       textStyle:{ color: theme,},
        trigger: 'axis',
        position: ['5%', '10%']
      },
     legend: {   textStyle: {color:theme },},
     grid: {
       left: '3%',
       right: '4%',
       bottom: '3%',
       containLabel: true
     },
     xAxis: [
       {
         type: 'category',
         data: this.DateArr31,
         axisLabel: {  color: theme },
       }
     ],
     yAxis: [
       {
         type: 'value',
         axisLabel: {  rotate: 60, color: theme },
       }
     ],
     series: [
       {
         name: 'Silo A Total',
         type: 'bar',
         stack: 'Ad',
         color: 'rgb(56,91,172)',
         emphasis: {
           focus: 'series'
         },
         data: this.TF31_wes1_fl_feed_A_arr
       },
       {
         name: 'Silo B Total',
         type: 'bar',
         stack: 'Ad',
         color: 'rgb(89,189,89)',
         emphasis: {
           focus: 'series'
         },
         data: this.TF31_wes1_fl_feed_B_arr
       },
       {
         name: 'Silo C Total',
         type: 'bar',
         stack: 'Ad',
         color: 'rgb(221,169,47)',
         emphasis: {
           focus: 'series'
         },
         data: this.TF31_wes1_fl_feed_C_arr
       },

     ]
   };
   this.siloOptions = {
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
       trigger: 'axis',
       position: ['5%', '10%']
     },
    legend: {   textStyle: {color:theme },},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: this.DateSilo,
        axisLabel: {  color: theme },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {  rotate: 60, color: theme },

      }
    ],
    series: [
      {
        name: 'Silo A Total',
        type: 'bar',
        stack: 'Ad',
        color: 'rgb(56,91,172)',
        emphasis: {
          focus: 'series'
        },
        data: this.Silo_A_arr
      },
      {
        name: 'Silo B Total',
        type: 'bar',
        stack: 'Ad',
        color: 'rgb(89,189,89)',
        emphasis: {
          focus: 'series'
        },
        data: this.Silo_B_arr
      },
      {
        name: 'Silo C Total',
        type: 'bar',
        stack: 'Ad',
        color: 'rgb(221,169,47)',
        emphasis: {
          focus: 'series'
        },
        data: this.Silo_C_arr
      },

    ]
  };

  this.isLoading=false
  })


  }



  ngOnInit(){
    this.Event0();

    var tagVals:any =[]
    var tagArr=[
      "wes1_fl_ut",//0
      "wes1_fl_p1_feed_A",//1
      "wes1_fl_p1_feed_B",//2
      "wes1_fl_p1_feed_C",//3
      "wes1_fl_p2_feed_A",//4
      "wes1_fl_p2_feed_B",//5
      "wes1_fl_p2_feed_C",//6
      "wes1_fl_p3_feed_A",//7
      "wes1_fl_p3_feed_B",//8
      "wes1_fl_p3_feed_C",//9
      "wes1_fl_p4_feed_A",//10
      "wes1_fl_p4_feed_B",//11
      "wes1_fl_p4_feed_C",//12
      "wes1_fl_p5_feed_A",//13
      "wes1_fl_p5_feed_B",//14
      "wes1_fl_p5_feed_C",//15
      "wes1_fl_p6_feed_A",//16
      "wes1_fl_p6_feed_B",//17
      "wes1_fl_p6_feed_C",//18
      "wes1_fl_p7_feed_A",//19
      "wes1_fl_p7_feed_B",//20
      "wes1_fl_p7_feed_C",//21
      "wes1_fl_p8_feed_A",//22
      "wes1_fl_p8_feed_B",//23
      "wes1_fl_p8_feed_C",//24
      "wes1_fl_p9_feed_A",//25
      "wes1_fl_p9_feed_B",//26
      "wes1_fl_p9_feed_C",//27
      "wes1_fl_p10_feed_A",//28
      "wes1_fl_p10_feed_B",//29
      "wes1_fl_p10_feed_C",//30
      "wes1_fl_p11_feed_A",//31
      "wes1_fl_p11_feed_B",//32
      "wes1_fl_p11_feed_C",//33
      "wes1_fl_p12_feed_A",//34
      "wes1_fl_p12_feed_B",//35
      "wes1_fl_p12_feed_C",//36
      "wes1_f1_feed_A_total",//37
      "wes1_f1_feed_B_total",//38
      "wes1_f1_feed_C_total",//39
      "wes2_fl_p1_lambs",//40
      "wes2_fl_p2_lambs",//41
      "wes2_fl_p3_lambs",//42
      "wes2_fl_p4_lambs",//43
      "wes2_fl_p5_lambs",//44
      "wes2_fl_p6_lambs",//45
      "wes2_fl_p7_lambs",//46
      "wes2_fl_p8_lambs",//47
      "wes2_fl_p9_lambs",//48
      "wes2_fl_p10_lambs",//49
      "wes2_fl_p11_lambs",//50
      "wes2_fl_p12_lambs",//51
      "wes_fl_saft",//52
      "wes_fl_sbft",//53
      "wes_fl_scft",//54
      "wes2_fl_pen1_feed_type",//55
      "wes2_fl_pen2_feed_type",//56
      "wes2_fl_pen3_feed_type",//57
      "wes2_fl_pen4_feed_type",//58
      "wes2_fl_pen5_feed_type",//59
      "wes2_fl_pen6_feed_type",//60
      "wes2_fl_pen7_feed_type",//61
      "wes2_fl_pen8_feed_type",//62
      "wes2_fl_pen9_feed_type",//63
      "wes2_fl_pen10_feed_type",//64
      "wes2_fl_pen11_feed_type",//65
      "wes2_fl_pen12_feed_type",//66
      "wes2_fl_sa_silo_levels",//67
      "wes2_fl_sb_silo_levels",//68
      "wes2_fl_sc_silo_levels",//69
    ]
    tagVals = this.recieve.recieveNonMVals(tagArr);
    var updateTemp:any;
   this.intervalLoop = setInterval(() =>{

      updateTemp = tagVals[0];
      if(updateTemp !==undefined){
        this.wes1_fl_ut= tagVals[0];
        this.wes1_fl_p1_feed_A=tagVals[1];
        this.wes1_fl_p1_feed_B=tagVals[2];
        this.wes1_fl_p1_feed_C=tagVals[3];
        this.wes1_fl_p2_feed_A=tagVals[4];
        this.wes1_fl_p2_feed_B=tagVals[5];
        this.wes1_fl_p2_feed_C=tagVals[6];
        this.wes1_fl_p3_feed_A=tagVals[7];
        this.wes1_fl_p3_feed_B=tagVals[8];
        this.wes1_fl_p3_feed_C=tagVals[9];
        this.wes1_fl_p4_feed_A=tagVals[10];
        this.wes1_fl_p4_feed_B=tagVals[11];
        this.wes1_fl_p4_feed_C=tagVals[12];
        this.wes1_fl_p5_feed_A=tagVals[13];
        this.wes1_fl_p5_feed_B=tagVals[14];
        this.wes1_fl_p5_feed_C=tagVals[15];
        this.wes1_fl_p6_feed_A=tagVals[16];
        this.wes1_fl_p6_feed_B=tagVals[17];
        this.wes1_fl_p6_feed_C=tagVals[18];
        this.wes1_fl_p7_feed_A=tagVals[19];
        this.wes1_fl_p7_feed_B=tagVals[20];
        this.wes1_fl_p7_feed_C=tagVals[21];
        this.wes1_fl_p8_feed_A=tagVals[22];
        this.wes1_fl_p8_feed_B=tagVals[23];
        this.wes1_fl_p8_feed_C=tagVals[24];
        this.wes1_fl_p9_feed_A=tagVals[25];
        this.wes1_fl_p9_feed_B=tagVals[26];
        this.wes1_fl_p9_feed_C=tagVals[27];
        this.wes1_fl_p10_feed_A=tagVals[28];
        this.wes1_fl_p10_feed_B=tagVals[29];
        this.wes1_fl_p10_feed_C=tagVals[30];
        this.wes1_fl_p11_feed_A=tagVals[31];
        this.wes1_fl_p11_feed_B=tagVals[32];
        this.wes1_fl_p11_feed_C=tagVals[33];
        this.wes1_fl_p12_feed_A=tagVals[34];
        this.wes1_fl_p12_feed_B=tagVals[35];
        this.wes1_fl_p12_feed_C=tagVals[36];
        this.wes1_f1_feed_A_total=tagVals[37]
        this.wes1_f1_feed_B_total=tagVals[38]
        this.wes1_f1_feed_C_total=tagVals[39]
        this.wes2_fl_p1_lambs=tagVals[40]
        this.wes2_fl_p2_lambs=tagVals[41]
        this.wes2_fl_p3_lambs=tagVals[42]
        this.wes2_fl_p4_lambs=tagVals[43]
        this.wes2_fl_p5_lambs=tagVals[44]
        this.wes2_fl_p6_lambs=tagVals[45]
        this.wes2_fl_p7_lambs=tagVals[46]
        this.wes2_fl_p8_lambs=tagVals[47]
        this.wes2_fl_p9_lambs=tagVals[48]
        this.wes2_fl_p10_lambs=tagVals[49]
        this.wes2_fl_p11_lambs=tagVals[50]
        this.wes2_fl_p12_lambs=tagVals[51]
        this.wes2_fl_sa_silo_levels=tagVals[67]
        this.wes2_fl_sb_silo_levels=tagVals[68]
        this.wes2_fl_sc_silo_levels=tagVals[69]

        }
        this.comms = Common.getLastUpdate(this.wes1_fl_ut)
 },60000)
  }
  ngOnDestroy(){
      if(this.intervalLoop){
        clearInterval(this.intervalLoop)
      }
    }
}
