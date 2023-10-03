import { Component, OnInit } from '@angular/core';
import { graafService } from 'src/app/Service-Files/Reservoir/reservoir.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
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
  constructor(private webSocketService: WebSocketService,private graf: graafService,public recieve:Common,private pm:pagePostMethod ) {




      // this.graf.GetSiteValues()
      // .subscribe(rsp => {
      //    this.data = rsp;
      //    this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)

      //     this.variable.comms = Common.getLastUpdateBattery(this.variable.tin_r_ut, this.variable.tin_r_poll_ut)


      // })

      this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


      this.variable.comms = Common.getLastUpdateBattery(this.variable.tin_r_ut, this.variable.tin_r_poll_ut)
      });

   }

   ngOnInit() {

    var tagVals:any =[]

    tagVals = this.recieve.recieveNonMVals(this.tagArr);


    this.intervalLoop = setInterval(() =>{

      this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


      this.variable.comms = Common.getLastUpdate(this.variable.st_georges_wtw_ut)
      });
  },60000)

  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
