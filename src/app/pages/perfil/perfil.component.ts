import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/shared/data-storage.service';
import { FlightOffer } from 'src/app/shared/flightoffers.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  favorites : FlightOffer[] = [];
  email : string;

  constructor(private userService: AuthService, private dataService : DataService) { }

  ngOnInit(): void {
    this.userService.user.subscribe(data => this.email = data.login);
    this.dataService.getFavorites().subscribe((data:any) => {
      let d = data.map(x=> x.data.flightOffers[0]);
      this.favorites = d;
      console.log(this.favorites);
      
      console.log(data);
    });
  }

}
