import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ItemFilterPage } from '../pages/item-filter/item-filter';
import { CardPreKidsPage } from '../pages/card-pre-kids/card-pre-kids';

import { StatusBar } from '@ionic-native/status-bar';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth.service';
import { ListService } from '../providers/list.service';
import { TemporalService } from '../providers/temporal.service';
import { SaveService } from '../providers/save.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ItemFilterPage,
    CardPreKidsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ItemFilterPage,
    CardPreKidsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    TemporalService,
    SaveService,
    ListService,
    SplashScreen,
    StatusBar
  ]
})
export class AppModule {}
