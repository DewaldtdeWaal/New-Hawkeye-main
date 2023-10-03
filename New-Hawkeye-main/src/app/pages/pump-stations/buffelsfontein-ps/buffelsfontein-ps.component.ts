import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import {BuffelsFonteinComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service'
import {Common} from 'src/app/class/common';
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-buffelsfontein-ps',
  templateUrl: './buffelsfontein-ps.component.html',
  styleUrls: ['./buffelsfontein-ps.component.css']
})
export class BuffelsfonteinPSComponent implements OnInit {
  bf_PS_UT:any
  bf_G_SP:any
  bf_G_FR:any

  bf_P1_MODE:any
  bf_P1_STATUS:any
  bf_P1_RH:any


  bf_P2_MODE:any
  bf_P2_STATUS:any
  bf_P2_RH:any


  bf_P3_MODE:any
  bf_P3_STATUS:any
  bf_P3_RH:any


  bf_P4_MODE:any
  bf_P4_STATUS:any
  bf_P4_RH:any


  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];
  ELEMENT_DATA_P4: PeriodicElement[] = [];
  ELEMENT_DATA_G: PeriodicElement[] = [];

  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceP3:any;
  dataSourceP4:any;
  dataSourceG:any;
theme:any;
  comms: string;
  data: any=[];
  intervalLoop: any



  bf_G_MCC_ESTOP:any = {
    value: null,
  alarm:"Fault",
  description:"MCC Emergency Stop",
    alarmTrip: 1
  };

  bf_P1_PUMP_TRIP_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  };
  bf_P1_ESTOP_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 0,
  };
  bf_P1_NO_FLOW_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  };

  bf_P2_PUMP_TRIP_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  };
  bf_P2_ESTOP_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 0
  };
  bf_P2_NO_FLOW_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  };

  bf_P3_PUMP_TRIP_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  };
  bf_P3_ESTOP_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 0
  };
  bf_P3_NO_FLOW_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  };

  bf_P4_PUMP_TRIP_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  };
  bf_P4_ESTOP_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 0
  };
  bf_P4_NO_FLOW_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"No Flow",
    alarmTrip: 1
  };


  constructor(private webSocketService: WebSocketService, private us: UsersService,private chat:BuffelsFonteinComponent,public recieve:Common ) {
    this.chat.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.bf_PS_UT = this.data.routingArray[0].bf_PS_UT
       this.comms = Common.getLastUpdate(this.bf_PS_UT)
       this.bf_G_SP = this.data.routingArray[0].bf_G_SP
       this.bf_G_FR = this.data.routingArray[0].bf_G_FR
       this.bf_P1_MODE = this.data.routingArray[0].bf_P1_MODE
       this.bf_P1_STATUS = this.data.routingArray[0].bf_P1_STATUS
       this.bf_P1_RH = this.data.routingArray[0].bf_P1_RH
       this.bf_P2_MODE = this.data.routingArray[0].bf_P2_MODE
       this.bf_P2_STATUS = this.data.routingArray[0].bf_P2_STATUS
       this.bf_P2_RH = this.data.routingArray[0].bf_P2_RH
       this.bf_P3_MODE = this.data.routingArray[0].bf_P3_MODE
       this.bf_P3_STATUS = this.data.routingArray[0].bf_P3_STATUS
       this.bf_P3_RH = this.data.routingArray[0].bf_P3_RH
       this.bf_P4_MODE = this.data.routingArray[0].bf_P4_MODE
       this.bf_P4_STATUS = this.data.routingArray[0].bf_P4_STATUS
       this.bf_P4_RH = this.data.routingArray[0].bf_P4_RH
       this.bf_G_MCC_ESTOP.value = this.data.routingArray[0].bf_G_MCC_ESTOP
       this.bf_P1_PUMP_TRIP_FAULT.value = this.data.routingArray[0].bf_P1_PUMP_TRIP_FAULT
       this.bf_P1_ESTOP_FAULT.value = this.data.routingArray[0].bf_P1_ESTOP_FAULT
       this.bf_P1_NO_FLOW_FAULT.value = this.data.routingArray[0].bf_P1_NO_FLOW_FAULT
       this.bf_P2_PUMP_TRIP_FAULT.value = this.data.routingArray[0].bf_P2_PUMP_TRIP_FAULT
       this.bf_P2_ESTOP_FAULT.value = this.data.routingArray[0].bf_P2_ESTOP_FAULT
       this.bf_P2_NO_FLOW_FAULT.value = this.data.routingArray[0].bf_P2_NO_FLOW_FAULT
       this.bf_P3_PUMP_TRIP_FAULT.value = this.data.routingArray[0].bf_P3_PUMP_TRIP_FAULT
       this.bf_P3_ESTOP_FAULT.value = this.data.routingArray[0].bf_P3_ESTOP_FAULT
       this.bf_P3_NO_FLOW_FAULT.value = this.data.routingArray[0].bf_P3_NO_FLOW_FAULT
       this.bf_P4_PUMP_TRIP_FAULT.value = this.data.routingArray[0].bf_P4_PUMP_TRIP_FAULT
       this.bf_P4_ESTOP_FAULT.value = this.data.routingArray[0].bf_P4_ESTOP_FAULT
       this.bf_P4_NO_FLOW_FAULT.value = this.data.routingArray[0].bf_P4_NO_FLOW_FAULT

    })
    this.theme = localStorage.getItem("theme")

    setTimeout(() => {

      var alarmG: any [] = [this.bf_G_MCC_ESTOP]
      var alarm1: any [] = [this.bf_P1_PUMP_TRIP_FAULT,this.bf_P1_ESTOP_FAULT,this.bf_P1_NO_FLOW_FAULT]
      var alarm2: any [] = [this.bf_P2_PUMP_TRIP_FAULT,this.bf_P2_ESTOP_FAULT,this.bf_P2_NO_FLOW_FAULT]
      var alarm3: any [] = [this.bf_P3_PUMP_TRIP_FAULT,this.bf_P3_ESTOP_FAULT,this.bf_P3_NO_FLOW_FAULT]
      var alarm4: any [] = [this.bf_P4_PUMP_TRIP_FAULT,this.bf_P4_ESTOP_FAULT,this.bf_P4_NO_FLOW_FAULT]

      this.dataSourceG = new MatTableDataSource(Common.getAlarmValue(alarmG))
      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
      this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))
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



    var tagVals:any =[]
    var tagArr=[
      "bf_ps_ut",//0
      "bf_g_sp",//1
      "bf_g_fr",//2
      "bf_g_mcc_estop",//3
      "bf_p1_mode",//4
      "bf_p1_status",//5
      "bf_p1_rh",//6
      "bf_p1_pump_trip_fault",//7
      "bf_p1_estop_fault",//8
      "bf_p1_no_flow_fault",//9
      "bf_p2_mode",//10
      "bf_p2_status",//11
      "bf_p2_rh",//12
      "bf_p2_pump_trip_fault",//13
      "bf_p2_estop_fault",//14
      "bf_p2_no_flow_fault",//15
      "bf_p3_mode",//16
      "bf_p3_status",//17
      "bf_p3_rh",//18
      "bf_p3_pump_trip_fault",//19
      "bf_p3_estop_fault",//20
      "bf_p3_no_flow_fault",//21
      "bf_p4_mode",//22
      "bf_p4_status",//23
      "bf_p4_rh",//24
      "bf_p4_pump_trip_fault",//25
      "bf_p4_estop_fault",//26
      "bf_p4_no_flow_fault",//27




    ]
    tagVals = this.recieve.recieveNMBMVals(tagArr);
  console.log(tagArr)
    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !==undefined){
        this.bf_PS_UT=tagVals[0]

        this.bf_G_SP=tagVals[1]
        this.bf_G_FR=tagVals[2]
        this.bf_P1_MODE=tagVals[4]
        this.bf_P1_STATUS=tagVals[5]
        this.bf_P1_RH=tagVals[6]
        this.bf_P2_MODE=tagVals[10]
        this.bf_P2_STATUS=tagVals[11]
        this.bf_P2_RH=tagVals[12]
        this.bf_P3_MODE=tagVals[16]
        this.bf_P3_STATUS=tagVals[17]
        this.bf_P3_RH=tagVals[18]
        this.bf_P4_MODE=tagVals[22]
        this.bf_P4_STATUS=tagVals[23]
        this.bf_P4_RH=tagVals[24]
        this.bf_G_MCC_ESTOP.value=tagVals[3]
        this.bf_P1_PUMP_TRIP_FAULT.value=tagVals[7]
        this.bf_P1_ESTOP_FAULT.value=tagVals[8]
        this.bf_P1_NO_FLOW_FAULT.value=tagVals[9]
        this.bf_P2_PUMP_TRIP_FAULT.value=tagVals[13]
        this.bf_P2_ESTOP_FAULT.value=tagVals[14]
        this.bf_P2_NO_FLOW_FAULT.value=tagVals[15]
        this.bf_P3_PUMP_TRIP_FAULT.value=tagVals[19]
        this.bf_P3_ESTOP_FAULT.value=tagVals[20]
        this.bf_P3_NO_FLOW_FAULT.value=tagVals[21]
        this.bf_P4_PUMP_TRIP_FAULT.value=tagVals[25]
        this.bf_P4_ESTOP_FAULT.value=tagVals[26]
        this.bf_P4_NO_FLOW_FAULT.value=tagVals[27]
      }

      this.comms = Common.getLastUpdate(this.bf_PS_UT)


      var alarmG: any [] = [this.bf_G_MCC_ESTOP]
      var alarm1: any [] = [this.bf_P1_PUMP_TRIP_FAULT,this.bf_P1_ESTOP_FAULT,this.bf_P1_NO_FLOW_FAULT]
      var alarm2: any [] = [this.bf_P2_PUMP_TRIP_FAULT,this.bf_P2_ESTOP_FAULT,this.bf_P2_NO_FLOW_FAULT]
      var alarm3: any [] = [this.bf_P3_PUMP_TRIP_FAULT,this.bf_P3_ESTOP_FAULT,this.bf_P3_NO_FLOW_FAULT]
      var alarm4: any [] = [this.bf_P4_PUMP_TRIP_FAULT,this.bf_P4_ESTOP_FAULT,this.bf_P4_NO_FLOW_FAULT]


      this.dataSourceG = new MatTableDataSource(Common.getAlarmValue(alarmG))
      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
      this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))

    },60000)
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
