import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import {heatherBankComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-heatherbank-ps',
  templateUrl: './heatherbank-ps.component.html',
  styleUrls: ['./heatherbank-ps.component.css']
})
export class HeatherbankPSComponent implements OnInit {


  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;

  hb_PS_UT:any
  intervalLoop: any
  hb_P1_RH:any
  hb_P1_MODE: any
  hb_P1_STATUS: any
  hb_P1_CURRENT: any

  hb_P2_RH:any
  hb_P2_MODE: any
  hb_P2_STATUS: any
  hb_P2_CURRENT: any


  hb_P3_RH:any
  hb_P3_MODE: any
  hb_P3_STATUS: any
  hb_P3_CURRENT: any


  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceP3:any;
theme:any;
  comms: string;
  data: any=[];


  hb_P1_PUMP_CB_TRIP_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  };
  hb_P1_STARTUP_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"Soft Stop",
    alarmTrip: 1
  };
  hb_P1_ESTOP_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  };
  hb_P1_NO_FLOW_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  };


  hb_P2_PUMP_CB_TRIP_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  };
  hb_P2_STARTUP_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"Soft Stop",
    alarmTrip: 1
  };
  hb_P2_ESTOP_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  };
  hb_P2_NO_FLOW_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  };

  hb_P3_PUMP_CB_TRIP_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker Trip",
    alarmTrip: 1
  };
  hb_P3_STARTUP_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"Soft Stop",
    alarmTrip: 1
  };
  hb_P3_ESTOP_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  };
  hb_P3_NO_FLOW_FAULT: any= {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  };

  constructor(private webSocketService: WebSocketService, private us:UsersService, private chat:heatherBankComponent,private userService: UsersService,private authService: AuthService,public recieve:Common ) {
    this.chat.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       console.log(this.data);
       this.hb_PS_UT = this.data.routingArray[0].hb_R_UT;
       this.comms = Common.getLastUpdate(this.hb_PS_UT)
       this.hb_P1_RH = this.data.routingArray[0].hb_P1_RH
       this.hb_P1_MODE = this.data.routingArray[0].hb_P1_MODE
       this.hb_P1_STATUS = this.data.routingArray[0].hb_P1_STATUS
       this.hb_P1_CURRENT = this.data.routingArray[0].hb_P1_CURRENT


       this.hb_P2_RH = this.data.routingArray[0].hb_P2_RH
       this.hb_P2_MODE = this.data.routingArray[0].hb_P2_MODE
       this.hb_P2_STATUS = this.data.routingArray[0].hb_P2_STATUS
       this.hb_P2_CURRENT = this.data.routingArray[0].hb_P2_CURRENT

       this.hb_P3_RH = this.data.routingArray[0].hb_P3_RH
       this.hb_P3_MODE = this.data.routingArray[0].hb_P3_MODE
       this.hb_P3_STATUS = this.data.routingArray[0].hb_P3_STATUS
       this.hb_P3_CURRENT = this.data.routingArray[0].hb_P3_CURRENT


       this.hb_P1_NO_FLOW_FAULT.value = this.data.routingArray[0].hb_P1_NO_FLOW_FAULT
       this.hb_P1_PUMP_CB_TRIP_FAULT.value = this.data.routingArray[0].hb_P1_PUMP_CB_TRIP_FAULT
       this.hb_P1_STARTUP_FAULT.value = this.data.routingArray[0].hb_P1_STARTUP_FAULT
       this.hb_P1_ESTOP_FAULT.value = this.data.routingArray[0].hb_P1_ESTOP_FAULT
       this.hb_P2_PUMP_CB_TRIP_FAULT.value = this.data.routingArray[0].hb_P2_PUMP_CB_TRIP_FAULT
       this.hb_P2_STARTUP_FAULT.value = this.data.routingArray[0].hb_P2_STARTUP_FAULT
       this.hb_P2_ESTOP_FAULT.value = this.data.routingArray[0].hb_P2_ESTOP_FAULT
       this.hb_P2_NO_FLOW_FAULT.value = this.data.routingArray[0].hb_P2_NO_FLOW_FAULT
       this.hb_P3_PUMP_CB_TRIP_FAULT.value = this.data.routingArray[0].hb_P3_PUMP_CB_TRIP_FAULT
       this.hb_P3_STARTUP_FAULT.value = this.data.routingArray[0].hb_P3_STARTUP_FAULT
       this.hb_P3_ESTOP_FAULT.value = this.data.routingArray[0].hb_P3_ESTOP_FAULT
       this.hb_P3_NO_FLOW_FAULT.value = this.data.routingArray[0].hb_P3_NO_FLOW_FAULT

    })
    this.theme = localStorage.getItem("theme");
    setTimeout(() => {

      var alarm1: any [] = [this.hb_P1_NO_FLOW_FAULT,this.hb_P1_PUMP_CB_TRIP_FAULT,this.hb_P1_STARTUP_FAULT,this.hb_P1_ESTOP_FAULT ]
      var alarm2: any [] = [this.hb_P2_NO_FLOW_FAULT,this.hb_P2_PUMP_CB_TRIP_FAULT,this.hb_P2_STARTUP_FAULT,this.hb_P2_ESTOP_FAULT ]
      var alarm3: any [] = [this.hb_P3_NO_FLOW_FAULT,this.hb_P3_PUMP_CB_TRIP_FAULT,this.hb_P3_STARTUP_FAULT,this.hb_P3_ESTOP_FAULT ]


      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))






    },1000)



   }
  //  recieveVals(tagArr: any[]){
  //   var tagVals:any = []
  //   for(let i = 0; i<tagArr.length ;i++){
  //     this.webSocketService.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
  //       tagVals[i] = data[tagArr[i]];
  //     })
  //   }
  //   return tagVals
  // }
  ngOnInit(){

    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_HB_R":
          this.showNavigationButton = "true";
          break;
      }
    }





    var tagVals:any =[]
    var tagArr=[
      "hb_ut",//0
      "hb_p1_rh",//1
      "hb_p1_mode",//2
      "hb_p1_status",//3
      "hb_p1_current",//4
      "hb_p1_pump_cb_trip_fault",//5
      "hb_p1_startup_fault",//6
      "hb_p1_estop_fault",//7
      "hb_p1_no_flow_fault",//8
      "hb_p2_rh",//9
      "hb_p2_mode",//10
      "hb_p2_status",//11
      "hb_p2_current",//12
      "hb_p2_pump_cb_trip_fault",//13
      "hb_p2_startup_fault",//14
      "hb_p2_estop_fault",//15
      "hb_p2_no_flow_fault",//16
      "hb_p3_rh",//17
      "hb_p3_mode",//18
      "hb_p3_status",//19
      "hb_p3_current",//20
      "hb_p3_pump_cb_trip_fault",//21
      "hb_p3_startup_fault",//22
      "hb_p3_estop_fault",//23
      "hb_p3_no_flow_fault",//24
    ]
    tagVals = this.recieve.recieveNMBMVals(tagArr);
    console.log(tagArr)
      var updateTemp:any;
      this.intervalLoop = setInterval(() =>{
        updateTemp = tagVals[0];
        if(updateTemp !==undefined){
          this.hb_PS_UT = tagVals[0]
          this.hb_P1_RH = tagVals[1]
          this.hb_P1_MODE = tagVals[2]
          this.hb_P1_STATUS = tagVals[3]
          this.hb_P1_CURRENT = tagVals[4]
          this.hb_P1_PUMP_CB_TRIP_FAULT.value = tagVals[5]
          this.hb_P1_STARTUP_FAULT.value = tagVals[6]
          this.hb_P1_ESTOP_FAULT.value = tagVals[7]
          this.hb_P1_NO_FLOW_FAULT.value = tagVals[8]
          this.hb_P2_RH = tagVals[9]
          this.hb_P2_MODE = tagVals[10]
          this.hb_P2_STATUS = tagVals[11]
          this.hb_P2_CURRENT = tagVals[12]
          this.hb_P2_PUMP_CB_TRIP_FAULT.value = tagVals[13]
          this.hb_P2_STARTUP_FAULT.value = tagVals[14]
          this.hb_P2_ESTOP_FAULT.value = tagVals[15]
          this.hb_P2_NO_FLOW_FAULT.value = tagVals[16]
          this.hb_P3_RH = tagVals[17]
          this.hb_P3_MODE = tagVals[18]
          this.hb_P3_STATUS = tagVals[19]
          this.hb_P3_CURRENT = tagVals[20]
          this.hb_P3_PUMP_CB_TRIP_FAULT.value = tagVals[21]
          this.hb_P3_STARTUP_FAULT.value = tagVals[22]
          this.hb_P3_ESTOP_FAULT.value = tagVals[23]
          this.hb_P3_NO_FLOW_FAULT.value = tagVals[24]





        var alarm1: any [] = [this.hb_P1_NO_FLOW_FAULT,this.hb_P1_PUMP_CB_TRIP_FAULT,this.hb_P1_STARTUP_FAULT,this.hb_P1_ESTOP_FAULT ]
        var alarm2: any [] = [this.hb_P2_NO_FLOW_FAULT,this.hb_P2_PUMP_CB_TRIP_FAULT,this.hb_P2_STARTUP_FAULT,this.hb_P2_ESTOP_FAULT ]
        var alarm3: any [] = [this.hb_P3_NO_FLOW_FAULT,this.hb_P3_PUMP_CB_TRIP_FAULT,this.hb_P3_STARTUP_FAULT,this.hb_P3_ESTOP_FAULT ]


        this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
        this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
        this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
      }

        this.comms = Common.getLastUpdate(this.hb_PS_UT)
    },60000 )









  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
