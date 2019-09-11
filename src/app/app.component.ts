import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { GAuthenticateService } from './services/g-auth/gauthentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  

  ownerId: number;

  public appPages = [
    {
      title: 'Home',
      url: '/home/tab1',
      icon: 'home'
    },
    {
      title: 'Available Trips For You',
      url: '/home/tab2',
      icon: 'list'
    },
    {
      title: 'Accepted Trips',
      url: '/home/tab3',
      icon: 'contacts'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authenticationService: GAuthenticateService
  ) {
    this.initializeApp();
    this.platform = platform;
  }
  
  backButtonSubscription;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.checkToken();
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  async logoutButton() {
    this.authenticationService.logoutmethod();
  }

}
