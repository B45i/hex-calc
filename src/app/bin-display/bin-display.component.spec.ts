import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinDisplayComponent } from './bin-display.component';

describe('BinDisplayComponent', () => {
  let component: BinDisplayComponent;
  let fixture: ComponentFixture<BinDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
