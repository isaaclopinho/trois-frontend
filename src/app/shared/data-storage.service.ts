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

    public paymentLoading = new Subject<boolean>();

    constructor(private http : HttpClient, private authService : AuthService ){}

    getLocations(location){
           return this.http.post<Airports[]>(this.authService.URL + '/tickets/search/location', {
                "location": location
           }).pipe(map(resData => resData.map((x) => {return {"name" : x.name, "iataCode" : x.iataCode}})));  
    }

    
    searchTickets(params){
        return this.http.post<FlightOffers>(this.authService.URL + '/tickets/offers', params);
    }

    registerFavorite(data){
        return this.http.post(this.authService.URL + "/favorites", data);
    }
    

    getFavorites(){
        return this.http.get(this.authService.URL + "/favorites/list");
    }

    deleteFavorite(i : number){
        return this.http.delete(this.authService.URL + "/favorites/"+i);
    }

    createPayment(data){
        return this.http.post(this.authService.URL + "/payment/create", data);
    }



}