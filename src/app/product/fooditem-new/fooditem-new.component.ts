import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProductService } from '../product.service';
import { Fooditem } from '../fooditem';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../../core/dialog.service';


@Component({
  selector: 'app-fooditem-new',
  templateUrl: './fooditem-new.component.html',
  styleUrls: ['./fooditem-new.component.scss']
})
export class FooditemNewComponent implements OnInit {
  stepperStep: number; // 4 step stepper. 1. Image upload, 2. fooditem details, 3. address, 4. post/publish
  productForm: FormGroup;
  defaultFooditem: Fooditem;
  isAdding: boolean;
  foodCategories = [ 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Main Course', 'Starter', 'Sweet', 'Bakery' ];
  foodCuisine = [ 'North Indian', 'South Indian', 'Punjabi', 'Mughlai', 'Arebic', ];

  constructor(public product: ProductService, private fb: FormBuilder, private dialog: DialogService ) {
    this.isAdding = false;
    this.stepperStep = 1;
    this.createForm();

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



  createForm() {
    // User input values
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      price: [0.0, Validators.required],
      serving: [1, Validators.required],
      isNonVeg: true,
      category: '',
      cuisine: '',
    });
    console.log('Product Input values: ', this.productForm.value);
  }

  prepareProductData(data: any) {}

  saveProductData() {
    const formModel = this.productForm.value;
    console.log('Product Input values: ', formModel);
  }

  onSubmit() {
    this.isAdding = true;
    this.saveProductData();
  }

}
