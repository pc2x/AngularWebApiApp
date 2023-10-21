import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { provideRouter } from '@angular/router';
import routeConfig from './routes';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeComponent,
    RouterModule
  ],
  providers: [ provideRouter(routeConfig)],
  bootstrap: [AppComponent]
})
export class AppModule { }
