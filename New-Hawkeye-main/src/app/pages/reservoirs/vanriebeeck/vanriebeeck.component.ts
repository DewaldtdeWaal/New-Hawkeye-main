import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';

import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/Service-Files/users.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-vanriebeeck',
  templateUrl: './vanriebeeck.component.html',
  styleUrls: ['./vanriebeeck.component.css']
})
export class VanriebeeckComponent implements OnInit {

  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;


  variable:any = {
  vrh_del_rl:null,
  vrh_sc_rl:null,
  vrh_ut:null,
  comms:null,
}
  data: any=[];
  intervalLoop:any
  tagArr:any =[
    "vrh_ut",//0
    "vrh_del_rl",//1
    "vrh_sc_rl",//2
  ]


  constructor(private webSocketService: WebSocketService, private ls:ListeningService, private userService: UsersService,private authService: AuthService,public recieve:Common ,private pm:pagePostMethod) {
    // this.VHS.GetSiteValues()
    // .subscribe(rsp => {
    //    this.data = rsp;
    //    console.log(this.data)
    //    this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)

    // this.variable.comms = Common.getLastUpdate(this.variable.vrh_ut)

    // })


    this.pm.findPageData("nmbm_vrh_ps_r", "R_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)



     this.variable.comms = Common.getLastUpdate(this.variable.vrh_ut)
    });




   }


  ngOnInit() {
    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_VRH_PS":
          this.showNavigationButton = "true";
          break;
      }
    }

    var tagVals:any=[]


    tagVals = this.recieve.recieveNMBMVals(this.tagArr);


    this.intervalLoop = setInterval(() =>{
      this.pm.findPageData("nmbm_vrh_ps_r", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)



       this.variable.comms = Common.getLastUpdate(this.variable.vrh_ut)
      });
    },60000)


  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
