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
  selector: 'app-glendinningvaleftp',
  templateUrl: './glendinningvaleftp.component.html',
  styleUrls: ['./glendinningvaleftp.component.css']
})
export class GlendinningvaleftpComponent implements OnInit {
  variable :any= {}
  intervalLoop: any;
  showNavigationButton1:any = false
  showNavigationButton2:any = false
  constructor(private authService: AuthService,public recieve:Common,public rs: ReportService,private pm:pagePostMethod,private pt: PostTrend,  ) {}
  userSites:string[];
  public authListenerSubs!: Subscription;
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

  
			
			   case "NMB_GLEN_R":
            this.showNavigationButton2 = true;
            break;
      }
    }




    this.intervalLoop = this.pm.findPageDataForNewSites("nmbm_glen_FPT_WTW", "WTW_CurrentVals").subscribe((result) => {
      this.variable =  result;
  })
  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  trendNameTwo:any = "Pressure Data"
  siteTitle:any = "Glendinningvale"
  range:any;
  options1: EChartsOption;
  options2: EChartsOption;
  tfCollection:any = "NMBM_GLEN_TF_trend";
  collection:any = "NMBM_GLEN_Flow_trend";
  totalFlowTags :any = ["glen_FTP_WTW_Inlet_Total_Flow","glen_FTP_WTW_borehole_Total_Flow"];
  flowTags :any = ["glen_FTP_WTW_Inlet_Flow_Rate","glen_FTP_WTW_borehole_Flow_Rate","glen_FTP_WTW_Inlet_bar"];
  isLoading: boolean = true;
  recieveDate($event: any){
    var trend :any;
    this.range = $event;
    this.isLoading = true;
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collection,this.totalFlowTags,this.flowTags,start,end).then((data) => {

      trend = data;



      this.options1 = this.recieve.getOptionsBarAndLine2("Reservoir Inlet Flow Rate Ml/d",trend.FlowRateArr[0],"Boreholes Combined Flow Rate Ml/d",trend.FlowRateArr[1],"Reservoir Inlet Total Flow Ml",trend.TotalFlowArr[0],"Boreholes Combined Total Flow m³",trend.TotalFlowArr[1],"Ml  m³","Ml/d");
      this.options2 = Common.getOptionsForLine(this.options2, "Inlet Pressure bar", trend.FlowRateArr[2])
      this.isLoading = false;
    })

  }


  
}
