import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ControlContainer, FormControlName, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './header/header.component';
import { ResultsComponent } from './results/results.component';
import { AirlineTicketService } from './shared/airlineticket.service';
import { AppRoutingModule } from './app-router.module';
import { TicketCardComponent } from './shared/ticket-card/ticket-card.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { AuthService } from './auth/auth.service';
import { DataService } from './shared/data-storage.service';
import { AuthInterceptorService } from './auth/auth.interceptor';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { FooterComponent } from './components/footer/footer.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ResultsComponent,
    TicketCardComponent,
    DropdownComponent,     
    PesquisaComponent, 
    FooterComponent,
    CadastroComponent,
    PerfilComponent,
    DropdownComponent  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule 
  ],
  providers: [AirlineTicketService, AuthService, DataService, {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
