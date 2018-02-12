import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooditemListComponent } from './fooditem-list/fooditem-list.component';
import { FooditemDetailComponent } from './fooditem-detail/fooditem-detail.component';
import { FooditemNewComponent } from './fooditem-new/fooditem-new.component';
import { FooditemModifyComponent } from './fooditem-modify/fooditem-modify.component';
import { FooditemService } from './fooditem.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FooditemListComponent, FooditemDetailComponent, FooditemNewComponent, FooditemModifyComponent],
  providers: [FooditemService]
})
export class ProductModule { }
