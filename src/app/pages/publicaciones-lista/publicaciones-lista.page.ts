import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { Publicacion } from '../../models/publicacion.model';
import { Publicaciones } from '../../services/publicaciones';
import { PublicacionItemComponent } from '../../components/publicacion-item/publicacion-item.component';
import { ConfirmDeleteModalComponent } from '../../components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-publicaciones-lista',
  templateUrl: './publicaciones-lista.page.html',
  styleUrls: ['./publicaciones-lista.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, PublicacionItemComponent]
})
export class PublicacionesListaPage implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(
    private publicacionesService: Publicaciones,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarPublicaciones();
  }

  ionViewWillEnter() {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.publicacionesService.publicaciones$.subscribe(publicaciones => {
      this.publicaciones = publicaciones;
    });
  }

  async confirmarEliminar(id: string) {
    const publicacion = this.publicaciones.find(p => p.id === id);
    if (!publicacion) return;

    const modal = await this.modalController.create({
      component: ConfirmDeleteModalComponent,
      componentProps: {
        titulo: publicacion.titulo
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data?.confirmado) {
      await this.publicacionesService.eliminarPublicacion(id);
    }
  }

  irANuevaPublicacion() {
    this.router.navigate(['/nueva-publicacion']);
  }
}
