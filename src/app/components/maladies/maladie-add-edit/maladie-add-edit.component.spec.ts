import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaladieAddEditComponent } from './maladie-add-edit.component';

describe('MaladieAddEditComponent', () => {
  let component: MaladieAddEditComponent;
  let fixture: ComponentFixture<MaladieAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaladieAddEditComponent]
    });
    fixture = TestBed.createComponent(MaladieAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
