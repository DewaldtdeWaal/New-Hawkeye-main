import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {HeatherBankService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-heatherbank',
  templateUrl: './heatherbank.component.html',
  styleUrls: ['./heatherbank.component.css']
})
export class HeatherbankComponent implements OnInit {
  comms: string;
  data:any=[]
  intervalLoop: any
  hb_RL:any
  hb_UT:any

  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;

  tagArr:any=[
    "hb_R_LVL",
"hb_R_UT",
  ]

  variable :any= {
    hb_R_LVL:null,
hb_R_UT:null,
  }
  constructor(private  hbs:HeatherBankService, private userService: UsersService,private authService: AuthService,public recieve:Common ,private pm:pagePostMethod) {


    // this.hbs.GetSiteValues()
    // .subscribe(rsp => {
    //    this.data = rsp;
    //    this.hb_RL = this.data.routingArray[0].hb_R_LVL
    //    this.hb_UT = this.data.routingArray[0].hb_R_UT
    //    this.comms = Common.getLastUpdate(this.hb_UT)
    // })

    this.pm.findPageData("heaterbank_pump", "PS_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


     this.comms = Common.getLastUpdate(this.variable.hb_R_UT)
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
        case "NMB_HB_PS":
          this.showNavigationButton = "true";
          break;
      }
    }


    this.intervalLoop = setInterval(() =>{
      this.pm.findPageData("heaterbank_pump", "PS_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


       this.comms = Common.getLastUpdate(this.variable.hb_R_UT)
      });
    },60000);


}

ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}
}
