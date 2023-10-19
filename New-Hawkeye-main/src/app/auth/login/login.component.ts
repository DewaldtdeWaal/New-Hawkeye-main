import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../../Service-Files/auth.service";
import { Subscription } from 'rxjs';
import { ServerURLService } from 'src/app/Service-Files/server-url.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  userIsAuthenticated =false;
  private authListenerSubs: Subscription;
  data:any=[]

  constructor(public SUS:ServerURLService,public authService: AuthService) {




}


ngOnInit() {



console.log("test")
  this.userIsAuthenticated=this.authService.getIsAuth();

  this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {

this.isLoading=false;
    }
     );
}

ngOnDestroy(){

}


  onLogin(form: NgForm){
    if (form.invalid) {

      return;
    }
    this.isLoading=true;
    this.authService.error=false;
    var email = form.value.email;

    console.log("Email")
    //email=email.toLowerCase()
    console.log(email)
    this.authService.login('','',1111111111,'',email,form.value.password,[])


  }

  openSnackBar() {
    this.authService.error=false;
    };


}
