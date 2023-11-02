import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {OliphantskopService}from 'src/app/Service-Files/Reservoir/reservoir.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-oliphantskop',
  templateUrl: './oliphantskop.component.html',
  styleUrls: ['./oliphantskop.component.css']
})
export class OliphantskopComponent implements OnInit {



  variable :any= {
    oli_ut:null,
    oli_lvl:null,
    batteryUnitUpdate:null,
    comms:null
  }

  tagArr:any =[
    "oli_ut",
    "oli_lvl",
    "batteryUnitUpdate",

  ]


   intervalLoop: any


  data: any=[];

  constructor(public recieve:Common,private pm:pagePostMethod ) {







   }


   reservoirTitle:any ="Reservoir"


  ngOnInit() {




    this.intervalLoop = this.pm.findPageData("nmbm_olip_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.oli_ut)
    });






  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


}
