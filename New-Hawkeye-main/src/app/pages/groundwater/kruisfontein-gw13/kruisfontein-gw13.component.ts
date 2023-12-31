import {  Component, OnInit } from '@angular/core';
import {kruisfonteinRouting} from 'src/app/Service-Files/GRDW/groundwater.service'
import {MatTableDataSource} from '@angular/material/table';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
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
  selector: 'app-kruisfontein-gw13',
  templateUrl: './kruisfontein-gw13.component.html',
  styleUrls: ['./kruisfontein-gw13.component.css']
})
export class KruisfonteinGW13Component implements OnInit {


  total_flow_1_array:any

  generalfaultdatasource :any
  comms:any
  theme:any= localStorage.getItem("theme");
  status:any;
  displayedColumns :string[]= ['alarm', 'description'];
  showGW12:any
  showGW14:any
  showR:any
  DateArr: any;
  pumpfaulttable: PeriodicElement[] = [];
  pumpfaultdatasource :any =  new MatTableDataSource(this.pumpfaulttable);
  variable:any = {
    gw_klm_kruis13_UT:null,
    gw_klm_kruis13_run_hours:null,
    gw_klm_kruis13_number_of_starts:null,
    gw_klm_kruis13_flow_rate:null,
    gw_klm_kruis13_TF:null,
    gw_klm_kruis13_lvl:null,
    gw_klm_kruis13_bar:null,
    gw_klm_kruis13_control_mode:null,
    gw_klm_kruis13_vsd:null,
    gw_klm_kruis13_target_flow:null,
    gw_klm_kruis13_target_freq:null,
    gw_klm_kruis13_voltage:null,
    gw_klm_kruis13_current:null,
    gw_klm_kruis13_power:null,
    gw_klm_kruis13_total_power:null,
    gw_klm_kruis13_status:null,
    comms:null,
    gw_klm_kruis13_mode:null,

  }


  data:any = []
  tagArr:any=[
     "gw_klm_kruis13_UT",
     "gw_klm_kruis13_run_hours",
     "gw_klm_kruis13_number_of_starts",
     "gw_klm_kruis13_flow_rate",
     "gw_klm_kruis13_TF",
     "gw_klm_kruis13_lvl",
     "gw_klm_kruis13_bar",
     "gw_klm_kruis13_control_mode",
     "gw_klm_kruis13_vsd",
     "gw_klm_kruis13_target_flow",
     "gw_klm_kruis13_target_freq",
     "gw_klm_kruis13_voltage",
     "gw_klm_kruis13_current",
     "gw_klm_kruis13_power",
     "gw_klm_kruis13_total_power",
     "gw_klm_kruis13_status",
     "gw_klm_kruis13_mode",
  ]

  faultVariable:any={
gw_klm_kruis13_bar_fault:{
    value: null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip: 1
 },
gw_klm_kruis13_lvl_fault:{
    value: null,
    alarm:"Fault",
    description:"Level Fault",
    alarmTrip: 1
 },
gw_klm_kruis13_flow_fault:{
    value: null,
    alarm:"Fault",
    description:"Flow Fault",
    alarmTrip: 1
 },
gw_klm_kruis13_voltage_not_okay:{
    value: null,
    alarm:"Warning",
    description:"Voltage Not Okay",
    alarmTrip: 1
 },
gw_klm_kruis13_emergency_stop:{
    value: null,
    alarm:"Fault",
    description:"Emergency Stop",
    alarmTrip: 1
 },
gw_klm_kruis13_vsd_fault:{
    value: null,
    alarm:"Fault",
    description:"VSD Fault",
    alarmTrip: 1
 },
gw_klm_kruis13_res_communication_fault:{
    value: null,
    alarm:"Fault",
    description:"Reservoir Communication Fault",
    alarmTrip: 1
 },
gw_klm_kruis13_res_ful:{
    value: null,
    alarm:"Warning",
    description:"Reservoir Full",
    alarmTrip: 1
 },

  }

  intervalLoop: any
  faultArr:any=[

"gw_klm_kruis13_bar_fault",
"gw_klm_kruis13_lvl_fault",
"gw_klm_kruis13_flow_fault",
"gw_klm_kruis13_voltage_not_okay",
"gw_klm_kruis13_emergency_stop",
"gw_klm_kruis13_vsd_fault",
"gw_klm_kruis13_res_communication_fault",
"gw_klm_kruis13_res_ful",
  ]
  userSites:string[];
  tableDataPump1: PeriodicElement[] = [];
  dataSourceP1:any = new MatTableDataSource(this.tableDataPump1);
  public authListenerSubs!: Subscription;
  constructor(public rs: ReportService,public recieve:Common,private authService: AuthService,private GWS:kruisfonteinRouting,private pm:pagePostMethod ,private pt: PostTrend)  {
    this.isLoading  = true;

   }

  ngOnInit() {

    this.intervalLoop = this.pm.findPageData("Kuis", "GRDW_CurrentVals").subscribe((result) => {
      this.data =  result;


     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.faultVariable =   Common.getFaultRouteDatas(this.faultArr,this.faultVariable,this.data)

     this.variable.comms = Common.getLastUpdate(this.variable.gw_klm_kruis13_UT)
     var alarm1: any [] = [this.faultVariable.gw_klm_kruis13_bar_fault,this.faultVariable.gw_klm_kruis13_lvl_fault,this.faultVariable.gw_klm_kruis13_flow_fault,this.faultVariable.gw_klm_kruis13_voltage_not_okay,this.faultVariable.gw_klm_kruis13_emergency_stop,this.faultVariable.gw_klm_kruis13_vsd_fault,this.faultVariable.gw_klm_kruis13_res_communication_fault,this.faultVariable.gw_klm_kruis13_res_ful,]
    this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
    });

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "KLM_KUI_12_GW":
          this.showGW12 = "true";
          break;

      case "KLM_KUI_14_GW":
        this.showGW14 = "true";
        break;


        case "KLM_KUI_R":
          this.showR = "true";
          break;

      }
    }





  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  isLoading: boolean = false;

  collectionName:any ="KLM_KRUIS13_FLOW"
  range:any;
  options1: EChartsOption;
  options2: EChartsOption
  tfCollection:any = "KLM_KRUIS13_TF";
  totalFlowTags :any = ["gw_klm_kruis13_TF"]
  flowTags :any = ["gw_klm_kruis13_flow_rate", "gw_klm_kruis13_bar"]
  siteTitle:unknown = "Kruisfontein Borehole 13";
  options2Name:unknown = "Pressure Data";
  recieveDate($event: any){
    var trend :any;
    this.range = $event;
    this.isLoading = true;
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collectionName,this.totalFlowTags,this.flowTags,start,end).then((data) => {

      trend = data;


      this.options1 = Common.getOptionsBarAndLine(this.options1,"Flow Rate l/s",trend.FlowRateArr[0],"Total Flow m³",trend.TotalFlowArr[0]);
      this.options2 = Common.getOptionsForLine(this.options2,"Pressure Bar", trend.FlowRateArr[1])
      this.isLoading = false;
    })

  }

}
