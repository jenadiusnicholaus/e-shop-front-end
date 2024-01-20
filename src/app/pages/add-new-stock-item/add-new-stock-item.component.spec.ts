import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStockItemComponent } from './add-new-stock-item.component';

describe('AddNewStockItemComponent', () => {
  let component: AddNewStockItemComponent;
  let fixture: ComponentFixture<AddNewStockItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStockItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewStockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
