import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthInterceptor} from "./services/auth.interseptor";
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthComponent} from "./pages/auth/auth.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {ModalcComponent} from "./pages/calendar/modalc/modalc.component";
import {DataService} from "./pages/calendar/data.service";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CalendarComponent,
    ModalcComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    DayPilotModule,
  ],
  providers: [
    DataService,
    CookieService,
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
