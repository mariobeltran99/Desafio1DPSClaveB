import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  //vista principal
  @Input() viewPrince:boolean;
  //vista modelo1
  @Input() model2:boolean;
  //arreglo de clientes
  @Input() clientesReg:Array<any>
  //salidas
  @Output() viewOpen = new EventEmitter<boolean>();
  @Output() hidemodel2 = new EventEmitter<boolean>();
  //salidas de arreglos
  //salida de historial
  @Output() arregloTicket = new EventEmitter<Array<any>>();
  //salida del empleado
  @Output() arregloModCliente = new EventEmitter<Array<any>>();
  
  public pagosForm: FormGroup;

  nombre:string;
  dui:string;
  auto: string;
  cost:number;
  desc:number;
  costodesc:number;
  montopago:number;
  ticket:any;
  historial:Array<any> = [];
  tick:number;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.pagosForm = this.fb.group({
      nombre: new FormControl(null,[Validators.required]),
      costo: new FormControl(null,[Validators.required,Validators.pattern('^([0-9]+(\.?[0-9]?[0-9]?)?)')])
    });
    this.tick = 0;
  }

  enviar(){
    if(this.pagosForm.valid){
      const desc1 = 0.05;
      const desc2 = 0.10;
      for(let i in this.clientesReg){
        if(this.clientesReg[i].dui == this.pagosForm.get('nombre').value){   
          if(this.clientesReg[i].visita == 2){
            this.desc = desc1;
          }else if (this.clientesReg[i].visita > 4){
            this.desc = desc2;
          }else{
            this.desc = 0;
          }
          this.clientesReg[i].visita += 1;
          this.nombre = this.clientesReg[i].nombre;
          this.dui = this.clientesReg[i].dui;
          this.auto = this.clientesReg[i].vehiculo;
        }
      }
      this.cost = this.pagosForm.get('costo').value;
      this.costodesc = this.cost * this.desc;
      this.montopago = this.cost - this.costodesc;
      this.ticket = {
        "nombre": this.nombre,
        "dui": this.dui,
        "auto": this.auto,
        "costo":this.cost,
        "descuento":this.desc,
        "montodesc":this.costodesc,
        "pago":this.montopago
      }
      this.historial.push(this.ticket);
      this.tick = 1;
      this.pagosForm.reset();
      Object.keys(this.pagosForm.controls).forEach(key => {
        this.pagosForm.controls[key].setErrors(null);
      });
    }else{
      return;
    }
  }
  obtenerMensajeError(field:string):string{
    let mensaje;
    if(this.pagosForm.get(field).errors.required){
      mensaje = 'El campo es requerido.';
    }
    if(field == 'costo'){
      if(this.pagosForm.get(field).hasError('pattern')){
        mensaje = 'Solo números con formato (0.00)';
      }
    }
    return mensaje;
  }
  esCampoValido(field:string){
    return ((this.pagosForm.get(field).touched || 
    this.pagosForm.get(field).dirty) &&
    !this.pagosForm.get(field).valid);
  }
  limpiarTicket(){
    this.tick = 0;
    this.pagosForm.reset();
  }
  regre(){
    this.viewPrince = false;
    this.model2 = true;
    this.viewOpen.emit(this.viewPrince);
    this.hidemodel2.emit(this.model2);
    this.arregloTicket.emit(this.historial);
    this.arregloModCliente.emit(this.clientesReg);
    this.pagosForm.reset();
    Object.keys(this.pagosForm.controls).forEach(key => {
      this.pagosForm.controls[key].setErrors(null);
    });
  }

}
