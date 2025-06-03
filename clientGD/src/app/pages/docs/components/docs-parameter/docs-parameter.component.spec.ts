import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsParameterComponent } from './docs-parameter.component';

describe('DocsParameterComponent', () => {
  let component: DocsParameterComponent;
  let fixture: ComponentFixture<DocsParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsParameterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocsParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
