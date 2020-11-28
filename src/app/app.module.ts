import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC5kI2ISbLRzIFcSl5aiNHIlOLGpdVHucs',
      libraries: ['places'],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
