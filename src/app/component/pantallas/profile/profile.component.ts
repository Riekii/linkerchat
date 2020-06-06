import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/firestore/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  
  public myusername: string;
  public users = [];
  public documentId = null;
  public currentStatus = 1;
  public loaded: boolean;

  constructor(
    private firestoreService: UsuariosService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.comprobarcookies();

  }

  public comprobarcookies(){
    if (this.cookieService.get('myusername')){
      this.myusername = this.cookieService.get('myusername');
      console.log(this.myusername)
      this.loginUser();
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  public loginUser(){
    this.loaded = false;
    this.firestoreService.getUser(this.myusername).subscribe((userSnapshot) => {
      this.users = [];
      userSnapshot.forEach((userData: any) => {
        this.users.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      })
    });
  }


}
