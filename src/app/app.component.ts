import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
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
    private router: Router
  ) {
    this.initializeApp();
    this.platform = platform;
  }
  backButtonSubscription;
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.router.navigate(['login']);
    });
  }

  exit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator[`app`].exitApp();
    });
  }

  logoutButton() {
    alert('Are you sure !')
  }
}
