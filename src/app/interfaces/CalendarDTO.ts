import {EventDTO} from "./EventDTO";
import {DayPilot} from "@daypilot/daypilot-lite-angular";

export interface CalendarDTO {
  id: number;
  title: string;
  listEvent: DayPilot.EventData[];
}
