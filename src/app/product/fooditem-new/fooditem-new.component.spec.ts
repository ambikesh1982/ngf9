import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooditemNewComponent } from './fooditem-new.component';

describe('FooditemNewComponent', () => {
  let component: FooditemNewComponent;
  let fixture: ComponentFixture<FooditemNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooditemNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooditemNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
