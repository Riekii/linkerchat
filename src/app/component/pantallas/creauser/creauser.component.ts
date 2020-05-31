import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../../services/firestore/usuarios.service'
import { FormGroup, FormControl, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { FallbackimagesDirective } from '../../../directives/fallbackimages.directive';

@Component({
  selector: 'app-creauser',
  templateUrl: './creauser.component.html',
  styleUrls: ['./creauser.component.scss']
})
export class CreauserComponent implements OnInit {

  // LISTADO DE USUARIOS
  public users = [];

  public imagensrc = '../../../../assets/imagenes/createuser';
  public imagen = this.imagensrc + 'userdefaultextra.png' 

  // NTROD
  public documentId = null;
  public currentStatus = 1;
  public newUserForm = new FormGroup({

    username: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),


    // estilofondo: new FormControl('', Validators.required),
    // colortexto: new FormControl('', Validators.required),
    // colorfondo: new FormControl('', Validators.required),

    id: new FormControl('')
  });
  public introducido: boolean;
  seguridad: any;
  usersc: any;
  public usuariousado: boolean;

  constructor(
    private firestoreService: UsuariosService,
    public FallbackimagesDirective: FallbackimagesDirective
  ) { }

  ngOnInit() {

    // NTROD
    this.newUserForm.setValue({
      id: '',

      username: '',
      imagen: '',
      password: '',
      mail: '',

      // estilofondo: 0,
      // colortexto: 0,
      // colorfondo: 0
    });

  }

  public newUser(formData){
    this.firestoreService.getUser(formData.username).subscribe((userSnapshot) => {
      this.usersc = [];
      userSnapshot.forEach((userData: any) => {
        this.usersc.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      })
    });
   
    setTimeout(() => {
      if (this.usersc){
        if (this.usersc.length === 0){
          this.usuariousado = false;
          this.insertUser(formData)  
        }
        else{
          this.usuariousado = true;
        }
      }
    }, 200);
  
  }

  public insertUser(form, documentId = this.documentId) {
    if (this.currentStatus == 1) {
      let data = {
        // NTROD
        username: form.username,
        imagen: form.imagen,
        password: form.password,
        mail: form.mail

        // personalizacion: {
        //   estilofondo: form.estilofondo,
        //   colortexto: form.colortexto,
        //   colorfondo: form.colorfondo
        // }
      }


      this.firestoreService.createUser(data).then(() => {
        this.introducido = true;
        this.newUserForm.setValue({
          // NTROD
          username: '',
          imagen: '',
          password: '',
          mail: '',

          // estilofondo: 0,
          // colortexto: 0,
          // colorfondo: 0,

          id: ''
        });
      }, (error) => {
        this.introducido = false;
        console.error(error);
      });
    } else {
      let data = {
        username: form.username,
        imagen: form.imagen
      }

      this.firestoreService.updateUser(documentId, data).then(() => {
        this.currentStatus = 1;

        this.newUserForm.setValue({
          // NTROD
          username: '',
          imagen: '',
          password: '',
          mail: '',

          // personalizacion: {
          //   estilofondo: form.estilofondo,
          //   colortexto: form.colortexto,
          //   colorfondo: form.colorfondo
          // },

          id: ''
        });
      }, (error) => {
        console.log(error);
      });
    }
  }

  // public editUser(documentId) {
  //   let editSubscribe = this.firestoreService.getUser(documentId).subscribe((cat) => {
  //     this.currentStatus = 2;
  //     this.documentId = documentId;
  //     this.newUserForm.setValue({
  //       id: documentId,
  //       nombre: cat.payload.data()['nombre'],
  //       url: cat.payload.data()['url']
  //     });
  //     editSubscribe.unsubscribe();
  //   });
  // }

  // IMAGEN

  public imagenVacia(event) {
    // TODO SOLUCIONAR ERROR
    const imgelemento = document.getElementById('userdefault');
    const imgurl: any = event.target.value;

    if (imgurl !== '') {
      this.imagen = imgurl;
    }
    else {
      this.imagen = '../../../../assets/imagenes/createuser/userdefaultextra.png';
    }
  }
  public cambiarFondo(event, enter?) {

    // SEGURIDAD DE LA CONTRASEÑA
    const contrasena = event.target.value;
    this.seguridad = 0;

    if (contrasena.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/))
      {
        this.seguridad = this.seguridad+1
      }

    if (contrasena.match(/[123456789]/))
      {
        this.seguridad = this.seguridad+1
      }

    if (contrasena.match(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/))
      {
        this.seguridad = this.seguridad+1
      }


    console.log(this.seguridad)

    const fright = document.getElementById('fuegorightimg')
    const fleft = document.getElementById('fuegoleftimg')


    if(contrasena !== ''){
      fright.style.opacity = '1';
      fleft.style.opacity = '1';
    }
    else{
      fright.style.opacity = '0';
      fleft.style.opacity = '0';
    }

    if (this.seguridad <= 0){
      fright.style.width = '20%';
      fleft.style.width = '20%';
    }
    if (this.seguridad === 1){
      fright.style.width = '50%';
      fleft.style.width = '50%';
    }
    if (this.seguridad === 2){
      fright.style.width = '75%';
      fleft.style.width = '75%';
    }
    if (this.seguridad === 3){
      fright.style.width = '100%';
      fleft.style.width = '100%';
    }

    


  }

}
