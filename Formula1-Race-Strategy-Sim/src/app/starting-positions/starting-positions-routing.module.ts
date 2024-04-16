import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartingPositionsPage } from './starting-positions.page';

const routes: Routes = [
  {
    path: '',
    component: StartingPositionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartingPositionsPageRoutingModule {}

