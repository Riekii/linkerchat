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
import { FallbackimagesDirective } from './directives/fallbackimages.directive';
import { LoginComponent } from './component/pantallas/login/login.component';

import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './component/pantallas/profile/profile.component';
import { SearchComponent } from './component/pantallas/search/search.component';
import { ChatComponent } from './component/pantallas/chat/chat.component';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { IndexComponent } from './component/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreauserComponent,
    FallbackimagesDirective,
    LoginComponent,
    ProfileComponent,
    SearchComponent,
    ChatComponent,
    NavbarComponent,
    IndexComponent
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
  providers: [
    FallbackimagesDirective,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
