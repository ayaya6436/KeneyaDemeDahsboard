import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasComponent } from './cas.component';

describe('CasComponent', () => {
  let component: CasComponent;
  let fixture: ComponentFixture<CasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CasComponent]
    });
    fixture = TestBed.createComponent(CasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
