import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetLinkComponent } from './reset-link.component';

describe('ResetLinkComponent', () => {
  let component: ResetLinkComponent;
  let fixture: ComponentFixture<ResetLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
