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
  tc_R_UT:any
  tc_R_LVL:any
  tc_R_HIGH_FLOAT:any
  tc_R_LOW_FLOAT:any
  data: any=[];

  variable:any ={
    tc_R_LOW_FLOAT:null,
tc_R_HIGH_FLOAT:null,
tc_R_LVL:null,
tc_R_UT:null,
tc_RL:null,
  }

  tagArr:any=[
"tc_R_LOW_FLOAT",
"tc_R_HIGH_FLOAT",
"tc_R_LVL",
"tc_R_UT",
"tc_RL",
  ]

  constructor(private webSocketService: WebSocketService, private THS:TheescombeService, private userService: UsersService,private authService: AuthService,public recieve:Common,private pm:pagePostMethod ) {
    // this.THS.GetSiteValues()
    // .subscribe(rsp => {
    //    this.data = rsp;
    //    console.log(this.data)
    //    this.tc_R_LOW_FLOAT  = this.data.routingArray[0].tc_R_LOW_FLOAT
    //    this.tc_R_HIGH_FLOAT = this.data.routingArray[0].tc_R_HIGH_FLOAT
    //    this.tc_R_LVL = this.data.routingArray[0].tc_R_LVL
    //    this.tc_R_UT = this.data.routingArray[0].tc_R_UT
    //    this.tc_RL = this.data.routingArray[0].tc_RL

    //    this.comms = Common.getLastUpdate(this.tc_R_UT)


    // })

    this.pm.findPageData("nmbm_tc_ps_r", "R_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

     this.comms = Common.getLastUpdate(this.variable.tc_R_UT)

    });


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



    this.intervalLoop = setInterval(() =>{
      this.pm.findPageData("nmbm_tc_ps_r", "R_CurrentVals").then((result) => {
        this.data =  result;
        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

       this.comms = Common.getLastUpdate(this.variable.tc_R_UT)

      });
    },60000);
}

ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}

}
