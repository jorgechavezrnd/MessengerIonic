import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ConversationPage } from '../pages/conversation/conversation';
import { UserService } from '../services/user.service';
import { SearchPipe } from '../pipes/search';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Camera } from "@ionic-native/camera";
import { Geolocation } from "@ionic-native/geolocation";
import { HttpClientModule } from "@angular/common/http";
import { RequestService } from '../services/request.service';
import { ComponentsModule } from '../components/components.module';
import { ConversationService } from '../services/conversation.service';
import { Vibration } from "@ionic-native/vibration";

export const firebaseConfig = {
  apiKey: "AIzaSyDEAlC6Fy8a9Q5OqdRDQGetFYHcgR7Ws_E",
  authDomain: "platzinger-d96b2.firebaseapp.com",
  databaseURL: "https://platzinger-d96b2.firebaseio.com",
  projectId: "platzinger-d96b2",
  storageBucket: "platzinger-d96b2.appspot.com",
  messagingSenderId: "163581317645"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ProfilePageModule,
    AngularFireStorageModule,
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    Camera,
    Geolocation,
    ConversationService,
    Vibration,
    RequestService
  ]
})
export class AppModule {}
