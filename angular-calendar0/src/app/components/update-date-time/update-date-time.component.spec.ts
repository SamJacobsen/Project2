import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDateTimeComponent } from './update-date-time.component';

describe('UpdateDateTimeComponent', () => {
  let component: UpdateDateTimeComponent;
  let fixture: ComponentFixture<UpdateDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDateTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
