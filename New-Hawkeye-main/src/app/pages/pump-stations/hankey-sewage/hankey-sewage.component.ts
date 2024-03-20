import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EChartsOption } from 'echarts';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { Common } from 'src/app/class/common';
import {svgImage} from "src/app/Service-Files/SVGImage/svgImage.service"
@Component({
  selector: 'app-hankey-sewage',
  templateUrl: './hankey-sewage.component.html',
  styleUrls: ['./hankey-sewage.component.css']
})
export class HankeySewageComponent implements OnInit {

  constructor( private pm:pagePostMethod, private svg: svgImage,) { }

  siteTitle:any = "Hankey Sewage"
  variable :any= {}
  faultArr:any = [
    "hank_ps_g_voltage_present",
    "hank_ps_g_surge_arrestor_fault",
    "hank_ps_g_bat_level_ok",
    "hank_ps_g_low_float_reach",
    "hank_ps_g_high_float_reach",
    "hank_ps_g_power_meter_comms_fail",
    "hank_ps_g_sump_level_analog_fail",
    "hank_ps_p1_vsd_fault",
    "hank_ps_p1_no_flow",
    "hank_ps_p1_e_stop",
    "hank_ps_p1_circuit_breaker_tripped",
    "hank_ps_p1_startup_failure",
    "hank_ps_p1_vsd_analog_fail",
    "hank_ps_p2_vsd_fault",
    "hank_ps_p2_no_flow",
    "hank_ps_p2_e_stop",
    "hank_ps_p2_circuit_breaker_tripped",
    "hank_ps_p2_startup_failure",
    "hank_ps_p2_vsd_analog_fail",
    "hank_ps_p3_vsd_fault",
    "hank_ps_p3_no_flow",
    "hank_ps_p3_e_stop",
    "hank_ps_p3_circuit_breaker_tripped",
    "hank_ps_p3_startup_failure",
    "hank_ps_p3_vsd_analog_fail",
  ]
  faultVariable:any={
    hank_ps_g_voltage_present: {
      value: null,
      alarm:"Fault",
      alarmTrip: 0,
      description:"Voltage Not Present"
    },
     hank_ps_g_surge_arrestor_fault: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Surge Arrestor Fault"
    },
     
     hank_ps_g_bat_level_ok: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Battery Level"
    },
     hank_ps_g_low_float_reach: {
      value: null,
      alarm:"Fault",
      alarmTrip: 0,
      description:"Low Float"
    },
      hank_ps_g_high_float_reach: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"High Float"
    },
     hank_ps_g_power_meter_comms_fail: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Power Meter Comms Fail"
    },
      hank_ps_g_sump_level_analog_fail: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Sump Level Analog Fail"
    },
      
      
       hank_ps_p1_vsd_fault: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"VSD Fault"
    },
     hank_ps_p1_no_flow: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"No Flow"
    },
     
     hank_ps_p1_e_stop: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"E-Stop"
    },
     hank_ps_p1_circuit_breaker_tripped: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Circuit Breaker Tripped"
    },
      hank_ps_p1_startup_failure: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Startup Failure"
    },
     hank_ps_p1_vsd_analog_fail: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"VSD Analog Fail"
    },
    hank_ps_p2_vsd_fault: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"VSD Fault"
    },
     hank_ps_p2_no_flow: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"No Flow"
    },
     
     hank_ps_p2_e_stop: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"E-Stop"
    },
     hank_ps_p2_circuit_breaker_tripped: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Circuit Breaker Tripped"
    },
      hank_ps_p2_startup_failure: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Startup Failure"
    },
     hank_ps_p2_vsd_analog_fail: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"VSD Analog Fail"
    },
     
     hank_ps_p3_vsd_fault: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"VSD Fault"
    },
     hank_ps_p3_no_flow: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"No Flow"
    },
     
     hank_ps_p3_e_stop: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"E-Stop"
    },
     hank_ps_p3_circuit_breaker_tripped: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Circuit Breaker Tripped"
    },
      hank_ps_p3_startup_failure: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"Startup Failure"
    },
     hank_ps_p3_vsd_analog_fail: {
      value: null,
      alarm:"Fault",
      alarmTrip: 1,
      description:"VSD Analog Fail"
    },
     
  
  
  }
  intervalLoop: any
  ngOnInit(): void {
    this.intervalLoop = this.pm.findPageDataForNewSites("nmbm_hank_ps", "PS_CurrentVals").subscribe((result) => {
      this.variable =  result;

      console.log(this.variable)


      this.sump = this.variable.hank_ps_g_sump_level;


      
      this.pumpColor1 = svgImage.getSVGColor(this.variable.hank_ps_1_status)
      this.pumpColor2 = svgImage.getSVGColor(this.variable.hank_ps_2_status)
      this.pumpColor3 = svgImage.getSVGColor(this.variable.hank_ps_3_status)

      this.variablesMatric1 = [{
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.hank_ps_1_mode
      },{
        rowType:"TextRow",
        label:"Status",
        value:this.variable.hank_ps_1_status
      },{
        rowType:"TextRow",
        label:"Speed",
        value:this.variable.hank_ps_p1_speed + "Hz"
      },{
        rowType:"TextRow",
        label:"Num Of Starts",
        value:this.variable.hank_ps_p1_num_of_starts
      },{
        rowType:"TextRow",
        label:"Run Hours",
        value:this.variable.hank_ps_p1_run_hours + "h"
      }]
  
      this.variablesMatric2 = [{
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.hank_ps_2_mode
      },{
        rowType:"TextRow",
        label:"Status",
        value:this.variable.hank_ps_2_status
      },{
        rowType:"TextRow",
        label:"Speed",
        value:this.variable.hank_ps_p2_speed + "Hz"
      },{
        rowType:"TextRow",
        label:"Num Of Starts",
        value:this.variable.hank_ps_p2_num_of_starts
      },{
        rowType:"TextRow",
        label:"Run Hours",
        value:this.variable.hank_ps_p2_run_hours + "h"
      }]
  
      this.variablesMatric3 = [{
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.hank_ps_3_mode
      },{
        rowType:"TextRow",
        label:"Status",
        value:this.variable.hank_ps_3_status
      },{
        rowType:"TextRow",
        label:"Speed",
        value:this.variable.hank_ps_p3_speed + "Hz"
      },{
        rowType:"TextRow",
        label:"Num Of Starts",
        value:this.variable.hank_ps_p3_num_of_starts
      },{
        rowType:"TextRow",
        label:"Run Hours",
        value:this.variable.hank_ps_p3_run_hours + "h"
      }]
      Common.getFaultRouteDatas(this.faultArr,this.faultVariable,this.variable)
      var alarmG: any [] = [this.faultVariable.hank_ps_g_voltage_present,this.faultVariable.hank_ps_g_surge_arrestor_fault,this.faultVariable.hank_ps_g_bat_level_ok,this.faultVariable.hank_ps_g_low_float_reach,this.faultVariable.hank_ps_g_high_float_reach,this.faultVariable.hank_ps_g_power_meter_comms_fail,this.faultVariable.hank_ps_g_sump_level_analog_fail]
      var alarm1: any [] = [this.faultVariable.hank_ps_p1_vsd_fault,this.faultVariable.hank_ps_p1_vsd_fault,this.faultVariable.hank_ps_p1_no_flow, this.faultVariable.hank_ps_p1_e_stop, this.faultVariable.hank_ps_p1_circuit_breaker_tripped,this.faultVariable.hank_ps_p1_startup_failure, this.faultVariable.hank_ps_p1_vsd_analog_fail]
      var alarm2: any [] = [this.faultVariable.hank_ps_p2_vsd_fault,this.faultVariable.hank_ps_p2_vsd_fault,this.faultVariable.hank_ps_p2_no_flow, this.faultVariable.hank_ps_p2_e_stop, this.faultVariable.hank_ps_p2_circuit_breaker_tripped,this.faultVariable.hank_ps_p2_startup_failure, this.faultVariable.hank_ps_p2_vsd_analog_fail]
      var alarm3: any [] = [this.faultVariable.hank_ps_p3_vsd_fault,this.faultVariable.hank_ps_p3_vsd_fault,this.faultVariable.hank_ps_p3_no_flow, this.faultVariable.hank_ps_p3_e_stop, this.faultVariable.hank_ps_p3_circuit_breaker_tripped,this.faultVariable.hank_ps_p3_startup_failure, this.faultVariable.hank_ps_p3_vsd_analog_fail]
  
      this.dataSourceG = new MatTableDataSource(Common.getAlarmValue(alarmG))
      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
  


    })


  }
  General:any = "General";
  Pump:any = "Pump";
  comms:any
  lastUpdate:any
  range:any
  isLoading:boolean;
  options1:EChartsOption
options2:EChartsOption
  sump:any


  pumpColor1:any
pumpColor2:any 
pumpColor3:any 
dataSourceG:any;
dataSourceP1:any;
dataSourceP2:any;
dataSourceP3:any;

variablesMatric1:any = {}
variablesMatric2:any = {}
variablesMatric3:any = {}

pump1:any = "Pump 1"
pump2:any = "Pump 2"
pump3:any = "Pump 3";


  recieveDate($event: any){
    var trend :any;
    this.range = $event;
    this.isLoading = false;

  }
}
