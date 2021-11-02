import { Component, OnInit } from '@angular/core';
import { calendarTask } from 'src/app/models/calendarTask';
import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker';
import { EventServiceService } from 'src/app/services/event-service.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-set-date-time',
  templateUrl: './set-date-time.component.html',
  styleUrls: ['./set-date-time.component.css']
})
export class SetDateTimeComponent implements OnInit {
  start: any;
  end: any;
  title: string = '';
  description: string= '';

  sessionID = JSON.parse(sessionStorage.getItem('user') || '{}');

  constructor(private eventService: EventServiceService, private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  createTask(): void{
    const newTask: calendarTask = {
      user_id: `${this.sessionID.id}`,
      task_name: `${this.title}`,
      description: `${this.description}`,
      start_date: new Date(`${this.start}`),
      end_date: new Date(`${this.end}`),
      status: 'COMPLETED'
    }
    console.log(newTask);
    this.eventService.createNewEvent(newTask).subscribe((response) => console.log(JSON.stringify(response)));
    this.bottomSheet.dismiss();
    window.location.reload();
  }

  sessionLog(): void{
    console.log('literally taking up space');
  }
}
