import { Component, OnInit } from '@angular/core';
import {bushyService}  from 'src/app/Service-Files/Reservoir/reservoir.service';
import { Common } from 'src/app/class/common';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';

@Component({
  selector: 'app-bushypark-fpt',
  templateUrl: './bushypark-fpt.component.html',
  styleUrls: ['./bushypark-fpt.component.css']
})
export class BushyparkFptComponent implements OnInit {
  data:any = []
  intervalLoop:any;
  variable :any= {

  bush_UT:null,
  bush_church_socco_fr:null,
  bush_church_steel_fr:null,
  bush_church_socco_bar:null,
  bush_church_steel_bar:null,
  bush_pump_fr:null,
  bush_gw_comb_flow_rate:null,
  bush_tank_lvl:null,
  comms:null,
  bush_gw_TF:null,
bush_ps_TF:null,
bush_church_steel_TF:null,
bush_church_soco_TF:null,
}
userSites:string[];
showNavigationButton: string;
tagArr:any = [
  "bush_UT",
  "bush_church_socco_fr",
  "bush_church_steel_fr",
  "bush_church_socco_bar",
  "bush_church_steel_bar",
  "bush_pump_fr",
  "bush_gw_comb_flow_rate",
  "bush_tank_lvl",
"bush_church_steel_TF",
"bush_church_soco_TF",
"bush_ps_TF",
"bush_gw_TF",
];

public authListenerSubs!: Subscription;
constructor(public recieve:Common,private authService: AuthService,private pm:pagePostMethod,private pt: PostTrend, ) {



}

ngOnInit() {

  this.intervalLoop = this.pm.findPageData("nmbm_bush_r", "R_CurrentVals").subscribe((result) => {
    this.data =  result;
    console.log(this.data)
    this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
    this.variable.comms = Common.getLastUpdate(this.variable.bush_UT)

 })



}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
});

totalFlowTags:any =["bush_church_soco_TF","bush_church_steel_TF","bush_gw_TF","bush_ps_TF"]
flowTags:unknown = ["bush_church_socco_fr","bush_church_steel_fr", "bush_gw_comb_flow_rate","bush_pump_fr"] 
tfCollection:any = "NMB_BUSH_FR"
collection:any = "NMB_BUSH_FlowRate"
siteTitle:any="Bushy Park"
isLoading: boolean = true;
options1: EChartsOption;
options2: EChartsOption;
trendNameOne:string = "Churchill Flows";
trendNameTwo:string = "Bushy Park Flows"
recieveDate($event: any){
  this.isLoading = true
 var trend :any;
 this.range = $event;

 const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

 this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collection,this.totalFlowTags,this.flowTags,start,end).then((data) => {
   trend=data

   console.log(trend)
   this.options1 = this.recieve.getOptionsBarAndLine2("Soccomon Pipe Flow Rate Ml/d",trend.FlowRateArr[0],"Steel Pipe Flow Rate Ml/d",trend.FlowRateArr[1],"Soccomon Pipe Total Flow Ml",trend.TotalFlowArr[0],"Steel Pipe Total Flow Ml",trend.TotalFlowArr[1],"m³","Ml/d")

   this.options2 = this.recieve.getOptionsBarAndLine2("Borehole Combined Flow Rate Ml/d", trend.FlowRateArr[2],"Pumpstation Flow Rate Ml/d", trend.FlowRateArr[3],"Borehole Combined Total Flow Ml", trend.TotalFlowArr[2],"Pumpstation Total Flow Ml", trend.TotalFlowArr[3],"Ml","Ml/d")


   this.isLoading = false;

})


}
}
