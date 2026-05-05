import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrowService } from '../../core/services/grow.service';

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './grows.component.html',
})
export class GrowsComponent {

  showForm = false;

  newGrow = {
    name: '',
    medium: 'SOIL',
    description: '',
  };

  constructor(
    public growService: GrowService
  ) {}

  ngOnInit() {
    this.growService.load().subscribe();
  }

  open() {
    this.showForm = true;
  }

  close() {
    this.showForm = false;
  }

  add() {

    this.growService.create({
      name: this.newGrow.name,
      medium: this.newGrow.medium,
      description: this.newGrow.description,
    })
    .subscribe(() => {

      this.newGrow = {
        name: '',
        medium: 'SOIL',
        description: '',
      };

      this.close();
    });
  }
}
