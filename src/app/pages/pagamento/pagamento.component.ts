import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { strict } from 'assert';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data-storage.service';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent implements OnInit, OnDestroy {
  orderData: Order;
  error: string;
  isLoading : boolean = false;

  checkoutSubscription : Subscription;

  constructor(private router: ActivatedRoute, private r : Router, private dataService : DataService) {}

  ngOnDestroy(): void {   
    this.checkoutSubscription?.unsubscribe(); 
  }

  ngOnInit(): void {
   this.orderData = this.router.snapshot.params as Order;

    console.log(this.orderData);
    if (!Object.keys(this.orderData).length) {
      this.r.navigate(['pesquisa']);
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
