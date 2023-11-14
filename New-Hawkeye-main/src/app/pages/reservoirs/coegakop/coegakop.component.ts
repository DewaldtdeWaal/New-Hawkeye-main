import { Component, Injectable, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { UsersService } from 'src/app/Service-Files/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Injectable({ providedIn: "root" })
@Component({
  selector: 'app-coegakop',
  templateUrl: './coegakop.component.html',
  styleUrls: ['./coegakop.component.css']
})
export class CoegaKopComponent implements OnInit {


  options: EChartsOption;
  options2: EChartsOption;
  theme:any = localStorage.getItem("theme");
  generalfaulttable: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  generalfaulttabledatasource: any = new MatTableDataSource(this.generalfaulttable)

  data:any=[]
  TotalFlow_GrassRidge_Arr: any[];
  TotalFlow_Motherwell_Arr: any[];
  TotalFlow_CoegaIDZ_Arr: any[];
  intervalLoop: any

  comms: any;
  NCcomms:any;
  grassridgecomms: any;
  motherwellcomms: any;
  coegacoms: any;

  statuses: any;
  DateArr: any;
  valve_chamber_pressure_sensor:any;
  faultVariable:any={
  fault_status:  {
    value: null,
  alarm:"Fault",
  description:"Fault Active",
    alarmTrip: 1
  },
  reservoir_warning_level: {
    value: null,
  alarm:"Fault",
  description:"Reservoir Warninig Level",
    alarmTrip: 1
  },
  reservoir_level_sensor:  {
    value: null,
  alarm:"Fault",
  description:"Reservoir Level Sensor",
    alarmTrip: 1
  },


  chargerstatus:{
    value: null,
  alarm:"Fault",
  description:"Charger Not Ok",
    alarmTrip: 1
  },
  grassridge_inlet_flow_meter: {
    value: null,
  alarm:"Fault",
  description:"Grassridge Flow Meter",
    alarmTrip: 1
  },
  coega_outlet_flow_meter: {
    value: null,
  alarm:"Fault",
  description:"Coega IDZ Flow Meter",
    alarmTrip: 1
  },
  motherwell_outlet_flow_meter_analog_signal:  {
    value: null,
  alarm:"Fault",
  description:"Motherwell Outlet Flow Meter",
    alarmTrip: 1
  }
}


siteTitle:any ="Coega Kop"

trendTag:any =["motherwelltotalflow","grassridgetotalflow","coegatotalflow"]

faultArr:any=[
  "fault_status",
  "reservoir_warning_level",
  "reservoir_level_sensor",
  "chargerstatus",
  "grassridge_inlet_flow_meter",
  "coega_outlet_flow_meter",
  "motherwell_outlet_flow_meter_analog_signal",
]

tagArr:any=[
"last_update",
"reservoir_level",
"grassridge_inlet_flow_rate",
"grassridge_inlet_total",
"mode",
"grassridge_inlet_total_flow",
"actuator_status",
"control_valve1",
"control_valve2",
"motherwell_outlet_flow_rate",
"motherwell_outlet_total_flow",
"coega_idz_outlet_flow_rate",
"coega_idz_outlet_total_flow",
"imagestatus",
"nmb_cgk_r_fault_status",
"valve_chamber_pressure_sensor",
"valve_chamber_pressure_sensor",
"nmb_cgk_r_valve_chamber_pressure_sensor",
"coe_kop_cloud_r_ut",
"coe_kop_cloud_r_level",
"coe_kop_r_battery_level",
"coe_kop_r_battery_poll_ut",
]

variable:any ={
  last_update:null,
  reservoir_level:null,
  grassridge_inlet_flow_rate:null,
  grassridge_inlet_total:null,
  mode:null,
  grassridge_inlet_total_flow:null,
  actuator_status:null,
  control_valve1:null,
  control_valve2:null,
  motherwell_outlet_flow_rate:null,
  motherwell_outlet_total_flow:null,
  coega_idz_outlet_flow_rate:null,
  coega_idz_outlet_total_flow:null,
  imagestatus:null,
  nmb_cgk_r_fault_status:null,
  valve_chamber_pressure_sensor:null,
  nmb_cgk_r_valve_chamber_pressure_sensor:null,
  coe_kop_cloud_r_ut:null,
  coe_kop_cloud_r_level:null,
  coe_kop_r_battery_level:null,
  coe_kop_r_battery_poll_ut:null,
}
range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
});
totalFlowTrendTag:any =["motherwelltotalflow","grassridgetotalflow","coegatotalflow"];
flowTrendTag:any = ["nmb_cgk_r_motherwell_outlet_flow_rate","nmb_cgk_r_grassridge_inlet_flow_rate","nmb_cgk_r_coega_idz_outlet_flow_rate","coe_kop_cloud_r_level","level"]

totalFlowCollection:any = "NMBM_CGK_R_TotalFlow";
FlowCollection:any = "NMBM_CGK_R_Trend";

motherWellTFArr: any[]=[];
grassRidgeTFArr: any[]=[];
CoegaIDZTTFArr: any[]=[];

motherWellFRArr: any[]=[];
grassRidgeFRArr: any[]=[];
CoegaIDZTFRArr: any[]=[];

recieveDate($event: any){
  this.isLoading = false;
  var trend :any;
  this.range = $event;
  var start;
  var end


  this.pt.getFlowAndTotalFlowCollection(this.totalFlowCollection,this.FlowCollection,this.totalFlowTrendTag,this.flowTrendTag,start,end).then((data) => {
 
    trend = data;



    this.options = this.recieve.getOptionsBarAndLine3("Motherwell Total Flow",trend.TotalFlowArr[0],"Grassridge Total Flow Ml",trend.TotalFlowArr[1],"Coega IDZ Total Flow Ml",trend.TotalFlowArr[2],"Motherwell Flow Rate Ml/d",trend.FlowRateArr[0],"Grassridge Flow Rate Ml/d",trend.FlowRateArr[1],"Coega IDZ Flow Rate Ml/d",trend.FlowRateArr[2],"Ml","Ml/d", );

    this.options2 = this.recieve.getOptionsFor2Line("%","North Chamber 17 %",trend.FlowRateArr[3],"North Chamber 2 %",trend.FlowRateArr[4])
  })


}

  constructor(public rs: ReportService, public us: UsersService,public recieve:Common ,private pm:pagePostMethod,private pt: PostTrend,) {







  }
  isLoading: boolean = false;
  ngOnInit() {

    this.intervalLoop = this.pm.findPageData("cgk", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      var alarm1: any [] = [this.faultVariable.fault_status,this.faultVariable.grassridge_inlet_flow_meter,this.faultVariable.warning_level,this.faultVariable.reservoir_level_sensor,this.faultVariable.chargerstatus,this.faultVariable.coega_outlet_flow_meter,this.faultVariable.nmb_cgk_r_mother_outlet_flow_meter_analog_signal]
      var alarm1: any [] = [this.faultVariable.fault_status,this.faultVariable.reservoir_warning_level,this.faultVariable.reservoir_level_sensor,this.faultVariable.chargerstatus,this.faultVariable.grassridge_inlet_flow_meter,this.faultVariable.coega_outlet_flow_meter,this.faultVariable.motherwell_outlet_flow_meter_analog_signal]
      this.comms = Common.getLastUpdate(this.variable.last_update)
      this.NCcomms = Common.getLastUpdateBattery(this.variable.coe_kop_cloud_r_ut,this.variable.coe_kop_r_battery_poll_ut)
      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm1))
    });

    var trend: any = {};


  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


}
