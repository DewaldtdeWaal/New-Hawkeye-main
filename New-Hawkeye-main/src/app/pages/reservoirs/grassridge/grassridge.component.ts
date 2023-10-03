import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {GrassRidgeService} from 'src/app/Service-Files/Reservoir/grassridge.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-grassridge',
  templateUrl: './grassridge.component.html',
  styleUrls: ['./grassridge.component.css']
})
export class GrassridgeComponent implements OnInit {

  gr_R_EAST_LVL:any
  res1:any
  gr_R_WEST_LVL:any
  res2:any

  gr_INLET_FLOW:any
  intervalLoop: any
  gr_OUTLET_FLOW:any

  gr_UT:any
  comms: string;
  data:any=[]

  constructor(private webSocketService: WebSocketService, private grs: GrassRidgeService,public recieve:Common,private pm:pagePostMethod ) {

    this.grs.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
      this.gr_R_EAST_LVL  = this.data.routingArray[0].gr_R_EAST_LVL
      this.res1  = 100 - this.data.routingArray[0].gr_R_EAST_LVL
      this.gr_R_WEST_LVL  = this.data.routingArray[0].gr_R_WEST_LVL
      this.res2  =100- this.data.routingArray[0].gr_R_WEST_LVL
      this.gr_INLET_FLOW  = this.data.routingArray[0].gr_R_INTLET
      this.gr_OUTLET_FLOW  = this.data.routingArray[0].gr_R_OUTLET
      this.gr_UT  = this.data.routingArray[0].gr_R_UT

      this.comms = Common.getLastUpdate(this.gr_UT)


    })


}

// recieveVals(tagArr: any[]){
//   var tagVals:any = []
//   for(let i = 0; i<tagArr.length ;i++){
//     this.webSocketService.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
//       tagVals[i] = data[tagArr[i]];

//     })
//   }
//   return tagVals
// }

  ngOnInit(){

    var tagVals:any=[]
    var tagArr =[
      'gr_ut',//0
      'gr_east_rl',//1
      'gr_west_rl',//2
      'gr_inlet_flow',//3
      'gr_outlet_flow',//4


    ]

    tagVals = this.recieve.recieveNMBMVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){
        this.gr_UT = tagVals[0]
        this.gr_R_EAST_LVL = tagVals[1]
        this.res1 = 100 - tagVals[1]
        this.gr_R_WEST_LVL = tagVals[2]
        this.res2 =100- tagVals[2]
        this.gr_INLET_FLOW = tagVals[3]
        this.gr_OUTLET_FLOW = tagVals[4]



      }
      this.comms = Common.getLastUpdate(this.gr_UT)
 },60000)

  }

  ngOnDestroy(){
    if(this.intervalLoop)
    {
      clearInterval(this.intervalLoop)
    }
  }

}
