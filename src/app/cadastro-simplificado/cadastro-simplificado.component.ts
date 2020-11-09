
// angular
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

// models 
import { CadastroSimplificado } from './../models/cadastro-simplificado';

// services 
import { CadastroSimplificadoService } from './../services/cadastro-simplificado.service';
// util 
import Swal from 'sweetalert2'
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'cadastro-simplificado',
  templateUrl: './cadastro-simplificado.component.html',
  styleUrls: ['./cadastro-simplificado.component.scss']
})
export class CadastroSimplificadoComponent implements AfterViewInit, OnDestroy, OnInit {
/** Parâmetros de entrada do componente */

  /** Parâmetros de saída do componente */

  /** Grupos para controlar valores e validação dos formulários */
     cadastroForm : FormGroup;
  /* Máscaras para os campos do formulário. */
   
  /** Variaveis globais */
   cadastro: CadastroSimplificado;
   cadastros: CadastroSimplificado[];
  
  // datatable configurações 

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  
   /** Campos fixos */
  sexos = [
    { cod: 1 ,  desc: 'Feminino' },
    { cod : 2 , desc: 'Masculino'},
  ]
  

  constructor(private fb: FormBuilder,
    private cadastroSimplificadoService: CadastroSimplificadoService) { 
    this.cadastroForm = this.fb.group({
      id: new FormControl(''),
      nome: new FormControl(''),
      dtNasc: new FormControl (''),
      email: new FormControl(''),
      sexo: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.visualizaCadastros();
    this.configuraTabela();
   
  }
  

 /**
   * Getters e setters dos campos dos formulários
   */

  public get id() {
    return  this.cadastroForm.get('id');
 }
   public get nome() {
      return  this.cadastroForm.get('nome');
   }
   public get dtNasc() {
     return this.cadastroForm.get('dtNasc');
   }
  public get email() {
    return this.cadastroForm.get('email');
  }
  public get tpSangue() {
    return this.cadastroForm.get('tpSangue');
  }
  public get sexo() {
    return this.cadastroForm.get('sexo' ); 
  }


  /**
   * Ações dos botões
   */
      salvar() {
        if( this.cadastro.id !== undefined) {
          this.atualizaCadastro(this.cadastro);
           
        } else {
          this.salvarCadastros(this.cadastro);
        }
      }
        


      editar(cadastro: CadastroSimplificado) {
        this.cadastro = cadastro;
      }


      deleteCadastro() {
        Swal.fire({
          title: 'Você tem  certeza que deseja deletar ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            this.deletaCadastro(this.cadastro);
            Swal.fire(
              'Deletado!',
              'Conforme solicitado.',
              'success'
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelado',
              ' Seu registro está mantido',
              'error'
            )
          }
        })

      }
  /**
   * Métodos da classe
   */


   // configura datatable 
   configuraTabela(){
    this.dtOptions = {
      pageLength: 10,
      processing: true,
      searching: false,

      language: {
        emptyTable: "Nenhum registro encontrado",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        infoPostFix: "",
        lengthMenu: "_MENU_ resultados por página",
        loadingRecords: "Carregando...",
        processing: "Processando...",
        zeroRecords: "Nenhum registro encontrado",
        paginate: {
          next: "Próximo",
          previous: "Anterior",
          first: "Primeiro",
          last: "Último"
        },
        aria: {
          sortAscending: ": Ordenar colunas de forma ascendente",
          sortDescending: ": Ordenar colunas de forma descendente"
        },
       
      }
    };
   }

   ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  
      dtInstance.destroy();

      this.dtTrigger.next();
    });
  }

 
 
  /**
   * Serviços
   */

   // visualizar os cadastros
   visualizaCadastros() {
     this.cadastroSimplificadoService.visualizaCadastro()
     .subscribe((cadastros: CadastroSimplificado[]) => {
       this.cadastros = cadastros;
     });
   }

   // salvar cadastros 

    salvarCadastros(cadastro: CadastroSimplificado) {
     this.cadastroSimplificadoService.salvaCadastro(cadastro)
     .pipe(
       take(1)
     )
     .subscribe(() => {
      Swal.fire("Salvo com sucesso!", "", "success");
       this.cadastroForm.reset();
       
     
     });
     Swal.fire("Erro ao salvar !", "", "error");
   }

   // atualizar cadastros 

   atualizaCadastro(cadastro:CadastroSimplificado) {
     this.cadastroSimplificadoService.atualizaCadastro(cadastro)
     .pipe(
       take(1)
     )
     .subscribe(() => {
       this.cadastroForm.reset();
     });
   }

   // deleta cadastro 

   deletaCadastro(cadastro: CadastroSimplificado) {
     this.cadastroSimplificadoService.deleteCadastro(cadastro)
     .pipe(
       take(1)
     )
     .subscribe(() => {

       this.visualizaCadastros();
       this.cadastroForm.reset();
     });
   }
   

}
