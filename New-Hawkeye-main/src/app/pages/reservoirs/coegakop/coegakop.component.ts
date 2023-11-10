import { Component, Injectable, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CoegaKopService } from 'src/app/Service-Files/coegakop.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { ListeningService} from 'src/app/listening.service';
import { CoegakopdownloadComponent } from '../coegakopdownload/coegakopdownload.component';
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

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  options: EChartsOption;
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

  last_update:any;
  communication_status:any;
  reservoir_level:any;
  actuator_status:any;
  mode: any;
  control_valve_one:any;
  control_valve_two:any;


  valve_chamber_pressure:any;

  grassridge_inlet_flow_meter:any;
  grassridge_inlet_flow_rate:any;
  grassridge_inlet_total_flow:any;
  coega_idz_outlet_flow_meter:any;
  coega_idz_outlet_flow_rate:any;
  coega_idz_outlet_total_flow:any;
  mother_outlet_flow_meter_analog_signal:any;
  motherwell_outlet_flow_rate:any;
  motherwell_outlet_total_flow:any;


  coe_kop_cloud_r_ut:any;
  coe_kop_cloud_r_level:any
  coe_kop_r_battery_level:any
  coe_kop_r_battery_poll_ut:any


  che_r_lvl:any;

  statuses: any;




  DateArr: any;
  nmb_cgk_r_fault_status: any;
  nmb_cgk_r_chargerstatus: any;
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

  constructor(public rs: ReportService, public us: UsersService,public recieve:Common ,private pm:pagePostMethod,private pt: PostTrend,) {

    this.isLoading = true;





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


      this.pt.getPostTrend("NMBM_CGK_R_TotalFlow", this.trendTag,null,null).then((data) => {
        trend=data;
      trend=data
      this.TotalFlow_Motherwell_Arr = trend.TotalFlowArr[0].differences;
      this.TotalFlow_GrassRidge_Arr = trend.TotalFlowArr[1].differences;

      this.TotalFlow_CoegaIDZ_Arr = trend.TotalFlowArr[2].differences;
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
            name: 'Total Flow Ml',
            nameTextStyle: { color: theme},
            boundaryGap: [0.2, 0.2],
            min: 0,
            axisLabel: { rotate: 90, color: theme},
        },
          series: [
            {
            name: 'Grassridge Total Flow',
              data: this.TotalFlow_GrassRidge_Arr,
              type: 'bar',
          },
          {
            name: 'Motherwell Total Flow',
              data: this.TotalFlow_Motherwell_Arr,
              type: 'bar',
          },
          {
            name: 'Coega IDZ Total Flow',
              data: this.TotalFlow_CoegaIDZ_Arr,
              type: 'bar',
          }
        ]
        };
        this.isLoading = false;
    }
    )


  }

  onDateFilter(){
    this.isLoading = true;
    var start = this.range.value.start+'';
    var end = this.range.value.end+'';

   var startARR = start.toString().split(" ")
   var endARR = end.toString().split(" ")


   switch (startARR[1]) {
    case "Jan":
      startARR[1] = "1"
        break;
        case "Feb":
          startARR[1] = "2"
            break;
            case "Mar":
              startARR[1] = "3"
                break;
                case "Apr":
                  startARR[1] = "4"
                    break;
                    case "May":
                      startARR[1] = "5"
                        break;
                        case "Jun":
                          startARR[1] = "6"
                            break;
                            case "Jul":
                              startARR[1] = "7"
                                break;
                                case "Aug":
                                  startARR[1] = "8"
                                    break;
                                    case "Sep":
                                      startARR[1] = "9"
                                        break;
                                        case "Oct":
                                          startARR[1] = "10"
                                            break;
                                            case "Nov":
                                              startARR[1] = "11"
                                                break;
                                                case "Dec":
                                                  startARR[1] = "12"
                                                    break;
                                                  }
switch (endARR[1]) {
    case "Jan":
      endARR[1] = "1"
        break;
        case "Feb":
          endARR[1] = "2"
            break;
            case "Mar":
              endARR[1] = "3"
                break;
                case "Apr":
                  endARR[1] = "4"
                    break;
                    case "May":
                      endARR[1] = "5"
                        break;
                        case "Jun":
                          endARR[1] = "6"
                            break;
                            case "Jul":
                              endARR[1] = "7"
                                break;
                                case "Aug":
                                  endARR[1] = "8"
                                    break;
                                    case "Sep":
                                      endARR[1] = "9"
                                        break;
                                        case "Oct":
                                          endARR[1] = "10"
                                            break;
                                            case "Nov":
                                              endARR[1] = "11"
                                                break;
                                                case "Dec":
                                                  endARR[1] = "12"
                                                    break;
                                                  }

if (startARR[1].length==1){
  startARR[1] = "0" + startARR[1]
}

if (endARR[1].length==1){
  endARR[1] = "0" + endARR[1]
}


var newStart = startARR[3] +"-"+startARR[1]+"-"+startARR[2]
var newEnd = endARR[3] +"-"+endARR[1]+"-"+endARR[2]

var trend :any;


this.pt.getPostTrend("NMBM_CGK_R_TotalFlow", this.trendTag,newStart,newEnd).then((data) => {
  trend=data;
trend=data
this.TotalFlow_Motherwell_Arr = trend.TotalFlowArr[0].differences;
this.TotalFlow_GrassRidge_Arr = trend.TotalFlowArr[1].differences;

this.TotalFlow_CoegaIDZ_Arr = trend.TotalFlowArr[2].differences;

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
    name: 'Total Flow Ml',
    nameTextStyle: { color: theme},
    boundaryGap: [0.2, 0.2],
    min: 0,
    axisLabel: { rotate: 90, color: theme},
},
  series: [
    {
    name: 'Grassridge Total Flow',
    data: this.TotalFlow_GrassRidge_Arr,
    type: 'bar',
},
{
  name: 'Motherwell Total Flow',
    data: this.TotalFlow_Motherwell_Arr,
    type: 'bar',
},
{
  name: 'Coega IDZ Total Flow',
    data: this.TotalFlow_CoegaIDZ_Arr,
    type: 'bar',
}
]
};

this.isLoading = true;
})


  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


}
