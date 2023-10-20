import { Component, OnInit } from '@angular/core';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';
import { pageBuilder } from 'src/app/class/pageBulder';

@Component({
  selector: 'app-rosedale',
  templateUrl: './rosedale.component.html',
  styleUrls: ['./rosedale.component.css']
})
export class RosedaleComponent implements OnInit {


  variablesMatric:any=[{}]

  constructor(public pbm:pageBuilderMethod,public pb:pageBuilder,) {
    this.pbm.getSiteData("WDNR_ROSE_RES_OUT01").then((result) => {
      this.variables =  result;


      this.variablesMatric=[
      {
        label:"Flow Rate",
        value:this.variables.flowrate1
      },
      {
        label:"Total Flow",
        value:this.variables.totaliser1
      },]
    })

   }
  variables:any = {}
  siteTitle:any ="Rosedale Reservoir"
  commsTitle:any = "Communication"
  statusTitle:any = "Status";
  intervalLoop:any

  ngOnInit() {

    this.intervalLoop = setInterval(() =>{
    this.pbm.getSiteData("WDNR_ROSE_RES_OUT01").then((result) => {
      this.variables =  result;


      this.variablesMatric=[
      {
        label:"Flow Rate",
        value:this.variables.flowrate1
      },
      {
        label:"Total Flow",
        value:this.variables.totaliser1
      },]
    })
  },600000)
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
