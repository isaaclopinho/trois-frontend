import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passagem',
  templateUrl: './passagem.component.html',
  styleUrls: ['./passagem.component.css']
})
export class PassagemComponent implements OnInit {

  passagemId : number;
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.passagemId = this.route.snapshot.params.id;
  }

}
