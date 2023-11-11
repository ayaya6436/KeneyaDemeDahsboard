import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneAddEditComponent } from './zone-add-edit.component';

describe('ZoneAddEditComponent', () => {
  let component: ZoneAddEditComponent;
  let fixture: ComponentFixture<ZoneAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneAddEditComponent]
    });
    fixture = TestBed.createComponent(ZoneAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
