import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
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
     constructor(private webSocketService: WebSocketService,public recieve:Common, private pm:pagePostMethod ) {

      this.pm.findPageData("air_prt", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
      this.variable.comms = Common.getLastUpdateBattery(this.variable.air_prt_R_comms_UT, this.variable.air_prt_R_battery_unit_UT)
      });





   }

   ngOnInit() {
    var tagVals:any =[]

    tagVals = this.recieve.recieveNonMVals(this.tagArr);





    this.intervalLoop = setInterval(() =>{
      this.pm.findPageData("air_prt", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
      this.variable.comms = Common.getLastUpdateBattery(this.variable.air_prt_R_comms_UT, this.variable.air_prt_R_battery_unit_UT)
      });


  },60000)

  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
