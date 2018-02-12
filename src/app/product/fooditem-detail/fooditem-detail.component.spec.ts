import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooditemDetailComponent } from './fooditem-detail.component';

describe('FooditemDetailComponent', () => {
  let component: FooditemDetailComponent;
  let fixture: ComponentFixture<FooditemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooditemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooditemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
