import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchRegistrationComponent } from './church-registration.component';

describe('ChurchRegistrationComponent', () => {
  let component: ChurchRegistrationComponent;
  let fixture: ComponentFixture<ChurchRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChurchRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
