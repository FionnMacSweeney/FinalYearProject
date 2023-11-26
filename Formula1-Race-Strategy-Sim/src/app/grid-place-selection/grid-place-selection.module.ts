import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GridPlaceSelectionPageRoutingModule } from './grid-place-selection-routing.module';

import { GridPlaceSelectionPage } from './grid-place-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GridPlaceSelectionPageRoutingModule
  ],
  declarations: [GridPlaceSelectionPage]
})
export class GridPlaceSelectionPageModule {}
