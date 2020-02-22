import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteTurnComponent } from './vote-turn.component';

describe('VoteTurnComponent', () => {
  let component: VoteTurnComponent;
  let fixture: ComponentFixture<VoteTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
