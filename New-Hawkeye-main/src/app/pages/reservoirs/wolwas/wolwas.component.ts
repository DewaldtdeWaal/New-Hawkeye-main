import { Component, OnInit } from '@angular/core';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-wolwas',
  templateUrl: './wolwas.component.html',
  styleUrls: ['./wolwas.component.css']
})
export class WolwasComponent implements OnInit {

  variable:any = {
   wolwas_r_ut:null,
   wolwas_r_level:null,
   wolwas_r_battery_level:null,
   wolwas_r_poll_ut:null,
  comms:null,
  }
  intervalLoop: any
  data:any=[]

   tagArr:any=[
    "wolwas_r_ut",//0,
"wolwas_r_level",
"wolwas_r_battery_level",//
"wolwas_r_poll_ut",
  ]
  constructor(public recieve:Common,private pm:pagePostMethod ) {




   }



  ngOnInit() {


    this.intervalLoop = this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getTwoLastUpdates(this.variable.wolwas_r_ut,this.variable.wolwas_r_poll_ut)
    });

  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
