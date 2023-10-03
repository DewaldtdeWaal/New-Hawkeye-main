import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import {TheescombeService} from 'src/app/Service-Files/Reservoir/reservoir.service'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Common } from 'src/app/class/common';
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-theescombe-ps',
  templateUrl: './theescombe-ps.component.html',
  styleUrls: ['./theescombe-ps.component.css']
})
export class TheescombePSComponent implements OnInit {

  tc_PS_UT:any
  tc_G_SP:any

  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;
  intervalLoop: any

tc_P1_POWER:any
tc_P1_MODE:any
tc_P1_STATUS:any
tc_P1_RH:any
tc_P1_PRESS_DIFF:any


tc_P2_POWER:any
tc_P2_MODE:any
tc_P2_STATUS:any
tc_P2_RH:any
tc_P2_PRESS_DIFF:any


tc_P3_POWER:any
tc_P3_MODE:any
tc_P3_STATUS:any
tc_P3_RH:any
tc_P3_PRESS_DIFF:any



  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];
  ELEMENT_DATA_G: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceP3:any;

  theme:any;
  comms: string;
  data: any=[];


  tc_P1_PUMP_TRIP_FAULT:any= {
    value: null,
  alarm:"Fault",
  description:"Pump Trip",
    alarmTrip: 1
  };
tc_P1_ESTOP_FAULT:any= {
  value: null,
alarm:"Fault",
description:"Emergency Stop",
  alarmTrip: 1
};
tc_P1_NO_FLOW_FAULT:any= {
  value: null,
alarm:"Fault",
description:"No Flow",
  alarmTrip: 1
};
tc_P1_EARTH_FAULT:any= {
  value: null,
alarm:"Fault",
description:"Earth Fault",
  alarmTrip: 1
};

tc_P2_PUMP_TRIP_FAULT:any= {
  value: null,
alarm:"Fault",
description:"Pump Trip",
  alarmTrip: 1
};
tc_P2_ESTOP_FAULT:any= {
value: null,
alarm:"Fault",
description:"Emergency Stop",
alarmTrip: 1
};
tc_P2_NO_FLOW_FAULT:any= {
value: null,
alarm:"Fault",
description:"No Flow",
alarmTrip: 1
};
tc_P2_EARTH_FAULT:any= {
value: null,
alarm:"Fault",
description:"Earth Fault",
alarmTrip: 1
};

tc_P3_PUMP_TRIP_FAULT:any= {
  value: null,
alarm:"Fault",
description:"Pump Trip",
  alarmTrip: 1
};
tc_P3_ESTOP_FAULT:any= {
value: null,
alarm:"Fault",
description:"Emergency Stop",
alarmTrip: 1
};
tc_P3_NO_FLOW_FAULT:any= {
value: null,
alarm:"Fault",
description:"No Flow",
alarmTrip: 1
};
tc_P3_EARTH_FAULT:any= {
value: null,
alarm:"Fault",
description:"Earth Fault",
alarmTrip: 1
};
  constructor(private webSocketService: WebSocketService, private us:UsersService, private chat: TheescombeService ,private userService: UsersService,private authService: AuthService,public recieve:Common ) {
    this.chat.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.tc_PS_UT = this.data.routingArray[0].tc_R_UT
       this.comms = Common.getLastUpdate(this.tc_PS_UT)
       this.tc_G_SP = this.data.routingArray[0].tc_G_SP
       this.tc_P1_POWER = this.data.routingArray[0].tc_P1_POWER
       this.tc_P1_MODE = this.data.routingArray[0].tc_P1_MODE
       this.tc_P1_STATUS = this.data.routingArray[0].tc_P1_STATUS
       this.tc_P1_RH = this.data.routingArray[0].tc_P1_RH
       this.tc_P1_PRESS_DIFF = this.data.routingArray[0].tc_P1_PRESS_DIFF

       this.tc_P2_POWER = this.data.routingArray[0].tc_P2_POWER
       this.tc_P2_MODE = this.data.routingArray[0].tc_P2_MODE
       this.tc_P2_STATUS = this.data.routingArray[0].tc_P2_STATUS
       this.tc_P2_RH = this.data.routingArray[0].tc_P2_RH
       this.tc_P2_PRESS_DIFF = this.data.routingArray[0].tc_P2_PRESS_DIFF

       this.tc_P3_POWER = this.data.routingArray[0].tc_P3_POWER
       this.tc_P3_MODE = this.data.routingArray[0].tc_P3_MODE
       this.tc_P3_STATUS = this.data.routingArray[0].tc_P3_STATUS
       this.tc_P3_RH = this.data.routingArray[0].tc_P3_RH
       this.tc_P3_PRESS_DIFF = this.data.routingArray[0].tc_P3_PRESS_DIFF


       this.tc_P1_PUMP_TRIP_FAULT.value = this.data.routingArray[0].tc_P1_PUMP_TRIP_FAULT
       this.tc_P1_ESTOP_FAULT.value = this.data.routingArray[0].tc_P1_ESTOP_FAULT
       this.tc_P1_NO_FLOW_FAULT.value = this.data.routingArray[0].tc_P1_NO_FLOW_FAULT
       this.tc_P1_EARTH_FAULT.value = this.data.routingArray[0].tc_P1_EARTH_FAULT

       this.tc_P2_PUMP_TRIP_FAULT.value = this.data.routingArray[0].tc_P2_PUMP_TRIP_FAULT
       this.tc_P2_ESTOP_FAULT.value = this.data.routingArray[0].tc_P2_ESTOP_FAULT
       this.tc_P2_NO_FLOW_FAULT.value = this.data.routingArray[0].tc_P2_NO_FLOW_FAULT
       this.tc_P2_EARTH_FAULT.value = this.data.routingArray[0].tc_P2_EARTH_FAULT

       this.tc_P3_PUMP_TRIP_FAULT.value = this.data.routingArray[0].tc_P3_PUMP_TRIP_FAULT
       this.tc_P3_ESTOP_FAULT.value = this.data.routingArray[0].tc_P3_ESTOP_FAULT
       this.tc_P3_NO_FLOW_FAULT.value = this.data.routingArray[0].tc_P3_NO_FLOW_FAULT
       this.tc_P3_EARTH_FAULT.value = this.data.routingArray[0].tc_P3_EARTH_FAULT

    })
    this.theme = localStorage.getItem("theme");
    setTimeout(() => {



      var alarm1: any [] = [this.tc_P1_PUMP_TRIP_FAULT,this.tc_P1_ESTOP_FAULT,this.tc_P1_NO_FLOW_FAULT,this.tc_P1_EARTH_FAULT]
      var alarm2: any [] =[this.tc_P2_PUMP_TRIP_FAULT,this.tc_P2_ESTOP_FAULT,this.tc_P2_NO_FLOW_FAULT,this.tc_P2_EARTH_FAULT]
      var alarm3: any [] =[this.tc_P3_PUMP_TRIP_FAULT,this.tc_P3_ESTOP_FAULT,this.tc_P3_NO_FLOW_FAULT,this.tc_P3_EARTH_FAULT]

      this.dataSourceP1= new MatTableDataSource(Common.getAlarmValue(alarm1))

      this.dataSourceP2= new MatTableDataSource(Common.getAlarmValue(alarm2))

      this.dataSourceP3= new MatTableDataSource(Common.getAlarmValue(alarm3))








    },1000)



    this.dataSourceP1 = new MatTableDataSource(this.ELEMENT_DATA_P1);
  this.dataSourceP2 = new MatTableDataSource(this.ELEMENT_DATA_P2);
  this.dataSourceP3 = new MatTableDataSource(this.ELEMENT_DATA_P3);

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
        case "NMB_TC_R":
          this.showNavigationButton = "true";
          break;
      }
    }



    var tagVals:any =[]
    var tagArr=[
      "tc_ps_ut",//0
      "tc_g_sp",//1
      "tc_p1_power",//2
      "tc_p1_mode",//3
      "tc_p1_status",//4
      "tc_p1_rh",//5
      "tc_p1_press_diff",//6
      "tc_p1_pump_trip_fault",//7
      "tc_p1_estop_fault",//8
      "tc_p1_no_flow_fault",//9
      "tc_p1_earth_fault",//10
      "tc_p2_power",//11
      "tc_p2_mode",//12
      "tc_p2_status",//13
      "tc_p2_rh",//14
      "tc_p2_press_diff",//15
      "tc_p2_pump_trip_fault",//16
      "tc_p2_estop_fault",//17
      "tc_p2_no_flow_fault",//18
      "tc_p2_earth_fault",//19
      "tc_p3_power",//20
      "tc_p3_mode",//21
      "tc_p3_status",//22
      "tc_p3_rh",//23
      "tc_p3_press_diff",//24
      "tc_p3_pump_trip_fault",//25
      "tc_p3_estop_fault",//26
      "tc_p3_no_flow_fault",//27
      "tc_p3_earth_fault",//28
    ]
    tagVals = this.recieve.recieveNMBMVals(tagArr);
    console.log(tagArr)
      var updateTemp:any;
       this.intervalLoop = setInterval(() =>{
        updateTemp = tagVals[0];
        if(updateTemp !==undefined){
          this.tc_PS_UT= tagVals[0]

          this.tc_G_SP= tagVals[1]
          this.tc_P1_POWER= tagVals[2]
          this.tc_P1_MODE= tagVals[3]
          this.tc_P1_STATUS= tagVals[4]
          this.tc_P1_RH= tagVals[5]
          this.tc_P1_PRESS_DIFF= tagVals[6]
          this.tc_P1_PUMP_TRIP_FAULT.value= tagVals[7]
          this.tc_P1_ESTOP_FAULT.value= tagVals[8]
          this.tc_P1_NO_FLOW_FAULT.value= tagVals[9]
          this.tc_P1_EARTH_FAULT.value = tagVals[10]
          this.tc_P2_POWER = tagVals[11]
          this.tc_P2_MODE = tagVals[12]
          this.tc_P2_STATUS = tagVals[13]
          this.tc_P2_RH = tagVals[14]
          this.tc_P2_PRESS_DIFF = tagVals[15]
          this.tc_P2_PUMP_TRIP_FAULT.value = tagVals[16]
          this.tc_P2_ESTOP_FAULT.value = tagVals[17]
          this.tc_P2_NO_FLOW_FAULT.value = tagVals[18]
          this.tc_P2_EARTH_FAULT.value = tagVals[19]
          this.tc_P3_POWER  = tagVals[20]
          this.tc_P3_MODE = tagVals[21]
          this.tc_P3_STATUS = tagVals[22]
          this.tc_P3_RH = tagVals[23]
          this.tc_P3_PRESS_DIFF = tagVals[24]
          this.tc_P3_PUMP_TRIP_FAULT.value = tagVals[25]
          this.tc_P3_ESTOP_FAULT.value = tagVals[26]
          this.tc_P3_NO_FLOW_FAULT.value = tagVals[27]
          this.tc_P3_EARTH_FAULT.value = tagVals[28]
        }

        this.comms = Common.getLastUpdate(this.tc_PS_UT)
      var alarm1: any [] = [this.tc_P1_PUMP_TRIP_FAULT,this.tc_P1_ESTOP_FAULT,this.tc_P1_NO_FLOW_FAULT,this.tc_P1_EARTH_FAULT]
      var alarm2: any [] =[this.tc_P2_PUMP_TRIP_FAULT,this.tc_P2_ESTOP_FAULT,this.tc_P2_NO_FLOW_FAULT,this.tc_P2_EARTH_FAULT]
      var alarm3: any [] =[this.tc_P3_PUMP_TRIP_FAULT,this.tc_P3_ESTOP_FAULT,this.tc_P3_NO_FLOW_FAULT,this.tc_P3_EARTH_FAULT]

      this.dataSourceP1= new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2= new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3= new MatTableDataSource(Common.getAlarmValue(alarm3))




  },60000 )



  }



  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
