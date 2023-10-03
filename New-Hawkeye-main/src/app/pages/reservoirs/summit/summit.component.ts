import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {SummitService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';

// Maake a special method for summit
@Component({
  selector: 'app-summit',
  templateUrl: './summit.component.html',
  styleUrls: ['./summit.component.css']
})
export class SummitComponent implements OnInit {

  sm_r_lvl:any
  sm_fm_fr:any
  sm_fm_tf:any
  sm_ut:any
  sm_ut_flowmeter:any
  comms: string;
  flowcomms:string;
  data: any=[];
   intervalLoop: any


  constructor(private webSocketService: WebSocketService, private SS: SummitService,private pm:pagePostMethod) {


    this.SS.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       console.log(this.data)
       this.sm_r_lvl  = this.data.routingArray[0].sm_r_lvl
       this.sm_fm_fr  = this.data.routingArray[0].sm_fm_fr
       this.sm_fm_tf  = this.data.routingArray[0].sm_fm_tf
      this.sm_ut = this.data.routingArray[0].sum_UT


    })

    setTimeout(() => {
      var updateTime = this.sm_ut
      var updateTimeMS =Date.parse(updateTime)
      var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
      var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
      var dateminus5minMS = cuurentDateMS - 300000


      if(this.sm_ut_flowmeter==undefined || this.sm_ut_flowmeter==null){
        this.sm_ut_flowmeter="February 15 2021 15:40"
      }

      var updateFlowTime = this.sm_ut_flowmeter
      var updateFlowTimeMS =Date.parse(updateFlowTime)
      var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
      var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
      var dateminusflow5minMS = cuurentDateMS - 300000

  if(updateTime.length ==0){}
  else{
      if (updateTimeMS>dateminus5minMS)
      { this.comms = "OK" }
      else{ this.comms = "NOT OK"}}




    if(updateFlowTime.length ==0){}
    else{
        if (updateFlowTimeMS>dateminusflow5minMS)
        { this.flowcomms = "OK" }
        else{ this.flowcomms = "NOT OK"}}





    },1000)
  }

  recieveVals(tagArr: any[]){
    var tagVals:any = []
    for(let i = 0; i<tagArr.length ;i++){
      this.webSocketService.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
        tagVals[i] = data[tagArr[i]];

      })
    }
    return tagVals
  }
  ngOnInit(){


    var tagVals:any=[]
    var tagArr =[
      'sum_UT',//0
      'sm_fm_tf',//1
      'sm_r_lvl',//2
      'sm_fm_fr',//3
      'sm_ut' //4 this is from the flow meter


    ]

    tagVals = this.recieveVals(tagArr)

    var updateTemp:any;
    var updateFlowTime:any;
    var updateFlowTimeMS:any
    var dateminusflow5minMS:any
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){

        this.sm_ut = tagVals[0];
        this.sm_fm_tf  = tagVals[1];
        this.sm_r_lvl = tagVals[2];
        this.sm_fm_fr =  tagVals[3];
        this.sm_ut_flowmeter= tagVals[4];





      }
      if(this.sm_ut_flowmeter==undefined || this.sm_ut_flowmeter==null){
        this.sm_ut_flowmeter="February 15 2021 15:40"
      }


      var updateTime = this.sm_ut
      var updateTimeMS =Date.parse(updateTime)
      var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
      var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
      var dateminus5minMS = cuurentDateMS - 300000


      var updateFlowTime = this.sm_ut_flowmeter
      var updateFlowTimeMS =Date.parse(updateFlowTime)
      var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
      var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
      var dateminusflow5minMS = cuurentDateMS - 300000

  if(updateTemp.length ==0){}
  else{
      if (updateTimeMS>dateminus5minMS)
      { this.comms = "OK" }
      else{ this.comms = "NOT OK"}}
      updateTemp = sessionStorage.getItem("sum_UT");



    if(updateFlowTime.length ==0){}
    else{
        if (updateFlowTimeMS>dateminusflow5minMS)
        { this.flowcomms = "OK" }
        else{ this.flowcomms = "NOT OK"}}
        updateFlowTime = sessionStorage.getItem("sm_ut");


      },30000);




  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
