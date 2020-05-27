import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../../services/firestore/usuarios.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public introducido;
  public users = [];
  public documentId = null;
  public currentStatus = 1;
  public loginUserForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    id: new FormControl('')
  });
  public loaded: boolean;

  public imagen = '../../../../assets/imagenes/createuser/userdefault.png';
  public goodlogin: boolean;

  constructor(
    private firestoreService: UsuariosService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginUserForm.setValue({
      id: '',
      username: '',
      password: ''
    });
  }

  public loginUser(formData){
    this.loaded = false;
    this.firestoreService.getUser(formData.username, formData.password).subscribe((userSnapshot) => {
      this.users = [];
      userSnapshot.forEach((userData: any) => {
        this.users.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      })
      this.loginCookies(formData);
    });
  }

  public loginCookies(formData){
    this.loaded = true;
    if (this.users.length === 1){
      this.goodlogin = true;

      this.cookieService.set('myusername', formData.username , 90);
      this.cookieService.set('mypassword', formData.password );

      setTimeout(() => {
        this.router.navigate(['/home'])
      }, 1000);
    }
    else{
      this.goodlogin = false;
    }
  }



  public imagenVacia(event) {
    // TODO SOLUCIONAR ERROR
    const imgelemento = document.getElementById('userdefault');
    const imgurl: any = event.target.value;

    if (imgurl !== '') {
      this.imagen = imgurl;
    }
    else {
      this.imagen = '../../../../assets/imagenes/createuser/userdefault.png';
    }
  }

}
