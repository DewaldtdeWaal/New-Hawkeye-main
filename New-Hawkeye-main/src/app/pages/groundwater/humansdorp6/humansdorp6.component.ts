import {MatTableDataSource} from '@angular/material/table';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import {Common} from 'src/app/class/common';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-humansdorp6',
  templateUrl: './humansdorp6.component.html',
  styleUrls: ['./humansdorp6.component.css']
})
export class Humansdorp6Component implements OnInit {

  options: EChartsOption;
  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttable: PeriodicElement[] = [];
  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);
  intervalLoop: any
  theme:any  = localStorage.getItem("theme");
  pumpmode: any ;
  pressure: any
flowrate :any
vsdfrequency: any

data:any = []

   tagArr:any=[
   "hup6_ut",// 1
   "hup6_mode",//9
   "hup6_pump_mode",//10
   "hup6_borehole_lvl",//15
   "hup6_flow_rate",//16
   "hup6_total_flow",//17
   "hup6_run_hours",//18
   "hup6_pump_timer",
   "klm_hup6_num_o_stops",
  ]
  faultArr:any=[
    "hup6_voltage", //0
"hup6_borehole_level_pr_fault", //1
"hup6_battery", //2
"hup6_charge", //3
"hup6_trip_fault", //4
"hup6_no_flow_fault", //5
"hup6_24_timer", //6
"hup6_stop_level", //7
"hup6_fault", //8
"hup6_estop_active", //9
"hup6_pump_suf", //10
"hup6_pump_general_fault" //11
  ]

  variable:any = {
    hup6_ut:null,
    hup6_pump_mode:null,
    hup6_run_hours:null,
    hup6_pump_timer:null,
    hup6_mode: null,
    hup6_total_flow: null,
    hup6_flow_rate: null,
    hup6_borehole_lvl: null,
    klm_hup6_num_o_stops:null,
    comms:null,
  }
  show2:any
show3:any
show4:any
show1:any
  num: any;
  total_flow_HD6_array: any;
  DateArr: any;
  faultVariable:any={


  hup6_voltage:{
    value: null,
  alarm:"Fault",
  description:"Voltage Fault",
    alarmTrip: 0
  },

  hup6_borehole_level_pr_fault:   {
    value: null,
  alarm:"Fault",
  description:"Borehole Level Signal Fault",
    alarmTrip: 1
  },
  hup6_battery:   {
    value: null,
  alarm:"Fault",
  description:"Battery Fault",
    alarmTrip: 0
  },
  hup6_charge:   {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 0
  },
  hup6_trip_fault:   {
    value: null,
  alarm:"Fault",
  description:"Pump Trip Fault",
    alarmTrip: 1
  },
  hup6_no_flow_fault:   {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  hup6_24_timer:   {
    value: null,
  alarm:"Fault",
  description:"Stop Request",
    alarmTrip: 0
  },
  hup6_stop_level:   {
    value: null,
  alarm:"Warning",
  description:"Stop Level Reached",
    alarmTrip: 1
  },
  hup6_fault:   {
    value: null,
  alarm:"Fault",
  description:"Fault Active",
    alarmTrip: 1
  },
  hup6_estop_active:   {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  hup6_pump_suf:   {
    value: null,
  alarm:"Fault",
  description:"Start Up Fault",
    alarmTrip: 1
  },
  hup6_pump_general_fault:{
    value:null,
    alarm:"Fault",
    description:"General Fault",
    alarmTrip: 1
  },
}
isLoading: boolean = false;
  constructor( public rs: ReportService,public recieve:Common,private authService: AuthService,private pm:pagePostMethod,private pt: PostTrend ) {

    this.isLoading = true;







  }

  userSites:string[];
  public authListenerSubs!: Subscription;



  ngOnInit() {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "KLM_HUP_GW":
          this.show1 = true;
          break;

      case "KLM_HUP2_GW":
        this.show2 = true;
        break;


        case "KLM_HUP3_GW":
          this.show3 = true;
          break;


		    case "KLM_HUP4_GW":
          this.show4 = true;
          break;




      }
    }

    this.intervalLoop = this.pm.findPageData("klm_hup6_gw", "GRDW_CurrentVals").subscribe((result) => {
      this.data =  result;

       
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.hup6_ut)

     var alarmG:any []=[this.faultVariable.hup6_voltage,this.faultVariable.hup6_pump_general_fault,this.faultVariable.hup6_borehole_level_pr_fault,this.faultVariable.hup6_battery,this.faultVariable.hup6_charge,this.faultVariable.hup6_trip_fault,this.faultVariable.hup6_no_flow_fault,this.faultVariable.hup6_24_timer,this.faultVariable.hup6_stop_level,this.faultVariable.hup6_fault,this.faultVariable.hup6_estop_active,this.faultVariable.hup6_pump_suf]

     this.generalfaultdatasource = new MatTableDataSource(Common.getAlarmValue(alarmG))
    });


  }



  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


  collectionName:any ="KLM_HUP6_GW_TREND"
  range:any;
  options1: EChartsOption;
  tfCollection:any = "KLM_HUP6_TF_TREND";
  totalFlowTags :any = ["total_flow_HD6"]
  flowTags :any = ["flowRate_HD6"]
  siteTitle:unknown = "HD6"
  recieveDate($event: any){
    var trend :any;
    this.range = $event;
    this.isLoading = true;
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collectionName,this.totalFlowTags,this.flowTags,start,end).then((data) => {

      trend = data;

       
      this.options1 = Common.getOptionsBarAndLine(this.options1,"Flow Rate l/s",trend.FlowRateArr[0],"Total Flow m³",trend.TotalFlowArr[0]);
      this.isLoading = false;
    })

  }
}
