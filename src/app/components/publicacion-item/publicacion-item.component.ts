import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Publicacion } from '../../models/publicacion.model';
import { FormatoFechaPipe } from '../../pipes/formato-fecha-pipe';

@Component({
  selector: 'app-publicacion-item',
  templateUrl: './publicacion-item.component.html',
  styleUrls: ['./publicacion-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormatoFechaPipe]
})
export class PublicacionItemComponent {
  @Input() publicacion!: Publicacion;
  @Output() eliminar = new EventEmitter<string>();

  onEliminar() {
    this.eliminar.emit(this.publicacion.id);
  }
}
