import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desafio1';
  view:boolean = false;
  showmodel1:boolean = true;
  showmodel2:boolean = true;
  showmodel3:boolean = true;
  showmodel4:boolean = true;
  arregloClientes:Array<any> = [];
  arregloHisto:Array<any> = [];
  mostrar1(){
    this.view = true;
    this.showmodel1 = false;
  }
  mostrar2(){
    this.view = true;
    this.showmodel2 = false;
  }
  mostrar3(){
    this.view = true;
    this.showmodel3 = false;
  }
  mostrar4(){
    this.view = true;
    this.showmodel4 = false;
  }
}
