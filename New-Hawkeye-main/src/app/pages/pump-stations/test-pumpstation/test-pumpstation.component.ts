import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {ChelseaService} from 'src/app/Service-Files/Reservoir/chelsea.service';
import {MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { ThemePalette } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {ControlLog} from 'src/app/models/controlLog.model'
import { ServerURLService } from 'src/app/Service-Files/server-url.service';
import { HttpClient } from '@angular/common/http';
export interface PeriodicElement {
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-test-pumpstation',
  templateUrl: './test-pumpstation.component.html',
  styleUrls: ['./test-pumpstation.component.css']
})
export class TestPumpstationComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 1;


  userSites:string[];
  data: any=[];
  last_update: any;
  comms: string;
  che_ps_common_delivery_pressure: any;
  che_ps_common_suction_pressure: any;
  che_ps_pumpset_1_no_flow_fault: any;
  che_ps_pumpset_1_ESTOP: any;
  che_ps_pumpset_1_circuit_breaker_trip: any;
  che_ps_pumpset_1_drive_fault: any;
  che_ps_pumpset_1_control_voltage_loss: any;
  che_ps_pumpset_1_pumpstatus: any;
  che_ps_pumpset_1_mode: any;
  che_ps_pumpset_1_vsd_actual_speed: any;
  che_ps_pumpset_1_vsd_actual_power: any;
  che_ps_pumpset_1_vsd_actual_current: any;
  che_ps_pumpset_1_del_pressure: any;
  che_ps_pumpset_1_suct_pressure: any;
  che_ps_pumpset_2_no_flow_fault: any;
  che_ps_pumpset_2_ESTOP: any;
  che_ps_pumpset_2_circuit_breaker_trip: any;
  che_ps_pumpset_2_control_voltage_loss: any;
  che_ps_pumpset_2_drive_fault: any;
  che_ps_pumpset_2_pumpstatus: any;
  che_ps_pumpset_2_del_pressure: any;
  che_ps_pumpset_3_no_flow_fault: any;
  che_ps_pumpset_2_mode: any;
  che_ps_pumpset_2_vsd_actual_current: any;
  che_ps_pumpset_2_vsd_actual_power: any;
  che_ps_pumpset_2_vsd_actual_speed: any;
  che_ps_pumpset_2_suct_pressure: any;
  che_ps_pumpset_3_vsd_actual_power: any;
  che_ps_pumpset_3_vsd_actual_current: any;
  che_ps_pumpset_3_vsd_actual_speed: any;
  che_ps_pumpset_3_mode: any;
  che_ps_pumpset_3_pumpstatus: any;
  che_ps_pumpset_3_control_voltage_loss: any;
  che_ps_pumpset_3_drive_fault: any;
  che_ps_pumpset_3_circuit_breaker_trip: any;
  che_ps_pumpset_3_ESTOP: any;
  theme: string | null;
  dataSourceG:any
  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceP3:any;
  dataSourceP4:any;
  displayedColumns :string[]= ['alarm', 'description'];
  che_ps_pumpset_3_del_pressure: any;
  che_ps_pumpset_3_suct_pressure: any;
  che_ps_pumpset_1_run_hours: any;
  che_ps_pumpset_2_run_hours: any;
  che_ps_pumpset_3_run_hours: any;
  che_ps_pumpset_4_no_flow_fault: any;
  che_ps_pumpset_4_ESTOP: any;
  che_ps_pumpset_4_circuit_breaker_trip: any;
  che_ps_pumpset_4_del_pressure: any;
  che_ps_pumpset_4_suct_pressure: any;
  che_ps_pumpset_4_run_hours: any;
  che_ps_pumpset_4_vsd_actual_current: any;
  che_ps_pumpset_4_vsd_actual_power: any;
  che_ps_pumpset_4_vsd_actual_speed: any;
  che_ps_pumpset_4_pumpstatus: any;
  che_ps_pumpset_4_mode: any;
  che_ps_pumpset_4_control_voltage_loss: any;
  che_ps_pumpset_4_drive_fault: any;
  ELEMENT_DATA_G: PeriodicElement[] = [];
  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];
  ELEMENT_DATA_P4: PeriodicElement[] = [];
  public authListenerSubs!: Subscription;
  showNavigationButton: string;
  intervalLoop: any;
  che_ps_700_flow_rate:any;
  che_ps_flood_alarm:any;
  stan_hawkeye_enable_control:any=false
  test_ps_scada_speed_sp: any;



  userIsAuthenticated =false;
  error:boolean = false;
  firstName:string;
  secondName: string;
  speed: any;
  site_control: any;
  constructor( private che: ChelseaService,private webSocketService: WebSocketService, private http: HttpClient, private su:ServerURLService,) {




    this.che.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.last_update = this.data.routingArray[0].che_r_ut
       this.che_ps_pumpset_1_run_hours = this.data.routingArray[0].che_ps_pumpset_1_run_hours;
       this.che_ps_pumpset_2_run_hours = this.data.routingArray[0].che_ps_pumpset_2_run_hours;
      this.che_ps_common_delivery_pressure = this.data.routingArray[0].che_ps_common_delivery_pressure
      this.che_ps_common_suction_pressure = this.data.routingArray[0].che_ps_common_suction_pressure
      this.che_ps_pumpset_1_no_flow_fault = this.data.routingArray[0].che_ps_pumpset_1_no_flow_fault
      this.che_ps_pumpset_1_ESTOP = this.data.routingArray[0].che_ps_pumpset_1_ESTOP
      this.che_ps_pumpset_1_circuit_breaker_trip = this.data.routingArray[0].che_ps_pumpset_1_circuit_breaker_trip
      this.che_ps_pumpset_1_drive_fault = this.data.routingArray[0].che_ps_pumpset_1_drive_fault
      this.che_ps_pumpset_1_control_voltage_loss = this.data.routingArray[0].che_ps_pumpset_1_control_voltage_loss
      this.che_ps_pumpset_1_pumpstatus = this.data.routingArray[0].che_ps_pumpset_1_pumpstatus
      this.che_ps_pumpset_1_mode = this.data.routingArray[0].che_ps_pumpset_1_mode
      this.che_ps_pumpset_1_vsd_actual_speed = this.data.routingArray[0].che_ps_pumpset_1_vsd_actual_speed
      this.che_ps_pumpset_1_vsd_actual_current = this.data.routingArray[0].che_ps_pumpset_1_vsd_actual_current
      this.che_ps_pumpset_1_vsd_actual_power = this.data.routingArray[0].che_ps_pumpset_1_vsd_actual_power
      this.che_ps_pumpset_1_del_pressure = this.data.routingArray[0].che_ps_pumpset_1_del_pressure
      this.che_ps_pumpset_1_suct_pressure = this.data.routingArray[0].che_ps_pumpset_1_suct_pressure
      this.che_ps_pumpset_2_no_flow_fault = this.data.routingArray[0].che_ps_pumpset_2_no_flow_fault
      this.che_ps_pumpset_2_ESTOP = this.data.routingArray[0].che_ps_pumpset_2_ESTOP
      this.che_ps_pumpset_2_circuit_breaker_trip = this.data.routingArray[0].che_ps_pumpset_2_circuit_breaker_trip
      this.che_ps_pumpset_2_drive_fault = this.data.routingArray[0].che_ps_pumpset_2_drive_fault
      this.che_ps_pumpset_2_control_voltage_loss = this.data.routingArray[0].che_ps_pumpset_2_control_voltage_loss
      this.che_ps_pumpset_2_pumpstatus = this.data.routingArray[0].che_ps_pumpset_2_pumpstatus
      this.che_ps_pumpset_2_mode = this.data.routingArray[0].che_ps_pumpset_2_mode
      this.che_ps_pumpset_2_vsd_actual_speed = this.data.routingArray[0].che_ps_pumpset_2_vsd_actual_speed
      this.che_ps_pumpset_2_vsd_actual_current = this.data.routingArray[0].che_ps_pumpset_2_vsd_actual_current
      this.che_ps_pumpset_2_vsd_actual_power = this.data.routingArray[0].che_ps_pumpset_2_vsd_actual_power
      this.che_ps_pumpset_2_del_pressure = this.data.routingArray[0].che_ps_pumpset_2_del_pressure
      this.che_ps_pumpset_2_suct_pressure = this.data.routingArray[0].che_ps_pumpset_2_suct_pressure
      this.che_ps_pumpset_3_no_flow_fault = this.data.routingArray[0].che_ps_pumpset_3_no_flow_fault
      this.che_ps_pumpset_3_ESTOP = this.data.routingArray[0].che_ps_pumpset_3_ESTOP
      this.che_ps_pumpset_3_circuit_breaker_trip = this.data.routingArray[0].che_ps_pumpset_3_circuit_breaker_trip
      this.che_ps_pumpset_3_drive_fault = this.data.routingArray[0].che_ps_pumpset_3_drive_fault
      this.che_ps_pumpset_3_control_voltage_loss = this.data.routingArray[0].che_ps_pumpset_3_control_voltage_loss
      this.che_ps_pumpset_3_pumpstatus = this.data.routingArray[0].che_ps_pumpset_3_pumpstatus
      this.che_ps_pumpset_3_mode = this.data.routingArray[0].che_ps_pumpset_3_mode
      this.che_ps_pumpset_3_vsd_actual_speed = this.data.routingArray[0].che_ps_pumpset_3_vsd_actual_speed
      this.che_ps_pumpset_3_vsd_actual_current = this.data.routingArray[0].che_ps_pumpset_3_vsd_actual_current
      this.che_ps_pumpset_3_vsd_actual_power = this.data.routingArray[0].che_ps_pumpset_3_vsd_actual_power
      this.che_ps_pumpset_3_del_pressure = this.data.routingArray[0].che_ps_pumpset_3_del_pressure
      this.che_ps_pumpset_3_suct_pressure = this.data.routingArray[0].che_ps_pumpset_3_suct_pressure
      this.che_ps_pumpset_3_run_hours = this.data.routingArray[0].che_ps_pumpset_3_run_hours;
      this.che_ps_pumpset_4_no_flow_fault = this.data.routingArray[0].che_ps_pumpset_4_no_flow_fault
      this.che_ps_pumpset_4_ESTOP = this.data.routingArray[0].che_ps_pumpset_4_ESTOP
      this.che_ps_pumpset_4_circuit_breaker_trip = this.data.routingArray[0].che_ps_pumpset_4_circuit_breaker_trip
      this.che_ps_pumpset_4_drive_fault = this.data.routingArray[0].che_ps_pumpset_4_drive_fault
      this.che_ps_pumpset_4_control_voltage_loss = this.data.routingArray[0].che_ps_pumpset_4_control_voltage_loss
      this.che_ps_pumpset_4_pumpstatus = this.data.routingArray[0].che_ps_pumpset_4_pumpstatus
      this.che_ps_pumpset_4_mode = this.data.routingArray[0].che_ps_pumpset_4_mode
      this.che_ps_pumpset_4_vsd_actual_speed = this.data.routingArray[0].che_ps_pumpset_4_vsd_actual_speed
      this.che_ps_pumpset_4_vsd_actual_current = this.data.routingArray[0].che_ps_pumpset_4_vsd_actual_current
      this.che_ps_pumpset_4_vsd_actual_power = this.data.routingArray[0].che_ps_pumpset_4_vsd_actual_power
      this.che_ps_pumpset_4_del_pressure = this.data.routingArray[0].che_ps_pumpset_4_del_pressure
      this.che_ps_pumpset_4_suct_pressure = this.data.routingArray[0].che_ps_pumpset_4_suct_pressure
      this.che_ps_pumpset_4_run_hours = this.data.routingArray[0].che_ps_pumpset_4_run_hours;
      this.che_ps_700_flow_rate=this.data.routingArray[0].che_ps_700_flow_rate
      this.che_ps_flood_alarm=this.data.routingArray[0].che_ps_flood_alarm


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
        this.theme = localStorage.getItem("theme");

      },1000)
        setTimeout(() => {

        var   p1Count=0;
        var   p2Count=0;
        var   p3Count=0;
        var   p4Count=0;
        var   gcount=0;

        if(this.che_ps_flood_alarm==1){
          this.ELEMENT_DATA_G[gcount]={  alarm: "Fault", description:"Flood Alarm"}
          gcount++;
        }
        this.dataSourceG = new MatTableDataSource(this.ELEMENT_DATA_G);

        if(this.che_ps_pumpset_1_no_flow_fault==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"No Flow Fault"}
          p1Count++;
         }
         if(this.che_ps_pumpset_1_ESTOP==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"E-Stop Active"}
          p1Count++;
         }
         if(this.che_ps_pumpset_1_circuit_breaker_trip==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Circuit Breaker Trip"}
          p1Count++;
         }
         if(this.che_ps_pumpset_1_drive_fault==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Drive Fault"}
          p1Count++;
         }
         if(this.che_ps_pumpset_1_control_voltage_loss==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Control Voltage Loss"}
          p1Count++;
         }
         this.dataSourceP1  = new MatTableDataSource(this.ELEMENT_DATA_P1);

         if(this.che_ps_pumpset_2_no_flow_fault==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"No Flow Fault"}
          p2Count++;
         }
         if(this.che_ps_pumpset_2_ESTOP==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"E-Stop Active"}
          p2Count++;
         }
         if(this.che_ps_pumpset_2_circuit_breaker_trip==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Circuit Breaker Trip"}
          p2Count++;
         }
         if(this.che_ps_pumpset_2_drive_fault==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Drive Fault"}
          p2Count++;
         }
         if(this.che_ps_pumpset_2_control_voltage_loss==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Control Voltage Loss"}
          p2Count++;
         }
         this.dataSourceP2  = new MatTableDataSource(this.ELEMENT_DATA_P2);

         if(this.che_ps_pumpset_3_no_flow_fault==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"No Flow Fault"}
          p3Count++;
         }
         if(this.che_ps_pumpset_3_ESTOP==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"E-Stop Active"}
          p3Count++;
         }
         if(this.che_ps_pumpset_3_circuit_breaker_trip==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Circuit Breaker Trip"}
          p3Count++;
         }
         if(this.che_ps_pumpset_3_drive_fault==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Drive Fault"}
          p3Count++;
         }
         if(this.che_ps_pumpset_3_control_voltage_loss==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Control Voltage Loss"}
          p3Count++;
         }
         this.dataSourceP3  = new MatTableDataSource(this.ELEMENT_DATA_P3);

         if(this.che_ps_pumpset_4_no_flow_fault==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"No Flow Fault"}
          p4Count++;
         }
         if(this.che_ps_pumpset_4_ESTOP==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"E-Stop Active"}
          p4Count++;
         }
         if(this.che_ps_pumpset_4_circuit_breaker_trip==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"Circuit Breaker Trip"}
          p4Count++;
         }
         if(this.che_ps_pumpset_4_drive_fault==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"Drive Fault"}
          p4Count++;
         }
         if(this.che_ps_pumpset_4_control_voltage_loss==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"Control Voltage Loss"}
          p4Count++;
         }
         this.dataSourceP4  = new MatTableDataSource(this.ELEMENT_DATA_P4);

      },1500)
     }



    recieveVals(tagArr: any[]){
      var tagVals:any = []
      for(let i = 0; i<tagArr.length ;i++){
        this.webSocketService.listen(tagArr[i]).subscribe((data:any)=>{
          tagVals[i] = data[tagArr[i]];
        })
      }
      return tagVals
    }

  ngOnInit() {





    var tagVals:any =[]
    var tagArr=[
      "che_r_ut",//0
      "che_ps_pumpset_1_run_hours",//1
      "che_ps_pumpset_2_run_hours",//2
      "che_ps_common_delivery_pressure",//3
      "che_ps_common_suction_pressure",//4
      "che_ps_pumpset_1_no_flow_fault",//5
      "che_ps_pumpset_1_ESTOP",//6
      "che_ps_pumpset_1_circuit_breaker_trip",//7
      "che_ps_pumpset_1_drive_fault",//8
      "che_ps_pumpset_1_control_voltage_loss",//9
      "che_ps_pumpset_1_pumpstatus",//10
      "che_ps_pumpset_1_mode",//11
      "che_ps_pumpset_1_vsd_actual_speed",//12
      "che_ps_pumpset_1_vsd_actual_current",//13
      "che_ps_pumpset_1_vsd_actual_power",//14
      "che_ps_pumpset_1_del_pressure",//15
      "che_ps_pumpset_1_suct_pressure",//16
      "che_ps_pumpset_2_no_flow_fault",//17
      "che_ps_pumpset_2_ESTOP",//18
      "che_ps_pumpset_2_circuit_breaker_trip",//19
      "che_ps_pumpset_2_drive_fault",//20
      "che_ps_pumpset_2_control_voltage_loss",//21
      "che_ps_pumpset_2_pumpstatus",//22
      "che_ps_pumpset_2_mode",//23
      "che_ps_pumpset_2_vsd_actual_speed",//24
      "che_ps_pumpset_2_vsd_actual_current",//25
      "che_ps_pumpset_2_vsd_actual_power",//26
      "che_ps_pumpset_2_del_pressure",//27
      "che_ps_pumpset_2_suct_pressure",//28
      "che_ps_pumpset_3_no_flow_fault",//29
      "che_ps_pumpset_3_ESTOP",//30
      "che_ps_pumpset_3_circuit_breaker_trip",//31
      "che_ps_pumpset_3_drive_fault",//32
      "che_ps_pumpset_3_control_voltage_loss",//33
      "che_ps_pumpset_3_pumpstatus",//34
      "che_ps_pumpset_3_mode",//35
      "che_ps_pumpset_3_vsd_actual_speed",//36
      "che_ps_pumpset_3_vsd_actual_current",//37
      "che_ps_pumpset_3_vsd_actual_power",//38
      "che_ps_pumpset_3_del_pressure",//40
      "che_ps_pumpset_3_suct_pressure",//41
      "che_ps_pumpset_3_run_hours",//42
      "che_ps_pumpset_4_no_flow_fault",//43
      "che_ps_pumpset_4_ESTOP",//44
      "che_ps_pumpset_4_circuit_breaker_trip",//45
      "che_ps_pumpset_4_drive_fault",//46
      "che_ps_pumpset_4_control_voltage_loss",//47
      "che_ps_pumpset_4_pumpstatus",//48
      "che_ps_pumpset_4_mode",//49
      "che_ps_pumpset_4_vsd_actual_speed",//50
      "che_ps_pumpset_4_vsd_actual_current",//51
      "che_ps_pumpset_4_vsd_actual_power",//52
      "che_ps_pumpset_4_del_pressure",//53
      "che_ps_pumpset_4_suct_pressure",//54
      "che_ps_pumpset_4_run_hours",//55
      "che_ps_pumpset_1_run_hours",//56
      "che_ps_pumpset_2_run_hours",//57
      "che_ps_pumpset_3_run_hours",//58
     "che_ps_700_flow_rate",//59
      "che_ps_flood_alarm",//60

    ]
    tagVals = this.recieveVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !==undefined){
        this.last_update = tagVals[0]
        this.che_ps_pumpset_1_run_hours = tagVals[1]
        this.che_ps_pumpset_2_run_hours = tagVals[2]
        this.che_ps_common_delivery_pressure = tagVals[3]
        this.che_ps_common_suction_pressure = tagVals[4]
        this.che_ps_pumpset_1_no_flow_fault = tagVals[5]
        this.che_ps_pumpset_1_ESTOP = tagVals[6]
        this.che_ps_pumpset_1_circuit_breaker_trip = tagVals[7]
        this.che_ps_pumpset_1_drive_fault = tagVals[8]
        this.che_ps_pumpset_1_control_voltage_loss = tagVals[9]
        this.che_ps_pumpset_1_pumpstatus = tagVals[10]
        this.che_ps_pumpset_1_mode = tagVals[11]
        this.che_ps_pumpset_1_vsd_actual_speed = tagVals[12]
        this.che_ps_pumpset_1_vsd_actual_current = tagVals[13]
        this.che_ps_pumpset_1_vsd_actual_power = tagVals[14]
        this.che_ps_pumpset_1_del_pressure = tagVals[15]
        this.che_ps_pumpset_1_suct_pressure = tagVals[16]
        this.che_ps_pumpset_2_no_flow_fault = tagVals[17]
        this.che_ps_pumpset_2_ESTOP = tagVals[18]
        this.che_ps_pumpset_2_circuit_breaker_trip = tagVals[19]
        this.che_ps_pumpset_2_drive_fault = tagVals[20]
        this.che_ps_pumpset_2_control_voltage_loss = tagVals[21]
        this.che_ps_pumpset_2_pumpstatus = tagVals[22]
        this.che_ps_pumpset_2_mode = tagVals[23]
        this.che_ps_pumpset_2_vsd_actual_speed = tagVals[24]
        this.che_ps_pumpset_2_vsd_actual_current = tagVals[25]
        this.che_ps_pumpset_2_vsd_actual_power = tagVals[26]
        this.che_ps_pumpset_2_del_pressure = tagVals[27]
        this.che_ps_pumpset_2_suct_pressure = tagVals[28]
        this.che_ps_pumpset_3_no_flow_fault = tagVals[29]
        this.che_ps_pumpset_3_ESTOP = tagVals[30]
        this.che_ps_pumpset_3_circuit_breaker_trip = tagVals[31]
        this.che_ps_pumpset_3_drive_fault = tagVals[32]
        this.che_ps_pumpset_3_control_voltage_loss = tagVals[33]
        this.che_ps_pumpset_3_pumpstatus = tagVals[34]
        this.che_ps_pumpset_3_mode = tagVals[35]
        this.che_ps_pumpset_3_vsd_actual_speed = tagVals[36]
        this.che_ps_pumpset_3_vsd_actual_current = tagVals[37]
        this.che_ps_pumpset_3_vsd_actual_power = tagVals[38]
        this.che_ps_pumpset_3_del_pressure = tagVals[39]
        this.che_ps_pumpset_3_suct_pressure = tagVals[40]
        this.che_ps_pumpset_3_run_hours = tagVals[41]
        this.che_ps_pumpset_4_no_flow_fault = tagVals[42]
        this.che_ps_pumpset_4_ESTOP = tagVals[43]
        this.che_ps_pumpset_4_circuit_breaker_trip = tagVals[44]
        this.che_ps_pumpset_4_drive_fault = tagVals[45]
        this.che_ps_pumpset_4_control_voltage_loss = tagVals[46]
        this.che_ps_pumpset_4_pumpstatus = tagVals[47]
        this.che_ps_pumpset_4_mode = tagVals[48]
        this.che_ps_pumpset_4_vsd_actual_speed = tagVals[49]
        this.che_ps_pumpset_4_vsd_actual_current = tagVals[50]
        this.che_ps_pumpset_4_vsd_actual_power = tagVals[51]
        this.che_ps_pumpset_4_del_pressure = tagVals[52]
        this.che_ps_pumpset_4_suct_pressure = tagVals[53]
        this.che_ps_pumpset_4_run_hours = tagVals[54]
        this.che_ps_pumpset_1_run_hours = tagVals[55]
        this.che_ps_pumpset_2_run_hours = tagVals[56]
        this.che_ps_pumpset_3_run_hours = tagVals[57]
        this.che_ps_700_flow_rate = tagVals[58]
        this.che_ps_flood_alarm = tagVals[59]


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
        this.theme = localStorage.getItem("theme");
      }



        var   p1Count=0;
        var   p2Count=0;
        var   p3Count=0;
        var   p4Count=0;
        var   gcount=0;

        if(this.che_ps_flood_alarm==1){
          this.ELEMENT_DATA_G[gcount]={  alarm: "Fault", description:"Flood Alarm"}
          gcount++;
        }
        this.dataSourceG = new MatTableDataSource(this.ELEMENT_DATA_G);

        if(this.che_ps_pumpset_1_no_flow_fault==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"No Flow Fault"}
          p1Count++;
         }
         if(this.che_ps_pumpset_1_ESTOP==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"E-Stop Active"}
          p1Count++;
         }
         if(this.che_ps_pumpset_1_circuit_breaker_trip==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Circuit Breaker Trip"}
          p1Count++;
         }
         if(this.che_ps_pumpset_1_drive_fault==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Drive Fault"}
          p1Count++;
         }
         if(this.che_ps_pumpset_1_control_voltage_loss==1){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Control Voltage Loss"}
          p1Count++;
         }
         this.dataSourceP1  = new MatTableDataSource(this.ELEMENT_DATA_P1);

         if(this.che_ps_pumpset_2_no_flow_fault==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"No Flow Fault"}
          p2Count++;
         }
         if(this.che_ps_pumpset_2_ESTOP==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"E-Stop Active"}
          p2Count++;
         }
         if(this.che_ps_pumpset_2_circuit_breaker_trip==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Circuit Breaker Trip"}
          p2Count++;
         }
         if(this.che_ps_pumpset_2_drive_fault==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Drive Fault"}
          p2Count++;
         }
         if(this.che_ps_pumpset_2_control_voltage_loss==1){
          this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Control Voltage Loss"}
          p2Count++;
         }
         this.dataSourceP2  = new MatTableDataSource(this.ELEMENT_DATA_P2);

         if(this.che_ps_pumpset_3_no_flow_fault==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"No Flow Fault"}
          p3Count++;
         }
         if(this.che_ps_pumpset_3_ESTOP==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"E-Stop Active"}
          p3Count++;
         }
         if(this.che_ps_pumpset_3_circuit_breaker_trip==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Circuit Breaker Trip"}
          p3Count++;
         }
         if(this.che_ps_pumpset_3_drive_fault==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Drive Fault"}
          p3Count++;
         }
         if(this.che_ps_pumpset_3_control_voltage_loss==1){
          this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Control Voltage Loss"}
          p3Count++;
         }
         this.dataSourceP3  = new MatTableDataSource(this.ELEMENT_DATA_P3);

         if(this.che_ps_pumpset_4_no_flow_fault==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"No Flow Fault"}
          p4Count++;
         }
         if(this.che_ps_pumpset_4_ESTOP==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"E-Stop Active"}
          p4Count++;
         }
         if(this.che_ps_pumpset_4_circuit_breaker_trip==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"Circuit Breaker Trip"}
          p4Count++;
         }
         if(this.che_ps_pumpset_4_drive_fault==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"Drive Fault"}
          p4Count++;
         }
         if(this.che_ps_pumpset_4_control_voltage_loss==1){
          this.ELEMENT_DATA_P4[p4Count]={  alarm: "Fault", description:"Control Voltage Loss"}
          p4Count++;
         }
         this.dataSourceP4  = new MatTableDataSource(this.ELEMENT_DATA_P4);
    }, 60000)


  }
  ngOnDestroy(){
      if(this.intervalLoop){
        clearInterval(this.intervalLoop)
      }
    }


    toggle(){
      if(this.stan_hawkeye_enable_control == false)
      {

      }
    }

    onNewSpeedPoint(form: NgForm){
      this.test_ps_scada_speed_sp = form.value.speed;
      var date = this.getCurrentDate();
      const controlLog: ControlLog ={
        date: date,
        site: "Test Site",
        description: "Set Speed To: " + form.value.speed + " rpm",
        name: 'Test Site Pump',
        pump: 'Nan'
      };
      this.http.post(this.su.serverURL+"/pumpstations/test/ps/control-log",controlLog).subscribe(()=>{})

      this.site_control.saveTestPumpControl(this.speed).subscribe((resp:any)=>{
      this.test_ps_scada_speed_sp = resp.ps_speed;

      })

      }



    getCurrentDate(){
      var now =  new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var date = year + '-' + month + '-' + day +" "+ hour +":" + min;
      return date;
    }

}
