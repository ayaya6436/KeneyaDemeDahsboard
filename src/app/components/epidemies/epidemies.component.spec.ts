import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpidemiesComponent } from './epidemies.component';

describe('EpidemiesComponent', () => {
  let component: EpidemiesComponent;
  let fixture: ComponentFixture<EpidemiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpidemiesComponent]
    });
    fixture = TestBed.createComponent(EpidemiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
