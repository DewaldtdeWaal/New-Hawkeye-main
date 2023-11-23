import {  Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-stormsriver',
  templateUrl: './stormsriver.component.html',
  styleUrls: ['./stormsriver.component.css']
})
export class StormsriverComponent implements OnInit {
  generalfaulttable: PeriodicElement[] = [];
  gorgepump1faulttable: PeriodicElement[] = [];
  gorgepump2faulttable: PeriodicElement[] = [];
  quarrypump1faulttable: PeriodicElement[] = [];
  quarrypump2faulttable: PeriodicElement[] = [];
  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;
  intervalLoop: any
  variable :any= {
  comms:null,
  ps_storm_UT:null,
  ps_storms_gp1_mode:null,
  ps_storms_gp1_status:null,
  ps_storms_gp2_mode:null,
  ps_storms_qp1_mode:null,
  ps_storms_qp2_mode:null,
  ps_storms_qp2_status:null,
  ps_storms_quarry_fill:null,
  ps_storms_clear_water_tank_fill:null,
  ps_storms_gpump1_run_hours:null,
  ps_storms_qpump1_run_hours:null,
  ps_storms_qpump2_run_hours:null,
  ps_storms_gorge_level:null,
  ps_storms_quarry_level:null,
  ps_storms_gp2_status:null,
  ps_storms_gpump2_run_hours:null,
  ps_storms_qp1_status:null,
  }

displayedColumns :string[]= ['alarm', 'description'];

generalfaulttabledatasource:any;
gorgepump1faulttabledatasource:any;
gorgepump2faulttabledatasource:any;
quarrypump1faulttabledatasource:any;
quarrypump2faulttabledatasource:any;

  theme:any = localStorage.getItem("theme");
  data:any = []
  faultVariable:any={
  ps_storms_emergency_stop:  {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  ps_storms_flood_warning:  {
    value: null,
  alarm:"Fault",
  description:"Gorge Flood Warning",
    alarmTrip: 1
  },
  ps_storms_charger_fault: {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 1
  },
  ps_storms_voltage_ok: {
    value: null,
  alarm:"Fault",
  description:"Voltage Not OK",
    alarmTrip: 0
  },
  ps_storms_wtw_comms:  {
    value: null,
  alarm:"Fault",
  description:"Comms Failure",
    alarmTrip: 1
  },

  ps_storms_gp1_fault_general:  {
    value: null,
  alarm:"Fault",
  description:"General Failure",
    alarmTrip: 1
  },
  ps_storms_gp1_vsd_fault: {
    value: null,
  alarm:"Fault",
  description:"VSD Fault",
    alarmTrip: 1
  },
  ps_storms_gp1_startup_fault:  {
    value: null,
  alarm:"Fault",
  description:"Startup Fault",
    alarmTrip: 1
  },
  ps_storms_gp1_no_flow_fault: {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  ps_storms_gp2_fault_general:  {
    value: null,
  alarm:"Fault",
  description:"General Failure",
    alarmTrip: 1
  },
  ps_storms_gp2_vsd_fault: {
    value: null,
  alarm:"Fault",
  description:"VSD Fault",
    alarmTrip: 1
  },
  ps_storms_gp2_startup_fault:  {
    value: null,
  alarm:"Fault",
  description:"Startup Fault",
    alarmTrip: 1
  },
  ps_storms_gp2_no_flow_fault: {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  ps_storms_qp1_fault_general: {
    value: null,
  alarm:"Fault",
  description:"General Failure",
    alarmTrip: 1
  },
  ps_storms_qp1_vsd_fault: {
    value: null,
  alarm:"Fault",
  description:"VSD Fault",
    alarmTrip: 1
  },
  ps_storms_qp1_startup_fault: {
    value: null,
  alarm:"Fault",
  description:"Startup Fault",
    alarmTrip: 1
  },
  ps_storms_qp1_no_flow_fault: {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  ps_storms_qp2_fault_general:{
    value: null,
  alarm:"Fault",
  description:"General Failure",
    alarmTrip: 1
  },
  ps_storms_qp2_vsd_fault:{
    value: null,
  alarm:"Fault",
  description:"VSD Fault",
    alarmTrip: 1
  },
  ps_storms_qp2_startup_fault:{
    value: null,
  alarm:"Fault",
  description:"Startup Fault",
    alarmTrip: 1
  },
  ps_storms_qp2_no_flow_fault: {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  }
  }

   tagArr:any =[
    "ps_storm_UT",//0
    "ps_storms_gp1_mode",//1
    "ps_storms_gp1_status",//2
    "ps_storms_gp2_mode",//3
    "ps_storms_gp2_status",//4
    "ps_storms_qp1_mode",//5
    "ps_storms_qp1_status",//6
    "ps_storms_qp2_mode",//7
    "ps_storms_qp2_status",//8
    "ps_storms_quarry_fill",//9
    "ps_storms_clear_water_tank_fill",//10
    "ps_storms_gpump1_run_hours",//11
    "ps_storms_gpump2_run_hours",//12
    "ps_storms_qpump1_run_hours",//13
    "ps_storms_qpump2_run_hours",//14
    "ps_storms_gorge_level",//15
    "ps_storms_quarry_level",//16
  ]
  faultArr:any=[
    "ps_storms_gp1_fault_general",
    "ps_storms_gp1_vsd_fault",//4
    "ps_storms_gp1_startup_fault",//5
    "ps_storms_gp1_no_flow_fault",//6
    "ps_storms_gp2_fault_general",//9
    "ps_storms_gp2_vsd_fault",//10
    "ps_storms_gp2_startup_fault",//11
    "ps_storms_gp2_no_flow_fault",//12
    "ps_storms_qp1_fault_general",//15
    "ps_storms_qp1_vsd_fault",//16
    "ps_storms_qp1_startup_fault",//17
    "ps_storms_qp1_no_flow_fault",//18
    "ps_storms_qp2_fault_general",//21
    "ps_storms_qp2_vsd_fault",//22
    "ps_storms_qp2_startup_fault",//23
    "ps_storms_qp2_no_flow_fault",//24
    "ps_storms_emergency_stop",//27
    "ps_storms_charger_fault",//28
    "ps_storms_flood_warning",//29
    "ps_storms_wtw_comms",//30
    "ps_storms_voltage_ok",//31

  ]
  constructor(private authService: AuthService,public recieve:Common , private pm:pagePostMethod, private pt: PostTrend ) {

    this.intervalLoop = this.pm.findPageData("storms_ps", "PS_CurrentVals").subscribe((result) => {
      this.data =  result;
      this.theme = localStorage.getItem("theme");
       
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.variable.comms = Common.getLastUpdate(this.variable.ps_storm_UT)
     var alarmG: any [] = [this.faultVariable.ps_storms_emergency_stop,   this.faultVariable.ps_storms_charger_fault,this.faultVariable.ps_storms_flood_warning    ,this.faultVariable.ps_storms_voltage_ok,this.faultVariable.ps_storms_wtw_comms]
     var alarm1: any [] = [this.faultVariable.ps_storms_gp1_fault_general,this.faultVariable.ps_storms_gp1_vsd_fault,this.faultVariable.ps_storms_gp1_startup_fault,this.faultVariable.ps_storms_gp1_no_flow_fault]
     var alarm2: any [] = [this.faultVariable.ps_storms_gp2_fault_general,this.faultVariable.ps_storms_gp2_vsd_fault,this.faultVariable.ps_storms_gp2_startup_fault,this.faultVariable.ps_storms_gp2_no_flow_fault]
     var alarm3: any [] = [this.faultVariable.ps_storms_qp1_fault_general,this.faultVariable.ps_storms_qp1_vsd_fault,this.faultVariable.ps_storms_qp1_startup_fault,this.faultVariable.ps_storms_qp1_no_flow_fault]
     var alarm4: any [] = [this.faultVariable.ps_storms_qp2_fault_general,this.faultVariable.ps_storms_qp2_vsd_fault,this.faultVariable.ps_storms_qp2_no_flow_fault,this.faultVariable.ps_storms_qp2_startup_fault]

     this.generalfaulttabledatasource= new MatTableDataSource(Common.getAlarmValue(alarmG))
     this.gorgepump1faulttabledatasource= new MatTableDataSource(Common.getAlarmValue(alarm1))
     this.gorgepump2faulttabledatasource= new MatTableDataSource(Common.getAlarmValue(alarm2))
     this.quarrypump1faulttabledatasource= new MatTableDataSource(Common.getAlarmValue(alarm3))
     this.quarrypump2faulttabledatasource= new MatTableDataSource(Common.getAlarmValue(alarm4))
    });

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
        case "TSI_STORMS_WTW":
          this.showNavigationButton = "true";
          break;
      }
    }
  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  isLoading:boolean;
  siteTitle:string = "Storms River";
  options:EChartsOption;
  range:any
  collectionName:unknown = "STORMS_PS_TREND";
  trendTag: any = ["ps_storms_quarry_level", "ps_storms_gorge_level"]
  trendNameOne:unknown = "Level Data"
    recieveDate($event: any){
    this.isLoading = true;
    var trend :any;
    this.range = $event;
    
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getLevel(this.collectionName, this.trendTag,start,end).then((data) => {
      trend=data

      this.options = this.recieve.getOptionsForLine2("m", "Quarry Level", trend.LevelArr[0], "Storms Level", trend.LevelArr[1] )

    this.isLoading = false;

    })
  }
}
