import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  foodCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Main Course', 'Starter', 'Sweet', 'Bakery' ];
  foodCuisine = ['North Indian', 'South Indian', 'Punjabi', 'Mughlai', 'Arebic', ];
  foodServing = [1, 2, 3, 4, 'More'];
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private product: ProductService) {
    this.createForm();
   }

  ngOnInit() {
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

  onSubmit() {
    this.product.getProductFormsData(this.productForm.value);
  }

}
