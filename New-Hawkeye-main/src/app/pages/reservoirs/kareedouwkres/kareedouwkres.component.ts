import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {Common} from 'src/app/class/common';
import {GroundwaterService} from 'src/app/Service-Files/GRDW/groundwater.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-kareedouwkres',
  templateUrl: './kareedouwkres.component.html',
  styleUrls: ['./kareedouwkres.component.css']
})
export class KareedouwkresComponent implements OnInit {
  data:any=[]
  showKark1:any;
  showKark2:any;
  comms:any;


  variable :any= {
  kark_R_comms_UT:null,
  kark_R_lvl:null,
  kark_R_battery_lvl:null,
  kark_R_battery_unit_UT:null,
  comms:null,
  }
  intervalLoop: any
   tagArr:any = [
    "kark_R_comms_UT",
    "kark_R_lvl",
    "kark_R_battery_lvl",
    "kark_R_battery_unit_UT",
  ];

  public authListenerSubs!: Subscription;
  userSites:string[];


  constructor(private authService: AuthService,private GWS:GroundwaterService,public recieve:Common,private pm:pagePostMethod, private pt: PostTrend) {




   }

      
  siteTitle:any = "Kareedouw";
  trendTag:any = ["level"]
  collectionName:any ="KLM_KRUIS_RES_LVL"
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
    this.showKark1 = "false";
    this.showKark2 = "false";


    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "KOU_KARK1_GW":
          this.showKark1 = "true";
          break;

      case "KOU_KARK2_GW":
        this.showKark2 = "true";
        break;

      }
    }







    this.intervalLoop = this.pm.findPageData("nmbm_kark_gw", "GRDW_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


     this.variable.comms = Common.getLastUpdateBattery(this.variable.kark_R_comms_UT, this.variable.kark_R_battery_unit_UT)
    });


  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
}
