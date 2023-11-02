import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import {svgImage} from'src/app/Service-Files/SVGImage/svgImage.service';
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


  valveImage:any

  valveImage1:any
  valveColor1:any


  valveImage2:any
  valveColor2:any
    constructor(private authService: AuthService,public recieve:Common,private pm:pagePostMethod, private svg:svgImage  ) {}
     title1:any ="Reservoir"
     title2:any ="South Chamber"

     titleG:any="General"
     variablesMatricG:any = {}
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

      this.intervalLoop = this.pm.findPageDataForNewSites("nmbm_mwr_r_new", "R_CurrentVals").subscribe((result) => {
        this.variable =  result;


        this.valveImage1 = this.svg.returnValveImage(this.variable.mw_r_valve_1_status_word)
        this.valveImage2 = this.svg.returnValveImage(this.variable.mw_r_valve_2_status_word)

        this.valveColor1 = this.svg.returnValveColor(this.variable.mw_r_valve_1_status_word)
        this.valveColor2 = this.svg.returnValveColor(this.variable.mw_r_valve_2_status_word)






      });





    }

    ngOnDestroy():void{
      if(this.intervalLoop){
        this.intervalLoop.unsubscribe();

      }
    }

  }

