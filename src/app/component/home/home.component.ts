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

    this.openojo();
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

    const divchat = document.getElementById('divchat');
    const divuser = document.getElementById('divuser');
    const divojo = document.getElementById('divojo');

    divchat.style.backgroundColor = '#525252';
    divuser.style.backgroundColor = '#808080';
    divojo.style.backgroundColor = '#808080';

    ojodiv.style.opacity = '0';
    ojodiv.style.display = 'none';

    userdiv.style.opacity = '0';
    userdiv.style.display = 'none';

    chatdiv.style.opacity = '1';
    chatdiv.style.display = 'block';


  }
  public openuser(){
    const ojodiv = document.getElementById('ojodiv');
    const userdiv = document.getElementById('userdiv');
    const chatdiv = document.getElementById('chatdiv');

    const divchat = document.getElementById('divchat');
    const divuser = document.getElementById('divuser');
    const divojo = document.getElementById('divojo');

    divchat.style.backgroundColor = '#808080';
    divuser.style.backgroundColor = '#525252';
    divojo.style.backgroundColor = '#808080';

    ojodiv.style.opacity = '0';
    ojodiv.style.display = 'none';

    chatdiv.style.opacity = '0';
    chatdiv.style.display = 'none';

    userdiv.style.opacity = '1';
    userdiv.style.display = 'block';
  }
  public openojo(){
    const ojodiv = document.getElementById('ojodiv');
    const userdiv = document.getElementById('userdiv');
    const chatdiv = document.getElementById('chatdiv');

    const divchat = document.getElementById('divchat');
    const divuser = document.getElementById('divuser');
    const divojo = document.getElementById('divojo');

    divchat.style.backgroundColor = '#808080';
    divuser.style.backgroundColor = '#808080';
    divojo.style.backgroundColor = '#525252';

    userdiv.style.opacity = '0';
    userdiv.style.display = 'none';

    chatdiv.style.opacity = '0';
    chatdiv.style.display = 'none';

    ojodiv.style.opacity = '1'; 
    ojodiv.style.display = 'block';
  }

}
