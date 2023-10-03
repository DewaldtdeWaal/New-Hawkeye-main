import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {graafService} from 'src/app/Service-Files/Reservoir/reservoir.service';
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
  constructor(private graf: graafService,public recieve:Common,private pm:pagePostMethod ) {



      this.graf.GetSiteValues()
      .subscribe(rsp => {
         this.data = rsp;
         this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)
         this.variable.comms = Common.getLastUpdateBattery(this.variable.wolwas_r_ut, this.variable.wolwas_r_poll_ut)
      })

   }



  ngOnInit() {

    var tagVals:any =[]

    tagVals = this.recieve.recieveNonMVals(this.tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{



      this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);

    this.variable.comms = Common.getLastUpdateBattery(this.variable.wolwas_r_ut, this.variable.wolwas_r_poll_ut)

  },60000)

  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
