import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  sessionLogged: any = {
  id: '',
  email: '',
  first_name: '',
  last_name: '',
  user_name: '',
  user_type: ''
}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  baseurl: string = "http://localhost:8001/user";

  constructor(private http: HttpClient, private router: Router) { }

  /** used for initial testing
  // getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.baseurl}/users`);
  // }
  
  getUserByID(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseurl}/users/${id}`);
  }
  */

  getUserByGroupID(groupID: number): Observable<User>{
    return this.http.get<User>(`${this.baseurl}/group/${groupID}`);
  }

  createUser(user: User): Observable<any>{
    console.log(user);
    return this.http.post<User>(`${this.baseurl}/register`, user, this.httpOptions);
    
  }

  updateUser(user: User): Observable<any>{
    return this.http.put(`${this.baseurl}/update`, user, this.httpOptions);
  }

  login(login: Login): void {
    this.http.post<Login>(`${this.baseurl}/login`, login, this.httpOptions)
      .toPromise()
        .then((response: any) => {
          this.sessionLogged = response;
          sessionStorage.setItem('user', JSON.stringify(this.sessionLogged));
        }).then(() =>{
            if(sessionStorage.getItem("user") !== null){
              this.router.navigate(['/calendar']);
            } else {
              //stand-in for error view or alert message
              this.router.navigate(['']);
            }
          });  
  }

  logout() {
    this.router.navigate(['']);
    sessionStorage.removeItem('user');
    
  }
  
}
