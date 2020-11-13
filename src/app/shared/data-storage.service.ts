import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { Subject } from 'rxjs';
import { Airports } from './airports.model';
import { FlightOffers } from './flightoffers.model';
@Injectable({
    providedIn: 'root'
})
export class DataService {

    data = new Subject<any>();

    constructor(private http : HttpClient, private authService : AuthService ){}

    getLocations(location){
           return this.http.post<Airports[]>(this.authService.URL + '/tickets/search/location', {
                "location": location
           }).pipe(map(resData => resData.map((x) => {return {"name" : x.name, "iataCode" : x.iataCode}})));  
    }

    
    searchTickets(params){
        return this.http.post<FlightOffers>(this.authService.URL + '/tickets/offers', params);
    }



}