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
  constructor(private authService: AuthService,public recieve:Common ,private pm:pagePostMethod) {






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


    this.intervalLoop = this.pm.findPageData("heaterbank_pump", "PS_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


     this.comms = Common.getLastUpdate(this.variable.hb_R_UT)
    });


}

ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
}
