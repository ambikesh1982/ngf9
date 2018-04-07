import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FooditemListComponent } from './fooditem-list/fooditem-list.component';
import { FooditemDetailComponent } from './fooditem-detail/fooditem-detail.component';
import { FooditemNewComponent } from './fooditem-new/fooditem-new.component';
import { FooditemModifyComponent } from './fooditem-modify/fooditem-modify.component';
import { ProductService } from './product.service';
import { MaterialModule } from '../material.module';
import { FileUploadComponent } from './fooditem-new/file-upload/file-upload.component';
import { CoreModule } from '../core/core.module';
import { AutoAddressComponent } from './fooditem-new/auto-address/auto-address.component';


const productRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: FooditemListComponent },
  { path: 'detail/:id', component: FooditemDetailComponent },
  { path: 'addnew', component: FooditemNewComponent },
  { path: 'modify/:id', component: FooditemModifyComponent },
  ];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(productRoutes)
  ],
  declarations: [
    FooditemListComponent,
    FooditemDetailComponent,
    FooditemNewComponent,
    FooditemModifyComponent,
    FileUploadComponent,
    AutoAddressComponent,
  ],
  providers: [ProductService]
})
export class ProductModule {}
