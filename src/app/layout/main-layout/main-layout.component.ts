import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { GrowService } from 'src/app/core/services/grow.service';
import { PlantService } from 'src/app/core/services/plant.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  userEmail = localStorage.getItem('email') ?? 'admin@growsync.com';

  constructor(private router: Router, private growService: GrowService,
    private plantService: PlantService) {}

    ngOnInit() {
      this.growService.load().subscribe();
      this.plantService.load().subscribe();
    }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
