import { CalendarEvent } from "angular-calendar";
import { startOfDay } from "date-fns";

export const EVENTS: CalendarEvent[] = [
  {
    start: new Date("10/17/2021 17:00:"),
    end: new Date("10/17/2021 17:30"),
    title: 'first test date'
  },
  {
    start: startOfDay(new Date()),
    title: 'An event with no end date'
  },
  // {
  //   start: startOfDay(new Date()),
  //   title: 'Second event'
  // }
]