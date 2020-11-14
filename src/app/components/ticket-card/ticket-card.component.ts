import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data-storage.service';
import {FlightOffers, FlightOffer, Dictionaries} from '../../shared/flightoffers.model';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit , OnDestroy {
  
  @Input() flightOffer : FlightOffer;
  @Input() dictionaries : any;
  @Input() isFavorited = false;
  id : number = -1;

  url ;

  favoriteLoading = false;

  paymentLoading = false;

  favoriteSubscription : Subscription;
  orderSubscription : Subscription;

  constructor(private dataservice : DataService, private router : Router) { }

  ngOnInit(): void {
    this.url = window.location.protocol +"//"+window.location.hostname+"/passagem/0";
    // console.log(this.url);
    this.dataservice.paymentLoading.subscribe(x => {
      this.paymentLoading = x;
    });
  }

  ngOnDestroy(): void {
    this.favoriteSubscription?.unsubscribe();
    this.orderSubscription?.unsubscribe();
  }

  getOriginName(i : number){
    if(this.dictionaries){
      let data =  this.dictionaries["locations"][this.getOriginCode(i)];
      return data.cityCode + "/" + data.countryCode;
    }
    return "";
  }


  getDestinationName(i : number){
    if(this.dictionaries){
    let data = this.dictionaries["locations"][this.getDestinationCode(i)];
    return data.cityCode + "/" + data.countryCode;
    }
    return "";
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
    if(this.dictionaries)
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
  
    this.favoriteSubscription = this.dataservice.registerFavorite(JSON.stringify(f)).subscribe((data: any) => {
      this.favoriteLoading = false;
      this.isFavorited = true;
      this.id = data.id;
      // console.log(data);
    }, err => {
      this.favoriteLoading = false;
      // console.log(err);
    });

    // console.log(JSON.stringify(f));
  }else{
    if(this.id !== -1){
      this.favoriteLoading = true;

      this.favoriteSubscription = this.dataservice.deleteFavorite(this.id).subscribe(data => {
        this.favoriteLoading = false;
        this.isFavorited = false;
        this.id = -1;
        // console.log(data);
      }, err => {
      //  console.log(err);
      this.favoriteLoading = false;
      })
    }

  }
  }


  reservar(){

    let f = {
      "data" : {
        "flightOffers" : [
          this.flightOffer
        ]
      }
    };

    this.dataservice.paymentLoading.next(true);

    this.orderSubscription = this.dataservice.createPayment(JSON.stringify(f)).subscribe(data => {
      // console.log(data);


      this.router.navigate(['/pagamento', data]);  

      this.dataservice.paymentLoading.next(false);

    });
  }

}
