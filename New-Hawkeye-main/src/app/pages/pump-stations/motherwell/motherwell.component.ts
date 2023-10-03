import { Component, Injectable, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {motherwellComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service'
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import { Common } from 'src/app/class/common';

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
  mw_g_ut:null,
  mw_g_common_suction_pressure:null,
  mw_g_common_delivery_pressure:null,
  mw_g_flowrate:null,
  mw_g_speed_setpoint:null,
  mw_g_pumps_required:null,
  mw_p1_runtime:null,
  mw_p1_actual_speed:null,
  mw_p1_number_of_starts:null,
  mw_p1_status:null,
  mw_p1_mode:null,
  comms: null,
  mw_p2_runtime:null,
  mw_p2_actual_speed:null,
  mw_p2_number_of_starts:null,
  mw_p2_status:null,
  mw_p2_mode:null,
  mw_p3_runtime:null,
  mw_p3_actual_speed:null,
  mw_p3_number_of_starts:null,
  mw_p3_status:null,
  mw_p3_mode:null,
  }


  tableDataPump1: PeriodicElement[] = [];
  tableDataPump2: PeriodicElement[] = [];
  tableDataPump3: PeriodicElement[] = [];

  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any = new MatTableDataSource(this.tableDataPump1);
  dataSourceP2:any = new MatTableDataSource(this.tableDataPump2);
  dataSourceP3:any = new MatTableDataSource(this.tableDataPump3);

  intervalLoop: any


  faultVariable:any={
  mw_p1_emergency_stop: {
    value: null,
    alarm:"Fault",
    description:"Emergency Stop",
    alarmTrip: 1
 },
  mw_p1_alarm_trip: {
  value:null,
  alarm:"Fault",
  description:"Alarm Trip",
  alarmTrip: 1
},
mw_p1_no_flow: {
  value: null,
alarm:"Fault",
description:"No Flow",
alarmTrip: 1
},
mw_p2_emergency_stop:{
  value: null,
alarm:"Fault",
description:"Emergency Stop",
  alarmTrip: 1
},
mw_p2_alarm_trip: {
  value: null,
alarm:"Fault",
description:"Alarm Trip",
  alarmTrip: 1
},
mw_p2_no_flow: {
  value: null,
alarm:"Fault",
description:"No Flow",
  alarmTrip: 1
},
mw_p3_emergency_stop: {
  value: null,
alarm:"Fault",
description:"Emergency Stop",
  alarmTrip: 1
},
mw_p3_alarm_trip: {
  value: null,
alarm:"Fault",
description:"Alarm Trip",
  alarmTrip: 1
},

mw_p3_no_flow: {
value: null,
alarm:"Fault",
description:"No Flow",
alarmTrip: 1
}
  }
 tagArr:any =[
  "mw_g_ut",//0
  "mw_g_common_suction_pressure",//1
  "mw_g_common_delivery_pressure",//2
  "mw_g_flowrate",//3
  "mw_g_speed_setpoint",//4
  "mw_g_pumps_required",//5
  "mw_p1_runtime",//6
  "mw_p1_actual_speed",//7
  "mw_p1_number_of_starts",//8
  "mw_p1_status",//9
  "mw_p1_mode",
  "mw_p2_runtime",
  "mw_p2_actual_speed",//15
  "mw_p2_number_of_starts",//16
  "mw_p2_status",//17
  "mw_p2_mode",
  "mw_p3_runtime",//22
  "mw_p3_actual_speed",//23
  "mw_p3_number_of_starts",//24
  "mw_p3_status",
  "mw_p3_mode",

]
faultArr:any=[
  "mw_p1_emergency_stop",//11
  "mw_p1_alarm_trip",//12
  "mw_p1_no_flow",//13
  "mw_p2_emergency_stop",//19
  "mw_p2_alarm_trip",//20
  "mw_p2_no_flow",//21
  "mw_p3_emergency_stop",//27
  "mw_p3_alarm_trip",//28
  "mw_p3_no_flow",//29

]
  theme:any;
  data: any=[];

  constructor(private buff:motherwellComponent,private authService: AuthService,public recieve:Common )
  {
      this.theme = localStorage.getItem("theme");


    this.buff.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)
       this.faultVariable =   Common.getFaultRouteData(this.faultArr,this.faultVariable,this.data.routingArray)
       this.variable.comms = Common.getLastUpdate(this.variable.mw_g_ut)

    });

    setTimeout(() => {

      var alarm1: any [] = [this.faultVariable.mw_p1_emergency_stop,this.faultVariable.mw_p1_alarm_trip,this.faultVariable.mw_p1_no_flow]
      var alarm2: any [] = [this.faultVariable.mw_p2_emergency_stop,this.faultVariable.mw_p2_alarm_trip,this.faultVariable.mw_p2_no_flow]
      var alarm3: any [] = [this.faultVariable.mw_p3_emergency_stop,this.faultVariable.mw_p3_alarm_trip,this.faultVariable.mw_p3_no_flow]

      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))

    },1000)
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
        case "NMB_MW_R":
          this.showNavigationButton = "true";
          break;
      }
    }

    var tagVals:any =[]
    var errorVals:any=[]
    tagVals = this.recieve.recieveNMBMVals(this.tagArr);
    errorVals = this.recieve.recieveNMBMVals(this.faultArr)

      this.intervalLoop = setInterval(() =>{

        if(tagVals[0]!= undefined){



        this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);
          this.variable.comms = Common.getLastUpdate(this.variable.mw_g_ut)

          Common.setFaultValues(errorVals,this.faultVariable,this.faultArr);


        var alarm1: any [] = [this.faultVariable.mw_p1_emergency_stop,this.faultVariable.mw_p1_alarm_trip,this.faultVariable.mw_p1_no_flow]
        var alarm2: any [] = [this.faultVariable.mw_p2_emergency_stop,this.faultVariable.mw_p2_alarm_trip,this.faultVariable.mw_p2_no_flow]
        var alarm3: any [] = [this.faultVariable.mw_p3_emergency_stop,this.faultVariable.mw_p3_alarm_trip,this.faultVariable.mw_p3_no_flow]

        console.log(alarm1)

        this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
        this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
        this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))


        }

        console.log("alarm1")

   },60000 )
}

ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}
}
