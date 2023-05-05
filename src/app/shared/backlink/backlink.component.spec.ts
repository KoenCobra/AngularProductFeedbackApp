import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklinkComponent } from './backlink.component';

describe('BacklinkComponent', () => {
  let component: BacklinkComponent;
  let fixture: ComponentFixture<BacklinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacklinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
