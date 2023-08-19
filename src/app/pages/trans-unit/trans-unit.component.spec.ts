import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransUnitComponent } from './trans-unit.component';

describe('TransUnitComponent', () => {
  let component: TransUnitComponent;
  let fixture: ComponentFixture<TransUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransUnitComponent]
    });
    fixture = TestBed.createComponent(TransUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
