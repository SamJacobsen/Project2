import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventServiceService } from 'src/app/services/event-service.service';
import { EventspageComponent } from '../../pages/eventspage/eventspage.component';
import { UpdateDateTimeComponent } from '../update-date-time/update-date-time.component';

@Component({
  selector: 'app-modal-popout',
  templateUrl: './modal-popout.component.html',
  styleUrls: ['./modal-popout.component.css']
})
export class ModalPopoutComponent implements OnInit {
  closeModal: string = '';
  @Input() events: any[] = [];
  @Input() eventClicked: boolean = false;

  @ViewChild('modalData') modalData: any;

  constructor(private modalService: NgbModal, 
    private bottomsheet: MatBottomSheet,
    private eventService: EventServiceService) { }
  
  ngOnInit(): void {
  }

  triggerModal(content: any) {
    this.modalService.open(this.modalData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if(reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if(reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with ${reason}`;
    }
  }

  updateSheet(): void {
    this.bottomsheet.open(UpdateDateTimeComponent);
  }
  
  deleteEvent(): void {
    this.eventService.deleteEvent(this.events[0].id).subscribe((response) => console.log(response));
    window.location.reload();
  }
}
