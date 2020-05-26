import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CreauserComponent } from './component/pantallas/creauser/creauser.component';
import { LoginComponent } from './component/pantallas/login/login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'creauser', component: CreauserComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/creauser', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 