import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { Common } from 'src/app/class/common';
import { Subscription } from 'rxjs';
import {svgImage} from "src/app/Service-Files/SVGImage/svgImage.service"
@Component({
  selector: 'app-glendinningvalewtw',
  templateUrl: './glendinningvalewtw.component.html',
  styleUrls: ['./glendinningvalewtw.component.css']
})
export class GlendinningvalewtwComponent implements OnInit {

  variable :any= {}
  intervalLoop: any;
  constructor(public recieve:Common,public rs: ReportService,private pm:pagePostMethod,private authService: AuthService, ) {}
  userSites:string[];
  public authListenerSubs!: Subscription;

  pumpTitle1:any = "Pump 1";
  pumpTitle2:any = "Pump 2"
  Pump:any = "Pump"
  title1:string = "General"

  variablesMatric1:any=[{}]
  showNavigationButton1:any = false
  showNavigationButton2:any = false
  variablesMatric2:any=[{}]
  ngOnInit(): void {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {


          case "NMB_GLEN_FPT":
            this.showNavigationButton2 = true;
            break;
			
			   case "NMB_GLEN_R":
            this.showNavigationButton1 = true;
            break;

      }}
    this.intervalLoop = this.pm.findPageDataForNewSites("nmbm_glen_FPT_WTW", "WTW_CurrentVals").subscribe((result) => {
      this.variable =  result;
    console.log(this.variable)

    this.variablesMatric1=[
      {
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.glen_FTP_WTW_p1_mode
       },{
      rowType:"TextRow",
      label:"Status",
      value:this.variable.glen_FTP_WTW_p1_status
     },{
      rowType:"TextRow",
      label:"Run Time",
      value:this.variable.glen_FTP_WTW_P1_rtm + " h"
     },
     {
      rowType:"TextRow",
      label:"Number Of Starts",
      value:this.variable.glen_FTP_WTW_P1_stn
     }]

     this.variablesMatric2=[
      {
        rowType:"TextRow",
        label:"Mode",
        value:this.variable.glen_FTP_WTW_p2_mode
       },{
      rowType:"TextRow",
      label:"Status",
      value:this.variable.glen_FTP_WTW_p2_status
     },{
      rowType:"TextRow",
      label:"Run Time",
      value:this.variable.glen_FTP_WTW_P2_rtm+ " h"
     },{
        rowType:"TextRow",
        label:"Number Of Starts",
        value:this.variable.glen_FTP_WTW_P2_stn
       }]

     this.pumpColor =svgImage.getSVGColor(this.variable.glen_FTP_WTW_p1_status)
     this.pumpColor2 =svgImage.getSVGColor(this.variable.glen_FTP_WTW_p2_status)
    })


  }
  pumpColor:any
  pumpColor2:any

}



