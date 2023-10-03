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

  generalfaulttable: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  generalfaulttabledatasource: any = new MatTableDataSource(this.generalfaulttable)

  data:any=[]
  TotalFlow_GrassRidge_Arr: any[];
  TotalFlow_Motherwell_Arr: any[];
  TotalFlow_CoegaIDZ_Arr: any[];
  intervalLoop: any
  theme:any;
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

  fault_status: any = {
    value: null,
  alarm:"Fault",
  description:"Fault Active",
    alarmTrip: 1
  };
  warning_level:any = {
    value: null,
  alarm:"Fault",
  description:"Reservoir Warninig Level",
    alarmTrip: 1
  };
  res_level_sensor_warning: any = {
    value: null,
  alarm:"Fault",
  description:"Reservoir Level Sensor",
    alarmTrip: 1
  };


  chargerstatus:any = {
    value: null,
  alarm:"Fault",
  description:"Charger Not Ok",
    alarmTrip: 1
  };
  grassridgesignal: any = {
    value: null,
  alarm:"Fault",
  description:"Grassridge Flow Meter",
    alarmTrip: 1
  };
  coega_outlet_flow_meter: any = {
    value: null,
  alarm:"Fault",
  description:"Coega IDZ Flow Meter",
    alarmTrip: 1
  };
  nmb_cgk_r_mother_outlet_flow_meter_analog_signal: any = {
    value: null,
  alarm:"Fault",
  description:"Motherwell Outlet Flow Meter",
    alarmTrip: 1
  };

  constructor(private ls: ListeningService, private ws: WebSocketService, private cgks: CoegaKopService, public rs: ReportService, public us: UsersService,public recieve:Common ,private pm:pagePostMethod) {
    this.cgks.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;


       this.last_update=this.data.routingArray[0].last_update;
       this.reservoir_level=this.data.routingArray[0].reservoir_level;
       this.grassridge_inlet_flow_rate=this.data.routingArray[0].grassridge_inlet_flow_rate;
       this.grassridge_inlet_total_flow=this.data.routingArray[0].grassridge_inlet_total;
       this.mode=this.data.routingArray[0].mode;
       this.grassridge_inlet_total_flow= this.data.routingArray[0].grassridge_inlet_total_flow;
       this.actuator_status=this.data.routingArray[0].actuator_status;
       this.control_valve_one=this.data.routingArray[0].control_valve1;
       this.control_valve_two=this.data.routingArray[0].control_valve2;
       this.motherwell_outlet_flow_rate=this.data.routingArray[0].motherwell_outlet_flow_rate;
       this.motherwell_outlet_total_flow=this.data.routingArray[0].motherwell_outlet_total_flow;
       this.coega_idz_outlet_flow_rate=this.data.routingArray[0].coega_idz_outlet_flow_rate;
       this.coega_idz_outlet_total_flow=this.data.routingArray[0].coega_idz_outlet_total_flow;
       this.statuses=this.data.routingArray[0].imagestatus;
       this.nmb_cgk_r_fault_status= this.data.routingArray[0].nmb_cgk_r_fault_status
       this.valve_chamber_pressure = this.data.routingArray[0].valve_chamber_pressure_sensor;
        this.fault_status.value = this.data.routingArray[0].fault_status
        this.warning_level.value = this.data.routingArray[0].reservoir_warning_level
        this.res_level_sensor_warning.value = this.data.routingArray[0].reservoir_level_sensor
        this.valve_chamber_pressure_sensor = this.data.routingArray[0].nmb_cgk_r_valve_chamber_pressure_sensor
        this.chargerstatus.value = this.data.routingArray[0].chargerstatus
        this.grassridgesignal.value = this.data.routingArray[0].grassridge_inlet_flow_meter
        this.coega_outlet_flow_meter.value = this.data.routingArray[0].coega_outlet_flow_meter
        this.nmb_cgk_r_mother_outlet_flow_meter_analog_signal.value = this.data.routingArray[0].nmb_cgk_r_mother_outlet_flow_meter_analog_signal
        this.coe_kop_cloud_r_ut = this.data.routingArray[0].coe_kop_cloud_r_ut
        this.coe_kop_cloud_r_level = this.data.routingArray[0].coe_kop_cloud_r_level
        this.coe_kop_r_battery_level = this.data.routingArray[0].coe_kop_r_battery_level
        this.coe_kop_r_battery_poll_ut = this.data.routingArray[0].coe_kop_r_battery_poll_ut




    });
    this.theme = localStorage.getItem("theme");
    setTimeout(() => {

      this.comms = Common.getLastUpdate(this.last_update)
      this.NCcomms = Common.getLastUpdateBattery(this.coe_kop_cloud_r_ut,this.coe_kop_r_battery_poll_ut)

      var alarm1: any [] = [this.fault_status,this.grassridgesignal,this.warning_level,this.res_level_sensor_warning,this.chargerstatus,this.coega_outlet_flow_meter,this.nmb_cgk_r_mother_outlet_flow_meter_analog_signal]

      console.log(alarm1)

      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm1))
    //


    },2000)





  }

  ngOnInit() {







    var tagVals:any =[]
    var nonNMBMTagVals:any =[]
    var tagArr=[
      "nmb_cgk_r_ut",//0
      "nmb_cgk_r_reservoir_level",//1
      "nmb_cgk_r_actuator_status",//2
      "nmb_cgk_r_mode",//3
      "nmb_cgk_r_control_valve_1",//4
      "nmb_cgk_r_control_valve_2",//5
      "nmb_cgk_r_res_warning_level",//6
      "nmb_cgk_r_res_level_sensor",//7
      "nmb_cgk_r_valve_chamber_pressure_sensor",//8
      "nmb_cgk_r_chargerstatus",//9
      "nmb_cgk_r_valve_chamber_pressure",//10
      "nmb_cgk_r_grassridge_inlet_flow_meter",//11
      "nmb_cgk_r_grassridge_inlet_flow_rate",//12
      "nmb_cgk_r_grassridge_inlet_total_flow",//13
      "nmb_cgk_r_coega_idz_outlet_flow_meter",//14
      "nmb_cgk_r_coega_idz_outlet_flow_rate",//15
      "nmb_cgk_r_coega_idz_outlet_total_flow",//16
      "nmb_cgk_r_mother_outlet_flow_meter_analog_signal",//17
      "nmb_cgk_r_motherwell_outlet_flow_rate",//18
      "nmb_cgk_r_motherwell_outlet_total_flow",//19
      "nmb_cgk_r_fault_status",//20
      "nmb_cgk_r_fault_statuses",//21



    ]

    var nonNMBMTagArr = [
      "coe_kop_cloud_r_ut",
      "coe_kop_cloud_r_level",
      "coe_kop_r_battery_level",
      "coe_kop_r_battery_poll_ut",

    ]
    tagVals = this.recieve.recieveNMBMVals(tagArr);
    nonNMBMTagVals = this.recieve.recieveNonMVals(nonNMBMTagArr)




    var updateTemp:any;
    var updateNMBMTemp:any
    this.intervalLoop = setInterval(() =>{

     updateTemp = tagVals[0];
     updateNMBMTemp = tagVals[0];

      updateTemp = tagVals[0];
      if(updateTemp !== undefined) {
        this.last_update= tagVals[0];

        this.reservoir_level = tagVals[1];
        this.actuator_status=tagVals[2];
        this.mode=tagVals[3];
        this.control_valve_one=tagVals[4];
        this.control_valve_two=tagVals[5];
        this.warning_level.value =tagVals[6];
        this.res_level_sensor_warning.value=tagVals[7];
        this.valve_chamber_pressure_sensor=tagVals[8];
        this.chargerstatus.value=tagVals[9];
        this.valve_chamber_pressure=tagVals[10];
        this.grassridgesignal.value=tagVals[11];
        this.grassridge_inlet_flow_rate=tagVals[12];
        this.grassridge_inlet_total_flow=tagVals[13];
        this.coega_outlet_flow_meter.value=tagVals[14];
        this.coega_idz_outlet_flow_rate=tagVals[15];
        this.coega_idz_outlet_total_flow=tagVals[16];
        this.nmb_cgk_r_mother_outlet_flow_meter_analog_signal.value = tagVals[17];
        this.motherwell_outlet_flow_rate=tagVals[18];
        this.fault_status.value=tagVals[20];
        this.motherwell_outlet_total_flow=tagVals[19];
        this.statuses=tagVals[21];

      }

      updateNMBMTemp = nonNMBMTagVals[0]
      if(updateNMBMTemp !== undefined) {
        this.coe_kop_cloud_r_ut = nonNMBMTagVals[0]
        this.coe_kop_cloud_r_level = nonNMBMTagVals[1]
        this.coe_kop_r_battery_level = nonNMBMTagVals[2]
        this.coe_kop_r_battery_poll_ut = nonNMBMTagVals[3]
      }


      this.comms = Common.getLastUpdate(this.last_update)

      this.NCcomms = Common.getLastUpdateBattery(this.coe_kop_cloud_r_ut,this.coe_kop_r_battery_poll_ut)

      //this.comms = Common.get2updatesand1battery(this.last_update,this.coe_kop_cloud_r_ut,this.coe_kop_r_battery_poll_ut)

      var alarm1: any [] = [this.fault_status,this.warning_level,this.res_level_sensor_warning,this.chargerstatus,this.grassridgesignal,this.coega_outlet_flow_meter,this.nmb_cgk_r_mother_outlet_flow_meter_analog_signal]

      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm1))

     },60000)



    var trend: any = {};
    this.rs.Get_CGK_TotalFlows().subscribe(data => {
      trend=data
      this.TotalFlow_GrassRidge_Arr = trend.TotalFlow_GrassRidge_Arr;
      this.TotalFlow_Motherwell_Arr = trend.TotalFlow_Motherwell_Arr;
      this.TotalFlow_CoegaIDZ_Arr = trend.TotalFlow_CoegaIDZ_Arr;
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

    }
    )


  }

  onDateFilter(){
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

this.rs.Get_CGK_Total_Flows_Dates(newStart, newEnd).subscribe(data => {
  trend=data

  this.TotalFlow_GrassRidge_Arr = trend.TotalFlow_GrassRidge_Arr;
  this.TotalFlow_Motherwell_Arr = trend.TotalFlow_Motherwell_Arr;
  this.TotalFlow_CoegaIDZ_Arr = trend.TotalFlow_CoegaIDZ_Arr;
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
})


  }

    ngOnDestroy(){
      if(this.intervalLoop){
        clearInterval(this.intervalLoop)
      }
    }


}
