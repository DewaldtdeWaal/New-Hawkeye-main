import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/Service-Files/users.service';
import {blueHorizonBayComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';

import {Common} from 'src/app/class/common'

export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-blue-horizon-bay-ps',
  templateUrl: './blue-horizon-bay-ps.component.html',
  styleUrls: ['./blue-horizon-bay-ps.component.css']
})
export class BlueHorizonBayPSComponent implements OnInit {
  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;



  bhb_PS_UT:any
  bhb_G_TELE_CONTROL:any
  bhb_G_LOW_LVL_FLOAT:any

  bhb_P1_RH:any
  bhb_P1_MODE: any




  bhb_P2_RH:any
  bhb_P2_MODE: any
  bhb_P2_STATUS: any




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
  intervalLoop: any



  bhb_P1_STATUS: any;

  bhb_P1_STARTUP_FAULT: any= {
    value: null,
    alarm:"Fault",
    description:"Startup Fault",
    alarmTrip: 1
 };

  bhb_P1_SOFT_S_FAULT: any= {
    value: null,
    alarm:"Fault",
    description:"Soft Start Fault",
    alarmTrip: 1
 };
  bhb_P1_NO_FLOW: any= {
    value: null,
    alarm:"Fault",
    description:"No Flow Fault",
    alarmTrip: 1
 };


  bhb_P2_SOFT_S_FAULT: any= {
    value: null,
    alarm:"Fault",
    description:"Soft Start Fault",
    alarmTrip: 1
 };
  bhb_P2_STARTUP_FAULT: any= {
    value: null,
    alarm:"Fault",
    description:"Startup Fault",
    alarmTrip: 1
 };
  bhb_P2_NO_FLOW: any= {
    value: null,
    alarm:"Fault",
    description:"No Flow Fault",
    alarmTrip: 1
 };


  constructor( private webSocketService: WebSocketService, private us: UsersService, private buff:blueHorizonBayComponent ,private userService: UsersService,private authService: AuthService,public recieve:Common  ) {
    this.buff.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;

      this.bhb_PS_UT=this.data.routingArray[0].bhb_PS_UT
      this.comms = Common.getLastUpdate(this.bhb_PS_UT)
      this.bhb_G_TELE_CONTROL=this.data.routingArray[0].bhb_G_TELE_CONTROL
      this.bhb_G_LOW_LVL_FLOAT = this.data.routingArray[0].bhb_G_LOW_LVL_FLOAT
      this.bhb_P1_RH = this.data.routingArray[0].bhb_P1_RH
      this.bhb_P1_MODE = this.data.routingArray[0].bhb_P1_MODE
      this.bhb_P1_STATUS = this.data.routingArray[0].bhb_P1_STATUS
      this.bhb_P1_SOFT_S_FAULT.value = this.data.routingArray[0].bhb_P1_SOFT_S_FAULT
      this.bhb_P1_STARTUP_FAULT.value = this.data.routingArray[0].bhb_P1_STARTUP_FAULT
      this.bhb_P1_NO_FLOW.value = this.data.routingArray[0].bhb_P1_NO_FLOW
      this.bhb_P2_RH = this.data.routingArray[0].bhb_P2_RH
      this.bhb_P2_MODE = this.data.routingArray[0].bhb_P2_MODE
      this.bhb_P2_STATUS = this.data.routingArray[0].bhb_P2_STATUS
      this.bhb_P2_SOFT_S_FAULT.value = this.data.routingArray[0].bhb_P2_SOFT_S_FAULT
      this.bhb_P2_STARTUP_FAULT.value = this.data.routingArray[0].bhb_P2_STARTUP_FAULT
      this.bhb_P2_NO_FLOW.value = this.data.routingArray[0].bhb_P2_NO_FLOW
    });

    this.theme = localStorage.getItem("theme");



    setTimeout(() => {

      var alarm1: any [] = [this.bhb_P1_SOFT_S_FAULT,this.bhb_P1_STARTUP_FAULT,this.bhb_P1_NO_FLOW]
      var alarm2: any [] = [this.bhb_P2_SOFT_S_FAULT,this.bhb_P2_STARTUP_FAULT,this.bhb_P2_NO_FLOW]

      this.theme = localStorage.getItem("theme");


      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))



    },1000)






    this.dataSourceG = new MatTableDataSource(this.ELEMENT_DATA_G);}



    recieveVals(tagArr: any[]){
      var tagVals:any = []
      for(let i = 0; i<tagArr.length ;i++){
        this.webSocketService.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
          tagVals[i] = data[tagArr[i]];
        })
      }
      return tagVals
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
        case "NMB_BHB_R":
          this.showNavigationButton = "true";
          break;
      }
    }


    var tagVals:any =[]
    var tagArr=[
      "bhb_ps_ut",//0
      "bhb_g_tele_control",//1
      "bhb_g_low_lvl_float",//2
      "bhb_p1_rh",//3
      "bhb_p1_mode",//4
      "bhb_p1_status",//5
      "bhb_p1_startup_fault",//6
      "bhb_p1_soft_s_fault",//7
      "bhb_p1_no_flow",//8
      "bhb_p2_rh",//9
      "bhb_p2_mode",//10
      "bhb_p2_status",//11
      "bhb_p2_startup_fault",//12
      "bhb_p2_soft_s_fault",//13
      "bhb_p2_no_flow",//14




    ]
    tagVals = this.recieve.recieveNMBMVals(tagArr);
  console.log(tagArr)
    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !==undefined){
        this.bhb_PS_UT=tagVals[0]

        this.bhb_G_TELE_CONTROL=tagVals[1]
        this.bhb_G_LOW_LVL_FLOAT=tagVals[2]
        this.bhb_P1_RH=tagVals[3]
        this.bhb_P1_MODE=tagVals[4]
        this.bhb_P1_STATUS=tagVals[5]
        this.bhb_P1_SOFT_S_FAULT.value=tagVals[6]
        this.bhb_P1_STARTUP_FAULT.value=tagVals[7]
        this.bhb_P1_NO_FLOW.value=tagVals[8]
        this.bhb_P2_RH=tagVals[9]
        this.bhb_P2_MODE=tagVals[10]
        this.bhb_P2_STATUS=tagVals[11]
        this.bhb_P2_SOFT_S_FAULT.value=tagVals[12]
        this.bhb_P2_STARTUP_FAULT.value=tagVals[13]
        this.bhb_P2_NO_FLOW.value=tagVals[14]
      }


      this.comms = Common.getLastUpdate(this.bhb_PS_UT)

      var alarm1: any [] = [this.bhb_P1_SOFT_S_FAULT,this.bhb_P1_STARTUP_FAULT,this.bhb_P1_NO_FLOW]
      var alarm2: any [] = [this.bhb_P2_SOFT_S_FAULT,this.bhb_P2_STARTUP_FAULT,this.bhb_P2_NO_FLOW]



      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))







 },60000 )






  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
