import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'publicaciones-lista',
    pathMatch: 'full',
  },
  {
    path: 'publicaciones-lista',
    loadComponent: () => import('./pages/publicaciones-lista/publicaciones-lista.page').then( m => m.PublicacionesListaPage)
  },
  {
    path: 'nueva-publicacion',
    loadComponent: () => import('./pages/nueva-publicacion/nueva-publicacion.page').then( m => m.NuevaPublicacionPage)
  },
];
