import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDateTimeComponent } from './set-date-time.component';

describe('SetDateTimeComponent', () => {
  let component: SetDateTimeComponent;
  let fixture: ComponentFixture<SetDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetDateTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
