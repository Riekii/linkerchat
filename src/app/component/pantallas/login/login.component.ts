import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../../services/firestore/usuarios.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FallbackimagesDirective } from '../../../directives/fallbackimages.directive';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public introducido;
  public loginUserForm = new FormGroup({

    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

    id: new FormControl('')
  });

  public imagen = '../../../../assets/imagenes/createuser/userdefault.png';

  constructor() { }

  ngOnInit(): void {

    this.loginUserForm.setValue({
      id: '',

      username: '',
      password: ''
    });

  }

  public loginUser(l){}

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
