import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthInterface, AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.css']
})
export class PageTestComponent implements OnInit, OnDestroy {

  isLoading = false;
  error : string = null;
  
  constructor(private authService : AuthService) { }
  
  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {    
  }
  
  onSubmit(form? : NgForm){
    // if(!form.valid)
    let authObs : Observable<AuthInterface>;
    //   return;
    
    // let params = {
    //   cpf : form.value.cpf,
    //   email : form.value.email,
    //   login : form.value.login,
    //   nome : form.value.nome,
    //   senha : form.value.senha
    // };

    this.isLoading = true;
    //colocar params quando tiver tela de signup
    this.authService.signup().subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
    },
    err => {
        console.log(err.error);
        this.error = err.error.titulo;
        this.isLoading = false;
    });
  }

  onLogin(form? : NgForm){
    // if(!form.valid)
    let authObs : Observable<AuthInterface>;
    //   return;
    
    // let params = {
    //   cpf : form.value.cpf,
    //   email : form.value.email,
    //   login : form.value.login,
    //   nome : form.value.nome,
    //   senha : form.value.senha
    // };

    this.isLoading = true;
    //colocar params quando tiver tela de signup
    this.authService.login().subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
    },
    err => {
        console.log(err.error);
        this.error = err.error.titulo;
        this.isLoading = false;
    });
  }


}
