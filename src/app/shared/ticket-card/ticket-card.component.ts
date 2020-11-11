import { Component, OnInit } from '@angular/core';
import { AirlineTicket } from '../airlineticket.model';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit {
  
  airlineTicket : AirlineTicket = new AirlineTicket("BSB", "CGH", new Date(), new Date(), 100, 200, "LATAM");

  constructor() { }

  ngOnInit(): void {
  }

  getDateFormatted(date : Date){
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();
    return d + "/" + m + "/" + y; 
  }


}
