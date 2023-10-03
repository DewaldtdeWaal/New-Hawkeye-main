import {  Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ListeningService } from 'src/app/listening.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import {vanStadensComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service'
import { Subscription } from 'rxjs';
import { Common } from 'src/app/class/common';
export interface PeriodicElement {
  alarm: string;
  description: string;
}




@Component({
  selector: 'app-van-stadens-ps',
  templateUrl: './van-stadens-ps.component.html',
  styleUrls: ['./van-stadens-ps.component.css']
})
export class VanStadensPSComponent implements OnInit {
faults = true ;
intervalLoop: any

  vs_PS_UT:any
  vs_G_WATER_D:any


  vs_STATUS_P1:any
  vs_MODE_P1:any
  vs_RH_P1 :any
  vs_SUC_PRESS_P1 :any
  vs_DEL_PRESS_P1 :any

  vs_LDP_P1 :any



  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;


  vs_STATUS_P2:any
  vs_MODE_P2:any
  vs_SUC_PRESS_P2 :any
  vs_DEL_PRESS_P2 :any
  vs_RH_P2 :any

  vs_LDP_P2 :any




  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_G: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any  = new MatTableDataSource(this.ELEMENT_DATA_P1);
  dataSourceP2:any = new MatTableDataSource(this.ELEMENT_DATA_P2);
  dataSourceG:any  = new MatTableDataSource(this.ELEMENT_DATA_G);


 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatSort) sort2: MatSort;

theme:any;
  comms: string;
  data: any=[];

  vs_LSP_P1 :any= {
    value: null,
  alarm:"Fault",
  description:"Low Suction Pressure",
    alarmTrip: 1
  };
  vs_HDP_P1 :any= {
    value: null,
  alarm:"Fault",
  description:"High Delivery Pressure",
    alarmTrip: 1
  };
  vs_STARTER_FAULT_P1 :any= {
    value: null,
  alarm:"Fault",
  description:"Soft Starter",
    alarmTrip: 1
  };
  vs_STARTUP_FAULT_P1 :any= {
    value: null,
  alarm:"Fault",
  description:"Startup",
    alarmTrip: 1
  };

  vs_LSP_P2 :any= {
    value: null,
  alarm:"Fault",
  description:"Low Suction Pressure",
    alarmTrip: 1
  };
  vs_HDP_P2 :any= {
    value: null,
  alarm:"Fault",
  description:"High Delivery Pressure",
    alarmTrip: 1
  };
  vs_STARTER_FAULT_P2 :any= {
    value: null,
  alarm:"Fault",
  description:"Soft Starter",
    alarmTrip: 1
  };
  vs_STARTUP_FAULT_P2 :any= {
    value: null,
  alarm:"Fault",
  description:"Startup",
    alarmTrip: 1
  };

  vs_G_COMMS:any = {
    value: null,
  alarm:"Fault",
  description:"Comms Failure",
    alarmTrip: 1
  };
  vs_G_PUMPS_F:any = {
    value: null,
  alarm:"Fault",
  description:"Pump Flood",
    alarmTrip: 1
  };
  constructor(private authService:AuthService, private webSocketService: WebSocketService,public ls: ListeningService, public us:UsersService,private chat:vanStadensComponent ,private userService: UsersService,public recieve:Common ) {
    this.chat.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.vs_PS_UT = this.data.routingArray[0].vs_PS_UT
       this.comms = Common.getLastUpdate(this.vs_PS_UT)
       this.vs_G_WATER_D = this.data.routingArray[0].vs_G_WATER_D
       this.vs_STATUS_P1 = this.data.routingArray[0].vs_P1_STATUS
       this.vs_MODE_P1 = this.data.routingArray[0].vs_P1_MODE
       this.vs_RH_P1  = this.data.routingArray[0].vs_P1_RH
       this.vs_SUC_PRESS_P1 =this.data.routingArray[0].vs_P1_SUC_PRESS
       this.vs_DEL_PRESS_P1 =this.data.routingArray[0].vs_P1_DEL_PRESS
       this.vs_LDP_P1 =this.data.routingArray[0].vs_P1_LDP
       this.vs_STATUS_P2=this.data.routingArray[0].vs_P2_STATUS
       this.vs_MODE_P2=this.data.routingArray[0].vs_P2_MODE
       this.vs_SUC_PRESS_P2 =this.data.routingArray[0].vs_P2_SUC_PRESS
       this.vs_DEL_PRESS_P2 =this.data.routingArray[0].vs_P2_DEL_PRESS
       this.vs_RH_P2 =this.data.routingArray[0].vs_P2_RH
       this.vs_LDP_P2 =this.data.routingArray[0].vs_P2_LDP
       this.vs_LSP_P1.value =this.data.routingArray[0].vs_P1_LSP
       this.vs_HDP_P1.value =this.data.routingArray[0].vs_P1_HDP
       this.vs_STARTER_FAULT_P1.value =this.data.routingArray[0].vs_P1_STARTER_FAULT
       this.vs_STARTUP_FAULT_P1.value =this.data.routingArray[0].vs_P1_STARTUP_FAULT
       this.vs_LSP_P2.value =this.data.routingArray[0].vs_P2_LSP
      this.vs_HDP_P2.value =this.data.routingArray[0].vs_P2_HDP
    this.vs_STARTER_FAULT_P2.value =this.data.routingArray[0].vs_P2_STARTER_FAULT
      this.vs_STARTUP_FAULT_P2.value =this.data.routingArray[0].vs_P2_STARTUP_FAULT
       this.vs_G_PUMPS_F.value = this.data.routingArray[0].vs_G_PUMPS_F
       this.vs_G_COMMS.value = this.data.routingArray[0].vs_G_COMMS
    })
    this.theme = localStorage.getItem("theme");

    setTimeout(() => {
      var alarm1: any [] = [this.vs_LSP_P1,this.vs_HDP_P1,this.vs_STARTER_FAULT_P1,this.vs_STARTUP_FAULT_P1]
      var alarm2: any [] = [this.vs_LSP_P2,this.vs_HDP_P2,this.vs_STARTER_FAULT_P2,this.vs_STARTUP_FAULT_P2]
      var alarmG: any [] = [this.vs_G_PUMPS_F,this.vs_G_COMMS]
      this.dataSourceG= new MatTableDataSource(Common.getAlarmValue(alarmG))
      this.dataSourceP1= new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2= new MatTableDataSource(Common.getAlarmValue(alarm2))
    },1000)



  }

  ngOnInit() {


    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_VS_R":
          this.showNavigationButton = "true";
          break;
      }
    }

    var tagVals:any =[]
    var tagArr=[
      "vs_ps_ut",//0
      "vs_g_water_f",//1
      "vs_g_pumps_f",//2
      "vs_g_comms",//3
      "vs_p1_status",//4
      "vs_p1_mode",//5
      "vs_p1_rh",//6
      "vs_p1_suc_press",//7
      "vs_p1_del_press",//8
      "vs_p1_lsp",//9
      "vs_p1_ldp",//10
      "vs_p1_hdp",//11
      "vs_p1_starter_fault",//12
      "vs_p1_startup_fault",//13
      "vs_p2_status",//14
      "vs_p2_mode",//15
      "vs_p2_suc_press",//16
      "vs_p2_del_press",//17
      "vs_p2_rh",//18
      "vs_p2_lsp",//19
      "vs_p2_ldp",//20
      "vs_p2_hdp",//21
      "vs_p2_starter_fault",//22
      "vs_p2_startup_fault]",//23

    ]

    tagVals = this.recieve.recieveNMBMVals(tagArr);
    console.log(tagArr)
      var updateTemp:any;
      this.intervalLoop = setInterval(() =>{
        updateTemp = tagVals[0];
        if(updateTemp !==undefined){
          this.vs_PS_UT=tagVals[0]
          this.vs_G_WATER_D=tagVals[1]
          this.vs_G_PUMPS_F.value=tagVals[2]
          this.vs_G_COMMS.value=tagVals[3]
          this.vs_STATUS_P1=tagVals[4]
          this.vs_MODE_P1=tagVals[5]
          this.vs_RH_P1=tagVals[6]
          this.vs_SUC_PRESS_P1=tagVals[7]
          this.vs_DEL_PRESS_P1=tagVals[8]
          this.vs_LSP_P1.value=tagVals[9]
          this.vs_LDP_P1=tagVals[10]
          this.vs_HDP_P1.value=tagVals[11]
          this.vs_STARTER_FAULT_P1.value=tagVals[12]
          this.vs_STARTUP_FAULT_P1.value=tagVals[13]
          this.vs_STATUS_P2=tagVals[14]
          this.vs_MODE_P2=tagVals[15]
          this.vs_SUC_PRESS_P2=tagVals[16]
          this.vs_DEL_PRESS_P2=tagVals[17]
          this.vs_RH_P2=tagVals[18]
          this.vs_LSP_P2.value=tagVals[19]
          this.vs_LDP_P2=tagVals[20]
          this.vs_HDP_P2.value=tagVals[21]
          this.vs_STARTER_FAULT_P2.value=tagVals[22]
          this.vs_STARTUP_FAULT_P2.value=tagVals[23]
        }
        this.comms = Common.getLastUpdate(this.vs_PS_UT)

        var alarm1: any [] = [this.vs_LSP_P1,this.vs_HDP_P1,this.vs_STARTER_FAULT_P1,this.vs_STARTUP_FAULT_P1]
        var alarm2: any [] = [this.vs_LSP_P2,this.vs_HDP_P2,this.vs_STARTER_FAULT_P2,this.vs_STARTUP_FAULT_P2]
        var alarmG: any [] = [this.vs_G_PUMPS_F,this.vs_G_COMMS]

        this.dataSourceG= new MatTableDataSource(Common.getAlarmValue(alarmG))
        this.dataSourceP1= new MatTableDataSource(Common.getAlarmValue(alarm1))
        this.dataSourceP2= new MatTableDataSource(Common.getAlarmValue(alarm2))
   },60000 );
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
