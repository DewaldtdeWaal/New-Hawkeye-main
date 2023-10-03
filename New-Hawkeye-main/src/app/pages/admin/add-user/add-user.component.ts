import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/Service-Files/admin.service';
import {addUser} from "src/app/class/addUser";
import { UsersService } from "../../../Service-Files/users.service";
import { concat } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import * as emailjs from 'emailjs-com';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  {


  superEmail: any;

  constructor(public adminService: AdminService,private authService:AuthService) { }

  closeSnackBar() {
    this.adminService.addUserError=false;
    this.adminService.AddUserSuccess=false;

    };
  onCreateUser(form: NgForm){
    if (form.invalid) {
      return;
    }
   var userSites: string[]=[];



   userSites = addUser.addSites(form);


   this.superEmail = this.authService.getUserEmail();

   console.log(this.superEmail);

     this.adminService.createUser(form.value.fName, form.value.sName, form.value.cNum, this.superEmail, form.value.email, form.value.password,userSites);
     form.resetForm();
  }










}


// TypeScript code for an email form component
// export class EmailFormComponent {

//   // Properties for the recipient, subject, and message of the email
//   recipient: string;
//   subject: string;
//   message: string;

//   // Constructor for this component, which is currently empty
//   constructor() {}

//   // Method for sending the email using EmailJS
//   sendEmail() {

//     // Create an object with template parameters needed to send the email
//     const templateParams = {
//       to_email: this.recipient,
//       subject: this.subject,
//       message: this.message
//     };

//     // Constants for the service ID, template ID, and user ID required by EmailJS
//     const serviceID = 'YOUR_EMAILJS_SERVICE_ID'; // Replace with your actual service ID
//     const templateID = 'YOUR_EMAILJS_TEMPLATE_ID'; // Replace with your actual template ID
//     const userID = 'YOUR_EMAILJS_USER_ID'; // Replace with your actual user ID

//     // Call the EmailJS "send" method, passing in the required parameters
//     emailjs.send(serviceID, templateID ,templateParams, userID)
//       .then((response) => {
//         // If the email was sent successfully, log a success message along with additional response details
//         console.log('SUCCESS!', response.status, response.text);
//       }, (error) => {
//         // If there was an error sending the email, log an error message along with the error object
//         console.log('FAILED...', error);
//       });
//   }
// }

