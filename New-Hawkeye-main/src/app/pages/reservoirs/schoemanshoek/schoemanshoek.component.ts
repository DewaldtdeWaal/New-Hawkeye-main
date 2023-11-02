import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { schoemansService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}


@Component({
  selector: 'app-schoemanshoek',
  templateUrl: './schoemanshoek.component.html',
  styleUrls: ['./schoemanshoek.component.css']
})


export class SchoemanshoekComponent implements OnInit {

  intervalLoop: any;
  theme: any;
  comms: string;
  rd_r_ut: any;
  level: number;



  generalfaulttable: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];



  generalfaulttabledatasource: any = new MatTableDataSource(this.generalfaulttable)
  nmb_schoe_r_ut: any;
  nmb_schoe_r_voltage_monitor: any;
  nmb_schoe_r_actuator_valve_feedback_signal_error: any = {
    value: null,
    alarm:"Fault",
    description:"Actuator Valve Signal Error",
    alarmTrip: 1
 };
  nmb_schoe_r_reservoir_level_signal_error: any = {
    value: null,
    alarm:"Fault",
    description:"Res Level Signal",
    alarmTrip: 1
 };

  nmb_schoe_r_actuator_valve_command_signal_error: any = {
    value: null,
    alarm:"Fault",
    description:"Valve Command Signal",
    alarmTrip: 1
 };
  nmb_schoe_r_actuator_mode: any;
  nmb_schoe_r_actuator_valve_status: any;
  nmb_schoe_r_actuator_valve_fault: any = {
    value: null,
    alarm:"Fault",
    description:"Actuator Valve Fault",
    alarmTrip: 1
 };


  nmb_schoe_r_actuator_valve_torque_fail_close: any = {
    value: null,
    alarm:"Fault",
    description:"Actuator Valve Torque Fail Close",
    alarmTrip: 1
 };

  nmb_schoe_r_actuator_valve_torque_fail_open: any = {
    value: null,
    alarm:"Fault",
    description:"Actuator Valve Torque Fail Open",
    alarmTrip: 1
 };
  nbm_schoe_r_plc_mode: any;
  nmb_schoe_r_general_fault: any = {
    value: null,
    alarm:"Fault",
    description:"General Fault",
    alarmTrip: 1
 };
  nmb_schoe_r_res_level: any;
  nmb_schoe_r_actuator_general_fault: any = {
    value: null,
    alarm:"Fault",
    description:"Actuator General Fault",
    alarmTrip: 1
 };
  nmb_schoe_r_actuator_valve_timeout: any = {
    value: null,
    alarm:"Fault",
    description:"Actuator Valve Timeout",
    alarmTrip: 1
 };

  nmb_schoe_r_pressure: any;
  nmb_schoe_r_actuator_set_point: any;
  nmb_schoe_r_actuator_position: any;
  data: any=[];

  constructor(private webSocketService: WebSocketService, private route:schoemansService,public recieve:Common,private pm:pagePostMethod ) {
    this.theme = localStorage.getItem("theme");
    this.route.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;

       this.nmb_schoe_r_ut = this.data.routingArray[0].nmb_schoe_r_ut

       this.comms = Common.getLastUpdate(this.nmb_schoe_r_ut)

      this.nmb_schoe_r_voltage_monitor = this.data.routingArray[0].nmb_schoe_r_voltage_monitor

      this.nmb_schoe_r_actuator_mode = this.data.routingArray[0].nmb_schoe_r_actuator_mode
      this.nmb_schoe_r_actuator_valve_status = this.data.routingArray[0].nmb_schoe_r_actuator_valve_status

      this.nbm_schoe_r_plc_mode = this.data.routingArray[0].nbm_schoe_r_plc_mode

      this.nmb_schoe_r_res_level = this.data.routingArray[0].nmb_schoe_r_res_level

      this.nmb_schoe_r_pressure = this.data.routingArray[0].nmb_schoe_r_pressure
      this.nmb_schoe_r_actuator_set_point = this.data.routingArray[0].nmb_schoe_r_actuator_set_point
      this.nmb_schoe_r_actuator_position = this.data.routingArray[0].nmb_schoe_r_actuator_position


      this.nmb_schoe_r_actuator_general_fault.value               = this.data.routingArray[0].nmb_schoe_r_actuator_general_fault
      this.nmb_schoe_r_actuator_valve_timeout.value               = this.data.routingArray[0].nmb_schoe_r_actuator_valve_timeout
      this.nmb_schoe_r_actuator_valve_feedback_signal_error.value = this.data.routingArray[0].nmb_schoe_r_actuator_valve_feedback_signal_error
      this.nmb_schoe_r_reservoir_level_signal_error.value         = this.data.routingArray[0].nmb_schoe_r_reservoir_level_signal_error
      this.nmb_schoe_r_actuator_valve_command_signal_error.value  = this.data.routingArray[0].nmb_schoe_r_actuator_valve_command_signal_error
      this.nmb_schoe_r_actuator_valve_fault.value                 = this.data.routingArray[0].nmb_schoe_r_actuator_valve_fault
      this.nmb_schoe_r_actuator_valve_torque_fail_close.value     = this.data.routingArray[0].nmb_schoe_r_actuator_valve_torque_fail_close
      this.nmb_schoe_r_actuator_valve_torque_fail_open.value      = this.data.routingArray[0].nmb_schoe_r_actuator_valve_torque_fail_open
      this.nmb_schoe_r_general_fault.value                        = this.data.routingArray[0].nmb_schoe_r_general_fault



    })
    setTimeout(() => {

      var alarm:any [] = [this.nmb_schoe_r_actuator_valve_feedback_signal_error, this.nmb_schoe_r_reservoir_level_signal_error, this.nmb_schoe_r_actuator_valve_command_signal_error, this.nmb_schoe_r_actuator_valve_fault, this.nmb_schoe_r_actuator_valve_torque_fail_close, this.nmb_schoe_r_actuator_valve_torque_fail_open, this.nmb_schoe_r_general_fault, this.nmb_schoe_r_actuator_general_fault, this.nmb_schoe_r_actuator_valve_timeout]


      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm))







    },1000)





   }

  //  recieveVals(tagArr: any[]){
  //   var tagVals:any = []
  //   for(let i = 0; i<tagArr.length ;i++){
  //     this.webSocketService.listen(tagArr[i]).subscribe((data:any)=>{
  //       tagVals[i] = data[tagArr[i]];

  //     })
  //   }
  //   return tagVals
  // }

  ngOnInit() {


//     var tagVals:any=[]
//     var tagArr =[
//       'nmb_schoe_r_ut',
//       'nmb_schoe_r_voltage_monitor',
//       'nmb_schoe_r_actuator_valve_feedback_signal_error',
//       'nmb_schoe_r_actuator_valve_command_signal_error',
//       'nmb_schoe_r_reservoir_level_signal_error',
//       'nmb_schoe_r_actuator_mode',
//       'nmb_schoe_r_actuator_valve_fault',
//       'nmb_schoe_r_actuator_valve_status',
//       'nmb_schoe_r_actuator_valve_torque_fail_close',
//       'nmb_schoe_r_actuator_valve_torque_fail_open',
//       'nbm_schoe_r_plc_mode',
//       'nmb_schoe_r_general_fault',
//       'nmb_schoe_r_actuator_general_fault',
//       'nmb_schoe_r_actuator_valve_timeout',
//       'nmb_schoe_r_res_level',
//       'nmb_schoe_r_pressure',
// 'nmb_schoe_r_actuator_set_point',
// 'nmb_schoe_r_actuator_position'


//     ]
//     tagVals = this.recieve.recieveNonMVals(tagArr);


//     var updateTemp:any;
//     this.intervalLoop = setInterval(() =>{
//       updateTemp = tagVals[0];
//       if(updateTemp !== undefined){

//       this.nmb_schoe_r_ut = tagVals[0];

//       this.nmb_schoe_r_voltage_monitor = tagVals[1];
//       this.nmb_schoe_r_actuator_mode = tagVals[5];
//       this.nmb_schoe_r_actuator_valve_status = tagVals[7];
//       this.nbm_schoe_r_plc_mode = tagVals[10];



//       this.nmb_schoe_r_res_level = tagVals[14];
//       this.nmb_schoe_r_pressure = tagVals[15]
//       this.nmb_schoe_r_actuator_set_point = tagVals[16]
//       this.nmb_schoe_r_actuator_position = tagVals[17]


//       this.nmb_schoe_r_actuator_general_fault.value = tagVals[12];
//       this.nmb_schoe_r_actuator_valve_timeout.value = tagVals[13]
//       this.nmb_schoe_r_actuator_valve_feedback_signal_error.value = tagVals[2]
//       this.nmb_schoe_r_reservoir_level_signal_error.value   = tagVals[4]
//       this.nmb_schoe_r_actuator_valve_command_signal_error.value = tagVals[3]
//       this.nmb_schoe_r_actuator_valve_fault.value = tagVals[6]
//       this.nmb_schoe_r_actuator_valve_torque_fail_close.value = tagVals[8]
//       this.nmb_schoe_r_actuator_valve_torque_fail_open.value = tagVals[9]
//       this.nmb_schoe_r_general_fault.value = tagVals[11]



//       }

//       this.comms = Common.getLastUpdate(this.nmb_schoe_r_ut)


//     setTimeout(()=>{
//       var alarm:any [] = [this.nmb_schoe_r_actuator_valve_feedback_signal_error, this.nmb_schoe_r_reservoir_level_signal_error, this.nmb_schoe_r_actuator_valve_command_signal_error, this.nmb_schoe_r_actuator_valve_fault, this.nmb_schoe_r_actuator_valve_torque_fail_close, this.nmb_schoe_r_actuator_valve_torque_fail_open, this.nmb_schoe_r_general_fault, this.nmb_schoe_r_actuator_general_fault, this.nmb_schoe_r_actuator_valve_timeout]


//       this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm))


//     },1000)

//   },60000)
  }


  // ngOnDestroy():void{
  //   if(this.intervalLoop){
  //     this.intervalLoop.unsubscribe();

  //   }
  // }

}
