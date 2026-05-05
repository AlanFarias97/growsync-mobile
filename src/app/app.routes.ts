import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'main',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
    ],
  },
  {
    path: 'grows',
    loadComponent: () =>
      import('./features/grows/grows.component').then(m => m.GrowsComponent),
  },
  {
    path: 'plants',
    loadComponent: () =>
      import('./features/plants/plants.component').then(m => m.PlantsComponent),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./features/reports/reports.component').then(m => m.ReportsComponent),
  },
  {
    path: 'plants/:id',
    loadComponent: () =>
      import('./features/plant-detail/plant-detail.component')
        .then(m => m.PlantDetailComponent),
  }
];
