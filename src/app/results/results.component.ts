import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data-storage.service';
import {FlightOffers, FlightOffer, Dictionaries} from '../shared/flightoffers.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  flightOffers : FlightOffer[] = []
  dictionaries = {};


  isLoading = false;
  error = null;

  searchSubscription : Subscription;

  returnDate : string;
  departureDate : string;
  origin : string;
  destination : string;
  originName : string;
  destinationName : string;


  constructor(private dataService : DataService, private router : ActivatedRoute, private r : Router) { }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();   
  }


  ngOnInit(): void {
    let results = this.router.snapshot.params;
    
    console.log(results);

    if(Object.keys(results).length){      
      // let offers : FlightOffers = JSON.parse(results);
      let params = results;

      this.returnDate = params.returnDate;
      this.departureDate = params.departureDate;
      this.destination = params.destinationCode;
      this.origin = params.originCode;
      this.originName = params.originName;
      this.destinationName = params.destinationName;
      

      this.isLoading = true;    

      this.searchSubscription = this.dataService
        .searchTickets(params)
        .subscribe(
          (data) => {
            this.isLoading = false;
            this.flightOffers = data.data;
            this.dictionaries = data.dictionaries;
            console.log(data);
            console.log(this.flightOffers);
          },
          (err) => {
            console.log(err.error);
            this.error = err.error.titulo ?? 'Erro!';
            this.isLoading = false;
          }
        );
    }else{
      this.r.navigate(['pesquisa']);
    }
  }


  private getDateFormatted(date : Date){
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();
    return d + "/" + m + "/" + y; 
  }
}


