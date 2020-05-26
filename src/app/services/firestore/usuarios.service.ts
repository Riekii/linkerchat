import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(
    private firestore: AngularFirestore
  ) {}

  public coleccion = 'users'
    
  //Crea un nuevo usurios
  public createUser(data: {
    username: string, 
    imagen: string,
    password: string
  }) {
    return this.firestore.collection(this.coleccion).add(data);
  }

  //Obtiene un usuario
  public getUser(documentId: string) {
    return this.firestore.collection(this.coleccion).doc(documentId).snapshotChanges();
  }

  //Obtiene todos los usuarios
  public getUsers(username) {
    return this.firestore.collection(this.coleccion).snapshotChanges();
  }
  //Actualiza un usuario
  public updateUser(documentId: string, data: any) {
    return this.firestore.collection(this.coleccion).doc(documentId).set(data);
  }


  // Comprueba si hay usuarios con ese nombre

}