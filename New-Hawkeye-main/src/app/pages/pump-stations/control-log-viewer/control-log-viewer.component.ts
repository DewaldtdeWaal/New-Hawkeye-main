import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { ControlLogService } from 'src/app/Service-Files/control-log.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
 name:string
  date: string;
  //site: string;
  pump: string;
  description: string;


}
@Component({
  selector: 'app-control-log-viewer',
  templateUrl: './control-log-viewer.component.html',
  styleUrls: ['./control-log-viewer.component.css']
})



export class ControlLogViewerComponent implements OnInit {
  displayedColumns = [
  'name',
    'date',
    'pump',
    'description',
    'star',

  ];

  siteName = ""
  name_arr:any[]
  date_arr:any[]
  site_arr:any[]
  pump_arr:any[]
  description_arr:any[]

  dataSource:any;
  ELEMENT_DATA: PeriodicElement[]=[]
  constructor(private router: Router,private location: Location,private cl:ControlLogService) {

    setTimeout(() => {

    this.name_arr = this.cl.getName()
console.log(this.name_arr)
    this.date_arr = this.cl.getDate()
    console.log(this.date_arr)
    this.site_arr = this.cl.getSite()
    this.pump_arr = this.cl.getPump()
    this.description_arr = this.cl.getDescription()

for (let i = 0; i < this.site_arr.length; i++) {
  console.log(this.name_arr[i])

    this.ELEMENT_DATA[i] = {
      name:this.name_arr[i],
      date:this.date_arr[i],
      pump:this.pump_arr[i],
      description:this.description_arr[i],
    }
}
 this.siteName = this.site_arr[0]
this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    }, 1000);


    this.dataSource = this.ELEMENT_DATA;
   }

  ngOnInit(){
  }

  back(){
    this.location.back()
  }


}
