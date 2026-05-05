import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PlantService } from '../../core/services/plant.service';
import { GrowService } from '../../core/services/grow.service';

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './plants.component.html',
})
export class PlantsComponent {

  selectedGrowId: number | null = null;

  showForm = false;

  newPlant = {
    name: '',
    strain: '',
    stage: 'SEEDLING',
    notes: '',
    germinationDate: new Date().toISOString().split('T')[0],
    growId: null as number | null,
  };

  constructor(
    public plantService: PlantService,
    public growService: GrowService
  ) {}

  ngOnInit() {
    this.plantService.load().subscribe();
    this.growService.load().subscribe();
  }

  filteredPlants() {

    if (!this.selectedGrowId) {
      return this.plantService.plants();
    }

    return this.plantService.byGrow(this.selectedGrowId);
  }

  open() {
    this.showForm = true;
  }

  close() {
    this.showForm = false;
  }

  add() {

    this.plantService.create({
      name: this.newPlant.name,
      strain: this.newPlant.strain,
      stage: this.newPlant.stage,
      notes: this.newPlant.notes,
      germinationDate: this.newPlant.germinationDate,
      growId: this.newPlant.growId!,
    })
    .subscribe(() => {

      this.newPlant = {
        name: '',
        strain: '',
        stage: 'SEEDLING',
        notes: '',
        germinationDate: new Date().toISOString().split('T')[0],
        growId: null,
      };

      this.close();
    });
  }
}
