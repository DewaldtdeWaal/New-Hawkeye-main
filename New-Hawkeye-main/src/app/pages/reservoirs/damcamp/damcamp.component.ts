import { Component, OnInit } from '@angular/core';
import { graafService } from 'src/app/Service-Files/Reservoir/reservoir.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {Common} from 'src/app/class/common';
@Component({
  selector: 'app-damcamp',
  templateUrl: './damcamp.component.html',
  styleUrls: ['./damcamp.component.css']
})
export class DamcampComponent implements OnInit {

  variable :any= {
  damp_r_ut:null,
  damp_r_level:null,
  comms: null,
  }
  intervalLoop: any
  data:any=[]

     tagArr:any=[
    "damp_r_ut",//0,
      "damp_r_level",

  ]
  constructor(private webSocketService: WebSocketService,private graf: graafService,public recieve:Common ,private pm:pagePostMethod) {

    this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.damp_r_ut)
    });



   }


   ngOnInit() {


    this.intervalLoop = setInterval(() =>{


      this.pm.findPageData("graaf", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


      this.variable.comms = Common.getLastUpdate(this.variable.damp_r_ut)
      });


  },60000)

  }

}
