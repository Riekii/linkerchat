import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../../services/firestore/usuarios.service'
import { FormGroup, FormControl, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { FallbackimagesDirective } from '../../../directives/fallbackimages.directive';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  myusername: string;
  usersc: any[];
  usersDMs: any[];
  usersDMs2: any[];
  usersDMs11: any[];
  usersDMs22: any[];
  mensajes: any;

  public newMsgForm = new FormGroup({
    mensaje: new FormControl('', Validators.required),
    id: new FormControl('')
  });
  documentoid: any;
  mensajesall: any[];

  constructor(
    private firestoreService: UsuariosService,
    public FallbackimagesDirective: FallbackimagesDirective,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.comprobarcookies();
    this.cargarDMs();

    // NTROD
    this.newMsgForm.setValue({
      mensaje: ''
    });
  }
  public comprobarcookies(){
    if (this.cookieService.get('myusername')){
      this.myusername = this.cookieService.get('myusername');
      console.log(this.myusername)
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  // Abre DM
  public newDM(datauser){
    let dataCrearDM = {
      username: datauser.username,
      myusername: this.myusername
    }

    // Comprobar que los DMs no estén creados ya
    this.firestoreService.getDMs(this.myusername).subscribe((userSnapshot) => {
    this.usersDMs = [];
    userSnapshot.forEach((userData: any) => {
        this.usersDMs.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
    });

    this.firestoreService.getDMs2(this.myusername).subscribe((userSnapshot) => {
      this.usersDMs2 = [];
      userSnapshot.forEach((userData: any) => {
          this.usersDMs2.push({
            id: userData.payload.doc.id,
            data: userData.payload.doc.data()
          });
      });
    });
  });

  setTimeout(() => {
    if (this.usersDMs.length >= 1 && this.usersDMs2.length >= 1){
      // Si ya hay datos
      console.log('Ya está creado');
    }
    else{
      console.log('Estaba vacío');
       // Crear los DMs entre ambos usuarios
      this.firestoreService.createDM(dataCrearDM)
    }
  }, 400);

  }

    public cargarDMs(){
      this.firestoreService.getDMs(this.myusername).subscribe((userSnapshot) => {
        this.usersDMs11 = [];
        userSnapshot.forEach((userData: any) => {
            this.usersDMs11.push({
              id: userData.payload.doc.id,
              data: userData.payload.doc.data()
            });
        });
      }); 
      
      this.firestoreService.getDMs2(this.myusername).subscribe((userSnapshot) => {
        this.usersDMs22 = [];
        userSnapshot.forEach((userData: any) => {
            this.usersDMs22.push({
              id: userData.payload.doc.id,
              data: userData.payload.doc.data()
            });
        });
      });
    }

    //Recuperar mensajes

    public getAllMsg(){

    }

    // Recupera los mensajes con la ID enviada
    public envioID(id){
      this.documentoid = id;
      this.firestoreService.envioIDService(id).subscribe((userSnapshot) => {
        this.mensajes = [];
            this.mensajes.push({
              data: userSnapshot.payload.data()
            });
          console.log(this.mensajes)
      });

    }

    //Enviar mensaje
    public newMsg(formData){
     let data = {
          id: this.documentoid,
          username: this.myusername,
          mensaje: formData.mensaje
     } 
      this.firestoreService.sendMsg(data)
      this.recoverMsg(this.documentoid)
    }

    // Recupera los mensajes según la id
    public recoverMsg(id){
      this.documentoid = id;
      this.firestoreService.getMsgAll(id).subscribe((userSnapshot) => {
        this.mensajesall = [];
        userSnapshot.forEach((userData: any) => {
          this.mensajesall.push({
            data: userData.payload.doc.data()
          });
        });
        console.log(this.mensajesall)
      });
      
    }

  }