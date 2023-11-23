import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
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


  constructor(private authService: AuthService,public recieve:Common,private pm:pagePostMethod , private pt: PostTrend ) {



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

       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.lh_UT)
    });

}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();
  }
}


siteTitle:any = "Lovemore Heights";
trendTag:any = ["level","lh_Res_lvl"]
collectionName:any ="DRS_LH_RES_LVL"
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


   this.options = this.recieve.getOptionsForLine2("%","Overhead Tank %",trend.LevelArr[0],"Reservoir Tank %",trend.LevelArr[1])
   this.isLoading = false;
 })
}

}
