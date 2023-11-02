import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {driftSandsService} from 'src/app/Service-Files/Reservoir/reservoir.service'
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';

export interface PeriodicElement{
  alarm: string;
  description: string;
}


@Component({
  selector: 'app-driftsands',
  templateUrl: './driftsands.component.html',
  styleUrls: ['./driftsands.component.css']
})
export class DriftsandsComponent implements OnInit {
 drift_r_alarm_armed:any;
 drift_r_pepper_spray_armed:any;
 faultVariable:any={
 drift_r_room_alarm: {
  value: null,
alarm:"Fault",
description:"Room Alarm",
  alarmTrip: 1
},
 drift_r_solar_alarm:{
  value: null,
alarm:"Fault",
description:"Solar Alarm",
  alarmTrip: 1
},
 drift_r_door_alarm: {
  value: null,
alarm:"Fault",
description:"Room Door Alarm",
  alarmTrip: 1
},

 drift_r_pepper_spray_alarm: {
  value: null,
alarm:"Fault",
description:"Pepper Spray Alarm",
  alarmTrip: 1
},
 }
 drift_r_pepper_spray_gas_left:any;
 drift_r_pepper_spray_battery_voltage:any;
 drift_r_reservoir_level:any;
 drift_r_flow_rate_1:any;
 drift_r_flow_rate_2:any;
 drift_r_total_flow_1:any;
 drift_r_total_flow_2:any;
 drift_r_ut:any;
  comms: any;
  data:any=[]

  generalfaulttable: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttabledatasource: any = new MatTableDataSource(this.generalfaulttable)
  intervalLoop: any;


  tagArr:any=[
    'drift_r_ut',//0
   'drift_r_alarm_armed',//1
   'drift_r_room_alarm',//2
   'drift_r_solar_alarm',//3
   'drift_r_door_alarm',//4
   'drift_r_pepper_spray_armed',//5
   'drift_r_pepper_spray_alarm',//6
   'drift_r_pepper_spray_gas_left',//7
   'drift_r_pepper_spray_battery_voltage',//8
   'drift_r_reservoir_level',//9
   'drift_r_flow_rate_1',//10
   'drift_r_flow_rate_2',//11
   'drift_r_total_flow_1',//12
   'drift_r_total_flow_2',//13



  ]

  variable:any = {
    drift_r_ut:null,
    drift_r_alarm_armed:null,
    drift_r_room_alarm:null,
    drift_r_solar_alarm:null,
    drift_r_door_alarm:null,
    drift_r_pepper_spray_armed:null,
    drift_r_pepper_spray_alarm:null,
    drift_r_pepper_spray_gas_left:null,
    drift_r_pepper_spray_battery_voltage:null,
    drift_r_reservoir_level:null,
    drift_r_flow_rate_1:null,
    drift_r_flow_rate_2:null,
    drift_r_total_flow_1:null,
    drift_r_total_flow_2:null,


  }

  faultArr:any=[
    "drift_r_room_alarm",
"drift_r_solar_alarm",
"drift_r_door_alarm",
"drift_r_pepper_spray_alarm",
  ]

  constructor(private ws: WebSocketService, public rs: ReportService, public us: UsersService,private authService: AuthService,private drift:driftSandsService,public recieve:Common ,private pm:pagePostMethod) {


    this.pm.findPageData("nmbm_drift_res", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.comms = Common.getLastUpdate(this.variable.drift_r_ut)
     var alarm: any[] = [this.faultVariable.drift_r_door_alarm, this.faultVariable.drift_r_solar_alarm, this.faultVariable.drift_r_room_alarm,this.faultVariable.drift_r_pepper_spray_alarm  ]

     this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm));

    });



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






//     var tagVals:any =[]
//     var tagArr=[
//       'drift_r_ut',//0
//      'drift_r_alarm_armed',//1
//      'drift_r_room_alarm',//2
//      'drift_r_solar_alarm',//3
//      'drift_r_door_alarm',//4
//      'drift_r_pepper_spray_armed',//5
//      'drift_r_pepper_spray_alarm',//6
//      'drift_r_pepper_spray_gas_left',//7
//      'drift_r_pepper_spray_battery_voltage',//8
//      'drift_r_reservoir_level',//9
//      'drift_r_flow_rate_1',//10
//      'drift_r_flow_rate_2',//11
//      'drift_r_total_flow_1',//12
//      'drift_r_total_flow_2',//13



//     ]
//     tagVals = this.recieve.recieveNMBMVals(tagArr);

//     var updateTemp:any;
//     this.intervalLoop = setInterval(() =>{

//       this.pm.findPageData("nmbm_drift_res", "R_CurrentVals").subscribe((result) => {
//         this.data =  result;

//         console.log(this.data)
//         Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

//        this.comms = Common.getLastUpdate(this.variable.drift_r_ut)
//        var alarm: any[] = [this.faultVariable.drift_r_door_alarm, this.faultVariable.drift_r_solar_alarm, this.faultVariable.drift_r_room_alarm,this.faultVariable.drift_r_pepper_spray_alarm  ]

//        this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm));

//       });


// },60000);

  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
}

