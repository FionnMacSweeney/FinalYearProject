import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TyreSelectionPageRoutingModule } from './tyre-selection-routing.module';

import { TyreSelectionPage } from './tyre-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TyreSelectionPageRoutingModule
  ],
  declarations: [TyreSelectionPage]
})
export class TyreSelectionPageModule {}
