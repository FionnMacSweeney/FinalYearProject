import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridPlaceSelectionPage } from './grid-place-selection.page';

const routes: Routes = [
  {
    path: '',
    component: GridPlaceSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GridPlaceSelectionPageRoutingModule {}
