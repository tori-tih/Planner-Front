import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyCalendar} from "../interfaces/Calendar";


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  url = `${environment.apiUrl}/calendar`
  constructor(private httpClient: HttpClient) { }

  getCalendar(): Observable<MyCalendar[]> {
    return this.httpClient.get<MyCalendar[]>(this.url);
  }

  addCalendar(calendar: MyCalendar): Observable<MyCalendar> {
    return this.httpClient.post<MyCalendar>(this.url, calendar);
  }

  updateCalendar(calendar: MyCalendar): Observable<MyCalendar> {
    return this.httpClient.put<MyCalendar>(this.url, calendar);
  }

  deleteCalendar(id:number){
    return this.httpClient.delete(this.url+"/"+id)
  }


}
