import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaceResultsPageRoutingModule } from './race-results-routing.module';

import { RaceResultsPage } from './race-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaceResultsPageRoutingModule
  ],
  declarations: [RaceResultsPage]
})
export class RaceResultsPageModule {}
