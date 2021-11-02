import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { calendarTask } from 'src/app/models/calendarTask';
import { taskStatus } from 'src/app/models/taskStatus';
import { EventServiceService } from 'src/app/services/event-service.service';
import { UpdateServiceService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-update-date-time',
  templateUrl: './update-date-time.component.html',
  styleUrls: ['./update-date-time.component.css']
})
export class UpdateDateTimeComponent implements OnInit {
  eventObject: any = this.updateService.sendData(); 
  
  sessionID = JSON.parse(sessionStorage.getItem('user') || '{}');
  
  status: string = '';
  start: any = this.eventObject[0].start_date;
  end: any = this.eventObject[0].end_date;
  title?: string = `${this.eventObject[0].title}`;
  description?: string = `${this.eventObject[0].description}`;
  
  statusValues: taskStatus[] = [
    {value: 'INCOMPLETED', viewValue: 'OPEN'},
    {value: 'COMPLETED', viewValue: 'CLOSED'},
    {value: 'FAILED', viewValue: 'FAILED'}
  ]
  constructor(private eventService: EventServiceService, 
    private updateService: UpdateServiceService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void { 
    //this.getEvent();
    console.log(this.eventObject);
   }

  //  getEvent(): void {
  //    this.eventObject = this.updateService.sendData();
     
  //  }

  updateTask(): void{
    let currentTask: calendarTask = {
      id: `${this.eventObject[0].id}`,
      user_id: `${this.sessionID.id}`,
      task_name: `${this.title}`,
      description: `${this.description}`,
      start_date: new Date(`${this.start}`),
      end_date: new Date(`${this.end}`),
      status: `${this.status}`
    }
    
    console.log(currentTask);
    this.eventService.updateEvent(currentTask).subscribe((response) => console.log(JSON.stringify(response)));
    this.bottomSheet.dismiss();
    window.location.reload();
  }

}
