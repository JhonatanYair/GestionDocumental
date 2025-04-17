import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadicarFormComponent } from './radicar-form.component';

describe('RadicarFormComponent', () => {
  let component: RadicarFormComponent;
  let fixture: ComponentFixture<RadicarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadicarFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadicarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
