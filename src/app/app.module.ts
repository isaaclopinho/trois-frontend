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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketCardComponent } from './shared/ticket-card/ticket-card.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './shared/data-storage.service';
import { AuthInterceptorService } from './auth/auth.interceptor';
import { CommonModule } from '@angular/common';
import { GuardTestComponent } from './guard-test/guard-test.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { FooterComponent } from './components/footer/footer.component';
import { PerfilComponent } from './pages/perfil/perfil.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    PageTestComponent,
    ResultsComponent,
    TicketCardComponent,
    DropdownComponent, 
    GuardTestComponent,     
    PesquisaComponent, FooterComponent , PerfilComponent 
    
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatToolbarModule
    
    

    
    
  ],
  providers: [AirlineTicketService, AuthService, DataService, {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
