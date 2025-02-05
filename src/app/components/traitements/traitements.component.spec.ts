import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementsComponent } from './traitements.component';

describe('TraitementsComponent', () => {
  let component: TraitementsComponent;
  let fixture: ComponentFixture<TraitementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraitementsComponent]
    });
    fixture = TestBed.createComponent(TraitementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
