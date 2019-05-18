import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTurnComponent } from './role-turn.component';

describe('RoleTurnComponent', () => {
  let component: RoleTurnComponent;
  let fixture: ComponentFixture<RoleTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
