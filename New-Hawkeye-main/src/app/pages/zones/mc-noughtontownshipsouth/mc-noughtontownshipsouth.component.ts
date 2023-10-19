import { Component, OnInit } from '@angular/core';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';
import { pageBuilder } from 'src/app/class/pageBulder';

@Component({
  selector: 'app-mc-noughtontownshipsouth',
  templateUrl: './mc-noughtontownshipsouth.component.html',
  styleUrls: ['./mc-noughtontownshipsouth.component.css']
})
export class McNoughtontownshipsouthComponent implements OnInit {

  variables:any = {}
  siteTitle:any ="McNoughton Township South"
  commsTitle:any = "Communication"
  statusTitle:any = "Status";

  intervalLoop:any
  constructor(public pbm:pageBuilderMethod,public pb:pageBuilder,) {
    this.pbm.getSiteData("WDNR_MCNA_DMA_FLM01").then((result) => {
      this.variables =  result;






    })
  }

  ngOnInit() {

    this.intervalLoop = setInterval(() =>{
      this.pbm.getSiteData("WDNR_MCNA_DMA_FLM01").then((result) => {
        this.variables =  result;



      })

    },600000)



  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
