import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { StorageService } from '../app/services/storage/storage.service';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

const URL = environment.url + 'bll/owner/available_trips.php';

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
    private storageService: StorageService,
    private httpService: HttpClient
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
    this.loadInitialData();
  }

  exit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator[`app`].exitApp();
    });
  }

  logoutButton() {
    alert('Are you sure !');
  }

  loadInitialData() {
    this.ownerId = 62;
    this.httpService.post(URL, this.ownerId).subscribe((res) => {
      console.log(res);
    });
  }
}
