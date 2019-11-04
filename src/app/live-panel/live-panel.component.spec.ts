import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePanelComponent } from './live-panel.component';

describe('LivePanelComponent', () => {
  let component: LivePanelComponent;
  let fixture: ComponentFixture<LivePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
