import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsTrasladarComponent } from './docs-trasladar.component';

describe('DocsTrasladarComponent', () => {
  let component: DocsTrasladarComponent;
  let fixture: ComponentFixture<DocsTrasladarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsTrasladarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocsTrasladarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
