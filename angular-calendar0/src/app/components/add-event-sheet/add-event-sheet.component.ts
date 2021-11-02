import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UpdateServiceService } from 'src/app/services/update-service.service';
import { SetDateTimeComponent } from '../set-date-time/set-date-time.component';
import { UpdateDateTimeComponent } from '../update-date-time/update-date-time.component';

@Component({
  selector: 'app-add-event-sheet',
  templateUrl: './add-event-sheet.component.html',
  styleUrls: ['./add-event-sheet.component.css']
})
export class AddEventSheetComponent implements OnInit {

  eventObject = this.updateService.sendData();

  constructor(private bottomSheet: MatBottomSheet, private updateService: UpdateServiceService) {}

  openAddSheet(): void {
    this.bottomSheet.open(SetDateTimeComponent);
  }

  openUpdateSheet(): void {
    this.bottomSheet.open(UpdateDateTimeComponent);
  }

  ngOnInit(): void {
  }

}
