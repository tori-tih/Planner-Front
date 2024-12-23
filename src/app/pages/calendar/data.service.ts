import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DayPilot} from "@daypilot/daypilot-lite-angular";

@Injectable()
export class DataService {

  events: DayPilot.EventData[] = [
    // {
    //   id: "1",
    //   start: DayPilot.Date.today().addHours(10),
    //   end: DayPilot.Date.today().addHours(12),
    //   text: "пары"
    // }
  ];

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
        observer.complete();
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

}
