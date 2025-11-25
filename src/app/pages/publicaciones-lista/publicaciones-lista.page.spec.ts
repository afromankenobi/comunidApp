import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacionesListaPage } from './publicaciones-lista.page';

describe('PublicacionesListaPage', () => {
  let component: PublicacionesListaPage;
  let fixture: ComponentFixture<PublicacionesListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionesListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
