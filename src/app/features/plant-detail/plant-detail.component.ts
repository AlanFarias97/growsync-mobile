import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlantService } from '../../core/services/plant.service';
import { DailyReportService } from '../../core/services/daily-report.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './plant-detail.component.html',
})
export class PlantDetailComponent {

  route = inject(ActivatedRoute);
  plantService = inject(PlantService);
  reportService = inject(DailyReportService);

  plantId = Number(this.route.snapshot.paramMap.get('id'));

  plant = this.plantService.plants().find(p => p.id === this.plantId);

  reports = () => this.reportService.byPlant(this.plantId);
}
