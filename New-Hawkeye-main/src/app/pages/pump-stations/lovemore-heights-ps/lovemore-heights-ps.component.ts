import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import {LovemoreHeightsService} from 'src/app/Service-Files/Reservoir/lovemoreheigths.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Common } from 'src/app/class/common';
export interface PeriodicElement {
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-lovemore-heights-ps',
  templateUrl: './lovemore-heights-ps.component.html',
  styleUrls: ['./lovemore-heights-ps.component.css']
})
export class LovemoreHeightsPSComponent implements OnInit {

  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;

  variable :any= {
    lh_UT:null,
  lh_P1_RH:null,
  lh_P1_MODE: null,
  lh_P1_STATUS: null,
  lh_P2_RH:null,
  lh_P2_MODE: null,
  lh_P2_STATUS: null,
  }
  intervalLoop: any
  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_G: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];
  dataSourceP1:any;
  dataSourceP2:any;
  dataSourceG:any;
  theme:any
  comms: string;
  data: any=[];

  faultVariable:any={
  lh_P1_SOFT_S_FAULT:  {
    value: null,
  alarm:"Fault",
  description:"SOFT STARTER",
    alarmTrip: 1
  },
  lh_P1_ESTOP_FAULT:  {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  lh_P1_NO_FLOW_FAULT: {
    value: null,
  alarm:"Fault",
  description:"NO FLOW",
    alarmTrip: 1
  },
  lh_P2_SOFT_S_FAULT: {
    value: null,
  alarm:"Fault",
  description:"SOFT STARTER",
    alarmTrip: 1
  },
  lh_P2_ESTOP_FAULT: {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  lh_P2_NO_FLOW_FAULT:  {
    value: null,
  alarm:"Fault",
  description:"NO FLOW",
    alarmTrip: 1
  }
}
   tagArr:any=[
    "lh_UT",//0
    "lh_P1_RH",//1
    "lh_P1_MODE",//2
    "lh_P1_STATUS",//3

    "lh_P2_RH",//7
    "lh_P2_MODE",//8
    "lh_P2_STATUS",//9

  ]
  faultArr:any=[
    "lh_P2_ESTOP_FAULT",//10
    "lh_P2_SOFT_S_FAULT",//11
    "lh_P2_NO_FLOW_FAULT",//12
    "lh_P1_ESTOP_FAULT",//4
    "lh_P1_SOFT_S_FAULT",//5
    "lh_P1_NO_FLOW_FAULT",//6
  ]

  constructor( private webSocketService: WebSocketService,private us: UsersService,private chat:LovemoreHeightsService,private userService: UsersService,private authService: AuthService, public recieve:Common ) {
    this.chat.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       console.log(this.data);
       this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)
       this.faultVariable =   Common.getFaultRouteData(this.faultArr,this.faultVariable,this.data.routingArray)
       this.comms = Common.getLastUpdate(this.variable.lh_UT)

    })
    this.theme = localStorage.getItem("theme");
    setTimeout(() => {

      var alarm1: any [] = [this.faultVariable.lh_P1_SOFT_S_FAULT,this.faultVariable.lh_P1_ESTOP_FAULT,this.faultVariable.lh_P1_NO_FLOW_FAULT ]
      var alarm2: any [] = [this.faultVariable.lh_P2_SOFT_S_FAULT,this.faultVariable.lh_P2_ESTOP_FAULT,this.faultVariable.lh_P2_NO_FLOW_FAULT ]

      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))

    },1000)
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
        case "NMB_LH_R":
          this.showNavigationButton = "true";
          break;
      }
    }



    var tagVals:any =[]
    var errorVals:any=[]
    tagVals = this.recieve.recieveNMBMVals(this.tagArr);
    errorVals = this.recieve.recieveNMBMVals(this.faultArr)
      var updateTemp:any;
      this.intervalLoop = setInterval(() =>{
        updateTemp = tagVals[0];
        if(updateTemp !==undefined){
          this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);
          this.comms = Common.getLastUpdate(this.variable.mw_g_ut)

          Common.setFaultValues(errorVals,this.faultVariable,this.faultArr);

        }
        this.comms = Common.getLastUpdate(this.variable.lh_UT)


        var alarm1: any [] = [this.faultVariable.lh_P1_SOFT_S_FAULT,this.faultVariable.lh_P1_ESTOP_FAULT,this.faultVariable.lh_P1_NO_FLOW_FAULT ]
        var alarm2: any [] = [this.faultVariable.lh_P2_SOFT_S_FAULT,this.faultVariable.lh_P2_ESTOP_FAULT,this.faultVariable.lh_P2_NO_FLOW_FAULT ]


      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
   },60000 );


  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
