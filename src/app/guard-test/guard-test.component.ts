import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Airports } from '../shared/airports.model';
import { DataService } from '../shared/data-storage.service';

@Component({
  selector: 'app-guard-test',
  templateUrl: './guard-test.component.html',
  styleUrls: ['./guard-test.component.css']
})
export class GuardTestComponent implements OnInit, OnDestroy,  AfterViewInit {
  dataSubs: Subscription;
  data: any[] = [];
  isLoading = false;

  constructor(private dataservice : DataService) { }
  
  @ViewChild('input', { static: false}) input: ElementRef;
  @ViewChild('myDrop', { static: false}) dropdownData: ElementRef;
  @ViewChild('input2', { static: false}) input2: ElementRef;
  @ViewChild('myDrop2', { static: false}) dropdownData2: ElementRef;
  
  yourVar : any;

  ngOnInit(): void {
    // this.isLoading = true;
    // this.dataSubs = 

    // this.dataSubs = this.dataservice.searchTickets().subscribe( data => {
    //   this.data = data.data;
    //   console.log(data.data);
    //   this.isLoading = false;
    // })
  }

  ngOnDestroy(): void {
    // this.dataSubs.unsubscribe();    
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(value => { this.searchLocations(value)});

    fromEvent(this.input2.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(value => { this.searchLocations(value)});
  }


  searchLocations(value : string){
    this.isLoading = true;

    this.dataservice.getLocations(value).subscribe( data => {
      console.log(data);
      //@ts-ignore
      console.log(this.dropdownData);
      this.data = data;
      this.isLoading = false;
    }, err => {
      this.data = [];
      this.isLoading = false;
    });
  }

  resetData(){
    this.data = [];
  }
}
