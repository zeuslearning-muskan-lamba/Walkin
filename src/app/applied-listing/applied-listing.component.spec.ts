import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedListingComponent } from './applied-listing.component';

describe('AppliedListingComponent', () => {
  let component: AppliedListingComponent;
  let fixture: ComponentFixture<AppliedListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
