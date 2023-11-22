import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {ChelseaService} from 'src/app/Service-Files/Reservoir/chelsea.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {Common} from 'src/app/class/common';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import {PostTrend} from 'src/app/Service-Files/PageTrend/pagePost.service'
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-chelsea-ps',
  templateUrl: './chelsea-ps.component.html',
  styleUrls: ['./chelsea-ps.component.css']
})

export class ChelseaPSComponent implements OnInit {

  userSites:string[];
  data: any=[];

  variable :any= {

  che_ps_ut: null,
  comms: null,
  che_ps_700_flow_rate:null,
  che_ps_moth_760_mm:null,
  che_ps_moth_900_mm:null,
  che_ps_walk_drive_off_500_mm:null,
  che_ps_pumpset_1_pumpstatus:null,
  che_ps_pumpset_1_run_hours:null,
  che_ps_pumpset_1_del_pressure:null,
  che_ps_pumpset_1_suct_pressure:null,
  che_ps_pumpset_1_vsd_actual_speed:null,
  che_ps_pumpset_1_current:null,
  che_ps_pumpset_1_power:null,
  che_ps_pumpset_2_pumpstatus:null,
  che_ps_pumpset_2_mode:null,
  che_ps_pumpset_2_run_hours:null,
  che_ps_pumpset_2_del_pressure:null,
  che_ps_pumpset_2_suct_pressure:null,
  che_ps_pumpset_2_vsd_actual_speed:null,
  che_ps_pumpset_2_current:null,
  che_ps_pumpset_2_power:null,
  che_ps_pumpset_3_pumpstatus:null,
  che_ps_pumpset_3_mode:null,
  che_ps_pumpset_3_run_hours:null,
  che_ps_pumpset_3_del_pressure:null,
  che_ps_pumpset_3_suct_pressure:null,
  che_ps_pumpset_3_vsd_actual_speed:null,
  che_ps_pumpset_3_current:null,
  che_ps_pumpset_3_power:null,
  che_ps_pumpset_4_pumpstatus:null,
  che_ps_pumpset_4_mode:null,
  che_ps_pumpset_4_run_hours:null,
  che_ps_pumpset_4_del_pressure:null,
  che_ps_pumpset_4_suct_pressure:null,
  che_ps_pumpset_4_vsd_actual_speed:null,
  che_ps_pumpset_4_current:null,
  che_ps_pumpset_4_power:null,
  che_ps_pumpset_1_mode:null,
  che_ps_700_total_flow:null,
che_ps_moth_760_mm_total_flow:null,
che_ps_moth_900_mm_total_flow:null,
che_ps_walk_drive_off_500_mm_total_flow:null,
  }




  public authListenerSubs!: Subscription;
  showNavigationButton: string;
  intervalLoop: any;
  theme:any = localStorage.getItem("theme");
  dataSourceG:any
  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceP3:any;
  dataSourceP4:any;

  ELEMENT_DATA_G: PeriodicElement[] = [];
  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];
  ELEMENT_DATA_P4: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  DateArr: any;
  CHE_PS_700_TF_arr: any[]
  CHE_PS_760_MM_TF_arr: any[]
  CHE_PS_900_MM_TF_arr: any[]
  CHE_PS_WALK_DRIVE_OFF_500_MM_TF_arr: any[]

  faultVariable:any={
  che_ps_flood_alarm: {
    value: null,
  alarm:"Fault",
  description:"Flood Alarm",
    alarmTrip: 1
  },
  che_ps_pumpset_g_control_voltage_loss:{
    value:null,
    alarm:"Fault",
    description:"Control Voltage Loss",
    alarmTrip:0,
  },
  che_ps_pumpset_1_no_flow_fault: {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_1_ESTOP: {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  che_ps_pumpset_1_circuit_breaker_trip:  {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  che_ps_pumpset_1_drive_fault: {
    value: null,
  alarm:"Fault",
  description:"Drive Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_1_pres_fault: {
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_1_temp_fault: {
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_1_vib_fault:{
    value:null,
    alarm:"Fault",
    description:"Vibration Fault",
    alarmTrip:1
  },
  che_ps_pumpset_2_no_flow_fault:{
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_2_ESTOP: {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  che_ps_pumpset_2_circuit_breaker_trip: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  che_ps_pumpset_2_drive_fault: {
    value: null,
  alarm:"Fault",
  description:"Drive Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_2_pres_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_2_temp_fault: {
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_2_vib_fault: {
    value:null,
    alarm:"Fault",
    description:"Vibration Fault",
    alarmTrip:1
  },
  che_ps_pumpset_3_no_flow_fault:{
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_3_ESTOP: {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  che_ps_pumpset_3_circuit_breaker_trip: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  che_ps_pumpset_3_drive_fault: {
    value: null,
  alarm:"Fault",
  description:"Drive Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_3_pres_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_3_temp_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_3_vib_fault:{
    value:null,
    alarm:"Fault",
    description:"Vibration Fault",
    alarmTrip:1
  },
  che_ps_pumpset_4_no_flow_fault:{
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_4_ESTOP: {
    value: null,
  alarm:"Fault",
  description:"E-Stop Active",
    alarmTrip: 1
  },
  che_ps_pumpset_4_circuit_breaker_trip: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  },
  che_ps_pumpset_4_drive_fault: {
    value: null,
  alarm:"Fault",
  description:"Drive Fault",
    alarmTrip: 1
  },
  che_ps_pumpset_4_pres_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_4_temp_fault:{
    value:null,
    alarm:"Fault",
    description:"Pressure Fault",
    alarmTrip:1
  },
  che_ps_pumpset_4_vib_fault:{
    value:null,
    alarm:"Fault",
    description:"Vibration Fault",
    alarmTrip:1
  }

}

   tagArr:any=[
    "che_ps_ut",


    "che_ps_700_flow_rate",
    "che_ps_moth_760_mm",
    "che_ps_moth_900_mm",
    "che_ps_walk_drive_off_500_mm",

    "che_ps_pumpset_1_pumpstatus",
    "che_ps_pumpset_1_run_hours",
    "che_ps_pumpset_1_del_pressure",
    "che_ps_pumpset_1_suct_pressure",
    "che_ps_pumpset_1_vsd_actual_speed",
    "che_ps_pumpset_1_current",
    "che_ps_pumpset_1_power",
    "che_ps_pumpset_1_mode",
    "che_ps_pumpset_2_pumpstatus",

    "che_ps_pumpset_2_mode",
    "che_ps_pumpset_2_run_hours",
    "che_ps_pumpset_2_del_pressure",
    "che_ps_pumpset_2_suct_pressure",
    "che_ps_pumpset_2_vsd_actual_speed",
    "che_ps_pumpset_2_current",
    "che_ps_pumpset_2_power",
    "che_ps_pumpset_3_pumpstatus",

    "che_ps_pumpset_3_mode",
    "che_ps_pumpset_3_run_hours",
    "che_ps_pumpset_3_del_pressure",
    "che_ps_pumpset_3_suct_pressure",
    "che_ps_pumpset_3_vsd_actual_speed",
    "che_ps_pumpset_3_current",
    "che_ps_pumpset_3_power",
    "che_ps_pumpset_4_pumpstatus",

    "che_ps_pumpset_4_mode",
    "che_ps_pumpset_4_run_hours",
    "che_ps_pumpset_4_del_pressure",
    "che_ps_pumpset_4_suct_pressure",
    "che_ps_pumpset_4_vsd_actual_speed",
    "che_ps_pumpset_4_current",
    "che_ps_pumpset_4_power",


    "che_ps_700_total_flow",
"che_ps_moth_760_mm_total_flow",
"che_ps_moth_900_mm_total_flow",
"che_ps_walk_drive_off_500_mm_total_flow",
  ]

  faultArr:any=[
    "che_ps_pumpset_g_control_voltage_loss", // 0
    "che_ps_flood_alarm", // 1
    "che_ps_pumpset_1_no_flow_fault", // 2
    "che_ps_pumpset_1_ESTOP", // 3
    "che_ps_pumpset_1_circuit_breaker_trip", // 4
    "che_ps_pumpset_1_drive_fault", // 5
    "che_ps_pumpset_1_pres_fault", // 6
    "che_ps_pumpset_1_temp_fault", // 7
    "che_ps_pumpset_1_vib_fault", // 8
    "che_ps_pumpset_2_no_flow_fault", //9
    "che_ps_pumpset_2_ESTOP", // 10
    "che_ps_pumpset_2_circuit_breaker_trip", // 11
    "che_ps_pumpset_2_drive_fault", // 12
    "che_ps_pumpset_2_pres_fault", // 13
    "che_ps_pumpset_2_temp_fault", // 14
    "che_ps_pumpset_2_vib_fault", // 15
    "che_ps_pumpset_3_no_flow_fault", // 16
    "che_ps_pumpset_3_ESTOP", // 17
    "che_ps_pumpset_3_circuit_breaker_trip", // 18
    "che_ps_pumpset_3_drive_fault", // 19
    "che_ps_pumpset_3_pres_fault", // 20
    "che_ps_pumpset_3_temp_fault", // 21
    "che_ps_pumpset_3_vib_fault", // 22
    "che_ps_pumpset_4_no_flow_fault", // 23
    "che_ps_pumpset_4_ESTOP", // 24
    "che_ps_pumpset_4_circuit_breaker_trip", // 25
    "che_ps_pumpset_4_drive_fault", // 26
    "che_ps_pumpset_4_pres_fault", // 27
    "che_ps_pumpset_4_temp_fault", // 28
    "che_ps_pumpset_4_vib_fault", // 29

  ]
  options: EChartsOption;

  chelseaTrendTag:any[] = ["che_ps_700_total_flow","che_ps_moth_760_mm_total_flow","che_ps_moth_900_mm_total_flow","che_ps_walk_drive_off_500_mm_total_flow"]


  constructor( public rs: ReportService,private pt: PostTrend,private authService: AuthService,public recieve:Common,private pm:pagePostMethod  ) {


    this.isLoading = false;








     }

     isLoading: boolean = false;
  ngOnInit() {


    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_CHE_R":
          this.showNavigationButton = "true";
          break;
      }
    }




    this.intervalLoop = this.pm.findPageData("nmbm_che_ps_res", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.variable.comms = Common.getLastUpdate(this.variable.che_ps_ut)
       var alarmG: any [] = [this.faultVariable.che_ps_flood_alarm,this.faultVariable.che_ps_pumpset_g_control_voltage_loss]
       var alarm1: any [] = [this.faultVariable.che_ps_pumpset_1_no_flow_fault,this.faultVariable.che_ps_pumpset_1_ESTOP,this.faultVariable.che_ps_pumpset_1_circuit_breaker_trip,this.faultVariable.che_ps_pumpset_1_drive_fault ,this.faultVariable.che_ps_pumpset_1_pres_fault,this.faultVariable.che_ps_pumpset_1_temp_fault,this.faultVariable.che_ps_pumpset_1_vib_fault]
       var alarm2: any [] = [this.faultVariable.che_ps_pumpset_2_no_flow_fault,this.faultVariable.che_ps_pumpset_2_ESTOP,this.faultVariable.che_ps_pumpset_2_circuit_breaker_trip,this.faultVariable.che_ps_pumpset_2_drive_fault ,this.faultVariable.che_ps_pumpset_2_pres_fault,this.faultVariable.che_ps_pumpset_2_temp_fault,this.faultVariable.che_ps_pumpset_2_vib_fault]
       var alarm3: any [] = [this.faultVariable.che_ps_pumpset_3_no_flow_fault,this.faultVariable.che_ps_pumpset_3_ESTOP,this.faultVariable.che_ps_pumpset_3_circuit_breaker_trip,this.faultVariable.che_ps_pumpset_3_drive_fault ,this.faultVariable.che_ps_pumpset_3_pres_fault,this.faultVariable.che_ps_pumpset_3_temp_fault,this.faultVariable.che_ps_pumpset_3_vib_fault]
       var alarm4: any [] = [this.faultVariable.che_ps_pumpset_4_no_flow_fault,this.faultVariable.che_ps_pumpset_4_ESTOP,this.faultVariable.che_ps_pumpset_4_circuit_breaker_trip,this.faultVariable.che_ps_pumpset_4_drive_fault ,this.faultVariable.che_ps_pumpset_4_pres_fault,this.faultVariable.che_ps_pumpset_4_temp_fault,this.faultVariable.che_ps_pumpset_4_vib_fault]

       this.dataSourceG = new MatTableDataSource(Common.getAlarmValue(alarmG))
       this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
       this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
       this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
       this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))
    });

}






ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
totalFlowTags:any = ["che_ps_700_total_flow","che_ps_moth_760_mm_total_flow","che_ps_moth_900_mm_total_flow","che_ps_walk_drive_off_500_mm_total_flow"];
tfCollection:any = "CHEL_TF_TREND";
collection:string = "NMBM_CHEL_FLOW";
flowTags:any = ["che_ps_700_flow_rate","che_ps_moth_760_mm","che_ps_moth_900_mm","che_ps_walk_drive_off_500_mm"]
PumpTags:any = ["che_ps_pumpset_1_suct_pressure","che_ps_pumpset_1_del_pressure","che_ps_pumpset_2_suct_pressure","che_ps_pumpset_2_del_pressure","che_ps_pumpset_3_suct_pressure","che_ps_pumpset_3_del_pressure","che_ps_pumpset_4_suct_pressure","che_ps_pumpset_4_del_pressure"]
siteTitle:any = "Chelsea";
options1: EChartsOption;
options2:EChartsOption;
options2Name:any = "Pump Data" 
recieveDate($event: any){
    var trend :any;
    this.range = $event;
    this.isLoading = true;
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collection,this.totalFlowTags,this.flowTags,start,end).then((data) => {
      trend = data;

     this.options1 = this.recieve.getOptionsBarAndLine4("Ml", "Ml/d","700 Flow Rate", trend.FlowRateArr[0],"760 Flow Rate",trend.FlowRateArr[1],"Motherwell 900 mm Flow Rate",trend.FlowRateArr[2], "Walker Drive Flow Rate",trend.FlowRateArr[3],"700 Total Flow", trend.TotalFlowArr[0],"760 Total Flow",trend.TotalFlowArr[1],"Motherwell 900 mm Total Flow",trend.TotalFlowArr[2], "Walker Drive Total Flow",trend.TotalFlowArr[3]);
    
    })

    this.pt.getLevel("CHELSEA_PS_TREND",this.PumpTags,start, end).then((data) => {
      var trend2:any = data;

      console.log(trend2.LevelArr[0])

      this.options2 = this.recieve.getOptionsForLine8("bar","Pump 1 Sucction Pressure",trend2.LevelArr[0],"Pump 1 Delivery Pressure",trend2.LevelArr[1],"Pump 2 Sucction Pressure",trend2.LevelArr[2],"Pump 2 Delivery Pressure",trend2.LevelArr[3],"Pump 3 Sucction Pressure",trend2.LevelArr[4],"Pump 3 Delivery Pressure",trend2.LevelArr[5],"Pump 4 Sucction Pressure",trend2.LevelArr[6],"Pump 4 Delivery Pressure",trend2.LevelArr[7],)
      this.isLoading = false;
    })

}


}
