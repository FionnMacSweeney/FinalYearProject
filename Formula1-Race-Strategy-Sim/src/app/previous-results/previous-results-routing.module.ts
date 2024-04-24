// src/app/previous-results/previous-results-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviousResultsComponent } from './previous-results.component';

const routes: Routes = [
    {
        path: '',
        component: PreviousResultsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreviousResultsRoutingModule {}

