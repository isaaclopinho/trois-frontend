import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  isLoading = false;
  error : string = null;  
  
  constructor(private authService : AuthService, private router: Router) { }
  
  ngOnInit(): void {    
  }

  ngOnDestroy(): void {
  }
  

  onLogin(form : NgForm){
    if(!form.valid){
      this.error = "Todos os campos devem ser preenchidos!"      
      return;
    }
    
    let params = {
      usuario : form.controls.email.value,
      senha : form.controls.senha.value
    };

    this.isLoading = true;
    //colocar params quando tiver tela de signup
    this.authService.login(params).subscribe(resData => {
        this.isLoading = false;
        this.router.navigate(['pesquisa']);
    },
    err => {
        console.log(err.error);
        this.error = err.error.titulo;
        this.isLoading = false;
    });

    form.reset();
  }


}
