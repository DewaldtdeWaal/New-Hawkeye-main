import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/Service-Files/admin.service';
import {addUser} from "src/app/class/addUser";
import { UsersService } from "../../../Service-Files/users.service";
import { concat } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';


@Component({
  selector: 'app-nmbm-add-user',
  templateUrl: './nmbm-add-user.component.html',
  styleUrls: ['./nmbm-add-user.component.css']
})
export class NmbmAddUserComponent implements OnInit {

  superEmail:any
  constructor(public adminService: AdminService,private authService:AuthService) { }

  closeSnackBar() {
    this.adminService.addUserError=false;
    this.adminService.AddUserSuccess=false;

    };
  onCreateUser(form: NgForm){
    if (form.invalid) {
      return;
    }
    var userSites:string[]=new Array();





userSites = addUser.addSites(form);

 // This will make it an MNBN USER
userSites.push("USER_NMBM");


    this.superEmail = this.authService.getUserEmail();


     this.adminService.createUser(form.value.fName, form.value.sName, form.value.cNum,this.superEmail, form.value.email, form.value.password,userSites);
     form.resetForm();
  }




  ngOnInit() {
  }




}



