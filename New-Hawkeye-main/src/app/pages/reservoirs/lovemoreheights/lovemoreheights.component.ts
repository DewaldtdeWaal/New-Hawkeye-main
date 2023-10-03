import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {LovemoreHeightsService} from 'src/app/Service-Files/Reservoir/lovemoreheigths.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/Service-Files/users.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-lovemoreheights',
  templateUrl: './lovemoreheights.component.html',
  styleUrls: ['./lovemoreheights.component.css']
})
export class LovemoreheightsComponent implements OnInit {

  data: any=[];

  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;

  intervalLoop: any

  variable :any= {
  lh_R_OVER_LVL:null,
  lh_UT:null,
  lh_Res_lvl:null,
  comms:null
  }
   tagArr:any =[
    'lh_UT',//0
    'lh_R_OVER_LVL',//1
    'lh_Res_lvl',//2

  ]


  constructor(private webSocketService: WebSocketService, private LHS: LovemoreHeightsService, private userService: UsersService,private authService: AuthService,public recieve:Common,private pm:pagePostMethod ) {
    this.LHS.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)

       this.variable.comms = Common.getLastUpdate(this.variable.lh_UT)

    })


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
        case "NMB_LH_PS":
          this.showNavigationButton = "true";
          break;
      }
    }
    var tagVals:any=[]


    tagVals = this.recieve.recieveNMBMVals(this.tagArr);


    this.intervalLoop = setInterval(() =>{
      this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);

      this.variable.comms = Common.getLastUpdate(this.variable.lh_UT)

    },60000);
}
ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}

}
