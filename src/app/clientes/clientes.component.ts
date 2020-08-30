import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  //vista principal
  @Input() viewprincipal:boolean;
  //vista modelo1
  @Input() model1:boolean; 
  //Array de Clientes
  @Input() registro:Array<any>;
  //enviar estado de vista
  @Output() viewchange = new EventEmitter<boolean>();
  @Output() hidemodel1 = new EventEmitter<boolean>();
  //enviar los clientes
  @Output() conjCliente = new EventEmitter<Array<any>>();

  public clienteForm:FormGroup;
  horizontal:MatSnackBarHorizontalPosition = 'right';
  vertical:MatSnackBarVerticalPosition = 'top';

  constructor(private fb:FormBuilder,private snack:MatSnackBar) { }
  visita:number;
  nameCliente:number;
  vehiculo:string;
  dui:string;
  cliente:any;
  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: new FormControl(null,[Validators.required,Validators.pattern(/[a-zA-Z]+$/)]),
      dui: new FormControl(null,[Validators.required,Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9]')]),
      marca: new FormControl(null,[Validators.required,Validators.pattern(/[a-zA-Z]+$/)]),
      modelo: new FormControl(null,[Validators.required])
    });
  }
  //validacion si fue tocado el control del formulario
  esCampoValido(field:string){
    return ((this.clienteForm.get(field).touched || 
    this.clienteForm.get(field).dirty) &&
    !this.clienteForm.get(field).valid);
  }
  //mensajes de error
  obtenerMensajeError(field:string):string{
    let mensaje;
    if(this.clienteForm.get(field).errors.required){
      mensaje = 'El campo es requerido.';
    }
    if(field == 'nombre' || field == 'marca'){
      if(this.clienteForm.get(field).hasError('pattern')){
        mensaje = 'Solo letras se aceptan.';
      }
    }else if(field == 'dui'){
      if(this.clienteForm.get(field).hasError('pattern')){
        mensaje = 'Solo números con formato (00000000-0)';
      }
    }
    return mensaje;
  }
  guardar(){
    //registro de cliente
    if(this.clienteForm.valid){
      let bandera = false;
      for(let i in this.registro){
          if(this.registro[i].dui == this.clienteForm.get('dui').value){
             bandera = true;
          }
      }
      if(bandera == true){
        this.openSnackBar('Ya existe este DUI')
        this.clienteForm.reset();
        return;
      }else{
        this.nameCliente = this.clienteForm.get('nombre').value;
        this.dui = this.clienteForm.get('dui').value;
        let marca = this.clienteForm.get('marca').value;
        let modelo = this.clienteForm.get('modelo').value;
        this.vehiculo = marca + " - " + modelo;
        this.visita = 0;
        this.clienteForm.reset();
        this.cliente ={
          "nombre":this.nameCliente,
          "dui":this.dui,
          "vehiculo":this.vehiculo,
          "visita":this.visita
        }
        this.registro.push(this.cliente);
        this.openSnackBar('Registrado Exitosamente');
      }    
    }else{
      return;
    }
  }
  back(){
    this.viewprincipal = false;
    this.model1 = true;
    this.viewchange.emit(this.viewprincipal);
    this.hidemodel1.emit(this.model1);
    this.conjCliente.emit(this.registro);
    this.clienteForm.reset();
  }
  openSnackBar(mensaje:string) {
    this.snack.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.horizontal,
      verticalPosition: this.vertical
    });
  }

}
