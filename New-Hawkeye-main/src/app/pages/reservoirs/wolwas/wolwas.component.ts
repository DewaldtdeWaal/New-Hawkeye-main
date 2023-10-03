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



    this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.damp_r_ut)
    });

   }



  ngOnInit() {

    var tagVals:any =[]

    tagVals = this.recieve.recieveNonMVals(this.tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{


      this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


      this.variable.comms = Common.getLastUpdate(this.variable.damp_r_ut)
      });

  },60000)

  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
