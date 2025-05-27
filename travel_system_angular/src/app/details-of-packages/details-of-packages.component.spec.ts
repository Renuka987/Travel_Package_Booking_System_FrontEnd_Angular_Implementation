import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfPackagesComponent } from './details-of-packages.component';

describe('DetailsOfPackagesComponent', () => {
  let component: DetailsOfPackagesComponent;
  let fixture: ComponentFixture<DetailsOfPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsOfPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsOfPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
