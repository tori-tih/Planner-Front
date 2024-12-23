import {DayPilot} from "@daypilot/daypilot-lite-angular";

export interface EventDTO {
  id: string;
  startDate: DayPilot.Date;
  endDate: DayPilot.Date;
  text: string
}
