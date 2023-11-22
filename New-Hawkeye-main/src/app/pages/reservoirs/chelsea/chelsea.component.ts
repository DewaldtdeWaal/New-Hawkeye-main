import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {ChelseaService} from 'src/app/Service-Files/Reservoir/chelsea.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import { Common } from 'src/app/class/common';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-chelsea',
  templateUrl: './chelsea.component.html',
  styleUrls: ['./chelsea.component.css']
})
export class ChelseaComponent implements OnInit {
  intervalLoop: any
  data:any = []
  variable :any= {
  che_r_ut:null,
  che_r_fr1100:null,
  che_r_fr600:null,
  che_r_lvl:null,
  comms: null,
  che_r_lvl_East:null,
  che_r_tf1100:null,
che_r_tf600:null,
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  CHE_R_TF1100_arr: any[]
CHE_R_TF600_arr: any[]
DateArr: any;

  showNavigationButton: string;
  userSites:string[];
  public authListenerSubs!: Subscription;

   tagArr:any =[
    'che_r_ut',//0
    'che_r_lvl_East',//1
    'che_r_lvl',//2
    'che_r_fr1100',//3
    'che_r_fr600',//4
    "che_r_tf1100",
    "che_r_tf600"

  ]
  constructor(public rs: ReportService,private authService: AuthService,public recieve:Common,private pt: PostTrend ,private pm:pagePostMethod) {
    




    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_CHE_PS":
          this.showNavigationButton = "true";
          break;
      }




   }


  }

  options: EChartsOption;
  options2:EChartsOption;
  totalFlowCollection:any ="CHEL_RES_TF";
  FlowCollection:any = "BR_CHE_RES_LVL"
  totalFlowTrendTag:any =   ["che_r_tf1100", "che_r_tf600"]
  flowTrendTag:any = ["che_r_fr1100","che_r_fr600","westChamber","eastChamber"]
  siteTitle:any = "Chelsea";
  recieveDate($event: any){
    this.isLoading = true
    var trend :any;
    this.range = $event;
    var start;
    var end
  
  
    this.pt.getFlowAndTotalFlowCollection(this.totalFlowCollection,this.FlowCollection,this.totalFlowTrendTag,this.flowTrendTag,start,end).then((data) => {
   
      trend = data;
  
      this.options = this.recieve.getOptionsBarAndLine2("Summit 1200 mm Flow Rate Ml",trend.FlowRateArr[0],"Greenbushes 600m Flow Rate Ml/d",trend.FlowRateArr[1],"Summit 1200 mm Total Flow Ml",trend.TotalFlowArr[0],"Greenbushes 600m  Total Flow Ml/d",trend.TotalFlowArr[1],"Ml","Ml/d")
      
      this.options2 = this.recieve.getOptionsForLine2("%","East Chamber", trend.FlowRateArr[3],"West Chamber", trend.FlowRateArr[2])
  
      this.isLoading = false;
    })
  
  
  }
  ngOnInit() {


    this.intervalLoop = this.pm.findPageData("nmbm_che_ps_res", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.che_r_ut)
    });





  }

  isLoading: boolean = true;

  ngOnDestroy(){
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();
    }
  }

}
