import { Component, OnInit} from '@angular/core';
import { UsuariosService } from '../../../services/firestore/usuarios.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FallbackimagesDirective } from '../../../directives/fallbackimages.directive';

@Component({
  selector: 'app-creauser',
  templateUrl: './creauser.component.html',
  styleUrls: ['./creauser.component.scss']
})
export class CreauserComponent implements OnInit {

  // LISTADO DE USUARIOS
  public users = [];

  public imagen = '../../../../assets/imagenes/createuser/userdefault.png';

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

    this.firestoreService.getUsers().subscribe((userSnapshot) => {
      this.users = [];
      userSnapshot.forEach((userData: any) => {
        this.users.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      })
    });

  }

  public newUser(form, documentId = this.documentId) {
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

  public editUser(documentId) {
    let editSubscribe = this.firestoreService.getUser(documentId).subscribe((cat) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newUserForm.setValue({
        id: documentId,
        nombre: cat.payload.data()['nombre'],
        url: cat.payload.data()['url']
      });
      editSubscribe.unsubscribe();
    });
  }

  // IMAGEN

  public imagenVacia(event) {
    // TODO SOLUCIONAR ERROR
    const imgelemento = document.getElementById('userdefault'); 
    const imgurl:any = event.target.value;

    if (imgurl !== '' ){
      this.imagen = imgurl;
    }
    else{
      this.imagen = '../../../../assets/imagenes/createuser/userdefault.png';
    }
  }
  public error(){
    console.log('lol')
  }
  
}
