import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StartingPositionsPageRoutingModule } from './starting-positions-routing.module';
import { StartingPositionsPage } from './starting-positions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartingPositionsPageRoutingModule
  ],
  declarations: [StartingPositionsPage]
})
export class StartingPositionsPageModule {}

