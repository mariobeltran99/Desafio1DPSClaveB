import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-historial',
  templateUrl: './tabla-historial.component.html',
  styleUrls: ['./tabla-historial.component.css']
})
export class TablaHistorialComponent implements OnInit {

  //vistas
  @Input() model4:boolean;
  @Input() viewhome:boolean;
  @Input() resultadosHistorial:Array<any>;
  @Output() viewCen = new EventEmitter<boolean>();
  @Output() hidemodel4 = new EventEmitter<boolean>();

  tab:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  home(){
    this.model4 = true;
    this.viewhome = false;
    this.viewCen.emit(this.viewhome);
    this.hidemodel4.emit(this.model4);
  }
  viewtable():boolean{
    if(this.resultadosHistorial.length === 0){
       this.tab= true;
    }else{
      this.tab = false;
    }
    return this.tab;
  }

}
