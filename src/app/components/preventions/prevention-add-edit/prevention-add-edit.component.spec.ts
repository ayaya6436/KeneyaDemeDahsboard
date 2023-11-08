import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventionAddEditComponent } from './prevention-add-edit.component';

describe('PreventionAddEditComponent', () => {
  let component: PreventionAddEditComponent;
  let fixture: ComponentFixture<PreventionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreventionAddEditComponent]
    });
    fixture = TestBed.createComponent(PreventionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
