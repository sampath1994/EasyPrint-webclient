import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintshopComponent } from './printshop.component';

describe('PrintshopComponent', () => {
  let component: PrintshopComponent;
  let fixture: ComponentFixture<PrintshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
