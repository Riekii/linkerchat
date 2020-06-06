import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../../services/firestore/usuarios.service'
import { FormGroup, FormControl, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { FallbackimagesDirective } from '../../../directives/fallbackimages.directive';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  usersc: any[];
  usuariousado: boolean;
  introducido: boolean;

  public documentId = null;

  public newDMForm = new FormGroup({

    username: new FormControl('', Validators.required),


    // estilofondo: new FormControl('', Validators.required),
    // colortexto: new FormControl('', Validators.required),
    // colorfondo: new FormControl('', Validators.required),

    id: new FormControl('')
  });
  currentStatus: number;
  myusername: string;

  constructor(
    private firestoreService: UsuariosService,
    public FallbackimagesDirective: FallbackimagesDirective,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.comprobarcookies();
  }

  // COMPROBACIÓN DE COOKIES
  public comprobarcookies(){
    if (this.cookieService.get('myusername')){
      this.myusername = this.cookieService.get('myusername');
      console.log(this.myusername)
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  // ABRIR NUEVO DM CON OTROS USUARIOS
  public newDM(formData){
    this.firestoreService.getUser(formData.username).subscribe((userSnapshot) => {
      this.usersc = [];
      userSnapshot.forEach((userData: any) => {
        this.usersc.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      })
    });
  }

}
