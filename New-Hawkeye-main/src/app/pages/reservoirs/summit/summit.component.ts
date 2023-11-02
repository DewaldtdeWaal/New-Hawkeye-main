import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {SummitService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import {Common} from 'src/app/class/common';
// Maake a special method for summit
@Component({
  selector: 'app-summit',
  templateUrl: './summit.component.html',
  styleUrls: ['./summit.component.css']
})
export class SummitComponent implements OnInit {

  sm_r_lvl:any
  sm_fm_fr:any
  sm_fm_tf:any
  sm_ut:any
  sm_ut_flowmeter:any
  comms: string;
  flowcomms:string;
  data: any=[];
   intervalLoop: any

   variable:any = {}
  constructor(private pm:pagePostMethod) {
    this.sm_ut_flowmeter="February 15 2021 15:40"
    this.flowcomms = "NOT OK"


  }


  ngOnInit(){
    this.intervalLoop = this.pm.findPageData("nmbm_sm_r", "R_CurrentVals").subscribe((result) => {
      this.variable =  result;
      console.log(this.variable)

   this.comms = Common.getLastUpdate(this.variable.sum_UT)

    });



}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
}
