import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { Common } from 'src/app/class/common';

@Component({
  selector: 'app-lintonres',
  templateUrl: './lintonres.component.html',
  styleUrls: ['./lintonres.component.css']
})
export class LintonresComponent implements OnInit {

  constructor(private authService: AuthService,public recieve:Common,private pm:pagePostMethod, private pt: PostTrend   ) {}
  intervalLoop:any
  variable :any= {}
  showNavigationButton:any = false
  siteTitle:any = "Linton"
  userSites:string[];
  resTitle="Reservoir"
  public authListenerSubs!: Subscription;
  ngOnInit() {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_LIN_R":
          this.showNavigationButton = "true";
          break;
      }
    }

    this.intervalLoop = this.pm.findPageDataForNewSites("nmbm_lin_r_wtw", "R_CurrentVals").subscribe((result) => {
      this.variable =  result;

      console.log(this.variable)

    })
  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


  trendTag:any = ["level"]
  collectionName:any ="LIN_R_LVL"
  levelArr: any[]=[];
  range:any
  options: EChartsOption;
  isLoading:boolean = false;

  recieveDate($event: any){
   this.isLoading = true;
   var trend :any;
   this.range = $event;

   const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

   this.pt.getLevel(this.collectionName, this.trendTag,start,end).then((data) => {
     trend=data

     this.levelArr = trend.LevelArr[0];

     this.options = Common.getOptionsForLine(this.options,"Level %",this.levelArr)
     this.isLoading = false;
   })
 }
 
}
