import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent implements OnInit, OnDestroy {
  orderData: {
    codTransacao: string;
    dataStatus: string;
    dataTransacao: string;
    id: string;
    status: string;
    url: string;
    userId: string;
    valorTransacao: string;
  };
  error: string;
  isLoading : boolean = false;

  checkoutSubscription : Subscription;

  constructor(private router: ActivatedRoute, private r : Router, private dataService : DataService) {}

  ngOnDestroy(): void {   
    this.checkoutSubscription?.unsubscribe(); 
  }

  ngOnInit(): void {
   this.orderData = this.router.snapshot.params as {
    codTransacao: string;
    dataStatus: string;
    dataTransacao: string;
    id: string;
    status: string;
    url: string;
    userId: string;
    valorTransacao: string;
  };

    console.log(this.orderData);
    if (Object.keys(this.orderData).length) {
      console.log("deu bom!!");
    }
  }


  checkout(form: NgForm){
    if(!form.valid){
      this.error = "Todos os campos devem ser preenchidos!";
      return;
    }
    this.isLoading = true;
    
    this.checkoutSubscription = this.dataService.checkout(this.orderData.codTransacao).subscribe(data => {
      console.log(data);
      this.r.navigate(['perfil']);
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.r.navigate(['perfil']);
      this.isLoading = false;
    });

  }
  
}
