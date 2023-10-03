import { Component, OnInit,Directive,ElementRef,HostListener,ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import {createDriverService} from 'src/app/Service-Files/Driver/addDriver.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { GetDriversService } from 'src/app/Service-Files/Driver/getDriver.service';
import { Router } from'@angular/router';
import {Driver} from 'src/app/Service-Files/Driver/addDriver.service'
import { HttpClient } from "@angular/common/http";
import { ServerURLService } from 'src/app/Service-Files/server-url.service';



//So how would I add this to a table
// export interface PeriodicElement {
//   count:number;
//   tagName: string;
//   description: string;
//   type: string;
//   unit:string;
//   wordSwap: boolean;
//   register: string;
//   trend:boolean;
//   period:string;

// }

let variableCreation: any[] = [];

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],

})


export class DriverComponent implements OnInit {

  checked = false;
  disabled = false;

  @ViewChild('myForm') myForm!:NgForm;
  @ViewChild('fontSize') fontSize:MatSelect;
  resetForm(form:NgForm) {
    form.resetForm();
  }
//So the clear Selection function should deselect the
  clearSelection(){
    this.fontSize.value = "";
  }

  onSiteType(event:any){
    this.siteTypeDropDownValue = event.value
  }

  response:any;
  message:any

  ipaddress:any;
  driverName:any;
  description:any;
  siteType:any;
  dataArray:any;
  tagName:any;

  siteDescription:any


  siteTypeOptions:any =  ['Reservoir', 'Pump Station', 'Ground Water', 'FPT', 'WTW']

    tagNameFill:any;
  descriptionNameFill:any;
  memoryWordFill:any;

  typeDropDownSelected:any;
  unitDropDownSelected:any;
  numberDropDownSelected:any;

  numberDropDownValue:any

  siteTypeDropDownValue:any
  typeDropDownValue:any
  periodDropDownValue:any
  unitDropDownValue:any
  word_swap_control:any = false;
  trend_control:any = false;
  selectedPeriod: any;

  unitFill:any

  periodDropDownSelecteds:any
  numberSelected:any

  constructor(private el:ElementRef,private su: ServerURLService,private http: HttpClient, private cdr:ChangeDetectorRef, private CDS: createDriverService,private router: Router,) {

  }

  filterValue: any="";
  @ViewChild(MatSort) sort: MatSort;
  dataSource:any;




  ngOnInit() {
    this.cdr.detectChanges();

  }



 async onSubmitToDataBase(form:NgForm){
    if(form.invalid){
      return;
    }








     const regexExpIP = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;




//I want to use the await keyword here
     this.response = this.createDriver(form.value.ipaddress, form.value.driverName, form.value.siteDescription, this.siteTypeDropDownValue, variableCreation, true)



     console.log(this.response)
  }



  async createDriver(  ipAddress:String,driverName:String,description:String,siteType:String,dataArray:any, updatedStatus:boolean){

    var response
    const driver: Driver = {
      ipAddress:ipAddress,
driverName:driverName,
description:description,
siteType:siteType,
dataArray:dataArray,
updatedStatus:updatedStatus};


this.http.post(this.su.serverURL+"/addDriver", driver)
.subscribe((response) => {

  this.response = response;

  this.message = this.response.message;

  console.log(this.response.message)

  if(this.message = "Driver added succesfully"){


    setTimeout(() => {
      this.router.navigate(['hawkeye/drivers/manageDriver'])
     }, 2000);
  }
  })




}}
