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
  public getUser(username: string, password?: string) {
    if (password){
      return this.firestore.collection(
        this.coleccion,
        ref => ref
        .where('username', '==', username)
        .where('password', '==', password)
        ,
        ).snapshotChanges();
    }
    else{
      return this.firestore.collection(
        this.coleccion,
        ref => ref
        .where('username', '==', username)
        ).snapshotChanges();
    }
  }

  //Obtiene todos los usuarios
  public getUsers() {
    return this.firestore.collection(this.coleccion).snapshotChanges();
    // , ref => ref.where('TransactionDate', '==', formatDate(new Date, 'yyyy/MM/dd', 'en'))
  }
  //Actualiza un usuario
  public updateUser(documentId: string, data: any) {
    return this.firestore.collection(this.coleccion).doc(documentId).set(data);
  }


  // Comprueba si hay usuarios con ese nombre

}