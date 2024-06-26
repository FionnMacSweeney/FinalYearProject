import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule), canActivate: [AuthGuard] },
  {
    path: 'previous-results',
    loadChildren: () => import('./previous-results/previous-results.module').then(m => m.PreviousResultsModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'drivers',
   loadChildren: () => import('./drivers/drivers.module').then(m => m.DriversPageModule)
  },
  {
    path: 'tracks',
    loadChildren: () => import('./tracks/tracks.module').then(m => m.TracksPageModule)
  },
  {
    path: 'tyre-selection',
    loadChildren: () => import('./tyre-selection/tyre-selection.module').then(m => m.TyreSelectionPageModule)
  },
  {
    path: 'grid-place-selection',
    loadChildren: () => import('./grid-place-selection/grid-place-selection.module').then(m => m.GridPlaceSelectionPageModule)
  },
  {
    path: 'race-simulation',
    loadChildren: () => import('./race-simulation/race-simulation.module').then(m => m.RaceSimulationPageModule)
  },
  {
    path: 'starting-positions',
    loadChildren: () => import('./starting-positions/starting-positions.module').then(m => m.StartingPositionsPageModule)
  },
  {
    path: 'race-results',
    loadChildren: () => import('./race-results/race-results.module').then(m => m.RaceResultsPageModule)
  }


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
