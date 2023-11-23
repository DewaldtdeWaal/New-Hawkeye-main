import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-vanriebeeck',
  templateUrl: './vanriebeeck.component.html',
  styleUrls: ['./vanriebeeck.component.css']
})
export class VanriebeeckComponent implements OnInit {

  public authListenerSubs!: Subscription;
  userSites:string[];
  showNavigationButton: string;


  variable:any = {
  vrh_del_rl:null,
  vrh_sc_rl:null,
  vrh_ut:null,
  comms:null,
}
  data: any=[];
  intervalLoop:any
  tagArr:any =[
    "vrh_ut",//0
    "vrh_del_rl",//1
    "vrh_sc_rl",//2
  ]


  constructor(private authService: AuthService,public recieve:Common ,private pm:pagePostMethod,private pt: PostTrend) {








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
        case "NMB_VRH_PS":
          this.showNavigationButton = "true";
          break;
      }
    }

    this.intervalLoop = this.pm.findPageData("nmbm_vrh_ps_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)



     this.variable.comms = Common.getLastUpdate(this.variable.vrh_ut)
    });


  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  
  }


  siteTitle:any = "Van Riebeeck Hoogte"
  trendTag:any = ["level"]
  collectionName:any ="DRN_VRH_DL_RES_LVL"
  collectionName1:any ="DRN_VRH_SL_RES_LVL"
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

     this.pt.getLevel(this.collectionName1, this.trendTag,start,end).then((data) => {
      trend2=data

      this.options = this.recieve.getOptionsForLine2("%","East Chamber %",trend1.LevelArr[0],"West Chamber %",trend2.LevelArr[0])
     })




     this.isLoading = false;
   })
 }



}
