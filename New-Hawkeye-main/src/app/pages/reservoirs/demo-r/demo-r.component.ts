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
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';

export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Injectable({ providedIn: "root" })
@Component({
  selector: 'app-demo-r',
  templateUrl: './demo-r.component.html',
  styleUrls: ['./demo-r.component.css']
})
export class DemoRComponent implements OnInit {


  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;


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
  grassridgecomms: any;
  motherwellcomms: any;
  coegacoms: any;

  last_update:any;
  communication_status:any;
  res_levels:any;
  actuator_status:any;
  mode: any;
  control_valve_one:any;
  control_valve_two:any;
  warning_level:any;
  res_level_sensor_warning: any;
  valve_chamber_pressure_sensor:any;
  chargerstatus:any;
  grassridge_inlet_flow_meter:any;
  grassridge_inlet_flow_rate:any;
  grassridge_inlet_total_flow:any;
  coega_idz_outlet_flow_meter:any;
  coega_idz_outlet_flow_rate:any;
  coega_idz_outlet_total_flow:any;
  mother_outlet_flow_meter_analog_signal:any;
  motherwell_outlet_flow_rate:any;
  motherwell_outlet_total_flow:any;



  che_r_lvl:any;
  fault_status: any;
  statuses: any;
  motherwellsignal: any;
  valve_chamber_pressure: any;
  grassridgesignal: any;
  coegasignal: any;
  DateArr: any;
  nmb_cgk_r_fault_status: any;
  nmb_cgk_r_chargerstatus: any;
  constructor(private ls: ListeningService, private ws: WebSocketService, private cgks: CoegaKopService, public rs: ReportService, public us: UsersService,private authService: AuthService,) {
    this.cgks.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;


       this.last_update=this.data.routingArray[0].last_update;
       this.res_levels=this.data.routingArray[0].reservoir_level;
       this.grassridge_inlet_flow_rate=this.data.routingArray[0].grassridge_inlet_flow_rate;
       this.grassridge_inlet_total_flow=this.data.routingArray[0].grassridge_inlet_total;
       this.mode=this.data.routingArray[0].mode;
       this.grassridge_inlet_total_flow= this.data.routingArray[0].grassridge_inlet_total_flow;

       this.valve_chamber_pressure = this.data.routingArray[0].valve_chamber_pressure_sensor;
       this.actuator_status=this.data.routingArray[0].actuator_status;
       this.control_valve_one=this.data.routingArray[0].control_valve1;
       console.log(this.control_valve_one)
       this.control_valve_two=this.data.routingArray[0].control_valve2;
       this.motherwell_outlet_flow_rate=this.data.routingArray[0].motherwell_outlet_flow_rate;
       this.motherwell_outlet_total_flow=this.data.routingArray[0].motherwell_outlet_total_flow;
       this.coega_idz_outlet_flow_rate=this.data.routingArray[0].coega_idz_outlet_flow_rate;
       this.coega_idz_outlet_total_flow=this.data.routingArray[0].coega_idz_outlet_total_flow;
       this.statuses=this.data.routingArray[0].imagestatus;
       this.nmb_cgk_r_fault_status= this.data.routingArray[0].nmb_cgk_r_fault_status
       this.warning_level = this.data.routingArray[0].nmb_cgk_r_res_warning_level
       this.res_level_sensor_warning = this.data.routingArray[0].nmb_cgk_r_res_level_sensor
       this.chargerstatus = this.data.routingArray[0].chargerstatus
       this.grassridgesignal = this.data.routingArray[0].nmb_cgk_r_grassridge_inlet_flow_meter
       this.coegasignal = this.data.routingArray[0].nmb_cgk_r_coega_idz_outlet_flow_meter
       this.motherwellsignal = this.data.routingArray[0].nmb_cgk_r_mother_outlet_flow_meter_analog_signal
       this.fault_status = this.data.routingArray[0].fault_status
    });

    setTimeout(() => {
      var updateTime = this.last_update
      var updateTimeMS =Date.parse(updateTime)
      var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
      var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
      var dateminus5minMS = cuurentDateMS - 300000

    if(updateTime.length ==0){}
    else{
      if (updateTimeMS>dateminus5minMS)
      { this.comms = "OK" }
      else{ this.comms = "NOT OK"}}


      if(updateTime.length ==0){}
      else{
        if (updateTimeMS>dateminus5minMS)
        { this.comms = "OK" }
        else{ this.comms = "NOT OK"}}
        this.theme = localStorage.getItem("theme");

      this.generalfaulttable=[];
      var fcount=0;

      if(this.fault_status==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Fault Active"}
      }

      if(this.warning_level==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Reservoir Warninig Level"}
        fcount++;
      }
      if(this.res_level_sensor_warning==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Reservoir Level Sensor"}
        fcount++;
      }

      if(this.valve_chamber_pressure==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Valve Chamber Pressure Sensor"}
        fcount++;
      }

      if(this.chargerstatus==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Charger Not Ok"}
        fcount++;
      }
      if(this.grassridgesignal==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Endor Flow Meter"}
        fcount++;

      }
      if(this.coegasignal==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Kashyyyk Flow Meter"}
        fcount++;
      }
      if(this.motherwellsignal==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Alderaan Outlet Flow Meter"}
        fcount++;
      }

      this.generalfaulttabledatasource = new MatTableDataSource(this.generalfaulttable)

    },1000)





  }


  recieveVals(tagArr: any[]){
    var tagVals:any = []
    for(let i = 0; i<tagArr.length ;i++){
      this.ws.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
        tagVals[i] = data[tagArr[i]];
        //               "mw_g_flowrate",   12.5

      })
    }
    return tagVals
  }
  ngOnInit() {


    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_HB_PS":
          this.showNavigationButton = "true";
          break;
      }
    }




    var tagVals:any =[]
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
      "nmb_cgk_r_fault_statuses"//21



    ]
    tagVals = this.recieveVals(tagArr);


    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{

     updateTemp = tagVals[0];

      updateTemp = tagVals[0];
      if(updateTemp !== undefined) {
        this.last_update= tagVals[0];
        this.res_levels = tagVals[1];
        this.actuator_status=tagVals[2];
        this.mode=tagVals[3];
        this.control_valve_one=tagVals[4];
        this.control_valve_two=tagVals[5];
        this.warning_level =tagVals[6];
        this.res_level_sensor_warning=tagVals[7];
        this.valve_chamber_pressure_sensor=tagVals[8];
        this.chargerstatus=tagVals[9];
        this.valve_chamber_pressure=tagVals[10];
        this.grassridgesignal=tagVals[11];
        this.grassridge_inlet_flow_rate=tagVals[12];
        this.grassridge_inlet_total_flow=tagVals[13];
        this.coegasignal=tagVals[14];
        this.coega_idz_outlet_flow_rate=tagVals[15];
        this.coega_idz_outlet_total_flow=tagVals[16];
        this.motherwellsignal = tagVals[17];
        this.motherwell_outlet_flow_rate=tagVals[18];
        this.fault_status=tagVals[20];
        this.motherwell_outlet_total_flow=tagVals[19];

        this.statuses=tagVals[21];
      }else{}




    var updateTime = this.last_update
    var updateTimeMS =Date.parse(updateTime)
    var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
    var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
    var dateminus5minMS = cuurentDateMS - 300000


    if(updateTime.length==0){}
    else{
    if (updateTimeMS>dateminus5minMS)
    { this.comms = "OK" }
    else{ this.comms = "NOT OK"}}
    updateTemp = sessionStorage.getItem("nmb_cgk_r_ut");
     },60000)


    var fcount = 0;

    setInterval(()=>{
      this.generalfaulttable=[];
      fcount=0;

      if(this.fault_status==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Fault Active"}
      }

      if(this.warning_level==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Reservoir Warninig Level"}
        fcount++;
      }
      if(this.res_level_sensor_warning==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Reservoir Level Sensor"}
        fcount++;
      }

      if(this.valve_chamber_pressure_sensor==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Valve Chamber Pressure Sensor"}
        fcount++;
      }

      if(this.chargerstatus==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Charger Not Ok"}
        fcount++;
      }
      if(this.grassridgesignal==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Endor Flow Meter"}
        fcount++;

      }
      if(this.coegasignal==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Kashyyyk Flow Meter"}
        fcount++;
      }
      if(this.motherwellsignal==1){
        this.generalfaulttable[fcount]={ alarm: "Fault", description:"Alderaan Outlet Flow Meter"}
        fcount++;
      }

      this.generalfaulttabledatasource = new MatTableDataSource(this.generalfaulttable)


    })




    //Trend Data

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
            name: 'Total Flow',
            nameTextStyle: { color: theme},
            boundaryGap: [0.2, 0.2],
            min: 0,
            axisLabel: {  rotate: 90, color: theme},
        },
          series: [
            {
            name: 'Endor Total Flow',
              data: this.TotalFlow_GrassRidge_Arr,
              type: 'bar',
          },
          {
            name: 'Alderaan Total Flow',
              data: this.TotalFlow_Motherwell_Arr,
              type: 'bar',
          },
          {
            name: 'Kashyyyk Total Flow',
              data: this.TotalFlow_CoegaIDZ_Arr,
              type: 'bar',
          }
        ]
        };

    })


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
    name: 'Total Flow',
    nameTextStyle: { color: theme},
    boundaryGap: [0.2, 0.2],
    min: 0,
    axisLabel: {  rotate: 90, color: theme},
},
  series: [
    {
    name: 'Endor Total Flow',
    data: this.TotalFlow_GrassRidge_Arr,
    type: 'bar',
},
{
  name: 'Alderaan Total Flow',
    data: this.TotalFlow_Motherwell_Arr,
    type: 'bar',
},
{
  name: 'Kashyyyk Total Flow',
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
