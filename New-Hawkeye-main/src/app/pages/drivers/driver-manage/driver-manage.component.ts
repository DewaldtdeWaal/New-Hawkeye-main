import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from'@angular/router';
import { createDriverService } from 'src/app/Service-Files/Driver/addDriver.service';
export interface PeriodicElement {
  ipAdderess:any;
  driverName:any;
  description:any;
  siteType:any;
}
@Component({
  selector: 'app-driver-manage',
  templateUrl: './driver-manage.component.html',
  styleUrls: ['./driver-manage.component.css']
})
export class DriverManageComponent implements OnInit {
  ipAdderess:any
  driverName:any
  description:any
  siteType:any

  driverNavigation:any

  constructor(private CDS: createDriverService,private router: Router) { }

  dataSource:any;
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns :string[]= ['ipAdderess', 'driverName', 'description','siteType']
  filterValue: any="";

  clickedRows = new Set<PeriodicElement>();
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {

    this.CDS.GetDriverValue().subscribe(data => {

      var trend:any

      trend= data



      this.ipAdderess = trend.ipAddress_Arr
      this.driverName = trend.driverName_Arr
      this.description = trend.description_Arr
      this.siteType = trend.siteType_Arr


      for (var i = 0; i< this.siteType.length; i++){

        this.ELEMENT_DATA[i] = {
          ipAdderess:this.ipAdderess[i],
          driverName:this.driverName[i],
          description:this.description[i],
          siteType:this.siteType[i],
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

 getDriver(){

  for (let entry of this.clickedRows) {
    console.log("applyFilter")
    console.log(entry.driverName)
    this.driverNavigation=(entry.driverName);
 }
this.CDS.manageDrive= this.driverNavigation
this.CDS.sendDriverInfo(this.driverNavigation)

setTimeout(() => {
 this.router.navigate(['hawkeye/drivers/driverEdit'])
}, 1000);
}

}
