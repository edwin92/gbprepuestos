import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

//import { AuthService } from '../../providers/auth.service';
import { AuthService } from "../providers/auth.service";

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any = LoginPage;

  pages: PageInterface[] = [
      { title: 'Home', name: 'HomePage', component: HomePage, icon: 'log-in' },
      { title: 'List', name: 'ListPage', component: ListPage, icon: 'log-in' }
  ];

  loggedOutPages: PageInterface[] = [
      { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' }
  ];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });    

    console.log(this.auth.isLoggedIn());
    if (this.auth.isLoggedIn()) {
      this.rootPage = HomePage;
    }
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
