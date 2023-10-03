import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import {MatTableDataSource} from '@angular/material/table';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { ChattyService} from 'src/app/Service-Files/Reservoir/chatty.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-chatty-ps',
  templateUrl: './chatty-ps.component.html',
  styleUrls: ['./chatty-ps.component.css']
})
export class ChattyPSComponent  {

  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;
  variable :any= {
  cht_ut:null,
  cht_g_panel_surge_arrestor:null,
  cht_g_panel_voltage_okay:null,
  cht_g_ps_mode:null,
  cht_p1_rt:null,
  cht_p1_a:null,
  cht_p1_kw:null,
  cht_p1_rpm:null,
  cht_p1_status:null,
  cht_p1_mode:null,
  cht_p1_vsd_status:null,
  cht_p2_rt:null,
  cht_p2_a:null,
  cht_p2_kw:null,
  cht_p2_rpm:null,
  cht_p2_status:null,
  cht_p2_mode:null,
  comms:null,
  cht_p2_vsd_status:null
  }


  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];

  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any  = new MatTableDataSource(this.ELEMENT_DATA_P1);
  dataSourceP2:any = new MatTableDataSource(this.ELEMENT_DATA_P2);
theme: any;

  static TEST: string;
  data: any=[];

  intervalLoop: any

  faultVariable:any={
  cht_p1_no_flow_fault: {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  cht_p1_estop_fault: {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  cht_p1_circuit_breaker_fault:{
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker",
    alarmTrip: 1
  },
  cht_p2_no_flow_fault: {
    value: null,
  alarm:"Fault",
  description:"No Flow Fault",
    alarmTrip: 1
  },
  cht_p2_estop_fault: {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  cht_p2_circuit_breaker_fault: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker",
    alarmTrip: 1
  }
  }
   tagArr:any=[
    "cht_ut",//0
    "cht_g_panel_surge_arrestor",//1
    "cht_g_panel_voltage_okay",//2
    "cht_g_ps_mode",//3
    "cht_p1_rt",//4
    "cht_p1_a",//5
    "cht_p1_kw",//6
    "cht_p1_rpm",//7
    "cht_p1_status",//8
    "cht_p1_mode",//9
    "cht_p1_no_flow_fault",//10
    "cht_p1_estop_fault",//11
    "cht_p1_circuit_breaker_fault",//12
    "cht_p1_vsd_status",//13
    "cht_p2_rt",//14
    "cht_p2_a",//15
    "cht_p2_kw",//16
    "cht_p2_rpm",//17
    "cht_p2_status",//18
    "cht_p2_mode",//19
    "cht_p2_no_flow_fault",//20
    "cht_p2_estop_fault",//21
    "cht_p2_circuit_breaker_fault",//22
    "cht_p2_vsd_status",//23
  ]

  constructor(private ls:ListeningService, private ws: WebSocketService, private us:UsersService,private chat:ChattyService   ,private userService: UsersService,private authService: AuthService,public recieve:Common ) {
  this.chat.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;

       this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)

       this.variable.comms = Common.getLastUpdate(this.variable.cht_ut)


       this.faultVariable.cht_p1_no_flow_fault.value = this.data.routingArray[0].cht_p1_no_flow_fault
       this.faultVariable =   Common.getFaultRouteData(this.tagArr,this.faultVariable,this.data.routingArray)



    })

    this.theme = localStorage.getItem("theme");
    setTimeout(() => {


      var alarm1: any [] = [this.faultVariable.cht_p1_no_flow_fault,this.faultVariable.cht_p1_estop_fault,this.faultVariable.cht_p1_circuit_breaker_fault]
      var alarm2: any [] = [this.faultVariable.cht_p2_no_flow_fault,this.faultVariable.cht_p2_estop_fault,this.faultVariable.cht_p2_circuit_breaker_fault]

      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      console.log(this.faultVariable)




    },60000)


   }


  ngOnInit(){

    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_CHT_R":
          this.showNavigationButton = "true";
          break;
      }
    }




    var tagVals:any =[]

    tagVals = this.recieve.recieveNMBMVals(this.tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !==undefined){
        this.variable.cht_ut=tagVals[0]

        this.variable.cht_g_panel_surge_arrestor=tagVals[1];
        this.variable.cht_g_panel_voltage_okay=tagVals[2];
        this.variable.cht_g_ps_mode=tagVals[3];
        this.variable.cht_p1_rt=tagVals[4];
        this.variable.cht_p1_a=tagVals[5];
        this.variable.cht_p1_kw=tagVals[6];
        this.variable.cht_p1_rpm=tagVals[7];
        this.variable.cht_p1_status=tagVals[8];
        this.variable.cht_p1_mode=tagVals[9];
        this.variable.cht_p1_vsd_status=tagVals[13];
        this.variable.cht_p2_rt=tagVals[14];
        this.variable.cht_p2_a=tagVals[15];
        this.variable.cht_p2_kw=tagVals[16];
        this.variable.cht_p2_rpm=tagVals[17];
        this.variable.cht_p2_status=tagVals[18];
        this.variable.cht_p2_mode=tagVals[19];
        this.variable.cht_p2_vsd_status=tagVals[23];
        this.faultVariable.cht_p1_no_flow_fault.value=tagVals[10];
        this.faultVariable.cht_p1_estop_fault.value=tagVals[11];
        this.faultVariable.cht_p1_circuit_breaker_fault.value=tagVals[12];
        this.faultVariable.cht_p2_no_flow_fault.value=tagVals[20];
        this.faultVariable.cht_p2_estop_fault.value=tagVals[21];
        this.faultVariable.cht_p2_circuit_breaker_fault.value=tagVals[22];

        var alarm1: any [] = [this.faultVariable.cht_p1_no_flow_fault,this.faultVariable.cht_p1_estop_fault,this.faultVariable.cht_p1_circuit_breaker_fault]
        var alarm2: any [] = [this.faultVariable.cht_p2_no_flow_fault,this.faultVariable.cht_p2_estop_fault,this.faultVariable.cht_p2_circuit_breaker_fault]

        this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
        this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      }
      this.variable.comms = Common.getLastUpdate(this.variable.cht_ut)

    },60000 )
  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
