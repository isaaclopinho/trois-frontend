import { Injectable } from '@angular/core';
import { AirlineTicket } from './airlineticket.model';

@Injectable({
    providedIn: 'root'
})
export class AirlineTicketService {
  
    constructor(){}

    private airlineTickets : AirlineTicket[] = [
        new AirlineTicket("BSB", "SSA", new Date(), new Date(), 100, 200, "GOL"),
        new AirlineTicket("BSB", "SSA", new Date(), new Date(), 100, 3000, "AZUL"),
        new AirlineTicket("BSB", "SSA", new Date(), new Date(), 100, 3000, "AZUL"),
        new AirlineTicket("BSB", "SSA", new Date(), null, 100, 3000, "AZUL"),
     ];

      getAirlineTickets(){
          return this.airlineTickets.slice();
      }

      getAirlineTicketById(id: number): AirlineTicket {
        return this.airlineTickets[id];
      }
      
}