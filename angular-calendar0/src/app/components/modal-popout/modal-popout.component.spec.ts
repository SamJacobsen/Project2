import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopoutComponent } from './modal-popout.component';

describe('ModalPopoutComponent', () => {
  let component: ModalPopoutComponent;
  let fixture: ComponentFixture<ModalPopoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPopoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPopoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
