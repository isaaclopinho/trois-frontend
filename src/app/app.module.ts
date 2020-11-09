import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar'
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

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
    AppRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
