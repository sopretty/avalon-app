import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTurnComponent } from './audio-turn.component';

describe('AudioTurnComponent', () => {
  let component: AudioTurnComponent;
  let fixture: ComponentFixture<AudioTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
