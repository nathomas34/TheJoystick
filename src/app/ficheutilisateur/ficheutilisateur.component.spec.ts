import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheutilisateurComponent } from './ficheutilisateur.component';

describe('FicheutilisateurComponent', () => {
  let component: FicheutilisateurComponent;
  let fixture: ComponentFixture<FicheutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheutilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
