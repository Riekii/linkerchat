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
  public collectiodm: string = 'conexiones'
  public collectionmsg: string = 'mensajesall'
    
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

  // Crear mensajes entre 2 usuarios
  public createDM(data: any) {
    return this.firestore.collection(this.collectiodm).add(data);
  }

  // Comprobar que no haya mensajes anteriores
  public getDMsUser(username: string,  myusername: string) {
    return this.firestore.collection(
      this.collectiodm,
      ref => ref
      .where('myusername', '==', myusername)
      .where('username', '==', username)
      ,
      ).snapshotChanges();
    }

  // Listados de dms de usuarios
  public getDMs( myusername: string, username?) {
    if (!username){
      return this.firestore.collection(
        this.collectiodm,
        ref => ref
        .where('myusername', '==', myusername)
        ,
        ).snapshotChanges();
    }
    else{
      return this.firestore.collection(
        this.collectiodm,
        ref => ref
        .where('myusername', '==', myusername)
        .where('username', '==', username)
        ,
        ).snapshotChanges();
    }
      
  }
  public getDMs2( myusername: string, username?) {
    if (!username){
      return this.firestore.collection(
        this.collectiodm,
        ref => ref
        .where('username', '==', myusername)
        ,
        ).snapshotChanges();
    }
    else{
      return this.firestore.collection(
        this.collectiodm,
        ref => ref
        .where('myusername', '==', username)
        .where('username', '==', myusername)
        ,
        ).snapshotChanges();
    }
  }

  public envioIDService(id){
    return this.firestore.collection(
      this.collectiodm
      )
      .doc(id)
      .snapshotChanges();
  }

  // Enviar mensaje
  public sendMsg(data: {
      id: string,
      username: string,
      mensaje: string
  }){
    return this.firestore.collection(this.collectionmsg).add(data);
  }

  // Recoger todos los mensajes donde el id es el id introducido
  public getMsgAll(id) {
    return this.firestore.collection(
      this.collectionmsg,
      ref => ref
      .where('id', '==', id)
      ,
      ).snapshotChanges();
    }


}