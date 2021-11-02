import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { calendarTask } from '../models/calendarTask';


@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  baseurl: string = 'http://localhost:8001/task'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<CalendarEvent[] >{
    return this.http.get<CalendarEvent[]>(`${this.baseurl}/all`, this.httpOptions);
  }

  getEventsByUserID(userID: number): Observable<CalendarEvent[]>{
    return this.http.get<CalendarEvent[]>(`${this.baseurl}/user/${userID}`);
  }

  getEventsByTaskID(taskID: number): Observable<CalendarEvent[]>{
    return this.http.get<CalendarEvent[]>(`${this.baseurl}/${taskID}`);
  }

  getEventsByGroupID(groupID: number): Observable<CalendarEvent[]>{
    return this.http.get<CalendarEvent[]>(`${this.baseurl}/group/${groupID}`);
  }
  createNewEvent(task: calendarTask): Observable<any>{
    console.log(task);
    return this.http.post<calendarTask>(`${this.baseurl}/new`, task, this.httpOptions);
  }

  updateEvent(task: calendarTask): Observable<any>{
    return this.http.put<calendarTask>(`${this.baseurl}/update`, task, this.httpOptions);
  }

  deleteEvent(taskID: number): Observable<any>{
    return this.http.delete<any>(`${this.baseurl}/delete/${taskID}`);
  }
}
