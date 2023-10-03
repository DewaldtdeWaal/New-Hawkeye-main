import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Service-Files/admin.service';
import { ServerURLService } from 'src/app/Service-Files/server-url.service';
import { TrendPickerService } from '../trendpicker.service';

export interface Preset {
  
  presetName: string;
  presetDescription: string;

}
@Component({
  selector: 'app-manage-preset',
  templateUrl: './manage-preset.component.html',
  styleUrls: ['./manage-preset.component.css']
})
export class ManagePresetComponent implements OnInit {


  userEmail:string=localStorage.getItem("userEmail")!
  presetName:string
  presetDecsription:string


  filterValue: any="";
  ELEMENT_DATA: Preset[] = [];
  displayedColumns :string[]= ['presetName', 'presetDescription']
  dataSource:any;
  clickedRows = new Set<Preset>();
  email:any;

  @ViewChild(MatSort) sort: MatSort;



  constructor(private ts:TrendPickerService, public as: AdminService,private router: Router,private http: HttpClient,private su: ServerURLService) {
  this.userEmail =localStorage.getItem("userEmail")!;
  console.log(this.userEmail)
  }




  get_edit_Preset(){
  for (let entry of this.clickedRows) {
     this.presetName=(entry.presetName);
  }


  this.ts.editUserPreset(this.userEmail,this.presetName)


setTimeout(() => {
  this.router.navigate([ 'hawkeye/trends/edit-preset'])
}, 1000);
}

  ngOnInit(){

    let info ={
      userEmail: this.userEmail,
    }
    this.http.post( this.su.serverURL+"/get-user-presets", info).subscribe( rsp=>{
       var data:any 
       data = rsp
    for (var i = 0; i< data.record.length; i++){
      this.ELEMENT_DATA[i] = {
        presetName:data.record[i].presetName,
        presetDescription: data.record[i].presetDescription
      }
    }
   
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
      },
  
    )




  }





  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = this.filterValue.trim().toLowerCase();
 }

}
