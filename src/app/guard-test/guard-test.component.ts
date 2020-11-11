import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Airports } from '../shared/airports.model';
import { DataService } from '../shared/data-storage.service';

@Component({
  selector: 'app-guard-test',
  templateUrl: './guard-test.component.html',
  styleUrls: ['./guard-test.component.css']
})
export class GuardTestComponent implements OnInit ,OnDestroy {
  dataSubs: Subscription;
  data: any[] = [];

  constructor(private dataservice : DataService) { }

  ngOnInit(): void {
    this.dataSubs = this.dataservice.getLocations().subscribe( data => {
      console.log(data);
      this.data = data;
    })
  }
  ngOnDestroy(): void {
    this.dataSubs.unsubscribe();
    
  }

}
