import { Component, OnInit,Input,Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { EventEmitter } from 'protractor';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @Input() viewprincipal:boolean = false;
  @Input() model1:boolean = false; 
  //@Output() viewchange = new EventEmitter.caller(this.back);


  public clienteForm:FormGroup;
  constructor(private fb:FormBuilder) { }
  visita:number;
  nameCliente:number;
  vehiculo:string;
  dui:string;
  cliente:any;
  registro:Array<any> = [];
  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: new FormControl(null,[Validators.required,Validators.pattern('/[a-zA-Z]+$/')]),
      dui: new FormControl(null,[Validators.required,Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9]')]),
      marca: new FormControl(null,[Validators.required,Validators.pattern('/[a-zA-Z]+$/')]),
      model: new FormControl(null,[Validators.required])
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
    if(this.clienteForm.valid){
      this.nameCliente = this.clienteForm.get('nombre').value;
      this.dui = this.clienteForm.get('dui').value;
      let marca = this.clienteForm.get('marca').value;
      let modelo = this.clienteForm.get('modelo').value;
      this.vehiculo = marca + " - " + modelo;
      this.visita = 0;
      this.clienteForm.reset();
      Object.keys(this.clienteForm.controls).forEach(key => {
        this.clienteForm.controls[key].setErrors(null);
      });
      this.cliente ={
        "nombre":this.nameCliente,
        "dui":this.dui,
        "vehiculo":this.vehiculo,
        "visita":this.visita
      }
      this.registro.push(this.cliente);
    }else{
      return;
    }
  }
  back(){
    this.viewprincipal = false;
    this.model1 = true;
  }

}
