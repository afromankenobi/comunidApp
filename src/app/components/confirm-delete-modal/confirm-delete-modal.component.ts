import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ConfirmDeleteModalComponent {
  @Input() titulo: string = '';

  constructor(private modalController: ModalController) {}

  confirmar() {
    this.modalController.dismiss({ confirmado: true });
  }

  cancelar() {
    this.modalController.dismiss({ confirmado: false });
  }
}
