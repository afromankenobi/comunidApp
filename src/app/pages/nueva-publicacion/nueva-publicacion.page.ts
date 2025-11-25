import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Publicaciones } from '../../services/publicaciones';

@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.page.html',
  styleUrls: ['./nueva-publicacion.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class NuevaPublicacionPage {
  publicacionForm: FormGroup;
  fotoCapturada: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private publicacionesService: Publicaciones,
    private router: Router
  ) {
    this.publicacionForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  get titulo() {
    return this.publicacionForm.get('titulo');
  }

  get descripcion() {
    return this.publicacionForm.get('descripcion');
  }

  async capturarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.fotoCapturada = imagen.dataUrl;
    } catch (error) {
      console.error('Error al capturar foto:', error);
    }
  }

  async guardarPublicacion() {
    if (this.publicacionForm.valid) {
      const { titulo, descripcion } = this.publicacionForm.value;

      await this.publicacionesService.agregarPublicacion({
        titulo,
        descripcion,
        foto: this.fotoCapturada
      });

      this.router.navigate(['/publicaciones-lista']);
    }
  }

  volver() {
    this.router.navigate(['/publicaciones-lista']);
  }
}
