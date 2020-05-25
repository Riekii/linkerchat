import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';

import { environment } from 'src/environments/environment';
import { HomeComponent } from './component/home/home.component';
import { CreauserComponent } from './component/pantallas/creauser/creauser.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FallbackimagesDirective } from './directives/fallbackimages.directive'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreauserComponent,
    FallbackimagesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,

    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FallbackimagesDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
