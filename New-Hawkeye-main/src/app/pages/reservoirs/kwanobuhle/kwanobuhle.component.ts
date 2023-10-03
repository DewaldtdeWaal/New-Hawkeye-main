import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {kwanobuhleService} from 'src/app/Service-Files/Reservoir/reservoir.service'
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';

export interface PeriodicElement{
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-kwanobuhle',
  templateUrl: './kwanobuhle.component.html',
  styleUrls: ['./kwanobuhle.component.css']
})
export class KwanobuhleComponent implements OnInit {


  kwano_r_alarm_armed:any;
  kwano_r_room_alarm:any;
  kwano_r_ut:any;
  kwano_r_solar_alarm:any;
  kwano_r_door_alarm:any;
  kwano_r_pepper_spray_armed:any;
  kwano_r_pepper_spray_alarm:any;
  kwano_r_pepper_spray_gas_left:any;
  kwano_r_pepper_spray_battery_voltage:any;
  kwano_r_reservoir_level:any;
  kwano_r_flow_rate_1:any;
  kwano_r_flow_rate_2:any;
  kwano_r_total_flow_1:any;
  kwano_r_total_flow_2:any;
   comms: any;
   data:any=[]

   generalfaulttable: PeriodicElement[] = [];
   displayedColumns :string[]= ['alarm', 'description'];
   generalfaulttabledatasource: any = new MatTableDataSource(this.generalfaulttable)
   intervalLoop: any;

   solarAlarm:any = {
    value: null,
    alarm:"Fault",
    description:"Solar Alarm",
    alarmTrip: 1
 };

 roomAlarm:any = {
  value: null,
  alarm:"Fault",
  description:"Room Alarm",
  alarmTrip: 1
};

pepperSprayAlarm:any = {
  value: null,
  alarm:"Fault",
  description:"Pepper Spray Alarm",
  alarmTrip: 1
};

roomDoorAlarm:any = {
value: null,
alarm:"Fault",
description:"Room Door Alarm",
alarmTrip: 1
};




  constructor(private ws: WebSocketService, public rs: ReportService, public us: UsersService,private authService: AuthService,private kwano:kwanobuhleService,public recieve:Common ,private pm:pagePostMethod)
  {

    this.kwano.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
     this.kwano_r_alarm_armed = this.data.routingArray[0].kwano_r_alarm_armed
     this.kwano_r_ut = this.data.routingArray[0].kwano_r_ut

     this.kwano_r_pepper_spray_armed = this.data.routingArray[0].kwano_r_pepper_spray_armed
     this.kwano_r_pepper_spray_gas_left = this.data.routingArray[0].kwano_r_pepper_spray_gas_left
     this.kwano_r_pepper_spray_battery_voltage = this.data.routingArray[0].kwano_r_pepper_spray_battery_voltage
     this.kwano_r_reservoir_level = this.data.routingArray[0].kwano_r_reservoir_level
     this.kwano_r_flow_rate_1 = this.data.routingArray[0].kwano_r_flow_rate_1
     this.kwano_r_flow_rate_2 = this.data.routingArray[0].kwano_r_flow_rate_2
     this.kwano_r_total_flow_1 = this.data.routingArray[0].kwano_r_total_flow_1
     this.kwano_r_total_flow_2 = this.data.routingArray[0].kwano_r_total_flow_2


    })



    setTimeout(() => {
      var alarm1: any [] = [this.solarAlarm,this.roomAlarm,this.pepperSprayAlarm,this.roomDoorAlarm ]
      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.comms = Common.getLastUpdate(this.kwano_r_ut)
    },1000)
   }







  ngOnInit() {






    var tagVals:any =[]
    var tagArr=[
      'kwano_r_ut',//0
     'kwano_r_alarm_armed',//1
     'kwano_r_room_alarm',//2
     'kwano_r_solar_alarm',//3
     'kwano_r_door_alarm',//4
     'kwano_r_pepper_spray_armed',//5
     'kwano_r_pepper_spray_alarm',//6
     'kwano_r_pepper_spray_gas_left',//7
     'kwano_r_pepper_spray_battery_voltage',//8
     'kwano_r_reservoir_level',//9
     'kwano_r_flow_rate_1',//10
     'kwano_r_flow_rate_2',//11
     'kwano_r_total_flow_1',//12
     'kwano_r_total_flow_2',//13



    ]
    tagVals = this.recieve.recieveNMBMVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){
       this.kwano_r_ut = tagVals[0]
       this.kwano_r_alarm_armed = tagVals[1]
       this.kwano_r_pepper_spray_armed = tagVals[5]
       this.kwano_r_pepper_spray_gas_left = tagVals[7]
       this.kwano_r_pepper_spray_battery_voltage = tagVals[8]
       this.kwano_r_reservoir_level = tagVals[9]
       this.kwano_r_flow_rate_1  = tagVals[10]
       this.kwano_r_flow_rate_2  = tagVals[11]
       this.kwano_r_total_flow_1  = tagVals[12]
       this.kwano_r_total_flow_2  = tagVals[13]

       this.pepperSprayAlarm.value = tagVals[6]
       this.solarAlarm.value  = tagVals[3]
       this.roomDoorAlarm.value = tagVals[4]
       this.roomAlarm.value= tagVals[2]

       var alarm1: any [] = [this.solarAlarm,this.roomAlarm,this.pepperSprayAlarm,this.roomDoorAlarm ]
       this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm1))
    }
    this.comms = Common.getLastUpdate(this.kwano_r_ut)
},60000);
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
