import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/shared/data-storage.service';
import { FlightOffer } from 'src/app/shared/flightoffers.model';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  favorites : FlightOffer[] = [];
  orders : Order[] = [];
  email : string;

  subscriptionUser : Subscription;
  subscriptionFav : Subscription;
  subscriptionCheckouts : Subscription;

  isLoadingFav = false;
  isLoadingCheckouts = false;

  noFavs = false;
  noOrders = false;

  constructor(private userService: AuthService, private dataService : DataService) { }


  ngOnDestroy(): void {
    this.subscriptionFav?.unsubscribe();
    this.subscriptionCheckouts?.unsubscribe();
    this.subscriptionUser?.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoadingFav  = true;
    this.isLoadingCheckouts = true;
    this.subscriptionUser = this.userService.user.subscribe(data => this.email = data?.login);
    this.subscriptionFav = this.dataService.getFavorites().subscribe((data:any) => {
      let d = data.map(x => x.data.flightOffers[0]);
      this.favorites = d;
      this.isLoadingFav= false;
    }, err => {
      // console.log(err)
      this.isLoadingFav = false;
      this.noFavs = true;
    });
    this.subscriptionCheckouts = this.dataService.getOrders().subscribe(data => {
      this.orders = data;
      this.isLoadingCheckouts = false;
    }, err => {
      // console.log(err);
      this.isLoadingCheckouts=false;
      this.noOrders = true;
    })
  }

}
