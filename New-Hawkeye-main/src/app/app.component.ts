import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from './Service-Files/auth.service';
import { HttpClient } from "@angular/common/http";
import { NavigationStart, Router } from '@angular/router';
import { Subscription, fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WebSocketService } from './Service-Files/web-socket.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'HawkEye';

  showScroll = false;
  scrollThreshold = 300;
  hideThreshold = 10;

  private unsubscriber: Subject<void> = new Subject<void>();
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        console.log(browserRefresh);
      }
    });


  }


  onActivate(event:any){
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if(pos > 0){
        window.scrollTo(0, pos - 20);
      } else{
        window.clearInterval(scrollToTop);
      }
    }, 16)
  }

  ngOnInit() {
    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
        history.pushState(null, '');
      });

    this.authService.autoAuthUser();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }


}
