import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../Service-Files/users.service';


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  userId: any;


  constructor(public userService: UsersService, url: ActivatedRoute) { }

  ngOnInit(){

  }


  onEditPassword(form: NgForm){
    // if (form.invalid) {
    //   return;
    // }
      this.userService.editPassword(form.value.cPassword, form.value.nPassword)
      //form.resetForm();
    }

    closeSnackBar() {
      this.userService.error=false;
      this.userService.editPasswordSuccess=false;

      };




}
