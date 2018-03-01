import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Fooditem } from '../fooditem';


@Component({
  selector: 'app-fooditem-new',
  templateUrl: './fooditem-new.component.html',
  styleUrls: ['./fooditem-new.component.scss']
})
export class FooditemNewComponent implements OnInit {
  stepperStep: number; // 4 step stepper. 1. Image upload, 2. fooditem details, 3. address, 4. post/publish
  defaultFooditem: Fooditem;
  isAdding: boolean;

  constructor(public product: ProductService ) {
    this.isAdding = false;
    this.stepperStep = 1;

    // Setting up default fooditem to initialize firebase db entry.
    this.defaultFooditem = {
      title: 'Untitled fooditem',
      description: '',
      currency: 'INR',
      price: 0.0,
      serving: 1,
      isNonVeg: false,
      category: '',
      cuisine: '',
      images: [],
      stepperStep: 1,
    };
  }

  ngOnInit() {
    console.log('Default fooditem: ', this.defaultFooditem);
    this.product.initializeProduct(this.defaultFooditem);
    }

}
