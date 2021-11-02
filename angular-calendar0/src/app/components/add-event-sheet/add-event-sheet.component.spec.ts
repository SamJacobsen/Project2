import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventSheetComponent } from './add-event-sheet.component';

describe('AddEventSheetComponent', () => {
  let component: AddEventSheetComponent;
  let fixture: ComponentFixture<AddEventSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
