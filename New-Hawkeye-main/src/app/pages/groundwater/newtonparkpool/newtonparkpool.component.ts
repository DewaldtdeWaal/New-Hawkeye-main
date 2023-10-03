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

  faultactive: any= {
    value: null,
  alarm:"Fault",
  description:"Fault Active",
    alarmTrip: 1
  };

  emergencystop: any= {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  };

  doorfault: any= {
    value: null,
  alarm:"Warning",
  description:"Door Open",
    alarmTrip: 0
  };

  chargerfault: any= {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 0
  };

  abstractionreached: any= {
    value: null,
  alarm:"Warning",
  description:"Abstraction Reached",
    alarmTrip: 1
  };

  voltageOk: any= {
    value: null,
  alarm:"Fault",
  description:"Voltage Not Ok",
    alarmTrip: 0
  };

  vsdfault: any= {
    value: null,
  alarm:"Fault",
  description:"VSD Fault",
    alarmTrip: 1
  };

  noflow: any= {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  };

  lowlevel: any= {
    value: null,
  alarm:"Fault",
  description:"Low Level Fault",
    alarmTrip: 1
  };

  flowcomsfail: any= {
    value: null,
  alarm:"Fault",
  description:"Flow Comms Fault",
    alarmTrip: 1
  };

  lowlevelwarning: any= {
    value: null,
  alarm:"Warning",
  description:"Low Level Warning",
    alarmTrip: 1
  };



  constructor(private ls:ListeningService, private ws:WebSocketService, private nppfs: NewtonParkPoolService, public rs: ReportService,public recieve:Common )  {



  this.nppfs.GetSiteValues()
  .subscribe(rsp => {
     this.data = rsp;
this.last_update = this.data.routingArray[0].last_update;
this.comms = Common.getLastUpdate(this.last_update)
this.annualyieldsetpoint= this.data.routingArray[0].annualyieldsetpoint;
this.runhours= this.data.routingArray[0].runhours;
this.totalflow=this.data.routingArray[0].totalflow;
this.targetflow=this.data.routingArray[0].targetflow;
this.pumpmode = this.data.routingArray[0].pumpmode;
this.status= this.data.routingArray[0].status;
this.waterlevel=this.data.routingArray[0].boreholelevel;
this.flowrate= this.data.routingArray[0].flowrate;
this.voltage = this.data.routingArray[0].voltage;
this.current = this.data.routingArray[0].current;
this.power= this.data.routingArray[0].power;
this.totalpower= this.data.routingArray[0].totalpower;
this.totalyieldtodate=this.data.routingArray[0].totalyieldtodate;

this.recoverylevelnotreached= this.data.routingArray[0].recoverylevelnotreached;
this.pressure=this.data.routingArray[0].pressure;
this.targetflowsetpoint=this.data.routingArray[0].targetflowsetpoint;
this.vsdfrequency=this.data.routingArray[0].vsdfrequency;
this.faultactive.value=this.data.routingArray[0].faultactive;
this.emergencystop.value=this.data.routingArray[0].estopactive;
this.doorfault.value=this.data.routingArray[0].paneldooropen;
this.chargerfault.value=this.data.routingArray[0].charger;
this.abstractionreached.value=this.data.routingArray[0].annualabstractionlimitreached;
this.voltageOk.value= this.data.routingArray[0].voltageok;
this.vsdfault.value= this.data.routingArray[0].vsdfault;
this.noflow.value= this.data.routingArray[0].noflow;
this.lowlevel.value= this.data.routingArray[0].lowlevel;
this.flowcomsfail.value= this.data.routingArray[0].flowcomsfail;
this.lowlevelwarning.value= this.data.routingArray[0].levelwarning;
  }) ;

  this.theme = localStorage.getItem("theme")

  setTimeout(() => {


    var generalAlarmArray: any []=[this.faultactive,this.emergencystop,this.doorfault,this.chargerfault,this.abstractionreached,this.voltageOk]
    var pumpAlarmArray:any []=[this.vsdfault,this.noflow,this.lowlevel,this.flowcomsfail,this.lowlevelwarning]

    console.log(generalAlarmArray)
    console.log(pumpAlarmArray)

    this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(generalAlarmArray))
    this.pumpfaultdatasource = new MatTableDataSource(Common.getAlarmValue(pumpAlarmArray))


  },1000)






}

  ngOnInit() {






    var tagVals:any = []
    var tagArr =[
      "npp_g_ut",//0
      "npp_g_run_hours",//1
      "npp_g_total_flow",//2
      "npp_g_total_yield_to_date",//3
      "npp_g_annual_yield_setpoint",//4
      "npp_k_power",//5
      "npp_k_current",//6
      "npp_k_total_power",//7
      "npp_k_voltage",//8
      "npp_p_borehole_level",//9
      "npp_p_flow_rate",//10
      "npp_p_mode",//11
      "npp_p_status",//12
      "npp_f_pumprunning",//13
      "npp_f_fault_active",//14
      "npp_f_estopactive",//15
      "npp_f_vsdfault",//16
      "npp_f_panel_door_open",//17
      "npp_f_low_flow",//18
      "npp_f_charge_ok",//19
      "npp_f_low_level",//20
      "npp_f_annual_abstraction_limit_reached",//21
      "npp_f_flow_coms_fail",//22
      "npp_f_level_warning",//23
      "npp_f_pump_rest",//24
      "npp_f_recovery_level_not_reached",//25
      "npp_f_voltage_ok",//26
      "npp_g_recovery_time",//27
      "npp_g_targetflowsetpoint",//28
      "npp_p_pressure",//29
      "npp_p_vsdfrequency"//30
     ]

     tagVals = this.recieve.recieveNMBMVals(tagArr);




   var updateTemp:any;
   this.intervalLoop = setInterval(() =>{

    updateTemp = tagVals[0];

    if(updateTemp !==  undefined){
      this.last_update = tagVals[0];



      this.annualyieldsetpoint = tagVals[4];
      this.totalyieldtodate = tagVals[3]
      this.runhours = tagVals[1];
      this.totalflow=tagVals[2];
      this.pumpmode= tagVals[11]
      this.status= tagVals[12]
      this.waterlevel=tagVals[9];
      //must make one for vsdpressure level
      this.flowrate = tagVals[10];
      //must make one for pressure level
      this.voltage = tagVals[8];
      this.current =tagVals[6];
      this.power = tagVals[5];
      this.totalpower = tagVals[7];
      this.faultactive.value=tagVals[14]
      this.emergencystop.value = tagVals[15]
      this.doorfault.value = tagVals[17]
      this.chargerfault.value = tagVals[19]
      this.abstractionreached.value = tagVals[21]
      this.voltageOk.value = tagVals[26]
      this.vsdfault.value = tagVals[16]
      this.lowlevel.value = tagVals[20]
      this.flowcomsfail.value = tagVals[22]
      this.lowlevelwarning.value = tagVals[23]
      this.recoverylevelnotreached = tagVals[25]
      this.pressure=tagVals[29]
      this.targetflowsetpoint=tagVals[28]
      this.vsdfrequency=tagVals[30]

    }
    this.comms = Common.getLastUpdate(this.last_update)
    var generalAlarmArray: any []=[this.faultactive,this.emergencystop,this.doorfault,this.chargerfault,this.abstractionreached,this.voltageOk]
    var pumpAlarmArray:any []=[this.vsdfault,this.lowlevel,this.flowcomsfail,this.lowlevelwarning]

    this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(generalAlarmArray))
    this.pumpfaultdatasource = new MatTableDataSource(Common.getAlarmValue(pumpAlarmArray))



  },60000)



  var trend: any = {};
  this.rs.Get_NPP_TotalFlows().subscribe(data => {
    trend=data
    this.totalflow_array = trend.totalflow_array;

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

  }
  )

  }


  onDateFilter(){
    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

  var trend :any;

  this.rs.Get_NPP_Total_Flows_Dates(newStart, newEnd).subscribe(data => {
  trend=data

  this.totalflow_array = trend.totalflow_array;
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
  })


  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
