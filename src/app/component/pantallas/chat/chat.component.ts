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

  constructor(
    private firestoreService: UsuariosService,
    public FallbackimagesDirective: FallbackimagesDirective,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.comprobarcookies();
    this.cargarDMs();
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
  });

  setTimeout(() => {
    console.log(this.usersDMs)

    if (this.usersDMs.length >= 1){
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
        this.usersDMs = [];
        userSnapshot.forEach((userData: any) => {
            this.usersDMs.push({
              id: userData.payload.doc.id,
              data: userData.payload.doc.data()
            });
        });
      });
    }

  }
