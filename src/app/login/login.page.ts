import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective} from '@angular/forms';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private navctrl: NavController) { }

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

}
