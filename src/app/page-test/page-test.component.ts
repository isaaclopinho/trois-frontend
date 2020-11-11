import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthInterface, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.css']
})
export class PageTestComponent implements OnInit, OnDestroy {

  isLoading = false;
  error : string = null;
  
  isAuthenticated = false;  
  private userSubs : Subscription;
  
  constructor(private authService : AuthService) { }
  
  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe( user =>{
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
  
  onSubmit(form? : NgForm){
    // if(!form.valid)
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



  logout(){
    this.authService.logout();
  }
}
