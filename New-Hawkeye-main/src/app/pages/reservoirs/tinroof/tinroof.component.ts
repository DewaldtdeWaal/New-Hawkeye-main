import { Component, OnInit } from '@angular/core';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import {Common} from 'src/app/class/common';
@Component({
  selector: 'app-tinroof',
  templateUrl: './tinroof.component.html',
  styleUrls: ['./tinroof.component.css']
})
export class TinroofComponent implements OnInit {


  variable :any= {
  tin_r_ut:null,
  tin_r_level:null,
  comms: null,
  tin_r_battery_level:null,
  tin_r_poll_ut: null,

  }

   tagArr:any=[
    "tin_r_ut",//0,
"tin_r_level",
"tin_r_battery_level",
"tin_r_poll_ut"

  ]

  intervalLoop: any
  data:any=[]
  constructor(public recieve:Common,private pm:pagePostMethod ) {




   }

   ngOnInit() {
    this.intervalLoop = this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdateBattery(this.variable.tin_r_ut, this.variable.tin_r_poll_ut)
    });

  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
