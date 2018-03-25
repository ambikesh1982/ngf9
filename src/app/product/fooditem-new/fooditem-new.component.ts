import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Fooditem } from '../fooditem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GeolocationService } from '../../core/geolocation.service';

@Component({
  selector: 'app-fooditem-new',
  templateUrl: './fooditem-new.component.html',
  styleUrls: ['./fooditem-new.component.scss']
})

export class FooditemNewComponent implements OnInit {

  locationFromNavigator: { lat: number, lng: number };

  foodCategories = ['Main Course', 'Starter', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Sweet', 'Bakery'];
  foodCuisine = ['North Indian', 'South Indian', 'Punjabi', 'Mughlai', 'Arebic', ];
  foodServing = [1, 2, 3, 4, 'More'];

  newFooditem: Fooditem;
  productForm: FormGroup;

  selectedIndex = 0;

  userAddress: { address: string, lat: number, lng: number };

  constructor(
    public product: ProductService,
    private formBuilder: FormBuilder,
    private geolocation: GeolocationService) {
    if (navigator.geolocation) {
      this.geolocation.getCurrentPosition().subscribe(
        pos => {
          console.log('Location resolved');
          this.locationFromNavigator = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        },
        (err: any) => {
          switch (err.code) {
            case 3:
              console.log(err);
              this.locationFromNavigator = { lat: 1.3522174, lng: 103.87970299999999 };
              console.log('Default location is set for user');
          }
        });
    }
  }

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
          // This executes when you move to step number 2.
          this.newFooditem.images = this.product.images;
          console.log('Completed Step 0: Added image array', this.newFooditem);
          break;
        }
        case 1: {
          // This executes when you move to step number 3.
          this.newFooditem.title = this.productForm.value.title;
          this.newFooditem.description = this.productForm.value.description;
          this.newFooditem.isNonVeg = this.productForm.value.isNonVeg;
          this.newFooditem.price = this.productForm.value.price;
          this.newFooditem.serving = this.productForm.value.serving;
          this.newFooditem.category = this.productForm.value.category;
          this.newFooditem.cuisine = this.productForm.value.cuisine;
          console.log('Completed Step 1: Added form data ', this.newFooditem);
          break;
        }
        case 2: {
          // This executes when you move to step number 4.
          // With user address product data is finished.
          // Show previw of the fooditem and ask user to post or cancel.
          this.newFooditem.address = this.userAddress;
          console.log('Completed Step 2: Added location data ', this.newFooditem);
          // this.product.createProduct(this.newFooditem);
          break;
        }
      }
    } else { console.log('User moved back to previous step'); }
  }

  getUserSelectedAddress(eventData: any) {
    console.log(eventData);
    this.userAddress = eventData;
  }

  showPreview(imgData: string) {
    console.log(imgData);
  }

}


// 00000034074055474	OD Account	ERANDWANE
