import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaceSimulationPage } from './race-simulation.page';

const routes: Routes = [
  {
    path: '',
    component: RaceSimulationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaceSimulationPageRoutingModule {}
