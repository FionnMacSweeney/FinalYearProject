import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaceSimulationPageRoutingModule } from './race-simulation-routing.module';

import { RaceSimulationPage } from './race-simulation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaceSimulationPageRoutingModule
  ],
  declarations: [RaceSimulationPage]
})
export class RaceSimulationPageModule {}
