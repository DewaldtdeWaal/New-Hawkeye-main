import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {graafService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-bergendal',
  templateUrl: './bergendal.component.html',
  styleUrls: ['./bergendal.component.css']
})
export class BergendalComponent implements OnInit {

  variable :any= {
 bergen_r_ut: null,
 bergen_r_level: null,
 bergen_r_battery_level: null,
 bergen_r_poll_ut: null,
  comms: null,
  }
  intervalLoop: any
  data:any=[]

tagArr:any=[
"bergen_r_ut",//0,
"bergen_r_level",
"bergen_r_battery_level",//
"bergen_r_poll_ut",
    ]
  constructor(private graf: graafService,public recieve:Common,private pm:pagePostMethod ) {


      this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
             this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
          this.variable.comms = Common.getLastUpdateBattery(this.variable.bergen_r_ut, this.variable.bergen_r_poll_ut)
      });
}




  ngOnInit() {
    var tagVals:any =[]




    this.intervalLoop = setInterval(() =>{


      this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
             this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
          this.variable.comms = Common.getLastUpdateBattery(this.variable.bergen_r_ut, this.variable.bergen_r_poll_ut)
      });


  },60000)

  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
