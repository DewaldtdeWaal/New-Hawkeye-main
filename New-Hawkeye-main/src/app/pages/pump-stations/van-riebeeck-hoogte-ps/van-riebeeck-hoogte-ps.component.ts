import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import {MatTableDataSource} from '@angular/material/table';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import {VanRiebeekHoogteService} from 'src/app/Service-Files/Reservoir/reservoir.service'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Common } from 'src/app/class/common';
export interface PeriodicElement {
  alarm: string;
  description: string;
}


@Component({
  selector: 'app-van-riebeeck-hoogte-ps',
  templateUrl: './van-riebeeck-hoogte-ps.component.html',
  styleUrls: ['./van-riebeeck-hoogte-ps.component.css']
})
export class VanRiebeeckHoogtePSComponent implements OnInit {


  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;


  intervalLoop: any


  variable :any= {
  vrh_ut:null,
  vrh_g_ps_mode:null,
  vrh_g_main_panel_surge:null,
  vrh_g_main_panel_voltage:null,
  vrh_p1_kw:null,
  vrh_p2_kw:null,
  vrh_p3_kw:null,
  vrh_p1_rpm:null,
  vrh_p2_rpm:null,
  vrh_p3_rpm:null,
  vrh_p1_rt:null,
  vrh_p2_rt:null,
  vrh_p3_rt:null,
  vrh_p1_a:null,
  vrh_p2_a:null,
  vrh_p3_a:null,
  vrh_p1_status:null,
  vrh_p1_mode:null,
  vrh_p1_power_on:null,
  vrh_p1_vsd_staus:null,
  vrh_p2_status:null,
  vrh_p2_mode:null,
  vrh_p2_power_on:null,
  vrh_p2_vsd_staus:null,
  vrh_p3_status:null,
  vrh_p3_mode:null,
  vrh_p3_power_on:null,
  vrh_p3_vsd_staus:null,
  }
  ELEMENT_DATA_P1: PeriodicElement[] = [];
  ELEMENT_DATA_P2: PeriodicElement[] = [];
  ELEMENT_DATA_P3: PeriodicElement[] = [];

  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceP1:any ;
  dataSourceP2:any ;
  dataSourceP3:any ;

theme:any;
  comms: any;
  data: any=[];

   tagArr:any=[
    'vrh_ut',
    'vrh_g_ps_mode',
    'vrh_g_main_panel_surge',
    'vrh_g_main_panel_voltage',
    'vrh_p1_kw',
    'vrh_p2_kw',
    'vrh_p3_kw',
    'vrh_p1_rpm',
    'vrh_p2_rpm',
    'vrh_p3_rpm',
    'vrh_p1_rt',
    'vrh_p2_rt',
    'vrh_p3_rt',
    'vrh_p1_a',
    'vrh_p2_a',
    'vrh_p3_a',
    'vrh_p1_status',
    'vrh_p1_mode',
    'vrh_p1_estop_fault',
    'vrh_p1_cb_pump_trip_fault',
    'vrh_p1_power_on',
    'vrh_p1_vsd_staus',
    'vrh_p2_status',
    'vrh_p2_mode',
    'vrh_p2_estop_fault',
    'vrh_p2_cb_pump_trip_fault',
    'vrh_p2_power_on',
    'vrh_p2_vsd_staus',
    'vrh_p3_status',
    'vrh_p3_mode',
    'vrh_p3_estop_fault',
    'vrh_p3_cb_pump_trip_fault',
    'vrh_p3_power_on',
    'vrh_p3_vsd_staus',
  ]
  faultVariable:any={
  vrh_p1_estop_fault: {
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  vrh_p1_cb_pump_trip_fault: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker",
    alarmTrip: 1
  },
  vrh_p2_estop_fault:{
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  vrh_p2_cb_pump_trip_fault: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker",
    alarmTrip: 1
  },
  vrh_p3_estop_fault:{
    value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
  },
  vrh_p3_cb_pump_trip_fault: {
    value: null,
  alarm:"Fault",
  description:"Circuit Breaker",
    alarmTrip: 1
  }
}
faultArr:any=[

"vrh_p1_estop_fault",
"vrh_p1_cb_pump_trip_fault",
"vrh_p2_estop_fault",
"vrh_p2_cb_pump_trip_fault",
"vrh_p3_estop_fault",
"vrh_p3_cb_pump_trip_fault"

]
  constructor(private ls:ListeningService, private ws: WebSocketService, private us:UsersService, private chat: VanRiebeekHoogteService,private userService: UsersService,private authService: AuthService,public recieve:Common ) {
    this.chat.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)
       this.faultVariable =   Common.getFaultRouteData(this.faultArr,this.faultVariable,this.data.routingArray)
       this.comms = Common.getLastUpdate(this.variable.vrh_ut)
    })
    this.theme = localStorage.getItem("theme");

    setTimeout(() => {
      var alarm1: any [] = [this.faultVariable.vrh_p1_estop_fault,this.faultVariable.vrh_p1_cb_pump_trip_fault]
      var alarm2: any [] = [this.faultVariable.vrh_p2_estop_fault,this.faultVariable.vrh_p2_cb_pump_trip_fault]
      var alarm3: any [] = [this.faultVariable.vrh_p3_estop_fault,this.faultVariable.vrh_p3_cb_pump_trip_fault]


      this.dataSourceP1= new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2= new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3= new MatTableDataSource(Common.getAlarmValue(alarm3))




    },1500)
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
        case "NMB_VRH_R":
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


          Common.setFaultValues(errorVals,this.faultVariable,this.faultArr);

        }
        this.comms = Common.getLastUpdate(this.variable.vrh_ut)
        console.log(this.comms)

        var alarm1: any [] = [this.faultVariable.vrh_p1_estop_fault,this.faultVariable.vrh_p1_cb_pump_trip_fault]
        var alarm2: any [] = [this.faultVariable.vrh_p2_estop_fault,this.faultVariable.vrh_p2_cb_pump_trip_fault]
        var alarm3: any [] = [this.faultVariable.vrh_p3_estop_fault,this.faultVariable.vrh_p3_cb_pump_trip_fault]

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
