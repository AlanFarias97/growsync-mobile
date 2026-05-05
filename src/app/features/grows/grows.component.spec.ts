import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GrowsComponent } from './grows.component';

describe('GrowsComponent', () => {
  let component: GrowsComponent;
  let fixture: ComponentFixture<GrowsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GrowsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
