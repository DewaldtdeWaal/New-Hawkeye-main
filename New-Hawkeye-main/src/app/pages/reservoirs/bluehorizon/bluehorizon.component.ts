import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { EChartsOption } from 'echarts';
@Component({
  selector: 'app-bluehorizon',
  templateUrl: './bluehorizon.component.html',
  styleUrls: ['./bluehorizon.component.css']
})
//Can't be updated to new method
export class BluehorizonComponent implements OnInit {
  data:any=[]
  public authListenerSubs!: Subscription;
  userSites:string[];

// bh_R_LVL:any
// bh_R_START_FLOAT:any
// bh_R_STOP_FLOAT:any
//   bh_R_UT:any
//   bh_R_DOOR:any
//   bh_R_SURGE_ARRESTOR:any
//   bh_R_CHARGER_STATUS:any
//   res:any
 comms:any;
  showNavigationButton: string;
  intervalLoop: any

  tagArr:any=[
    "bh_R_LVL",
    "bh_R_START_FLOAT",
    "bh_R_STOP_FLOAT",
    "bh_R_UT",
    "bh_R_DOOR",
    "bh_R_SURGE_ARRESTOR",
    "bh_R_CHARGER_STATUS",
        ]

        variable :any= {
          bh_R_LVL:null,
          bh_R_START_FLOAT:null,
          bh_R_STOP_FLOAT:null,
          bh_R_UT:null,
          bh_R_DOOR:null,
          bh_R_SURGE_ARRESTOR:null,
          bh_R_CHARGER_STATUS:null,


        }


        siteTitle:any = "Blue Horizon Bay";
        trendTag:any = ["level"]
        collectionName:any ="DRS_BHB_RES_LVL"
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

  constructor(private authService: AuthService,public recieve:Common,private pm:pagePostMethod, private pt: PostTrend  ) {





}



  ngOnInit() {


    this.intervalLoop = this.pm.findPageData("nmbm_bh_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

       
           this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
          this.comms = Common.getLastUpdate(this.variable.bh_R_UT)
    });

    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_BHB_PS":
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
}
