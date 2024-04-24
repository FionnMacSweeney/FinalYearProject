// src/app/previous-results/previous-results.module.ts
// src/app/previous-results/previous-results.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Import IonicModule
import { PreviousResultsRoutingModule } from './previous-results-routing.module';
import { PreviousResultsComponent } from './previous-results.component';

@NgModule({
  declarations: [PreviousResultsComponent],
  imports: [
    CommonModule,
    IonicModule,  // Add IonicModule here
    PreviousResultsRoutingModule
  ]
})
export class PreviousResultsModule {}

