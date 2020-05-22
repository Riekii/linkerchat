import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreauserComponent } from './creauser.component';

describe('CreauserComponent', () => {
  let component: CreauserComponent;
  let fixture: ComponentFixture<CreauserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreauserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
