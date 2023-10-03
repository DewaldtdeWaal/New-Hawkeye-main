import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {kruisfonteinRouting} from 'src/app/Service-Files/GRDW/groundwater.service'
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-kruisfontein-r',
  templateUrl: './kruisfontein-r.component.html',
  styleUrls: ['./kruisfontein-r.component.css']
})
export class KruisfonteinRComponent implements OnInit {

  variable:any = {
    klm_kruisR_ut:null,
    klm_kruisR_lvl:null,
    klm_kruisR_surge_arrestor:null,
    klm_kruisR_voltage_ok:null,
    klm_kruisR_door_contact:null,
    klm_kruisR_low_battery:null,
    klm_kruisR_high_float:null,
    klm_kruisR_low_float:null,
    comms:null


  }
  intervalLoop:any
  tagArr:any=[
 "klm_kruisR_ut",
 "klm_kruisR_lvl",
 "klm_kruisR_surge_arrestor",
 "klm_kruisR_voltage_ok",
 "klm_kruisR_door_contact",
 "klm_kruisR_low_battery",
 "klm_kruisR_high_float",
 "klm_kruisR_low_float",
  ]
  comms:any;
  data: any=[];
  showGW13:any
  showGW12:any
  showGW14:any
  userSites:string[];
  public authListenerSubs!: Subscription;
  constructor(private authService: AuthService,private GWS:kruisfonteinRouting,public recieve:Common,private pm:pagePostMethod) {



    this.pm.findPageData("Kuis", "GRDW_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable = Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.klm_kruisR_ut)
    });

   }

   ngOnInit() {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "KLM_KUI_12_GW":
          this.showGW12 = "true";
          break;

      case "KLM_KUI_13_GW":
        this.showGW13 = "true";
        break;


        case "KLM_KUI_14_GW":
          this.showGW14 = "true";
          break;

      }
    }


    var tagVals:any =[]

    console.log(this.tagArr)

   tagVals = this.recieve.recieveNonMVals(this.tagArr);





   this.intervalLoop = setInterval(() => {
    this.pm.findPageData("Kuis", "GRDW_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
    // this.comms = Common.getLastUpdate(this.variable.klm_kruisR_ut)
    });

    }, 60000);
  }

}
