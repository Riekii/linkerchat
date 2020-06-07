import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CreauserComponent } from './component/pantallas/creauser/creauser.component';
import { LoginComponent } from './component/pantallas/login/login.component';
import { ProfileComponent } from './component/pantallas/profile/profile.component';
import { SearchComponent } from './component/pantallas/search/search.component';
import { ChatComponent } from './component/pantallas/chat/chat.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'creauser', component: CreauserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/creauser', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 