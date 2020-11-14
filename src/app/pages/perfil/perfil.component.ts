import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/shared/data-storage.service';
import { FlightOffer } from 'src/app/shared/flightoffers.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  favorites : FlightOffer[] = [];
  email : string;

  subscriptionUser : Subscription;
  subscriptionFav : Subscription;

  constructor(private userService: AuthService, private dataService : DataService) { }


  ngOnDestroy(): void {
    this.subscriptionFav?.unsubscribe();
    this.subscriptionUser?.unsubscribe();
  }
  
  ngOnInit(): void {
    this.subscriptionUser = this.userService.user.subscribe(data => this.email = data.login);
    this.subscriptionFav = this.dataService.getFavorites().subscribe((data:any) => {
      let d = data.map(x=> x.data.flightOffers[0]);
      this.favorites = d;
      console.log(this.favorites);
      
      console.log(data);
    });
  }

}
