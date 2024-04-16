import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaceResultsPage } from './race-results.page';

const routes: Routes = [
  {
    path: '',
    component: RaceResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaceResultsPageRoutingModule {}
