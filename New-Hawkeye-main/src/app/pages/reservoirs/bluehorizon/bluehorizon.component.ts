import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {BlueHorizonBayService} from 'src/app/Service-Files/Reservoir/bluehorizonbay.service';
import { HttpClient } from '@angular/common/http';
import {BlueHorizonBayPSComponent} from 'src/app/pages/pump-stations/blue-horizon-bay-ps/blue-horizon-bay-ps.component';
import { UsersService } from 'src/app/Service-Files/users.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-bluehorizon',
  templateUrl: './bluehorizon.component.html',
  styleUrls: ['./bluehorizon.component.css']
})
//Can't be updated to new method
export class BluehorizonComponent implements OnInit {
  data:any=[]
  public authListenerSubs!: Subscription;
  userSites:string[];

bh_R_LVL:any
bh_R_START_FLOAT:any
bh_R_STOP_FLOAT:any
  bh_R_UT:any
  bh_R_DOOR:any
  bh_R_SURGE_ARRESTOR:any
  bh_R_CHARGER_STATUS:any
  res:any
comms:any;
  showNavigationButton: string;
  intervalLoop: any

  tagArr:any=[
    "bh_R_LVL",
    "bh_R_START_FLOAT",
    "bh_R_STOP_FLOAT",
    "bh_R_UT",
    "bh_R_DOOR",
    "bh_R_SURGE_ARRESTOR",
    "bh_R_CHARGER_STATUS",
        ]

        variable :any= {
          bh_R_LVL:null,
          bh_R_START_FLOAT:null,
          bh_R_STOP_FLOAT:null,
          bh_R_UT:null,
          bh_R_DOOR:null,
          bh_R_SURGE_ARRESTOR:null,
          bh_R_CHARGER_STATUS:null,


        }

  constructor( private webSocketService: WebSocketService, private bhs: BlueHorizonBayService, private authService: AuthService,public recieve:Common,private pm:pagePostMethod ) {




    this.pm.findPageData("nmbm_bh_r", "R_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
           this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data)
          this.comms = Common.getLastUpdate(this.variable.bh_R_UT)
    });
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
        case "NMB_BHB_PS":
          this.showNavigationButton = "true";
          break;
      }
    }

    this.pm.findPageData("nmbm_bh_r", "R_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
           this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data)
          this.comms = Common.getLastUpdate(this.variable.bh_R_UT)
    });


  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
