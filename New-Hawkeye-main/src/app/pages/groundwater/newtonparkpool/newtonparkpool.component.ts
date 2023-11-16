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




  options: EChartsOption;

  generalfaulttable: PeriodicElement[] = [];
  pumpfaulttable: PeriodicElement[] = [];

  displayedColumns :string[]= ['alarm', 'description'];

  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);
  pumpfaultdatasource :any =  new MatTableDataSource(this.pumpfaulttable);

  data:any = []

  theme:any= localStorage.getItem("theme")
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

  }

  ngOnInit() {


    this.intervalLoop = this.pm.findPageData("npp", "GRDW_CurrentVals").subscribe((result) => {
      this.data =  result;

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
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


  isLoading:any
  collectionName:any ="NMBM_NPP_GW_TREND"
  range:any;
  options1: EChartsOption;
  tfCollection:any = "NPP_TF_Trend";
  totalFlowTags :any = ["totalflow"]
  flowTags :any = ["flowRate"]
  siteTitle:unknown = "Newton Park Pool"
  recieveDate($event: any){
    var trend :any;
    this.range = $event;
    this.isLoading = true;
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collectionName,this.totalFlowTags,this.flowTags,start,end).then((data) => {

      trend = data;

      console.log(trend)
      this.options1 = Common.getOptionsBarAndLine(this.options1,"Flow Rate l/s",trend.FlowRateArr[0],"Total Flow kl",trend.TotalFlowArr[0]);
      this.isLoading = false;
    })

  }

}
