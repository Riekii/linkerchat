import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/firestore/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  public openchat(){
    const ojodiv = document.getElementById('ojodiv');
    const userdiv = document.getElementById('userdiv');
    const chatdiv = document.getElementById('chatdiv');

    ojodiv.style.opacity = '0';
    userdiv.style.opacity = '0';
    chatdiv.style.opacity = '1';
  }
  public openuser(){
    const ojodiv = document.getElementById('ojodiv');
    const userdiv = document.getElementById('userdiv');
    const chatdiv = document.getElementById('chatdiv');

    ojodiv.style.opacity = '0';
    chatdiv.style.opacity = '0';
    userdiv.style.opacity = '1';
  }
  public openojo(){
    const ojodiv = document.getElementById('ojodiv');
    const userdiv = document.getElementById('userdiv');
    const chatdiv = document.getElementById('chatdiv');

    userdiv.style.opacity = '0';
    chatdiv.style.opacity = '0';
    ojodiv.style.opacity = '1'; 
  }

}
