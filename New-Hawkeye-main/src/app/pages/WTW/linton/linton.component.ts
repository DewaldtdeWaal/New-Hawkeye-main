import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { Common } from 'src/app/class/common';

@Component({
  selector: 'app-linton',
  templateUrl: './linton.component.html',
  styleUrls: ['./linton.component.css']
})
export class LintonComponent implements OnInit {

  showNavigationButton:any = false
  intervalLoop:any;
  variable :any= {}
  userSites:string[];
  public authListenerSubs!: Subscription;
  constructor(private authService: AuthService,public recieve:Common,private pm:pagePostMethod,private pt: PostTrend ) {}

  ngOnInit() {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_LIN_WTW":
          this.showNavigationButton = "true";
          break;
      }
    }


    this.intervalLoop = this.pm.findPageDataForNewSites("nmbm_lin_wtw", "WTW_CurrentVals").subscribe((result) => {
      this.variable =  result;

      console.log(this.variable)


    })
  }
  siteTitle:any = "Linton"
  trendTag:any = ["lin_wtw_back_wash_FR","lin_wtw_raw_water_FR","lin_wtw_final_water_fr"]
  trendTagTF:any = ["lin_wtw_back_wash_TF","lin_wtw_raw_water_TF","lin_wtw_final_water_tf"]
  collectionName:any ="NMBM_LIN_FLOW"
  totalFlowCollection:any="NMBM_LIN_TF"
  levelArr: any[]=[];
  range:any
  options: EChartsOption;


  
  isLoading:boolean = false;

  recieveDate($event: any){
   this.isLoading = true;
   var trend1 :any;
   var trend2:any;
   this.range = $event;

   const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

   this.pt.getLevel(this.collectionName, this.trendTag,start,end).then((data) => {
     trend1=data

     console.log(trend1)



     this.pt.getLevel(this.totalFlowCollection, this.trendTagTF,start,end).then((data) => {
      trend2=data


    this.options =  this.recieve.getOptionsBarAndLine3("Back Wash Flow Rate",trend1.LevelArr[0],"Raw Water Flow Rate",trend1.LevelArr[1],"Final Water Flow Rate",trend1.LevelArr[2],"Back Wash Total Flow",trend2.LevelArr[0],"Raw Water Total Flow",trend2.LevelArr[1],"Final Water Total Flow",trend2.LevelArr[2],)



     })


     this.isLoading = false;
   })
 }

}
