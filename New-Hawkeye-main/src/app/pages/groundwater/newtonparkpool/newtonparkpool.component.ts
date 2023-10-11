import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Injectable } from "@angular/core";

import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import { ListeningService} from 'src/app/listening.service';
import { NewtonParkPoolService } from 'src/app/Service-Files/newtonparkpool.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';

export interface PeriodicElement{
  alarm: string;
  description: string;
}



@Injectable({ providedIn: "root" })
@Component({
  selector: 'app-newtonparkpool',
  templateUrl: './newtonparkpool.component.html',
  styleUrls: ['./newtonparkpool.component.css']
})
export class NewtonparkpoolComponent implements OnInit {



  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  options: EChartsOption;

  generalfaulttable: PeriodicElement[] = [];
  pumpfaulttable: PeriodicElement[] = [];

  displayedColumns :string[]= ['alarm', 'description'];

  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);
  pumpfaultdatasource :any =  new MatTableDataSource(this.pumpfaulttable);

  data:any = []

  theme:any;
  comms:string;

  intervalLoop: any
  last_update:any;
  annualyieldsetpoint: any;
  runhours:any ;
  totalflow: any;
  targetflow: any;

  pumpmode: any ;
  status: any;
  waterlevel: any;
  flowrate: any;
  voltage: any;
  current: any ;
  power: any;
  totalpower: any;
  totalyieldtodate: any;

  recoverylevelnotreached: any;
  pressure: any;
  targetflowsetpoint: any;
  vsdfrequency: any;
  totalflow_array: any;
  DateArr: any;
  faultVariable:any={
  faultactive:  {
    value: null,
  alarm:"Fault",
  description:"Fault Active",
    alarmTrip: 1
  },

  emergencystop:  {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },

  doorfault: {
    value: null,
  alarm:"Warning",
  description:"Door Open",
    alarmTrip: 0
  },

  chargerfault:  {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 0
  },

  abstractionreached:  {
    value: null,
  alarm:"Warning",
  description:"Abstraction Reached",
    alarmTrip: 1
  },

  voltageOk: {
    value: null,
  alarm:"Fault",
  description:"Voltage Not Ok",
    alarmTrip: 0
  },

  vsdfault: {
    value: null,
  alarm:"Fault",
  description:"VSD Fault",
    alarmTrip: 1
  },

  noflow:  {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },

  lowlevel:  {
    value: null,
  alarm:"Fault",
  description:"Low Level Fault",
    alarmTrip: 1
  },

  flowcomsfail: {
    value: null,
  alarm:"Fault",
  description:"Flow Comms Fault",
    alarmTrip: 1
  },

  lowlevelwarning: {
    value: null,
  alarm:"Warning",
  description:"Low Level Warning",
    alarmTrip: 1
  },
  }

  variable:any = {
    last_update:null,
    annualyieldsetpoint:null,
    runhours:null,
    totalflow:null,
    targetflow:null,
    pumpmode:null,
    status:null,
    boreholelevel:null,
    waterlevel:null,
    flowrate:null,
    voltage:null,
    current:null,
    power:null,
    totalpower:null,
    totalyieldtodate:null,
    recoverylevelnotreached:null,
    pressure:null,
    targetflowsetpoint:null,
    vsdfrequency:null,
  }

  faultArr:any=[

    "faultactive",
    "emergencystop",
    "doorfault",
    "chargerfault",
    "abstractionreached",
    "voltageOk",
    "vsdfault",
    "noflow",
    "lowlevel",
    "flowcomsfail",
    "lowlevelwarning",

      ]

      tagArr:any=[
"last_update",
"annualyieldsetpoint",
"runhours",
"totalflow",
"targetflow",
"pumpmode",
"status",
"boreholelevel",
"flowrate",
"voltage",
"current",
"power",
"totalpower",
"totalyieldtodate",
"recoverylevelnotreached",
"pressure",
"targetflowsetpoint",
"vsdfrequency",
"waterlevel"
     ]


  constructor( public rs: ReportService,public recieve:Common,private pm:pagePostMethod,private pt: PostTrend )  {
    this.isLoading = true;




  this.theme = localStorage.getItem("theme")



  this.pm.findPageData("npp", "GRDW_CurrentVals").then((result) => {
    this.data =  result;
    this.theme = localStorage.getItem("theme");
    console.log(this.data)
   this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
   this.faultVariable =   Common.getFaultRouteDatas(this.faultArr,this.faultVariable,this.data)

   this.comms = Common.getLastUpdate(this.variable.last_update)

   var generalAlarmArray: any []=[this.faultVariable.faultactive,this.faultVariable.emergencystop,this.faultVariable.doorfault,this.faultVariable.chargerfault,this.faultVariable.abstractionreached,this.faultVariable.voltageOk]
   var pumpAlarmArray:any []=[this.faultVariable.vsdfault,this.faultVariable.noflow,this.faultVariable.lowlevel,this.faultVariable.flowcomsfail,this.faultVariable.lowlevelwarning]

   this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(generalAlarmArray))
   this.pumpfaultdatasource = new MatTableDataSource(Common.getAlarmValue(pumpAlarmArray))
  });

  }
  collectionName: any = "NPP_TF_Trend"
  trendTag: any = ["totalflow"]
  ngOnInit() {


   this.intervalLoop = setInterval(() =>{



  this.pm.findPageData("npp", "GRDW_CurrentVals").then((result) => {
    this.data =  result;
    this.theme = localStorage.getItem("theme");
    console.log(this.data)
   this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
   this.faultVariable =   Common.getFaultRouteDatas(this.faultArr,this.faultVariable,this.data)

   this.comms = Common.getLastUpdate(this.variable.last_update)

   var generalAlarmArray: any []=[this.faultVariable.faultactive,this.faultVariable.emergencystop,this.faultVariable.doorfault,this.faultVariable.chargerfault,this.faultVariable.abstractionreached,this.faultVariable.voltageOk]
   var pumpAlarmArray:any []=[this.faultVariable.vsdfault,this.faultVariable.noflow,this.faultVariable.lowlevel,this.faultVariable.flowcomsfail,this.faultVariable.lowlevelwarning]

   this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(generalAlarmArray))
   this.pumpfaultdatasource = new MatTableDataSource(Common.getAlarmValue(pumpAlarmArray))
  });



  },60000)



  var trend: any = {};
  this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
    trend=data
    this.totalflow_array = trend.TotalFlowArr[0];

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
          name: 'Total Flow',
          nameTextStyle: { color: theme},
          boundaryGap: [0.2, 0.2],
          min: 0,
          axisLabel: { rotate: 90, color: theme},
      },
        series: [
          {
            name: 'Newton Park Pool Total Flow',
            data: this.totalflow_array,
            type: 'bar',
        }
      ]
      };
      this.isLoading = false;
  }
  )

  }

  isLoading: boolean = false;
  onDateFilter(){
    this.isLoading = true;
    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

  var trend :any;

  this.pt.getPostTrend(this.collectionName, this.trendTag,newStart,newEnd).then((data) => {
    trend=data
    this.totalflow_array = trend.TotalFlowArr[0];
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
    name: 'Total Flow',
    nameTextStyle: { color: theme},
    boundaryGap: [0.2, 0.2],
    min: 0,
    axisLabel: {  rotate: 90, color: theme},
  },
  series: [
    {
      name: 'Newton Park Pool Total Flow',
        data: this.totalflow_array,
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
