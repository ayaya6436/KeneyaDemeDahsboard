import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventionsComponent } from './preventions.component';

describe('PreventionsComponent', () => {
  let component: PreventionsComponent;
  let fixture: ComponentFixture<PreventionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreventionsComponent]
    });
    fixture = TestBed.createComponent(PreventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
