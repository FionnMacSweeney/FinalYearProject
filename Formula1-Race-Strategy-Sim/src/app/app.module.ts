import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

// AngularFire imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Firebase configuration
const firebaseConfig = {
  projectId: "fionn-fyp-formula1",
  appId: "1:213016458092:web:b96a279bd1bbbe954b3949",
  storageBucket: "fionn-fyp-formula1.appspot.com",
  apiKey: "AIzaSyCb2OnbE2RlYSLt76PYH4Co2sP8NMfimkg",
  authDomain: "fionn-fyp-formula1.firebaseapp.com",
  messagingSenderId: "213016458092",
  measurementId: "G-M1EMG0WMMZ"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    FormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), // Initialize AngularFire with firebaseConfig
    AngularFireAuthModule,
    HttpClientModule, // Import the AngularFireAuthModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

