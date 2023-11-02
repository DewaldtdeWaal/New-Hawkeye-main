import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/Service-Files/users.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';


@Component({
  selector: 'app-vanstadens',
  templateUrl: './vanstadens.component.html',
  styleUrls: ['./vanstadens.component.css']
})
export class VanstadensComponent implements OnInit {
  data: any=[];
  public authListenerSubs!: Subscription;
  userSites:string[];
   intervalLoop: any
  showNavigationButton: string;
  tagArr:any=["vs_R_LVL",
    "vs_R_SURGE_ARRESTOR",
    "vs_R_CHARGER_STATUS",
    "vs_R_DOOR",
    "vs_R_UT",]

  variable:any ={
    vs_R_LVL:null,
vs_R_SURGE_ARRESTOR:null,
vs_R_CHARGER_STATUS:null,
vs_R_DOOR:null,
vs_R_UT:null,
  }



  constructor(private webSocketService: WebSocketService,private authService: AuthService,public recieve:Common ,private pm:pagePostMethod) {







  }

  vs_R_LVL:any
  vs_R_SURGE_ARRESTOR:any
  vs_R_CHARGER_STATUS:any
  vs_R_DOOR:any
  vs_R_UT:any
comms:any;





recieveVals(tagArr: any[]){
  var tagVals:any = []
  for(let i = 0; i<tagArr.length ;i++){
    this.webSocketService.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
      tagVals[i] = data[tagArr[i]];

    })
  }
  return tagVals
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
        case "NMB_VS_PS":
          this.showNavigationButton = "true";
          break;
      }
    }



    this.intervalLoop = this.pm.findPageData("nmbm_vs_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

     this.comms = Common.getLastUpdate(this.variable.vs_R_UT)

    });

}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}

}


