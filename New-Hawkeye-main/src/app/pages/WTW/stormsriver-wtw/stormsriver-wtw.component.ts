import {  Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Injectable } from "@angular/core";
import {StormsriverComponent} from 'src/app/Service-Files/WTW/stormsrivier.service';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/Service-Files/users.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-stormsriver-wtw',
  templateUrl: './stormsriver-wtw.component.html',
  styleUrls: ['./stormsriver-wtw.component.css']
})
export class StormsriverWTWComponent implements OnInit {

  last_update: any;
  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;

  intervalLoop: any
  variable:any = {
    wtw_storms_UT:null,
  wtw_storms_filter_pump1_mode:null,
  wtw_storms_filter_pump1_status:null,
  wtw_storms_filter_pump2_mode:null,
  wtw_storms_filter_pump2_status:null,
  wtw_storms_high_lift_pump1_mode:null,
  wtw_storms_high_lift_pump1_status:null,
  wtw_storms_high_lift_pump2_status:null,
  wtw_storms_high_lift_pump2_mode:null,
  wtw_storms_clear_water_tank_high_high:null,
  wtw_storms_clear_water_tank_high:null,
  wtw_storms_clear_water_tank_low:null,
  wtw_storms_holding_reservoir_high:null,
  wtw_storms_holding_reservoir_low:null,
  wtw_storms_overhead_tank_high:null,
  wtw_storms_surge_arrester:null,
  wtw_storms_overhead_tank_low:null,
  wtw_storms_door_mag:null,
  wtw_storms_battery_low:null,
  wtw_storms_voltage_ok:null,
  wtw_storms_filter_pump1_run_hours:null,
  wtw_storms_filter_pump2_run_hours:null,
  wtw_storms_high_lift_pump1_run_hours:null,
  wtw_storms_high_lift_pump2_run_hours:null,
  wtw_storms_holding_reservoir_level:null,
  wtw_storms_overhead_tank_level:null,
  wtw_storms_pulse_count1_Total_Flow:null,
  wtw_storms_pulse_count2_Total_Flow:null,
  comms:null
  }

    tagArr:any =[
    "wtw_storms_UT",//0
    "wtw_storms_filter_pump1_mode",//1
     "wtw_storms_filter_pump1_status",//2
     "wtw_storms_filter_pump2_mode",//3
     "wtw_storms_filter_pump2_status",//4
     "wtw_storms_high_lift_pump1_mode",//5
     "wtw_storms_high_lift_pump1_status",//6
     "wtw_storms_high_lift_pump2_mode",//7
     "wtw_storms_high_lift_pump2_status",//8
     "wtw_storms_clear_water_tank_high_high",//9
     "wtw_storms_clear_water_tank_high",//10
     "wtw_storms_clear_water_tank_low",//11
     "wtw_storms_holding_reservoir_high",//12
     "wtw_storms_holding_reservoir_low",//13
     "wtw_storms_overhead_tank_high",//14
     "wtw_storms_overhead_tank_low",//15
     "wtw_storms_surge_arrester",//16
     "wtw_storms_door_mag",//17
     "wtw_storms_battery_low",//18
     "wtw_storms_voltage_ok",//19
     "wtw_storms_filter_pump1_run_hours",//20
     "wtw_storms_filter_pump2_run_hours",//21
     "wtw_storms_high_lift_pump1_run_hours",//22
     "wtw_storms_high_lift_pump2_run_hours",//23
     "wtw_storms_holding_reservoir_level",//24
     "wtw_storms_overhead_tank_level",//25
     "wtw_storms_pulse_count1_Total_Flow",//26
     "wtw_storms_pulse_count2_Total_Flow",//27
  ]


  theme: any
  data:any = []
  constructor(private ws:WebSocketService,private storms:StormsriverComponent  ,private userService: UsersService,private authService: AuthService,public recieve:Common ,private pm:pagePostMethod) {

  // this.storms.GetSiteValues()
  // .subscribe(rsp=> {
  //   this.data = rsp;

  //   this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)
  //   this.variable.comms = Common.getLastUpdate(this.variable.wtw_storms_UT)

  // })

  this.pm.findPageData("storms_wtw", "WTW_CurrentVals").then((result) => {
    this.data =  result;
    this.theme = localStorage.getItem("theme");
    console.log(this.data)
   this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
   this.variable.comms = Common.getLastUpdate(this.variable.wtw_storms_UT)

  });

   }
  displayedColumns :string[]= ['alarm', 'description'];


  ngOnInit() {

    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "TSI_STORMS_PS":
          this.showNavigationButton = "true";
          break;
      }
    }


    var tagVals:any = []


    tagVals = this.recieve.recieveNonMVals(this.tagArr);

   this.intervalLoop = setInterval(() =>{

    this.pm.findPageData("storms_wtw", "WTW_CurrentVals").then((result) => {
      this.data =  result;
      this.theme = localStorage.getItem("theme");
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.wtw_storms_UT)

    });
},60000)


  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
