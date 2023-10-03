import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import {MatTableDataSource} from '@angular/material/table';
import {Common} from 'src/app/class/common';
import {humerail6Service} from 'src/app/Service-Files/GRDW/groundwater.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-humerail',
  templateUrl: './humerail.component.html',
  styleUrls: ['./humerail.component.css']
})
export class HumerailComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  options: EChartsOption;




  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttable: PeriodicElement[] = [];
  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);

  comms:any

  theme: any

  variable:any = {
  hum_gw_last_update:null,
  hum_gw_mode:null,
  hum_gw_pump_status:null,
  hum_gw_raw_water_tank_high_level_fault:null,
  hum_gw_final_water_tank_high_level_fault:null,
  hum_gw_flow_meter_1_flow_rate:null,
  hum_gw_flow_meter_1_total_flow:null,
  hum_gw_flow_meter_2_flow_rate:null,
  hum_gw_flow_meter_2_total_flow:null,
  hum_gw_flow_meter_3_flow_rate:null,
  hum_gw_flow_meter_3_total_flow:null,
  hum_gw_borehole_lvl:null,
  hum_gw_raw_water_tank_lvl:null,
  hum_gw_final_water_tank_lvl:null,
  hum_gw_run_hours:null,
  }

  intervalLoop:any
  data:any = []
  humerail_TF:any

   tagArr:any=[
    "hum_gw_last_update",//0
    "hum_gw_mode",//2
    "hum_gw_pump_status",//3
    "hum_gw_raw_water_tank_high_level_fault",//7
    "hum_gw_final_water_tank_high_level_fault",//9
    "hum_gw_borehole_lvl",//16
    "hum_gw_raw_water_tank_lvl",//17
    "hum_gw_final_water_tank_lvl",//18
    "hum_gw_run_hours" //20
  ]
  faultArr:any=[
    "hum_gw_voltage_ok",
    "hum_gw_VSD_Fault",
    "hum_gw_borehole_low_level_fault",
    "hum_gw_raw_water_tank_low_level_fault",
    "hum_gw_final_water_tank_low_level_fault",


  ]


  faultVariable:any={
  hum_gw_voltage_ok: {
    value: null,
  alarm:"Fault",
  description:"Voltage Ok",
    alarmTrip: 0
  },
  hum_gw_VSD_Fault: {
    value: null,
  alarm:"Fault",
  description:"VSD Fault",
    alarmTrip: 1
  },
  hum_gw_borehole_low_level_fault: {
    value: null,
  alarm:"Warning",
  description:"Borehole Low Level",
    alarmTrip: 1
  },
  hum_gw_raw_water_tank_low_level_fault: {
    value: null,
  alarm:"Warning",
  description:"Raw Water Tank Low Level",
    alarmTrip: 1
  },
  hum_gw_final_water_tank_low_level_fault: {
    value: null,
  alarm:"Warning",
  description:"Final Water Tank Low Level",
    alarmTrip: 1
  },
};





  constructor(private ws: WebSocketService,private hum: humerail6Service,public recieve:Common ) {

    var updateTemp:any;
    this.theme = localStorage.getItem("theme");

    this.hum.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       Common.getRouteWithFault(this.tagArr,this.variable,this.data.routingArray,this.faultArr,this.faultVariable)
       this.variable.comms = Common.getLastUpdate(this.variable.hup6_ut)
    }
    )

    setTimeout(() => {

      var alarmG:any []=[this.faultVariable.hum_gw_voltage_ok,this.faultVariable.hum_gw_VSD_Fault,  this.faultVariable.hum_gw_borehole_low_level_fault,  this.faultVariable.hum_gw_raw_water_tank_low_level_fault,this.faultVariable.hum_gw_final_water_tank_low_level_fault]

      this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))
    },2000)




  }


  ngOnInit() {

    var tagVals:any =[]
    var errorVals:any=[]
    tagVals = this.recieve.recieveNMBMVals(this.tagArr);


    var updateTemp:any;

    errorVals = this.recieve.recieveNMBMVals(this.faultArr)
    this.intervalLoop = setInterval(() =>{

      updateTemp = tagVals[1];

      if(updateTemp !==undefined){

        this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);


        Common.setFaultValues(errorVals,this.faultVariable,this.faultArr);


        setTimeout(() =>{
          var alarmG:any []=[this.faultVariable.hum_gw_voltage_ok,this.faultVariable.hum_gw_VSD_Fault,  this.faultVariable.hum_gw_borehole_low_level_fault,  this.faultVariable.hum_gw_raw_water_tank_low_level_fault,this.faultVariable.hum_gw_final_water_tank_low_level_fault]

          this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))
        },2000)

      }
      this.comms = Common.getLastUpdate(this.variable.hum_gw_last_update)



    },6000)
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
