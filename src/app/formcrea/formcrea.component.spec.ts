import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcreaComponent } from './formcrea.component';

describe('FormcreaComponent', () => {
  let component: FormcreaComponent;
  let fixture: ComponentFixture<FormcreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormcreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormcreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
