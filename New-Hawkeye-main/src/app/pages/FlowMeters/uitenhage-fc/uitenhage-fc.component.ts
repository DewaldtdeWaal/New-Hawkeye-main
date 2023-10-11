import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {Uitenhage} from 'src/app/Service-Files/FPT/uitenhage.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';

export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-uitenhage-fc',
  templateUrl: './uitenhage-fc.component.html',
  styleUrls: ['./uitenhage-fc.component.css']
})
export class UitenhageFCComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];
  dataSource:any


  ELEMENT_DATA1: PeriodicElement[] = [];
  dataSource1:any

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  TotalFlow_UIT_Arr:any[];
  options: EChartsOption;


  intervalLoop: any







  variable :any= {
    fpt_uit_fc_ut:null,
    fpt_uit_fc_press:null,
    fpt_uit_fc_fr:null,
    fpt_uit_fc_tf:null,
    fpt_uit_fc_panel_door:null,
    fpt_uit_fc_battery:null,
    fpt_uit_fc_flow_switch1:null,
    fpt_uit_fc_flow_switch2:null,
    comms:null

  }


  panel_door_stat:any
  battery_stat:any
  TotalFlow_STL_Arr: any[];
  TotalFlow_SOCO_Arr: any[];
  DateArr: any;
  data:any=[]

   tagArr:any=[
    "fpt_uit_fc_ut",//0
    "fpt_uit_fc_press",//1
    "fpt_uit_fc_fr",//2
    "fpt_uit_fc_tf",//3
    "fpt_uit_fc_panel_door",//6
    "fpt_uit_fc_battery",//7
    "fpt_uit_fc_flow_switch1",//9
    "fpt_uit_fc_flow_switch2",//10

  ]

  faultArr:any=[
    "fpt_uit_fc_surge_arrester_fault",
    "fpt_uit_fc_charger_fault",
    "fpt_uit_fc_remote_io_comms",
    "fpt_uit_fc_pressure_analog_signal",
    "fpt_uit_fc_flow_meter_comms"

  ]

  faultVariable:any={

  fpt_uit_fc_surge_arrester_fault:{
    value: null,
  alarm:"Fault",
  description:"Surge Arrester",
    alarmTrip: 1
  },
  fpt_uit_fc_charger_fault: {
    value: null,
  alarm:"Fault",
  description:"Charger",
    alarmTrip: 1
  },
    fpt_uit_fc_remote_io_comms: {
      value: null,
    alarm:"Fault",
    description:"Remote IO Comms Link",
      alarmTrip: 1
    },
    fpt_uit_fc_pressure_analog_signal: {
      value: null,
    alarm:"Fault",
    description:"Pressure Analog Signal",
      alarmTrip: 1
    },
    fpt_uit_fc_flow_meter_comms: {
      value: null,
    alarm:"Fault",
    description:"Flow Meter Comms",
      alarmTrip: 1
    }

  }
  isLoading: boolean = false;
  collectionName: any = "FPT_UIT_FC_TF"
trendTag: any = ["totalFlow"]
  constructor(private uit:Uitenhage, private ws: WebSocketService,public rs: ReportService,public us: UsersService, public ls:ListeningService, public recieve:Common,private pm:pagePostMethod ,private pt: PostTrend) {

    this.isLoading = true;

    this.pm.findPageData("nmbm_uit_fc_fpt", "FPT_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)


    this.variable.comms = Common.getLastUpdate(this.variable.fpt_uit_fc_ut)


    var alarm1: any [] = [this.faultVariable.fpt_uit_fc_surge_arrester_fault,this.faultVariable.fpt_uit_fc_charger_fault,this.faultVariable.fpt_uit_fc_remote_io_comms,this.faultVariable.fpt_uit_fc_pressure_analog_signal,this.faultVariable.fpt_uit_fc_flow_meter_comms]
    this.dataSource =new MatTableDataSource(Common.getAlarmValue(alarm1))
    });





  }

  ngOnInit(){




    this.intervalLoop = setInterval(() =>{



      this.pm.findPageData("nmbm_uit_fc_fpt", "FPT_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
        Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)


      this.variable.comms = Common.getLastUpdate(this.variable.fpt_uit_fc_ut)


      var alarm1: any [] = [this.faultVariable.fpt_uit_fc_surge_arrester_fault,this.faultVariable.fpt_uit_fc_charger_fault,this.faultVariable.fpt_uit_fc_remote_io_comms,this.faultVariable.fpt_uit_fc_pressure_analog_signal,this.faultVariable.fpt_uit_fc_flow_meter_comms]
      this.dataSource =new MatTableDataSource(Common.getAlarmValue(alarm1))
      });




        },60000)



    var trend: any = {};
    this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
      trend=data
      this.TotalFlow_UIT_Arr= trend.TotalFlowArr[0];
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


        this.options = Common.getOptions(this.options,this.DateArr,"Total Flow ML","Uitenhage Total Flow",this.TotalFlow_UIT_Arr)
        this.isLoading = false;
    })



  }

  onDateFilter(){
    this.isLoading = true;
    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);
var trend :any;

this.pt.getPostTrend(this.collectionName, this.trendTag,newStart,newEnd).then((data) => {
  trend=data
  this.TotalFlow_UIT_Arr= trend.TotalFlowArr[0];
  this.DateArr = trend.DateArr;



this.options = Common.getOptions(this.options,this.DateArr,"Total Flow ML","Uitenhage Total Flow",this.TotalFlow_UIT_Arr)

this.isLoading = false;
})


  }


  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }





}
