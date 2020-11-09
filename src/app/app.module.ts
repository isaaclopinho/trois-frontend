import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'

import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { AppRoutingModule } from './app-router.module';
import { HeaderComponent } from './header/header.component';
import { PageTestComponent } from './page-test/page-test.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    HeaderComponent,
    PageTestComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
