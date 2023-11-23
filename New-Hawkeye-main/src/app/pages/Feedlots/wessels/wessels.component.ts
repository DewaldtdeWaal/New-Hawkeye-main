import { Component, Injectable, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { EChartsOption } from 'echarts';
import {WesselsService} from 'src/app/Service-Files/Feedlots/wessels.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { Subscription } from 'rxjs';
import { Common } from 'src/app/class/common';
import { FormControl, FormGroup } from '@angular/forms';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
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

  TF24_wes1_fl_feed_A_arr:any
  TF24_wes1_fl_feed_B_arr:any
  TF24_wes1_fl_feed_C_arr:any
  TF31_wes1_fl_feed_A_arr:any
  TF31_wes1_fl_feed_B_arr:any
  TF31_wes1_fl_feed_C_arr:any

  DateArr: any;
  barOptions: EChartsOption;
  siloOptions: EChartsOption;
  SitesList: string[] = [];


public authListenerSubs!: Subscription;
//#region Variables
comms:any

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

 tagArr:any=[
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

variable :any= {
  wes1_fl_ut:null,
  wes1_fl_p1_feed_A:null,
  wes1_fl_p1_feed_B:null,
  wes1_fl_p1_feed_C:null,
  wes1_fl_p2_feed_A:null,
  wes1_fl_p2_feed_B:null,
  wes1_fl_p2_feed_C:null,
  wes1_fl_p3_feed_A:null,
  wes1_fl_p3_feed_B:null,
  wes1_fl_p3_feed_C:null,
  wes1_fl_p4_feed_A:null,
  wes1_fl_p4_feed_B:null,
  wes1_fl_p4_feed_C:null,
  wes1_fl_p5_feed_A:null,
  wes1_fl_p5_feed_B:null,
  wes1_fl_p5_feed_C:null,
  wes1_fl_p6_feed_A:null,
  wes1_fl_p6_feed_B:null,
  wes1_fl_p6_feed_C:null,
  wes1_fl_p7_feed_A:null,
  wes1_fl_p7_feed_B:null,
  wes1_fl_p7_feed_C:null,
  wes1_fl_p8_feed_A:null,
  wes1_fl_p8_feed_B:null,
  wes1_fl_p8_feed_C:null,
  wes1_fl_p9_feed_A:null,
  wes1_fl_p9_feed_B:null,
  wes1_fl_p9_feed_C:null,
  wes1_fl_p10_feed_A:null,
  wes1_fl_p10_feed_B:null,
  wes1_fl_p10_feed_C:null,
  wes1_fl_p11_feed_A:null,
  wes1_fl_p11_feed_B:null,
  wes1_fl_p11_feed_C:null,
  wes1_fl_p12_feed_A:null,
  wes1_fl_p12_feed_B:null,
  wes1_fl_p12_feed_C:null,
  wes1_f1_feed_A_total:null,
  wes1_f1_feed_B_total:null,
  wes1_f1_feed_C_total:null,
  wes2_fl_p1_lambs:null,
  wes2_fl_p2_lambs:null,
  wes2_fl_p3_lambs:null,
  wes2_fl_p4_lambs:null,
  wes2_fl_p5_lambs:null,
  wes2_fl_p6_lambs:null,
  wes2_fl_p7_lambs:null,
  wes2_fl_p8_lambs:null,
  wes2_fl_p9_lambs:null,
  wes2_fl_p10_lambs:null,
  wes2_fl_p11_lambs:null,
  wes2_fl_p12_lambs:null,
  wes_fl_saft:null,
  wes_fl_sbft:null,
  wes_fl_scft:null,
  wes2_fl_pen1_feed_type:null,
  wes2_fl_pen2_feed_type:null,
  wes2_fl_pen3_feed_type:null,
  wes2_fl_pen4_feed_type:null,
  wes2_fl_pen5_feed_type:null,
  wes2_fl_pen6_feed_type:null,
  wes2_fl_pen7_feed_type:null,
  wes2_fl_pen8_feed_type:null,
  wes2_fl_pen9_feed_type:null,
  wes2_fl_pen10_feed_type:null,
  wes2_fl_pen11_feed_type:null,
  wes2_fl_pen12_feed_type:null,
  wes2_fl_sa_silo_levels:null,
  wes2_fl_sb_silo_levels:null,
  wes2_fl_sc_silo_levels:null,


}

  constructor(public rs: ReportService,public recieve:Common,private pm:pagePostMethod, ) {
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
    this.rs.Post_Wessels_Total_Feeds(array, this.showSilos).then(data => {
      trend=data


      this.TF24_wes1_fl_feed_A_arr = trend.dayArr[0];
      this.TF24_wes1_fl_feed_B_arr = trend.dayArr[1];
      this.TF24_wes1_fl_feed_C_arr = trend.dayArr[2];
   

     this.TF31_wes1_fl_feed_A_arr = trend.totalFeedArr[0]
     this.TF31_wes1_fl_feed_B_arr = trend.totalFeedArr[1]
     this.TF31_wes1_fl_feed_C_arr = trend.totalFeedArr[2]




   
      this.getLine()
      this.getTotalFeedAndDayFeed()
    })





  }
 Event1( lot:any){
  this.showSilos=false;
   var i:any;
   var array:any
   var trend: any = {};
   this.isLoading=true;

 array = ["wes1_fl_p"+lot+"_feed_A","wes1_fl_p"+lot+"_feed_B","wes1_fl_p"+lot+"_feed_C","wes2_fl_p"+lot+"_lambs"]
 this.name24= "Feedlot "+lot+" (24 Hour Trend)"
 this.name32="Feedlot "+lot+" (31 Day Trend)"



 this.name1 = "Feed A Total";
 this.name2 = "Feed B Total";
 this.name3 = "Feed C Total";

 this.rs.Post_Wessels_Total_Feeds(array, this.showSilos).then(data => {
  trend=data


  this.TF24_wes1_fl_feed_A_arr = trend.dayArr[0];
  this.TF24_wes1_fl_feed_B_arr = trend.dayArr[1];
  this.TF24_wes1_fl_feed_C_arr = trend.dayArr[2];


 this.TF31_wes1_fl_feed_A_arr = trend.totalFeedArr[0]
 this.TF31_wes1_fl_feed_B_arr = trend.totalFeedArr[1]
 this.TF31_wes1_fl_feed_C_arr = trend.totalFeedArr[2]
 this.L31_wes2_fl_lambs_arr = trend.totalFeedArr[3]





 this.getLine()
  this.getLotFeedDayAndMonth()
})



 }

 name1:string;
 name2:string;
 name3:string;
  Event2(){
    this.isLoading=true;
    var i:any;
    var array:any
    var trend: any = {};
    this.showSilos=true;


  array = ["wes2_fl_sa_silo_levels","wes2_fl_sb_silo_levels","wes2_fl_sc_silo_levels","wes_fl_saft","wes_fl_sbft","wes_fl_scft" ]//I'm Passing a field for Sheep.  The algoritm requires the 4th value be for sheep.
  this.name24="24 Hour Trend Data"
  this.name32="31 Day Trend Data"

    this.name1 = "Silo A Total";
    this.name2 = "Silo B Total";
    this.name3 = "Silo C Total";


    this.rs.Post_Wessels_Total_Feeds(array, this.showSilos).then(data => {
      trend=data

      this.TF24_wes1_fl_feed_A_arr = trend.dayArr[0];
      this.TF24_wes1_fl_feed_B_arr = trend.dayArr[1];
      this.TF24_wes1_fl_feed_C_arr = trend.dayArr[2];
   

     this.TF31_wes1_fl_feed_A_arr = trend.totalFeedArr[0]
     this.TF31_wes1_fl_feed_B_arr = trend.totalFeedArr[1]
     this.TF31_wes1_fl_feed_C_arr = trend.totalFeedArr[2]

     this.Silo_A_arr = trend.siloArr[3]
      this.Silo_B_arr = trend.siloArr[4]
      this.Silo_C_arr = trend.siloArr[5]



   
      this.getLine()
      this.getTotalFeedAndDayFeed()

      this.getSilo()
    })




  }



  ngOnInit(){

    this.intervalLoop = this.pm.findPageData("wes1_fl", "FL_CurrentVals").subscribe((result) => {
      this.data =  result;

    Common.getRouteDatas(this.tagArr,this.variable,this.data)
    this.comms = Common.getLastUpdate(this.variable.wes1_fl_ut)
    })


    this.Event0();


  }



  getTotalFeedAndDayFeed(){

    const {theme, tooltipBackground} = Common.getTheme();




this.barOptions = {
  grid: {
    left: '6%',
    right: '7%',
    top:'10%',
    bottom: '10%',
    containLabel: true
},
toolbox:{
  feature: {
  feature: {
    saveAsImage: {}
  }

  }},
  dataZoom:[{

    type: 'slider',
    start: 0,
    end: 100,
    handleSize: 8

    },
    { start: 0,
     end:100}
    ],
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
      axisPointer: {
        type: 'cross'
      },
       trigger: 'axis',

       position: ['10%', '10%']

     },  
     legend:{
      top:'auto',
      type:'scroll',
      textStyle: {color:theme },
         },
         axisPointer:{
        },        xAxis: {
          type: 'time'  ,
          axisLabel: {color: theme},
          splitLine: {
            show: true
          },
        }, 
        yAxis: [
          {
            nameTextStyle: { color: theme},
          type:'value',
          name:"",//leftAxisName
        
          min:0,
          axisLabel:{
            formatter:'{value} ',
            color:theme,
          }
          },
          {
            type:'value',
            name:"",
            nameTextStyle: { color: theme},
            min:0,
            axisLabel:{
              formatter:'{value} ',
              color:theme,
            }
            },
          {
            axisLabel: {color: theme},
          type: 'value',
          boundaryGap: [0, 0.05],
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


}

this.isLoading=false;

  }

  getLine(){
    const {theme, tooltipBackground} = Common.getTheme();


    this.option ={
      tooltip: {
        backgroundColor: tooltipBackground,
        textStyle:{ color: theme,},
         trigger: 'axis',
         position: ['10%', '10%']
       },legend: {
        textStyle: {color:theme },
       },     grid: {
        bottom:"18%"
      }, xAxis: {
        type: 'time',
      // data: this.DateArr,
        splitLine: {
          show: true
        },
        axisLabel: {  color: theme },
    }, yAxis: {
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


}

  }


  getLotFeedDayAndMonth(){
    const {theme, tooltipBackground} = Common.getTheme();
 

this.barOptions = {
  grid: {
    left: '6%',
    right: '7%',
    top:'10%',
    bottom: '10%',
    containLabel: true
},
toolbox:{
  feature: {
  feature: {
    saveAsImage: {}
  }

  }},
  dataZoom:[{

    type: 'slider',
    start: 0,
    end: 100,
    handleSize: 8

    },
    { start: 0,
     end:100}
    ],
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
      axisPointer: {
        type: 'cross'
      },
       trigger: 'axis',

       position: ['10%', '10%']

     },  
     legend:{
      top:'auto',
      type:'scroll',
      textStyle: {color:theme },
         },
         axisPointer:{
        },        xAxis: {
          type: 'time'  ,
          axisLabel: {color: theme},
          splitLine: {
            show: true
          },
        }, 
        yAxis: [
          {
            nameTextStyle: { color: theme},
          type:'value',
          name:"",//leftAxisName
        
          min:0,
          axisLabel:{
            formatter:'{value} ',
            color:theme,
          }
          },
          {
            type:'value',
            name:"",
            nameTextStyle: { color: theme},
            min:0,
            axisLabel:{
              formatter:'{value} ',
              color:theme,
            }
            },
          {
            axisLabel: {color: theme},
          type: 'value',
          boundaryGap: [0, 0.05],
          }
  
      ],
  series: [
    {
      name: 'Animal Count',
      type: 'bar',
      stack: 'Ad',
      color: 'rgb(157,97,221)',
      emphasis: {
        focus: 'series'
      },
      data: this.L31_wes2_fl_lambs_arr
    },
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


}

this.isLoading=false;
  }


  getSilo(){

    const {theme, tooltipBackground} = Common.getTheme();

    this.siloOptions = {
      grid: {
        left: '6%',
        right: '7%',
        top:'10%',
        bottom: '10%',
        containLabel: true
    },
    toolbox:{
      feature: {
      feature: {
        saveAsImage: {}
      }
    
      }},
      dataZoom:[{
    
        type: 'slider',
        start: 0,
        end: 100,
        handleSize: 8
    
        },
        { start: 0,
         end:100}
        ],
        tooltip: {
          backgroundColor: tooltipBackground,
          textStyle:{ color: theme,},
          axisPointer: {
            type: 'cross'
          },
           trigger: 'axis',
    
           position: ['10%', '10%']
    
         },  
         legend:{
          top:'auto',
          type:'scroll',
          textStyle: {color:theme },
             },
             axisPointer:{
            },        xAxis: {
              type: 'time'  ,
              axisLabel: {color: theme},
              splitLine: {
                show: true
              },
            }, 
            yAxis: [
              {
                nameTextStyle: { color: theme},
              type:'value',
              name:"",//leftAxisName
            
              min:0,
              axisLabel:{
                formatter:'{value} ',
                color:theme,
              }
              },
              {
                type:'value',
                name:"",
                nameTextStyle: { color: theme},
                min:0,
                axisLabel:{
                  formatter:'{value} ',
                  color:theme,
                }
                },
              {
                axisLabel: {color: theme},
              type: 'value',
              boundaryGap: [0, 0.05],
              }
      
          ],
      series: [
        {
          name: this.name1,
          type: 'bar',
          stack: 'Ad',
          color: 'rgb(56,91,172)',
          emphasis: {
            focus: 'series'
          },
          data: this.Silo_A_arr
        },
        {
          name: this.name2,
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
    
    
    }
  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
