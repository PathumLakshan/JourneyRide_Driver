import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GAuthenticateService } from '../services/g-auth/gauthentication.service';
import { NotificationService } from '../services/notification/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  newUser: any;

  validationMessages = {
    user_id: [
      { type: 'required', message: 'Reg code is required.' }
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private navctrl: NavController,
              private authService: GAuthenticateService,
              ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user_id: ['']
    });
  }

  async login(value) {
    this.newUser = JSON.stringify(value);
    this.authService.loginmethod(this.newUser);
  }

}
