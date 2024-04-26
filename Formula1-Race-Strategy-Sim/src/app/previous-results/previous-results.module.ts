import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Import IonicModule
import { PreviousResultsRoutingModule } from './previous-results-routing.module';
import { PreviousResultsComponent } from './previous-results.component';

@NgModule({
  declarations: [PreviousResultsComponent],
  imports: [
    CommonModule,
    IonicModule,  
    PreviousResultsRoutingModule
  ]
})
export class PreviousResultsModule {}

