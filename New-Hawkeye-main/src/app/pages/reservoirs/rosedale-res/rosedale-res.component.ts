import { Component, OnInit } from '@angular/core';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-rosedale-res',
  templateUrl: './rosedale-res.component.html',
  styleUrls: ['./rosedale-res.component.css']
})
export class RosedaleResComponent implements OnInit {
  comms: string;
  data: any=[];
   intervalLoop: any

   tagArr:any=[
    "rd_r_lvl",
"rd_r_ut"
   ]
   variable:any ={
    rd_r_lvl:null,
rd_r_ut:null,
   }

  constructor(public recieve:Common,private pm:pagePostMethod ) {




   }







  ngOnInit() {


    this.intervalLoop = this.pm.findPageData("nmbm_rd_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

     this.comms = Common.getLastUpdate(this.variable.rd_r_ut)

    });
  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
