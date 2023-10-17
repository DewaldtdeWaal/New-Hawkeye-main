import { Component, OnInit } from '@angular/core';
import {pageBuilderMethod} from "src/app/Service-Files/pageBuilder/pageBuilder.service";
import { pageBuilder } from 'src/app/class/pageBulder';
@Component({
  selector: 'app-lee-samuals-drive',
  templateUrl: './lee-samuals-drive.component.html',
  styleUrls: ['./lee-samuals-drive.component.css']
})
export class LeeSamualsDriveComponent implements OnInit {
  variables:any = {}
  siteTitle:any ="Lee Samuals Drive"
  commsTitle:any = "Communication"
  statusTitle:any = "Status";
  testArr:any = [
    "wakeupperiod",
    "lastupdate",
    "battery_status",
    "pressure1",
    "totaliser1",
    "flowrate1",


  ]
  intervalLoop:any
  constructor(public pbm:pageBuilderMethod,public pb:pageBuilder,) {
    this.pbm.getSiteData("WDNR_LSAM_DMA_FLM01").then((result) => {
      this.variables =  result;

     // this.variables.comms = pageBuilder.getLastUpdate(this.variables.lastupdate, this.variables.wakeupperiod)


     console.log(this.variables)
    })
  }

  ngOnInit() {

    this.intervalLoop = setInterval(() =>{
      this.pbm.getSiteData("WDNR_LSAM_DMA_FLM01").then((result) => {
        this.variables =  result;

       // this.variables.comms = pageBuilder.getLastUpdate(this.variables.lastupdate, this.variables.wakeupperiod)


      })

    },600000)
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
