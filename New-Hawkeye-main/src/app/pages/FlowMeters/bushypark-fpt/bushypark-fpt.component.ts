import { Component, OnInit } from '@angular/core';
import {bushyService}  from 'src/app/Service-Files/Reservoir/reservoir.service';
import { Common } from 'src/app/class/common';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bushypark-fpt',
  templateUrl: './bushypark-fpt.component.html',
  styleUrls: ['./bushypark-fpt.component.css']
})
export class BushyparkFptComponent implements OnInit {
  data:any = []
  intervalLoop:any;
  variable :any= {

  bush_UT:null,
  bush_church_socco_fr:null,
  bush_church_steel_fr:null,
  bush_church_socco_bar:null,
  bush_church_steel_bar:null,
  bush_pump_fr:null,
  bush_gw_comb_flow_rate:null,
  bush_tank_lvl:null,
  comms:null,
  bush_gw_TF:null,
bush_ps_TF:null,
bush_church_steel_TF:null,
bush_church_soco_TF:null,
}
userSites:string[];
showNavigationButton: string;
tagArr:any = [
  "bush_UT",
  "bush_church_socco_fr",
  "bush_church_steel_fr",
  "bush_church_socco_bar",
  "bush_church_steel_bar",
  "bush_pump_fr",
  "bush_gw_comb_flow_rate",
  "bush_tank_lvl",
"bush_church_steel_TF",
"bush_church_soco_TF"
];

public authListenerSubs!: Subscription;
constructor(private bush: bushyService,public recieve:Common,private authService: AuthService ) {

  this.bush.GetSiteValues()
  .subscribe(rsp => {
     this.data = rsp;

   this.variable = Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)
     this.variable.comms = Common.getLastUpdate(this.variable.bush_UT)
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
      case "NMB_BUSH_PS":
        this.showNavigationButton = "true";
        break;
    }

  var tagVals:any =[]


 tagVals = this.recieve.recieveNMBMVals(this.tagArr);

  setInterval(() => {
  this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);
 this.variable.comms = Common.getLastUpdate(this.variable.bush_UT)

  }, 60000);



}

}

}
