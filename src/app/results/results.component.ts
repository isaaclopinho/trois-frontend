import { Component, OnInit } from '@angular/core';
import { AirlineTicket } from '../shared/airlineticket.model';
import { AirlineTicketService } from '../shared/airlineticket.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [AirlineTicketService]
})
export class ResultsComponent implements OnInit {

  tickets : AirlineTicket[];
  constructor(private airlineService : AirlineTicketService) { }

  ngOnInit(): void {
    this.tickets = this.airlineService.getAirlineTickets();
  }

}


