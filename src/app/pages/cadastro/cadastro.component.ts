import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  isLoading = false;
  error : string = null;
  
  constructor(private authService : AuthService, private router: Router) { }
  
  onSignup(form : NgForm){

    // console.log(form);
    if(!form.valid){
      this.error = "Todos os campos devem ser preenchidos  ou há campos inválidos!"
      return;
    }
    
    let params = {
      cpf : form.controls.cpf.value,
      email : form.controls.email.value,
      login : form.controls.login.value,
      nome : form.controls.nome.value,
      senha : form.controls.senha.value,
    };

    // console.log(params);

    this.isLoading = true;
    

    this.authService.signup(params).subscribe(resData => {
        this.router.navigate(['auth']);
        this.isLoading = false;
    },
    err => {
        // console.log(err.error);
        this.error = err.error.titulo ?? "Erro!";
        this.isLoading = false;
    });

    form.reset();
  }
}
