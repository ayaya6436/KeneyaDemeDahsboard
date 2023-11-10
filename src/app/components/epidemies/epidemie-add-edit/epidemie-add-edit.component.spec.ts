import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpidemieAddEditComponent } from './epidemie-add-edit.component';

describe('EpidemieAddEditComponent', () => {
  let component: EpidemieAddEditComponent;
  let fixture: ComponentFixture<EpidemieAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpidemieAddEditComponent]
    });
    fixture = TestBed.createComponent(EpidemieAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
