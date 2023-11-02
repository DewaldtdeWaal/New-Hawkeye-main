import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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


  constructor(private authService: AuthService,public recieve:Common,private pm:pagePostMethod ) {



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

    this.pm.findPageData("nmbm_lh_ps_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.lh_UT)
    });

}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();
  }
}

}
