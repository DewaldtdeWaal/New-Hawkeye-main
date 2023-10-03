import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {graafService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-umasizakhe',
  templateUrl: './umasizakhe.component.html',
  styleUrls: ['./umasizakhe.component.css']
})
export class UmasizakheComponent implements OnInit {
  variable :any= {
   uma_r_ut:null,
   uma_r_level:null,
   uma_r_battery_level:null,
   uma_r_poll_ut:null,
  comms: null,
  }
  intervalLoop: any
  data:any=[]
   tagArr:any=[
    "uma_r_ut",//0,
"uma_r_level",
"uma_r_battery_level",//
"uma_r_poll_ut",
  ]
  constructor(private webSocketService: WebSocketService, private graf: graafService,public recieve:Common ,private pm:pagePostMethod) {


      this.graf.GetSiteValues()
      .subscribe(rsp => {
         this.data = rsp;
         this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)

          this.variable.comms = Common.getLastUpdateBattery(this.variable.uma_r_ut, this.variable.uma_r_poll_ut)
      })


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



      this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);
    this.variable.comms = Common.getLastUpdateBattery(this.variable.uma_r_ut, this.variable.uma_r_poll_ut)

  },60000)

  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
