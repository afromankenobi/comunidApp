import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from '../models/publicacion.model';
import { Storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Publicaciones {
  private readonly STORAGE_KEY = 'publicaciones';
  private publicacionesSubject: BehaviorSubject<Publicacion[]> = new BehaviorSubject<Publicacion[]>([]);
  public publicaciones$: Observable<Publicacion[]> = this.publicacionesSubject.asObservable();

  constructor(private storage: Storage) {
    this.cargarPublicaciones();
  }

  private async cargarPublicaciones(): Promise<void> {
    const publicaciones = await this.storage.getItem(this.STORAGE_KEY);
    if (publicaciones) {
      // Convertir las fechas de string a Date
      const publicacionesConFechas = publicaciones.map((p: any) => ({
        ...p,
        fecha: new Date(p.fecha)
      }));
      this.publicacionesSubject.next(publicacionesConFechas);
    }
  }

  private async guardarPublicaciones(publicaciones: Publicacion[]): Promise<void> {
    await this.storage.setItem(this.STORAGE_KEY, publicaciones);
    this.publicacionesSubject.next(publicaciones);
  }

  getPublicaciones(): Publicacion[] {
    return this.publicacionesSubject.value;
  }

  async agregarPublicacion(publicacion: Omit<Publicacion, 'id' | 'fecha'>): Promise<void> {
    const publicaciones = this.getPublicaciones();
    const nuevaPublicacion: Publicacion = {
      ...publicacion,
      id: this.generarId(),
      fecha: new Date()
    };
    publicaciones.unshift(nuevaPublicacion);
    await this.guardarPublicaciones(publicaciones);
  }

  async eliminarPublicacion(id: string): Promise<void> {
    const publicaciones = this.getPublicaciones().filter(p => p.id !== id);
    await this.guardarPublicaciones(publicaciones);
  }

  private generarId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
