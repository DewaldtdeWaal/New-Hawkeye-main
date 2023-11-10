import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-heatherbank',
  templateUrl: './heatherbank.component.html',
  styleUrls: ['./heatherbank.component.css']
})
export class HeatherbankComponent implements OnInit {
  comms: string;
  data:any=[]
  intervalLoop: any
  hb_RL:any
  hb_UT:any

  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;

  tagArr:any=[
    "hb_R_LVL",
"hb_R_UT",
  ]

  variable :any= {
    hb_R_LVL:null,
hb_R_UT:null,
  }
  constructor(private authService: AuthService,public recieve:Common ,private pm:pagePostMethod, private pt: PostTrend) {






  }

  siteTitle:any = "Heatherbank";
  trendTag:any = ["level"]
  collectionName:any ="DRS_HB_RES_LVL"
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

  ngOnInit() {


    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_HB_PS":
          this.showNavigationButton = "true";
          break;
      }
    }


    this.intervalLoop = this.pm.findPageData("heaterbank_pump", "PS_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


     this.comms = Common.getLastUpdate(this.variable.hb_R_UT)
    });


}

ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
}
