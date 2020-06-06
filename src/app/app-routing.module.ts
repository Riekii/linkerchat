import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CreauserComponent } from './component/pantallas/creauser/creauser.component';
import { LoginComponent } from './component/pantallas/login/login.component';
import { ProfileComponent } from './component/pantallas/profile/profile.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'creauser', component: CreauserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/creauser', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 