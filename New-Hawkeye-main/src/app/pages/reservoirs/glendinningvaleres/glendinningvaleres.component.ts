import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { svgImage } from 'src/app/Service-Files/SVGImage/svgImage.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { Common } from 'src/app/class/common';

@Component({
  selector: 'app-glendinningvaleres',
  templateUrl: './glendinningvaleres.component.html',
  styleUrls: ['./glendinningvaleres.component.css']
})
export class GlendinningvaleresComponent implements OnInit {
  variable :any= {}
  intervalLoop: any;
  public authListenerSubs!: Subscription;
  valveImage1:any
  valveColor1:any
  userSites:string[];
  titleG:any = "Flow Rate"
  constructor(private authService: AuthService,public recieve:Common,public rs: ReportService,private pm:pagePostMethod, private svg:svgImage , private pt: PostTrend ) {}

  resTitle:any = "Reservoir"
  showNavigationButton1:any = false
  showNavigationButton2:any = false

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

          case "NMB_GLEN_FPT":
            this.showNavigationButton2 = true;
            break;
      }
    }


      this.intervalLoop = this.pm.findPageDataForNewSites("nmbm_glen_r", "R_CurrentVals").subscribe((result) => {
        this.variable =  result;
      console.log(this.variable)

      this.valveImage1 = this.svg.returnValveImage(this.variable.glen_r_mode)
      this.valveColor1 = this.svg.returnValveColor(this.variable.glen_r_mode)
    })
  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  siteTitle:any = "Glendinningvale";
  trendTag:any = ["glen_r_res_lvl"]
  collectionName:any ="NMBM_GLEN_Flow_trend"
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
