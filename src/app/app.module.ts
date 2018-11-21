import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BookListPage } from '../pages/book-list/book-list';
import { CdListPage } from '../pages/cd-list/cd-list';
import { LendBookPage } from '../pages/lend-book/lend-book';
import { LendCdPage } from '../pages/lend-cd/lend-cd';
import { MyThingsService } from '../services/myThings.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BookListPage,
    CdListPage,
    LendBookPage,
    LendCdPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BookListPage,
    CdListPage,
    LendBookPage,
    LendCdPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MyThingsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
