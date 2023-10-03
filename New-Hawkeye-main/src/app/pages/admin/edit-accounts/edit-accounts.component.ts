import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addUser } from 'src/app/class/addUser';
import { AdminService } from 'src/app/Service-Files/admin.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';



import {siteMap,sitesAvailable} from 'src/app/class/addUser';
import { HttpClient } from '@angular/common/http';
import { ServerURLService } from 'src/app/Service-Files/server-url.service';


@Component({
  selector: 'app-edit-accounts',
  templateUrl: './edit-accounts.component.html',
  styleUrls: ['./edit-accounts.component.css']
})
export class EditAccountsComponent implements OnInit {

email:any;
  //Res Overview

  checked:any



public authListenerSubs!: Subscription;
resetPassword:any;;
firstName:any;
secondName:any;
contactNumber:any;
idNumber:any;
supervisorEmail:any;
userEmail:any;
password:any;
userSites:any;

mappy:any

prop:any



  constructor(public adminService: AdminService,private authService: AuthService,private router: Router,private http: HttpClient,private su: ServerURLService ) {  }


 reset_Password(form: NgForm){
  console.log( form.value.reset)
  if(form.value.reset==true)
  {
    this.resetPassword == true
  }
  else this.resetPassword = false
  console.log(this.resetPassword)
 }

  closeSnackBar() {
    this.adminService.editedUserSuccess=false;
    this.adminService.editedUserError=false;
    this.adminService.resetPasswordError=false;
    this.adminService.resetPasswordSuccess=false;
    };

    ngOnInit(){
      this.userEmail = this.adminService.getUserEmail()
    if(this.userEmail==null|| this.userEmail == undefined|| this.userEmail==""){
      this.router.navigate(['/admin/manage-accounts'])
    }

       this.firstName = this.adminService.getFirstName()
       this.secondName = this.adminService.getSecondName()
       this.contactNumber = this.adminService.getContactNumber()
       this.supervisorEmail= this.adminService.getSupervisorEmail()
       this.userSites= this.adminService.getUserSites()






      //const sites = siteMap

      this.checked = sitesAvailable

      this.mappy = siteMap;









      for (let site of this.userSites) {
        const prop = this.mappy[site];
        if (prop) {
          this.checked[prop] = true;
        }
      }

      }





  onEditUser(form: NgForm){
    if (form.invalid) {
      return;
    }

    var userSites:string[]=new Array();


    userSites = addUser.addSites(form);



if(form.value.nPassword !=null && form.value.cnPassword ){

}
     this.adminService.editedUser(this.userEmail,form.value.fName, form.value.sName, form.value.cNum,userSites);



     for (let site of userSites) {
      const prop = this.mappy[site];
      if (prop) {
        this.checked[prop] = false;
      }
    }
  }




  onResetPassword(){
     var newPassword = "6222886";
     this.adminService.resetUserPassword(newPassword, this.userEmail);
  }

  onDeleteAccount(){



    this.http.post(this.su.serverURL+"/delete-user-account", {
      userEmail:this.userEmail,



     }
   ).subscribe(  data=>{
    console.log(data)
  },)

 this.router.navigate(["hawkeye/admin/manage-accounts"])

     }





  }






