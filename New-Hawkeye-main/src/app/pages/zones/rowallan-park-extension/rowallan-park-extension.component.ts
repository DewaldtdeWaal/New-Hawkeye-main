import { Component, OnInit } from '@angular/core';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';
import { pageBuilder } from 'src/app/class/pageBulder';

@Component({
  selector: 'app-rowallan-park-extension',
  templateUrl: './rowallan-park-extension.component.html',
  styleUrls: ['./rowallan-park-extension.component.css']
})
export class RowallanParkExtensionComponent implements OnInit {


  variablesMatric:any=[{}]

  constructor(public pbm:pageBuilderMethod,public pb:pageBuilder,) {
    this.pbm.getSiteData("WDSR_ROWP_DMA_FLM01").then((result) => {
      this.variables =  result;

      this.variablesMatric=[{
        label:"Pressure",
        value:this.variables.pressure1
      },
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
  siteTitle:any ="Rowallan Park Extension"
  commsTitle:any = "Communication"
  statusTitle:any = "Status";
  intervalLoop:any

  ngOnInit() {

    this.intervalLoop = setInterval(() =>{
    this.pbm.getSiteData("WDSR_ROWP_DMA_FLM01").then((result) => {
      this.variables =  result;

      this.variablesMatric=[{
        label:"Pressure",
        value:this.variables.pressure1
      },
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
