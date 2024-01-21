import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderconstractionPageComponent } from './underconstraction-page.component';

describe('UnderconstractionPageComponent', () => {
  let component: UnderconstractionPageComponent;
  let fixture: ComponentFixture<UnderconstractionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderconstractionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderconstractionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
