// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// routing
import { appRoutingModule } from "./app.routing";
// componentes 
import { AppComponent } from './app.component';
// módulos
import {CadastroSimplificadoModule} from './../app/cadastro-simplificado/cadastro-simplificado.module';
import { HttpClientModule } from "@angular/common/http";
// services
import { CadastroSimplificadoService } from './services/cadastro-simplificado.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'
 
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    CadastroSimplificadoModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig)

  ],
  providers: [CadastroSimplificadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
