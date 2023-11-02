import { Component, OnInit } from '@angular/core';
import { graafService } from 'src/app/Service-Files/Reservoir/reservoir.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {Common} from 'src/app/class/common';
@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.css']
})
export class HoldingComponent implements OnInit {

  variable :any= {
  hol_r_ut:null,
  hol_r_level:null,
  comms: null,
  hol_r_battery_level: null,
  hol_r_poll_ut: null,
  }


  intervalLoop: any
  data:any=[]

   tagArr:any=[
    "hol_r_ut",//0,
"hol_r_level",
"hol_r_battery_level",
"hol_r_poll_ut"
  ]
  constructor(public recieve:Common ,private pm:pagePostMethod) {



   }



   ngOnInit() {

    this.intervalLoop = this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


     this.variable.comms = Common.getLastUpdateBattery(this.variable.hol_r_ut, this.variable.hol_r_poll_ut)
    });


  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
