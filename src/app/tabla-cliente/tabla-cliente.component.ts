import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-cliente',
  templateUrl: './tabla-cliente.component.html',
  styleUrls: ['./tabla-cliente.component.css']
})
export class TablaClienteComponent implements OnInit {

  //vistas
  @Input() model3:boolean;
  @Input() viewCentral:boolean;
  @Input() resultadosCliente:Array<any>;
  @Output() viewHome = new EventEmitter<boolean>();
  @Output() hidemodel3 = new EventEmitter<boolean>();
  
  tab:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  principio(){
    this.model3 = true;
    this.viewCentral = false;
    this.viewHome.emit(this.viewCentral);
    this.hidemodel3.emit(this.model3);
  }
  viewtable():boolean{
    if(this.resultadosCliente.length === 0){
      this.tab = true;
    }else{
      this.tab = false;
    }
    return this.tab;
  }

}
