import { Component, ViewChild } from '@angular/core';
import { ModalPopoutComponent } from './components/modal-popout/modal-popout.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //popup logic no longer required after moving to the eventspage view
  //keeping in the event i have to revert to it
  
  // @ViewChild('modal') modalPopout: ModalPopoutComponent | null = null;

  // events: any[] = [];

  // testDaySelected(evt: any) {
  //   console.log(evt,"is this thing on?");
  //   this.events = evt;
  //   this.modalPopout?.triggerModal(evt);
  // }
}
