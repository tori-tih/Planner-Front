import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyCalendar} from "../interfaces/Calendar";
import {Event} from "../interfaces/Event";


@Injectable({
  providedIn: 'root'
})
export class EventService {
  url = `${environment.apiUrl}/event`
  constructor(private httpClient: HttpClient) { }

  addEvent(event: Event, calendarId: number): Observable<Event> {
    return this.httpClient.post<Event>(this.url, event, {params: {calendarId: calendarId}});
  }

  updateCalendar(event: Event): Observable<Event> {
    return this.httpClient.put<Event>(this.url, event);
  }

  deleteCalendar(id:string){
    return this.httpClient.delete(this.url+"/"+id)
  }
}
