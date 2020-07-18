import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../../../services/firestore/usuarios.service'
import { FormGroup, FormControl, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { FallbackimagesDirective } from '../../../directives/fallbackimages.directive';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  pan: { direction: Hammer.DIRECTION_ALL };
  swipe: { direction: Hammer.DIRECTION_VERTICAL };
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
    private router: Router,
    private Hammer: HammerModule
  ) { }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

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
    setTimeout(() => {
            //Conseguir la fecha
            const dateNowold = formatDate(new Date(), 'dd/MM/yyyy', 'en')
            const dateNow = new Date().getTime() / 1000;
            console.log(dateNow)
    }, 500);
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
    public envioID(id, docid){
      this.documentoid = id;
      this.firestoreService.envioIDService(id).subscribe((userSnapshot) => {
        this.mensajes = [];
            this.mensajes.push({
              data: userSnapshot.payload.data()
            });
            setTimeout(() => {
              document.getElementById('outchat').style.opacity = '1'
            }, 200);
          this.recoverMsg(id)
      });
      console.log(docid)
      var usernames = document.getElementsByClassName('username');

      for(var i=0; i< usernames.length; i++){
          usernames[i].classList.add('noseleccionado')
          usernames[i].classList.remove('seleccionado')
      }
      document.getElementById(docid).classList.remove('noseleccionado')
      document.getElementById(docid).classList.add('seleccionado')

      // document.getElementById('mensajeform').style.visibility = 'show';
      document.getElementById('mensajeform').style.opacity = '1';

      setTimeout(() => {
        this.onSwipeLeft('l')
      }, 100);
    }

    //Enviar mensaje
    public newMsg(formData){

    const dateNow = new Date().getTime() / 1000;

     let data = {
          id: this.documentoid,
          username: this.myusername,
          mensaje: formData.mensaje,
          date: dateNow
     } 
    this.firestoreService.sendMsg(data).then(() => {
      this.newMsgForm.setValue({
        mensaje: ''
        });
      });

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
      });
    }

    ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

  public onSwipe(event){
    console.log('swipe');
  }
  public onSwipeLeft(event){
    console.log('left')

    const colleft = document.getElementById('colleft');
    const colright = document.getElementById('colright');
    const mensajeform = document.getElementById('mensajeform');

    colleft.classList.remove;
    colright.classList.remove;

    colright.classList.remove('col-0');
    colleft.classList.remove('col-12');

    colleft.classList.add('col-0');
    colleft.classList.add('colleft');
    colright.classList.add('col-12');
    colright.classList.add('colright');

    colleft.style.display = 'none';
    colright.style.display = 'block';
    mensajeform.style.display = 'block';

    
  }
  public onSwipeRight(event){
    console.log('right')

    const colleft = document.getElementById('colleft');
    const colright = document.getElementById('colright');
    const mensajeform = document.getElementById('mensajeform');

    colright.classList.remove;
    colleft.classList.remove;
    colleft.classList.remove('col-0');
    colright.classList.remove('col-12');

    colright.classList.add('col-0');
    colright.classList.add('colright');
    colleft.classList.add('col-12');
    colleft.classList.add('colleft');

    colright.style.display = 'none';
    colleft.style.display = 'block';
    mensajeform.style.display = 'none';

  }
    

  }