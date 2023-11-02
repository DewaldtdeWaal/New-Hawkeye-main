import { Component, OnInit } from '@angular/core';

import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';

@Component({
  selector: 'app-airportres',
  templateUrl: './airportres.component.html',
  styleUrls: ['./airportres.component.css']
})
export class AirportresComponent implements OnInit {

  variable :any= {
    air_prt_R_comms_UT: null,
    air_prt_R_lvl: null,
    air_prt_R_battery_unit_UT: null,
    air_prt_R_battery_lvl: null,
     comms: null,
     }


   tagArr:any=[
   "air_prt_R_comms_UT",//0,
   "air_prt_R_lvl",
   "air_prt_R_battery_unit_UT",//
   "air_prt_R_battery_lvl",
       ]



       intervalLoop: any
       data:any=[]
       pageVariable:any
     constructor(public recieve:Common, private pm:pagePostMethod ) {







   }

   ngOnInit() {
    this.intervalLoop = this.pm.findPageData("air_prt", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
    this.variable.comms = Common.getLastUpdateBattery(this.variable.air_prt_R_comms_UT, this.variable.air_prt_R_battery_unit_UT)
    });

  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();
    }
  }
}
