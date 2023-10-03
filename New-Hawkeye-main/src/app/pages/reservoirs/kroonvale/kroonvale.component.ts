import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {graafService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-kroonvale',
  templateUrl: './kroonvale.component.html',
  styleUrls: ['./kroonvale.component.css']
})
export class KroonvaleComponent implements OnInit {

  variable :any= {
   kroon_r_ut:null,
   kroon_r_level:null,
   kroon_r_battery_level:null,
   kroon_r_poll_ut:null,
  comms: null,
  }
  intervalLoop: any
  data:any=[]

  tagArr:any=[
    "kroon_r_ut",//0,
"kroon_r_level",
"kroon_r_battery_level",//
"kroon_r_poll_ut",
  ]
  constructor(private webSocketService: WebSocketService, private graf: graafService,public recieve:Common,private pm:pagePostMethod ) {


    this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.kroon_r_ut)
    });


  }
  ngOnInit() {

    var tagVals:any =[]
    var tagArr=[
      "kroon_r_ut",//0,
"kroon_r_level",
"kroon_r_battery_level",//
"kroon_r_poll_ut",
    ]
    tagVals = this.recieve.recieveNonMVals(tagArr);


    this.intervalLoop = setInterval(() => {

      this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
       this.variable.comms = Common.getLastUpdate(this.variable.kroon_r_ut)
      });

      }, 60000);

  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
