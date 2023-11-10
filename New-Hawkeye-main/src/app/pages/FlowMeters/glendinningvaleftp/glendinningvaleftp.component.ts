import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { svgImage } from 'src/app/Service-Files/SVGImage/svgImage.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { Common } from 'src/app/class/common';

@Component({
  selector: 'app-glendinningvaleftp',
  templateUrl: './glendinningvaleftp.component.html',
  styleUrls: ['./glendinningvaleftp.component.css']
})
export class GlendinningvaleftpComponent implements OnInit {
  variable :any= {}
  intervalLoop: any;
  showNavigationButton1:any = false
  showNavigationButton2:any = false
  constructor(private authService: AuthService,public recieve:Common,public rs: ReportService,private pm:pagePostMethod, private svg:svgImage  ) {}
  userSites:string[];
  public authListenerSubs!: Subscription;
  ngOnInit(): void {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_GLEN_WTW":
          this.showNavigationButton1 = true;
          break;

  
			
			   case "NMB_GLEN_R":
            this.showNavigationButton2 = true;
            break;
      }
    }




    this.intervalLoop = this.pm.findPageDataForNewSites("nmbm_glen_FPT_WTW", "WTW_CurrentVals").subscribe((result) => {
      this.variable =  result;
    console.log(this.variable)

  })
  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


  
}
