import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule } from '@angular/core';
import { ORIGIN as FUNCTIONS_ORIGIN, NEW_ORIGIN_BEHAVIOR } from '@angular/fire/functions';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    { provide: NEW_ORIGIN_BEHAVIOR, useValue: true },
    { provide: FUNCTIONS_ORIGIN, useFactory: () => isDevMode() ? undefined : location.origin }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
