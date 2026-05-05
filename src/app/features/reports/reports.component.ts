import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrowService } from '../../core/services/grow.service';
import { PlantService } from '../../core/services/plant.service';
import { DailyReportService } from '../../core/services/daily-report.service';
import { DailyReport } from '../../core/models/daily-report.model';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './reports.component.html',
})
export class ReportsComponent {

  constructor(
    public growService: GrowService,
    public plantService: PlantService,
    private reportService: DailyReportService
  ) {}

  step = 1;

  selectedGrowId: number | null = null;
  selectedPlantId: number | null = null;

  notes = '';
  height: number | null = null;

  // 🔥 derivado desde servicio (NO mock local)
  filteredPlants() {
    if (!this.selectedGrowId) return [];
    return this.plantService.byGrow(this.selectedGrowId);
  }

  next() {
    this.step++;
  }

  back() {
    this.step--;
  }

  reset() {
    this.step = 1;
    this.selectedGrowId = null;
    this.selectedPlantId = null;
    this.notes = '';
    this.height = null;
  }

  save() {
    const report: DailyReport = {
      growId: this.selectedGrowId!,
      plantId: this.selectedPlantId!,
      notes: this.notes,
      height: this.height ?? undefined,
      reportDate: new Date().toISOString().split('T')[0],
    };
    this.reportService.create(report).subscribe();

    console.log('REPORT SAVED', report);

    this.reset();
  }
}
