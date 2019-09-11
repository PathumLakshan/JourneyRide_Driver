import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { BehaviorSubject, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../notification/notification.service';


const URL       = environment.url + 'login_using_uid.php';
 
@Injectable()
export class GAuthenticateService {

  authenticationState = new BehaviorSubject(false);
  user = null;

  constructor(private storageService: StorageService,
              private loadingController: LoadingController,
              private httpClient: HttpClient,
              private notify: NotificationService,
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

    return from(this.httpClient.post(URL, value)).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      
      if (res[`success`] == 1){
        this.storageService.setStorageData('user_token', res[`uid`]).then(() => {
          this.checkToken();
        });

        this.storageService.setStorageData('ownerId', res[`owner_id`]).then(() => { });
      } else {
        this.notify.showErrorAlert('Wrong Reg Code Try again !')
      }
    });


  }

  async logoutmethod() {

    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Loggin out...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    return from(this.storageService.clearStorageData()).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      console.log(res);
      this.checkToken();
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