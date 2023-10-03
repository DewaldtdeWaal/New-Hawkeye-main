import { Component, OnInit } from '@angular/core';
import {malibarService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
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

  constructor( private mali: malibarService,private authService: AuthService,public recieve:Common,private pm:pagePostMethod) {
    this.mali.GetSiteValues()
    .subscribe(rsp => {

      this.data = rsp;
      this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)

      console.log(this.variable)

      this.variable.comms = Common.getLastUpdate(this.variable.mali_ut)
    })
  }

  ngOnInit() {

    var tagVals:any=[]


    tagVals = this.recieve.recieveNMBMVals(this.tagArr);


    this.intervalLoop = setInterval(() =>{
      this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);

      this.variable.comms = Common.getLastUpdate(this.variable.mali_ut)

      console.log(this.variable)
    },10000);


  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
