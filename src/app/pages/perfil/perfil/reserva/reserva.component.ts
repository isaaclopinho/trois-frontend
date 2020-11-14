import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  @Input() order : Order;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }


  checkout(){
    if(this.order.status === 'PROCESSANDO'){
      this.router.navigate(['/pagamento', this.order]);  
    }
  }

}
