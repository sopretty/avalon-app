import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameComponent } from './end-game.component';

describe('EndGameComponent', () => {
  let component: EndGameComponent;
  let fixture: ComponentFixture<EndGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
