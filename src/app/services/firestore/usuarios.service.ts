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

  //Obtiene un usuario (sin profiiile)
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
      console.log('buscando:' + username);
      return this.firestore.collection(
        this.coleccion,
        ref => ref
        .where('username', '==', username)
        ,
        ).snapshotChanges();
    }
  }

    //Obtiene un usuario (cooon profiiile)
    public getUserPro(username: string, password: string, mail?: string) {
      if (password){
        return this.firestore.collection(
          this.coleccion,
          ref => ref
          .where('password', '==', password)
          .where('username', '==', username)
          ,
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

  // Mensajes
  public collectiodm: string = 'mensajes'

  // Crear mensajes entre 2 usuarios
  public createDM(data: any) {
    return this.firestore.collection(this.collectiodm).add(data);
  }

  // Comprubea que no haya Dms ya creados con ese usuario
  public getDMs( myusername: string) {
      return this.firestore.collection(
        this.collectiodm,
        ref => ref
        .where('myusername', '==', myusername)
        .where('username', '==', myusername)
        ,
        ).snapshotChanges();
  }
}