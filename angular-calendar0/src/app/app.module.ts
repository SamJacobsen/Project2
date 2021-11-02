import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ModalPopoutComponent } from './components/modal-popout/modal-popout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarViewsComponent } from './components/calendar-views/calendar-views.component';
import { EventspageComponent } from './pages/eventspage/eventspage.component';
import { LoginRegisterFormComponent } from './components/login-register-form/login-register-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SetDateTimeComponent } from './components/set-date-time/set-date-time.component';
import { AddEventSheetComponent } from './components/add-event-sheet/add-event-sheet.component';
import { UpdateDateTimeComponent } from './components/update-date-time/update-date-time.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    ModalPopoutComponent,
    CalendarViewsComponent,
    EventspageComponent,
    LoginRegisterFormComponent,
    SetDateTimeComponent,
    AddEventSheetComponent,
    UpdateDateTimeComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }), 
    NgbModule, 
    BrowserAnimationsModule,
    AngularMaterialModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule, 
    NgxMatDatetimePickerModule, 
    NgxMatTimepickerModule, 
    NgxMatNativeDateModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
