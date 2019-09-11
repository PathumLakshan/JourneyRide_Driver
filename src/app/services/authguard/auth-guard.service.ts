import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';
import { GAuthenticateService } from '../g-auth/gauthentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authenticationServce: GAuthenticateService) { }

  canActivate(): boolean {
    return this.authenticationServce.authenticationState.value;
  }
}
