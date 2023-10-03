import { Component, Input, OnInit } from '@angular/core';
import {OliphantskopService}from 'src/app/Service-Files/Reservoir/reservoir.service';
import {Common} from 'src/app/class/common';
import {pageBuilderMethod} from "src/app/Service-Files/pageBuilder/pageBuilder.service";
import { pageBuilder} from "src/app/class/pageBulder";
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';




@Component({

  selector: 'app-oliphantskop',
  template: `<div style="background-color: var(--page-background-color);">
             <div class="div-heading-title"><h1 style="padding-top: 8px; ">{{siteTitle}}</h1></div>
            <div class="wrapper-grid">
            <app-panel [array]="variables.commsMatrix" [communicationStatus]="variables.comms" [title]="title1"></app-panel>
            <app-res-panel [level]="variables.level1" [title]="title"></app-res-panel>
           </div>
           </div>`,
  styleUrls: ['./oliphantskop.component.css']
})

export class OliphantskopComponent implements OnInit {
  data: any=[];
  intervalLoop: any;

   tagArr:any =[
    "oli_ut",
    "oli_lvl",
    "batteryUnitUpdate"
  ]

  siteTitle:string = "Olifantskop";



  testArr:any = [
    "wakeupperiod",
    "lastupdate",
    "battery_status",
    "level1",
    "comms",
    "commsMatrix"
  ]

  lastUpdate:any
   jsonFormData:any;
  variables:any = {}
  title:string = "Reservoir";
  title1:string = "Communication";
  matrix:any = "This is the result"

  theme:any;


  jsonFile:string;

  constructor(public recieve:Common,public pbm:pageBuilderMethod, public pb:pageBuilder,private pm:pagePostMethod ) {
    this.theme = localStorage.getItem("theme");


    this.fillPage()

  }

   async fillPage(){

    pageBuilder.convertDate(this.variables)

    this.pbm.getSiteData("WBLK_OLIF_RES_BTU01",this.testArr,this.variables).then((result) => {
      this.variables =  result;
    });

   }

  ngOnInit() {}
  ngOnDestroy(){}
}

