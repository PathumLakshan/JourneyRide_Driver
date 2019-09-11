import { Injectable } from '@angular/core';

import { NotificationService } from '../notification/notification.service';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const URL       = environment.url;
 
@Injectable()
export class GAuthenticateService {

  authenticationState = new BehaviorSubject(false);
  user = null;

  constructor(private storageService: StorageService,
              private loadingController: LoadingController,
              private httpClient: HttpClient
              ) { }

  async loginmethod(value) {
    console.log(value)
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Loggin in...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    return from(this.httpClient.post(URL + 'login_using_uid.php', value)).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      this.storageService.setStorageData('user_token', res[`uid`]).then(() => {
        this.checkToken();
      });
    });

  }

  checkToken() {
    this.storageService.getStorageData('user_token').then((token) => {
      if (token) {
        this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
      }
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}