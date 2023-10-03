import {MatDialog} from '@angular/material/dialog';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  userIsAuthenticated =false;
  userSites:string[];

  firstName: string;
  secondName: string;
  latitude:any;
  longitude:any;

  private authListenerSubs!: Subscription;

  constructor(public dialog: MatDialog, private authService: AuthService) {}
  panelOpenState = false;

  ngOnInit() {
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.firstName = this.authService.getFirstName();
    this.secondName= this.authService.getSecondName();
    this.userSites = this.authService.getUserSites();

    console.log(this.userSites)


    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userSites = this.authService.getUserSites();
        this.firstName = this.authService.getFirstName();
        this.secondName= this.authService.getSecondName();


      });


  }
  // onLogout() {
  //   this.authService.logout();
  // }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  getGPSLocation(){
    if (window.isSecureContext) {
      // Page is a secure context so service workers are now available
      navigator.serviceWorker.register("http://allelectrical.dyndns.org:4200/hawkeye/home").then(function () {
        console.log( 'success')
      });}



    if (!navigator.geolocation){
      console.log('Location is not Supported')
    }

   navigator.geolocation.getCurrentPosition((pos) =>{
      this.latitude =`${pos.coords.latitude}`
      this.longitude=`${pos.coords.longitude}`
     console.log( 'Latitude:' + this.latitude )
     console.log( 'Longitude:' + this.longitude )
   }, (err) =>{
     console.log(err)
   },{
     enableHighAccuracy:true,
     timeout:5000,
     maximumAge:0
   }

   )
  }
}


