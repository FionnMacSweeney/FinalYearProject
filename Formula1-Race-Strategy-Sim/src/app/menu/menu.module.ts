import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component'; 

@NgModule({
  declarations: [MenuComponent], 
  imports: [
    CommonModule,
    IonicModule, 
    MenuRoutingModule
  ]
})
export class MenuModule { }

