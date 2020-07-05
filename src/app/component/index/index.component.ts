import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.mostrarnube();
    }, 100);
  }

  mostrarnube(){
    const nube = document.getElementById('nube');
    nube.style.opacity = '1';
    setTimeout(() => {
      nube.style.marginTop = '-100px';
      nube.style.transition = '2s';

      this.mostrarregistro();
    }, 500);
  }
  mostrarregistro(){
    setTimeout(() => {
      const registro = document.getElementById('registro');
      registro.style.opacity = '1'
    }, 2000);
  }

}
