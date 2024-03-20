import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import {MatTableDataSource} from '@angular/material/table';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { from, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {ControlLog} from 'src/app/models/controlLog.model'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerURLService } from 'src/app/Service-Files/server-url.service';
import { ControlLogService } from 'src/app/Service-Files/control-log.service';
import { NgForm } from '@angular/forms';
import { SiteControlService } from 'src/app/Service-Files/site-control.service';
import { standfordRoadComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service';
import {StanOnOffService} from 'src/app/Service-Files/standfordpumponofstate.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { svgImage } from 'src/app/Service-Files/SVGImage/svgImage.service';
export interface PeriodicElement {
  alarm: string;
  description: string;
}



@Component({
  selector: 'app-stanford-road',
  templateUrl: './stanford-road.component.html',
  styleUrls: ['./stanford-road.component.css']
})
export class StanfordRoadComponent implements OnInit {
  controlAccess=false;


ps_speed:any = 0

p1_btn:any = false
p2_btn:any= false
p3_btn:any= false
p4_btn:any= false

  public authListenerSubs!: Subscription;

  userIsAuthenticated =false;
  error:boolean = false;
  userSites:string[];
  firstName:string;
  secondName: string;

  variable :any= {


  comms: null,
    stan_common_suction_pressure:null,
    stan_common_delivery_pressure:null,
    stan_pump_station_flow:null,
    stan_ps_ut:null,
    stan_p1_stat:null,
    stan_p1_localremote:null,
    stan_p1_pumprunning:null,
    stan_p1_alarmshigh:null,
    stan_p1_pumpavailable:null,
    stan_p1_vsd_actfreq:null,
    stan_p1_motor_power:null,
    stan_p2_stat:null,
    stan_p2_localremote:null,
    stan_p2_pumprunning:null,
    stan_p2_alarmshigh:null,
    stan_p2_pumpavailable:null,
    stan_p2_vsd_actfreq:null,
    stan_p2_motor_power:null,
    stan_p3_stat:null,
    stan_p3_localremote:null,
    stan_p3_pumprunning:null,
    stan_p3_alarmshigh:null,
    stan_p3_pumpavailable:null,
    stan_p3_vsd_actfreq:null,
    stan_p3_motor_power:null,
    stan_p4_stat:null,
    stan_p4_localremote:null,
    stan_p4_pumprunning:null,
    stan_p4_alarmshigh:null,
    stan_p4_pumpavailable:null,
    stan_p4_vsd_actfreq:null,
    stan_p4_motor_power:null,

  }

    pump1OnOff:boolean
    pump2OnOff:boolean
    pump3OnOff:boolean
    pump4OnOff:boolean
    intervalLoop: any
    stan_ps_scada_speed_sp:any=0

    stan_p1_scada_run_command:any=false
    stan_p2_scada_run_command:any=false
    stan_p3_scada_run_command:any=false
    stan_p4_scada_run_command:any=false

    stan_hawkeye_enable_control:any=false


    ELEMENT_DATA_P1: PeriodicElement[] = [];
    ELEMENT_DATA_P2: PeriodicElement[] = [];
    ELEMENT_DATA_P3: PeriodicElement[] = [];
    ELEMENT_DATA_P4: PeriodicElement[] = [];

    displayedColumns :string[]= ['alarm', 'description'];

    dataSourceP1:any
    dataSourceP2:any
    dataSourceP3:any
    dataSourceP4:any
    dataSourceP5:any


    theme:any = localStorage.getItem("theme");
  data: any=[];

  
siteTitle:any = "Standford Road";
  pump1="Pump 1"
  pump2="Pump 2"
  pump3="Pump 3"
  pump4 = "Pump 4"
   pump5="Pump 5"
  titleG ="General"

   tagArr:any =[
    "stan_ps_ut",//0
    "stan_common_suction_pressure",//1
    "stan_common_delivery_pressure",//2
    "stan_pump_station_flow",//3
    "stan_p1_stat",//4
    "stan_p1_localremote",//5
    "stan_p1_pumprunning",//6
    "stan_p1_alarmshigh",//7

    "stan_p1_pumpavailable",//9
    "stan_p1_vsd_actfreq",//10
    "stan_p1_motor_power",//11
    "stan_p2_stat",//12
    "stan_p2_localremote",//13
    "stan_p2_pumprunning",//14
    "stan_p2_alarmshigh",//15

    "stan_p2_pumpavailable",//17
    "stan_p2_vsd_actfreq",//18
    "stan_p2_motor_power",//19
    "stan_p3_stat",//20
    "stan_p3_localremote",//21
    "stan_p3_pumprunning",//22
    "stan_p3_alarmshigh",//23

    "stan_p3_pumpavailable",//25
    "stan_p3_vsd_actfreq",//26
    "stan_p3_motor_power",//27
    "stan_p4_stat",//28
    "stan_p4_localremote",//29
    "stan_p4_pumprunning",//30
    "stan_p4_alarmshigh",//31

    "stan_p4_pumpavailable",//33
    "stan_p4_vsd_actfreq",//34
    "stan_p4_motor_power",//35
  ]

  faultArr:any=[
"stan_p_p1_pump_valves_not_ok",
"stan_p_p1_bypass_valves_closed",
"stan_p_p1_vsd_fault",
"stan_p_p1_temp_fault",
"stan_p_p1_condition_monitoring_fault",
"stan_p_p1_pressure_fault",
"stan_p_p1_no_flow_fault",
"stan_p_p1_emergency_stop_fault",
"stan_p_p1_start_delay_timer_active",
"stan_p_p1_flow_meter_fault",
"stan_p_p1_main_plc_comms_fault",
"stan_p_p2_pump_valves_not_ok",
"stan_p_p2_bypass_valves_closed",
"stan_p_p2_vsd_fault",
"stan_p_p2_temp_fault",
"stan_p_p2_condition_monitoring_fault",
"stan_p_p2_pressure_fault",
"stan_p_p2_no_flow_fault",
"stan_p_p2_emergency_stop_fault",
"stan_p_p2_start_delay_timer_active",
"stan_p_p2_flow_meter_fault",
"stan_p_p2_main_plc_comms_fault",
"stan_p_p3_pump_valves_not_ok",
"stan_p_p3_bypass_valves_closed",
"stan_p_p3_vsd_fault",
"stan_p_p3_temp_fault",
"stan_p_p3_condition_monitoring_fault",
"stan_p_p3_pressure_fault",
"stan_p_p3_no_flow_fault",
"stan_p_p3_emergency_stop_fault",
"stan_p_p3_start_delay_timer_active",
"stan_p_p3_flow_meter_fault",
"stan_p_p3_main_plc_comms_fault",
"stan_p_p4_pump_valves_not_ok",
"stan_p_p4_bypass_valves_closed",
"stan_p_p4_vsd_fault",
"stan_p_p4_temp_fault",
"stan_p_p4_condition_monitoring_fault",
"stan_p_p4_pressure_fault",
"stan_p_p4_no_flow_fault",
"stan_p_p4_emergency_stop_fault",
"stan_p_p4_start_delay_timer_active",
"stan_p_p4_flow_meter_fault",
"stan_p_p4_main_plc_comms_fault",
"stan_p_p5_pump_valves_not_ok",
"stan_p_p5_bypass_valves_closed",
"stan_p_p5_vsd_fault",
"stan_p_p5_temp_fault",
"stan_p_p5_condition_monitoring_fault",
"stan_p_p5_pressure_fault",
"stan_p_p5_no_flow_fault",
"stan_p_p5_emergency_stop_fault",
"stan_p_p5_start_delay_timer_active",
"stan_p_p5_flow_meter_fault",
"stan_p_p5_main_plc_comms_fault",
  ]

  faultVariable: any = {
stan_p_p1_pump_valves_not_ok:{
  value:null,
  alarm:"Fault",
  description:"Pump Valves Not Ok",
  alarmTrip:1,
},
stan_p_p1_bypass_valves_closed:{
  value:null,
  alarm:"Fault",
  description:"Bypass Valves Closed",
  alarmTrip:1,
},
stan_p_p1_vsd_fault:{
  value:null,
  alarm:"Fault",
  description:"VSD Fault",
  alarmTrip:1,
},
stan_p_p1_temp_fault:{
  value:null,
  alarm:"Fault",
  description:"Temp Fault",
  alarmTrip:1,
},
stan_p_p1_condition_monitoring_fault:{
  value:null,
  alarm:"Fault",
  description:"Condition Monitoring Fault",
  alarmTrip:1,
},
stan_p_p1_pressure_fault:{
  value:null,
  alarm:"Fault",
  description:"Pressure Fault",
  alarmTrip:1,
},
stan_p_p1_no_flow_fault:{
  value:null,
  alarm:"Fault",
  description:"No Flow Fault",
  alarmTrip:1,
},
stan_p_p1_emergency_stop_fault:{
  value:null,
  alarm:"Fault",
  description:"Emergency Stop Fault",
  alarmTrip:1,
},
stan_p_p1_start_delay_timer_active:{
  value:null,
  alarm:"Fault",
  description:"Start Delay Timer Active",
  alarmTrip:1,
},
stan_p_p1_flow_meter_fault:{
  value:null,
  alarm:"Fault",
  description:"Flow Meter Fault",
  alarmTrip:1,
},
stan_p_p1_main_plc_comms_fault:{
  value:null,
  alarm:"Fault",
  description:"Main PLC Comms Fault",
  alarmTrip:1,
    },
stan_p_p2_pump_valves_not_ok:{
  value:null,
  alarm:"Fault",
  description:"Pump Valves Not Ok",
  alarmTrip:1,
},
stan_p_p2_bypass_valves_closed:{
  value:null,
  alarm:"Fault",
  description:"Bypass Valves Closed",
  alarmTrip:1,
},
stan_p_p2_vsd_fault:{
  value:null,
  alarm:"Fault",
  description:"VSD Fault",
  alarmTrip:1,
},
stan_p_p2_temp_fault:{
  value:null,
  alarm:"Fault",
  description:"Temp Fault",
  alarmTrip:1,
},
stan_p_p2_condition_monitoring_fault:{
  value:null,
  alarm:"Fault",
  description:"Condition Monitoring Fault",
  alarmTrip:1,
},
stan_p_p2_pressure_fault:{
  value:null,
  alarm:"Fault",
  description:"Pressure Fault",
  alarmTrip:1,
},
stan_p_p2_no_flow_fault:{
  value:null,
  alarm:"Fault",
  description:"No Flow Fault",
  alarmTrip:1,
},
stan_p_p2_emergency_stop_fault:{
  value:null,
  alarm:"Fault",
  description:"Emergency Stop Fault",
  alarmTrip:1,
},
stan_p_p2_start_delay_timer_active:{
  value:null,
  alarm:"Fault",
  description:"Start Delay Timer Active",
  alarmTrip:1,
},
stan_p_p2_flow_meter_fault:{
  value:null,
  alarm:"Fault",
  description:"Flow Meter Fault",
  alarmTrip:1,
},
stan_p_p2_main_plc_comms_fault:{
  value:null,
  alarm:"Fault",
  description:"Main PLC Comms Fault",
  alarmTrip:1,
},stan_p_p3_pump_valves_not_ok:{
  value:null,
  alarm:"Fault",
  description:"Pump Valves Not Ok",
  alarmTrip:1,
},
stan_p_p3_bypass_valves_closed:{
  value:null,
  alarm:"Fault",
  description:"Bypass Valves Closed",
  alarmTrip:1,
},
stan_p_p3_vsd_fault:{
  value:null,
  alarm:"Fault",
  description:"VSD Fault",
  alarmTrip:1,
},
stan_p_p3_temp_fault:{
  value:null,
  alarm:"Fault",
  description:"Temp Fault",
  alarmTrip:1,
},
stan_p_p3_condition_monitoring_fault:{
  value:null,
  alarm:"Fault",
  description:"Condition Monitoring Fault",
  alarmTrip:1,
},
stan_p_p3_pressure_fault:{
  value:null,
  alarm:"Fault",
  description:"Pressure Fault",
  alarmTrip:1,
},
stan_p_p3_no_flow_fault:{
  value:null,
  alarm:"Fault",
  description:"No Flow Fault",
  alarmTrip:1,
},
stan_p_p3_emergency_stop_fault:{
  value:null,
  alarm:"Fault",
  description:"Emergency Stop Fault",
  alarmTrip:1,
},
stan_p_p3_start_delay_timer_active:{
  value:null,
  alarm:"Fault",
  description:"Start Delay Timer Active",
  alarmTrip:1,
},
stan_p_p3_flow_meter_fault:{
  value:null,
  alarm:"Fault",
  description:"Flow Meter Fault",
  alarmTrip:1,
},
stan_p_p3_main_plc_comms_fault:{
  value:null,
  alarm:"Fault",
  description:"Main PLC Comms Fault",
  alarmTrip:1,
},stan_p_p4_pump_valves_not_ok:{
  value:null,
  alarm:"Fault",
  description:"Pump Valves Not Ok",
  alarmTrip:1,
},
stan_p_p4_bypass_valves_closed:{
  value:null,
  alarm:"Fault",
  description:"Bypass Valves Closed",
  alarmTrip:1,
},
stan_p_p4_vsd_fault:{
  value:null,
  alarm:"Fault",
  description:"VSD Fault",
  alarmTrip:1,
},
stan_p_p4_temp_fault:{
  value:null,
  alarm:"Fault",
  description:"Temp Fault",
  alarmTrip:1,
},
stan_p_p4_condition_monitoring_fault:{
  value:null,
  alarm:"Fault",
  description:"Condition Monitoring Fault",
  alarmTrip:1,
},
stan_p_p4_pressure_fault:{
  value:null,
  alarm:"Fault",
  description:"Pressure Fault",
  alarmTrip:1,
},
stan_p_p4_no_flow_fault:{
  value:null,
  alarm:"Fault",
  description:"No Flow Fault",
  alarmTrip:1,
},
stan_p_p4_emergency_stop_fault:{
  value:null,
  alarm:"Fault",
  description:"Emergency Stop Fault",
  alarmTrip:1,
},
stan_p_p4_start_delay_timer_active:{
  value:null,
  alarm:"Fault",
  description:"Start Delay Timer Active",
  alarmTrip:1,
},
stan_p_p4_flow_meter_fault:{
  value:null,
  alarm:"Fault",
  description:"Flow Meter Fault",
  alarmTrip:1,
},
stan_p_p4_main_plc_comms_fault:{
  value:null,
  alarm:"Fault",
  description:"Main PLC Comms Fault",
  alarmTrip:1,
},stan_p_p5_pump_valves_not_ok:{
  value:null,
  alarm:"Fault",
  description:"Pump Valves Not Ok",
  alarmTrip:1,
},
stan_p_p5_bypass_valves_closed:{
  value:null,
  alarm:"Fault",
  description:"Bypass Valves Closed",
  alarmTrip:1,
},
stan_p_p5_vsd_fault:{
  value:null,
  alarm:"Fault",
  description:"VSD Fault",
  alarmTrip:1,
},
stan_p_p5_temp_fault:{
  value:null,
  alarm:"Fault",
  description:"Temp Fault",
  alarmTrip:1,
},
stan_p_p5_condition_monitoring_fault:{
  value:null,
  alarm:"Fault",
  description:"Condition Monitoring Fault",
  alarmTrip:1,
},
stan_p_p5_pressure_fault:{
  value:null,
  alarm:"Fault",
  description:"Pressure Fault",
  alarmTrip:1,
},
stan_p_p5_no_flow_fault:{
  value:null,
  alarm:"Fault",
  description:"No Flow Fault",
  alarmTrip:1,
},
stan_p_p5_emergency_stop_fault:{
  value:null,
  alarm:"Fault",
  description:"Emergency Stop Fault",
  alarmTrip:1,
},
stan_p_p5_start_delay_timer_active:{
  value:null,
  alarm:"Fault",
  description:"Start Delay Timer Active",
  alarmTrip:1,
},
stan_p_p5_flow_meter_fault:{
  value:null,
  alarm:"Fault",
  description:"Flow Meter Fault",
  alarmTrip:1,
},
stan_p_p5_main_plc_comms_fault:{
  value:null,
  alarm:"Fault",
  description:"Main PLC Comms Fault",
  alarmTrip:1,
},

  }

  variablesMatricG:any = {}
  variablesMatric1:any = {}
  variablesMatric2:any = {}
  variablesMatric3:any = {}
  variablesMatric4: any = {}
  variablesMatric5: any = {}
  
  pumpColor1:any
  pumpColor2:any
  pumpColor3:any
  pumpColor4: any
  pumpColor5: any
  
    Pump:any = "Pump";

    

  constructor(private http: HttpClient,private pt: PostTrend, private su:ServerURLService, private cl:ControlLogService, private pm:pagePostMethod, private as:AuthService,  private site_Control: SiteControlService,  private onOf: StanOnOffService,public recieve:Common ) {

    this.intervalLoop = this.pm.findPageData("nmbm_stan_ps_new", "PS_CurrentVals").subscribe((result) => {
      this.variable = result;


      console.log(this.variable)
      
      console.log(this.data)

      this.variable.comms = Common.getLastUpdate(this.variable.stan_g_p_new_ut)

      this.variable.stan_p_p1_modes = svgImage.returnMotherwellWord(this.variable.stan_p_p1_mode)
      this.variable.stan_p_p2_modes = svgImage.returnMotherwellWord(this.variable.stan_p_p2_mode)
      this.variable.stan_p_p3_modes = svgImage.returnMotherwellWord(this.variable.stan_p_p3_mode)
      this.variable.stan_p_p4_modes = svgImage.returnMotherwellWord(this.variable.stan_p_p4_mode)
      this.variable.stan_p_p5_modes = svgImage.returnMotherwellWord(this.variable.stan_p_p5_mode)

      this.pumpColor1 = svgImage.getSVGColor(this.variable.stan_p_p1_status)
      this.pumpColor2 = svgImage.getSVGColor(this.variable.stan_p_p2_status)
      this.pumpColor3 = svgImage.getSVGColor(this.variable.stan_p_p3_status)
      this.pumpColor4 = svgImage.getSVGColor(this.variable.stan_p_p4_status)
      this.pumpColor5 = svgImage.getSVGColor(this.variable.stan_p_p5_status)
      


  this.variablesMatricG = [{
        rowType:"TextRow",
        label:"Common Suction Pressure",
        value:this.variable.stan_g_p_com_suc_pres+ " bar"
      },
      {
        rowType:"TextRow",
        label:"Common Delivery Pressure",
        value:this.variable.stan_g_p_com_del_pres+ " bar"
      },
      {
        rowType:"TextRow",
        label:"Flow Rate",
        value:this.variable.stan_g_p_flow_rate+ " Ml/d"
      },
      {
        rowType:"TextRow",
        label:"Total Flow",
        value:this.variable.stan_g_p_tf + " Ml"
      },
      {
        rowType:"TextRow",
        label:"Total Flow Required",
        value:this.variable.stan_g_p_flow_rate_req+ " Ml/d"
      },
      // {
      //   rowType:"TextRow",
      //   label:"Number of Pumps Required",
      //   value:this.variable.stan_g_p_num_of_pump_req
      // },
    ]
    this.variablesMatric1 = [{
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.stan_p_p1_modes
      },{
      rowType:"TextRow",
      label:"Status",
      value:this.variable.stan_p_p1_status
    },{
      rowType:"TextRow",
      label:"Run Time Hours",
      value:this.variable.stan_p_p1_run_time_hours
    },{
      rowType:"TextRow",
      label:"Number of Starts",
      value:this.variable.stan_p_p1_pump_start
    },
    {
      rowType:"TextRow",
      label:"Speed",
      value:this.variable.stan_p_p1_pump_speed+" rpm"
    },

  ]
    this.variablesMatric2  = [{
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.stan_p_p2_modes
      },{
      rowType:"TextRow",
      label:"Status",
      value:this.variable.stan_p_p2_status
    },{
      rowType:"TextRow",
      label:"Run Time Hours",
      value:this.variable.stan_p_p2_run_time_hours
    },{
      rowType:"TextRow",
      label:"Number of Starts",
      value:this.variable.stan_p_p2_pump_start
    },
    {
      rowType:"TextRow",
      label:"Speed",
      value:this.variable.stan_p_p2_pump_speed+" rpm"
    },

  ]
    this.variablesMatric3  = [{
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.stan_p_p3_modes
      },{
      rowType:"TextRow",
      label:"Status",
      value:this.variable.stan_p_p3_status
    },{
      rowType:"TextRow",
      label:"Run Time Hours",
      value:this.variable.stan_p_p3_run_time_hours
    },{
      rowType:"TextRow",
      label:"Number of Starts",
      value:this.variable.stan_p_p3_pump_start
    },
    {
      rowType:"TextRow",
      label:"Speed",
      value:this.variable.stan_p_p3_pump_speed+" rpm"
    },

  ]
    this.variablesMatric4  = [{
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.stan_p_p4_modes
      },{
      rowType:"TextRow",
      label:"Status",
      value:this.variable.stan_p_p4_status
    },{
      rowType:"TextRow",
      label:"Run Time Hours",
      value:this.variable.stan_p_p4_run_time_hours
    },{
      rowType:"TextRow",
      label:"Number of Starts",
      value:this.variable.stan_p_p4_pump_start
    },
    {
      rowType:"TextRow",
      label:"Speed",
      value:this.variable.stan_p_p4_pump_speed+" rpm"
    },

  ]
    this.variablesMatric5  = [{
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.stan_p_p5_modes
      },{
      rowType:"TextRow",
      label:"Status",
      value:this.variable.stan_p_p5_status
    },{
      rowType:"TextRow",
      label:"Run Time Hours",
      value:this.variable.stan_p_p5_run_time_hours
    },{
      rowType:"TextRow",
      label:"Number of Starts",
      value:this.variable.stan_p_p5_pump_start
    },
    {
      rowType:"TextRow",
      label:"Speed",
      value:this.variable.stan_p_p5_pump_speed+" rpm"
    },]
    
    Common.getFaultRouteDatas(this.faultArr, this.faultVariable, this.variable);

    var alarm1: any[] = [this.faultVariable.stan_p_p1_pump_valves_not_ok,this.faultVariable.stan_p_p1_bypass_valves_closed,this.faultVariable.stan_p_p1_vsd_fault,this.faultVariable.stan_p_p1_temp_fault,this.faultVariable.stan_p_p1_condition_monitoring_fault,this.faultVariable.stan_p_p1_pressure_fault,this.faultVariable.stan_p_p1_no_flow_fault,this.faultVariable.stan_p_p1_emergency_stop_fault,this.faultVariable.stan_p_p1_start_delay_timer_active,this.faultVariable.stan_p_p1_flow_meter_fault,this.faultVariable.stan_p_p1_main_plc_comms_fault];
    var alarm2: any[] = [this.faultVariable.stan_p_p2_pump_valves_not_ok,this.faultVariable.stan_p_p2_bypass_valves_closed,this.faultVariable.stan_p_p2_vsd_fault,this.faultVariable.stan_p_p2_temp_fault,this.faultVariable.stan_p_p2_condition_monitoring_fault,this.faultVariable.stan_p_p2_pressure_fault,this.faultVariable.stan_p_p2_no_flow_fault,this.faultVariable.stan_p_p2_emergency_stop_fault,this.faultVariable.stan_p_p2_start_delay_timer_active,this.faultVariable.stan_p_p2_flow_meter_fault,this.faultVariable.stan_p_p2_main_plc_comms_fault];
    var alarm3: any[] = [this.faultVariable.stan_p_p3_pump_valves_not_ok,this.faultVariable.stan_p_p3_bypass_valves_closed,this.faultVariable.stan_p_p3_vsd_fault,this.faultVariable.stan_p_p3_temp_fault,this.faultVariable.stan_p_p3_condition_monitoring_fault,this.faultVariable.stan_p_p3_pressure_fault,this.faultVariable.stan_p_p3_no_flow_fault,this.faultVariable.stan_p_p3_emergency_stop_fault,this.faultVariable.stan_p_p3_start_delay_timer_active,this.faultVariable.stan_p_p3_flow_meter_fault,this.faultVariable.stan_p_p3_main_plc_comms_fault];
    var alarm4: any[] = [this.faultVariable.stan_p_p4_pump_valves_not_ok,this.faultVariable.stan_p_p4_bypass_valves_closed,this.faultVariable.stan_p_p4_vsd_fault,this.faultVariable.stan_p_p4_temp_fault,this.faultVariable.stan_p_p4_condition_monitoring_fault,this.faultVariable.stan_p_p4_pressure_fault,this.faultVariable.stan_p_p4_no_flow_fault,this.faultVariable.stan_p_p4_emergency_stop_fault,this.faultVariable.stan_p_p4_start_delay_timer_active,this.faultVariable.stan_p_p4_flow_meter_fault,this.faultVariable.stan_p_p4_main_plc_comms_fault];
    var alarm5: any[] = [this.faultVariable.stan_p_p5_pump_valves_not_ok,this.faultVariable.stan_p_p5_bypass_valves_closed,this.faultVariable.stan_p_p5_vsd_fault,this.faultVariable.stan_p_p5_temp_fault,this.faultVariable.stan_p_p5_condition_monitoring_fault,this.faultVariable.stan_p_p5_pressure_fault,this.faultVariable.stan_p_p5_no_flow_fault,this.faultVariable.stan_p_p5_emergency_stop_fault,this.faultVariable.stan_p_p5_start_delay_timer_active,this.faultVariable.stan_p_p5_flow_meter_fault,this.faultVariable.stan_p_p5_main_plc_comms_fault];
       

    this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
    this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
    this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
    this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))
    this.dataSourceP5 = new MatTableDataSource(Common.getAlarmValue(alarm5))

    })
    this.onOf.GetSiteValues()
    .subscribe(rsp=>{
      this.data = rsp;
      this.pump1OnOff = this.data.routingArray[0].p1_run;
      this.pump2OnOff = this.data.routingArray[0].p2_run;
      this.pump3OnOff = this.data.routingArray[0].p3_run;
      this.pump4OnOff = this.data.routingArray[0].p4_run;
    })

    this.userSites = this.as.getUserSites();
    this.firstName = this.as.getFirstName();
    this.secondName = this.as.getSecondName();
    this.authListenerSubs = this.as.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.as.getUserSites();
      this.firstName = this.as.getFirstName();
      this.secondName = this.as.getSecondName();
    })
      const findval = this.userSites.includes("NMB_STAN_R_PS_CON")
      if(findval== true){
        this.controlAccess=true;
    }
    

  
  }

  ngOnInit() {
    this.site_Control.getStanControlByte().subscribe((resp:any)=>{
      this.stan_hawkeye_enable_control =  resp.ps_control
      this.stan_ps_scada_speed_sp = resp.ps_speed
      this.stan_p1_scada_run_command= resp.p1_run
      this.stan_p2_scada_run_command= resp.p2_run
      this.stan_p3_scada_run_command= resp.p3_run
      this.stan_p4_scada_run_command= resp.p4_run

      })

  }

  onP1PowerClickOn(){


   var name = this.firstName +" " +this.secondName
   var date = this.getCurrentDate()
   const controlLog : ControlLog={
    name: name,
    date: date,
    site:"Stanford Road",
    pump:"Pump 1",
    description: "Turned Pump On"
  };
    this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

    this.stan_p1_scada_run_command= true
    this.site_Control.saveStanPump1Run(this.stan_p1_scada_run_command)
    this.pump1OnOff=true;
  }
  onP1PowerClickOff(){
     this.p1_btn ="Off"

    var name = this.firstName +" " +this.secondName
    var date = this.getCurrentDate()
    const controlLog : ControlLog={
    name: name,
    date: date,
    site:"Stanford Road",
    pump:"Pump 1",
    description: "Turned Pump OFF"
  };
    this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

    this.stan_p1_scada_run_command= false
    this.site_Control.saveStanPump1Run(this.stan_p1_scada_run_command)


    this.pump1OnOff=false;
      }

      onP2PowerClickOn(){

        this.p2_btn ="Start"

        var name = this.firstName +" " +this.secondName
        var date = this.getCurrentDate()
        const controlLog : ControlLog={
         name: name,
         date: date,
         site:"Stanford Road",
         pump:"Pump 2",
         description: "Turned Pump On"
       };
         this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

         this.stan_p2_scada_run_command= true
         this.site_Control.saveStanPump2Run(this.stan_p2_scada_run_command)
         this.pump2OnOff=true;
       }
       onP2PowerClickOff(){
          this.p2_btn ="Off"

         var name = this.firstName +" " +this.secondName
         var date = this.getCurrentDate()
         const controlLog : ControlLog={
         name: name,
         date: date,
         site:"Stanford Road",
         pump:"Pump 2",
         description: "Turned Pump OFF"
       };
         this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

         this.stan_p2_scada_run_command= false
         this.site_Control.saveStanPump2Run(this.stan_p2_scada_run_command)
         this.pump2OnOff=false;
           }

           onP3PowerClickOn(){

            this.p3_btn ="Start"

            var name = this.firstName +" " +this.secondName
            var date = this.getCurrentDate()
            const controlLog : ControlLog={
             name: name,
             date: date,
             site:"Stanford Road",
             pump:"Pump 3",
             description: "Turned Pump On"
           };
             this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

             this.stan_p3_scada_run_command= true
             this.site_Control.saveStanPump3Run(this.stan_p3_scada_run_command)
             this.pump3OnOff=true;
           }
           onP3PowerClickOff(){
              this.p3_btn ="Off"

             var name = this.firstName +" " +this.secondName
             var date = this.getCurrentDate()
             const controlLog : ControlLog={
             name: name,
             date: date,
             site:"Stanford Road",
             pump:"Pump 3",
             description: "Turned Pump OFF"
           };
            //  this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

             this.stan_p3_scada_run_command= false
             this.site_Control.saveStanPump3Run(this.stan_p3_scada_run_command)
             this.pump3OnOff=false;
               }

               onP4PowerClickOn(){

                this.p4_btn ="Start"

                var name = this.firstName +" " +this.secondName
                var date = this.getCurrentDate()
                const controlLog : ControlLog={
                 name: name,
                 date: date,
                 site:"Stanford Road",
                 pump:"Pump 4",
                 description: "Turned Pump On"
               }


                 this.stan_p4_scada_run_command= true
                 this.site_Control.saveStanPump4Run(this.stan_p4_scada_run_command)

                 this.cl.saveControlLog(controlLog)
                 this.pump4OnOff=true;
               }
               onP4PowerClickOff(){
                  this.p4_btn ="Off"

                 var name = this.firstName +" " +this.secondName
                 var date = this.getCurrentDate()
                 const controlLog : ControlLog={
                 name: name,
                 date: date,
                 site:"Stanford Road",
                 pump:"Pump 4",
                 description: "Turned Pump OFF"
               };
                //  this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/contro-log",controlLog).subscribe(()=>{})

                 this.stan_p4_scada_run_command= false
                 this.site_Control.saveStanPump4Run(this.stan_p4_scada_run_command)
                 this.pump4OnOff=false;
                   }

  onNewSpeedPoint(form: NgForm){

this.stan_ps_scada_speed_sp = form.value.speed
var name = this.firstName +" " +this.secondName
var date = this.getCurrentDate()
const controlLog : ControlLog={
name: name,
date: date,
site:"Stanford Road",
pump:"Pump 1",
description: "Set Speed to: " + form.value.speed +" rpm"
};
this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

this.site_Control.saveStanPumpSpeedCotrol(this.stan_ps_scada_speed_sp).subscribe((resp:any)=>{
  console.log(resp.ps_speed)
 this.stan_ps_scada_speed_sp=resp.ps_speed
})
}





ViewLogsClick(){
this.cl.GetSiteLog("Stanford Road")
}




/////////////////////////////////////////////////////////////////////////////////////////////

toggle(){


setTimeout(() => {

  if (this.stan_hawkeye_enable_control==false)
  {

    this.stan_p1_scada_run_command= false
    this.stan_p2_scada_run_command= false
    this.stan_p3_scada_run_command= false
    this.stan_p4_scada_run_command= false

    this.site_Control.saveStanPump1Run(this.stan_p1_scada_run_command)
    this.site_Control.saveStanPump2Run(this.stan_p2_scada_run_command)
    this.site_Control.saveStanPump3Run(this.stan_p3_scada_run_command)
    this.site_Control.saveStanPump4Run(this.stan_p4_scada_run_command)

  }
  var date = this.getCurrentDate()
  var name = this.firstName +" " +this.secondName
  const controlLog : ControlLog={
  name: name,
  date: date,
  site:"Stanford Road",
  pump:"All",
  description: "Hawkeye Control set to: " + this.stan_hawkeye_enable_control
  };
  this.http.post(this.su.serverURL+"/pumpstations/stanford-road/p1/control",controlLog).subscribe(()=>{})

  this.site_Control.saveStanPumpControl(this.stan_hawkeye_enable_control)
}, 100);






}

ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}

getCurrentDate(){
  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var date = year + '-' + month + '-' + day +" "+ hour +":" + min;
  return date;
}




isLoading:boolean ;
options1:EChartsOption;
options2:EChartsOption;
range:any;
trendTag:any = ["suction_pressure","delivery_pressure","flowRate"];

trendNameOne:string = "Pressure Data";
trendNameTwo:string = "Flow Data";

recieveDate($event: any){
  var trend :any;
  this.range = $event;
  this.isLoading = true;
  const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

  this.pt.getLevel("NMBM_STAN_BPS_TREND", this.trendTag,start,end).then((data) => {
    trend = data;

    this.options1 = this.recieve.getOptionsForLine2("Bar", "Suction Pressure", trend.LevelArr[0], "Delivery Pressure", trend.LevelArr[1]);

    this.options2 = Common.getOptionsForLine(this.options2,"Flow Rate Ml", trend.LevelArr[2]);
    this.isLoading = false;
  })
}
}
