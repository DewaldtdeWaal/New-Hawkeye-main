import { Component, OnInit } from '@angular/core';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { Common } from 'src/app/class/common';
@Component({
  selector: 'app-malibar',
  templateUrl: './malibar.component.html',
  styleUrls: ['./malibar.component.css']
})
export class MalibarComponent implements OnInit {

  variable :any= {
    mali_ut:null,
    mali_lvl:null,
    comms:null
    }

    intervalLoop: any
    tagArr:any =[

      "mali_ut",
      "mali_lvl"

    ]
    data: any=[];

  constructor(public recieve:Common,private pm:pagePostMethod) {



  }

  ngOnInit() {

    this.intervalLoop = this.pm.findPageData("nmbm_mali_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.mali_ut)
    });


  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
