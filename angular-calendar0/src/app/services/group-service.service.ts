import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from '../models/Group';
import { User } from '../models/User';
import { userGroup } from '../models/UserGroup';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
  baseurl: string = `http://localhost:8001/group`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<Group[]>{
    return this.http.get<Group[]>(`${this.baseurl}/all`, this.httpOptions);
  }

  getGroupByUserID(userID: number): Observable<Group[]>{
    return this.http.get<Group[]>(`${this.baseurl}/user/${userID}`, this.httpOptions);
  }

  createNewGroup(group: Group): Observable<any>{
    return this.http.post(`${this.baseurl}/new`, group, this.httpOptions);
  }

  addUserToGroup(UserGroup: userGroup): Observable<any>{
    return this.http.post(`${this.baseurl}/user/add`, UserGroup, this.httpOptions);
  }
}
