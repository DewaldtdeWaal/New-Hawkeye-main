import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {ElandsJagtRootComponent} from 'src/app/Service-Files/WTW/wtw.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-elandsjagt',
  templateUrl: './elandsjagt.component.html',
  styleUrls: ['./elandsjagt.component.css']
})
export class ElandsjagtComponent implements OnInit {
  variable:any = {
  wtw_elands_ut:null,
  comms: null,
  wtw_elands_FR:null,
  wtw_elands_P:null
  }
  intervalLoop: any
  data: any=[];
       tagArr:any =[
      'wtw_elands_ut',
      'wtw_elands_FR',
      'wtw_elands_P'
     ]
  constructor(private ws: WebSocketService, private ej: ElandsJagtRootComponent,public recieve:Common ,private pm:pagePostMethod) {
    // this.ej.GetSiteValues()
    // .subscribe(rsp=> {
    //   this.data = rsp;
    //   this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)
    //   this.variable.comms = Common.getLastUpdate(this.variable.wtw_elands_ut)
    // })

    this.pm.findPageData("nmbm_elands_wtw", "WTW_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.wtw_elands_ut)

    });

  }

  ngOnInit() {

    var tagVals:any = []

     tagVals = this.recieve.recieveNMBMVals(this.tagArr);

    this.intervalLoop = setInterval(() =>{

      this.pm.findPageData("nmbm_elands_wtw", "WTW_CurrentVals").then((result) => {
        this.data =  result;
        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
       this.variable.comms = Common.getLastUpdate(this.variable.wtw_elands_ut)

      });
    },60000);

  }
   ngOnDestroy(){
      if(this.intervalLoop){
        clearInterval(this.intervalLoop)
      }
    }

}