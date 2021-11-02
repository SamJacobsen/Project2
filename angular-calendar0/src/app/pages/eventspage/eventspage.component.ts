import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalPopoutComponent } from 'src/app/components/modal-popout/modal-popout.component';
import { Group } from 'src/app/models/Group';
//import { userGroup } from 'src/app/models/UserGroup';
import { EventServiceService } from 'src/app/services/event-service.service';
import { GroupServiceService } from 'src/app/services/group-service.service';
import { UpdateServiceService } from 'src/app/services/update-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-eventspage',
  templateUrl: './eventspage.component.html',
  styleUrls: ['./eventspage.component.css']
})
export class EventspageComponent implements OnInit {
  @ViewChild('modal') modalPopout: ModalPopoutComponent | null = null;
  
  eventClicked: boolean = false;
  events: any[] = [];

  constructor(private userService: UserServiceService, 
    private updateService: UpdateServiceService, 
    private groupService: GroupServiceService,
    private eventService: EventServiceService ) { }

  ngOnInit(): void {
  }

  sessionData: any = JSON.parse(sessionStorage.getItem('user') || '{}');

  daySelected(evt: any) {
    //console.log(evt,"is this thing on?");
    this.events = evt;
    this.modalPopout?.triggerModal(evt);
    this.eventClicked = false;
  }

  eventSelected(evt: any) {
    //console.log(evt);
    this.updateService.receiveData(evt);
    this.events = evt;
    this.modalPopout?.triggerModal(evt);
    this.eventClicked = true;
  }

  logout(): void {
    this.userService.logout();
    //console.log("is this thing on");
  }

   
}
