import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatSortModule,Sort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Service-Files/admin.service';



export interface PeriodicElement {
  firstName: string;
  secondName: string;
  contactNumber: number;
  userEmail: string;
}


@Component({
  selector: 'app-nmbm-manage-accounts',
  templateUrl: './nmbm-manage-accounts.component.html',
  styleUrls: ['./nmbm-manage-accounts.component.css']
})
export class NmbmManageAccountsComponent implements OnInit {


  firstName:any;
  secondName:any;
  contactNumber:any;
  idNumber:any;
  supervisorEmail:any;
  userEmail:any;
  userSites: any;

  filterValue: any="";
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns :string[]= ['firstName', 'secondName', 'userEmail']
  dataSource:any;
  clickedRows = new Set<PeriodicElement>();
  email:any;

  @ViewChild(MatSort) sort: MatSort;
  Event0(firstName:any){
    console.log("Button CLicked")
  }

  constructor(public as: AdminService,private router: Router) {}




get_edit_user(){
  for (let entry of this.clickedRows) {
     this.email=(entry.userEmail);
  }
this.as.uEmail= this.email
this.as.edit_user_account(this.email)

setTimeout(() => {
  this.router.navigate(['hawkeye/sub-admin/nmbm-manage-accounts/nmbm-edit-accounts'])
}, 1000);
}

  ngOnInit(){


    this.as.Get_Sub_Users().subscribe(data =>{
      var trend:any

      trend= data
      console.log(trend);

    this.firstName = trend.firstname_Arr;
    this.secondName = trend.secondName_Arr;
    this.contactNumber = trend.contactNumber_Arr;
   // this.idNumber = trend.idNumber_Arr;
    this.supervisorEmail = trend.supervisorEmail_Arr;
    this.userEmail = trend.userEmail_Arr;
    for (var i = 0; i< this.firstName.length; i++){

this.ELEMENT_DATA[i] = {
  firstName:this.firstName[i],
  secondName:this.secondName[i],
  contactNumber:this.contactNumber[i],
  userEmail:this.userEmail[i],
} }

this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
this.dataSource.sort = this.sort;
this.dataSource.filter = this.filterValue.trim().toLowerCase();
    })
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = this.filterValue.trim().toLowerCase();
 }

}
