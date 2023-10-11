import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {GrassRidgeService} from 'src/app/Service-Files/Reservoir/grassridge.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-grassridge',
  templateUrl: './grassridge.component.html',
  styleUrls: ['./grassridge.component.css']
})
export class GrassridgeComponent implements OnInit {

  gr_R_EAST_LVL:any
  res1:any
  gr_R_WEST_LVL:any
  res2:any

  gr_R_INTLET:any
  intervalLoop: any
  gr_R_OUTLET:any

  gr_R_UT:any
  comms: string;
  data:any=[]
  variable :any= {
    gr_R_EAST_LVL:null,
gr_R_WEST_LVL:null,
gr_R_INTLET:null,
gr_R_OUTLET:null,
gr_R_UT:null,
  }
    tagArr:any=[
      "gr_R_EAST_LVL",
"gr_R_WEST_LVL",
"gr_R_INTLET",
"gr_R_OUTLET",
"gr_R_UT",
    ]

  constructor(private webSocketService: WebSocketService, private grs: GrassRidgeService,public recieve:Common,private pm:pagePostMethod ) {




    this.pm.findPageData("nmbm_gr_wtw_r", "R_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

     this.comms = Common.getLastUpdate(this.variable.gr_R_UT)

    });

}



  ngOnInit(){


    this.intervalLoop = setInterval(() =>{

    this.pm.findPageData("nmbm_gr_wtw_r", "R_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

     this.comms = Common.getLastUpdate(this.variable.gr_R_UT)

    });
 },60000)

  }

  ngOnDestroy(){
    if(this.intervalLoop)
    {
      clearInterval(this.intervalLoop)
    }
  }

}
