import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../../services/firestore/usuarios.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FallbackimagesDirective } from '../../../directives/fallbackimages.directive';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Injectable, NgZone } from '@angular/core';



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

  constructor(
    private firestoreService: UsuariosService,

  ) { }

  ngOnInit(): void {

    this.loginUserForm.setValue({
      id: '',

      username: '',
      password: ''
    });

    this.loaded = false;

  }

  public loginUser(username){
    console.log(username)
    this.loaded = false;
    this.firestoreService.getUsers(username).subscribe((userSnapshot) => {
      this.users = [];
      userSnapshot.forEach((userData: any) => {
        this.loaded = true;
        this.users.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      })
    });
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
