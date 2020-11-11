import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './header/header.component';
import { PageTestComponent } from './page-test/page-test.component';
import { ResultsComponent } from './results/results.component';
import { AirlineTicketService } from './shared/airlineticket.service';
import { MatOptgroup } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-router.module';
import {LayoutModule} from '@angular/cdk/layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketCardComponent } from './shared/ticket-card/ticket-card.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    PageTestComponent,
    ResultsComponent,
    TicketCardComponent,
    DropdownComponent,      
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    AppRoutingModule,
    NgbModule
    
  ],
  providers: [AirlineTicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
