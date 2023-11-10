import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-theescombe',
  templateUrl: './theescombe.component.html',
  styleUrls: ['./theescombe.component.css']
})
export class TheescombeComponent implements OnInit {
  comms: string;
  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;

  intervalLoop: any
  tc_RL:any
  tc_R_UT:any
  tc_R_LVL:any
  tc_R_HIGH_FLOAT:any
  tc_R_LOW_FLOAT:any
  data: any=[];

  variable:any ={
    tc_R_LOW_FLOAT:null,
tc_R_HIGH_FLOAT:null,
tc_R_LVL:null,
tc_R_UT:null,
tc_RL:null,
  }

  tagArr:any=[
"tc_R_LOW_FLOAT",
"tc_R_HIGH_FLOAT",
"tc_R_LVL",
"tc_R_UT",
"tc_RL",
  ]

  constructor( private authService: AuthService,public recieve:Common,private pm:pagePostMethod, private pt: PostTrend ) {

    this.intervalLoop = this.pm.findPageData("nmbm_tc_ps_r", "R_CurrentVals").subscribe((result) => {
      this.variable =  result;
      console.log(this.data)
   //  this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

     this.comms = Common.getLastUpdate(this.variable.tc_R_UT)

    });


  }


  ngOnInit(){




    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_TC_PS":
          this.showNavigationButton = "true";
          break;
      }
    }




}

ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}

siteTitle:any = "Theescombe";
trendTag:any = ["level"]
collectionName:any ="DRS_TC_RES_LVL"
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
