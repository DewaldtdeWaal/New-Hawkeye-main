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


  constructor(private webSocketService: WebSocketService, private rds: RosedaleService,public recieve:Common,private pm:pagePostMethod ) {
    this.rds.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       console.log(this.data)
       this.rd_r_lvl  = this.data.routingArray[0].rd_r_lvl
       this.rd_r_ut  = this.data.routingArray[0].rd_r_ut

       this.comms = Common.getLastUpdate(this.rd_r_ut)


    })
   }

  rd_r_lvl:any
  rd_r_ut:any





  ngOnInit() {

    var tagVals:any=[]
    var tagArr =[
      'rd_r_ut',//0
      'rd_r_lvl'//1


    ]

    tagVals = this.recieve.recieveNMBMVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){



        this.rd_r_ut =  tagVals[0];
        this.rd_r_lvl =  tagVals[1];
        this.comms = Common.getLastUpdate(this.rd_r_ut)


      }
    },60000);



    var num:any;

    this.webSocketService.nmbm_listen('rd_r_lvl').subscribe((data)=>{
    num=data;
    localStorage.setItem("rd_r_lvl",num.rd_r_lvl);
    this.rd_r_lvl=num.rd_r_lvl;
  })


  this.webSocketService.nmbm_listen('rd_r_ut').subscribe((data)=>{
    num=data;
    localStorage.setItem("rd_r_ut",num.rd_r_ut);
    this.rd_r_ut=num.rd_r_ut;

    var updateTime = this.rd_r_ut
    var  updateTimeMS =Date.parse(updateTime)

          var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
         var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
         var dateminus5minMS = cuurentDateMS - 300000

          if (updateTimeMS>dateminus5minMS){
            this.comms = "OK"
          }
          else{
            this.comms = "NOT OK"}
   });
  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
