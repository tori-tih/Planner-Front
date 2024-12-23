import {Component, ViewChild, AfterViewInit, EventEmitter, Output} from "@angular/core";
import {DayPilot, DayPilotCalendarComponent, DayPilotNavigatorComponent} from "@daypilot/daypilot-lite-angular";
import {DataService} from "./data.service";
import {MyCalendar} from "../../interfaces/Calendar";
import {Subscription} from "rxjs";
import {CalendarService} from "../../services/calendar.service";
import {Event} from "../../interfaces/Event";
import {CalendarDTO} from "../../interfaces/CalendarDTO";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {
  create = false;
  @Output() outputStore = new EventEmitter<boolean>();
  listCalendar: CalendarDTO[] = []
  listCalendarEntity?: MyCalendar[]
  @ViewChild("navigator") navigator!: DayPilotNavigatorComponent;
  @ViewChild("calendar") calendar!: DayPilotCalendarComponent;
  selectedCalendar!: number;
  sub?: Subscription;
  error: string = "";

  constructor(private ds: DataService,
              private calendarService: CalendarService,
              private eventService: EventService,) {
  }
  ngOnInit(){
    // this.emitSelected(3);
    this.sub = this.calendarService.getCalendar().subscribe({
      next: data => {
        this.listCalendarEntity = data;
        console.log(this.listCalendarEntity);
        this.listCalendar =  this.listCalendarEntity.map(x=> ({
          id: x.id,
          title: x.title,
          listEvent: (x.listEvent || []).map(y => ({
            id: y.id,
            start: new DayPilot.Date(y.startDate),
            end: new DayPilot.Date(y.endDate),
            text: y.text
          }))
        }))
        console.log(this.listCalendar);
        // if(this.listCalendar.length > 0){
        //   this.selectedCalendar = this.listCalendar[0].id
        // }
        // let cal = this.listCalendar.find(x => x.id === this.selectedCalendar)
        // this.events = cal?.listEvent!;
      },
      error: e => {
        this.error = "e"
      }
    });
  }
  async addCalendar() {
    const modal = await DayPilot.Modal.prompt("Создать календарь:", 'Название');
    let res = modal.result
    if (modal.canceled) {
      return;
    }
    let mewCalendar: MyCalendar = {
      id: 0,
      title: res,
      listEvent: [],
    }
    this.calendarService.addCalendar(mewCalendar).subscribe({
      next: data => {
        let calendar = {
          id: data.id,
          title: data.title,
          listEvent: [],
        }
        this.listCalendar.push(calendar)
      },
      error: e => {
        this.error = "e"
      }
    })
  }

  async editCalendar(a: CalendarDTO) {
    const modal = await DayPilot.Modal.prompt("Изменить календарь:", a.title);
    let res = modal.result
    if (modal.canceled) {
      return;
    }
    let mewCalendar: MyCalendar = {
      id: a.id,
      title: res,
      listEvent: [],
    }
    console.log(mewCalendar.id)
    this.calendarService.updateCalendar(mewCalendar).subscribe({
      next: data => {
        let calendar = {
          id: data.id,
          title: data.title,
          listEvent: (data.listEvent || []).map(y => ({
          id: y.id,
          start: new DayPilot.Date(y.startDate),
          end: new DayPilot.Date(y.endDate),
          text: y.text
        }))
        }
        let index = this.listCalendar.findIndex(x=>x.id === data.id);
        this.listCalendar.splice(index, 1, calendar);
      },
      error: e => {
        this.error = "e"
      }
    })
  }
  handleChange(calendar: CalendarDTO){
    this.selectedCalendar = calendar.id;
    this.events = calendar.listEvent
  }
  get date(): DayPilot.Date {
    return this.config.startDate as DayPilot.Date;
  }

  set date(value: DayPilot.Date) {
    this.config.startDate = value;
  }

  navigatorConfig: DayPilot.NavigatorConfig = {
    locale: "ru-ru",
    showMonths: 1,
    skipMonths: 1,
    selectMode: "Week",
    theme: "my"
  };
  events: DayPilot.EventData[] = [];
  config: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    locale: "ru-ru",
    viewType: "Week",
    weekStarts: 1,
    theme: "calendar_green",
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt("Создать мероприятие:", 'Название');
      const calendar = args.control;
      if (modal.canceled) {
        calendar.clearSelection();
        return;
        }
      let ev : Event = {
        id: '',
        startDate: args.start.toDate(),
        endDate: args.end.toDate(),
        text: modal.result
      }
      let ev2 : DayPilot.EventData;
      this.eventService.addEvent(ev, this.selectedCalendar).subscribe({
        next: data => {
          ev2 = {
            id: data.id,
            start: new DayPilot.Date(data.startDate),
            end: new DayPilot.Date(data.endDate),
            text: data.text
          }
          this.events.push(ev2);
          console.log(this.events);
        },
        error: e => {
          this.error = "e"
          calendar.clearSelection();
        }
      })
    },
    onEventMoved: (args) => {
      // console.log(args.e.data);
      let ev : Event = {
        id: args.e.data.id,
        startDate: args.e.data.start.toDate(),
        endDate: args.e.data.end.toDate(),
        text: args.e.data.text
      }
      let ev2 : DayPilot.EventData;
      console.log('start')
      this.eventService.updateCalendar(ev).subscribe({
        next: data => {
          console.log('da');
          ev2 = {
            id: data.id,
            start: new DayPilot.Date(data.startDate),
            end: new DayPilot.Date(data.endDate),
            text: data.text
          }
          let index = this.events.findIndex(x=>x.id === data.id);
          this.events.splice(index, 1, ev2);
          console.log(this.events);
        }
      })
    },
    eventClickHandling: "ContextMenu",
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Изменить",
          onClick: async args => {
            const modal = await DayPilot.Modal.prompt("Изменить мероприятие:", args.source.data.text);
            if (modal.canceled) { return; }
            let ev: Event =  {
              id: args.source.data.id,
              startDate: args.source.data.start.toDate(),
              endDate: args.source.data.end.toDate(),
              text: modal.result
            }
            this.eventService.updateCalendar(ev).subscribe({
              next: data => {
                console.log('da');
                let ev2 = {
                  id: data.id,
                  start: new DayPilot.Date(data.startDate),
                  end: new DayPilot.Date(data.endDate),
                  text: data.text
                }
                let index = this.events.findIndex(x=>x.id === data.id);
                this.events.splice(index, 1, ev2);
                console.log(this.events);
              }
            })
            // calendar.events.update(data);
          }
        },
        {
          text: "Удалить",
          onClick: args => {
            let id = args.source.data.id;
            this.eventService.deleteCalendar(id).subscribe({
              next: data => {
                this.events = this.events.filter(x => x.id != id)
              }
            })
          }
        }
      ]
    }),
  };

  ngAfterViewInit(): void {
  }

  viewChange(): void {
    var from = this.calendar.control.visibleStart();
    var to = this.calendar.control.visibleEnd();

    console.log("viewChange(): " + from + " " + to);

    // this.ds.getEvents(from, to).subscribe(result => {
    //   this.events = result;
    // });
  }

  navigatePrevious(event: MouseEvent): void {
    event.preventDefault();
    this.config.startDate = (this.config.startDate as DayPilot.Date).addDays(-7);
  }

  navigateNext(event: MouseEvent): void {
    event.preventDefault();
    this.config.startDate = (this.config.startDate as DayPilot.Date).addDays(7);
  }

  navigateToday(event: MouseEvent): void {
    event.preventDefault();
    this.config.startDate = DayPilot.Date.today();
  }

  close(calendar: CalendarDTO[]){
    this.create=false;
    this.listCalendar = calendar;
  }

  deleteCalendar(a: CalendarDTO) {
    this.calendarService.deleteCalendar(a.id).subscribe({
      next: data => {
        this.listCalendar = this.listCalendar.filter(x => x.id != a.id)
      }
  })
  }
}

