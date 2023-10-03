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




  constructor(private  hbs:HeatherBankService, private userService: UsersService,private authService: AuthService,public recieve:Common ,private pm:pagePostMethod) {


    this.hbs.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       this.hb_RL = this.data.routingArray[0].hb_R_LVL
       this.hb_UT = this.data.routingArray[0].hb_R_UT
       this.comms = Common.getLastUpdate(this.hb_UT)
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
        case "NMB_HB_PS":
          this.showNavigationButton = "true";
          break;
      }
    }





    var tagVals:any=[]
    var tagArr =[
      'hb_ut',//0
      'hb_rl',//1
    ]

    tagVals = this.recieve.recieveNMBMVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){
        this.hb_UT =  tagVals[0];
        this.hb_RL =  tagVals[1];
      }
      this.comms = Common.getLastUpdate(this.hb_UT)
    },60000);


}

ngOnDestroy(){
  if(this.intervalLoop){
    clearInterval(this.intervalLoop)
  }
}
}
