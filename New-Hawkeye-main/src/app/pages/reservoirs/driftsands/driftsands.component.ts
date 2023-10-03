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
 drift_r_room_alarm:any= {
  value: null,
alarm:"Fault",
description:"Room Alarm",
  alarmTrip: 1
};;

 drift_r_solar_alarm:any= {
  value: null,
alarm:"Fault",
description:"Solar Alarm",
  alarmTrip: 1
};;
 drift_r_door_alarm:any= {
  value: null,
alarm:"Fault",
description:"Room Door Alarm",
  alarmTrip: 1
};;
 drift_r_pepper_spray_armed:any;
 drift_r_pepper_spray_alarm:any = {
  value: null,
alarm:"Fault",
description:"Pepper Spray Alarm",
  alarmTrip: 1
};;
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


   tagArr=[
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



  constructor(private ws: WebSocketService, public rs: ReportService, public us: UsersService,private authService: AuthService,private drift:driftSandsService,public recieve:Common ,private pm:pagePostMethod) {

    this.drift.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
     this.drift_r_alarm_armed = this.data.routingArray[0].drift_r_alarm_armed

     this.drift_r_ut = this.data.routingArray[0].drift_r_ut
     this.comms = Common.getLastUpdate(this.drift_r_ut)

     this.drift_r_pepper_spray_armed = this.data.routingArray[0].drift_r_pepper_spray_armed

     this.drift_r_pepper_spray_gas_left = this.data.routingArray[0].drift_r_pepper_spray_gas_left
     this.drift_r_pepper_spray_battery_voltage = this.data.routingArray[0].drift_r_pepper_spray_battery_voltage
     this.drift_r_reservoir_level = this.data.routingArray[0].drift_r_reservoir_level
     this.drift_r_flow_rate_1 = this.data.routingArray[0].drift_r_flow_rate_1
     this.drift_r_flow_rate_2 = this.data.routingArray[0].drift_r_flow_rate_2
     this.drift_r_total_flow_1 = this.data.routingArray[0].drift_r_total_flow_1
     this.drift_r_total_flow_2 = this.data.routingArray[0].drift_r_total_flow_2


     this.drift_r_door_alarm.value = this.data.routingArray[0].drift_r_door_alarm
     this.drift_r_solar_alarm.value = this.data.routingArray[0].drift_r_solar_alarm
     this.drift_r_room_alarm.value = this.data.routingArray[0].drift_r_room_alarm
     this.drift_r_pepper_spray_alarm.value = this.data.routingArray[0].drift_r_pepper_spray_alarm
    })



    setTimeout(() => {

      var alarm: any[] = [this.drift_r_door_alarm, this.drift_r_solar_alarm, this.drift_r_room_alarm,this.drift_r_pepper_spray_alarm  ]

      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm));





    },6000)
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






    var tagVals:any =[]
    var tagArr=[
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
    tagVals = this.recieve.recieveNMBMVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      console.log(tagVals)
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){

       this.drift_r_ut = tagVals[0]

       this.drift_r_alarm_armed = tagVals[1]



       this.drift_r_pepper_spray_armed = tagVals[5]

       this.drift_r_pepper_spray_gas_left = tagVals[7]
       this.drift_r_pepper_spray_battery_voltage = tagVals[8]
       this.drift_r_reservoir_level = tagVals[9]
       this.drift_r_flow_rate_1  = tagVals[10]
       this.drift_r_flow_rate_2  = tagVals[11]
       this.drift_r_total_flow_1  = tagVals[12]
       this.drift_r_total_flow_2  = tagVals[13]


       this.drift_r_room_alarm.value = tagVals[2]
         this.drift_r_solar_alarm.value = tagVals[3]
          this.drift_r_door_alarm.value = tagVals[4]
          this.drift_r_pepper_spray_alarm.value = tagVals[6]


       var alarm: any[] = [this.drift_r_door_alarm, this.drift_r_solar_alarm, this.drift_r_room_alarm,this.drift_r_pepper_spray_alarm  ]

        this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm));




    }
    this.comms = Common.getLastUpdate(this.drift_r_ut)

},60000);

  }

}

