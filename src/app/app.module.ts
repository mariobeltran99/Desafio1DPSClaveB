import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { PagosComponent } from './pagos/pagos.component';
import { TablaClienteComponent } from './tabla-cliente/tabla-cliente.component';
import { TablaHistorialComponent } from './tabla-historial/tabla-historial.component'

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    PagosComponent,
    TablaClienteComponent,
    TablaHistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
