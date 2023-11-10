import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceAddEditComponent } from './annonce-add-edit.component';

describe('AnnonceAddEditComponent', () => {
  let component: AnnonceAddEditComponent;
  let fixture: ComponentFixture<AnnonceAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceAddEditComponent]
    });
    fixture = TestBed.createComponent(AnnonceAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
