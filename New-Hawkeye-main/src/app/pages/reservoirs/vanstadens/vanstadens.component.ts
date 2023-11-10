import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';


@Component({
  selector: 'app-vanstadens',
  templateUrl: './vanstadens.component.html',
  styleUrls: ['./vanstadens.component.css']
})
export class VanstadensComponent implements OnInit {
  data: any=[];
  public authListenerSubs!: Subscription;
  userSites:string[];
   intervalLoop: any
  showNavigationButton: string;
  tagArr:any=["vs_R_LVL",
    "vs_R_SURGE_ARRESTOR",
    "vs_R_CHARGER_STATUS",
    "vs_R_DOOR",
    "vs_R_UT",]

  variable:any ={
    vs_R_LVL:null,
vs_R_SURGE_ARRESTOR:null,
vs_R_CHARGER_STATUS:null,
vs_R_DOOR:null,
vs_R_UT:null,
  }



  constructor(private authService: AuthService,public recieve:Common ,private pm:pagePostMethod, private pt: PostTrend) {







  }

  vs_R_LVL:any
  vs_R_SURGE_ARRESTOR:any
  vs_R_CHARGER_STATUS:any
  vs_R_DOOR:any
  vs_R_UT:any
comms:any;


  ngOnInit() {

    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_VS_PS":
          this.showNavigationButton = "true";
          break;
      }
    }



    this.intervalLoop = this.pm.findPageData("nmbm_vs_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

     this.comms = Common.getLastUpdate(this.variable.vs_R_UT)

    });

}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
siteTitle:any = "Van Stadens";
trendTag:any = ["level"]
collectionName:any ="BR_VS_RES_LVL"
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


