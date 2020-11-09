//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from "@angular/common/http";

// componentes
import {CadastroSimplificadoComponent} from './cadastro-simplificado.component'


@NgModule({
  declarations: [CadastroSimplificadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule

  ],
  exports:[CadastroSimplificadoComponent]

})
export class CadastroSimplificadoModule {}

