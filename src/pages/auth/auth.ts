import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit {

  mode: string;
  authForm: FormGroup;
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private menuCtrl: MenuController,
              private authService: AuthService) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }
  
  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;

    if (this.mode === 'new')
      this.authService.signUpUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    else
      this.authService.signInUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }
}
