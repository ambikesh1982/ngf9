import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  foodCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Main Course', 'Starter', 'Sweet', 'Bakery' ];
  foodCuisine = ['North Indian', 'South Indian', 'Punjabi', 'Mughlai', 'Arebic', ];
  isAdding: boolean;
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.isAdding = false;
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    // User input values
    this.productForm = this.formBuilder.group({
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

  onSubmit() {
    this.isAdding = true;
    // this.saveProductData();
  }

}
