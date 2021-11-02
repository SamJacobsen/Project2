import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { eachDayOfInterval, startOfDay } from 'date-fns';
import { CalendarEvent } from 'calendar-utils';
import { ModalPopoutComponent } from '../modal-popout/modal-popout.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventServiceService } from '../../services/event-service.service';

@Component({
  selector: 'app-calendar-views',
  templateUrl: './calendar-views.component.html',
  styleUrls: ['./calendar-views.component.css']
})
export class CalendarViewsComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  CalendarView = CalendarView;

  sessionID = JSON.parse(sessionStorage.getItem('user') || '{}');

  @Output() dateClicked: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() singleEventClicked: EventEmitter<{}> = new EventEmitter<{}>();

  events: CalendarEvent[] = [];
  
  constructor(private eventService: EventServiceService) { }

  ngOnInit(): void {
    
    this.getEvents(this.sessionID.id);
  }
  
  setView(view: CalendarView) {
    this.view = view;
  }
  
  async getEvents(userid: number): Promise<void> {
    
    this.events = (await this.eventService.getEventsByUserID(userid).toPromise());
    this.events = this.events.map((item: any) => ({...item, start: new Date(item.start_date), end: new Date(item.end_date), title: item.task_name})); 
  }

  dayClicked({date, events}: {date: Date; events: CalendarEvent[] }): void {
    console.log(events);
    this.dateClicked.emit(events);
  }

  eventClicked(event: CalendarEvent): void {
    var eventArray: CalendarEvent[] = [];
    eventArray.push(event);
    this.singleEventClicked.emit(eventArray);
  }

}
