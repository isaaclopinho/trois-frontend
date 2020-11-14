import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  constructor(private router : ActivatedRoute) { }

  ngOnInit(): void {
    let results = this.router.snapshot.params;
    
    console.log(results);
  }

}
