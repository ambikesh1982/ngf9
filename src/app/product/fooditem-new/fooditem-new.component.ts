import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Fooditem } from '../fooditem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fooditem-new',
  templateUrl: './fooditem-new.component.html',
  styleUrls: ['./fooditem-new.component.scss']
})

export class FooditemNewComponent implements OnInit {

  foodCategories = ['Main Course', 'Starter', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Sweet', 'Bakery'];
  foodCuisine = ['North Indian', 'South Indian', 'Punjabi', 'Mughlai', 'Arebic', ];
  foodServing = [1, 2, 3, 4, 'More'];

  newFooditem: Fooditem;
  productForm: FormGroup;

  stepControl: number;

  selectedIndex = 0;

  constructor(public product: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Initialize new fooditem with id = firebase key
    this.newFooditem = {};
    this.newFooditem.id = this.product.initializeProduct();
    this.createForm();
  }

  createForm() {
    // User input values
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      price: [, Validators.required],
      serving: [1, Validators.required],
      isNonVeg: true,
      category: '',
      cuisine: '',
    });
  }

  prepareDataFromStepper(stepperEvent: any) {
    console.log('stepperEvent: ', stepperEvent);
    if (stepperEvent.previouslySelectedIndex < stepperEvent.selectedIndex) {

      switch (stepperEvent.previouslySelectedIndex) {
        case 0: {
          this.newFooditem.images = this.product.images;
          console.log('Completed Step 0: Added image array', this.newFooditem);
          this.stepControl = 0;
          break;
        }
        case 1: {
          this.newFooditem.title = this.productForm.value.title;
          this.newFooditem.description = this.productForm.value.description;
          this.newFooditem.isNonVeg = this.productForm.value.isNonVeg;
          this.newFooditem.price = this.productForm.value.price;
          this.newFooditem.serving = this.productForm.value.serving;
          this.newFooditem.category = this.productForm.value.category;
          this.newFooditem.cuisine = this.productForm.value.cuisine;
          console.log('Completed Step 1: Added form data', this.newFooditem);
          this.stepControl = 1;
          break;
        }
        case 2: {
          console.log('Completed Step 2: Add location data and preview');
          this.selectedIndex = stepperEvent.selectedIndex;
          break;
        }
        default: {
          console.log('Completed Step 3: Post');
          this.product.createProduct(this.newFooditem);
          break;
        }
      }

    } else {
      console.log('User moved back to previous step');
    }

  }

}


// 00000034074055474	OD Account	ERANDWANE
