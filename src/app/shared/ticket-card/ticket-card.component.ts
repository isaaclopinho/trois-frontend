import { Component, Input, OnInit } from '@angular/core';
import { AirlineTicket } from '../airlineticket.model';
import {FlightOffers, FlightOffer, Dictionaries} from '../../shared/flightoffers.model';
import { DataService } from '../data-storage.service';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit {
  
  @Input() flightOffer : FlightOffer;
  @Input() returnDate : string;
  @Input() departureDate : string;
  @Input() origin : string;
  @Input() destination : string;
  @Input() dictionaries : any;
  @Input() originName : string;
  @Input() destinationName : string;

  favoriteLoading = false;
  isFavorited = false;


  constructor(private dataservice : DataService) { }

  ngOnInit(): void {
  }


  getOriginName(i : number){
    let data =  this.dictionaries["locations"][this.getOriginCode(i)];
    return data.cityCode + "/" + data.countryCode
  }


  getDestinationName(i : number){
    let data = this.dictionaries["locations"][this.getDestinationCode(i)];
    return data.cityCode + "/" + data.countryCode;
  }

  getOriginCode(i : number){
      return this.flightOffer.itineraries[i].segments[0].departure.iataCode;
  }

  getDestinationCode(i : number){
    let size = this.flightOffer.itineraries[i].segments.length;
    return this.flightOffer.itineraries[i].segments[size-1].arrival.iataCode;
}

  getDepartureDate(i : number){
    return this.getDateFromSegment(this.flightOffer.itineraries[i].segments[0].departure.at.toString());
  }
  

  getDepartureHour(i : number){
    return this.getHourFromSegment(this.flightOffer.itineraries[i].segments[0].departure.at.toString());
  }

  getArrivalHour(i : number){
    let size = this.flightOffer.itineraries[i].segments.length;
    return this.getHourFromSegment(this.flightOffer.itineraries[i].segments[size-1].arrival.at.toString());
  }

  getArrivalDate(i : number){
    let size = this.flightOffer.itineraries[i].segments.length;
    return this.getDateFromSegment(this.flightOffer.itineraries[i].segments[size-1].arrival.at.toString());
  }

  carrierCode(i : number){
    let str = this.flightOffer.itineraries[i].segments[0].carrierCode;
    if(this.dictionaries.carriers)
      return this.dictionaries.carriers[str];
    return str;
  }

  paradas(i : number){
    let p = this.flightOffer.itineraries[i].segments.length-1;
    let str = "";
    switch(p) {
      case 0: str += "Direto";
        break;
      case 1: str += 1 + " parada";
        break;
      default: str += p + " paradas";
        break;
    }

    return str;
  }

  getDateFormatted(dateStr : string){
    let date = dateStr.split('-');
    let d = date[2];
    let m = date[1];
    let y = date[0];
    return d + "/" + m + "/" + y; 
  }

  getDateFromSegment(dateStr : string) {
    let split = dateStr.split('T');
    let dateFormatted = this.getDateFormatted(split[0]);
    return dateFormatted;  
  }

  getHourFromSegment(dateStr : string){
    let split = dateStr.split('T');
    let hour = split[1].split(":");    
    let hourFormatted = [hour[0], hour[1]].join(':');
    return hourFormatted; 
  }

  favorite(){
    if(!this.isFavorited){
    this.favoriteLoading = true;
    
    let f = {
      "data" : {
        "flightOffers" : [
          this.flightOffer
        ]
      }
    };
  
    this.dataservice.registerFavorite(JSON.stringify(f)).subscribe(data => {
      this.favoriteLoading = false;
      this.isFavorited = true;
      console.log(data);
    }, err => {
      this.favoriteLoading = false;
      console.log(err);
    });

    console.log(JSON.stringify(f));
  }
  }
}
