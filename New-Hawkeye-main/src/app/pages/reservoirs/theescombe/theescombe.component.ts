import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {TheescombeService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/Service-Files/users.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-theescombe',
  templateUrl: './theescombe.component.html',
  styleUrls: ['./theescombe.component.css']
})
export class TheescombeComponent implements OnInit {
  comms: string;
  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;

  intervalLoop: any
  tc_RL:any
  tc_UT:any
  res:any
  tc_R_HIGH_FLOAT:any
  tc_R_LOW_FLOAT:any
  data: any=[];

  constructor(private webSocketService: WebSocketService, private THS:TheescombeService, private userService: UsersService,private authService: AuthService,public recieve:Common,private pm:pagePostMethod ) {
    this.THS.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       console.log(this.data)
       this.tc_R_LOW_FLOAT  = this.data.routingArray[0].tc_R_LOW_FLOAT
       this.tc_R_HIGH_FLOAT = this.data.routingArray[0].tc_R_HIGH_FLOAT
       this.res = this.data.routingArray[0].tc_R_LVL
       this.tc_UT = this.data.routingArray[0].tc_R_UT
       this.tc_RL = this.data.routingArray[0].tc_RL

       this.comms = Common.getLastUpdate(this.tc_UT)


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
      'tc_ut',//0
      'tc_rl',//1
      'tc_res',//2
      'tc_high_f',//3
      'tc_low_f',//4


    ]


    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_TC_PS":
          this.showNavigationButton = "true";
          break;
      }
    }


    tagVals = this.recieve.recieveNMBMVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){

        this.tc_UT = tagVals[0];
        this.tc_R_LOW_FLOAT  = tagVals[4];
        this.tc_R_HIGH_FLOAT = tagVals[3];
        this.res = tagVals[1];
      }
      this.comms = Common.getLastUpdate(this.tc_UT)
    },6000);
}

ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}

}
