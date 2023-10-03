import { Component, OnInit } from '@angular/core';
import { motherwellComponent } from 'src/app/Service-Files/Pumpstation/pumpstation.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-motherwellres',
  templateUrl: './motherwellres.component.html',
  styleUrls: ['./motherwellres.component.css']
})
export class MotherwellresComponent implements OnInit
  {
    public authListenerSubs!: Subscription;
    userSites:string[];
    showNavigationButton: string;

    variable :any= {
    mw_g_ut:null,
    mw_g_res_level:null,
    comms:null

    }
    tagArr:any =[
      'mw_g_ut',//0
      'mw_g_res_level'//1
    ]

  intervalLoop: any;
  data: any=[];
    constructor( private buff:motherwellComponent, private ws:WebSocketService,private authService: AuthService,public recieve:Common,private pm:pagePostMethod ) {
      // this.buff.GetSiteValues()
      // .subscribe(rsp => {
      //    this.data = rsp;
      //    console.log(this.data);
      //    this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)

      //    this.variable.comms = Common.getLastUpdate(this.variable.mw_g_ut)
      // })


      this.pm.findPageData("nmbm_mw_ps", "PS_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


      this.variable.comms = Common.getLastUpdate(this.variable.mw_g_ut)
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
          case "NMB_MW_PS":
            this.showNavigationButton = "true";
            break;
        }
      }

      var tagVals:any=[]

    tagVals = this.recieve.recieveNMBMVals(this.tagArr);


    this.intervalLoop = setInterval(() =>{


      this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);
      this.variable.comms = Common.getLastUpdate(this.variable.mw_g_ut)
    },60000);





    }

    ngOnDestroy(){
      if(this.intervalLoop){
        clearInterval(this.intervalLoop)
      }
    }

  }

