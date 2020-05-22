import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/firestore/usuarios.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-creauser',
  templateUrl: './creauser.component.html',
  styleUrls: ['./creauser.component.scss']
})
export class CreauserComponent implements OnInit {

  // LISTADO DE USUARIOS
  public users = [];

  // INTRODUCIR NUEVO USUARIO
  public documentId = null;
  public currentStatus = 1;
  public newUserForm = new FormGroup({
    username: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  constructor(
    private firestoreService: UsuariosService
  ) { }

  ngOnInit() {

    this.newUserForm.setValue({
      id: '',
      username: '',
      url: ''
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
        username: form.username,
        url: form.url
      }

      this.firestoreService.createUser(data).then(() => {
        this.newUserForm.setValue({
          username: '',
          url: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        username: form.username,
        url: form.url
      }

      this.firestoreService.updateUser(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newUserForm.setValue({
          username: '',
          url: '',
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
  
}
