import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {RosedaleService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-rosedale-res',
  templateUrl: './rosedale-res.component.html',
  styleUrls: ['./rosedale-res.component.css']
})
export class RosedaleResComponent implements OnInit {
  comms: string;
  data: any=[];
   intervalLoop: any

   tagArr:any=[
    "rd_r_lvl",
"rd_r_ut"
   ]
   variable:any ={
    rd_r_lvl:null,
rd_r_ut:null,
   }

  constructor(private webSocketService: WebSocketService, private rds: RosedaleService,public recieve:Common,private pm:pagePostMethod ) {



      this.pm.findPageData("nmbm_rd_r", "R_CurrentVals").then((result) => {
        this.data =  result;
        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

       this.comms = Common.getLastUpdate(this.variable.rd_r_ut)

      });

   }







  ngOnInit() {

    var tagVals:any=[]
    var tagArr =[
      'rd_r_ut',//0
      'rd_r_lvl'//1


    ]

    tagVals = this.recieve.recieveNMBMVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      this.pm.findPageData("nmbm_rd_r", "R_CurrentVals").then((result) => {
        this.data =  result;
        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

       this.comms = Common.getLastUpdate(this.variable.rd_r_ut)

      });
    },60000);



    var num:any;

  //   this.webSocketService.nmbm_listen('rd_r_lvl').subscribe((data)=>{
  //   num=data;
  //   localStorage.setItem("rd_r_lvl",num.rd_r_lvl);
  //   this.rd_r_lvl=num.rd_r_lvl;
  // })


  // this.webSocketService.nmbm_listen('rd_r_ut').subscribe((data)=>{
  //   num=data;
  //   localStorage.setItem("rd_r_ut",num.rd_r_ut);
  //   this.rd_r_ut=num.rd_r_ut;

  //   var updateTime = this.rd_r_ut
  //   var  updateTimeMS =Date.parse(updateTime)

  //         var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
  //        var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
  //        var dateminus5minMS = cuurentDateMS - 300000

  //         if (updateTimeMS>dateminus5minMS){
  //           this.comms = "OK"
  //         }
  //         else{
  //           this.comms = "NOT OK"}
  //  });
  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
