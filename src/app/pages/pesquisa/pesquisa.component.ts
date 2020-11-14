import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit{
  
  @ViewChild('inputOrigin', { static: false}) inputOrigin: ElementRef;
  @ViewChild('inputDestination', { static: false}) inputDestination: ElementRef;
  @ViewChild('dropOrigin', { static: false}) dropdownOrigin: ElementRef;
  @ViewChild('dropDestination', { static: false}) dropdownDestionation: ElementRef;  
  @ViewChild('f', {static : false}) form : NgForm;

  isLoading = false;
  error = null;
  loadingLocations = false;
  locations = [];

  searchSubscription : Subscription;
  locationSubscription : Subscription;


  constructor(private dataService : DataService, private router : Router) {    
  }


  ngOnInit(): void {


  }

  ngOnDestroy(): void {
    this.dataService.paymentLoading.next(false);
    this.searchSubscription?.unsubscribe();
    this.locationSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputOrigin.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(value => { this.searchLocations(value)});

    fromEvent(this.inputDestination.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(value => { this.searchLocations(value)});
  }
  
  
  onSearch(form : NgForm){


  console.log(form);
    if(!form.valid){
      this.error = "Todos os campos devem ser preenchidos ou há campos inválidos!"
      return;
    }
    let params = {
      "adults": form.controls.adults.value,
      "children": form.controls.children.value,
      "currencyCode": "BRL",
      "departureDate": form.controls.departureDate.value,
      "destinationCode": form.controls.destinationCode.value,
      "infants": 0,
      "max": 5,
      "originCode": form.controls.originCode.value,
      "returnDate": form.controls.returnDate.value
    };

    this.router.navigate(['/passagens', params]);    
  }

  setInputOrigin(iataCode : string){
    this.form.controls.originCode.setValue(iataCode.toUpperCase());
  }

  setInputDestination(iataCode : string){
    this.form.controls.destinationCode.setValue(iataCode.toUpperCase());
  }

  searchLocations(value : string){
    this.loadingLocations = true;

    this.locationSubscription = this.dataService.getLocations(value).subscribe(locations => {
      console.log(locations);
      this.locations = locations;
      this.loadingLocations = false;
    }, err => {
      this.locations = [];
      this.loadingLocations = false;
    });
  }

  resetData(){
    this.locations = [];
  }

}
