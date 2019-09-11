import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GAuthenticateService } from '../services/g-auth/gauthentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  newUser: any;

  constructor(private formBuilder: FormBuilder, 
              private navctrl: NavController,
              private authService: GAuthenticateService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      reg_code: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    console.log(value);
    if (value) {
      this.navctrl.navigateForward('/home/tab1');
    }
  }

  login(value) {
    this.newUser = JSON.stringify(value);
    this.authService.loginmethod(this.newUser);
  }

}
