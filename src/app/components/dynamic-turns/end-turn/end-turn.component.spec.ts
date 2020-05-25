import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTurnComponent } from './end-turn.component';

describe('EndTurnComponent', () => {
  let component: EndTurnComponent;
  let fixture: ComponentFixture<EndTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
