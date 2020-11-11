import { Component, Input, OnInit } from '@angular/core';
import { AirlineTicket } from '../airlineticket.model';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit {
  
  @Input() airlineTicket : AirlineTicket;

  constructor() { }

  ngOnInit(): void {
  }

}
