import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateServiceService {
  miscObject: any;

  constructor() { }

  receiveData(data: any): void {
    this.miscObject = data;
  }

  sendData(): Observable<any> {
    return this.miscObject;
  }
  
}
