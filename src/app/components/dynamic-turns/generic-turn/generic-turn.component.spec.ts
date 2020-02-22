import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTurnComponent } from './generic-turn.component';

describe('GenericTurnComponent', () => {
  let component: GenericTurnComponent;
  let fixture: ComponentFixture<GenericTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
