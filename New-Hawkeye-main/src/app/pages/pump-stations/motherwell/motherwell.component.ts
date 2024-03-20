import { Component, Injectable, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {motherwellComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service'
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import {svgImage} from "src/app/Service-Files/SVGImage/svgImage.service"
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';

export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Injectable({ providedIn: "root" })
@Component({
  selector: 'app-motherwell',
  templateUrl: './motherwell.component.html',
  styleUrls: ['./motherwell.component.css']
})
export class MotherwellComponent implements OnInit {
  userSites:string[];
  public authListenerSubs!: Subscription;
  showNavigationButton: string;

  variable :any= {
    mw_g_p_new_ut:null,
    mw_g_p_com_suc_pres:null,
    mw_g_p_com_del_pres:null,
    mw_g_p_flow_rate:null,
    mw_g_p_tf:null,
    mw_g_p_flow_rate_req:null,
    mw_g_p_num_of_pump_req:null,
    mw_p_p1_mode:null,
    mw_p_p1_status:null,
    mw_p_p1_run_time_hours:null,
    mw_p_p1_pump_start:null,
    mw_p_p1_pump_speed:null,
    mw_p_p2_mode:null,
    mw_p_p2_status:null,
    mw_p_p2_run_time_hours:null,
    mw_p_p2_pump_start:null,
    mw_p_p2_pump_speed:null,
    mw_p_p3_mode:null,
    mw_p_p3_status:null,
    mw_p_p3_run_time_hours:null,
    mw_p_p3_pump_start:null,
    mw_p_p3_pump_speed:null,
    mw_p_p4_mode:null,
    mw_p_p4_status:null,
    mw_p_p4_run_time_hours:null,
    mw_p_p4_pump_start:null,
    mw_p_p4_pump_speed:null,
  }

  siteTitle="Motherwell"
  pump1="Pump 1"
  pump2="Pump 2"
  pump3="Pump 3"
  pump4="Pump 4"
  titleG ="General"


  faultArr:any=[
    "mw_p_p1_old_inlet_values_open",
    "mw_p_p1_pump_valves_not_ok",
    "mw_p_p1_bypass_valves_closed",
    "mw_p_p1_vsd_fault",
    "mw_p_p1_temp_fault",
    "mw_p_p1_condition_monitoring_fault",
    "mw_p_p1_pressure_fault",
    "mw_p_p1_no_flow_fault",
    "mw_p_p1_emergency_stop_fault",
    "mw_p_p1_start_delay_timer_active",
    "mw_p_p1_flow_meter_fault",
    "mw_p_p1_main_plc_comms_fault",
    "mw_p_p2_old_inlet_values_open",
    "mw_p_p2_pump_valves_not_ok",
    "mw_p_p2_bypass_valves_closed",
    "mw_p_p2_vsd_fault",
    "mw_p_p2_temp_fault",
    "mw_p_p2_condition_monitoring_fault",
    "mw_p_p2_pressure_fault",
    "mw_p_p2_no_flow_fault",
    "mw_p_p2_emergency_stop_fault",
    "mw_p_p2_start_delay_timer_active",
    "mw_p_p2_flow_meter_fault",
    "mw_p_p2_main_plc_comms_fault",
    "mw_p_p3_old_inlet_values_open",
    "mw_p_p3_pump_valves_not_ok",
    "mw_p_p3_bypass_valves_closed",
    "mw_p_p3_vsd_fault",
    "mw_p_p3_temp_fault",
    "mw_p_p3_condition_monitoring_fault",
    "mw_p_p3_pressure_fault",
    "mw_p_p3_no_flow_fault",
    "mw_p_p3_emergency_stop_fault",
    "mw_p_p3_start_delay_timer_active",
    "mw_p_p3_flow_meter_fault",
    "mw_p_p3_main_plc_comms_fault",
    "mw_p_p4_old_inlet_values_open",
    "mw_p_p4_pump_valves_not_ok",
    "mw_p_p4_bypass_valves_closed",
    "mw_p_p4_vsd_fault",
    "mw_p_p4_temp_fault",
    "mw_p_p4_condition_monitoring_fault",
    "mw_p_p4_pressure_fault",
    "mw_p_p4_no_flow_fault",
    "mw_p_p4_emergency_stop_fault",
    "mw_p_p4_start_delay_timer_active",
    "mw_p_p4_flow_meter_fault",
    "mw_p_p4_main_plc_comms_fault",
  ]

  faultVariable:any={
    mw_p_p1_old_inlet_values_open:{
      value: null,
      alarm:"Fault",
      description:"Old Inlet Valves Open",
      alarmTrip: 1
    },mw_p_p1_pump_valves_not_ok:{
      value: null,
      alarm:"Fault",
      description:"Pump Valves Not Ok",
      alarmTrip: 1
    },mw_p_p1_bypass_valves_closed:{
      value: null,
      alarm:"Fault",
      description:"Bypass Valves Closed",
      alarmTrip: 1
    },
    mw_p_p1_vsd_fault:{
      value: null,
      alarm:"Fault",
      description:"VSD Fault",
      alarmTrip: 1
    },
    mw_p_p1_temp_fault:{
      value: null,
      alarm:"Fault",
      description:"Temperature Fault",
      alarmTrip: 1
    },
    mw_p_p1_condition_monitoring_fault:{
      value: null,
      alarm:"Fault",
      description:"Condition Monitoring Fault",
      alarmTrip: 1
    },
    mw_p_p1_pressure_fault:{
      value: null,
      alarm:"Fault",
      description:"Pressure Fault",
      alarmTrip: 1
    },
    mw_p_p1_no_flow_fault:{
      value: null,
      alarm:"Fault",
      description:"No Flow Fault",
      alarmTrip: 1
    },
    mw_p_p1_emergency_stop_fault:{
      value: null,
      alarm:"Fault",
      description:"Emergency Stop Fault",
      alarmTrip: 1
    },
    mw_p_p1_start_delay_timer_active:{
      value: null,
      alarm:"Fault",
      description:"Start Delay Timer Active",
      alarmTrip: 1
    },
    mw_p_p1_flow_meter_fault:{
      value: null,
      alarm:"Fault",
      description:"Flow Meter Fault",
      alarmTrip: 1
    },
    mw_p_p1_main_plc_comms_fault:{
      value: null,
      alarm:"Fault",
      description:"Main PLC Communication Fault",
      alarmTrip: 1,
    },
    mw_p_p2_old_inlet_values_open:{
      value: null,
      alarm:"Fault",
      description:"Old Inlet Valves Open",
      alarmTrip: 1
    },
    mw_p_p2_pump_valves_not_ok:{
      value: null,
      alarm:"Fault",
      description:"Pump Valves Not Ok",
      alarmTrip: 1
    },
    mw_p_p2_bypass_valves_closed:{
      value: null,
      alarm:"Fault",
      description:"Bypass Valves Closed",
      alarmTrip: 1
    },
    mw_p_p2_vsd_fault:{
      value: null,
      alarm:"Fault",
      description:"VSD Fault",
      alarmTrip: 1
    },
    mw_p_p2_temp_fault:{
      value: null,
      alarm:"Fault",
      description:"Temperature Fault",
      alarmTrip: 1
    },
    mw_p_p2_condition_monitoring_fault:{
      value: null,
      alarm:"Fault",
      description:"Condition Monitoring Fault",
      alarmTrip: 1
    },
    mw_p_p2_pressure_fault:{
      value: null,
      alarm:"Fault",
      description:"Pressure Fault",
      alarmTrip: 1
    },
    mw_p_p2_no_flow_fault:{
      value: null,
      alarm:"Fault",
      description:"No Flow Fault",
      alarmTrip: 1
    },
    mw_p_p2_emergency_stop_fault:{
      value: null,
      alarm:"Fault",
      description:"Emergency Stop Fault",
      alarmTrip: 1
    },
    mw_p_p2_start_delay_timer_active:{
      value: null,
      alarm:"Fault",
      description:"Start Delay Timer Active",
      alarmTrip: 1
    },
    mw_p_p2_flow_meter_fault:{
      value: null,
      alarm:"Fault",
      description:"Flow Meter Fault",
      alarmTrip: 1
    },
    mw_p_p2_main_plc_comms_fault:{
      value: null,
      alarm:"Fault",
      description:"Main PLC Communication Fault",
      alarmTrip: 1
    },
    mw_p_p3_old_inlet_values_open:{
      value: null,
      alarm:"Fault",
      description:"Old Inlet Valves Open",
      alarmTrip: 1
    },
    mw_p_p3_pump_valves_not_ok:{
      value: null,
      alarm:"Fault",
      description:"Pump Valves Not Ok",
      alarmTrip: 1
    },
    mw_p_p3_bypass_valves_closed:{
      value: null,
      alarm:"Fault",
      description:"Bypass Valves Closed",
      alarmTrip: 1
    },
    mw_p_p3_vsd_fault:{
      value: null,
      alarm:"Fault",
      description:"VSD Fault",
      alarmTrip: 1
    },
    mw_p_p3_temp_fault:{
      value: null,
      alarm:"Fault",
      description:"Temperature Fault",
      alarmTrip: 1
    },
    mw_p_p3_condition_monitoring_fault:{
      value: null,
      alarm:"Fault",
      description:"Condition Monitoring Fault",
      alarmTrip: 1
    },
    mw_p_p3_pressure_fault:{
      value: null,
      alarm:"Fault",
      description:"Pressure Fault",
      alarmTrip: 1
    },
    mw_p_p3_no_flow_fault:{
      value: null,
      alarm:"Fault",
      description:"No Flow Fault",
      alarmTrip: 1
    },
    mw_p_p3_emergency_stop_fault:{
      value: null,
      alarm:"Fault",
      description:"Emergency Stop Fault",
      alarmTrip: 1
    },
    mw_p_p3_start_delay_timer_active:{
      value: null,
      alarm:"Fault",
      description:"Start Delay Timer Active",
      alarmTrip: 1
    },
    mw_p_p3_flow_meter_fault:{
      value: null,
      alarm:"Fault",
      description:"Flow Meter Fault",
      alarmTrip: 1
    },
    mw_p_p3_main_plc_comms_fault:{
      value: null,
      alarm:"Fault",
      description:"Main PLC Communication Fault",
      alarmTrip: 1
    },
    mw_p_p4_old_inlet_values_open:{
      value: null,
      alarm:"Fault",
      description:"Old Inlet Valves Open",
      alarmTrip: 1
    },
    mw_p_p4_pump_valves_not_ok:{
      value: null,
      alarm:"Fault",
      description:"Pump Valves Not Ok",
      alarmTrip: 1
    },
    mw_p_p4_bypass_valves_closed:{
      value: null,
      alarm:"Fault",
      description:"Bypass Valves Closed",
      alarmTrip: 1
    },
    mw_p_p4_vsd_fault:{
      value: null,
      alarm:"Fault",
      description:"VSD Fault",
      alarmTrip: 1
    },
    mw_p_p4_temp_fault:{
      value: null,
      alarm:"Fault",
      description:"Temperature Fault",
      alarmTrip: 1
    },
    mw_p_p4_condition_monitoring_fault:{
      value: null,
      alarm:"Fault",
      description:"Condition Monitoring Fault",
      alarmTrip: 1
    },
    mw_p_p4_pressure_fault:{
      value: null,
      alarm:"Fault",
      description:"Pressure Fault",
      alarmTrip: 1
    },
    mw_p_p4_no_flow_fault:{
      value: null,
      alarm:"Fault",
      description:"No Flow Fault",
      alarmTrip: 1
    },
    mw_p_p4_emergency_stop_fault:{
      value: null,
      alarm:"Fault",
      description:"Emergency Stop Fault",
      alarmTrip: 1
    },
    mw_p_p4_start_delay_timer_active:{
      value: null,
      alarm:"Fault",
      description:"Start Delay Timer Active",
      alarmTrip: 1
    },
    mw_p_p4_flow_meter_fault:{
      value: null,
      alarm:"Fault",
      description:"Flow Meter Fault",
      alarmTrip: 1
    },
    mw_p_p4_main_plc_comms_fault:{
      value: null,
      alarm:"Fault",
      description:"Main PLC Communication Fault",
      alarmTrip: 1
    },

  }
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any
  dataSourceP2:any
  dataSourceP3:any
  dataSourceP4:any
  intervalLoop: any
  Pump:any = "Pump";
  pumpColor1:any
pumpColor2:any
pumpColor3:any
pumpColor4:any

variablesMatricG:any = {}
variablesMatric1:any = {}
variablesMatric2:any = {}
variablesMatric3:any = {}
variablesMatric4:any = {}


pump1Status:any
pump2Status:any
pump3Status:any
pump4Status:any


  constructor(private authService: AuthService,public recieve:Common, private pm:pagePostMethod,private svg: svgImage,private pt: PostTrend, )
  {

    }
    comms:any
  ngOnInit() {

    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_MW_R":
          this.showNavigationButton = "true";
          break;
      }
    }

    this.intervalLoop = this.pm.findPageDataForNewSites("motherwell_new", "nmbm_motherwell_new").subscribe((result) => {
      this.variable =  result;

      console.log(this.variable)

//      this.comms = Common.getLastUpdate(this.variable.mw_g_p_new_ut)



      this.variable.mw_p_p1_mode  = svgImage.returnMotherwellWord(this.variable.mw_p_p1_mode)
      this.variable.mw_p_p2_mode  = svgImage.returnMotherwellWord(this.variable.mw_p_p2_mode)
      this.variable.mw_p_p3_mode  = svgImage.returnMotherwellWord(this.variable.mw_p_p3_mode)
      this.variable.mw_p_p4_mode  = svgImage.returnMotherwellWord(this.variable.mw_p_p4_mode)

      this.pumpColor1 = svgImage.getSVGColor(this.variable.mw_p_p1_status)
      this.pumpColor2 = svgImage.getSVGColor(this.variable.mw_p_p2_status)
      this.pumpColor3 = svgImage.getSVGColor(this.variable.mw_p_p3_status)
      this.pumpColor4 = svgImage.getSVGColor(this.variable.mw_p_p4_status)

      this.variablesMatricG = [{
        rowType:"TextRow",
        label:"Common Suction Pressure",
        value:this.variable.mw_g_p_com_suc_pres+ " bar"
      },
      {
        rowType:"TextRow",
        label:"Common Delivery Pressure",
        value:this.variable.mw_g_p_com_del_pres+ " bar"
      },
      {
        rowType:"TextRow",
        label:"Flow Rate",
        value:this.variable.mw_g_p_flow_rate+ " Ml/d"
      },
      {
        rowType:"TextRow",
        label:"Total Flow",
        value:this.variable.mw_g_p_tf + " Ml"
      },
      {
        rowType:"TextRow",
        label:"Total Flow Required",
        value:this.variable.mw_g_p_flow_rate_req+ " Ml/d"
      },
      {
        rowType:"TextRow",
        label:"Number of Pumps Required",
        value:this.variable.mw_g_p_num_of_pump_req
      },
    ]

      this.variablesMatric1 = [{
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.mw_p_p1_mode
      },{
      rowType:"TextRow",
      label:"Status",
      value:this.variable.mw_p_p1_status
    },{
      rowType:"TextRow",
      label:"Run Time Hours",
      value:this.variable.mw_p_p1_run_time_hours
    },{
      rowType:"TextRow",
      label:"Number of Starts",
      value:this.variable.mw_p_p1_pump_start
    },
    {
      rowType:"TextRow",
      label:"Speed",
      value:this.variable.mw_p_p1_pump_speed+" rpm"
    },

  ]

  this.variablesMatric2 = [{
    rowType:"TextRow",
    label:"Mode",
    value:this.variable.mw_p_p2_mode
  },{
  rowType:"TextRow",
  label:"Status",
  value:this.variable.mw_p_p2_status
},{
  rowType:"TextRow",
  label:"Run Time Hours",
  value:this.variable.mw_p_p2_run_time_hours
},{
  rowType:"TextRow",
  label:"Number of Starts",
  value:this.variable.mw_p_p2_pump_start
},
{
  rowType:"TextRow",
  label:"Speed",
  value:this.variable.mw_p_p2_pump_speed+" rpm"
},

]


this.variablesMatric3 = [{
  rowType:"TextRow",
  label:"Mode",
  value:this.variable.mw_p_p3_mode
},{
rowType:"TextRow",
label:"Status",
value:this.variable.mw_p_p3_status
},{
rowType:"TextRow",
label:"Run Time Hours",
value:this.variable.mw_p_p3_run_time_hours
},{
rowType:"TextRow",
label:"Number of Starts",
value:this.variable.mw_p_p3_pump_start
},
{
rowType:"TextRow",
label:"Speed",
value:this.variable.mw_p_p3_pump_speed+" rpm"
},

]


this.variablesMatric4 = [{
  rowType:"TextRow",
  label:"Mode",
  value:this.variable.mw_p_p4_mode
},{
rowType:"TextRow",
label:"Status",
value:this.variable.mw_p_p4_status
},{
rowType:"TextRow",
label:"Run Time Hours",
value:this.variable.mw_p_p4_run_time_hours
},{
rowType:"TextRow",
label:"Number of Starts",
value:this.variable.mw_p_p4_pump_start
},
{
rowType:"TextRow",
label:"Speed",
value:this.variable.mw_p_p4_pump_speed+" rpm"
},

]

Common.getFaultRouteDatas(this.faultArr,this.faultVariable, this.variable)

var alarm1: any [] = [this.faultVariable.mw_p_p1_old_inlet_values_open,this.faultVariable.mw_p_p1_pump_valves_not_ok,this.faultVariable.mw_p_p1_bypass_valves_closed,this.faultVariable.mw_p_p1_vsd_fault,this.faultVariable.mw_p_p1_temp_fault,this.faultVariable.mw_p_p1_condition_monitoring_fault,this.faultVariable.mw_p_p1_pressure_fault,this.faultVariable.mw_p_p1_no_flow_fault,this.faultVariable.mw_p_p1_emergency_stop_fault,this.faultVariable.mw_p_p1_start_delay_timer_active,this.faultVariable.mw_p_p1_flow_meter_fault,this.faultVariable.mw_p_p1_main_plc_comms_fault]
var alarm2: any [] = [this.faultVariable.mw_p_p2_old_inlet_values_open,this.faultVariable.mw_p_p2_pump_valves_not_ok,this.faultVariable.mw_p_p2_bypass_valves_closed,this.faultVariable.mw_p_p2_vsd_fault,this.faultVariable.mw_p_p2_temp_fault,this.faultVariable.mw_p_p2_condition_monitoring_fault,this.faultVariable.mw_p_p2_pressure_fault,this.faultVariable.mw_p_p2_no_flow_fault,this.faultVariable.mw_p_p2_emergency_stop_fault,this.faultVariable.mw_p_p2_start_delay_timer_active,this.faultVariable.mw_p_p2_flow_meter_fault,this.faultVariable.mw_p_p2_main_plc_comms_fault]
var alarm3: any [] = [this.faultVariable.mw_p_p3_old_inlet_values_open,this.faultVariable.mw_p_p3_pump_valves_not_ok,this.faultVariable.mw_p_p3_bypass_valves_closed,this.faultVariable.mw_p_p3_vsd_fault,this.faultVariable.mw_p_p3_temp_fault,this.faultVariable.mw_p_p3_condition_monitoring_fault,this.faultVariable.mw_p_p3_pressure_fault,this.faultVariable.mw_p_p3_no_flow_fault,this.faultVariable.mw_p_p3_emergency_stop_fault,this.faultVariable.mw_p_p3_start_delay_timer_active,this.faultVariable.mw_p_p3_flow_meter_fault,this.faultVariable.mw_p_p3_main_plc_comms_fault]
var alarm4: any [] = [this.faultVariable.mw_p_p4_old_inlet_values_open,this.faultVariable.mw_p_p4_pump_valves_not_ok,this.faultVariable.mw_p_p4_bypass_valves_closed,this.faultVariable.mw_p_p4_vsd_fault,this.faultVariable.mw_p_p4_temp_fault,this.faultVariable.mw_p_p4_condition_monitoring_fault,this.faultVariable.mw_p_p4_pressure_fault,this.faultVariable.mw_p_p4_no_flow_fault,this.faultVariable.mw_p_p4_emergency_stop_fault,this.faultVariable.mw_p_p4_start_delay_timer_active,this.faultVariable.mw_p_p4_flow_meter_fault,this.faultVariable.mw_p_p4_main_plc_comms_fault]



this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))

    })

  }

ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();
  }
}

isLoading:boolean;
options1:EChartsOption;
options2:EChartsOption
range:any
tfCollection:any = "NMBM_MW_PS_Trend_TF";
collection:any = "NMBM_MW_PS_Trend";
flowTags:any =["flowRate"]
totalFlowTags:any =["mw_g_p_tf"]
trendNameOne:any = "General Flow Data"
recieveDate($event: any){
  var trend :any;
  this.range = $event;
  this.isLoading = true;
  const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

  this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collection,this.totalFlowTags,this.flowTags,start,end).then((data) => {
    trend = data;
     ;

    this.options1 = Common.getOptionsBarAndLine(this.options1, "Flow Rate Ml/d",trend.FlowRateArr[0], "Total Flow Ml", trend.TotalFlowArr[0])
    this.isLoading = false;
  })
}
}
