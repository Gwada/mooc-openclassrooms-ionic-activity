import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import * as firebase from 'firebase';
import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp
{
  tabsPage:any = TabsPage;
  settingsPage: any = SettingsPage;
  authPage: any = AuthPage;

  isAuth: boolean;

  @ViewChild('content') content: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController)
  {
    platform.ready().then(
      () => {
        var config = {
          apiKey: "AIzaSyCr2s3zOwbJWbpaqJecenXoymCPsfoGCQk",
          authDomain: "mooc-oc-ionic-activity-2.firebaseapp.com",
          databaseURL: "https://mooc-oc-ionic-activity-2.firebaseio.com",
          projectId: "mooc-oc-ionic-activity-2",
          storageBucket: "mooc-oc-ionic-activity-2.appspot.com",
          messagingSenderId: "454648409696"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(
          (user) => {
            if ((this.isAuth = user ? true : false))
              this.content.setRoot(TabsPage);
            else
              this.content.setRoot(AuthPage, {mode: 'connect'});
          }
        );

        statusBar.styleDefault();
        splashScreen.hide();
      }
    );
  }

  onNavigate(page: any, data?: {})
  {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }

  onDisconnect()
  {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}
