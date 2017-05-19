import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  login: {username?: string, password?: string} = {};
  isLogged: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth:AuthService) {}

  Signup(form: NgForm) {
    if (form.valid) {
      let f = this.login;
      this.auth.login(f)
        .subscribe(
          rs => this.isLogged = rs,
          er => console.log(er),
          () => {
            if (this.isLogged){
              this.navCtrl.setRoot(HomePage)
              .then(data => console.log(data),
              error => console.log(error));
            } else {
              console.log('Acceso denegado');
            }
          }
        )
    }
  }
}