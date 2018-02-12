import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooditemModifyComponent } from './fooditem-modify.component';

describe('FooditemModifyComponent', () => {
  let component: FooditemModifyComponent;
  let fixture: ComponentFixture<FooditemModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooditemModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooditemModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
