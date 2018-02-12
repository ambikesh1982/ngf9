import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FooditemListComponent } from './fooditem-list/fooditem-list.component';
import { FooditemDetailComponent } from './fooditem-detail/fooditem-detail.component';
import { FooditemNewComponent } from './fooditem-new/fooditem-new.component';
import { FooditemModifyComponent } from './fooditem-modify/fooditem-modify.component';
import { FooditemService } from './fooditem.service';
import { MaterialModule } from '../material.module';

const productRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: FooditemListComponent },
  { path: 'detail/:id', component: FooditemDetailComponent },
  { path: 'new', component: FooditemNewComponent },
  { path: 'modify/:id', component: FooditemModifyComponent },
  ];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(productRoutes)
  ],
  declarations: [
    FooditemListComponent,
    FooditemDetailComponent,
    FooditemNewComponent,
    FooditemModifyComponent
  ],
  providers: [FooditemService]
})
export class ProductModule {}
