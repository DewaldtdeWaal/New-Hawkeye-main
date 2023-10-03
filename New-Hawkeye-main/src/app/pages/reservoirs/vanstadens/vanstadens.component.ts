import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {VanstadensReservoirService} from 'src/app/Service-Files/Reservoir/reservoir.service';
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


  constructor(private webSocketService: WebSocketService, private VSS: VanstadensReservoirService, private userService: UsersService,private authService: AuthService,public recieve:Common ,private pm:pagePostMethod) {
    this.VSS.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       console.log(this.data)
    this.vs_RL = this.data.routingArray[0].vs_R_LVL
    this.vs_SA = this.data.routingArray[0].vs_R_SURGE_ARRESTOR
    this.vs_CHS = this.data.routingArray[0].vs_R_CHARGER_STATUS
    this.vs_D = this.data.routingArray[0].vs_R_DOOR
    this.vs_UT = this.data.routingArray[0].vs_R_UT
    this.res = this.data.routingArray[0].vs_R_LVL

    this.comms = Common.getLastUpdate(this.vs_UT)

    })




  }

  vs_RL:any
  vs_SA:any
  vs_CHS:any
  vs_D:any
  vs_UT:any
  res:any
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


    var tagVals:any=[]
    var tagArr =[
      "vs_rl",//0
      "vs_sa",//1
      "vs_chs",//2
      "vs_d",//3
      "vs_ut",//4
      "vs_res",//5


    ]

    tagVals = this.recieve.recieveNMBMVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){
      this.vs_RL = tagVals[0];
      this.vs_SA = tagVals[1];
      this.vs_CHS = tagVals[2];
      this.vs_D = tagVals[3];
      this.vs_UT = tagVals[4];
      this.res = tagVals[0];
      }
      this.comms = Common.getLastUpdate(this.vs_UT)

    },60000);

}
ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}

}


