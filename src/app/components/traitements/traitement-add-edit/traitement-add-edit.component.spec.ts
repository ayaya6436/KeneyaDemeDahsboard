import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementAddEditComponent } from './traitement-add-edit.component';

describe('TraitementAddEditComponent', () => {
  let component: TraitementAddEditComponent;
  let fixture: ComponentFixture<TraitementAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraitementAddEditComponent]
    });
    fixture = TestBed.createComponent(TraitementAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
