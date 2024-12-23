import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./services/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./pages/auth/auth.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";


const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
];

// {
  //   path: 'login', loadChildren: () =>
  //     import('./pages/auth/auth.module').then((m) => m.AuthModule)
  // },
  // {
  //   path: '',
  //     loadChildren: () =>
  //       import('./pages/calendar/calendar.module').then((m) => m.CalendarModule),
  // },
  // {
  //   path: 'calendar',
  //   loadChildren: () =>
  //     import('./pages/calendar/calendar.module').then((m) => m.CalendarModule),
  // },




@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
