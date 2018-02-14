import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fooditem-new',
  templateUrl: './fooditem-new.component.html',
  styleUrls: ['./fooditem-new.component.scss']
})
export class FooditemNewComponent implements OnInit {

  productForm: FormGroup;

  constructor( private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      currency: 'SGD',
      price: [0.0, Validators.required],
      serving: [0, Validators.required],
      isNonVeg: true,
      category: '',
      cuisine: '',
      // imageUrl: '',
      addedAt: Date,
    });
  }
}
