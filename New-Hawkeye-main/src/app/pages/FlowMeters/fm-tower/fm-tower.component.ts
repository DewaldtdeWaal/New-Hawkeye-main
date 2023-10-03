import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/Service-Files/report.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import * as echarts from 'echarts';
import { UsersService } from 'src/app/Service-Files/users.service';
import {FMT} from 'src/app/Service-Files/FPT/fmtower.service';
import { Common } from 'src/app/class/common';

type EChartsOption = echarts.EChartsOption;
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-fm-tower',
  templateUrl: './fm-tower.component.html',
  styleUrls: ['./fm-tower.component.css']
})
export class FMTowerComponent implements OnInit {
  fmt_FM_UT:any
  fmt_FM_GAS_L:any
  fmt_FM_BATTERY_V:any
  fmt_FM_TF:any
  fmt_FM_PRESS:any
  fmt_FM_FR:any
  fmt_FM_LOW_B:any
  fmt_FM_ALM_ARMD:any
  fmt_FM_PEPPER_S_ARMD:any
  fmt_FM_PEPPER_S_ALM:any

  intervalLoop: any
 TotalFlowArr: any[]=[];
 DateArr: any[]=[];

  PS_ALM:any
  PS_ARMD:any
  G_ALM: any
B_STAT: any


options: EChartsOption;

myChart:any;
theme:any
  ELEMENT_DATA_ALM: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];
  dataSourceALM:any;
  comms: string;
  data: any=[];

  fmt_FM_CHAMBER_TAMP:any= {
    value: null,
  alarm:"Fault",
  description:"Chamber Tamper",
    alarmTrip: 1
  };
  fmt_FM_SOLAR_PANEL_TAMP:any= {
    value: null,
  alarm:"ALARM",
  description:"Panel Tamper",
    alarmTrip: 1
  };
  fmt_FM_DOOR_OPENED:any= {
    value: null,
  alarm:"Fault",
  description:"Door Opened",
    alarmTrip: 1
  };


  constructor(private fmt:FMT, private webSocketService: WebSocketService,public rs: ReportService,private userService: UsersService, public recieve:Common ) {
    this.fmt.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.fmt_FM_UT = this.data.routingArray[0].fmt_FM_UT
       this.comms = Common.getLastUpdate(this.fmt_FM_UT)
       this.fmt_FM_FR= this.data.routingArray[0].fmt_FM_FR
       this.fmt_FM_GAS_L=this.data.routingArray[0].fmt_FM_GAS_L
       this.fmt_FM_BATTERY_V=this.data.routingArray[0].fmt_FM_BATTERY_V
       this.fmt_FM_TF=this.data.routingArray[0].fmt_FM_TF
       this.fmt_FM_ALM_ARMD = this.data.routingArray[0].fmt_FM_ALM_ARMD
       this.fmt_FM_CHAMBER_TAMP.value = this.data.routingArray[0].fmt_FM_CHAMBER_TAMP
       this.fmt_FM_DOOR_OPENED.value = this.data.routingArray[0].fmt_FM_DOOR_OPENED
       this.fmt_FM_LOW_B = this.data.routingArray[0].fmt_FM_LOW_B
       this.fmt_FM_PEPPER_S_ALM = this.data.routingArray[0].fmt_FM_PEPPER_S_ALM
       this.fmt_FM_PEPPER_S_ARMD = this.data.routingArray[0].fmt_FM_PEPPER_S_ARMD
       this.fmt_FM_SOLAR_PANEL_TAMP.value = this.data.routingArray[0].fmt_FM_SOLAR_PANEL_TAMP
       this.fmt_FM_PRESS = this.data.routingArray[0].fmt_FM_PRESS

    })


    setTimeout(() => {




      var alarm1: any [] = [this.fmt_FM_CHAMBER_TAMP,this.fmt_FM_SOLAR_PANEL_TAMP,this.fmt_FM_DOOR_OPENED]

      this.dataSourceALM= new MatTableDataSource(Common.getAlarmValue(alarm1))








    },2000)

  }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  onDateFilter(){





    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

var trend :any;

this.rs.GetFMT_Total_Flow_Dates(newStart, newEnd).subscribe(data => {
  trend=data

        this.TotalFlowArr = trend.TotalFlowArr;
        this.DateArr = trend.DateArr;



        this.options = Common.getOptions(this.options,this.DateArr,"Total Flow ML","FM Tower Total",this.TotalFlowArr)



      })
}


  ngOnInit() {



    var tagVals:any=[]
    var tagArr=[
      "fmt_fm_ut",//0
      "fmt_fm_gas_l",//1
      "fmt_fm_battery_v",//2
      "fmt_fm_fr",//3
      "fmt_fm_tf",//4
      "fmt_fm_low_b",//5
      "fmt_fm_alm_armd",//6
      "fmt_fm_chamber_tamp",//7
      "fmt_fm_solar_panel_tamp",//8
      "fmt_fm_door_opened",//9
      "fmt_fm_pepper_s_armd",//10
      "fmt_fm_pepper_s_alm",//11
      "fmt_fm_press"
    ]


   tagVals = this.recieve.recieveNMBMVals(tagArr);


    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{

      updateTemp=tagVals[0];
      console.log(updateTemp)
      if(updateTemp !== undefined){
      this.fmt_FM_UT = tagVals[0]

      this.fmt_FM_FR = tagVals[3]
      this.fmt_FM_GAS_L = tagVals[1]
      this.fmt_FM_BATTERY_V = tagVals[2]
      this.fmt_FM_TF = tagVals[4]
      this.fmt_FM_ALM_ARMD = tagVals[6]
      this.fmt_FM_CHAMBER_TAMP.value = tagVals[7]
      this.fmt_FM_DOOR_OPENED.value = tagVals[9]
      this.fmt_FM_LOW_B = tagVals[5]
      this.fmt_FM_PEPPER_S_ALM = tagVals[11]
      this.fmt_FM_PEPPER_S_ARMD = tagVals[10]
      this.fmt_FM_SOLAR_PANEL_TAMP.value = tagVals[8]
      this.fmt_FM_PRESS = tagVals[12]

      }
      this.comms = Common.getLastUpdate(this.fmt_FM_UT)



      var alarm1: any [] = [this.fmt_FM_CHAMBER_TAMP,this.fmt_FM_SOLAR_PANEL_TAMP,this.fmt_FM_DOOR_OPENED]

      this.dataSourceALM= new MatTableDataSource(Common.getAlarmValue(alarm1))

    },60000)



    var trend :any;


    this.rs.GetFMT_Total_Flow().subscribe(data => {
      trend=data
            this.TotalFlowArr = trend.TotalFlowArr;
            this.DateArr = trend.DateArr;

            this.options = Common.getOptions(this.options,this.DateArr,"Total Flow ML","FM Tower Total",this.TotalFlowArr)

          })

}
ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}
}
