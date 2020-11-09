


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CadastroSimplificado } from '../models/cadastro-simplificado';

@Injectable({
    providedIn: 'root'
  })
  export class CadastroSimplificadoService {

      url = 'http://localhost:3000/cadastros'; // api rest fake

      // injetando o HttpClient 
      constructor(private httpClient: HttpClient) { }

      // headers 
      httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
     // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


      // visualiza cadastros 
      visualizaCadastro(): Observable <CadastroSimplificado[]> {
        return this.httpClient.get<CadastroSimplificado[]>(this.url)
        .pipe(
          retry(2),
          catchError(this.handleError)
          )
    }

     // Obtem um cadastro pelo cpf
      visualizaById(id: string): Observable<CadastroSimplificado> {
    return this.httpClient.get<CadastroSimplificado>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

     // salva um cadastro
     salvaCadastro(cadastro: CadastroSimplificado): Observable<CadastroSimplificado> {
    return this.httpClient.post<CadastroSimplificado>(this.url, 
      JSON.stringify(cadastro), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um cadastro
    atualizaCadastro(cadastro: CadastroSimplificado): Observable<CadastroSimplificado> {
    return this.httpClient.put<CadastroSimplificado>(this.url + 
      '/' + cadastro.id, JSON.stringify(cadastro), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um cadastro
  deleteCadastro(cadastro:CadastroSimplificado) {
    return this.httpClient.delete<CadastroSimplificado>(this.url + '/' + cadastro.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

        
}