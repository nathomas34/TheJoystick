import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichetechComponent } from './fichetech.component';

describe('FichetechComponent', () => {
  let component: FichetechComponent;
  let fixture: ComponentFixture<FichetechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichetechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichetechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
