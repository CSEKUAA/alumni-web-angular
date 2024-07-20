import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimarynavComponent } from './primarynav.component';

describe('PrimarynavComponent', () => {
  let component: PrimarynavComponent;
  let fixture: ComponentFixture<PrimarynavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimarynavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimarynavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
